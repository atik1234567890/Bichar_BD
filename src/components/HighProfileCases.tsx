"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function HighProfileCases() {
  const { t, language } = useLanguage();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighProfile() {
      try {
        const result = await safeFetch("/api/incidents?status=high_profile&limit=6");
        if (result.success) {
          setCases(result.data);
        }
      } catch (error) {
        // Handled in safeFetch
      } finally {
        setLoading(false);
      }
    }
    fetchHighProfile();
  }, []);

  // Simple transliteration placeholder
  const translateText = (text: string) => {
    if (language === "bn") return text;
    return `${text} (Translated)`;
  };

  return (
    <section className="high-profile-section mt-24">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-blood mb-3 flex items-center gap-4 before:content-['VERIFIED'] before:text-[0.5rem] before:text-white before:bg-blood before:px-1.5 before:py-0.5">
          {t("highProfileKicker")}
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-4">
          {t("highProfileTitle")}
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic max-w-[800px]">
          {t("highProfileSub")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="highProfileCases">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-surface border border-border animate-pulse" />
          ))
        ) : cases.length > 0 ? (
          cases.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-surface border border-border p-8 hover:border-blood/50 transition-all group"
            >
              <div className="flex items-center gap-2 mb-6 text-blood">
                <ShieldAlert size={18} />
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em]">High Profile</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blood transition-colors">
                {translateText(item.title)}
              </h3>
              <p className="text-sm text-text-dim leading-relaxed mb-6 line-clamp-3">
                {translateText(item.description)}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
                  {item.district}
                </span>
                <a 
                  href={item.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[0.6rem] font-mono text-text-faint hover:text-white transition-colors uppercase"
                >
                  {t("source")} <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-surface border border-border border-dashed">
            <AlertCircle className="mx-auto text-text-faint mb-4" size={32} />
            <p className="text-text-dim font-mono text-sm italic">{t("noHighProfile")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
