"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";

type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (num: number | string) => string;
  formatDate: (dateStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "bn" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return typeof result === "string" ? result : key;
  };

  const formatNumber = (num: number | string): string => {
    const n = String(num);
    if (language === "en") return n;
    
    const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return n.replace(/\d/g, (d) => bengaliNumerals[parseInt(d)]);
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    if (language === "en") {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } else {
      const day = formatNumber(date.getDate());
      const year = formatNumber(date.getFullYear());
      const monthsBn = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
      ];
      const month = monthsBn[date.getMonth()];
      return `${day} ${month}, ${year}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber, formatDate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
