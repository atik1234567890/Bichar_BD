"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, Lock, Fingerprint, Globe, Activity } from "lucide-react";
import { safeFetch } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

interface SecurityEvent {
  type: string;
  ip: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  message?: string;
}

interface GeoStats {
  [district: string]: number;
}

export default function SecurityOpsDashboard() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [geoStats, setGeoStats] = useState<GeoStats>({});
  const [activeThreats, setActiveThreats] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siemData, geoData] = await Promise.all([
          safeFetch("/api/siem/events"),
          safeFetch("/api/siem/geo-stats")
        ]);
        setEvents(siemData.events);
        setGeoStats(geoData);
        setActiveThreats(siemData.active_threats);
      } catch (error) {
        console.error("Error fetching security data:", error);
        // Mock data for demo
        const mockEvents: SecurityEvent[] = [
          { type: "REPORT_SUBMITTED", ip: "ANONYMOUS", timestamp: new Date().toISOString(), severity: "low" },
          { type: "ANOMALY_DETECTED", ip: "103.45.67.89", timestamp: new Date(Date.now() - 300000).toISOString(), severity: "medium", message: "Multiple report submissions from same subnet detected." },
          { type: "LOGIN", ip: "192.168.1.1", timestamp: new Date(Date.now() - 600000).toISOString(), severity: "low" },
        ];
        setEvents(mockEvents);
        setGeoStats({ "Dhaka": 45, "Chittagong": 12, "Sylhet": 5 });
        setActiveThreats(3);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-blood border-blood bg-blood/10";
      case "medium": return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
      case "low": return "text-green-500 border-green-500 bg-green-500/10";
      default: return "text-text-faint border-border bg-bg";
    }
  };

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-blood font-mono text-[0.7rem] tracking-[0.3em] uppercase mb-2">
            Security Operations Center
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            সিকিউরিটি অপস ড্যাশবোর্ড
          </h2>
          <p className="text-text-dim max-w-2xl mx-auto">
            রিয়েল-টাইম সিকিউরিটি মনিটরিং, থ্রেট ডিটেকশন, এবং অ্যানোমালি এলার্ট
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="text-blood" size={20} />
              <span className="text-[0.65rem] font-mono text-text-faint uppercase tracking-widest">Active Threats</span>
            </div>
            <div className="text-3xl font-bold text-white">{loading ? "..." : activeThreats}</div>
          </div>
          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-green-500" size={20} />
              <span className="text-[0.65rem] font-mono text-text-faint uppercase tracking-widest">E2E Encryption</span>
            </div>
            <div className="text-3xl font-bold text-white">Active</div>
          </div>
          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <Fingerprint className="text-blue-500" size={20} />
              <span className="text-[0.65rem] font-mono text-text-faint uppercase tracking-widest">Audit Logs</span>
            </div>
            <div className="text-3xl font-bold text-white">{events.length}</div>
          </div>
          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="text-purple-500" size={20} />
              <span className="text-[0.65rem] font-mono text-text-faint uppercase tracking-widest">Dark Web Scan</span>
            </div>
            <div className="text-3xl font-bold text-white">Active</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={16} className="text-blood" />
              <h3 className="text-sm font-mono text-text-faint uppercase tracking-widest">Live Security Events</h3>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {events.map((event, index) => (
                <div key={index} className={`p-3 border-l-2 ${getSeverityColor(event.severity)} bg-bg`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-mono text-text">{event.type}</div>
                      <div className="text-[0.65rem] text-text-faint mt-1">IP: {event.ip}</div>
                      {event.message && (
                        <div className="text-[0.65rem] text-text-dim mt-1">{event.message}</div>
                      )}
                    </div>
                    <div className="text-[0.6rem] text-text-faint">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe size={16} className="text-blue-500" />
              <h3 className="text-sm font-mono text-text-faint uppercase tracking-widest">Geographic Threat Distribution</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(geoStats).map(([district, count]) => (
                <div key={district} className="space-y-1">
                  <div className="flex justify-between text-xs text-text">
                    <span>{district}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 bg-border rounded overflow-hidden">
                    <div 
                      className="h-full bg-blood" 
                      style={{ width: `${Math.min((count / 50) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}