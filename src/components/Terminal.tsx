"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Terminal as TerminalIcon, Maximize2, Minimize2 } from "lucide-react";
import { experiences, certificateLinks } from "@/lib/portfolio-data";

interface HistoryItem {
    command: string;
    output: React.ReactNode;
    timestamp: string;
}

export const ONE_PIECE_QUOTES = [
    {
        text: "If you don’t take risks, you can’t create a future!",
        author: "Monkey D. Luffy",
        color: "text-[#C85A32]",
    },
    {
        text: "As long as I’m still alive, I have infinite chances.",
        author: "Monkey D. Luffy",
        color: "text-[#C85A32]",
    },
    {
        text: "People can say whatever they want about me, but I’ve never done a single thing in my life that I regret.",
        author: "Roronoa Zoro",
        color: "text-[#74C69D]",
    },
    {
        text: "No matter how hard or impossible it is, never lose sight of your goal!",
        author: "Monkey D. Luffy",
        color: "text-[#C85A32]",
    },
    {
        text: "I am truly glad to be alive!",
        author: "Brook",
        color: "text-amber-300",
    },
    {
        text: "Everyone has things that they can do and things that they can’t.",
        author: "Sanji",
        color: "text-amber-300",
    },
    {
        text: "What you do is your choice, but there’s no right or wrong in who you are.",
        author: "Franky",
        color: "text-[#74C69D]",
    },
    {
        text: "I guess, as long as I have life, all I can do is fight with all my might!",
        author: "Subaru Natsuki, Re:Zero",
        color: "text-[#C85A32]",
    },
    {
        text: "The important thing is not how long you live. It’s what you accomplish with your life!",
        author: "Grovyle, Pokémon",
        color: "text-[#74C69D]",
    },
    {
        text: "It’s not about if I can. I’m doing this because I want to.",
        author: "Monkey D. Luffy",
        color: "text-[#C85A32]",
    },
    {
        text: "When you give up, that’s when the game ends!",
        author: "Mitsuyoshi Anzai, Slam Dunk",
        color: "text-amber-300",
    },
    {
        text: "I’ve set myself to become the King of the Pirates… and if I die trying… then at least I tried!",
        author: "Monkey D. Luffy",
        color: "text-[#C85A32]",
    },
    {
        text: "If I die here, then I’m a man that could only make it this far.",
        author: "Roronoa Zoro",
        color: "text-[#74C69D]",
    },
    {
        text: "It’s okay to cry. There’s no shame in crying.",
        author: "Akagami no Shanks",
        color: "text-[#C85A32]",
    },
    {
        text: "I’m not interested in living a thousand years. I just need to live today.",
        author: "Portgas D. Ace",
        color: "text-amber-300",
    },
    {
        text: "If you never listen to anyone, you can't give proper advice!",
        author: "Monk Momoaki, The Boy and the Beast",
        color: "text-amber-300",
    },
    {
        text: "I'm going to be the world's greatest swordsman! All I have left is my destiny... my name may be infamous, but it's going to shake the world!",
        author: "Roronoa Zoro",
        color: "text-[#74C69D]",
    },
];

export const JOURNEY_VIGNETTES = [
    {
        image: "/comfort.png",
        title: "Phase 1: The Standard Rejection",
        subtitle: "Unfortunately, we regret to inform you...",
        message:
            "Even Gear 5 Luffy needs a pat when the 100th 'No' hits the inbox. It's not a bug, it's just a temporary system stall. I am currently in this phase of optimization.",
        status: "REJECTION_COUNT: 100+",
        color: "text-[#C85A32]",
    },
    {
        image: "/hustle.png",
        title: "Phase 2: The Gritty Rebound",
        subtitle: "I got up again. Round 2. Tactical optimization.",
        message:
            "Recruiter: 'You're too industrial.' Me: 'That's because I'm built for scale.' Resilience is my primary kernel version.",
        status: "HUSTLE_MODE: OVERDRIVE",
        color: "text-[#74C69D]",
    },
    {
        image: "/optimize.png",
        title: "Phase 3: Peak Performance",
        subtitle: "Applying for jobs vs. Building the future.",
        message:
            "Recruiter: 'We'll keep your profile on file.' Me: 'Great, I already indexed your database.' Just kidding, I'm just over-featured.",
        status: "EFFICIENCY: 99.9%",
        color: "text-amber-300",
    },
];

const COMMANDS_CONFIG = [
    { cmd: "about", desc: "know more about me" },
    { cmd: "skills", desc: "view my capabilities" },
    { cmd: "experience", desc: "learning & simulations" },
    { cmd: "certificates", desc: "verified credentials" },
    { cmd: "projects", desc: "explore my work" },
    { cmd: "simulate", desc: "open SCM & IoT simulators" },
    { cmd: "hustle", desc: "my sarcastic career journey" },
    { cmd: "contact", desc: "get in touch" },
    { cmd: "github", desc: "open my GitHub" },
    { cmd: "linkedin", desc: "view my profile" },
    { cmd: "whyme", desc: "my unique edge" },
    { cmd: "goal", desc: "future vision" },
    { cmd: "motivate", desc: "piece wisdom" },
    { cmd: "clear", desc: "reset terminal" },
    { cmd: "exit", desc: "close terminal" },
];

function HelpScreen({ executeCommand }: { executeCommand: (cmd: string) => void }) {
    return (
        <div className="space-y-6 pt-2">
            <p className="text-[#74C69D] font-bold text-lg">System Identity: Active (SID_OS v9.0)</p>
            <div className="space-y-4">
                <p className="text-amber-300 font-black text-xl uppercase tracking-wider underline decoration-amber-300/30 underline-offset-8">
                    Available commands:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 pl-2">
                    {COMMANDS_CONFIG.map((conf) => (
                        <CommandLink
                            key={conf.cmd}
                            cmd={conf.cmd}
                            desc={conf.desc}
                            onClick={() => executeCommand(conf.cmd)}
                        />
                    ))}
                </div>
            </div>
            <p className="text-xs text-white/50 italic mt-6 border-t border-white/10 pt-4">
                Tip: Click a command above or type it below.
            </p>
        </div>
    );
}

export function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState(-1);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastQuoteIndex = useRef<number>(-1);
    const journeyPointer = useRef<number>(0);

    const executeCommand = useCallback(
        (cmdText: string) => {
            const cmd = cmdText.toLowerCase().trim();
            if (!cmd) return;

            if (cmd === "clear") {
                setHistory([
                    {
                        command: "initializing...",
                        output: <HelpScreen executeCommand={(c: string) => executeCommand(c)} />,
                        timestamp: new Date().toLocaleTimeString(),
                    },
                ]);
                return;
            }

            if (cmd === "exit") {
                onClose();
                return;
            }

            if (cmd === "simulate" || cmd === "iot") {
                onClose();
                document.getElementById("simulations")?.scrollIntoView({ behavior: "smooth" });
                return;
            }

            if (cmd === "github") {
                window.open("https://github.com/siddharthkaulagi", "_blank");
                setHistory((prev) => [
                    ...prev,
                    {
                        command: cmdText,
                        output: <p className="text-[#74C69D]">Opening GitHub profile...</p>,
                        timestamp: new Date().toLocaleTimeString(),
                    },
                ]);
                return;
            }

            if (cmd === "certificates" || cmd.startsWith("certificates ")) {
                const slug = cmd === "certificates" ? "" : cmd.slice(13).trim();
                if (slug) {
                    const entry = certificateLinks[slug];
                    if (entry) {
                        window.open(entry.url, "_blank");
                        setHistory((prev) => [
                            ...prev,
                            {
                                command: cmdText,
                                output: (
                                    <p className="text-[#74C69D]">
                                        Opening credential: {entry.label}...
                                    </p>
                                ),
                                timestamp: new Date().toLocaleTimeString(),
                            },
                        ]);
                    } else {
                        setHistory((prev) => [
                            ...prev,
                            {
                                command: cmdText,
                                output: (
                                    <p className="text-[#C85A32]">
                                        Unknown slug. Type &apos;certificates&apos; to see available names (e.g. certificates ge).
                                    </p>
                                ),
                                timestamp: new Date().toLocaleTimeString(),
                            },
                        ]);
                    }
                    return;
                }
            }

            const responses: Record<string, string | React.ReactNode> = {
                help: <HelpScreen executeCommand={(c: string) => executeCommand(c)} />,
                about:
                    "I'm Siddharth R Kaulagi, an Industrial Engineering & Management student at BMSCE Bengaluru (CGPA: 8.18) focused on building data-driven supply chain systems, inventory optimization models, and AI-assisted platforms.",
                skills: (
                    <div className="space-y-4 py-2">
                        <p className="text-[#74C69D] font-black text-base uppercase tracking-wider">
                            CORE CAPABILITIES
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-amber-300 font-bold mb-1">Supply Chain &amp; Operations</p>
                                <ul className="space-y-1 text-white/80">
                                    <li>- Demand &amp; Supply Planning</li>
                                    <li>- Inventory Optimization (ABC/XYZ/FSN)</li>
                                    <li>- Procurement &amp; Vendor Coordination</li>
                                    <li>- Lean Manufacturing (5S, Kaizen, Six Sigma)</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-amber-300 font-bold mb-1">Analytics, ERP &amp; AI Stack</p>
                                <ul className="space-y-1 text-white/80">
                                    <li>- Advanced Excel (10-Module Simulators)</li>
                                    <li>- Power BI &amp; Custom DAX Measures</li>
                                    <li>- SAP S/4HANA SC, SAP MM, SolidWorks</li>
                                    <li>- Python, FastAPI, LangChain, Claude &amp; Gemini</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ),
                experience: (
                    <div className="space-y-4 py-2">
                        <p className="text-[#74C69D] font-black text-base uppercase tracking-wider">
                            Field Deployment Log
                        </p>
                        <div className="space-y-3 border-l-2 border-[#74C69D]/40 pl-4">
                            {experiences.map((exp) => (
                                <div key={exp.id}>
                                    <p className="text-amber-300 font-bold">
                                        {exp.role} — {exp.organization}
                                    </p>
                                    <p className="text-white/60 text-xs uppercase tracking-widest">
                                        {exp.period} · {exp.type}
                                    </p>
                                    <p className="text-white/85 mt-1 text-sm">{exp.focus}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ),
                certificates: (
                    <div className="space-y-3 py-2">
                        <p className="text-[#74C69D] font-black text-base uppercase tracking-wider">
                            Verified Credentials
                        </p>
                        <ul className="space-y-2 text-sm">
                            {Object.entries(certificateLinks).map(([slug, { label }]) => (
                                <li key={slug} className="flex flex-wrap items-baseline gap-x-2">
                                    <span className="text-[#74C69D] font-bold">{label}</span>
                                    <button
                                        type="button"
                                        onClick={() => executeCommand(`certificates ${slug}`)}
                                        className="text-amber-300 font-bold hover:underline text-left cursor-pointer"
                                    >
                                        [open: certificates {slug}]
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ),
                projects: (
                    <div className="space-y-2 font-mono text-sm">
                        <p>
                            <span className="text-[#74C69D] font-bold">01. SC Analytics System</span> — 10-Module Excel planning &amp; what-if simulator (8 nodes, 320+ orders)
                        </p>
                        <p>
                            <span className="text-amber-300 font-bold">02. URIP Platform</span> — ML Demand Forecasting, ABC/XYZ/FSN &amp; GIS Store Layout
                        </p>
                        <p>
                            <span className="text-[#74C69D] font-bold">03. Power BI Inventory Suite</span> — 8-node DAX performance &amp; warehouse utilization
                        </p>
                        <p>
                            <span className="text-[#C85A32] font-bold">04. IoT Solar Tracker</span> — Arduino Uno + LDR + MPPT + ESP8266 Blynk Ag-Tech (+35% efficiency)
                        </p>
                        <p>
                            <span className="text-amber-300 font-bold">05. 3D Knuckle Joint</span> — SolidWorks CAD &amp; PLA Additive Manufacturing
                        </p>
                    </div>
                ),
                contact: (
                    <div className="space-y-1.5 text-sm">
                        <p>
                            <span className="text-[#74C69D] font-bold">Primary Email:</span> siddharthengineer08@gmail.com
                        </p>
                        <p>
                            <span className="text-[#74C69D] font-bold">Secondary Email:</span> siddharthkaulagi08@gmail.com
                        </p>
                        <p>
                            <span className="text-[#74C69D] font-bold">Location:</span> Bengaluru, Karnataka, India
                        </p>
                        <p>
                            <span className="text-[#74C69D] font-bold">Mobile:</span> +91 8050463960
                        </p>
                    </div>
                ),
                whyme:
                    "I don’t just analyze data—I focus on improving real-world systems. My background in Industrial Engineering helps me understand operations deeply and solve inefficiencies with practical, scalable solutions.",
                goal:
                    "To architect autonomous supply chain ecosystems that minimize waste and maximize throughput using AI-driven orchestration.",
                linkedin: (
                    <a
                        href="https://www.linkedin.com/in/siddharth-kaulagi-041ba4220/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#74C69D] underline underline-offset-4 hover:text-white font-bold"
                    >
                        &gt; VIEW_LINKEDIN_PROFILE
                    </a>
                ),
                motivate: (() => {
                    let nextIdx;
                    do {
                        nextIdx = Math.floor(Math.random() * ONE_PIECE_QUOTES.length);
                    } while (nextIdx === lastQuoteIndex.current && ONE_PIECE_QUOTES.length > 1);

                    lastQuoteIndex.current = nextIdx;
                    const randomQuote = ONE_PIECE_QUOTES[nextIdx];

                    return (
                        <div className="py-3 border-y border-white/10 my-2">
                            <p className={`${randomQuote.color} font-black italic text-lg leading-relaxed mb-2`}>
                                &ldquo;{randomQuote.text}&rdquo;
                            </p>
                            <p className="text-white/60 uppercase tracking-widest text-xs font-bold">
                                — {randomQuote.author}
                            </p>
                        </div>
                    );
                })(),
                hustle: (() => {
                    const v = JOURNEY_VIGNETTES[journeyPointer.current];
                    journeyPointer.current = (journeyPointer.current + 1) % JOURNEY_VIGNETTES.length;

                    return (
                        <div className="space-y-4 py-3">
                            <p className={`${v.color} font-black uppercase tracking-widest text-xs`}>
                                JOURNEY_LOG: {v.title}
                            </p>
                            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 shadow-xl">
                                <img src={v.image} alt={v.title} className="w-full h-auto" />
                            </div>
                            <p className="text-white/90 text-sm leading-relaxed max-w-md">{v.message}</p>
                            <p className="text-white/50 italic text-xs">
                                STATUS: {v.status} (Type &apos;hustle&apos; again for the next phase)
                            </p>
                        </div>
                    );
                })(),
            };

            const output =
                responses[cmd] || `Command not found: ${cmd}. Type 'help' for assistance.`;

            setHistory((prev) => [
                ...prev,
                {
                    command: cmdText,
                    output,
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);

            setCommandHistory((prev) => [cmdText, ...prev]);
            setHistoryPointer(-1);
            setInput("");
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => inputRef.current?.focus(), 100);
            if (history.length === 0) {
                setHistory([
                    {
                        command: "initializing...",
                        output: <HelpScreen executeCommand={(cmd) => executeCommand(cmd)} />,
                        timestamp: new Date().toLocaleTimeString(),
                    },
                ]);
            }
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, executeCommand, history.length]);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        executeCommand(input);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyPointer < commandHistory.length - 1) {
                const nextIdx = historyPointer + 1;
                setHistoryPointer(nextIdx);
                setInput(commandHistory[nextIdx]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyPointer > -1) {
                const nextIdx = historyPointer - 1;
                setHistoryPointer(nextIdx);
                setInput(nextIdx === -1 ? "" : commandHistory[nextIdx]);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none ${
                        isMaximized ? "p-0" : ""
                    }`}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? "52px" : isMaximized ? "100vh" : "600px",
                            width: isMaximized ? "100vw" : "100%",
                            maxWidth: isMaximized ? "100vw" : "980px",
                        }}
                        exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        className={`bg-[#111412] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative ${
                            isMaximized ? "rounded-none border-none" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-[#171B18] border-b border-white/10 select-none">
                            <div className="flex items-center gap-2.5">
                                <TerminalIcon size={15} className="text-[#74C69D]" />
                                <span className="text-[10px] uppercase tracking-widest font-mono text-white font-bold bg-[#2D6A4F] px-3 py-1 rounded-md">
                                    SID_OS [CMD-Terminal]
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    title="Minimize"
                                    className="w-4 h-4 rounded-full bg-amber-400/25 flex items-center justify-center cursor-pointer"
                                >
                                    <Minus size={10} className="text-amber-300" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMaximized(!isMaximized);
                                        setIsMinimized(false);
                                    }}
                                    title="Maximize"
                                    className="w-4 h-4 rounded-full bg-[#74C69D]/25 flex items-center justify-center cursor-pointer"
                                >
                                    {isMaximized ? (
                                        <Minimize2 size={10} className="text-[#74C69D]" />
                                    ) : (
                                        <Maximize2 size={10} className="text-[#74C69D]" />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    title="Close"
                                    className="w-4 h-4 rounded-full bg-[#C85A32]/30 flex items-center justify-center cursor-pointer"
                                >
                                    <X size={10} className="text-[#E07A5F]" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <div
                                data-lenis-prevent
                                className="flex-1 overflow-y-auto p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed"
                                onClick={() => inputRef.current?.focus()}
                            >
                                <div className="space-y-6">
                                    {history.map((item, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[#74C69D] font-bold">
                                                    siddharth@portfolio
                                                </span>
                                                <span className="text-white">:</span>
                                                <span className="text-amber-300 font-bold">~</span>
                                                <span className="text-white">$</span>
                                                <span className="text-white font-semibold">
                                                    {item.command}
                                                </span>
                                            </div>
                                            <div className="text-white/90 pl-5 py-1 border-l-2 border-[#2D6A4F]/50 ml-2">
                                                {item.output}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={terminalEndRef} />
                                </div>

                                <form
                                    onSubmit={handleCommandSubmit}
                                    className="flex items-center gap-2.5 mt-6 pb-6"
                                >
                                    <span className="text-[#74C69D] font-bold shrink-0">
                                        siddharth@portfolio
                                    </span>
                                    <span className="text-white shrink-0">:</span>
                                    <span className="text-amber-300 font-bold shrink-0">~</span>
                                    <span className="text-white shrink-0">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type help, projects, simulate, hustle, motivate..."
                                        autoFocus
                                        className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-[#74C69D]"
                                        spellCheck="false"
                                        autoComplete="off"
                                    />
                                </form>
                            </div>
                        )}
                    </motion.div>

                    <div
                        className="absolute inset-0 z-[-1] pointer-events-auto bg-black/65 backdrop-blur-sm"
                        onClick={onClose}
                    />
                </div>
            )}
        </AnimatePresence>
    );
}

function CommandLink({
    cmd,
    desc,
    onClick,
}: {
    cmd: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className="flex items-center gap-3 group cursor-pointer text-left hover:translate-x-1 transition-transform"
        >
            <span className="text-amber-300 font-bold min-w-[95px] group-hover:text-white">
                &gt; {cmd}
            </span>
            <span className="text-white/60 group-hover:text-[#74C69D] uppercase text-[11px] font-bold tracking-wider">
                → {desc}
            </span>
        </button>
    );
}
