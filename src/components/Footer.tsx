"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Scale, Mail, MapPin, ExternalLink, ShieldCheck, Github, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-bg border-t border-border pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-8">
            <div className="logo font-black text-3xl tracking-tighter text-white">
              BICHAR<span className="text-blood">BD</span>
            </div>
            <p className="text-text-dim text-lg font-light leading-relaxed max-w-md">
              {t("footerDesc")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border text-text-faint hover:border-blood hover:text-blood transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border text-text-faint hover:border-blood hover:text-blood transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-border text-text-faint hover:border-blood hover:text-blood transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[0.6rem] font-mono text-white uppercase tracking-[0.4em]">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <a href="#stats" className="text-sm text-text-dim hover:text-blood transition-colors font-mono uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-[1px] bg-blood" /> {t("totalRecords").split('\n')[0]}
                </a>
              </li>
              <li>
                <a href="#map" className="text-sm text-text-dim hover:text-blood transition-colors font-mono uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-[1px] bg-blood" /> {t("crimeHeatmap")}
                </a>
              </li>
              <li>
                <a href="#archive" className="text-sm text-text-dim hover:text-blood transition-colors font-mono uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-[1px] bg-blood" /> {t("historicalArchiveKicker")}
                </a>
              </li>
              <li>
                <a href="#directory" className="text-sm text-text-dim hover:text-blood transition-colors font-mono uppercase tracking-widest flex items-center gap-3">
                  <span className="w-1.5 h-[1px] bg-blood" /> {t("incidentDirectoryKicker")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-8">
            <h4 className="text-[0.6rem] font-mono text-white uppercase tracking-[0.4em]">{t("contact")}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-blood mt-1" />
                <div>
                  <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">Email Portal</div>
                  <a href="mailto:secure@bicharbd.org" className="text-sm text-white hover:text-blood transition-colors">secure@bicharbd.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck size={18} className="text-blood mt-1" />
                <div>
                  <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">Encrypted Support</div>
                  <span className="text-sm text-white font-mono">PGP: 0x8F2B...E3C1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest">
              {t("copyright")}
            </p>
            <div className="hidden md:block w-4 h-[1px] bg-border" />
            <div className="flex items-center gap-3 text-[0.7rem] font-mono text-text-faint uppercase tracking-widest">
              {t("developedBy")} <span className="text-white font-bold tracking-normal italic">NeuronAI Labs</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-[0.6rem] font-mono text-text-faint hover:text-white transition-colors uppercase tracking-[0.2em]">{t("legalDisclaimer")}</a>
            <a href="#" className="text-[0.6rem] font-mono text-text-faint hover:text-white transition-colors uppercase tracking-[0.2em]">Privacy Policy</a>
          </div>
        </div>

        {/* Legal Disclaimer Text */}
        <div className="mt-12 p-8 bg-surface2 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={16} className="text-blood" />
            <h5 className="text-[0.65rem] font-mono text-white uppercase tracking-[0.3em] font-bold">{t("legalDisclaimer")}</h5>
          </div>
          <p className="text-[0.65rem] font-mono text-text-faint leading-relaxed uppercase tracking-widest">
            {t("legalDesc")}
          </p>
        </div>
      </div>
    </footer>
  );
}
