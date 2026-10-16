"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2.5 rounded-xl bg-[#ECE8DD] hover:bg-[#D8F3DC] dark:bg-[#1A1F1C] dark:hover:bg-[#1B4332] border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title="Switch between Editorial Cream Light & Obsidian Sage Dark"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 180,
                }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon className="h-4 w-4 text-[#74C69D]" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -180,
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
            >
                <Sun className="h-4 w-4 text-[#2D6A4F]" />
            </motion.div>
            <div className="w-4 h-4 opacity-0"></div>
        </button>
    );
}
