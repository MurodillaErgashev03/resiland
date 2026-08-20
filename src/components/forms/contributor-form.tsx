"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  materialSubmissionSchema,
  MaterialSubmission,
} from "@/lib/validations/material-schema";
import { submitMaterial } from "@/app/actions/submit-material";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Globe2,
  BookOpen,
  Layers,
  Sparkles,
  Link as LinkIcon,
  X,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const COUNTRIES = [
  { id: "Uzbekistan", label: "O'zbekiston" },
  { id: "Kazakhstan", label: "Qozog'iston" },
  { id: "Kyrgyzstan", label: "Qirg'iziston" },
  { id: "Tajikistan", label: "Tojikiston" },
  { id: "Turkmenistan", label: "Turkmaniston" },
  { id: "Regional (CA+)", label: "Mintaqaviy (Markaziy Osiyo)" },
];

const TOPICS = [
  { id: "forestry", label: "O'rmonlashtirish va yashil belbog'lar" },
  { id: "landDegradation", label: "Yer degradatsiyasi va cho'llanish" },
  { id: "climate", label: "Iqlim o'zgarishi va moslashuv" },
  { id: "water", label: "Suv resurslari va muzliklar" },
  { id: "pastures", label: "Yaylovlar boshqaruvi" },
  { id: "biodiversity", label: "Biologik xilma-xillik" },
];

const CONTENT_TYPES = [
  { id: "publication", label: "Ilmiy maqola (Publication)" },
  { id: "dataset", label: "Ma'lumotlar to'plami (Dataset)" },
  { id: "report", label: "Tahliliy hisobot (Report)" },
  { id: "guideline", label: "Qo'llanma / Yo'riqnoma (Guideline)" },
  { id: "other", label: "Boshqa rasmiy hujjat" },
];

export function ContributorForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MaterialSubmission>({
    resolver: zodResolver(materialSubmissionSchema),
    defaultValues: {
      contentType: "publication",
      countries: ["Uzbekistan"],
      topics: ["forestry"],
      year: new Date().getFullYear(),
      fileType: "PDF",
      externalUrl: "",
    },
  });

  const selectedCountries = watch("countries") || [];
  const selectedTopics = watch("topics") || [];
  const selectedContentType = watch("contentType");

  function handleCountryToggle(countryId: string) {
    const current = [...selectedCountries];
    const exists = current.includes(countryId);
    const updated = exists ? current.filter((c) => c !== countryId) : [...current, countryId];
    setValue("countries", updated, { shouldValidate: true });
  }

  function handleTopicToggle(topicId: string) {
    const current = [...selectedTopics];
    const exists = current.includes(topicId);
    const updated = exists ? current.filter((t) => t !== topicId) : [...current, topicId];
    setValue("topics", updated, { shouldValidate: true });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({ name: file.name, size: `${sizeMb} MB` });
      setValue("fileType", file.name.split(".").pop()?.toUpperCase() || "PDF");
    }
  }

  async function onSubmit(data: MaterialSubmission) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await submitMaterial(data);
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Material yuborishda xatolik yuz berdi");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Aloqa uzildi. Iltimos qayta urinib ko'ring.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 md:p-12 rounded-2xl border border-primary/30 bg-card text-center space-y-6 shadow-sm">
        <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto ring-8 ring-primary/5">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Material muvaffaqiyatli yuborildi!
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Siz taqdim etgan material <strong>moderatsiya navbatiga (&quot;pending&quot;)</strong> kiritildi. RESILAND CA+ ilmiy muharrirlari tomonidan tekshirilib, tasdiqlangach ommaviy bazada e&apos;lon qilinadi.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground max-w-sm mx-auto flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
          <span>ToR 4.4-bandi bo&apos;yicha majburiy oldindan moderatsiya talabi</span>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Button
            onClick={() => {
              reset();
              setUploadedFile(null);
              setStatus("idle");
            }}
            variant="outline"
            size="default"
          >
            Yana bitta material yuborish
          </Button>
          <Button asChild size="default">
            <Link href="/materials">Ma&apos;lumotlar bazasiga o&apos;tish</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Sarlavhalar (3 tilda) */}
      <Card>
        <CardHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Globe2 className="h-4 w-4" />
            <span>1. Ko&apos;p tilli Sarlavhalar (ToR 6.4-band talabi)</span>
          </div>
          <CardTitle className="text-base font-bold">Material sarlavhasi</CardTitle>
          <CardDescription className="text-xs">
            Hujjat yoki tadqiqot nomini 3 ta tilda kiriting (kamida 5 ta belgi)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="titleUz" className="text-xs font-semibold">
              O&apos;zbek tilida (UZ) <span className="text-primary">*</span>
            </Label>
            <Input
              id="titleUz"
              {...register("titleUz")}
              placeholder="Masalan: Orol dengizi tubida o'rmonzorlar barpo etish..."
              className={errors.titleUz ? "border-red-500" : ""}
            />
            {errors.titleUz && (
              <p className="text-[11px] text-red-500">{errors.titleUz.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="titleRu" className="text-xs font-semibold">
              Русский язык (RU) <span className="text-primary">*</span>
            </Label>
            <Input
              id="titleRu"
              {...register("titleRu")}
              placeholder="Например: Создание лесных насаждений на дне Аральского моря..."
              className={errors.titleRu ? "border-red-500" : ""}
            />
            {errors.titleRu && (
              <p className="text-[11px] text-red-500">{errors.titleRu.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="titleEn" className="text-xs font-semibold">
              English (EN) <span className="text-primary">*</span>
            </Label>
            <Input
              id="titleEn"
              {...register("titleEn")}
              placeholder="e.g.: Afforestation Assessment on the Dried Aral Sea Bed..."
              className={errors.titleEn ? "border-red-500" : ""}
            />
            {errors.titleEn && (
              <p className="text-[11px] text-red-500">{errors.titleEn.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 2. Qisqa tavsif / Xulosa (3 tilda) */}
      <Card>
        <CardHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>2. Ko&apos;p tilli Qisqa Tavsif va Xulosa</span>
          </div>
          <CardTitle className="text-base font-bold">Hujjatning qisqa mazmuni</CardTitle>
          <CardDescription className="text-xs">
            Hujjatning asosiy mohiyati va natijalari (20–1000 belgi oralig&apos;ida)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="summaryUz" className="text-xs font-semibold">
              O&apos;zbek tilida xulosa (UZ) <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="summaryUz"
              rows={3}
              {...register("summaryUz")}
              placeholder="Tadqiqot maqsadi va asosiy xulosalari..."
              className={errors.summaryUz ? "border-red-500" : ""}
            />
            {errors.summaryUz && (
              <p className="text-[11px] text-red-500">{errors.summaryUz.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="summaryRu" className="text-xs font-semibold">
              Краткое описание (RU) <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="summaryRu"
              rows={3}
              {...register("summaryRu")}
              placeholder="Цель исследования и основные выводы..."
              className={errors.summaryRu ? "border-red-500" : ""}
            />
            {errors.summaryRu && (
              <p className="text-[11px] text-red-500">{errors.summaryRu.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="summaryEn" className="text-xs font-semibold">
              Executive Summary (EN) <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="summaryEn"
              rows={3}
              {...register("summaryEn")}
              placeholder="Research objectives and key findings..."
              className={errors.summaryEn ? "border-red-500" : ""}
            />
            {errors.summaryEn && (
              <p className="text-[11px] text-red-500">{errors.summaryEn.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Tasniflash: Kontent turi, Mamlakat, Soha */}
      <Card>
        <CardHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>3. Taksonomiya va Metama&apos;lumotlar</span>
          </div>
          <CardTitle className="text-base font-bold">Kategoriya va Mintaqa</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Content Type Radio Selector */}
          <div className="space-y-2.5">
            <Label className="text-xs font-semibold">
              Kontent turi <span className="text-primary">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setValue("contentType", type.id as any, { shouldValidate: true })}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    selectedContentType === type.id
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  <span>{type.label}</span>
                  {selectedContentType === type.id && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
            {errors.contentType && (
              <p className="text-[11px] text-red-500">{errors.contentType.message}</p>
            )}
          </div>

          {/* Countries Checkboxes */}
          <div className="space-y-2.5 pt-2 border-t border-border">
            <Label className="text-xs font-semibold">
              Tegishli Mamlakat(lar) <span className="text-primary">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COUNTRIES.map((country) => {
                const isChecked = selectedCountries.includes(country.id);
                return (
                  <div
                    key={country.id}
                    onClick={() => handleCountryToggle(country.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked ? "border-primary/50 bg-primary/5 text-foreground" : "border-border hover:bg-muted"
                    }`}
                  >
                    <Checkbox id={`c-${country.id}`} checked={isChecked} />
                    <Label htmlFor={`c-${country.id}`} className="cursor-pointer font-medium">
                      {country.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.countries && (
              <p className="text-[11px] text-red-500">{errors.countries.message}</p>
            )}
          </div>

          {/* Topics Checkboxes */}
          <div className="space-y-2.5 pt-2 border-t border-border">
            <Label className="text-xs font-semibold">
              Sohaviy Mavzu(lar) <span className="text-primary">*</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPICS.map((topic) => {
                const isChecked = selectedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked ? "border-primary/50 bg-primary/5 text-foreground" : "border-border hover:bg-muted"
                    }`}
                  >
                    <Checkbox id={`t-${topic.id}`} checked={isChecked} />
                    <Label htmlFor={`t-${topic.id}`} className="cursor-pointer font-medium">
                      {topic.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors.topics && (
              <p className="text-[11px] text-red-500">{errors.topics.message}</p>
            )}
          </div>

          {/* Author, Org, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <Label htmlFor="author" className="text-xs font-semibold">
                Muallif(lar) <span className="text-primary">*</span>
              </Label>
              <Input
                id="author"
                {...register("author")}
                placeholder="Dr. A. Rahimov..."
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && (
                <p className="text-[11px] text-red-500">{errors.author.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="organization" className="text-xs font-semibold">
                Tashkilot / Institut <span className="text-primary">*</span>
              </Label>
              <Input
                id="organization"
                {...register("organization")}
                placeholder="O'rmon xo'jaligi instituti..."
                className={errors.organization ? "border-red-500" : ""}
              />
              {errors.organization && (
                <p className="text-[11px] text-red-500">{errors.organization.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="year" className="text-xs font-semibold">
                Nashr yili <span className="text-primary">*</span>
              </Label>
              <Input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
                className={errors.year ? "border-red-500" : ""}
              />
              {errors.year && (
                <p className="text-[11px] text-red-500">{errors.year.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Fayl biriktirish yoki Tashqi havola */}
      <Card>
        <CardHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Upload className="h-4 w-4" />
            <span>4. Fayl yoki Tashqi Havola (ToR 6.5-band talabi)</span>
          </div>
          <CardTitle className="text-base font-bold">Hujjat faylini yuklash</CardTitle>
          <CardDescription className="text-xs">
            PDF, DOCX yoki XLSX (maksimal 25MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/40 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Upload className="h-6 w-6" />
            </div>
            <span className="font-semibold text-sm">
              Faylni tanlang yoki shu yerga sudrab tashlang
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              Qo&apos;llab-quvvatlanadi: .PDF, .DOCX, .XLSX (maks. 25MB)
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,.xlsx,.geojson,.zip"
              onChange={handleFileChange}
            />
          </label>

          {uploadedFile && (
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{uploadedFile.name}</span>
                <span className="text-muted-foreground">({uploadedFile.size})</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="text-muted-foreground hover:text-red-500 p-1"
                aria-label="Faylni o'chirish"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="pt-3 border-t border-border space-y-1.5">
            <Label htmlFor="externalUrl" className="text-xs font-semibold flex items-center gap-1.5">
              <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Yoki tashqi havola (ixtiyoriy)</span>
            </Label>
            <Input
              id="externalUrl"
              {...register("externalUrl")}
              placeholder="https://example.org/dataset/..."
            />
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-muted/20 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Barcha yulduzcha (<span className="text-primary">*</span>) bilan belgilangan maydonlar majburiy.
          </p>
          <Button
            type="submit"
            disabled={status === "submitting"}
            size="lg"
            className="rounded-xl px-8 font-semibold shadow-sm"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Yuborilmoqda...</span>
              </>
            ) : (
              <span>Materialni yuborish</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
