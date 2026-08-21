import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { AboutClient } from "@/components/about/about-client";

export const metadata: Metadata = {
  title: "RESILAND haqida – Central Asia Sustainable Landscape Restoration (RESILAND CA+)",
  description: "Markaziy Osiyoda barqaror landshaftlar dasturi (RESILAND CA+) haqida to'liq ma'lumot, dastur sharhi, muammo, chora-tadbirlar, jamoa va global model",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <AboutClient />
      <Footer />
    </div>
  );
}
