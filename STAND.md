# Glass Home – Arbeitsstand

Stand 23.10.2026, Version 0.6.0 (`dist/glass-home.js`, Doku im README.md).
Konzept: https://claude.ai/artifact/4R87DLWZevJCfrfkQHH4v9 · Mockups: `../mockups_kunde/` (Design Graphit gewählt).

## Testumgebung
- Proxmox-VM mit HAOS, Hostname `ha-test`, Demo-Integration, Studio Code Server.
- Datei liegt in `/config/www/glass-home/`, Ressource `/local/glass-home/glass-home.js?v=<Version>`.
- Theme `glass_home_graphit` in `/config/themes/`.
- Mocks ohne HA: `test/mock.html` (Licht/Rollo), `test/mock_kunde1.html` (PV + Müll).

## In echtem HA getestet
- Raumkarte, Kopfzeile, Navigation, Statuskacheln mit Popup (Flackern in 0.4.2 behoben, Rückmeldung offen).

## Nur im Mock getestet
- Energie, Müll (0.5.0) – Dominik hat eingebaut, Ergebnis-Screenshot offen.
- Automatisches Dashboard (Strategie, 0.6.0) – noch nicht ausprobiert.

## Entscheidungen
- Keine Szenenleiste auf der Startseite, stattdessen Statuskacheln mit Popup (Szenenkarte bleibt optional).
- Lichter/Rollos zählen überall alle sichtbaren, Temperatur nur mit Bereich.

## Nächste Schritte
1. Strategie in HA testen (Spaltenbreiten prüfen).
2. Einkauf/Termine-Karte.
3. GitHub-Repo `glass-home` anlegen (Dominik), HACS-Release.
