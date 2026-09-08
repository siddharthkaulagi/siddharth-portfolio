"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowRight, Hexagon, Terminal as TerminalIcon, X, Quote } from "lucide-react";
import Image from "next/image";
import { IndustrialBackground } from "@/components/IndustrialBackground";
import { Terminal, ONE_PIECE_QUOTES } from "@/components/Terminal";
import { VisitorCounter } from "@/components/VisitorCounter";

export function Hero({
    isTerminalOpen,
    onTerminalOpen,
    onTerminalClose
}: {
    isTerminalOpen: boolean;
    onTerminalOpen: () => void;
    onTerminalClose: () => void;
}) {
    const [isWisdomOpen, setIsWisdomOpen] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const githubX = useSpring(0, { damping: 12, stiffness: 150 });
    const githubY = useSpring(0, { damping: 12, stiffness: 150 });
    const linkedinX = useSpring(0, { damping: 12, stiffness: 150 });
    const linkedinY = useSpring(0, { damping: 12, stiffness: 150 });

    const githubRef = useRef<HTMLAnchorElement>(null);
    const linkedinRef = useRef<HTMLAnchorElement>(null);

    // Auto-close Wisdom Modal after 10 seconds
    useEffect(() => {
        if (isWisdomOpen) {
            const timer = setTimeout(() => {
                setIsWisdomOpen(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isWisdomOpen]);


    function handleMagnetic(e: React.MouseEvent, springX: any, springY: any, ref: any) {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        springX.set((clientX - centerX) * 0.5);
        springY.set((clientY - centerY) * 0.5);
    }

    function resetMagnetic(springX: any, springY: any) {
        springX.set(0);
        springY.set(0);
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-24 pb-12 overflow-hidden bg-[#fafafa] dark:bg-[#131212]"
        >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5 pointer-events-none -z-20" />

            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
                <IndustrialBackground />
            </div>

            {/* Cinematic Background Glows */}
            <div className="hidden dark:block absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none" />
            <div className="hidden dark:block absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] -z-10 animate-pulse pointer-events-none" />

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10 w-full mt-4 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
                    className="lg:col-span-8 z-10 space-y-6"
                >
                    <div className="flex flex-col gap-2">
                        <label className="font-label text-[10px] uppercase tracking-[0.4em] font-black text-cyan-600 dark:text-[#ff4d00] flex items-center gap-3">
                            <span className="w-10 h-px bg-cyan-600 dark:bg-[#ff4d00]" />
                            System_Identity_Active
                        </label>
                        <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground dark:text-[#e5e2e1]">
                            I'm <span className="group relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-500 dark:from-[#ff4d00] dark:to-[#ff8c00] group-hover:tracking-widest transition-all duration-700 cursor-default">SIDDHARTH</span>
                            </span><br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500 text-3xl sm:text-5xl lg:text-6xl block mt-2"
                            >
                                Industrial Engineer<span className="text-cyan-600 dark:text-[#ff4d00]">.</span>
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.7 }}
                            className="font-label text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-black text-muted-foreground dark:text-[#e5e2e1]/50 max-w-xl leading-relaxed"
                        >
                            Supply Chain · Lean Systems · Industrial Engineering · Project Management · Data-Driven Decision Making
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <p className="font-body text-base lg:text-lg text-muted-foreground dark:text-[#e5e2e1]/70 max-w-md leading-relaxed">
                                Optimizing complex systems through <span className="text-foreground dark:text-white font-bold">industrial intelligence</span>, <span className="text-foreground dark:text-white font-bold">project management</span>, and <span className="text-foreground dark:text-white font-bold">data-driven orchestration</span>.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {["Supply Chain", "Lean Systems", "Project Management", "Open to Roles"].map((chip) => (
                                    <span
                                        key={chip}
                                        className="font-label text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 text-muted-foreground dark:text-[#e5e2e1]/50"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                            <VisitorCounter />

                            <div className="flex flex-wrap items-center gap-4">
                                <motion.a
                                    href="#experience"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-6 py-3 rounded-xl bg-black dark:bg-gradient-to-r dark:from-[#ff4d00] dark:to-[#ff8c00] text-white font-headline font-black text-base overflow-hidden flex items-center gap-2 shadow-xl shadow-orange-500/10"
                                >
                                    View Experience <ArrowRight size={18} />
                                </motion.a>
                                <motion.a
                                    href="#projects"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 font-headline font-black text-sm text-foreground dark:text-[#e5e2e1] hover:border-cyan-500/30 dark:hover:border-[#ff4d00]/40 transition-colors"
                                >
                                    Projects
                                </motion.a>

                                <a
                                    href="https://drive.google.com/file/d/1K17iyrLkLaXjdFCfwDWIo6WSJqlwJDae/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => {
                                        fetch("/api/resume-download", {
                                            method: "POST",
                                            keepalive: true,
                                        }).catch(console.error);
                                    }}
                                    className="group flex flex-col gap-1 text-cyan-700 dark:text-[#ff4d00] font-headline font-black text-sm"
                                >
                                    <span className="tracking-tight">Get_Resume</span>
                                    <div className="w-0 h-0.5 bg-cyan-700 dark:bg-[#ff4d00] group-hover:w-full transition-all duration-500" />
                                </a>
                            </div>

                            <div className="flex flex-col gap-4 pt-4 border-t border-black/5 dark:border-white/5 w-fit">
                                <div className="flex items-center space-x-4">
                                    <motion.a
                                        ref={githubRef}
                                        onMouseMove={(e) => handleMagnetic(e, githubX, githubY, githubRef)}
                                        onMouseLeave={() => resetMagnetic(githubX, githubY)}
                                        style={{ x: githubX, y: githubY }}
                                        href="https://github.com/siddharthkaulagi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-white dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 text-muted-foreground dark:text-[#e5e2e1]/40 hover:text-cyan-600 dark:hover:text-[#ff4d00] transition-colors shadow-sm"
                                    >
                                        <Github size={20} />
                                    </motion.a>
                                    <motion.a
                                        ref={linkedinRef}
                                        onMouseMove={(e) => handleMagnetic(e, linkedinX, linkedinY, linkedinRef)}
                                        onMouseLeave={() => resetMagnetic(linkedinX, linkedinY)}
                                        style={{ x: linkedinX, y: linkedinY }}
                                        href="https://www.linkedin.com/in/siddharth-kaulagi-041ba4220/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-white dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 text-muted-foreground dark:text-[#e5e2e1]/40 hover:text-cyan-600 dark:hover:text-[#ff4d00] transition-colors shadow-sm"
                                    >
                                        <Linkedin size={20} />
                                    </motion.a>
                                </div>
                                <motion.button
                                    onClick={() => {
                                        const nextIdx = Math.floor(Math.random() * ONE_PIECE_QUOTES.length);
                                        setCurrentQuoteIndex(nextIdx);
                                        setIsWisdomOpen(true);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-black tracking-widest flex items-center gap-2 group transition-all"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    What Motivates Me
                                </motion.button>
                            </div>
                        </div>

                        {/* Interactive Terminal Box sits side-by-side with description on large screens */}
                        <div className="relative group w-full">
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-cyan-600 dark:bg-[#ff4d00] rounded-full z-20 shadow-lg">
                                <span className="text-[9px] uppercase font-black tracking-widest text-white whitespace-nowrap">SID_OS[CMD-Terminal]</span>
                            </div>

                            <motion.button
                                onClick={onTerminalOpen}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 77, 0, 0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 pt-10 rounded-[32px] bg-orange-50/30 dark:bg-[#ff4d00]/[0.05] backdrop-blur-md border border-[#ff4d00]/30 dark:border-[#ff4d00]/20 font-mono text-[9px] md:text-[10px] relative overflow-hidden text-left w-full hover:border-[#ff4d00]/60 transition-all duration-500 shadow-xl shadow-orange-500/5 dark:shadow-none"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/30 dark:bg-red-500/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/30 dark:bg-amber-500/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/30 dark:bg-emerald-500/20" />
                                    </div>
                                    <span className="text-[8px] text-[#ff4d00]/60 dark:text-[#ff4d00]/40 font-black uppercase tracking-[0.2em]">NODE:SID_OS</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 group/line hover:bg-black/5 dark:hover:bg-white/5 p-1 -ml-1 rounded transition-colors">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold shrink-0">Identity</span>
                                        <span className="text-black/20 dark:text-white/20">:</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-tight line-clamp-1">"Siddharth_K."</span>
                                    </div>
                                    <div className="flex items-center gap-2 group/line hover:bg-black/5 dark:hover:bg-white/5 p-1 -ml-1 rounded transition-colors">
                                        <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">Focus</span>
                                        <span className="text-black/20 dark:text-white/20">:</span>
                                        <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-tight line-clamp-1">SCM · LEAN · OPS</span>
                                    </div>
                                    <div className="flex items-center gap-2 group/line hover:bg-black/5 dark:hover:bg-white/5 p-1 -ml-1 rounded transition-colors">
                                        <span className="text-orange-600 dark:text-orange-400 font-bold shrink-0">Certs</span>
                                        <span className="text-black/20 dark:text-white/20">:</span>
                                        <span className="text-slate-600 dark:text-slate-300 font-bold uppercase tracking-tight line-clamp-1">6_VERIFIED</span>
                                    </div>

                                    <div className="pt-4 mt-2 border-t border-black/5 dark:border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff4d00]/10 dark:bg-[#ff4d00]/20 border border-[#ff4d00]/20">
                                                <span className="text-[#ff4d00] font-black animate-pulse text-[8px]">RUN</span>
                                                <span className="text-[#ff4d00] font-black uppercase tracking-[0.1em] text-[8px] underline decoration-[#ff4d00]/30 underline-offset-4">Launch_Terminal.cmd</span>
                                            </div>
                                            <div className="flex -space-x-1 overflow-hidden">
                                                <div className="inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-[#131212] bg-cyan-600 overflow-hidden">
                                                    <div className="w-full h-full opacity-50 bg-gradient-to-br from-white/20 to-transparent" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grid Pattern Overlay for technical feel */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="lg:col-span-4 relative group"
                >
                    <div className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden border-8 border-white dark:border-[#1c1b1b] shadow-2xl group-hover:rotate-1 transition-transform duration-[2000ms] ease-out">
                        <Image
                            alt="Siddharth Kaulagi"
                            src="/hero2.jpg"
                            fill
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5000ms]"
                            priority
                        />
                    </div>

                    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gradient-to-br dark:from-[#ff4d00] dark:to-[#ff8c00] p-5 rounded-3xl shadow-2xl border border-black/5 transform group-hover:-translate-y-2 transition-all duration-700">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="font-label text-[8px] uppercase tracking-[0.2em] text-emerald-500/80 dark:text-white font-black">Status: Active</span>
                        </div>
                        <div className="font-headline font-black text-sm text-emerald-600 dark:text-emerald-300 uppercase tracking-widest">Open for OPPORTUNITY.</div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isWisdomOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl pointer-events-auto"
                        onClick={() => setIsWisdomOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            transition={{ duration: 0.2 }}
                            className="max-w-2xl w-full bg-[#131212] border border-white/10 p-10 rounded-[40px] shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsWisdomOpen(false)}
                                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                                        <Quote size={24} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-500/60">Source of Motivation</span>
                                </div>

                                <div className="space-y-4">
                                    <p className="font-headline text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight italic">
                                        "{ONE_PIECE_QUOTES[currentQuoteIndex].text}"
                                    </p>
                                    <div className="flex items-center gap-4 pt-4">
                                        <span className="h-px w-12 bg-white/20" />
                                        <p className="font-label text-sm uppercase tracking-widest text-emerald-400 font-bold">
                                            {ONE_PIECE_QUOTES[currentQuoteIndex].author}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-8 mt-8 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-[8px] uppercase font-black tracking-widest text-white/20">
                                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        Quote will auto-close in 10s
                                    </div>
                                    <span className="text-[8px] text-white/20 uppercase tracking-tighter">System_Wisdom_v8.1.0</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
