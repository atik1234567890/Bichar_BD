"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Share2, Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Fuse from "fuse.js";
import toast from "react-hot-toast";

export default function GlobalSearch() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [allItems, setAllItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const [newsRes, incidentsRes] = await Promise.all([
          fetch(`${API_URL}/api/incidents/daily`),
          fetch(`${API_URL}/api/incidents?limit=100`)
        ]);
        const news = await newsRes.json();
        const incidents = await incidentsRes.json();
        
        const combined = [
          ...(news.success ? news.data.map((i: any) => ({ ...i, type: 'news' })) : []),
          ...(incidents.success ? incidents.data.map((i: any) => ({ ...i, type: 'incident' })) : [])
        ];
        setAllItems(combined);
      } catch (e) {
        console.error("Search fetch error", e);
      }
    }
    fetchAll();
  }, []);

  const fuse = new Fuse(allItems, {
    keys: ["title", "description", "district", "incident_type"],
    threshold: 0.4,
    distance: 100
  });

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(r => r.item).slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleShare = (item: any) => {
    const url = `${window.location.origin}/case/${item.incident_id || item.id}`;
    navigator.clipboard.writeText(url);
    toast.success(t("linkCopied"));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <div className={`flex items-center gap-3 bg-surface border ${isFocused ? 'border-blood' : 'border-border'} p-3 transition-all group`}>
        <Search size={18} className={`${isFocused ? 'text-blood' : 'text-text-faint'}`} />
        <input 
          type="text"
          className="bg-transparent border-none outline-none text-white text-sm flex-1 font-mono"
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-text-faint hover:text-white">
            <X size={16} />
          </button>
        )}
      </div>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border shadow-2xl max-h-[400px] overflow-y-auto z-[100]">
          {results.map((item, idx) => (
            <div key={idx} className="p-4 border-b border-border last:border-0 hover:bg-surface2 transition-colors group flex items-start gap-4">
              <div className="flex-1">
                <div className="text-[0.6rem] font-mono text-blood uppercase mb-1">{item.type} · {item.district}</div>
                <div className="text-white text-sm font-bold group-hover:text-blood transition-colors mb-1">{item.title}</div>
                <div className="text-[0.7rem] text-text-dim line-clamp-1">{item.description}</div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleShare(item); }}
                className="p-2 text-text-faint hover:text-blood transition-colors"
                title={t("share")}
              >
                <Share2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
