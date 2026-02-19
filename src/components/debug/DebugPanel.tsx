import { motion } from 'framer-motion';

export default function DebugPanel({ 
  postureScore, 
  onScoreChange 
}: { 
  postureScore: number, 
  onScoreChange: (score: number) => void 
}) {
  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        translateX: "-50%",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "12px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
        DEBUG — postureScore: {postureScore.toFixed(2)}
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={postureScore}
        onChange={(e) => onScoreChange(parseFloat(e.target.value))}
        style={{ width: 200 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}