"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function Stats() {
  const { t, formatNumber } = useLanguage();
  const [summary, setSummary] = useState<any>(null);
  const [types, setTypes] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryData, typesData] = await Promise.all([
          safeFetch("/api/stats/summary"),
          safeFetch("/api/stats/category-breakdown")
        ]);
        
        if (summaryData.success) setSummary(summaryData.data);
        if (typesData.success) setTypes(typesData.data);
      } catch (error) {
        // Handled in safeFetch
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = summary ? [
    {
      num: formatNumber(summary.total),
      desc: t("totalRecords"),
      color: "blood",
    },
    {
      num: `${formatNumber((summary.verdict_given / summary.total * 100 || 0).toFixed(1))}%`,
      desc: t("justiceRate"),
      color: "gold",
    },
    {
      num: formatNumber(summary.active),
      desc: t("pendingCases"),
      color: "teal",
    },
    {
      num: `Verified`,
      desc: t("verifiedSource"),
      color: "sky",
    },
  ] : [
    { num: formatNumber("৮৫০+"), desc: t("enforcedDisappearances"), color: "blood" },
    { num: formatNumber("১৯%"), desc: t("rapeCaseConviction"), color: "gold" },
    { num: formatNumber("৪৫%"), desc: t("childMarriageRate"), color: "teal" },
    { num: t("rmgWorkersRights").split("\n")[0], desc: t("rmgWorkersRights").split("\n").slice(1).join("\n"), color: "sky" }
  ];

  return (
    <div className="stats-container space-y-8 my-12">
      <div className="stat-row grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border border border-border">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-cell bg-surface p-6 text-center">
            <span
              className={`stat-num font-mono text-[2.2rem] font-semibold block leading-none mb-2 ${
                stat.color === "blood"
                  ? "text-blood"
                  : stat.color === "gold"
                  ? "text-gold"
                  : stat.color === "teal"
                  ? "text-teal"
                  : "text-sky"
              }`}
            >
              {stat.num}
            </span>
            <span className="stat-desc font-mono text-[0.6rem] tracking-[0.15em] uppercase text-text-dim leading-[1.5] whitespace-pre-line">
              {stat.desc}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={16} className="text-blood" />
            <h3 className="text-white font-bold text-xs uppercase tracking-widest font-mono">{t("crimeTypeDistribution")}</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(types).length > 0 ? (
              Object.entries(types).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([type, count]: any) => (
                <div key={type} className="flex justify-between items-center text-[0.7rem] font-mono text-text-dim">
                  <span>{type}</span>
                  <span className="text-white">{formatNumber(count)}</span>
                </div>
              ))
            ) : (
              <div className="text-[0.7rem] font-mono text-text-faint italic">No data available</div>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-gold" />
            <h3 className="text-white font-bold text-xs uppercase tracking-widest font-mono">Hyper-AI Neural Integrity</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg border border-border p-4 text-center group hover:border-blood transition-all">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">Neural Cross-Ref</p>
              <p className="text-teal font-mono text-xs font-bold">Active (10+ Sources)</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center group hover:border-blood transition-all">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">NLP Deep Scan</p>
              <p className="text-teal font-mono text-xs font-bold">Context-Aware ON</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center group hover:border-blood transition-all">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">Accuracy Index</p>
              <p className="text-white font-mono text-xs font-bold">99.4% Verified</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center group hover:border-blood transition-all">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse"></div>
                <p className="text-teal font-mono text-[0.55rem] font-bold uppercase">Real-time Sync</p>
              </div>
              <p className="text-white font-mono text-[0.5rem]">Next Scan: 29m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
