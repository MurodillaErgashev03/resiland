import type { Metadata } from "next";
import { Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import { AuthProvider } from "@/context/auth-context";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import "@/styles/globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RESILAND CA+ Online Database",
  description:
    "Central Asia Resilient Landscapes Program Knowledge & Document Repository",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
      className={`${nunitoSans.variable} ${plusJakartaSans.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground transition-colors duration-200">
        <AuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              {/* WCAG 2.4.1 Skip-to-content accessible link */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2.5 focus:rounded-xl focus:shadow-xl focus:font-bold focus:text-xs focus:ring-2 focus:ring-ring transition-all"
              >
                Asosiy kontentga o&apos;tish (Skip to main content)
              </a>
              <div id="app-root">
                {children}
              </div>
              {/* Analytics: GA4 & Yandex Metrica */}
              <AnalyticsProvider />
            </ThemeProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
