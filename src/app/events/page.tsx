import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tadbirlar | RESILAND CA+ Database",
  description: "RESILAND CA+ dasturi tadbirlari va konferensiyalari",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-12 outline-none">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Kelgusi va o'tgan tadbirlar
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Tadbirlar
            </h1>
            <p className="text-slate-600 leading-relaxed text-base">
              Dastur doirasida rejalashtirilgan va o'tkazilgan konferensiyalar, seminarlar va treninglar.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                date: "2025-03-15",
                location: "Toshkent, O'zbekiston",
                status: "Rejalashtirilgan",
                title: "Yer resurslari monitoringi bo'yicha mintaqaviy seminar",
                desc: "5 davlatdan mutaxassislar ishtirokida o'tkaziladigan ikki kunlik seminar.",
              },
              {
                date: "2024-11-15",
                location: "Bishkek, Qirg'iziston",
                status: "O'tkazildi",
                title: "Markaziy Osiyo landshaftlarini tiklash konferensiyasi",
                desc: "150 dan ortiq ishtirokchi qatnashgan mintaqaviy konferensiya muvaffaqiyatli yakunlandi.",
              },
            ].map((event, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    event.status === "Rejalashtirilgan"
                      ? "text-blue-700 bg-blue-50 border-blue-200"
                      : "text-slate-600 bg-slate-50 border-slate-200"
                  }`}>{event.status}</span>
                  <span className="text-xs text-slate-400">{event.date}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{event.location}</span>
                </div>
                <h2 className="font-heading text-lg font-bold text-slate-950 mb-1">{event.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
