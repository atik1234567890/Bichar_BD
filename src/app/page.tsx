import DeveloperCredit from "@/components/DeveloperCredit";
import LiveTicker from "@/components/LiveTicker";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CrisisGrid from "@/components/CrisisGrid";
import MapSection from "@/components/MapSection";
import IncidentDirectory from "@/components/IncidentDirectory";
import PublicFigureSearch from "@/components/PublicFigureSearch";
import LandVerification from "@/components/LandVerification";
import AutonomousBrainStatus from "@/components/AutonomousBrainStatus";
import DailyCrimeNews from "@/components/DailyCrimeNews";
import HighProfileExpose from "@/components/HighProfileExpose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <DeveloperCredit />
      <LiveTicker />
      <Hero />

      <section className="chapter max-w-[1120px] mx-auto p-12 md:p-20 border-b border-border">
        <div className="chapter-header mb-14">
          <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['01'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
            বাংলাদেশের বাস্তবতা
          </div>
          <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
            এই দেশের মানুষ যা ভোগ করছে
          </h2>
          <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
            এই সংকটগুলো সারা পৃথিবীতে নেই — এগুলো আমাদের দেশের নিজস্ব ক্ষত
          </p>
        </div>

        <Stats />
        <CrisisGrid />
        <DailyCrimeNews />
        <MapSection />
        <IncidentDirectory />

        {/* Search Module instead of hardcoded trackers */}
        <PublicFigureSearch />

        {/* High Profile Expose Section */}
        <HighProfileExpose />

        {/* Special Module - Land Verification */}
        <LandVerification />

        <AutonomousBrainStatus />

        {/* Pipeline / Reporting Flow */}
        <div className="chapter-header mb-14 mt-20">
          <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['02'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
            রিপোর্টিং ফ্লো
          </div>
          <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
            আপনার অভিযোগ যেভাবে কাজ করে
          </h2>
          <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
            সুরক্ষিত এবং সরাসরি — কোনো মধ্যস্বত্বভোগী ছাড়াই আন্তর্জাতিক পর্যায়ে
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
