# builder.community · Website

Website von **Side Project Saturday**, dem wöchentlichen Treffen der Augsburg Builder Community:
jeden Samstag von 9 bis 12 Uhr in einem Café in der Augsburger Innenstadt.

Produktion: [augsburg.builder.community](https://augsburg.builder.community) ·
Anforderungen: [docs/BRIEF.md](docs/BRIEF.md)

## Loslegen

Voraussetzung: Node.js 22 (siehe `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run dev:lan    # im Heimnetz erreichbar: auf dem Handy http://<IP-des-Laptops>:3000
```

## Befehle

| Befehl               | Was er tut                                                            |
| -------------------- | --------------------------------------------------------------------- |
| `npm run dev`        | Entwicklungsserver mit Live-Neuladen                                  |
| `npm run build`      | Produktions-Build, genau so baut auch Vercel                          |
| `npm run check`      | Alles prüfen: Lint, Typen, Formatierung, Tests (läuft auch in der CI) |
| `npm run format`     | Code automatisch formatieren                                          |
| `npm run test:watch` | Tests bei jeder Änderung neu ausführen                                |

## Wo was steht

```
app/              Seiten und Routen (Next.js App Router)
  (de)/           deutsche Seiten mit eigenem <html lang="de">; „(de)“ steht nicht in der URL
  globals.css     Design-Tokens: Farben, Schriften, Radius, Flächen, Bewegung
components/       Bausteine der Seite, z. B. BMark (das B)
lib/              Logik ohne Oberfläche, mit Tests daneben (*.test.ts)
public/brand/     Logo-Dateien
docs/             Brief
```

## Arbeitsweise

- `main` ist die Produktion. Jede Etappe läuft auf einem eigenen Branch und kommt per Pull Request nach `main`.
- Vercel baut jeden Pull Request und hängt eine Vorschau-URL an. Mergen heißt: freigegeben.
- GitHub Actions prüft jeden Pull Request (`npm run check`).

## Bekannte Hinweise

- `npm audit` meldet 5 „high“-Warnungen. Alle stammen aus dem Paket `braces` im ESLint-Plugin von Next.js.
  Das läuft nur beim Entwickeln und landet nie auf der Website. Der vorgeschlagene Fix
  (`npm audit fix --force`) würde `eslint-config-next` auf Version 14 zurücksetzen, deshalb warten wir
  auf ein Update von Next.js.
