import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MaterialsPageClient } from "@/components/materials/materials-page-client";
import { MaterialGrid } from "@/components/materials/material-grid";
import { MaterialGridSkeleton } from "@/components/materials/material-grid-skeleton";
import { getMaterials } from "@/lib/api-client";
import { Layers, Database, Sparkles } from "lucide-react";

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

export default async function MaterialsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-6 outline-none">
        {/* Page Header */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Database className="h-4 w-4" aria-hidden="true" />
            <span>RESILAND CA+ Onlayn Repozitoriy</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Ilmiy Nashrlar va Ma&apos;lumotlar Bazasi
          </h1>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Markaziy Osiyodagi erozisiyaga qarshi kurashish, degradatsiyaga uchragan yerlarni qayta tiklash, o&apos;rmonlashtirish va iqlimiy chidamlilik bo&apos;yicha fasetli qidiruv tizimi.
          </p>
        </div>

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
