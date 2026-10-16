"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowRight, X, Quote, Sliders, FileText } from "lucide-react";
import Image from "next/image";
import { ONE_PIECE_QUOTES } from "@/components/Terminal";
import { VisitorCounter } from "@/components/VisitorCounter";
import { RESUME_URL, specializedResumes } from "@/lib/portfolio-data";

export function Hero({
    isTerminalOpen,
    onTerminalOpen,
    onTerminalClose,
}: {
    isTerminalOpen: boolean;
    onTerminalOpen: () => void;
    onTerminalClose: () => void;
}) {
    const [isWisdomOpen, setIsWisdomOpen] = useState(false);
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const githubX = useSpring(0, { damping: 12, stiffness: 150 });
    const githubY = useSpring(0, { damping: 12, stiffness: 150 });
    const linkedinX = useSpring(0, { damping: 12, stiffness: 150 });
    const linkedinY = useSpring(0, { damping: 12, stiffness: 150 });

    const githubRef = useRef<HTMLAnchorElement>(null);
    const linkedinRef = useRef<HTMLAnchorElement>(null);

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
        springX.set((clientX - centerX) * 0.45);
        springY.set((clientY - centerY) * 0.45);
    }

    function resetMagnetic(springX: any, springY: any) {
        springX.set(0);
        springY.set(0);
    }

    function notifyResumeDownload() {
        fetch("/api/resume-download", {
            method: "POST",
            keepalive: true,
        }).catch(console.error);
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden bg-transparent"
        >
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 w-full mt-4 lg:mt-0">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-8 z-10 space-y-6 bg-white/90 dark:bg-[#171B18]/90 backdrop-blur-xl p-7 sm:p-10 md:p-12 rounded-[36px] border border-black/12 dark:border-white/12 shadow-xl crosshair-card"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                        <label className="font-mono text-[10px] uppercase tracking-[0.35em] font-bold text-[#2D6A4F] dark:text-[#74C69D] flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D] animate-ping" />
                            System_Identity_Active // IEM-2026
                        </label>
                        <VisitorCounter />
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] text-foreground">
                            I&apos;m{" "}
                            <span className="text-[#2D6A4F] dark:text-[#74C69D] underline decoration-[#C85A32]/50 decoration-4 underline-offset-8">
                                SIDDHARTH
                            </span>
                            <br />
                            <span className="text-3xl sm:text-5xl lg:text-6xl block mt-3 text-foreground/85">
                                Industrial Engineer<span className="text-[#C85A32]">.</span>
                            </span>
                        </h1>
                        <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground max-w-2xl leading-relaxed pt-1">
                            Supply Chain Analytics · Inventory Optimization (ABC/XYZ) · Procurement &amp; Operations · Lean Six Sigma · AI-Assisted Systems
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4 border-t border-black/10 dark:border-white/10">
                        <div className="md:col-span-7 space-y-5">
                            <p className="font-body text-base lg:text-lg text-muted-foreground leading-relaxed">
                                Optimizing complex physical and logistics networks through{" "}
                                <span className="text-foreground font-bold">supply chain intelligence</span>,{" "}
                                <span className="text-foreground font-bold">lean operations</span>, and{" "}
                                <span className="text-foreground font-bold">data-driven decision engines</span>.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {["Supply Chain", "Inventory Optimization", "Procurement Ops", "Lean Six Sigma", "Open to Roles"].map((chip) => (
                                    <span
                                        key={chip}
                                        className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 text-foreground/80"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <motion.a
                                    href="#simulations"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-5 py-3 rounded-xl bg-[#2D6A4F] dark:bg-[#74C69D] text-white dark:text-[#081C15] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md"
                                >
                                    <Sliders size={15} />
                                    Live Simulators
                                </motion.a>
                                <motion.a
                                    href="#projects"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-5 py-3 rounded-xl bg-[#111412] dark:bg-white text-[#F6F4EE] dark:text-[#111412] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                                >
                                    Projects <ArrowRight size={15} />
                                </motion.a>

                                <button
                                    type="button"
                                    onClick={() => {
                                        notifyResumeDownload();
                                        setIsResumeModalOpen(true);
                                    }}
                                    className="px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-[#F6F4EE] dark:bg-[#111412] font-mono font-bold text-xs uppercase tracking-wider text-[#C85A32] hover:border-[#C85A32] transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                    <FileText size={14} />
                                    Get_Resume (4 Tracks)
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/10 dark:border-white/10">
                                <motion.a
                                    ref={githubRef}
                                    onMouseMove={(e) => handleMagnetic(e, githubX, githubY, githubRef)}
                                    onMouseLeave={() => resetMagnetic(githubX, githubY)}
                                    style={{ x: githubX, y: githubY }}
                                    href="https://github.com/siddharthkaulagi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 text-foreground hover:border-[#2D6A4F] transition-colors"
                                >
                                    <Github size={18} />
                                </motion.a>
                                <motion.a
                                    ref={linkedinRef}
                                    onMouseMove={(e) => handleMagnetic(e, linkedinX, linkedinY, linkedinRef)}
                                    onMouseLeave={() => resetMagnetic(linkedinX, linkedinY)}
                                    style={{ x: linkedinX, y: linkedinY }}
                                    href="https://www.linkedin.com/in/siddharth-kaulagi-041ba4220/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 text-foreground hover:border-[#2D6A4F] transition-colors"
                                >
                                    <Linkedin size={18} />
                                </motion.a>

                                <motion.button
                                    type="button"
                                    onClick={() => {
                                        const nextIdx = Math.floor(Math.random() * ONE_PIECE_QUOTES.length);
                                        setCurrentQuoteIndex(nextIdx);
                                        setIsWisdomOpen(true);
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    className="px-4 py-2.5 rounded-xl bg-[#D8F3DC] dark:bg-[#1B4332] border border-[#2D6A4F]/30 text-[#1B4332] dark:text-[#D8F3DC] font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D] animate-pulse" />
                                    What Motivates Me
                                </motion.button>
                            </div>
                        </div>

                        {/* Interactive SID_OS [CMD-Terminal] Box */}
                        <div className="md:col-span-5 relative group w-full">
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-[#2D6A4F] dark:bg-[#74C69D] rounded-full z-20 shadow">
                                <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-white dark:text-[#081C15] whitespace-nowrap">
                                    SID_OS [CMD-Terminal]
                                </span>
                            </div>

                            <motion.button
                                type="button"
                                onClick={onTerminalOpen}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 pt-9 rounded-3xl bg-[#111412] text-[#F6F4EE] border border-black/20 dark:border-white/15 font-mono text-xs relative overflow-hidden text-left w-full hover:border-[#74C69D] transition-all duration-300 shadow-xl cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#C85A32]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#74C69D]" />
                                    </div>
                                    <span className="text-[9px] text-[#74C69D] font-bold uppercase tracking-widest">
                                        NODE:SID_OS
                                    </span>
                                </div>

                                <div className="space-y-2.5 text-[11px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#74C69D] font-bold">Identity:</span>
                                        <span className="text-white font-semibold">&quot;Siddharth R Kaulagi&quot;</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-300 font-bold">Focus:</span>
                                        <span className="text-white/90">SCM · LEAN · BI · IOT</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#E07A5F] font-bold">Commands:</span>
                                        <span className="text-white/80">projects, hustle, motivate...</span>
                                    </div>

                                    <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                                        <span className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] text-white font-bold uppercase tracking-wider text-[10px] underline decoration-white/40 underline-offset-4">
                                            RUN Launch_Terminal.cmd
                                        </span>
                                        <span className="text-[10px] text-white/50">Click to open →</span>
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Right 4 Columns: RESTORED FULL-RESOLUTION USER PORTRAIT (/hero2.jpg) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="lg:col-span-4 relative group"
                >
                    <div className="bg-white dark:bg-[#171B18] p-4 sm:p-5 rounded-[36px] border border-black/15 dark:border-white/15 shadow-2xl crosshair-card">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10 font-mono text-[10px] uppercase tracking-wider">
                            <span className="font-bold text-[#2D6A4F] dark:text-[#74C69D]">PORTRAIT // SRK-08</span>
                            <span className="px-2.5 py-0.5 rounded bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] font-bold">
                                BMSCE · CGPA 8.18
                            </span>
                        </div>
                        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10">
                            <Image
                                alt="Siddharth R Kaulagi"
                                src="/hero2.jpg"
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                quality={95}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                                priority
                            />
                        </div>
                    </div>

                    <div className="absolute -bottom-5 -left-4 bg-white dark:bg-[#1B4332] p-4 sm:p-5 rounded-2xl shadow-xl border border-black/10 dark:border-white/15 transform group-hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D] animate-ping" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#2D6A4F] dark:text-[#D8F3DC] font-bold">
                                Status: Active
                            </span>
                        </div>
                        <div className="font-headline font-black text-xs sm:text-sm text-foreground dark:text-white uppercase tracking-wider">
                            Open for SCM, Ops &amp; Analyst Roles
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Wisdom Modal */}
            <AnimatePresence>
                {isWisdomOpen && (
                    <div
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md pointer-events-auto"
                        onClick={() => setIsWisdomOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-[#FDFCF9] dark:bg-[#171B18] border border-black/15 dark:border-white/15 p-8 sm:p-10 rounded-[36px] shadow-2xl relative"
                        >
                            <button
                                type="button"
                                onClick={() => setIsWisdomOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-[#D8F3DC] dark:bg-[#1B4332] text-[#2D6A4F] dark:text-[#74C69D]">
                                        <Quote size={22} />
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] font-bold text-[#2D6A4F] dark:text-[#74C69D]">
                                        Source of Motivation
                                    </span>
                                </div>

                                <p className="font-headline text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight italic">
                                    &ldquo;{ONE_PIECE_QUOTES[currentQuoteIndex].text}&rdquo;
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                                    <p className="font-mono text-xs uppercase tracking-widest text-[#C85A32] font-bold">
                                        — {ONE_PIECE_QUOTES[currentQuoteIndex].author}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCurrentQuoteIndex((prev) => (prev + 1) % ONE_PIECE_QUOTES.length)
                                        }
                                        className="px-4 py-2 rounded-xl bg-[#111412] dark:bg-[#74C69D] text-white dark:text-[#081C15] font-mono text-xs font-bold uppercase cursor-pointer"
                                    >
                                        Next Quote →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 4 Specialized Resumes Modal */}
            <AnimatePresence>
                {isResumeModalOpen && (
                    <div
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md pointer-events-auto"
                        onClick={() => setIsResumeModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 15 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-[#FDFCF9] dark:bg-[#171B18] border border-black/15 dark:border-white/15 p-8 rounded-[36px] shadow-2xl relative space-y-6"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#2D6A4F] dark:text-[#74C69D] font-bold block">
                                        Role-Specific Credentials
                                    </span>
                                    <h3 className="font-headline text-2xl font-black uppercase">
                                        Download Specialized Resume
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsResumeModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {specializedResumes.map((r) => (
                                    <a
                                        key={r.id}
                                        href={r.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={notifyResumeDownload}
                                        className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 hover:border-[#2D6A4F] transition-all space-y-1.5 group"
                                    >
                                        <div className="font-headline font-bold text-base group-hover:text-[#2D6A4F] dark:group-hover:text-[#74C69D]">
                                            {r.title} ↗
                                        </div>
                                        <p className="font-mono text-[10px] text-muted-foreground">{r.role}</p>
                                    </a>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={notifyResumeDownload}
                                    className="px-5 py-3 rounded-xl bg-[#2D6A4F] text-white font-mono text-xs font-bold uppercase tracking-wider"
                                >
                                    Open Primary Resume on Google Drive ↗
                                </a>
                                <span className="font-mono text-[10px] text-muted-foreground">
                                    Resend Download Notification Enabled
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
