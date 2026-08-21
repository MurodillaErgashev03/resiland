export interface EventItem {
  id: string;
  title: string;
  type: string;
  typeSlug: string;
  country: string;
  countrySlug: string;
  location: string;
  venue: string;
  day: string;
  month: string;
  year: string;
  dateFull: string;
  time: string;
  status: "Bo'lajak" | "O'tkazilgan";
  statusSlug: "upcoming" | "past";
  description: string;
  organizer: string;
  isFeatured?: boolean;
}

export const eventsData: EventItem[] = [
  {
    id: "1",
    title:
      "Mintaqaviy Ekologik Sammit va Markaziy Osiyo Iqlim O'zgarishi Konferensiyasi (CACCC 2026)",
    type: "Konferensiya",
    typeSlug: "conference",
    country: "Regional",
    countrySlug: "regional",
    location: "Ostona, Qozog'iston",
    venue: "Xalqaro Ko'rgazmalar Markazi / Gibrid",
    day: "24",
    month: "APR",
    year: "2026",
    dateFull: "24-25 Aprel, 2026",
    time: "09:30 - 18:00 (GMT+5)",
    status: "O'tkazilgan",
    statusSlug: "past",
    description:
      "Markaziy Osiyo hukumatlari, Jahon banki, CAREC va xalqaro moliya institutlari vakillari ishtirokida transchegaraviy landshaftlarni tiklash va iqlim xatarlarini kamaytirish bo'yicha yuqori darajadagi xalqaro forum.",
    organizer: "Jahon Banki & CAREC Kotibiyati",
    isFeatured: true,
  },
  {
    id: "2",
    title:
      "Tabiatga asoslangan yechimlar (NBS) bo'yicha mintaqaviy texnik seminar",
    type: "Seminar",
    typeSlug: "seminar",
    country: "Kyrgyz Republic",
    countrySlug: "kyrgyz-republic",
    location: "Bishkek, Qirg'iziston",
    venue: "Hyatt Regency Konferens zal",
    day: "15",
    month: "MAY",
    year: "2026",
    dateFull: "15-16 May, 2026",
    time: "10:00 - 16:30 (GMT+6)",
    status: "Bo'lajak",
    statusSlug: "upcoming",
    description:
      "Tog'li hududlarda sel, ko'chki va toshqinlarga qarshi tabiatga asoslangan muhandislik yechimlarini joriy qilish, amaliy NBS qo'llanmasini taqdimot qilish va tajriba almashish seminari.",
    organizer: "RESILAND Qirg'iziston & Favqulodda Vaziyatlar Vazirligi",
    isFeatured: true,
  },
  {
    id: "3",
    title:
      "Transchegaraviy landshaftlarni tiklash va muhofaza zonalarini boshqarish bo'yicha onlayn vebinar",
    type: "Vebinar",
    typeSlug: "webinar",
    country: "Regional",
    countrySlug: "regional",
    location: "Onlayn (Zoom)",
    venue: "RESILAND Mintaqaviy Almashinuv Platformasi",
    day: "10",
    month: "IYUN",
    year: "2026",
    dateFull: "10 Iyun, 2026",
    time: "14:00 - 16:30 (GMT+5)",
    status: "Bo'lajak",
    statusSlug: "upcoming",
    description:
      "Markaziy Osiyodagi umumiy chegara ekotizimlarini asrash, qo'riqxonalar tarmog'ini integratsiya qilish va xalqaro tajribalarni tahlil qilishga bag'ishlangan ekspertlar vebinari.",
    organizer: "Mintaqaviy Almashinuv Platformasi (REP)",
  },
  {
    id: "4",
    title:
      "Orolbo'yi ekotizimlarini tiklash va agrao'rmonchilik dala treningi",
    type: "Dala treningi",
    typeSlug: "field-training",
    country: "Uzbekistan",
    countrySlug: "uzbekistan",
    location: "Nukus & Mo'ynoq, O'zbekiston",
    venue: "Orolbo'yi Xalqaro Innovatsiya Markazi",
    day: "22",
    month: "IYUN",
    year: "2026",
    dateFull: "22-24 Iyun, 2026",
    time: "09:00 - 17:00 (GMT+5)",
    status: "Bo'lajak",
    statusSlug: "upcoming",
    description:
      "Qurg'oqchilik va sho'rlangan tuproqlar sharoitida degradatsiyaga uchragan yaylovlarni qayta tiklash, tomchilatib sug'orish va o'rmonlashtirish bo'yicha 3 kunlik amaliy dala mahorati darsi.",
    organizer: "RESILAND O'zbekiston & O'rmon Xo'jaligi Agentligi",
  },
  {
    id: "5",
    title:
      "Pomir tog' landshaftlari va ekoturizm bo'yicha xalqaro davra suhbati",
    type: "Davra suhbati",
    typeSlug: "roundtable",
    country: "Tajikistan",
    countrySlug: "tajikistan",
    location: "Dushanbe, Tojikiston",
    venue: "Milliy Kutubxona Konferens Markazi",
    day: "05",
    month: "IYUL",
    year: "2026",
    dateFull: "05-06 Iyul, 2026",
    time: "10:00 - 15:30 (GMT+5)",
    status: "Bo'lajak",
    statusSlug: "upcoming",
    description:
      "Tojikistonning baland tog' hududlarida bioxilma-xillikni saqlash, mahalliy aholi bandligini oshirish va barqaror mintaqaviy tabiat turizmini rivojlantirish istiqbollari.",
    organizer: "RESILAND Tojikiston & Atrof-muhitni Muhofaza Qilish Qo'mitasi (CEP)",
  },
];
