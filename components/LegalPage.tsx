import type { ReactNode } from "react";
import { de } from "@/content/de";
import { Container } from "./Container";
import { Header } from "./Header";
import { LegalLinks } from "./LegalLinks";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

// Gemeinsames Layout für Impressum und Datenschutz (nur auf Deutsch).
// Schlicht und gut lesbar: Creme-Fläche, Überschriften in Navy.
export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="flex min-h-svh flex-col surface-cream">
      <Header locale="de" />
      <main id="inhalt" className="flex-1">
        <Container className="py-14 md:py-24">
          <article className="max-w-text">
            <h1 className="text-[clamp(2.25rem,1.6rem+3vw,3.5rem)] leading-none font-extrabold tracking-[-0.02em] text-navy">
              {title}
            </h1>
            <div className="legal-text mt-8">{children}</div>
          </article>
        </Container>
      </main>
      <footer className="surface-navy py-3">
        <LegalLinks legal={de.legal} />
      </footer>
    </div>
  );
}
