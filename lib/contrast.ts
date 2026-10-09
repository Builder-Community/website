// Kontrastverhältnis zweier Farben nach WCAG 2.x.
// Formel: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
// Ergebnis zwischen 1 (kein Kontrast) und 21 (Schwarz auf Weiß).

// Wandelt einen sRGB-Kanal (0–255) in einen linearen Helligkeitswert um.
function linearChannel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

// Relative Leuchtdichte einer Farbe im Format "#RRGGBB".
export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) {
    throw new Error(`Keine gültige Farbe im Format #RRGGBB: ${hex}`);
  }
  const [r, g, b] = match.slice(1).map((pair) => parseInt(pair, 16));
  return (
    0.2126 * linearChannel(r) +
    0.7152 * linearChannel(g) +
    0.0722 * linearChannel(b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (lighter + 0.05) / (darker + 0.05);
}
