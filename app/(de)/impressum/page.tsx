import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { imprint, imprintNote } from "@/content/legal";
import { links } from "@/content/links";
import { NBSP } from "@/lib/format";

export const metadata: Metadata = {
  title: "Impressum · builder.community",
};

// Angaben nach § 5 DDG und § 18 Abs. 2 MStV. Die Daten stehen in content/legal.ts.
export default function ImprintPage() {
  return (
    <LegalPage title="Impressum">
      <h2>{`Angaben gemäß §${NBSP}5 DDG`}</h2>
      <p>
        {imprint.name}
        <br />
        {imprint.street}
        <br />
        {imprint.city}
        <br />
        {imprint.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${links.email}`}>{links.email}</a>
      </p>

      <h2>{`Verantwortlich für den Inhalt nach §${NBSP}18 Abs.${NBSP}2 MStV`}</h2>
      <p>
        {imprint.name}
        <br />
        {imprint.street}, {imprint.city}
      </p>

      <div className="mt-10">
        <p>{imprintNote}</p>
      </div>
    </LegalPage>
  );
}
