import { BMark } from "./BMark";

// Ruhige Platzhalterseite, bis der Teaser freigeschaltet ist (campaign.teaserAt).
// Verrät nichts und wird nicht indexiert.
export function Placeholder() {
  return (
    <main className="grid min-h-svh place-items-center surface-navy px-5">
      <div className="flex flex-col items-center gap-6">
        <BMark className="w-24 animate-stamp text-orange" />
        <h1 className="font-sans text-base tracking-wide text-cream/70">
          builder.community
        </h1>
      </div>
    </main>
  );
}
