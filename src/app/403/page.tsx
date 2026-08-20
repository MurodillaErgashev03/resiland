import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, Home, Mail } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-red-200 dark:border-red-900/40 bg-card shadow-xs">
          <div className="h-16 w-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Ruxsat cheklangan (403 Forbidden)</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sizning hisobingizda ushbu sahifaga kirish yoki yangi materiallarni joylashtirish (Contributor) huquqi mavjud emas.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-muted/60 text-xs text-muted-foreground text-left space-y-1">
            <p className="font-semibold text-foreground">Huquq olish uchun:</p>
            <p>RESILAND dasturi ma&apos;murlari bilan bog&apos;laning: <span className="font-mono text-primary">admin@resilandca.net</span></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>Bosh sahifaga qaytish</span>
              </Link>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/materials">
                <ArrowLeft className="h-4 w-4" />
                <span>Katalogga o&apos;tish</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
