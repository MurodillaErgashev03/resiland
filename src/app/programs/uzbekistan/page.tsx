import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { UzbekistanClient } from "@/components/programs/uzbekistan-client";

export const metadata: Metadata = {
  title: "O'zbekistonda RESILAND CA+ | Dastur Komponentlari",
  description:
    "Mintaqaviy almashinuv platformasi va umumiy bilim tashabbuslari orqali O'zbekistonning Markaziy Osiyo mamlakatlari bilan transchegaraviy hamkorlik va landshaftlarni tiklash borasidagi aloqalarini rag'batlantirish.",
};

export default function UzbekistanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <UzbekistanClient />
      <Footer />
    </div>
  );
}
