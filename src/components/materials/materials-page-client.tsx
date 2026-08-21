"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search/search-bar";
import { FacetFilters } from "@/components/search/facet-filters";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface MaterialsPageClientProps {
  activeFilters: Record<string, string | undefined>;
  children: React.ReactNode;
}

export function MaterialsPageClient({
  activeFilters,
  children,
}: MaterialsPageClientProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Search Bar (Elevated Floating Card) */}
      <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-slate-900/5">
        <SearchBar
          defaultValue={activeFilters.q}
          onMobileFilterOpen={() => setMobileFilterOpen(true)}
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block sticky top-24 p-6 rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5">
          <FacetFilters activeFilters={activeFilters} />
        </aside>

        {/* Mobile Slide-over Drawer Filters */}
        <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
          <SheetContent side="left" className="w-[85vw] max-w-xs overflow-y-auto p-6">
            <SheetHeader className="pb-4">
              <SheetTitle>Fasetli Filtrlar</SheetTitle>
            </SheetHeader>
            <FacetFilters activeFilters={activeFilters} />
          </SheetContent>
        </Sheet>

        {/* Results Area */}
        <section className="min-w-0">
          {children}
        </section>
      </div>
    </div>
  );
}
