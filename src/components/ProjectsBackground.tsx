"use client";

import { motion } from "framer-motion";

export function ProjectsBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-15">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`commit-${i}`}
                    className="absolute"
                    initial={{ x: "-10%", y: `${25 + i * 12}%` }}
                    animate={{ x: "110%" }}
                    transition={{
                        duration: 22 + i * 3,
                        repeat: Infinity,
                        delay: i * 4,
                        ease: "linear",
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#2D6A4F]/60 border border-[#74C69D]/50" />
                        <div className="w-16 h-0.5 bg-[#2D6A4F]/40" />
                        <div className="w-3 h-3 rounded-full bg-[#C85A32]/60 border border-[#C85A32]/40" />
                    </div>
                </motion.div>
            ))}

            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`check-${i}`}
                    className="absolute w-6 h-6 border border-[#2D6A4F]/50 rounded-full flex items-center justify-center bg-[#D8F3DC]/30 dark:bg-[#1B4332]/30"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 2) * 50}%`,
                    }}
                    animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.25, 0.6, 0.25],
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                >
                    <span className="text-[#2D6A4F] dark:text-[#74C69D] text-xs font-mono font-bold">✓</span>
                </motion.div>
            ))}
        </div>
    );
}
