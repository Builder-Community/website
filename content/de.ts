import "server-only";
import type { Dictionary } from "./types";

// Alle deutschen Texte. Inhaltlich wie im Brief; sprachlich darf geschliffen werden.
// Daten und Uhrzeiten stehen nicht hier, sondern in campaign.ts.
export const de: Dictionary = {
  meta: {
    title: "Side Project Saturday · Augsburg Builder Community",
    description: (time) =>
      `Jeden Samstag ${time} in der Augsburger Innenstadt: Kaffee, Austausch und Zeit für eigene Projekte. Kostenlos, ohne Anmeldung.`,
    teaserTitle: (date) => `Augsburg Builder Community · ${date}`,
    teaserDescription: "Etwas startet in Augsburg.",
  },
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
  teaser: {
    title: "Etwas Neues kommt nach Augsburg.",
    subline: "Für alle, die eine Idee zum Leben erwecken wollen.",
    follow: "Auf Instagram folgen",
    revealLabel: "Wir verraten alles am",
  },
  legal: {
    nav: "Rechtliches",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
};
