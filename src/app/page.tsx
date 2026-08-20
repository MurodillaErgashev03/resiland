import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeClient } from "@/components/home/home-client";
import { getStats, getRecentMaterials } from "@/lib/api-client";

export const revalidate = 60; // ISR — 60 soniyada bir marta yangilanadi

export default async function HomePage() {
  const [stats, recent] = await Promise.all([
    getStats(),
    getRecentMaterials({ limit: 6 }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <HomeClient stats={stats} recent={recent} />
      <Footer />
    </div>
  );
}
