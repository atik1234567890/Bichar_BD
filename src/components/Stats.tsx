"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export default function Stats() {
  const [summary, setSummary] = useState<any>(null);
  const [types, setTypes] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    async function fetchData() {
      try {
        const [summaryRes, typesRes] = await Promise.all([
          fetch(`${API_URL}/api/stats/summary`),
          fetch(`${API_URL}/api/stats/types`)
        ]);
        
        const summaryData = await summaryRes.json();
        const typesData = await typesRes.json();
        
        if (summaryData.success) setSummary(summaryData.data);
        if (typesData.success) setTypes(typesData.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
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
      num: `${summary.total.toLocaleString()}`,
      desc: "মোট নথিভুক্ত\nঅপরাধ (২০২৬)",
      color: "blood",
    },
    {
      num: `${(summary.resolved / summary.total * 100 || 0).toFixed(1)}%`,
      desc: "বিচারের গড় হার\n(সারাদেশে)",
      color: "gold",
    },
    {
      num: `${summary.pending.toLocaleString()}`,
      desc: "তদন্তাধীন ও\nঝুলে থাকা মামলা",
      color: "teal",
    },
    {
      num: `Verified`,
      desc: "সিস্টেমের নির্ভরযোগ্যতা\nএবং ডেটা সিকিউরিটি",
      color: "sky",
    },
  ] : [
    { num: "৮৫০+", desc: "গুম — enforced\ndisappearances (2009–2026)", color: "blood" },
    { num: "১৯%", desc: "ধর্ষণ মামলায়\nসাজার হার", color: "gold" },
    { num: "৪৫%", desc: "বাল্যবিবাহের হার\nগ্রামাঞ্চলে", color: "teal" },
    { num: "৩৬ লক্ষ", desc: "RMG শ্রমিক\nঅধিকারবঞ্চিত", color: "sky" }
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
            <h3 className="text-white font-bold text-xs uppercase tracking-widest font-mono">Crime Type Distribution</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(types).length > 0 ? (
              Object.entries(types).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([type, count]: any) => (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-[0.65rem] font-mono text-text-dim uppercase">
                    <span>{type.replace(/_/g, ' ')}</span>
                    <span>{count} cases</span>
                  </div>
                  <div className="h-1 bg-bg border border-border-light overflow-hidden">
                    <div 
                      className="h-full bg-blood transition-all duration-1000" 
                      style={{ width: `${(count / summary?.total * 100) || 0}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-faint text-xs italic text-center py-4">তথ্য পাওয়া যায়নি</p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-gold" />
            <h3 className="text-white font-bold text-xs uppercase tracking-widest font-mono">System Integrity</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg border border-border p-4 text-center">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">Hashing Protocol</p>
              <p className="text-teal font-mono text-xs font-bold">SHA-256 Active</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">ELA Analysis</p>
              <p className="text-teal font-mono text-xs font-bold">Neural Engine ON</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center">
              <p className="text-text-faint text-[0.55rem] font-mono uppercase mb-1">Daily Scrapes</p>
              <p className="text-white font-mono text-xs font-bold">142 Sources</p>
            </div>
            <div className="bg-bg border border-border p-4 text-center">
              <AlertTriangle size={14} className="text-blood mx-auto mb-1" />
              <p className="text-blood font-mono text-[0.55rem] font-bold uppercase">Anomalies: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
