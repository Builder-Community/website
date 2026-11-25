import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  // orange: Haupt-Button. cream: wenn auf dem Bildschirm schon zwei orange
  // Momente sind (z. B. im Teaser: großes B und Datum).
  tone?: "orange" | "cream";
  className?: string;
};

const tones = {
  orange: "bg-orange hover:bg-cream",
  cream: "bg-cream hover:bg-sky",
};

// Button als Link: Navy-Schrift, fett und 19px groß. Auf Orange gilt der
// Kontrast von 4,3:1 erst so als ausreichend (große Schrift); auf Creme sind es 12,7:1.
// Leicht engere Laufweite und knapper Innenabstand: So passt
// „WhatsApp-Community beitreten“ auch bei 360px Bildschirmbreite in eine Zeile
// (gemessen mit DM Sans: 305 px Text, 312 px Platz). Der Button ist immer so
// breit wie die Seite, der Text steht mittig: Den kleinen Seitenabstand sieht man nicht.
// Hover: Farbwechsel. Beim Antippen wird er kurz minimal kleiner.
export function ButtonLink({
  href,
  children,
  tone = "orange",
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-14 items-center justify-center rounded-brand px-1 py-3 text-center text-button font-bold tracking-[-0.01em] text-navy transition duration-150 ease-out active:scale-[0.98] ${tones[tone]} ${className}`}
    >
      {children}
    </a>
  );
}
