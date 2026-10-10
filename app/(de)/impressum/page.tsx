import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { imprint } from "@/content/legal";
import { links } from "@/content/links";
import { NBSP } from "@/lib/format";

export const metadata: Metadata = {
  title: "Impressum · builder.community",
};

// Angaben nach § 5 DDG und § 18 Abs. 2 MStV. Die Daten stehen in content/legal.ts.
export default function ImprintPage() {
  const complete = Object.values(imprint).every((value) => value.trim() !== "");

  return (
    <LegalPage title="Impressum">
      <h2>{`Angaben gemäß §${NBSP}5 DDG`}</h2>
      {complete ? (
        <p>
          {imprint.name}
          <br />
          {imprint.street}
          <br />
          {imprint.city}
        </p>
      ) : (
        <p>Die Angaben werden gerade ergänzt.</p>
      )}

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${links.email}`}>{links.email}</a>
      </p>

      <h2>{`Verantwortlich für den Inhalt nach §${NBSP}18 Abs.${NBSP}2 MStV`}</h2>
      {complete && (
        <p>
          {imprint.name}
          <br />
          Anschrift wie oben
        </p>
      )}
    </LegalPage>
  );
}
