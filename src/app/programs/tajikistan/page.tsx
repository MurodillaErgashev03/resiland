import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tojikiston | RESILAND CA+ Database",
  description: "Tojikistondagi barqaror landshaft loyihalari va ekologik tadqiqotlar",
};

export default function TajikistanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-12 outline-none">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🇹🇯</span>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Dastur komponenti
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Tojikiston
              </h1>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Materiallar", value: "98 ta" },
              { label: "Tiklanayotgan maydon", value: "85,000 ga" },
              { label: "Loyihalar", value: "9 ta" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white text-center space-y-1">
                <p className="text-2xl font-extrabold text-emerald-700">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <h2 className="font-heading text-xl font-bold text-slate-950">Ekologik yo'nalish</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tojikistonning Pomir tog' tizimlarida o'rmonlarni tiklash, toshqin xavfini kamaytirish va landshaft barqarorligini oshirish asosiy ekologik yo'nalishlar hisoblanadi.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
