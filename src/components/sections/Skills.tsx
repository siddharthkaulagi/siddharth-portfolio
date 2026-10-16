"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Factory,
    LineChart,
    Terminal,
    Truck,
    Settings,
    Activity,
    Layers,
    BarChart3,
    Database,
    Code,
    Cpu,
    Boxes,
    Layout,
    Binary,
    Globe,
    Workflow,
    ShieldCheck,
    Box,
    ClipboardList,
    Zap,
    Clock,
    Users,
    Search,
    Package,
    Ship,
    FileText,
    UserPlus,
} from "lucide-react";
import { SkillsBackground } from "@/components/SkillsBackground";

const skillCategories = [
    {
        title: "Supply Chain & Industrial Eng",
        icon: Factory,
        description: "Optimizing physical networks, inventory policies, and lean manufacturing workflows.",
        skills: [
            { name: "Demand & Supply Planning", icon: Workflow },
            { name: "Inventory Optimization", icon: Boxes },
            { name: "ABC / XYZ / FSN Classification", icon: Layers },
            { name: "Plan for Every Part (PFEP)", icon: Package },
            { name: "Lean Mfg (5S & Kaizen)", icon: Activity },
            { name: "Six Sigma White Belt", icon: ShieldCheck },
            { name: "Root Cause Analysis (RCA)", icon: Search },
            { name: "Production Planning", icon: Factory },
            { name: "Value Engineering", icon: Zap },
            { name: "Operations Management", icon: Settings },
        ],
        iconColor: "text-[#2D6A4F] dark:text-[#74C69D]",
    },
    {
        title: "Decision Support & Analytics",
        icon: LineChart,
        description: "Turning operational telemetry into forecasts, KPI dashboards, and what-if models.",
        skills: [
            { name: "Advanced Excel (Pivot, XLOOKUP)", icon: FileText },
            { name: "Power BI & DAX Measures", icon: BarChart3 },
            { name: "Moving Avg & Exp Smoothing", icon: LineChart },
            { name: "MAPE Forecast Tracking", icon: Activity },
            { name: "What-If Scenario Modeling", icon: Settings },
            { name: "Pareto & Statistical Analysis", icon: Binary },
            { name: "Operations Research", icon: Database },
            { name: "KPI Dashboarding", icon: Layout },
        ],
        iconColor: "text-[#C85A32] dark:text-[#E07A5F]",
    },
    {
        title: "Procurement & Logistics Ops",
        icon: Truck,
        description: "Managing sourcing, vendor performance, BOM/GD&T inspection, and distribution.",
        skills: [
            { name: "Sourcing & Procurement", icon: Clock },
            { name: "Supplier Coordination", icon: UserPlus },
            { name: "BOM & GD&T Review", icon: ClipboardList },
            { name: "Vendor Performance Tracking", icon: Activity },
            { name: "Stakeholder Communication", icon: Users },
            { name: "Supplier Onboarding", icon: Ship },
            { name: "Distribution Operations", icon: Truck },
            { name: "Logistics Optimization", icon: Workflow },
        ],
        iconColor: "text-[#2D6A4F] dark:text-[#74C69D]",
    },
    {
        title: "ERP, CAD & AI Build Stack",
        icon: Terminal,
        description: "Enterprise software, CAD modeling, project management, and AI-assisted development.",
        skills: [
            { name: "SAP S/4HANA Supply Chain", icon: Globe },
            { name: "SAP MM (Basic) & Optimizer ERP", icon: Database },
            { name: "SolidWorks 3D CAD", icon: Box },
            { name: "Arena Simulation", icon: Cpu },
            { name: "SQL & Python / FastAPI", icon: Code },
            { name: "CPM, Kanban & Scope Mgmt", icon: ClipboardList },
            { name: "Claude, Gemini, GPT-5 & Kimi", icon: Terminal },
            { name: "Antigravity, MCP & LangChain", icon: Layers },
        ],
        iconColor: "text-[#C85A32] dark:text-[#E07A5F]",
    },
];

function DecryptText({ text, isHovered }: { text: string; isHovered: boolean }) {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

    useEffect(() => {
        if (!isHovered) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration || char === " ") return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1;
        }, 25);

        return () => clearInterval(interval);
    }, [isHovered, text]);

    return <span>{displayText}</span>;
}

function SkillPill({ skill }: { skill: { name: string; icon: any } }) {
    const [hovered, setHovered] = useState(false);
    const Icon = skill.icon;
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 hover:border-[#2D6A4F] transition-colors cursor-default"
        >
            <div className="p-2 rounded-xl bg-white dark:bg-[#171B18] text-[#2D6A4F] dark:text-[#74C69D]">
                <Icon size={16} />
            </div>
            <span className="font-mono font-bold text-xs text-foreground">
                <DecryptText text={skill.name} isHovered={hovered} />
            </span>
        </div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="relative py-32 bg-transparent overflow-hidden scroll-mt-24">
            <SkillsBackground />

            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 block">
                            Industrial_Intelligence // Capabilities
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase leading-none">
                            CORE <span className="text-[#2D6A4F] dark:text-[#74C69D]">MATRIX</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.06 }}
                            className="p-8 sm:p-9 rounded-[36px] bg-white dark:bg-[#171B18] border border-black/12 dark:border-white/12 shadow-xl flex flex-col justify-between crosshair-card"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                        <category.icon className={category.iconColor} size={28} />
                                    </div>
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                                            Module_0{index + 1} // Active
                                        </span>
                                        <h3 className="font-headline text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">
                                            {category.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="font-body text-muted-foreground text-sm sm:text-base mb-6">
                                    {category.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {category.skills.map((skill, idx) => (
                                    <SkillPill key={idx} skill={skill} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
