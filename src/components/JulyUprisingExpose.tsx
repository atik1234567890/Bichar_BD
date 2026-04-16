"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert, CheckCircle2, FileUp } from "lucide-react";

export default function JulyUprisingExpose() {
  const { t, formatNumber } = useLanguage();

  return (
    <div className="mt-20 bg-blood/5 border border-blood/20 p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blood/10 blur-[100px] rounded-full -z-10" />
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-blood rounded-full animate-pulse" />
            <span className="text-[0.65rem] font-mono text-blood uppercase tracking-[0.3em] font-bold">
              {t("julySpecialInvestigation")}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {t("julyGenocideTitle")}<br />
            <span className="text-blood">{t("julyGenocideSubtitle")}</span>
          </h2>
          
          <p className="text-text-dim text-lg font-light leading-relaxed mb-8 max-w-2xl">
            {t("julyUprisingDesc")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-bg border border-border">
              <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-2">{t("killedPrimary")}</div>
              <div className="text-3xl font-black text-blood">{formatNumber(1000)}+</div>
            </div>
            <div className="p-6 bg-bg border border-border">
              <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-2">{t("injuredCrippled")}</div>
              <div className="text-3xl font-black text-white">{formatNumber(20000)}+</div>
            </div>
            <div className="p-6 bg-bg border border-border">
              <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-2">{t("lostVision")}</div>
              <div className="text-3xl font-black text-white">{formatNumber(450)}+</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert size={14} className="text-blood" /> {t("judicialProgress")}
            </h4>
            <div className="flex items-start gap-3 text-sm text-text-dim">
              <CheckCircle2 size={16} className="text-green shrink-0 mt-1" />
              <p>{t("ictInvestigation")}</p>
            </div>
            <div className="flex items-start gap-3 text-sm text-text-dim">
              <CheckCircle2 size={16} className="text-green shrink-0 mt-1" />
              <p>{t("unFactFinding")}</p>
            </div>
            <div className="flex items-start gap-3 text-sm text-text-dim">
              <CheckCircle2 size={16} className="text-green shrink-0 mt-1" />
              <p>{t("julyMemoryFoundation")}</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-blood p-8 h-full flex flex-col justify-between group cursor-pointer hover:bg-blood/90 transition-all">
            <div>
              <FileUp size={48} className="text-white mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {t("giveInfoEnsureJustice")}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                {t("julySubmitEvidenceDesc")}
              </p>
            </div>
            <button className="w-full py-4 bg-white text-blood font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-all">
              {t("submitReport")}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-blood/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[0.65rem] font-mono text-blood/60 italic max-w-2xl text-center md:text-left">
          {t("julyDisclaimer")}
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-blood/10 border border-blood/20 rounded-full">
            <span className="w-2 h-2 bg-blood rounded-full animate-pulse" />
            <span className="text-[0.6rem] font-mono text-blood uppercase tracking-widest">Live Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
