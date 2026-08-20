import { ExtendedMaterial } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  ExternalLink,
  Calendar,
  Building2,
  User,
  Globe2,
  FileCode,
  Tag,
  Eye,
  Languages,
  CheckCircle2,
  Layers,
} from "lucide-react";

interface MetadataPanelProps {
  material: ExtendedMaterial;
  locale?: "uz" | "ru" | "en";
}

export function MetadataPanel({ material, locale = "uz" }: MetadataPanelProps) {
  const publishedDate = new Date(material.publishedAt).toLocaleDateString(
    locale === "en" ? "en-US" : locale === "ru" ? "ru-RU" : "uz-UZ",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <aside className="space-y-6">
      {/* Action Download / External Link Card */}
      <Card className="border-primary/30 bg-card shadow-sm overflow-hidden">
        <div className="bg-primary/10 p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Hujjat resursi</span>
          </div>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-background border border-border">
            {material.fileType} • {material.fileSize}
          </span>
        </div>
        <CardContent className="p-5 space-y-3">
          <Button asChild size="lg" className="w-full font-semibold rounded-xl gap-2 shadow-xs">
            <a href={material.fileUrl} download aria-label={`${material.title} faylini yuklab olish`}>
              <Download className="h-4 w-4" />
              <span>Hujjatni yuklab olish ({material.fileSize})</span>
            </a>
          </Button>

          {material.fileUrl && (
            <Button asChild variant="outline" size="default" className="w-full text-xs rounded-xl gap-1.5">
              <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                <span>Yangi oynada ochish</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}

          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
            <span className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" />
              {material.downloadsCount} marta yuklandi
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {material.viewsCount} marta ko&apos;rildi
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 8 Mandatory Metadata Fields Card */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader className="p-5 pb-3 border-b border-border">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Metama&apos;lumotlar pasporti</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4 text-xs">
          {/* 1. Content Type */}
          <MetaRow label="Kontent turi">
            <Badge variant="outline" className="text-[11px] uppercase font-semibold text-primary border-primary/30">
              {material.contentType}
            </Badge>
          </MetaRow>

          {/* 2. Country */}
          <MetaRow label="Mamlakat / Qamrov">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Globe2 className="h-3.5 w-3.5 text-primary" />
              <span>{material.country}</span>
            </div>
          </MetaRow>

          {/* 3. Thematic Topic */}
          <MetaRow label="Sohaviy mavzu">
            <Badge variant="secondary" className="text-[11px] font-medium">
              {material.topic}
            </Badge>
          </MetaRow>

          {/* 4. Organization */}
          <MetaRow label="Muallif / Tashkilot">
            <div className="space-y-0.5 text-right">
              <div className="font-semibold text-foreground">{material.organization}</div>
              <div className="text-muted-foreground">{material.author}</div>
            </div>
          </MetaRow>

          {/* 5. Published Date */}
          <MetaRow label="Nashr sanasi">
            <div className="flex items-center gap-1.5 text-foreground font-medium">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{publishedDate}</span>
            </div>
          </MetaRow>

          {/* 6. Document Language */}
          <MetaRow label="Hujjat tili">
            <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase">
              <Languages className="h-3.5 w-3.5 text-primary" />
              <span>{material.language}</span>
            </div>
          </MetaRow>

          {/* 7. File Format & Size */}
          <MetaRow label="Format & Hajm">
            <span className="font-mono text-muted-foreground">
              {material.fileType} ({material.fileSize})
            </span>
          </MetaRow>

          {/* 8. Keywords & Tags */}
          <div className="pt-2 space-y-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <Tag className="h-3.5 w-3.5 text-primary" />
              <span>Kalit so&apos;zlar va teglar:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {material.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[11px] font-normal border-border bg-muted/40">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <div>{children}</div>
    </div>
  );
}
