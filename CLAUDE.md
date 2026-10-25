# Hinweise für Claude

@AGENTS.md

- Projekt: Website für Side Project Saturday (Munich Builder Community, munich.builder.community). Alle Anforderungen: `docs/BRIEF.md`; wo Brief und Entscheidungslog sich widersprechen, gilt das Entscheidungslog.
- Getroffene Entscheidungen und Abweichungen vom Brief: `docs/ENTSCHEIDUNGEN.md`. Neue Abweichungen dort eintragen.
- Gestaltungsmaßstab von Johannes: „Don't make me think“ (Steve Krug).
- Johannes lernt den Stack: Entscheidungen knapp erklären, lesbaren Code ohne Magie schreiben.
- Sprache: Kommunikation, Commits, Pull Requests und Code-Kommentare auf Deutsch; Bezeichner im Code auf Englisch.
- Texte, Termine, Ort und Links gehören nach `content/`, nie hart in Komponenten.
- Farben, Schriften und Radius nur über die Tokens in `app/globals.css`.
- Mobile first: jede Änderung zuerst bei 360–430 px Breite prüfen.
- Vor jedem Commit `npm run check` ausführen.
- Workflow: ein Branch pro Etappe, Pull Request nach `main`, Johannes gibt frei.
