"use client";

import React, { useState } from "react";
import Image from "next/image";
import mapImage from "@/assets/img/map.png";
import { Globe, MapPin, Trees, Layers, ArrowUpRight, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CountryZone {
  code: string;
  name: string;
  flag: string;
  focus: string;
  materialsCount: number;
  areaRestored: string;
  badgeColor: string;
  coords: { x: number; y: number; width?: string };
}

const REGION_COUNTRIES: CountryZone[] = [
  {
    code: "kz",
    name: "Qozog'iston",
    flag: "🇰🇿",
    focus: "Dasht va o'rmon landshaftlarini tiklash, sho'rlanish nazorati",
    materialsCount: 384,
    areaRestored: "450,000 ga",
    badgeColor: "from-sky-500/20 to-emerald-500/20 border-sky-500/30 text-sky-300",
    coords: { x: 55, y: 41 },
  },
  {
    code: "uz",
    name: "O'zbekiston",
    flag: "🇺🇿",
    focus: "Orol dengizi tubini o'rmonlashtirish, cho'llanishga qarshi kurash",
    materialsCount: 412,
    areaRestored: "380,000 ga",
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
    coords: { x: 33, y: 58 },
  },
  {
    code: "kg",
    name: "Qirg'iziston",
    flag: "🇰🇬",
    focus: "Tog' o'rmonlari, yaylovlar boshqaruvi va biologik xilma-xillik",
    materialsCount: 198,
    areaRestored: "120,000 ga",
    badgeColor: "from-amber-500/20 to-emerald-500/20 border-amber-500/30 text-amber-300",
    coords: { x: 82, y: 66 },
  },
  {
    code: "tj",
    name: "Tojikiston",
    flag: "🇹🇯",
    focus: "Muzliklar muhofazasi, suv havzalari va eroziv yonbag'irlarni mustahkamlash",
    materialsCount: 165,
    areaRestored: "95,000 ga",
    badgeColor: "from-teal-500/20 to-sky-500/20 border-teal-500/30 text-teal-300",
    coords: { x: 64, y: 84 },
  },
  {
    code: "tm",
    name: "Turkmaniston",
    flag: "🇹🇲",
    focus: "Qoraqum cho'li ekotizimlari, ko'kalamzorlashtirish va suv resurslari",
    materialsCount: 142,
    areaRestored: "110,000 ga",
    badgeColor: "from-emerald-500/20 to-emerald-700/20 border-emerald-600/30 text-emerald-300",
    coords: { x: 31, y: 80 },
  },
];

export function InteractiveRegionMap() {
  const [selectedCountry, setSelectedCountry] = useState<CountryZone>(REGION_COUNTRIES[1]); // default Uzbekistan

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-xs overflow-hidden text-slate-900">
      {/* Header inside component */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950">
              Markaziy Osiyo Geofazoviy Xaritasi
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Mamlakatni tanlang va hududiy ekologik loyihalar hamda ilmiy materiallar bilan tanishing
            </p>
          </div>
        </div>

        {/* Quick Country Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
          {REGION_COUNTRIES.map((c) => {
            const isSelected = selectedCountry.code === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setSelectedCountry(c)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Map on Left / Active Country Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-7 relative w-full aspect-[1024/637] rounded-2xl border border-slate-200 overflow-hidden shadow-inner bg-slate-900">
          <Image
            src={mapImage}
            alt="Markaziy Osiyo Xaritasi"
            fill
            priority
            className="object-cover object-center select-none pointer-events-none opacity-95"
          />

          {/* Interactive Clickable Hotspots for Each Country */}
          {REGION_COUNTRIES.map((country) => {
            const isSelected = selectedCountry.code === country.code;
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => setSelectedCountry(country)}
                style={{ left: `${country.coords.x}%`, top: `${country.coords.y}%` }}
                aria-label={`${country.name} tanlash`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 focus:outline-none ${
                  isSelected ? "scale-110 z-30" : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md transition-all ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-black border-2 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.9)] ring-4 ring-emerald-500/30"
                      : "bg-slate-950/85 hover:bg-slate-900 text-white font-semibold border border-white/25 hover:border-emerald-400 shadow-lg"
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-90">
                    {country.code.toUpperCase()}
                  </span>
                  <span className="text-xs whitespace-nowrap font-bold">
                    {country.name}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping ml-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Country Details Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div>
                  <h4 className="text-lg font-black tracking-tight text-slate-950 flex items-center gap-2">
                    <span>{selectedCountry.name}</span>
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    CAREC / WB Dastur a&apos;zosi
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Asosiy Ekologik Yo&apos;nalish
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedCountry.focus}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-emerald-600" />
                  Hujjatlar & Resurslar
                </span>
                <span className="text-xl font-extrabold text-slate-900 block">
                  {selectedCountry.materialsCount} ta
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                  <Trees className="h-3.5 w-3.5 text-emerald-600" />
                  Tiklanayotgan maydon
                </span>
                <span className="text-xl font-extrabold text-emerald-700 block">
                  {selectedCountry.areaRestored}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button asChild className="w-full h-11 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer">
                <Link href={`/materials?country=${selectedCountry.code}`}>
                  <span>{selectedCountry.name} materiallarini ko&apos;rish</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
