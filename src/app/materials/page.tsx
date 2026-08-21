import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MaterialsPageClient } from "@/components/materials/materials-page-client";
import { MaterialGrid } from "@/components/materials/material-grid";
import { MaterialGridSkeleton } from "@/components/materials/material-grid-skeleton";
import { getMaterials } from "@/lib/api-client";
import { Layers, Database, Sparkles, Globe2, FileText } from "lucide-react";
import { Metadata } from "next";

import heroMatBg from "@/assets/img/image.png";

interface SearchParams extends Record<string, string | undefined> {
  q?: string;
  country?: string;
  topic?: string;
  type?: string;
  lang?: string;
  sort?: "recent" | "downloads" | "title";
  page?: string;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ilmiy Nashrlar va Ma'lumotlar Bazasi | RESILAND CA+",
  description:
    "Markaziy Osiyodagi eroziyaga qarshi kurashish, degradatsiyaga uchragan yerlarni qayta tiklash, o'rmonlashtirish va iqlimiy chidamlilik bo'yicha fasetli qidiruv tizimi.",
};

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* ─── 100vh Hero Section with Mountains ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroMatBg}
            alt="RESILAND CA+ Ma'lumotlar bazasi"
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Soft contrast gradient */}
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
                Ma&apos;lumotlar Bazasi
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Ilmiy Nashrlar va Ma&apos;lumotlar Bazasi
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Markaziy Osiyodagi eroziyaga qarshi kurashish, degradatsiyaga uchragan yerlarni qayta tiklash, o&apos;rmonlashtirish va iqlimiy chidamlilik bo&apos;yicha fasetli qidiruv tizimi.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                486+ Ilmiy Hujjatlar &amp; Ma&apos;lumotlar
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                5 ta Markaziy Osiyo Davlati
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Main Content (Faceted Search & Material Cards) ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 md:px-12 pb-20">
        
        {/* Client Layout with Filters & Suspense Results */}
        <MaterialsPageClient activeFilters={params}>
          <Suspense fallback={<MaterialGridSkeleton />}>
            <MaterialResults params={params} />
          </Suspense>
        </MaterialsPageClient>
      </main>

      <Footer />
    </div>
  );
}

async function MaterialResults({ params }: { params: SearchParams }) {
  const page = Number(params.page ?? "1");
  const { items, total, totalPages } = await getMaterials({
    ...params,
    page,
    limit: 6,
  });

  return (
    <MaterialGrid
      items={items}
      total={total}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
