import { useRef, useEffect, useState } from "react";
import GlassPill from './components/GlassPill';
import SpineCreature from './components/SpineCreature';
import MessagePill from './components/MessagePill';
// import RippleRings from './components/RippleRings';
// import DebugPanel from './components/debug/DebugPanel';
import { usePoseDetection } from './hooks/usePoseDetection';
import { useAlertThrottle } from './hooks/useAlertThrottle';
import { getCurrentWindow } from '@tauri-apps/api/window'

export default function App() {
  const [expanded, setExpanded] = useState(false);
  const [messageShown, setMessageShown] = useState(false)

  const { videoRef, postureScore } = usePoseDetection()

  const { shouldAlert } = useAlertThrottle(postureScore);

  const mouseDownTime = useRef<number>(0)
  const mouseDownPos = useRef<{x: number, y: number}>({ x: 0, y: 0 })

  async function handleMouseDown(e: React.MouseEvent) {
    // フォーム入力などを除外
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;

    mouseDownTime.current = Date.now()
    mouseDownPos.current = { x: e.clientX, y: e.clientY }
    
    // Tauriのドラッグを開始
    await getCurrentWindow().startDragging()
  }

  function handleMouseUp(e: React.MouseEvent) {
    const elapsed = Date.now() - mouseDownTime.current
    const dx = Math.abs(e.clientX - mouseDownPos.current.x)
    const dy = Math.abs(e.clientY - mouseDownPos.current.y)

    // 200ms以内かつ5px以内の移動ならクリック
    if (elapsed < 200 && dx < 5 && dy < 5) {
      setExpanded(prev => !prev)
      setMessageShown(false)
    }
  }

  useEffect(() => {
    const appWindow = getCurrentWindow();
    const w = expanded ? 128 : 66;
    const h = expanded ? 72 : 34;

    appWindow.setSize({ width: w, height: h });
  }, [expanded])

  return (
    <div
      style={{ 
        width: "100vw",
        minHeight: "100vh",
        background: "transparent",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
        <GlassPill 
          expanded={expanded} 
          postureScore={postureScore}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {expanded && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            height: "100%",
          }}>
            <SpineCreature postureScore={postureScore} />
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <span style={{
                color: postureScore > 0.5 ? "rgba(80,220,120,0.9)" : "rgba(255,80,50,0.9)",
                fontSize: 12,
                fontWeight: 600,
              }}>
                {postureScore > 0.7 ? "Good" : postureScore > 0.4 ? "Fair" : "Bad"}
              </span>
              <span style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 10,
              }}>
                {Math.round(postureScore * 100)}
              </span>
            </div>
          </div>
        )}
        </GlassPill>
        {/* <RippleRings active={postureScore <= 0.2} expanded={expanded} /> */}
      <MessagePill 
        visible={shouldAlert && !messageShown}
        onShown={() => setMessageShown(true)}
        expanded={expanded}
      />
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      {/* <DebugPanel 
        postureScore={postureScore} 
        onScoreChange={setPostureScore} 
      /> */}
    </div>
  );
}