"use client";

import { useState } from "react";
import { Upload, CheckCircle2, AlertTriangle, FileText, Loader2, RefreshCw } from "lucide-react";
import { safeFetch } from "@/lib/api";

export default function LandVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append("document", file);

    try {
      const data = await safeFetch("/api/report/verify-document", {
        method: "POST",
        body: formData,
      });
      if (data.success) {
        setResult(data.analysis);
      }
    } catch (error) {
      // Handled in safeFetch
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="special-module bg-surface border border-border p-10 relative overflow-hidden my-12 before:content-['AI_SYSTEM'] before:absolute before:top-0 before:right-0 before:font-mono before:text-[0.55rem] before:tracking-[0.2em] before:uppercase before:px-3 before:py-1.5 before:bg-blood before:text-white">
      <h3 className="sm-title text-[1.4rem] font-bold text-white mb-3">
        দলিল জালিয়াতি শনাক্তকরণ AI
      </h3>
      <p className="sm-desc text-text-dim text-[0.9rem] leading-[1.9] max-w-[700px] mb-6">
        বাংলাদেশের ভূমি অফিসের সাথে সরাসরি কোনো API সংযোগ না থাকলেও, আমাদের
        AI সিস্টেম পূর্ববর্তী রেকর্ড এবং জলছাপ (watermark) বিশ্লেষণ করে
        দলিলে জালিয়াতির সম্ভাবনা নির্ণয় করে।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-bg border border-border p-6 rounded-sm">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border-light p-8 text-center rounded-sm hover:border-blood/50 transition-colors group">
            <input 
              type="file" 
              id="doc-upload" 
              className="hidden" 
              accept="image/*,.pdf" 
              onChange={handleFileChange}
            />
            <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <Upload className="text-text-faint group-hover:text-blood transition-colors" size={32} />
              <div className="text-sm">
                <p className="text-white font-bold mb-1">
                  {file ? file.name : "দলিল বা নথির ছবি আপলোড করুন"}
                </p>
                <p className="text-text-faint text-[0.75rem]">PNG, JPG up to 10MB</p>
              </div>
            </label>
          </div>
          <button 
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full bg-blood text-white py-3 font-bold text-sm uppercase tracking-widest hover:bg-blood/80 transition-colors mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
            {loading ? "Analysing..." : "Verify Document"}
          </button>
        </div>

        <div className="bg-bg border border-border p-6 rounded-sm min-h-[250px]">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <RefreshCw size={24} className="text-text-faint mb-3 opacity-20" />
              <p className="text-text-dim text-sm italic">রিপোর্ট দেখার জন্য ফাইল আপলোড করে যাচাই করুন</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Loader2 size={32} className="text-blood animate-spin mb-4" />
              <p className="text-white font-bold mb-2">প্রসেসিং হচ্ছে...</p>
              <p className="text-text-dim text-[0.75rem]">AI জলছাপ এবং সিকিউরিটি সুতা বিশ্লেষণ করছে</p>
            </div>
          )}

          {result && (
            <div className="h-full animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-6">
                {result.is_suspicious ? (
                  <AlertTriangle className="text-blood" size={28} />
                ) : (
                  <CheckCircle2 className="text-teal" size={28} />
                )}
                <div>
                  <h4 className={`font-bold text-sm ${result.is_suspicious ? 'text-blood' : 'text-teal'}`}>
                    {result.is_suspicious ? "সন্দেহজনক নথী শনাক্ত হয়েছে" : "প্রাথমিকভাবে সঠিক মনে হচ্ছে"}
                  </h4>
                  <p className="text-text-faint text-[0.65rem] font-mono">ID: {result.verification_id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-text-dim text-xs">Confidence Score</span>
                  <span className="text-white font-mono text-sm">{(result.confidence_score * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-text-dim text-xs">Document Type</span>
                  <span className="text-white font-mono text-sm">{result.document_type}</span>
                </div>
                
                {result.is_suspicious && (
                  <div>
                    <span className="text-blood text-[0.7rem] font-bold uppercase block mb-2">Detected Issues:</span>
                    <ul className="space-y-1">
                      {result.detected_issues.map((issue: string, i: number) => (
                        <li key={i} className="text-text-dim text-[0.75rem] flex items-start gap-2">
                          <span className="text-blood">•</span> {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-6 no-print">
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-surface2 border border-border text-text-faint hover:text-white py-3 text-[0.65rem] font-mono uppercase tracking-widest transition-all"
                  >
                    Download AI Analysis Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
