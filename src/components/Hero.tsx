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
        <div className="hero-eyebrow font-mono text-[0.62rem] tracking-[0.35em] text-text-dim uppercase mb-8 flex justify-center gap-8 flex-wrap">
          <span className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-blood before:rounded-full before:block">
            Bangladesh Context
          </span>
          <span className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-blood before:rounded-full before:block">
            Powerful Features
          </span>
          <span className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-blood before:rounded-full before:block">
            Real Impact
          </span>
          <span className="flex items-center gap-2 text-blood font-bold before:content-[''] before:w-1 before:h-1 before:bg-blood before:rounded-full before:block animate-pulse">
            LIVE 2026
          </span>
        </div>
        <h1 className="text-[clamp(1.3rem,4vw,2rem)] font-light italic text-text-dim mb-4 tracking-[0.05em]">
          বাংলাদেশের নিজস্ব সংকট —
        </h1>
        <div className="hero-title font-bangla text-[clamp(5rem,16vw,11rem)] font-normal leading-[0.85] text-white mb-6 relative">
          বিচার<span className="text-blood">BD</span>
        </div>
        <div className="hero-rule flex items-center gap-6 justify-center my-8">
          <div className="hero-rule-line h-[1px] w-20" />
          <div className="hero-rule-icon w-2 h-2 border border-blood rotate-45" />
          <div className="hero-rule-line rev h-[1px] w-20" />
        </div>
        <p className="hero-desc font-bangla text-[1.2rem] text-text-dim max-w-[680px] mx-auto mb-12 leading-[2] font-light">
          generic crime tracker নয় — বাংলাদেশের মানুষ যে সমস্যায় প্রতিদিন পড়ে,
          সেই সমস্যাগুলোকে সরাসরি address করা।
        </p>
      </motion.div>
    </div>
  );
}
