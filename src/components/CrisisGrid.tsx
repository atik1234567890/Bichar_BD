"use client";

import { useState } from "react";
import CrisisCard from "./CrisisCard";
import ReportForm from "./ReportForm";

const crises = [
  {
    barColor: "bg-blood",
    severity: "text-blood",
    severityLabel: "Critical · Bangladesh-Specific",
    emoji: "👻",
    title: "গুম ও বিচারবহির্ভূত হত্যা Tracker",
    context:
      "বাংলাদেশে Enforced Disappearance একটা সুপরিচিত ট্র্যাজেডি। পরিবার জানে না প্রিয়জন জীবিত না মৃত।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "Disappearance report করা যাবে। Last seen location, date, circumstances। আন্তর্জাতিক human rights database-এর সাথে connect। পরিবার update পাবে।",
    features: [
      "Anonymous family report system",
      "UN Working Group on Enforced Disappearances-এর format",
      "International human rights org alert",
      "\"Crossfire\" ও custody death track",
    ],
  },
  {
    barColor: "bg-gold",
    severity: "text-gold",
    severityLabel: "Critical · রাজনৈতিক সংকট",
    emoji: "🗳️",
    title: "নির্বাচনী সহিংসতা ও ভোট জালিয়াতি Monitor",
    context:
      "বাংলাদেশে নির্বাচনের সময় ব্যাপক সহিংসতা, কেন্দ্র দখল, ভোট কারচুপি হয় — কিন্তু real-time কোনো record থাকে না।",
    contextColor: "bg-gold-soft border-gold text-gold",
    solution:
      "নির্বাচনের আগে-পরে real-time incident reporting। কোন কেন্দ্রে কী হলো map-এ দেখাবে। Observer network-এর সাথে integrate।",
    features: [
      "Election incident real-time map",
      "Polling center-wise report",
      "Photo/video evidence upload",
      "International observer alert",
    ],
  },
  {
    barColor: "bg-teal",
    severity: "text-teal",
    severityLabel: "Critical · সামাজিক",
    emoji: "🏘️",
    title: "সংখ্যালঘূ নিপীড়ন Tracker",
    context:
      "হিন্দু, বৌদ্ধ, খ্রিস্টান, আদিবাসী — নির্বাচন-পরবর্তী বা যেকোনো উত্তেজনায় সংখ্যালঘুরা আক্রান্ত হয়। কেউ track করে না।",
    contextColor: "bg-teal-soft border-teal text-teal",
    solution:
      "Minority attack real-time reporting। ঘটনা, অবস্থান, ক্ষয়ক্ষতি। সাথে সাথে UNHCR ও সংশ্লিষ্ট NGO-তে alert। Historical pattern দেখাবে।",
    features: [
      "Attack type categorization",
      "UNHCR automatic notification",
      "District-wise vulnerability map",
      "Historical incident archive",
    ],
  },
  {
    barColor: "bg-sky",
    severity: "text-sky",
    severityLabel: "High · শ্রম অধিকার",
    emoji: "🧵",
    title: "পোশাক শ্রমিক অধিকার লঙ্ঘন Monitor",
    context:
      "বাংলাদেশের ৩৬ লক্ষ RMG শ্রমিকের বেতন চুরি, শারীরিক নির্যাতন, অনিরাপদ কাজের পরিবেশ — কেউ কথা বলে না।",
    contextColor: "bg-sky-soft border-sky text-sky",
    solution:
      "Factory-wise complaint system। Anonymous report। International buyer brands-এর নামে পাঠানো যাবে। BGMEA ও আন্তর্জাতিক labor monitor-দের সাথে সংযুক্ত।",
    features: [
      "Factory name ও location tracking",
      "International brand alert (H&M, Zara)",
      "Worker rights violation score",
      "BGMEA ও ILO report integration",
    ],
  },
  {
    barColor: "bg-orange",
    severity: "text-orange",
    severityLabel: "High · ভূমি সংকট",
    emoji: "🏡",
    title: "জমি দখল ও দলিল জালিয়াতি Tracker",
    context:
      "বাংলাদেশে \"দখল\" একটা মহামারি। রাজনৈতিক প্রভাবশালীরা গরিব মানুষের জমি দখল করে, দলিল জাল করে।",
    contextColor: "bg-orange-soft border-orange text-orange",
    solution:
      "জমির কাগজ upload করলে AI authenticity check করবে। Land registry-র সাথে cross-reference। দখলের ঘটনা map-এ দেখাবে। Legal aid connector সাথে।",
    features: [
      "Land document AI verification",
      "Registry cross-reference",
      "Grab hotspot heatmap",
      "Automatic legal aid referral",
    ],
  },
];

export default function CrisisGrid() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <>
      <div className="crisis-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border border border-border">
        {crises.map((crisis, idx) => (
          <CrisisCard 
            key={idx} 
            {...crisis} 
            onReportClick={(title) => setSelectedReport(title)}
          />
        ))}
      </div>
      
      <ReportForm 
        isOpen={!!selectedReport} 
        onClose={() => setSelectedReport(null)} 
        title={selectedReport || ""} 
      />
    </>
  );
}
