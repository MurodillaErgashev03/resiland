import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetrica } from "./yandex-metrica";

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <YandexMetrica />
    </>
  );
}
