"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { StatsData } from "@/types";
import { useLanguage } from "@/context/language-context";
import {
  FileStack,
  Globe2,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Layers,
  BookOpen,
  FileText,
  Database,
  Compass,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import flagUzbek from "@/assets/img/uzbek.png";
import flagQozoq from "@/assets/img/qozoq.png";
import flagKirgz from "@/assets/img/kirgz.png";
import flagTojik from "@/assets/img/tojik.png";
import flagTurkman from "@/assets/img/turkman.png";

interface StatsPanelProps {
  data: StatsData;
}

interface CountryMeta {
  code: string;
  flag?: StaticImageData;
  color: string;
  barColor: string;
  bgLight: string;
}

const countryMetaMap: Record<string, CountryMeta> = {
  Uzbekistan: {
    code: "UZ",
    flag: flagUzbek,
    color: "text-emerald-700",
    barColor: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
  },
  Kazakhstan: {
    code: "KZ",
    flag: flagQozoq,
    color: "text-sky-700",
    barColor: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-50/80 border-sky-200",
  },
  Kyrgyzstan: {
    code: "KG",
    flag: flagKirgz,
    color: "text-amber-700",
    barColor: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50/80 border-amber-200",
  },
  Tajikistan: {
    code: "TJ",
    flag: flagTojik,
    color: "text-teal-700",
    barColor: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50/80 border-teal-200",
  },
  Turkmenistan: {
    code: "TM",
    flag: flagTurkman,
    color: "text-emerald-700",
    barColor: "from-emerald-600 to-green-700",
    bgLight: "bg-emerald-50/80 border-emerald-200",
  },
  "Regional (CA+)": {
    code: "CA+",
    color: "text-purple-700",
    barColor: "from-purple-500 to-indigo-600",
    bgLight: "bg-purple-50/80 border-purple-200",
  },
};

/* ─── Count-up hook ──────────────────────────────────────────── */
function useCountUp(target: number, duration: number = 900, trigger: unknown = true) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const from = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger]);

  return count;
}

/* ─── Animated number component ─────────────────────────────── */
function CountUpNumber({
  value,
  className,
  triggerKey,
  duration = 900,
}: {
  value: number;
  className?: string;
  triggerKey?: unknown;
  duration?: number;
}) {
  const count = useCountUp(value, duration, triggerKey);
  return <span className={className}>{count}</span>;
}

/* ─── Animated progress bar component ───────────────────────── */
function AnimatedBar({
  targetPct,
  colorClass,
  solidClass,
  triggerKey,
  delay = 0,
}: {
  targetPct: number;
  colorClass?: string;
  solidClass?: string;
  triggerKey: unknown;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset immediately
    setWidth(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const duration = 850;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setWidth(targetPct * eased);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };

      rafRef.current = requestAnimationFrame(step);
    }, delay);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey, targetPct, delay]);

  return (
    <div className="relative w-full h-3.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
      <div
        className={[
          "h-full rounded-full shadow-xs",
          colorClass ? `bg-gradient-to-r ${colorClass}` : "",
          solidClass ?? "",
        ].join(" ")}
        style={{ width: `${width}%`, willChange: "width" }}
      />
    </div>
  );
}

export function StatsPanel({ data }: StatsPanelProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"countries" | "types" | "overview">("countries");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [tabAnimating, setTabAnimating] = useState(false);
  const [countKey, setCountKey] = useState(0); // increments to re-trigger count-up
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCountKey((k) => k + 1);
  }, []);

  // Smooth tab switch: fade out → swap → fade in
  const switchTab = useCallback((tab: "countries" | "types" | "overview") => {
    if (tab === activeTab) return;
    setTabAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setHoveredCountry(null);
      setHoveredType(null);
      setTabAnimating(false);
      setCountKey((k) => k + 1); // retrigger count-up on tab switch
    }, 220);
  }, [activeTab]);

  const total = data.totalMaterials || 486;

  // Material types breakdown
  const materialTypes = [
    {
      id: "publications",
      label: "Ilmiy nashrlar & maqolalar",
      shortLabel: "Nashrlar",
      count: data.totalPublications || 215,
      icon: BookOpen,
      color: "#10b981", // emerald-500
      bgClass: "bg-emerald-500",
      textClass: "text-emerald-700",
      borderClass: "border-emerald-200",
      bgLightClass: "bg-emerald-50/60",
    },
    {
      id: "reports",
      label: "Texnik hisobotlar & tahlillar",
      shortLabel: "Hisobotlar",
      count: data.totalReports || 132,
      icon: FileText,
      color: "#06b6d4", // cyan-500
      bgClass: "bg-cyan-500",
      textClass: "text-cyan-700",
      borderClass: "border-cyan-200",
      bgLightClass: "bg-cyan-50/60",
    },
    {
      id: "datasets",
      label: "Geofazoviy & ochiq ma'lumotlar",
      shortLabel: "Datasetlar",
      count: data.totalDatasets || 74,
      icon: Database,
      color: "#3b82f6", // blue-500
      bgClass: "bg-blue-500",
      textClass: "text-blue-700",
      borderClass: "border-blue-200",
      bgLightClass: "bg-blue-50/60",
    },
    {
      id: "guidelines",
      label: "Amaliy qo'llanma & yo'riqnomalar",
      shortLabel: "Qo'llanmalar",
      count: data.totalGuidelines || 65,
      icon: Compass,
      color: "#f59e0b", // amber-500
      bgClass: "bg-amber-500",
      textClass: "text-amber-700",
      borderClass: "border-amber-200",
      bgLightClass: "bg-amber-50/60",
    },
  ];

  const maxCountryCount = Math.max(...data.byCountry.map((c) => c.count), 1);

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

  // Donut chart calculations
  const donutRadius = 78;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedOffset = 0;

  const donutSegments = materialTypes.map((item) => {
    const percentage = total > 0 ? (item.count / total) * 100 : 0;
    const strokeDasharray = `${(percentage / 100) * donutCircumference} ${donutCircumference}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += (percentage / 100) * donutCircumference;
    return {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="space-y-6">
      {/* ─── Top 4 KPI Metric Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Materials */}
        <div className="group relative rounded-2xl border border-emerald-200/80 bg-white/90 p-5 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileStack className="h-5.5 w-5.5" />
            </div>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              100% Ochiq
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black tracking-tight text-slate-900" suppressHydrationWarning>
              {mounted ? (
                <CountUpNumber value={total} className="tabular-nums" triggerKey={countKey} duration={1000} />
              ) : total}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {t("home.stats.totalMaterials") || "Jami Ilmiy & Texnik Materiallar"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Barcha toifalar</span>
            <span className="font-bold text-slate-700">4 ta yo&apos;nalish</span>
          </div>
        </div>

        {/* Countries Covered */}
        <div className="group relative rounded-2xl border border-sky-200/80 bg-white/90 p-5 shadow-xs hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Globe2 className="h-5.5 w-5.5" />
            </div>
            <span className="font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80 text-[11px]">
              5 davlat + CA+
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black tracking-tight text-slate-900" suppressHydrationWarning>
              {mounted ? (
                <CountUpNumber value={data.byCountry.length || 6} className="tabular-nums" triggerKey={countKey} duration={700} />
              ) : (data.byCountry.length || 6)}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {t("home.stats.countriesCovered") || "Markaziy Osiyo Davlatlari & CA+"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Mintaqaviy qamrov</span>
            <span className="font-bold text-slate-700">100% integratsiya</span>
          </div>
        </div>

        {/* Datasets & Reports */}
        <div className="group relative rounded-2xl border border-teal-200/80 bg-white/90 p-5 shadow-xs hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-600 border border-teal-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Database className="h-5.5 w-5.5" />
            </div>
            <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/80 text-[11px]">
              Geofazoviy & PDF
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black tracking-tight text-slate-900" suppressHydrationWarning>
              {mounted ? (
                <CountUpNumber
                  value={(data.totalDatasets || 74) + (data.totalReports || 132)}
                  className="tabular-nums"
                  triggerKey={countKey}
                  duration={950}
                />
              ) : "206"}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Hisobotlar & Ochiq Ma&apos;lumotlar
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Tadqiqot bazasi</span>
            <span className="font-bold text-slate-700">GIS & Tahlillar</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="group relative rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xs hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 backdrop-blur-xs">
          <div className="flex items-center justify-between">
            <div className="h-11 w-11 rounded-xl bg-slate-50 text-slate-600 border border-slate-200/90 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="h-5.5 w-5.5" />
            </div>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Tasdiqlangan
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-black tracking-tight text-slate-900" suppressHydrationWarning>
              {mounted ? formatDateClean(data.lastAddedAt) : data.lastAddedAt}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {t("home.stats.lastUpdated") || "So'nggi Tasdiqlangan Yozuv"}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Yangilanish holati</span>
            <span className="font-bold text-emerald-600">Faol sinxron</span>
          </div>
        </div>
      </div>

      {/* ─── Main Interactive Chart Container ─── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 shadow-xl shadow-slate-200/50 backdrop-blur-md">
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <BarChart3 className="h-4 w-4 text-emerald-600" />
              <span>Interaktiv Statistik Tahlil</span>
            </div>
            <h3
              key={activeTab}
              className="text-lg sm:text-xl font-bold text-slate-900 transition-all duration-300"
              style={{
                animation: tabAnimating ? "none" : "tabHeadingIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {activeTab === "countries" && "Hududlar va Mamlakatlar bo'yicha taqsimot grafigi"}
              {activeTab === "types" && "Ilmiy va Texnik materiallar turlari tuzilmasi"}
              {activeTab === "overview" && "Markaziy Osiyo Resurslari Umumiy Ko'rsatkichlari"}
            </h3>
          </div>

          {/* Tab buttons */}
          <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
            <button
              onClick={() => switchTab("countries")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "countries"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Hududlar bo&apos;yicha</span>
            </button>
            <button
              onClick={() => switchTab("types")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "types"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <PieChart className="h-3.5 w-3.5" />
              <span>Material turlari</span>
            </button>
            <button
              onClick={() => switchTab("overview")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "overview"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Qiyosiy tahlil</span>
            </button>
          </div>
        </div>

        {/* ─── Animated Tab Content Wrapper ─── */}
        <div
          ref={tabContentRef}
          style={{
            opacity: tabAnimating ? 0 : 1,
            transform: tabAnimating ? "translateY(10px)" : "translateY(0)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            willChange: "opacity, transform",
          }}
        >

        {/* ─── TAB 1: COUNTRIES BAR CHART ─── */}
        {activeTab === "countries" && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Bars list */}
              <div className="lg:col-span-8 space-y-4">
                {data.byCountry.map((item) => {
                  const meta = countryMetaMap[item.country] || {
                    code: "CA",
                    color: "text-slate-700",
                    barColor: "from-slate-500 to-slate-700",
                    bgLight: "bg-slate-50 border-slate-200",
                  };
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  const isHovered = hoveredCountry === item.country;

                  return (
                    <div
                      key={item.country}
                      onMouseEnter={() => setHoveredCountry(item.country)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
                        isHovered
                          ? "bg-emerald-50/40 border-emerald-300 shadow-md translate-x-1"
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          {meta.flag ? (
                            <Image
                              src={meta.flag}
                              alt={item.country}
                              width={22}
                              height={16}
                              className="rounded shadow-xs object-cover"
                            />
                          ) : (
                            <div className="h-4.5 w-6 rounded bg-purple-100 border border-purple-300 flex items-center justify-center text-[10px] font-bold text-purple-700">
                              CA+
                            </div>
                          )}
                          <span className="font-bold text-slate-800 text-sm">{item.country}</span>
                          <span className="text-[11px] font-semibold text-slate-600">
                            ({percentage}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CountUpNumber
                            value={item.count}
                            className="text-sm font-black text-slate-900 tabular-nums"
                            triggerKey={countKey}
                            duration={800}
                          />
                          <span className="text-xs text-slate-600">material</span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <AnimatedBar
                        targetPct={(item.count / maxCountryCount) * 100}
                        colorClass={meta.barColor}
                        triggerKey={countKey}
                        delay={data.byCountry.indexOf(item) * 80}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Country summary insight box */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span>Mintaqaviy Yetakchilik</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hozirgi kunda ilmiy-texnik resurslar bazasida eng katta ulush{" "}
                    <strong className="text-slate-900 font-bold">O&apos;zbekiston ({((142 / total) * 100).toFixed(1)}%)</strong>{" "}
                    va{" "}
                    <strong className="text-slate-900 font-bold">Qozog&apos;iston ({((118 / total) * 100).toFixed(1)}%)</strong>{" "}
                    hududlariga to&apos;g&apos;ri keladi.
                  </p>
                  <div className="pt-3 border-t border-emerald-200/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Mintaqaviy (CA+) materiallar:</span>
                      <span className="font-bold text-slate-800">23 ta</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">O&apos;rtacha bir davlatga:</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(total / data.byCountry.length)} ta
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick distribution badges */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Tezkor taqsimot
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.byCountry.map((item) => (
                      <span
                        key={item.country}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                      >
                        <span>{item.country}:</span>
                        <span className="font-bold text-emerald-600">{item.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: RESOURCE TYPES DONUT CHART ─── */}
        {activeTab === "types" && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* SVG Donut Chart */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-2xl border border-slate-200/70">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r={donutRadius}
                      className="text-slate-200/70"
                      strokeWidth="24"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {mounted &&
                      donutSegments.map((segment) => {
                        const isHovered = hoveredType === segment.id;
                        return (
                          <circle
                            key={segment.id}
                            cx="100"
                            cy="100"
                            r={donutRadius}
                            stroke={segment.color}
                            strokeWidth={isHovered ? "28" : "24"}
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredType(segment.id)}
                            onMouseLeave={() => setHoveredType(null)}
                          />
                        );
                      })}
                  </svg>

                  {/* Donut Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
                    {hoveredType ? (
                      (() => {
                        const selected = materialTypes.find((m) => m.id === hoveredType);
                        if (!selected) return null;
                        const pct = ((selected.count / total) * 100).toFixed(1);
                        return (
                          <div className="space-y-0.5 animate-in fade-in zoom-in duration-200">
                            <p className="text-2xl font-black text-slate-900">{selected.count}</p>
                            <p className="text-[11px] font-bold text-emerald-600">{pct}%</p>
                            <p className="text-[10px] font-semibold text-slate-500 line-clamp-1">
                              {selected.shortLabel}
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest block">
                          Jami
                        </span>
                        <p className="text-3xl font-black text-slate-900">{total}</p>
                        <p className="text-[11px] font-medium text-slate-600">Materiallar</p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 text-center">
                  Segment ustiga sichqonchani olib borib batafsil ko&apos;ring
                </p>
              </div>

              {/* Category details breakdown cards */}
              <div className="lg:col-span-7 space-y-3.5">
                {materialTypes.map((type) => {
                  const Icon = type.icon;
                  const pct = ((type.count / total) * 100).toFixed(1);
                  const isHovered = hoveredType === type.id;

                  return (
                    <div
                      key={type.id}
                      onMouseEnter={() => setHoveredType(type.id)}
                      onMouseLeave={() => setHoveredType(null)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? `${type.bgLightClass} ${type.borderClass} shadow-md translate-x-1`
                          : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs ${type.bgClass}`}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{type.label}</h4>
                            <p className="text-[11px] text-slate-500 font-medium">
                              Baza tarkibidagi ulushi:{" "}
                              <strong className={type.textClass}>{pct}%</strong>
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <CountUpNumber
                            value={type.count}
                            className="text-lg font-black text-slate-900 tabular-nums"
                            triggerKey={countKey}
                            duration={800}
                          />
                          <span className="text-xs text-slate-500 ml-1">ta</span>
                        </div>
                      </div>

                      {/* Progress bar — animated */}
                      <AnimatedBar
                        targetPct={parseFloat(pct)}
                        solidClass={type.bgClass}
                        triggerKey={countKey}
                        delay={materialTypes.indexOf(type) * 100}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: OVERVIEW & COMPARATIVE ANALYTICS ─── */}
        {activeTab === "overview" && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <BookOpen className="h-4.5 w-4.5 text-emerald-600" />
                  <span>Nashrlar va Ilmiy Hujjatlar</span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                  {data.totalPublications + data.totalReports}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Akademik jurnallar, konferensiya to&apos;plamlari va tahliliy hisobotlar ulushi{" "}
                  <strong className="text-emerald-700">
                    {(
                      ((data.totalPublications + data.totalReports) / total) *
                      100
                    ).toFixed(1)}
                    %
                  </strong>{" "}
                  ni tashkil qiladi.
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/70 to-white border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Database className="h-4.5 w-4.5 text-blue-600" />
                  <span>Raqamli & Geofazoviy Baza</span>
                </div>
                <p className="text-3xl font-black text-slate-900">{data.totalDatasets}</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  GIS, GeoTIFF, sun&apos;iy yo&apos;ldosh va vegetatsiya qatlamlari umumiy
                  resurslarning{" "}
                  <strong className="text-blue-700">
                    {((data.totalDatasets / total) * 100).toFixed(1)}%
                  </strong>{" "}
                  qismini egallaydi.
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <Compass className="h-4.5 w-4.5 text-amber-600" />
                  <span>Amaliy Qo&apos;llanmalar</span>
                </div>
                <p className="text-3xl font-black text-slate-900">{data.totalGuidelines}</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fermerlar va o&apos;rmonchilar uchun landshaft tiklash bo&apos;yicha standart
                  yo&apos;riqnomalar va texnik qo&apos;llanmalar.
                </p>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    To&apos;liq Ochiq Kod va Ilmiy Foydalanish
                  </h4>
                  <p className="text-xs text-slate-500">
                    Barcha ma&apos;lumotlar CC-BY litsenziyasi bo&apos;yicha erkin yuklab olish uchun
                    mavjud.
                  </p>
                </div>
              </div>
              <a
                href="/materials"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs shrink-0"
              >
                <span>Barcha materiallarni ko&apos;rish</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
        </div>{/* end animated tab wrapper */}
      </div>
    </div>
  );
}
