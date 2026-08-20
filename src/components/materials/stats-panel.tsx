"use client";

import { useState, useEffect } from "react";
import { StatsData } from "@/types";
import { useLanguage } from "@/context/language-context";
import {
  FileStack,
  Globe2,
  Clock,
  TrendingUp,
} from "lucide-react";

interface StatsPanelProps {
  data: StatsData;
}

export function StatsPanel({ data }: StatsPanelProps) {
  const { t, locale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDateClean = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top 3 Authoritative Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Materials Card */}
        <div className="group relative rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white p-4.5 sm:p-5 shadow-2xs hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-white text-emerald-600 border border-emerald-200/90 flex items-center justify-center shrink-0 shadow-2xs">
              <FileStack className="h-5.5 w-5.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900" suppressHydrationWarning>
                {mounted ? data.totalMaterials.toLocaleString() : data.totalMaterials}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {t("home.stats.totalMaterials")}
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Ilmiy maqola & hisobotlar</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 text-[11px]">
              100% Ochiq
            </span>
          </div>
        </div>

        {/* Countries Covered Card */}
        <div className="group relative rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white p-4.5 sm:p-5 shadow-2xs hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-white text-emerald-600 border border-emerald-200/90 flex items-center justify-center shrink-0 shadow-2xs">
              <Globe2 className="h-5.5 w-5.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {data.byCountry.length}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {t("home.stats.countriesCovered")}
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Markaziy Osiyo hududlari</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 text-[11px]">
              5 davlat + CA+
            </span>
          </div>
        </div>

        {/* Last Updated Card */}
        <div className="group relative rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white p-4.5 sm:p-5 shadow-2xs hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-default sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-white text-emerald-600 border border-emerald-200/90 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="h-5.5 w-5.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900" suppressHydrationWarning>
                {mounted ? formatDateClean(data.lastAddedAt) : data.lastAddedAt}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {t("home.stats.lastUpdated")}
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Holati</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 text-[11px]">
              Tasdiqlangan
            </span>
          </div>
        </div>
      </div>

      {/* Country Breakdown Ribbon */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          <span>Hududlar bo&apos;yicha taqsimot:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {data.byCountry.map((item) => (
            <div
              key={item.country}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white hover:bg-emerald-50/40 border border-slate-200 hover:border-slate-300 text-slate-800 font-medium text-xs shadow-2xs transition-colors"
            >
              <span>{item.country}</span>
              <span className="h-4.5 px-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
