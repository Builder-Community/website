// Vorschau-Seiten (/vorschau/…) gibt es nur lokal und in Vercel-Previews.
// In Produktion liefern sie 404, damit dort vor dem Launch nichts auftaucht.
// VERCEL_ENV setzt Vercel selbst: "production", "preview" oder "development".
export function isPreviewEnabled(): boolean {
  return process.env.VERCEL_ENV !== "production";
}
