import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgramsClient } from "@/components/programs/programs-client";

export const metadata: Metadata = {
  title: "Dastur Komponentlari | RESILAND CA+",
  description:
    "CAREC RESILAND CA+ ning mintaqaviy subkomponentlari: Markaziy Osiyo mamlakatlarida transchegaraviy landshaftlarni tiklash va iqlim o'zgarishiga chidamlilik dasturlari.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <ProgramsClient />
      <Footer />
    </div>
  );
}
