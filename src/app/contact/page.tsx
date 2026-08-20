import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bog'lanish | RESILAND CA+ Database",
  description: "RESILAND CA+ bilan bog'lanish uchun aloqa ma'lumotlari",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-12 outline-none">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Aloqa
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Bog'lanish
            </h1>
            <p className="text-slate-600 leading-relaxed text-base">
              Savollar, takliflar yoki hamkorlik uchun biz bilan bog'laning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
              <p className="text-sm font-semibold text-emerald-700">info@resiland-ca.org</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Manzil</p>
              <p className="text-sm font-semibold text-slate-800">Toshkent, O'zbekiston</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tashkilot</p>
              <p className="text-sm font-semibold text-slate-800">CAREC</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Veb-sayt</p>
              <a href="https://carececo.org" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">carececo.org</a>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
            <h2 className="font-heading text-lg font-bold text-slate-950">Xabar yuborish</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Ism</label>
                <input type="text" placeholder="Ismingiz" className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email</label>
                <input type="email" placeholder="email@misol.com" className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Xabar</label>
              <textarea rows={4} placeholder="Xabaringizni yozing..." className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none" />
            </div>
            <button type="button" className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all hover:scale-[1.01] shadow-md shadow-emerald-700/20">
              Yuborish
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
