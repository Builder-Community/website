import type { Dictionary } from "@/content/types";
import { ArrowLink } from "./ArrowLink";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";

type HeroProps = {
  t: Dictionary["hero"];
  // Wochenzeit, z. B. „9–12 Uhr“ (aus campaign.ts formatiert)
  time: string;
  // z. B. { label: "Erstes Treffen", day: "Sa, 28. November" }
  meetup: { label: string; day: string };
  whatsappUrl: string;
  instagramUrl: string;
};

// Der erste Bildschirm: was, wann, wo und der Button zum Mitmachen.
// Nach „Don't make me think“ (Steve Krug): Das Wichtigste steht oben, wo der Blick
// beginnt. Der Hero ist so hoch wie sein Inhalt, nicht bildschirmfüllend. Auf
// großen Handys schaut so die nächste Sektion herein, und niemand hält die Seite
// für zu Ende („falscher Boden“).
export function Hero({
  t,
  time,
  meetup,
  whatsappUrl,
  instagramUrl,
}: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="surface-navy">
      <Container className="pt-6 pb-12">
        <p className="text-kicker font-semibold text-cream uppercase">
          {t.kicker}
        </p>
        <h1 id="hero-title" className="mt-3 text-display font-extrabold">
          {t.title}
        </h1>
        <p className="mt-5 max-w-text text-lead text-cream/85">{t.lead}</p>

        {/* Wann und wo: zwei Spalten mit Beschriftung, getrennt durch feine Linien */}
        <dl className="mt-7 grid grid-cols-2 border-y border-cream/15">
          <div className="py-3.5 pr-4">
            <dt className="text-kicker font-semibold text-cream/55 uppercase">
              {t.whenLabel}
            </dt>
            <dd className="mt-1.5 font-semibold">
              {t.weekly}
              <br />
              {time}
            </dd>
          </div>
          <div className="border-l border-cream/15 py-3.5 pl-4">
            <dt className="text-kicker font-semibold text-cream/55 uppercase">
              {t.whereLabel}
            </dt>
            <dd className="mt-1.5 font-semibold">{t.place}</dd>
          </div>
          <div className="col-span-2 flex flex-wrap items-baseline justify-between gap-x-4 border-t border-cream/15 py-3">
            <dt className="text-kicker font-semibold text-cream/55 uppercase">
              {meetup.label}
            </dt>
            <dd className="font-semibold">{meetup.day}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col items-start gap-1">
          <ButtonLink href={whatsappUrl} className="w-full">
            {t.cta}
          </ButtonLink>
          <ArrowLink href={instagramUrl}>{t.instagram}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
