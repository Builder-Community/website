// Zustandslogik der Kampagne: Was zeigt die Website gerade, und wann ist das nächste Treffen?
// Alles hängt nur von der aktuellen Zeit und von content/campaign.ts ab. Es sind reine
// Funktionen ohne Seiteneffekte, deshalb lassen sie sich gut testen (lib/state.test.ts).

// placeholder → teaser → launch → venue → running
//   placeholder: ruhige Platzhalterseite, bis der Teaser freigeschaltet ist
//   teaser:      nur der Teaser („Etwas startet in Augsburg.“)
//   launch:      volle Seite, Ort „wird am … verraten“
//   venue:       Ort sichtbar, bis das erste Treffen vorbei ist
//   running:     danach; zeigt automatisch den nächsten Samstag
export type CampaignState =
  "placeholder" | "teaser" | "launch" | "venue" | "running";

export type CampaignConfig = {
  timeZone: string;
  // Zeitpunkte mit Offset, z. B. "2026-11-08T18:00:00+01:00". null = noch nicht festgelegt.
  teaserAt: string | null;
  launchAt: string;
  venueRevealAt: string;
  // Kalendertag im Format JJJJ-MM-TT
  firstMeetup: string;
  // weekday: 0 = Sonntag … 6 = Samstag; Uhrzeiten im Format HH:MM
  weekly: { weekday: number; start: string; end: string };
  skipDates: readonly string[];
};

export type Meetup = {
  date: string; // JJJJ-MM-TT
  isFirst: boolean;
};

export function getCampaignState(
  now: Date,
  config: CampaignConfig,
): CampaignState {
  if (config.teaserAt === null || now < new Date(config.teaserAt)) {
    return "placeholder";
  }
  if (now < new Date(config.launchAt)) return "teaser";
  if (now < new Date(config.venueRevealAt)) return "launch";
  if (!isFirstMeetupOver(now, config)) return "venue";
  return "running";
}

// Das nächste Treffen, das die Seite anzeigen soll. Bis das erste Treffen vorbei ist,
// ist es das erste. Danach der nächste passende Wochentag, der kein Ausfall ist.
// Samstags vor 12 Uhr ist „heute“ noch das nächste Treffen.
export function getNextMeetup(now: Date, config: CampaignConfig): Meetup {
  if (!isFirstMeetupOver(now, config)) {
    return { date: config.firstMeetup, isFirst: true };
  }

  const { date: today, time } = localDateTime(now, config.timeZone);
  for (let offset = 0; offset <= 370; offset++) {
    const day = addDays(today, offset);
    if (weekdayOf(day) !== config.weekly.weekday) continue;
    if (offset === 0 && time >= config.weekly.end) continue; // heutiges Treffen ist vorbei
    if (config.skipDates.includes(day)) continue;
    return { date: day, isFirst: false };
  }
  throw new Error(
    "Kein Treffen im kommenden Jahr gefunden. Stehen zu viele Tage in skipDates?",
  );
}

// Ist das erste Treffen vorbei? Gilt ab dem Ende (z. B. 12:00) am Tag des ersten Treffens.
function isFirstMeetupOver(now: Date, config: CampaignConfig): boolean {
  const { date, time } = localDateTime(now, config.timeZone);
  if (date !== config.firstMeetup) return date > config.firstMeetup;
  return time >= config.weekly.end;
}

// Datum und Uhrzeit eines Zeitpunkts in einer Zeitzone,
// z. B. { date: "2026-11-28", time: "11:59" }. Zeichenketten in diesem Format
// lassen sich direkt vergleichen: "2026-11-28" < "2026-12-05", "11:59" < "12:00".
export function localDateTime(
  instant: Date,
  timeZone: string,
): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instant);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

// Kalenderrechnen mit Tagen im Format JJJJ-MM-TT. Mittags UTC, damit
// Sommer-/Winterzeit nie einen Tag verschiebt.
export function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function weekdayOf(isoDate: string): number {
  return new Date(`${isoDate}T12:00:00Z`).getUTCDay();
}
