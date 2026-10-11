import "server-only";

// Der Ort der Treffen (Issue #8).
// Darf schon vor dem Ort-Drop eingetragen werden: Die Website zeigt ihn erst ab
// venueRevealAt (content/campaign.ts), vorher steht er weder im HTML noch im
// JavaScript. Bleibt name leer, steht nach dem Reveal „Ort folgt in Kürze“.
export const venue = {
  name: "", // z. B. "Café Muster"
  address: "", // z. B. "Maximilianstraße 1, 86150 Augsburg"
  mapsUrl: "", // Google Maps → Teilen → Link kopieren
};
