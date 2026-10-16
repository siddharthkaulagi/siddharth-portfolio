"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Mail,
    User,
    MessageSquare,
    MapPin,
    Phone,
    CheckCircle2,
    XCircle,
    ArrowUpRight,
    Terminal,
} from "lucide-react";
import { ContactBackground } from "@/components/ContactBackground";

export function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/send-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative py-32 px-6 md:px-16 bg-transparent overflow-hidden scroll-mt-24">
            <ContactBackground />

            <div className="max-w-[1280px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <label className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold text-[#2D6A4F] dark:text-[#74C69D] mb-3 block">
                            COMMS_ID_TX // Resend Email Uplink
                        </label>
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase">
                            CONNECT <span className="text-[#2D6A4F] dark:text-[#74C69D]">NODE</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Contact Methods */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white dark:bg-[#171B18] p-8 rounded-[32px] border border-black/12 dark:border-white/12 shadow-xl space-y-5 crosshair-card">
                            <div className="flex items-center gap-3 pb-3 border-b border-black/10 dark:border-white/10">
                                <Terminal className="text-[#2D6A4F] dark:text-[#74C69D]" size={22} />
                                <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold text-foreground">
                                    System_Endpoints
                                </span>
                            </div>

                            <a
                                href="mailto:siddharthengineer08@gmail.com"
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 hover:border-[#2D6A4F] transition-all"
                            >
                                <div className="p-3 rounded-xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10">
                                    <Mail size={20} className="text-[#2D6A4F] dark:text-[#74C69D]" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-headline font-bold text-foreground text-sm">Primary Email</h4>
                                    <p className="font-mono text-[11px] text-muted-foreground truncate">
                                        siddharthengineer08@gmail.com
                                    </p>
                                </div>
                                <ArrowUpRight size={18} className="text-muted-foreground" />
                            </a>

                            <a
                                href="mailto:siddharthkaulagi08@gmail.com"
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10 hover:border-[#C85A32] transition-all"
                            >
                                <div className="p-3 rounded-xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10">
                                    <Mail size={20} className="text-[#C85A32]" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-headline font-bold text-foreground text-sm">Secondary SCM Email</h4>
                                    <p className="font-mono text-[11px] text-muted-foreground truncate">
                                        siddharthkaulagi08@gmail.com
                                    </p>
                                </div>
                                <ArrowUpRight size={18} className="text-muted-foreground" />
                            </a>

                            <a
                                href="tel:+918050463960"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10"
                            >
                                <div className="p-3 rounded-xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10">
                                    <Phone size={20} className="text-[#2D6A4F] dark:text-[#74C69D]" />
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-foreground text-sm">Direct Phone</h4>
                                    <p className="font-mono text-[11px] text-muted-foreground">+91 8050463960</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F4EE] dark:bg-[#111412] border border-black/10 dark:border-white/10">
                                <div className="p-3 rounded-xl bg-white dark:bg-[#171B18] border border-black/10 dark:border-white/10">
                                    <MapPin size={20} className="text-[#C85A32]" />
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-foreground text-sm">Base Location</h4>
                                    <p className="font-mono text-[11px] text-muted-foreground">Bengaluru, KA, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-7 rounded-[28px] bg-[#1B4332] dark:bg-[#2D6A4F] text-[#F6F4EE] shadow-lg">
                            <p className="font-headline text-lg font-bold italic leading-snug">
                                &ldquo;The best way to predict the future is to engineer it.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Resend API Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-[#171B18] p-8 md:p-12 rounded-[36px] border border-black/12 dark:border-white/12 shadow-xl relative crosshair-card">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2.5">
                                        <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground flex items-center gap-2">
                                            <User size={13} /> User_Name
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#F6F4EE] dark:bg-[#111412] border border-black/12 dark:border-white/12 rounded-2xl px-5 py-4 font-body font-medium text-foreground focus:border-[#2D6A4F] outline-none transition-all"
                                            placeholder="Enter Name..."
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground flex items-center gap-2">
                                            <Mail size={13} /> Protocol_Address
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#F6F4EE] dark:bg-[#111412] border border-black/12 dark:border-white/12 rounded-2xl px-5 py-4 font-body font-medium text-foreground focus:border-[#2D6A4F] outline-none transition-all"
                                            placeholder="Enter Email..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground flex items-center gap-2">
                                        <MessageSquare size={13} /> Message_Payload
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#F6F4EE] dark:bg-[#111412] border border-black/12 dark:border-white/12 rounded-2xl px-5 py-4 font-body font-medium text-foreground focus:border-[#2D6A4F] outline-none transition-all resize-none"
                                        placeholder="Transmit Project or Role Details..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 rounded-2xl bg-[#111412] dark:bg-[#74C69D] text-[#F6F4EE] dark:text-[#081C15] font-headline font-black text-base uppercase tracking-[0.2em] hover:bg-[#2D6A4F] dark:hover:bg-[#95D5B2] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer shadow-lg"
                                >
                                    {loading ? "Transmitting via Resend..." : "Send Transmission"}
                                    <Send size={18} />
                                </button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 rounded-2xl bg-[#D8F3DC] dark:bg-[#1B4332] border border-[#2D6A4F]/30 text-[#1B4332] dark:text-[#D8F3DC] font-mono text-xs uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2"
                                        >
                                            <CheckCircle2 size={16} /> Data Transmitted Successfully via Resend
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 rounded-2xl bg-[#C85A32]/15 border border-[#C85A32]/30 text-[#C85A32] font-mono text-xs uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2"
                                        >
                                            <XCircle size={16} /> Transmission Failure: Verify RESEND_API_KEY in .env
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
