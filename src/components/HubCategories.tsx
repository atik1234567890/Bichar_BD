"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  History, 
  BarChart3, 
  Map, 
  Scale, 
  Users, 
  Search,
  X,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import JulyUprisingExpose from "./JulyUprisingExpose";
import PrimeMinistersSection from "./PrimeMinistersSection";
import AnalyticsCharts from "./AnalyticsCharts";
import CasePressureMeter from "./CasePressureMeter";
import CrisisGrid from "./CrisisGrid";
import MapSection from "./MapSection";
import HistoricalArchive from "./HistoricalArchive";
import DistrictHistorySection from "./DistrictHistorySection";

export default function HubCategories() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "uprising",
      title: t("uprisingArchive"),
      icon: <ShieldAlert className="text-blood" size={24} />,
      description: "July-August 2024 Revolution data.",
      component: <JulyUprisingExpose />
    },
    {
      id: "districts",
      title: t("districtWiseReport"),
      icon: <Search className="text-blood" size={24} />,
      description: "Search all reports by district since 1971.",
      component: <DistrictHistorySection />
    },
    {
      id: "political",
      title: t("politicalArchive"),
      icon: <Users className="text-blood" size={24} />,
      description: "Political figures and PM scorecards.",
      component: <PrimeMinistersSection />
    },
    {
      id: "analytics",
      title: t("crimeAnalytics"),
      icon: <BarChart3 className="text-blood" size={24} />,
      description: "System intelligence and crime trends.",
      component: (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <AnalyticsCharts />
          </div>
          <div>
            <CasePressureMeter />
          </div>
        </div>
      )
    },
    {
      id: "crisis",
      title: t("crisisTracker"),
      icon: <Scale className="text-blood" size={24} />,
      description: "Real-time monitoring of urgent crises.",
      component: <CrisisGrid />
    },
    {
      id: "map",
      title: t("realtimeHeatmap"),
      icon: <Map className="text-blood" size={24} />,
      description: "Interactive nationwide crime heatmap.",
      component: <MapSection />
    },
    {
      id: "historical",
      title: t("historicalMilestones"),
      icon: <History className="text-blood" size={24} />,
      description: "Archive of justice from 1971 to present.",
      component: <HistoricalArchive />
    }
  ];

  return (
    <div className="py-12">
      <div className="chapter-header mb-12 text-center">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3">
          {t("exploreCategories")}
        </div>
        <h2 className="chapter-title text-4xl font-bold text-white">{t("exploreCategories")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -5 }}
            className="bg-surface border border-border p-8 cursor-pointer hover:border-blood transition-all group relative overflow-hidden"
            onClick={() => setActiveCategory(cat.id)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              {React.cloneElement(cat.icon as React.ReactElement, { size: 80 })}
            </div>
            
            <div className="mb-6 w-12 h-12 bg-blood/10 flex items-center justify-center border border-blood/20 group-hover:bg-blood group-hover:text-white transition-all">
              {cat.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blood transition-colors">{cat.title}</h3>
            <p className="text-sm text-text-dim mb-6">{cat.description}</p>
            
            <div className="flex items-center gap-2 text-[0.7rem] font-mono font-bold uppercase tracking-widest text-blood">
              {t("viewAll")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md overflow-y-auto p-6 md:p-12"
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex justify-between items-center mb-12 border-b border-border pb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {categories.find(c => c.id === activeCategory)?.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="w-12 h-12 bg-surface border border-border flex items-center justify-center text-text-faint hover:text-white hover:border-blood transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {categories.find(c => c.id === activeCategory)?.component}
              </motion.div>

              <div className="mt-24 text-center">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className="px-10 py-4 border border-blood text-blood font-mono text-sm font-bold uppercase tracking-widest hover:bg-blood hover:text-white transition-all"
                >
                  {t("back")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
