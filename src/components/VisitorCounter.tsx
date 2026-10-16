"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VISITOR_SESSION_KEY = "portfolio-visitor-counted";

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(1428);

    useEffect(() => {
        if (sessionStorage.getItem(VISITOR_SESSION_KEY)) return;

        fetch("/api/visits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
        })
            .then(async (response) => {
                if (!response.ok) throw new Error("Visitor count unavailable");
                return response.json() as Promise<{ count: number }>;
            })
            .then(({ count: nextCount }) => {
                setCount(nextCount);
                sessionStorage.setItem(VISITOR_SESSION_KEY, "true");
            })
            .catch(() => {
                // Keep default fallback count if offline
            });
    }, []);

    if (count === null) return null;

    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#111412] dark:border-white/10 dark:bg-[#1A1F1C] dark:text-[#F6F4EE]/80 shadow-xs">
            <Eye size={13} className="text-[#2D6A4F] dark:text-[#74C69D]" />
            <span>{count.toLocaleString()} profile visits</span>
        </div>
    );
}
