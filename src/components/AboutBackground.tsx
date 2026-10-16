"use client";

import { motion } from "framer-motion";

export function AboutBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25 dark:opacity-15">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`edu-${i}`}
                    className="absolute"
                    initial={{ y: "100%", x: `${18 + i * 14}%`, opacity: 0 }}
                    animate={{
                        y: "-20%",
                        opacity: [0, 0.55, 0.55, 0],
                        rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                        duration: 16 + i * 2,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear",
                    }}
                >
                    <div className="w-8 h-8 border border-[#2D6A4F]/50 bg-[#D8F3DC]/40 dark:bg-[#1B4332]/40 rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-[#1B4332] dark:text-[#95D5B2]">
                        {i % 3 === 0 ? "IEM" : i % 3 === 1 ? "SCM" : "8.18"}
                    </div>
                </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15%" cy="30%" r="6" fill="rgba(45, 106, 79, 0.35)">
                    <animate attributeName="r" values="6;10;6" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="85%" cy="70%" r="6" fill="rgba(200, 90, 50, 0.35)">
                    <animate attributeName="r" values="6;10;6" dur="4s" begin="2s" repeatCount="indefinite" />
                </circle>
                <line x1="15%" y1="30%" x2="85%" y2="70%" stroke="rgba(45, 106, 79, 0.2)" strokeWidth="1" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.5s" repeatCount="indefinite" />
                </line>
            </svg>
        </div>
    );
}
