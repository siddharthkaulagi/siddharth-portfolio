"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, MessageSquare, MapPin, Phone, Sparkles, CheckCircle2, XCircle, ArrowUpRight, Terminal } from "lucide-react";
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
        <section id="contact" className="relative py-32 px-6 md:px-20 bg-background dark:bg-[#131313] overflow-hidden">
            <ContactBackground />
            
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-foreground dark:text-[#e5e2e1]">
                            CONNECT <span className="text-cyan-600 dark:text-[#f97316]">NODE</span>
                        </h2>
                    </motion.div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                        <label className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-[#ffb59c]">COMMS_ID_TX</label>
                        <div className="text-muted-foreground/40 font-label text-[10px] uppercase tracking-[0.2em]">05 / 06</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Contact Methods */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-card/40 dark:bg-[rgba(53,53,52,0.4)] backdrop-blur-xl p-10 rounded-3xl border border-black/5 dark:border-white/5 shadow-2xl space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Terminal className="text-cyan-600 dark:text-[#ffb59c]" size={28} />
                                <span className="font-label text-xs uppercase tracking-[0.3em] font-bold text-foreground dark:text-[#e5e2e1]/60">System_Endpoints</span>
                            </div>

                            <a href="mailto:siddharthengineer08@gmail.com" className="group flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-[#201f1f] border border-black/5 dark:border-white/5 hover:border-cyan-500/20 dark:hover:border-[#ff5f1f]/20 transition-all duration-500 shadow-sm hover:shadow-xl">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                    <Mail size={24} className="text-cyan-600 dark:text-[#ffb59c]" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-headline font-bold text-foreground dark:text-[#e5e2e1] mb-1">Email Terminal</h4>
                                    <p className="font-label text-[10px] uppercase tracking-widest text-muted-foreground dark:text-[#e5e2e1]/40 transition-colors group-hover:text-cyan-600 dark:group-hover:text-[#ffb59c] truncate">siddharthengineer08@gmail.com</p>
                                </div>
                                <ArrowUpRight size={20} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0" />
                            </a>

                            <div className="group flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-[#201f1f] border border-black/5 dark:border-white/5 transition-all duration-500 shadow-sm">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 shadow-inner">
                                    <MapPin size={24} className="text-orange-500 dark:text-[#ffb59c]" />
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-foreground dark:text-[#e5e2e1] mb-1">Base Location</h4>
                                    <p className="font-label text-[10px] uppercase tracking-widest text-muted-foreground dark:text-[#e5e2e1]/40">Bengaluru, KA, IN</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-6 p-6 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/5 transition-all duration-500">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 shadow-inner">
                                    <Phone size={24} className="text-emerald-500 dark:text-[#ffb59c]" />
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-foreground dark:text-[#e5e2e1] mb-1">Status: Active</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                                        <span className="font-label text-[10px] uppercase tracking-widest text-[#10b981] font-black">Open to Ops</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="p-8 rounded-3xl bg-cyan-600 dark:bg-gradient-to-br dark:from-[#ffb59c] dark:to-[#ff5f1f] text-white dark:text-[#5c1900] shadow-[0_0_60px_rgba(6,182,212,0.1)] dark:shadow-[0_0_60px_rgba(255,95,31,0.1)]">
                            <p className="font-body text-xl font-black italic leading-tight">
                                &ldquo;The best way to predict the future is to engineer it.&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-card/40 dark:bg-[rgba(53,53,52,0.4)] backdrop-blur-xl p-10 md:p-14 rounded-[40px] border border-black/5 dark:border-white/5 shadow-2xl relative"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="font-label text-[10px] uppercase tracking-[0.3em] font-black text-foreground dark:text-[#e5e2e1]/40 flex items-center gap-2">
                                            <User size={12} /> User_Name
                                        </label>
                                        <input 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-100 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 rounded-2xl px-6 py-5 font-headline font-bold text-foreground dark:text-[#e5e2e1] focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-[#ff5f1f]/20 outline-none transition-all placeholder:text-muted-foreground/30 shadow-inner" 
                                            placeholder="Enter Name..."
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="font-label text-[10px] uppercase tracking-[0.3em] font-black text-foreground dark:text-[#e5e2e1]/40 flex items-center gap-2">
                                            <Mail size={12} /> Protocol_Address
                                        </label>
                                        <input 
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-100 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 rounded-2xl px-6 py-5 font-headline font-bold text-foreground dark:text-[#e5e2e1] focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-[#ff5f1f]/20 outline-none transition-all placeholder:text-muted-foreground/30 shadow-inner" 
                                            placeholder="Enter Email..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-[0.3em] font-black text-foreground dark:text-[#e5e2e1]/40 flex items-center gap-2">
                                        <MessageSquare size={12} /> Message_Payload
                                    </label>
                                    <textarea 
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-slate-100 dark:bg-[#1c1b1b] border border-black/5 dark:border-white/5 rounded-2xl px-6 py-5 font-headline font-bold text-foreground dark:text-[#e5e2e1] focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-[#ff5f1f]/20 outline-none transition-all placeholder:text-muted-foreground/30 shadow-inner resize-none" 
                                        placeholder="Transmit Project Data..."
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full py-6 rounded-2xl bg-cyan-600 dark:bg-gradient-to-br dark:from-[#ffb59c] dark:to-[#ff5f1f] text-white dark:text-[#5c1900] font-headline font-black text-lg uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(6,182,212,0.2)] dark:shadow-[0_0_60px_rgba(255,95,31,0.2)] hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-50 group overflow-hidden relative"
                                >
                                    {/* Shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                                    
                                    {loading ? "Transmitting..." : "Send Transmission"}
                                    <Send size={22} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                </button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-[#10b981] font-label text-[10px] uppercase tracking-widest font-black text-center flex items-center justify-center gap-3">
                                            <CheckCircle2 size={16} /> Data Transmitted Successfully
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-label text-[10px] uppercase tracking-widest font-black text-center flex items-center justify-center gap-3">
                                            <XCircle size={16} /> Transmission Failure: Check Uplink
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
