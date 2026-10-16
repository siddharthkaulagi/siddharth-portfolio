"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    FileSpreadsheet,
    ExternalLink,
    Cpu,
    Box,
    Activity,
    BarChart3,
    ArrowUpRight,
    Terminal,
    ChevronLeft,
    ChevronRight,
    Sliders,
    FolderOpen,
    X,
} from "lucide-react";
import Image from "next/image";
import { ProjectsBackground } from "@/components/ProjectsBackground";

const projects = [
    {
        id: "01",
        title: "Supply Chain & Distribution Analytics System",
        fullName: "10-Module Excel Planning & What-If Simulator (8 Vendor Nodes · 320+ Orders)",
        description:
            "Built a 10-module supply chain analytics system in Excel analyzing demand and supply plans across 8 vendor nodes and 320+ orders; investigated abnormal demand and inventory signals using moving average and exponential smoothing forecasting with MAPE tracking.",
        bullets: [
            "Developed KPI dashboards tracking on-time delivery (94.1%), inventory turnover (7.2x), fill rate (96.7%), and forecast accuracy; interpreted KPI gaps to identify root causes.",
            "Built a what-if scenario simulator to model inventory optimization trade-offs and supply plan adjustments under changing demand, lead time, and safety stock assumptions.",
        ],
        tags: ["Advanced Excel", "Demand Forecasting", "MAPE Tracking", "ABC Classification", "What-If Simulator"],
        icon: FileSpreadsheet,
        color: "text-[#2D6A4F] dark:text-[#74C69D]",
        simTab: "scm" as const,
        buttons: [
            {
                label: "View on GitHub",
                url: "https://github.com/siddharthkaulagi/Supply-Chain-Distribution-Analytics-System",
                icon: Github,
            },
            {
                label: "Open Live Excel Model",
                url: "https://docs.google.com/spreadsheets/d/1fNza5kbReAPmuFcVTkipJ_GS-A722slh/edit?usp=sharing",
                icon: FileSpreadsheet,
            },
        ],
        image: "/projects/sc-isometric-clean.jpg",
        origImage: "/projects/supply-chain-analytics.png",
        details: ["10 Modules", "8 Vendor Nodes", "320+ Orders", "MAPE & ABC-XYZ"],
    },
    {
        id: "02",
        title: "Unified Retail Intelligence Platform (URIP)",
        fullName: "AI-Assisted End-to-End Retail & Supply Chain Decision Platform",
        description:
            "Designed and deployed an end-to-end supply chain & retail analytics platform covering ML demand forecasting (Prophet/XGBoost), ABC/XYZ/FSN inventory classification, replenishment planning, geospatial store location analysis (GIS), and Activity Relationship Chart (ARC) facility layout planning.",
        bullets: [
            "Integrated demand signals, inventory data, and supplier inputs into a unified planning dashboard with natural-language querying and automated repeatable reporting.",
            "Built independently using Claude, Antigravity, Gemini, and Kimi K2 as primary build tools.",
        ],
        tags: ["Python", "Streamlit", "ML Forecasting", "ABC/XYZ/FSN", "GIS Mapping", "Claude & Gemini"],
        icon: Activity,
        color: "text-[#C85A32] dark:text-[#E07A5F]",
        buttons: [
            {
                label: "Launch Live App",
                url: "https://ezka6yaugf2sn7vkfbbbts.streamlit.app/",
                icon: ExternalLink,
            },
            {
                label: "View on GitHub",
                url: "https://github.com/siddharthkaulagi/Unified-Retail-Intelligence-Platform-URIP-",
                icon: Github,
            },
        ],
        image: "/projects/urip-isometric-clean.jpg",
        origImage: "/projects/urip-dashboard.png",
        details: ["ML Demand Forecasting", "ABC/XYZ/FSN", "GIS Store Mapping", "ARC Facility Layout"],
    },
    {
        id: "03",
        title: "Global Supplier Transition & Inventory BI",
        fullName: "Power BI & DAX Supply Chain Performance Suite (8 Nodes)",
        description:
            "Analyzed supply chain performance data across 8 nodes using Power BI dashboards with custom DAX measures; interpreted KPIs covering inventory turnover (23.47), Days Sales of Inventory (15.56), warehouse utilization (34.08%), on-time delivery, and cost variance.",
        bullets: [
            "Applied ABC-XYZ inventory classification to optimize planning parameters and refine safety stock levels; documented analytical findings for stakeholder review.",
        ],
        tags: ["Power BI", "DAX Measures", "ABC-XYZ", "Inventory Optimization"],
        icon: BarChart3,
        color: "text-[#2D6A4F] dark:text-[#74C69D]",
        buttons: [
            {
                label: "View Power BI Repo",
                url: "https://github.com/siddharthkaulagi/Inventory-and-supply-chain-Management-Analysis",
                icon: Github,
            },
        ],
        image: "/projects/inventory-supply-chain.png",
        origImage: "/projects/inventory-supply-chain.png",
        details: ["34.08% Utilization", "15.56 DSI", "23.47x Turnover", "8 Vendor Nodes"],
    },
    {
        id: "04",
        title: "IoT Solar Energy & Ag-Tech System",
        fullName: "IoT-Enabled Solar Energy Optimization System for Agricultural Use",
        description:
            "Built a single/dual-axis solar tracker using Arduino Uno, Light Dependent Resistor (LDR) sensors, servo motor, Maximum Power Point Tracking (MPPT) module, and NodeMCU (ESP8266) for automated sun tracking and wireless telemetry to Blynk IoT platform.",
        bullets: [
            "Integrated soil moisture, temperature, and humidity sensors for real-time agricultural monitoring, enabling +35% higher energy capture and reduced water consumption through precision irrigation control.",
        ],
        tags: ["IoT", "Arduino Uno", "NodeMCU ESP8266", "MPPT", "Blynk IoT", "Precision Ag"],
        icon: Cpu,
        color: "text-[#C85A32] dark:text-[#E07A5F]",
        simTab: "iot" as const,
        buttons: [
            {
                label: "Project Drive Folder",
                url: "https://drive.google.com/drive/folders/1Wwy_tVx-C1vi1b9tsAx7gP8-48jQ7nZ3?usp=drive_link",
                icon: FolderOpen,
            },
            {
                label: "Hardware Files (GitHub)",
                url: "https://github.com/siddharthkaulagi/my-project-files",
                icon: Github,
            },
        ],
        image: "/projects/iot-solar-tracker.jpg",
        origImage: "/projects/iot-solar-tracker.jpg",
        details: ["Arduino + ESP8266", "MPPT Algorithm", "Blynk Telemetry", "Efficiency +35%"],
    },
    {
        id: "05",
        title: "3D Printed Mechanical Knuckle Joint",
        fullName: "SolidWorks CAD Modeling, Tolerance Analysis & PLA Additive Mfg",
        description:
            "Designed and manufactured a functional mechanical knuckle joint assembly using SolidWorks 3D CAD and PLA additive manufacturing technology, performing geometric tolerance and fit verification.",
        bullets: [
            "Validated pin-collar articulation, GD&T clearances, and structural load distribution under physical PLA prototyping.",
        ],
        tags: ["SolidWorks", "3D Printing", "CAD", "GD&T Tolerance"],
        icon: Box,
        color: "text-[#2D6A4F] dark:text-[#74C69D]",
        buttons: [
            {
                label: "View CAD Files",
                url: "https://github.com/siddharthkaulagi/my-project-files",
                icon: Github,
            },
        ],
        image: "/projects/3d-knuckle-joint.png",
        origImage: "/projects/3d-knuckle-joint.png",
        details: ["CAD SolidWorks", "Tolerance Analysis", "PLA Material Testing", "Additive Mfg"],
    },
];

export function Projects({
    onOpenSimulation,
}: {
    onOpenSimulation?: (tab: "scm" | "iot") => void;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -520 : 520;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section id="projects" className="relative py-32 bg-transparent overflow-hidden scroll-mt-24">
            <ProjectsBackground />

            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 block">
                            Product &amp; Industrial Engineering
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
                            FEATURED <span className="text-[#C85A32]">PROJECTS</span>
                        </h2>
                    </motion.div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1F1C] border border-black/15 dark:border-white/15 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] transition-colors cursor-pointer"
                            aria-label="Scroll Projects Left"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1F1C] border border-black/15 dark:border-white/15 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] transition-colors cursor-pointer"
                            aria-label="Scroll Projects Right"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </div>

                {/* Projects Grid / Horizontal Deck */}
                <div
                    ref={scrollRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
                            className="group relative flex flex-col justify-between bg-white dark:bg-[#171B18] rounded-[36px] overflow-hidden border border-black/12 dark:border-white/12 shadow-xl hover:border-[#2D6A4F] transition-all duration-300 p-7 sm:p-9 crosshair-card"
                        >
                            <div>
                                {/* Project Image (Non-Neon Editorial Isometric + Full-Res Hardware) */}
                                <div
                                    onClick={() => setSelectedProject(project)}
                                    className="relative mb-7 bg-[#F6F4EE] dark:bg-[#111412] rounded-2xl overflow-hidden aspect-[16/9] border border-black/10 dark:border-white/10 cursor-pointer"
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        quality={95}
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#111412]/85 text-[#F6F4EE] font-mono text-[10px] font-bold uppercase tracking-widest">
                                        UNIT // {project.id}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 dark:bg-[#111412]/95 text-foreground font-mono text-[10px] font-bold uppercase tracking-wider border border-black/15 shadow cursor-pointer hover:bg-[#D8F3DC]"
                                    >
                                        Inspect Details &amp; Original UI ↗
                                    </button>
                                </div>

                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#2D6A4F] dark:text-[#74C69D] font-bold">
                                            {project.fullName}
                                        </span>
                                        <h3 className="font-headline text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight mt-1">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 shrink-0">
                                        <project.icon className={project.color} size={24} />
                                    </div>
                                </div>

                                <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {project.bullets && (
                                    <ul className="space-y-2 mb-6">
                                        {project.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                                                <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold">›</span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="space-y-5 pt-4 border-t border-black/10 dark:border-white/10">
                                <div className="grid grid-cols-2 gap-2.5">
                                    {project.details.map((detail, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/5 dark:border-white/5 font-mono text-[10px] uppercase tracking-wider font-bold"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D]" />
                                            <span className="truncate">{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                    {project.buttons.map((btn, idx) => (
                                        <a
                                            key={idx}
                                            href={btn.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111412] dark:bg-[#F6F4EE] text-[#F6F4EE] dark:text-[#111412] font-mono text-[11px] uppercase tracking-wider font-bold hover:bg-[#2D6A4F] dark:hover:bg-[#74C69D] transition-colors"
                                        >
                                            <btn.icon size={14} />
                                            {btn.label}
                                        </a>
                                    ))}

                                    {project.simTab && (
                                        <a
                                            href="#simulations"
                                            onClick={() => onOpenSimulation?.(project.simTab!)}
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] border border-[#2D6A4F]/30 font-mono text-[11px] uppercase tracking-wider font-bold hover:bg-[#2D6A4F] hover:text-white transition-colors"
                                        >
                                            <Sliders size={14} />
                                            Interactive Simulator
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Project Inspector Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 12 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-3xl w-full max-h-[88vh] overflow-y-auto bg-[#FDFCF9] dark:bg-[#171B18] border border-black/15 dark:border-white/15 rounded-[36px] p-6 sm:p-8 shadow-2xl space-y-6"
                        >
                            <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-[#2D6A4F] dark:text-[#74C69D] font-bold">
                                        UNIT // {selectedProject.id} · {selectedProject.fullName}
                                    </span>
                                    <h3 className="font-headline text-2xl sm:text-3xl font-black mt-1">
                                        {selectedProject.title}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                        Architectural System Diagram
                                    </span>
                                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10">
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                        Original Dashboard / Hardware Build
                                    </span>
                                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-black/10">
                                        <Image
                                            src={selectedProject.origImage}
                                            alt={`${selectedProject.title} Original`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <p className="font-body text-sm sm:text-base text-foreground/85 leading-relaxed">
                                {selectedProject.description}
                            </p>

                            {selectedProject.bullets && (
                                <ul className="space-y-2 text-sm text-foreground/80">
                                    {selectedProject.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <span className="text-[#2D6A4F] font-bold">›</span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                                {selectedProject.buttons.map((btn, i) => (
                                    <a
                                        key={i}
                                        href={btn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111412] dark:bg-[#74C69D] text-white dark:text-[#081C15] font-mono text-xs font-bold uppercase tracking-wider"
                                    >
                                        <btn.icon size={15} />
                                        {btn.label} ↗
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
