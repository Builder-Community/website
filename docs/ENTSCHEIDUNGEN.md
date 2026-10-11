# Entscheidungen

Was wir festgelegt haben und wo wir bewusst vom [Brief](BRIEF.md) abweichen, jeweils mit Begründung.
Neueste Einträge oben.

## 2026-10-10 · Teaser-Text

- Überschrift „Etwas Neues kommt nach Augsburg.“ statt „Etwas startet in Augsburg.“ (Brief):
  klingt natürlicher und hält die Neugier offen. Verworfen: „Eine neue Community startet in Augsburg.“,
  weil es verrät, was es ist, und austauschbar klingt (es gibt viele Communities). Ein Teaser soll eine
  Frage öffnen, die erst der 08.11. beantwortet.
- „Wir verraten alles am“ steht klein über dem großen Datum. Ohne diese Zeile war unklar, dass am 08.11.
  nur die Enthüllung kommt und nicht schon das erste Treffen (28.11.).
- Die Teaser-Überschrift ist eine Stufe kleiner als die H1 der Hauptseite (text-teaser-title). So steht
  sie ab 360 px in zwei Zeilen, und der Teaser passt ohne Scrollen auf einen Bildschirm. Blickfang ist das
  große orange Datum.

## 2026-10-10 · Zustand „placeholder“ vor dem Teaser

Neu gegenüber dem Brief: Bis in `content/campaign.ts` ein `teaserAt` steht, zeigt die Startseite eine ruhige
Platzhalterseite. Der Teaser lässt sich nur freischalten, wenn Impressum und Datenschutz vollständig sind;
sonst bricht der Build ab.

## 2026-10-10 · GitHub-Organisation und E-Mail

- Code liegt in der Organisation **Builder-Community** als Repo `website` (vorher im persönlichen Account
  johannesbrix). Die Organisation gehört dem Account johannesbrix (Owner).
- Kontaktadresse ist **hello@builder.community**, passend zur englischen Marke und zum Wachstum in weitere
  Städte. hallo@builder.community landet im selben Postfach.

## 2026-10-09 · Hero: Variante A, Inhalt oben, so hoch wie der Inhalt

Johannes' Vorgabe: so entscheiden, wie Steve Krug („Don't make me think“) es tun würde.

- **Variante A (rein typografisch).** Variante B mit großem B unten rechts sah auf einem echten iPhone in
  Safari auf den ersten Blick genauso aus wie A: Das B braucht über 700 px sichtbare Höhe und erschien erst
  beim Scrollen. Es hätte keine Information hinzugefügt.
- **Inhalt steht oben**, dort, wo der Blick beginnt, statt unten mit leerem Bereich darüber.
- **Kein bildschirmfüllender Hero** (Abweichung vom Brief: `min-height: 100svh`). Der Hero ist so hoch wie
  sein Inhalt. Auf großen Handys schaut die nächste Sektion herein, damit niemand die Seite für zu Ende hält
  („falscher Boden“). Auf kleinen Handys ändert sich nichts, dort ist der Inhalt ohnehin höher als der
  Bildschirm.
- **„Side Project Saturday“ in vollem Creme** statt gedimmt: Wer vom Instagram-Reel kommt, sucht genau diesen
  Namen.
- Ob das große B ab Tablet/Desktop auftaucht, wird beim Desktop-Layout (Etappe 3) mit demselben Maßstab
  entschieden.

## 2026-10-09 · Schrift der Überschriften: Bricolage Grotesque

Im direkten Vergleich mit Schibsted Grotesk dynamischer und charakterstärker; passt zum handgezeichneten B.

## 2026-10-09 · Wann und Wo als kleine Tabelle

Statt „Jeden Samstag · 9–12 Uhr · Augsburg Innenstadt“ als Zeile: zwei Spalten mit Beschriftung (WANN, WO)
und darunter das erste bzw. nächste Treffen. Schneller zu erfassen, Inhalt unverändert.

## 2026-10-09 · Button passt ab 360 px in eine Zeile

„WhatsApp-Community beitreten“ bleibt 19 px fett (nötig für den Kontrast Navy auf Orange), bekommt aber eine
minimal engere Laufweite und weniger Innenabstand. Gemessen: 296,5 px Text in 304 px Platz bei 360 px Breite.

## 2026-10-09 · Fokus-Ring und Links auf hellen Flächen in Navy

Der Brief sieht Sky für Fokus-Ringe und Links vor. Sky auf Creme hat aber nur 1,1:1 Kontrast und wäre
unsichtbar. Deshalb setzen die Flächen (`surface-navy`, `surface-cream`, `surface-sky`) die Farben passend:
auf Navy Sky, auf Creme und Sky Navy.

## 2026-10-09 · Caching mit „use cache“ statt `export const revalidate`

Next.js 16.4 aktiviert standardmäßig das neue Modell „Cache Components“; das alte fällt mit der nächsten
Hauptversion weg. Das Ziel aus dem Brief bleibt gleich (statische Seite, höchstens alle 5 Minuten neu erzeugt),
geschrieben wird es als `"use cache"` mit `cacheLife`.

## 2026-10-09 · Zwei Root-Layouts für Deutsch und Englisch

`app/(de)/` und später `app/(en)/`, jeweils mit eigenem `<html lang>`. Routengruppen stehen nicht in der URL,
Datei und Adresse entsprechen sich also eins zu eins. Der offizielle Weg mit `app/[lang]/` hätte
Umschreib-Regeln gebraucht, damit Deutsch ohne `/de` unter `/` erreichbar bleibt.

## 2026-10-09 · Reihenfolge: Teaser vorgezogen, Domain zum Start

Der Teaser muss bis ca. 20.10. live sein; im Brief kam die Domain erst in Etappe 9. Fahrplan: Issue #10.

## 2026-10-09 · Projektordner außerhalb von OneDrive

Code liegt in `C:\Users\Johannes\Projekte\builder-community`, weil OneDrive sonst `node_modules` und den
Build-Ordner synchronisieren und Dateien sperren würde. Backup ist GitHub.
