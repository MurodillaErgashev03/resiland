import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MetadataPanel } from "@/components/materials/metadata-panel";
import { FilePreview } from "@/components/materials/file-preview";
import { MaterialCard } from "@/components/materials/material-card";
import {
  getMaterialBySlug,
  getAllMaterialSlugs,
  getRelatedMaterials,
} from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Home,
  Database,
  Share2,
  Bookmark,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300; // ISR — 5 daqiqada bir marta qayta generatsiya

// 1. SSG: Build vaqtida barcha sahifalarni statik render qilish
export async function generateStaticParams() {
  const slugs = await getAllMaterialSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. SEO: Dinamik metama'lumotlar va OpenGraph teglar
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const material = await getMaterialBySlug(slug);

  if (!material) {
    return {
      title: "Material topilmadi — RESILAND CA+",
    };
  }

  const title = material.localizedTitle?.uz || material.title;
  const description = material.localizedSummary?.uz || material.description;

  return {
    title: `${title} | RESILAND CA+ Database`,
    description,
    keywords: material.tags,
    openGraph: {
      title: `${title} | RESILAND CA+`,
      description,
      type: "article",
      publishedTime: material.publishedAt,
      authors: [material.author],
      tags: material.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { slug } = await params;
  const material = await getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  const relatedItems = await getRelatedMaterials(slug, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-8 outline-none">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Bosh sahifa</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/materials" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <Database className="h-3.5 w-3.5" />
            <span>Ma&apos;lumotlar bazasi</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {material.title}
          </span>
        </nav>

        {/* Top Header Card */}
        <div className="space-y-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs uppercase font-semibold text-primary border-primary/30">
              {material.contentType}
            </Badge>
            <Badge variant="secondary" className="text-xs font-medium">
              {material.country}
            </Badge>
            <Badge variant="secondary" className="text-xs font-medium">
              {material.topic}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto font-mono">
              ID: {material.id}
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-slate-950">
            {material.title}
          </h1>

          {/* Multilingual Title Note */}
          {material.localizedTitle && (
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80 text-xs space-y-1.5">
              <div className="font-semibold text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Ko&apos;p tilli sarlavhalar (ToR 6.4-band talabi):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground pt-1">
                <div>
                  <strong className="text-foreground">RU:</strong> {material.localizedTitle.ru}
                </div>
                <div>
                  <strong className="text-foreground">EN:</strong> {material.localizedTitle.en}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Main Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Main Article Content & Preview */}
          <article className="space-y-8 min-w-0">
            {/* Description / Summary Section */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold tracking-tight">Qisqa tavsif va xulosa</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {material.description}
              </p>

              {material.localizedSummary && (
                <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Резюме (RU):</strong>{" "}
                    {material.localizedSummary.ru}
                  </p>
                  <p>
                    <strong className="text-foreground">Abstract (EN):</strong>{" "}
                    {material.localizedSummary.en}
                  </p>
                </div>
              )}
            </div>

            {/* Embedded File Preview Viewer */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold tracking-tight">Hujjat ko&apos;rinishi</h2>
              <FilePreview
                fileUrl={material.fileUrl}
                fileType={material.fileType}
                title={material.title}
              />
            </div>
          </article>

          {/* Right Sidebar: 8 Mandatory Metadata Fields */}
          <MetadataPanel material={material} />
        </div>

        {/* Related Materials Section */}
        {relatedItems.length > 0 && (
          <section className="pt-10 border-t border-border space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Mavzuga oid boshqa materiallar</h2>
                <p className="text-xs text-muted-foreground">
                  O&apos;xshash soha va mintaqaviy tadqiqotlar
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs">
                <Link href="/materials">Barchasini ko&apos;rish</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedItems.map((item) => (
                <MaterialCard key={item.id} material={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
