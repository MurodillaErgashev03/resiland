/**
 * Analytics and Event Tracking Module (GA4 + Yandex Metrica)
 * Meets ToR v5 section 6.9 requirements.
 */

export type AnalyticsEvent =
  | { name: "search"; params: { query: string; resultsCount?: number } }
  | { name: "filter_apply"; params: { facet: string; value: string } }
  | { name: "material_view"; params: { materialId: string; title: string; contentType?: string } }
  | { name: "material_download"; params: { materialId: string; title?: string; fileType?: string } }
  | { name: "contributor_submit"; params: { contentType: string; status?: string } }
  | { name: "language_switch"; params: { from?: string; to: string } }
  | { name: "theme_toggle"; params: { mode: "light" | "dark" } };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event: ${event.name}]`, event.params);
  }

  try {
    // 1. Google Analytics 4 (gtag)
    if ("gtag" in window && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", event.name, event.params);
    }

    // 2. Yandex Metrica (ym)
    const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
    if (yandexId && "ym" in window && typeof (window as any).ym === "function") {
      (window as any).ym(yandexId, "reachGoal", event.name, event.params);
    }
  } catch (err) {
    console.error("Failed to dispatch analytics event:", err);
  }
}
