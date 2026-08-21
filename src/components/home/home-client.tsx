"use client";

import Image from "next/image";
import heroMountainBg from "@/assets/img/back2.jpg";
import flagUzbek from "@/assets/img/uzbek.png";
import flagTurkman from "@/assets/img/turkman.png";
import flagTojik from "@/assets/img/tojik.png";
import flagKirgz from "@/assets/img/kirgz.png";
import flagQozoq from "@/assets/img/qozoq.png";
import { useLanguage } from "@/context/language-context";
import { HeroSearch } from "@/components/search/hero-search";
import { StatsPanel } from "@/components/materials/stats-panel";
import { RecentMaterials } from "@/components/materials/recent-materials";
import { InteractiveRegionMap } from "@/components/home/interactive-region-map";
import { StatsData, Material } from "@/types";
import {
  ShieldCheck,
  Trees,
  ArrowRight,
  Landmark,
  Globe2,
  FileText,
  Download,
  Mail,
  ChevronRight,
  TrendingUp,
  MapPin,
  Users,
  Calendar,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomeClientProps {
  stats: StatsData;
  recent: Material[];
}

/* ─── Static data ──────────────────────────────────────────────── */

const aboutStats = [
  { value: "2019", label: "Dastur tashkil etilgan yil", icon: Calendar, color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { value: "4", label: "Qamrab olingan mamlakatlar", icon: MapPin, color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { value: "498,343", label: "Qayta tiklangan yerlar (ga)", icon: TrendingUp, color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { value: "49,804", label: "Foyda ko'rayotgan aholi", icon: Users, color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
];

const programs = [
  {
    flagImg: flagQozoq,
    code: "KZ",
    name: "Qozog'iston",
    period: "2025–2028",
    badge: "Maslahat",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    desc: "Agro-o'rmon xo'jaligi bo'yicha pilot loyiha va iqlimga moslashgan ko'chatlar yetishtirilish.",
    href: "/programs/kyrgyzstan",
  },
  {
    flagImg: flagKirgz,
    code: "KG",
    name: "Qirg'iziston",
    period: "2025–2028",
    badge: "Faol",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    desc: "Tabiatga asoslangan yechimlar (NBS), iqlimiy ofatlar katalogi va sel oqimlarini yumshatish.",
    href: "/programs/kyrgyzstan",
  },
  {
    flagImg: flagUzbek,
    code: "UZ",
    name: "O'zbekiston",
    period: "2025–2028",
    badge: "Faol",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    desc: "Transchegaraviy hamkorlik va mintaqaviy bilim almashinuvi orqali tiklash ishlari.",
    href: "/programs/uzbekistan",
  },
  {
    flagImg: flagTojik,
    code: "TJ",
    name: "Tojikiston",
    period: "2024–2027",
    badge: "Faol",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    desc: "Transchegaraviy landshaftlarni qayta tiklash uchun mintaqaviy almashinuv platformasi.",
    href: "/programs/tajikistan",
  },
  {
    flagImg: flagTurkman,
    code: "TM",
    name: "Turkmaniston",
    period: "2025–2028",
    badge: "Tadqiqot",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    desc: "Landshaftlarni qayta tiklash imkoniyatlarini xaritalash ishlari olib borilmoqda.",
    href: "/programs/kyrgyzstan",
  },
];

const latestNews = [
  {
    tag: "Policy & Governance",
    tagColor: "bg-blue-600",
    date: "28 Aprel, 2026",
    title: "KG RESILAND: Qirg'iziston landshaftlarini tiklash bo'yicha mintaqaviy hamkorlikni mustahkamlamoqda",
    excerpt: "Qirg'iziston Respublikasi delegatsiyasi RESILAND CA+ dasturining mintaqaviy maslahat platformasida ishtirok etdi.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=360&fit=crop&auto=format",
    href: "/news",
  },
  {
    tag: "Knowledge Sharing",
    tagColor: "bg-emerald-600",
    date: "28 Aprel, 2026",
    title: "RESILAND Qirg'iziston: Baland tog'li dala ekspeditsiyalarining xavfsizligini ta'minlash",
    excerpt: "Qirg'iziston Barqaror Landshaftlarni Tiklash Loyihasi doirasida xavfsizlik protokollari ishlab chiqildi.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=360&fit=crop&auto=format",
    href: "/news",
  },
  {
    tag: "Policy & Governance",
    tagColor: "bg-blue-600",
    date: "28 Aprel, 2026",
    title: "Markaziy Osiyo landshaftlari va mintaqaviy iqlim barqarorligini oshirish uchun hamkorlik",
    excerpt: "Markaziy Osiyo hukumatlari va xalqaro tashkilotlar birgalikda transchegaraviy hamkorlikni mustahkamlaydi.",
    img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=360&fit=crop&auto=format",
    href: "/news",
  },
];

const latestPublications = [
  {
    date: "20 May, 2026",
    title: "RESILAND CA+ Axborotnomasi. 2-son. 2025-yil oktyabr – noyabr.",
    desc: "RESILAND CA+ Axborotnomasining 2-sonida dastur bo'yicha so'nggi yangiliklar va tadqiqot natijalari.",
    href: "/publications",
  },
  {
    date: "20 May, 2026",
    title: "RESILAND CA+ Axborotnomasi. 3-son. 2025-yil dekabr",
    desc: "Markaziy Osiyo bo'ylab barqaror landshaft tadqiqotlarining so'nggi natijalari va tavsiyalar.",
    href: "/publications",
  },
  {
    date: "20 May, 2026",
    title: "RESILAND CA+ Axborotnomasi. 4-son. 2026-yil yanvar.",
    desc: "Yangi yil boshida amalga oshirilgan loyiha natijalari va mintaqaviy hamkorlik sharhi.",
    href: "/publications",
  },
];

const partners = [
  { name: "The World Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/320px-The_World_Bank_logo.svg.png" },
  { name: "ProGreen", logo: "https://progreenprogramme.eu/wp-content/uploads/2022/09/ProGreen-Logo.png" },
  { name: "KWPF", logo: "https://kwpf.org/wp-content/uploads/2020/10/kwpf_logo.png" },
  { name: "CAREC", logo: "https://carececo.org/wp-content/uploads/2019/09/CAREC-logo.png" },
];

/* ─── Section label component ──────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {children}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export function HomeClient({ stats, recent }: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 outline-none">

      {/* ════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative text-white h-screen min-h-[640px] max-h-[1080px] -mt-14 pt-14 flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={heroMountainBg}
            alt="Markaziy Osiyo tog' va landshaftlari"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Subtle dark gradient scrim on the text side for perfect legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent w-full lg:w-[65%]" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-10 relative z-10 w-full">
          <div className="max-w-xl space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-emerald-400/30 shadow-md backdrop-blur-md">
                <Trees className="h-3.5 w-3.5 text-emerald-400" />
                RESILAND CA+
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white shadow-md backdrop-blur-md">
                <Landmark className="h-3.5 w-3.5 text-emerald-400" />
                World Bank & CAREC
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-heading text-[38px] sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Markaziy Osiyo<br />
                <span className="text-emerald-400">Barqaror</span><br />
                Landshaftlar
              </h1>
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-md font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {t("home.subtitle")}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild className="h-11 px-6 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 gap-2 text-sm transition-all hover:scale-[1.02]">
                <Link href="/materials">
                  {t("nav.materials")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-5 rounded-xl font-semibold bg-white/10 border-white/20 hover:bg-white/20 text-white shadow-md backdrop-blur-md text-sm transition-all cursor-pointer">
                <Link href="/about">RESILAND haqida</Link>
              </Button>
            </div>

            {/* Search */}
            <div className="pt-1 max-w-lg">
              <HeroSearch />
            </div>

            {/* Trust pills */}
            <div className="pt-3 border-t border-white/20 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {["1,240+ Ilmiy resurs", "5 Markaziy Osiyo davlati", "GIS & PDF hujjatlar"].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          2. ABOUT — mint-tinted bg + topographic texture
      ════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 40%, #f0f9ff 100%)" }}>
        {/* Topographic overlay */}
        <div className="absolute inset-0 bg-topo opacity-60 pointer-events-none" />
        {/* Soft glow orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="space-y-6">
              <SectionLabel>Dastur haqida</SectionLabel>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-[1.2]">
                RESILAND CA+ <span className="gradient-text-emerald">haqida</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  RESILAND CA+ — Jahon bankining Qozog’iston, Qirg’iziston Respublikasi, Tojikiston, Turkmaniston va O’zbekistonga yerlar degradatsiyasiga qarshi kurashish hamda umumiy transchegaraviy landshaftlarda iqlim o’zgarishiga chidamlilikni oshirishda ko’maklashuvchi asosiy mintaqaviy tashabbusidir.
                </p>
                <p>
                  Yer degradatsiyasi Markaziy Osiyoga har yili taxminan{" "}
                  <strong className="text-emerald-800 font-bold">YaIMning 6 foizi miqdorida zarar</strong>{" "}
                  yetkazadi. Dastur landshaftlarni qayta tiklaydi, iqlim xavflarini yumshatadi va qishloq jamoalarining turmush darajasini yaxshilaydi.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-xl font-semibold border-emerald-300 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 text-emerald-700 bg-emerald-50/50 transition-all gap-1.5 cursor-pointer">
                <Link href="/about">
                  Ko’proq ma’lumot
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right — stat grid with card accents */}
            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((s, i) => {
                const Icon = s.icon;
                const accents = ["card-accent-emerald", "card-accent-sky", "card-accent-teal", "card-accent-amber"];
                const iconBgs = [
                  "bg-emerald-100 border-emerald-200 text-emerald-700",
                  "bg-sky-100 border-sky-200 text-sky-700",
                  "bg-teal-100 border-teal-200 text-teal-700",
                  "bg-amber-100 border-amber-200 text-amber-700",
                ];
                const valueColors = ["gradient-text-emerald", "gradient-text-teal", "gradient-text-teal", "text-amber-600 font-extrabold"];
                return (
                  <div
                    key={i}
                    className={`group relative p-6 rounded-2xl border border-white/80 bg-white/70 backdrop-blur-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-3 overflow-hidden stat-glow-emerald ${accents[i]}`}
                  >
                    <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-emerald-100/50 blur-xl pointer-events-none" />
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl border ${iconBgs[i]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className={`text-3xl tracking-tight ${valueColors[i]}`}>{s.value}</p>
                      <p className="text-xs text-slate-500 font-semibold leading-snug mt-1">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          3. STATS PANEL — teal-to-emerald gradient band
      ════════════════════════════════════════════════ */}
      <section className="relative py-14 overflow-hidden" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #ccfbf1 40%, #cffafe 70%, #e0f2fe 100%)" }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute left-1/4 top-0 h-64 w-64 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute right-1/4 bottom-0 h-48 w-48 bg-teal-200/30 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-10 space-y-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Ma’lumotlar bazasi
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {t("home.statsTitle") || "Jonli Statistika"}
              </h2>
              <p className="text-sm text-slate-600">Markaziy Osiyo hududidagi tasdiqlangan ilmiy va texnik resurslar holati</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-teal-200 text-teal-800 font-bold text-xs shadow-sm backdrop-blur-sm shrink-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="h-3.5 w-3.5" />
              Jonli yangilanish · 60s ISR
            </div>
          </div>
          <StatsPanel data={stats} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4. PROGRAMS — sky-tinted with colored card tops
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0fdf4 0%, #ecfeff 50%, #eff6ff 100%)" }}>
        <div className="absolute inset-0 bg-topo opacity-40 pointer-events-none" />
        <div className="absolute top-10 right-10 h-72 w-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-10 space-y-12 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-sky-700 uppercase tracking-widest bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              Dastur komponentlari
            </div>
            <h2 className="font-heading text-3xl sm:text-[40px] font-bold tracking-tight text-slate-950 leading-[1.15]">
              Dasturimizning <span className="gradient-text-teal">tarkibiy qismlari</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              RESILAND CA+ Markaziy Osiyoning 5 davlatida bir vaqtda amalga oshiriladigan mintaqaviy dastur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {programs.map((p, i) => {
              return (
                <Link
                  key={i}
                  href={p.href}
                  className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm overflow-hidden shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 hover:border-slate-300"
                >
                  <div className="relative aspect-[3/2] w-full bg-slate-50 overflow-hidden">
                    <Image
                      src={p.flagImg}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-1 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading font-bold text-sm text-slate-950 leading-snug">{p.name}</h3>
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {p.period}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.desc}</p>
                  </div>
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1 transition-all group-hover:gap-2">
                      Batafsil <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. MAP — organic teal-sky gradient
      ════════════════════════════════════════════════════ */}
      <section className="relative py-14 overflow-hidden" style={{ background: "linear-gradient(150deg, #ccfbf1 0%, #cffafe 50%, #dbeafe 100%)" }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
        <div className="absolute right-0 top-1/2 h-80 w-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-4 md:px-10 space-y-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Geofazoviy tahlil
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {t("home.mapTitle")}
              </h2>
              <p className="text-sm text-slate-600">{t("home.mapSubtitle")}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-teal-200 text-teal-700 font-semibold text-xs shadow-sm backdrop-blur-sm shrink-0">
              <Globe2 className="h-3.5 w-3.5 text-teal-600" />
              CAREC &amp; World Bank Ma&apos;lumotlari
            </div>
          </div>
          <InteractiveRegionMap />
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          6. LATEST NEWS — vivid cards
      ════════════════════════════════════════════════════ */}
      <section className="py-20 container mx-auto px-4 md:px-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <SectionLabel>Yangiliklar</SectionLabel>
            <h2 className="font-heading text-3xl sm:text-[40px] font-bold tracking-tight text-slate-950">
              So&apos;nggi <span className="gradient-text-emerald">yangiliklar</span>
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-full font-semibold gap-1.5 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border-emerald-200 text-emerald-700 bg-emerald-50/50 cursor-pointer shrink-0">
            <Link href="/news">
              Barcha yangiliklar <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {latestNews.map((news, i) => (
            <Link
              key={i}
              href={news.href}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 hover:border-slate-300 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full ${news.tagColor}`}>
                  {news.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col">
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {news.date}
                </p>
                <h3 className="font-heading text-sm font-bold text-slate-950 leading-snug line-clamp-3 flex-1">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{news.excerpt}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-2 transition-all pt-1">
                  O&apos;qish <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          7. RECENT MATERIALS — soft mint
      ════════════════════════════════════════════════════ */}
      <section className="relative py-14 overflow-hidden" style={{ background: "linear-gradient(160deg, #ecfdf5 0%, #f0fdf9 40%, #f0f9ff 100%)" }}>
        <div className="absolute inset-0 bg-topo opacity-50 pointer-events-none" />
        <div className="absolute left-0 bottom-0 h-64 w-64 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-10 space-y-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionLabel>Resurslar bazasi</SectionLabel>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {t("home.recentMaterials") || "So'nggi Materiallar"}
              </h2>
              <p className="text-sm text-slate-600">So&apos;nggi qo&apos;shilgan ilmiy hisobotlar va geofazoviy to&apos;plamlar</p>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-full font-semibold gap-1.5 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border-emerald-200 text-emerald-700 bg-white/80 cursor-pointer shrink-0">
              <Link href="/materials">
                Barcha materiallar <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <RecentMaterials items={recent} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          8. PUBLICATIONS — primary emerald / teal palette
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 45%, #f8fafc 100%)" }}>
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-60" />
        <div className="absolute right-0 top-0 h-72 w-72 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="container mx-auto px-4 md:px-10 space-y-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionLabel>Nashrlar</SectionLabel>
              <h2 className="font-heading text-3xl sm:text-[40px] font-bold tracking-tight text-slate-950">
                So&apos;nggi <span className="gradient-text-emerald">nashrlar</span>
              </h2>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-full font-semibold gap-1.5 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border-emerald-200 text-emerald-700 bg-white/80 cursor-pointer shrink-0">
              <Link href="/publications">
                Barcha nashrlar <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {latestPublications.map((pub, i) => {
              const iconStyles = [
                "bg-emerald-50 border-emerald-100 text-emerald-600",
                "bg-teal-50 border-teal-100 text-teal-600",
                "bg-emerald-50 border-emerald-100 text-emerald-600",
              ];
              return (
                <div
                  key={i}
                  className="group flex flex-col p-6 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 hover:border-slate-300 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`h-11 w-11 rounded-xl border flex items-center justify-center ${iconStyles[i]}`}>
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{pub.date}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-heading text-sm font-bold text-slate-950 leading-snug">{pub.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{pub.desc}</p>
                  </div>
                  <Link
                    href={pub.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 border border-emerald-200 hover:border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all w-fit"
                  >
                    <Download className="h-3.5 w-3.5" />
                    YUKLAB OLISH
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          9. PARTNERS — frosted teal
      ════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(160deg, #ccfbf1 0%, #cffafe 60%, #dbeafe 100%)" }}>
        <div className="absolute inset-0 bg-topo opacity-50 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-10 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-200 px-3.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Hamkorlar
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Hamkorlarimiz
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">Dasturni amalga oshirishda ishtirok etayotgan xalqaro tashkilotlar</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-12">
            {partners.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 rounded-2xl bg-white/70 border border-white/80 shadow-sm backdrop-blur-sm opacity-70 hover:opacity-100 hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.name} className="h-9 sm:h-11 object-contain max-w-[130px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          10. CONTACT CTA — bold emerald-to-teal gradient
      ════════════════════════════════════════════════════ */}
      <section className="py-20 container mx-auto px-4 md:px-10">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 shadow-2xl shadow-emerald-900/15"
          style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #0d9488 70%, #0891b2 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-topo opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-200 uppercase tracking-widest bg-white/10 border border-white/20 px-3.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Hamkorlik
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Savollaringiz bormi yoki hamkorlik qilmoqchimisiz?
              </h2>
              <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
                Faoliyatimiz va qanday qilib birgalikda ishlashimiz mumkinligi haqida ko&apos;proq ma&apos;lumot olish uchun RESILAND jamoasi bilan bog&apos;laning.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-3">
              <Button asChild size="lg" className="h-12 px-8 rounded-xl font-bold bg-white hover:bg-emerald-50 text-emerald-800 shadow-xl gap-2.5 text-sm cursor-pointer transition-all hover:scale-[1.03]">
                <Link href="/contact">
                  <Mail className="h-4.5 w-4.5" />
                  BIZ BILAN BOG&apos;LANISH
                </Link>
              </Button>
              <p className="text-[11px] text-emerald-200/60 font-medium">24 soat ichida javob beramiz</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
