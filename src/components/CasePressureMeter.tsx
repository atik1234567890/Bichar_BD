"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { useSocket } from "@/context/SocketContext";
import { safeFetch } from "@/lib/api";

export default function CasePressureMeter() {
  const { t, formatNumber } = useLanguage();
  const { socket } = useSocket();
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await safeFetch("/api/stats/pressure-score");
        if (result.success) {
          setScore(result.data.score);
        }
      } catch (error) {
        // Handled in safeFetch
      }
    }
    fetchData();

    if (socket) {
        socket.on('summary_update', () => fetchData());
    }
    return () => {
        if (socket) socket.off('summary_update');
    };
  }, [socket]);

  const data = [
    { value: score },
    { value: 100 - score }
  ];

  const getColor = (s: number) => {
    if (s < 30) return "#22c55e"; // Green
    if (s < 70) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  return (
    <div className="pressure-meter bg-surface border border-border p-6 rounded-sm flex flex-col items-center justify-center relative overflow-hidden">
      <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-6 self-start">{t("casePressureMeter")}</h3>
      
      <div className="w-full h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getColor(score)} stroke="none" />
              <Cell fill="#1a1a1a" stroke="none" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center">
          <div className="text-3xl font-bold text-white font-mono">{formatNumber(score)}%</div>
          <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">{t("pressureScore")}</div>
        </div>
      </div>

      <div className="flex justify-between w-full mt-4 border-t border-border pt-4">
        <div className="text-center flex-1 border-r border-border">
          <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("low")}</div>
          <div className="w-1.5 h-1.5 bg-green rounded-full mx-auto" />
        </div>
        <div className="text-center flex-1">
          <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("high")}</div>
          <div className="w-1.5 h-1.5 bg-blood rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}
