"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShieldAlert, MapPin, Calendar, User, X, CheckCircle2, FileText, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { districtsAndUpazillas, allDistricts, verifiedIncidents as fallbackIncidents } from "@/lib/data";
import { safeFetch } from "@/lib/api";

import { useLanguage } from "@/context/LanguageContext";

export default function IncidentDirectory() {
  const { t, formatNumber, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedThana, setSelectedThana] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  const [meta, setMeta] = useState<any>({ total: 0, page: 1, pages: 1, limit: 20 });

  useEffect(() => {
    async function fetchIncidents() {
      setLoading(true);
      try {
        let url = `/api/incidents?page=${meta.page}&limit=${meta.limit}`;
        if (selectedDistrict !== "All") url += `&district=${encodeURIComponent(selectedDistrict)}`;
        if (selectedThana !== "All") url += `&thana=${encodeURIComponent(selectedThana)}`;
        if (selectedType !== "All") url += `&type=${encodeURIComponent(selectedType)}`;
        if (selectedEra !== "All") url += `&era=${encodeURIComponent(selectedEra)}`;
        if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
        
        const result = await safeFetch(url);
        
        if (result.success) {
          setIncidents(result.data);
          setMeta(result.meta);
        }
      } catch (error) {
        // Handled in safeFetch
      } finally {
        setLoading(false);
      }
    }
    
    fetchIncidents();
  }, [selectedDistrict, selectedThana, selectedType, selectedEra, searchTerm, meta.page]);

  const availableThanas = selectedDistrict !== "All" ? districtsAndUpazillas[selectedDistrict] || [] : [];
  const crimeTypes = [
    { id: "rape", label: t("crises.rape.title") },
    { id: "murder", label: t("crises.murder.title") },
    { id: "enforced_disappearance", label: t("crises.enforced_disappearance.title") },
    { id: "election_violence", label: "Election Violence" },
    { id: "minority_attack", label: "Minority Attack" },
    { id: "land_grab", label: t("crises.land_grab.title") },
    { id: "labor_violation", label: t("crises.labor_violation.title") },
    { id: "general_crime", label: "General Crime" },
    { id: "genocide", label: "Genocide" },
    { id: "political_assassination", label: "Political Assassination" }
  ];

  const eras = [
    { id: "1971_War", label: "1971: Independence War" },
    { id: "Post_Independence", label: "1975-1989: Reconstruction" },
    { id: "90s_Restoration", label: "1990s: Democracy" },
    { id: "Modern", label: "Modern Era" }
  ];

  const handlePageChange = (newPage: number) => {
    setMeta({ ...meta, page: newPage });
    window.scrollTo({ top: document.getElementById('incident-directory')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <div id="incident-directory" className="incident-directory mt-24">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['04'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          {t("incidentDirectoryKicker")}
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-4">
          {t("incidentDirectoryTitle")}
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          {selectedDistrict !== "All" 
            ? t("recordsInDistrict").replace("{district}", selectedDistrict).replace("{total}", formatNumber(meta.total))
            : t("recordsNationwide").replace("{total}", formatNumber(meta.total))
          }
        </p>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint group-hover:text-blood transition-colors" size={16} />
          <input 
            type="text" 
            placeholder={t("searchPlaceholderDetailed")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-border p-4 pl-12 text-sm text-white focus:outline-none focus:border-blood/50 transition-all font-mono"
          />
        </div>

        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-surface border border-border p-4 text-sm text-white focus:outline-none focus:border-blood/50 transition-all font-mono"
        >
          <option value="All">{t("allCrimes")}</option>
          {crimeTypes.map(type => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>

        <select 
          value={selectedEra}
          onChange={(e) => setSelectedEra(e.target.value)}
          className="bg-surface border border-border p-4 text-sm text-white focus:outline-none focus:border-blood/50 transition-all font-mono"
        >
          <option value="All">{t("allEras")}</option>
          {eras.map(era => (
            <option key={era.id} value={era.id}>{era.label}</option>
          ))}
        </select>

        <select 
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedThana("All");
          }}
          className="bg-surface border border-border p-4 text-sm text-white focus:outline-none focus:border-blood/50 transition-all font-mono"
        >
          <option value="All">{t("allDistricts")}</option>
          {allDistricts.sort().map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <button 
          onClick={() => {
            setSelectedDistrict("All");
            setSelectedThana("All");
            setSelectedType("All");
            setSelectedEra("All");
            setSearchTerm("");
            setMeta({ ...meta, page: 1 });
          }}
          className="bg-surface border border-border p-4 text-xs font-mono uppercase tracking-widest text-text-faint hover:text-white hover:border-blood transition-all flex items-center justify-center gap-2"
        >
          <X size={14} /> {t("resetFilters")}
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-surface border border-border p-6 animate-pulse">
                  <div className="flex gap-4 mb-4">
                    <div className="w-20 h-4 bg-surface2" />
                    <div className="w-24 h-4 bg-surface2" />
                  </div>
                  <div className="w-full h-6 bg-surface2 mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="w-24 h-3 bg-surface2" />
                    <div className="w-24 h-3 bg-surface2" />
                    <div className="w-24 h-3 bg-surface2" />
                    <div className="w-24 h-3 bg-surface2" />
                  </div>
                </div>
              ))}
            </div>
          ) : incidents.length > 0 ? (
            <>
              {incidents.map((incident) => (
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
                        <span className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-widest border bg-blood/10 border-blood text-blood`}>
                          {incident.incident_type.replace('_', ' ')}
                        </span>
                        <span className="text-text-faint text-[0.7rem] font-mono">{t("caseId")}{incident.incident_id}</span>
                        
                        <div className="flex gap-2">
                          <span className="flex items-center gap-1.5 bg-green/10 border border-green/30 px-2 py-0.5 text-[0.6rem] text-green font-mono uppercase tracking-widest">
                            <CheckCircle2 size={10} /> {incident.source_name || t("verifiedSourceLabel")}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-blood transition-colors">
                        {incident.title}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[0.75rem] font-mono text-text-dim">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blood" />
                          <span>{incident.district}, {incident.thana || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gold" />
                          <span>{language === 'bn' ? formatNumber(new Date(incident.created_at).toLocaleDateString('bn-BD')) : new Date(incident.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-teal" />
                          <span>{incident.status.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FileText size={14} className="text-sky" />
                          <span>Case Document</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center lg:justify-end">
                      <div className="flex flex-col items-center justify-center p-4 bg-surface2 border border-border group-hover:border-blood transition-all">
                        <span className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">{t("caseStatus")}</span>
                        <span className={`text-[0.7rem] font-bold font-mono uppercase tracking-widest ${
                          incident.status === 'verdict' ? 'text-green' : 
                          incident.status === 'under_investigation' ? 'text-sky' : 
                          'text-blood'
                        }`}>
                          {incident.status === 'verdict' ? t("resolvedStatus") : t("pendingStatus")}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Pagination UI */}
              {meta.pages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 py-8 border-t border-border">
                  <button 
                    disabled={meta.page === 1}
                    onClick={() => handlePageChange(meta.page - 1)}
                    className="p-3 border border-border text-text-faint hover:text-white disabled:opacity-30 disabled:hover:text-text-faint transition-all"
                  >
                    <ChevronRight className="rotate-180" size={18} />
                  </button>
                  <div className="flex gap-2">
                    {[...Array(meta.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 font-mono text-xs border transition-all ${
                          meta.page === i + 1 
                            ? 'bg-blood border-blood text-white' 
                            : 'border-border text-text-faint hover:border-blood/50 hover:text-white'
                        }`}
                      >
                        {formatNumber(i + 1)}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={meta.page === meta.pages}
                    onClick={() => handlePageChange(meta.page + 1)}
                    className="p-3 border border-border text-text-faint hover:text-white disabled:opacity-30 disabled:hover:text-text-faint transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-surface border border-border p-20 text-center">
              <ShieldAlert className="mx-auto text-blood/20 mb-6" size={64} />
              <p className="font-mono text-xs text-text-faint uppercase tracking-[0.2em] mb-4">
                {t("noRecordsFound")}
              </p>
              <p className="text-text-dim text-sm max-w-md mx-auto leading-relaxed">
                {t("systemNewsScraping")}
              </p>
              <button className="mt-8 px-8 py-3 bg-blood text-white font-mono text-xs uppercase tracking-widest hover:bg-blood/80 transition-all">
                {t("submitReport")}
              </button>
            </div>
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
