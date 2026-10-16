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
    { key: "all", label: "All (3)" },
    { key: "simulation", label: "Job Simulations (2)" },
    { key: "learning", label: "AI Internship (1)" },
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
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative pl-7 md:pl-11"
        >
            <div
                className={cn(
                    "absolute left-0 top-10 w-4 h-4 rounded-full border-2 bg-[#F6F4EE] dark:bg-[#111412] z-10",
                    exp.category === "learning"
                        ? "border-[#C85A32]"
                        : "border-[#2D6A4F] dark:border-[#74C69D]"
                )}
            />
            {!isLast && (
                <div className="absolute left-[7px] top-[3.25rem] w-px h-[calc(100%+2rem)] bg-gradient-to-b from-[#2D6A4F]/40 via-[#C85A32]/25 to-transparent" />
            )}

            <div className="relative p-7 md:p-9 rounded-[36px] bg-white dark:bg-[#171B18] border border-black/12 dark:border-white/12 shadow-xl transition-all duration-300 hover:border-[#2D6A4F] crosshair-card">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative z-10">
                    <div className="relative h-48 lg:h-auto lg:min-h-[220px] lg:w-72 shrink-0 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#F6F4EE] dark:bg-[#111412]">
                        <Image
                            src={exp.image}
                            alt={`${exp.role} credential`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 288px"
                            quality={95}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <a
                            href={exp.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-[#111412] text-white shadow-lg"
                            aria-label="View credential"
                        >
                            <ArrowUpRight size={18} />
                        </a>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <exp.icon className={exp.color} size={24} />
                                </div>
                                <div>
                                    <h3 className="font-headline text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
                                        {exp.role}
                                    </h3>
                                    <p className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#C85A32] mt-1 flex items-center gap-2">
                                        <Building2 size={13} />
                                        {exp.organization}
                                    </p>
                                </div>
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] border border-[#2D6A4F]/25">
                                {exp.type}
                            </span>
                        </div>

                        <p className="font-mono text-xs sm:text-sm text-muted-foreground italic border-l-2 border-[#2D6A4F] pl-4">
                            {exp.focus}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {exp.stack.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-lg bg-[#F6F4EE] dark:bg-[#111412] text-foreground/80 border border-black/10 dark:border-white/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                            <span className="font-mono text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5">
                                <Calendar size={14} className={exp.color} />
                                {exp.period}
                            </span>
                            <a
                                href={exp.certificateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 text-[#2D6A4F] dark:text-[#74C69D] underline"
                            >
                                <ExternalLink size={13} />
                                Verify Credential
                            </a>
                        </div>

                        <ul className="space-y-2.5 pt-1">
                            {exp.highlights.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="font-body text-foreground/85 leading-relaxed text-sm md:text-base flex gap-3"
                                >
                                    <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold shrink-0">
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
            className="relative py-32 bg-transparent overflow-hidden scroll-mt-24"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 flex items-center gap-2">
                            <Briefcase size={14} />
                            Field_Deployment // Industry Simulations &amp; Internships
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
                            WORK <span className="text-[#2D6A4F] dark:text-[#74C69D]">EXPERIENCE</span>
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
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#111412] dark:bg-[#74C69D] text-white dark:text-[#081C15] font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 shadow-md"
                    >
                        <FileText size={16} />
                        Download Official Resume
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { value: experienceSummary.learningPrograms, label: "AI Internship Track" },
                        { value: experienceSummary.virtualSimulations, label: "Industry Simulations" },
                        { value: experienceSummary.certifications, label: "Verified Credentials" },
                        { value: "2026", label: "Graduation Year" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="p-5 rounded-2xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10 text-center shadow-sm"
                        >
                            <p className="font-headline text-3xl font-black text-[#2D6A4F] dark:text-[#74C69D]">
                                {stat.value}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2.5 mb-10">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setFilter(f.key)}
                            className={cn(
                                "font-mono text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-xl border transition-all cursor-pointer",
                                filter === f.key
                                    ? "bg-[#2D6A4F] dark:bg-[#74C69D] text-white dark:text-[#081C15] border-transparent shadow"
                                    : "bg-white dark:bg-[#171B18] text-muted-foreground border-black/10 dark:border-white/10 hover:border-[#2D6A4F]"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 gap-8">
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

                <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    All credentials verified ·{" "}
                    <Link href="#certificates" className="text-[#2D6A4F] dark:text-[#74C69D] font-bold underline">
                        Inspect all 6 certificates below
                    </Link>
                </p>
            </div>
        </section>
    );
}
