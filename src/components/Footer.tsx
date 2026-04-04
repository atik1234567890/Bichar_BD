export default function Footer() {
  return (
    <footer className="page-footer p-20 text-center bg-surface border-t border-border mt-12">
      <div className="pf-title font-bangla text-[clamp(2.5rem,6vw,4.5rem)] font-normal text-white mb-6 leading-[1.3]">
        বিচারের জন্য <em>সংগ্রাম</em>
      </div>
      <div className="pf-legal text-[0.8rem] text-text-dim max-w-[800px] mx-auto mb-8 font-bangla leading-[1.8]">
        BicharBD তথ্য সংগ্রহ করে যাচাইকৃত সংবাদ উৎস থেকে। 
        সকল অভিযুক্ত আইনের চোখে নির্দোষ যতক্ষণ না আদালত 
        দোষী সাব্যস্ত করে। Community report স্পষ্টভাবে 
        Unverified হিসেবে চিহ্নিত।
      </div>
      <div className="pf-mono font-mono text-[0.62rem] tracking-[0.25em] text-text-faint uppercase">
        © 2026 BicharBD — Justice for all in Bangladesh
      </div>
    </footer>
  );
}
