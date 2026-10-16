"use client";

import React, { useState, useEffect } from "react";
import { IndustrialBackground } from "@/components/IndustrialBackground";

function computeGearTeeth(
    numTeeth: number,
    innerR: number,
    outerR: number,
    cx = 50,
    cy = 50
) {
    const teeth: { x1: string; y1: string; x2: string; y2: string }[] = [];
    const step = 360 / numTeeth;
    for (let i = 0; i < numTeeth; i++) {
        const angle = (i * step * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        teeth.push({
            x1: (cx + innerR * cos).toFixed(2),
            y1: (cy + innerR * sin).toFixed(2),
            x2: (cx + outerR * cos).toFixed(2),
            y2: (cy + outerR * sin).toFixed(2),
        });
    }
    return teeth;
}

const GEAR1_TEETH = computeGearTeeth(12, 38, 46);
const GEAR2_TEETH = computeGearTeeth(10, 35, 44);
const GEAR3_TEETH = computeGearTeeth(16, 37, 46);

export function IndustrialElements({
    isScmViewOnly = false,
}: {
    isScmViewOnly?: boolean;
}) {
    const [showScmFlow, setShowScmFlow] = useState(true);
    const [showFlowPill, setShowFlowPill] = useState(true);

    // Whenever the user enters Eye Toggle mode, ensure the SCM canvas and bottom-left flow pill are visible
    useEffect(() => {
        if (isScmViewOnly) {
            setShowScmFlow(true);
            setShowFlowPill(true);
        }
    }, [isScmViewOnly]);

    return (
        <>
            {/* Global End-to-End Supply Chain & Multi-Modal Logistics Motion Graphics */}
            {showScmFlow && <IndustrialBackground fixed />}

            {/* Fixed Industrial CAD Gears & Telemetry HUD */}
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
                {/* Interlocking Precision CAD Gear System - Top Left */}
                <div className="absolute top-[8%] left-[2%]">
                    <svg
                        width="88"
                        height="88"
                        viewBox="0 0 100 100"
                        className="gear-spin opacity-[0.20] dark:opacity-[0.15]"
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-[#2D6A4F] dark:text-[#74C69D]"
                        >
                            {GEAR1_TEETH.map((t, i) => (
                                <line
                                    key={i}
                                    x1={t.x1}
                                    y1={t.y1}
                                    x2={t.x2}
                                    y2={t.y2}
                                    strokeWidth="5.5"
                                    strokeLinecap="round"
                                />
                            ))}
                            <circle cx="50" cy="50" r="35" />
                            <circle cx="50" cy="50" r="15" />
                        </g>
                    </svg>
                </div>

                {/* Meshed Gear 2 */}
                <div className="absolute top-[15%] left-[7.5%]">
                    <svg
                        width="58"
                        height="58"
                        viewBox="0 0 100 100"
                        className="gear-spin-reverse opacity-[0.18] dark:opacity-[0.13]"
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-[#C85A32] dark:text-[#E07A5F]"
                        >
                            {GEAR2_TEETH.map((t, i) => (
                                <line
                                    key={i}
                                    x1={t.x1}
                                    y1={t.y1}
                                    x2={t.x2}
                                    y2={t.y2}
                                    strokeWidth="5.5"
                                    strokeLinecap="round"
                                />
                            ))}
                            <circle cx="50" cy="50" r="30" />
                        </g>
                    </svg>
                </div>

                {/* Large CAD Gear - Bottom Right */}
                <div className="absolute bottom-[10%] right-[3%]">
                    <svg
                        width="116"
                        height="116"
                        viewBox="0 0 100 100"
                        className="gear-spin opacity-[0.15] dark:opacity-[0.11]"
                        style={{ animationDuration: "22s" }}
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-[#1B4332] dark:text-[#95D5B2]"
                        >
                            {GEAR3_TEETH.map((t, i) => (
                                <line
                                    key={i}
                                    x1={t.x1}
                                    y1={t.y1}
                                    x2={t.x2}
                                    y2={t.y2}
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                />
                            ))}
                            <circle cx="50" cy="50" r="34" />
                            <circle cx="50" cy="50" r="18" />
                        </g>
                    </svg>
                </div>

                {/* Bottom-Left SCM Pipeline Legend Pill — ONLY appears when Eye Toggle (isScmViewOnly) is active! */}
                {isScmViewOnly && showFlowPill && (
                    <div className="fixed bottom-6 left-6 z-40 pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#FDFCF9]/90 dark:bg-[#171B18]/90 backdrop-blur-md border border-black/15 dark:border-white/15 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D] animate-ping shrink-0" />
                        <div className="font-mono text-[10px] tracking-wider uppercase text-foreground/85">
                            <span className="font-bold text-[#2D6A4F] dark:text-[#74C69D]">
                                SCM FLOW:
                            </span>{" "}
                            MINING → SOURCING → PORT → MFG → DC → DELIVERY{" "}
                            <span className="text-[#C85A32] dark:text-[#E07A5F] font-semibold">
                                [RAIL · SHIP · AIR · TRUCK · AGV]
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowFlowPill(false)}
                            className="ml-1 px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] font-mono text-[9px] font-bold uppercase transition-colors cursor-pointer"
                        >
                            HIDE
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
