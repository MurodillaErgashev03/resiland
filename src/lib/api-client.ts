import { Material, StatsData } from "@/types";
import { mockMaterialsExtended, mockStats, ExtendedMaterial } from "./mock-data";

export interface GetMaterialsParams {
  q?: string;
  country?: string;
  topic?: string;
  type?: string;
  lang?: string;
  sort?: "recent" | "downloads" | "title";
  page?: number;
  limit?: number;
}

export interface PaginatedMaterialsResult {
  items: ExtendedMaterial[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function getMaterials(
  params: GetMaterialsParams = {}
): Promise<PaginatedMaterialsResult> {
  const page = params.page && params.page > 0 ? Number(params.page) : 1;
  const limit = params.limit && params.limit > 0 ? Number(params.limit) : 6;

  let filtered = [...mockMaterialsExtended];

  // 1. Keyword search
  if (params.q) {
    const q = params.q.toLowerCase().trim();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.organization.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // 2. Country filter
  if (params.country) {
    const countries = params.country.split(",").map((c) => c.trim().toLowerCase());
    filtered = filtered.filter((m) =>
      countries.includes(m.countryCode.toLowerCase()) ||
      countries.includes(m.country.toLowerCase())
    );
  }

  // 3. Topic filter
  if (params.topic) {
    const topics = params.topic.split(",").map((t) => t.trim().toLowerCase());
    filtered = filtered.filter((m) => topics.includes(m.topic.toLowerCase()));
  }

  // 4. Content Type filter
  if (params.type) {
    const types = params.type.split(",").map((t) => t.trim().toLowerCase());
    filtered = filtered.filter((m) => types.includes(m.contentType.toLowerCase()));
  }

  // 5. Language filter
  if (params.lang) {
    const langs = params.lang.split(",").map((l) => l.trim().toLowerCase());
    filtered = filtered.filter((m) => langs.includes(m.language.toLowerCase()));
  }

  // 6. Sorting
  if (params.sort === "downloads") {
    filtered.sort((a, b) => b.downloadsCount - a.downloadsCount);
  } else if (params.sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const startIndex = (page - 1) * limit;
  const items = filtered.slice(startIndex, startIndex + limit);

  return {
    items,
    total,
    page,
    totalPages,
    limit,
  };
}

export async function getMaterialBySlug(slug: string): Promise<ExtendedMaterial | null> {
  const found = mockMaterialsExtended.find((m) => m.slug === slug);
  return found || null;
}

export async function getAllMaterialSlugs(): Promise<string[]> {
  return mockMaterialsExtended.map((m) => m.slug);
}

export async function getRelatedMaterials(
  currentSlug: string,
  limit: number = 3
): Promise<ExtendedMaterial[]> {
  const current = mockMaterialsExtended.find((m) => m.slug === currentSlug);
  if (!current) return mockMaterialsExtended.slice(0, limit);

  const related = mockMaterialsExtended.filter(
    (m) =>
      m.slug !== currentSlug &&
      (m.topic === current.topic || m.country === current.country || m.contentType === current.contentType)
  );

  return related.slice(0, limit);
}

export async function getStats(): Promise<StatsData> {
  return mockStats;
}

export async function getRecentMaterials(options?: {
  limit?: number;
  country?: string;
  contentType?: string;
}): Promise<Material[]> {
  const result = await getMaterials({
    limit: options?.limit ?? 6,
    country: options?.country,
    type: options?.contentType,
  });
  return result.items;
}
