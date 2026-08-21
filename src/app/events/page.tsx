import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { EventsClient } from "@/components/events/events-client";

export const metadata: Metadata = {
  title: "Tadbirlar va Forumlar | RESILAND CA+",
  description:
    "RESILAND CA+ va Markaziy Osiyo bo'ylab hamkor tashkilotlarning bo'lajak konferensiyalari, seminarlari, vebinarlari va o'quv tadbirlari.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <EventsClient />
      <Footer />
    </div>
  );
}
