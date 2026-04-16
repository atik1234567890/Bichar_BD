"use client";

import { motion } from "framer-motion";
import { pmProfiles } from "@/lib/data";
import { User, AlertTriangle, ShieldAlert } from "lucide-react";

export default function PrimeMinistersSection() {
  return (
    <div className="pm-section mt-32 mb-20 px-4">
      <div className="chapter-header mb-16 text-center">
        <div className="chapter-kicker font-mono text-[0.7rem] tracking-[0.4em] uppercase text-blood mb-4 flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-blood/30"></span>
          বাংলাদেশের শাসনকাল ও অপরাধের চিত্র
          <span className="h-[1px] w-12 bg-blood/30"></span>
        </div>
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white leading-none mb-6 tracking-tighter">
          প্রধানমন্ত্রীদের <span className="text-blood">আমলনামা</span>
        </h2>
        <p className="max-w-2xl mx-auto text-text-dim text-lg font-light leading-relaxed">
          ১৯৭১ থেকে আজীবন পর্যন্ত বাংলাদেশের প্রধানমন্ত্রীদের শাসনকালে অপরাধের তুলনামূলক হার। 
          লাল রঙ দ্বারা অপরাধের তীব্রতা নির্দেশ করা হয়েছে।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {pmProfiles.map((pm) => (
          <motion.div 
            key={pm.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-surface border border-white/5 overflow-hidden"
          >
            {/* Image Container with Water Effect */}
            <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img 
                src={pm.image} 
                alt={pm.name}
                className="w-full h-full object-cover"
              />
              
              {/* Blood/Red Water Effect */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${pm.crimeLevel}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-blood/40 backdrop-blur-[2px] border-t border-blood/60 z-10 pointer-events-none"
              >
                {/* Wave animation */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-blood/40 -translate-y-full overflow-hidden">
                   <div className="wave-animation"></div>
                </div>
              </motion.div>

              {/* Danger Badge if high crime level */}
              {pm.crimeLevel > 80 && (
                <div className="absolute top-4 right-4 z-20 bg-blood text-white p-2 rounded-full animate-pulse shadow-lg shadow-blood/50">
                  <ShieldAlert size={24} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 relative z-20">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{pm.name}</h3>
                  <p className="font-mono text-blood text-sm tracking-widest uppercase">{pm.period}</p>
                </div>
                <div className="text-right">
                  <div className="text-[0.6rem] font-mono text-text-faint uppercase mb-1">অপরাধের হার</div>
                  <div className={`text-2xl font-black ${pm.crimeLevel > 80 ? 'text-blood' : 'text-white'}`}>
                    {pm.crimeLevel}%
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-6">
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0 text-blood/50">
                    <User size={16} />
                  </div>
                  <p className="text-sm text-text-dim leading-relaxed">
                    <span className="text-white font-medium">পরিচয়:</span> {pm.summary}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0 text-blood/50">
                    <AlertTriangle size={16} />
                  </div>
                  <p className="text-sm text-text-dim leading-relaxed">
                    <span className="text-white font-medium">উল্লেখযোগ্য ঘটনা:</span> {pm.crimesDuringTenure}
                  </p>
                </div>
              </div>
            </div>

            {/* Hover overlay for dramatic effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blood/30 transition-all pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .wave-animation {
          width: 200%;
          height: 100%;
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0 C150,0 200,100 300,100 C400,100 500,0 600,0 C750,0 800,100 900,100 C1000,100 1100,0 1200,0 L1200,120 L0,120 Z" fill="%23cc0000" fill-opacity="0.3"></path></svg>');
          background-size: 50% 100%;
          animation: wave 3s linear infinite;
        }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
