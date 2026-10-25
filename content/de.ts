import "server-only";
import type { Dictionary } from "./types";

// Alle deutschen Texte. Inhaltlich wie im Brief; sprachlich darf geschliffen werden.
// Daten und Uhrzeiten stehen nicht hier, sondern in campaign.ts.
export const de: Dictionary = {
  meta: {
    title: "Side Project Saturday · Munich Builder Community",
    description: (time) =>
      `Jeden Samstag ${time} in der Münchner Innenstadt: Kaffee, Austausch und Zeit für eigene Projekte. Kostenlos, ohne Anmeldung.`,
    teaserTitle: (date) => `Munich Builder Community · ${date}`,
    teaserDescription: "Etwas startet in München.",
  },
  header: {
    languageNav: "Sprache",
  },
  hero: {
    kicker: "Side Project Saturday",
    // Name der Community wie in der Domain munich.builder.community: englisch,
    // passend zu „builder.community“ und „Side Project Saturday“
    title: "Munich Builder Community",
    lead: "Einmal pro Woche treffen wir uns, um mit unseren eigenen Projekten München, Deutschland und die Welt ein Stück besser zu machen.",
    whenLabel: "Wann",
    whereLabel: "Wo",
    weekly: "Jeden Samstag",
    place: "München Innenstadt",
    firstMeetup: "Erstes Treffen",
    nextMeetup: "Nächstes Treffen",
    cta: "WhatsApp-Community beitreten",
    instagram: "Instagram ansehen",
  },
  teaser: {
    title: "Etwas Neues kommt nach München.",
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
