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
              BicharBD তথ্য সংগ্রহ করে যাচাইকৃত সংবাদ উৎস থেকে। 
              সকল অভিযুক্ত আইনের চোখে নির্দোষ যতক্ষণ না আদালত 
              দোষী সাব্যস্ত করে। Community report স্পষ্টভাবে 
              Unverified হিসেবে চিহ্নিত।
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Contact Developer</h4>
            <div className="space-y-4">
              <a href="mailto:atik@example.com" className="flex items-center gap-3 text-sm text-text-dim hover:text-blood transition-colors">
                <Mail size={16} /> atik@example.com
              </a>
              <a href="tel:+8801343332857" className="flex items-center gap-3 text-sm text-text-dim hover:text-blood transition-colors">
                <Phone size={16} /> +880 1343 332857
              </a>
              <a href="https://wa.me/8801343332857" className="flex items-center gap-3 text-sm text-text-dim hover:text-blood transition-colors">
                <MessageSquare size={16} /> WhatsApp Support
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Connect with Me</h4>
            <div className="flex gap-4">
              <a href="https://github.com/atik1234567890" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg border border-border flex items-center justify-center text-text-faint hover:border-blood hover:text-blood transition-all">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/md-atikur-rahman-3416a1386" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg border border-border flex items-center justify-center text-text-faint hover:border-blood hover:text-blood transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://www.facebook.com/share/1KK88AFa1h/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg border border-border flex items-center justify-center text-text-faint hover:border-blood hover:text-blood transition-all">
                <Facebook size={18} />
              </a>
            </div>
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
