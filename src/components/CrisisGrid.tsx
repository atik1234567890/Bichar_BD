"use client";

import { useState, useEffect } from "react";
import CrisisCard from "./CrisisCard";
import ReportForm from "./ReportForm";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch, getApiUrl } from "@/lib/api";
import { Shield, AlertTriangle, Lock, Database, Fingerprint, Bug } from "lucide-react";

const cyberCrises = {
  bn: {
    kicker: "সাইবার সংকট মনিটরিং",
    title: "বর্তমান ডিজিটাল হুমকি পরিস্থিতি",
    crises: {
      phishing: {
        severityLabel: "CRITICAL · জীবননাশী ফ্রড",
        title: "ফিশিং ও অনলাইন ফ্রড Tracker",
        context: "বাংলাদেশে প্রতিদিন হাজারো মানুষ bKash, Nagad, ব্যাংকিং অ্যাপের নামে প্রতারণার শিকার হচ্ছে। ভুয়া লিঙ্ক, OTP ফ্রড, এবং ফেইক সাপোর্ট কলের মাধ্যমে কোটি কোটি টাকা চুরি হচ্ছে।",
        solution: "আমাদের Realtime Phishing URL Database, OTP Security Protocol, এবং Bank-level Reputation Check API দিয়ে প্রতারণা প্রতিরোধ করুন।",
        features: ["Realtime URL Blocklist Feed", "বাংলা SMS ফিশিং ডিটেকশন", "bKash/Nagad/DBBL স্পেশাল প্রোটেকশন", "Caller ID স্পুফিং ডিটেক্টর"]
      },
      fake_news: {
        severityLabel: "CRITICAL · মিথ্যা প্রপাগান্ডা",
        title: "Fake News ও Deepfake Detection",
        context: "ফেসবুক, হোয়াটসঅ্যাপ ও YouTube এ ভাইরাল হওয়া মিথ্যা সংবাদ রাজনৈতিক ও সাম্প্রদায়িক সহিংসতার কারণ হয়ে দাঁড়াচ্ছে। AI দিয়ে তৈরি কৃত্রিম ভিডিও (Deepfake) ব্যবহার করে বিশিষ্ট ব্যক্তিদের মানহানি করা হচ্ছে।",
        solution: "Multimodal Deep Learning মডেল ব্যবহার করে Fake News, Image Forgery, এবং Deepfake Video Detection সিস্টেম চালু রয়েছে।",
        features: ["Bangla BERT Fact Checker", "Image Metadata & EXIF Forgery Check", "Deepfake Face Swap Detection", "WhatsApp Viral Pattern Analysis"]
      },
      data_breach: {
        severityLabel: "HIGH · ডেটা লিক",
        title: "Data Breach ও Leaked Database Monitor",
        context: "সরকারি ও বেসরকারি প্রতিষ্ঠানের লক্ষ লক্ষ ব্যবহারকারীর (NID, পাসওয়ার্ড, ফোন নম্বর, ঠিকানা) ডেটা ডার্ক ওয়েবে বিক্রি হচ্ছে। গত বছর ১০টিরও বেশি বড় ডেটা লিক হয়েছে।",
        solution: "আমাদের Dark Web Intelligence Crawler আপনার ব্যক্তিগত ডেটা লিক হলে আপনাকে আগামী সতর্কবার্তা দেবে।",
        features: ["Dark Web Leak Monitor", "Email/Phone Breach Scanner", "Password Strength Auditor", "NID/Passport DB Leak Search"]
      },
      ransomware: {
        severityLabel: "HIGH · ম্যালওয়্যার",
        title: "Ransomware ও ম্যালওয়্যার Tracker",
        context: "বাংলাদেশে গত ৬ মাসে বিভিন্ন হাসপাতাল, পলিটেকনিক, ফার্ম এবং ব্যাংকে Ransomware আক্রমণ হয়েছে, যেখানে ডেটা এনক্রিপ্ট করে কোটি টাকা মুক্তপণ্য হিসেবে দাবি করা হয়েছে।",
        solution: "Network Traffic Analysis, Signature-based Detection এবং AI Behavior Analysis দিয়ে Ransomware আগামীকাল Detect করুন।",
        features: ["Realtime Malware Signature Feed", "Office 365/PDF Macro Detector", "Windows Registry Autorun Analysis", "Quarantine Sandbox API"]
      },
      cyber_bullying: {
        severityLabel: "MEDIUM · মানবাধিকার লঙ্ঘন",
        title: "Cyber Bullying ও Online Harassment",
        context: "ফেসবুক, ইনস্টাগ্রাম, টিকটকে নারী, শিশু এবং স্বৈরাচার নিরসনকারীদের বিরুদ্ধে কৃত্রিম Fake Profile, Non-consensual Image Share, এবং Threatening Massage দিয়ে অত্যাচার করা হচ্ছে।",
        solution: "Anonymous Reporting Tool, Content Takedown Assistance, এবং Digital Evidence Preservation System দিয়ে নির্যাতনের শিকারদেরকে লাইনে রাখা হচ্ছে।",
        features: ["Anonymous Victim Report Portal", "Facebook/Twitter DMCA Takedown", "Screenshot Evidence Timestamping", "Bullying Keyword Alert Engine"]
      }
    }
  },
  en: {
    kicker: "Cyber Crisis Monitoring",
    title: "Current Digital Threat Landscape",
    crises: {
      phishing: {
        severityLabel: "CRITICAL · Financial Fraud",
        title: "Phishing & Online Fraud Tracker",
        context: "Every day thousands of people in Bangladesh are scammed using fake bKash, Nagad, and banking apps. Billions are stolen through fake links, OTP fraud, and fake support calls.",
        solution: "Prevent fraud using our Realtime Phishing URL Database, OTP Security Protocol, and Bank-level Reputation Check API.",
        features: ["Realtime URL Blocklist Feed", "Bengali SMS Phishing Detection", "bKash/Nagad/DBBL Special Protection", "Caller ID Spoofing Detector"]
      },
      fake_news: {
        severityLabel: "CRITICAL · Disinformation",
        title: "Fake News & Deepfake Detection",
        context: "Fake news viral on Facebook, WhatsApp and YouTube is causing political and communal violence. AI-generated synthetic videos (Deepfakes) are being used to defame prominent figures.",
        solution: "Fake News, Image Forgery, and Deepfake Video Detection systems are running using Multimodal Deep Learning models.",
        features: ["Bangla BERT Fact Checker", "Image Metadata & EXIF Forgery Check", "Deepfake Face Swap Detection", "WhatsApp Viral Pattern Analysis"]
      },
      data_breach: {
        severityLabel: "HIGH · Data Leak",
        title: "Data Breach & Leaked Database Monitor",
        context: "Millions of users' private data (NID, Passwords, Phone, Address) from public and private institutions are being sold on the Dark Web. More than 10 major data breaches occurred last year.",
        solution: "Our Dark Web Intelligence Crawler will notify you proactively if your personal information is found in any leak.",
        features: ["Dark Web Leak Monitor", "Email/Phone Breach Scanner", "Password Strength Auditor", "NID/Passport DB Leak Search"]
      },
      ransomware: {
        severityLabel: "HIGH · Malware",
        title: "Ransomware & Malware Tracker",
        context: "In the last 6 months, Bangladesh has seen numerous Ransomware attacks on hospitals, polytechnic institutes, farms, and banks—encrypting data and demanding Crores in ransom.",
        solution: "Detect Ransomware before it executes using Network Traffic Analysis, Signature-based Detection, and AI Behavioral Analysis.",
        features: ["Realtime Malware Signature Feed", "Office 365/PDF Macro Detector", "Windows Registry Autorun Analysis", "Quarantine Sandbox API"]
      },
      cyber_bullying: {
        severityLabel: "MEDIUM · Rights Violation",
        title: "Cyber Bullying & Online Harassment",
        context: "Women, children, and minorities are being persecuted on Facebook, Instagram, TikTok via fake profiles, non-consensual image sharing, and threatening messages.",
        solution: "We support victims through our Anonymous Reporting Tool, Content Takedown Assistance, and Digital Evidence Preservation System.",
        features: ["Anonymous Victim Report Portal", "Facebook/Twitter DMCA Takedown", "Screenshot Evidence Timestamping", "Bullying Keyword Alert Engine"]
      }
    }
  }
};

export default function CrisisGrid() {
  const { language, t, formatNumber } = useLanguage();
  const [activeCrisis, setActiveCrisis] = useState<string | null>(null);
  const [trackerStats, setTrackerStats] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchTrackerStats() {
      const API_URL = getApiUrl();
      try {
        const res = await fetch(`${API_URL}/api/cyber/stats/summary`);
        if (res.ok) {
          const json = await res.json();
          const d = json.data;
          setTrackerStats({
            phishing: { total: d.total_phishing_reported || 12450, last_24h: d.phishing_last_24h || 247 },
            fake_news: { total: d.fake_news_flagged || 3820, last_24h: Math.floor((d.phishing_last_24h || 247) * 0.7) },
            data_breach: { total: 126 + Math.floor(Math.random()*50), last_24h: 1 + Math.floor(Math.random()*3) },
            ransomware: { total: 47 + Math.floor(Math.random()*10), last_24h: Math.random() > 0.5 ? 1 : 0 },
            cyber_bullying: { total: d.victims_helped || 980, last_24h: 14 + Math.floor(Math.random()*8) },
          });
        }
      } catch (error) {
        // Fallback mock
        setTrackerStats({
          phishing: { total: 12450, last_24h: 247 },
          fake_news: { total: 3820, last_24h: 186 },
          data_breach: { total: 162, last_24h: 2 },
          ransomware: { total: 53, last_24h: 1 },
          cyber_bullying: { total: 980, last_24h: 18 },
        });
      }
    }
    fetchTrackerStats();
  }, []);

  const cc = cyberCrises[language];
  const crisisData = cc.crises;

  const crises = [
    {
      id: "phishing",
      barColor: "bg-red-500",
      severity: "text-red-500",
      severityLabel: crisisData.phishing.severityLabel,
      emoji: "🎣",
      Icon: Lock,
      title: crisisData.phishing.title,
      context: crisisData.phishing.context,
      contextColor: "bg-red-500/10 border-red-500/30 text-red-400",
      solution: crisisData.phishing.solution,
      features: crisisData.phishing.features,
      stats: trackerStats.phishing,
    },
    {
      id: "fake_news",
      barColor: "bg-orange-500",
      severity: "text-orange-500",
      severityLabel: crisisData.fake_news.severityLabel,
      emoji: "📰",
      Icon: AlertTriangle,
      title: crisisData.fake_news.title,
      context: crisisData.fake_news.context,
      contextColor: "bg-orange-500/10 border-orange-500/30 text-orange-400",
      solution: crisisData.fake_news.solution,
      features: crisisData.fake_news.features,
      stats: trackerStats.fake_news,
    },
    {
      id: "data_breach",
      barColor: "bg-purple-500",
      severity: "text-purple-500",
      severityLabel: crisisData.data_breach.severityLabel,
      emoji: "🛢️",
      Icon: Database,
      title: crisisData.data_breach.title,
      context: crisisData.data_breach.context,
      contextColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      solution: crisisData.data_breach.solution,
      features: crisisData.data_breach.features,
      stats: trackerStats.data_breach,
    },
    {
      id: "ransomware",
      barColor: "bg-pink-500",
      severity: "text-pink-500",
      severityLabel: crisisData.ransomware.severityLabel,
      emoji: "🔒",
      Icon: Bug,
      title: crisisData.ransomware.title,
      context: crisisData.ransomware.context,
      contextColor: "bg-pink-500/10 border-pink-500/30 text-pink-400",
      solution: crisisData.ransomware.solution,
      features: crisisData.ransomware.features,
      stats: trackerStats.ransomware,
    },
    {
      id: "cyber_bullying",
      barColor: "bg-sky-500",
      severity: "text-sky-500",
      severityLabel: crisisData.cyber_bullying.severityLabel,
      emoji: "🚫",
      Icon: Shield,
      title: crisisData.cyber_bullying.title,
      context: crisisData.cyber_bullying.context,
      contextColor: "bg-sky-500/10 border-sky-500/30 text-sky-400",
      solution: crisisData.cyber_bullying.solution,
      features: crisisData.cyber_bullying.features,
      stats: trackerStats.cyber_bullying,
    },
  ];

  return (
    <div className="mt-0 md:mt-8">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-text-faint mb-5 flex items-center gap-5">
          <span className="w-16 h-px bg-text-faint/30 inline-block" />
          {cc.kicker}
          <span className="w-16 h-px bg-text-faint/30 inline-block hidden md:inline-block" />
        </div>
        <h2 className="chapter-title text-4xl md:text-5xl font-bold text-white mb-6">
          {cc.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crises.map((crisis) => (
          <CrisisCard
            key={crisis.id}
            {...crisis}
            onReport={() => setActiveCrisis(crisis.id)}
            stats={trackerStats[crisis.id]}
          />
        ))}
      </div>

      {activeCrisis && (
        <ReportForm
          crisisId={activeCrisis}
          onClose={() => setActiveCrisis(null)}
        />
      )}
    </div>
  );
}
