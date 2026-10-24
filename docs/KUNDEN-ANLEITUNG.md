# Ihr Glass-Home-Dashboard – kurz erklärt

Das Dashboard baut sich selbst aus Ihren Geräten auf. Kommt ein neues Gerät dazu, erscheint es automatisch, sobald es einem **Raum** (in Home Assistant „Bereich“) zugeordnet ist. Sie müssen am Dashboard selbst meist nichts ändern.

## Was Sie sehen

- **Oben:** Begrüßung, Wetter und Hinweise, zum Beispiel „Fenster Bad offen“ oder „Licht Keller seit 3 Std an“. Viele Hinweise haben einen Knopf, mit dem Sie das direkt erledigen.
- **Statuskacheln:** Lichter, Rollos, Temperaturen, Fenster und Schlösser. Tippen öffnet eine Übersicht aller Geräte dieser Art, geordnet nach Raum.
- **Räume:** eine Karte pro Raum. Auf den Regler tippen schaltet ein oder aus, Schieben stellt Helligkeit oder Rollo-Stellung ein.
- **Energie, Müll, Einkauf & Termine:** erscheinen nur, wenn es bei Ihnen die passenden Daten gibt.

## Häufige Wünsche

**Ein Gerät fehlt oder ist im falschen Raum**
Einstellungen → Geräte & Dienste → Geräte → Gerät öffnen → oben rechts auf den Stift → **Bereich** wählen → Speichern.

**Ein Gerät soll nicht im Dashboard erscheinen**
Gerät bzw. Entität öffnen → Zahnrad → bei **Labels** das Label `glass_ausblenden` hinzufügen (beim ersten Mal „Label erstellen“ mit genau diesem Namen). Alternativ die Entität dort auf „Ausgeblendet“ stellen.

**Ein Raum soll nicht erscheinen**
Alle Geräte dieses Raums wie oben ausblenden, oder melden Sie sich bei uns, wir blenden den Raum aus.

**Etwas auf die Einkaufsliste setzen**
In der Karte „Einkaufsliste“ ins Feld tippen, Text eingeben, „+“. Erledigtes mit dem Kreis abhaken. Die Liste ist dieselbe wie in der Home-Assistant-App auf dem Handy.

**Name in der Begrüßung ändern**
Profil (unten links) → Name. Oder melden Sie sich bei uns, dann tragen wir „Familie …“ fest ein.

## Lieber nicht

- **„Kontrolle übernehmen“** im Dashboard-Menü macht aus dem automatischen Dashboard ein festes. Danach erscheinen neue Geräte nicht mehr von selbst. Wenn Sie das versehentlich gemacht haben: kurz Bescheid geben, wir stellen es zurück.
- Integrationen löschen oder Geräte neu koppeln: das übernehmen wir gerne für Sie.

## Hilfe

Bei Fragen oder Wünschen melden Sie sich einfach bei Ihrem Installateur.
