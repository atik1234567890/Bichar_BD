"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allDistricts } from "@/lib/data";
import { MapPin, AlertTriangle, ShieldCheck, Clock, TrendingUp, Search } from "lucide-react";

export default function MapSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    async function fetchStats() {
      try {
        const response = await fetch(`${API_URL}/api/stats/divisions`);
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Error fetching map stats:", error);
      }
    }
    fetchStats();
  }, []);

  const regions = stats.length > 0 ? stats : allDistricts.map(d => ({
    division: d,
    crime_density_score: 0,
    pending_cases: 0,
    resolved_cases: 0,
    justice_score: 0,
    total_cases: 0
  }));

  const totalNationalCases = regions.reduce((acc: number, curr: any) => acc + (curr.total_cases || 0), 0);

  return (
    <div className="map-section mt-24 mb-12">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['03'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          রিয়েল-টাইম হিটম্যাপ
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
          ৬৪ জেলার অপরাধ ও বিচারিক রেকর্ড
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          সারাদেশে মোট {totalNationalCases.toLocaleString()}টি নথিভুক্ত অপরাধ এবং তাদের বর্তমান অবস্থা
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Side: Regions List with Stats */}
        <div className="xl:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {regions.map((region: any) => (
            <div 
              key={region.division}
              onMouseEnter={() => setSelectedRegion(region.division)}
              className={`p-4 border transition-all cursor-pointer group ${
                selectedRegion === region.division 
                ? 'bg-surface2 border-blood shadow-[0_0_15px_rgba(204,31,31,0.1)]' 
                : 'bg-surface border-border hover:border-blood/50'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`text-sm font-bold transition-colors ${selectedRegion === region.division ? 'text-blood' : 'text-white'}`}>
                  {region.division}
                </span>
                <span className="text-[0.6rem] font-mono bg-bg px-2 py-0.5 border border-border text-text-faint">
                  {region.total_cases} Cases
                </span>
              </div>
              <div className="h-1 bg-bg w-full mb-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, region.total_cases)}%` }}
                  className={`h-full ${region.total_cases > 80 ? 'bg-blood' : region.total_cases > 40 ? 'bg-gold' : 'bg-teal'}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[0.6rem] font-mono text-text-dim">
                <div className="flex items-center gap-1.5">
                  <Clock size={10} className="text-blood" />
                  <span>Pending: {region.pending_cases}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={10} className="text-teal" />
                  <span>Resolved: {region.resolved_cases}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle: Interactive Map Simulation */}
        <div className="xl:col-span-2 relative aspect-square bg-surface border border-border group overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale group-hover:opacity-20 transition-opacity">
             <svg viewBox="0 0 500 700" className="w-full h-full p-10 fill-text-faint">
                <path d="M250,50 L300,100 L350,150 L380,250 L400,350 L380,450 L350,550 L300,650 L200,650 L150,550 L120,450 L100,350 L120,250 L150,150 L200,100 Z" />
             </svg>
          </div>

          {/* District Dots with Density Color */}
          {mounted && regions.map((region: any, i: number) => {
            const stats = region;
            // Limit to first 30 districts to avoid cluttering, or use a specific logic
            if (i > 30) return null;
            return (
              <motion.div
                key={region.division}
                className={`absolute w-3 h-3 rounded-full cursor-pointer z-10 ${
                  stats.crime_density_score > 70 ? 'bg-blood' : stats.crime_density_score > 40 ? 'bg-gold' : 'bg-teal'
                }`}
                style={{
                  top: `${15 + (Math.floor(i / 6) * 15)}%`,
                  left: `${15 + ((i % 6) * 15)}%`,
                }}
                whileHover={{ scale: 2 }}
                onMouseEnter={() => setSelectedRegion(region.division)}
                animate={{
                  boxShadow: selectedRegion === region.division 
                    ? `0 0 20px 10px ${stats.crime_density_score > 70 ? 'rgba(204,31,31,0.3)' : 'rgba(200,147,10,0.3)'}`
                    : '0 0 0px 0px transparent'
                }}
              >
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-bg border border-border px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none text-[0.6rem] font-mono text-white">
                  {region.division}
                </div>
              </motion.div>
            )
          })}

          {/* Random Live Incident Pulses */}
          {mounted && [...Array(8)].map((_, i) => (
             <motion.div
               key={`pulse-${i}`}
               className="absolute w-2 h-2 bg-blood rounded-full"
               style={{
                 top: `${15 + Math.random() * 70}%`,
                 left: `${20 + Math.random() * 60}%`,
               }}
               animate={{
                 scale: [1, 3, 1],
                 opacity: [0.8, 0, 0.8],
               }}
               transition={{
                 duration: 3,
                 repeat: Infinity,
                 delay: i * 0.5,
               }}
             />
          ))}

          <div className="absolute top-6 left-6 bg-bg/80 backdrop-blur-md border border-border p-4">
             <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-blood" />
                <span className="text-[0.65rem] font-mono text-white uppercase tracking-widest">Live Activity Feed</span>
             </div>
             <div className="space-y-2 max-w-[200px]">
                <div className="text-[0.6rem] text-text-dim flex gap-2">
                  <span className="text-blood font-bold shrink-0">12:04</span>
                  <span>নতুন গুম রিপোর্ট: ঢাকা, মিরপুর অঞ্চল</span>
                </div>
                <div className="text-[0.6rem] text-text-dim flex gap-2">
                  <span className="text-gold font-bold shrink-0">11:45</span>
                  <span>জমি দখল সংঘর্ষ: চট্টগ্রাম, পটিয়া</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Region Detailed Analysis */}
        <div className="xl:col-span-1">
          <AnimatePresence mode="wait">
            {selectedRegion ? (
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-surface border border-blood p-8 h-full relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 opacity-5 text-blood">
                  <MapPin size={150} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{selectedRegion} Analysis</h3>
                <p className="text-sm text-text-dim italic mb-8 border-b border-border pb-4">
                  ২০২৬ সালের বিচারিক পরিসংখ্যান ও অপরাধ বিশ্লেষণ
                </p>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[0.65rem] font-mono text-text-faint uppercase">অপরাধের তীব্রতা</span>
                      <span className="text-blood font-bold">{regions.find((r: any) => r.division === selectedRegion)?.crime_density_score}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[0.65rem] font-mono text-text-faint uppercase">মোট মামলা</span>
                      <span className="text-white font-bold">{regions.find((r: any) => r.division === selectedRegion)?.total_cases} টি</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[0.65rem] font-mono text-text-faint uppercase">ঝুলে থাকা মামলা</span>
                      <span className="text-gold font-bold">{regions.find((r: any) => r.division === selectedRegion)?.pending_cases} টি</span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg border border-border">
                    <div className="flex items-center gap-2 mb-3 text-blood">
                      <AlertTriangle size={14} />
                      <span className="text-[0.6rem] font-mono uppercase tracking-widest">High Risk Areas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["থানা এ", "থানা বি", "থানা সি"].map(t => (
                        <span key={t} className="text-[0.55rem] font-mono bg-surface2 px-2 py-1 border border-border text-text-dim">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-blood text-white py-3 text-[0.7rem] font-mono uppercase tracking-widest hover:bg-blood/90 transition-all flex items-center justify-center gap-2">
                    <Search size={14} /> পূর্ণাঙ্গ রিপোর্ট ডাউনলোড
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border border-dashed border-border flex flex-col items-center justify-center p-8 text-center text-text-faint">
                <MapPin size={40} className="mb-4 opacity-20" />
                <p className="text-xs font-mono uppercase tracking-widest">ম্যাপে অথবা বাম পাশের লিস্টে ক্লিক করে অঞ্চলের বিস্তারিত দেখুন</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
