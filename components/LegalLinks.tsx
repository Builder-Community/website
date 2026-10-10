import type { Dictionary } from "@/content/types";

type LegalLinksProps = {
  legal: Dictionary["legal"];
};

// Impressum · Datenschutz. Muss aus jedem Zustand erreichbar sein, auch aus dem Teaser.
export function LegalLinks({ legal }: LegalLinksProps) {
  return (
    <nav aria-label={legal.nav}>
      <ul className="flex items-center justify-center text-sm text-cream/60">
        <li>
          <a
            href="/impressum"
            className="inline-flex min-h-11 items-center px-2 hover:text-sky"
          >
            {legal.imprint}
          </a>
        </li>
        <li aria-hidden="true">·</li>
        <li>
          <a
            href="/datenschutz"
            className="inline-flex min-h-11 items-center px-2 hover:text-sky"
          >
            {legal.privacy}
          </a>
        </li>
      </ul>
    </nav>
  );
}
