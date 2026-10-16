"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    Cpu,
    Sun,
    Droplets,
    Wifi,
    Truck,
    Sliders,
    Play,
    Pause,
    RotateCcw,
    Gauge,
    Zap,
    Boxes,
} from "lucide-react";

export function InteractiveSimulations({
    activeSimTab,
    setActiveSimTab,
}: {
    activeSimTab?: "scm" | "iot";
    setActiveSimTab?: (tab: "scm" | "iot") => void;
}) {
    const [internalTab, setInternalTab] = useState<"scm" | "iot">("scm");
    const currentTab = activeSimTab ?? internalTab;
    const handleTabChange = (t: "scm" | "iot") => {
        setInternalTab(t);
        setActiveSimTab?.(t);
    };

    // =========================================================
    // STATE 1: SUPPLY CHAIN WHAT-IF SIMULATOR (8 NODES, 320+ ORDERS)
    // =========================================================
    const [demandShock, setDemandShock] = useState<number>(100); // 70% to 160%
    const [leadTimeTenths, setLeadTimeTenths] = useState<number>(32); // 10 to 90 -> 1.0 to 9.0 days
    const [safetyPolicy, setSafetyPolicy] = useState<1 | 2 | 3>(2); // 1=90%, 2=95%, 3=99%
    const [forecastModel, setForecastModel] = useState<"ma" | "es" | "ml">("es");
    const [abcClass, setAbcClass] = useState<"ALL" | "AX" | "BY" | "CZ">("ALL");
    const [selectedNode, setSelectedNode] = useState<number>(0);

    const leadDays = (leadTimeTenths / 10).toFixed(1);
    const zScores = { 1: 1.28, 2: 1.65, 3: 2.33 };
    const cslLabels = {
        1: "90% CSL (Z = 1.28σ)",
        2: "95% CSL (Z = 1.65σ)",
        3: "99% CSL (Z = 2.33σ)",
    };

    const modelBonus = forecastModel === "ml" ? 1.8 : forecastModel === "es" ? 0.8 : 0;
    const classFactor =
        abcClass === "AX" ? 1.05 : abcClass === "BY" ? 0.96 : abcClass === "CZ" ? 0.88 : 1.0;

    const computedFillRate = Math.max(
        78.5,
        Math.min(
            99.7,
            (96.7 -
                (demandShock - 100) * 0.13 -
                (leadTimeTenths - 32) * 0.11 +
                (safetyPolicy - 2) * 2.2 +
                modelBonus) *
                (abcClass === "CZ" ? 0.96 : 1)
        )
    ).toFixed(1);

    const computedOTD = Math.max(
        74.0,
        Math.min(
            99.1,
            94.1 -
                (leadTimeTenths - 32) * 0.18 -
                Math.max(0, demandShock - 110) * 0.11 +
                (safetyPolicy - 2) * 1.2 +
                modelBonus * 0.5
        )
    ).toFixed(1);

    const computedTurnover = Math.max(
        9.5,
        Math.min(
            32.0,
            (23.47 * (demandShock / 100) - (safetyPolicy - 2) * 2.6) * classFactor
        )
    ).toFixed(2);

    const computedDSI = Math.max(
        8.2,
        Math.min(38.0, 365 / parseFloat(computedTurnover))
    ).toFixed(2);

    const baseMape = forecastModel === "ml" ? 3.4 : forecastModel === "es" ? 4.8 : 6.5;
    const computedMape = Math.max(
        2.4,
        Math.min(
            14.5,
            baseMape +
                Math.abs(demandShock - 100) * 0.055 +
                (leadTimeTenths - 32) * 0.025 +
                (abcClass === "CZ" ? 2.1 : 0)
        )
    ).toFixed(1);

    const safetyStockUnits = Math.round(
        42 * zScores[safetyPolicy] * Math.sqrt(leadTimeTenths / 10) * (demandShock / 100)
    );
    const reorderPointUnits = Math.round(
        38 * (leadTimeTenths / 10) * (demandShock / 100) + safetyStockUnits
    );

    const vendorNodes = [
        { id: "V1", name: "Bengaluru Precision Hub", region: "South", otd: "97.2%", orders: 54 },
        { id: "V2", name: "Chennai Port Logistics", region: "South", otd: "95.4%", orders: 46 },
        { id: "V3", name: "Pune Industrial Tier-1", region: "West", otd: "94.8%", orders: 42 },
        { id: "V4", name: "Mumbai Freight Corridor", region: "West", otd: "92.6%", orders: 48 },
        { id: "V5", name: "Delhi NCR Distribution", region: "North", otd: "93.5%", orders: 39 },
        { id: "V6", name: "Hyderabad Aero Node", region: "South", otd: "96.8%", orders: 38 },
        { id: "V7", name: "Ahmedabad Bulk Vendor", region: "West", otd: "91.9%", orders: 31 },
        { id: "V8", name: "Kolkata Eastern Depot", region: "East", otd: "90.8%", orders: 26 },
    ];

    const baselineMonthlyDemand = [28, 31, 29, 34, 32, 36, 35, 39, 37, 41, 38, 42];

    // =========================================================
    // STATE 2: IOT SOLAR TRACKER & PRECISION AGRICULTURE SIMULATOR
    // =========================================================
    const [sunAngle, setSunAngle] = useState<number>(105); // 15 deg (East 06:30) to 165 deg (West 17:30)
    const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
    const [cloudCover, setCloudCover] = useState<number>(12); // 0% to 80%
    const [soilMoisture, setSoilMoisture] = useState<number>(32); // 15% to 85%
    const [ambientTemp, setAmbientTemp] = useState<number>(31); // 18C to 42C

    useEffect(() => {
        if (!autoOrbit || currentTab !== "iot") return;
        const timer = setInterval(() => {
            setSunAngle((prev) => (prev >= 162 ? 18 : prev + 1.5));
        }, 120);
        return () => clearInterval(timer);
    }, [autoOrbit, currentTab]);

    // Convert sunAngle (15..165) to Time of Day
    const totalMinutes = Math.round(6 * 60 + ((sunAngle - 15) / 150) * (12 * 60));
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeFormatted = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    // Solar physics & Arduino LDR + Servo + MPPT calculations
    const sunElevationFactor = Math.sin((sunAngle * Math.PI) / 180); // peaks at 90 deg
    const cloudAttenuation = 1 - (cloudCover / 100) * 0.72;
    const baseIrradiance = Math.max(80, Math.round(980 * sunElevationFactor * cloudAttenuation));

    const ldrEastLux = Math.round(
        baseIrradiance * Math.max(0.2, Math.cos(((sunAngle - 35) * Math.PI) / 180))
    );
    const ldrWestLux = Math.round(
        baseIrradiance * Math.max(0.2, Math.cos(((145 - sunAngle) * Math.PI) / 180))
    );

    // Servo angle tilts panel perpendicular to sunAngle (-65 deg to +65 deg)
    const servoTiltDeg = Math.round(90 - sunAngle);

    // Fixed panel loses cosine efficiency when sun is away from 90 deg; tracked panel stays locked
    const fixedCosine = Math.max(0.28, Math.sin((sunAngle * Math.PI) / 180));
    const fixedWatts = +(18.5 * fixedCosine * cloudAttenuation).toFixed(1);
    const trackedWatts = +(
        Math.min(24.8, fixedWatts * (1.28 + (1 - fixedCosine) * 0.22))
    ).toFixed(1);
    const efficiencyGainPct = Math.max(
        18,
        Math.round(((trackedWatts - fixedWatts) / Math.max(1, fixedWatts)) * 100)
    );
    const mpptVoltage = +(17.4 + sunElevationFactor * 1.4 - cloudCover * 0.01).toFixed(2);
    const mpptCurrent = +(trackedWatts / mpptVoltage).toFixed(2);

    const humidityPct = Math.max(25, Math.min(88, Math.round(72 - (ambientTemp - 25) * 1.6 + cloudCover * 0.2)));
    const pumpActive = soilMoisture < 38;

    // Sun position on SVG arc
    const rad = (sunAngle * Math.PI) / 180;
    const sunSvgX = 250 - Math.cos(rad) * 175;
    const sunSvgY = 205 - Math.sin(rad) * 155;

    return (
        <section
            id="simulations"
            className="relative py-28 bg-[#ECE8DD]/45 dark:bg-[#141816]/70 border-y border-black/10 dark:border-white/10 overflow-hidden scroll-mt-24"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
                {/* Header & Simulation Switcher */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
                    <div>
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 flex items-center gap-2">
                            <Sliders size={14} />
                            Interactive_Engineering_Lab // Live Telemetry
                        </label>
                        <h2 className="font-headline text-4xl sm:text-6xl font-black tracking-tight text-foreground uppercase leading-none">
                            LIVE SYSTEM <span className="text-[#2D6A4F] dark:text-[#74C69D]">SIMULATORS</span>
                        </h2>
                        <p className="font-body text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl">
                            Interactive digital twins for Siddharth&apos;s flagship systems — test real-time inventory &amp; lead-time trade-offs across 8 vendor nodes or run the Arduino Uno + MPPT + NodeMCU solar tracking &amp; precision irrigation rig.
                        </p>
                    </div>

                    {/* Simulator Tabs */}
                    <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 shadow-md self-start lg:self-auto">
                        <button
                            type="button"
                            onClick={() => handleTabChange("scm")}
                            className={`px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                                currentTab === "scm"
                                    ? "bg-[#111412] text-[#F6F4EE] dark:bg-[#74C69D] dark:text-[#081C15] shadow"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Truck size={15} />
                            <span>01 // Supply Chain Sim</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("iot")}
                            className={`px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                                currentTab === "iot"
                                    ? "bg-[#2D6A4F] text-white dark:bg-[#74C69D] dark:text-[#081C15] shadow"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Sun size={15} />
                            <span>02 // IoT Solar &amp; Ag Sim</span>
                        </button>
                    </div>
                </div>

                {/* =========================================================
                    TAB 1: SUPPLY CHAIN & DISTRIBUTION ANALYTICS SIMULATOR
                   ========================================================= */}
                {currentTab === "scm" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                    >
                        {/* Left 7 Cols: Interactive 8-Vendor Node Topology & Demand Horizon */}
                        <div className="lg:col-span-7 bg-white dark:bg-[#1A1F1C] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-between crosshair-card">
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-black/10 dark:border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-ping" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                                        8-Vendor Node Distribution Topology · 320+ Orders
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                                    {(["ALL", "AX", "BY", "CZ"] as const).map((cls) => (
                                        <button
                                            key={cls}
                                            type="button"
                                            onClick={() => setAbcClass(cls)}
                                            className={`px-2.5 py-1 rounded-md font-bold uppercase transition-colors cursor-pointer ${
                                                abcClass === cls
                                                    ? "bg-[#2D6A4F] text-white dark:bg-[#74C69D] dark:text-[#081C15]"
                                                    : "bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10"
                                            }`}
                                        >
                                            {cls === "ALL" ? "All SKUs" : `Class ${cls}`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interactive SVG Multi-Node Logistics Map */}
                            <div className="relative w-full rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 p-4 overflow-hidden">
                                <svg viewBox="0 0 680 280" className="w-full h-auto">
                                    <defs>
                                        <pattern id="scmGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                                            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(45,106,79,0.12)" strokeWidth="0.75" />
                                        </pattern>
                                    </defs>
                                    <rect width="680" height="280" fill="url(#scmGrid)" />

                                    {/* Central DC Hub */}
                                    <g transform="translate(340, 140)">
                                        <circle r="42" fill="rgba(45, 106, 79, 0.12)" stroke="#2D6A4F" strokeWidth="1.5" strokeDasharray="4 3" />
                                        <rect x="-32" y="-22" width="64" height="44" rx="8" fill="#2D6A4F" stroke="#081C15" strokeWidth="2" />
                                        <text x="0" y="-3" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[9px] font-bold">
                                            CENTRAL_DC
                                        </text>
                                        <text x="0" y="10" textAnchor="middle" fill="#D8F3DC" className="font-mono text-[8px]">
                                            ROP: {reorderPointUnits}u
                                        </text>
                                    </g>

                                    {/* 8 Vendor Nodes radially connected */}
                                    {vendorNodes.map((node, idx) => {
                                        const angle = (idx / 8) * Math.PI * 2 - Math.PI / 2;
                                        const nx = 340 + Math.cos(angle) * 220;
                                        const ny = 140 + Math.sin(angle) * 102;
                                        const isSel = selectedNode === idx;

                                        return (
                                            <g
                                                key={node.id}
                                                onClick={() => setSelectedNode(idx)}
                                                className="cursor-pointer"
                                            >
                                                <line
                                                    x1={nx}
                                                    y1={ny}
                                                    x2={340}
                                                    y2={140}
                                                    stroke={isSel ? "#C85A32" : "rgba(45, 106, 79, 0.4)"}
                                                    strokeWidth={isSel ? "2.5" : "1.5"}
                                                    strokeDasharray="5 4"
                                                />
                                                <circle r="4" fill="#C85A32">
                                                    <animateMotion
                                                        path={`M ${nx} ${ny} L 340 140`}
                                                        dur={`${Math.max(1.2, (leadTimeTenths / 15) - idx * 0.1)}s`}
                                                        repeatCount="indefinite"
                                                    />
                                                </circle>
                                                <rect
                                                    x={nx - 34}
                                                    y={ny - 18}
                                                    width="68"
                                                    height="36"
                                                    rx="7"
                                                    fill={isSel ? "#C85A32" : "#FFFFFF"}
                                                    stroke={isSel ? "#111412" : "#2D6A4F"}
                                                    strokeWidth="1.75"
                                                />
                                                <text
                                                    x={nx}
                                                    y={ny - 2}
                                                    textAnchor="middle"
                                                    fill={isSel ? "#FFFFFF" : "#111412"}
                                                    className="font-mono text-[9px] font-bold"
                                                >
                                                    {node.id} · {node.region}
                                                </text>
                                                <text
                                                    x={nx}
                                                    y={ny + 10}
                                                    textAnchor="middle"
                                                    fill={isSel ? "#F6F4EE" : "#2D6A4F"}
                                                    className="font-mono text-[8px]"
                                                >
                                                    OTD {node.otd}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>

                                {/* Selected Vendor Node Telemetry Bar */}
                                <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#1A1F1C] border border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                                    <div>
                                        <span className="font-bold text-[#C85A32]">
                                            ACTIVE NODE [{vendorNodes[selectedNode].id}]:
                                        </span>{" "}
                                        <span className="font-semibold">{vendorNodes[selectedNode].name}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[11px]">
                                        <span>Orders: <strong>{Math.round(vendorNodes[selectedNode].orders * (demandShock / 100))}</strong></span>
                                        <span>Node OTD: <strong className="text-[#2D6A4F] dark:text-[#74C69D]">{vendorNodes[selectedNode].otd}</strong></span>
                                        <span>Safety Buffer: <strong>{SafetyStockPerNode(safetyStockUnits)}u</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* 12-Month Demand vs. Replenishment Bar Telemetry */}
                            <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10">
                                <div className="flex items-center justify-between font-mono text-[11px] mb-3">
                                    <span className="font-bold uppercase tracking-wider">
                                        12-Period Demand Signal vs. Smoothed Supply Plan ({forecastModel.toUpperCase()})
                                    </span>
                                    <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold">
                                        ROP: {reorderPointUnits} Units · SS: {safetyStockUnits} Units
                                    </span>
                                </div>
                                <div className="grid grid-cols-12 gap-1.5 items-end h-28 pt-4 px-2 bg-[#F6F4EE] dark:bg-[#111412] rounded-xl border border-black/5 dark:border-white/5">
                                    {baselineMonthlyDemand.map((val, i) => {
                                        const actual = Math.min(100, Math.round((val * (demandShock / 100)) * 1.4));
                                        const plan = Math.min(100, Math.round(actual * 0.92 + safetyPolicy * 5));
                                        return (
                                            <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                                                <div className="w-full flex items-end justify-center gap-0.5 h-20">
                                                    <div
                                                        style={{ height: `${actual}%` }}
                                                        className="w-2 bg-[#C85A32] rounded-t transition-all duration-300"
                                                        title={`Demand: ${actual}`}
                                                    />
                                                    <div
                                                        style={{ height: `${plan}%` }}
                                                        className="w-2 bg-[#2D6A4F] dark:bg-[#74C69D] rounded-t transition-all duration-300"
                                                        title={`Supply Plan: ${plan}`}
                                                    />
                                                </div>
                                                <span className="font-mono text-[8px] opacity-60">M{i + 1}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right 5 Cols: What-If Controls & Live KPI Readouts */}
                        <div className="lg:col-span-5 bg-white dark:bg-[#1A1F1C] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-between space-y-6 crosshair-card">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#2D6A4F] dark:text-[#74C69D] font-bold block">
                                            Scenario Parameters
                                        </span>
                                        <h3 className="font-headline text-2xl font-black uppercase tracking-tight">
                                            What-If Optimizer
                                        </h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDemandShock(100);
                                            setLeadTimeTenths(32);
                                            setSafetyPolicy(2);
                                            setForecastModel("es");
                                            setAbcClass("ALL");
                                        }}
                                        className="px-3 py-1.5 rounded-lg bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 font-mono text-[10px] font-bold uppercase flex items-center gap-1 hover:border-[#2D6A4F] cursor-pointer"
                                    >
                                        <RotateCcw size={12} /> Reset
                                    </button>
                                </div>

                                {/* Sliders */}
                                <div className="space-y-4 font-mono text-xs">
                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Demand Shock / Surge:</span>
                                            <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold">
                                                {demandShock}% {demandShock === 100 ? "(Baseline)" : demandShock > 100 ? "(Surge)" : "(Contracted)"}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={70}
                                            max={160}
                                            value={demandShock}
                                            onChange={(e) => setDemandShock(Number(e.target.value))}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Avg Supplier Lead Time:</span>
                                            <span className="text-[#C85A32] font-bold">{leadDays} Days</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={10}
                                            max={90}
                                            value={leadTimeTenths}
                                            onChange={(e) => setLeadTimeTenths(Number(e.target.value))}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Safety Stock Service Level:</span>
                                            <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold">
                                                {cslLabels[safetyPolicy]}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={1}
                                            max={3}
                                            step={1}
                                            value={safetyPolicy}
                                            onChange={(e) => setSafetyPolicy(Number(e.target.value) as 1 | 2 | 3)}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>

                                    {/* Forecasting Method Selector */}
                                    <div className="pt-1">
                                        <span className="font-bold block mb-2">Forecasting Engine:</span>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { id: "ma", label: "Moving Avg" },
                                                { id: "es", label: "Exp Smoothing" },
                                                { id: "ml", label: "URIP Prophet ML" },
                                            ].map((m) => (
                                                <button
                                                    key={m.id}
                                                    type="button"
                                                    onClick={() => setForecastModel(m.id as "ma" | "es" | "ml")}
                                                    className={`py-2 px-2 rounded-xl font-mono text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                                                        forecastModel === m.id
                                                            ? "bg-[#2D6A4F] text-white border-transparent dark:bg-[#74C69D] dark:text-[#081C15]"
                                                            : "bg-[#F6F4EE] dark:bg-[#111412] border-black/10 dark:border-white/10"
                                                    }`}
                                                >
                                                    {m.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Live KPI Output Matrix */}
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                                <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                                        Order Fill Rate
                                    </span>
                                    <span className="font-headline text-2xl sm:text-3xl font-black text-[#2D6A4F] dark:text-[#74C69D]">
                                        {computedFillRate}%
                                    </span>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                                        On-Time Delivery
                                    </span>
                                    <span className="font-headline text-2xl sm:text-3xl font-black">
                                        {computedOTD}%
                                    </span>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                                        Inventory Turnover
                                    </span>
                                    <span className="font-headline text-2xl font-black">
                                        {computedTurnover}x{" "}
                                        <span className="text-xs font-mono text-muted-foreground">({computedDSI} DSI)</span>
                                    </span>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[10px] uppercase text-muted-foreground block">
                                        Forecast MAPE
                                    </span>
                                    <span className="font-headline text-2xl sm:text-3xl font-black text-[#C85A32]">
                                        {computedMape}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* =========================================================
                    TAB 2: IOT SOLAR TRACKER & PRECISION AGRICULTURE SIMULATOR
                   ========================================================= */}
                {currentTab === "iot" && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
                    >
                        {/* Left 7 Cols: Interactive Solar Tracker Hardware & Sun Arc Visualizer */}
                        <div className="lg:col-span-7 bg-white dark:bg-[#1A1F1C] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-between crosshair-card">
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-black/10 dark:border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <Cpu size={16} className="text-[#2D6A4F] dark:text-[#74C69D]" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                                        Arduino Uno + LDR + Servo + MPPT + NodeMCU (ESP8266)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setAutoOrbit(!autoOrbit)}
                                        className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] text-white dark:bg-[#74C69D] dark:text-[#081C15] font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                                    >
                                        {autoOrbit ? <Pause size={12} /> : <Play size={12} />}
                                        <span>{autoOrbit ? "Pause Sun Cycle" : "Auto-Orbit Sun"}</span>
                                    </button>
                                    <span className="px-2.5 py-1 rounded bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 font-mono text-[10px] font-bold">
                                        {timeFormatted} IST
                                    </span>
                                </div>
                            </div>

                            {/* Interactive SVG Sun Arc + Tilting Solar Panel + Agricultural Sensors */}
                            <div className="relative w-full rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 p-4 overflow-hidden">
                                <svg viewBox="0 0 500 240" className="w-full h-auto">
                                    {/* Sky Solar Trajectory Arc */}
                                    <path
                                        d="M 75 205 A 175 155 0 0 1 425 205"
                                        fill="none"
                                        stroke="rgba(200, 90, 50, 0.35)"
                                        strokeWidth="1.5"
                                        strokeDasharray="6 4"
                                    />

                                    {/* East / West Horizon Labels */}
                                    <text x="55" y="222" className="font-mono text-[9px] font-bold" fill="#2D6A4F">
                                        EAST (06:00)
                                    </text>
                                    <text x="385" y="222" className="font-mono text-[9px] font-bold" fill="#C85A32">
                                        WEST (18:00)
                                    </text>

                                    {/* Ray from Sun to Solar Array */}
                                    <line
                                        x1={sunSvgX}
                                        y1={sunSvgY}
                                        x2={250}
                                        y2={175}
                                        stroke="rgba(217, 119, 6, 0.55)"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                    />

                                    {/* Animated Sun */}
                                    <g transform={`translate(${sunSvgX}, ${sunSvgY})`}>
                                        <circle r="22" fill="rgba(217, 119, 6, 0.18)" />
                                        <circle r="13" fill="#D97706" stroke="#111412" strokeWidth="1.5" />
                                    </g>

                                    {/* Ground Horizon Line */}
                                    <line x1="20" y1="205" x2="480" y2="205" stroke="#2D6A4F" strokeWidth="2" />

                                    {/* Pedestal & Servo Mount at (250, 205) */}
                                    <rect x="244" y="175" width="12" height="30" fill="#111412" />
                                    <circle cx="250" cy="175" r="6" fill="#C85A32" />

                                    {/* Tilting Solar Panel Group */}
                                    <g transform={`translate(250, 175) rotate(${-servoTiltDeg})`}>
                                        <rect
                                            x="-55"
                                            y="-8"
                                            width="110"
                                            height="10"
                                            rx="3"
                                            fill="#1B4332"
                                            stroke="#74C69D"
                                            strokeWidth="1.5"
                                        />
                                        {/* LDR East & West Sensors on panel edges */}
                                        <circle cx="-50" cy="-10" r="3.5" fill="#D97706" />
                                        <circle cx="50" cy="-10" r="3.5" fill="#D97706" />
                                    </g>

                                    {/* Telemetry Callouts inside SVG */}
                                    <g transform="translate(16, 18)">
                                        <rect width="142" height="48" rx="6" fill="rgba(255,255,255,0.85)" stroke="rgba(17,20,18,0.15)" />
                                        <text x="10" y="18" className="font-mono text-[9px] font-bold" fill="#111412">
                                            LDR_EAST: {ldrEastLux} lx
                                        </text>
                                        <text x="10" y="34" className="font-mono text-[9px] font-bold" fill="#111412">
                                            LDR_WEST: {ldrWestLux} lx
                                        </text>
                                    </g>

                                    <g transform="translate(340, 18)">
                                        <rect width="144" height="48" rx="6" fill="rgba(255,255,255,0.85)" stroke="rgba(17,20,18,0.15)" />
                                        <text x="10" y="18" className="font-mono text-[9px] font-bold" fill="#2D6A4F">
                                            SERVO θ: {servoTiltDeg > 0 ? `+${servoTiltDeg}°` : `${servoTiltDeg}°`}
                                        </text>
                                        <text x="10" y="34" className="font-mono text-[9px] font-bold" fill="#C85A32">
                                            GAIN: +{efficiencyGainPct}% vs Fixed
                                        </text>
                                    </g>
                                </svg>

                                {/* Blynk IoT Serial Telemetry Stream */}
                                <div className="mt-3 p-3 rounded-xl bg-[#111412] text-[#D8F3DC] font-mono text-[11px] flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Wifi size={14} className="text-[#74C69D] animate-pulse" />
                                        <span>ESP8266 → BLYNK_CLOUD:</span>
                                        <code className="text-amber-300">
                                            {`{"V_mp":${mpptVoltage},"I_mp":${mpptCurrent},"W":${trackedWatts},"soil":${soilMoisture}%}`}
                                        </code>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            pumpActive ? "bg-[#C85A32] text-white" : "bg-[#2D6A4F] text-white"
                                        }`}
                                    >
                                        {pumpActive ? "PUMP_RELAY: IRRIGATING" : "PUMP_RELAY: STANDBY"}
                                    </span>
                                </div>
                            </div>

                            {/* Agricultural Sensor Status Strip */}
                            <div className="grid grid-cols-3 gap-3 mt-5">
                                <div className="p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[9px] uppercase text-muted-foreground block">
                                        MPPT Tracked Output
                                    </span>
                                    <span className="font-headline text-xl font-black text-[#2D6A4F] dark:text-[#74C69D]">
                                        {trackedWatts} W{" "}
                                        <span className="text-[10px] font-mono text-muted-foreground">
                                            (Fixed: {fixedWatts}W)
                                        </span>
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[9px] uppercase text-muted-foreground block">
                                        Soil Moisture &amp; Temp
                                    </span>
                                    <span className="font-headline text-xl font-black">
                                        {soilMoisture}% · {ambientTemp}°C
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                    <span className="font-mono text-[9px] uppercase text-muted-foreground block">
                                        Relative Humidity
                                    </span>
                                    <span className="font-headline text-xl font-black text-[#C85A32]">
                                        {humidityPct}% RH
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right 5 Cols: IoT Hardware & Agricultural Environment Controls */}
                        <div className="lg:col-span-5 bg-white dark:bg-[#1A1F1C] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-between space-y-6 crosshair-card">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#2D6A4F] dark:text-[#74C69D] font-bold block">
                                            Hardware-In-The-Loop Controls
                                        </span>
                                        <h3 className="font-headline text-2xl font-black uppercase tracking-tight">
                                            Solar &amp; Irrigation Sim
                                        </h3>
                                    </div>
                                    <a
                                        href="https://drive.google.com/drive/folders/1Wwy_tVx-C1vi1b9tsAx7gP8-48jQ7nZ3?usp=drive_link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] text-white font-mono text-[10px] font-bold uppercase"
                                    >
                                        Project Drive ↗
                                    </a>
                                </div>

                                <div className="space-y-4 font-mono text-xs">
                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Sun Azimuth Angle ({timeFormatted}):</span>
                                            <span className="text-[#C85A32] font-bold">{Math.round(sunAngle)}°</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={15}
                                            max={165}
                                            value={sunAngle}
                                            onChange={(e) => {
                                                setAutoOrbit(false);
                                                setSunAngle(Number(e.target.value));
                                            }}
                                            className="w-full accent-[#C85A32] cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Cloud Cover Attenuation:</span>
                                            <span className="text-[#2D6A4F] dark:text-[#74C69D] font-bold">{cloudCover}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={80}
                                            value={cloudCover}
                                            onChange={(e) => setCloudCover(Number(e.target.value))}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Soil Moisture Sensor ( Threshold 38% ):</span>
                                            <span className={`font-bold ${pumpActive ? "text-[#C85A32]" : "text-[#2D6A4F] dark:text-[#74C69D]"}`}>
                                                {soilMoisture}% {pumpActive ? "(Dry → Pump ON)" : "(Optimal)"}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min={15}
                                            max={85}
                                            value={soilMoisture}
                                            onChange={(e) => setSoilMoisture(Number(e.target.value))}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-bold">Field Temperature Sensor (DHT11):</span>
                                            <span className="font-bold">{ambientTemp}°C</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={18}
                                            max={42}
                                            value={ambientTemp}
                                            onChange={(e) => setAmbientTemp(Number(e.target.value))}
                                            className="w-full accent-[#2D6A4F] cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hardware Stack Breakdown */}
                            <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 space-y-2.5 font-mono text-xs">
                                <div className="font-bold uppercase text-[#2D6A4F] dark:text-[#74C69D] flex items-center gap-2">
                                    <Zap size={14} /> Active Hardware Telemetry
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[11px]">
                                    <div>MPPT Bus: <strong>{mpptVoltage}V @ {mpptCurrent}A</strong></div>
                                    <div>Efficiency Gain: <strong className="text-[#2D6A4F] dark:text-[#74C69D]">+{efficiencyGainPct}%</strong></div>
                                    <div>Servo PWM: <strong>{1500 + servoTiltDeg * 8} µs</strong></div>
                                    <div>Irrigation: <strong className={pumpActive ? "text-[#C85A32]" : "text-[#2D6A4F]"}>{pumpActive ? "ACTIVE" : "IDLE"}</strong></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function SafetyStockPerNode(totalSS: number) {
    return Math.round(totalSS / 8);
}
