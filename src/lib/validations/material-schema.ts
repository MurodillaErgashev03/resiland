import { z } from "zod";

export const materialSubmissionSchema = z.object({
  titleUz: z
    .string()
    .min(5, "O'zbekcha sarlavha kamida 5 ta belgidan iborat bo'lishi kerak"),
  titleRu: z
    .string()
    .min(5, "Ruscha sarlavha kamida 5 ta belgidan iborat bo'lishi kerak"),
  titleEn: z
    .string()
    .min(5, "Inglizcha sarlavha kamida 5 ta belgidan iborat bo'lishi kerak"),
  summaryUz: z
    .string()
    .min(20, "O'zbekcha qisqa tavsif kamida 20 ta belgidan iborat bo'lishi kerak")
    .max(1000, "Tavsif 1000 ta belgidan oshmasligi kerak"),
  summaryRu: z
    .string()
    .min(20, "Ruscha tavsif kamida 20 ta belgidan iborat bo'lishi kerak")
    .max(1000, "Tavsif 1000 ta belgidan oshmasligi kerak"),
  summaryEn: z
    .string()
    .min(20, "Inglizcha tavsif kamida 20 ta belgidan iborat bo'lishi kerak")
    .max(1000, "Tavsif 1000 ta belgidan oshmasligi kerak"),
  contentType: z.enum(
    ["publication", "dataset", "report", "guideline", "other"],
    { errorMap: () => ({ message: "Material turini tanlang" }) }
  ),
  countries: z
    .array(z.string())
    .min(1, "Kamida bitta tegishli mamlakatni tanlang"),
  topics: z
    .array(z.string())
    .min(1, "Kamida bitta sohaviy mavzuni tanlang"),
  author: z
    .string()
    .min(2, "Muallif(lar) ism-sharifini kiriting"),
  organization: z
    .string()
    .min(2, "Tashkilot yoki institut nomini kiriting"),
  year: z
    .number({ invalid_type_error: "Nashr yilini kiriting" })
    .min(1990, "Yil 1990 dan keyin bo'lishi kerak")
    .max(2030, "Yil 2030 dan oshmasligi kerak"),
  tags: z.string().optional(),
  fileType: z.string().default("PDF"),
  externalUrl: z
    .string()
    .url("To'g'ri URL manzil kiriting (masalan: https://...)")
    .optional()
    .or(z.literal("")),
});

export type MaterialSubmission = z.infer<typeof materialSubmissionSchema>;
