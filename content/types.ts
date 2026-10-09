// Gemeinsamer Typ für alle Sprachen. Fehlt in einer Sprache ein Text,
// meldet TypeScript beim Build einen Fehler.
export type Dictionary = {
  header: {
    // Name der Sprachnavigation für Screenreader
    languageNav: string;
  };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    whenLabel: string;
    whereLabel: string;
    weekly: string;
    place: string;
    firstMeetup: string;
    nextMeetup: string;
    cta: string;
    instagram: string;
  };
};
