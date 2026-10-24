# Glass Home – Regeln für den lokalen Agenten

Dieser Ordner enthält das Kundenpaket „Glass Home“ (Lovelace-Karten + Dashboard-Strategie) für Home Assistant.
Aktueller Stand und nächste Schritte: `STAND.md`. Doku aller Karten: `README.md`.

## Sicherheitsregeln (immer einhalten)
- Gearbeitet wird **nur** auf der Test-VM **192.168.0.19** (Port 8123 / SSH 22).
- **Niemals** `homeassistant.local`, `http://homeassistant` oder eine andere Adresse verwenden. Die Test-VM heißt intern ebenfalls `homeassistant.local`, deshalb immer die IP.
- Token liegt nur in `%USERPROFILE%\.glass-home\ha-test.token`. Nicht ausgeben, nicht in Dateien in diesem Ordner kopieren, nicht committen.
- Geräte koppeln, Integrationen mit Zugangsdaten und Gemeinde/Müllkalender einstellen macht Dominik selbst.
- Nichts an Kunden-Instanzen ausrollen. Das entscheidet nur Dominik.

## Ablauf „Neue Version testen“
1. Version in `dist/glass-home.js` (`GH_VERSION`) erhöhen.
2. Datei kopieren: `scp dist/glass-home.js root@192.168.0.19:/config/www/glass-home/glass-home.js`
   (falls `/config` fehlt: `/homeassistant/www/glass-home/`). Theme analog nach `/config/themes/`.
3. Ressourcen-URL auf `/local/glass-home/glass-home.js?v=<Version>` setzen, per WebSocket
   `lovelace/resources/list` und `lovelace/resources/update` an `ws://192.168.0.19:8123/api/websocket`
   (Auth mit dem Token aus der Datei).
4. Dashboard im Browser öffnen (`http://192.168.0.19:8123/...`), Screenshots Handy (390 px) und Tablet (1180 px) machen, Konsole auf Fehler prüfen.
5. `STAND.md` aktualisieren (was getestet, was offen).

## Tests ohne HA
`test/mock.html` und `test/mock_kunde1.html` im Browser öffnen (laden `../dist/glass-home.js`).
