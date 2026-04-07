import { Github, Linkedin, Facebook, MessageSquare, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="page-footer p-12 md:p-20 bg-surface border-t border-border mt-24 no-print">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left">
          <div className="space-y-6">
            <div className="pf-title font-bangla text-3xl font-bold text-white leading-tight">
              বিচারের জন্য <em className="text-blood not-italic">সংগ্রাম</em>
            </div>
            <p className="text-sm text-text-dim font-bangla leading-relaxed">
              BicharBD ১৯৭১ সাল থেকে বর্তমান সময় পর্যন্ত বাংলাদেশের প্রতিটি গুরুত্বপূর্ণ বিচারিক তথ্য এবং মানবাধিকার লঙ্ঘনের ঘটনা সংগ্রহ ও যাচাই করে থাকে। এটি একটি স্বাধীন এবং নিরপেক্ষ আর্কাইভ।
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:contact@bicharbd.com" className="flex items-center gap-3 text-sm text-text-dim hover:text-blood transition-colors">
                <Mail size={16} /> contact@bicharbd.com (email only)
              </a>
              <div className="flex items-center gap-3 text-sm text-text-dim">
                <Github size={16} /> github.com/bicharbd
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white text-blood">Legal Disclaimer</h4>
            <p className="text-[0.7rem] text-text-dim font-bangla leading-relaxed border-l border-blood/30 pl-4 italic">
              BicharBD সকল তথ্য যাচাইকৃত সংবাদ উৎস থেকে সংগ্রহ করে। সকল অভিযুক্ত ব্যক্তি আইনের দৃষ্টিতে নির্দোষ যতক্ষণ না আদালত দোষী সাব্যস্ত করে। Community report গুলো স্পষ্টভাবে Unverified হিসেবে চিহ্নিত করা হয়।
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="pf-mono font-mono text-[0.6rem] tracking-[0.25em] text-text-faint uppercase">
            © 2026 BicharBD — Justice for all in Bangladesh
          </div>
          <div className="text-[0.6rem] font-mono text-text-faint uppercase tracking-widest">
            Developed by <span className="text-blood">Md Atikur Rahman</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
