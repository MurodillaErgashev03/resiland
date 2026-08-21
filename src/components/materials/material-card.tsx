import Link from "next/link";
import { Material, ContentType } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Database,
  ClipboardList,
  BookOpen,
  File,
  Download,
  Eye,
  Calendar,
  Building2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface MaterialCardProps {
  material: Material;
}

const contentTypeConfig: Record<
  ContentType,
  { label: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>; colorClass: string }
> = {
  publication: { label: "Publication", icon: FileText, colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  dataset: { label: "Dataset", icon: Database, colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  report: { label: "Report", icon: ClipboardList, colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  guideline: { label: "Guideline", icon: BookOpen, colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  other: { label: "Other", icon: File, colorClass: "bg-slate-100 text-slate-700 border-slate-200" },
};

export function MaterialCard({ material }: MaterialCardProps) {
  const config = contentTypeConfig[material.contentType] || contentTypeConfig.other;
  const Icon = config.icon;

  return (
    <Card className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 shadow-xs hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden">
      <CardHeader className="p-5 pb-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-xl border flex items-center justify-center ${config.colorClass}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {config.label}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {material.country}
          </span>
        </div>

        <Link href={`/materials/${material.slug}`} className="group-hover:text-emerald-700 transition-colors">
          <CardTitle className="text-base font-bold leading-snug line-clamp-2 text-slate-950">
            {material.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3.5 flex-1">
        <CardDescription className="text-xs line-clamp-3 leading-relaxed text-slate-600 font-normal">
          {material.description}
        </CardDescription>

        <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            <span className="truncate max-w-[160px] font-medium text-slate-800">{material.organization}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span>{material.year}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {material.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 font-semibold border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-slate-700" title="Yuklab olishlar soni">
            <Download className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            {material.downloadsCount}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700" title="Ko'rishlar soni">
            <Eye className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            {material.viewsCount}
          </span>
        </div>

        <Button asChild variant="ghost" size="sm" className="h-8 px-3 text-xs font-bold text-slate-800 hover:text-emerald-700 hover:bg-emerald-50 rounded-full border border-slate-200 bg-white shadow-2xs gap-1 cursor-pointer">
          <Link href={`/materials/${material.slug}`}>
            <span>Batafsil</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
