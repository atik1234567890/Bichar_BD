"use client";

import { useState, useEffect } from "react";
import { Activity, Database, Newspaper, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function SystemStatus() {
  const { t, formatNumber } = useLanguage();
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const result = await safeFetch("/api/status");
        if (result.success) {
          setStatus(result);
        }
      } catch (error) {
        // Handled in safeFetch
      }
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const [timeAgo, setTimeAgo] = useState("");
  useEffect(() => {
    if (!status?.last_scrape_time) return;
    const update = () => {
      const diff = Math.floor((new Date().getTime() - new Date(status.last_scrape_time).getTime()) / 60000);
      setTimeAgo(diff <= 0 ? t("justNow") : `${formatNumber(diff)} ${t("minutesAgo")}`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, [status, t, formatNumber]);

  return (
    <div className="system-status bg-surface border border-border p-8 my-12 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <Activity size={20} className="text-blood" />
        <h3 className="text-lg font-bold text-white uppercase tracking-widest font-mono">{t("systemStatus")}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <Clock className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("lastUpdate")}</div>
            <div className="text-sm text-text-dim" id="lastScrapeTime">
              {status ? timeAgo : t("loading")}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Newspaper className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("newsSources")}</div>
            <div className="text-sm text-text-dim" id="totalSources">{t("verifiedSources")}</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Database className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("database")}</div>
            <div className="text-sm text-teal flex items-center gap-2" id="dbStatus">
              <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
              {t("connectedCloudSync")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
