"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Hexagon, Terminal, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Simulators", href: "#simulations", short: "Sims" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience", short: "Exp" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certs", href: "#certificates", short: "Certs" },
    { name: "Reality", href: "#reality" },
    { name: "Terminal", href: "#terminal", isSpecial: true },
    { name: "Contact", href: "#contact" },
];

function SocialLink({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-2.5 rounded-xl bg-[#ECE8DD] dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 text-[#111412] dark:text-[#F6F4EE]/80 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] hover:border-[#2D6A4F]/40 transition-colors shrink-0"
        >
            {children}
        </a>
    );
}

function DecryptLogoText({ text, isHovered }: { text: string; isHovered: boolean }) {
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
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 35);

        return () => clearInterval(interval);
    }, [isHovered, text]);

    return <span>{displayText}</span>;
}

export function Navbar({
    onTerminalClick,
    isScmViewOnly = false,
    onToggleScmView,
}: {
    onTerminalClick?: () => void;
    isScmViewOnly?: boolean;
    onToggleScmView?: () => void;
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // When Eye Toggle is clicked (isScmViewOnly = true), the entire menu bar disappears
    // and ONLY the subtle light-opacity Eye Toggle button remains visible!
    if (isScmViewOnly) {
        return (
            <div className="fixed top-5 right-6 z-[100] pointer-events-auto">
                <button
                    type="button"
                    onClick={onToggleScmView}
                    aria-label="Restore normal portfolio view"
                    title="Click to restore normal content & menu bar"
                    className="p-2.5 rounded-xl bg-[#2D6A4F] text-white border border-black/15 dark:border-white/20 shadow-md opacity-35 hover:opacity-100 focus:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                    <EyeOff size={18} />
                </button>
            </div>
        );
    }

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 pt-3 sm:pt-5",
                isScrolled ? "scale-[0.99]" : "scale-100"
            )}
        >
            <div
                className={cn(
                    "max-w-[1440px] mx-auto flex items-center w-full min-w-0 gap-2 sm:gap-3 rounded-3xl transition-all duration-300 relative border",
                    isScrolled
                        ? "bg-[#FDFCF9]/95 dark:bg-[#111412]/95 backdrop-blur-xl border-black/15 dark:border-white/15 shadow-[0_20px_50px_rgba(17,20,18,0.12)] px-5 sm:px-7 py-3.5"
                        : "bg-[#F6F4EE]/80 dark:bg-[#111412]/80 backdrop-blur-md border-black/10 dark:border-white/10 px-4 sm:px-6 py-3"
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 shrink-0 relative z-20 min-w-0">
                    <Link
                        href="#hero"
                        className="flex items-center gap-2.5 min-w-0"
                        onMouseEnter={() => setIsLogoHovered(true)}
                        onMouseLeave={() => setIsLogoHovered(false)}
                    >
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111412] dark:bg-[#74C69D] flex items-center justify-center shrink-0 shadow-xs">
                            <Hexagon className="absolute inset-1 text-[#74C69D] dark:text-[#081C15] w-auto h-auto opacity-30" strokeWidth={1.5} />
                            <span className="font-headline font-black text-lg text-[#F6F4EE] dark:text-[#081C15] relative z-10">
                                S
                            </span>
                        </div>
                        <div className="flex flex-col min-w-0 hidden sm:flex">
                            <span className="font-headline font-black text-base xl:text-lg tracking-tight text-foreground uppercase truncate">
                                <DecryptLogoText text="Siddharth" isHovered={isLogoHovered} />
                            </span>
                            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#2D6A4F] dark:text-[#74C69D] font-bold -mt-0.5">
                                IE_SCM_Systems
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop nav */}
                <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center relative z-20 px-2">
                    <div className="flex items-center justify-center gap-1 max-w-full">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                onClick={(e) => {
                                    if (link.name === "Terminal") {
                                        e.preventDefault();
                                        onTerminalClick?.();
                                    }
                                }}
                                className="relative group shrink-0 cursor-pointer"
                            >
                                {link.name === "Terminal" ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D8F3DC] dark:bg-[#1B4332] text-[#1B4332] dark:text-[#D8F3DC] font-mono text-[10px] uppercase tracking-[0.14em] font-bold border border-[#2D6A4F]/25 hover:bg-[#2D6A4F] hover:text-white transition-all">
                                        <Terminal size={12} />
                                        CMD
                                    </span>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "inline-block px-3 py-1.5 rounded-xl font-mono text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] font-bold transition-all whitespace-nowrap",
                                            "text-foreground/80 hover:text-[#2D6A4F] dark:hover:text-[#74C69D] hover:bg-black/5 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <span className="2xl:hidden">{link.short ?? link.name}</span>
                                        <span className="hidden 2xl:inline">{link.name === "Certs" ? "Certificates" : link.name}</span>
                                    </Link>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="hidden xl:flex items-center gap-2.5 shrink-0 relative z-20 pl-4 ml-2 border-l border-black/10 dark:border-white/10">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={onToggleScmView}
                        aria-label="Inspect Supply Chain Flow Background"
                        title="Toggle Supply Chain Flow Canvas View"
                        className="p-2.5 rounded-xl bg-[#ECE8DD] dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 text-[#111412] dark:text-[#F6F4EE]/80 hover:bg-[#2D6A4F] hover:text-white dark:hover:bg-[#74C69D] dark:hover:text-[#081C15] transition-colors shrink-0 cursor-pointer"
                    >
                        <Eye size={17} />
                    </button>
                    <SocialLink href="https://github.com/siddharthkaulagi" label="GitHub">
                        <Github size={17} />
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/in/siddharth-kaulagi-041ba4220/" label="LinkedIn">
                        <Linkedin size={17} />
                    </SocialLink>
                </div>

                {/* Mobile actions + menu toggle */}
                <div className="xl:hidden flex items-center gap-2 relative z-20 ml-auto shrink-0">
                    <button
                        type="button"
                        onClick={onToggleScmView}
                        aria-label="Inspect Supply Chain Flow Background"
                        title="Toggle Supply Chain Flow Canvas View"
                        className="p-2.5 rounded-xl bg-[#ECE8DD] dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 text-foreground"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        type="button"
                        className="p-2.5 rounded-xl bg-[#ECE8DD] dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -12 }}
                        className="xl:hidden absolute top-[calc(100%-0.25rem)] left-4 right-4 sm:left-6 sm:right-6 bg-[#FDFCF9] dark:bg-[#171B18] border border-black/15 dark:border-white/15 rounded-3xl shadow-2xl z-50 p-6 sm:p-8 mt-2"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    type="button"
                                    onClick={(e) => {
                                        if (link.name === "Terminal") {
                                            e.preventDefault();
                                            onTerminalClick?.();
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-left p-3 rounded-xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10"
                                >
                                    <Link
                                        href={link.href}
                                        className="font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-[#2D6A4F] dark:hover:text-[#74C69D]"
                                    >
                                        {link.name === "Certs" ? "Certificates" : link.name}
                                    </Link>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-black/10 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <SocialLink href="https://github.com/siddharthkaulagi" label="GitHub">
                                    <Github size={18} />
                                </SocialLink>
                                <SocialLink href="https://www.linkedin.com/in/siddharth-kaulagi-041ba4220/" label="LinkedIn">
                                    <Linkedin size={18} />
                                </SocialLink>
                            </div>
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
