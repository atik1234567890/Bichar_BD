"use client";

import { useState, useEffect } from "react";
import { Newspaper, Clock, ExternalLink, MapPin, ChevronRight, AlertCircle, Globe } from "lucide-react";

export default function DailyCrimeNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyNews = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/incidents/daily`);
        const data = await response.json();
        if (data.success) {
          setNews(data.data);
        }
      } catch (error) {
        console.error("Error fetching daily news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyNews();
    const interval = setInterval(fetchDailyNews, 300000); // Refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="h-[400px] flex items-center justify-center border border-border bg-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-blood border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono text-text-faint uppercase tracking-widest">সংবাদ আপডেট হচ্ছে...</p>
      </div>
    </div>
  );

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="daily-news-module mt-24">
      <div className="chapter-header mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['LIVE'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
            সরাসরি আপডেট
          </div>
          <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
            আজকের গুরুত্বপূর্ণ অপরাধ সংবাদ
          </h2>
          <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
            সারা দেশের যাচাইকৃত সংবাদ উৎস থেকে সংগৃহীত — ৩০ মিনিট পরপর অটো-আপডেট
          </p>
        </div>
        <div className="bg-blood/10 border border-blood/20 px-4 py-2 flex items-center gap-3">
          <AlertCircle size={16} className="text-blood animate-pulse" />
          <span className="text-[0.7rem] font-mono text-white uppercase tracking-widest">
            {news.length}টি গুরুত্বপূর্ণ সংবাদ পাওয়া গেছে
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? news.map((item) => (
          <div key={item.id} className="news-card bg-surface border border-border p-6 flex flex-col h-full hover:border-blood/50 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[0.6rem] font-mono text-blood uppercase bg-blood/10 px-2 py-0.5 border border-blood/20">
                {item.incident_type.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2 text-[0.6rem] font-mono text-text-faint">
                <Clock size={12} />
                {formatTime(item.created_at)}
              </div>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-3 leading-tight group-hover:text-blood transition-colors h-[3.5em] overflow-hidden">
              {item.title}
            </h3>
            
            <p className="text-text-dim text-sm leading-relaxed mb-6 line-clamp-3">
              {item.description}
            </p>
            
            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-4 text-[0.65rem] text-text-faint font-mono border-b border-border pb-3">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-blood" /> {item.district}</span>
                <span className="flex items-center gap-1"><Globe size={12} className="text-teal" /> {item.source_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.6rem] text-text-faint italic">{formatDate(item.created_at)}</span>
                <a 
                  href={item.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blood hover:text-white transition-colors text-[0.7rem] font-bold uppercase tracking-widest flex items-center gap-1 bg-blood/5 px-3 py-1.5 border border-blood/20 rounded-sm"
                >
                  পুরো সংবাদ পড়ুন <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center border border-dashed border-border bg-bg/30">
            <Newspaper size={48} className="mx-auto text-text-faint opacity-20 mb-4" />
            <p className="text-text-dim font-mono text-sm uppercase tracking-widest">আজকের কোনো সংবাদ এখনো পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="bg-surface2 border border-border px-10 py-4 text-[0.7rem] font-mono text-text-dim hover:text-white hover:border-blood transition-all uppercase tracking-[0.2em] flex items-center gap-3">
          পুরানো সংবাদ আর্কাইভ দেখুন <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
