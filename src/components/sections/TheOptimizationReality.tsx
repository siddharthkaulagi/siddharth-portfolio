"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle, Quote, Activity } from "lucide-react";

const REALITY_LOGS = [
    {
        id: "01",
        question: "How do you handle: 'We decided to move forward with another candidate'?",
        image: "/rejection_1.png",
        commentary:
            "Stage 1: The standard system crash. Buffer overflow of emotions. But don't worry, the auto-reboot is fast.",
        tag: "ERROR_LOG_404",
    },
    {
        id: "02",
        question: "Translation request: 'We were particularly impressed by your skill set'...",
        image: "/rejection_2.png",
        commentary:
            "Usually means: 'You're amazing, but my buddy's cousin needed a job.' It's not you, it's the network topology.",
        tag: "SYSTEM_DEBUG",
    },
    {
        id: "03",
        question: "Why do you want to work for us? (Honesty Protocol)",
        image: "/why_work.png",
        commentary:
            "I have a weird dependency on food and shelter. Plus, your infrastructure is messy and my soul yearns to over-optimize it.",
        tag: "PRIMARY_MOTIVATION",
    },
    {
        id: "04",
        question: "Your take on 'Culture Fit' interviews?",
        image: "/interview_liars.png",
        commentary:
            "An elegant dance of two highly optimized social algorithms trying to find a common bug. A conversation between two professional liars (I'm the optimized one).",
        tag: "NETWORK_HANDSHAKE",
    },
    {
        id: "05",
        question: "The 8 AM 'Regret to Inform' notification experience?",
        image: "/rejection_3.png",
        commentary:
            "Just another unit test failure. I refactor the resume, push to the job board, and retry the build. Deployment is inevitable.",
        tag: "CONTINUOUS_RETRY",
    },
];

export function TheOptimizationReality() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="reality"
            className="py-28 px-6 md:px-16 bg-transparent relative overflow-hidden scroll-mt-24"
        >
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#C85A32]/15 text-[#C85A32]">
                            <Activity size={18} />
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.35em] font-bold text-[#C85A32]">
                            System_Experience_Logs
                        </span>
                    </div>
                    <h2 className="font-headline text-4xl md:text-6xl font-black text-foreground leading-[0.95] uppercase">
                        The <span className="text-[#C85A32]">Optimization</span> Reality.
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xl">
                        A raw, unfiltered look into the life of an Industrial Engineer in the modern workspace. Sarcastic? Maybe. Realistic? 100%.
                    </p>
                </div>

                <div className="space-y-4">
                    {REALITY_LOGS.map((log, idx) => (
                        <div
                            key={idx}
                            className={`group border border-black/12 dark:border-white/12 rounded-3xl overflow-hidden transition-all duration-300 ${
                                openIndex === idx
                                    ? "bg-white dark:bg-[#171B18] shadow-xl border-[#2D6A4F]"
                                    : "bg-white/75 dark:bg-[#171B18]/60 hover:bg-white dark:hover:bg-[#171B18]"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-5">
                                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] font-bold">
                                        {log.id}
                                    </span>
                                    <h3 className="font-headline text-lg md:text-xl font-bold text-foreground group-hover:text-[#2D6A4F] dark:group-hover:text-[#74C69D] transition-colors">
                                        {log.question}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    className="text-muted-foreground"
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        <div className="px-6 md:px-16 pb-10 pt-2 space-y-6 border-t border-black/10 dark:border-white/10">
                                            <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-[#F6F4EE] dark:bg-[#111412]">
                                                <div className="flex items-center justify-between px-4 py-2 border-b border-black/10 dark:border-white/10 font-mono text-[10px]">
                                                    <span className="font-bold text-[#C85A32] uppercase tracking-widest">
                                                        {log.tag}
                                                    </span>
                                                    <span className="text-muted-foreground font-bold">LOG_v9.0</span>
                                                </div>
                                                <img
                                                    src={log.image}
                                                    alt={log.tag}
                                                    className="w-full h-auto object-contain max-h-[560px] mx-auto p-4"
                                                />
                                            </div>

                                            <div className="space-y-3 text-center max-w-lg mx-auto">
                                                <div className="flex justify-center text-[#2D6A4F] dark:text-[#74C69D]">
                                                    <Quote size={26} />
                                                </div>
                                                <p className="font-body text-base md:text-lg text-foreground leading-relaxed italic">
                                                    &ldquo;{log.commentary}&rdquo;
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 dark:border-white/10 gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10 max-w-md">
                        <div className="p-2.5 rounded-xl bg-[#2D6A4F] text-white">
                            <AlertCircle size={18} />
                        </div>
                        <p className="font-mono text-[11px] text-muted-foreground leading-snug">
                            NOTE: Part of the <strong className="text-[#2D6A4F] dark:text-[#74C69D]">CAREER_RECOVERY_PROTOCOL</strong>. Every rejection is a data point for a stronger build.
                        </p>
                    </div>

                    <div className="px-5 py-2 rounded-full border border-[#2D6A4F]/30 text-[#2D6A4F] dark:text-[#74C69D] bg-[#D8F3DC]/60 dark:bg-[#1B4332]/60 font-mono font-bold text-[10px] uppercase tracking-widest">
                        Hustle Status: Operational_v9.0
                    </div>
                </div>
            </div>
        </section>
    );
}
