"use client";

import { useState } from "react";
import { X, Send, ShieldCheck, Upload } from "lucide-react";

export default function ReportForm({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Report submitted successfully via Encrypted Channel!');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-surface border border-border w-full max-w-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="text-blood font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
            <ShieldCheck size={12} className={isSubmitting ? "animate-spin" : ""} /> 
            {isSubmitting ? "Encrypting Data..." : "Encrypted Submission"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{title} — অভিযোগ ফরম</h2>
          <p className="text-text-dim text-sm italic">আপনার তথ্য সম্পূর্ণ গোপন রাখা হবে। কোনো ব্যক্তিগত তথ্য (নাম, ফোন) দেয়া বাধ্যতামূলক নয়।</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">জেলা (District)</label>
              <input 
                type="text" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                placeholder="যেমন: ঢাকা"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">থানা (Thana)</label>
              <input 
                type="text" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                placeholder="যেমন: রমনা"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">তারিখ (Date)</label>
              <input 
                type="date" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">অভিযুক্তের তথ্য (Accused Details - Optional)</label>
            <input 
              type="text" 
              className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
              placeholder="নাম, পদবী বা কোনো বিশেষ পরিচয় থাকলে লিখুন..."
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">ঘটনার বর্ণনা (Description)</label>
            <textarea 
              className="w-full bg-bg border border-border p-4 text-text text-sm focus:border-blood outline-none min-h-[150px] transition-colors"
              placeholder="ঘটনাটি বিস্তারিত লিখুন (কী ঘটেছিল, কীভাবে ঘটেছিল)..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">প্রমাণ আপলোড (Evidence)</label>
            <div className="border-2 border-dashed border-border p-8 text-center group hover:border-blood transition-colors cursor-pointer">
              <Upload className="mx-auto text-text-faint mb-2 group-hover:text-blood transition-colors" />
              <p className="text-xs text-text-dim">ছবি, ভিডিও বা অডিও ফাইল ড্রপ করুন (Max 50MB)</p>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-border text-text-faint' : 'bg-blood hover:bg-blood/90'} text-white py-4 font-mono text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all`}
            >
              <Send size={16} className={isSubmitting ? "animate-pulse" : ""} /> 
              {isSubmitting ? "Processing Secure Upload..." : "Submit Anonymous Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
