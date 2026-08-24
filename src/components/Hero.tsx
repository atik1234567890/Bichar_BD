"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import AuthModal from "./AuthModal";
import { Shield, RadioTower, BrainCircuit, AlertTriangle } from "lucide-react";

const HERO_CONTENT = {
  bn: {
    subtitle: "বাংলাদেশের ডিজিটাল নিরাপত্তা ও স্বচ্ছতা —",
    title: "CYBER",
    desc: "আমাদের উদ্দেশ্য: বাংলাদেশকে সুরক্ষিত করতে ফিশিং ফ্রড, মিথ্যা সংবাদ প্রপাগান্ডা, ডেটা ব্রিচ এবং সাইবার আক্রমণের বিরুদ্ধে Realtime Intelligence Platform তৈরি করা।",
    browseBtn: "থ্রেট ইন্টেল দেখুন",
    submitBtn: "সাইবার ইনসিডেন্ট রিপোর্ট করুন",
    statusBar1: "2015 - 2026 THREAT ARCHIVE",
    statusBar2: "AI THREAT ANALYSIS",
    statusBar3: "24/7 CYBER MONITORING",
    logoSub: "CYBER WATCH",
  },
  en: {
    subtitle: "Bangladesh's Digital Security & Transparency —",
    title: "CYBER",
    desc: "Our mission: Build a Realtime Intelligence Platform to defend Bangladesh from Phishing Fraud, Fake News Disinformation, Data Breaches, and Cyber Attacks.",
    browseBtn: "Explore Threat Intel",
    submitBtn: "Report Cyber Incident",
    statusBar1: "2015 - 2026 THREAT ARCHIVE",
    statusBar2: "AI THREAT ANALYSIS",
    statusBar3: "24/7 CYBER MONITORING",
    logoSub: "CYBER WATCH",
  },
};

export default function Hero() {
  const { language, t } = useLanguage();
  const h = HERO_CONTENT[language as "bn" | "en"];
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("jwt_token"));
    }
  }, []);

  return (
    <div className="hero-section relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-transparent">
      {/* Top Navigation / Status Bar */}
      <div className="flex justify-between items-center mb-16 border-b border-border pb-6 px-6">
        <div className="flex items-center gap-4">
          <div className="logo font-black text-2xl tracking-tighter text-white flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="leading-none">BICHAR<span className="text-cyan-400">BD</span></div>
              <div className="text-[0.5rem] text-cyan-400/70 uppercase tracking-[0.25em] font-semibold leading-tight">{h.logoSub}</div>
            </div>
          </div>
          <div className="hidden md:block h-4 w-[1px] bg-border" />
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">{h.statusBar3}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          {isLoggedIn ? (
            <button 
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("jwt_token");
                  localStorage.removeItem("user_role");
                }
                setIsLoggedIn(false);
              }}
              className="hidden md:block bg-surface border border-border text-text px-6 py-2 text-[0.7rem] font-mono font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="hidden md:block bg-surface border border-border text-text px-6 py-2 text-[0.7rem] font-mono font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              Login
            </button>
          )}
          <button className="hidden md:block bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 hover:from-cyan-400 hover:via-sky-400 hover:to-violet-400 text-white px-6 py-2 text-[0.7rem] font-mono font-bold uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40">
            {t("submitReport")}
          </button>
        </div>
        
        {showAuth && (
          <AuthModal onClose={() => { 
            setShowAuth(false); 
            if (typeof window !== "undefined") {
              setIsLoggedIn(!!localStorage.getItem("jwt_token")); 
            }
          }} />
        )}
      </div>
      <div className="hero-noise absolute inset-0 opacity-40 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full opacity-40" 
           style={{
             background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
             filter: "blur(40px)"
           }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content relative max-w-[1000px]"
      >
        <div className="hero-eyebrow font-mono text-[0.62rem] tracking-[0.45em] text-text-dim uppercase mb-10 flex justify-center gap-8 md:gap-10 flex-wrap items-center">
          <span className="flex items-center gap-2 text-cyan-400 font-medium">
            <Shield className="w-3.5 h-3.5" /> {h.statusBar1}
          </span>
          <span className="flex items-center gap-2 text-violet-400 font-medium">
            <BrainCircuit className="w-3.5 h-3.5" /> {h.statusBar2}
          </span>
          <span className="flex items-center gap-2 text-cyan-400 font-bold animate-pulse">
            <RadioTower className="w-3.5 h-3.5" /> {h.statusBar3}
          </span>
        </div>
        
        <div className="mb-6 overflow-hidden">
          <motion.h1 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[clamp(1.5rem,5vw,2.8rem)] font-light italic tracking-[0.1em] bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 bg-clip-text text-transparent"
          >
            {h.subtitle}
          </motion.h1>
        </div>

        <div className="text-[clamp(6rem,18vw,12rem)] font-black leading-[0.8] mb-8 relative inline-block tracking-tighter">
          <span className="relative z-10 bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">{h.title}</span>
          <span className="relative z-10 bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 bg-clip-text text-transparent">BD</span>
          <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-violet-500 opacity-60" />
        </div>

        <div className="hero-rule flex items-center gap-8 justify-center my-12">
          <div className="hero-rule-line h-[1px] w-32 bg-gradient-to-r from-transparent to-cyan-500/40" />
          <div className="w-3 h-3 border-2 border-cyan-400 rotate-45 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-1 h-1 bg-cyan-400" />
          </div>
          <div className="hero-rule-line h-[1px] w-32 bg-gradient-to-l from-transparent to-violet-500/40" />
        </div>

        <p className="hero-sub text-[clamp(1.1rem,2.5vw,1.4rem)] text-text-dim max-w-[900px] mx-auto font-light leading-relaxed mb-14 px-4 text-center">
          {h.desc}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          <a href="#cyber-dashboard" className="px-10 py-5 bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-white font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:from-cyan-400 hover:via-sky-400 hover:to-violet-400 transition-all shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 group">
            <span className="flex items-center gap-3">
              {h.browseBtn}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a href="#ai-checker" className="px-10 py-5 bg-surface border border-cyan-500/30 text-cyan-300 font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/5 transition-all group">
            <span className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4" />
              AI ফ্যাক্ট-চেকার / SCANNER
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
