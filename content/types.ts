// Gemeinsamer Typ für alle Sprachen. Fehlt in einer Sprache ein Text,
// meldet TypeScript beim Build einen Fehler.
// Daten und Uhrzeiten stehen nie in den Texten, sondern kommen aus
// content/campaign.ts und werden eingesetzt (z. B. description(time)).
export type Dictionary = {
  meta: {
    // Seitentitel und Beschreibung für Suchmaschinen und Linkvorschauen
    title: string;
    description: (time: string) => string;
    teaserTitle: (date: string) => string;
    teaserDescription: string;
  };
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
  teaser: {
    title: string;
    subline: string;
    follow: string;
  };
  legal: {
    // Name der Navigation für Screenreader
    nav: string;
    imprint: string;
    privacy: string;
  };
};
