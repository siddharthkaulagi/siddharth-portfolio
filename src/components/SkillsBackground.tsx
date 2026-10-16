"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function SkillsBackground() {
    const [mounted, setMounted] = useState(false);
    const symbols = ["ABC/XYZ", "MAPE", "DAX", "EOQ", "JIT", "5S", "GD&T", "RAG"];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-12">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`sym-${i}`}
                    className="absolute text-[#2D6A4F]/60 dark:text-[#74C69D]/50 font-mono text-xs font-bold tracking-widest"
                    initial={{
                        y: "100%",
                        x: `${10 + i * 11}%`,
                        opacity: 0,
                    }}
                    animate={{
                        y: "-20%",
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: 22 + i * 2,
                        repeat: Infinity,
                        delay: i * 1.8,
                        ease: "linear",
                    }}
                >
                    [{symbols[i % symbols.length]}]
                </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {[...Array(4)].map((_, i) => (
                    <g key={`line-${i}`}>
                        <line
                            x1={`${20 + i * 20}%`}
                            y1="20%"
                            x2={`${30 + i * 20}%`}
                            y2="80%"
                            stroke="rgba(45, 106, 79, 0.18)"
                            strokeWidth="1"
                            strokeDasharray="3,3"
                        >
                            <animate attributeName="stroke-dashoffset" from="0" to="6" dur="2s" repeatCount="indefinite" />
                        </line>
                    </g>
                ))}
            </svg>
        </div>
    );
}
