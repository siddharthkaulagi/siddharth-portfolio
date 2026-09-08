"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VISITOR_SESSION_KEY = "portfolio-visitor-counted";

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

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
            .catch((error) => {
                console.error("Visitor count request failed:", error);
            });
    }, []);

    if (count === null) return null;

    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1.5 font-label text-[9px] font-black uppercase tracking-widest text-muted-foreground dark:border-white/5 dark:bg-[#1c1b1b]/70 dark:text-[#e5e2e1]/50">
            <Eye size={12} className="text-cyan-600 dark:text-[#ff4d00]" />
            <span>{count.toLocaleString()} profile visits</span>
        </div>
    );
}
