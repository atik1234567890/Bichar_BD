"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSocket } from "@/context/SocketContext";
import { ShieldAlert, CheckCircle, Scale, Search } from "lucide-react";
import { safeFetch } from "@/lib/api";

export default function LiveCaseCounters() {
  const { t, formatNumber } = useLanguage();
  const { socket } = useSocket();
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    investigation: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await safeFetch("/api/stats/summary");
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        // Handled in safeFetch
      }
    }
    fetchStats();

    if (socket) {
      socket.on("summary_update", (data: any) => {
        setStats(data);
      });
    }
    return () => {
      if (socket) socket.off("summary_update");
    };
  }, [socket]);

  const counters = [
    { label: t("totalCases"), val: stats.total, icon: Scale, color: "text-white" },
    { label: t("active"), val: stats.pending, icon: ShieldAlert, color: "text-blood" },
    { label: t("verdictGiven"), val: stats.resolved, icon: CheckCircle, color: "text-teal" },
    { label: t("underInvestigation"), val: stats.investigation, icon: Search, color: "text-gold" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border mb-12">
      {counters.map((c, i) => (
        <div key={i} className="bg-surface p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <c.icon className={`w-4 h-4 mb-3 opacity-30 group-hover:opacity-100 transition-opacity ${c.color}`} />
          <div className={`text-2xl font-bold font-mono mb-1 ${c.color}`}>{formatNumber(c.val)}</div>
          <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest text-center">{c.label}</div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blood/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}
