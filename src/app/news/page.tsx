import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yangiliklar | RESILAND CA+ Database",
  description: "RESILAND CA+ dasturi yangiliklari va e'lonlari",
};

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-12 outline-none">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              So'nggi yangiliklar
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Yangiliklar
            </h1>
            <p className="text-slate-600 leading-relaxed text-base">
              RESILAND CA+ dasturi va Markaziy Osiyo ekologik loyihalariga oid so'nggi yangiliklar.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                date: "2024-11-15",
                title: "Markaziy Osiyo landshaftlarini tiklash bo'yicha mintaqaviy konferensiya",
                excerpt: "CAREC va Jahon banki hamkorligida Toshkentda o'tkazilgan mintaqaviy konferensiya yakunlandi.",
                tag: "Konferensiya",
              },
              {
                date: "2024-10-20",
                title: "RESILAND CA+ bazasida 486 ta ilmiy material jamlandi",
                excerpt: "5 ta Markaziy Osiyo davlatidan 486 ta ilmiy maqola, hisobot va geofazoviy ma'lumot to'plami bazaga qo'shildi.",
                tag: "E'lon",
              },
            ].map((news, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">{news.tag}</span>
                  <span className="text-xs text-slate-400">{news.date}</span>
                </div>
                <h2 className="font-heading text-lg font-bold text-slate-950 mb-2">{news.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
