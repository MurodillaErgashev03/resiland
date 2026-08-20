# RESILAND CA+ Online Database — Frontend TZ (Next.js stack)

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · next-intl · next-auth (Auth0) · lucide-react · next-themes

> Bu modul to'plami asl ToR (Appendix 1, v5) va Texnik taklif hujjatlaridagi frontend talablarini **Next.js arxitekturasiga** moslab qayta ishlab chiqilgan. Asl ToR WordPress + plaginlar (Astra, Barn2 Document Library Pro, ACF Pro, WPML) tamoyilini nazarda tutgan (10-bo'lim, 14-bo'lim); Next.js tanlovi — loyiha egasining alohida qarori bo'lib, byudjet/muddat/jamoa moslashuvini alohida baholashni talab qiladi.

## Modullar ro'yxati

| № | Fayl | Mavzu | ToR bandi |
|---|---|---|---|
| 00 | `00-overview-arxitektura.md` | Umumiy stack, papka tuzilishi, sozlash | 4, 10, 13.1 |
| 01 | `01-dizayn-tizimi.md` | Tailwind + shadcn + token'lar + light/dark + real ikonkalar | 7.1 |
| 02 | `02-bosh-sahifa.md` | Landing page — qidiruv, statistika, so'nggi materiallar, nav | 6.8 |
| 03 | `03-royxat-qidiruv.md` | Ro'yxat/qidiruv, fasetli filtrlar, preview, pagination | 6.3, 6.7 |
| 04 | `04-material-detali-metadata.md` | Detal sahifa, metama'lumot maydonlari, SEO | 6.4 |
| 05 | `05-contributor-forma.md` | Material joylash formasi, route-level guard | 6.5 |
| 06 | `06-kop-tillilik.md` | next-intl, uz/ru/en + kengaytirish | 7.3, 8-bo'lim |
| 07 | `07-autentifikatsiya-rollar.md` | next-auth + Auth0, rollar modeli | 6.5 (4.4-taklif) |
| 08 | `08-veb-qulaylik-wcag.md` | WCAG 2.1 AA — kontrast, klaviatura, alt-matn | 8-bo'lim |
| 09 | `09-veb-analitika.md` | GA4 + Yandex Metrica, custom event'lar | 6.9 (v5) |
| 10 | `10-responsive-unumdorlik.md` | Responsive dizayn, ISR, Core Web Vitals | 8-bo'lim |

## O'qish tartibi

Yangi jamoa a'zosi uchun tavsiya etilgan tartib: **00 → 01 → 06 → 07 → 02 → 03 → 04 → 05 → 08 → 09 → 10**
(avval arxitektura, dizayn tizimi va auth/i18n poydevori, keyin sahifalar, so'ngra sifat/nazorat qatlamlari).

## Har bir modulning tarkibi

Har bir `.md` fayl bir xil andozada:
1. ToR/Texnik taklif manba havolasi
2. Talab tavsifi
3. To'liq TypeScript/TSX kod skeleti (nusxa olib boshlash mumkin)
4. Qabul qilish mezonlari (checklist) — QA va Gate tekshiruvlari uchun
