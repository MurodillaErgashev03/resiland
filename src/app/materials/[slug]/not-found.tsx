import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Search } from "lucide-react";

export default function MaterialNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-5 p-8 rounded-2xl border border-border bg-card shadow-xs">
          <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <FileQuestion className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Material topilmadi (404)</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Siz qidirayotgan material o&apos;chirilgan, nomi o&apos;zgartirilgan yoki havola noto&apos;g&apos;ri kiritilgan bo&apos;lishi mumkin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/materials">
                <ArrowLeft className="h-4 w-4" />
                <span>Katalogga qaytish</span>
              </Link>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <Link href="/materials">
                <Search className="h-4 w-4" />
                <span>Baza bo&apos;yicha qidirish</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
