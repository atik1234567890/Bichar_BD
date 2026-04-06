"use client";

import { useState, useEffect } from "react";
import CrisisCard from "./CrisisCard";
import ReportForm from "./ReportForm";

const defaultCrises = [
  {
    id: "rape",
    barColor: "bg-blood",
    severity: "text-blood",
    severityLabel: "Critical · সামাজিক ব্যাধি",
    emoji: "🩸",
    title: "ধর্ষণ ও যৌন নিপীড়ন Tracker",
    context:
      "বাংলাদেশে নারী ও শিশু নির্যাতনের এক ভয়াবহ চিত্র যা ১৯৭১ সালের যুদ্ধাপরাধের সময় থেকেই এক হাতিয়ার হিসেবে ব্যবহৃত হয়ে আসছে।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "ঐতিহাসিক এবং বর্তমান প্রতিটি ঘটনার পুঙ্খানুপুঙ্খ রেকর্ড, মামলা ট্র্যাকিং এবং আন্তর্জাতিক অপরাধ ট্রাইব্যুনালের সাথে সংযোগ।",
    features: [
      "১৯৭১-এর যুদ্ধাপরাধ রেকর্ড",
      "ধর্ষণ ও গণধর্ষণ মামলা ট্র্যাকিং",
      "আইনি সহায়তার জন্য লয়ার কানেকশন",
      "অপরাধীর প্রোফাইল সংরক্ষণ",
    ],
  },
  {
    id: "murder",
    barColor: "bg-blood",
    severity: "text-blood",
    severityLabel: "Critical · জীবননাশী অপরাধ",
    emoji: "💀",
    title: "রাজনৈতিক হত্যাকাণ্ড ও গুম Monitor",
    context:
      "স্বাধীনতার পর থেকে আজ পর্যন্ত রাজনৈতিক কারণে সংঘটিত প্রতিটি হত্যাকাণ্ড এবং বলপ্রয়োগপূর্বক গুমের ঘটনার ডিজিটাল আর্কাইভ।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "ঘটনার সময়কাল, সংশ্লিষ্ট ব্যক্তি এবং প্রত্যক্ষদর্শীদের জবানবন্দি সংরক্ষণের মাধ্যমে ন্যায়বিচার নিশ্চিত করার দাবি তোলা।",
    features: [
      "১৯৭৫-এর ট্র্যাজেডি ও পরবর্তী মামলা",
      "রাজনৈতিক হত্যাকাণ্ড ট্র্যাকিং",
      "ময়নাতদন্ত ও ফরেনসিক আপডেট",
      "আন্তর্জাতিক সংস্থাগুলোতে এলার্ট",
    ],
  },
  {
    id: "enforced_disappearance",
    barColor: "bg-blood",
    severity: "text-blood",
    severityLabel: "Critical · গুম ও নিখোঁজ",
    emoji: "👻",
    title: "গুম ও নিখোঁজ Tracker",
    context:
      "বাংলাদেশে Enforced Disappearance একটা সুপরিচিত ট্র্যাজেডি। পরিবার জানে না প্রিয়জন জীবিত না মৃত।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "Disappearance report করা যাবে। Last seen location, date, circumstances। আন্তর্জাতিক human rights database-এর সাথে connect। পরিবার update পাবে।",
    features: [
      "Anonymous family report system",
      "UN Working Group-এর format অনুযায়ী রিপোর্ট",
      "International human rights org alert",
      "\"Crossfire\" ও custody death track",
    ],
  },
  {
    id: "land_grab",
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
  {
    id: "labor_violation",
    barColor: "bg-sky",
    severity: "text-sky",
    severityLabel: "High · শ্রম অধিকার",
    emoji: "🧵",
    title: "পোশাক শ্রমিক অধিকার লঙ্ঘন Monitor",
    context:
      "বাংলাদেশের ৩৬ লক্ষ RMG শ্রমিকের বেতন চুরি, শারীরিক নির্যাতন, অনিরাপদ কাজের পরিবেশ — কেউ কথা বলে না।",
    contextColor: "bg-sky-soft border-sky text-sky",
    solution:
      "Factory-wise complaint system। Anonymous report। International brand alert (H&M, Zara)। BGMEA ও আন্তর্জাতিক labor monitor-দের সাথে সংযুক্ত।",
    features: [
      "Factory name ও location tracking",
      "International brand alert (H&M, Zara)",
      "Worker rights violation score",
      "BGMEA ও ILO report integration",
    ],
  },
];

export default function CrisisGrid() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [detailedStats, setDetailedStats] = useState<any>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    async function fetchDetailedStats() {
      try {
        const response = await fetch(`${API_URL}/api/stats/detailed`);
        const result = await response.json();
        if (result.success) {
          setDetailedStats(result.data);
        }
      } catch (error) {
        console.error("Error fetching detailed stats:", error);
      }
    }
    fetchDetailedStats();
  }, []);

  return (
    <>
      <div className="crisis-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultCrises.map((crisis) => (
          <CrisisCard 
            key={crisis.id} 
            {...crisis} 
            onReportClick={(title) => setSelectedReport(title)}
            stats={detailedStats ? detailedStats[crisis.id] : { total: 0, resolved: 0, pending: 0 }}
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
