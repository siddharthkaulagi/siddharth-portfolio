"use client";

import React, { useEffect, useRef } from "react";

interface StageNode {
    id: string;
    code: string;
    title: string;
    subtitle: string;
    rx: number;
    ry: number;
    accent: "emerald" | "ochre" | "sage";
    metric: string;
}

interface TransportCorridor {
    id: string;
    fromIdx: number;
    toIdx: number;
    mode: "RAIL" | "SHIP" | "AIR" | "TRUCK" | "CONVEYOR" | "VAN";
    routeLabel: string;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    speed: number;
    vehicleCount: number;
    colorType: "emerald" | "ochre" | "sage";
}

const SCM_STAGES: StageNode[] = [
    {
        id: "mining",
        code: "STG_01 // EXTRACTION",
        title: "RAW EXTRACTION",
        subtitle: "Ore Quarry & Crusher",
        rx: 0.08,
        ry: 0.14,
        accent: "ochre",
        metric: "RAW_FEED: 100%",
    },
    {
        id: "sourcing",
        code: "STG_02 // SOURCING",
        title: "VENDOR SOURCING",
        subtitle: "8 Tier-1 Supplier Hubs",
        rx: 0.31,
        ry: 0.19,
        accent: "emerald",
        metric: "VENDORS: 08 ACTIVE",
    },
    {
        id: "procurement",
        code: "STG_03 // PROCUREMENT",
        title: "PROCUREMENT & PORT",
        subtitle: "SAP S/4HANA · BOM/GD&T",
        rx: 0.62,
        ry: 0.15,
        accent: "sage",
        metric: "PO_FLOW: 320+ ORD",
    },
    {
        id: "manufacturing",
        code: "STG_04 // MANUFACTURING",
        title: "SMART FACTORY & IE",
        subtitle: "Lean 5S · Kaizen · Robotics",
        rx: 0.85,
        ry: 0.44,
        accent: "ochre",
        metric: "OEE: 94.8% · ZERO_DEF",
    },
    {
        id: "warehouse",
        code: "STG_05 // CENTRAL DC",
        title: "DISTRIBUTION HUB",
        subtitle: "ABC/XYZ/FSN · 15.56 DSI",
        rx: 0.48,
        ry: 0.64,
        accent: "emerald",
        metric: "TURNOVER: 23.47x",
    },
    {
        id: "delivery",
        code: "STG_06 // DELIVERY",
        title: "CUSTOMER FULFILLMENT",
        subtitle: "URIP Retail & Last-Mile",
        rx: 0.14,
        ry: 0.81,
        accent: "sage",
        metric: "OTD: 94.1% · FILL: 96.7%",
    },
];

const CORRIDORS: TransportCorridor[] = [
    {
        id: "c-rail",
        fromIdx: 0,
        toIdx: 1,
        mode: "RAIL",
        routeLabel: "HEAVY RAIL CORRIDOR [ORE -> VENDOR]",
        cp1x: 0.16,
        cp1y: 0.09,
        cp2x: 0.23,
        cp2y: 0.23,
        speed: 0.0011,
        vehicleCount: 2,
        colorType: "ochre",
    },
    {
        id: "c-ship",
        fromIdx: 1,
        toIdx: 2,
        mode: "SHIP",
        routeLabel: "MARITIME CONTAINER LANE [FOB -> PORT]",
        cp1x: 0.42,
        cp1y: 0.08,
        cp2x: 0.52,
        cp2y: 0.24,
        speed: 0.00085,
        vehicleCount: 2,
        colorType: "emerald",
    },
    {
        id: "c-air",
        fromIdx: 1,
        toIdx: 3,
        mode: "AIR",
        routeLabel: "EXPEDITED AIR CARGO [AOG / CRITICAL BOM]",
        cp1x: 0.55,
        cp1y: 0.04,
        cp2x: 0.78,
        cp2y: 0.16,
        speed: 0.0018,
        vehicleCount: 2,
        colorType: "ochre",
    },
    {
        id: "c-inbound-truck",
        fromIdx: 2,
        toIdx: 3,
        mode: "TRUCK",
        routeLabel: "INBOUND JIT FREIGHT [PORT -> PLANT]",
        cp1x: 0.76,
        cp1y: 0.20,
        cp2x: 0.88,
        cp2y: 0.31,
        speed: 0.0013,
        vehicleCount: 2,
        colorType: "emerald",
    },
    {
        id: "c-conveyor",
        fromIdx: 3,
        toIdx: 4,
        mode: "CONVEYOR",
        routeLabel: "AUTOMATED AGV & PALLET TRANSFER [WIP -> DC]",
        cp1x: 0.76,
        cp1y: 0.58,
        cp2x: 0.62,
        cp2y: 0.68,
        speed: 0.0014,
        vehicleCount: 3,
        colorType: "sage",
    },
    {
        id: "c-linehaul-truck",
        fromIdx: 4,
        toIdx: 5,
        mode: "TRUCK",
        routeLabel: "PRIMARY LINEHAUL FLEET [DC -> REGIONAL HUB]",
        cp1x: 0.36,
        cp1y: 0.59,
        cp2x: 0.25,
        cp2y: 0.72,
        speed: 0.00125,
        vehicleCount: 2,
        colorType: "emerald",
    },
    {
        id: "c-lastmile-van",
        fromIdx: 4,
        toIdx: 5,
        mode: "VAN",
        routeLabel: "LAST-MILE EV DISPATCH [EXPRESS DELIVERY]",
        cp1x: 0.41,
        cp1y: 0.84,
        cp2x: 0.24,
        cp2y: 0.89,
        speed: 0.00165,
        vehicleCount: 2,
        colorType: "ochre",
    },
];

function cubicPoint(
    t: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = uuu * x0 + 3 * uu * t * x1 + 3 * u * tt * x2 + ttt * x3;
    const y = uuu * y0 + 3 * uu * t * y1 + 3 * u * tt * y2 + ttt * y3;

    const dx =
        3 * uu * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * tt * (x3 - x2);
    const dy =
        3 * uu * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * tt * (y3 - y2);

    const angle = Math.atan2(dy, dx);
    return { x, y, angle };
}

export function IndustrialBackground({
    fixed = true,
}: {
    fixed?: boolean;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const vehicles: {
            corridorIdx: number;
            t: number;
            speed: number;
            mode: TransportCorridor["mode"];
            colorType: TransportCorridor["colorType"];
            idTag: string;
        }[] = [];

        CORRIDORS.forEach((corridor, cIdx) => {
            for (let i = 0; i < corridor.vehicleCount; i++) {
                vehicles.push({
                    corridorIdx: cIdx,
                    t: (i / corridor.vehicleCount + cIdx * 0.13) % 1,
                    speed: corridor.speed * (0.92 + (i % 2) * 0.16),
                    mode: corridor.mode,
                    colorType: corridor.colorType,
                    idTag: `${corridor.mode.slice(0, 3)}-0${i + 1}`,
                });
            }
        });

        let phase = 0;
        let animId: number;

        function drawTransportVehicle(
            ctx: CanvasRenderingContext2D,
            mode: TransportCorridor["mode"],
            x: number,
            y: number,
            angle: number,
            strokeColor: string,
            fillColor: string,
            accentColor: string,
            tag: string,
            phase: number
        ) {
            ctx.save();
            ctx.translate(x, y);

            const flipVertical = Math.abs(angle) > Math.PI / 2;
            ctx.rotate(angle);
            if (flipVertical && mode !== "AIR" && mode !== "CONVEYOR") {
                ctx.scale(1, -1);
            }

            ctx.lineWidth = 1.4;
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = fillColor;

            if (mode === "SHIP") {
                ctx.beginPath();
                ctx.moveTo(-20, 4);
                ctx.lineTo(22, 4);
                ctx.lineTo(16, 11);
                ctx.lineTo(-16, 11);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = accentColor;
                ctx.fillRect(-13, -3, 7, 7);
                ctx.strokeRect(-13, -3, 7, 7);
                ctx.fillRect(-5, -3, 7, 7);
                ctx.strokeRect(-5, -3, 7, 7);
                ctx.fillStyle = fillColor;
                ctx.fillRect(3, -5, 6, 9);
                ctx.strokeRect(3, -5, 6, 9);

                ctx.strokeStyle = accentColor;
                ctx.beginPath();
                ctx.moveTo(-22, 8);
                ctx.lineTo(-29 - Math.sin(phase * 3) * 3, 6);
                ctx.moveTo(-22, 10);
                ctx.lineTo(-27 - Math.cos(phase * 3) * 3, 12);
                ctx.stroke();
            } else if (mode === "TRUCK") {
                ctx.fillRect(-18, -6, 22, 11);
                ctx.strokeRect(-18, -6, 22, 11);

                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.moveTo(4, -4);
                ctx.lineTo(13, -4);
                ctx.lineTo(16, 0);
                ctx.lineTo(16, 5);
                ctx.lineTo(4, 5);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = strokeColor;
                [-13, -8, 1, 11].forEach((wx) => {
                    ctx.beginPath();
                    ctx.arc(wx, 6.5, 2.4, 0, Math.PI * 2);
                    ctx.fill();
                });
            } else if (mode === "RAIL") {
                for (let c = -1; c <= 1; c++) {
                    const cx = c * 15;
                    ctx.fillStyle = c === 1 ? accentColor : fillColor;
                    ctx.fillRect(cx - 6, -5, 12, 8);
                    ctx.strokeRect(cx - 6, -5, 12, 8);

                    ctx.fillStyle = strokeColor;
                    ctx.beginPath();
                    ctx.arc(cx - 3, 4.5, 1.8, 0, Math.PI * 2);
                    ctx.arc(cx + 3, 4.5, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.moveTo(-9, -1);
                ctx.lineTo(-6, -1);
                ctx.moveTo(6, -1);
                ctx.lineTo(9, -1);
                ctx.stroke();
            } else if (mode === "AIR") {
                ctx.fillStyle = fillColor;
                ctx.beginPath();
                ctx.moveTo(16, 0);
                ctx.lineTo(8, -2.5);
                ctx.lineTo(-2, -2.5);
                ctx.lineTo(-6, -16);
                ctx.lineTo(-10, -16);
                ctx.lineTo(-8, -2.5);
                ctx.lineTo(-15, -2);
                ctx.lineTo(-18, -7);
                ctx.lineTo(-20, -7);
                ctx.lineTo(-18, 0);
                ctx.lineTo(-20, 7);
                ctx.lineTo(-18, 7);
                ctx.lineTo(-15, 2);
                ctx.lineTo(-8, 2.5);
                ctx.lineTo(-10, 16);
                ctx.lineTo(-6, 16);
                ctx.lineTo(-2, 2.5);
                ctx.lineTo(8, 2.5);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.strokeStyle = accentColor;
                ctx.setLineDash([2, 2]);
                ctx.beginPath();
                ctx.moveTo(-21, -2);
                ctx.lineTo(-32, -2);
                ctx.moveTo(-21, 2);
                ctx.lineTo(-32, 2);
                ctx.stroke();
                ctx.setLineDash([]);
            } else if (mode === "CONVEYOR") {
                ctx.fillStyle = fillColor;
                ctx.fillRect(-9, -7, 18, 14);
                ctx.strokeRect(-9, -7, 18, 14);
                ctx.strokeStyle = accentColor;
                ctx.beginPath();
                ctx.moveTo(-5, 0);
                ctx.lineTo(5, 0);
                ctx.moveTo(0, -4);
                ctx.lineTo(0, 4);
                ctx.stroke();
            } else if (mode === "VAN") {
                ctx.fillStyle = fillColor;
                ctx.beginPath();
                ctx.moveTo(-12, -5);
                ctx.lineTo(6, -5);
                ctx.lineTo(12, 0);
                ctx.lineTo(12, 5);
                ctx.lineTo(-12, 5);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = strokeColor;
                ctx.beginPath();
                ctx.arc(-7, 6, 2.2, 0, Math.PI * 2);
                ctx.arc(7, 6, 2.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            if (width > 768) {
                ctx.save();
                ctx.font = "600 8.5px monospace";
                ctx.fillStyle = strokeColor;
                ctx.fillText(tag, x + 14, y - 10);
                ctx.restore();
            }
        }

        function drawStageNode(
            ctx: CanvasRenderingContext2D,
            stage: StageNode,
            idx: number,
            isDark: boolean,
            phase: number
        ) {
            const x = stage.rx * width;
            const y = stage.ry * height;

            const emeraldStroke = isDark
                ? "rgba(116, 198, 157, 0.55)"
                : "rgba(45, 106, 79, 0.45)";
            const ochreStroke = isDark
                ? "rgba(224, 122, 95, 0.60)"
                : "rgba(200, 90, 50, 0.50)";
            const cardFill = isDark
                ? "rgba(23, 27, 24, 0.85)"
                : "rgba(253, 252, 249, 0.90)";
            const textPrimary = isDark
                ? "rgba(246, 244, 238, 0.78)"
                : "rgba(17, 20, 18, 0.74)";
            const textMuted = isDark
                ? "rgba(163, 173, 166, 0.62)"
                : "rgba(74, 82, 77, 0.65)";

            const ringColor =
                stage.accent === "ochre" ? ochreStroke : emeraldStroke;

            ctx.save();

            // Outer pulsing radar ring
            const pulseR = 26 + Math.sin(phase * 2 + idx) * 5;
            ctx.strokeStyle = ringColor;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(x, y, pulseR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Node base circle
            ctx.fillStyle = cardFill;
            ctx.strokeStyle = ringColor;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Custom CAD Icon inside each stage circle
            ctx.strokeStyle = ringColor;
            ctx.lineWidth = 1.4;
            if (stage.id === "mining") {
                ctx.strokeRect(x - 9, y - 6, 7, 11);
                ctx.strokeRect(x + 2, y - 8, 7, 13);
                ctx.beginPath();
                ctx.moveTo(x - 9, y - 6);
                ctx.lineTo(x - 5.5, y - 11);
                ctx.lineTo(x - 2, y - 6);
                ctx.stroke();
            } else if (stage.id === "sourcing") {
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.stroke();
                for (let a = 0; a < 4; a++) {
                    const ang = (a * Math.PI) / 2 + phase * 0.4;
                    const nx = x + Math.cos(ang) * 10;
                    const ny = y + Math.sin(ang) * 10;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(nx, ny);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(nx, ny, 2, 0, Math.PI * 2);
                    ctx.stroke();
                }
            } else if (stage.id === "procurement") {
                ctx.beginPath();
                ctx.moveTo(x - 10, y + 8);
                ctx.lineTo(x - 6, y - 9);
                ctx.lineTo(x + 11, y - 9);
                ctx.moveTo(x + 4, y - 9);
                ctx.lineTo(x + 4, y + 2);
                ctx.stroke();
                ctx.strokeRect(x + 1, y + 2, 6, 5);
            } else if (stage.id === "manufacturing") {
                ctx.beginPath();
                ctx.moveTo(x - 10, y + 8);
                ctx.lineTo(x - 10, y - 4);
                ctx.lineTo(x - 3, y + 1);
                ctx.lineTo(x - 3, y - 4);
                ctx.lineTo(x + 4, y + 1);
                ctx.lineTo(x + 4, y - 7);
                ctx.lineTo(x + 10, y - 7);
                ctx.lineTo(x + 10, y + 8);
                ctx.closePath();
                ctx.stroke();
            } else if (stage.id === "warehouse") {
                ctx.strokeRect(x - 9, y - 8, 18, 16);
                ctx.beginPath();
                ctx.moveTo(x - 9, y - 2);
                ctx.lineTo(x + 9, y - 2);
                ctx.moveTo(x - 9, y + 3);
                ctx.lineTo(x + 9, y + 3);
                ctx.moveTo(x, y - 8);
                ctx.lineTo(x, y + 8);
                ctx.stroke();
            } else if (stage.id === "delivery") {
                ctx.beginPath();
                ctx.moveTo(x, y - 10);
                ctx.lineTo(x + 9, y - 4);
                ctx.lineTo(x + 9, y + 7);
                ctx.lineTo(x, y + 11);
                ctx.lineTo(x - 9, y + 7);
                ctx.lineTo(x - 9, y - 4);
                ctx.closePath();
                ctx.stroke();
            }

            // Blueprint Callout Label Box
            if (width > 640) {
                const labelX = x + 24;
                const labelY = y - 18;
                const boxW = 148;
                const boxH = 38;

                const finalX =
                    labelX + boxW > width - 16 ? x - boxW - 24 : labelX;

                ctx.fillStyle = cardFill;
                ctx.strokeStyle = ringColor;
                ctx.lineWidth = 1;
                ctx.fillRect(finalX, labelY, boxW, boxH);
                ctx.strokeRect(finalX, labelY, boxW, boxH);

                ctx.font = "700 8.5px monospace";
                ctx.fillStyle = ringColor;
                ctx.fillText(stage.code, finalX + 6, labelY + 11);

                ctx.font = "700 9.5px sans-serif";
                ctx.fillStyle = textPrimary;
                ctx.fillText(stage.title, finalX + 6, labelY + 23);

                ctx.font = "500 8px monospace";
                ctx.fillStyle = textMuted;
                ctx.fillText(stage.metric, finalX + 6, labelY + 33);
            }

            ctx.restore();
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.classList.contains("dark");
            phase += 0.016;

            const emeraldLine = isDark
                ? "rgba(116, 198, 157, 0.24)"
                : "rgba(45, 106, 79, 0.22)";
            const ochreLine = isDark
                ? "rgba(224, 122, 95, 0.26)"
                : "rgba(200, 90, 50, 0.24)";
            const vehicleStroke = isDark
                ? "rgba(246, 244, 238, 0.78)"
                : "rgba(17, 20, 18, 0.72)";
            const emeraldFill = isDark
                ? "rgba(45, 106, 79, 0.75)"
                : "rgba(216, 243, 220, 0.92)";
            const ochreFill = isDark
                ? "rgba(200, 90, 50, 0.75)"
                : "rgba(246, 244, 238, 0.95)";
            const accentEmerald = isDark ? "#74C69D" : "#2D6A4F";
            const accentOchre = isDark ? "#E07A5F" : "#C85A32";

            // 1. Horizontal automated factory conveyor belt tracks in background
            [0.29, 0.54, 0.75].forEach((laneY, idx) => {
                const y = laneY * height;
                ctx.save();
                ctx.strokeStyle = isDark
                    ? "rgba(246, 244, 238, 0.05)"
                    : "rgba(17, 20, 18, 0.05)";
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();

                ctx.strokeStyle = isDark
                    ? "rgba(116, 198, 157, 0.14)"
                    : "rgba(45, 106, 79, 0.14)";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([8, 8]);
                ctx.lineDashOffset = -phase * 25 * (idx % 2 === 0 ? 1 : -1);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
                ctx.restore();
            });

            // 2. Multi-Modal Transport Corridors
            CORRIDORS.forEach((corridor) => {
                const from = SCM_STAGES[corridor.fromIdx];
                const to = SCM_STAGES[corridor.toIdx];

                const x0 = from.rx * width;
                const y0 = from.ry * height;
                const x1 = corridor.cp1x * width;
                const y1 = corridor.cp1y * height;
                const x2 = corridor.cp2x * width;
                const y2 = corridor.cp2y * height;
                const x3 = to.rx * width;
                const y3 = to.ry * height;

                ctx.save();
                ctx.strokeStyle =
                    corridor.colorType === "ochre" ? ochreLine : emeraldLine;
                ctx.lineWidth = corridor.mode === "RAIL" ? 2.2 : 1.6;

                if (corridor.mode === "RAIL") {
                    ctx.setLineDash([6, 4]);
                } else if (corridor.mode === "SHIP") {
                    ctx.setLineDash([10, 6]);
                } else if (corridor.mode === "AIR") {
                    ctx.setLineDash([3, 5]);
                } else {
                    ctx.setLineDash([]);
                }

                ctx.lineDashOffset = -phase * 18;
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
                ctx.stroke();

                if (width > 900) {
                    const mid = cubicPoint(
                        0.5,
                        x0,
                        y0,
                        x1,
                        y1,
                        x2,
                        y2,
                        x3,
                        y3
                    );
                    ctx.font = "600 8px monospace";
                    ctx.fillStyle = isDark
                        ? "rgba(163, 173, 166, 0.45)"
                        : "rgba(74, 82, 77, 0.52)";
                    ctx.fillText(`[${corridor.mode}]`, mid.x - 16, mid.y - 6);
                }

                ctx.restore();
            });

            // 3. Moving Multi-Modal Vehicles
            vehicles.forEach((v) => {
                v.t += v.speed;
                if (v.t > 1) v.t = 0;

                const corridor = CORRIDORS[v.corridorIdx];
                const from = SCM_STAGES[corridor.fromIdx];
                const to = SCM_STAGES[corridor.toIdx];

                const pt = cubicPoint(
                    v.t,
                    from.rx * width,
                    from.ry * height,
                    corridor.cp1x * width,
                    corridor.cp1y * height,
                    corridor.cp2x * width,
                    corridor.cp2y * height,
                    to.rx * width,
                    to.ry * height
                );

                const isOchre = v.colorType === "ochre";
                drawTransportVehicle(
                    ctx,
                    v.mode,
                    pt.x,
                    pt.y,
                    pt.angle,
                    vehicleStroke,
                    isOchre ? ochreFill : emeraldFill,
                    isOchre ? accentOchre : accentEmerald,
                    v.idTag,
                    phase
                );
            });

            // 4. Draw the 6 End-to-End Supply Chain Stage Nodes
            SCM_STAGES.forEach((stage, idx) => {
                drawStageNode(ctx, stage, idx, isDark, phase);
            });

            animId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className={`${
                fixed ? "fixed" : "absolute"
            } inset-0 overflow-hidden pointer-events-none z-0 opacity-85 dark:opacity-70`}
        >
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
