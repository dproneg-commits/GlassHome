# Glass Home – Arbeitsstand

Stand 07.11.2026, Version 0.9.5 (`dist/glass-home.js`, Doku im README.md).
Konzept: https://claude.ai/artifact/4R87DLWZevJCfrfkQHH4v9 · Mockups: `../mockups_kunde/` (Design Graphit gewählt).

## Umgebungen
- Test-VM 192.168.0.19 (HAOS, Demo-Integration), Eltern-VM 192.168.0.48. Nie `homeassistant.local`.
- Datei in `/config/www/glass-home/`, Ressource `/local/glass-home/glass-home.js?v=<Version>`.
- Theme `glass_home_graphit` in `/config/themes/`, gilt nur in den Glass-Ansichten.
- Mocks ohne HA: `test/mock*.html`.

## Vorlage
- `vorlagen/dashboard.yaml` = Dashboard der Eltern (07.11.2026), gilt als allgemeine Vorlage für alle Kunden.
- Start: Navigation, Kopfzeile (Wetter 7 Tage), Status, Müll, Termine, Temperatur, Kalender. Energie: Energiefluss, Akku, Kacheln und Diagramm mit Zeitraum (Sensoren noch leer). Kamera nur mit Navigation.

## Stand der Karten
- Glass-Raster (12 Spalten) ist Standard-Ansicht, Größen ändert Dominik im Bearbeiten-Modus.
- Im echten HA: Raumkarte, Kopfzeile, Navigation, Status, Müll, Kalender, Temperatur (Eltern).
- Strategie (automatisches Dashboard) nur im Mock geprüft.
- 0.9.5 Energie-Seite (Energiefluss, Akku, Zeitraum Heute bis Jahr): nur im Mock `test/mock_energie.html` geprüft, noch nicht eingespielt. Entitäten (PV, Netz, Haus, Akku-Leistung und -Ladestand) kommen von Dominik, dann auf der Test-VM in 1280×800 testen. Akku muss im Energie-Dashboard als Batterie eingetragen sein.

## Entscheidungen
- Keine Szenenleiste auf der Startseite, stattdessen Statuskacheln mit Popup.
- Lichter/Rollos zählen alle sichtbaren, Temperatur nur mit Bereich.

## Offen
1. Energie: Entitäten eintragen und auf der Test-VM testen. Seite Kamera füllen.
2. Einspiel-Skript (scp + Ressource `?v=`) für Claude am PC.
3. HACS-Release.
