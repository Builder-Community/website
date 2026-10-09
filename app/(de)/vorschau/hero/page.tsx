import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { isPreviewEnabled } from "@/lib/preview";

// Übersicht der Hero-Varianten zum Durchtippen auf dem Handy.

export const metadata: Metadata = {
  title: "Vorschau: Hero-Varianten",
  robots: { index: false, follow: false },
};

const entries = [
  {
    slug: "a-bricolage",
    title: "A · rein typografisch",
    font: "Bricolage Grotesque",
  },
  {
    slug: "b-bricolage",
    title: "B · mit großem B",
    font: "Bricolage Grotesque",
  },
  {
    slug: "a-schibsted",
    title: "A · rein typografisch",
    font: "Schibsted Grotesk",
  },
  { slug: "b-schibsted", title: "B · mit großem B", font: "Schibsted Grotesk" },
];

export default function HeroPreviewIndex() {
  if (!isPreviewEnabled()) notFound();

  return (
    <main className="min-h-svh surface-cream py-12">
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Hero-Varianten
        </h1>
        <p className="mt-4 max-w-text">
          Auf dem Handy öffnen und nacheinander antippen. Achte auf den ersten
          Eindruck, bevor du scrollst.
        </p>
        <ul className="mt-8 border-t border-ink/15">
          {entries.map((entry) => (
            <li key={entry.slug} className="border-b border-ink/15">
              <Link
                href={`/vorschau/hero/${entry.slug}`}
                className="flex min-h-16 items-center justify-between gap-4 py-3"
              >
                <span>
                  <span className="block font-semibold">{entry.title}</span>
                  <span className="block text-sm text-ink/70">
                    {entry.font}
                  </span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
