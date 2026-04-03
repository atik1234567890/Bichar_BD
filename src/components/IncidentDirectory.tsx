"use client";

import { useState } from "react";
import { Search, Filter, ShieldAlert, MapPin, Calendar, User, X, CheckCircle2, FileText, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { verifiedIncidents, districtsAndUpazillas } from "@/lib/data";

export default function IncidentDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedThana, setSelectedThana] = useState("All");
  const [selectedIncident, setSelectedIncident] = useState<typeof verifiedIncidents[0] | null>(null);

  const availableThanas = selectedDistrict !== "All" ? districtsAndUpazillas[selectedDistrict] : [];

  const filteredIncidents = verifiedIncidents.filter(incident => {
    const matchesSearch = 
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      incident.accused.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.thana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === "All" || incident.district === selectedDistrict;
    const matchesThana = selectedThana === "All" || incident.thana === selectedThana;
    return matchesSearch && matchesDistrict && matchesThana;
  });

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
          দেশের প্রতিটি প্রান্তের অপরাধ এবং অপরাধীদের বিস্তারিত তথ্য — ২০২৬ সালের রিয়েল-টাইম আপডেট
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
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedThana("All");
            }}
          >
            <option value="All">সকল জেলা</option>
            {Object.keys(districtsAndUpazillas).map(d => (
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
          {filteredIncidents.map((incident) => (
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
                      {incident.verifiedBy.map((source, i) => (
                        <span key={i} className="flex items-center gap-1.5 bg-green/10 border border-green/30 px-2 py-0.5 text-[0.6rem] text-green font-mono uppercase tracking-widest">
                          <CheckCircle2 size={10} /> {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-blood transition-colors">
                    {incident.description}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[0.75rem] font-mono text-text-dim">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-blood" />
                      <span>{incident.district}, {incident.thana}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-blood" />
                      <span>{incident.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-blood" />
                      <span className="truncate">অভিযুক্ত: {incident.accused}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={14} className="text-blood" />
                      <span>অবস্থা: {incident.status}</span>
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
          ))}
        </AnimatePresence>

        {filteredIncidents.length === 0 && (
          <div className="py-20 text-center bg-surface border border-border border-dashed">
            <p className="text-text-dim font-mono italic">দুঃখিত, আপনার সার্চের সাথে মিল রয়েছে এমন কোনো মামলা পাওয়া যায়নি।</p>
          </div>
        )}
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
                <h2 className="text-2xl font-bold text-white mb-4">{selectedIncident.description}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono">ঘটনার বিস্তারিত (Incident Info)</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-text">
                      <MapPin size={16} className="text-blood" />
                      <span>{selectedIncident.district}, {selectedIncident.thana}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <Calendar size={16} className="text-blood" />
                      <span>{selectedIncident.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <User size={16} className="text-blood" />
                      <span>অভিযুক্ত: {selectedIncident.accused}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <ShieldAlert size={16} className="text-blood" />
                      <span>অবস্থা: {selectedIncident.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text">
                      <Clock size={16} className="text-blood" />
                      <span>ঝুলে আছে: {selectedIncident.daysPending} দিন</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono">প্রমাণ ও ভেরিফিকেশন (Verification)</div>
                  <div className="space-y-4">
                    <div className="text-sm text-text italic">"{selectedIncident.evidence}"</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedIncident.verifiedBy.map((v, i) => (
                        <span key={i} className="flex items-center gap-2 bg-green/10 border border-green/30 px-3 py-1.5 text-[0.7rem] text-green font-mono uppercase tracking-widest">
                          <CheckCircle2 size={12} /> {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bg border border-border p-6 text-center">
                <button className="bg-blood text-white px-8 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] hover:bg-blood/90 transition-all">
                  আন্তর্জাতিক আদালতে রিপোর্ট করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
