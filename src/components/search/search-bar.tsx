"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
  onMobileFilterOpen?: () => void;
}

export function SearchBar({ defaultValue = "", onMobileFilterOpen }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    params.delete("page"); // Reset page on new search
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sarlavha, mavzu, muallif, tashkilot yoki kalit so'z bo'yicha qidiring..."
          className="pl-10 pr-9 h-11 text-sm bg-background border-border rounded-xl shadow-xs"
          aria-label="Materiallarni qidirish"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted"
            aria-label="Qidiruvni tozalash"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <Button type="submit" size="default" className="h-11 px-6 rounded-xl font-medium">
        Qidirish
      </Button>

      {onMobileFilterOpen && (
        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={onMobileFilterOpen}
          className="h-11 px-3.5 rounded-xl md:hidden gap-1.5"
          aria-label="Filtrlarni ochish"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-xs">Filtrlar</span>
        </Button>
      )}
    </form>
  );
}
