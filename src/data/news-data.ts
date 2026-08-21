import { StaticImageData } from "next/image";
import newsImg1 from "@/assets/img/image.png";
import newsImg2 from "@/assets/img/qirgiz.webp";
import newsImg3 from "@/assets/img/forestry.jpg";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  publishedDate: string;
  dateIso: string;
  country: string;
  countrySlug: string;
  topic: string;
  topicSlug: string;
  excerpt: string;
  image: StaticImageData;
  content: string[];
  quote?: {
    text: string;
    author: string;
  };
  delegation?: string[];
}

export const newsArticles: NewsItem[] = [
  {
    id: "1",
    slug: "markaziy-osiyo-landshaftlarni-tiklash-transchegaraviy-hamkorlik",
    title:
      "Markaziy Osiyo landshaftlarni tiklash va mintaqaviy iqlim barqarorligini oshirish uchun transchegaraviy hamkorlikni mustahkamlaydi",
    publishedDate: "Aprel 28, 2026",
    dateIso: "28/04/2026",
    country: "Regional",
    countrySlug: "regional",
    topic: "Policy & Governance",
    topicSlug: "policy-governance",
    image: newsImg1,
    excerpt:
      "Ostona, 2026-yil 24-aprel — Markaziy Osiyo hukumatlari, xalqaro tashkilotlar va ilmiy hamjamiyat vakillari bugun Jahon bankining RESILAND CA+ dasturi doirasida Mintaqaviy maslahat qo'mitasining beshinchi yig'ilishida ishtirok etdilar.",
    content: [
      "Ostona, 2026-yil 24-aprel — Markaziy Osiyo hukumatlari, xalqaro tashkilotlar va ilmiy hamjamiyat vakillari bugun Jahon banki va CAREC hamkorligida o'tkazilgan transchegaraviy landshaftlarni tiklash bo'yicha mintaqaviy sammitda qatnashdilar.",
      "Ushbu sammit Markaziy Osiyodagi umumiy ekotizimlarni himoya qilish, cho'llanishga qarshi kurashish va chegara hududlarida sel hamda toshqin xavfini kamaytirish bo'yicha amaliy qadamlarni muhokama qilish uchun muhim platforma vazifasini o'tadi.",
      "Muloqot doirasida 5 ta davlat vakillari tomonidan mintaqaviy ekologik axborot almashinuvi, qo'shma monitoring tizimlari va 2026–2030 yillarga mo'ljallangan strategik yo'l xaritasi ma'qullandi.",
    ],
  },
  {
    id: "2",
    slug: "kg-resiland-qirgiziston-respublikasi-landshaftlarni-tiklash",
    title:
      "KG RESILAND: Qirg'iziston Respublikasi landshaftlarni tiklash bo'yicha mintaqaviy hamkorlikni mustahkamlamoqda",
    publishedDate: "Aprel 28, 2026",
    dateIso: "28/04/2026",
    country: "Kyrgyz Republic",
    countrySlug: "kyrgyz-republic",
    topic: "Policy & Governance",
    topicSlug: "policy-governance",
    image: newsImg2,
    excerpt:
      "Ostona, 2026-yil 24-aprel — Qirg'iziston Respublikasi delegatsiyasi RESILAND CA+ dasturining Mintaqaviy maslahat qo'mitasining (MMQ) beshinchi yig'ilishida, shuningdek transchegaraviy landshaftlarni tiklash bo'yicha tematik sessiyada ishtirok etdi.",
    delegation: [
      "Qirg'iziston Respublikasi Favqulodda vaziyatlar vazirining birinchi o'rinbosari Akilbek Mazaripov;",
      "Favqulodda vaziyatlar vazirligi huzuridagi Favqulodda vaziyatlarni monitoring va prognoz qilish departamenti direktori Damirbek Sakiyev;",
      "O'rmon xo'jaligi xizmatining O'rmon ekotizimlarini rivojlantirish va strategik rejalashtirish bo'limi boshlig'i Talant Abdiqodirov.",
    ],
    quote: {
      text: "Qirg'iziston xavfli tabiiy jarayonlarga moyil bo'lgan tog'li mamlakatdir. Bugungi kunda biz keng ko'lamli xavf-xatarlarga duch kelmoqdamiz: 4500 dan ortiq faol ko'chkilar, 2000 dan ortiq sel xavfi bo'lgan hududlar va yuzlab yorilish xavfi ostidagi baland tog' ko'llari mavjud. Ushbu xavf-xatarlar aholi, infratuzilma va hududlarning barqaror rivojlanishiga tahdid solmoqda. Shu nuqtayi nazardan, landshaftlarni tiklash va ofatlar xavfini kamaytirishga tizimli yondashuv alohida ahamiyatga ega. Biz RESILAND CA+ mintaqaviy dasturini yuksak qadrlaymiz va uning doirasidagi hamkorlikni sa'y-harakatlarni birlashtirish hamda Markaziy Osiyo darajasida muvofiqlashtirilgan yechimlarni ishlab chiqishning asosiy mexanizmi deb bilamiz.",
      author: "Akilbek Mazaripov — Qirg'iziston Respublikasi Favqulodda vaziyatlar vazirining birinchi o'rinbosari",
    },
    content: [
      "Ostona, 2026-yil 24-aprel — Qirg'iziston Respublikasi delegatsiyasi RESILAND CA+ dasturining Mintaqaviy maslahat qo'mitasining (MMQ) beshinchi yig'ilishida, shuningdek, Mintaqaviy ekologik sammit va Markaziy Osiyo iqlim o'zgarishi konferensiyasi (CACCC 2026) doirasida o'tkazilgan transchegaraviy landshaftlarni tiklash bo'yicha tematik sessiyada ishtirok etdi.",
      "MMQ yig'ilishi landshaftlarni tiklash, ofatlar xavfini kamaytirish va mintaqaviy hamkorlikni mustahkamlash bo'yicha amaliy qadamlarni muhokama qilish uchun Markaziy Osiyo mamlakatlari va xalqaro hamkorlarni birlashtirdi. Asosiy mavzular milliy loyihalarni muvofiqlashtirish, ma'lumotlar va ilg'or tajribalar almashish, shuningdek, raqamli monitoring vositalari va erta ogohlantirish tizimlarini ishlab chiqishni o'z ichiga oldi.",
      "Mintaqaviy muloqot transchegaraviy landshaftlarni tiklash bo'yicha tematik sessiya bilan davom etdi, unda Markaziy Osiyo mamlakatlari va xalqaro hamkorlarning qo'shma chora-tadbirlari muhokama qilindi.",
    ],
  },
  {
    id: "3",
    slug: "resiland-qirgiziston-baland-togli-ekspeditsiyalar-xavfsizligi",
    title:
      "RESILAND Qirg'iziston Respublikasi: Baland tog'li dala ekspeditsiyalarining xavfsizligini ta'minlash",
    publishedDate: "Aprel 28, 2026",
    dateIso: "28/04/2026",
    country: "Kyrgyz Republic",
    countrySlug: "kyrgyz-republic",
    topic: "Capacity Building & Knowledge Sharing",
    topicSlug: "capacity-building",
    image: newsImg3,
    excerpt:
      "Qirg'iziston Respublikasi Barqaror Landshaftlarni Tiklash Loyihasi (RESILAND Qirg'iziston) va RESILAND CA+ Dasturi doirasida baland tog'li hududlarda xavfsizlikni kuchaytirish choralari ko'rilmoqda.",
    content: [
      "Qirg'iziston Respublikasi Barqaror Landshaftlarni Tiklash Loyihasi (RESILAND Qirg'iziston) va RESILAND CA+ Dasturi doirasida baland tog'li ekspeditsiyalar xavfsizligini ta'minlash bo'yicha yangi uskunalar va texnik vositalar yetkazib berildi.",
      "Loyiha doirasida mutaxassislar va qutqaruvchilarga murakkab tog'li sharoitlarda monitoring ishlarini xavfsiz olib borish uchun zamonaviy alpinizm anjomlari, sun'iy yo'ldosh aloqasi vositalari hamda dala jihozlari taqdim etildi.",
      "Ushbu chora-tadbirlar baland tog'li ko'llar va ko'chkilar xavfi yuqori bo'lgan zonalarda ilmiy tadqiqotlarni samarali hamda xavfsiz o'tkazish imkonini yaratadi.",
    ],
  },
];
