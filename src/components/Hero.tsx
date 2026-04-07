"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="hero min-h-screen grid place-items-center p-16 relative border-b border-border overflow-hidden text-center">
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
            1971 - 2026 ARCHIVE
          </span>
          <div className="h-4 w-[1px] bg-border-light hidden md:block" />
          <span className="flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-blood before:rounded-full before:block">
            NEURAL VERIFICATION
          </span>
          <div className="h-4 w-[1px] bg-border-light hidden md:block" />
          <span className="flex items-center gap-2 text-blood font-bold before:content-[''] before:w-1.5 before:h-1.5 before:bg-blood before:rounded-full before:block animate-pulse">
            24/7 AUTONOMOUS MONITORING
          </span>
        </div>
        
        <div className="mb-8 overflow-hidden">
          <motion.h1 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[clamp(1.5rem,5vw,2.5rem)] font-light italic text-text-dim tracking-[0.1em] font-serif"
          >
            অবিচারের ইতিহাস ও বর্তমান —
          </motion.h1>
        </div>

        <div className="hero-title font-bangla text-[clamp(6rem,18vw,12rem)] font-normal leading-[0.75] text-white mb-8 relative inline-block">
          <span className="relative z-10">বিচার</span>
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
          ১৯৭১ সালের স্বাধীনতা যুদ্ধ থেকে শুরু করে বর্তমান সময় পর্যন্ত বাংলাদেশের প্রতিটি বিচারিক রেকর্ড, মানবাধিকার লঙ্ঘন এবং আইনি লড়াইয়ের পূর্ণাঙ্গ আর্কাইভ।
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
          <a href="#incident-directory" className="px-10 py-5 bg-blood text-white font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:bg-blood/80 transition-all shadow-2xl shadow-blood/20 group">
            <span className="flex items-center gap-3">
              Browse Archive 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a href="/submit" className="px-10 py-5 bg-surface border border-border text-text font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:border-blood transition-all">
            Submit Report
          </a>
        </div>
      </motion.div>
    </div>
  );
}
