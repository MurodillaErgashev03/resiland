"use client";

import { useState } from "react";
import { Material } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  Building2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface MaterialPreviewDialogProps {
  material: Material;
  trigger?: React.ReactNode;
}

export function MaterialPreviewDialog({ material, trigger }: MaterialPreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isPdf = material.fileType?.toUpperCase().includes("PDF");
  const isDoc = material.fileType?.toUpperCase().includes("DOC");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} className="inline-block">
          {trigger}
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="h-8 text-xs gap-1.5"
          aria-label={`${material.title} hujjatini oldindan ko'rish`}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Oldindan ko&apos;rish</span>
        </Button>
      )}

      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-6 gap-4">
        <DialogHeader className="space-y-2 text-left border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs uppercase font-semibold text-primary border-primary/30">
              {material.contentType}
            </Badge>
            <Badge variant="secondary" className="text-xs font-medium">
              {material.country}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto font-mono">
              {material.fileType} • {material.fileSize}
            </span>
          </div>

          <DialogTitle className="text-lg md:text-xl font-bold leading-snug">
            {material.title}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground line-clamp-2">
            {material.description}
          </DialogDescription>
        </DialogHeader>

        {/* Document Preview Viewer Body */}
        <div className="flex-1 w-full h-full bg-muted/40 rounded-lg border border-border overflow-hidden relative flex flex-col">
          {material.fileUrl ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                <FileText className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="max-w-md space-y-1">
                <h4 className="font-semibold text-sm">Hujjat interaktiv ko&apos;rinishi</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {material.title} ({material.fileType} formatida, hajmi {material.fileSize}). To&apos;liq tahlil qilish uchun quyidagi tugma orqali yuklab olishingiz yoki yangi oynada ochishingiz mumkin.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="default" className="gap-2">
                  <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                    <span>Yangi oynada to&apos;liq ochish</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="default" className="gap-2">
                  <a href={material.fileUrl} download>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>Yuklab olish</span>
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
              Ushbu material uchun oldindan ko&apos;rish fayli biriktirilmagan.
            </div>
          )}
        </div>

        {/* Footer Meta Details */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {material.organization}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {material.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
              <a href={material.fileUrl} download>
                <Download className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Yuklab olish
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
