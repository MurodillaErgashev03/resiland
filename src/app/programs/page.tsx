import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Layers,
  Globe2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  Building2,
  BarChart3,
  Trees,
} from "lucide-react";

import heroMountainBg from "@/assets/img/image.png";
import flagKirgz from "@/assets/img/kirgz.png";
import flagTojik from "@/assets/img/tojik.png";
import flagUzbek from "@/assets/img/uzbek.png";
import flagQozoq from "@/assets/img/qozoq.png";
import flagTurkman from "@/assets/img/turkman.png";

export const metadata: Metadata = {
  title: "Dastur Komponentlari | RESILAND CA+",
  description:
    "CAREC RESILAND CA+ ning mintaqaviy subkomponentlari: Markaziy Osiyo mamlakatlarida transchegaraviy landshaftlarni tiklash va iqlim o'zgarishiga chidamlilik dasturlari.",
};

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

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* ─── Hero Section with Mountain Landscape (100vh) — identical to /about ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroMountainBg}
            alt="Markaziy Osiyo tog' va landshaftlari"
            fill
            priority
            quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Dark gradient for perfect readability and seamless transparent header integration */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/40 text-emerald-300 border border-emerald-500/30 shadow-md backdrop-blur-md">
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
              RESILAND CA+
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Dastur Komponentlari
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              CAREC RESILAND CA+ ning mintaqaviy subkomponentlarini beshta Markaziy Osiyo mamlakati bo&apos;ylab muvofiqlashtiradi, transchegaraviy landshaftlarni tiklash va iqlim o&apos;zgarishiga chidamlilik bo&apos;yicha yuqori darajadagi muloqot uchun Mintaqaviy almashinuv platformasini boshqaradi.
            </p>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/80 z-10 pointer-events-none">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Pastga siljiting</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-emerald-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        
        {/* ════════════════════════════════════════════════════
            1. QUICK OVERVIEW STATS STRIP
        ════════════════════════════════════════════════════ */}
        <section className="border-b border-slate-200/80 bg-slate-50/70">
          <div className="container mx-auto px-4 md:px-12 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {statsHighlights.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 hover:shadow-md hover:shadow-black/5 transition-all flex items-center gap-3.5"
                  >
                    <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            2. UCHTA FAOL MINTAQAVIY SUBKOMPONENT
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 container mx-auto px-4 md:px-12 space-y-12">
          <div className="space-y-4 max-w-3xl">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {activePrograms.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Flag Header with Exact 3:2 Ratio so 100% of the flag is visible */}
                <div className="relative aspect-[3/2] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                  <Image
                    src={item.flag}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-950 group-hover:text-emerald-700 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Faol
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 font-medium border border-slate-200/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[60%]">
                      {item.target}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-all group-hover:gap-2">
                      Batafsil <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            3. JALBLASH BOSQICHI (Engagement Phase)
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 border-t border-slate-200/80">
          <div className="container mx-auto px-4 md:px-12 space-y-12">
            <div className="space-y-4 max-w-3xl">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {engagementPrograms.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-purple-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Flag Header with exact 3:2 ratio */}
                  <div className="relative aspect-[3/2] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                    <Image
                      src={item.flag}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                    <div className="space-y-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-950 leading-snug">
                          {item.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                          <Clock className="h-3 w-3" />
                          Maslahat bosqichi
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-purple-50/70 text-purple-900 font-medium border border-purple-200/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">{item.focus}</span>
                      <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                        Tayyorgarlikda
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            4. REGIONAL COORDINATION PLATFORM BANNER
        ════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 container mx-auto px-4 md:px-12">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white relative overflow-hidden shadow-2xl shadow-black/20 border border-slate-800">
            <div className="absolute right-0 top-0 h-96 w-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-0 bottom-0 h-96 w-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                Mintaqaviy integratsiya
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Markaziy Osiyo bo&apos;ylab transchegaraviy bilim va axborot almashinuvi
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                CAREC tomonidan muvofiqlashtiriladigan Mintaqaviy Almashinuv Platformasi barcha 5 davlat mutaxassislari, olimlari va hukumat vakillariga yer degradatsiyasiga qarshi kurashishda eng ilg&apos;or tajribalar va tahlillarni ulashish imkonini beradi.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 h-11 shadow-lg shadow-emerald-700/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <Link href="/materials">
                    Materiallar bazasini ko&apos;rish <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 h-11 backdrop-blur-md transition-all cursor-pointer"
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

      <Footer />
    </div>
  );
}

function Button({
  children,
  className,
  asChild,
  variant,
  ...props
}: any) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
}
