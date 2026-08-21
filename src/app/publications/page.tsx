import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { PublicationsClient } from "@/components/publications/publications-client";

export const metadata: Metadata = {
  title: "Nashrlar va Hisobotlar | RESILAND CA+",
  description:
    "RESILAND CA+ va uning hamkorlarining hisobotlari, yo'riqnomalari, siyosiy sharhlari va texnik hujjatlari. Barcha nashrlarni bepul yuklab olish mumkin.",
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <PublicationsClient />
      <Footer />
    </div>
  );
}
