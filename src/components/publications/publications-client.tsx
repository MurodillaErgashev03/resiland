"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  FileText,
  Globe2,
  Download,
  Sparkles,
  X,
  SlidersHorizontal,
  Layers,
  ChevronDown,
  Check,
  Tag,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicationsData, PublicationItem } from "@/data/publications-data";

import heroPubBg from "@/assets/img/banner3.png";

export function PublicationsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target as Node)
      ) {
        setIsYearOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  // Unique filter values
  const types = useMemo(() => {
    return Array.from(new Set(publicationsData.map((p) => p.type)));
  }, []);

  const countries = useMemo(() => {
    return Array.from(new Set(publicationsData.map((p) => p.country)));
  }, []);

  const years = useMemo(() => {
    return Array.from(new Set(publicationsData.map((p) => p.year))).sort(
      (a, b) => b.localeCompare(a)
    );
  }, []);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publicationsData.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === "all" || item.type === selectedType;
      const matchCountry =
        selectedCountry === "all" || item.country === selectedCountry;
      const matchYear = selectedYear === "all" || item.year === selectedYear;

      return matchSearch && matchType && matchCountry && matchYear;
    });
  }, [searchQuery, selectedType, selectedCountry, selectedYear]);

  const hasFilters =
    searchQuery !== "" ||
    selectedType !== "all" ||
    selectedCountry !== "all" ||
    selectedYear !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCountry("all");
    setSelectedYear("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* ─── 100vh Hero Section with Mountains (Matching Design System) ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroPubBg}
            alt="RESILAND CA+ Nashrlar va hisobotlar"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Subtle soft gradient only behind text for crisp image presentation */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent w-full md:w-[60%]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Breadcrumb Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-emerald-300 border border-emerald-500/30 backdrop-blur-md hover:bg-black/60 transition-colors"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Bosh sahifa</span>
              </Link>
              <span className="text-white/40">/</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                Nashrlar &amp; Hisobotlar
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Nashrlar
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              RESILAND CA+ va uning hamkorlarining hisobotlari, yo&apos;riqnomalari, siyosiy sharhlari va texnik hujjatlari. Barcha nashrlarni bepul yuklab olish mumkin.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                Rasmiy Hisobotlar &amp; Axborotnomalar
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Download className="h-3.5 w-3.5 text-emerald-400" />
                Bepul PDF Yuklab Olish
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">

        {/* ════════════════════════════════════════════════════
            SEARCH & FILTER BAR (Modern Floating Light Box)
        ════════════════════════════════════════════════════ */}
        <section className="relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 md:px-12 mb-12">
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-slate-900/5 space-y-5 reveal-scale">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nashrlar bo'yicha qidiruv (mavzu, kalit so'z yoki hujjat nomi)..."
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Custom Modern Dropdowns & Clear Button Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
              
              {/* All Types Dropdown (4 cols) */}
              <div className="sm:col-span-4 relative" ref={typeDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsCountryOpen(false);
                    setIsYearOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isTypeOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedType === "all" ? "All Types" : selectedType}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isTypeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isTypeOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType("all");
                        setIsTypeOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedType === "all"
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <span>Barcha turlar (All Types)</span>
                      {selectedType === "all" && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    {types.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedType(t);
                          setIsTypeOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedType === t
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span className="truncate">{t}</span>
                        {selectedType === t && (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* All Countries Dropdown (3 cols) */}
              <div className="sm:col-span-3 relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCountryOpen(!isCountryOpen);
                    setIsTypeOpen(false);
                    setIsYearOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isCountryOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedCountry === "all" ? "All Countries" : selectedCountry}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCountryOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry("all");
                        setIsCountryOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCountry === "all"
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <span>Barcha davlatlar (All Countries)</span>
                      {selectedCountry === "all" && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    {countries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setIsCountryOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCountry === c
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span className="truncate">{c}</span>
                        {selectedCountry === c && (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* All Years Dropdown (2 cols) */}
              <div className="sm:col-span-2 relative" ref={yearDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsYearOpen(!isYearOpen);
                    setIsTypeOpen(false);
                    setIsCountryOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isYearOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedYear === "all" ? "All Years" : selectedYear}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isYearOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isYearOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedYear("all");
                        setIsYearOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedYear === "all"
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <span>Barcha yillar</span>
                      {selectedYear === "all" && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    {years.map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => {
                          setSelectedYear(y);
                          setIsYearOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedYear === y
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span>{y}</span>
                        {selectedYear === y && (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters Button (3 cols) */}
              <div className="sm:col-span-3">
                <Button
                  onClick={clearFilters}
                  disabled={!hasFilters}
                  className={`w-full h-11 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    hasFilters
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                      : "bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-100 cursor-not-allowed"
                  }`}
                >
                  CLEAR FILTERS
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            PUBLICATIONS LIST (Modern Horizontal Bento Cards)
        ════════════════════════════════════════════════════ */}
        <section className="container mx-auto px-4 md:px-12 pb-20">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-slate-200 bg-slate-50 space-y-3">
              <FileText className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Nashr topilmadi
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Qidiruv so&apos;rovingiz yoki tanlangan filtrlarga mos keluvchi nashr mavjud emas.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-full text-xs font-bold mt-2"
              >
                Filtrlarni tozalash
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredPublications.map((item, idx) => {
                const delays = ["", "reveal-delay-150", "reveal-delay-200", "reveal-delay-300"];
                return (
                  <div
                    key={item.id}
                    className={`group rounded-3xl border border-slate-200/90 border-l-[6px] border-l-emerald-600 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 smooth-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal ${delays[idx % 4]}`}
                  >
                    {/* Left: Document Icon & Details */}
                    <div className="flex items-start gap-4 sm:gap-5 flex-1">
                      {/* Document Icon Box */}
                      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                        <FileText className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>

                      {/* Info & Badges */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {item.country}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <Tag className="h-3 w-3 text-slate-500" />
                            {item.type}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <Calendar className="h-3 w-3 text-slate-500" />
                            {item.date}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {item.fileSize} · {item.fileFormat}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Download Button */}
                    <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0 flex items-center justify-end">
                      <Button
                        asChild
                        className="w-full md:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 h-11 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <a
                          href={item.downloadUrl}
                          download
                          onClick={(e) => {
                            // Demo toast or download trigger
                          }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
