"use client";

import { useState, useEffect } from "react";
import { Brain, Activity, Zap, RefreshCcw, ShieldCheck } from "lucide-react";

export default function AutonomousBrainStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/brain/status`);
        const data = await response.json();
        if (data.success) {
          setStatus(data);
        }
      } catch (error) {
        console.error("Error fetching brain status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="special-module bg-surface border border-border p-8 relative overflow-hidden my-12 before:content-['NEURAL_CORE'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.5rem] before:tracking-[0.2em] before:uppercase before:px-3 before:py-1.5 before:bg-teal before:text-black">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-teal/10 border border-teal/20 rounded-full flex items-center justify-center text-teal animate-pulse">
          <Brain size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">Autonomous Neural Brain</h3>
          <p className="text-[0.7rem] font-mono text-teal uppercase tracking-widest flex items-center gap-2">
            <Activity size={12} /> {status?.status || "Initializing Core..."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">Self-Healing Logs</span>
            <span className="text-[0.55rem] font-mono text-teal bg-teal/10 px-2 py-0.5 rounded-sm">Version {status?.version || "2.1.0"}</span>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {status?.logs && status.logs.length > 0 ? (
              status.logs.map((log: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-bg/50 p-3 border border-border/50 group hover:border-teal/30 transition-colors">
                  <div className="text-[0.55rem] font-mono text-text-faint whitespace-nowrap pt-1">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="flex-1">
                    <span className={`text-[0.55rem] font-mono uppercase px-1.5 py-0.5 mr-2 ${
                      log.type === 'HEAL' ? 'text-teal bg-teal/10' : 
                      log.type === 'GROWTH' ? 'text-gold bg-gold/10' : 
                      'text-sky bg-sky/10'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-xs text-text-dim leading-relaxed">{log.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-text-faint italic py-4">No neural activity logged yet. System is stable.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg border border-border p-5 rounded-sm">
            <div className="flex items-center gap-2 mb-4 text-sky">
              <Zap size={16} />
              <span className="text-[0.65rem] font-mono uppercase font-bold tracking-wider">Active Capabilities</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Self-Repair Engine", active: true },
                { label: "Adaptive Scraper Expansion", active: true },
                { label: "Neural Weight Refinement", active: true },
                { label: "Anomaly Mitigation", active: true }
              ].map((cap, i) => (
                <div key={i} className="flex items-center justify-between text-[0.65rem]">
                  <span className="text-text-dim">{cap.label}</span>
                  <ShieldCheck size={14} className="text-teal" />
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-surface2 border border-border hover:border-teal hover:text-teal text-text-faint py-3 text-[0.6rem] font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <RefreshCcw size={12} /> Force Neural Recalibration
          </button>
        </div>
      </div>
    </div>
  );
}
