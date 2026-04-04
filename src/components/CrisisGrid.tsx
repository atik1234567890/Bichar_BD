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
      "বাংলাদেশে নারী ও শিশু নির্যাতনের এক ভয়াবহ চিত্র। বিচারহীনতার সংস্কৃতি এই অপরাধকে আরও বাড়িয়ে দিচ্ছে।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "রিয়েল-টাইম রিপোর্ট, মামলা ট্র্যাকিং এবং আইনি সহায়তার জন্য সরাসরি সংযোগ। প্রতিটি ঘটনার পুঙ্খানুপুঙ্খ রেকর্ড রাখা হবে।",
    features: [
      "ধর্ষণ ও গণধর্ষণ মামলা ট্র্যাকিং",
      "যৌন হয়রানি ও শ্লীলতাহানি রিপোর্ট",
      "আইনি সহায়তার জন্য লয়ার কানেকশন",
      "অপরাধীর প্রোফাইল ও রেকর্ড সংরক্ষণ",
    ],
  },
  {
    id: "murder",
    barColor: "bg-blood",
    severity: "text-blood",
    severityLabel: "Critical · জীবননাশী অপরাধ",
    emoji: "💀",
    title: "হত্যা ও জঘন্য অপরাধ Monitor",
    context:
      "পিটিয়ে হত্যা, রাজনৈতিক হত্যাকাণ্ড এবং উদ্দেশ্যপ্রণোদিত খুনের ঘটনাগুলো এখন নিত্যনৈমিত্তিক হয়ে দাঁড়িয়েছে।",
    contextColor: "bg-blood-soft border-blood text-blood",
    solution:
      "লাশ উদ্ধার থেকে শুরু করে ময়নাতদন্ত রিপোর্ট এবং চার্জশিট পর্যন্ত প্রতিটি ধাপ মনিটর করা হবে।",
    features: [
      "রাজনৈতিক হত্যাকাণ্ড ট্র্যাকিং",
      "পিটিয়ে হত্যা (Mob Lynching) রেকর্ড",
      "ময়নাতদন্ত ও ফরেনসিক আপডেট",
      "মামলার চার্জশিট মনিটরিং",
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
