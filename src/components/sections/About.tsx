"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, School, Award, Bolt } from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutBackground } from "@/components/AboutBackground";

const educationData = [
    {
        title: "B.E. Industrial Engineering & Management",
        institution: "BMS College of Engineering, Bengaluru",
        year: "Expected 2026",
        score: "GPA: 8.18",
        icon: GraduationCap,
        color: "text-cyan-400 dark:text-[#ffb59c]",
        glowColor: "rgba(6, 182, 212, 0.1)"
    },
    {
        title: "12th Grade (PUC)",
        institution: "PRISM PU College Dharwad",
        year: "Completed",
        score: "96%",
        icon: School,
        color: "text-orange-400 dark:text-[#ffb59c]",
        glowColor: "rgba(255, 95, 31, 0.1)"
    },
    {
        title: "10th Grade",
        institution: "Rashtriya English Medium High School, Belagavi",
        year: "Completed",
        score: "93.44%",
        icon: Award,
        color: "text-blue-400 dark:text-[#ffb59c]",
        glowColor: "rgba(255, 181, 156, 0.1)"
    },
];

function AboutCard({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), { damping: 20, stiffness: 150 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), { damping: 20, stiffness: 150 });

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
            <div className="relative p-10 rounded-[32px] bg-white dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 backdrop-blur-xl h-full flex flex-col overflow-hidden shadow-2xl transition-all duration-700">
                <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(circle 400px at ${mouseX.get() + 200}px ${mouseY.get() + 300}px, ${glowColor}, transparent)`,
                        inset: -200
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
}

export function About() {
    return (
        <section id="about" className="relative py-40 bg-background dark:bg-[#131313] overflow-hidden">
            <AboutBackground />
            
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-20 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-[#ffb59c] mb-4 block">System_Identity</label>
                        <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tight text-foreground dark:text-[#e5e2e1] uppercase leading-none">
                            BUILDER <span className="text-orange-600 dark:text-[#ff5f1f]">PROFILE</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 perspective-[2000px]">
                    <div className="space-y-12">
                        <AboutCard glowColor="rgba(6, 182, 212, 0.15)">
                            <div className="flex items-start justify-between mb-10 relative z-10">
                                <h3 className="font-headline text-4xl font-black text-foreground dark:text-[#e5e2e1] tracking-tighter uppercase">My Journey</h3>
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#201f1f] shadow-inner border border-black/5 dark:border-white/5 group-hover:rotate-12 transition-transform duration-500">
                                    <Bolt className="text-cyan-500 dark:text-[#ff5f1f]" size={32} />
                                </div>
                            </div>
                            <div className="space-y-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
                                <p className="font-body text-muted-foreground dark:text-[#e5e2e1]/70 leading-relaxed text-lg">
                                    I am an <strong className="text-foreground dark:text-white">Industrial Engineering & Management</strong> student with a passion for optimizing the physical world through digital intelligence.
                                </p>
                                <p className="font-body text-muted-foreground dark:text-[#e5e2e1]/70 leading-relaxed text-lg">
                                    Interested in <strong className="text-cyan-600 dark:text-cyan-400">supply chain orchestration</strong>, <strong className="text-orange-600 dark:text-[#ff5f1f]">Lean Manufacturing</strong>, <strong className="text-blue-600 dark:text-[#ffb59c]">Project Management</strong>, and <strong className="text-blue-600 dark:text-[#ffb59c]">Data-Driven Decision Systems</strong>.
                                </p>
                            </div>
                        </AboutCard>

                        <motion.div
                            whileHover={{ scale: 1.02, rotate: -1 }}
                            className="bg-cyan-600 dark:bg-gradient-to-br dark:from-[#ffb59c] dark:to-[#ff5f1f] p-12 rounded-[40px] text-white dark:text-[#5c1900] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            <h4 className="font-headline text-3xl font-black mb-6 relative z-10 uppercase tracking-tighter">Current Deployment</h4>
                            <p className="font-body text-xl opacity-90 relative z-10 font-medium leading-relaxed">
                                Designing URIP—a smart retail decision engine that unites forecasting, GIS store mapping, and layout optimization into a unified industrial platform.
                            </p>
                        </motion.div>
                    </div>

                    <div className="space-y-10">
                        {educationData.map((edu, index) => (
                            <AboutCard key={index} glowColor={edu.glowColor}>
                                <div className="flex items-start gap-8 relative z-10">
                                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#201f1f] border border-black/5 dark:border-white/5 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-500">
                                        <edu.icon size={32} className={edu.color} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-headline text-2xl font-black text-foreground dark:text-[#e5e2e1] group-hover:text-cyan-600 dark:group-hover:text-[#ffb59c] transition-colors leading-tight">
                                                {edu.title}
                                            </h4>
                                        </div>
                                        <p className="text-muted-foreground dark:text-[#e5e2e1]/60 font-bold mb-6 text-sm uppercase tracking-widest">{edu.institution}</p>
                                        <div className="flex items-center gap-6 pt-6 border-t border-black/5 dark:border-white/5 mt-4">
                                            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:text-[#e5e2e1]/40 font-black">{edu.year}</span>
                                            <span className={cn("font-headline font-black text-lg", edu.color)}>{edu.score}</span>
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
