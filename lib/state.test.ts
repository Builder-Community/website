import { describe, expect, test } from "vitest";
import {
  addDays,
  type CampaignConfig,
  getCampaignState,
  getNextMeetup,
  localDateTime,
  weekdayOf,
} from "./state";

// Eigene Test-Konfiguration: Die Tests sollen nicht brechen, wenn Johannes
// die echten Termine in content/campaign.ts ändert.
const config: CampaignConfig = {
  timeZone: "Europe/Berlin",
  teaserAt: "2026-10-20T08:00:00+02:00", // noch Sommerzeit (bis 25.10.)
  launchAt: "2026-11-08T18:00:00+01:00",
  venueRevealAt: "2026-11-15T18:00:00+01:00",
  firstMeetup: "2026-11-28",
  weekly: { weekday: 6, start: "09:00", end: "12:00" },
  skipDates: ["2026-12-26", "2027-01-02"],
};

// Zeitpunkt in deutscher Zeit, z. B. berlin("2026-11-28 11:59")
// Im Winter gilt +01:00, im Sommer +02:00.
function berlin(dateTime: string, offset = "+01:00"): Date {
  return new Date(`${dateTime.replace(" ", "T")}:00${offset}`);
}
const oneMsBefore = (date: Date) => new Date(date.getTime() - 1);

describe("getCampaignState: jeder Wechsel genau an seinem Zeitpunkt", () => {
  test("ohne Teaser-Termin bleibt der Platzhalter", () => {
    const withoutTeaser = { ...config, teaserAt: null };
    expect(getCampaignState(berlin("2026-12-24 10:00"), withoutTeaser)).toBe(
      "placeholder",
    );
  });

  test.each([
    ["teaserAt", config.teaserAt!, "placeholder", "teaser"],
    ["launchAt", config.launchAt, "teaser", "launch"],
    ["venueRevealAt", config.venueRevealAt, "launch", "venue"],
  ] as const)("%s: 1 ms vorher %s, genau dann %s", (_, at, before, after) => {
    const switchTime = new Date(at);
    expect(getCampaignState(oneMsBefore(switchTime), config)).toBe(before);
    expect(getCampaignState(switchTime, config)).toBe(after);
  });

  test("erstes Treffen: Samstag 11:59 noch venue, ab 12:00 running", () => {
    expect(getCampaignState(berlin("2026-11-28 11:59"), config)).toBe("venue");
    expect(getCampaignState(berlin("2026-11-28 12:00"), config)).toBe(
      "running",
    );
    expect(getCampaignState(berlin("2026-11-28 12:01"), config)).toBe(
      "running",
    );
  });

  test("Sommerzeit: der Teaser startet um 08:00 deutscher Zeit, nicht UTC", () => {
    // 08:00 Sommerzeit (+02:00) = 06:00 UTC
    expect(getCampaignState(new Date("2026-10-20T05:59:59Z"), config)).toBe(
      "placeholder",
    );
    expect(getCampaignState(new Date("2026-10-20T06:00:00Z"), config)).toBe(
      "teaser",
    );
  });
});

describe("getNextMeetup", () => {
  test("vor dem ersten Treffen: das erste Treffen", () => {
    expect(getNextMeetup(berlin("2026-11-10 09:00"), config)).toEqual({
      date: "2026-11-28",
      isFirst: true,
    });
  });

  test("am ersten Treffen 11:59 noch das erste, um 12:01 der nächste Samstag", () => {
    expect(getNextMeetup(berlin("2026-11-28 11:59"), config)).toEqual({
      date: "2026-11-28",
      isFirst: true,
    });
    expect(getNextMeetup(berlin("2026-11-28 12:01"), config)).toEqual({
      date: "2026-12-05",
      isFirst: false,
    });
  });

  test("unter der Woche: der kommende Samstag", () => {
    expect(getNextMeetup(berlin("2026-12-02 18:00"), config).date).toBe(
      "2026-12-05",
    );
  });

  test("samstags vor 12 Uhr ist heute das nächste Treffen, danach nächste Woche", () => {
    expect(getNextMeetup(berlin("2026-12-05 08:00"), config).date).toBe(
      "2026-12-05",
    );
    expect(getNextMeetup(berlin("2026-12-05 11:59"), config).date).toBe(
      "2026-12-05",
    );
    expect(getNextMeetup(berlin("2026-12-05 12:00"), config).date).toBe(
      "2026-12-12",
    );
  });

  test("Ausfälle werden übersprungen, auch über den Jahreswechsel", () => {
    // 26.12. und 02.01. fallen aus → nach dem 19.12. kommt der 09.01.
    expect(getNextMeetup(berlin("2026-12-19 12:01"), config).date).toBe(
      "2027-01-09",
    );
    expect(getNextMeetup(berlin("2026-12-24 15:00"), config).date).toBe(
      "2027-01-09",
    );
    expect(getNextMeetup(berlin("2027-01-01 00:00"), config).date).toBe(
      "2027-01-09",
    );
  });

  test("Sommerzeit: 11:59 und 12:01 gelten in deutscher Zeit", () => {
    // Ab 28.03.2027 gilt Sommerzeit (+02:00). 11:59 deutscher Zeit = 09:59 UTC.
    expect(
      getNextMeetup(berlin("2027-04-03 11:59", "+02:00"), config).date,
    ).toBe("2027-04-03");
    expect(
      getNextMeetup(berlin("2027-04-03 12:01", "+02:00"), config).date,
    ).toBe("2027-04-10");
  });
});

describe("Hilfsfunktionen", () => {
  test("localDateTime rechnet in deutscher Zeit, auch bei der Zeitumstellung", () => {
    // 25.10.2026: Um 03:00 Sommerzeit wird die Uhr auf 02:00 Winterzeit zurückgestellt.
    expect(
      localDateTime(new Date("2026-10-25T00:30:00Z"), "Europe/Berlin"),
    ).toEqual({ date: "2026-10-25", time: "02:30" });
    expect(
      localDateTime(new Date("2026-10-25T01:30:00Z"), "Europe/Berlin"),
    ).toEqual({ date: "2026-10-25", time: "02:30" });
    // Kurz vor Mitternacht UTC ist in Deutschland schon der nächste Tag.
    expect(
      localDateTime(new Date("2026-12-31T23:30:00Z"), "Europe/Berlin"),
    ).toEqual({ date: "2027-01-01", time: "00:30" });
  });

  test("addDays und weekdayOf über Monats- und Jahresgrenzen", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-11-28", 7)).toBe("2026-12-05");
    expect(addDays("2027-03-27", 7)).toBe("2027-04-03");
    expect(weekdayOf("2026-11-28")).toBe(6); // Samstag
    expect(weekdayOf("2027-01-09")).toBe(6);
  });
});
