"use client";

import { useState } from "react";
import { Search, UserX, Gavel, Landmark, MapPin, CheckCircle2, AlertTriangle, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { politicianProfiles } from "@/lib/data";

export default function PoliticianTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPolitician, setSelectedPolitician] = useState<typeof politicianProfiles[0] | null>(null);

  const filteredPoliticians = politicianProfiles.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="politician-tracker mt-24">
      <div className="chapter-header mb-10">
        <div className="chapter-kicker font-mono text-[0.6rem] tracking-[0.3em] uppercase text-text-faint mb-3 flex items-center gap-4 before:content-['06'] before:text-[0.5rem] before:text-blood before:border before:border-blood/30 before:px-1.5 before:py-0.5">
          নেতা ও মন্ত্রী ট্র্যাকার
        </div>
        <h2 className="chapter-title text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-[1.1] mb-2">
          রাজনৈতিক ব্যক্তিদের সম্পদ ও মামলার চিত্র
        </h2>
        <p className="chapter-sub text-[1rem] text-text-dim font-light italic">
          জনপ্রতিনিধিদের ঘোষিত এবং অঘোষিত সম্পদের তুলনামূলক বিশ্লেষণ ও মামলার তথ্য
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-faint" size={20} />
        <input 
          type="text"
          placeholder="মন্ত্রী বা নেতার নাম লিখে সার্চ করুন..."
          className="w-full bg-surface border border-border pl-12 pr-4 py-5 text-text focus:border-blood outline-none transition-all text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoliticians.map((p) => (
          <motion.div 
            key={p.id}
            layoutId={`politician-${p.id}`}
            onClick={() => setSelectedPolitician(p)}
            className="bg-surface border border-border p-6 cursor-pointer group hover:border-blood transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-bg border border-border flex items-center justify-center text-blood group-hover:bg-blood/10 transition-colors">
                <UserX size={24} />
              </div>
              <div className="text-[0.6rem] font-mono text-blood border border-blood px-2 py-1 uppercase tracking-widest">
                {p.status}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blood transition-colors">{p.name}</h3>
            <p className="text-sm text-text-dim mb-4">{p.role}</p>
            
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between text-[0.75rem] font-mono">
                <span className="text-text-faint">মোট মামলা:</span>
                <span className="text-blood font-bold">{p.cases} টি</span>
              </div>
              <div className="flex items-center justify-between text-[0.75rem] font-mono">
                <span className="text-text-faint">আনুমানিক সম্পদ:</span>
                <span className="text-white">{p.assets.split(' ')[1]} {p.assets.split(' ')[2]}</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-[0.65rem] font-mono text-blood uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              বিস্তারিত প্রোফাইল দেখুন <ChevronRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPolitician && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPolitician(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`politician-${selectedPolitician.id}`}
              className="relative bg-surface border border-border w-full max-w-3xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedPolitician(null)}
                className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="text-blood font-mono text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                  Verified Profile — {selectedPolitician.status}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedPolitician.name}</h2>
                <p className="text-text-dim text-lg">{selectedPolitician.role}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="bg-bg border border-border p-6">
                    <div className="flex items-center gap-3 mb-4 text-blood">
                      <Landmark size={20} />
                      <span className="font-mono text-[0.7rem] uppercase tracking-widest">সম্পদ ও অর্থ (Assets)</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-text-faint text-[0.6rem] uppercase mb-1">মোট আনুমানিক সম্পদ</div>
                        <div className="text-2xl font-bold text-white">{selectedPolitician.assets}</div>
                      </div>
                      <div>
                        <div className="text-text-faint text-[0.6rem] uppercase mb-1">বিদেশী সম্পদ</div>
                        <div className="text-sm text-text">{selectedPolitician.overseasAssets}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-bg border border-border p-6">
                    <div className="flex items-center gap-3 mb-4 text-blood">
                      <Gavel size={20} />
                      <span className="font-mono text-[0.7rem] uppercase tracking-widest">মামলা ও চার্জ (Legal Status)</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-text-faint text-[0.6rem] uppercase mb-1">মোট মামলার সংখ্যা</div>
                        <div className="text-2xl font-bold text-blood">{selectedPolitician.cases} টি</div>
                      </div>
                      <div>
                        <div className="text-text-faint text-[0.6rem] uppercase mb-1">প্রধান অভিযোগসমূহ</div>
                        <div className="text-sm text-text">{selectedPolitician.majorCharges}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bg border border-border p-6 mb-8">
                <div className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest mb-4">তথ্য যাচাইকারী (Verified By)</div>
                <div className="flex flex-wrap gap-3">
                  {(selectedPolitician.verifiedBy as string[]).map((v: string, i: number) => (
                    <span key={i} className="flex items-center gap-2 bg-blood/10 border border-blood/30 px-3 py-1.5 text-[0.75rem] text-blood font-mono">
                      <CheckCircle2 size={14} /> {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center p-6 border border-dashed border-border text-text-faint italic text-sm">
                "এই তথ্যসমূহ গণমাধ্যমের অনুসন্ধানী প্রতিবেদন এবং দুর্নীতি দমন কমিশনের চার্জশিট থেকে সংগ্রহ করা হয়েছে।"
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
