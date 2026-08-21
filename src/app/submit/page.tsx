import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContributorForm } from "@/components/forms/contributor-form";
import { PlusCircle, ShieldCheck, Layers, Sparkles, Database, FileCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import heroSubmitBg from "@/assets/img/image.png";

export const metadata: Metadata = {
  title: "Material Yuklash | RESILAND CA+ Database",
  description:
    "Markaziy Osiyo barqaror landshaftlari dasturi bazasiga o'z tadqiqotingiz, geofazoviy ma'lumotlar to'plamingiz yoki hisobotingizni qo'shing.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* ─── 100vh Hero Section with Mountains ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroSubmitBg}
            alt="RESILAND CA+ Material Yuklash"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Subtle soft gradient only behind text */}
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
                Material Yuklash
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Yangi Ilmiy / Texnik Material Joylashtirish
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Markaziy Osiyo barqaror landshaftlari dasturi bazasiga o&apos;z tadqiqotingiz, geofazoviy ma&apos;lumotlar to&apos;plamingiz yoki hisobotingizni qo&apos;shing.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Moderatsiya &amp; Sifat Nazorati
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
                3 Tilda Xalqaro Indeksatsiya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Form Section ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-12 max-w-4xl outline-none relative z-20 -mt-10 sm:-mt-14 pb-20">
        
        {/* Contributor Form */}
        <ContributorForm />
      </main>

      <Footer />
    </div>
  );
}
