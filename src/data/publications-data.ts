export interface PublicationItem {
  id: string;
  title: string;
  type: string;
  typeSlug: string;
  country: string;
  countrySlug: string;
  year: string;
  date: string;
  fileSize: string;
  fileFormat: string;
  description: string;
  downloadUrl: string;
}

export const publicationsData: PublicationItem[] = [
  {
    id: "1",
    title: "RESILAND CA+ Axborotnomasi. 3-son. 2025-yil dekabr",
    type: "Axborotnoma",
    typeSlug: "newsletter",
    country: "Regional",
    countrySlug: "regional",
    year: "2025",
    date: "Dekabr 2025",
    fileSize: "3.8 MB",
    fileFormat: "PDF",
    description:
      "Markaziy Osiyoda landshaftlarni tiklash, transchegaraviy chora-tadbirlar va RESILAND CA+ dasturining 2025-yilgi yutuqlari sarhisobi.",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "RESILAND CA + Axborotnomasi. 2-son. 2025-yil oktyabr – noyabr",
    type: "Axborotnoma",
    typeSlug: "newsletter",
    country: "Regional",
    countrySlug: "regional",
    year: "2025",
    date: "Noyabr 2025",
    fileSize: "4.2 MB",
    fileFormat: "PDF",
    description:
      "Mintaqaviy maslahat qo'mitasi yig'ilishlari, Qirg'iziston, Tojikiston va O'zbekiston loyihalari faoliyati va tadbirlar sharhi.",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Tabiatga asoslangan yechimlar (NBS) amaliy qo'llanmasi",
    type: "Yo'riqnoma",
    typeSlug: "manual",
    country: "Kyrgyz Republic",
    countrySlug: "kyrgyz-republic",
    year: "2026",
    date: "Aprel 2026",
    fileSize: "8.5 MB",
    fileFormat: "PDF",
    description:
      "Tog'li hududlarda sel, ko'chki va toshqinlarga qarshi biologik hamda muhandislik yondashuvlari bo'yicha texnik ko'rsatmalar.",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Markaziy Osiyo transchegaraviy landshaftlarini tiklash strategik yo'l xaritasi",
    type: "Siyosiy sharh",
    typeSlug: "policy-brief",
    country: "Regional",
    countrySlug: "regional",
    year: "2026",
    date: "Fevral 2026",
    fileSize: "5.1 MB",
    fileFormat: "PDF",
    description:
      "Markaziy Osiyoning 5 ta davlati o'rtasida muvofiqlashtirilgan ekologik harakatlar, investitsiya rejalari va monitoring tizimi.",
    downloadUrl: "#",
  },
  {
    id: "5",
    title: "Orol dengizi havzasida sho'rlangan yerlarni tiklash va fitomelioratsiya hisoboti",
    type: "Hisobot",
    typeSlug: "report",
    country: "Uzbekistan",
    countrySlug: "uzbekistan",
    year: "2025",
    date: "Sentabr 2025",
    fileSize: "6.4 MB",
    fileFormat: "PDF",
    description:
      "Orolbo'yi va cho'l-yaylov hududlarida tuproq unumdorligini tiklash, saksovulzorlar barpo etish va agrao'rmonchilik monitoringi.",
    downloadUrl: "#",
  },
  {
    id: "6",
    title: "Tojikiston muhofaza etiladigan hududlarini boshqarish va ekoturizm hisoboti",
    type: "Hisobot",
    typeSlug: "report",
    country: "Tajikistan",
    countrySlug: "tajikistan",
    year: "2024",
    date: "Noyabr 2024",
    fileSize: "4.9 MB",
    fileFormat: "PDF",
    description:
      "Pomir tog' ekotizimlarida qo'riqxonalarni saqlash, mahalliy aholi bandligini oshirish va barqaror tabiat turizmi mexanizmlari.",
    downloadUrl: "#",
  },
];
