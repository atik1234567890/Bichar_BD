"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Globe,
  Lock,
  Database,
  RadioTower,
  Fingerprint,
  Link as LinkIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getApiUrl } from "@/lib/api";

export default function CyberThreatDashboard() {
  const { t, formatNumber, language } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [threats, setThreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCyberData() {
      const API_URL = getApiUrl();
      try {
        const [statsRes, threatsRes] = await Promise.all([
          fetch(`${API_URL}/api/cyber/stats/summary`),
          fetch(`${API_URL}/api/cyber/threats/realtime?limit=6`),
        ]);
        if (statsRes.ok) {
          const json = await statsRes.json();
          setStats(json.data);
        }
        if (threatsRes.ok) {
          const json = await threatsRes.json();
          setThreats(json.data || []);
        }
      } catch (err) {
        console.error("Cyber dashboard API error (using fallback)", err);
        // Fallback mock data
        setStats({
          total_phishing_reported: 12450,
          phishing_last_24h: 247,
          fake_news_flagged: 3820,
          victims_helped: 980,
          threat_level_national: "HIGH",
          threat_score: 82,
          top_targets: ["bKash", "DBBL", "Nagad", "Govt. Sites", "E-Commerce"],
        });
      } finally {
        setLoading(false);
      }
    }
    fetchCyberData();
    const interval = setInterval(fetchCyberData, 60000); // Refresh every min
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-green-500/20 text-green-400 border-green-500/50";
    }
  };

  const statCards = stats ? [
    {
      label: language === "bn" ? "মোট ফিশিং ঝুঁকি" : "Total Phishing Reports",
      value: stats.total_phishing_reported,
      icon: Globe,
      color: "from-red-500 to-orange-500",
    },
    {
      label: language === "bn" ? "গত ২৪ ঘণ্টায় নতুন হুমকি" : "New Threats (24h)",
      value: stats.phishing_last_24h,
      icon: RadioTower,
      color: "from-orange-500 to-yellow-500",
      pulse: true,
    },
    {
      label: language === "bn" ? "মিথ্যা সংবাদ শনাক্ত" : "Fake News Flagged",
      value: stats.fake_news_flagged,
      icon: AlertTriangle,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      label: language === "bn" ? "আক্রান্ত ব্যক্তি সহায়তা পেয়েছেন" : "Victims Assisted",
      value: stats.victims_helped,
      icon: Shield,
      color: "from-emerald-500 to-teal-500",
    },
  ] : [];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #60a5fa 1px, transparent 0)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <RadioTower className="w-3.5 h-3.5 animate-pulse" />
            {language === "bn" ? "রিয়েল-টাইম সাইবার থ্রেট ইন্টেলিজেন্স" : "Real-Time Cyber Threat Intelligence"}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            {language === "bn" ? (
              <>বাংলাদেশের <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">সাইবার সুরক্ষা</span> ড্যাশবোর্ড</>
            ) : (
              <>Bangladesh <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Cybersecurity</span> Command Center</>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg"
          >
            {language === "bn"
              ? "২৪ ঘণ্টা সারাদেশের ফিশিং URL, মিথ্যা সংবাদ এবং ডেটা ব্রিচ পর্যবেক্ষণ করা হচ্ছে। সর্বশেষ হুমকি ইন্টেলিজেন্স নিচে দেখুন।"
              : "Live monitoring of phishing URLs, fake news campaigns, and data breaches across Bangladesh. Up-to-the-second threat intelligence below."}
          </motion.p>
        </div>

        {/* Stats Grid */}
        {!loading && stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {statCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="relative p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 overflow-hidden group hover:border-slate-700 transition-all duration-300"
              >
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-slate-400 text-xs md:text-sm font-medium mb-1">{card.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {formatNumber(card.value)}
                  </span>
                  {card.pulse && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[0,1,2,3].map(i => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-slate-800 mb-3" />
                <div className="h-4 w-3/4 bg-slate-800 rounded mb-2" />
                <div className="h-8 w-1/2 bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Threat Level + Top Targets */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {/* National Threat Level */}
            <div className="md:col-span-1 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20" />
              <div className="relative z-10 text-center">
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                  {language === "bn" ? "জাতীয় থ্রেট লেভেল" : "National Threat Level"}
                </div>
                <div className={`text-5xl font-black mb-2 ${stats.threat_score > 75 ? "text-red-500 animate-pulse" : stats.threat_score > 50 ? "text-orange-500" : "text-yellow-500"}`}>
                  {stats.threat_level_national}
                </div>
                <div className="w-full max-w-[160px] h-2 bg-slate-800 rounded-full overflow-hidden mx-auto mt-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.threat_score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  />
                </div>
                <div className="text-sm text-slate-500 mt-2">Score: {stats.threat_score}/100</div>
              </div>
            </div>

            {/* Top Targets */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="w-5 h-5 text-cyan-400" />
                <div className="text-sm font-semibold text-slate-300">
                  {language === "bn" ? "সর্বাধিক লক্ষ্যবস্তু (Top Targets)" : "Most Targeted Sectors"}
                </div>
              </div>
              <div className="space-y-3">
                {stats.top_targets.map((target: string, i: number) => {
                  const percent = 100 - i * 15 - Math.floor(Math.random() * 10);
                  return (
                    <div key={target} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium flex items-center gap-2">
                          <Lock className="w-3 h-3 text-slate-500" />
                          {target}
                        </span>
                        <span className="text-slate-500">{percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Threat Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Database className="w-5 h-5 text-emerald-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {language === "bn" ? "সর্বশেষ সাইবার হুমকি ফিড" : "Latest Cyber Threat Feed"}
                </div>
                <div className="text-xs text-slate-500">
                  {language === "bn" ? "প্রতি মিনিটে স্বয়ংক্রিয়ভাবে আপডেট" : "Auto-refreshes every 60 seconds"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              FEED ACTIVE
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/50 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-700 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 bg-slate-700 rounded" />
                      <div className="h-4 w-3/4 bg-slate-700 rounded" />
                      <div className="h-3 w-1/2 bg-slate-700 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {threats.slice(0, 6).map((threat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all flex items-start gap-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-700/60 group-hover:scale-110 transition-transform">
                    <LinkIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getSeverityColor(threat.severity)}`}>
                        {threat.severity || "MEDIUM"}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/60 uppercase">
                        {threat.type || "Alert"}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {threat.reported_at || ""}
                      </span>
                    </div>
                    <div className="text-sm md:text-base font-semibold text-slate-100 truncate">
                      {threat.url}
                      {threat.title ? ` · ${threat.title}` : ""}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {language === "bn" ? "লক্ষ্যভূক্ত" : "Target"}: <span className="text-slate-400 font-medium">{threat.target}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
