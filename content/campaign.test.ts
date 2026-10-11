import { expect, test } from "vitest";
import { checkCampaign } from "@/lib/campaign-check";
import { campaign } from "./campaign";

// Prüft die echten Termine. Schlägt dieser Test auf GitHub fehl, steht in der
// Meldung, welche Zeile in content/campaign.ts falsch ist und was richtig wäre.
test("content/campaign.ts ist gültig", () => {
  expect(checkCampaign(campaign)).toEqual([]);
});
