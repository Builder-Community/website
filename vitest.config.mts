import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Wir testen reine Logik (Termine, Zustände, Farben), keine React-Komponenten.
// Deshalb reicht die Node-Umgebung, ohne jsdom oder Testing Library.
export default defineConfig({
  resolve: {
    alias: {
      // Gleicher Import-Alias wie in tsconfig.json: "@/lib/…" statt "../../lib/…"
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // Dateien in content/ sind „server-only“ und würden außerhalb von Next.js
      // abbrechen. In Tests ersetzen wir die Sperre durch eine leere Datei.
      "server-only": fileURLToPath(
        new URL("./node_modules/server-only/empty.js", import.meta.url),
      ),
    },
  },
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
