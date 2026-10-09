import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Wir testen reine Logik (Termine, Zustände, Farben), keine React-Komponenten.
// Deshalb reicht die Node-Umgebung, ohne jsdom oder Testing Library.
export default defineConfig({
  resolve: {
    // Gleicher Import-Alias wie in tsconfig.json: "@/lib/…" statt "../../lib/…"
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
