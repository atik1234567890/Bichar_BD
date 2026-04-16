import { Github, Linkedin, Facebook, MessageSquare, Terminal, Shield } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import GlobalSearch from "./GlobalSearch";
import { useLanguage } from "@/context/LanguageContext";

export default function DeveloperCredit() {
  const { t } = useLanguage();

  return (
    <div className="bg-surface border-b border-border py-3 px-6 relative overflow-hidden group no-print">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 bg-blood/10 border border-blood/20 rounded-sm flex items-center justify-center text-blood group-hover:bg-blood group-hover:text-white transition-all duration-300">
            <Terminal size={20} />
          </div>
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-[0.2em]">{t("leadDeveloper")}</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Md Atikur Rahman <span className="text-blood text-[0.6rem] bg-blood/10 px-1.5 py-0.5 border border-blood/20 font-mono">{t("cyberSecurity")}</span>
            </div>
          </div>
        </div>

        {/* Global Search Center */}
        <div className="flex-1 hidden md:block px-8">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex items-center gap-3 border-l border-border pl-6">
            <Shield size={14} className="text-blood" />
            <span className="text-[0.65rem] font-mono text-text-dim uppercase tracking-wider">{t("lincolnUniversity")}</span>
          </div>
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <div className="w-[1px] h-4 bg-border mx-2" />
            <a href="https://github.com/atik1234567890" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-white transition-colors" title="GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/md-atikur-rahman-3416a1386" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-white transition-colors" title="LinkedIn"><Linkedin size={16} /></a>
            <a href="https://www.facebook.com/share/1KK88AFa1h/" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-white transition-colors" title="Facebook"><Facebook size={16} /></a>
            <a href="https://wa.me/8801343332857" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-white transition-colors" title="WhatsApp"><MessageSquare size={16} /></a>
          </div>
        </div>
      </div>

      {/* Mobile Search - visible only on mobile */}
      <div className="mt-4 md:hidden px-2">
        <GlobalSearch />
      </div>
      
      {/* Animated line at the bottom */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent w-full opacity-30" />
    </div>
  );
}
