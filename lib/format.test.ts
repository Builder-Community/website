import { describe, expect, test } from "vitest";
import {
  formatDayMonth,
  formatMeetupDay,
  formatShortDate,
  formatTimeRange,
  NBSP,
  SHY,
} from "./format";

// In den erwarteten Texten steht „_“ für ein geschütztes Leerzeichen.
const nbsp = (text: string) => text.replaceAll("_", NBSP);

test("NBSP ist wirklich ein geschütztes Leerzeichen (U+00A0), kein normales", () => {
  expect(NBSP.charCodeAt(0)).toBe(0xa0);
  expect(NBSP).not.toBe(" ");
});

test("SHY ist ein weiches Trennzeichen (U+00AD)", () => {
  expect(SHY.charCodeAt(0)).toBe(0xad);
});

describe("formatMeetupDay", () => {
  test.each([
    ["2026-11-28", "de", "Sa,_28._November"],
    ["2026-12-05", "de", "Sa,_5._Dezember"],
    ["2027-01-02", "de", "Sa,_2._Januar"],
    ["2026-11-28", "en", "Sat,_28_November"],
    ["2026-12-05", "en", "Sat,_5_December"],
  ] as const)("%s auf %s → %s", (date, locale, expected) => {
    expect(formatMeetupDay(date, locale)).toBe(nbsp(expected));
  });

  test("lehnt falsche Formate ab, statt still Unsinn anzuzeigen", () => {
    expect(() => formatMeetupDay("28.11.2026", "de")).toThrow();
    expect(() => formatMeetupDay("2026-13-45", "de")).toThrow();
  });
});

describe("formatShortDate und formatDayMonth", () => {
  test.each([
    [formatShortDate, "2026-11-08T18:00:00+01:00", "de", "08.11."],
    [formatShortDate, "2026-11-08T18:00:00+01:00", "en", "8_Nov"],
    [formatDayMonth, "2026-11-15T18:00:00+01:00", "de", "15._November"],
    [formatDayMonth, "2026-11-15T18:00:00+01:00", "en", "15_November"],
  ] as const)("%o(%s, %s) → %s", (format, instant, locale, expected) => {
    expect(format(instant, locale)).toBe(nbsp(expected));
  });

  test("zählt in deutscher Zeit: 23:30 UTC am 07.11. ist in Deutschland schon der 08.11.", () => {
    expect(formatShortDate("2026-11-07T23:30:00Z", "de")).toBe("08.11.");
  });

  test("lehnt ungültige Zeitpunkte ab", () => {
    expect(() => formatShortDate("08.11.2026", "de")).toThrow();
  });
});

describe("formatTimeRange", () => {
  test.each([
    [{ start: "09:00", end: "12:00" }, "de", "9–12_Uhr"],
    [{ start: "09:30", end: "12:00" }, "de", "9:30–12_Uhr"],
    [{ start: "09:00", end: "12:00" }, "en", "9_am–12_pm"],
    [{ start: "10:00", end: "13:30" }, "en", "10_am–1:30_pm"],
  ] as const)("%o auf %s → %s", (range, locale, expected) => {
    expect(formatTimeRange(range, locale)).toBe(nbsp(expected));
  });

  test("lehnt falsche Formate ab", () => {
    expect(() => formatTimeRange({ start: "9", end: "12:00" }, "de")).toThrow();
  });
});
