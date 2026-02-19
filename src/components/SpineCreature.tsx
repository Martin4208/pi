import { motion } from 'framer-motion';

export default function SpineCreature({ postureScore }: { postureScore: number }) {
    const lean = (1 - postureScore) * 22 // Max 22 degrees

    const hue = postureScore * 120 // 0=赤, 120=緑
    const color = `hsl(${hue}, 80%, 60%)`

    return (
        <motion.svg
            viewBox="0 0 48 48"
            width={48}
            height={48}
            animate={{ rotate: lean }}
            transition={{ type: "spring", stiffness: 69, damping: 15 }}
        >
            <circle 
                cx="24"
                cy="8"
                r="4"
                fill={color}
            />
            <rect 
                x="20"
                y="16"
                width="8"
                height="4"
                rx="2"
                fill={color}
            />
            <rect 
                x="19"
                y="22"
                width="10"
                height="4"
                rx="2"
                fill={color}
            />
            <rect 
                x="18"
                y="28"
                width="12"
                height="4"
                rx="2"
                fill={color}
            />
            <rect 
                x="17"
                y="34"
                width="14"
                height="4"
                rx="2"
                fill={color}
            />
        </motion.svg>
    );
}