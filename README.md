# Glass Home

Dashboard-Paket im Glas-Stil für Kundeninstallationen. Stand 0.7.0: automatisches Dashboard, Navigation, Kopfzeile, Status, Energie, Müll, Einkauf & Termine, Szenen, Raumkarte.

Anleitung für Kunden (zum Weitergeben): [docs/KUNDEN-ANLEITUNG.md](docs/KUNDEN-ANLEITUNG.md).

## Installation über HACS / Marketplace

1. HACS (ab HA 2026.11: Marketplace) → ⋮ → Benutzerdefinierte Repositories → `https://github.com/dproneg-commits/GlassHome`, Typ **Dashboard**.
2. „Glass Home“ installieren. Die Ressource `/hacsfiles/GlassHome/glass-home.js` wird automatisch eingetragen.
3. Theme `themes/glass_home_graphit.yaml` nach `/config/themes/` kopieren (siehe unten).

## Manuell einspielen (Testinstanz)

1. `dist/glass-home.js` nach `/config/www/glass-home/glass-home.js` kopieren.
2. Einstellungen → Dashboards → Ressourcen → `/local/glass-home/glass-home.js` (JavaScript-Modul).
3. `themes/glass_home_graphit.yaml` nach `/config/themes/` und in `configuration.yaml`:
   `frontend: themes: !include_dir_merge_named themes`, dann HA neu starten und im Profil das Theme wählen.
4. Karte hinzufügen → „Glass Home – Raum“ → Bereich wählen.

## Automatisches Dashboard (Strategie)

Einstellungen → Dashboards → Dashboard hinzufügen → „Neues Dashboard von Grund auf“ → öffnen → ⋮ → „Rohkonfigurationseditor“, alles ersetzen durch:

```yaml
strategy:
  type: custom:glass-home
  name: Familie Huber        # optional, Name in der Begrüßung
  title: Zuhause             # optional
  hide_areas: [garage]       # optional, Bereichs-IDs ausblenden
  modules:                   # optional, Module abschalten
    energy: false
```

Daraus entsteht bei jedem Laden:
- **Start:** Navigation, Kopfzeile, Statuskacheln (nur wenn es Lichter, Rollos, Temperaturen, Fenster oder Schlösser gibt), darunter eine Raumkarte pro Bereich mit Geräten.
- Gibt es keine Räume, aber PV: Energie direkt auf der Startseite. Müll kommt auf die Startseite, wenn vorhanden.
- **Energie:** eigene Seite, wenn es PV/Energie und Räume gibt.

Neue Geräte oder Bereiche erscheinen ohne Zutun. Für eigene Änderungen: ⋮ → „Kontrolle übernehmen“. Dann wird daraus ein normales Dashboard mit denselben Karten, das sich aber nicht mehr selbst anpasst.

## Navigation

```yaml
type: custom:glass-home-nav
show_clock: true
# optional statt automatisch aus den Ansichten:
# items:
#   - { name: Start, path: start, icon: mdi:home }
#   - { name: Energie, path: energie, icon: mdi:lightning-bolt, module: energy }
```

- Ohne `items` kommen die Einträge aus den Ansichten des Dashboards (Titel, Icon, Pfad). Unteransichten und versteckte Ansichten fehlen.
- `module:` blendet einen Eintrag aus, wenn das Modul in dieser Installation nicht erkannt wird.
- Am Handy nur Symbole, die aktive Seite mit Text.

## Status

```yaml
type: custom:glass-home-status
tiles:                  # optional, sonst alle, die es gibt
  - lights
  - covers
  - climate             # Ø aller Temperatursensoren mit Bereich
  - openings            # Fenster, Türen, Garagentor
  - type: locks
    navigate: /dashboard-kunde/sicherheit   # optional: Seite statt Popup
```

- Tippen öffnet ein Popup mit allen Geräten der Art, nach Bereich gruppiert.
- Lichter und Rollos im Popup: tippen schaltet, ziehen dimmt bzw. fährt. Oben „Alle aus“ bzw. „Alle auf / Stopp / Alle zu“.
- Temperaturen und Fenster: tippen öffnet die HA-Detailansicht. Schlösser mit Zu-/Aufsperren.
- Am Handy kommt das Popup von unten.

## Energie

```yaml
type: custom:glass-home-energy
chart: true                        # Tageskurve
solar_power: sensor.pv_leistung    # optional, Leistung jetzt (W oder kW)
grid_power: sensor.netz_leistung   # optional, + Bezug / − Einspeisung
home_power: sensor.haus_leistung   # optional, sonst PV + Netz
```

- Tageswerte (kWh) und Stundenkurve kommen aus dem HA-Energie-Dashboard (Solar, Netzbezug, Einspeisung). Ohne Energie-Dashboard zeigt die Karte einen Hinweis.
- Ohne Leistungssensoren zeigen die Kacheln die kWh von heute statt kW jetzt.
- Autarkie = Anteil des Verbrauchs, der nicht aus dem Netz kam. Batterien werden noch nicht berücksichtigt.

## Müll

```yaml
type: custom:glass-home-waste
title: Müllabfuhr       # optional
entities: []            # optional, sonst alle Sensoren mit daysTo
max: 5
```

- Braucht die HACS-Integration „Waste Collection Schedule“ mit einem Sensor pro Müllart (Attribut `daysTo`).
- Farben nach Name: Bio braun, Rest grau, Gelber Sack gelb, Papier rot, Glas grün.
- Die Kopfzeile zeigt zusätzlich „Morgen Biomüll“ bzw. „Heute …“.

## Einkauf & Termine

```yaml
type: custom:glass-home-agenda
title: Einkaufsliste    # optional, sonst Name der Liste
todo: todo.shopping_list  # optional, sonst Einkaufsliste bzw. erste Liste; false = ausblenden
calendars: []           # optional, sonst alle Kalender; false = ausblenden
days: 7                 # Termine für so viele Tage
max_items: 6
max_events: 5
```

- Nutzt nur eingebaute HA-Funktionen (Einkaufsliste/To-do-Listen und Kalender), kein HACS nötig.
- Einträge abhaken mit dem Kreis, neue Einträge über das Feld darunter. Tippen auf einen Termin öffnet den Kalender.
- Die Strategie setzt die Karte auf die Startseite, sobald es eine Liste oder einen Kalender gibt (`modules: {todo: false, calendar: false}` schaltet sie ab).

## Szenen

```yaml
type: custom:glass-home-scenes
scenes:                 # optional, sonst alle Szenen automatisch
  - scene.abend
  - entity: script.gute_nacht
    name: Gute Nacht
    sub: alles aus, Rollos zu
all_off: true           # Kachel „Alles aus“ (alle Lichter mit Bereich)
max: 5                  # nur bei automatisch
```

- Die zuletzt ausgelöste Szene gilt bis zu 6 Std als „aktiv“.

## Kopfzeile

```yaml
type: custom:glass-home-header
name: Familie Huber     # optional, sonst Vorname des angemeldeten Benutzers
weather: weather.home   # optional, sonst die erste Wetter-Entität
show_weather: true
show_alerts: true
light_hours: 2          # Hinweis, wenn ein Licht länger an ist
```

- Begrüßung nach Tageszeit, darunter Kurzstatus (Lichter, Innentemperatur, Rollos) aus allen Geräten mit Bereich.
- Hinweise mit Aktion: offene Fenster/Türen (Anzeigen), lange brennendes Licht (Ausschalten), offenes Schloss (Zusperren). Höchstens 4, Rest als „+N weitere“.
- Wetter mit 3-Tage-Vorschau, Tippen öffnet die Detailansicht. Am Handy untereinander.

## Raumkarte

```yaml
type: custom:glass-home-room
area: wohnzimmer        # Bereichs-ID
name: Wohnzimmer        # optional
show_light: true        # optional, alle standardmäßig an
show_cover: true
show_climate: true
show_openings: true
```

- Geräte kommen aus dem Bereich (Entität oder ihr Gerät). Versteckte Entitäten und das Label `glass_ausblenden` werden ignoriert.
- Licht: tippen schaltet alle Lichter im Raum, ziehen dimmt (nur bei dimmbaren Lampen).
- Rollo: Anzeige als Schließ-% (0 = offen, 100 = zu), tippen öffnet/schließt, ziehen setzt die Position.
- Temperatur: Thermostat vor Temperatursensor, mehrere Sensoren werden gemittelt.
- Hinweis im Untertitel: offenes Fenster oder Licht länger als 2 Std an.

Lokaler Test ohne HA: `test/mock.html` im Browser öffnen.
