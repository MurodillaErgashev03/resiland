"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Tag,
  Globe2,
  ArrowLeft,
  Share2,
  Printer,
  ChevronRight,
  Layers,
  Quote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsItem, newsArticles } from "@/data/news-data";

import heroBg from "@/assets/img/image.png";

interface NewsDetailClientProps {
  article: NewsItem;
}

export function NewsDetailClient({ article }: NewsDetailClientProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => {
    setupObserver();
    return () => observerRef.current?.disconnect();
  }, [setupObserver]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (platform: "facebook" | "twitter" | "linkedin") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(article.title);
    let shareUrl = "";

    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const relatedArticles = newsArticles.filter((n) => n.id !== article.id);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      
      {/* ─── Hero Header Banner (Matching site-wide hero design) ─── */}
      <section className="relative text-white min-h-[60vh] md:min-h-[65vh] -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt={article.title}
            fill priority quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Soft contrast gradient for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-20 relative z-10">
          <div className="max-w-4xl space-y-6">
            
            {/* Breadcrumb & Navigation */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-emerald-300 border border-emerald-500/30 backdrop-blur-md hover:bg-black/60 transition-colors"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Bosh sahifa</span>
              </Link>
              <span className="text-white/40">/</span>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-emerald-300 border border-emerald-500/30 backdrop-blur-md hover:bg-black/60 transition-colors"
              >
                <span>Yangiliklar</span>
              </Link>
              <span className="text-white/40">/</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                Batafsil
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {article.title}
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            {/* Quick Hero Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <Tag className="h-3.5 w-3.5" />
                {article.topic}
              </div>
              {article.country && (
                <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                  <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
                  {article.country}
                </div>
              )}
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                {article.publishedDate}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Main Article Content ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 pb-16 md:pb-24 outline-none">
        
        {/* Floating Metadata & Actions Bar */}
        <section className="relative z-20 -mt-8 sm:-mt-10 container mx-auto px-4 md:px-12 max-w-4xl mb-10">
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-slate-900/5 flex flex-wrap items-center justify-between gap-4 text-xs font-medium reveal-scale">
            
            {/* Left Info Badges */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              {/* Published Date */}
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-extrabold tracking-wider">
                  PUBLISHED
                </span>
                <span className="text-slate-900 font-bold text-xs mt-0.5 block">
                  {article.dateIso}
                </span>
              </div>

              {/* Country */}
              {article.country && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-extrabold tracking-wider">
                    COUNTRY
                  </span>
                  <span className="inline-flex items-center gap-1 mt-0.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {article.country}
                  </span>
                </div>
              )}

              {/* Topic */}
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-extrabold tracking-wider">
                  TOPIC
                </span>
                <span className="inline-flex items-center gap-1 mt-0.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {article.topic}
                </span>
              </div>
            </div>

            {/* Right Share & Print Buttons */}
            <div className="flex items-center gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200 w-full sm:w-auto justify-between sm:justify-end">
              {/* Share Icons */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mr-1 hidden sm:inline">
                  SHARE THIS ARTICLE
                </span>
                <button
                  onClick={() => handleShare("facebook")}
                  className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  title="Share on Facebook"
                >
                  f
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  title="Share on X"
                >
                  𝕏
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="h-8 w-8 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  title="Share on LinkedIn"
                >
                  in
                </button>
              </div>

              {/* Print Button */}
              <div className="border-l border-slate-300 pl-3">
                <button
                  onClick={handlePrint}
                  className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Maqolani chop etish"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            ARTICLE BODY & IMAGES
        ════════════════════════════════════════════════════ */}
        <div className="container mx-auto px-4 md:px-12 max-w-4xl space-y-8">
          
          {/* Main Article Image */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 reveal-scale">
            <Image
              src={article.image}
              alt={article.title}
              fill priority quality={100}
              className="object-cover"
            />
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed pt-4 reveal">
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            {/* Delegation List if available */}
            {article.delegation && article.delegation.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white space-y-3.5 my-6 shadow-xs">
                <h3 className="font-heading font-extrabold text-slate-950 text-base sm:text-lg flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Qirg&apos;iziston Respublikasi delegatsiyasi tarkibi:
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                  {article.delegation.map((delItem, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">•</span>
                      <span>{delItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quote Block if available */}
            {article.quote && (
              <div className="my-8 rounded-3xl border-l-[6px] border-l-emerald-600 border border-slate-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 sm:p-8 shadow-md relative">
                <Quote className="h-10 w-10 text-emerald-500/20 absolute right-6 top-6 pointer-events-none" />
                <p className="italic text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                  &ldquo;{article.quote.text}&rdquo;
                </p>
                <div className="mt-4 pt-3.5 border-t border-slate-200 text-xs font-bold text-emerald-800">
                  — {article.quote.author}
                </div>
              </div>
            )}
          </div>

          {/* ════════════════════════════════════════════════════
              RELATED ARTICLES (Boshqa yangiliklar)
          ════════════════════════════════════════════════════ */}
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-950">
                Boshqa Yangiliklar
              </h3>
              <Link
                href="/news"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider flex items-center gap-1"
              >
                Barchasi <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-3xl border border-slate-200/90 border-l-[6px] border-l-emerald-600 bg-white p-6 shadow-xs hover:shadow-xl smooth-card-hover space-y-3"
                >
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {rel.topic}
                  </span>
                  <h4 className="font-heading text-base font-extrabold text-slate-950 leading-snug line-clamp-2">
                    <Link href={`/news/${rel.slug}`} className="hover:text-emerald-700 transition-colors">
                      {rel.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
