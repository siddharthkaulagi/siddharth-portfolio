"use client";

import { motion } from "framer-motion";

export function ContactBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 dark:opacity-15">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`email-${i}`}
                    className="absolute"
                    initial={{
                        x: "-10%",
                        y: `${20 + i * 20}%`,
                        rotate: -10,
                    }}
                    animate={{
                        x: "110%",
                        y: `${20 + i * 20 + Math.sin(i) * 8}%`,
                        rotate: 10,
                    }}
                    transition={{
                        duration: 18 + i * 2,
                        repeat: Infinity,
                        delay: i * 3,
                        ease: "linear",
                    }}
                >
                    <div className="w-10 h-7 border border-[#2D6A4F]/50 bg-[#D8F3DC]/40 dark:bg-[#1B4332]/40 rounded relative" />
                </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="5" fill="rgba(45, 106, 79, 0.35)">
                    <animate attributeName="r" values="5;65;5" dur="4.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.45;0;0.45" dur="4.5s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}
