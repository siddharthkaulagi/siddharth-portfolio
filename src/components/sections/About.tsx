"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, School, Award, Bolt, Users, Medal, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutBackground } from "@/components/AboutBackground";

const educationData = [
    {
        title: "B.E. Industrial Engineering & Management",
        institution: "B.M.S. College of Engineering, Bengaluru",
        year: "Expected Aug 2026",
        score: "CGPA: 8.18",
        icon: GraduationCap,
        color: "text-[#2D6A4F] dark:text-[#74C69D]",
        glowColor: "rgba(45, 106, 79, 0.12)",
    },
    {
        title: "Pre-University Course (Class XII / PUC)",
        institution: "PRISM PU Science College, Dharwad",
        year: "Completed 2021",
        score: "96%",
        icon: School,
        color: "text-[#C85A32] dark:text-[#E07A5F]",
        glowColor: "rgba(200, 90, 50, 0.12)",
    },
    {
        title: "10th Grade (SSLC)",
        institution: "Rashtriya English Medium High School, Belagavi",
        year: "Completed",
        score: "93.44%",
        icon: Award,
        color: "text-[#1B4332] dark:text-[#95D5B2]",
        glowColor: "rgba(45, 106, 79, 0.10)",
    },
];

function AboutCard({
    children,
    className,
    glowColor,
}: {
    children: React.ReactNode;
    className?: string;
    glowColor: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [4, -4]), {
        damping: 20,
        stiffness: 150,
    });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-4, 4]), {
        damping: 20,
        stiffness: 150,
    });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - (rect.left + rect.width / 2));
        mouseY.set(e.clientY - (rect.top + rect.height / 2));
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={cn("group relative", className)}
        >
            <div className="relative p-8 sm:p-10 rounded-[32px] bg-white dark:bg-[#171B18] border border-black/12 dark:border-white/12 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-xl transition-all duration-500 hover:border-[#2D6A4F] crosshair-card">
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle 400px at ${mouseX.get() + 200}px ${mouseY.get() + 300}px, ${glowColor}, transparent)`,
                        inset: -200,
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
}

export function About() {
    return (
        <section id="about" className="relative py-32 bg-transparent overflow-hidden scroll-mt-24">
            <AboutBackground />

            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 block">
                            System_Identity // Academic &amp; Leadership
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
                            BUILDER <span className="text-[#C85A32]">PROFILE</span>
                        </h2>
                    </motion.div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        Languages: English · Kannada · Hindi
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
                    <div className="space-y-8">
                        <AboutCard glowColor="rgba(45, 106, 79, 0.14)">
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <h3 className="font-headline text-3xl font-black text-foreground tracking-tight uppercase">
                                    My Engineering Journey
                                </h3>
                                <div className="p-3.5 rounded-2xl bg-[#D8F3DC] dark:bg-[#1B4332] border border-[#2D6A4F]/20">
                                    <Bolt className="text-[#2D6A4F] dark:text-[#74C69D]" size={26} />
                                </div>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <p className="font-body text-muted-foreground leading-relaxed text-base sm:text-lg">
                                    I am an <strong className="text-foreground">Industrial Engineering &amp; Management</strong> student at{" "}
                                    <strong className="text-foreground">B.M.S. College of Engineering, Bengaluru</strong> with a passion for optimizing the physical world through digital intelligence.
                                </p>
                                <p className="font-body text-muted-foreground leading-relaxed text-base sm:text-lg">
                                    Focused on{" "}
                                    <strong className="text-[#2D6A4F] dark:text-[#74C69D]">supply chain orchestration</strong>,{" "}
                                    <strong className="text-[#C85A32]">inventory optimization (ABC/XYZ/FSN &amp; PFEP)</strong>,{" "}
                                    <strong className="text-foreground">Lean Six Sigma</strong>,{" "}
                                    <strong className="text-foreground">Project Management</strong>, and{" "}
                                    <strong className="text-[#2D6A4F] dark:text-[#74C69D]">AI-Assisted Decision Systems</strong>.
                                </p>
                            </div>
                        </AboutCard>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="bg-[#1B4332] dark:bg-[#2D6A4F] p-9 rounded-[32px] text-[#F6F4EE] shadow-xl relative overflow-hidden group border border-[#74C69D]/30"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded bg-white/10 text-[#D8F3DC] font-bold inline-block mb-4">
                                Current Deployment // Production
                            </span>
                            <h4 className="font-headline text-2xl sm:text-3xl font-black mb-3 relative z-10 uppercase tracking-tight">
                                Unified Retail Intelligence Platform (URIP)
                            </h4>
                            <p className="font-body text-base sm:text-lg opacity-90 relative z-10 leading-relaxed">
                                Designed and shipped a smart retail &amp; supply chain decision engine uniting ML demand forecasting, ABC/XYZ/FSN inventory classification, GIS store mapping, and ARC facility layout optimization into a unified platform.
                            </p>
                        </motion.div>

                        <AboutCard glowColor="rgba(200, 90, 50, 0.12)">
                            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#C85A32] mb-4">
                                Leadership, Athletics &amp; Interests
                            </h4>
                            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <Users size={18} className="text-[#2D6A4F] dark:text-[#74C69D] shrink-0 mt-1" />
                                    <span>
                                        <strong className="text-foreground">Volunteer Coordinator, TOPS Convention 2024</strong> — Indian Society for Quality (ISQ) at BMSCE; coordinated logistics for department and college-level technical and cultural committees.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Medal size={18} className="text-[#C85A32] shrink-0 mt-1" />
                                    <span>
                                        <strong className="text-foreground">Athletics:</strong> State-level Karate and Badminton player.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <PenTool size={18} className="text-[#2D6A4F] dark:text-[#74C69D] shrink-0 mt-1" />
                                    <span>
                                        <strong className="text-foreground">Creative Interests:</strong> Creative Writing, Sketching &amp; Illustration.
                                    </span>
                                </li>
                            </ul>
                        </AboutCard>
                    </div>

                    <div className="space-y-7">
                        {educationData.map((edu, index) => (
                            <AboutCard key={index} glowColor={edu.glowColor}>
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 shrink-0">
                                        <edu.icon size={28} className={edu.color} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-headline text-xl sm:text-2xl font-black text-foreground leading-tight">
                                            {edu.title}
                                        </h4>
                                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold mt-1.5">
                                            {edu.institution}
                                        </p>
                                        <div className="flex items-center justify-between gap-4 pt-5 border-t border-black/10 dark:border-white/10 mt-5">
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                                                {edu.year}
                                            </span>
                                            <span className={cn("font-mono font-bold text-sm px-3 py-1 rounded-full bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10", edu.color)}>
                                                {edu.score}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </AboutCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
