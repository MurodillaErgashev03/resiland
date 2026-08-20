export type ContentType =
  | "publication"
  | "dataset"
  | "report"
  | "guideline"
  | "other";

export type Country =
  | "Uzbekistan"
  | "Kazakhstan"
  | "Kyrgyzstan"
  | "Tajikistan"
  | "Turkmenistan"
  | "Regional (CA+)";

export type FileType = "pdf" | "docx" | "xlsx" | "geojson" | "external_link";

export interface LocalizedText {
  uz: string;
  ru: string;
  en: string;
}

export interface Material {
  id: string;
  slug: string;
  title: string;
  description: string;
  localizedTitle?: LocalizedText;
  localizedSummary?: LocalizedText;
  contentType: ContentType;
  country: Country;
  countryCode?: "uz" | "kz" | "kg" | "tj" | "tm" | "regional";
  topic?: "forestry" | "landDegradation" | "climate" | "water" | "biodiversity" | "pastures";
  year: number;
  author: string;
  organization: string;
  publishedAt: string;
  updatedAt?: string;
  downloadsCount: number;
  viewsCount: number;
  fileSize?: string;
  fileType?: string;
  fileUrl?: string;
  tags: string[];
}

export interface StatsData {
  totalMaterials: number;
  totalDatasets: number;
  totalPublications: number;
  totalReports: number;
  totalGuidelines: number;
  byCountry: { country: string; count: number }[];
  lastAddedAt: string;
}
