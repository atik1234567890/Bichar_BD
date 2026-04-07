import DeveloperCredit from "@/components/DeveloperCredit";
import LiveTicker from "@/components/LiveTicker";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CrisisGrid from "@/components/CrisisGrid";
import MapSection from "@/components/MapSection";
import IncidentDirectory from "@/components/IncidentDirectory";
import HistoricalArchive from "@/components/HistoricalArchive"; // Historical justice records module
import PublicFigureSearch from "@/components/PublicFigureSearch";
import LandVerification from "@/components/LandVerification";
import AutonomousBrainStatus from "@/components/AutonomousBrainStatus";
import DailyCrimeNews from "@/components/DailyCrimeNews";
import HighProfileExpose from "@/components/HighProfileExpose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg selection:bg-blood selection:text-white">
      <DeveloperCredit />
      <LiveTicker />
      <Hero />

      <section className="chapter max-w-[1200px] mx-auto p-12 md:p-24 border-b border-border">
        <div className="chapter-header mb-20 relative before:content-['CONTEXT'] before:absolute before:-top-6 before:left-0 before:font-mono before:text-[0.6rem] before:text-blood/50 before:tracking-[0.5em]">
          <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5 before:content-['01'] before:text-[0.55rem] before:text-blood before:border before:border-blood/40 before:px-2 before:py-1">
            বাংলাদেশের বাস্তবতা
          </div>
          <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight">
            এই দেশের মানুষ যা ভোগ করছে
          </h2>
          <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[800px] leading-relaxed">
            এই সংকটগুলো সারা পৃথিবীতে নেই — এগুলো আমাদের দেশের নিজস্ব ক্ষত যা আমরা প্রজন্মের পর প্রজন্ম বয়ে বেড়াচ্ছি।
          </p>
        </div>

        <Stats />
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

        {/* High Profile Expose Section */}
        <div className="mt-40">
          <HighProfileExpose />
        </div>

        {/* Special Module - Land Verification */}
        <div className="mt-40">
          <LandVerification />
        </div>

        <div className="mt-40">
          <AutonomousBrainStatus />
        </div>

        {/* Pipeline / Reporting Flow */}
        <div className="chapter-header mb-20 mt-40 relative before:content-['PIPELINE'] before:absolute before:-top-6 before:left-0 before:font-mono before:text-[0.6rem] before:text-blood/50 before:tracking-[0.5em]">
          <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5 before:content-['02'] before:text-[0.55rem] before:text-blood before:border before:border-blood/40 before:px-2 before:py-1">
            রিপোর্টিং ফ্লো
          </div>
          <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight">
            আপনার অভিযোগ যেভাবে কাজ করে
          </h2>
          <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[800px] leading-relaxed">
            সুরক্ষিত এবং সরাসরি — কোনো মধ্যস্বত্বভোগী ছাড়াই আন্তর্জাতিক পর্যায়ে অভিযোগ পৌঁছে দেওয়া।
          </p>
        </div>

        <div className="pipeline flex flex-col border border-border">
          {[
            {
              step: "01",
              title: "Anonymous Submission",
              desc: "আপনার পরিচয় সম্পূর্ণ গোপন রেখে অভিযোগ বা তথ্য প্রমাণ আপলোড করুন।",
              tag: "ENCRYPTED",
            },
            {
              step: "02",
              title: "AI Verification",
              desc: "আমাদের AI এবং মডারেটর প্যানেল তথ্যের সত্যতা প্রাথমিক যাচাই করবে।",
              tag: "PROCESSING",
            },
            {
              step: "03",
              title: "International Alert",
              desc: "অভিযোগের ধরন অনুযায়ী আন্তর্জাতিক সংস্থাগুলোতে (UN, ILO, Buyers) সরাসরি এলার্ট পাঠানো হবে।",
              tag: "EXTERNAL",
            },
            {
              step: "04",
              title: "Public Pressure",
              desc: "ঘটনাটি আমাদের ড্যাশবোর্ড এবং ম্যাপে লাইভ হবে যাতে বিশ্ববাসী এবং মিডিয়া জানতে পারে।",
              tag: "LIVE",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="pipe-step flex items-start gap-6 p-5 border-b border-border bg-surface hover:bg-surface2 transition-colors last:border-b-0"
            >
              <div className="pipe-num font-mono text-[0.6rem] text-text-faint w-8 shrink-0 pt-1">
                {item.step}
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
          "অবিচার যেখানেই হোক, তা <em>সব জায়গার</em> ন্যায়ের জন্য হুমকি।"
        </p>
      </div>

      <Footer />
    </main>
  );
}
