"use client";

import { useState, useEffect } from "react";
import { Activity, Database, Newspaper, Clock } from "lucide-react";

export default function SystemStatus() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    async function fetchStatus() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const response = await fetch(`${API_URL}/health`);
        const result = await response.json();
        setStatus(result);
      } catch (error) {
        console.error("Error fetching health status:", error);
      }
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-status bg-surface border border-border p-8 my-12 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <Activity size={20} className="text-blood" />
        <h3 className="text-lg font-bold text-white uppercase tracking-widest font-mono">System Status</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <Clock className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">শেষ আপডেট</div>
            <div className="text-sm text-text-dim" id="lastScrapeTime">
              {status ? new Date(status.timestamp).toLocaleTimeString() : "লোড হচ্ছে..."}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Newspaper className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">সংবাদ উৎস</div>
            <div className="text-sm text-text-dim" id="totalSources">১৫+ যাচাইকৃত সোর্স</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Database className="text-text-faint mt-1" size={18} />
          <div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">ডেটাবেস</div>
            <div className="text-sm text-teal flex items-center gap-2" id="dbStatus">
              <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
              সংযুক্ত (Cloud Sync)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
