"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";
import { RotateCcw, Filter, Globe2, BookOpen, Layers, Languages } from "lucide-react";

interface FacetFiltersProps {
  activeFilters: Record<string, string | undefined>;
}

export function FacetFilters({ activeFilters }: FacetFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const facets = [
    {
      key: "country",
      title: t("materials.facets.country"),
      icon: Globe2,
      options: [
        { value: "uz", label: t("materials.facets.countryOptions.uz") },
        { value: "kz", label: t("materials.facets.countryOptions.kz") },
        { value: "kg", label: t("materials.facets.countryOptions.kg") },
        { value: "tj", label: t("materials.facets.countryOptions.tj") },
        { value: "tm", label: t("materials.facets.countryOptions.tm") },
        { value: "regional", label: t("materials.facets.countryOptions.regional") },
      ],
    },
    {
      key: "topic",
      title: t("materials.facets.topic"),
      icon: BookOpen,
      options: [
        { value: "forestry", label: t("materials.facets.topicOptions.forestry") },
        { value: "landDegradation", label: t("materials.facets.topicOptions.landDegradation") },
        { value: "climate", label: t("materials.facets.topicOptions.climate") },
        { value: "water", label: t("materials.facets.topicOptions.water") },
        { value: "pastures", label: t("materials.facets.topicOptions.pastures") },
        { value: "biodiversity", label: t("materials.facets.topicOptions.biodiversity") },
      ],
    },
    {
      key: "type",
      title: t("materials.facets.contentType"),
      icon: Layers,
      options: [
        { value: "publication", label: "Publication" },
        { value: "dataset", label: "Dataset" },
        { value: "report", label: "Report" },
        { value: "guideline", label: "Guideline" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "lang",
      title: t("materials.facets.language"),
      icon: Languages,
      options: [
        { value: "uz", label: "O'zbekcha (UZ)" },
        { value: "ru", label: "Русский (RU)" },
        { value: "en", label: "English (EN)" },
        { value: "kk", label: "Қазақша (KK)" },
        { value: "ky", label: "Кыргызча (KY)" },
        { value: "tg", label: "Тоҷикӣ (TG)" },
        { value: "tk", label: "Türkmençe (TK)" },
      ],
    },
  ];

  const hasActiveFilters = facets.some((f) => Boolean(activeFilters[f.key])) || Boolean(activeFilters.q);

  function toggleFacet(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",").filter(Boolean) ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (next.length) {
      params.set(key, next.join(","));
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleResetAll() {
    router.push(pathname);
  }

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Filter className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>{t("materials.facets.country")} / {t("materials.facets.topic")}</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetAll}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Tozalash</span>
          </Button>
        )}
      </div>

      {/* Facet Groups */}
      <div className="space-y-6">
        {facets.map((facet) => {
          const Icon = facet.icon;
          const activeValues = activeFilters[facet.key]?.split(",").filter(Boolean) ?? [];

          return (
            <div key={facet.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span>{facet.title}</span>
                </div>
                {activeValues.length > 0 && (
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                    {activeValues.length}
                  </Badge>
                )}
              </div>

              <div className="space-y-2 pt-1 pl-1">
                {facet.options.map((option) => {
                  const isChecked = activeValues.includes(option.value);
                  const id = `filter-${facet.key}-${option.value}`;

                  return (
                    <div key={option.value} className="flex items-center gap-2.5 group">
                      <Checkbox
                        id={id}
                        checked={isChecked}
                        onCheckedChange={() => toggleFacet(facet.key, option.value)}
                      />
                      <Label
                        htmlFor={id}
                        className="text-xs font-normal text-foreground group-hover:text-primary cursor-pointer transition-colors select-none leading-none"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
