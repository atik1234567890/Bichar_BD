"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShieldAlert, MapPin, Calendar, User, X, CheckCircle2, FileText, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { districtsAndUpazillas, allDistricts, verifiedIncidents as fallbackIncidents } from "@/lib/data";

export default function IncidentDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedThana, setSelectedThana] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  const [meta, setMeta] = useState<any>({ total: 0 });

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    async function fetchIncidents() {
      setLoading(true);
      try {
        const url = new URL(`${API_URL}/api/incidents`);
        url.searchParams.append("limit", "50");
        if (selectedDistrict !== "All") url.searchParams.append("district", selectedDistrict);
        if (selectedThana !== "All") url.searchParams.append("thana", selectedThana);
        if (selectedType !== "All") url.searchParams.append("type", selectedType);
        if (selectedEra !== "All") url.searchParams.append("era", selectedEra);
        if (searchTerm) url.searchParams.append("search", searchTerm);
        
        const response = await fetch(url.toString());
        const result = await response.json();
        
        if (result.success) {
          setIncidents(result.data);
          setMeta(result.meta);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchIncidents();
  }, [selectedDistrict, selectedThana, selectedType, selectedEra, searchTerm]);

  const availableThanas = selectedDistrict !== "All" ? districtsAndUpazillas[selectedDistrict] || [] : [];
  const filteredIncidents = incidents;
  const crimeTypes = [
    { id: "rape", label: "ধর্ষণ ও নিপীড়ন" },
    { id: "murder", label: "হত্যাকাণ্ড" },
    { id: "enforced_disappearance", label: "গুম ও নিখোঁজ" },
    { id: "election_violence", label: "নির্বাচনী সহিংসতা" },
    { id: "minority_attack", label: "সংখ্যালঘূ হামলা" },
    { id: "land_grab", label: "জমি দখল" },
    { id: "labor_violation", label: "শ্রমিক অধিকার" },
    { id: "general_crime", label: "সাধারণ অপরাধ" },
    { id: "genocide", label: "গণহত্যা" },
    { id: "political_assassination", label: "রাজনৈতিক হত্যাকাণ্ড" }
  ];

  const eras = [
    { id: "1971_War", label: "১৯৭১: স্বাধীনতা যুদ্ধ" },
    { id: "Post_Independence", label: "৭৫-৮৯: পুনর্গঠন" },
    { id: "90s_Restoration", label: "৯০-এর দশক: গণতন্ত্র" },
    { id: "Modern", label: "বর্তমান: আধুনিক" }
  ];

  return (
    <div className="incident-directory mt-24">
      <div className="chapter-header mb-10">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['04'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          ইন্সিডেন্ট ডিরেক্টরি
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
          পাবলিক ফিড ও মামলা ট্র্যাকার
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          {selectedDistrict !== "All" ? `${selectedDistrict} জেলায় বর্তমানে ${meta.total}টি মামলা নথিভুক্ত আছে` : `সারাদেশে বর্তমানে ${meta.total}টি মামলার বিস্তারিত রেকর্ড আমাদের সিস্টেমে আছে`}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" size={18} />
          <input 
            type="text"
            placeholder="থানা, অপরাধী বা ঘটনার বর্ণনা দিয়ে খুঁজুন..."
            className="w-full bg-surface border border-border pl-12 pr-4 py-4 text-sm text-text focus:border-blood outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select 
            className="bg-surface border border-border px-6 py-4 text-sm text-text outline-none focus:border-blood"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">সকল অপরাধ</option>
            {crimeTypes.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <select 
            className="bg-surface border border-border px-6 py-4 text-sm text-text outline-none focus:border-blood"
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
          >
            <option value="All">সকল সময়কাল</option>
            {eras.map(e => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>

          <select 
            className="bg-surface border border-border px-6 py-4 text-sm text-text outline-none focus:border-blood"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedThana("All");
            }}
          >
            <option value="All">সকল জেলা</option>
            {allDistricts.sort().map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          
          <select 
            className="bg-surface border border-border px-6 py-4 text-sm text-text outline-none focus:border-blood disabled:opacity-30 disabled:cursor-not-allowed"
            value={selectedThana}
            disabled={selectedDistrict === "All"}
            onChange={(e) => setSelectedThana(e.target.value)}
          >
            <option value="All">সকল থানা</option>
            {availableThanas.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button className="bg-surface border border-border px-6 py-4 text-text-faint hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident) => (
              <motion.div 
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="group bg-surface border border-border p-6 hover:border-blood/50 transition-all cursor-pointer"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-widest border ${
                        incident.severity === 'critical' ? 'bg-blood/10 border-blood text-blood' :
                        incident.severity === 'high' ? 'bg-gold/10 border-gold text-gold' :
                        'bg-teal/10 border-teal text-teal'
                      }`}>
                        {incident.type}
                      </span>
                      <span className="text-text-faint text-[0.7rem] font-mono">ID: #BD-2026-{incident.id.toString().padStart(4, '0')}</span>
                      
                      <div className="flex gap-2">
                        {incident.verifiedBy ? (
                          (incident.verifiedBy as string[]).map((source: string, i: number) => (
                            <span key={i} className="flex items-center gap-1.5 bg-green/10 border border-green/30 px-2 py-0.5 text-[0.6rem] text-green font-mono uppercase tracking-widest">
                              <CheckCircle2 size={10} /> {source}
                            </span>
                          ))
                        ) : incident.source_name ? (
                          <span className="flex items-center gap-1.5 bg-green/10 border border-green/30 px-2 py-0.5 text-[0.6rem] text-green font-mono uppercase tracking-widest">
                            <CheckCircle2 size={10} /> {incident.source_name}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white group-hover:text-blood transition-colors">
                      {incident.title || incident.description}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[0.75rem] font-mono text-text-dim">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blood" />
                        <span>{incident.district}, {incident.thana || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blood" />
                        <span>{incident.created_at ? new Date(incident.created_at).toLocaleDateString() : (incident.date || "N/A")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-blood" />
                        <span className="truncate">অভিযুক্ত: {incident.accused || "অজ্ঞাত"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={14} className="text-blood" />
                        <span className={incident.status === 'verdict' ? 'text-green font-bold' : 'text-blood font-bold'}>
                          {incident.status === 'verdict' ? 'নিষ্পত্তি হয়েছে' : 'তদন্তাধীন'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-8">
                    <button className="px-6 py-3 bg-bg border border-border text-[0.7rem] font-mono uppercase tracking-widest text-text-dim hover:text-white hover:border-blood transition-all flex items-center gap-2">
                      <FileText size={14} /> বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border border-dashed border-border bg-surface/30"
            >
              <div className="text-blood mb-4 flex justify-center">
                <ShieldAlert size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">এই ফিল্টারে কোনো রেকর্ড পাওয়া যায়নি</h3>
              <p className="text-text-dim text-sm max-w-[500px] mx-auto leading-relaxed">
                আমাদের সিস্টেম ২৪ ঘণ্টা নিউজ স্ক্র্যাপ করে এবং তথ্য সংগ্রহ করে। আপনি যদি এই অঞ্চলে বা বিভাগে কোনো অপরাধের কথা জানেন, তবে নিচে রিপোর্ট করুন।
              </p>
              <button 
                onClick={() => {
                  setSelectedType("All");
                  setSelectedDistrict("All");
                  setSelectedThana("All");
                  setSelectedEra("All");
                  setSearchTerm("");
                }}
                className="mt-6 px-6 py-2 border border-blood text-blood hover:bg-blood hover:text-white transition-all text-xs font-mono uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Incident Detail Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIncident(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface border border-border w-full max-w-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedIncident(null)}
                className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-widest border ${
                    selectedIncident.severity === 'critical' ? 'bg-blood/10 border-blood text-blood' :
                    selectedIncident.severity === 'high' ? 'bg-gold/10 border-gold text-gold' :
                    'bg-teal/10 border-teal text-teal'
                  }`}>
                    {selectedIncident.type}
                  </span>
                  <span className="text-text-faint text-[0.7rem] font-mono">ID: #BD-2026-{selectedIncident.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedIncident.title || selectedIncident.description}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono">ঘটনার বিস্তারিত (Incident Info)</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-text">
                      <MapPin size={16} className="text-blood" />
                      <span>{selectedIncident.district}, {selectedIncident.thana || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <Calendar size={16} className="text-blood" />
                      <span>{selectedIncident.created_at ? new Date(selectedIncident.created_at).toLocaleDateString() : (selectedIncident.date || "N/A")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <User size={16} className="text-blood" />
                      <span>অভিযুক্ত: {selectedIncident.accused || "অজ্ঞাত"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <ShieldAlert size={16} className="text-blood" />
                      <span className={selectedIncident.status === 'verdict' ? 'text-green font-bold' : 'text-blood font-bold'}>
                        অবস্থা: {selectedIncident.status === 'verdict' ? 'নিষ্পত্তি হয়েছে' : 'তদন্তাধীন/ঝুলে আছে'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <Clock size={16} className="text-blood" />
                      <span>সময়কাল: {selectedIncident.days_pending || 0} দিন</span>
                    </div>
                    {selectedIncident.source_url && (
                      <div className="flex items-center gap-3 text-sm text-text">
                        <ExternalLink size={16} className="text-blood" />
                        <a 
                          href={selectedIncident.source_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blood hover:underline flex items-center gap-1"
                        >
                          সংবাদ সূত্র দেখুন (Verified) <FileText size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono">প্রমাণ ও ভেরিফিকেশন (Verification)</div>
                  <div className="space-y-4">
                    <div className="text-sm text-text italic">"{selectedIncident.description || selectedIncident.evidence || "কোনো বর্ণনা নেই"}"</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedIncident.verifiedBy ? (
                        (selectedIncident.verifiedBy as string[]).map((v: string, i: number) => (
                          <span key={i} className="flex items-center gap-2 bg-green/10 border border-green/30 px-3 py-1.5 text-[0.7rem] text-green font-mono uppercase tracking-widest">
                            <CheckCircle2 size={12} /> {v}
                          </span>
                        ))
                      ) : selectedIncident.source_name ? (
                        <span className="flex items-center gap-2 bg-green/10 border border-green/30 px-3 py-1.5 text-[0.7rem] text-green font-mono uppercase tracking-widest">
                          <CheckCircle2 size={12} /> {selectedIncident.source_name}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bg border border-border p-6 flex flex-col md:flex-row gap-4 justify-center items-center no-print">
                <button 
                  onClick={() => alert('আপনার এই রিপোর্টটি আন্তর্জাতিক মানবাধিকার সংস্থা (UN/HRW) এবং আন্তর্জাতিক অপরাধ আদালতে (ICC) পাঠানোর জন্য প্রস্তুত করা হচ্ছে।')}
                  className="bg-blood text-white px-8 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] hover:bg-blood/90 transition-all flex items-center gap-2"
                >
                  <ShieldAlert size={14} /> আন্তর্জাতিক আদালতে রিপোর্ট করুন
                </button>
                <button 
                  onClick={() => window.print()}
                  className="bg-bg border border-border text-text-dim px-8 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] hover:border-blood hover:text-blood transition-all flex items-center gap-2"
                >
                  <FileText size={14} /> ডাউনলোড (PDF Report)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
