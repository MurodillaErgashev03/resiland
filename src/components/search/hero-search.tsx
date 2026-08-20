"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Tag, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { trackEvent } from "@/lib/analytics";

interface HeroSearchProps {
  className?: string;
}

export function HeroSearch({ className }: HeroSearchProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const quickTags = [
    { label: "Orolqum / Aralkum", query: "Orol" },
    { label: "Yer degradatsiyasi", query: "degradatsiya" },
    { label: "Yaylovlar", query: "yaylov" },
    { label: "Muzliklar & Suv", query: "muzlik" },
    { label: "O'rmonlashtirish", query: "o'rmon" },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      trackEvent({ name: "search", params: { query: query.trim() } });
    }
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/materials?${params.toString()}`);
  }

  function handleTagClick(tagQuery: string) {
    setQuery(tagQuery);
    trackEvent({ name: "search", params: { query: tagQuery } });
    router.push(`/materials?q=${encodeURIComponent(tagQuery)}`);
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main Search Input Bar with Glassmorphic Glow Card */}
        <div className="p-1.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-500/40 shadow-xl shadow-slate-900/5 max-w-3xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/20">
          <div className="relative flex-1 flex items-center">
            <Search
              className="absolute left-4 h-5 w-5 text-emerald-600 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("home.searchPlaceholder")}
              className="pl-12 pr-4 h-12 text-sm sm:text-base rounded-xl border-0 bg-transparent text-slate-900 shadow-none focus-visible:ring-0 placeholder:text-slate-500"
              aria-label={t("common.search")}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-7 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-98 cursor-pointer"
          >
            <span>{t("home.searchButton")}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-white">
          <span className="flex items-center gap-1.5 font-bold text-emerald-300 drop-shadow-sm">
            <Tag className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            {t("home.quickFilters")}:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => handleTagClick(tag.query)}
              className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-white hover:text-slate-950 border border-white/25 text-white transition-all duration-150 cursor-pointer shadow-md backdrop-blur-md font-medium text-xs"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
