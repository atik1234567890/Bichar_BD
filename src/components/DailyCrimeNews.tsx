"use client";

import { useState, useEffect, useRef } from "react";
import { Newspaper, Clock, ExternalLink, MapPin, ChevronRight, AlertCircle, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSocket } from "@/context/SocketContext";

export default function DailyCrimeNews() {
  const { t, language, formatNumber, formatDate } = useLanguage();
  const { socket, isConnected } = useSocket();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const fetchDailyNews = async () => {
      try {
        let API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        if (API_URL.endsWith("/")) API_URL = API_URL.slice(0, -1);
        
        const response = await fetch(`${API_URL}/api/incidents/daily`);
        const data = await response.json();
        if (data.success) {
          setNews(data.data);
          setLastUpdateTime(new Date());
        }
      } catch (error) {
        console.error("Error fetching daily news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyNews();
    const interval = setInterval(fetchDailyNews, 180000); // Sync with backend 3 mins
    return () => clearInterval(interval);
  }, []);

  // Socket listener for real-time updates
  useEffect(() => {
    if (socket) {
      socket.on("new_article", (article: any) => {
        setNews((prevNews) => {
          // Prevent duplicates
          if (prevNews.some(item => item.id === article.id || item.title === article.title)) {
            return prevNews;
          }
          return [article, ...prevNews].slice(0, 15); // Keep top 15
        });
        setLastUpdateTime(new Date());
      });
    }
    return () => {
      if (socket) socket.off("new_article");
    };
  }, [socket]);

  // Update "time ago" counter every second
  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - lastUpdateTime.getTime()) / 1000);
      
      if (diffInSeconds < 5) {
        setTimeAgo(t("justNow"));
      } else if (diffInSeconds < 60) {
        setTimeAgo(formatNumber(diffInSeconds) + t("secondsAgo"));
      } else {
        const mins = Math.floor(diffInSeconds / 60);
        setTimeAgo(formatNumber(mins) + t("minutesAgo"));
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [lastUpdateTime, t, formatNumber]);

  if (loading) return (
    <div className="h-[400px] flex items-center justify-center border border-border bg-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-blood border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono text-text-faint uppercase tracking-widest">{t("updatingNews")}</p>
      </div>
    </div>
  );

  const formatTime = (dateStr: string) => {
    if (!dateStr) return t("justNow");
    const date = new Date(dateStr);
    const timeStr = date.toLocaleTimeString(language === "bn" ? 'bn-BD' : 'en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
    return formatNumber(timeStr);
  };

  const translateText = (text: string) => {
    if (language === "bn" || !text) return text;
    return `${text} (Translated)`;
  };

  return (
    <div className="daily-news-module mt-24">
      <div className="chapter-header mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4">
            <span className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-blood before:rounded-full before:block before:animate-pulse">
              {t("liveUpdate")}
            </span>
          </div>
          <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight flex items-center gap-4">
            {t("dailyNewsTitle")}
            {isConnected && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blood opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blood"></span>
              </span>
            )}
          </h2>
          <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[800px] leading-relaxed">
            {t("dailyNewsSub")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-blood/10 border border-blood/20 px-4 py-2 flex items-center gap-3">
            <AlertCircle size={16} className="text-blood animate-pulse" />
            <span className="text-[0.7rem] font-mono text-white uppercase tracking-widest">
              {formatNumber(news.length)}{t("newsFound")}
            </span>
          </div>
          <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-tighter">
            {t("lastUpdated")}{timeAgo}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? news.map((item) => {
          // Check for "Breaking" (within last 30 minutes)
          const isBreaking = (dateStr: string) => {
            if (!dateStr) return false;
            const date = new Date(dateStr);
            const diffInMins = Math.floor((new Date().getTime() - date.getTime()) / 60000);
            return diffInMins <= 30;
          };

          return (
            <div key={item.id || item.title} className="news-card bg-surface border border-border p-6 flex flex-col h-full hover:border-blood/50 transition-all group relative overflow-hidden">
              {isBreaking(item.created_at) && (
                <div className="absolute top-0 right-0 z-10 bg-blood text-white font-mono text-[0.55rem] font-bold uppercase px-3 py-1 animate-pulse shadow-lg border-b border-l border-white/20">
                  {t("breaking")}
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.6rem] font-mono text-blood uppercase bg-blood/10 px-2 py-0.5 border border-blood/20">
                  {item.incident_type?.replace('_', ' ') || "ALERT"}
                </span>
                <div className="flex items-center gap-2 text-[0.6rem] font-mono text-text-faint">
                  <Clock size={12} />
                  {formatTime(item.created_at)}
                </div>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-3 leading-tight group-hover:text-blood transition-colors h-[3.5em] overflow-hidden">
                {translateText(item.title)}
              </h3>
              
              <p className="text-text-dim text-sm leading-relaxed mb-6 line-clamp-3">
                {translateText(item.description)}
              </p>
              
              <div className="mt-auto">
                <div className="flex items-center gap-4 mb-4 text-[0.65rem] text-text-faint font-mono border-b border-border pb-3">
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-blood" /> {item.district}</span>
                  <span className="flex items-center gap-1"><Globe size={12} className="text-teal" /> {item.source_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.6rem] text-text-faint italic">{item.created_at ? formatDate(item.created_at) : t("justNow")}</span>
                  {item.source_url ? (
                    <a 
                      href={item.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blood hover:text-white transition-colors text-[0.7rem] font-bold uppercase tracking-widest flex items-center gap-1 bg-blood/5 px-3 py-1.5 border border-blood/20 rounded-sm"
                    >
                      {t("readMore")} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-blood font-mono text-[0.6rem] uppercase tracking-widest flex items-center gap-1">
                      <Zap size={10} className="fill-blood" /> {t("liveUpdate")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full py-20 text-center border border-dashed border-border bg-bg/30">
            <Newspaper size={48} className="mx-auto text-text-faint opacity-20 mb-4" />
            <p className="text-text-dim font-mono text-sm uppercase tracking-widest">{t("noNews")}</p>
          </div>
        )}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="bg-surface2 border border-border px-10 py-4 text-[0.7rem] font-mono text-text-dim hover:text-white hover:border-blood transition-all uppercase tracking-[0.2em] flex items-center gap-3">
          {t("dailyNewsTitle")} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
