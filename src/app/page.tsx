"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { InteractiveSimulations } from "@/components/sections/InteractiveSimulations";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certificates } from "@/components/sections/Certificates";
import { TheOptimizationReality } from "@/components/sections/TheOptimizationReality";
import { Contact } from "@/components/sections/Contact";
import { IndustrialElements } from "@/components/IndustrialElements";
import { Terminal } from "@/components/Terminal";

export default function Home() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [activeSimTab, setActiveSimTab] = useState<"scm" | "iot">("scm");
    const [isScmViewOnly, setIsScmViewOnly] = useState(false);

    return (
        <main className="min-h-screen selection:bg-[#D8F3DC] selection:text-[#111412]">
            <IndustrialElements isScmViewOnly={isScmViewOnly} />
            <Navbar
                onTerminalClick={() => setIsTerminalOpen(true)}
                isScmViewOnly={isScmViewOnly}
                onToggleScmView={() => setIsScmViewOnly((prev) => !prev)}
            />

            {/* Main Portfolio Sections — hidden when Eye Toggle (SCM Flow View) is active */}
            <div
                className={
                    isScmViewOnly
                        ? "opacity-0 pointer-events-none select-none h-screen overflow-hidden transition-opacity duration-300"
                        : "opacity-100 transition-opacity duration-300"
                }
            >
                <Hero
                    isTerminalOpen={isTerminalOpen}
                    onTerminalOpen={() => setIsTerminalOpen(true)}
                    onTerminalClose={() => setIsTerminalOpen(false)}
                />
                <InteractiveSimulations
                    activeSimTab={activeSimTab}
                    setActiveSimTab={setActiveSimTab}
                />
                <About />
                <Experience />
                <Projects
                    onOpenSimulation={(tab) => {
                        setActiveSimTab(tab);
                    }}
                />
                <Skills />
                <Certificates />
                <TheOptimizationReality />
                <Contact />
            </div>

            {/* Global SID_OS Terminal Instance */}
            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
            />
        </main>
    );
}
