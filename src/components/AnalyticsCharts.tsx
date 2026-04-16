"use client";

import React, { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { useSocket } from "@/context/SocketContext";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";
import { ChartSkeleton, Skeleton } from "./Skeletons";

export default function AnalyticsCharts() {
  const { t, formatNumber, language } = useLanguage();
  const { socket } = useSocket();
  const [timeline, setTimeline] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(`${API_URL}/api/stats/analytics`);
      const result = await response.json();
      if (result.success) {
        setTimeline(result.data.timeline);
        setTrending(result.data.trending);
      }
    } catch (error) {
      console.error("Error fetching charts data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    if (socket) {
      socket.on("new_article", () => fetchAnalytics());
      socket.on("summary_update", () => fetchAnalytics());
    }
    return () => {
      if (socket) {
        socket.off("new_article");
        socket.off("summary_update");
      }
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <ChartSkeleton />
        <div className="bg-surface border border-border p-6 rounded-sm">
          <Skeleton className="w-32 h-4 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-full h-16" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
      {/* Timeline Chart */}
      <div className="bg-surface border border-border p-6 rounded-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-4 h-4 text-blood" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-white">{t("caseTimeline")}</h3>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b1a1a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b1a1a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#666" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => val} 
              />
              <YAxis 
                stroke="#666" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => formatNumber(val)} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#111", 
                  border: "1px solid #333", 
                  borderRadius: "0px",
                  fontSize: "12px",
                  fontFamily: "monospace"
                }}
                itemStyle={{ color: "#8b1a1a" }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#8b1a1a" 
                fillOpacity={1} 
                fill="url(#colorCount)" 
                strokeWidth={2}
                name={t("cases")}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-[0.6rem] font-mono text-text-faint uppercase tracking-widest text-center">
          {t("casesPerMonth")} (Last 12 Months)
        </div>
      </div>

      {/* Trending Cases */}
      <div className="bg-surface border border-border p-6 rounded-sm flex flex-col relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-4 h-4 text-blood" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-white">{t("trendingCases")}</h3>
        </div>

        <div className="flex-1 space-y-4">
          {trending.length > 0 ? trending.map((c, i) => (
            <div key={c.id} className="flex items-start gap-4 p-4 border border-border bg-bg/50 hover:border-blood/50 transition-all group cursor-pointer">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-blood/10 border border-blood/20 text-blood font-mono text-xs font-bold group-hover:bg-blood group-hover:text-white transition-all">
                {formatNumber(i + 1)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-white text-sm font-bold truncate group-hover:text-blood transition-colors">{c.title}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[0.6rem] font-mono text-text-faint uppercase">{c.district}</span>
                  <span className="text-[0.6rem] font-mono text-blood/70 uppercase px-1 border border-blood/20">{c.type.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="shrink-0 text-blood animate-pulse">
                <AlertCircle size={14} />
              </div>
            </div>
          )) : (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <TrendingUp size={48} className="mb-4" />
              <p className="text-xs font-mono uppercase tracking-widest">{t("loading")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
