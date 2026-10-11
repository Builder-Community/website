import { describe, expect, test } from "vitest";
import { assertValidCampaign, checkCampaign } from "./campaign-check";
import type { CampaignConfig } from "./state";

const valid: CampaignConfig = {
  timeZone: "Europe/Berlin",
  teaserAt: "2026-10-20T08:00:00+02:00",
  launchAt: "2026-11-08T18:00:00+01:00",
  venueRevealAt: "2026-11-15T18:00:00+01:00",
  firstMeetup: "2026-11-28",
  weekly: { weekday: 6, start: "09:00", end: "12:00" },
  skipDates: ["2026-12-26", "2027-01-02"],
};

// Prüft eine Konfiguration mit einer Änderung und gibt die Meldungen zurück.
const problemsWith = (change: Partial<CampaignConfig>) =>
  checkCampaign({ ...valid, ...change }).join("\n");

describe("checkCampaign", () => {
  test("eine korrekte Konfiguration hat keine Probleme", () => {
    expect(checkCampaign(valid)).toEqual([]);
  });

  test("ohne Teaser-Termin (null) ist alles in Ordnung", () => {
    expect(checkCampaign({ ...valid, teaserAt: null })).toEqual([]);
  });

  test("falscher Offset im Sommer: schlägt +02:00 vor", () => {
    const message = problemsWith({ teaserAt: "2026-10-20T08:00:00+01:00" });
    expect(message).toContain("Sommerzeit");
    expect(message).toContain("2026-10-20T08:00:00+02:00");
  });

  test("falscher Offset im Winter: schlägt +01:00 vor", () => {
    const message = problemsWith({ launchAt: "2026-11-08T18:00:00+02:00" });
    expect(message).toContain("Winterzeit");
    expect(message).toContain("2026-11-08T18:00:00+01:00");
  });

  test.each([
    ["deutsches Format", "08.11.2026 18:00"],
    ["ohne Zeitzone", "2026-11-08T18:00:00"],
    ["UTC statt deutscher Zeit", "2026-11-08T17:00:00Z"],
  ])("lehnt %s ab", (_, launchAt) => {
    expect(problemsWith({ launchAt })).toContain("launchAt");
  });

  test("erstes Treffen muss auf den Treffen-Wochentag fallen", () => {
    expect(problemsWith({ firstMeetup: "2026-11-27" })).toContain(
      "kein Samstag",
    );
  });

  test("Ausfall an einem anderen Wochentag ist vermutlich ein Tippfehler", () => {
    expect(problemsWith({ skipDates: ["2026-12-25"] })).toContain("Tippfehler");
  });

  test("ungültiger Kalendertag wie der 30. Februar wird erkannt", () => {
    expect(problemsWith({ skipDates: ["2027-02-30"] })).toContain("2027-02-30");
  });

  test("das erste Treffen kann nicht ausfallen", () => {
    expect(problemsWith({ skipDates: ["2026-11-28"] })).toContain(
      "kann nicht ausfallen",
    );
  });

  test("Reihenfolge: Ort-Drop vor dem Launch ist ein Fehler", () => {
    expect(
      problemsWith({ venueRevealAt: "2026-11-01T18:00:00+01:00" }),
    ).toContain("launchAt muss vor venueRevealAt liegen");
  });

  test("Ort-Drop nach Beginn des ersten Treffens ist ein Fehler", () => {
    expect(
      problemsWith({ venueRevealAt: "2026-11-28T10:00:00+01:00" }),
    ).toContain("vor dem Beginn des ersten Treffens");
  });

  test("Beginn muss vor dem Ende liegen", () => {
    expect(
      problemsWith({ weekly: { weekday: 6, start: "12:00", end: "09:00" } }),
    ).toContain("Beginn");
  });
});

test("assertValidCampaign bricht mit allen Meldungen ab", () => {
  expect(() =>
    assertValidCampaign({ ...valid, firstMeetup: "2026-11-27" }),
  ).toThrow(/campaign\.ts enthält Fehler/);
  expect(() => assertValidCampaign(valid)).not.toThrow();
});
