"use client";

import LiveTicker from "@/components/LiveTicker";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HubCategories from "@/components/HubCategories";
import DailyCrimeNews from "@/components/DailyCrimeNews";
import SystemStatus from "@/components/SystemStatus";
import CyberThreatDashboard from "@/components/CyberThreatDashboard";
import FakeNewsAndPhishingChecker from "@/components/FakeNewsAndPhishingChecker";
import CrisisGrid from "@/components/CrisisGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg selection:bg-blood selection:text-white">
      <LiveTicker />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Hero />
        <SystemStatus />
      </div>

      {/* Cyber Security Module - NEW */}
      <section id="cyber-dashboard" className="w-full">
        <CyberThreatDashboard />
      </section>

      {/* AI Verification Tools */}
      <section id="ai-checker" className="w-full">
        <FakeNewsAndPhishingChecker />
      </section>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <section id="stats" className="py-12 border-b border-border">
          <Stats />
        </section>

        <section id="cyber-crisis" className="py-12 border-b border-border">
          <CrisisGrid />
        </section>

        <section id="explore" className="py-12">
          <HubCategories />
        </section>

        <section id="news" className="py-12 border-t border-border">
          <DailyCrimeNews />
        </section>
      </div>

      <Footer />
    </main>
  );
}
