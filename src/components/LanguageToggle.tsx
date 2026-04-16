"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center bg-surface2 border border-border p-1 rounded-sm no-print relative">
      <div className="flex relative z-10">
        <button
          onClick={() => setLanguage("bn")}
          className={`px-3 py-1.5 text-[0.65rem] font-mono flex items-center gap-2 transition-colors duration-300 ${
            language === "bn" ? "text-white font-bold" : "text-text-dim hover:text-white"
          }`}
        >
          <span>🇧🇩</span> বাংলা
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 text-[0.65rem] font-mono flex items-center gap-2 transition-colors duration-300 ${
            language === "en" ? "text-white font-bold" : "text-text-dim hover:text-white"
          }`}
        >
          <span>🇬🇧</span> English
        </button>
      </div>
      
      {/* Animated background pill */}
      <motion.div
        className="absolute top-1 bottom-1 bg-blood rounded-[2px] z-0"
        initial={false}
        animate={{
          left: language === "bn" ? "4px" : "50%",
          width: "calc(50% - 4px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </div>
  );
}
