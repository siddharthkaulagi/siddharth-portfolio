import { Cpu, Truck, LineChart, type LucideIcon } from "lucide-react";

export type ExperienceCategory = "learning" | "simulation";

export interface ExperienceItem {
    id: string;
    role: string;
    organization: string;
    period: string;
    type: string;
    category: ExperienceCategory;
    icon: LucideIcon;
    color: string;
    focus: string;
    stack: string[];
    certificateLink: string;
    image: string;
    highlights: string[];
}

export const experiences: ExperienceItem[] = [
    {
        id: "ge-supply-chain",
        role: "Supply Chain Job Simulation",
        organization: "GE Aerospace / GE Healthcare (Forage)",
        period: "Jan 2026 — Feb 2026",
        type: "Virtual Experience",
        category: "simulation",
        icon: Truck,
        color: "text-[#2D6A4F] dark:text-[#74C69D]",
        focus: "Aerospace & Healthcare SCM — GEnx-1B engine drawings, BOM/GD&T inspection, turbofan fixture requirements & non-conforming blade disposition",
        stack: ["Supply Chain", "BOM & GD&T", "Root Cause Analysis", "Quality Disposition", "Procurement Ops"],
        certificateLink:
            "https://drive.google.com/file/d/1hLZb5NRx9oMa3Omhv6TCYdxajsVRo617/view?usp=sharing",
        image: "/certificates/ge-aerospace-supply-chain.png",
        highlights: [
            "Reviewed GEnx-1B engine drawings, Bills of Materials (BOM), and Geometric Dimensioning and Tolerancing (GD&T) specifications to evaluate non-conforming turbine blade components and turbofan disassembly fixture requirements.",
            "Coordinated quality disposition decisions across procurement, quality, and engineering teams; performed root cause analysis (RCA) and developed structured corrective action recommendations.",
            "Ensured data integrity and traceability across compliance and supply records; prepared analytical reports translating findings into clear action plans for operations, quality, and logistics stakeholders.",
        ],
    },
    {
        id: "innomatics-learning",
        role: "Agentic AI Intern · AI Systems Learning Program",
        organization: "Innomatics Research Labs · Remote",
        period: "Feb 2026 — May 2026",
        type: "Learning Internship",
        category: "learning",
        icon: Cpu,
        color: "text-[#C85A32] dark:text-[#E07A5F]",
        focus: "Structured remote internship covering Python fundamentals, FastAPI, LangChain, RAG pipelines, and AI agent workflow automation",
        stack: ["Python", "FastAPI", "LangChain", "RAG", "Prompt Engineering", "Workflow Automation"],
        certificateLink:
            "https://drive.google.com/file/d/11Af7ZMEhsMjC0E5Melpq87Ouy46ujK9p/view?usp=sharing",
        image: "/certificates/innomatics-agentic-ai.png",
        highlights: [
            "Completed a structured learning internship covering Python fundamentals, FastAPI, LangChain, RAG pipelines, prompt engineering, and AI agent concepts through progressive hands-on assignments.",
            "Built foundational projects across workflow automation, data visualization, documentation, and automated analytics reporting.",
        ],
    },
    {
        id: "gs-operations",
        role: "Operations Job Simulation",
        organization: "Goldman Sachs (Forage)",
        period: "Jan 2026",
        type: "Virtual Experience",
        category: "simulation",
        icon: LineChart,
        color: "text-[#1B4332] dark:text-[#95D5B2]",
        focus: "Operations foundations & ultra-high-net-worth transaction facilitation and process review",
        stack: ["Operations", "Finance Ops", "Process Review", "Client Service", "Documentation"],
        certificateLink:
            "https://drive.google.com/file/d/1w6zlVwB0M-0c1axD_nJDzPf3HgAR-D6u/view?usp=drive_link",
        image: "/certificates/goldman-sachs-operations.png",
        highlights: [
            "Completed practical tasks in foundations of operations and client-service workflows for high-net-worth banking scenarios.",
            "Facilitated ultra-high-net-worth transaction analysis through structured operational documentation and process reviews.",
        ],
    },
];

export const experienceSummary = {
    learningPrograms: 1,
    virtualSimulations: 2,
    certifications: 6,
};

export const RESUME_URL =
    "https://drive.google.com/file/d/1K17iyrLkLaXjdFCfwDWIo6WSJqlwJDae/view?usp=sharing";

export const MASTER_CERTIFICATES_FOLDER =
    "https://drive.google.com/drive/folders/1I0L_kZsf2M7fK8glmOWHSc5T4bh8iUZS";

export const specializedResumes = [
    {
        id: "scm-analyst",
        title: "Supply Chain Analyst Resume",
        role: "Supply Chain Analytics · Inventory Optimization · KPI Management",
        file: "/Siddharth_Supply_Chain_Analyst.pdf",
        driveUrl: RESUME_URL,
    },
    {
        id: "procurement",
        title: "Graduate Trainee — Procurement",
        role: "Sourcing · Supplier Coordination · BOM & GD&T · SAP S/4HANA",
        file: "/Siddharth_Graduate_Trainee___Procurement.pdf",
        driveUrl: RESUME_URL,
    },
    {
        id: "ie-planner",
        title: "IE & Supply Chain Planner",
        role: "Demand & Supply Planning · Lean 5S & Kaizen · Operations",
        file: "/Siddharth_IE_SCM_Planner.pdf",
        driveUrl: RESUME_URL,
    },
    {
        id: "pm-cv",
        title: "Project Management & Operations CV",
        role: "Industrial Engineering · CPM & Kanban · AI-Assisted Build",
        file: "/Siddharth_Kaulagi_CV.pdf",
        driveUrl: RESUME_URL,
    },
];

export const certificateLinks: Record<string, { label: string; url: string }> = {
    lean: {
        label: "Lean Six Sigma White Belt (CSSC)",
        url: "https://drive.google.com/file/d/1daBqPaVrRpSiWnuryYpndtuRmSFQ3_1M/view?usp=sharing",
    },
    innomatics: {
        label: "Innomatics Agentic AI Internship",
        url: "https://drive.google.com/file/d/11Af7ZMEhsMjC0E5Melpq87Ouy46ujK9p/view?usp=sharing",
    },
    tata: {
        label: "Tata Data Visualisation Simulation",
        url: "https://drive.google.com/file/d/1zbapiP-Um0fpoRwEfpWtstppRY-qKFgf/view?usp=drive_link",
    },
    goldman: {
        label: "Goldman Sachs Operations Simulation",
        url: "https://drive.google.com/file/d/1w6zlVwB0M-0c1axD_nJDzPf3HgAR-D6u/view?usp=drive_link",
    },
    ge: {
        label: "GE Aerospace / Healthcare Supply Chain",
        url: "https://drive.google.com/file/d/1hLZb5NRx9oMa3Omhv6TCYdxajsVRo617/view?usp=sharing",
    },
    sap: {
        label: "SAP S/4HANA Supply Chain for Transportation",
        url: "https://drive.google.com/file/d/1vW4ElA4km79gwgVxTPBS4A2K7b2mxPqS/view?usp=drive_link",
    },
    all: {
        label: "Master Certificates Folder (All Verified Credentials)",
        url: "https://drive.google.com/drive/folders/1I0L_kZsf2M7fK8glmOWHSc5T4bh8iUZS",
    },
};
