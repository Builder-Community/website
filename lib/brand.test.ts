import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { colors, type BrandColor } from "./brand";
import { contrastRatio } from "./contrast";

// WCAG-Mindestwerte
const NORMAL_TEXT = 4.5;
const LARGE_TEXT = 3; // ab 24px, oder ab 19px fett
const UI_ELEMENT = 3; // Fokus-Ringe, Rahmen, Grafik

describe("Markenfarben", () => {
  test("lib/brand.ts und die Tokens in app/globals.css stimmen überein", () => {
    const css = readFileSync(
      new URL("../app/globals.css", import.meta.url),
      "utf8",
    );
    const tokens = Object.fromEntries(
      [...css.matchAll(/--color-(\w+):\s*(#[0-9a-f]{6})/gi)].map(
        ([, name, hex]) => [name, hex.toUpperCase()],
      ),
    );
    expect(tokens).toEqual(colors);
  });
});

describe("Kontraste aus dem Brief (Abschnitt 5)", () => {
  // [Vordergrund, Hintergrund, Mindestwert, wofür]
  const rules: [BrandColor, BrandColor, number, string][] = [
    ["cream", "navy", NORMAL_TEXT, "Fließtext auf Navy"],
    ["ink", "cream", NORMAL_TEXT, "Fließtext auf Creme"],
    ["sky", "navy", NORMAL_TEXT, "Links auf Navy"],
    ["navy", "sky", NORMAL_TEXT, "Zitat-Sektion"],
    ["navy", "orange", LARGE_TEXT, "Label des Haupt-Buttons (fett, ab 19px)"],
    [
      "orange",
      "navy",
      LARGE_TEXT,
      "orange Schrift auf Navy (nur groß oder fett)",
    ],
    ["sky", "navy", UI_ELEMENT, "Fokus-Ring auf Navy"],
    ["navy", "cream", UI_ELEMENT, "Fokus-Ring auf Creme"],
    ["navy", "sky", UI_ELEMENT, "Fokus-Ring auf Sky"],
  ];

  test.each(rules)(
    "%s auf %s erreicht mindestens %s:1 (%s)",
    (fg, bg, minimum) => {
      expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(
        minimum,
      );
    },
  );

  // Die folgenden Tests halten Entscheidungen aus dem Brief fest, damit klar bleibt, warum.
  test("Orange auf Creme ist selbst für große Schrift zu schwach (nur Grafik)", () => {
    expect(contrastRatio(colors.orange, colors.cream)).toBeLessThan(LARGE_TEXT);
  });

  test("Navy auf Orange hat mehr Reserve als Weiß auf Orange (Button-Label)", () => {
    expect(contrastRatio(colors.navy, colors.orange)).toBeGreaterThan(
      contrastRatio("#FFFFFF", colors.orange),
    );
  });
});
