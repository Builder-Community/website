// Prüft content/campaign.ts auf Tippfehler, bevor sie Schaden anrichten.
// Wird beim Build ausgeführt: Bei einem Fehler bricht der Build ab, und die
// bisherige Version der Website bleibt online. Die Meldungen sind auf Deutsch
// und sagen, was zu tun ist, damit man sie auch unterwegs auf GitHub versteht.

import { ISO_INSTANT } from "./format";
import { type CampaignConfig, localDateTime, weekdayOf } from "./state";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const WEEKDAYS = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

export function checkCampaign(config: CampaignConfig): string[] {
  const problems: string[] = [];

  try {
    new Intl.DateTimeFormat("de-DE", { timeZone: config.timeZone });
  } catch {
    problems.push(`timeZone: „${config.timeZone}“ ist keine gültige Zeitzone.`);
    return problems; // ohne Zeitzone lässt sich der Rest nicht prüfen
  }

  // Zeitpunkte: Format, Offset passend zur Jahreszeit, Reihenfolge
  const instants: [string, string | null][] = [
    ["teaserAt", config.teaserAt],
    ["launchAt", config.launchAt],
    ["venueRevealAt", config.venueRevealAt],
  ];
  for (const [name, value] of instants) {
    if (value === null) continue;
    const problem = checkInstant(name, value, config.timeZone);
    if (problem) problems.push(problem);
  }

  // Wochenrhythmus
  const { weekday, start, end } = config.weekly;
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
    problems.push(
      `weekly.weekday: ${weekday} ist kein Wochentag (0 = Sonntag … 6 = Samstag).`,
    );
  }
  for (const [name, value] of [
    ["weekly.start", start],
    ["weekly.end", end],
  ]) {
    if (!TIME.test(value)) {
      problems.push(`${name}: „${value}“ muss eine Uhrzeit wie „09:00“ sein.`);
    }
  }
  if (TIME.test(start) && TIME.test(end) && start >= end) {
    problems.push(
      `weekly: Beginn (${start}) muss vor dem Ende (${end}) liegen.`,
    );
  }

  // Erstes Treffen
  const weekdayName = WEEKDAYS[weekday] ?? "der Treffen-Wochentag";
  if (!isCalendarDate(config.firstMeetup)) {
    problems.push(
      `firstMeetup: „${config.firstMeetup}“ muss ein Datum wie „2026-11-28“ sein.`,
    );
  } else if (weekdayOf(config.firstMeetup) !== weekday) {
    problems.push(
      `firstMeetup: Der ${config.firstMeetup} ist kein ${weekdayName}.`,
    );
  }

  // Ausfälle
  for (const day of config.skipDates) {
    if (!isCalendarDate(day)) {
      problems.push(
        `skipDates: „${day}“ muss ein Datum wie „2026-12-26“ sein.`,
      );
    } else if (weekdayOf(day) !== weekday) {
      problems.push(
        `skipDates: Der ${day} ist kein ${weekdayName}, das Auslassen hätte keine Wirkung. Tippfehler?`,
      );
    } else if (day === config.firstMeetup) {
      problems.push(
        `skipDates: Das erste Treffen (${day}) kann nicht ausfallen.`,
      );
    }
  }

  // Reihenfolge: Teaser → Launch → Ort-Drop → erstes Treffen
  if (problems.length === 0) {
    const order: [string, string | null][] = [
      ["teaserAt", config.teaserAt],
      ["launchAt", config.launchAt],
      ["venueRevealAt", config.venueRevealAt],
    ];
    const set = order.filter(
      (entry): entry is [string, string] => entry[1] !== null,
    );
    for (let i = 1; i < set.length; i++) {
      const [earlierName, earlier] = set[i - 1];
      const [laterName, later] = set[i];
      if (new Date(earlier) >= new Date(later)) {
        problems.push(`${earlierName} muss vor ${laterName} liegen.`);
      }
    }
    const reveal = localDateTime(
      new Date(config.venueRevealAt),
      config.timeZone,
    );
    const meetupStart = { date: config.firstMeetup, time: start };
    if (
      reveal.date > meetupStart.date ||
      (reveal.date === meetupStart.date && reveal.time >= meetupStart.time)
    ) {
      problems.push(
        "venueRevealAt muss vor dem Beginn des ersten Treffens liegen.",
      );
    }
  }

  return problems;
}

// Bricht mit allen gefundenen Problemen ab. Wird beim Laden von campaign.ts aufgerufen.
export function assertValidCampaign(config: CampaignConfig): void {
  const problems = checkCampaign(config);
  if (problems.length > 0) {
    throw new Error(
      `content/campaign.ts enthält Fehler:\n- ${problems.join("\n- ")}`,
    );
  }
}

// Prüft Format und Offset. Beispiel für einen falschen Offset: Am 20.10. gilt
// in Deutschland noch Sommerzeit (+02:00). „2026-10-20T08:00:00+01:00“ wäre
// dann in Wahrheit 09:00 Uhr.
function checkInstant(
  name: string,
  value: string,
  timeZone: string,
): string | null {
  if (!ISO_INSTANT.test(value) || Number.isNaN(new Date(value).getTime())) {
    return `${name}: „${value}“ muss so aussehen: 2026-11-08T18:00:00+01:00`;
  }
  if (value.endsWith("Z")) {
    return `${name}: Bitte in deutscher Zeit mit Offset angeben, z. B. 2026-11-08T18:00:00+01:00 statt UTC („Z“).`;
  }
  const writtenDate = value.slice(0, 10);
  const writtenTime = value.slice(11, 16);
  const actual = localDateTime(new Date(value), timeZone);
  if (actual.date === writtenDate && actual.time === writtenTime) return null;

  // Welcher Offset wäre richtig? Sommer- oder Winterzeit ausprobieren.
  const seconds =
    value.length >= 19 && value[16] === ":" ? value.slice(16, 19) : "";
  for (const offset of ["+01:00", "+02:00"]) {
    const candidate = `${writtenDate}T${writtenTime}${seconds}${offset}`;
    const local = localDateTime(new Date(candidate), timeZone);
    if (local.date === writtenDate && local.time === writtenTime) {
      return `${name}: Am ${writtenDate} gilt in Deutschland ${
        offset === "+02:00" ? "Sommerzeit" : "Winterzeit"
      }. Richtig ist „${candidate}“.`;
    }
  }
  return `${name}: „${value}“ passt nicht zur deutschen Zeit.`;
}

function isCalendarDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  // Ungültige Tage wie 2026-02-30 würden sonst in den März rutschen.
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}
