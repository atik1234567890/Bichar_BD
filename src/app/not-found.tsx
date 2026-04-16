"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 border-2 border-blood/20 flex items-center justify-center mb-8 relative">
        <div className="absolute inset-0 bg-blood/5 animate-pulse" />
        <span className="text-4xl font-bold text-blood font-mono">404</span>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-widest font-mono">
        {t("pageNotFound")}
      </h1>
      
      <p className="text-text-dim max-w-md mb-12 font-bangla italic">
        {t("heroDescription")}
      </p>

      <Link 
        href="/"
        className="flex items-center gap-3 bg-blood text-white px-8 py-4 font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] hover:bg-blood/80 transition-all shadow-2xl shadow-blood/20 group"
      >
        <Home size={16} />
        {t("backToHome")}
      </Link>
      
      <div className="mt-24 text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
        BicharBD Neural Core System · ERROR_NOT_FOUND
      </div>
    </div>
  );
}
