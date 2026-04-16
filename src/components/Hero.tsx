"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="hero-section relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Top Navigation / Status Bar */}
      <div className="flex justify-between items-center mb-16 border-b border-border pb-6 px-6">
        <div className="flex items-center gap-4">
          <div className="logo font-black text-2xl tracking-tighter text-white">
            BICHAR<span className="text-blood">BD</span>
          </div>
          <div className="hidden md:block h-4 w-[1px] bg-border" />
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 bg-blood rounded-full animate-pulse" />
            <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">{t("autonomousMonitoring")}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <button className="hidden md:block bg-blood text-white px-6 py-2 text-[0.7rem] font-mono font-bold uppercase tracking-widest hover:bg-blood/80 transition-all">
            {t("submitReport")}
          </button>
        </div>
      </div>
      <div className="hero-noise absolute inset-0 opacity-40 pointer-events-none" />
      <div className="hero-glow absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content relative max-w-[900px]"
      >
        <div className="hero-eyebrow font-mono text-[0.62rem] tracking-[0.45em] text-text-dim uppercase mb-10 flex justify-center gap-10 flex-wrap items-center">
          <span className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-blood before:rounded-full before:block shadow-lg shadow-blood/20">
            {t("archiveRange")}
          </span>
          <div className="h-4 w-[1px] bg-border-light hidden md:block" />
          <span className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-blood before:rounded-full before:block">
            {t("neuralVerification")}
          </span>
          <div className="h-4 w-[1px] bg-border-light hidden md:block" />
          <span className="flex items-center gap-2 text-blood font-bold before:content-[''] before:w-1.5 before:h-1.5 before:bg-blood before:rounded-full before:block animate-pulse">
            {t("autonomousMonitoring")}
          </span>
        </div>
        
        <div className="mb-8 overflow-hidden">
          <motion.h1 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[clamp(1.5rem,5vw,2.5rem)] font-light italic text-text-dim tracking-[0.1em] font-serif"
          >
            {t("heroSubtitle1")}
          </motion.h1>
        </div>

        <div className="hero-title font-bangla text-[clamp(6rem,18vw,12rem)] font-normal leading-[0.75] text-white mb-8 relative inline-block">
          <span className="relative z-10">{t("heroTitle")}</span>
          <span className="text-blood relative z-10">BD</span>
          <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blood to-transparent opacity-30" />
        </div>

        <div className="hero-rule flex items-center gap-8 justify-center my-12">
          <div className="hero-rule-line h-[1px] w-32 bg-gradient-to-r from-transparent to-border-light" />
          <div className="hero-rule-icon w-3 h-3 border border-blood rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-blood" />
          </div>
          <div className="hero-rule-line h-[1px] w-32 bg-gradient-to-l from-transparent to-border-light" />
        </div>

        <p className="hero-sub text-[clamp(1.1rem,2.5vw,1.4rem)] text-text-dim max-w-[850px] mx-auto font-light leading-relaxed mb-14 italic font-bangla px-4">
          {t("heroDescription")}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <a href="#incident-directory" className="px-10 py-5 bg-blood text-white font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:bg-blood/80 transition-all shadow-2xl shadow-blood/20 group">
            <span className="flex items-center gap-3">
              {t("browseArchive")}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a href="/submit" className="px-10 py-5 bg-surface border border-border text-text font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:border-blood transition-all">
            {t("submitReport")}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
