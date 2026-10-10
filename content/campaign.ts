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

  // Ab wann der Teaser die Platzhalterseite ersetzt. Erst eintragen, wenn
  // Impressum und Datenschutz fertig sind (Issues #3 und #4),
  // z. B. "2026-10-20T08:00:00+02:00". Bis dahin: null.
  teaserAt: null,

  // Reel „Was ist Side Project Saturday?“: volle Seite, Ort noch geheim (vorläufig, Issue #6)
  launchAt: "2026-11-08T18:00:00+01:00",

  // Ort-Drop: ab hier ist der Ort sichtbar (vorläufig, Issue #6)
  venueRevealAt: "2026-11-15T18:00:00+01:00",

  // Erstes Treffen (fest)
  firstMeetup: "2026-11-28",

  // Jeden Samstag (6) von 9 bis 12 Uhr. Wochentage: 0 = Sonntag … 6 = Samstag
  weekly: { weekday: 6, start: "09:00", end: "12:00" },

  // Samstage, an denen kein Treffen stattfindet (vorläufig, Issue #7)
  skipDates: ["2026-12-26", "2027-01-02"],
} as const satisfies CampaignConfig;

assertValidCampaign(campaign);
