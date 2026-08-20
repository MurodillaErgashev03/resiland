"use client";

import React from "react";
import { LOCALES } from "@/lib/i18n-config";
import { useLanguage, LocaleCode } from "@/context/language-context";
import { trackEvent } from "@/lib/analytics";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

export function LocaleSwitcher() {
  const { locale, setLocale, currentLocaleOption, t } = useLanguage();

  function handleSelect(code: LocaleCode) {
    trackEvent({ name: "language_switch", params: { from: locale, to: code } });
    setLocale(code);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-2 rounded-full border-white/20 bg-black/35 backdrop-blur-md text-white hover:bg-white/20 font-semibold text-xs shadow-xs cursor-pointer"
          aria-label={t("common.changeLanguage")}
        >
          <span className="font-bold text-xs text-emerald-400">
            {currentLocaleOption.badge || currentLocaleOption.code.toUpperCase()}
          </span>
          <span className="font-semibold text-white hidden sm:inline">
            {currentLocaleOption.name}
          </span>
          <ChevronDown className="h-3 w-3 text-white/70 ml-0.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-1.5 space-y-0.5 bg-white border border-slate-200 shadow-xl rounded-2xl text-slate-900 z-50"
      >
        {LOCALES.map((localeItem) => {
          const isSelected = localeItem.code === locale;

          return (
            <DropdownMenuItem
              key={localeItem.code}
              onClick={() => handleSelect(localeItem.code as LocaleCode)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                isSelected
                  ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`font-bold text-xs w-6 text-center shrink-0 ${
                    isSelected ? "text-emerald-700 font-black" : "text-slate-500"
                  }`}
                >
                  {localeItem.badge || localeItem.code.toUpperCase()}
                </span>
                <div className="flex flex-col text-left">
                  <span className="leading-tight font-semibold text-slate-800">{localeItem.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {localeItem.nativeName}
                  </span>
                </div>
              </div>
              {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
