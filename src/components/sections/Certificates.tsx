"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight, FolderOpen } from "lucide-react";
import Image from "next/image";
import { MASTER_CERTIFICATES_FOLDER } from "@/lib/portfolio-data";

const certificates = [
    {
        title: "Lean Six Sigma White Belt",
        issuer: "The Council for Six Sigma Certification (CSSC) · Six Sigma Online",
        date: "Apr 2026",
        image: "/certificates/lean-six-sigma.png",
        description:
            "Completed Lean Six Sigma White Belt requirements aligned with CSSC standards, focusing on waste reduction, DMAIC problem-solving, and process improvement.",
        tags: ["Six Sigma", "Operations", "Lean"],
        link: "https://drive.google.com/file/d/1daBqPaVrRpSiWnuryYpndtuRmSFQ3_1M/view?usp=sharing",
    },
    {
        title: "Supply Chain Job Simulation",
        issuer: "GE Aerospace / GE Healthcare (Forage)",
        date: "Jan 2026",
        image: "/certificates/ge-aerospace-supply-chain.png",
        description:
            "Executed aerospace supply chain tasks covering GEnx-1B turbofan disassembly fixture requirements, BOM/GD&T review, and disposition of non-conforming turbine blades.",
        tags: ["SCM", "Aerospace", "BOM & GD&T"],
        link: "https://drive.google.com/file/d/1hLZb5NRx9oMa3Omhv6TCYdxajsVRo617/view?usp=sharing",
    },
    {
        title: "SAP S/4HANA Supply Chain",
        issuer: "SAP",
        date: "Jan 2026",
        image: "/certificates/sap-supply-chain-logistics.png",
        description:
            "Validated transportation management solutions using supported SAP S/4HANA supply chain processes, architecture, and logistics execution flows.",
        tags: ["SAP S/4HANA", "Transport", "Logistics"],
        link: "https://drive.google.com/file/d/1vW4ElA4km79gwgVxTPBS4A2K7b2mxPqS/view?usp=drive_link",
    },
    {
        title: "AI Systems Learning Program",
        issuer: "Innomatics Research Labs",
        date: "May 2026",
        image: "/certificates/innomatics-agentic-ai.png",
        description:
            "Completed structured remote internship track covering Python, FastAPI, prompt engineering, LangChain, and RAG fundamentals (Feb–May 2026).",
        tags: ["Python", "FastAPI", "LangChain"],
        link: "https://drive.google.com/file/d/11Af7ZMEhsMjC0E5Melpq87Ouy46ujK9p/view?usp=sharing",
    },
    {
        title: "Operations Job Simulation",
        issuer: "Goldman Sachs (Forage)",
        date: "Jan 2026",
        image: "/certificates/goldman-sachs-operations.png",
        description:
            "Completed practical tasks in foundations of operations and facilitating ultra-high-net-worth financial transactions.",
        tags: ["Operations", "Finance", "Process Review"],
        link: "https://drive.google.com/file/d/1w6zlVwB0M-0c1axD_nJDzPf3HgAR-D6u/view?usp=drive_link",
    },
    {
        title: "Data Visualisation Insights",
        issuer: "Tata Group (Forage)",
        date: "Jan 2026",
        image: "/certificates/tata-data-visualisation.png",
        description:
            "Completed practical tasks in framing business scenarios, choosing executive visuals, and communicating actionable insights.",
        tags: ["Data Vis", "Analytics", "Insights"],
        link: "https://drive.google.com/file/d/1zbapiP-Um0fpoRwEfpWtstppRY-qKFgf/view?usp=drive_link",
    },
];

export function Certificates() {
    return (
        <section id="certificates" className="relative py-32 bg-transparent overflow-hidden scroll-mt-24">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 block">
                            Official_Accreditation // 06 Verified
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
                            CERTIFI<span className="text-[#C85A32]">CATIONS</span>
                        </h2>
                    </motion.div>

                    <a
                        href={MASTER_CERTIFICATES_FOLDER}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111412] dark:bg-[#74C69D] text-white dark:text-[#081C15] font-mono text-xs font-bold uppercase tracking-wider shadow-md"
                    >
                        <FolderOpen size={16} />
                        View All in Google Drive ↗
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.05 }}
                            className="group relative flex flex-col justify-between p-7 rounded-[32px] bg-white dark:bg-[#171B18] border border-black/12 dark:border-white/12 shadow-xl hover:border-[#2D6A4F] transition-all crosshair-card"
                        >
                            <div>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block h-52 w-full mb-6 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#F6F4EE] dark:bg-[#111412]"
                                >
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        quality={95}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-[#111412] text-white shadow-lg">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </a>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] font-mono text-[9px] uppercase tracking-widest font-bold">
                                            <ShieldCheck size={12} /> Verified
                                        </span>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                                            {cert.date}
                                        </span>
                                    </div>

                                    <h3 className="font-headline text-2xl font-black text-foreground uppercase tracking-tight">
                                        {cert.title}
                                    </h3>

                                    <p className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#C85A32]">
                                        {cert.issuer}
                                    </p>

                                    <p className="font-body text-muted-foreground leading-relaxed text-sm">
                                        {cert.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                                {cert.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 bg-[#F6F4EE] dark:bg-[#111412] rounded-lg border border-black/10 dark:border-white/10"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
