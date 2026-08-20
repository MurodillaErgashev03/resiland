"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ExtendedMaterial } from "@/lib/mock-data";
import { MaterialPreviewDialog } from "./material-preview-dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  Download,
  Eye,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Database,
  ClipboardList,
  BookOpen,
  File,
  X,
  ExternalLink,
  FolderOpen,
} from "lucide-react";
import { ContentType } from "@/types";

interface MaterialGridProps {
  items: ExtendedMaterial[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const TYPE_ICONS: Record<
  ContentType,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  publication: FileText,
  dataset: Database,
  report: ClipboardList,
  guideline: BookOpen,
  other: File,
};

export function MaterialGrid({
  items,
  total,
  totalPages,
  currentPage,
}: MaterialGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function removeFilter(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      const current = params.get(key)?.split(",").filter(Boolean) ?? [];
      const updated = current.filter((v) => v !== value);
      if (updated.length) params.set(key, updated.join(","));
      else params.delete(key);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const activeSort = searchParams.get("sort") || "recent";
  const activeQuery = searchParams.get("q");
  const activeCountry = searchParams.get("country");
  const activeTopic = searchParams.get("topic");
  const activeType = searchParams.get("type");
  const activeLang = searchParams.get("lang");

  const startRecord = (currentPage - 1) * 6 + 1;
  const endRecord = Math.min(currentPage * 6, total);

  return (
    <div className="space-y-5">
      {/* Action Toolbar: Counter, Sort, Grid/Table Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card">
        <div className="text-xs text-muted-foreground">
          {total > 0 ? (
            <span>
              Jami <strong className="text-foreground font-semibold">{total}</strong> ta materialdan{" "}
              <strong className="text-foreground font-semibold">
                {startRecord}–{endRecord}
              </strong>{" "}
              ko&apos;rsatilmoqda
            </span>
          ) : (
            <span>Material topilmadi</span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            <select
              value={activeSort}
              onChange={handleSortChange}
              className="bg-background border border-border rounded-md px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              aria-label="Natijalarni saralash"
            >
              <option value="recent">Eng yangi</option>
              <option value="downloads">Ko&apos;p yuklangan</option>
              <option value="title">Nomi bo&apos;yicha (A-Z)</option>
            </select>
          </div>

          {/* Grid / Table Toggle */}
          <div className="flex items-center border border-border rounded-lg p-0.5 bg-muted/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`h-7 w-7 rounded-md ${
                viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
              }`}
              aria-label="Grid ko'rinishi"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("table")}
              className={`h-7 w-7 rounded-md ${
                viewMode === "table" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
              }`}
              aria-label="Jadval ko'rinishi"
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Ribbon */}
      {(activeQuery || activeCountry || activeTopic || activeType || activeLang) && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-muted-foreground mr-1">Faol filtrlar:</span>

          {activeQuery && (
            <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-0.5 text-xs">
              <span>Qidiruv: &quot;{activeQuery}&quot;</span>
              <button
                onClick={() => removeFilter("q")}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
                aria-label="Qidiruv filtrini o'chirish"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {activeCountry?.split(",").map((c) => (
            <Badge key={c} variant="secondary" className="gap-1 pl-2 pr-1 py-0.5 text-xs">
              <span>Mamlakat: {c.toUpperCase()}</span>
              <button
                onClick={() => removeFilter("country", c)}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
                aria-label={`${c} mamlakat filtrini o'chirish`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          {activeTopic?.split(",").map((t) => (
            <Badge key={t} variant="secondary" className="gap-1 pl-2 pr-1 py-0.5 text-xs">
              <span>Mavzu: {t}</span>
              <button
                onClick={() => removeFilter("topic", t)}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
                aria-label={`${t} mavzu filtrini o'chirish`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          {activeType?.split(",").map((t) => (
            <Badge key={t} variant="secondary" className="gap-1 pl-2 pr-1 py-0.5 text-xs">
              <span>Tur: {t}</span>
              <button
                onClick={() => removeFilter("type", t)}
                className="hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
                aria-label={`${t} tur filtrini o'chirish`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-12 rounded-2xl border border-dashed border-border bg-card text-center space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <FolderOpen className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base">Mos materiallar topilmadi</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Qidiruv so&apos;zini o&apos;zgartirib ko&apos;ring yoki fasetli filtrlardan ba&apos;zilarini olib tashlang.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(pathname)}
            className="text-xs"
          >
            Barcha filtrlarni tozalash
          </Button>
        </div>
      )}

      {/* View Mode: GRID */}
      {items.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((material) => {
            const Icon = TYPE_ICONS[material.contentType] || File;
            return (
              <Card
                key={material.id}
                className="flex flex-col justify-between hover:border-primary/50 transition-all hover:shadow-md group"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-7 w-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {material.contentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-[11px] font-medium border-border">
                        {material.country}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold">
                        {material.language}
                      </Badge>
                    </div>
                  </div>

                  <Link href={`/materials/${material.slug}`} className="group-hover:text-primary transition-colors">
                    <CardTitle className="text-base font-semibold leading-snug line-clamp-2">
                      {material.title}
                    </CardTitle>
                  </Link>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-3 flex-1">
                  <CardDescription className="text-xs line-clamp-2 leading-relaxed">
                    {material.description}
                  </CardDescription>

                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground border-t border-border/60">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      <span className="truncate max-w-[160px]">{material.organization}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                      <span>{material.year}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1" title="Yuklab olishlar soni">
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      {material.downloadsCount}
                    </span>
                    <span className="flex items-center gap-1" title="Ko'rishlar soni">
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      {material.viewsCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MaterialPreviewDialog material={material} />
                    <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      <Link href={`/materials/${material.slug}`}>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* View Mode: TABLE */}
      {items.length > 0 && viewMode === "table" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/60 border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="p-3.5 pl-4">Sarlavha & Tur</th>
                  <th className="p-3.5">Mamlakat</th>
                  <th className="p-3.5">Tashkilot</th>
                  <th className="p-3.5">Yil</th>
                  <th className="p-3.5">Format</th>
                  <th className="p-3.5 pr-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((m) => {
                  const Icon = TYPE_ICONS[m.contentType] || File;
                  return (
                    <tr key={m.id} className="hover:bg-muted/40 transition-colors">
                      <td className="p-3.5 pl-4 max-w-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="h-7 w-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          </div>
                          <div>
                            <Link href={`/materials/${m.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                              {m.title}
                            </Link>
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">
                              {m.contentType} • {m.language.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <Badge variant="outline" className="text-[11px] font-normal">
                          {m.country}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-muted-foreground truncate max-w-[140px]">
                        {m.organization}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {m.year}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-muted-foreground">
                        {m.fileType}
                      </td>
                      <td className="p-3.5 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <MaterialPreviewDialog material={m} />
                          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-xs">
                            <a href={m.fileUrl} download aria-label="Yuklab olish">
                              <Download className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="text-xs gap-1"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Oldingi</span>
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <Button
                  key={pageNum}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-8 w-8 text-xs p-0 ${isActive ? "font-bold" : "text-muted-foreground"}`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="text-xs gap-1"
          >
            <span>Keyingi</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
