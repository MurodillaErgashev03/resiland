"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe2,
  CheckCircle2,
  Calendar,
  DollarSign,
  Building2,
  Trees,
  User,
  Mail,
  Phone,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Landmark,
  Target,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroQirgizBg from "@/assets/img/qirgiz.webp";
import flagKirgz from "@/assets/img/kirgz.png";

const specificObjectives = [
  {
    num: "01",
    title: "Iqlim ofatlari onlayn katalogi",
    titleEn: "Online Catalog of Climate-Induced Disasters",
    desc: "Markaziy Osiyoda transchegaraviy xarakterga ega bo'lgan joriy va kelajakdagi iqlim ofatlari bo'yicha yagona onlayn katalog ishlab chiqish hamda mintaqa hukumatlarini ustuvor xavfli hududlar va zaruriy choralar haqida muntazam xabardor qilish.",
    icon: Compass,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "02",
    title: "Tabiatga asoslangan yechimlar (NBS) qo'llanmasi",
    titleEn: "Nature-Based Solutions (NBS) Manual",
    desc: "Markaziy Osiyo sharoitida sel oqimlari, toshqinlar, ko'chkilar va boshqa iqlim ofatlarining oldini olish uchun tabiatga asoslangan yechimlarni (NBS) amaliyotga keng joriy etish bo'yicha standart qo'llanma va texnik yo'riqnomalarni tayyorlash.",
    icon: Trees,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "03",
    title: "Mintaqaviy sel xavfini yumshatish yo'l xaritasi",
    titleEn: "Regional Mudflow Mitigation Roadmap",
    desc: "Markaziy Osiyo mamlakatlari bo'ylab sel va toshqin xavfini kamaytirish bo'yicha hamkorlikdagi transchegaraviy harakatlar rejasi, investitsiya yo'l xaritasi hamda ustuvor loyihalarni ishlab chiqish.",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "04",
    title: "Mintaqaviy koordinatsiya va bilim almashinuvi",
    titleEn: "Regional Coordination Activities",
    desc: "Markaziy Osiyo hukumatlari, olimlar va mutaxassislar o'rtasida mintaqaviy hamkorlikni mustahkamlash uchun xalqaro bilim almashish tadbirlari, qo'shma ilmiy tadqiqotlar, dala safarlari va o'quv dasturlarini tashkil etish.",
    icon: Globe2,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
];

const targetGroups = [
  {
    title: "Davlat tashkilotlari & Agentliklar",
    sub: "Markaziy Osiyoning barcha 5 davlati vazirlik va qo'mitalari",
    icon: Landmark,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    title: "RESILAND CA+ Manfaatdor tomonlari",
    sub: "Mahalliy fermerlar, o'rmon xo'jaliklari va jamoalar",
    icon: Trees,
    color: "bg-sky-50 text-sky-800 border-sky-200",
  },
  {
    title: "Mintaqaviy siyosat va texnik ekspertlar",
    sub: "Yetakchi olimlar, gidrologlar, iqlimshunoslar va ekologlar",
    icon: Globe2,
    color: "bg-purple-50 text-purple-800 border-purple-200",
  },
];

export function KyrgyzstanClient() {
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* ─── Hero Section with Vivid Kyrgyz Landscape (100vh) ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroQirgizBg}
            alt="Qirg'iziston landshaftlari"
            fill priority quality={100}
            className="object-cover object-[center_30%]"
          />
          {/* Subtle soft gradient only behind text for crisp image presentation */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent w-full md:w-[55%]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Breadcrumb / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-emerald-300 border border-emerald-500/30 backdrop-blur-md hover:bg-black/60 transition-colors"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Dastur Komponentlari</span>
              </Link>
              <span className="text-white/40">/</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                Qirg&apos;iziston Respublikasi
              </span>
            </div>

            {/* Title with Flag */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative aspect-[3/2] w-14 sm:w-16 rounded-xl overflow-hidden shadow-lg border border-white/20 shrink-0">
                <Image
                  src={flagKirgz}
                  alt="Qirg'iziston bayrog'i"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                RESILAND CA+ Qirg&apos;iziston Respublikasida
              </h1>
            </div>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Markaziy Osiyoning umumiy iqlim barqarorligini oshirish maqsadida iqlim bilan bog&apos;liq ofatlar, tabiatga asoslangan yechimlar (NBS) va sel xavfini kamaytirish bo&apos;yicha mintaqaviy bilim mahsulotlarini ishlab chiqish.
            </p>

            {/* Quick KPI Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Faol subkomponent
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                Byudjet: $892,857 AQSH dollari
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                2025 – 2028 yillar
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">

        {/* ════════════════════════════════════════════════════
            1. LOYIHA PASPORTI & SIDEBAR (To'liq Light Bento Grid)
        ════════════════════════════════════════════════════ */}
        <section className="relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 md:px-12 mb-16 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Main Info Card (8 cols) — Light theme */}
            <div className="lg:col-span-8 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-slate-900/5 reveal-left">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Asosiy Ma&apos;lumotlar
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                    Loyiha Pasporti
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Faol holatda
                </span>
              </div>

              {/* Data Table / Rows */}
              <div className="divide-y divide-slate-100 text-sm mt-2">
                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                    Hudud va qamrov
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    Qirg&apos;iziston — butun Markaziy Osiyoni qamrab oluvchi mintaqaviy komponent
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    Loyiha holati
                  </span>
                  <span className="sm:col-span-2 font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Faol amalga oshirilmoqda (Active)
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />
                    Amal qilish muddati
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    2025-yil iyun — 2028-yil dekabr
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600 shrink-0" />
                    Umumiy byudjet
                  </span>
                  <span className="sm:col-span-2 font-black text-slate-950 text-base">
                    $892,857 AQSH dollari
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-emerald-600 shrink-0" />
                    Moliyalashtiruvchi
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    Xalqaro taraqqiyot assotsiatsiyasi (IDA) — Jahon banki
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <Trees className="h-4 w-4 text-emerald-600 shrink-0" />
                    Tematik yo&apos;nalish
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    Barqaror landshaft boshqaruvi va iqlim ofatlarini yumshatish
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600 shrink-0" />
                    Loyiha rahbari o&apos;rinbosari
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900 flex flex-wrap items-center gap-2">
                    <span>Lyudmila Kiktenko</span>
                    <a
                      href="mailto:lkiktenko@carececo.org"
                      className="text-xs text-emerald-700 hover:text-emerald-800 underline font-medium"
                    >
                      lkiktenko@carececo.org
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Cards (4 cols) — To'liq Light Theme */}
            <div className="lg:col-span-4 space-y-6 reveal-right">

              {/* Funding Partners Box (Light) */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Landmark className="h-4 w-4 text-emerald-600" />
                  <span>Moliyaviy Hamkor</span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                    IDA
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 text-sm tracking-tight">
                      WORLD BANK IDA
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Xalqaro taraqqiyot assotsiatsiyasi
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card (Deputy Team Leader) — Light Theme */}
              <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white text-slate-900 p-6 sm:p-7 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                    <User className="h-3.5 w-3.5 text-emerald-700" />
                    Loyiha Rahbari O&apos;rinbosari
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-slate-950">
                      Lyudmila Kiktenko
                    </h3>
                    <p className="text-xs text-emerald-700 font-bold mt-0.5">
                      RESILAND CA+ Mintaqaviy Muvofiqlashtiruvchisi
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 text-xs text-slate-700 border-t border-emerald-200/70 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                      <a href="mailto:lkiktenko@carececo.org" className="hover:text-emerald-800 transition-colors underline">
                        lkiktenko@carececo.org
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Building2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>CAREC Kotibiyati, Olmaota, Qozog&apos;iston</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                      <a href="tel:+77272654333" className="hover:text-emerald-800 transition-colors">
                        +7 (727) 265 4333
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            2. DASTUR SHARHI & ASOSIY MAQSADLAR (To'liq Light Theme)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-t border-b border-slate-200/80">
          <div className="container mx-auto px-4 md:px-12 space-y-16">

            {/* General Information (Modern 2-Column Bento Card) */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden reveal">
              <div className="absolute right-0 top-0 h-64 w-64 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Heading & Description */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    Dastur Tavsifi &amp; Mintaqaviy Kontekst
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    RESILAND Qirg&apos;iziston: <span className="gradient-text-emerald">Mintaqaviy Barqarorlik</span> Sari Qadam
                  </h2>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>
                      <strong className="text-slate-900 font-bold">RESILAND Qirg&apos;iziston mintaqaviy subkomponenti</strong> Jahon bankining Markaziy Osiyoda mintaqaviy landshaftlar barqarorligini oshirishga qaratilgan umumiy RESILAND CA+ Dasturi soyaboni ostida faoliyat yuritadi. 2019-yilda asos solingan mazkur dastur Markaziy Osiyo mamlakatlariga degradatsiyaga uchragan yerlarni tiklash orqali mintaqaviy ekologik barqarorlikni ta&apos;minlash uchun yagona tizimni taqdim etadi.
                    </p>
                    <p>
                      Dastur landshaftlarni tiklash bo&apos;yicha chuqur tahliliy va maslahat ishlarini moliyalashtiradi hamda tabiiy ofatlar xavfini kamaytirish bo&apos;yicha yuqori darajadagi muloqot uchun <strong className="text-emerald-700 font-bold">Mintaqaviy Almashinuv Platformasi</strong> bilan bog&apos;langan investitsiya loyihalarini qo&apos;llab-quvvatlaydi.
                    </p>
                  </div>

                  {/* 2 Key Metric Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> 2019-yildan boshlab
                      </span>
                      <p className="text-xs text-slate-600 font-medium">
                        Markaziy Osiyo bo&apos;ylab barqaror landshaftlarni tiklash tizimi.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <span className="text-xs font-bold text-teal-700 flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5" /> Transchegaraviy Qamrov
                      </span>
                      <p className="text-xs text-slate-600 font-medium">
                        Chegara hududlarida sel va yer degradatsiyasiga qarshi kurash.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: 3 Visual Feature Highlights */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-white shadow-xs space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Globe2 className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Mintaqaviy Integratsiya
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      5 ta Markaziy Osiyo davlati olimlari va mutaxassislarini bog&apos;lovchi yagona platforma.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white shadow-xs space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Ilmiy Tahlil &amp; Maslahat
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      Jahon banki va CAREC ning xalqaro tajribaga asoslangan texnik ko&apos;rsatmalari.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/90 to-white shadow-xs space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Iqlim Xavfini Kamaytirish
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      Tog&apos;li hududlarda sel, toshqin va ko&apos;chkilarga qarshi tabiatga asoslangan yechimlar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Objective Card — 2-Column Balanced Bento Grid */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white text-slate-900 relative overflow-hidden shadow-xl shadow-emerald-950/5 border border-emerald-200/90 reveal-scale">
              <div className="absolute right-0 bottom-0 h-96 w-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                
                {/* Left Side (7 cols): Objectives & Subcomponent 1.3 */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                    Asosiy Rivojlanish Maqsadi
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-950">
                      Loyiha Rivojlanishining Asosiy Maqsadlari
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-2">
                      RESILAND Qirg&apos;iziston Respublikasi loyihasining bosh maqsadlari quyidagilardan iborat:
                    </p>
                  </div>

                  {/* 2 Key Objectives */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2.5">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        1
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Landshaft boshqaruvini kengaytirish
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Qirg&apos;izistonning tanlangan ustuvor hududlarida barqaror landshaft boshqaruvi ostidagi umumiy maydonlarni kengaytirish.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2.5">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        2
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Transchegaraviy hamkorlik
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Markaziy Osiyo mamlakatlari bilan transchegaraviy landshaftlarni tiklash bo&apos;yicha hamkorlikni kuchaytirish.
                      </p>
                    </div>
                  </div>

                  {/* Subcomponent 1.3 Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-100/60 border border-emerald-300/80 text-xs text-slate-800 leading-relaxed">
                    <strong className="text-emerald-950 font-bold text-sm block mb-1">
                      Subkomponent 1.3 doirasidagi vazifalar:
                    </strong>
                    Ushbu subkomponent barcha 5 ta davlatda qo&apos;llaniladigan mintaqaviy bilim vositalarini yaratishga qaratilgan <span className="font-bold text-emerald-950">1.3-kichik komponentning 1-to&apos;plam faoliyatlarini</span> to&apos;liq amalga oshiradi.
                  </div>
                </div>

                {/* Right Side (5 cols): Strategic Outcomes / Results Framework */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 rounded-3xl bg-white/90 border border-emerald-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="h-4 w-4 text-emerald-600" />
                        Kutilayotgan Natijalar
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        KPI Indikatorlari
                      </span>
                    </div>

                    {/* 4 Outcome Items */}
                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            Raqamli Ofatlar Katalogi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Markaziy Osiyo bo&apos;yicha sel va tabiiy xavflar onlayn platformasi.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            NBS Standart Qo&apos;llanmasi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Tabiatga asoslangan muhandislik va biologik yechimlar yo&apos;riqnomasi.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            Mintaqaviy Sel Yo&apos;l Xaritasi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Chegaradosh davlatlar uchun umumiy investitsiya va monitoring rejasi.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            5 Davlat Integratsiyasi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Doimiy siyosiy muloqot va olimlar o&apos;rtasida tajriba almashinuvi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            3. SPECIFIC OBJECTIVES (4 ta Maxsus Vazifa)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-12 space-y-12">
          <div className="space-y-4 max-w-3xl reveal-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5" />
              Ustuvor Yo&apos;nalishlar
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              To&apos;rtta Maxsus Vazifa (Specific Objectives)
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Qirg&apos;iziston subkomponenti doirasida mintaqaviy miqyosda amalga oshirilayotgan to&apos;rtta asosiy texnik va amaliy yo&apos;nalish:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {specificObjectives.map((obj, idx) => {
              const Icon = obj.icon;
              const delays = ["", "reveal-delay-150", "reveal-delay-200", "reveal-delay-300"];
              return (
                <div
                  key={idx}
                  className={`group relative rounded-3xl border border-slate-200/90 ${obj.borderLeft} bg-white p-7 sm:p-8 shadow-xs hover:shadow-2xl hover:shadow-emerald-950/10 smooth-card-hover overflow-hidden reveal ${delays[idx]}`}
                >
                  {/* Top Number Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-3xl sm:text-4xl font-black text-slate-300 group-hover:text-emerald-600 transition-colors duration-300">
                      {obj.num}
                    </span>
                    <div className={`h-12 w-12 rounded-2xl ${obj.bgLight} flex items-center justify-center text-emerald-700 shadow-xs group-hover:scale-105 transition-transform duration-500`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                        {obj.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                        {obj.titleEn}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            4. MAQSADLI GURUHLAR (Target Groups)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-slate-50/80 border-t border-slate-200/80">
          <div className="container mx-auto px-4 md:px-12 space-y-8">
            <div className="space-y-2 reveal-left">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Qamrab Olingan Ishtirokchilar
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                Maqsadli Guruhlar (Target Groups)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {targetGroups.map((tg, idx) => {
                const Icon = tg.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xs hover:shadow-lg transition-all flex items-start gap-4 reveal"
                  >
                    <div className={`h-12 w-12 rounded-2xl border ${tg.color} flex items-center justify-center shrink-0 shadow-xs`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">
                        {tg.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                        {tg.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            5. CTA BANNER (Light Theme)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 container mx-auto px-4 md:px-12">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white text-slate-900 relative overflow-hidden shadow-xl shadow-emerald-950/5 border border-emerald-200/80 reveal-scale">
            <div className="absolute right-0 top-0 h-96 w-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Trees className="h-3.5 w-3.5" />
                  Qirg&apos;iziston ilmiy ma&apos;lumotlari
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Qirg&apos;iziston bo&apos;yicha hisobotlar va tadqiqotlar bilan tanishing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Tabiatga asoslangan yechimlar, sel xavfi xaritalari va ilmiy nashrlarni onlayn materiallar bazasidan erkin yuklab oling.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-7 h-11 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Link href="/materials?country=Kyrgyzstan">
                    Materiallarni ko&apos;rish <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs sm:text-sm px-6 h-11 transition-all cursor-pointer"
                >
                  <Link href="/programs">
                    Barcha dasturlar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
