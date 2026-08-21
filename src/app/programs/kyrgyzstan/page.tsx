import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { KyrgyzstanClient } from "@/components/programs/kyrgyzstan-client";

export const metadata: Metadata = {
  title: "RESILAND CA+ in the Kyrgyz Republic | Dastur Komponentlari",
  description:
    "Developing regional knowledge products on climate-induced disasters, nature-based solutions, and mudflow mitigation to strengthen Central Asia's collective resilience.",
};

export default function KyrgyzstanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <KyrgyzstanClient />
      <Footer />
    </div>
  );
}
