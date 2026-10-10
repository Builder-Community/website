import "server-only";
import { campaign } from "./campaign";

// Angaben fürs Impressum nach § 5 DDG (Digitale-Dienste-Gesetz) und § 18 Abs. 2 MStV.
// Umsetzungshilfe, keine Rechtsberatung. Die E-Mail-Adresse steht in links.ts.
export const imprint = {
  name: "", // Vor- und Nachname
  street: "", // Straße Hausnummer
  city: "", // PLZ Ort
};

// Die Datenschutzerklärung (aus dem Generator, Issue #4) steht in
// app/(de)/datenschutz/page.tsx. Auf true setzen, sobald sie eingefügt ist.
export const privacyPolicyReady = false;

// Sicherheitsnetz: Ohne vollständiges Impressum und ohne Datenschutzerklärung
// darf die Seite nicht öffentlich werden. Ist in campaign.ts ein Teaser-Termin
// gesetzt und fehlt hier etwas, bricht der Build ab. Die alte Version bleibt online.
export function legalProblems(): string[] {
  const problems = Object.entries(imprint)
    .filter(([, value]) => value.trim() === "")
    .map(([field]) => `Impressum: „${field}“ fehlt.`);
  if (!privacyPolicyReady) problems.push("Die Datenschutzerklärung fehlt.");
  return problems;
}

if (campaign.teaserAt !== null && legalProblems().length > 0) {
  throw new Error(
    `content/legal.ts: Der Teaser kann erst live gehen, wenn Impressum und Datenschutz fertig sind:\n- ${legalProblems().join("\n- ")}`,
  );
}
