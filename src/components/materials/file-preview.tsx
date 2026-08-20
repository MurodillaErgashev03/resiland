"use client";

import { FileText, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  fileUrl?: string;
  fileType?: string;
  title: string;
  className?: string;
}

export function FilePreview({
  fileUrl,
  fileType = "PDF",
  title,
  className,
}: FilePreviewProps) {
  if (!fileUrl) {
    return (
      <div className={`p-8 rounded-xl border border-dashed border-border bg-card text-center text-xs text-muted-foreground ${className}`}>
        Ushbu material uchun oldindan ko&apos;rish fayli yuklanmagan.
      </div>
    );
  }

  const isPdf = fileType.toUpperCase().includes("PDF");

  return (
    <div className={`rounded-2xl border border-border bg-card overflow-hidden shadow-xs ${className}`}>
      {/* Header bar of the preview */}
      <div className="flex items-center justify-between p-3.5 px-5 bg-muted/60 border-b border-border text-xs">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Hujjatni oldindan ko&apos;rish</span>
          <span className="text-muted-foreground font-mono text-[11px]">({fileType})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="h-7 text-xs gap-1">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              <span>Katta ekranda</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="h-7 text-xs gap-1">
            <a href={fileUrl} download>
              <Download className="h-3 w-3" />
              <span>Yuklab olish</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Preview Viewer Box */}
      <div className="w-full h-[500px] bg-muted/30 relative flex flex-col items-center justify-center p-6 text-center">
        {isPdf ? (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0 rounded-lg"
            title={`Preview of ${title}`}
          />
        ) : (
          <div className="space-y-3 max-w-md">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <FileText className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm">{title}</h4>
              <p className="text-xs text-muted-foreground">
                Ushbu {fileType} formati to&apos;g&apos;ridan-to&apos;g'ri iframe orqali ko&apos;rsatish uchun tayyorlandi. To&apos;liq tahlil qilish uchun quyidagi tugma orqali yuklab olishingiz mumkin.
              </p>
            </div>
            <Button asChild size="default" className="gap-1.5">
              <a href={fileUrl} download>
                <Download className="h-4 w-4" />
                <span>Hujjatni yuklab olish</span>
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Footer disclaimer */}
      <div className="p-3 px-5 bg-card border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          RESILAND CA+ ochiq ilmiy litsenziyasi asosida taqdim etiladi
        </span>
        <span>Hajmi: {fileType}</span>
      </div>
    </div>
  );
}
