export interface LocaleOption {
  code: "uz" | "ru" | "en" | "kk" | "ky" | "tg" | "tk";
  name: string;
  nativeName: string;
  flag: string;
  badge: string;
  country: string;
}

export const LOCALES: LocaleOption[] = [
  {
    code: "en",
    badge: "EN",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    country: "International",
  },
  {
    code: "ru",
    badge: "RU",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    country: "Regional",
  },
  {
    code: "kk",
    badge: "KZ",
    name: "Kazakh",
    nativeName: "Қазақша",
    flag: "🇰🇿",
    country: "Kazakhstan",
  },
  {
    code: "ky",
    badge: "KG",
    name: "Kyrgyz",
    nativeName: "Кыргызча",
    flag: "🇰🇬",
    country: "Kyrgyzstan",
  },
  {
    code: "tg",
    badge: "TJ",
    name: "Tajik",
    nativeName: "Тоҷикӣ",
    flag: "🇹🇯",
    country: "Tajikistan",
  },
  {
    code: "tk",
    badge: "TM",
    name: "Turkmen",
    nativeName: "Türkmençe",
    flag: "🇹🇲",
    country: "Turkmenistan",
  },
  {
    code: "uz",
    badge: "UZ",
    name: "Uzbek",
    nativeName: "O'zbekcha",
    flag: "🇺🇿",
    country: "Uzbekistan",
  },
];

export const DEFAULT_LOCALE = "uz";
export const SUPPORTED_LOCALES = LOCALES.map((l) => l.code);
