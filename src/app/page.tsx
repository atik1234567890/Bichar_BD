"use client";

import DeveloperCredit from "@/components/DeveloperCredit";
import LiveTicker from "@/components/LiveTicker";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CrisisGrid from "@/components/CrisisGrid";
import MapSection from "@/components/MapSection";
import IncidentDirectory from "@/components/IncidentDirectory";
import HistoricalArchive from "@/components/HistoricalArchive"; // Historical justice records module
import JulyUprisingExpose from "@/components/JulyUprisingExpose"; // July 2024 Special Module
import PublicFigureSearch from "@/components/PublicFigureSearch";
import LandVerification from "@/components/LandVerification";
import SystemStatus from "@/components/SystemStatus";
import DailyCrimeNews from "@/components/DailyCrimeNews";
import HighProfileCases from "@/components/HighProfileCases";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, formatNumber } = useLanguage();

  return (
    <main className="min-h-screen bg-bg selection:bg-blood selection:text-white">
      <DeveloperCredit />
      <LiveTicker />
      <Hero />

      <section className="chapter max-w-[1200px] mx-auto p-12 md:p-24 border-b border-border">
        <div className="chapter-header mb-20 relative before:content-['CONTEXT'] before:absolute before:-top-6 before:left-0 before:font-mono before:text-[0.6rem] before:text-blood/50 before:tracking-[0.5em]">
          <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5 before:content-['01'] before:text-[0.55rem] before:text-blood before:border before:border-blood/40 before:px-2 before:py-1">
            {t("chapter01Kicker")}
          </div>
          <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight">
            {t("chapter01Title")}
          </h2>
          <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[800px] leading-relaxed">
            {t("chapter01Sub")}
          </p>
        </div>

        <Stats />

        {/* July 2024 Special Expose - Prominent Positioning */}
        <JulyUprisingExpose />

        <CrisisGrid />
        <DailyCrimeNews />
        <MapSection />
        <IncidentDirectory />

        {/* Historical Justice Archive (1971-Present) */}
        <div className="mt-40">
          <HistoricalArchive />
        </div>

        {/* Search Module instead of hardcoded trackers */}
        <div className="mt-40">
          <PublicFigureSearch />
        </div>

        {/* High Profile Cases Section */}
        <div className="mt-40">
          <HighProfileCases />
        </div>

        {/* Special Module - Land Verification */}
        <div className="mt-40">
          <LandVerification />
        </div>

        <div className="mt-40">
          <SystemStatus />
        </div>

        {/* Pipeline / Reporting Flow */}
        <div className="chapter-header mb-20 mt-40 relative before:content-['PIPELINE'] before:absolute before:-top-6 before:left-0 before:font-mono before:text-[0.6rem] before:text-blood/50 before:tracking-[0.5em]">
          <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5 before:content-['02'] before:text-[0.55rem] before:text-blood before:border before:border-blood/40 before:px-2 before:py-1">
            {t("pipelineKicker")}
          </div>
          <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight">
            {t("pipelineTitle")}
          </h2>
          <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[800px] leading-relaxed">
            {t("pipelineSub")}
          </p>
        </div>

        <div className="pipeline flex flex-col border border-border">
          {[
            {
              step: "01",
              title: t("step01Title"),
              desc: t("step01Desc"),
              tag: "ENCRYPTED",
            },
            {
              step: "02",
              title: t("step02Title"),
              desc: t("step02Desc"),
              tag: "PROCESSING",
            },
            {
              step: "03",
              title: t("step03Title"),
              desc: t("step03Desc"),
              tag: "EXTERNAL",
            },
            {
              step: "04",
              title: t("step04Title"),
              desc: t("step04Desc"),
              tag: "LIVE",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="pipe-step flex items-start gap-6 p-5 border-b border-border bg-surface hover:bg-surface2 transition-colors last:border-b-0"
            >
              <div className="pipe-num font-mono text-[0.6rem] text-text-faint w-8 shrink-0 pt-1">
                {formatNumber(item.step)}
              </div>
              <div className="pipe-content flex-1">
                <div className="pipe-title text-[1rem] font-bold text-white mb-1">
                  {item.title}
                </div>
                <p className="pipe-desc text-[0.82rem] text-text-dim leading-[1.7]">
                  {item.desc}
                </p>
              </div>
              <div className="pipe-tag shrink-0 font-mono text-[0.58rem] tracking-[0.1em] px-2 py-1 border border-border-light text-text-dim self-center">
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="big-quote p-16 md:p-20 text-center border-y border-border bg-surface">
        <p className="font-bangla text-[clamp(1.4rem,3.5vw,2.2rem)] text-white max-w-[750px] mx-auto leading-[1.8] font-light">
          {t("quote")}
        </p>
      </div>

      <Footer />
    </main>
  );
}
