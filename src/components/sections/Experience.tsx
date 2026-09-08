"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Building2,
    Calendar,
    ExternalLink,
    ArrowUpRight,
    FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    experiences,
    experienceSummary,
    RESUME_URL,
    type ExperienceCategory,
    type ExperienceItem,
} from "@/lib/portfolio-data";

type FilterKey = "all" | ExperienceCategory;

const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "learning", label: "Learning" },
    { key: "simulation", label: "Simulations" },
];

function ExperienceCard({
    exp,
    index,
    isLast,
}: {
    exp: ExperienceItem;
    index: number;
    isLast: boolean;
}) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative pl-8 md:pl-12"
        >
            <div
                className={cn(
                    "absolute left-0 top-10 w-4 h-4 rounded-full border-2 bg-background dark:bg-[#0f0f0f] z-10",
                    exp.category === "learning"
                        ? "border-cyan-500 dark:border-[#ffb59c]"
                        : "border-orange-500 dark:border-[#ff5f1f]"
                )}
            />
            {!isLast && (
                <div className="absolute left-[7px] top-[3.25rem] w-px h-[calc(100%+2.5rem)] bg-gradient-to-b from-cyan-500/40 via-orange-500/20 to-transparent dark:from-[#ff5f1f]/40" />
            )}

            <div className="relative p-8 md:p-10 rounded-[40px] bg-card dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl transition-shadow duration-500 h-full hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] hover:border-cyan-500/15 dark:hover:border-[#ff5f1f]/20">
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-orange-500/[0.04] dark:from-[#ff5f1f]/[0.06] dark:to-[#ffb59c]/[0.04]" />

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
                    <div className="relative h-48 lg:h-auto lg:min-h-[220px] lg:w-72 shrink-0 overflow-hidden rounded-[28px] border border-black/5 dark:border-white/5">
                        <Image
                            src={exp.image}
                            alt={`${exp.role} credential`}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <a
                            href={exp.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 p-3 rounded-xl bg-white dark:bg-[#ffb59c] text-black dark:text-[#5c1900] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-label="View credential"
                        >
                            <ArrowUpRight size={20} />
                        </a>
                    </div>

                    <div className="flex-1 space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131212] border border-black/5 dark:border-white/5">
                                    <exp.icon className={exp.color} size={28} />
                                </div>
                                <div>
                                    <h3 className="font-headline text-2xl md:text-3xl font-black text-foreground dark:text-[#e5e2e1] uppercase tracking-tighter leading-tight group-hover:text-cyan-600 dark:group-hover:text-[#ffb59c] transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="font-label text-[10px] uppercase tracking-widest font-black text-muted-foreground dark:text-[#e5e2e1]/50 mt-1 flex items-center gap-2">
                                        <Building2 size={12} />
                                        {exp.organization}
                                    </p>
                                </div>
                            </div>
                            <span
                                className={cn(
                                    "font-label text-[9px] uppercase tracking-widest font-black px-4 py-2 rounded-full border",
                                    exp.category === "learning"
                                        ? "bg-cyan-50 dark:bg-[#131212] text-cyan-700 dark:text-[#ffb59c] border-cyan-500/20 dark:border-[#ff5f1f]/20"
                                        : "bg-orange-50 dark:bg-[#131212] text-orange-700 dark:text-[#ff5f1f] border-orange-500/20 dark:border-[#ff5f1f]/20"
                                )}
                            >
                                {exp.type}
                            </span>
                        </div>

                        <p className="font-body text-sm text-muted-foreground dark:text-[#e5e2e1]/60 italic border-l-2 border-cyan-500/30 dark:border-[#ff5f1f]/30 pl-4">
                            {exp.focus}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.stack.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-label text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#131212] text-muted-foreground dark:text-[#e5e2e1]/50 border border-black/5 dark:border-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground dark:text-[#e5e2e1]/50">
                            <span className="font-label text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
                                <Calendar size={14} className={exp.color} />
                                {exp.period}
                            </span>
                            <a
                                href={exp.certificateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-label text-[10px] uppercase tracking-widest font-black flex items-center gap-2 text-cyan-600 dark:text-[#ffb59c] hover:underline"
                            >
                                <ExternalLink size={14} />
                                Credential
                            </a>
                        </div>

                        <ul className="space-y-3">
                            {exp.highlights.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="font-body text-muted-foreground dark:text-[#e5e2e1]/70 leading-relaxed text-sm md:text-base flex gap-3"
                                >
                                    <span className="text-cyan-600 dark:text-[#ff5f1f] font-black mt-1 shrink-0">
                                        ›
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export function Experience() {
    const [filter, setFilter] = useState<FilterKey>("all");

    const filtered = useMemo(() => {
        if (filter === "all") return experiences;
        return experiences.filter((e) => e.category === filter);
    }, [filter]);

    return (
        <section
            id="experience"
            className="relative py-40 bg-slate-50/50 dark:bg-[#0f0f0f] overflow-hidden scroll-mt-28 md:scroll-mt-32"
        >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <label className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-[#ffb59c] mb-4 block flex items-center gap-2">
                            <Briefcase size={14} />
                            Field_Deployment
                        </label>
                        <h2 className="font-headline text-5xl md:text-8xl font-black tracking-tight text-foreground dark:text-[#e5e2e1] uppercase leading-none">
                            WORK <span className="text-orange-600 dark:text-[#ff5f1f]">EXPERIENCE</span>
                        </h2>
                    </motion.div>

                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            fetch("/api/resume-download", {
                                method: "POST",
                                keepalive: true,
                            }).catch(console.error);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-gradient-to-r dark:from-[#ff4d00] dark:to-[#ff8c00] text-white font-headline font-black text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
                    >
                        <FileText size={18} />
                        Download Resume
                    </a>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                >
                    {[
                        { value: experienceSummary.learningPrograms, label: "Learning Program" },
                        { value: experienceSummary.virtualSimulations, label: "Forage Simulations" },
                        { value: experienceSummary.certifications, label: "Certifications" },
                        { value: "2026", label: "Latest Activity" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="p-5 rounded-2xl bg-white/80 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 text-center"
                        >
                            <p className="font-headline text-3xl font-black text-cyan-600 dark:text-[#ff5f1f]">
                                {stat.value}
                            </p>
                            <p className="font-label text-[9px] uppercase tracking-widest font-black text-muted-foreground dark:text-[#e5e2e1]/40 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setFilter(f.key)}
                            className={cn(
                                "font-label text-[10px] uppercase tracking-widest font-black px-5 py-2.5 rounded-full border transition-all duration-300",
                                filter === f.key
                                    ? "bg-cyan-600 dark:bg-[#ff4d00] text-white border-transparent shadow-lg"
                                    : "bg-white dark:bg-[#1c1b1b] text-muted-foreground dark:text-[#e5e2e1]/50 border-black/5 dark:border-white/5 hover:border-cyan-500/30"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 gap-10 lg:gap-12">
                            {filtered.map((exp, index) => (
                                <ExperienceCard
                                    key={exp.id}
                                    exp={exp}
                                    index={index}
                                    isLast={index === filtered.length - 1}
                                />
                            ))}
                        </div>
                    </AnimatePresence>
                </div>

                <p className="mt-12 text-center font-label text-[10px] uppercase tracking-widest text-muted-foreground dark:text-[#e5e2e1]/30">
                    Remote learning completed May 2026 ·{" "}
                    <Link href="#certificates" className="text-cyan-600 dark:text-[#ffb59c] hover:underline">
                        View all credentials
                    </Link>
                </p>
            </div>
        </section>
    );
}
