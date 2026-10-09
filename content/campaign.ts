import "server-only";

// Alle Zeitpunkte der Kampagne an einer Stelle.
// Eine Terminänderung ist immer genau eine Zeile in dieser Datei.
// Zeiten mit Offset angeben: Im November gilt in Deutschland +01:00 (Winterzeit).
export const campaign = {
  timeZone: "Europe/Berlin",
  launchAt: "2026-11-08T18:00:00+01:00", // Reel „Was ist Side Project Saturday?“ (vorläufig, Issue #6)
  venueRevealAt: "2026-11-15T18:00:00+01:00", // Ort-Drop (vorläufig, Issue #6)
  firstMeetup: "2026-11-28", // erstes Treffen (fest)
  weekly: { weekday: 6, start: "09:00", end: "12:00" }, // 6 = Samstag
  skipDates: ["2026-12-26", "2027-01-02"], // Ausfälle (vorläufig, Issue #7)
} as const;
