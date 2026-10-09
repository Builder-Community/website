import { describe, expect, test } from "vitest";
import { formatMeetupDay, formatTimeRange, NBSP } from "./format";

// In den erwarteten Texten steht „_“ für ein geschütztes Leerzeichen.
const nbsp = (text: string) => text.replaceAll("_", NBSP);

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
