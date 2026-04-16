"use client";

import { Github, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="page-footer p-12 md:p-20 bg-surface border-t border-border mt-24 no-print">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left">
          <div className="space-y-6">
            <div className="pf-title font-bangla text-3xl font-bold text-white leading-tight">
              {t("struggleForJustice")}
            </div>
            <p className="text-sm text-text-dim font-bangla leading-relaxed">
              {t("footerDesc")}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white">{t("contact")}</h4>
            <div className="space-y-4">
              <a href="mailto:contact@bicharbd.com" className="flex items-center gap-3 text-sm text-text-dim hover:text-blood transition-colors">
                <Mail size={16} /> contact@bicharbd.com (email only)
              </a>
              <div className="flex items-center gap-3 text-sm text-text-dim">
                <Github size={16} /> github.com/bicharbd
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white text-blood">{t("legalDisclaimer")}</h4>
            <p className="text-[0.7rem] text-text-dim font-bangla leading-relaxed border-l border-blood/30 pl-4 italic">
              {t("legalDesc")}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="pf-mono font-mono text-[0.6rem] tracking-[0.25em] text-text-faint uppercase">
            {t("copyright")}
          </div>
          <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
            {t("developedBy")} <span className="text-blood">Md Atikur Rahman</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
