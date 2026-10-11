import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { HomeView, homeMetadata } from "@/components/HomeView";
import { campaign } from "@/content/campaign";
import { de } from "@/content/de";
import { getCampaignState, getNextMeetup } from "@/lib/state";

// Die Startseite schaltet nach Datum von selbst um:
// Platzhalter → Teaser → Launch → Ort → läuft (siehe lib/state.ts).
//
// "use cache" macht sie zu einer statischen Seite, die höchstens alle 5 Minuten
// neu erzeugt wird (Profil „campaign“ in next.config.ts). Bei jeder Neuerzeugung
// wird die aktuelle Zeit gelesen und der Zustand neu bestimmt. So schaltet die
// Seite um, ohne dass jemand etwas veröffentlichen muss.

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("campaign");
  return homeMetadata(de, "de", getCampaignState(new Date(), campaign));
}

export default async function HomePage() {
  "use cache";
  cacheLife("campaign");
  const now = new Date();
  return (
    <HomeView
      t={de}
      locale="de"
      state={getCampaignState(now, campaign)}
      meetup={getNextMeetup(now, campaign)}
    />
  );
}
