// Datums- und Zeitangaben für Menschen, immer in deutscher Zeit (Europe/Berlin).
// Beispiele: „Sa, 28. November“ · „Sat, 28 November“ · „9–12 Uhr“ · „9 am–12 pm“

export type Locale = "de" | "en";

// Geschütztes Leerzeichen: hält z. B. „28. November“ und „9 Uhr“ in einer Zeile zusammen.
export const NBSP = " ";

const TIME_ZONE = "Europe/Berlin";

// "2026-11-28" → „Sa, 28. November“ (de) bzw. „Sat, 28 November“ (en)
export function formatMeetupDay(isoDate: string, locale: Locale): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Datum muss im Format JJJJ-MM-TT sein: ${isoDate}`);
  }
  // Mittags UTC: So bleibt es in jeder Zeitzone derselbe Kalendertag.
  const date = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Ungültiges Datum: ${isoDate}`);
  }

  const parts = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    day: "numeric",
    month: "long",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekday = part("weekday").replace(/\.$/, ""); // „Sa.“ → „Sa“
  const day = part("day");
  const month = part("month");

  return locale === "de"
    ? `${weekday},${NBSP}${day}.${NBSP}${month}`
    : `${weekday},${NBSP}${day}${NBSP}${month}`;
}

type TimeRange = { start: string; end: string };

// { start: "09:00", end: "12:00" } → „9–12 Uhr“ (de) bzw. „9 am–12 pm“ (en)
export function formatTimeRange(
  { start, end }: TimeRange,
  locale: Locale,
): string {
  const [from, to] = [parseTime(start), parseTime(end)];
  if (locale === "de") {
    return `${germanTime(from)}–${germanTime(to)}${NBSP}Uhr`;
  }
  return `${englishTime(from)}–${englishTime(to)}`;
}

type Time = { hours: number; minutes: number };

function parseTime(value: string): Time {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) {
    throw new Error(`Uhrzeit muss im Format HH:MM sein: ${value}`);
  }
  return { hours: Number(match[1]), minutes: Number(match[2]) };
}

// 9:00 → „9“, 9:30 → „9:30“
function germanTime({ hours, minutes }: Time): string {
  return minutes === 0
    ? `${hours}`
    : `${hours}:${String(minutes).padStart(2, "0")}`;
}

// 9:00 → „9 am“, 12:00 → „12 pm“, 13:30 → „1:30 pm“
function englishTime({ hours, minutes }: Time): string {
  const suffix = hours < 12 ? "am" : "pm";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const clock =
    minutes === 0
      ? `${hour12}`
      : `${hour12}:${String(minutes).padStart(2, "0")}`;
  return `${clock}${NBSP}${suffix}`;
}
