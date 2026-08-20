"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import uz from "../../messages/uz.json";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";
import kk from "../../messages/kk.json";
import ky from "../../messages/ky.json";
import tg from "../../messages/tg.json";
import tk from "../../messages/tk.json";
import { LOCALES, LocaleOption } from "@/lib/i18n-config";

export type LocaleCode = "uz" | "ru" | "en" | "kk" | "ky" | "tg" | "tk";

const dictionaries: Record<LocaleCode, any> = {
  uz,
  ru,
  en,
  kk,
  ky,
  tg,
  tk,
};

interface LanguageContextType {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t: (key: string) => string;
  currentLocaleOption: LocaleOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("resiland_locale") as LocaleCode;
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    }
  }, []);

  function setLocale(newLocale: LocaleCode) {
    if (dictionaries[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem("resiland_locale", newLocale);
      document.documentElement.lang = newLocale;
    }
  }

  function t(path: string): string {
    const dict = dictionaries[locale] || dictionaries.uz;
    const keys = path.split(".");
    let current = dict;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to Uzbek
        let fallback = dictionaries.uz;
        for (const fKey of keys) {
          if (fallback && typeof fallback === "object" && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return typeof fallback === "string" ? fallback : path;
      }
    }

    return typeof current === "string" ? current : path;
  }

  const currentLocaleOption =
    LOCALES.find((l) => l.code === locale) || LOCALES[6];

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, currentLocaleOption }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
