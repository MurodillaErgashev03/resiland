import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { newsArticles } from "@/data/news-data";
import { NewsDetailClient } from "@/components/news/news-detail-client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Yangilik topilmadi" };

  return {
    title: `${article.title} | RESILAND CA+`,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <NewsDetailClient article={article} />
      <Footer />
    </div>
  );
}
