"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, AlertTriangle, ShieldAlert, Calendar, ExternalLink, ChevronDown, Scale } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PM_DATA = [
  {
    id: "hasina",
    name: "Sheikh Hasina",
    nameBn: "শেখ হাসিনা",
    period: "2009–2024",
    party: "Awami League",
    role: "Prime Minister",
    status: "Fled country",
    statusColor: "text-blood border-blood",
    statusIcon: "🔴",
    records: [
      { label: "Extrajudicial Killings", labelBn: "বিচারবহির্ভূত হত্যাকাণ্ড", value: "600+", source: "Human Rights Watch" },
      { label: "Enforced Disappearances", labelBn: "জোরপূর্বক গুম", value: "850+", source: "Odhikar" },
      { label: "July 2024 Genocide", labelBn: "জুলাই ২০২৪ গণহত্যা", value: "1000+ Dead", source: "UN Fact-Finding Mission" },
      { label: "US Sanctions on RAB", labelBn: "র‍্যাবের বিরুদ্ধে মার্কিন নিষেধাজ্ঞা", value: "2021", source: "US Treasury" },
      { label: "Journalists Arrested (DSA)", labelBn: "DSA-তে গ্রেফতার সাংবাদিক", value: "200+", source: "RSF" }
    ],
    sources: [
      { name: "Human Rights Watch", url: "https://www.hrw.org/asia/bangladesh" },
      { name: "Odhikar", url: "http://odhikar.org/reports/" },
      { name: "UN Report", url: "https://www.ohchr.org/en/countries/bangladesh" },
      { name: "US Treasury", url: "https://home.treasury.gov/news/press-releases/jy0524" }
    ]
  },
  {
    id: "khaleda",
    name: "Khaleda Zia",
    nameBn: "খালেদা জিয়া",
    period: "1991–96, 2001–06",
    party: "BNP",
    role: "Prime Minister",
    status: "Convicted",
    statusColor: "text-gold border-gold",
    statusIcon: "🟡",
    records: [
      { label: "Political Violence Deaths", labelBn: "রাজনৈতিক সহিংসতায় মৃত্যু", value: "Documented", source: "Amnesty International" },
      { label: "Corruption Conviction", labelBn: "দুর্নীতি মামলায় সাজাপ্রাপ্ত", value: "Court Recorded", source: "Bangladesh Supreme Court" }
    ],
    sources: [
      { name: "Amnesty International", url: "https://www.amnesty.org/en/location/asia-and-the-pacific/south-asia/bangladesh/" },
      { name: "Supreme Court of BD", url: "https://www.supremecourt.gov.bd/" }
    ]
  },
  {
    id: "ershad",
    name: "H.M. Ershad",
    nameBn: "এইচ.এম. এরশাদ",
    period: "1982–1990",
    party: "Jatiya Party",
    role: "President / Military Ruler",
    status: "Deceased",
    statusColor: "text-text-faint border-border",
    statusIcon: "⚫",
    records: [
      { label: "Military Rule Duration", labelBn: "সামরিক শাসনকাল", value: "8 Years", source: "Historical Record" },
      { label: "Political Prisoners", labelBn: "রাজনৈতিক বন্দী", value: "Documented", source: "Amnesty International" }
    ],
    sources: [
      { name: "Historical Archive", url: "https://banglapedia.org/Ershad,_H_M" }
    ]
  },
  {
    id: "zia",
    name: "Ziaur Rahman",
    nameBn: "জিয়াউর রহমান",
    period: "1977–1981",
    party: "BNP",
    role: "President / Military Ruler",
    status: "Deceased",
    statusColor: "text-text-faint border-border",
    statusIcon: "⚫",
    records: [
      { label: "Post-Coup Suppression", labelBn: "সামরিক অভ্যুত্থান-পরবর্তী দমন", value: "Documented", source: "Historical Records" }
    ],
    sources: [
      { name: "Historical Archive", url: "https://banglapedia.org/Ziaur_Rahman" }
    ]
  }
];

export default function PrimeMinistersSection() {
  const { language, t, formatNumber } = useLanguage();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="pm-section mt-32 mb-20 px-4 max-w-7xl mx-auto">
      <div className="chapter-header mb-16 text-center">
        <div className="chapter-kicker font-mono text-[0.7rem] tracking-[0.4em] uppercase text-blood mb-4 flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-blood/30"></span>
          {language === 'bn' ? 'শাসনকাল ও বিচারিক রেকর্ড' : 'Tenure & Judicial Records'}
          <span className="h-[1px] w-12 bg-blood/30"></span>
        </div>
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white leading-none mb-6 tracking-tighter">
          {language === 'bn' ? 'প্রধানমন্ত্রীদের' : 'Prime Ministers'}{' '}
          <span className="text-blood">{language === 'bn' ? 'আমলনামা' : 'Scorecard'}</span>
        </h2>
        <div className="max-w-3xl mx-auto bg-blood/5 border border-blood/20 p-4 mb-8">
          <p className="text-text-dim text-sm font-light leading-relaxed flex items-start gap-3 text-left">
            <Info size={18} className="text-blood shrink-0 mt-1" />
            <span>
              {language === 'bn' 
                ? "সকল তথ্য আন্তর্জাতিক মানবাধিকার সংস্থা, আদালতের নথি ও যাচাইকৃত সংবাদ মাধ্যম থেকে সংগৃহীত। প্রতিটি তথ্যের সূত্র নিচে দেওয়া আছে।"
                : "All data is collected from international human rights organizations, court documents, and verified news media. Sources are provided for each stat."}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PM_DATA.map((pm) => (
          <div 
            key={pm.id}
            className="bg-surface border border-border group overflow-hidden flex flex-col"
          >
            {/* Header: Name & Role */}
            <div className="p-8 border-b border-border bg-bg/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{language === 'bn' ? pm.nameBn : pm.name}</h3>
                  <div className="flex items-center gap-2 text-[0.65rem] font-mono text-blood uppercase tracking-widest">
                    <Calendar size={12} /> {pm.period}
                  </div>
                </div>
                <div className={`px-3 py-1 border text-[0.6rem] font-mono uppercase tracking-widest ${pm.statusColor} flex items-center gap-2`}>
                  <span>{pm.statusIcon}</span>
                  {pm.status}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[0.7rem] font-mono text-text-faint">
                <div>
                  <span className="text-white/40 uppercase block mb-1">Party</span>
                  <span className="text-text-dim">{pm.party}</span>
                </div>
                <div>
                  <span className="text-white/40 uppercase block mb-1">Role</span>
                  <span className="text-text-dim">{pm.role}</span>
                </div>
              </div>
            </div>

            {/* Records Section */}
            <div className="p-8 flex-1 space-y-6">
              <h4 className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-text-faint border-b border-border pb-2">
                Documented Human Rights Record
              </h4>
              <div className="space-y-4">
                {pm.records.map((record, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium mb-1">
                        {language === 'bn' ? record.labelBn : record.label}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.6rem] px-1.5 py-0.5 bg-bg border border-border text-text-faint font-mono">
                          {record.source}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold font-mono text-blood">{record.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Judicial Accountability */}
            <div className="px-8 py-4 bg-bg/30 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Scale size={14} className="text-text-faint" />
                <span className="text-[0.6rem] font-mono text-text-faint uppercase">Judicial Status:</span>
              </div>
              <span className={`text-[0.7rem] font-bold font-mono uppercase tracking-widest ${pm.statusColor}`}>
                {pm.status}
              </span>
            </div>

            {/* Expandable Sources */}
            <div className="border-t border-border">
              <button 
                onClick={() => setExpandedCard(expandedCard === pm.id ? null : pm.id)}
                className="w-full p-4 flex items-center justify-center gap-2 text-[0.6rem] font-mono text-text-faint hover:text-white transition-colors uppercase tracking-widest"
              >
                {language === 'bn' ? 'তথ্যসূত্র দেখুন' : 'View Sources'}
                <ChevronDown size={14} className={`transition-transform ${expandedCard === pm.id ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedCard === pm.id && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-bg"
                  >
                    <div className="p-6 space-y-3">
                      {pm.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 border border-border hover:border-blood/50 transition-all text-[0.7rem] text-text-dim group"
                        >
                          <span className="font-mono">{source.name}</span>
                          <ExternalLink size={12} className="group-hover:text-blood transition-colors" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
}
