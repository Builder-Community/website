import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView, homeMetadata } from "@/components/HomeView";
import { campaign } from "@/content/campaign";
import { de } from "@/content/de";
import { isPreviewEnabled } from "@/lib/preview";
import { addDays, type CampaignState, getNextMeetup } from "@/lib/state";

// Vorschau aller Zustände der Startseite, unabhängig vom heutigen Datum:
// /vorschau/teaser · /vorschau/launch · /vorschau/venue · /vorschau/running
// Nur lokal und in Vercel-Previews; in Produktion 404 und nicht indexiert.

const states = ["teaser", "launch", "venue", "running"] as const;
type PreviewState = (typeof states)[number] & CampaignState;

function isPreviewState(value: string): value is PreviewState {
  return (states as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return states.map((zustand) => ({ zustand }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vorschau/[zustand]">): Promise<Metadata> {
  const { zustand } = await params;
  if (!isPreviewState(zustand)) return {};
  return {
    ...homeMetadata(de, "de", zustand),
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({
  params,
}: PageProps<"/vorschau/[zustand]">) {
  if (!isPreviewEnabled()) notFound();

  const { zustand } = await params;
  if (!isPreviewState(zustand)) notFound();

  // „running“ zeigt das Treffen nach dem ersten. Dafür tun wir so, als wäre
  // heute der Sonntag nach dem ersten Treffen.
  const meetup =
    zustand === "running"
      ? getNextMeetup(
          new Date(`${addDays(campaign.firstMeetup, 1)}T12:00:00+01:00`),
          campaign,
        )
      : { date: campaign.firstMeetup, isFirst: true };

  return <HomeView t={de} locale="de" state={zustand} meetup={meetup} />;
}
