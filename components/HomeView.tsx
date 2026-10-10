import type { Metadata } from "next";
import { campaign } from "@/content/campaign";
import { links } from "@/content/links";
import type { Dictionary } from "@/content/types";
import {
  formatMeetupDay,
  formatShortDate,
  formatTimeRange,
  type Locale,
} from "@/lib/format";
import { type CampaignState, localDateTime, type Meetup } from "@/lib/state";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Placeholder } from "./Placeholder";
import { Teaser } from "./Teaser";

type HomeViewProps = {
  t: Dictionary;
  locale: Locale;
  state: CampaignState;
  meetup: Meetup;
};

// Die Startseite im jeweiligen Zustand der Kampagne.
// Was der Zustand nicht zeigt, wird gar nicht erst gerendert und steht deshalb
// weder im HTML noch im JavaScript. Im Teaser ist so z. B. der WhatsApp-Link
// noch nirgends zu finden.
export function HomeView({ t, locale, state, meetup }: HomeViewProps) {
  if (state === "placeholder") return <Placeholder />;

  if (state === "teaser") {
    return (
      <Teaser
        t={t.teaser}
        legal={t.legal}
        date={{
          label: formatShortDate(campaign.launchAt, locale),
          dateTime: localDateTime(
            new Date(campaign.launchAt),
            campaign.timeZone,
          ).date,
        }}
        instagramUrl={links.instagram}
      />
    );
  }

  return (
    <>
      <Header locale={locale} languageNav={t.header.languageNav} stamp />
      <main id="inhalt">
        <Hero
          t={t.hero}
          time={formatTimeRange(campaign.weekly, locale)}
          meetup={{
            label: meetup.isFirst ? t.hero.firstMeetup : t.hero.nextMeetup,
            day: formatMeetupDay(meetup.date, locale),
          }}
          whatsappUrl={links.whatsapp}
          instagramUrl={links.instagram}
        />
        {/* Etappe 3: Worum es geht, So läuft ein Samstag, Nächstes Treffen, … */}
      </main>
    </>
  );
}

// Seitentitel und Beschreibung je Zustand. Im Teaser z. B.
// „Augsburg Builder Community · 08.11.“ und „Etwas startet in Augsburg.“
export function homeMetadata(
  t: Dictionary,
  locale: Locale,
  state: CampaignState,
): Metadata {
  if (state === "placeholder") {
    return { title: "builder.community", robots: { index: false } };
  }
  if (state === "teaser") {
    return {
      title: t.meta.teaserTitle(formatShortDate(campaign.launchAt, locale)),
      description: t.meta.teaserDescription,
    };
  }
  return {
    title: t.meta.title,
    description: t.meta.description(formatTimeRange(campaign.weekly, locale)),
  };
}
