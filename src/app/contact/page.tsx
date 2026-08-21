import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata: Metadata = {
  title: "Bog'lanish | RESILAND CA+",
  description:
    "Dastur bo'yicha so'rovlar, hamkorlik takliflari yoki ommaviy axborot vositalari murojaatlari uchun RESILAND CA+ Kotibiyati yoki mamlakat darajasidagi guruh rahbari o'rinbosarlari bilan bog'laning.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <ContactClient />
      <Footer />
    </div>
  );
}
