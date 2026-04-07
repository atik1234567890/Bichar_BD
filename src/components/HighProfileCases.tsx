"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, FileText, AlertCircle } from "lucide-react";

export default function HighProfileCases() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighProfile() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const response = await fetch(`${API_URL}/api/incidents?status=high_profile&limit=6`);
        const result = await response.json();
        if (result.success) {
          setCases(result.data);
        }
      } catch (error) {
        console.error("Error fetching high profile cases:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHighProfile();
  }, []);

  return (
    <section className="high-profile-section mt-24">
      <div className="chapter-header mb-12">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-blood mb-3 flex items-center gap-4 before:content-['VERIFIED'] before:text-[0.5rem] before:text-white before:bg-blood before:px-1.5 before:py-0.5">
          হাই-প্রোফাইল মামলা
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-4">
          গুরুত্বপূর্ণ ও সংবেদনশীল মামলাসমূহ
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic max-w-[800px]">
          এই মামলাগুলো যাচাইকৃত সংবাদ উৎস থেকে সংগৃহীত। প্রতিটি মামলায় সংবাদের সূত্র এবং বিচারিক নথিপত্রের লিঙ্ক দেওয়া আছে।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="highProfileCases">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-surface border border-border animate-pulse" />
          ))
        ) : cases.length > 0 ? (
          cases.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-surface border border-border p-8 hover:border-blood/50 transition-all group"
            >
              <div className="flex items-center gap-2 mb-6 text-blood">
                <ShieldAlert size={18} />
                <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em]">High Profile</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blood transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-text-dim leading-relaxed mb-6 line-clamp-3">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                <span className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
                  {item.district}
                </span>
                <a 
                  href={item.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[0.6rem] font-mono text-text-faint hover:text-white transition-colors uppercase"
                >
                  Source <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-surface border border-border border-dashed">
            <AlertCircle className="mx-auto text-text-faint mb-4" size={32} />
            <p className="text-text-dim font-mono text-sm italic">বর্তমানে কোনো হাই-প্রোফাইল মামলা নথিভুক্ত নেই</p>
          </div>
        )}
      </div>
    </section>
  );
}
