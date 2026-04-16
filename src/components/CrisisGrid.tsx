"use client";

import { useState, useEffect } from "react";
import CrisisCard from "./CrisisCard";
import ReportForm from "./ReportForm";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";
import { safeFetch } from "@/lib/api";

export default function CrisisGrid() {
  const { language, t } = useLanguage();
  const [activeCrisis, setActiveCrisis] = useState<string | null>(null);
  const [trackerStats, setTrackerStats] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchTrackerStats() {
      const types = [
        { id: "rape", endpoint: "rape-violence" },
        { id: "murder", endpoint: "political-killings" },
        { id: "enforced_disappearance", endpoint: "enforced-disappearance" },
        { id: "land_grab", endpoint: "land-grabbing" },
        { id: "labor_violation", endpoint: "labor-rights" }
      ];

      const stats: Record<string, any> = {};
      await Promise.all(types.map(async (type) => {
        try {
          const result = await safeFetch(`/api/report/tracker/${type.endpoint}`);
          if (result.success) {
            stats[type.id] = result.data;
          }
        } catch (error) {
          console.error(`Failed to fetch stats for ${type.id}`);
        }
      }));
      setTrackerStats(stats);
    }

    fetchTrackerStats();
  }, []);

  const crisisData = translations[language].crises;

  const crises = [
    {
      id: "rape",
      barColor: "bg-blood",
      severity: "text-blood",
      severityLabel: crisisData.rape.severityLabel,
      emoji: "🩸",
      title: crisisData.rape.title,
      context: crisisData.rape.context,
      contextColor: "bg-blood-soft border-blood text-blood",
      solution: crisisData.rape.solution,
      features: crisisData.rape.features,
      stats: trackerStats.rape,
    },
    {
      id: "murder",
      barColor: "bg-blood",
      severity: "text-blood",
      severityLabel: crisisData.murder.severityLabel,
      emoji: "💀",
      title: crisisData.murder.title,
      context: crisisData.murder.context,
      contextColor: "bg-blood-soft border-blood text-blood",
      solution: crisisData.murder.solution,
      features: crisisData.murder.features,
      stats: trackerStats.murder,
    },
    {
      id: "enforced_disappearance",
      barColor: "bg-blood",
      severity: "text-blood",
      severityLabel: crisisData.enforced_disappearance.severityLabel,
      emoji: "👻",
      title: crisisData.enforced_disappearance.title,
      context: crisisData.enforced_disappearance.context,
      contextColor: "bg-blood-soft border-blood text-blood",
      solution: crisisData.enforced_disappearance.solution,
      features: crisisData.enforced_disappearance.features,
      stats: trackerStats.enforced_disappearance,
    },
    {
      id: "land_grab",
      barColor: "bg-orange",
      severity: "text-orange",
      severityLabel: crisisData.land_grab.severityLabel,
      emoji: "🏡",
      title: crisisData.land_grab.title,
      context: crisisData.land_grab.context,
      contextColor: "bg-orange-soft border-orange text-orange",
      solution: crisisData.land_grab.solution,
      features: crisisData.land_grab.features,
      stats: trackerStats.land_grab,
    },
    {
      id: "labor_violation",
      barColor: "bg-sky",
      severity: "text-sky",
      severityLabel: crisisData.labor_violation.severityLabel,
      emoji: "🧵",
      title: crisisData.labor_violation.title,
      context: crisisData.labor_violation.context,
      contextColor: "bg-sky-soft border-sky text-sky",
      solution: crisisData.labor_violation.solution,
      features: crisisData.labor_violation.features,
      stats: trackerStats.labor_violation,
    },
  ];

  return (
    <div className="mt-20">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5">
          {t("crisisKicker")}
        </div>
        <h2 className="chapter-title text-4xl md:text-5xl font-bold text-white mb-6">
          {t("crisisTitle")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crises.map((crisis) => (
          <CrisisCard
            key={crisis.id}
            {...crisis}
            onReport={() => setActiveCrisis(crisis.id)}
            stats={trackerStats[crisis.id]}
          />
        ))}
      </div>

      {activeCrisis && (
        <ReportForm
          crisisId={activeCrisis}
          onClose={() => setActiveCrisis(null)}
        />
      )}
    </div>
  );
}
