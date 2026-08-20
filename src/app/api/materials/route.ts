import { NextRequest, NextResponse } from "next/server";
import { mockMaterials } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const country = searchParams.get("country");
  const contentType = searchParams.get("contentType");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let results = [...mockMaterials];

  if (q) {
    results = results.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)) ||
        m.author.toLowerCase().includes(q) ||
        m.organization.toLowerCase().includes(q)
    );
  }

  if (country && country !== "all") {
    results = results.filter((m) => m.country === country);
  }

  if (contentType && contentType !== "all") {
    results = results.filter((m) => m.contentType === contentType);
  }

  return NextResponse.json(results.slice(0, limit));
}
