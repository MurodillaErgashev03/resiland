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
        {/* Main Search Input Bar with Glassmorphic Frosted Glass Card */}
        <div className="p-1.5 rounded-2xl bg-white/15 hover:bg-white/[0.18] backdrop-blur-xl border border-white/30 hover:border-white/40 shadow-2xl shadow-black/20 max-w-3xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-emerald-400 focus-within:bg-white/20 focus-within:ring-4 focus-within:ring-emerald-400/25">
          <div className="relative flex-1 flex items-center">
            <Search
              className="absolute left-4 h-5 w-5 text-emerald-400 pointer-events-none drop-shadow-sm"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("home.searchPlaceholder")}
              className="pl-12 pr-4 h-12 text-sm sm:text-base rounded-xl border-0 bg-transparent text-white placeholder:text-white/70 shadow-none focus-visible:ring-0 font-medium"
              aria-label={t("common.search")}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-7 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-98 cursor-pointer"
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
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all duration-150 cursor-pointer shadow-sm backdrop-blur-md font-medium text-xs hover:border-white/30"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
