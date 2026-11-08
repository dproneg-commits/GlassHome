# Glass Home

Dashboard-Paket im Glas-Stil für Kundeninstallationen. Stand 0.9.8: Glass-Raster, automatisches Dashboard, Navigation, Kopfzeile mit Wetter, Status, Temperatur, Energie mit Zeitraum, Energiefluss, Akku, Energie kompakt, Müll, Kalender, Einkauf & Termine, Szenen, Raumkarte.

Anleitung für Kunden (zum Weitergeben): [docs/KUNDEN-ANLEITUNG.md](docs/KUNDEN-ANLEITUNG.md).

## Installation über HACS / Marketplace

1. HACS (ab HA 2026.11: Marketplace) → ⋮ → Benutzerdefinierte Repositories → `https://github.com/dproneg-commits/GlassHome`, Typ **Dashboard**.
2. „Glass Home“ installieren. Die Ressource `/hacsfiles/GlassHome/glass-home.js` wird automatisch eingetragen.
3. Theme `themes/glass_home_graphit.yaml` nach `/config/themes/` kopieren (siehe unten).

## Manuell einspielen (Testinstanz)

1. `dist/glass-home.js` nach `/config/www/glass-home/glass-home.js` kopieren.
2. Einstellungen → Dashboards → Ressourcen → `/local/glass-home/glass-home.js` (JavaScript-Modul).
3. `themes/glass_home_graphit.yaml` nach `/config/themes/` und in `configuration.yaml`:
   `frontend: themes: !include_dir_merge_named themes`, dann HA neu starten. Das Theme **nicht** im Profil oder als HA-Standard setzen: Die Glass-Ansichten tragen `theme: glass_home_graphit` selbst, so gilt es nur im Dashboard, für alle Benutzer.
4. Karte hinzufügen → „Glass Home – Raum“ → Bereich wählen.

## Vorlage (Glass-Raster)

[`vorlagen/dashboard.yaml`](vorlagen/dashboard.yaml) ist das Dashboard der Eltern als allgemeine Vorlage: Start (Navigation, Kopfzeile, Status, Müll, Termine, Temperatur, Kalender), Energie und Kamera. Neues Dashboard anlegen → ⋮ → Rohkonfigurationseditor → Inhalt einfügen, dann `names` und `kiosk` anpassen. Größen und Reihenfolge im Bearbeiten-Modus.

## Automatisches Dashboard (Strategie)

Einstellungen → Dashboards → Dashboard hinzufügen → „Neues Dashboard von Grund auf“ → öffnen → ⋮ → „Rohkonfigurationseditor“, alles ersetzen durch:

```yaml
strategy:
  type: custom:glass-home
  name: Familie Huber        # optional, Name in der Begrüßung für alle
  names:                     # optional, Begrüßung je Benutzer (sonst Vorname des Benutzers)
    viewer: Familie Huber
  kiosk: [viewer]            # optional, ohne HA-Kopfzeile und Seitenleiste für diese Benutzer
  theme: glass_home_graphit  # optional, Design nur für dieses Dashboard (Standard: Graphit, wenn installiert; false = keins)
  layout: sections           # optional, statt Glass-Raster das HA-Abschnittslayout
  title: Zuhause             # optional
  hide_areas: [garage]       # optional, Bereichs-IDs ausblenden
  modules:                   # optional, Module abschalten
    energy: false
```

Standard ist das **Glass-Raster** (eigene Ansicht `custom:glass-home-grid`, 12 Spalten, Zeilenhöhe füllt den Bildschirm):

| Bereich | Breite × Höhe |
| --- | --- |
| Navigation | 12 × 1 |
| Begrüßung + Wetter | 9 × 2 + 3 × 2 |
| Statusleiste | 12 × 1 |
| Flächen (Raum, Müll, Einkauf & Termine) | 4 × 3 |
| Energie | 4 × 6 |

Eigene Karten in der Ansicht bekommen ihre Größe über `grid_options: { columns, rows }` (z. B. 4 × 6, 8 × 3, 12 × 6). Tablet hochkant: Flächen halb breit, Handy: alles untereinander. Mit `layout: sections` in der Strategie gibt es das bisherige HA-Abschnittslayout.

Im Bearbeiten-Modus (nach „Kontrolle übernehmen“) hat jede Karte eine kleine Leiste: ‹ › verschiebt sie, B−/B+ und H−/H+ ändern Breite (1, 2, 3, 4, 6, 8, 9, 12) und Höhe, ✎ öffnet den Karten-Editor, ✕ löscht (Rückgängig über den Pfeil oben). „+ Karte hinzufügen“ listet alle Glass-Karten. Darunter legt „+ Neue Seite“ eine weitere Seite an: Sie bekommt nur die Navigationsleiste (mit denselben Einstellungen wie Kiosk), dasselbe Raster und dasselbe Design und erscheint sofort in der Leiste. „Seite umbenennen“ und „Seite löschen“ gelten für die aktuelle Seite.

Daraus entsteht bei jedem Laden:
- **Start:** Navigation, Kopfzeile, Statuskacheln (nur wenn es Lichter, Rollos, Steckdosen, Personen, Temperaturen, Fenster oder Schlösser gibt), darunter eine Raumkarte pro Bereich mit Geräten.
- Gibt es keine Räume, aber PV: Energie direkt auf der Startseite. Müll kommt auf die Startseite, wenn vorhanden (Sensoren oder nur der Kalender von Waste Collection Schedule).
- **Energie:** eigene Seite, wenn es PV/Energie und Räume gibt.

Neue Geräte oder Bereiche erscheinen ohne Zutun. Für eigene Änderungen: ⋮ → „Kontrolle übernehmen“. Dann wird daraus ein normales Dashboard mit denselben Karten, das sich aber nicht mehr selbst anpasst.

## Farbige Icons

Standardmäßig tragen die Icons Farbe: Statuskacheln (nur was an/offen ist, Aus bleibt grau), Kartentitel, Räume (feste Farbe je Raumart, z. B. Küche orange, Schlafzimmer lila, Wohnzimmer grün, Bad türkis), Wetter und Navigation. Der Graphit-Grund bleibt.

```yaml
# in der Ansicht (Raw-Editor), schaltet die Farben für alle Karten der Seite ab
type: custom:glass-home-grid
icon_colors: false
```

Eigene Raumfarben an Temperatur- und Räumekarte: `room_colors: {Küche: "#ff8a65", wohnzimmer: "#7ed08a"}` (Name oder area_id).

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

### Kiosk (Wandtablet)

`kiosk:` in der Strategie oder in der Navigation blendet die HA-Kopfzeile und die Seitenleiste aus, solange das Dashboard offen ist:

- `kiosk: [viewer]`: nur für diese Benutzer (angezeigter Name des Benutzers, Groß-/Kleinschreibung egal)
- `kiosk: non_admin`: für alle ohne Adminrechte
- `kiosk: true`: für alle

In der Adresse schaltet `?kiosk` den Kiosk für diesen Browser-Tab ein und `?kiosk=0` wieder aus, zum Beispiel um am Tablet an die Einstellungen zu kommen.

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
  - plugs               # Steckdosen
  - presence            # Wer ist zuhause (person.*)
plugs: [switch.steckdose_tv]   # optional: feste Auswahl, sonst automatisch erkannt
temps: [sensor.wz_t]           # optional: Fühler für Ø, nur ohne Temperaturkarte
```

- **Steckdosen und Temperatur selbst zusammenstellen:** Als Admin die Kachel antippen. Im Popup entfernt ✕ einen Eintrag, unten kommt mit „Hinzufügen“ ein neuer dazu. Gespeichert wird in der Kartenkonfiguration (nur im Glass-Raster). Ohne Geräte zeigen Admins eine leere Kachel zum Einrichten; Nicht-Admins sehen sie erst, wenn etwas ausgewählt ist.
- Gibt es eine **Temperaturkarte** im Dashboard, zeigt die Statuskachel genau deren Durchschnitt, und Änderungen im Popup landen in der Temperaturkarte.

- Tippen öffnet ein Popup mit allen Geräten der Art, nach Bereich gruppiert.
- Lichter und Rollos im Popup: tippen schaltet, ziehen dimmt bzw. fährt. Oben „Alle aus“ bzw. „Alle auf / Stopp / Alle zu“.
- Temperaturen und Fenster: tippen öffnet die HA-Detailansicht. Schlösser mit Zu-/Aufsperren.
- Am Handy kommt das Popup von unten.

## Temperatur

```yaml
type: custom:glass-home-temperature
name: Räume               # optional
humidity_warn: 60         # optional, Feuchte-Warnung ab %
entities:                 # optional, sonst alle Temperatur-/Feuchtesensoren und Thermostate mit Bereich
  - sensor.wz_t
  - sensor.wz_h
  - climate.kueche
```

Je Raum eine Zeile mit Raumsymbol, Farbbalken nach Temperatur (15–27 °C), Temperatur groß und Luftfeuchte darunter. Ab 60 % Feuchte wird die Zeile orange mit ⚠. Ist für einen Raum keine Feuchte gewählt, wird der Feuchtesensor aus dem Bereich genommen. Admins wählen die Fühler über den Stift oben rechts. Standardgröße 4 × 6. Die Statuskachel Temperatur zeigt den Durchschnitt derselben Fühler.

## Energie

Die Energie-Seite der Vorlage hat vier Karten: Energiefluss (7 × 5), Akku (5 × 3), Kacheln (5 × 2) und Diagramm (12 × 4).

```yaml
type: custom:glass-home-energy
part: both                         # both | tiles (nur Kacheln) | chart (nur Diagramm)
periods: true                      # Umschalter Heute, Gestern, Woche, Monat, Jahr
chart: true
battery_soc: sensor.akku_ladestand # optional, Ladestand als Kurve bei Heute/Gestern
solar_power: sensor.pv_leistung    # optional, Leistung jetzt in den Kacheln (nur Heute)
grid_power: sensor.netz_leistung   # optional, + Bezug / − Einspeisung
home_power: sensor.haus_leistung   # optional, sonst PV + Netz
```

- kWh-Werte kommen aus dem HA-Energie-Dashboard (Solar, Netzbezug, Einspeisung, Batterie). Ohne Energie-Dashboard zeigt die Karte einen Hinweis.
- Ohne Energie-Dashboard (oder statt dessen): eigene Tageszähler des Wechselrichters eintragen. Heute kommt dann direkt aus den Zählern, Gestern bis Jahr aus dem HA-Verlauf dieser Zähler (braucht `state_class`, sonst bleibt das Diagramm leer):

```yaml
solar_energy: sensor.today_energy              # PV heute
home_energy: sensor.consumption_today          # Hausverbrauch heute
grid_import_energy: sensor.imported_grid_energy
grid_export_energy: sensor.pv_feed_in_energy
battery_charge_energy: sensor.energy_charged_today       # optional
battery_discharge_energy: sensor.energy_discharged_today # optional
solar_energy_month: sensor.monthly_energy      # optional, PV-Kachel bei Monat
solar_energy_year: sensor.yearly_energy        # optional, PV-Kachel bei Jahr
```
- Der gewählte Zeitraum gilt für alle Energiekarten der Seite, so können Kacheln und Diagramm getrennt stehen.
- Heute und Gestern: Stundenkurve mit PV, Hausverbrauch, Netzbezug (Balken) und Akku-Ladestand. Woche und Monat: Balken je Tag, Jahr: je Monat.
- Hausverbrauch = Bezug + PV + Akku entladen − Einspeisung − Akku geladen. Autarkie = Anteil des Verbrauchs, der nicht aus dem Netz kam.

### Energiefluss

```yaml
type: custom:glass-home-energy-flow
solar_power: sensor.pv_leistung      # W oder kW
grid_power: sensor.netz_leistung     # + Bezug / − Einspeisung
home_power: sensor.haus_leistung     # optional, sonst berechnet
battery_power: sensor.akku_leistung  # + lädt / − entlädt
battery_soc: sensor.akku_ladestand   # %
invert_battery: false                # true, wenn der Sensor beim Entladen + zeigt
invert_grid: false                   # true, wenn der Sensor bei Einspeisung + zeigt
```

PV, Netz, Haus und Akku als Kreise, animierte Punkte zeigen, wohin der Strom gerade fließt. Ohne PV oder Akku fallen diese Kreise weg. PV- und Netz-Leistung werden aus dem Energie-Dashboard übernommen, falls dort hinterlegt.

### Akku

```yaml
type: custom:glass-home-battery
battery_soc: sensor.akku_ladestand
battery_power: sensor.akku_leistung  # + lädt / − entlädt
capacity: 10                         # kWh, für Restzeit und „x von y kWh“
capacity_entity: sensor.rated_capacity          # statt capacity, Größe aus Sensor
battery_charge_energy: sensor.energy_charged_today       # optional, sonst Energie-Dashboard
battery_discharge_energy: sensor.energy_discharged_today
invert_battery: false
```

Ladestand als Ring, Leistung mit „lädt/entlädt“, Restzeit bis voll oder leer, heute geladen und entladen (aus der Batterie im Energie-Dashboard).

### Energie kompakt (Startseite)

```yaml
type: custom:glass-home-energy-mini    # 4 × 6 (ohne Kurve: chart: false, 4 × 3)
solar_power: sensor.pv_leistung
grid_power: sensor.netz_leistung       # + Bezug / − Einspeisung
home_power: sensor.haus_leistung
battery_power: sensor.akku_leistung    # + lädt / − entlädt
battery_soc: sensor.akku_ladestand
solar_energy: sensor.today_energy      # optional, „heute x kWh erzeugt“
```

Akku-Ladestand als Ring, Erzeugung, Hausverbrauch, Netz und Akku jetzt (unter 1 kW in W), darunter die Tageskurve in 5-Minuten-Schritten mit PV-Spitze und Akku-Ladestand. Die Kurve kommt aus der Statistik (`state_class: measurement`), sonst aus dem Verlauf.

## Müll

```yaml
type: custom:glass-home-waste
title: Müllabfuhr       # optional
entities: []            # optional, sonst alle Sensoren mit daysTo
max: 5
```

- Braucht die HACS-Integration „Waste Collection Schedule“ mit einem Sensor pro Müllart (Attribut `daysTo`).
- Farben nach Name: Bio braun, Rest grau, Gelber Sack gelb, Papier rot, Glas grün.
- Kompakt: bis zu 4 Abfuhren als 2×2-Kacheln, die nächste hervorgehoben; passt in 4 × 3.
- Die Kopfzeile zeigt „Morgen Biomüll“ bzw. „Heute …“ als Hinweis und sonst immer den nächsten Termin („Biomüll in 5 Tagen“, abschaltbar mit `show_waste_next: false` an der Kopfzeile).

## Kalender

```yaml
type: custom:glass-home-calendar
title: Kalender         # optional
calendars:              # optional, sonst alle Kalender außer Müll
  - calendar.familie
  - calendar.arbeit
colors:                 # optional, sonst feste Reihenfolge
  calendar.familie: "#ffb74d"
show_waste: false       # Müllkalender mitanzeigen
show_past: true         # vergangene Termine von heute grau statt ausblenden
tomorrow: true          # unten „Morgen: …“
next_when_empty: true   # leerer Tag: nächsten Termin zeigen
evening: 20             # ab 20 Uhr schon den nächsten Tag zeigen, 0 = aus
week_start: 1           # 1 = Montag, 0 = Sonntag
```

- Zeigt immer einen Tag: ganztägige Termine als Chips, darunter die Termine mit Uhrzeit, der laufende hervorgehoben. Mit ‹ › blättert man tageweise.
- Passt nicht alles in die Kachel, steht unten „+ n weitere“. Antippen öffnet die ganze Woche als Popup (‹ Heute › zum Blättern, auf dem Handy die Tage untereinander).
- Alles ist im Karten-Editor (✎) einstellbar. Standardgröße 4 × 3.

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
weather: weather.home   # optional, sonst die erste Wetter-Entität, die Daten liefert
forecast_days: 7        # Vorschau, Standard 3; ab 4 als Wochenleiste mit Symbol und Tiefstwert
show_weather: true
show_alerts: true
light_hours: 2          # Hinweis, wenn ein Licht länger an ist
```

- Begrüßung nach Tageszeit, darunter Kurzstatus (Lichter, Innentemperatur, Rollos) aus allen Geräten mit Bereich.
- Hinweise mit Aktion: offene Fenster/Türen (Anzeigen), lange brennendes Licht (Ausschalten), offenes Schloss (Zusperren). Höchstens 4, Rest als „+N weitere“.
- Wetter mit 3-Tage-Vorschau (oder Wochenleiste mit `forecast_days: 7`), Tippen öffnet die Detailansicht. Am Handy untereinander.

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
