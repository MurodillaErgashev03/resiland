"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Globe2,
  CheckCircle2,
  Clock,
  Compass,
  Sparkles,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroMountainBg from "@/assets/img/image.png";
import flagKirgz from "@/assets/img/kirgz.png";
import flagTojik from "@/assets/img/tojik.png";
import flagUzbek from "@/assets/img/uzbek.png";
import flagQozoq from "@/assets/img/qozoq.png";
import flagTurkman from "@/assets/img/turkman.png";

const activePrograms = [
  {
    code: "KG",
    name: "Qirg'iziston Respublikasi",
    flag: flagKirgz,
    status: "Faol subkomponent",
    desc: "Iqlim oqibatidagi ofatlar, Tabiatga asoslangan yechimlar (NBS) bo'yicha ko'rsatmalar va Markaziy Osiyo uchun mintaqaviy sel oqimini yumshatish yo'l xaritasining onlayn katalogini ishlab chiqish.",
    href: "/programs/kyrgyzstan",
    tags: ["Tabiatga asoslangan yechimlar", "Sel oqimlari katalogi", "Ofatlar xavfi"],
    target: "Tog'li landshaftlar va yaylovlar",
  },
  {
    code: "TJ",
    name: "Tojikiston",
    flag: flagTojik,
    status: "Faol subkomponent",
    desc: "Mintaqaviy almashinuv platformasini ishlab chiqish va boshqarish, landshaftlarni tiklash va muhofaza etiladigan hududlarni boshqarish bo'yicha transchegaraviy siyosiy muloqotni rag'batlantirish.",
    href: "/programs/tajikistan",
    tags: ["Almashinuv platformasi", "Siyosiy muloqot", "Muhofaza hududlari"],
    target: "Transchegaraviy muhofaza zonalari",
  },
  {
    code: "UZ",
    name: "O'zbekiston",
    flag: flagUzbek,
    status: "Faol subkomponent",
    desc: "O'zbekistonning Markaziy Osiyo mamlakatlari bilan transchegaraviy hamkorlik, landshaftlarni tiklash va mintaqaviy bilim almashinuvi bo'yicha hamkorligini rivojlantirish.",
    href: "/programs/uzbekistan",
    tags: ["Orolbo'yi ekotizimlari", "Bilim almashinuvi", "Landshaft tiklash"],
    target: "Orol dengizi havzasi & cho'llar",
  },
];

const engagementPrograms = [
  {
    code: "KZ",
    name: "Qozog'iston",
    flag: flagQozoq,
    status: "Maslahat berish bosqichi",
    desc: "Agroo'rmonchilik va iqlimga moslashuvchan ko'chat yetishtirishni sinovdan o'tkazish. Qozog'istonning 2 milliard daraxt ekish bo'yicha milliy maqsadiga mos keladi. Mintaqaviy subkomponent ishlab chiqilmoqda.",
    tags: ["2 mlrd daraxt ekish", "Agroo'rmonchilik", "Ko'chat yetishtirish"],
    focus: "Qurg'oqchil yerlar & o'rmonchilik",
  },
  {
    code: "TM",
    name: "Turkmaniston",
    flag: flagTurkman,
    status: "Maslahat berish bosqichi",
    desc: "Jahon bankining landshaftni o'rganish ishlari olib borilmoqda — yer degradatsiyasining \"qaynoq nuqtalari\" va tiklash choralari uchun ustuvor hududlar aniqlanmoqda. Faol loyiha ishlab chiqish jarayoni davom etmoqda.",
    tags: ["Degradatsiya xaritasi", "Qaynoq nuqtalar", "Landshaft tahlili"],
    focus: "Cho'llanishga qarshi monitoring",
  },
];

const statsHighlights = [
  { value: "5", label: "Markaziy Osiyo davlati", icon: Globe2 },
  { value: "3", label: "Faol milliy subkomponent", icon: CheckCircle2 },
  { value: "2", label: "Jalb qilish bosqichida", icon: Clock },
  { value: "1", label: "Mintaqaviy yagona platforma", icon: Compass },
];

export function ProgramsClient() {
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

      {/* ─── Hero Section — CSS entrance animations ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroMountainBg}
            alt="Markaziy Osiyo tog' va landshaftlari"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/40 text-emerald-300 border border-emerald-500/30 shadow-md backdrop-blur-md hero-animate-badge">
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
              RESILAND CA+
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] hero-animate-headline">
              Dastur Komponentlari
            </h1>

            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50 hero-animate-subtitle" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hero-animate-cta">
              CAREC RESILAND CA+ ning mintaqaviy subkomponentlarini beshta Markaziy Osiyo mamlakati bo&apos;ylab muvofiqlashtiradi, transchegaraviy landshaftlarni tiklash va iqlim o&apos;zgarishiga chidamlilik bo&apos;yicha yuqori darajadagi muloqot uchun Mintaqaviy almashinuv platformasini boshqaradi.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">

        {/* ════════════ 1. STATS STRIP — Modern floating glass cards with theme accents ════════════ */}
        <section className="relative z-20 -mt-12 sm:-mt-16 container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                value: "5",
                label: "Markaziy Osiyo davlati",
                desc: "Qamrab olingan mintaqa",
                badge: "100% integratsiya",
                badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                icon: Globe2,
                iconBg: "bg-emerald-100/80 text-emerald-700 border-emerald-200",
                accentColor: "border-t-4 border-t-emerald-500",
                valColor: "gradient-text-emerald",
                glow: "bg-emerald-200/40",
              },
              {
                value: "3",
                label: "Faol milliy subkomponent",
                desc: "KG, TJ, UZ loyihalari",
                badge: "Amaliy bosqichda",
                badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
                icon: CheckCircle2,
                iconBg: "bg-sky-100/80 text-sky-700 border-sky-200",
                accentColor: "border-t-4 border-t-sky-500",
                valColor: "gradient-text-teal",
                glow: "bg-sky-200/40",
              },
              {
                value: "2",
                label: "Jalb qilish bosqichida",
                desc: "KZ va TM faoliyati",
                badge: "Maslahat & Tahlil",
                badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
                icon: Clock,
                iconBg: "bg-purple-100/80 text-purple-700 border-purple-200",
                accentColor: "border-t-4 border-t-purple-500",
                valColor: "text-purple-700",
                glow: "bg-purple-200/40",
              },
              {
                value: "1",
                label: "Mintaqaviy yagona platforma",
                desc: "CAREC muvofiqlashtiruvi",
                badge: "Yagona ekotizim",
                badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
                icon: Compass,
                iconBg: "bg-amber-100/80 text-amber-700 border-amber-200",
                accentColor: "border-t-4 border-t-amber-500",
                valColor: "text-amber-600",
                glow: "bg-amber-200/40",
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const delays = ["", "reveal-delay-100", "reveal-delay-200", "reveal-delay-300"];
              return (
                <div
                  key={idx}
                  className={`group relative rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 smooth-card-hover overflow-hidden ${stat.accentColor} reveal ${delays[idx]}`}
                >
                  {/* Subtle corner glow */}
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.glow} blur-xl pointer-events-none opacity-60 group-hover:scale-125 transition-transform duration-500`} />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-2xl border ${stat.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-500`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${stat.badgeColor}`}>
                        {stat.badge}
                      </span>
                    </div>

                    <div>
                      <p className={`font-heading text-3xl sm:text-4xl font-black tracking-tight leading-none ${stat.valColor}`}>
                        {stat.value}
                      </p>
                      <h4 className="text-sm font-bold text-slate-950 mt-2 leading-snug">
                        {stat.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════ 2. FAOL SUBKOMPONENTLAR ════════════ */}
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-12 space-y-12">

          {/* Header — chapdan keladi */}
          <div className="space-y-4 max-w-3xl reveal-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Amaliyotdagi loyihalar
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Uchta Faol Mintaqaviy Subkomponent
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Mintaqaviy subkomponentlar transchegaraviy hamkorlik, bilim almashinuvi va siyosatni uyg&apos;unlashtirishga qaratilgan bo&apos;lib, milliy sa&apos;y-harakatlarni yagona mintaqaviy tizimga bog&apos;laydi.
            </p>
          </div>

          {/* Cards — 1 qatorda 2 ta uzunchoq card, sekin va silliq hover animatsiyasi bilan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 pt-6">
            {activePrograms.map((item, idx) => {
              const delays = ["", "reveal-delay-150", "reveal-delay-300"];
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`group relative flex flex-col sm:flex-row rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xs hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/10 smooth-card-hover reveal ${delays[idx]}`}
                >
                  {/* Left Flag Container: silliq harakatlanuvchi rasm */}
                  <div className="relative aspect-[3/2] w-36 sm:w-48 md:w-52 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-slate-200/80 -mt-8 sm:-mt-10 sm:my-auto bg-slate-100 smooth-card-image">
                    <Image
                      src={item.flag}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 144px, 208px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Right Content Body */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors duration-300 leading-snug">
                          {item.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Faol
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80 group-hover:border-slate-300 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium truncate max-w-[60%]">
                        {item.target}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-all duration-300 group-hover:gap-2">
                        Batafsil <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ════════════ 3. JALBLASH BOSQICHI ════════════ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 border-t border-slate-200/80">
          <div className="container mx-auto px-4 md:px-12 space-y-12">

            {/* Header — o'ngdan keladi */}
            <div className="space-y-4 max-w-3xl reveal-right">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Konsultatsiya &amp; Tahlil jarayoni
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                Jalblash bosqichi
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Qozog&apos;iston va Turkmaniston maslahat va landshaftni o&apos;rganish faoliyatlari orqali jalb qilingan bo&apos;lib, ularni to&apos;liq mintaqaviy subkomponent tizimiga integratsiyalash bo&apos;yicha faol ishlar olib borilmoqda.
              </p>
            </div>

            {/* Cards — 1 qatorda 2 ta uzunchoq card, sekin va silliq hover animatsiyasi bilan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 pt-6">
              {engagementPrograms.map((item, idx) => {
                const direction = idx % 2 === 0 ? "reveal-left" : "reveal-right";
                const delay = idx === 1 ? "reveal-delay-200" : "";
                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col sm:flex-row rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xs hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-950/10 smooth-card-hover ${direction} ${delay}`}
                  >
                    {/* Left Flag Container */}
                    <div className="relative aspect-[3/2] w-36 sm:w-48 md:w-52 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-slate-200/80 -mt-8 sm:-mt-10 sm:my-auto bg-slate-100 smooth-card-image">
                      <Image
                        src={item.flag}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 144px, 208px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-950 leading-snug">
                            {item.name}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                            <Clock className="h-3 w-3" />
                            Maslahat bosqichi
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{item.desc}</p>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {item.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-purple-50/70 text-purple-900 font-medium border border-purple-200/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">{item.focus}</span>
                        <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                          Tayyorgarlikda
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════ 4. REGIONAL PLATFORM CTA — Light theme & scale-in ════════════ */}
        <section className="py-16 md:py-20 container mx-auto px-4 md:px-12">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white text-slate-900 relative overflow-hidden shadow-xl shadow-emerald-950/5 border border-emerald-200/80 reveal-scale">
            <div className="absolute right-0 top-0 h-96 w-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
            <div className="absolute left-0 bottom-0 h-96 w-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />
            <div className="absolute inset-0 bg-topo opacity-40 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              {/* Left */}
              <div className="max-w-2xl space-y-4 reveal-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-300/80 shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Mintaqaviy integratsiya
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  Markaziy Osiyo bo&apos;ylab <span className="gradient-text-emerald">transchegaraviy bilim</span> va axborot almashinuvi
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  CAREC tomonidan muvofiqlashtiriladigan Mintaqaviy Almashinuv Platformasi barcha 5 davlat mutaxassislari, olimlari va hukumat vakillariga yer degradatsiyasiga qarshi kurashishda eng ilg&apos;or tajribalar va tahlillarni ulashish imkonini beradi.
                </p>
              </div>

              {/* Right buttons */}
              <div className="shrink-0 flex flex-col gap-3 reveal-right reveal-delay-200 w-full sm:w-auto">
                <Button
                  asChild
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-7 h-11 shadow-lg shadow-emerald-600/25 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Link href="/materials">
                    Materiallar bazasini ko&apos;rish <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-emerald-300/80 bg-white/90 hover:bg-emerald-50/80 text-emerald-800 font-bold text-xs sm:text-sm px-7 h-11 shadow-xs transition-all cursor-pointer"
                >
                  <Link href="/about">
                    RESILAND haqida batafsil
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
