"use server";

import { materialSubmissionSchema, MaterialSubmission } from "@/lib/validations/material-schema";

export interface SubmitMaterialResponse {
  ok: boolean;
  error?: string;
  materialId?: string;
  status?: "pending" | "approved";
}

export async function submitMaterial(data: MaterialSubmission): Promise<SubmitMaterialResponse> {
  try {
    // 1. Server-side schema validation
    const parsed = materialSubmissionSchema.safeParse(data);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Ma'lumotlar to'liq yoki to'g'ri to'ldirilmagan";
      return { ok: false, error: errorMsg };
    }

    // 2. Simulate server-side processing & pending moderation queue insertion
    // In real system: DB insert with status: 'pending'
    await new Promise((resolve) => setTimeout(resolve, 800));

    const generatedId = `mat-pending-${Date.now().toString(36)}`;

    return {
      ok: true,
      materialId: generatedId,
      status: "pending",
    };
  } catch (error) {
    console.error("Material submission failed:", error);
    return {
      ok: false,
      error: "Serverda kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    };
  }
}
