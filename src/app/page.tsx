"use client";

import LiveTicker from "@/components/LiveTicker";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import MapSection from "@/components/MapSection";
import PrimeMinistersSection from "@/components/PrimeMinistersSection";
import CrisisGrid from "@/components/CrisisGrid";
import HistoricalArchive from "@/components/HistoricalArchive";
import JulyUprisingExpose from "@/components/JulyUprisingExpose";
import IncidentDirectory from "@/components/IncidentDirectory";
import DailyCrimeNews from "@/components/DailyCrimeNews";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import CasePressureMeter from "@/components/CasePressureMeter";
import SystemStatus from "@/components/SystemStatus";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg selection:bg-blood selection:text-white">
      <LiveTicker />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Hero />
        <SystemStatus />
        
        <section id="stats" className="py-12">
          <Stats />
        </section>

        <section id="uprising" className="py-12">
          <JulyUprisingExpose />
        </section>

        <section id="map" className="py-12">
          <MapSection />
        </section>

        <section id="pm-scorecard" className="py-12">
          <PrimeMinistersSection />
        </section>

        <section id="analytics" className="py-24">
          <div className="chapter-header mb-12">
            <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3">
              Data & Intelligence
            </div>
            <h2 className="chapter-title text-4xl font-bold text-white mb-8">System Analytics</h2>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <AnalyticsCharts />
            </div>
            <div>
              <CasePressureMeter />
            </div>
          </div>
        </section>

        <section id="crisis" className="py-12">
          <CrisisGrid />
        </section>

        <section id="archive" className="py-12">
          <HistoricalArchive />
        </section>

        <section id="news" className="py-12">
          <DailyCrimeNews />
        </section>

        <section id="directory" className="py-12">
          <IncidentDirectory />
        </section>
      </div>

      <Footer />
    </main>
  );
}
