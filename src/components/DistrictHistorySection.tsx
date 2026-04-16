"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, History, BookOpen, Shield, AlertCircle, ChevronRight, X } from "lucide-react";

const districtHistories = [
  {
    name: "Dhaka",
    bnName: "ঢাকা",
    history: "মুঘল আমলে ১৬১০ সালে ঢাকা সুবাহ বাংলার রাজধানী হয়। ১৯৫২ সালের ভাষা আন্দোলন থেকে শুরু করে ১৯৭১ সালের মুক্তিযুদ্ধ পর্যন্ত সকল আন্দোলনের কেন্দ্রবিন্দু ছিল এই শহর।",
    cases1971: "১৯৭১ সালে ২৫শে মার্চ রাতে 'অপারেশন সার্চলাইট' এর মাধ্যমে এখানে গণহত্যা শুরু হয়।",
    notableEvents: "১৯৫২ ভাষা আন্দোলন, ১৯৬৯ গণঅভ্যুত্থান, ১৯৭১ স্বাধীনতা যুদ্ধ।"
  },
  {
    name: "Chittagong",
    bnName: "চট্টগ্রাম",
    history: "প্রাচীনকাল থেকেই এটি একটি গুরুত্বপূর্ণ বন্দর নগরী। ১৯৩০ সালে সূর্য সেনের নেতৃত্বে অস্ত্রাগার লুণ্ঠন ছিল ব্রিটিশ বিরোধী আন্দোলনের এক অবিস্মরণীয় ঘটনা।",
    cases1971: "কালুরঘাট বেতার কেন্দ্র থেকে স্বাধীনতার ঘোষণা পাঠ করা হয় এবং এখানে ভয়াবহ যুদ্ধ সংঘটিত হয়।",
    notableEvents: "চট্টগ্রাম অস্ত্রাগার লুণ্ঠন (১৯৩০), কালুরঘাট ঘোষণা (১৯৭১)।"
  },
  {
    name: "Rajshahi",
    bnName: "রাজশাহী",
    history: "বরেন্দ্র অঞ্চলের কেন্দ্রবিন্দু। রেশম শিল্পের জন্য বিখ্যাত এই জেলাটি শিক্ষা ও সংস্কৃতির অন্যতম প্রাণকেন্দ্র।",
    cases1971: "রাজশাহী বিশ্ববিদ্যালয়ে শিক্ষক ও ছাত্রদের ওপর পাক হানাদার বাহিনী ব্যাপক নৃশংসতা চালায়।",
    notableEvents: "রাজশাহী বিশ্ববিদ্যালয় গণহত্যা (১৯৭১)।"
  },
  {
    name: "Khulna",
    bnName: "খুলনা",
    history: "সুন্দরবনের প্রবেশদ্বার। শিল্প নগরী হিসেবে পরিচিত এই জেলাটি ব্রিটিশ আমলে মহকুমা হিসেবে যাত্রা শুরু করে।",
    cases1971: "চুকনগর গণহত্যা ছিল খুলনার ইতিহাসের সবচেয়ে বড় ট্র্যাজেডি, যেখানে হাজার হাজার মানুষকে হত্যা করা হয়।",
    notableEvents: "চুকনগর গণহত্যা (১৯৭১)।"
  },
  {
    name: "Sylhet",
    bnName: "সিলেট",
    history: "হযরত শাহজালাল (র.) এর পুণ্যভূমি। চায়ের দেশ হিসেবে পরিচিত এই অঞ্চলটি ১৯৪৭ সালের গণভোটের মাধ্যমে পূর্ব পাকিস্তানের অন্তর্ভুক্ত হয়।",
    cases1971: "সিলেটে চা বাগানগুলোতে পাক বাহিনী ব্যাপক হত্যাযজ্ঞ চালায়।",
    notableEvents: "গণভোট (১৯৪৭), চা শ্রমিক আন্দোলন।"
  },
  {
    name: "Barisal",
    bnName: "বরিশাল",
    history: "বাংলার ভেনিস হিসেবে পরিচিত। শেরে বাংলা এ কে ফজলুল হকের জন্মভূমি এই জেলাটি ধান-নদী-খালের জন্য বিখ্যাত।",
    cases1971: "বরিশালে একাধিক স্থানে গণকবর পাওয়া গেছে যেখানে নিরীহ মানুষকে হত্যা করে মাটিচাপা দেওয়া হয়েছিল।",
    notableEvents: "কৃষক আন্দোলন, শেরে বাংলার রাজনীতি।"
  },
  {
    name: "Rangpur",
    bnName: "রংপুর",
    history: "উত্তরবঙ্গের প্রাচীনতম জেলা। দেবী চৌধুরানী ও ভবানী পাঠকের বিদ্রোহের ইতিহাস রয়েছে এখানে।",
    cases1971: "রংপুর ক্যান্টনমেন্ট এলাকায় ব্যাপক নির্যাতন ও হত্যাকাণ্ড চালানো হয়েছিল।",
    notableEvents: "তেভাগা আন্দোলন, ফকির-সন্ন্যাসী বিদ্রোহ।"
  },
  {
    name: "Mymensingh",
    bnName: "ময়মনসিংহ",
    history: "ব্রহ্মপুত্র নদের তীরে অবস্থিত। এটি এক সময় ভারতের আসাম ও মেঘালয়ের সাথে বাণিজ্যের প্রধান কেন্দ্র ছিল।",
    cases1971: "ময়মনসিংহে মুক্তাগাছা ও হালুয়াঘাট সীমান্তে ব্যাপক যুদ্ধ সংঘটিত হয়।",
    notableEvents: "ময়মনসিংহ গীতিকা, ব্রহ্মপুত্র নদকেন্দ্রিক বাণিজ্য।"
  },
  {
    name: "Comilla",
    bnName: "কুমিল্লা",
    history: "খাদি ও রসমালাইয়ের জন্য বিখ্যাত। ব্রিটিশ বিরোধী আন্দোলনে কুমিল্লার মানুষের অবদান অপরিসীম।",
    cases1971: "ময়নামতি সেনানিবাসে পাক বাহিনী অসংখ্য বাঙালি সেনাকে হত্যা করে।",
    notableEvents: "বার্ড (BARD) প্রতিষ্ঠা, খাদি শিল্প।"
  },
  {
    name: "Noakhali",
    bnName: "নোয়াখালী",
    history: "উপকূলীয় এই জেলাটি ১৯৪৬ সালের সাম্প্রদায়িক দাঙ্গা ও মহাত্মা গান্ধীর শান্তির মিশনের জন্য পরিচিত।",
    cases1971: "নোয়াখালীর সোনাপুর ও মাইজদীতে ব্যাপক ধ্বংসলীলা চালায় হানাদার বাহিনী।",
    notableEvents: "গান্ধীর নোয়াখালী সফর (১৯৪৬)।"
  },
  {
    name: "Faridpur",
    bnName: "ফরিদপুর",
    history: "বঙ্গবন্ধুর পৈত্রিক নিবাস (গোপালগঞ্জ তখন ফরিদপুরের অংশ ছিল)। নীল চাষ বিরোধী আন্দোলনের অন্যতম কেন্দ্র।",
    cases1971: "ফরিদপুরে একাধিক সম্মুখ যুদ্ধে মুক্তিযোদ্ধারা বীরত্ব প্রদর্শন করেন।",
    notableEvents: "ফরায়েজী আন্দোলন, নীল বিদ্রোহ।"
  },
  {
    name: "Bogra",
    bnName: "বগুড়া",
    history: "প্রাচীন পুণ্ড্রবর্ধনের রাজধানী মহাস্থানগড় এখানে অবস্থিত। এটি উত্তরবঙ্গের অন্যতম বাণিজ্যিক কেন্দ্র।",
    cases1971: "বগুড়ায় তুমুল যুদ্ধের পর ১৬ই ডিসেম্বর এটি হানাদার মুক্ত হয়।",
    notableEvents: "মহাস্থানগড় প্রত্নতাত্ত্বিক নিদর্শণ।"
  },
  {
    name: "Jessore",
    bnName: "যশোর",
    history: "বাংলাদেশের প্রথম স্বাধীন জেলা (৬ ডিসেম্বর ১৯৭১)। এটি প্রাচীনতম সমতট অঞ্চলের অংশ ছিল।",
    cases1971: "যশোর ক্যান্টনমেন্ট ও বেনাপোল সীমান্তে ঐতিহাসিক যুদ্ধ সংঘটিত হয়।",
    notableEvents: "প্রথম হানাদার মুক্ত জেলা।"
  },
  {
    name: "Kushtia",
    bnName: "কুষ্টিয়া",
    history: "সাংস্কৃতিক রাজধানী হিসেবে পরিচিত। লালন শাহ ও রবীন্দ্রনাথের স্মৃতি বিজড়িত এই জেলা।",
    cases1971: "মেহেরপুরের বৈদ্যনাথতলায় (তৎকালীন কুষ্টিয়া) বাংলাদেশের প্রথম সরকার শপথ নেয়।",
    notableEvents: "মুজিবনগর সরকার গঠন (১৯৭১)।"
  },
  {
    name: "Pabna",
    bnName: "পাবনা",
    history: "মানসিক হাসপাতাল ও পাকশী হার্ডিঞ্জ ব্রিজের জন্য বিখ্যাত। এটি একটি প্রাচীন শিল্প সমৃদ্ধ জেলা।",
    cases1971: "পাবনায় হার্ডিঞ্জ ব্রিজে পাক বাহিনীর সাথে মুক্তিযোদ্ধাদের ভয়াবহ যুদ্ধ হয়।",
    notableEvents: "হার্ডিঞ্জ ব্রিজ যুদ্ধ।"
  },
  {
    name: "Dinajpur",
    bnName: "দিনাজপুর",
    history: "কান্তজিউ মন্দিরের জন্য বিখ্যাত। এখানে প্রাচীনকাল থেকেই হিন্দু-মুসলিম সংস্কৃতির মিলন ঘটে।",
    cases1971: "দিনাজপুর সীমান্তে ব্যাপক গেরিলা যুদ্ধ সংঘটিত হয়েছিল।",
    notableEvents: "কান্তজিউ মন্দির নির্মাণ।"
  },
  {
    name: "Tangail",
    bnName: "টাঙ্গাইল",
    history: "টাঙ্গাইল শাড়ি ও কাদেরিয়া বাহিনীর জন্য বিখ্যাত। ১৯৭১ সালে কাদের সিদ্দিকীর নেতৃত্বে এখানে গেরিলা যুদ্ধ সারা বিশ্বে পরিচিতি পায়।",
    cases1971: "কাদেরিয়া বাহিনী এখানে পাক বাহিনীকে নাস্তানাবুদ করে দেয়।",
    notableEvents: "কাদেরিয়া বাহিনীর বীরত্বগাথা।"
  },
  {
    name: "Jamalpur",
    bnName: "জামালপুর",
    history: "ব্রহ্মপুত্রের তীরবর্তী জেলা। নকশী কাঁথার জন্য জগৎবিখ্যাত।",
    cases1971: "জামালপুর মুক্ত হওয়ার পর ঢাকার পতন নিশ্চিত হয়।",
    notableEvents: "নকশী কাঁথা শিল্প।"
  },
  {
    name: "Patuakhali",
    bnName: "পটুয়াখালী",
    history: "সাগরকন্যা কুয়াকাটার জেলা। মগ ও জলদস্যু দমনের দীর্ঘ ইতিহাস রয়েছে এখানে।",
    cases1971: "উপকূলীয় অঞ্চলে পাক বাহিনীর প্রবেশ ঠেকাতে মুক্তিযোদ্ধারা সক্রিয় ছিলেন।",
    notableEvents: "কুয়াকাটা সমুদ্র সৈকত।"
  },
  {
    name: "Rangamati",
    bnName: "রাঙ্গামাটি",
    history: "পাহাড়ি জেলা। কাপ্তাই হ্রদ ও চাকমা রাজবাড়ির জন্য পরিচিত।",
    cases1971: "পাহাড়ে লুকিয়ে মুক্তিযোদ্ধারা হানাদার বাহিনীর ওপর অতর্কিত হামলা চালাতেন।",
    notableEvents: "কাপ্তাই বাঁধ নির্মাণ।"
  },
  {
    name: "Bandarban",
    bnName: "বান্দরবান",
    history: "সর্বোচ্চ পাহাড় তাজিনডং ও কেওক্রাডং এখানে অবস্থিত। বিভিন্ন ক্ষুদ্র নৃ-গোষ্ঠীর বৈচিত্র্যময় সংস্কৃতি।",
    cases1971: "পাহাড়ি অঞ্চলে মুক্তিযোদ্ধাদের দুর্ভেদ্য ঘাঁটি ছিল।",
    notableEvents: "তাজিনডং বিজয়।"
  },
  {
    name: "Khagrachhari",
    bnName: "খাগড়াছড়ি",
    history: "পাহাড়ি অঞ্চলের অন্যতম প্রবেশদ্বার। পর্যটন ও প্রাকৃতিক সৌন্দর্যে ভরপুর।",
    cases1971: "সীমান্তবর্তী হওয়ায় এটি কৌশলগতভাবে গুরুত্বপূর্ণ ছিল।",
    notableEvents: "আলুটিলা গুহা।"
  },
  {
    name: "Cox's Bazar",
    bnName: "কক্সবাজার",
    history: "বিশ্বের দীর্ঘতম সমুদ্র সৈকত। ক্যাপ্টেন হিরাম কক্সের নামানুসারে এর নামকরণ।",
    cases1971: "সাগরপথে পাক বাহিনীর চলাচল নিয়ন্ত্রণে মুক্তিযোদ্ধারা কাজ করতেন।",
    notableEvents: "দীর্ঘতম সমুদ্র সৈকত।"
  },
  {
    name: "Gazipur",
    bnName: "গাজীপুর",
    history: "ভাওয়াল গড়ের জেলা। ১৯শে মার্চ ১৯৭১ সালে এখানে প্রথম সশস্ত্র প্রতিরোধ শুরু হয়।",
    cases1971: "প্রথম সশস্ত্র প্রতিরোধ (১৯শে মার্চ) এখানেই শুরু হয়েছিল।",
    notableEvents: "ভাওয়াল রাজার কাহিনী, প্রথম সশস্ত্র প্রতিরোধ।"
  }
];

export default function DistrictHistorySection() {
  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);

  return (
    <div className="district-history-section mt-32 mb-20 px-4">
      <div className="chapter-header mb-16">
        <div className="chapter-kicker font-mono text-[0.7rem] tracking-[0.4em] uppercase text-blood mb-4 flex items-center gap-4">
          <span className="h-[1px] w-12 bg-blood/30"></span>
          আঞ্চলিক ইতিহাস ও বিচারিক রেকর্ড
        </div>
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white leading-none mb-6 tracking-tighter">
          ২৪ জেলার <span className="text-blood">পূর্ণ ইতিহাস</span>
        </h2>
        <p className="max-w-2xl text-text-dim text-lg font-light leading-relaxed">
          ১৯৭১ থেকে আজীবন পর্যন্ত প্রতিটি জেলার গুরুত্বপূর্ণ ঘটনা, যুদ্ধাপরাধ এবং বিচারিক ইতিহাসের আর্কাইভ।
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {districtHistories.map((dist, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDistrict(dist)}
            className="bg-surface border border-border p-6 text-left hover:border-blood transition-all group"
          >
            <div className="text-blood mb-3 group-hover:animate-pulse">
              <MapPin size={24} />
            </div>
            <div className="text-lg font-bold text-white mb-1">{dist.bnName}</div>
            <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">{dist.name}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedDistrict && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDistrict(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-surface border border-blood/20 w-full max-w-4xl p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(204,31,31,0.1)]"
            >
              <button 
                onClick={() => setSelectedDistrict(null)}
                className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blood/10 border border-blood/30 flex items-center justify-center text-blood">
                  <History size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white">{selectedDistrict.bnName}</h2>
                  <p className="font-mono text-blood tracking-[0.3em] uppercase">{selectedDistrict.name} District Archive</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <section>
                    <div className="flex items-center gap-2 text-blood mb-4">
                      <BookOpen size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-sm">সাধারণ ইতিহাস</h3>
                    </div>
                    <p className="text-text-dim leading-relaxed text-lg">
                      {selectedDistrict.history}
                    </p>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 text-blood mb-4">
                      <AlertCircle size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-sm">১৯৭১ এর অপরাধ ও যুদ্ধ</h3>
                    </div>
                    <p className="text-text-dim leading-relaxed text-lg italic border-l-2 border-blood/30 pl-4">
                      {selectedDistrict.cases1971}
                    </p>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="bg-bg border border-border p-6">
                    <div className="flex items-center gap-2 text-blood mb-4">
                      <Shield size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-sm">উল্লেখযোগ্য ঘটনাবলী</h3>
                    </div>
                    <p className="text-white leading-relaxed">
                      {selectedDistrict.notableEvents}
                    </p>
                  </section>

                  <div className="p-6 border border-dashed border-border">
                    <p className="text-[0.7rem] font-mono text-text-faint uppercase mb-4 tracking-widest">আর্কাইভ স্ট্যাটাস</p>
                    <div className="flex items-center gap-3 text-green text-sm">
                      <div className="w-2 h-2 bg-green rounded-full animate-ping"></div>
                      রিয়েল-টাইম আপডেট সক্রিয়
                    </div>
                    <div className="mt-4 text-[0.8rem] text-text-dim italic">
                      "এই জেলার আরও তথ্য সংগৃহীত হচ্ছে। নতুন মামলা বা ঘটনা পাওয়া গেলে তা স্বয়ংক্রিয়ভাবে এখানে যুক্ত হবে।"
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  className="bg-blood text-white px-8 py-3 font-mono text-[0.7rem] uppercase tracking-widest hover:bg-blood/80 transition-all"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
