import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { TajikistanClient } from "@/components/programs/tajikistan-client";

export const metadata: Metadata = {
  title: "Tojikistonda RESILAND CA+ | Dastur Komponentlari",
  description:
    "Transchegaraviy landshaftlarni tiklash va muhofaza etiladigan hududlarni boshqarish bo'yicha yuqori darajadagi muloqot uchun Markaziy Osiyo mamlakatlarini birlashtiruvchi Mintaqaviy almashinuv platformasini ishlab chiqish va boshqarish.",
};

export default function TajikistanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <TajikistanClient />
      <Footer />
    </div>
  );
}
