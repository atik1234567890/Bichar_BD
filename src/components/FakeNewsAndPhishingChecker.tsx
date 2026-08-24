"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  Link,
  Megaphone,
  FileWarning,
  BrainCircuit,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getApiUrl } from "@/lib/api";
import toast from "react-hot-toast";

export default function FakeNewsAndPhishingChecker() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"fakenews" | "phishing">("fakenews");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fakeNewsResult, setFakeNewsResult] = useState<any>(null);
  const [phishingResult, setPhishingResult] = useState<any>(null);

  const isBn = language === "bn";

  const analyzeFakeNews = async () => {
    if (!textInput.trim()) {
      toast.error(isBn ? "দয়া করে সংবাদের টেক্সট লিখুন" : "Please enter news text");
      return;
    }
    setLoading(true);
    setFakeNewsResult(null);
    const API_URL = getApiUrl();
    try {
      const res = await fetch(`${API_URL}/api/cyber/fake-news/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textInput }),
      });
      if (res.ok) {
        const json = await res.json();
        setFakeNewsResult(json);
        if (json.verdict === "FAKE" || json.verdict === "SCAM") {
          toast.error(`${isBn ? "সতর্কবার্তা: মিথ্যা সংবাদ শনাক্ত!" : "Alert: Fake News Detected!"});
        } else if (json.verdict === "LIKELY TRUE") {
          toast.success(isBn ? "সংবাদটি সম্ভবত সত্য" : "Likely True Content");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error(isBn ? "সার্ভার এরর. লোকাল মডেল ব্যবহার করা হচ্ছে" : "Server error. Using local model.");
    } finally {
      setLoading(false);
    }
  };

  const analyzePhishing = async () => {
    if (!urlInput.trim()) {
      toast.error(isBn ? "দয়া করে URL লিখুন" : "Please enter a URL");
      return;
    }
    setLoading(true);
    setPhishingResult(null);
    const API_URL = getApiUrl();
    try {
      const res = await fetch(`${API_URL}/api/cyber/phishing/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      });
      if (res.ok) {
        const json = await res.json();
        setPhishingResult(json);
        if (json.analysis?.severity === "Critical" || json.analysis?.severity === "High") {
          toast.error(isBn ? "সতর্কবার্তা: ফিশিং URL শনাক্ত!" : "Danger: Phishing URL Detected!");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const verdictStyles: Record<string, { bg: string; border: string; text: string; icon: any }> = {
    "FAKE": { bg: "bg-red-500/10", border: "border-red-500/40", text: "text-red-400", icon: XCircle },
    "SCAM": { bg: "bg-red-500/10", border: "border-red-500/40", text: "text-red-400", icon: ShieldAlert },
    "MISLEADING": { bg: "bg-orange-500/10", border: "border-orange-500/40", text: "text-orange-400", icon: AlertTriangle },
    "UNVERIFIED": { bg: "bg-yellow-500/10", border: "border-yellow-500/40", text: "text-yellow-400", icon: FileWarning },
    "LIKELY TRUE": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-400", icon: CheckCircle2 },
  };

  const phishSeverity: Record<string, { bg: string; bar: string; label: string }> = {
    "Critical": { bg: "text-red-400", bar: "bg-red-500", label: isBn ? "অত্যন্ত ঝুঁকিপূর্ণ" : "Extremely Dangerous" },
    "High": { bg: "text-orange-400", bar: "bg-orange-500", label: isBn ? "উচ্চ ঝুঁকি" : "High Risk" },
    "Medium": { bg: "text-yellow-400", bar: "bg-yellow-500", label: isBn ? "মাঝারি ঝুঁকি" : "Medium Risk" },
    "Low": { bg: "text-emerald-400", bar: "bg-emerald-500", label: isBn ? "নিরাপদ" : "Safe / Low Risk" },
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            {isBn ? "AI পাওয়ার্ড ইন্টেলিজেন্স" : "AI-Powered Intelligence"}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            {isBn ? (
              <>মিথ্যা সংবাদ + <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">ফিশিং URL</span> চেকার</>
            ) : (
              <>Fake News + <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Phishing URL</span> Checker</>
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            {isBn
              ? "আমাদের ডিপ লার্নিং মডেল ব্যবহার করে যেকোনো লেখা বা ওয়েবসাইটের লিঙ্কের প্রকৃতি বিশ্লেষণ করুন। সেকেন্ডের মধ্যে ফলাফল।"
              : "Analyze any text or URL using our Deep Learning model. Get instant detection for Fake News, Scams, and Phishing attempts."}
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 overflow-hidden shadow-2xl"
        >
          <div className="flex border-b border-slate-800 p-1 md:p-2">
            {[
              { id: "fakenews", label: isBn ? "মিথ্যা সংবাদ চেকার" : "Fake News Checker", icon: Megaphone, tag: "NLP + Cross-ref" },
              { id: "phishing", label: isBn ? "ফিশিং URL স্ক্যানার" : "Phishing Scanner", icon: Link, tag: "Heuristic + DB" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setFakeNewsResult(null);
                  setPhishingResult(null);
                }}
                className={`flex-1 flex md:flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:py-4 rounded-xl md:rounded-lg font-semibold text-sm md:text-base transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-inner"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <tab.icon className={`w-4 h-4 md:w-5 md:h-5" />
                <span>{tab.label}</span>
                <span className={`hidden md:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  activeTab === tab.id ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-slate-800/50 border-slate-700 text-slate-500"
                }`}>
                  {tab.tag}
                </span>
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTab === "fakenews" ? (
                <motion.div
                  key="fn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-fuchsia-400" />
                      {isBn ? "সংবাদের টেক্সট বা দাবিটি পেস্ট করুন:" : "Paste the news claim or text:"}
                    </span>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={5}
                      placeholder={isBn ? "যেমন: ১০০০ টাকা রিচার্জ দিলে ৫০০০ টাকা ইনকাম..." : "E.g., Free mobile recharge, Click to win iPhone..."}
                      className="w-full mt-2 p-4 rounded-xl bg-slate-950/60 border border-slate-700/60 text-white placeholder:text-slate-600 focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none transition-all resize-none font-medium"
                    />
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {[
                      isBn ? "প্রতিদিন এক কাপ পানি পান করলে ক্যানসার নিরাময় হয়" : "One cup of water daily cures cancer",
                      isBn ? "সেনাবাহিনীর নতুন নিয়োগ - ঘুষ দিয়ে চাকরি" : "Army new job circular - bribe for post",
                      isBn ? "কল দিন ১০০০ টাকা পান বিকাশে" : "Call now get 1000 Taka free bKash",
                      isBn ? "শ্রাবন্তী চট্টোপাধ্যায় ৫ বছরের জন্য গ্রেফতার" : "Celebrity arrested for 5 years",
                    ].map((sample, i) => (
                      <button
                        key={i}
                        onClick={() => setTextInput(sample)}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 transition-colors text-left"
                      >
                        {isBn ? "নমুনা:" : "Sample:"} {sample.slice(0, 40)}...
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={analyzeFakeNews}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 hover:from-fuchsia-500 hover:via-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg hover:shadow-fuchsia-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isBn ? "AI মডেল বিশ্লেষণ করছে..." : "Analyzing with AI Model..."}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {isBn ? "AI দিয়ে বিশ্লেষণ করুন (Verify)" : "Analyze Now with AI"}
                      </>
                    )}
                  </button>

                  {/* Fake News Result */}
                  <AnimatePresence>
                    {fakeNewsResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-xl border backdrop-blur-md ${verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.bg || "bg-slate-800/40"} ${verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.border || "border-slate-700"}`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        {(() => {
                          const S = verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"] || verdictStyles["UNVERIFIED"];
                          return (
                            <div className={`w-14 h-14 rounded-2xl ${S.bg} ${S.border} border-2 flex items-center justify-center flex-shrink-0`}>
                              <S.icon className={`w-7 h-7 ${S.text}`} />
                            </div>
                          );
                        })()}
                        <div className="flex-1">
                          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                            {isBn ? "AI ভেরডিক্ট" : "AI Verdict"}
                          </div>
                          <div className={`text-2xl md:text-3xl font-black mb-1 ${verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.text}`}>
                            {fakeNewsResult.verdict}
                          </div>
                          <div className="text-sm text-slate-400">
                            {isBn ? "কনফিডেন্স স্কোর:" : "Confidence Score:"} <span className="font-bold text-white">{fakeNewsResult.confidence}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2 max-w-xs">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${fakeNewsResult.confidence}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full ${verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.bg?.includes("red") ? "bg-red-500" : verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.bg?.includes("orange") ? "bg-orange-500" : verdictStyles[fakeNewsResult.verdict || "UNVERIFIED"]?.bg?.includes("yellow") ? "bg-yellow-500" : "bg-emerald-500"}`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{isBn ? "যাচাইকরণের বিবরণ:" : "Fact Check:"}</div>
                          <div className="text-sm md:text-base text-slate-200 font-medium leading-relaxed p-3 rounded-lg bg-slate-950/50 border border-slate-800/50">
                            {fakeNewsResult.fact_check}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{isBn ? "বিশ্লেষণের পদ্ধতি:" : "Detection Methods:"}</div>
                          <div className="flex flex-wrap gap-2">
                            {(fakeNewsResult.indicators || []).map((ind: string, i: number) => (
                              <span key={i} className="text-xs px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 font-medium">
                                ✓ {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                      <Link className="w-4 h-4 text-cyan-400" />
                      {isBn ? "যাচাই করতে চান এমন URL লিখুন:" : "Enter the URL to scan:"}
                    </span>
                    <div className="mt-2 relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">🔗</div>
                      <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder={isBn ? "জেমন: dbbl-secure-login.xyz বা http://103.xx.xx.xx/login" : "E.g. free-bkash-offer.xyz"}
                        className="w-full pl-10 pr-4 py-4 rounded-xl bg-slate-950/60 border border-slate-700/60 text-white placeholder:text-slate-600 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all font-mono text-sm"
                      />
                    </div>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "bkash-verification-24h.net",
                      "dbbl-limited-login.xyz",
                      "192.168.1.1/admin/login.php",
                      "gov-bd-covid-payment.info",
                    ].map((sample, i) => (
                      <button
                        key={i}
                        onClick={() => setUrlInput(sample)}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-600/50 transition-colors font-mono"
                      >
                        ⚠️ {sample.slice(0, 32)}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={analyzePhishing}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:via-sky-500 hover:to-blue-500 text-white font-bold shadow-lg hover:shadow-cyan-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isBn ? "URL স্ক্যান করা হচ্ছে..." : "Scanning URL Reputation..."}
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        {isBn ? "URL স্ক্যান করুন (Scan)" : "Scan URL for Phishing"}
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {phishingResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-6 rounded-xl border backdrop-blur-md ${
                          phishingResult.blacklisted ? "bg-red-500/10 border-red-500/40" : "bg-slate-800/40 border-slate-700"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                          <div className={`md:w-40 h-40 w-40 shrink-0 rounded-2xl flex items-center justify-center ${
                            phishSeverity[phishingResult.analysis?.severity || "Low"].bar
                          } bg-opacity-10 border-4 border-dashed border-slate-800 relative`}>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="42" stroke="#1e293b" strokeWidth="8" fill="none" />
                              <motion.circle
                                initial={{ strokeDashoffset: 264 }}
                                animate={{ strokeDashoffset: 264 - (264 * (phishingResult.analysis?.score || 0)) / 100 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                cx="50" cy="50" r="42"
                                stroke="currentColor" strokeWidth="8" fill="none"
                                strokeLinecap="round"
                                className={phishSeverity[phishingResult.analysis?.severity || "Low"].bg}
                                style={{ strokeDasharray: 264, transform: "rotate(-90deg)", transformOrigin: "center" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className={`text-3xl font-black text-white">
                                {phishingResult.analysis?.score || 0}
                              </div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                                RISK
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                              {isBn ? "URL স্ক্যান রেজাল্ট" : "SCAN RESULT"}
                            </div>
                            <div className={`text-xl md:text-2xl font-black text-white mb-1 break-all">
                              {phishingResult.url}
                            </div>
                            <div className={`inline-flex items-center gap-2 mb-2`}>
                              <span className={`text-lg font-black ${phishSeverity[phishingResult.analysis?.severity || "Low"].bg}`}>
                                {phishSeverity[phishingResult.analysis?.severity || "Low"].label}
                              </span>
                              {phishingResult.blacklisted && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase">
                                  ⛔ {isBn ? "ব্ল্যাকলিস্টেড" : "BLACKLISTED"}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 font-mono">
                              {isBn ? "স্ক্যান সময়:" : "Scanned at:"} {phishingResult.scanned_at}
                            </div>
                          </div>
                        </div>

                        {(phishingResult.analysis?.tags?.length > 0) && (
                          <div className="mb-4">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                              {isBn ? "সন্দেহজনক কারণসমূহ (Suspicious Indicators):" : "Suspicious Indicators:"}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {phishingResult.analysis.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
                                  🚩 {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            {isBn ? "সুরক্ষিত থাকার জন্য পদক্ষেপসমূহ:" : "Safety Recommendations:"}
                          </div>
                          <ul className="space-y-2">
                            {(phishingResult.recommendations || []).map((rec: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
