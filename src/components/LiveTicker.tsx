"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Zap } from "lucide-react";

const fallbackNews = [
  "LIVE: ঢাকা-চট্টগ্রাম মহাসড়কে নতুন ভূমি দখল চেষ্টার অভিযোগ ভেরিফাইড।",
  "UPDATE: ২০২৬ সালের প্রথম ত্রৈমাসিকে গুমের হার ১২% বৃদ্ধি পেয়েছে — হিউম্যান রাইটস ওয়াচ।",
  "ALERT: সাভারের গার্মেন্টস শ্রমিকদের বকেয়া বেতন পরিশোধের দাবিতে বিক্ষোভ চলছে।",
  "VERIFIED: পটিয়া অঞ্চলে ৫টি ভুয়া দলিল শনাক্ত করেছে আমাদের AI সিস্টেম।",
  "BREAKING: আন্তর্জাতিক আদালতে নির্বাচনী সহিংসতার নতুন তথ্য প্রমাণ জমা দিয়েছে বিচারBD।"
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);
  const [newsItems, setNewsItems] = useState<string[]>(fallbackNews);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    async function fetchFeed() {
        try {
          const response = await fetch(`${API_URL}/api/feed/live`);
          const result = await response.json();
          if (result.success && result.data.length > 0) {
            const formattedItems = result.data.map((item: any) => {
                const districtStr = item.district && item.district !== "National" ? ` in ${item.district}` : "";
                return `${item.message}${districtStr}`;
            });
            setNewsItems(formattedItems);
          }
        } catch (error) {
          console.error("Error fetching feed:", error);
        }
      }
     
     fetchFeed();
     // Refresh from API every 1 minute for more "live" feel
     const feedTimer = setInterval(fetchFeed, 60000);
     return () => clearInterval(feedTimer);
   }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsItems.length);
    }, 6000); // 6 seconds per item
    return () => timer && clearInterval(timer);
  }, [newsItems]);

  return (
    <div className="bg-blood/10 border-b border-blood/20 py-2 px-6 overflow-hidden no-print">
      <div className="max-w-[1400px] mx-auto flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0 bg-blood px-2 py-0.5 rounded-sm">
          <Zap size={12} className="text-white fill-white animate-pulse" />
          <span className="text-[0.6rem] font-mono font-bold text-white uppercase tracking-tighter">Live Updates</span>
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
          <div 
            className="absolute inset-0 flex items-center transition-all duration-1000 ease-in-out"
            style={{ transform: `translateY(-${index * 100}%)` }}
          >
            {newsItems.map((item, i) => (
              <div key={i} className="h-full flex items-center text-[0.7rem] font-mono text-text-dim whitespace-nowrap gap-2">
                <AlertCircle size={10} className="text-blood" /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-[0.6rem] font-mono text-blood/50 uppercase tracking-widest hidden md:block">
          System Status: Monitoring 24/7
        </div>
      </div>
    </div>
  );
}
