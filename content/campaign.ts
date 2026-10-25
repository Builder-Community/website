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
export const campaign = {
  timeZone: "Europe/Berlin",

  // Ab wann der Teaser die Platzhalterseite ersetzt (null = Platzhalter bleibt).
  // Geht nur, wenn Impressum und Datenschutz vollständig sind (content/legal.ts).
  teaserAt: "2026-10-11T08:00:00+02:00",

  // Launch der Website mit dem Reel „Was ist Side Project Saturday?“: volle Seite,
  // Ort noch geheim (Datum fest, Uhrzeit vorläufig, Issue #2)
  launchAt: "2027-01-01T18:00:00+01:00",

  // Ort-Drop: ab hier ist der Ort sichtbar (vorläufig, Issue #2)
  venueRevealAt: "2027-01-03T18:00:00+01:00",

  // Erstes Treffen (fest)
  firstMeetup: "2027-01-09",

  // Jeden Samstag (6) von 9 bis 12 Uhr. Wochentage: 0 = Sonntag … 6 = Samstag
  weekly: { weekday: 6, start: "09:00", end: "12:00" },

  // Samstage, an denen kein Treffen stattfindet, z. B. ["2027-03-27"].
  // Weihnachten und Neujahr liegen vor dem ersten Treffen (Issue #3).
  skipDates: [],
} as const satisfies CampaignConfig;

assertValidCampaign(campaign);
