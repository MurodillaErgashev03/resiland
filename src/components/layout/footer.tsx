import Link from "next/link";
import { Layers, ExternalLink, Globe2, ShieldCheck, Mail, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">RESILAND CA+</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Markaziy Osiyo hududida degradatsiyaga uchragan yerlarni qayta tiklash, o&apos;rmonlashtirish va barqaror landshaftlarni boshqarish bo&apos;yicha yagona ochiq ma&apos;lumotlar bazasi.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Jahon Banki & Markaziy Osiyo Davlatlari Hamkorligi</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Resurslar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/materials" className="hover:text-primary transition-colors">
                  Barcha materiallar
                </Link>
              </li>
              <li>
                <Link href="/materials?contentType=dataset" className="hover:text-primary transition-colors">
                  Geofazoviy datasetlar
                </Link>
              </li>
              <li>
                <Link href="/materials?contentType=publication" className="hover:text-primary transition-colors">
                  Ilmiy nashrlar
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-primary transition-colors">
                  Material taklif qilish
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Regional */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Hamkorlik & Aloqa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://resilandca.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>resilandca.net portali</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.worldbank.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>Jahon Banki (World Bank)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-center gap-1.5 pt-2 text-xs">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span>info@resilandca.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} RESILAND CA+ Online Database. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>WCAG 2.1 AA</span>
            <span>•</span>
            <span>Central Asia Resilient Landscapes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
