"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronDown,
  Check,
  Globe2,
  Clock,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroContactBg from "@/assets/img/banner5.png";

const topicOptions = [
  "Mavzuni tanlang...",
  "Umumiy so'rov va ma'lumot olish",
  "Hamkorlik va qo'shma loyihalar taklifi",
  "Ommaviy axborot vositalari (OAV) murojaatlari",
  "Tadbirlar va konferensiyalarda ishtirok etish",
  "Materiallar va hisobotlar bo'yicha texnik savollar",
];

const countryCoordinators = [
  {
    country: "Qirg'iziston",
    flag: "🇰🇬",
    name: "Lyudmila Kiktenko",
    role: "Guruh rahbari o'rinbosari",
    email: "lkiktenko@carececo.org",
  },
  {
    country: "Tojikiston",
    flag: "🇹🇯",
    name: "Dilovarsho Dustzoda",
    role: "Guruh rahbari o'rinbosari",
    email: "recath_manager@carececo.org",
  },
  {
    country: "O'zbekiston",
    flag: "🇺🇿",
    name: "Azamat Kauazov",
    role: "Guruh rahbari o'rinbosari",
    email: "cacip@carececo.org",
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    subject: "Mavzuni tanlang...",
    message: "",
    agreePrivacy: false,
  });

  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const topicDropdownRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        topicDropdownRef.current &&
        !topicDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTopicOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        subject: "Mavzuni tanlang...",
        message: "",
        agreePrivacy: false,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">

      {/* ─── 100vh Hero Section with Mountain Landscape ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContactBg}
            alt="RESILAND CA+ Bog'lanish"
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
                Bog&apos;lanish
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Bog&apos;lanish
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Dastur bo&apos;yicha so&apos;rovlar, hamkorlik takliflari yoki ommaviy axborot vositalari murojaatlari uchun RESILAND CA+ Kotibiyati yoki mamlakat darajasidagi guruh rahbari o&apos;rinbosarlari bilan bog&apos;laning.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                CAREC Bosh Kotibiyati
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                5 ta Davlat Muvofiqlashtiruvchilari
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content (2-Column Bento Grid) ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <section className="relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 md:px-12 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ════════════════════════════════════════════════
                LEFT: CONTACT FORM (7 cols)
            ════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-xl shadow-slate-900/5 space-y-6 reveal-left">
              
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  Murojaat Shakli
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
                  Sizga qanday yordam bera olamiz?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Quyidagi shaklni to&apos;ldiring va RESILAND CA+ Kotibiyati siz bilan imkon qadar tezroq bog&apos;lanadi.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in-0 duration-300">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h3 className="font-heading text-xl font-bold text-slate-950">
                    Xabaringiz muvaffaqiyatli yuborildi!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Murojaatingiz uchun tashakkur. RESILAND CA+ mas&apos;ul mutaxassisi tez orada siz bilan bog&apos;lanadi.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="rounded-full text-xs font-bold mt-2"
                  >
                    Yangi xabar yuborish
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* First Name & Last Name (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Ism <span className="text-red-500 font-bold">(Majburiy)</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="Ismingiz"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200/90 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Familiya <span className="text-red-500 font-bold">(Majburiy)</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Familiyangiz"
                        className="w-full h-11 px-4 rounded-xl border border-slate-200/90 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Elektron pochta <span className="text-red-500 font-bold">(Majburiy)</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="sizning@email.com"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200/90 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Organization */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Tashkilot nomi
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      placeholder="Tashkilotingiz yoki idorangiz"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200/90 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>

                  {/* Topic (Custom Modern Dropdown) */}
                  <div className="space-y-1.5 relative" ref={topicDropdownRef}>
                    <label className="text-xs font-bold text-slate-700">
                      Mavzu <span className="text-red-500 font-bold">(Majburiy)</span>
                    </label>
                    
                    <button
                      type="button"
                      onClick={() => setIsTopicOpen(!isTopicOpen)}
                      className={`w-full h-11 px-4 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isTopicOpen
                          ? "bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                          : "bg-slate-50 border-slate-200/90 hover:bg-slate-100/80 text-slate-800"
                      }`}
                    >
                      <span className="truncate">{formData.subject}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-emerald-600 shrink-0 transition-transform duration-200 ${
                          isTopicOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isTopicOpen && (
                      <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-emerald-200/80 shadow-2xl shadow-emerald-950/15 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                        {topicOptions.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, subject: topic });
                              setIsTopicOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                              formData.subject === topic
                                ? "bg-emerald-50 text-emerald-800 font-bold"
                                : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                            }`}
                          >
                            <span>{topic}</span>
                            {formData.subject === topic && (
                              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message (Textarea) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Xabar <span className="text-red-500 font-bold">(Majburiy)</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Xabaringizni shu yerga yozing..."
                      className="w-full p-4 rounded-xl border border-slate-200/90 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      checked={formData.agreePrivacy}
                      onChange={(e) =>
                        setFormData({ ...formData, agreePrivacy: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                      CAREC Maxfiylik siyosatiga muvofiq, ushbu so&apos;rovga javob berish uchun ma&apos;lumotlarim qayta ishlanishiga rozilik beraman.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-8 h-12 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                    >
                      {isLoading ? (
                        <span>Yuborilmoqda...</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          <span>Xabar yuborish</span>
                        </span>
                      )}
                    </Button>
                  </div>

                </form>
              )}
            </div>

            {/* ════════════════════════════════════════════════
                RIGHT: CONTACT DETAILS & COORDINATORS (5 cols)
            ════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 space-y-6 reveal-right">
              
              {/* CAREC Secretariat Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <span>Bosh Kotibiyat</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-extrabold text-slate-950">
                    CAREC Kotibiyati
                  </h3>
                  <p className="text-xs text-emerald-700 font-bold">
                    Markaziy Osiyo Mintaqaviy Ekologik Markazi
                  </p>
                </div>

                <div className="space-y-3.5 pt-2 text-xs text-slate-700 border-t border-slate-100 font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>CAREC, 40 Orbita mikrorayon, Olmaota 050000, Qozog&apos;iston</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                    <a href="mailto:pr@carececo.org" className="hover:text-emerald-800 transition-colors underline">
                      pr@carececo.org
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                    <a href="tel:+77272654333" className="hover:text-emerald-800 transition-colors">
                      +7 (727) 265 4333
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Dushanba – Juma: 09:00 – 18:00 (GMT+5)</span>
                  </div>
                </div>
              </div>

              {/* Country Coordinators Card */}
              <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white p-6 sm:p-7 shadow-xl shadow-emerald-950/5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="h-4 w-4 text-emerald-600" />
                    Mintaqaviy Muvofiqlashtiruvchilar
                  </span>
                </div>

                <div className="space-y-3">
                  {countryCoordinators.map((coord, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{coord.flag}</span>
                          <span>{coord.name}</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                          {coord.country}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {coord.role}
                      </p>
                      <div className="pt-1">
                        <a
                          href={`mailto:${coord.email}`}
                          className="text-xs text-emerald-700 hover:text-emerald-800 underline font-semibold flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" />
                          <span>{coord.email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
