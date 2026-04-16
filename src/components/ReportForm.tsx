"use client";

import { useState } from "react";
import { X, Send, ShieldCheck, Upload } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function ReportForm({ crisisId, onClose }: { crisisId: string, onClose: () => void }) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    district: "",
    thana: "",
    date: "",
    accused: "",
    description: ""
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append("incident_type", crisisId);
    submitData.append("description", formData.description);
    submitData.append("division", formData.district); 
    submitData.append("district", formData.district);
    submitData.append("thana", formData.thana);
    if (file) submitData.append("evidence_file", file);

    try {
      const result = await safeFetch("/api/report/submit", {
        method: "POST",
        body: submitData,
      });
      if (result.success) {
        alert(t("successMessage") + result.token);
        onClose();
      } else {
        alert(t("errorMessage") + result.message);
      }
    } catch (error) {
      // Handled in safeFetch
      alert(t("serverError"));
    } finally {
      setIsSubmitting(false);
    }
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
            {isSubmitting ? t("encryptingData") : t("encryptedSubmission")}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t(`crises.${crisisId}.title`)} — {t("reportFormTitle")}</h2>
          <p className="text-text-dim text-sm italic">{t("anonymityNote")}</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("districtLabel")}</label>
              <input 
                type="text" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                placeholder={t("districtPlaceholder")}
                required
                disabled={isSubmitting}
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("thanaLabel")}</label>
              <input 
                type="text" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                placeholder={t("thanaPlaceholder")}
                required
                disabled={isSubmitting}
                value={formData.thana}
                onChange={(e) => setFormData({...formData, thana: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("dateLabel")}</label>
              <input 
                type="date" 
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
                required
                disabled={isSubmitting}
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("accusedLabel")}</label>
            <input 
              type="text" 
              className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors"
              placeholder={t("accusedPlaceholder")}
              disabled={isSubmitting}
              value={formData.accused}
              onChange={(e) => setFormData({...formData, accused: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("descriptionLabel")}</label>
            <textarea 
              rows={4}
              className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none transition-colors resize-none"
              placeholder={t("descriptionPlaceholder")}
              required
              disabled={isSubmitting}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">{t("evidenceLabel")}</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-3 bg-bg border border-dashed border-border p-4 cursor-pointer hover:border-blood transition-colors group">
                <Upload size={16} className="text-text-faint group-hover:text-blood" />
                <span className="text-xs text-text-dim">{file ? file.name : t("chooseFile")}</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blood text-white font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] py-5 flex items-center justify-center gap-3 hover:bg-blood/90 transition-all disabled:opacity-50"
          >
            <Send size={16} />
            {isSubmitting ? t("submitting") : t("submitComplaint")}
          </button>
        </form>
      </div>
    </div>
  );
}
