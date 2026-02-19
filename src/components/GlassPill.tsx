import { motion } from 'framer-motion';

export default function GlassPill({ children, expanded = false, postureScore, onMouseDown, onMouseUp }) {
    const bg = postureScore > 0.5
        ? "rgba(255, 255, 255, 0)"
        : `rgba(255, 50, 50, ${0.15 * (1 - postureScore * 2)})`


    return (
        <motion.div
            data-tauri-drag-region
            style={{
                background: bg,
                borderRadius: "var(--glass-radius)",
                boxShadow: "var(--glass-shadow)",
                backdropFilter: "var(--glass-blur)",
                WebkitBackdropFilter: "var(--glass-blur)",
                border: "var(--glass-border)",
                position: "fixed",
                top: 0,
                left: "0px", 
                cursor: "grab",
                userSelect: "none",
            }}
            animate={{
                width: expanded ? 128 : 66,
                height: expanded ? 72 : 34,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {children}
        </motion.div>
    )
}