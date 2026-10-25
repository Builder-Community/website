# Side Project Saturday · Website-Brief

**Für:** Claude Code · **Von:** Johannes · **Stand:** 9. Oktober 2026
**Domain:** augsburg.builder.community · **Kontakt:** hello@builder.community

> **Update 25. Oktober 2026:** Die Community startet in **München** statt Augsburg (Domain
> munich.builder.community). Launch am 01.01.2027, erstes Treffen am 09.01.2027. Wo dieser Brief Augsburg
> oder Novembertermine nennt, gilt [ENTSCHEIDUNGEN.md](ENTSCHEIDUNGEN.md).

---

## So arbeitest du mit diesem Brief

1. Lies den Brief vollständig. Stell zuerst deine Fragen, besonders zu Abschnitt 12 (offene Punkte).
2. Arbeite die Etappen aus Abschnitt 11 der Reihe nach ab. Nach jeder Etappe: committen, kurz erklären, was du gemacht hast und warum, und das Ergebnis in Handygröße zeigen.
3. Johannes will den Stack (wieder) lernen. Erkläre Entscheidungen knapp und schreib lesbaren Code ohne Magie.
4. Qualität vor Tempo. Die Seite soll handgemacht und hochwertig wirken, nicht wie ein Template. Im Zweifel: weniger, aber besser.

---

## 1. Worum es geht

builder.community ist eine Community für Menschen, die eigene Projekte umsetzen. Los geht es in Augsburg mit **Side Project Saturday**: Jeden Samstag von 9 bis 12 Uhr trifft man sich in einem Café in der Augsburger Innenstadt, trinkt Kaffee, erzählt von seinen Projekten und arbeitet, wer mag, gemeinsam weiter.

- Nicht nur Tech: Apps genauso wie Run Clubs, Podcasts, Vereine oder Kunstprojekte.
- Kostenlos, ohne Anmeldung.
- Hauptbotschaft: **Gemeinsam sind wir stärker. Der Austausch ist essenziell.**
- Später sollen andere Städte dazukommen können (z. B. muenchen.builder.community). Stadtname, Termine und Ort deshalb nie hart in Komponenten schreiben, sondern in `content/`.

## 2. Was die Seite leisten muss

Wer über Instagram, einen Flyer-QR-Code oder einen WhatsApp-Link kommt, versteht **auf dem Handy in fünf Sekunden**: was das ist, wann und wo, für wen. Und kann mit einem Tipp der WhatsApp-Community beitreten.

Fast alle Besucher kommen mobil. **Mobile first** heißt: zuerst für 360–430 px Breite gestalten und perfektionieren. Desktop ist die Erweiterung.

---

## 3. Zeitplan und Kampagnen-Zustände

Die Website folgt dem Instagram-Fahrplan und darf vor dem Launch nichts verraten. Deshalb schaltet die Seite **automatisch nach Datum** um, ohne neues Deployment.

| Wann | Instagram | Website-Zustand |
|---|---|---|
| ab ca. 20.10. | Teaser-Post: „Am 08.11. verraten wir's." | `teaser` |
| bis 27.10. | Reel gedreht, Posts für 08.11. und 15.11. vorgeplant | **komplette Seite fertig, alle Zustände getestet** |
| So, 08.11. | Reel: Was ist Side Project Saturday? | `launch`: volle Seite, Ort „wird am 15.11. verraten" |
| So, 15.11. | Ort-Drop | `venue`: Ort sichtbar |
| 16.–20.11. | Flyer verteilen, „Augsburg gründet!" am 18.11. | `venue` |
| Sa, 28.11. | Erstes Treffen | ab 28.11., 12 Uhr: `running`, zeigt automatisch den nächsten Samstag |

**Wichtig:** Fest steht nur das erste Treffen am **Sa, 28.11.2026**. Teaser-, Launch- und Reveal-Termine (08.11. / 15.11.) sind vorläufige Platzhalter und werden von Johannes noch angepasst. Deshalb jedes sichtbare Datum (z. B. „08.11.“ im Teaser, „Ort wird am … verraten“, OG-Bild) immer aus `content/campaign.ts` ableiten und nie hart in Texte oder Komponenten schreiben. Eine Terminänderung muss eine Ein-Zeilen-Änderung in `campaign.ts` sein.

**Deadlines:** Teaser live bis ca. 20.10. Die gesamte Seite inklusive aller Zustände fertig und auf echten Handys getestet bis **27.10.**

### Umsetzung

- Der Zustand wird **serverseitig** aus der aktuellen Zeit (Zeitzone `Europe/Berlin`) berechnet. Im Teaser-Zustand wird nur der Teaser gerendert. Spätere Inhalte stehen nicht im ausgelieferten HTML.
- Statische Seite mit **ISR** (`export const revalidate = 300`): Die Seite wird höchstens alle 5 Minuten neu erzeugt und schaltet dadurch von selbst um. Das gilt auch für OG-Bild und Kalender-Datei.
- Alle Zeitpunkte stehen zentral in `content/campaign.ts`, mit Offset (im November gilt `+01:00`):

```ts
export const campaign = {
  timeZone: "Europe/Berlin",
  launchAt: "2026-11-08T18:00:00+01:00",      // = Zeitpunkt des Reels (offen, s. Abschnitt 12)
  venueRevealAt: "2026-11-15T18:00:00+01:00", // = Zeitpunkt des Orts-Posts (offen)
  firstMeetup: "2026-11-28",
  weekly: { weekday: 6, start: "09:00", end: "12:00" }, // 6 = Samstag
  skipDates: ["2026-12-26", "2027-01-02"],              // Ausfälle (offen)
};

export const venue = {
  name: "",     // spätestens bis zum Reveal eintragen
  address: "",
  mapsUrl: "",
};
```

- **Zustände:** `teaser` (vor `launchAt`) → `launch` (bis `venueRevealAt`) → `venue` (bis zum Ende des ersten Treffens) → `running` (danach: der nächste Samstag, der nicht in `skipDates` liegt; samstags vor 12 Uhr ist „heute" der nächste Termin).
- **Fallback:** Ist `venue.name` nach dem Reveal noch leer, steht dort „Ort folgt in Kürze". Nie ein leeres Feld.
- **Vorschau-Route** `/vorschau/[zustand]` (`teaser`, `launch`, `venue`, `running`), damit alle Zustände vorab geprüft werden können. Nur lokal und in Vercel-Previews aktiv (`VERCEL_ENV !== "production"`), in Produktion 404 und `noindex`.
- Ort und Termine kann Johannes unterwegs über github.com im Handy-Browser ändern. Ein Commit löst automatisch ein neues Deployment aus.

---

## 4. Tech-Stack

| Bereich | Wahl | Warum |
|---|---|---|
| Framework | Next.js (aktuelle stabile Version, App Router, TypeScript strict) | Standard für moderne Full-Stack-Entwicklung mit React. Wächst später mit (Anmeldungen, Stadtseiten, Datenbank), ohne dass man neu anfängt |
| Styling | Tailwind CSS v4, Design-Tokens als CSS-Variablen (`@theme`) | schnell und konsistent |
| Komponenten | eigene, schlanke Komponenten. shadcn/ui nur, wenn wirklich nötig, und dann komplett ans Branding angepasst | Der shadcn-Standardlook ist genau der generische Look, den wir vermeiden wollen |
| Schriften | `next/font/google` | wird beim Build selbst gehostet: keine Requests an Google (DSGVO), kein Layout-Shift |
| Animation | CSS + ein kleiner IntersectionObserver, keine Animationsbibliothek | wenige, gezielte Bewegungen |
| Inhalte | TypeScript-Dateien in `content/`, kein CMS, keine Datenbank | Texte ändern, ohne Komponenten anzufassen |
| Tests | Vitest für die Zustands- und Terminlogik | die Logik muss stimmen, während Johannes unterwegs ist |
| Hosting | Vercel, verbunden mit GitHub | jeder Push ein Deployment, jeder Branch eine Vorschau-URL, ISR inklusive |
| Tracking | keins | keine Cookies, kein Cookie-Banner |
| Code-Qualität | ESLint, Prettier | |

---

## 5. Design-Richtung

### Haltung

Ehrlich, warm, selbstbewusst. Premium durch Zurückhaltung, nicht durch Effekte. Das handgezeichnete B bringt das Menschliche hinein, alles andere ist ruhig und präzise.

### Inspiration: nobl.io

Johannes mag den Vibe und die Farbwirkung, findet die Seite aber zu überladen.

- **Übernehmen:** viel Weißraum, große, selbstbewusste Typografie, eine dunkle Grundfarbe mit klarem Akzent, wenige eindeutige Buttons, ruhige Sektionen.
- **Weglassen:** Logo-Laufbänder, GIF-Animationen im Hero, Mega-Menü, mehrere Animationen gleichzeitig.
- Johannes legt 2–3 Screenshots in `design/inspiration/` und notiert, was ihm daran gefällt. Schau sie dir an, bevor du den Hero gestaltest.

### Farben

| Token | Hex | Einsatz |
|---|---|---|
| `navy` | `#192A3D` | Grundfläche: Hero, dunkle Sektionen, Footer |
| `orange` | `#FC4C02` | Akzent: B, Haupt-Button, einzelne Wörter, Markierungen. Sparsam: höchstens 1–2 Orange-Momente pro Bildschirmhöhe |
| `cream` | `#F1F1D4` | Text auf Navy, Hintergrund heller Sektionen |
| `ink` | `#373634` | Text auf Creme |
| `sky` | `#CAE9FF` | zweiter Akzent: Links und Hover auf Navy, Fokus-Ring, Zitat-Sektion |

**Kontraste (nachgerechnet nach WCAG):**

- cream auf navy 12,7:1 · ink auf cream 10,5:1 · sky auf navy 11,5:1 · navy auf sky 11,5:1: alles gut.
- orange auf navy 4,3:1: nur für große oder fette Schrift (ab 24 px, oder ab 19 px fett) und für Flächen.
- **Haupt-Button:** Orange-Fläche mit Label in Navy, fett, mindestens 19 px (4,3:1, zählt als große Schrift). Nicht Weiß auf Orange (nur 3,4:1).
- orange auf cream 3,0:1: **nie für Text**, nur für Grafik (B, Unterstreichungen).

### Typografie

- **Überschriften:** Bricolage Grotesque (variabel), fett (700–800), Laufweite leicht eng (−0.02em). Charakterstark und passend zum handgezeichneten B. Zum Vergleich einmal mit Schibsted Grotesk testen (nüchterner) und Johannes beide Varianten auf dem Handy zeigen.
- **Fließtext:** Instrument Sans, 17–18 px auf dem Handy, Zeilenhöhe ca. 1,55, Zeilenlänge maximal ca. 62 Zeichen.
- Maximal zwei Schriften. Kein Inter, kein Geist (zu generisch).
- Das Font-Subset `latin` reicht (enthält ä, ö, ü, ß).
- Schriftgrößen fließend mit `clamp()`: H1 auf dem Handy ca. 44–52 px, auf dem Desktop bis ca. 112 px.
- Deutsche Typografie: „Anführungszeichen", Halbgeviertstrich bei Zeiträumen (9–12 Uhr), geschützte Leerzeichen (28.&nbsp;November, 9&nbsp;Uhr), `hyphens: auto` mit `lang="de"` nur im Fließtext, `text-wrap: balance` für Überschriften, `text-wrap: pretty` für Absätze.

### Layout, Rhythmus, Formen

- Seitenränder 20 px auf dem Handy, 32 px auf dem Tablet, Inhalt auf dem Desktop maximal ca. 1120 px breit.
- Großzügige Sektionsabstände (Handy ca. 96 px, Desktop ca. 160 px).
- Der Wechsel Navy ↔ Creme gibt den Rhythmus vor, dazu einmal Sky für das Zitat.
- Struktur entsteht über Typografie, Nummern und feine Linien (1 px, z. B. cream mit 15 % Deckkraft auf Navy), nicht über Karten mit Schatten.
- Ecken einheitlich und eher klein (8–12 px) oder ganz eckig. Keine `rounded-3xl`-Karten.
- Keine Fotos, bis echte vom ersten Treffen da sind. Danach 1–3 echte Fotos (Tisch, Kaffee, Hände, Laptops).

### Bewegung: wenig, aber gut

- **Eine Signatur-Bewegung:** Das B erscheint beim Laden wie ein Stempel (Skalierung 1,08 → 1, Deckkraft 0 → 1, ca. 350 ms, ease-out, ohne Federn). Nur im Teaser und im Hero.
- Sektionen blenden beim ersten Sichtbarwerden einmal dezent ein (Deckkraft und 12 px Versatz, ca. 500 ms).
- Buttons: Farbwechsel beim Hover, beim Tippen kurz `scale(0.98)`.
- Bei `prefers-reduced-motion` ist alles aus.
- Sonst nichts: kein Parallax, keine Zähler, keine Laufbänder, keine Partikel.

### Was wir vermeiden (Template- und KI-Look)

Farbverläufe, Glow, Glas-Effekte · Raster aus Feature-Karten mit Icons · Stockfotos, KI-Bilder, 3D-Blobs · Grau-Weiß mit Inter und runden Karten (shadcn-Standard) · Emojis als Icons · Floskeln wie „Unlock your potential".

### Kleine Details mit Wirkung (optional, nach Absprache)

- **Handgezeichnete Akzente:** Johannes zeichnet mit demselben Stift wie beim B einen Unterstrich und einen Kreis, fotografiert sie, und du vektorisierst sie (z. B. mit potrace). Einsatz höchstens zwei- bis dreimal: Unterstrich unter „Gemeinsam", Kreis ums Datum.
- **Projekt-Beispiele als Sticker:** Die Beispiel-Tags (App, Run Club …) leicht unterschiedlich gedreht (±2°), wie Sticker auf einem Laptop.

---

## 6. Seitenstruktur und Texte (Deutsch)

Die Texte sind Entwürfe von Johannes und Claude. Sie stehen in `content/de.ts` und dürfen sprachlich geschliffen, aber inhaltlich nicht verändert werden.

### Zustand `teaser`

Ein einziger Bildschirm, Navy, alles zentriert:

- B, groß, mit Stempel-Effekt
- „Etwas startet in Augsburg."
- optional: „Für alle, die eine Idee zum Leben erwecken wollen."
- „08.11." groß in Orange
- Button: „Auf Instagram folgen"
- klein unten: Impressum · Datenschutz

### Hauptseite (`launch`, `venue`, `running`)

**Kopfzeile**
B (ca. 32 px) und „builder.community", rechts der Sprachumschalter „DE / EN". Kein Menü nötig.

**1 · Hero (Navy, `min-height: 100svh`)**
Auf einem iPhone (390 × 844) muss ohne Scrollen sichtbar sein: Name, was es ist, wann und wo, Button.

- Kleine Zeile darüber: Side Project Saturday
- H1: Augsburg Builder Community
- Lead: Einmal pro Woche treffen wir uns, um mit unseren eigenen Projekten Augsburg, Deutschland und die Welt ein Stück besser zu machen.
- Fakten: Jeden Samstag · 9–12 Uhr · Augsburg Innenstadt
- Termin-Hinweis je nach Zustand: „Erstes Treffen: Sa, 28. November" bzw. „Nächstes Treffen: Sa, 5. Dezember"
- Haupt-Button: WhatsApp-Community beitreten
- Zweiter Link: Instagram ansehen →
- Variante B (siehe Etappe 2): großes B als Bildmotiv, unten rechts angeschnitten, nie hinter Text

**2 · Worum es geht (Creme)**

- H2: Gemeinsam sind wir stärker.
- Text: Wir bauen an Dingen, die uns begeistern, und schaffen damit einen Mehrwert für unsere Zukunft und die Gemeinschaft. Dafür musst du nichts mit Code am Hut haben. Du brauchst nur den inneren Antrieb, eine Idee zum Leben zu erwecken – das Umfeld, das dich dabei unterstützt, findest du hier. Denn der Austausch ist das, was Ideen wirklich weiterbringt.
- Zeile: Woran hier gebaut wird, zum Beispiel:
- Tags: App · Run Club · Podcast · Startup · Kunstprojekt · Verein · Event-Reihe · etwas, das noch keinen Namen hat

**3 · So läuft ein Samstag**
Drei Schritte mit großen Ziffern 01 / 02 / 03:

1. **Ankommen & Kaffee:** Ab 9 Uhr. Bestell dir was und setz dich dazu.
2. **Über Projekte reden:** Alle erzählen kurz, woran sie gerade arbeiten. Fragen, Feedback, Kontakte.
3. **Gemeinsam weiterbauen:** Wer mag, bleibt und arbeitet am eigenen Projekt weiter, neben Leuten, die dasselbe tun. Bis 12 Uhr.

**4 · Nächstes Treffen (Navy, Orange-Akzent)**

- `launch`: Samstag, 28. November 2026 · 9–12 Uhr · Ort: wird am [Reveal-Datum] verraten. Dazu der Link „Folge uns auf Instagram, um es zuerst zu erfahren".
- `venue`: Samstag, 28. November 2026 · 9–12 Uhr · [Café-Name], [Adresse] · „Route öffnen"
- `running`: nächster Samstag (automatisch berechnet), Ort aus `venue`, dazu die Zeile „Danach jeden Samstag".
- Buttons: In Kalender speichern (`.ics`) · Google Kalender

**5 · Zitat (Sky, Text in Navy)**

> „Wenn man vertrauensvoll in Richtung seiner Träume voranschreitet und sich bemüht, das Leben zu verwirklichen, das man sich vorstellt, werden sich Erfolge einstellen, die man in gewöhnlichen Stunden nicht für möglich hielt."
> — Henry David Thoreau, *Walden* (1854)

Die Quelle ist geprüft: Das Zitat stammt aus dem Schlusskapitel von Thoreaus *Walden*. Es wird oft anderen Autoren zugeschrieben, bitte nicht ändern.

**6 · Fragen & Antworten (Creme)**
Als aufklappbare Liste, am besten mit nativem `<details>`/`<summary>` (barrierefrei, funktioniert ohne JavaScript):

- **Muss ich etwas mitbringen?** Nur Offenheit für die Ideen anderer und Lust, dich inspirieren zu lassen. Wenn du an deinem Projekt arbeiten willst, nimm Laptop oder Notizbuch mit.
- **Was kostet das?** Nichts. Nur deinen Kaffee zahlst du selbst.
- **Muss ich mich anmelden?** Nein, komm einfach vorbei. In der WhatsApp-Community erfährst du, wenn sich etwas ändert.
- **Brauche ich schon ein Projekt?** Nein. Eine Idee reicht, oder einfach Neugier. Manche Projekte entstehen erst am Tisch.
- **Ist das nur was für Tech-Leute?** Nein. Ob App, Run Club, Podcast oder Verein: Es geht darum, eine Idee umzusetzen, nicht um Technik.
- **Muss ich die ganzen drei Stunden bleiben?** Nein. Komm, wann du kannst, und geh, wann du musst.
- **In welcher Sprache läuft das?** Deutsch und Englisch, je nachdem, wer am Tisch sitzt.
- **Kann ich Freunde mitbringen?** Unbedingt.

**7 · Kontakt (Navy)**

- H2: Fragen? Schreib uns.
- Text: Ob Frage zum Ablauf oder Lust, Side Project Saturday in deiner Stadt zu starten – wir freuen uns auf deine Nachricht.
- Button „Frage stellen" → `mailto:hello@builder.community?subject=Frage%20zu%20Side%20Project%20Saturday`
- Button „In meiner Stadt starten" → `mailto:hello@builder.community?subject=Side%20Project%20Saturday%20in%20meiner%20Stadt`
- Die Adresse zusätzlich als kopierbarer Text: hello@builder.community

**Fußzeile**
B und builder.community · Instagram · hello@builder.community · Impressum · Datenschutz
Kleine Zeile: Gebaut an einem Samstag in Augsburg.

**Mobile Leiste (dezent, optional)**
Nach dem Hero erscheint eine schmale Leiste am unteren Rand: „Sa, 28.11. · 9 Uhr" und Button „Beitreten". Über dem Kontakt-Bereich blendet sie sich aus. Sie berücksichtigt `env(safe-area-inset-bottom)`. Wenn sie aufdringlich wirkt: weglassen.

---

## 7. Englische Version (`/en`)

Deutsch ist Standard (`/`), Englisch liegt unter `/en`. Beide Wörterbücher teilen sich einen TypeScript-Typ, damit fehlende Übersetzungen beim Build auffallen. `hreflang`-Links setzen, `lang`-Attribut pro Sprache, Datumsformat über `Intl.DateTimeFormat` mit Zeitzone `Europe/Berlin`. Impressum und Datenschutz gibt es nur auf Deutsch.

- **Teaser:** Something is starting in Augsburg. · For everyone who wants to bring an idea to life. · 8 Nov · Follow on Instagram
- **Hero:** Side Project Saturday · Augsburg Builder Community · Once a week, we meet up to make Augsburg, Germany and the world a little better with our own projects. · Every Saturday · 9 am–12 pm · Augsburg city centre · First meetup: Sat, 28 November / Next meetup: Sat, 5 December · Join the WhatsApp community · See Instagram →
- **About:** Stronger together. · We build things we're excited about and create value for our future and our community. You don't need to know anything about code. All you need is the drive to bring an idea to life – you'll find the people who support you here. Because sharing ideas is what really moves them forward. · People build things like: App · Run club · Podcast · Startup · Art project · Club · Event series · something that doesn't have a name yet
- **How a Saturday works:** 01 Arrive & grab a coffee: From 9 am. Order something and join the table. · 02 Talk about projects: Everyone shares briefly what they're working on. Questions, feedback, contacts. · 03 Keep building together: Stay and work on your own project next to people doing the same. Until 12.
- **Next meetup:** Saturday, 28 November 2026 · 9 am–12 pm · Location: revealed on [reveal date] · Follow us to find out first · Open route · Every Saturday after that · Add to calendar · Google Calendar
- **Quote:** "If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours." — Henry David Thoreau, *Walden* (1854)
- **FAQ:**
  - Do I need to bring anything? Just an open mind for other people's ideas and the will to be inspired. If you want to work on your project, bring a laptop or notebook.
  - What does it cost? Nothing. You only pay for your own coffee.
  - Do I need to sign up? No, just come by. The WhatsApp community lets you know if anything changes.
  - Do I need a project already? No. An idea is enough, or just curiosity. Some projects start at the table.
  - Is this only for tech people? No. App, run club, podcast or club: it's about bringing an idea to life, not about technology.
  - Do I have to stay all three hours? No. Come when you can, leave when you need to.
  - Which language? German and English, depending on who's at the table.
  - Can I bring friends? Absolutely.
- **Contact:** Questions? Write to us. · Whether you have a question about the format or want to start Side Project Saturday in your city – we'd love to hear from you. · Ask a question · Start it in my city
- **Footer:** Built on a Saturday in Augsburg.

---

## 8. Technische Details, die den Unterschied machen

- **Viewport:** `viewportFit: "cover"`, `themeColor: "#192A3D"` (die Browserleiste auf dem Handy wird Navy).
- Hero mit `100svh` statt `100vh`, damit nichts springt, wenn die Browserleiste ein- und ausfährt.
- Tippflächen mindestens 44 × 44 px, kein horizontales Scrollen, Test ab 360 px Breite.
- Sichtbare Fokus-Ringe (sky), Skip-Link „Zum Inhalt springen", genau eine H1 pro Seite.
- **Meta:** Titel „Side Project Saturday · Augsburg Builder Community", Beschreibung „Jeden Samstag 9–12 Uhr in der Augsburger Innenstadt: Kaffee, Austausch und Zeit für eigene Projekte. Kostenlos, ohne Anmeldung." Im Teaser: „Augsburg Builder Community · 08.11." und „Etwas startet in Augsburg." Jeweils auch auf Englisch.
- **Link-Vorschau:** OG-Bild 1200 × 630 mit `next/og` im Branding (Navy, B, „Side Project Saturday · Augsburg · Samstags 9–12 Uhr"), im Teaser eine eigene Version mit „08.11.". Das OG-Bild muss mit dem Zustand wechseln.
- **Kalender:** Route `/termin.ics` für das nächste Treffen (Zeiten in UTC, stabile UID, Ort sobald bekannt), dazu ein Google-Kalender-Link.
- **Strukturierte Daten:** JSON-LD `Event` für das nächste Treffen, sobald der Ort bekannt ist (`isAccessibleForFree: true`, `eventAttendanceMode: OfflineEventAttendanceMode`).
- **Icons:** `app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico` und ein Manifest mit den maskable Icons. Alle Dateien liegen bei (siehe Abschnitt 10).
- Eigene 404-Seite im Branding.
- Alle Links zentral in `content/links.ts` (WhatsApp, Instagram, Mail).
- Keine eingebetteten Fremdinhalte (kein Instagram-Feed, keine Google-Maps-Karte), nur Links. So fließen beim Seitenaufruf keine Daten an Dritte.

---

## 9. Recht und Datenschutz (Hinweise, kein Rechtsrat)

- **Impressum** (`/impressum`): Name, ladungsfähige Anschrift, E-Mail. Johannes klärt, ob er seine eigene Adresse oder einen Impressum-Adressdienst nutzt.
- **Datenschutzerklärung** (`/datenschutz`): mit einem Generator erstellen (z. B. datenschutz-generator.de oder eRecht24). Relevante Punkte: Hosting bei Vercel (Server-Logs), Kontakt per E-Mail, Links zu WhatsApp und Instagram, keine Cookies, selbst gehostete Schriften.
- Beide Seiten müssen aus jedem Zustand erreichbar sein, auch aus dem Teaser.

---

## 10. Projektstruktur (Vorschlag)

```
app/
  layout.tsx                    Fonts, Metadaten, Viewport
  page.tsx                      Deutsch, zustandsabhängig, revalidate = 300
  en/page.tsx                   Englisch
  vorschau/[zustand]/page.tsx   nur lokal und in Previews
  termin.ics/route.ts
  opengraph-image.tsx
  impressum/page.tsx
  datenschutz/page.tsx
  not-found.tsx
  icon.svg · apple-icon.png · favicon.ico · manifest.ts
components/                     Header, Hero, About, Steps, NextMeetup, Quote, Faq, Contact, Footer, Teaser …
content/
  de.ts · en.ts                 alle Texte
  campaign.ts                   Zeitpunkte, Wochenrhythmus, Ausfälle
  venue.ts                      Ort
  links.ts                      WhatsApp, Instagram, Mail
lib/
  state.ts                      Zustandslogik und nächster Termin (mit Vitest-Tests)
public/brand/                   Logo-SVGs
design/inspiration/             Screenshots von Johannes
```

**Logo-Dateien** (liegen als `builder-community-brand.zip` bei):

- `svg/b-mark.svg` (Orange), `b-mark-navy.svg`, `b-mark-cream.svg`, `b-mark-currentcolor.svg` (übernimmt die Textfarbe, ideal zum Inline-Einbinden)
- `svg/icon.svg` → `app/icon.svg`
- `png/apple-icon.png` → `app/apple-icon.png`
- `png/favicon.ico` → `app/favicon.ico`
- `png/icon-192-maskable.png`, `png/icon-512-maskable.png` → Manifest
- Das B ist aus dem handgezeichneten Original vektorisiert. Bitte nicht nachzeichnen oder „glätten", die Unregelmäßigkeit ist gewollt.

**Tests für `lib/state.ts`** (mindestens): jeder Zustandswechsel genau an seinem Zeitpunkt, Samstag 11:59 vs. 12:01, übersprungene Termine in `skipDates`, Jahreswechsel, Sommer-/Winterzeit.

---

## 11. Etappen

1. **Setup:** Next.js, TypeScript, Tailwind, ESLint/Prettier, Vitest. GitHub-Repo und Vercel-Projekt (Preview-Deployments). Tokens (Farben, Abstände, Radien), Schriften, Logo-Dateien.
2. **Hero auf dem Handy:** zwei Varianten bei 390 px Breite. A: rein typografisch. B: mit großem, angeschnittenem B. Johannes entscheidet, erst dann geht es weiter.
3. **Restliche Sektionen** auf Deutsch: erst Handy, dann Tablet und Desktop.
4. **Zustände:** `lib/state.ts` mit Tests, Teaser-Seite, Vorschau-Route, ISR.
5. **Englisch:** `/en`, Sprachumschalter, hreflang.
6. **Termin-Extras:** `.ics`, Google-Kalender-Link, JSON-LD.
7. **Meta:** Titel, Beschreibungen, OG-Bilder (Teaser und Hauptseite), Icons, Manifest, theme-color, 404.
8. **Recht:** Impressum, Datenschutz.
9. **Domain:** `augsburg.builder.community` als Produktion, `builder.community` und `www.builder.community` leiten vorerst dorthin weiter. Beim DNS-Anbieter nur ergänzen: Die bestehenden Zoho-Mail-Einträge (MX, SPF, DKIM) bleiben unverändert.
10. **QA:** Checkliste aus Abschnitt 13.

**Tipp für Johannes:** Mit `npm run dev -- --hostname 0.0.0.0` ist die Seite im Heimnetz erreichbar. Dann auf dem Handy `http://<IP-des-Laptops>:3000` öffnen und live mitschauen.

---

## 12. Offene Punkte (Johannes)

1. Instagram-Handle
2. Link zur WhatsApp-Community (bis dahin Platzhalter)
3. Impressum: eigene Adresse oder Adressdienst?
4. Bei welchem Anbieter liegt builder.community (für DNS)?
5. Genaue Termine und Uhrzeiten von Teaser, Launch-Post und Ort-Drop (das sind die Umschaltzeitpunkte; aktuell Platzhalter 08.11. und 15.11., jeweils 18:00 Uhr)
6. Ort: spätestens vor dem Ort-Drop eintragen (aktuell noch offen)
7. Ausfälle über Weihnachten und Neujahr: 26.12. und 02.01.?
8. Optional: handgezeichnete Akzente, Fotos ab dem ersten Treffen

---

## 13. Definition of Done

- [ ] Auf echtem iPhone und Android-Handy geprüft (360–430 px), außerdem Tablet und Desktop
- [ ] Alle vier Zustände über `/vorschau` auf Deutsch und Englisch geprüft
- [ ] Hero zeigt auf 390 × 844 ohne Scrollen: Name, Beschreibung, Zeit und Ort, Button
- [ ] Lighthouse mobil: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100
- [ ] Kein Layout-Shift beim Laden, keine Requests an fremde Domains (Network-Tab prüfen)
- [ ] Bedienbar per Tastatur mit sichtbaren Fokus-Ringen, `prefers-reduced-motion` respektiert
- [ ] Link-Vorschau in WhatsApp und iMessage getestet (Teaser und Hauptseite)
- [ ] `.ics` auf dem iPhone und in Google Kalender importiert
- [ ] Impressum und Datenschutz aus jedem Zustand erreichbar
- [ ] Alle Texte gegengelesen (Tippfehler, Anführungszeichen, Gedankenstriche)
