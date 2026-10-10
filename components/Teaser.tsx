import type { Dictionary } from "@/content/types";
import { BMark } from "./BMark";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { LegalLinks } from "./LegalLinks";

type TeaserProps = {
  t: Dictionary["teaser"];
  legal: Dictionary["legal"];
  // z. B. { label: "08.11.", dateTime: "2026-11-08" } aus campaign.launchAt
  date: { label: string; dateTime: string };
  instagramUrl: string;
};

// Der Teaser vor dem Launch: ein Bildschirm, alles mittig.
// Orange gibt es genau zweimal, das B und das Datum. Der Button ist deshalb creme.
export function Teaser({ t, legal, date, instagramUrl }: TeaserProps) {
  return (
    <div className="flex min-h-svh flex-col surface-navy">
      <main id="inhalt" className="flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <BMark
            title="builder.community"
            className="w-28 animate-stamp text-orange"
          />
          <h1 className="mt-8 text-display font-extrabold">{t.title}</h1>
          <p className="mt-4 max-w-[26ch] text-lead text-balance text-cream/85">
            {t.subline}
          </p>
          {/* Ein Satz für Screenreader: „Am 08.11. verraten wir’s.“ */}
          <p className="mt-6 flex flex-col items-center">
            <span className="sr-only">{t.datePrefix} </span>
            <time
              dateTime={date.dateTime}
              className="font-display text-teaser-date font-extrabold text-orange"
            >
              {date.label}
            </time>{" "}
            <span className="mt-2 text-lead font-semibold">{t.reveal}</span>
          </p>
          <ButtonLink
            href={instagramUrl}
            tone="cream"
            className="mt-6 w-full max-w-sm"
          >
            {t.follow}
          </ButtonLink>
        </Container>
      </main>
      <footer className="pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <LegalLinks legal={legal} />
      </footer>
    </div>
  );
}
