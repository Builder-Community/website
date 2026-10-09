import type { Metadata } from "next";
import { BMark } from "@/components/BMark";

// Platzhalter, bis der Teaser fertig ist. Verrät nichts und wird nicht indexiert.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
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
