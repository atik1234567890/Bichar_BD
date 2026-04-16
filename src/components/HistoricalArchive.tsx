"use client";

import { useState, useEffect } from "react";
import { BookOpen, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { safeFetch } from "@/lib/api";

const ERAS = [
  { id: "1971_War", label: "১৯৭১: স্বাধীনতা যুদ্ধ", color: "text-blood border-blood" },
  { id: "Post_Independence", label: "৭৫-৮৯: পুনর্গঠন ও অস্থিরতা", color: "text-gold border-gold" },
  { id: "90s_Restoration", label: "৯০-এর দশক: গণতন্ত্রের সংগ্রাম", color: "text-teal border-teal" },
  { id: "Modern", label: "বর্তমান: আধুনিক বাংলাদেশ", color: "text-sky border-sky" }
];

export default function HistoricalArchive() {
  const [selectedEra, setSelectedEra] = useState("1971_War");
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistoricalData() {
      setLoading(true);
      try {
        const result = await safeFetch(`/api/incidents?era=${selectedEra}&limit=10`);
        if (result.success) {
          setIncidents(result.data);
        }
      } catch (error) {
        // Handled in safeFetch
      } finally {
        setLoading(false);
      }
    }
    fetchHistoricalData();
  }, [selectedEra]);

  return (
    <div className="historical-archive mt-24">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['HISTORIC'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          ঐতিহাসিক আর্কাইভ
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
          ১৯৭১ থেকে বর্তমান: বিচারের পথচলা
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          বাংলাদেশের ইতিহাসের গুরুত্বপূর্ণ ঘটনার বিচারিক রেকর্ড এবং আর্কাইভ থেকে সংগৃহীত তথ্য
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`px-4 py-2 border font-mono text-[0.7rem] uppercase tracking-widest transition-all ${
              selectedEra === era.id 
                ? `${era.color} bg-surface2` 
                : "border-border text-text-faint hover:text-white hover:border-border-light"
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 relative">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center bg-surface border border-border"
            >
              <div className="w-10 h-10 border-2 border-blood border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-mono text-[0.7rem] text-text-faint uppercase tracking-[0.2em]">আর্কাইভ লোড হচ্ছে...</p>
            </motion.div>
          ) : incidents.length > 0 ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {incidents.map((inc) => (
                <div key={inc.id} className="bg-surface border border-border p-8 flex flex-col md:flex-row gap-8 hover:bg-surface2 transition-all group">
                  <div className="md:w-1/4 shrink-0">
                    <div className="text-blood font-mono text-[0.65rem] mb-2 uppercase tracking-tighter">
                      Case ID: {inc.incident_id}
                    </div>
                    <div className="text-[1.8rem] font-bold text-white group-hover:text-blood transition-colors leading-tight mb-4">
                      {new Date(inc.created_at).getFullYear()}
                    </div>
                    <div className="flex items-center gap-2 text-text-faint text-[0.7rem] font-mono">
                      <MapPin size={12} className="text-blood" />
                      {inc.district}, {inc.division}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4 leading-relaxed">
                      {inc.title}
                    </h3>
                    <p className="text-text-dim text-sm leading-[1.8] mb-6 font-light italic">
                      {inc.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-teal" />
                        <span className="text-[0.65rem] font-mono text-teal uppercase tracking-widest">{inc.verification_label.replace('_', ' ')}</span>
                      </div>
                      <a 
                        href={inc.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[0.65rem] font-mono text-text-faint hover:text-white transition-colors uppercase tracking-widest"
                      >
                        <ExternalLink size={14} /> সোর্স: {inc.source_name}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center bg-surface border border-border-light border-dashed"
            >
              <BookOpen size={48} className="mx-auto text-text-faint opacity-10 mb-4" />
              <p className="font-mono text-[0.7rem] text-text-faint uppercase tracking-[0.2em]">এই সময়কালের কোনো তথ্য পাওয়া যায়নি</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="bg-blood text-white px-12 py-5 text-[0.75rem] font-mono font-bold uppercase tracking-[0.3em] hover:bg-blood/80 transition-all shadow-xl shadow-blood/10">
          সম্পূর্ণ আর্কাইভ ব্রাউজ করুন →
        </button>
      </div>
    </div>
  );
}
