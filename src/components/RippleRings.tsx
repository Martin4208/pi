import {motion, AnimatePresence} from 'framer-motion';

export default function RippleRings({ active, expanded }: { active: boolean, expanded: boolean}) {
    return (
        <AnimatePresence>
            {active && (
                <>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: "fixed",
                                width: expanded ? 128: 66,        // GlassPill と同じ幅
                                height: expanded ? 72 : 34,       // GlassPill と同じ高さ
                                borderRadius: 16, // GlassPill と同じ角丸
                                border: "1px solid rgba(255, 100, 100, 0.6)",
                                top: 12,
                                left: "50%",
                                x: "-50%",
                            }}
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ 
                                duration: 2, 
                                delay: i * 0.6, 
                                repeat: Infinity 
                            }}
                            />
                    ))}
                </>
            )}
        </AnimatePresence>
    );
}