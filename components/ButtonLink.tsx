import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

// Haupt-Button: orange Fläche, Navy-Schrift, fett und 19px groß.
// Erst so gilt der Kontrast von 4,3:1 als ausreichend (große Schrift).
// Leicht engere Laufweite und knapper Innenabstand: So passt
// „WhatsApp-Community beitreten“ auch bei 360px Bildschirmbreite in eine Zeile.
// Hover: Wechsel zu Creme. Beim Antippen wird er kurz minimal kleiner.
export function ButtonLink({
  href,
  children,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-14 items-center justify-center rounded-brand bg-orange px-2 py-3 text-center text-button font-bold tracking-[-0.01em] text-navy transition duration-150 ease-out hover:bg-cream active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}
