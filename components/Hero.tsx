import type { Dictionary } from "@/content/types";
import { ArrowLink } from "./ArrowLink";
import { BMark } from "./BMark";
import { ButtonLink } from "./ButtonLink";

export type HeroVariant = "a" | "b";

type HeroProps = {
  t: Dictionary["hero"];
  // Wochenzeit, z. B. „9–12 Uhr“ (aus campaign.ts formatiert)
  time: string;
  // z. B. { label: "Erstes Treffen", day: "Sa, 28. November" }
  meetup: { label: string; day: string };
  whatsappUrl: string;
  instagramUrl: string;
  // A: rein typografisch, Inhalt unten. B: großes, angeschnittenes B unten rechts.
  variant: HeroVariant;
};

export function Hero({
  t,
  time,
  meetup,
  whatsappUrl,
  instagramUrl,
  variant,
}: HeroProps) {
  return (
    // Volle Bildschirmhöhe (svh: ohne Springen, wenn die Browserleiste ein- und ausfährt).
    // Oben Platz für den Header, der darüber liegt.
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden surface-navy pt-[calc(4rem+env(safe-area-inset-top))]"
    >
      <div
        className={`flex flex-col page-gutter ${variant === "a" ? "flex-1 justify-end" : ""}`}
      >
        <div className="mx-auto w-full max-w-page pt-6 pb-8">
          <p className="text-kicker font-semibold text-cream/70 uppercase">
            {t.kicker}
          </p>
          <h1 id="hero-title" className="mt-3 text-display font-extrabold">
            {t.title}
          </h1>
          <p className="mt-5 max-w-text text-lead text-cream/85">{t.lead}</p>

          {/* Wann und wo: zwei Spalten, getrennt durch feine Linien */}
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
        </div>
      </div>

      {variant === "b" && (
        // Eigener Bereich unter dem Text: Das B wird hier angeschnitten
        // und kann so nie hinter Text liegen.
        <div aria-hidden="true" className="relative min-h-56 flex-1">
          <BMark className="absolute -right-16 -bottom-14 w-72 animate-stamp text-orange" />
        </div>
      )}
    </section>
  );
}
