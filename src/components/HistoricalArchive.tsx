"use client";

import { useState, useEffect } from "react";
import { BookOpen, MapPin, ExternalLink, ShieldCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { safeFetch } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function HistoricalArchive() {
  const { t, formatNumber } = useLanguage();
  const [selectedEra, setSelectedEra] = useState("1971_War");
  const [eraData, setEraData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistoricalData() {
      setLoading(true);
      try {
        const result = await safeFetch(`/api/incidents/archive/historical`);
        if (result.success) {
          setEraData(result.data);
        }
      } catch (error) {
        // Handled in safeFetch
      } finally {
        setLoading(false);
      }
    }
    fetchHistoricalData();
  }, []);

  const ERAS = [
    { id: "1971_War", label: t("1971_War_Label") || "1971: War of Independence", color: "text-blood border-blood" },
    { id: "Post_Independence", label: t("Post_Independence_Label") || "1975: Political Tragedy", color: "text-gold border-gold" },
    { id: "90s_Restoration", label: t("90s_Restoration_Label") || "1990s: Democracy Era", color: "text-teal border-teal" },
    { id: "Modern", label: t("Modern_Label") || "Modern Era", color: "text-sky border-sky" },
    { id: "July_Uprising", label: t("July_Uprising_Label") || "2024: July Uprising", color: "text-blood border-blood" }
  ];

  const incidents = eraData ? eraData[selectedEra]?.incidents || [] : [];

  return (
    <div className="historical-archive mt-24 mb-20">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['05'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          {t("historicalArchiveKicker")}
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-4">
          {t("historicalArchiveTitle")}
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          {t("historicalArchiveDesc")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-6 py-3 text-[0.7rem] font-mono border transition-all uppercase tracking-widest ${
              selectedEra === era.id 
                ? `${era.color} bg-bg shadow-[0_0_15px_rgba(204,31,31,0.1)]` 
                : 'border-border text-text-faint hover:text-white'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="bg-surface border border-border p-8 h-[400px] animate-pulse" />
            ))
          ) : incidents.length > 0 ? (
            incidents.map((inc: any) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-surface border border-border hover:border-blood/50 transition-all flex flex-col h-full overflow-hidden"
              >
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[0.6rem] font-mono text-blood border border-blood/30 px-2 py-0.5 uppercase tracking-widest">
                      {inc.district}
                    </span>
                    <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
                      {new Date(inc.created_at).getFullYear()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blood transition-colors leading-tight">
                    {inc.title}
                  </h3>
                  <p className="text-text-dim text-sm font-light leading-relaxed line-clamp-4">
                    {inc.description}
                  </p>
                </div>
                <div className="px-8 py-6 bg-bg/50 border-t border-border flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-teal" />
                      <span className="text-[0.65rem] font-mono text-teal uppercase tracking-widest">
                        {inc.verification_label ? inc.verification_label.replace('_', ' ') : 'ARCHIVAL VERIFIED'}
                      </span>
                    </div>
                    <a 
                      href={inc.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[0.65rem] font-mono text-text-faint hover:text-white transition-colors uppercase tracking-widest"
                    >
                      <ExternalLink size={14} /> {t("source")}: {inc.source_name || 'Archival Record'}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-border opacity-30">
              <Search size={48} className="mx-auto mb-4" />
              <p className="text-xs font-mono uppercase tracking-widest">{t("noHistoricalData")}</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center">
        <button className="px-12 py-4 border border-blood text-blood font-mono text-xs uppercase tracking-[0.2em] hover:bg-blood hover:text-white transition-all">
          {t("browseFullArchive")}
        </button>
      </div>
    </div>
  );
}
