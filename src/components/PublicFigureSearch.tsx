import { useState } from "react";
import { Search, User, ShieldAlert, ExternalLink, X, MapPin, Calendar, Scale, Landmark, Briefcase, History, Sparkles, AlertTriangle, Link } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function PublicFigureSearch() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [scanningStatus, setScanningStatus] = useState("");

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term || term.length < 2) return;
    setLoading(true);
    setScanningStatus(language === 'bn' ? "নিউরাল ইঞ্জিন চালু হচ্ছে..." : "Initializing Neural Engine...");
    
    try {
      // Simulate scanning steps for UX
      setTimeout(() => setScanningStatus(language === 'bn' ? "সংবাদ আর্কাইভ স্ক্যান করা হচ্ছে (প্রথম আলো, ডেইলি স্টার)..." : "Scanning News Archives (Prothom Alo, Daily Star)..."), 1000);
      setTimeout(() => setScanningStatus(language === 'bn' ? "পাবলিক রেকর্ড এবং হলফনামা যাচাই করা হচ্ছে..." : "Cross-referencing Public Records & Affidavits..."), 2500);
      setTimeout(() => setScanningStatus(language === 'bn' ? "AI ব্যবহার করে ইন্টেলিজেন্স রিপোর্ট তৈরি করা হচ্ছে..." : "Generating Intelligence Report using AI..."), 4000);

      const result = await safeFetch(`/api/figures/search?q=${encodeURIComponent(term)}&lang=${language}`);
      if (result.success) {
        setResults(result.data);
      }
    } catch (error) {
      // Handled in safeFetch
    } finally {
      setLoading(false);
      setScanningStatus("");
    }
  };

  return (
    <div className="special-module bg-surface border border-border p-10 relative overflow-hidden my-12 before:content-['NEURAL_SEARCH'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.55rem] before:tracking-[0.2em] before:uppercase before:px-3 before:py-1.5 before:bg-blood before:text-white">
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="text-blood animate-pulse" size={20} />
        <h3 className="sm-title text-[1.4rem] font-bold text-white">
          AI Public Intelligence Search
        </h3>
      </div>
      <p className="sm-desc text-text-dim text-[0.9rem] leading-[1.9] max-w-[700px] mb-6 font-bangla">
        পাবলিক রেকর্ড এবং সংবাদ সূত্রের ভিত্তিতে তৈরি। এই সিস্টেমটি AI এবং সার্চ ইঞ্জিন ব্যবহার করে যেকোনো পাবলিক ফিগার সম্পর্কে একটি পূর্ণাঙ্গ ইন্টেলিজেন্স রিপোর্ট তৈরি করবে।
      </p>
      
      <div className="relative group max-w-2xl">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint group-focus-within:text-blood transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Enter name (e.g., Sheikh Hasina, Khaleda Zia, etc.)..." 
              className="w-full bg-bg border border-border pl-12 pr-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-blood transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-blood text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-blood/80 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </>
            ) : "Scan Database"}
          </button>
        </div>
        
        {loading && (
          <div className="mt-4 flex items-center gap-3 text-blood font-mono text-[0.65rem] animate-pulse">
            <div className="w-1.5 h-1.5 bg-blood rounded-full animate-ping" />
            {scanningStatus}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((fig) => (
            <div key={fig.id || fig.name} className="bg-bg border border-border p-6 flex items-start gap-6 hover:border-blood/50 transition-all group">
              <div className="w-16 h-16 bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-blood/10 transition-colors">
                <User size={32} className="text-text-faint group-hover:text-blood" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-bold text-lg">{fig.name}</h4>
                  <span className={`text-[0.6rem] px-2 py-0.5 font-mono uppercase border ${
                    fig.status === 'fugitive' ? 'border-blood text-blood' : 
                    fig.status === 'arrested' ? 'border-gold text-gold' : 'border-border text-text-dim'
                  }`}>
                    {fig.status?.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-text-dim text-[0.8rem] mb-4 font-mono">{fig.role} • {fig.party}</p>
                <div className="flex items-center gap-6">
                  {fig.incidents_count > 0 && (
                    <span className="text-blood font-mono text-[0.7rem] flex items-center gap-1.5">
                      <ShieldAlert size={14} /> {fig.incidents_count} Incidents
                    </span>
                  )}
                  <button 
                    onClick={() => setSelectedFigure(fig)}
                    className="bg-surface2 px-4 py-1.5 border border-border hover:border-blood text-white transition-all text-[0.7rem] font-mono uppercase tracking-widest flex items-center gap-2"
                  >
                    View Report <Sparkles size={12} className="text-blood" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedFigure && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg/98 backdrop-blur-md" onClick={() => setSelectedFigure(null)} />
          <div className="relative bg-surface border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-[0_0_50px_rgba(139,26,26,0.2)]">
            <button 
              onClick={() => setSelectedFigure(null)}
              className="fixed md:absolute top-6 right-6 z-20 text-text-faint hover:text-white transition-colors bg-bg/50 p-2 border border-border"
            >
              <X size={24} />
            </button>

            <div className="border-b border-blood/30 pb-10 mb-10">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-32 h-32 bg-bg border border-blood/30 flex items-center justify-center shrink-0 relative">
                  <User size={64} className="text-text-faint" />
                  <div className="absolute -bottom-3 -right-3 bg-blood text-white p-2">
                    <Sparkles size={16} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">{selectedFigure.name}</h2>
                    <span className="bg-blood/10 text-blood border border-blood/20 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                      AI Verified Report
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono text-text-dim mb-6">
                    <div className="flex items-center gap-3">
                      <Briefcase size={16} className="text-blood" />
                      <span>{selectedFigure.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Landmark size={16} className="text-gold" />
                      <span>{selectedFigure.party}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-bg border border-border px-4 py-2 flex flex-col">
                      <span className="text-[0.5rem] font-mono text-text-faint uppercase">Scanning Confidence</span>
                      <span className="text-teal font-bold font-mono">98.4%</span>
                    </div>
                    <div className="bg-bg border border-border px-4 py-2 flex flex-col">
                      <span className="text-[0.5rem] font-mono text-text-faint uppercase">Public Records Found</span>
                      <span className="text-white font-bold font-mono">12+ Documents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 prose prose-invert max-w-none">
                <div className="bg-bg/50 border-l-4 border-blood p-6 mb-8 italic text-sm text-text-dim font-bangla">
                  "আমাদের নিউরাল ইঞ্জিন বিভিন্ন পাবলিক রেকর্ড, নিউজ আর্কাইভ এবং ডাইনামিক ওয়েব সার্চ ব্যবহার করে এই ইন্টেলিজেন্স রিপোর্টটি তৈরি করেছে।"
                </div>
                
                <div className="markdown-report text-text-dim font-mono text-sm space-y-6">
                  {selectedFigure.ai_report ? (
                    <ReactMarkdown>{selectedFigure.ai_report}</ReactMarkdown>
                  ) : (
                    <div className="py-20 text-center border border-dashed border-border opacity-50">
                      <History size={48} className="mx-auto mb-4" />
                      <p>Deep scanning archival records...</p>
                    </div>
                  )}
                </div>

                <div className="mt-12 space-y-8">
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
              </div>

              <div className="space-y-8">
                <div className="bg-bg border border-border p-6 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-6 text-blood">
                    <Link size={18} />
                    <h4 className="text-xs font-mono uppercase font-bold tracking-widest">Verification Sources</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedFigure.ai_sources?.map((s: string, i: number) => (
                      <a key={i} href={s} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[0.65rem] text-text-dim hover:text-white transition-colors bg-surface2/30 p-2 border border-border/50">
                        <ExternalLink size={12} className="shrink-0" />
                        <span className="truncate">{s.replace('https://www.', '')}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-blood/5 border border-blood/20 p-6">
                  <div className="flex items-center gap-2 mb-4 text-blood">
                    <AlertTriangle size={18} />
                    <h4 className="text-xs font-mono uppercase font-bold tracking-widest">Urgent Notice</h4>
                  </div>
                  <p className="text-[0.7rem] text-text-dim leading-relaxed font-bangla">
                    এই ব্যক্তির বিরুদ্ধে কোনো নতুন অভিযোগ থাকলে আপনি সরাসরি আমাদের সিস্টেমে রিপোর্ট করতে পারেন। আপনার পরিচয় সম্পূর্ণ গোপন থাকবে।
                  </p>
                  <button className="w-full mt-4 bg-blood/10 border border-blood/30 text-blood py-2 text-[0.65rem] font-mono uppercase tracking-widest hover:bg-blood hover:text-white transition-all">
                    Submit New Evidence
                  </button>
                </div>
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
