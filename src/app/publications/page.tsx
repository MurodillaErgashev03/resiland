import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nashrlar | RESILAND CA+ Database",
  description: "RESILAND CA+ ilmiy nashrlar va hisobotlar katalogi",
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-12 outline-none">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Ilmiy nashrlar
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Nashrlar
            </h1>
            <p className="text-slate-600 leading-relaxed text-base">
              Dastur doirasida chop etilgan ilmiy maqolalar, hisobotlar va tahliliy materiallar.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                year: "2024",
                type: "Hisobot",
                title: "Markaziy Osiyo tog' ekotizimlari: holati va istiqbollari",
                authors: "Karimov A., Nazarov B., Sobirov D.",
              },
              {
                year: "2023",
                type: "Maqola",
                title: "O'zbekiston janubida cho'llanishga qarshi kurash: amaliy tajribalar",
                authors: "Toshmatov F., Ergasheva G.",
              },
              {
                year: "2023",
                type: "Qo'llanma",
                title: "Mintaqaviy landshaftlar tahlili uchun GIS metodologiyasi",
                authors: "CAREC tadqiqot guruhi",
              },
            ].map((pub, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex gap-4">
                <div className="shrink-0 w-16 text-center">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg block">{pub.type}</span>
                  <span className="text-xs text-slate-400 mt-1 block">{pub.year}</span>
                </div>
                <div className="space-y-1">
                  <h2 className="font-heading text-base font-bold text-slate-950 leading-snug">{pub.title}</h2>
                  <p className="text-xs text-slate-500">{pub.authors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
