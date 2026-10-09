import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Neues Caching-Modell von Next.js 16: Was gecacht wird, steht mit "use cache"
  // direkt im Code. Beides ist Standard bei neuen Projekten und wird mit der
  // nächsten Hauptversion fest eingebaut.
  cacheComponents: true,
  partialPrefetching: true,

  // Kein „X-Powered-By: Next.js“-Header: verrät unnötig Details über den Server.
  poweredByHeader: false,

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
