"use client";

import { motion } from "framer-motion";
import { ShieldAlert, TrendingUp, Info, Scale } from "lucide-react";

export default function JulyUprisingExpose() {
  return (
    <div className="july-uprising-expose mt-40 mb-20 relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blood/5 blur-[120px] rounded-full -z-10" />
      
      <div className="chapter-header mb-16 relative before:content-['INVESTIGATION'] before:absolute before:-top-6 before:left-0 before:font-mono before:text-[0.6rem] before:text-blood/50 before:tracking-[0.5em]">
        <div className="chapter-kicker font-mono text-[0.65rem] tracking-[0.4em] uppercase text-blood mb-5 flex items-center gap-5 before:content-['SPECIAL'] before:text-[0.55rem] before:text-white before:bg-blood before:px-2 before:py-1">
          জুলাই ২০২৪ বিশেষ ইনভেস্টিগেশন
        </div>
        <h2 className="chapter-title text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[1] mb-6 tracking-tight">
          জুলাই গণহত্যা: <span className="text-blood">ন্যায়বিচারের পথে বাংলাদেশ</span>
        </h2>
        <p className="chapter-sub text-[1.2rem] text-text-dim font-light italic max-w-[900px] leading-relaxed">
          ২০২৪ সালের জুলাই-আগস্টের ছাত্র-জনতার অভ্যুত্থানে সংঘটিত প্রতিটি হত্যাকাণ্ডের বিচারিক অগ্রগতি এবং তথ্যপ্রমাণ সংরক্ষণের জন্য এই বিশেষ মডিউল।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics & Impact */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-blood/20 p-8 hover:bg-surface2 transition-all">
            <div className="flex items-center gap-4 mb-6 text-blood">
              <ShieldAlert size={32} />
              <h4 className="text-xl font-bold uppercase tracking-widest">মোট হতাহত</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-border pb-2">
                <span className="text-text-dim text-sm">নিহত (প্রাথমিক তথ্য)</span>
                <span className="text-2xl font-bold font-mono text-blood">১,০০০+</span>
              </div>
              <div className="flex justify-between items-end border-b border-border pb-2">
                <span className="text-text-dim text-sm">আহত ও পঙ্গুত্ব বরণকারী</span>
                <span className="text-xl font-bold font-mono text-white">২০,০০০+</span>
              </div>
              <div className="flex justify-between items-end border-b border-border pb-2">
                <span className="text-text-dim text-sm">দৃষ্টিশক্তি হারিয়েছেন</span>
                <span className="text-xl font-bold font-mono text-white">৪৫০+</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border p-8 hover:bg-surface2 transition-all">
            <div className="flex items-center gap-4 mb-6 text-teal">
              <Scale size={32} />
              <h4 className="text-xl font-bold uppercase tracking-widest">বিচারিক অগ্রগতি</h4>
            </div>
            <div className="space-y-4 text-sm text-text-dim leading-relaxed">
              <p className="flex gap-3">
                <span className="text-teal font-bold">✓</span> 
                আন্তর্জাতিক অপরাধ ট্রাইব্যুনালে (ICT) তদন্ত চলমান।
              </p>
              <p className="flex gap-3">
                <span className="text-teal font-bold">✓</span> 
                জাতিসংঘের (UN) তথ্যানুসন্ধান কমিটির রিপোর্ট প্রক্রিয়াধীন।
              </p>
              <p className="flex gap-3">
                <span className="text-teal font-bold">✓</span> 
                জুলাই স্মৃতি ফাউন্ডেশনের মাধ্যমে ক্ষতিগ্রস্তদের সহায়তা কার্যক্রম।
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blood/5 border border-blood p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blood/10 rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform" />
          <TrendingUp className="text-blood mb-6" size={48} />
          <h3 className="text-2xl font-bold text-white mb-4">তথ্য দিন, বিচার নিশ্চিত করুন</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-8">
            আপনার কাছে যদি জুলাই ২০২৪-এর কোনো ভিডিও, অডিও বা নথিপত্র থাকে যা বিচারে সাহায্য করতে পারে, তবে তা আমাদের এনক্রিপ্টেড পোর্টালে জমা দিন।
          </p>
          <button 
            onClick={() => window.location.href='/submit'}
            className="w-full bg-blood text-white py-4 font-mono font-bold uppercase tracking-widest hover:bg-blood/80 transition-all shadow-xl shadow-blood/20 text-center"
          >
            Submit Evidence →
          </button>
        </div>
      </div>

      <div className="mt-12 bg-surface2 border border-border p-6 flex items-center gap-4 text-text-faint italic text-sm">
        <Info size={20} className="text-blood shrink-0" />
        <p>সতর্কবার্তা: এই তথ্যগুলো বিভিন্ন হিউম্যান রাইটস অর্গানাইজেশন এবং সরকারি প্রাথমিক তালিকার ওপর ভিত্তি করে তৈরি। চূড়ান্ত সংখ্যা তদন্ত সাপেক্ষে পরিবর্তনশীল।</p>
      </div>

      {/* Featured July Case */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border-l-4 border-blood p-6">
          <h5 className="text-white font-bold mb-2">আবু সাঈদ হত্যাকাণ্ড (রংপুর)</h5>
          <p className="text-xs text-text-dim leading-relaxed mb-4">বেগম রোকেয়া বিশ্ববিদ্যালয়ের শিক্ষার্থী আবু সাঈদকে সরাসরি বুকে গুলি করার ভিডিও প্রমাণ বিশ্বজুড়ে আলোড়ন সৃষ্টি করে। বর্তমানে মামলাটি ICT-তে তদন্তাধীন।</p>
          <div className="flex justify-between items-center">
            <span className="text-[0.6rem] font-mono text-blood uppercase tracking-widest">Status: Under Investigation</span>
            <span className="text-[0.6rem] font-mono text-text-faint">Rangpur · July 16, 2024</span>
          </div>
        </div>
        <div className="bg-surface border-l-4 border-blood p-6">
          <h5 className="text-white font-bold mb-2">যাত্রাবাড়ী ও উত্তরা গণহত্যা</h5>
          <p className="text-xs text-text-dim leading-relaxed mb-4">জুলাইয়ের মাঝামাঝি সময়ে ঢাকার যাত্রাবাড়ী এবং উত্তরা এলাকায় সাধারণ শিক্ষার্থীদের ওপর নির্বিচারে গুলিবর্ষণের অসংখ্য ভিডিও ফুটেজ এবং সাক্ষী সংরক্ষিত আছে।</p>
          <div className="flex justify-between items-center">
            <span className="text-[0.6rem] font-mono text-blood uppercase tracking-widest">Status: Archiving Evidence</span>
            <span className="text-[0.6rem] font-mono text-text-faint">Dhaka · July 18-20, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
