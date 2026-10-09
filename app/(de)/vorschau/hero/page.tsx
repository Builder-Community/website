import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { campaign } from "@/content/campaign";
import { de } from "@/content/de";
import { links } from "@/content/links";
import { formatMeetupDay, formatTimeRange } from "@/lib/format";
import { isPreviewEnabled } from "@/lib/preview";

// Vorschau des Hero, bis die echte Startseite mit ihren Zuständen steht.
// Nur lokal und in Vercel-Previews; in Produktion 404.
// Wird in Etappe 4 durch /vorschau/[zustand] ersetzt.

export const metadata: Metadata = {
  title: "Vorschau: Hero",
  robots: { index: false, follow: false },
};

export default function HeroPreviewPage() {
  if (!isPreviewEnabled()) notFound();

  return (
    <>
      <Header locale="de" languageNav={de.header.languageNav} stamp />
      <main id="inhalt">
        <Hero
          t={de.hero}
          time={formatTimeRange(campaign.weekly, "de")}
          meetup={{
            label: de.hero.firstMeetup,
            day: formatMeetupDay(campaign.firstMeetup, "de"),
          }}
          whatsappUrl={links.whatsapp}
          instagramUrl={links.instagram}
        />
        <div className="surface-cream py-24">
          <Container>
            <p>Hier geht es mit „Worum es geht“ weiter (Etappe 3).</p>
          </Container>
        </div>
      </main>
    </>
  );
}
