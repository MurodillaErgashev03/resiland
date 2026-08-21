"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Globe2,
  Tag,
  Sparkles,
  X,
  SlidersHorizontal,
  Layers,
  ChevronDown,
  Check,
  Building2,
  ArrowRight,
  ExternalLink,
  Users2,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventsData, EventItem } from "@/data/events-data";

import heroEventBg from "@/assets/img/banner4.png";

export function EventsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

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
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
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

  // Unique filter lists
  const types = useMemo(() => {
    return Array.from(new Set(eventsData.map((e) => e.type)));
  }, []);

  const countries = useMemo(() => {
    return Array.from(new Set(eventsData.map((e) => e.country)));
  }, []);

  const statuses = ["Bo'lajak", "O'tkazilgan"];

  // Filtered events
  const filteredEvents = useMemo(() => {
    return eventsData.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === "all" || item.type === selectedType;
      const matchCountry =
        selectedCountry === "all" || item.country === selectedCountry;
      const matchStatus =
        selectedStatus === "all" || item.status === selectedStatus;

      return matchSearch && matchType && matchCountry && matchStatus;
    });
  }, [searchQuery, selectedType, selectedCountry, selectedStatus]);

  const hasFilters =
    searchQuery !== "" ||
    selectedType !== "all" ||
    selectedCountry !== "all" ||
    selectedStatus !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCountry("all");
    setSelectedStatus("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* ─── 100vh Hero Section with Mountains ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroEventBg}
            alt="RESILAND CA+ Tadbirlar va konferensiyalar"
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
                Tadbirlar &amp; Forumlar
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Tadbirlar
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              RESILAND CA+ va Markaziy Osiyo bo&apos;ylab hamkor tashkilotlarning bo&apos;lajak konferensiyalari, seminarlari, vebinarlari va o&apos;quv tadbirlari.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Mintaqaviy Ekologik Forumlar
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                Seminarlar &amp; Dala Treninglari
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
                placeholder="Tadbirlar bo'yicha qidiruv (nomi, manzili yoki mavzusi)..."
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
              
              {/* All Formats Dropdown (4 cols) */}
              <div className="sm:col-span-4 relative" ref={typeDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsCountryOpen(false);
                    setIsStatusOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isTypeOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedType === "all" ? "Barcha formatlar (All Types)" : selectedType}
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
                      <span>Barcha formatlar</span>
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
                    setIsStatusOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isCountryOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedCountry === "all" ? "Barcha davlatlar" : selectedCountry}
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
                      <span>Barcha davlatlar</span>
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

              {/* Status Dropdown (2 cols) */}
              <div className="sm:col-span-2 relative" ref={statusDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusOpen(!isStatusOpen);
                    setIsTypeOpen(false);
                    setIsCountryOpen(false);
                  }}
                  className={`w-full h-11 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isStatusOpen
                      ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                      : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/80 text-slate-800"
                  }`}
                >
                  <span className="truncate">
                    {selectedStatus === "all" ? "Holati (All)" : selectedStatus}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isStatusOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isStatusOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStatus("all");
                        setIsStatusOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedStatus === "all"
                          ? "bg-emerald-50 text-emerald-800 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      <span>Barcha holatlar</span>
                      {selectedStatus === "all" && (
                        <Check className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    {statuses.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedStatus(s);
                          setIsStatusOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          selectedStatus === s
                            ? "bg-emerald-50 text-emerald-800 font-bold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                        }`}
                      >
                        <span>{s}</span>
                        {selectedStatus === s && (
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
            EVENTS LIST (Modern Horizontal Bento Cards)
        ════════════════════════════════════════════════════ */}
        <section className="container mx-auto px-4 md:px-12 pb-20">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-slate-200 bg-slate-50 space-y-3">
              <Calendar className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Tadbir topilmadi
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Qidiruv so&apos;rovingiz yoki tanlangan filtrlarga mos keluvchi tadbir mavjud emas.
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
            <div className="space-y-6">
              {filteredEvents.map((item, idx) => {
                const delays = ["", "reveal-delay-150", "reveal-delay-200", "reveal-delay-300"];
                const isUpcoming = item.status === "Bo'lajak";

                return (
                  <div
                    key={item.id}
                    className={`group rounded-3xl border border-slate-200/90 border-l-[6px] border-l-emerald-600 bg-white p-6 sm:p-8 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 smooth-card-hover flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 reveal ${delays[idx % 4]}`}
                  >
                    {/* Left: Date Block & Info */}
                    <div className="flex items-start gap-5 sm:gap-7 flex-1">
                      
                      {/* Date Badge Box */}
                      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-3 sm:p-4 text-center shrink-0 w-20 sm:w-24 shadow-xs group-hover:scale-105 transition-transform duration-300">
                        <span className="block font-heading text-2xl sm:text-3xl font-black text-emerald-700 leading-none">
                          {item.day}
                        </span>
                        <span className="block text-xs font-extrabold text-emerald-900 uppercase mt-1 tracking-wider">
                          {item.month}
                        </span>
                        <span className="block text-[11px] font-semibold text-slate-400 mt-0.5">
                          {item.year}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2.5 flex-1">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold border shadow-xs ${
                              isUpcoming
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                isUpcoming ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                              }`}
                            />
                            {item.status}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <Tag className="h-3 w-3 text-slate-500" />
                            {item.type}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            <Globe2 className="h-3 w-3 text-slate-500" />
                            {item.country}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                          {item.title}
                        </h3>

                        {/* Location & Time Chips */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-slate-500 pt-1">
                          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                            <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {item.venue}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-1">
                          {item.description}
                        </p>

                        {/* Organizer */}
                        <div className="pt-2 text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                          <span>Tashkilotchi:</span>
                          <strong className="text-slate-700">{item.organizer}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="shrink-0 w-full lg:w-auto pt-2 lg:pt-0 flex items-center justify-end">
                      {isUpcoming ? (
                        <Button
                          asChild
                          className="w-full lg:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 h-11 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                        >
                          <Link href="/contact?type=event-registration" className="flex items-center justify-center gap-1.5">
                            <span>Ishtirok etish</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full lg:w-auto rounded-xl border-slate-300 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-slate-800 font-bold text-xs sm:text-sm px-6 h-11 transition-all cursor-pointer shadow-xs"
                        >
                          <Link href="/materials" className="flex items-center justify-center gap-1.5">
                            <span>Materiallar bilan tanishish</span>
                            <ArrowRight className="h-4 w-4 text-emerald-600" />
                          </Link>
                        </Button>
                      )}
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
