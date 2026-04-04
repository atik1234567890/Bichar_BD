"use client";

import { useState } from "react";
import { Search, User, ShieldAlert, ExternalLink } from "lucide-react";

export default function PublicFigureSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(`${API_URL}/api/figures/search?q=${encodeURIComponent(searchTerm)}`);
      const result = await response.json();
      if (result.success) {
        setResults(result.data);
      }
    } catch (error) {
      console.error("Error searching figures:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="special-module bg-surface border border-border p-10 relative overflow-hidden my-12 before:content-['PUBLIC_RECORDS'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.55rem] before:tracking-[0.2em] before:uppercase before:px-3 before:py-1.5 before:bg-blood before:text-white">
      <h3 className="sm-title text-[1.4rem] font-bold text-white mb-3">
        Public Figure Search
      </h3>
      <p className="sm-desc text-text-dim text-[0.9rem] leading-[1.9] max-w-[700px] mb-6">
        পাবলিক রেকর্ড এবং সংবাদ সূত্রের ভিত্তিতে তৈরি। এই সিস্টেমটি আপনাকে অফিসিয়াল রিপোর্টে নাম আসা ব্যক্তিদের সম্পর্কে তথ্য খুঁজতে সাহায্য করবে।
      </p>
      <div className="flex gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Search by name, role or party..." 
          className="bg-bg border border-border p-3 flex-1 text-white font-mono text-sm focus:outline-none focus:border-blood"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-blood text-white px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-blood/80 transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((fig) => (
            <div key={fig.id} className="bg-bg border border-border p-4 flex items-start gap-4">
              <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center shrink-0">
                <User size={24} className="text-text-faint" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-bold text-sm">{fig.name}</h4>
                  <span className={`text-[0.6rem] px-2 py-0.5 font-mono uppercase border ${
                    fig.status === 'fugitive' ? 'border-blood text-blood' : 
                    fig.status === 'arrested' ? 'border-gold text-gold' : 'border-border text-text-dim'
                  }`}>
                    {fig.status}
                  </span>
                </div>
                <p className="text-text-dim text-[0.75rem] mb-2">{fig.role} • {fig.party}</p>
                <div className="flex items-center gap-4">
                  <span className="text-blood font-mono text-[0.7rem] flex items-center gap-1">
                    <ShieldAlert size={12} /> {fig.incidents_count} Incidents
                  </span>
                  <button className="text-text-faint hover:text-white transition-colors text-[0.7rem] flex items-center gap-1">
                    View Details <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
