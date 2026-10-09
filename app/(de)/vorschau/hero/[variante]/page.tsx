import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Hero, type HeroVariant } from "@/components/Hero";
import { campaign } from "@/content/campaign";
import { de } from "@/content/de";
import { links } from "@/content/links";
import { formatMeetupDay, formatTimeRange } from "@/lib/format";
import { isPreviewEnabled } from "@/lib/preview";

// Etappe 2: Hero-Varianten zum Vergleichen. Nur lokal und in Vercel-Previews.
// Nach Johannes' Entscheidung wird diese Seite wieder entfernt.

const variants: Record<
  string,
  { layout: HeroVariant; font: "bricolage" | "schibsted" }
> = {
  "a-bricolage": { layout: "a", font: "bricolage" },
  "a-schibsted": { layout: "a", font: "schibsted" },
  "b-bricolage": { layout: "b", font: "bricolage" },
  "b-schibsted": { layout: "b", font: "schibsted" },
};

export function generateStaticParams() {
  return Object.keys(variants).map((variante) => ({ variante }));
}

export const metadata: Metadata = {
  title: "Vorschau: Hero",
  robots: { index: false, follow: false },
};

export default async function HeroPreviewPage({
  params,
}: PageProps<"/vorschau/hero/[variante]">) {
  if (!isPreviewEnabled()) notFound();

  const { variante } = await params;
  const variant = Object.hasOwn(variants, variante) ? variants[variante] : null;
  if (!variant) notFound();

  return (
    <div data-display-font={variant.font}>
      <Header
        locale="de"
        languageNav={de.header.languageNav}
        // Neben dem großen B im Hero wird das kleine B creme (max. zwei orange Momente).
        // In A gibt es nur das kleine B, deshalb bekommt es den Stempel-Effekt.
        markClassName={variant.layout === "b" ? "text-cream" : "text-orange"}
        stamp={variant.layout === "a"}
      />
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
          variant={variant.layout}
        />
        <div className="surface-cream py-24">
          <Container>
            <p>Hier geht es mit „Worum es geht“ weiter (Etappe 3).</p>
          </Container>
        </div>
      </main>
    </div>
  );
}
