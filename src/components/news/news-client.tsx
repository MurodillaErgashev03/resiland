"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Tag,
  Globe2,
  ArrowRight,
  Sparkles,
  X,
  SlidersHorizontal,
  Layers,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsArticles, NewsItem } from "@/data/news-data";

import heroNewsBg from "@/assets/img/banner2.png";

export function NewsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const topicDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        topicDropdownRef.current &&
        !topicDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTopicOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
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

  // Unique filters
  const topics = useMemo(() => {
    const set = new Set(newsArticles.map((n) => n.topic));
    return Array.from(set);
  }, []);

  const countries = useMemo(() => {
    const map = new Map<string, number>();
    newsArticles.forEach((n) => {
      map.set(n.country, (map.get(n.country) || 0) + 1);
    });
    return Array.from(map.entries()).map(([country, count]) => ({
      country,
      count,
    }));
  }, []);

  // Filtered news
  const filteredNews = useMemo(() => {
    return newsArticles.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTopic =
        selectedTopic === "all" || item.topic === selectedTopic;

      const matchCountry =
        selectedCountry === "all" || item.country === selectedCountry;

      return matchSearch && matchTopic && matchCountry;
    });
  }, [searchQuery, selectedTopic, selectedCountry]);

  const hasFilters =
    searchQuery !== "" || selectedTopic !== "all" || selectedCountry !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTopic("all");
    setSelectedCountry("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* ─── 100vh Hero Section with Mountains ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroNewsBg}
            alt="RESILAND CA+ Yangiliklar va e'lonlar"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Soft contrast gradient for clear background presentation */}
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
                Yangiliklar &amp; E&apos;lonlar
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Yangiliklar va e&apos;lonlar
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              RESILAND CA+ va uning Markaziy Osiyodagi hamkor mamlakatlarining so&apos;nggi yangiliklari, tadbirlari va e&apos;lonlaridan xabardor bo&apos;ling.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Mintaqaviy Ekologik Voqealar
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                5 ta Markaziy Osiyo Davlati
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content with Filters & News Cards ─── */}
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
                placeholder="Yangiliklar bo'yicha qidiruv (mavzu, kalit so'z yoki sarlavha)..."
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
              
              {/* Custom Topics Dropdown (5 cols) */}
              <div className="sm:col-span-5 relative" ref={topicDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsTopicOpen(!isTopicOpen);
                    setIsCountryOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isTopicOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedTopic === "all"
                      ? "Barcha mavzular (All Topics)"
                      : selectedTopic}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isTopicOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isTopicOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTopic("all");
                        setIsTopicOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedTopic === "all"
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <span>Barcha mavzular (All Topics)</span>
                      {selectedTopic === "all" && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedTopic(t);
                          setIsTopicOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedTopic === t
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span className="truncate pr-2">{t}</span>
                        {selectedTopic === t && (
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Countries Dropdown (4 cols) */}
              <div className="sm:col-span-4 relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCountryOpen(!isCountryOpen);
                    setIsTopicOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isCountryOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedCountry === "all"
                      ? "Barcha davlatlar (All Countries)"
                      : selectedCountry}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isCountryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
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
                        key={c.country}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c.country);
                          setIsCountryOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCountry === c.country
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span className="truncate pr-2">
                          {c.country} ({c.count})
                        </span>
                        {selectedCountry === c.country && (
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
            NEWS GRID (3 Modern Cards with Primary Accents)
        ════════════════════════════════════════════════════ */}
        <section className="container mx-auto px-4 md:px-12 pb-20">
          {filteredNews.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-slate-200 bg-slate-50 space-y-3">
              <Search className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Yangilik topilmadi
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Qidiruv so&apos;rovingiz yoki tanlangan filtrlarga mos keluvchi yangilik mavjud emas.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item, idx) => {
                const delays = ["", "reveal-delay-150", "reveal-delay-300"];
                return (
                  <article
                    key={item.id}
                    className={`group rounded-3xl border border-slate-200/90 border-l-[6px] border-l-emerald-600 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-950/10 smooth-card-hover flex flex-col justify-between reveal ${delays[idx % 3]}`}
                  >
                    <div>
                      {/* Image Preview */}
                      <Link
                        href={`/news/${item.slug}`}
                        className="block relative aspect-[16/10] overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>

                      {/* Content Area */}
                      <div className="p-6 sm:p-7 space-y-4">
                        {/* Badges / Category */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <Tag className="h-3 w-3 text-emerald-600" />
                            {item.topic}
                          </span>
                          {item.country && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              <Globe2 className="h-3 w-3 text-slate-500" />
                              {item.country}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors duration-300 leading-snug line-clamp-3">
                          <Link href={`/news/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h2>

                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{item.publishedDate}</span>
                        </div>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Button (LEARN MORE ->) */}
                    <div className="px-6 sm:px-7 pb-6 pt-2">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-black text-emerald-700 group-hover:text-emerald-800 uppercase tracking-wider hover:underline"
                      >
                        <span>LEARN MORE</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
