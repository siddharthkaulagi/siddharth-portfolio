"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sparkles } from "lucide-react";
import Image from "next/image";

export function SupportProtocol() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-7 right-7 z-[90] w-14 h-14 rounded-2xl bg-[#2D6A4F] dark:bg-[#74C69D] text-white dark:text-[#081C15] border border-white/20 shadow-2xl flex items-center justify-center group cursor-pointer"
            >
                <Heart size={22} className="group-hover:fill-current transition-all" />
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#111412] rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
                    Support_Protocol.cmd
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 12 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-xl w-full bg-[#FDFCF9] dark:bg-[#171B18] rounded-[36px] overflow-hidden shadow-2xl border border-black/15 dark:border-white/15"
                        >
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="absolute top-5 right-5 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                                <Image
                                    src="/comfort.png"
                                    alt="Luffy and Squirrel Support"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 576px"
                                    quality={95}
                                    className="object-cover"
                                />
                                <div className="absolute left-[54%] top-[58%] px-3.5 py-1 bg-[#C85A32] text-white font-mono font-bold text-[11px] rounded-lg shadow-lg rotate-2">
                                    ME (OPTIMIZING)
                                </div>
                                <div className="absolute left-[14%] top-[78%] px-3.5 py-1 bg-[#2D6A4F] text-white font-mono font-bold text-[10px] rounded-lg shadow-lg -rotate-3">
                                    A FRIEND / SQUIRREL
                                </div>
                            </div>

                            <div className="p-8 space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-[#D8F3DC] dark:bg-[#1B4332] text-[#2D6A4F] dark:text-[#74C69D]">
                                        <Sparkles size={20} />
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] font-bold text-[#2D6A4F] dark:text-[#74C69D]">
                                        Mental Support Protocol
                                    </span>
                                </div>

                                <h3 className="font-headline text-3xl font-black text-foreground leading-tight">
                                    Take a deep breath,{" "}
                                    <span className="text-[#2D6A4F] dark:text-[#74C69D] underline">
                                        Siddharth
                                    </span>
                                    .
                                </h3>

                                <p className="font-body text-base text-muted-foreground leading-relaxed italic">
                                    &ldquo;Sometimes the system needs to reset. It&apos;s not a bug, it&apos;s a feature. Keep your spirits up as you optimize the world.&rdquo;
                                </p>

                                <div className="pt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-ping" />
                                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#2D6A4F] dark:text-[#74C69D]">
                                            Happiness_Level: OPTIMAL
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-5 py-2.5 bg-[#111412] dark:bg-[#74C69D] text-white dark:text-[#081C15] rounded-xl font-mono font-bold text-xs uppercase cursor-pointer"
                                    >
                                        I&apos;m Refueled
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
