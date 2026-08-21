import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { NewsClient } from "@/components/news/news-client";

export const metadata: Metadata = {
  title: "Yangiliklar va e'lonlar | RESILAND CA+",
  description:
    "RESILAND CA+ va uning Markaziy Osiyodagi hamkor mamlakatlarining so'nggi yangiliklari, tadbirlari va e'lonlaridan xabardor bo'ling.",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <NewsClient />
      <Footer />
    </div>
  );
}
