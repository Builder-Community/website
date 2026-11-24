import "server-only";
import { assertValidCampaign } from "@/lib/campaign-check";
import type { CampaignConfig } from "@/lib/state";

// Alle Zeitpunkte der Kampagne an einer Stelle.
// Eine Terminänderung ist immer genau eine Zeile in dieser Datei.
//
// So werden Zeiten geschrieben: "2026-11-08T18:00:00+01:00"
//   +01:00 = Winterzeit (Ende Oktober bis Ende März), +02:00 = Sommerzeit
// Tippfehler fallen beim Build auf: Dann bleibt die bisherige Version online,
// und GitHub zeigt eine Fehlermeldung mit dem richtigen Wert.
//
// Tipp: Umschaltzeitpunkte 10 Minuten vor den Instagram-Post legen. Die Seite
// wird höchstens alle 5 Minuten neu erzeugt und ist dann sicher umgestellt.

// Launch der Website mit dem Ankündigungsvideo am 01.01. um 12 Uhr.
// Die Seite schaltet 10 Minuten vorher um.
const launchTime = "2027-01-01T11:50:00+01:00";

export const campaign = {
  timeZone: "Europe/Berlin",

  // Ab wann der Teaser die Platzhalterseite ersetzt (null = Platzhalter bleibt).
  // Geht nur, wenn Impressum und Datenschutz vollständig sind (content/legal.ts).
  teaserAt: "2026-10-11T08:00:00+02:00",

  // Ab hier volle Seite statt Teaser
  launchAt: launchTime,

  // Ab hier ist der Ort sichtbar. launchTime = gleich zum Launch, ohne eigenen
  // Ort-Drop. Für einen späteren Ort-Drop hier einen eigenen Zeitpunkt eintragen.
  venueRevealAt: launchTime,

  // Erstes Treffen (fest)
  firstMeetup: "2027-01-16",

  // Jeden Samstag (6) von 10 bis 13 Uhr. Wochentage: 0 = Sonntag … 6 = Samstag
  weekly: { weekday: 6, start: "10:00", end: "13:00" },

  // Samstage, an denen kein Treffen stattfindet, z. B. ["2027-03-27"].
  // Weihnachten und Neujahr liegen vor dem ersten Treffen (Issue #3).
  skipDates: [],
} as const satisfies CampaignConfig;

assertValidCampaign(campaign);
