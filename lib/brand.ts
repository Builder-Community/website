// Markenfarben für Stellen, die kein CSS lesen können:
// Browserleiste (themeColor), Linkvorschau (OG-Bild) und Web-App-Manifest.
// Die Werte müssen mit den Tokens in app/globals.css übereinstimmen.
// lib/brand.test.ts prüft das bei jedem Testlauf.
export const colors = {
  navy: "#192A3D",
  orange: "#FC4C02",
  cream: "#F1F1D4",
  ink: "#373634",
  sky: "#CAE9FF",
} as const;

export type BrandColor = keyof typeof colors;
