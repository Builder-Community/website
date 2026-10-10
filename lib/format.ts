// Datums- und Zeitangaben für Menschen, immer in deutscher Zeit (Europe/Berlin).
// Beispiele: „Sa, 28. November“ · „08.11.“ · „15. November“ · „9–12 Uhr“
//            „Sat, 28 November“ · „8 Nov“  · „15 November“  · „9 am–12 pm“

export type Locale = "de" | "en";

// Geschütztes Leerzeichen (U+00A0): hält z. B. „28. November“ und „9 Uhr“ in
// einer Zeile zusammen. Als Zeichencode geschrieben, weil es im Editor genauso
// aussieht wie ein normales Leerzeichen.
export const NBSP = String.fromCharCode(0xa0);

const TIME_ZONE = "Europe/Berlin";

// Kalendertag "2026-11-28" → „Sa, 28. November“ (de) bzw. „Sat, 28 November“ (en)
export function formatMeetupDay(isoDate: string, locale: Locale): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Datum muss im Format JJJJ-MM-TT sein: ${isoDate}`);
  }
  // Mittags UTC: So bleibt es in jeder Zeitzone derselbe Kalendertag.
  const parts = dateParts(`${isoDate}T12:00:00Z`, locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
  const weekday = parts.weekday.replace(/\.$/, ""); // „Sa.“ → „Sa“

  return locale === "de"
    ? `${weekday},${NBSP}${parts.day}.${NBSP}${parts.month}`
    : `${weekday},${NBSP}${parts.day}${NBSP}${parts.month}`;
}

// Zeitpunkt "2026-11-08T18:00:00+01:00" → „08.11.“ (de) bzw. „8 Nov“ (en)
export function formatShortDate(instant: string, locale: Locale): string {
  if (locale === "de") {
    const { day, month } = dateParts(instant, locale, {
      day: "2-digit",
      month: "2-digit",
    });
    return `${day}.${month}.`;
  }
  const { day, month } = dateParts(instant, locale, {
    day: "numeric",
    month: "short",
  });
  return `${day}${NBSP}${month}`;
}

// Zeitpunkt "2026-11-15T18:00:00+01:00" → „15. November“ (de) bzw. „15 November“ (en)
export function formatDayMonth(instant: string, locale: Locale): string {
  const { day, month } = dateParts(instant, locale, {
    day: "numeric",
    month: "long",
  });
  return locale === "de" ? `${day}.${NBSP}${month}` : `${day}${NBSP}${month}`;
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

// Nur eindeutige Zeitpunkte mit Zeitzone erlauben, z. B. "2026-11-08T18:00:00+01:00".
// Vorsicht: JavaScript liest "08.11.2026" ohne Fehler als 11. August (US-Format).
export const ISO_INSTANT =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?(Z|[+-]\d{2}:\d{2})$/;

// Zerlegt einen Zeitpunkt in Tag, Monat usw., wie man sie in Deutschland gerade sieht.
function dateParts(
  instant: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): Record<"weekday" | "day" | "month", string> {
  const date = new Date(instant);
  if (!ISO_INSTANT.test(instant) || Number.isNaN(date.getTime())) {
    throw new Error(
      `Zeitpunkt muss so aussehen: 2026-11-08T18:00:00+01:00 (war: ${instant})`,
    );
  }
  const parts = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    timeZone: TIME_ZONE,
    ...options,
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return { weekday: part("weekday"), day: part("day"), month: part("month") };
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
