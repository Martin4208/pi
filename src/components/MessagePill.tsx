import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
  "肩、ふわっと下ろして",
  "少し伸びませんか 🌱",
  "呼吸を深くして",
  "背筋を伸ばしましょう"
];

export default function MessagePill({ visible, onShown, expanded }: { visible: boolean, onShown: () => void, expanded: boolean }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!visible) return
        const shown = setTimeout(() => {
        onShown()
        }, 4000)

        const t = setInterval(() => {
        setIndex(i => (i + 1) % messages.length)
        }, 4000)

        return () => {
        clearInterval(t)
        clearTimeout(shown)
        }
    }, [visible])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                    color: "white",
                    position: "fixed",
                    top: expanded ? 78 : 40,
                    left: "50%",
                    translateX: "-50%",
                    fontSize: 11,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    whiteSpace: "nowrap",
                }}
                >
                {messages[index]}
                </motion.div>
            )}
        </AnimatePresence>
    )
}