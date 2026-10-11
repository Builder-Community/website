import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Neues Caching-Modell von Next.js 16: Was gecacht wird, steht mit "use cache"
  // direkt im Code. Beides ist Standard bei neuen Projekten und wird mit der
  // nächsten Hauptversion fest eingebaut.
  cacheComponents: true,
  partialPrefetching: true,

  // Zwischenspeicher-Profil für alles, was nach Datum umschaltet (Startseite,
  // Titel, Linkvorschau). Genutzt mit cacheLife("campaign"):
  // - revalidate 300: höchstens alle 5 Minuten neu erzeugen (wie im Brief)
  // - expire 600:     nie eine Fassung zeigen, die älter als 10 Minuten ist,
  //                   auch wenn lange niemand die Seite aufgerufen hat
  // - stale 300:      so lange darf der Browser seine Kopie ohne Rückfrage nutzen
  cacheLife: {
    campaign: { stale: 300, revalidate: 300, expire: 600 },
  },

  // Kein „X-Powered-By: Next.js“-Header: verrät unnötig Details über den Server.
  poweredByHeader: false,

  // Nur im Entwicklungsmodus: Das Handy im selben WLAN darf die Seite laden
  // (npm run dev:lan). Erlaubt sind lokale Netzwerkadressen wie 192.168.x.x;
  // manche WLANs vergeben auch Adressen im Bereich 100.x.x.x.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "100.*.*.*"],

  turbopack: {
    // Projektstamm ausdrücklich festlegen. Sonst sucht Next.js nach oben nach
    // einer package-lock.json und stolpert über Dateien außerhalb des Projekts.
    root: path.resolve(__dirname),
    // Tailwind CSS v4 wird direkt von Turbopack verarbeitet (ohne PostCSS-Datei).
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
