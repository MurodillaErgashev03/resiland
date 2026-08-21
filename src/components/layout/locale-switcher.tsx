"use client";

import React, { useState, useRef, useEffect } from "react";
import { LOCALES } from "@/lib/i18n-config";
import { useLanguage, LocaleCode } from "@/context/language-context";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const { locale, setLocale, currentLocaleOption, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(code: LocaleCode) {
    trackEvent({ name: "language_switch", params: { from: locale, to: code } });
    setLocale(code);
    setOpen(false);
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-8 px-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs shadow-xs hover:shadow-md hover:shadow-black/40 cursor-pointer select-none transition-all"
        aria-label={t("common.changeLanguage")}
      >
        <span className="font-bold text-xs text-emerald-400">
          {currentLocaleOption?.badge || currentLocaleOption?.code?.toUpperCase() || "UZ"}
        </span>
        <span className="font-semibold text-white hidden sm:inline">
          {currentLocaleOption?.name || "O'zbekcha"}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-white/70 ml-0.5 transition-transform duration-200",
            open && "rotate-180 text-white"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-60 p-2 space-y-1 bg-slate-950/90 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl text-white z-[100] backdrop-blur-2xl ring-1 ring-black/30"
            style={{ minWidth: "230px" }}
          >
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {t("common.changeLanguage") || "Tilni tanlang"}
            </div>
            {LOCALES.map((localeItem) => {
              const isSelected = localeItem.code === locale;

              return (
                <button
                  key={localeItem.code}
                  type="button"
                  onClick={() => handleSelect(localeItem.code as LocaleCode)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all duration-150 text-left select-none group border",
                    isSelected
                      ? "bg-gradient-to-r from-emerald-600/35 to-emerald-500/20 border-emerald-500/40 text-white shadow-md shadow-black/40 font-semibold"
                      : "border-transparent text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 hover:shadow-md hover:shadow-black/40"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 border transition-all",
                        isSelected
                          ? "bg-emerald-500/30 border-emerald-400/50 text-emerald-300 shadow-xs"
                          : "bg-white/10 border-white/15 text-slate-300 group-hover:text-emerald-400 group-hover:bg-white/15 group-hover:border-emerald-500/30 group-hover:shadow-xs group-hover:shadow-black/30"
                      )}
                    >
                      {localeItem.badge || localeItem.code.toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className={cn("leading-tight font-semibold text-xs", isSelected ? "text-white" : "text-slate-200 group-hover:text-white")}>
                        {localeItem.name}
                      </span>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-normal">
                        {localeItem.nativeName}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
