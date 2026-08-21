import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import heroMountainBg from "@/assets/img/image.png";
import flagKirgz from "@/assets/img/kirgz.png";
import flagTojik from "@/assets/img/tojik.png";
import flagUzbek from "@/assets/img/uzbek.png";
import flagQozoq from "@/assets/img/qozoq.png";
import flagTurkman from "@/assets/img/turkman.png";
import { Trees, Shield, Home, Handshake, Globe, Mail, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "RESILAND haqida – Central Asia Sustainable Landscape Restoration (RESILAND CA+)",
  description: "Markaziy Osiyoda barqaror landshaftlar dasturi (RESILAND CA+) haqida to'liq ma'lumot, dastur sharhi, muammo, chora-tadbirlar, jamoa va global model",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* ─── Hero Section with Mountain Landscape (100vh) ─── */}
      <section className="relative text-white min-h-screen -mt-14 pt-14 flex items-center overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroMountainBg}
            alt="Markaziy Osiyo tog' va landshaftlari"
            fill
            priority
            quality={100}
            className="object-cover object-[center_35%]"
          />
          {/* Dark gradient for perfect readability and seamless transparent header integration */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 md:px-12 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/40 text-emerald-300 border border-emerald-500/30 shadow-md backdrop-blur-md">
              <Trees className="h-3.5 w-3.5 text-emerald-400" />
              RESILAND CA+
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              RESILAND CA+ haqida
            </h1>

            {/* Accent Green Line */}
            <div className="w-20 h-1.5 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50" />

            <p className="text-slate-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-2xl pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Markaziy Osiyoda barqaror landshaftlar dasturi — bu mintaqaviy hamkorlik orqali Markaziy Osiyoning beshta mamlakatida degradatsiyaga uchragan landshaftlarni qayta tiklash, iqlimga chidamlilikni oshirish va jamoalarning yashash sharoitlarini yaxshilashga qaratilgan, CAREC tomonidan muvofiqlashtiriladigan Jahon bankining flagman tashabbusidir.
            </p>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/80 z-10 pointer-events-none">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">Pastga siljiting</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-emerald-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── Main Content Body ─── */}
      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-12 py-14 outline-none">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* ════════════════════════════════════════════════
              1. DASTUR SHARHI
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
              Dastur sharhi
            </h2>
            <div className="space-y-5 text-slate-700 text-base leading-relaxed">
              <p>
                RESILAND CA+ — Jahon bankining flagman mintaqaviy dasturi bo&apos;lib, u 2019-yilda tashkil etilgan va mintaqaviy darajada Markaziy Osiyo mintaqaviy ekologiya markazi (CAREC) tomonidan muvofiqlashtiriladi. Dastur Qozog&apos;iston, Qirg&apos;iziston Respublikasi, Tojikiston, Turkmaniston va O&apos;zbekistonga yerlarning degradatsiyasiga qarshi kurashish hamda umumiy transchegaraviy landshaftlarda iqlim o&apos;zgarishiga chidamlilikni mustahkamlashda ko&apos;maklashadi.
              </p>
              <p>
                Dastur Markaziy Osiyo mamlakatlariga landshaftlarni qayta tiklash orqali ularning barqarorligini oshirish uchun mintaqaviy asos yaratadi. U landshaftlarni qayta tiklash bo&apos;yicha tahliliy va maslahat xizmatlarini moliyalashtiradi hamda ofat xavfini kamaytirish va landshaftlarni qayta tiklash bo&apos;yicha yuqori darajadagi muloqot uchun <strong className="font-bold text-slate-900">Mintaqaviy almashinuv platformasi</strong> bilan bog&apos;langan milliy investitsiya loyihalarini qo&apos;llab-quvvatlaydi.
              </p>
              <p>
                CAREC dasturning <strong className="font-bold text-slate-900">mintaqaviy subkomponentlarini</strong> boshqaradi, bilim almashishni, transchegaraviy siyosatni uyg&apos;unlashtirishni va barcha beshta mamlakat bo&apos;ylab mintaqaviy almashinuv platformasini muvofiqlashtiradi. Milliy investitsiya loyihalari Jahon banki moliyalashtiruvi asosida har bir mamlakat hukumati tomonidan bevosita amalga oshiriladi.
              </p>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* ════════════════════════════════════════════════
              2. MUAMMO
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
              Muammo
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Markaziy Osiyoning qurg&apos;oqchil yerlari bir qator bosimlarga duch kelmoqda: yer degradatsiyasi, iqlim bilan bog&apos;liq ekstremal ob-havo sharoitlari va yerlardan barqaror bo&apos;lmagan foydalanish. Chegara hududlari ham degradatsiya, ham qashshoqlik o&apos;choqlari hisoblanadi, bu esa transchegaraviy hamkorlikni zaruriy qiladi.
            </p>

            {/* Callout box matching live site */}
            <div className="rounded-lg bg-[#fff8ee] border-l-4 border-amber-500 p-6 sm:p-8 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Yer degradatsiyasi Markaziy Osiyoga har yili taxminan <span className="text-[#ea580c] font-extrabold text-xl sm:text-2xl">YaIMning 6%</span> miqdorida zarar keltiradi
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-slate-950 font-bold">Orolqum cho&apos;li</strong> — Orol dengizining 60 000 km² maydonni egallagan sobiq tubi bo&apos;lib, u ko&apos;plab mamlakatlarda salomatlikka, tuproq sifatiga va aholi turmushiga zarar yetkazuvchi zaharli chang va qum bo&apos;ronlarini keltirib chiqaradi. Birgina Qoraqalpog&apos;istondagi yillik iqtisodiy yo&apos;qotishlar <strong className="text-slate-950 font-bold">44,2 million dollarga</strong> baholanmoqda. Chegaralarning yer degradatsiyasi, iqlim ofatlari, tabiiy xavf-xatarlar va qashshoqlikka moyilligi mintaqaviy yondashuvni o&apos;ta muhim qiladi.
              </p>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* ════════════════════════════════════════════════
              3. MINTAQAVIY CHORA-TADBIRLAR
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
                Mintaqaviy chora-tadbirlar
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                RESILAND CA+ tabiat, landshaftlar va ekotizimlar chegara bilmasligini anglagan holda muvofiqlashtirilgan, transchegaraviy yondashuvni qo&apos;llaydi. Dastur to&apos;rtta o&apos;zaro bog&apos;liq yo&apos;nalish orqali amalga oshiriladi:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Card 1: Landshaftlarni qayta tiklash */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Trees className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-950">
                    Landshaftlarni qayta tiklash
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  Qurg&apos;oqchilikka chidamli turlarni ekish, degradatsiyaga uchragan o&apos;rmon va yaylovlarni reabilitatsiya qilish hamda jamoaga yo&apos;naltirilgan qayta tiklash modellarini joriy etish.
                </p>
              </div>

              {/* Card 2: Iqlimga chidamlilik */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-sky-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-950">
                    Iqlimga chidamlilik
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  Iqlim bilan bog&apos;liq xavf-xatarlarni monitoring qilish hamda sel, suv toshqinlari va chang bo&apos;ronlari oqibatlarini yumshatish uchun tabiatga asoslangan va yashil-kulrang yechimlarga investitsiya kiritish.
                </p>
              </div>

              {/* Card 3: Jamoalarning yashash sharoitlari */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-amber-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Home className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-950">
                    Jamoalarning yashash sharoitlari
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  Tabiiy resurslarga bosimni kamaytirish uchun jamoalarni iqtisodiy faoliyatni diversifikatsiya qilishda (ekoturizm, agromelioratsiya, ko&apos;nikmalarni rivojlantirish) qo&apos;llab-quvvatlash.
                </p>
              </div>

              {/* Card 4: Mintaqaviy hamkorlik */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-teal-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-950">
                    Mintaqaviy hamkorlik
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-13">
                  Birgalikda boshqariladigan transchegaraviy muhofaza etiladigan hududlarni tashkil etish, siyosiy muloqotni va landshaft boshqaruviga uyg&apos;unlashgan yondashuvlarni rag&apos;batlantirish.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* ════════════════════════════════════════════════
              4. CAREC'NING ROLI: MINTAQAVIY SUBKOMPONENTLAR
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
                CAREC&apos;ning roli: Mintaqaviy subkomponentlar
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                CAREC har bir milliy RESILAND loyihasiga kiritilgan mintaqaviy subkomponentlarni muvofiqlashtiradi. Ushbu subkomponentlar transchegaraviy hamkorlikni mustahkamlash, mintaqaviy almashinuv platformasini boshqarish va barcha beshta mamlakatda qo&apos;llanilishi mumkin bo&apos;lgan mintaqaviy bilim mahsulotlarini ishlab chiqishga qaratilgan.
              </p>
            </div>

            {/* Green Header Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2e7d32] text-white">
                    <th className="py-3.5 px-6 font-semibold">Mamlakat</th>
                    <th className="py-3.5 px-6 font-semibold">Mintaqaviy byudjet</th>
                    <th className="py-3.5 px-6 font-semibold">Davomiyligi</th>
                    <th className="py-3.5 px-6 font-semibold">Holati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {/* Row 1: Qirg'iziston */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <Image src={flagKirgz} alt="Qirg'iziston" width={20} height={14} className="rounded-xs object-cover shadow-xs" />
                      Qirg&apos;iziston Respublikasi
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">892 857 $</td>
                    <td className="py-4 px-6 text-slate-600">Iyun 2025 – Dek 2028</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Faol
                      </span>
                    </td>
                  </tr>

                  {/* Row 2: Tojikiston */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <Image src={flagTojik} alt="Tojikiston" width={20} height={14} className="rounded-xs object-cover shadow-xs" />
                      Tojikiston
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">1 807 547 $</td>
                    <td className="py-4 px-6 text-slate-600">May 2024 – Sen 2027</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Faol
                      </span>
                    </td>
                  </tr>

                  {/* Row 3: O'zbekiston */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <Image src={flagUzbek} alt="O'zbekiston" width={20} height={14} className="rounded-xs object-cover shadow-xs" />
                      O&apos;zbekiston
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">2 000 000 $</td>
                    <td className="py-4 px-6 text-slate-600">Iyul 2025 – Avg 2028</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Faol
                      </span>
                    </td>
                  </tr>

                  {/* Row 4: Qozog'iston */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <Image src={flagQozoq} alt="Qozog'iston" width={20} height={14} className="rounded-xs object-cover shadow-xs" />
                      Qozog&apos;iston
                    </td>
                    <td className="py-4 px-6 text-slate-400">Mavjud emas</td>
                    <td className="py-4 px-6 text-slate-400">Mavjud emas</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#805ad5]">
                        <span className="h-2 w-2 rounded-full bg-[#805ad5]" />
                        Maslahat berish bosqichi
                      </span>
                    </td>
                  </tr>

                  {/* Row 5: Turkmaniston */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <Image src={flagTurkman} alt="Turkmaniston" width={20} height={14} className="rounded-xs object-cover shadow-xs" />
                      Turkmaniston
                    </td>
                    <td className="py-4 px-6 text-slate-400">Mavjud emas</td>
                    <td className="py-4 px-6 text-slate-400">Mavjud emas</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#805ad5]">
                        <span className="h-2 w-2 rounded-full bg-[#805ad5]" />
                        Landshaft tadqiqoti
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* ════════════════════════════════════════════════
              5. DASTUR JAMOASI (Program Team)
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 text-emerald-700" />
              <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
                Dastur jamoasi
              </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2e7d32] text-white">
                    <th className="py-3.5 px-6 font-semibold">Lavozimi</th>
                    <th className="py-3.5 px-6 font-semibold">Ismi</th>
                    <th className="py-3.5 px-6 font-semibold">Elektron pochta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {/* Member 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      Loyiha jamoasi rahbari
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      Batir Mammedov
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href="mailto:bmammedov@carececo.org"
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        bmammedov@carececo.org
                      </a>
                    </td>
                  </tr>

                  {/* Member 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      Jamoa rahbari o‘rinbosari — Tojikiston
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      Dilovarsho Dustzoda
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href="mailto:recath_manager@carececo.org"
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        recath_manager@carececo.org
                      </a>
                    </td>
                  </tr>

                  {/* Member 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      Jamoa rahbari o‘rinbosari — Qirg‘iziston Respublikasi
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      Lyudmila Kiktenko
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href="mailto:lkiktenko@carececo.org"
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        lkiktenko@carececo.org
                      </a>
                    </td>
                  </tr>

                  {/* Member 4 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      Jamoa rahbari o‘rinbosari — O‘zbekiston
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      Azamat Kauazov
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href="mailto:cacip@carececo.org"
                        className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        cacip@carececo.org
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* ════════════════════════════════════════════════
              6. GLOBAL TAKRORLASH MODELI (Global Replication Model)
          ════════════════════════════════════════════════ */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl sm:text-[32px] font-bold tracking-tight text-slate-950">
                Global takrorlash modeli
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                RESILAND CA+ endilikda butun dunyo bo‘ylab qurg‘oqchil landshaftlarda yer degradatsiyasi muammosini hal qilish uchun takrorlanadigan model bo‘lib xizmat qilmoqda:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Card 1: Armenia */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                    May 2024
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
                    <span>🇦🇲</span> Armanistonning barqaror landshaftlar loyihasi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    O‘rmonlar, suv-botqoq yerlar va kon maydonlarini qayta tiklash, ekoturizmni rivojlantirish va institutsional salohiyatni oshirish.
                  </p>
                </div>
              </div>

              {/* Card 2: Sahel / Africa */}
              <div className="p-7 rounded-2xl border border-slate-200 border-l-4 border-l-sky-500 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full w-fit">
                    Texnik ko‘mak
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-sky-600" /> Shimoliy Afrika — Sahel dasturi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Sahel mamlakatlarida siyosiy qo‘llab-quvvatlash va investitsiyalar orqali integratsiyalashgan landshaft yondashuvlari uchun qabul qilingan RESILAND modeli.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
