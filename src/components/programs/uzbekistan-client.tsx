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
  Mountain,
  Users2,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroUzbekBg from "@/assets/img/uzb.webp";
import flagUzbek from "@/assets/img/uzbek.png";

const specificObjectives = [
  {
    num: "01",
    title: "Mintaqaviy Bilim va Almashinuv Platformasi",
    titleEn: "Regional Knowledge & Exchange Platform",
    desc: "Markaziy Osiyo mamlakatlarini birlashtiruvchi, transchegaraviy landshaftlarni tiklash va muhofaza etiladigan hududlarni boshqarish bo'yicha siyosat va yondashuvlarni uyg'unlashtiruvchi yagona yuqori darajadagi muloqot va bilim almashish platformasini boshqarish.",
    icon: Globe2,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "02",
    title: "Degradatsiyaga uchragan yerlar va Orolbo'yi ekotizimlari",
    titleEn: "Degraded Land & Aral Sea Basin Restoration",
    desc: "Orolbo'yi va unga yondosh cho'l-yaylov hududlarida tuproq sho'rlanishi, qurg'oqchilik va yer degradatsiyasiga qarshi tabiatga asoslangan zamonaviy yechimlar hamda agrao'rmonchilik choralarini kengaytirish.",
    icon: Trees,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "03",
    title: "Transchegaraviy ekotizimlar va tabiat turizmi",
    titleEn: "Transboundary Ecosystems & Nature Tourism",
    desc: "Qo'shni davlatlar bilan chegara hududlaridagi umumiy resurslarni boshqarish, transchegaraviy muhofaza zonalarini barqaror rivojlantirish hamda mintaqaviy ekoturizmdan iqtisodiy foyda olish mexanizmlari.",
    icon: Mountain,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    num: "04",
    title: "Institutsional salohiyat va xalqaro tajriba transferi",
    titleEn: "Institutional Capacity & Technical Support",
    desc: "O'zbekiston Ekologiya, atrof-muhitni muhofaza qilish va iqlim o'zgarishi vazirligi, O'rmon xo'jaligi agentligi va sohaviy mutaxassislarga xalqaro ekspertlik ko'magi hamda zamonaviy monitoring tizimlarini taqdim etish.",
    icon: FileCheck,
    accent: "from-emerald-500 to-teal-600",
    borderLeft: "border-l-[6px] border-l-emerald-600",
    bgLight: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
];

const targetGroups = [
  {
    title: "Davlat idoralari va Vazirliklar",
    sub: "Markaziy Osiyoning barcha 5 ta davlati sohaviy vazirliklari",
    icon: Landmark,
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    title: "RESILAND CA+ Manfaatdor tomonlari",
    sub: "Fermer xo'jaliklari, o'rmonchilar va mahalliy aholi jamoalari",
    icon: Sprout,
    color: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    title: "Mintaqaviy siyosat va texnik ekspertlar",
    sub: "Xalqaro olimlar, ekologlar, gidrologlar va tadqiqotchilar",
    icon: Globe2,
    color: "bg-sky-50 text-sky-800 border-sky-200",
  },
];

export function UzbekistanClient() {
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

      {/* ─── Hero Section with Vivid Uzbek Landscape (100vh) ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroUzbekBg}
            alt="O'zbekiston tabiat manzaralari va tog'lari"
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
                O&apos;zbekiston Respublikasi
              </span>
            </div>

            {/* Title with Flag */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative aspect-[3/2] w-14 sm:w-16 rounded-xl overflow-hidden shadow-lg border border-white/20 shrink-0">
                <Image
                  src={flagUzbek}
                  alt="O'zbekiston bayrog'i"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                O&apos;zbekistonda RESILAND CA+
              </h1>
            </div>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Mintaqaviy almashinuv platformasi va umumiy bilim tashabbuslari orqali O&apos;zbekistonning Markaziy Osiyo mamlakatlari bilan transchegaraviy hamkorlik va landshaftlarni tiklash borasidagi aloqalarini rag&apos;batlantirish.
            </p>

            {/* Quick KPI Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Faol subkomponent
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                Byudjet: $2,000,000 AQSH dollari
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
                    Loyiha Pasporti
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                    Loyiha Haqida Ma&apos;lumot
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
                    Joylashuvi
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    O&apos;zbekiston — Markaziy Osiyoni qamrab oluvchi mintaqaviy komponent
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
                    Davomiyligi
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    2025-yil iyul — 2028-yil avgust
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600 shrink-0" />
                    Umumiy byudjet
                  </span>
                  <span className="sm:col-span-2 font-black text-slate-950 text-base">
                    $2,000,000 AQSH dollari
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-emerald-600 shrink-0" />
                    Moliyalashtirish
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    XAR (Jahon banki) · PROGREEN · KWPF (Koreya–Jahon banki hamkorlik jamg&apos;armasi)
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <Trees className="h-4 w-4 text-emerald-600 shrink-0" />
                    Mavzu sohasi
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900">
                    Landshaftlarni barqaror boshqarish va Orolbo&apos;yi ekotizimlarini tiklash
                  </span>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-semibold text-slate-500 flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600 shrink-0" />
                    Guruh rahbari o&apos;rinbosari
                  </span>
                  <span className="sm:col-span-2 font-bold text-slate-900 flex flex-wrap items-center gap-2">
                    <span>Azamat Kauazov</span>
                    <a
                      href="mailto:cacip@carececo.org"
                      className="text-xs text-emerald-700 hover:text-emerald-800 underline font-medium"
                    >
                      cacip@carececo.org
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
                  <span>Moliyaviy Hamkorlar</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                      WB
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-xs">
                        JAHON BANKI XAR
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Xalqaro taraqqiyot assotsiatsiyasi
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50/50 border border-teal-200/80 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                      PG
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-xs">
                        PROGREEN
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Global barqaror landshaftlar jamg&apos;armasi
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200/80 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-xs shadow-sm shrink-0">
                      KWPF
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 text-xs">
                        KWPF
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Koreya–Jahon banki hamkorlik jamg&apos;armasi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card (Deputy Team Leader) — Light Theme */}
              <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white text-slate-900 p-6 sm:p-7 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                    <User className="h-3.5 w-3.5 text-emerald-700" />
                    Guruh Rahbari O&apos;rinbosari
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-slate-950">
                      Azamat Kauazov
                    </h3>
                    <p className="text-xs text-emerald-700 font-bold mt-0.5">
                      RESILAND CA+ O&apos;zbekiston Muvofiqlashtiruvchisi
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 text-xs text-slate-700 border-t border-emerald-200/70 font-medium">
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                      <a href="mailto:cacip@carececo.org" className="hover:text-emerald-800 transition-colors underline">
                        cacip@carececo.org
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
            2. UMUMIY MA'LUMOT (Bento Grid)
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
                    RESILAND O&apos;zbekiston: <span className="gradient-text-emerald">Mintaqaviy Tiklanish</span> Tashabbusi
                  </h2>

                  <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>
                      O&apos;zbekistondagi loyiha Jahon bankining RESILAND CA+ dasturining ajralmas qismi bo&apos;lib, uning asosiy maqsadi <strong className="text-slate-900 font-bold">Markaziy Osiyodagi mintaqaviy landshaftlarning barqarorligini oshirishdir</strong>. U Tojikiston va Qirg&apos;iz Respublikasidagi o&apos;xshash milliy va mintaqaviy maqsadlarga ega bo&apos;lgan RESILAND CA+ loyihalari bilan hamohang tarzda amalga oshiriladi.
                    </p>
                    <p>
                      Mintaqaviy hamkorlikni mustahkamlash O&apos;zbekiston va unga qo&apos;shni davlatlarga <strong className="text-emerald-700 font-bold">umumiy resurslarni boshqarishda</strong>, mintaqaviy tabiat turizmi bilan bog&apos;liq iqtisodiy samaradorlikdan foydalanishda hamda iqlim o&apos;zgarishi oqibatlariga qarshi kurashishda jamoaviy harakatlarni osonlashtirishga xizmat qiladi.
                    </p>
                    <p>
                      <strong className="text-emerald-700 font-bold">Mintaqaviy bilim almashish platformasi</strong> O&apos;zbekistonga boshqa Markaziy Osiyo mamlakatlari bilan birgalikda salohiyatni oshirish, texnik yordam hamda mintaqaviy manfaatdor tomonlar va xalqaro hamkorlar bilan mustahkam aloqalardan foydalanish imkonini beradi.
                    </p>
                  </div>

                  {/* 2 Key Metric Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> PROGREEN &amp; KWPF
                      </span>
                      <p className="text-xs text-slate-600 font-medium">
                        Xalqaro grantlar va innovatsion texnologiyalar jalb etilishi.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <span className="text-xs font-bold text-teal-700 flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5" /> Orolbo&apos;yi &amp; Mintaqa
                      </span>
                      <p className="text-xs text-slate-600 font-medium">
                        Degradatsiyaga uchragan yerlarni kompleks tiklash choralari.
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
                        Mintaqaviy Bilim Platformasi
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      Mintaqa mamlakatlari bilan ilmiy ma&apos;lumotlar va ekspert xulosalarini tezkor almashish.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white shadow-xs space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Sprout className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Agrao&apos;rmonchilik &amp; Sho&apos;rlanish
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      Qurg&apos;oqchil zonalarda tuproq unumdorligini oshirish va ko&apos;kalamzorlashtirish.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/90 to-white shadow-xs space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Iqlim Xavflariga Moslashuv
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      Iqlim o&apos;zgarishi oqibatlariga qarshi transchegaraviy moslashuv strategiyalari.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maqsad va Vazifalar — 2-Column Balanced Bento Grid */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white text-slate-900 relative overflow-hidden shadow-xl shadow-emerald-950/5 border border-emerald-200/90 reveal-scale">
              <div className="absolute right-0 bottom-0 h-96 w-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                
                {/* Left Side (7 cols): Objectives & Key Tasks */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                    Strategik Yo&apos;nalishlar
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-950">
                      Maqsad va Vazifalar
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mt-2">
                      RESILAND O&apos;zbekiston subkomponentining bosh strategik vazifalari:
                    </p>
                  </div>

                  {/* 2 Key Objectives */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2.5">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        1
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Transchegaraviy hamkorlikni rag&apos;batlantirish
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        O&apos;zbekistonning Markaziy Osiyo mamlakatlari bilan transchegaraviy hamkorlik va landshaftlarni tiklash bo&apos;yicha aloqalarini rag&apos;batlantirish.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2.5">
                      <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        2
                      </div>
                      <h4 className="font-bold text-slate-950 text-sm">
                        Mintaqaviy almashinuv platformasi
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Muhofaza etiladigan hududlarni boshqarish bo&apos;yicha siyosat va yondashuvlarni uyg&apos;unlashtirish uchun yagona platformani boshqarish.
                      </p>
                    </div>
                  </div>

                  {/* Regional Mandate Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-100/60 border border-emerald-300/80 text-xs text-slate-800 leading-relaxed">
                    <strong className="text-emerald-950 font-bold text-sm block mb-1">
                      Mintaqaviy Muvofiqlashtirish:
                    </strong>
                    Ushbu topshiriq Markaziy Osiyo davlatlari o&apos;rtasida landshaftlarni tiklash bo&apos;yicha bilim va texnologiyalarni transfer qilish, umumiy ekologik xatarlarga qarshi birgalikda kurashishni ta&apos;minlaydi.
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
                            Raqamli Bilim Almashinuv Platformasi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Markaziy Osiyo bo&apos;yicha yagona elektron resurs va ekspertlar bazasi.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            Orolbo&apos;yi Ekotizimlarini Tiklash
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Sho&apos;rlangan tuproqlarni yaxshilash va fitomelioratsiya loyihalari.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            Xalqaro Hamkorlik Jamg&apos;armalari
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            PROGREEN va KWPF orqali grantlar va investitsiyalar jalb etilishi.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            Transchegaraviy Siyosat Uyg&apos;unlashuvi
                          </p>
                          <p className="text-slate-500 mt-0.5 leading-relaxed">
                            Qo&apos;shni davlatlar bilan ekologik koridorlar va qo&apos;riqxona boshqaruvi.
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
            3. MAXSUS VAZIFALAR (Specific Objectives - Emerald Border Left)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-12 space-y-12">
          <div className="space-y-4 max-w-3xl reveal-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5" />
              Ustuvor Yo&apos;nalishlar
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              O&apos;zbekiston Subkomponenti Maxsus Vazifalari
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Mintaqaviy landshaftlarni tiklash, Orolbo&apos;yi ekologiyasi va transchegaraviy aloqalarni kuchaytirishga qaratilgan to&apos;rtta asosiy texnik yo&apos;nalish:
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
                  O&apos;zbekiston ilmiy ma&apos;lumotlari
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                  O&apos;zbekiston bo&apos;yicha hisobotlar va tadqiqotlar bilan tanishing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Mintaqaviy bilim platformasi, Orolbo&apos;yi landshaftlarini tiklash va agrao&apos;rmonchilik hisobotlarini onlayn materiallar bazasidan yuklab oling.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-7 h-11 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Link href="/materials?country=Uzbekistan">
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
