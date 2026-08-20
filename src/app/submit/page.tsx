import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContributorForm } from "@/components/forms/contributor-form";
import { PlusCircle, ShieldCheck, Home, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-8 max-w-4xl outline-none">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Bosh sahifa</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Material yuklash</span>
        </nav>

        {/* Page Header Banner */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-6 md:p-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Contributor Interfeysi</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Moderatsiya & Rol Nazorati</span>
            </div>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Yangi Ilmiy / Texnik Material Joylashtirish
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Markaziy Osiyo barqaror landshaftlari dasturi bazasiga o&apos;z tadqiqotingiz, geofazoviy ma&apos;lumotlar to&apos;plamingiz yoki hisobotingizni qo&apos;shing.
          </p>
        </div>

        {/* The Form */}
        <ContributorForm />
      </main>

      <Footer />
    </div>
  );
}
