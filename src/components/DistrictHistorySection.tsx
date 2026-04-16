"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ShieldCheck, FileText, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { allDistricts, verifiedIncidents } from "@/lib/data";

export default function DistrictHistorySection() {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedDistrict) {
      // In a real app, this would be an API call
      // For now, we filter our mock data
      const filtered = verifiedIncidents.filter(i => 
        i.district.toLowerCase() === selectedDistrict.toLowerCase()
      );
      setDistrictData(filtered);
    } else {
      setDistrictData([]);
    }
  }, [selectedDistrict]);

  const filteredDistricts = allDistricts.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface border border-border p-8">
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{t("districtWiseReport")}</h3>
        <p className="text-text-dim text-sm">{t("reportsSince1971")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* District Selector */}
        <div className="lg:col-span-1 border-r border-border pr-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" size={16} />
            <input 
              type="text"
              placeholder={t("selectDistrict")}
              className="w-full bg-bg border border-border py-3 pl-10 pr-4 text-sm text-white focus:border-blood outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {filteredDistricts.map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-4 py-3 text-sm font-mono transition-all flex items-center justify-between group ${
                  selectedDistrict === district 
                  ? 'bg-blood text-white' 
                  : 'bg-surface2 text-text-dim hover:bg-blood/10 hover:text-blood'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={14} />
                  {district}
                </div>
                <ChevronRight size={14} className={`transition-transform ${selectedDistrict === district ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Reports Timeline */}
        <div className="lg:col-span-2">
          {selectedDistrict ? (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blood/10 flex items-center justify-center text-blood border border-blood/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedDistrict}</h4>
                    <p className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest">
                      {districtData.length} {t("reportsFound") || "Reports Found"}
                    </p>
                  </div>
                </div>
              </div>

              {districtData.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-[2px] before:bg-border">
                  {districtData.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-0 top-0 w-10 h-10 bg-bg border-2 border-blood rounded-full flex items-center justify-center z-10">
                        <Calendar size={16} className="text-blood" />
                      </div>
                      
                      <div className="bg-surface2 border border-border p-6 hover:border-blood/30 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <span className="text-[0.65rem] font-mono bg-blood/10 text-blood px-2 py-1 border border-blood/20 uppercase tracking-tighter">
                            {item.date}
                          </span>
                          <span className="flex items-center gap-2 text-[0.65rem] font-mono text-green-500 bg-green-500/10 px-2 py-1 border border-green-500/20 uppercase">
                            <ShieldCheck size={12} />
                            {item.status}
                          </span>
                        </div>
                        
                        <h5 className="text-lg font-bold text-white mb-3">{item.title}</h5>
                        <p className="text-sm text-text-dim leading-relaxed mb-6">
                          {item.description}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                          <div className="flex items-center gap-3 text-[0.7rem] text-text-faint">
                            <FileText size={14} className="text-blood" />
                            <span className="font-mono">{item.evidence}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[0.7rem] text-text-faint sm:justify-end">
                            <span className="font-mono uppercase tracking-tighter">Source: {item.source}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Infinity Message */}
                  <div className="text-center py-12 border-t border-dashed border-border mt-12">
                    <p className="text-[0.6rem] font-mono text-text-faint uppercase tracking-[0.3em]">
                      Monitoring continuously since 1971
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="w-1 h-1 bg-blood rounded-full animate-ping" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-24 bg-surface2 border border-dashed border-border">
                  <div className="w-16 h-16 bg-border/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-text-faint" />
                  </div>
                  <p className="text-text-dim italic">{t("noDataForDistrict")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-24 opacity-50">
              <MapPin size={64} className="text-border mb-6" />
              <h4 className="text-xl font-bold text-text-faint mb-2">{t("selectDistrict")}</h4>
              <p className="text-sm text-text-faint max-w-md">
                {t("clickMapDetail")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
