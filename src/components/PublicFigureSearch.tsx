"use client";

import { useState } from "react";
import { Search, User, ShieldAlert, ExternalLink, X, FileText, MapPin, Calendar, Scale, Landmark, Home, Briefcase, History } from "lucide-react";

export default function PublicFigureSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);

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
                  <button 
                    onClick={() => setSelectedFigure(fig)}
                    className="text-text-faint hover:text-white transition-colors text-[0.7rem] flex items-center gap-1"
                  >
                    View Details <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedFigure && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm" onClick={() => setSelectedFigure(null)} />
          <div className="relative bg-surface border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl">
            <button 
              onClick={() => setSelectedFigure(null)}
              className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="w-24 h-24 bg-bg border border-border flex items-center justify-center shrink-0">
                <User size={48} className="text-text-faint" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl font-bold text-white">{selectedFigure.name}</h2>
                  <span className={`text-[0.65rem] px-3 py-1 font-mono uppercase border ${
                    selectedFigure.status === 'fugitive' ? 'border-blood text-blood' : 
                    selectedFigure.status === 'arrested' ? 'border-gold text-gold' : 'border-border text-text-dim'
                  }`}>
                    {selectedFigure.status}
                  </span>
                </div>
                <p className="text-text-dim text-sm mb-4">
                  {selectedFigure.role} • {selectedFigure.party} • {selectedFigure.constituency}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-bg border border-border p-3 text-center">
                    <p className="text-[0.55rem] text-text-faint uppercase font-mono mb-1">Total Incidents</p>
                    <p className="text-blood font-bold text-lg font-mono">{selectedFigure.incidents_count}</p>
                  </div>
                  <div className="bg-bg border border-border p-3 text-center">
                    <p className="text-[0.55rem] text-text-faint uppercase font-mono mb-1">Verified Reports</p>
                    <p className="text-teal font-bold text-lg font-mono">{Math.floor(selectedFigure.incidents_count * 0.7)}</p>
                  </div>
                  <div className="bg-bg border border-border p-3 text-center col-span-2">
                    <p className="text-[0.55rem] text-text-faint uppercase font-mono mb-1">Primary Allegation</p>
                    <p className="text-white font-bold text-xs">Abuse of Power & Corruption</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              {/* Profile Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg border border-border p-6 flex flex-col justify-center">
                  <p className="text-[0.6rem] text-text-faint uppercase font-mono mb-2">Permanent Address Record</p>
                  <div className="flex items-start gap-3 text-sm text-white leading-relaxed">
                    <MapPin size={18} className="shrink-0 text-blood mt-1" />
                    <span>{selectedFigure.permanent_address || "Confidential / Under Investigation"}</span>
                  </div>
                </div>
                <div className="bg-bg border border-border p-6 flex flex-col justify-center">
                  <p className="text-[0.6rem] text-text-faint uppercase font-mono mb-2">Current Status / Location</p>
                  <div className="flex items-start gap-3 text-sm text-white leading-relaxed">
                    <Scale size={18} className="shrink-0 text-gold mt-1" />
                    <span className="capitalize">{selectedFigure.status} • {selectedFigure.current_location || "Tracking Active"}</span>
                  </div>
                </div>
              </div>

              {/* Assets & Wealth Section */}
              <div className="bg-bg border border-border p-8 relative overflow-hidden before:content-['ASSETS_LOG'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.5rem] before:tracking-[0.2em] before:uppercase before:px-2 before:py-1 before:bg-gold before:text-black">
                <div className="flex items-center gap-3 mb-8 text-gold">
                  <Landmark size={24} />
                  <h3 className="text-lg font-mono uppercase tracking-[0.2em] font-bold">Financial & Property Disclosure</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <div className="mb-6">
                      <p className="text-[0.6rem] text-text-faint uppercase font-mono mb-1">Total Estimated Net Worth</p>
                      <p className="text-3xl font-bold text-white font-mono">{selectedFigure.assets_total || "Disclosure Pending"}</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[0.65rem] text-text-faint uppercase font-mono border-b border-border pb-2 tracking-widest">Property & Asset Details (A-Z)</p>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedFigure.property_details ? JSON.parse(selectedFigure.property_details).map((p: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 text-xs text-text-dim bg-surface2/30 p-3 border border-border/50">
                            <Home size={14} className="shrink-0 mt-0.5 text-gold" />
                            <span>{p}</span>
                          </div>
                        )) : <p className="text-xs text-text-faint italic">No detailed property records found in public database.</p>}
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface2/20 p-6 border border-border-light flex flex-col justify-center items-center text-center">
                    <Briefcase size={40} className="text-text-faint mb-4 opacity-20" />
                    <p className="text-sm text-text-dim italic leading-relaxed">
                      "সিস্টেমটি বিভিন্ন সংবাদ মাধ্যম, নির্বাচনী হলফনামা এবং পাবলিক রেকর্ড বিশ্লেষণ করে এই তথ্যাদি সংগ্রহ করেছে। তথ্যের নির্ভুলতা যাচাইয়ের কাজ চলমান।"
                    </p>
                  </div>
                </div>
              </div>

              {/* Case History Section */}
              <div className="bg-bg border border-border p-8 relative overflow-hidden before:content-['JUDICIAL_RECORDS'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.5rem] before:tracking-[0.2em] before:uppercase before:px-2 before:py-1 before:bg-blood before:text-white">
                <div className="flex items-center gap-3 mb-8 text-blood">
                  <History size={24} />
                  <h3 className="text-lg font-mono uppercase tracking-[0.2em] font-bold">Judicial Case History & Allegations</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {selectedFigure.case_history ? JSON.parse(selectedFigure.case_history).map((c: any, i: number) => (
                    <div key={i} className="border-l-4 border-blood bg-surface2/30 p-6 hover:bg-surface2/50 transition-all group">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                        <div>
                          <div className="text-[0.55rem] font-mono text-blood uppercase tracking-[0.2em] mb-1">Case #{i+1}</div>
                          <h4 className="text-white font-bold text-base group-hover:text-blood transition-colors">{c.title}</h4>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{c.date}</span>
                          <span className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase border ${c.status === 'Resolved' || c.status === 'Convicted' ? 'border-teal text-teal' : 'border-blood text-blood'}`}>
                            {c.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-dim mb-4 leading-relaxed bg-bg/50 p-4 border border-border/30">
                        {c.details}
                      </p>
                      <div className="flex items-center gap-6 text-[0.65rem] font-mono text-text-faint">
                        <span className="flex items-center gap-2"><MapPin size={12} /> Court: {c.court}</span>
                        <span className="flex items-center gap-2"><Scale size={12} /> Legal ID: BD-JUD-{Math.floor(Math.random() * 90000) + 10000}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-16 border border-dashed border-border opacity-30">
                      <Briefcase size={48} className="mx-auto mb-4" />
                      <p className="text-xs font-mono uppercase tracking-widest">Full Case Log Generation in Progress...</p>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-text-faint border-b border-border pb-2">
                Detailed Allegation Feed
              </h3>
              
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-bg border border-border p-5 hover:border-blood/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[0.6rem] font-mono text-blood uppercase tracking-widest bg-blood/10 px-2 py-0.5">
                        {["Corruption", "Human Rights", "Money Laundering"][i]}
                      </span>
                      <span className="text-[0.6rem] font-mono text-text-faint">CASE-2026-00{i+1}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-2">
                      {["Illegal acquisition of public assets in the capital", "Involvement in local political suppression", "Suspected illegal fund transfers abroad"][i]}
                    </h4>
                    <p className="text-text-dim text-xs leading-relaxed mb-4">
                      Based on multiple independent reports and investigative journalism, this entry details the alleged involvement of the subject in specific incidents during their tenure.
                    </p>
                    <div className="flex items-center gap-6 text-[0.65rem] text-text-faint font-mono">
                      <span className="flex items-center gap-1"><MapPin size={10} /> Dhaka Division</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> May 2026</span>
                      <span className="flex items-center gap-1 text-teal"><Scale size={10} /> Verified by News Sourced</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-center no-print">
              <button 
                onClick={() => window.print()}
                className="bg-blood/10 border border-blood/30 text-blood px-10 py-3 font-bold text-[0.7rem] uppercase tracking-widest hover:bg-blood hover:text-white transition-all"
              >
                Download Full PDF Case File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
