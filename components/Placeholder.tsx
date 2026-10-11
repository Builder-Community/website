import type { Dictionary } from "@/content/types";
import { BMark } from "./BMark";
import { LegalLinks } from "./LegalLinks";

type PlaceholderProps = {
  legal: Dictionary["legal"];
};

// Ruhige Platzhalterseite, bis der Teaser freigeschaltet ist (campaign.teaserAt).
// Verrät nichts und wird nicht indexiert. Impressum und Datenschutz sind
// trotzdem erreichbar, sobald die Domain öffentlich ist.
export function Placeholder({ legal }: PlaceholderProps) {
  return (
    <div className="flex min-h-svh flex-col surface-navy">
      <main className="grid flex-1 place-items-center px-5">
        <div className="flex flex-col items-center gap-6">
          <BMark className="w-24 animate-stamp text-orange" />
          <h1 className="font-sans text-base tracking-wide text-cream/70">
            builder.community
          </h1>
        </div>
      </main>
      <footer className="pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <LegalLinks legal={legal} />
      </footer>
    </div>
  );
}
