"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, ShieldAlert, Scale, ExternalLink, Flag, X, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { politicianProfiles } from "@/lib/data";

const highProfileCases = [
  {
    id: 1,
    title: "৭০০+ গুমের প্রধান উস্কানিদাতা ও পরিকল্পনাকারী",
    accused: "প্রাক্তন ঊর্ধ্বতন নিরাপত্তা কর্মকর্তা",
    status: "ফেরার (Wanted)",
    category: "Enforced Disappearance",
    description: "২০০৯ থেকে ২০২৪ সালের মধ্যে সংঘটিত অসংখ্য গুম ও বিচারবহির্ভূত হত্যার মূল পরিকল্পনাকারী হিসেবে অভিযুক্ত। আন্তর্জাতিক আদালতে মামলা প্রক্রিয়াধীন।",
    vulnerability: "Critical",
    evidence: [
      "সাক্ষীর জবানবন্দি (Affidavit #402)",
      "গোপন টর্চার সেলের লোকেশন ম্যাপ",
      "ভিকটিমদের তালিকা ও প্রোফাইল"
    ],
    newsLinks: ["Daily Star Investigation", "Al Jazeera Documentaries"]
  },
  {
    id: 2,
    title: "নির্বাচনী সহিংসতার মূল হোতা ও ক্যাডার বাহিনী প্রধান",
    accused: "স্থানীয় প্রভাবশালী নেতা (সাভার অঞ্চল)",
    status: "পাবলিক রেকর্ড (Exposed)",
    category: "Election Violence",
    description: "২০২৪ সালের নির্বাচনে বিরোধী দলীয় ভোটারদের বাধা প্রদান এবং কেন্দ্র দখলের অসংখ্য ভিডিও প্রমাণ বিদ্যমান। বর্তমানে ক্ষমতার প্রভাব খাটিয়ে তদন্ত বাধাগ্রস্ত করছে।",
    vulnerability: "High",
    evidence: [
      "ভোটকেন্দ্র দখলের ভিডিও ফুটেজ",
      "অস্ত্রধারী ক্যাডারদের ছবি ও পরিচয়",
      "ভয়ভীতি প্রদর্শনের অডিও রেকর্ড"
    ],
    newsLinks: ["Prothom Alo News Report", "Channel I Live Coverage"]
  },
  {
    id: 3,
    title: "৫০,০০০+ একর বনভূমি ও সরকারি জমি দখল চক্র",
    accused: "রিয়েল এস্টেট সিন্ডিকেট (গাজীপুর ও শ্রীপুর)",
    status: "তদন্তাধীন",
    category: "Land Grab",
    description: "জাল দলিলের মাধ্যমে বনবিভাগের হাজার হাজার একর জমি দখল করে হাউজিং প্রজেক্ট নির্মাণের অভিযোগ। দলিল জালিয়াতির AI রিপোর্টে ৯৮% মিল পাওয়া গেছে।",
    vulnerability: "Critical",
    evidence: [
      "জাল দলিলের ডিজিটাল স্ক্যান",
      "বনবিভাগের সীমানা ম্যাপ বনাম বর্তমান দখল",
      "ভিকটিম কৃষকদের যৌথ অভিযোগপত্র"
    ],
    newsLinks: ["The Business Standard", "Somoy News Analysis"]
  }
];

export default function HighProfileExpose() {
  const [selectedCase, setSelectedCase] = useState<typeof highProfileCases[0] | null>(null);

  return (
    <div className="high-profile-expose mt-24">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['05'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          অপরাধী এক্সপোজ সেকশন
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
          মোস্ট ওয়ান্টেড ও হাই-প্রোফাইল কেস
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          যাদের প্রভাবে ন্যায়বিচার বাধাগ্রস্ত হচ্ছে — তাদের জনসম্মুখে নিয়ে আসা
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-1">
        {highProfileCases.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => setSelectedCase(item)}
            className="bg-surface border border-border p-8 relative overflow-hidden group hover:bg-surface2 transition-all cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-all ${
              item.vulnerability === 'Critical' ? 'text-blood' : 'text-gold'
            }`}>
              <UserX size={64} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className={`w-2 h-2 rounded-full ${
                item.vulnerability === 'Critical' ? 'bg-blood animate-pulse' : 'bg-gold'
              }`} />
              <span className={`text-[0.65rem] font-mono uppercase tracking-widest ${
                item.vulnerability === 'Critical' ? 'text-blood' : 'text-gold'
              }`}>
                {item.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blood transition-colors leading-[1.4]">
              {item.title}
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <ShieldAlert size={16} className="text-text-faint shrink-0 mt-1" />
                <p className="text-sm text-text-dim leading-[1.6]">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Scale size={16} className="text-blood" />
                <span className="text-[0.75rem] font-bold text-white uppercase tracking-wider">
                  অভিযুক্ত: {item.accused}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-bg border border-border py-3 text-[0.65rem] font-mono uppercase tracking-widest text-text-dim hover:text-white hover:border-blood transition-all flex items-center justify-center gap-2">
                <ExternalLink size={12} /> তথ্য প্রমাণ
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface border border-border w-full max-w-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-widest border ${
                    selectedCase.vulnerability === 'Critical' ? 'bg-blood/10 border-blood text-blood' : 'bg-gold/10 border-gold text-gold'
                  }`}>
                    {selectedCase.category}
                  </span>
                  <span className="text-text-faint text-[0.7rem] font-mono">{selectedCase.status}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedCase.title}</h2>
                <div className="flex items-center gap-2 text-blood font-bold text-sm">
                  <UserX size={16} /> অভিযুক্ত: {selectedCase.accused}
                </div>
              </div>

              <div className="space-y-8 mb-8">
                <div>
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                    <FileText size={12} /> সংগৃহীত প্রমাণসমূহ (Collected Evidence)
                  </div>
                  <ul className="space-y-3">
                    {selectedCase.evidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-text-dim bg-bg p-3 border border-border">
                        <CheckCircle2 size={14} className="text-blood" /> {ev}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-text-faint text-[0.6rem] uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                    <AlertCircle size={12} /> ভেরিফাইড নিউজ সোর্স (News Coverage)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.newsLinks.map((link, i) => (
                      <span key={i} className="bg-blood/10 border border-blood/30 px-3 py-1.5 text-[0.7rem] text-blood font-mono uppercase tracking-widest">
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-bg border border-border p-6 text-center">
                <p className="text-xs text-text-faint mb-4 italic">"তথ্য প্রমাণসমূহ এনক্রিপ্টেড ডাটাবেস থেকে সরবরাহ করা হয়েছে।"</p>
                <button className="bg-blood text-white px-8 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] hover:bg-blood/90 transition-all flex items-center justify-center gap-2 mx-auto">
                  <Flag size={14} /> রিপোর্ট সাবমিট করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
