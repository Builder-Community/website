import "server-only";
import type { Dictionary } from "./types";

// Alle deutschen Texte. Inhaltlich wie im Brief; sprachlich darf geschliffen werden.
// Daten und Uhrzeiten stehen nicht hier, sondern in campaign.ts.
export const de: Dictionary = {
  header: {
    languageNav: "Sprache",
  },
  hero: {
    kicker: "Side Project Saturday",
    title: "Augsburg Builder Community",
    lead: "Einmal pro Woche treffen wir uns, um mit unseren eigenen Projekten Augsburg, Deutschland und die Welt ein Stück besser zu machen.",
    whenLabel: "Wann",
    whereLabel: "Wo",
    weekly: "Jeden Samstag",
    place: "Augsburg Innenstadt",
    firstMeetup: "Erstes Treffen",
    nextMeetup: "Nächstes Treffen",
    cta: "WhatsApp-Community beitreten",
    instagram: "Instagram ansehen",
  },
};
