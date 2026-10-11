import { expect, test } from "vitest";
import { campaign } from "./campaign";
import { legalProblems } from "./legal";

// Sobald in campaign.ts ein Teaser-Termin steht, müssen Impressum und
// Datenschutzerklärung vollständig sein. Schlägt dieser Test fehl, steht in
// der Meldung, was noch fehlt.
test("Impressum und Datenschutz sind fertig, bevor der Teaser live geht", () => {
  const teaserPlanned: boolean = campaign.teaserAt !== null;
  expect(teaserPlanned ? legalProblems() : []).toEqual([]);
});
