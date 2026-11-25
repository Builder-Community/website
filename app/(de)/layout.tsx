import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { colors } from "@/lib/brand";
import "../globals.css";

// Root-Layout für alle deutschen Seiten. Der Ordnername „(de)“ in Klammern ist
// eine Routengruppe: Er taucht nicht in der URL auf (app/(de)/page.tsx ist „/“),
// erlaubt aber ein eigenes <html lang="de">. Englisch bekommt später „(en)“.

// Schriften lädt next/font beim Build herunter und liefert sie von unserer
// eigenen Domain aus: kein Request an Google (DSGVO), kein Springen beim Laden.

// Überschriften. „opsz“ ist die optische Größe: Große Überschriften bekommen
// automatisch die charakterstärkere Display-Form der Schrift.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
});

// Fließtext. DM Sans gibt es auch in Canva, so nutzen Website und
// Social-Media-Grafiken dieselben zwei Schriften. Auch hier passt „opsz“ die
// Form an die Größe an: Kleine Schrift wird etwas offener und besser lesbar.
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "builder.community",
};

export const viewport: Viewport = {
  // Die Browserleiste auf dem Handy wird Navy.
  themeColor: colors.navy,
  // Die Seite darf unter Notch und Home-Indikator reichen. Die nötigen Abstände
  // setzen wir selbst mit env(safe-area-inset-*).
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Die Font-Klassen gehören an <html>, damit ihre CSS-Variablen dort liegen,
    // wo Tailwind sie liest (:root). Siehe app/globals.css.
    <html lang="de" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
