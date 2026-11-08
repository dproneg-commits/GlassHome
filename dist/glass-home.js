// Glass Home – Dashboard-Paket im Glas-Stil für Kundeninstallationen
const GH_VERSION = '0.9.8';

/* ------------------------------------------------------------------ */
/* Gemeinsamer Stil (Graphit). Jede Farbe kann über das Theme          */
/* glass_home_graphit oder ein eigenes Theme überschrieben werden.     */
/* ------------------------------------------------------------------ */
// Farbige Icons (Standard). Abschalten: Ansicht mit icon_colors: false (setzt gh-flat an jeder Karte)
function COLOR_STYLE() { return `
  :host(glass-home-temperature){--gh-hc:#ff8a65}:host(glass-home-agenda){--gh-hc:#aed581}:host(glass-home-rooms){--gh-hc:#b48cff}
  :host(glass-home-energy){--gh-hc:#ffd54f}:host(glass-home-energy-flow){--gh-hc:#ffd54f}:host(glass-home-battery){--gh-hc:#b48cff}:host(glass-home-energy-mini){--gh-hc:#ffd54f}:host(glass-home-waste){--gh-hc:#d7a77b}:host(glass-home-calendar){--gh-hc:#4dd0e1}
  :host(glass-home-scenes){--gh-hc:#ffb74d}
  :host(glass-home-agenda) .cal .hd{--hc:#4dd0e1}
  :host(:not([gh-flat])) .hd>svg,:host(:not([gh-flat])) .hd .ti svg{color:var(--hc,var(--gh-hc,var(--gh-mute)));padding:4px;margin:-4px 0;box-sizing:content-box;border-radius:9px;
    background:color-mix(in srgb,var(--hc,var(--gh-hc,#fff)) 20%,transparent)}
  :host(:not([gh-flat])) .tile:not(.off){background:linear-gradient(135deg,rgba(var(--c),.22),rgba(var(--c),.05) 70%),var(--gh-bg);border-color:rgba(var(--c),.40)}
  :host(:not([gh-flat])) .tile:not(.off) .ic{background:linear-gradient(145deg,rgb(var(--c)),rgba(var(--c),.70));color:#15171a;box-shadow:0 4px 14px rgba(var(--c),.35)}
  :host(:not([gh-flat])) .tr .ic,:host(:not([gh-flat])) .r .ic{background:linear-gradient(145deg,var(--rc,#7ab8ff),color-mix(in srgb,var(--rc,#7ab8ff) 65%,#000));color:#15171a;
    border-radius:11px;box-shadow:0 4px 14px color-mix(in srgb,var(--rc,#7ab8ff) 35%,transparent)}
  :host(:not([gh-flat])) .r{border-color:color-mix(in srgb,var(--rc,#7ab8ff) 45%,transparent);background:linear-gradient(135deg,color-mix(in srgb,var(--rc,#7ab8ff) 14%,transparent),transparent 70%)}
  :host(:not([gh-flat])) .wx>svg,:host(:not([gh-flat])) .wx .nw>svg{color:#ffcf6b;filter:drop-shadow(0 0 14px rgba(255,190,80,.45))}
  :host(:not([gh-flat])) .fc b{color:#ffcf6b}
  :host(:not([gh-flat])) .nav a svg,:host(:not([gh-flat])) .nav a ha-icon{color:var(--nc)}
  :host(:not([gh-flat])) .nav a.on{background:color-mix(in srgb,var(--nc) 22%,transparent)}
`; }

const GH_STYLE = `
  :host{
    --gh-txt:var(--glass-home-text,#eef1f4);
    --gh-mute:var(--glass-home-muted,#a3a9b1);
    --gh-dim:var(--glass-home-dim,#767c84);
    --gh-bg:var(--glass-home-card,rgba(255,255,255,.07));
    --gh-line:var(--glass-home-border,rgba(255,255,255,.14));
    --gh-ctl:var(--glass-home-control,rgba(255,255,255,.07));
    --gh-lit:var(--glass-home-light,255,183,77);
    --gh-cover:var(--glass-home-cover,rgba(201,210,220,.22));
    --gh-warn:var(--glass-home-warn,#ffd49a);
    --gh-radius:var(--glass-home-radius,22px);
    display:block;height:100%;
  }
  *{box-sizing:border-box}
  .p{background:var(--gh-bg);border:1px solid var(--gh-line);border-radius:var(--gh-radius);
     box-shadow:0 8px 30px rgba(0,0,0,.18);color:var(--gh-txt);font-family:var(--glass-home-font,Inter,system-ui,sans-serif);
     -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
  svg{flex:none;display:block}
`+ COLOR_STYLE() + `
`;

const ICONS = {
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>',
  blinds: '<path d="M4 3h16"/><path d="M5 3v14M19 3v14"/><path d="M5 7h14M5 11h14M5 15h14"/><path d="M12 17v4"/>',
  door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M4 21h16"/><path d="M14.5 12h.01"/>',
  temp: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v4H2z"/><path d="M5 17v2M19 17v2"/>',
  bed: '<path d="M3 18V6"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
  pot: '<path d="M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M2 10h20"/><path d="M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  desk: '<path d="M3 8h18"/><path d="M5 8v12M19 8v12"/><path d="M14 8v6h5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  cloudsun: '<path d="M12 2v2M4.9 4.9l1.4 1.4M20 12h2M19.1 4.9l-1.4 1.4"/><path d="M15.9 13A4 4 0 0 0 8.4 9.8"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6z"/>',
  cloud: '<path d="M17.5 19H8a6 6 0 1 1 5.7-8h.8a4.5 4.5 0 0 1 3 8z"/>',
  rain: '<path d="M17.5 15H8a6 6 0 1 1 5.7-8h.8a4.5 4.5 0 0 1 3 8z"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/>',
  snow: '<path d="M17.5 15H8a6 6 0 1 1 5.7-8h.8a4.5 4.5 0 0 1 3 8z"/><path d="M8 19h.01M12 21h.01M16 19h.01"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  wind: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6"/>',
  plug: '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
  check: '<path d="M4 12.5 9.5 18 20 6.5"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 21c2-5 5-8 9-10"/>',
};
const icon = (n, s = 18) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ICONS.home}</svg>`;

// Raum-Symbol aus dem Bereichsnamen raten, wenn der Bereich kein eigenes Icon hat
const roomIcon = (name = '') => {
  const n = name.toLowerCase();
  if (/wohn|living/.test(n)) return 'sofa';
  if (/schlaf|bed/.test(n)) return 'bed';
  if (/küche|kueche|kitchen/.test(n)) return 'pot';
  if (/bad|wc|bath/.test(n)) return 'drop';
  if (/büro|buero|arbeit|office|keller/.test(n)) return 'desk';
  if (/kind|kids/.test(n)) return 'star';
  if (/garten|terrasse|balkon/.test(n)) return 'leaf';
  return 'home';
};

// feste Farbe je Raumart, überschreibbar mit room_colors: {Name oder area_id: '#hex'}
const ROOM_COLORS = { sofa: '#7ed08a', bed: '#b48cff', pot: '#ffb74d', drop: '#4dd0e1', desk: '#7ab8ff', star: '#f06292', leaf: '#aed581', home: '#90a4ae' };
const roomColor = (name = '', id = '', own = {}) => own[name] || own[id] || ROOM_COLORS[roomIcon(name)] || ROOM_COLORS.home;
const NAV_COLORS = ['#ffb74d', '#4dd0e1', '#7ed08a', '#b48cff', '#ff8a65', '#7ab8ff', '#f06292'];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n, d = 1) => Number(n).toLocaleString('de-AT', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ------------------------------------------------------------------ */
/* Modulerkennung                                                      */
/* ------------------------------------------------------------------ */
const HIDE_LABEL = 'glass_ausblenden';

function entityArea(hass, id) {
  const e = hass.entities?.[id];
  if (!e) return null;
  if (e.area_id) return e.area_id;
  return e.device_id ? hass.devices?.[e.device_id]?.area_id || null : null;
}

function visible(hass, id) {
  const e = hass.entities?.[id];
  if (!e) return true;
  return !e.hidden && !e.entity_category && !(e.labels || []).includes(HIDE_LABEL);
}

// Alle Entitäten eines Bereichs, nach Rolle sortiert
function areaEntities(hass, areaId) {
  const out = { lights: [], covers: [], temps: [], hums: [], climates: [], openings: [] };
  for (const id of Object.keys(hass.states)) {
    if (!visible(hass, id) || entityArea(hass, id) !== areaId) continue;
    const st = hass.states[id];
    const dom = id.split('.')[0];
    const dc = st.attributes.device_class;
    if (dom === 'light') out.lights.push(id);
    else if (dom === 'cover') out.covers.push(id);
    else if (dom === 'climate') out.climates.push(id);
    else if (dom === 'sensor' && dc === 'temperature') out.temps.push(id);
    else if (dom === 'sensor' && dc === 'humidity') out.hums.push(id);
    else if (dom === 'binary_sensor' && ['door', 'window', 'opening', 'garage_door'].includes(dc)) out.openings.push(id);
  }
  return out;
}

// Welche Module gibt es in dieser Installation? Grundlage für Strategie und Navigation.
// Kalender von Waste Collection Schedule
function isWasteCal(hass, id) {
  return id.startsWith('calendar.') && (hass.entities?.[id]?.platform === 'waste_collection_schedule' || id.startsWith('calendar.waste_collection_schedule'));
}

// Tage bis zu einem Kalenderzeitpunkt (ganztägig "2026-11-11" oder mit Uhrzeit)
function daysUntil(t) {
  if (!t) return NaN;
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T00:00:00` : t.replace(' ', 'T'));
  const a = new Date(); a.setHours(0, 0, 0, 0); d.setHours(0, 0, 0, 0);
  return Math.round((d - a) / 864e5);
}

function detectModules(hass) {
  const ids = Object.keys(hass.states).filter((id) => visible(hass, id));
  const has = (pred) => ids.some(pred);
  const dc = (id) => hass.states[id].attributes.device_class;
  return {
    weather: has((id) => id.startsWith('weather.')),
    lights: has((id) => id.startsWith('light.')),
    covers: has((id) => id.startsWith('cover.')),
    openings: has((id) => id.startsWith('binary_sensor.') && ['door', 'window', 'opening', 'garage_door'].includes(dc(id))),
    climate: has((id) => id.startsWith('climate.') || (id.startsWith('sensor.') && dc(id) === 'temperature')),
    todo: has((id) => id.startsWith('todo.')),
    calendar: has((id) => id.startsWith('calendar.') && !isWasteCal(hass, id)),
    scenes: has((id) => id.startsWith('scene.')),
    // Waste Collection Schedule legt Sensoren mit dem Attribut "daysTo" an
    // oder nur deren Kalender (neuere Versionen legen Sensoren nicht mehr automatisch an)
    waste: has((id) => (id.startsWith('sensor.') && hass.states[id].attributes.daysTo !== undefined) || isWasteCal(hass, id)),
    // Energie/PV wird erst mit dem Energie-Dashboard geprüft (async, folgt im Energie-Modul)
    energy: false,
  };
}

/* ------------------------------------------------------------------ */
/* Licht- und Rollo-Hilfen (Raumkarte und Popup)                       */
/* ------------------------------------------------------------------ */
const dimmable = (h, ids) => ids.some((id) => (h.states[id]?.attributes.supported_color_modes || []).some((m) => m !== 'onoff'));

const lightPct = (h, ids) => {
  const v = ids.map((id) => h.states[id]?.attributes.brightness).filter((b) => b != null);
  return v.length ? Math.max(1, Math.round((v.reduce((a, b) => a + b, 0) / v.length) / 2.55)) : 100;
};

// Anzeige als Schließ-%: 0 = offen, 100 = zu
const coverClosed = (h, ids) => {
  const v = ids.map((id) => {
    const s = h.states[id];
    if (!s) return null;
    if (s.attributes.current_position != null) return 100 - s.attributes.current_position;
    return s.state === 'closed' ? 100 : 0;
  }).filter((x) => x != null);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0;
};

const isAwning = (h, ids) => ids.length > 0 && ids.every((id) => h.states[id]?.attributes.device_class === 'awning');
const coverHasPosition = (h, ids) => ids.some((id) => (h.states[id]?.attributes.supported_features || 0) & 4);

function toggleKind(h, kind, ids) {
  if (kind === 'light') {
    const anyOn = ids.some((id) => h.states[id]?.state === 'on');
    h.callService('light', anyOn ? 'turn_off' : 'turn_on', { entity_id: ids });
  } else {
    h.callService('cover', coverClosed(h, ids) >= 50 ? 'open_cover' : 'close_cover', { entity_id: ids });
  }
}

function setKind(h, kind, ids, pct) {
  if (kind === 'light') {
    if (pct === 0) h.callService('light', 'turn_off', { entity_id: ids });
    else h.callService('light', 'turn_on', { entity_id: ids, brightness_pct: pct });
  } else {
    h.callService('cover', 'set_cover_position', { entity_id: ids, position: 100 - pct });
  }
}

// Tippen schaltet um, Ziehen setzt Helligkeit bzw. Rollo-Position.
// owner bekommt _dragging (verhindert Neuzeichnen beim Ziehen) und _sig zurückgesetzt.
function bindSlider(el, owner, getHass, ids) {
  const kind = el.dataset.k;
  const h0 = getHass();
  const canDrag = kind === 'light' ? dimmable(h0, ids) : coverHasPosition(h0, ids);
  const fill = el.querySelector('.f'), label = el.querySelector('b');
  let x0 = 0, moved = false, pct = 0;
  const calc = (ev) => {
    const r = el.getBoundingClientRect();
    return Math.round(Math.min(100, Math.max(0, ((ev.clientX - r.left) / r.width) * 100)));
  };
  el.addEventListener('pointerdown', (ev) => {
    x0 = ev.clientX; moved = false;
    el.setPointerCapture(ev.pointerId);
  });
  el.addEventListener('pointermove', (ev) => {
    if (!el.hasPointerCapture(ev.pointerId) || !canDrag) return;
    if (!moved && Math.abs(ev.clientX - x0) < 6) return;
    moved = true; owner._dragging = true; el.classList.add('drag');
    pct = calc(ev);
    fill.style.width = pct + '%';
    if (kind === 'light') { el.classList.toggle('on', pct > 0); el.classList.toggle('lbl', pct >= 30); el.classList.toggle('full', pct >= 85); }
    label.textContent = kind === 'light' ? (pct ? pct + ' %' : 'Aus') : (pct === 0 ? 'Offen' : pct === 100 ? 'Zu' : pct + ' %');
  });
  el.addEventListener('pointerup', (ev) => {
    if (!el.hasPointerCapture(ev.pointerId)) return;
    el.releasePointerCapture(ev.pointerId);
    el.classList.remove('drag');
    owner._dragging = false;
    if (moved) setKind(getHass(), kind, ids, pct); else toggleKind(getHass(), kind, ids);
    owner._sig = '';
  });
  el.addEventListener('pointercancel', () => { owner._dragging = false; el.classList.remove('drag'); owner._sig = ''; });
}

/* ------------------------------------------------------------------ */
/* Raumkarte                                                           */
/* ------------------------------------------------------------------ */
const ROOM_STYLE = `
  .rm{height:100%;padding:12px 14px;display:flex;flex-direction:column;gap:10px;min-height:118px;transition:background .3s,border-color .3s}
  .rm.lit{background:linear-gradient(140deg,rgba(var(--gh-lit),.16),rgba(255,255,255,.05) 70%);border-color:rgba(var(--gh-lit),.35)}
  .rh{display:flex;align-items:flex-start;gap:10px;cursor:pointer}
  .ic{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.08);color:var(--gh-mute);flex:none}
  .rm.lit .ic{background:rgba(var(--gh-lit),.22);color:rgb(var(--gh-lit))}
  .nm{min-width:0;flex:1}
  .nm b{font-size:15px;font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .nm small{font-size:12px;color:var(--gh-mute);display:block;margin-top:1px}
  .nm small.warn{color:var(--gh-warn)}
  .tp{margin-left:auto;text-align:right;font-size:20px;font-weight:300;line-height:1;white-space:nowrap}
  .tp small{display:block;font-size:11px;color:var(--gh-mute);margin-top:3px}
  .ctl{display:flex;flex-direction:column;justify-content:flex-end;gap:8px;margin-top:auto;flex:1}
  /* steht nur ein Regler in der Karte, füllt er den Platz neben einer höheren Karte */
  .ctl>.sl:only-child{flex:1;height:auto;min-height:36px;max-height:80px}
  .sl{height:36px;border-radius:11px;background:var(--gh-ctl);border:1px solid rgba(255,255,255,.1);position:relative;overflow:hidden;
      display:flex;align-items:center;gap:8px;padding:0 10px;font-size:12.5px;color:var(--gh-mute);
      touch-action:none;user-select:none;-webkit-user-select:none;cursor:pointer}
  .sl .f{position:absolute;inset:0 auto 0 0;width:0;background:var(--fc);transition:width .25s}
  .sl.drag .f{transition:none}
  .sl>*:not(.f){position:relative}
  .sl b{margin-left:auto;color:var(--gh-txt);font-weight:600;white-space:nowrap}
  .sl.l{--fc:rgba(var(--gh-lit),.8)}
  /* dunkle Schrift nur dort, wo die Füllung darunter liegt */
  .sl.l.on.lbl{color:#1b1206}.sl.l.on.full b{color:#1b1206}
  .sl.c{--fc:var(--gh-cover)}
  .empty{font-size:12px;color:var(--gh-dim)}
  @media (max-width:500px){ .ic{display:none} .tp{font-size:17px} }
`;

class GlassHomeRoomCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-room-editor'); }

  static getStubConfig(hass) {
    const first = Object.values(hass.areas || {})[0];
    return { area: first ? first.area_id : '' };
  }

  setConfig(config) {
    if (!config || !config.area) throw new Error('Bitte einen Bereich wählen (area).');
    this._config = { show_light: true, show_cover: true, show_climate: true, show_openings: true, ...config };
    this._sig = '';
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    // Nur neu zeichnen, wenn sich etwas im Raum geändert hat (spart Arbeit am Tablet)
    if (this._popup) this._popup.hass = hass;
    const ents = areaEntities(hass, this._config.area);
    const all = Object.values(ents).flat();
    const sig = all.map((id) => {
      const s = hass.states[id];
      return s ? `${id}|${s.state}|${s.attributes.brightness}|${s.attributes.current_position}|${s.attributes.current_temperature}|${s.last_changed}` : id;
    }).join(';') + `|${hass.areas?.[this._config.area]?.name}`;
    if (sig === this._sig || this._dragging) return;
    this._sig = sig;
    this._ents = ents;
    this._render();
  }

  getCardSize() { return 3; }
  getGridOptions() { return { columns: 6, min_columns: 4 }; }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, c = this._config, e = this._ents || areaEntities(h, c.area);
    const area = h.areas?.[c.area];
    const name = c.name || area?.name || c.area;

    const lights = c.show_light ? e.lights : [];
    const covers = c.show_cover ? e.covers : [];
    const lightsOn = lights.filter((id) => h.states[id]?.state === 'on');
    const openNow = c.show_openings ? e.openings.filter((id) => h.states[id]?.state === 'on') : [];

    // Klima: Thermostat hat Vorrang, sonst Mittelwert der Temperatursensoren
    let temp = null, hum = null;
    if (c.show_climate) {
      const cl = e.climates.map((id) => h.states[id]?.attributes.current_temperature).filter((v) => v != null);
      const ts = (cl.length ? cl : e.temps.map((id) => parseFloat(h.states[id]?.state))).filter((v) => !isNaN(v));
      if (ts.length) temp = ts.reduce((a, b) => a + b, 0) / ts.length;
      const hs = e.hums.map((id) => parseFloat(h.states[id]?.state)).filter((v) => !isNaN(v));
      if (hs.length) hum = Math.round(hs.reduce((a, b) => a + b, 0) / hs.length);
    }

    // Untertitel: Hinweis zuerst, dann Kurzstatus
    let sub = '', warn = false;
    const longOn = lightsOn.find((id) => Date.now() - new Date(h.states[id].last_changed) > 2 * 3600e3);
    if (openNow.length) {
      sub = openNow.length === 1 ? `${h.states[openNow[0]].attributes.friendly_name || 'Fenster'} offen` : `${openNow.length} Fenster/Türen offen`;
      warn = true;
    } else if (longOn) {
      sub = `Licht seit ${Math.floor((Date.now() - new Date(h.states[longOn].last_changed)) / 3600e3)} Std`;
      warn = true;
    } else {
      const parts = [];
      if (lights.length) parts.push(lightsOn.length ? `${lightsOn.length === 1 ? 'Licht' : lightsOn.length + ' Lichter'} an` : 'Licht aus');
      if (covers.length) {
        const cl = this._coverClosed(covers);
        if (this._isAwning(covers)) parts.push(cl === 0 ? 'Markise ausgefahren' : cl === 100 ? 'Markise eingefahren' : `Markise ${100 - cl} % aus`);
        else parts.push(cl === 0 ? 'Rollo offen' : cl === 100 ? 'Rollo zu' : `Rollo ${cl} % zu`);
      }
      sub = parts.join(' · ') || (e.openings.length ? 'alles zu' : '');
    }

    const bri = this._lightPct(lightsOn);
    const coverClosed = covers.length ? this._coverClosed(covers) : 0;
    const awning = this._isAwning(covers);
    const coverWord = awning ? 'Markise' : covers.length > 1 ? 'Rollos' : 'Rollo';
    const lp = lightsOn.length ? bri : 0;

    const ctl = [];
    if (lights.length) ctl.push(`
      <div class="sl l ${lightsOn.length ? 'on' : ''} ${lp >= 30 ? 'lbl' : ''} ${lp >= 85 ? 'full' : ''}" data-k="light">
        <span class="f" style="width:${lp}%"></span>${icon('bulb', 15)}<span>${lights.length > 1 ? 'Lichter' : 'Licht'}</span>
        <b>${lightsOn.length ? (this._dimmable(lightsOn) ? bri + ' %' : 'An') : 'Aus'}</b></div>`);
    if (covers.length) ctl.push(`
      <div class="sl c" data-k="cover">
        <span class="f" style="width:${coverClosed}%"></span>${icon('blinds', 15)}<span>${coverWord}</span>
        <b>${awning ? (coverClosed === 100 ? 'Ein' : coverClosed === 0 ? 'Aus' : 100 - coverClosed + ' %') : coverClosed === 0 ? 'Offen' : coverClosed === 100 ? 'Zu' : coverClosed + ' %'}</b></div>`);

    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${ROOM_STYLE}</style>
      <div class="rm p ${lightsOn.length ? 'lit' : ''}">
        <div class="rh">
          <span class="ic">${area?.icon ? `<ha-icon icon="${esc(area.icon)}" style="--mdc-icon-size:18px"></ha-icon>` : icon(roomIcon(name))}</span>
          <div class="nm"><b>${esc(name)}</b><small class="${warn ? 'warn' : ''}">${esc(sub)}</small></div>
          ${temp != null ? `<div class="tp">${fmt(temp)}°${hum != null ? `<small>${hum} %</small>` : ''}</div>` : ''}
        </div>
        <div class="ctl">${ctl.join('') || (temp == null ? '<span class="empty">Keine Geräte in diesem Bereich</span>' : '')}</div>
      </div>`;

    this.shadowRoot.querySelector('.rh').addEventListener('click', () => this._moreInfo());
    this.shadowRoot.querySelectorAll('.sl').forEach((el) => bindSlider(el, this, () => this._hass, el.dataset.k === 'light' ? lights : covers));
  }

  _dimmable(ids) { return dimmable(this._hass, ids); }
  _lightPct(ids) { return lightPct(this._hass, ids); }
  _coverClosed(ids) { return coverClosed(this._hass, ids); }
  _isAwning(ids) { return isAwning(this._hass, ids); }

  _moreInfo() {
    // Übersicht aller Geräte dieses Raums, nach Art gruppiert
    document.querySelector('glass-home-popup')?.close();
    const pop = document.createElement('glass-home-popup');
    pop.kind = 'room';
    pop.area = this._config.area;
    document.body.appendChild(pop);
    pop.hass = this._hass;
    this._popup = pop;
    pop.onclose = () => { if (this._popup === pop) this._popup = null; };
  }
}

/* ------------------------------------------------------------------ */
/* Editor der Raumkarte (nutzt ha-form, damit er wie HA aussieht)      */
/* ------------------------------------------------------------------ */
const ROOM_SCHEMA = [
  { name: 'area', required: true, selector: { area: {} } },
  { name: 'name', selector: { text: {} } },
  {
    type: 'grid', name: '', schema: [
      { name: 'show_light', selector: { boolean: {} } },
      { name: 'show_cover', selector: { boolean: {} } },
      { name: 'show_climate', selector: { boolean: {} } },
      { name: 'show_openings', selector: { boolean: {} } },
    ],
  },
];
const ROOM_LABELS = {
  area: 'Bereich', name: 'Name (leer = Name des Bereichs)',
  show_light: 'Lichter zeigen', show_cover: 'Rollos zeigen', show_climate: 'Temperatur zeigen', show_openings: 'Fenster/Türen zeigen',
};

class GlassHomeRoomEditor extends HTMLElement {
  setConfig(config) {
    this._config = { show_light: true, show_cover: true, show_climate: true, show_openings: true, ...config };
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  _update() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (s) => ROOM_LABELS[s.name] || s.name;
      this._form.addEventListener('value-changed', (ev) => {
        const config = { ...ev.detail.value };
        if (!config.name) delete config.name;
        this._config = config;
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = ROOM_SCHEMA;
    this._form.data = this._config;
  }
}

/* ------------------------------------------------------------------ */
/* Kopfzeile: Begrüßung, Hinweise mit Aktion, Wetter                   */
/* ------------------------------------------------------------------ */
const WX_TEXT = {
  'clear-night': 'Klar', cloudy: 'Bewölkt', exceptional: 'Unwetter', fog: 'Nebel', hail: 'Hagel',
  lightning: 'Gewitter', 'lightning-rainy': 'Gewitter mit Regen', partlycloudy: 'Leicht bewölkt',
  pouring: 'Starkregen', rainy: 'Regen', snowy: 'Schnee', 'snowy-rainy': 'Schneeregen', sunny: 'Sonnig',
  windy: 'Windig', 'windy-variant': 'Windig, bewölkt',
};
const WX_ICON = {
  'clear-night': 'moon', cloudy: 'cloud', fog: 'cloud', hail: 'rain', lightning: 'bolt', 'lightning-rainy': 'bolt',
  partlycloudy: 'cloudsun', pouring: 'rain', rainy: 'rain', snowy: 'snow', 'snowy-rainy': 'snow', sunny: 'sun',
  windy: 'wind', 'windy-variant': 'wind', exceptional: 'bolt',
};
const WEEKDAY = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const greeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 5) return 'Gute Nacht';
  if (h < 11) return 'Guten Morgen';
  if (h < 14) return 'Mahlzeit';
  if (h < 18) return 'Guten Tag';
  if (h < 22) return 'Guten Abend';
  return 'Gute Nacht';
};

const HEADER_STYLE = `
  :host{container-type:inline-size}
  .wrap{display:grid;grid-template-columns:1fr minmax(220px,300px);gap:10px}
  .hero{padding:16px 22px;min-width:0}
  .hero h1{margin:0;font-size:30px;font-weight:300;line-height:1.15}.hero h1 b{font-weight:600}
  .hero p{margin:4px 0 0;color:var(--gh-mute);font-size:14px}
  .alerts{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
  .al{display:flex;align-items:center;gap:8px;padding:4px 4px 4px 12px;min-height:32px;border-radius:999px;font-size:13px;
      background:rgba(255,183,77,.10);border:1px solid rgba(255,183,77,.45);color:var(--gh-warn)}
  .al.ok{background:rgba(95,214,142,.10);border-color:rgba(95,214,142,.45);color:#b8f0cc;padding:4px 12px}
  .al .act{background:rgba(255,255,255,.14);color:var(--gh-txt);border:0;border-radius:999px;padding:5px 11px;
      font:inherit;font-weight:600;font-size:12px;cursor:pointer}
  .al .act:active{transform:scale(.96)}
  .al.info{padding:4px 12px;background:rgba(255,255,255,.06);border-color:var(--gh-line);color:var(--gh-txt);cursor:pointer}.al.info svg{color:var(--c)}
  .al.more{padding:4px 12px;color:var(--gh-mute);background:rgba(255,255,255,.06);border-color:var(--gh-line)}
  .wx{padding:16px 20px;display:flex;align-items:center;gap:16px;cursor:pointer;
      background:linear-gradient(135deg,rgba(255,200,90,.12),rgba(255,255,255,.05) 60%),var(--gh-bg)}
  .wx .t{font-size:52px;font-weight:200;line-height:1;white-space:nowrap}.wx .t sup{font-size:20px;color:var(--gh-mute);vertical-align:top}
  .wx small{display:block;font-size:12px;color:var(--gh-mute);margin-top:4px}
  .fc{display:flex;gap:10px;margin-top:8px;font-size:11.5px;color:var(--gh-mute)}.fc b{color:var(--gh-txt);font-weight:500}
  .wrap.nowx{grid-template-columns:1fr}
  .wrap.wide{grid-template-columns:1fr minmax(260px,400px)}
  .wx.wk{flex-direction:column;align-items:stretch;justify-content:safe center;gap:8px;padding:10px 12px;min-width:0;overflow:hidden}
  .wk .nw{display:flex;align-items:center;gap:12px}.wk .nw .t{font-size:36px}.wk .nw small{margin-top:2px}
  .wk7{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:2px;text-align:center}
  .wk7 span{display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 0;border-radius:10px;min-width:0}
  .wk7 span.td{background:rgba(255,255,255,.07)}
  .wx.wk{container-type:size}.wk7 u{text-decoration:none}.wk7 s{display:none;text-decoration:none}
  /* niedrige Wetterfläche: kompakter, damit oben nichts abgeschnitten wird */
  @container (max-height:180px){.wx.wk{gap:4px;padding:8px 12px}.wk .nw{gap:10px}.wk .nw svg{width:34px;height:34px}.wk .nw .t{font-size:30px}.wk .nw .t sup{font-size:15px}.wk7 span{padding:2px 0;gap:1px}}
  @container (max-height:150px){.wk .nw small{display:none}.wk7 i{display:none}}
  /* schmale Wetterfläche (z. B. 3 Spalten mit Seitenleiste): nur Höchstwert, kurzer Tagname */
  @container (max-width:300px){.wk7 i,.wk7 u{display:none}.wk7 s{display:inline}.wk7 b{font-size:12px}
    .wk .nw .t{font-size:30px}.wk .nw small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wk .nw>div{min-width:0}.wx.wk{gap:6px}}
  .wk7 em{font-style:normal;font-size:11px;color:var(--gh-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
  .wk7 b{font-size:13px;font-weight:600;white-space:nowrap}.wk7 i{font-style:normal;font-size:11px;font-weight:400;color:var(--gh-mute)}
  .wrap{height:100%;grid-template-rows:minmax(0,1fr)}.wrap>section{height:100%;min-height:0;overflow:hidden}
  /* Hinweise immer in einer Zeile zum Wischen statt umbrechen (die Kachel hat eine feste Höhe) */
  .alerts{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 90%,transparent)}
  .alerts::-webkit-scrollbar{display:none}
  .al{flex:none}
  @container (max-width:620px){
    .wrap,.wrap.wide{grid-template-columns:1fr;grid-template-rows:auto}.wrap>section{height:auto}
    .wrap.wide .wx.wk{container-type:inline-size}
    .hero{padding:14px 16px}.hero h1{font-size:24px}
    .wx{padding:12px 16px}.wx .t{font-size:40px}
  }
`;

class GlassHomeHeaderCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-header-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { show_weather: true, show_alerts: true, light_hours: 2, ...(config || {}) };
    this._sig = '';
    this._resub();
    if (this._hass) this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first || this._wxId !== this._weatherId()) this._resub();
    const sig = this._signature();
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  connectedCallback() {
    // Begrüßung und "seit X Std" ändern sich ohne Zustandswechsel
    this._tick = setInterval(() => { this._sig = ''; if (this._hass) this.hass = this._hass; }, 60e3);
    this._resub();
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._unsub();
  }

  getCardSize() { return 3; }
  getGridOptions() { return { columns: 'full' }; }

  _weatherId() {
    if (!this._config.show_weather || !this._hass) return null;
    if (this._config.weather) return this._config.weather;
    // ohne Vorgabe: erste Wetter-Entität, die gerade Daten liefert
    const all = Object.keys(this._hass.states).filter((id) => id.startsWith('weather.') && visible(this._hass, id));
    return all.find((id) => !['unknown', 'unavailable'].includes(this._hass.states[id].state)) || all[0] || null;
  }

  _unsub() {
    if (this._unsubFc) { this._unsubFc.then((f) => f && f()).catch(() => {}); this._unsubFc = null; }
  }

  // Vorhersage kommt seit HA 2023.9 nur noch per Abo
  _resub() {
    if (!this._hass || !this.isConnected) return;
    const id = this._weatherId();
    if (id === this._wxId && this._unsubFc) return;
    this._unsub();
    this._wxId = id;
    this._forecast = null;
    if (!id || !this._hass.connection) return;
    this._unsubFc = this._hass.connection.subscribeMessage((msg) => {
      this._forecast = msg.forecast || [];
      this._sig = '';
      this._render();
    }, { type: 'weather/subscribe_forecast', forecast_type: 'daily', entity_id: id }).catch(() => null);
  }

  _signature() {
    const h = this._hass;
    const ids = Object.keys(h.states).filter((id) => /^(light|lock|binary_sensor|weather)\./.test(id) || isWasteCal(h, id) || (id.startsWith('sensor.') && (h.states[id].attributes.device_class === 'temperature' || h.states[id].attributes.daysTo !== undefined)));
    return ids.map((id) => { const a = h.states[id].attributes; return `${id}|${h.states[id].state}|${a.temperature ?? ''}|${a.daysTo ?? ''}|${a.start_time ?? ''}`; }).join(';') + greeting();
  }

  _alerts() {
    const h = this._hass, c = this._config, out = [];
    const ids = Object.keys(h.states).filter((id) => visible(h, id));
    const nm = (id) => h.states[id].attributes.friendly_name || id;
    // offene Fenster und Türen
    for (const id of ids) {
      const s = h.states[id];
      if (id.startsWith('binary_sensor.') && ['door', 'window', 'opening', 'garage_door'].includes(s.attributes.device_class) && s.state === 'on') {
        out.push({ text: `${nm(id)} offen`, icon: 'door', act: 'Anzeigen', run: () => this._moreInfo(id) });
      }
    }
    // Lichter, die lange brennen (nur welche mit Bereich, sonst meldet sich jede Deko-Lampe)
    const limit = (Number(c.light_hours) || 2) * 3600e3;
    for (const id of ids) {
      const s = h.states[id];
      if (!id.startsWith('light.') || s.state !== 'on' || !entityArea(h, id)) continue;
      const dt = Date.now() - new Date(s.last_changed);
      if (dt < limit) continue;
      const area = h.areas?.[entityArea(h, id)]?.name;
      out.push({ text: `Licht ${area || nm(id)} seit ${Math.floor(dt / 3600e3)} Std`, icon: 'bulb', act: 'Ausschalten', run: () => h.callService('light', 'turn_off', { entity_id: id }) });
    }
    // Müll: heute oder morgen (Waste Collection Schedule)
    for (const id of wasteSensors(h)) {
      const d = Number(h.states[id].attributes.daysTo);
      if (d === 0 || d === 1) out.push({ text: `${d ? 'Morgen' : 'Heute'} ${nm(id)}`, icon: 'trash', act: 'Anzeigen', run: () => this._moreInfo(id) });
    }
    // ohne Sensoren: nächster Termin des Müllkalenders (Attribute message/start_time)
    if (!wasteSensors(h).length) {
      for (const id of ids.filter((x) => isWasteCal(h, x))) {
        const a = h.states[id].attributes, d = daysUntil(a.start_time);
        if (a.message && (d === 0 || d === 1)) out.push({ text: `${d ? 'Morgen' : 'Heute'} ${a.message}`, icon: 'trash', act: 'Anzeigen', run: () => this._moreInfo(id) });
      }
    }
    // Schlösser
    const locks = ids.filter((id) => id.startsWith('lock.'));
    for (const id of locks) {
      const st = h.states[id].state;
      if (st === 'unlocked' || st === 'open') out.push({ text: `${nm(id)} offen`, icon: 'lock', act: 'Zusperren', run: () => h.callService('lock', 'lock', { entity_id: id }) });
      else if (st === 'jammed') out.push({ text: `${nm(id)} blockiert`, icon: 'lock', act: 'Anzeigen', run: () => this._moreInfo(id) });
    }
    if (!out.length) {
      if (locks.length && locks.every((id) => h.states[id].state === 'locked')) out.push({ ok: true, text: locks.length === 1 ? `${nm(locks[0])} versperrt` : 'Alles versperrt', icon: 'lock' });
      else out.push({ ok: true, text: 'Alles in Ordnung', icon: 'check' });
    }
    // nächster Mülltermin immer zeigen (ab übermorgen; heute/morgen kommt oben als Hinweis)
    if (c.show_waste_next !== false) {
      const next = [];
      for (const id of wasteSensors(h)) next.push({ id, name: nm(id), d: Number(h.states[id].attributes.daysTo) });
      if (!next.length) for (const id of ids.filter((x) => isWasteCal(h, x))) { const a = h.states[id].attributes; if (a.message) next.push({ id, name: a.message, d: daysUntil(a.start_time) }); }
      const n = next.filter((x) => x.d >= 2).sort((a, b) => a.d - b.d)[0];
      if (n && !next.some((x) => x.d === 0 || x.d === 1)) out.push({ info: true, color: wasteColor(n.name), text: `${n.name} ${dayWord(n.d)}`, icon: 'trash', run: () => this._moreInfo(n.id) });
    }
    return out;
  }

  _summary() {
    const h = this._hass, parts = [];
    // Lichter und Rollos zählen wie die Statuskacheln alle sichtbaren, Temperaturen nur mit Bereich (innen)
    const all = Object.keys(h.states).filter((id) => visible(h, id));
    const ids = all.filter((id) => entityArea(h, id));
    const lights = all.filter((id) => id.startsWith('light.'));
    if (lights.length) {
      const on = lights.filter((id) => h.states[id].state === 'on').length;
      parts.push(on ? `${on === 1 ? '1 Licht' : on + ' Lichter'} an` : 'Alle Lichter aus');
    }
    const temps = ids.filter((id) => id.startsWith('sensor.') && h.states[id].attributes.device_class === 'temperature')
      .map((id) => parseFloat(h.states[id].state)).filter((v) => !isNaN(v));
    if (temps.length) parts.push(`innen ${fmt(temps.reduce((a, b) => a + b, 0) / temps.length)} °C im Schnitt`);
    const covers = all.filter((id) => id.startsWith('cover.') && !['garage', 'gate', 'door'].includes(h.states[id].attributes.device_class));
    if (covers.length) {
      const closed = covers.filter((id) => h.states[id].state === 'closed').length;
      parts.push(closed === covers.length ? 'Rollos zu' : closed ? `${closed} von ${covers.length} Rollos zu` : 'Rollos offen');
    }
    return parts.join(' · ');
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, c = this._config;
    const un = h.user?.name || '';
    const first = /^familie /i.test(un) ? un : un.split(' ')[0];
    // names: { viewer: 'Familie Huber' } begrüßt einzelne Benutzer mit eigenem Text (z. B. ein gemeinsames Wandtablet)
    const byUser = Object.entries(c.names || {}).find(([k]) => k.toLowerCase() === un.toLowerCase())?.[1];
    const who = byUser || c.name || (first ? first.charAt(0).toUpperCase() + first.slice(1) : '');
    const alerts = c.show_alerts ? this._alerts() : [];
    const shown = alerts.slice(0, 4), rest = alerts.length - shown.length;
    const wxId = this._weatherId(), wx = wxId && h.states[wxId];
    // part: hero = nur Begrüßung, weather = nur Wetter (für das Glass-Raster), sonst beides
    const part = c.part || 'both';

    let wxHtml = '';
    if (wx) {
      const a = wx.attributes, unit = a.temperature_unit || '°C';
      const n = Math.max(0, Math.min(10, Number(c.forecast_days ?? 3)));
      const extra = a.apparent_temperature != null ? ` · gefühlt ${Math.round(a.apparent_temperature)}°` : a.humidity != null ? ` · ${Math.round(a.humidity)} %` : '';
      const now = `<div class="t">${a.temperature != null ? fmt(a.temperature) : '–'}<sup>${esc(unit)}</sup></div>
        <small>${esc(WX_TEXT[wx.state] || wx.state)}${extra}</small>`;
      if (n > 3) {
        // Wochenleiste: heute + folgende Tage, je Symbol, Höchst- und Tiefstwert
        const today = new Date().toDateString();
        const days = (this._forecast || []).filter((f) => dayStart(new Date(f.datetime)) >= dayStart(new Date())).slice(0, n);
        const strip = days.map((f) => {
          const d = new Date(f.datetime), isToday = d.toDateString() === today;
          return `<span class="${isToday ? 'td' : ''}"><em>${isToday ? `<u>Heute</u><s>${WEEKDAY[d.getDay()]}</s>` : WEEKDAY[d.getDay()]}</em>${icon(WX_ICON[f.condition] || 'cloudsun', 20)}
            <b>${Math.round(f.temperature)}°${f.templow != null ? `<i> ${Math.round(f.templow)}°</i>` : ''}</b></span>`;
        }).join('');
        wxHtml = `<section class="wx wk p"><div class="nw">${icon(WX_ICON[wx.state] || 'cloudsun', 44)}<div>${now}</div></div>
          ${strip ? `<div class="wk7" style="--n:${days.length}">${strip}</div>` : ''}</section>`;
      } else {
        const fc = (this._forecast || []).slice(1, 1 + n).map((f) => {
          const d = new Date(f.datetime);
          return `<span>${WEEKDAY[d.getDay()]} <b>${Math.round(f.temperature)}°</b></span>`;
        }).join('');
        wxHtml = `<section class="wx p">${icon(WX_ICON[wx.state] || 'cloudsun', 58)}
          <div>${now}${fc ? `<div class="fc">${fc}</div>` : ''}</div></section>`;
      }
    }

    const heroHtml = part === 'weather' ? '' : `
        <section class="hero p">
          <h1>${greeting()}${who ? `, <b>${esc(who)}</b>` : ''}</h1>
          <p>${esc(this._summary())}</p>
          ${alerts.length ? `<div class="alerts">${shown.map((al, i) => `
            <span class="al ${al.ok ? 'ok' : ''} ${al.info ? 'info' : ''}" ${al.info ? `style="--c:${al.color}" data-i="${i}"` : ''}>${icon(al.icon, 16)}${esc(al.text)}${al.act ? `<button class="act" data-i="${i}">${al.act}</button>` : ''}</span>`).join('')}
            ${rest > 0 ? `<span class="al more">+${rest} weitere</span>` : ''}</div>` : ''}
        </section>`;
    const wxPart = part === 'hero' ? '' : wxHtml;
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${HEADER_STYLE}</style>
      <div class="wrap ${wxPart && heroHtml ? '' : 'nowx'} ${heroHtml && wxPart.includes('wx wk') ? 'wide' : ''}">${heroHtml}${wxPart}</div>`;

    this.shadowRoot.querySelectorAll('.act,.al.info').forEach((b) => b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      shown[b.dataset.i].run();
    }));
    this.shadowRoot.querySelector('.wx')?.addEventListener('click', () => this._moreInfo(wxId));
  }

  _moreInfo(id) {
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
  }
}

const HEADER_SCHEMA = [
  { name: 'name', selector: { text: {} } },
  { name: 'weather', selector: { entity: { domain: 'weather' } } },
  {
    type: 'grid', name: '', schema: [
      { name: 'show_weather', selector: { boolean: {} } },
      { name: 'part', selector: { select: { mode: 'dropdown', options: [{ value: 'both', label: 'Begrüßung und Wetter' }, { value: 'hero', label: 'Nur Begrüßung' }, { value: 'weather', label: 'Nur Wetter' }] } } },
      { name: 'show_alerts', selector: { boolean: {} } },
    ],
  },
  { name: 'forecast_days', selector: { number: { min: 0, max: 10, step: 1, mode: 'box', unit_of_measurement: 'Tage' } } },
  { name: 'light_hours', selector: { number: { min: 1, max: 12, step: 1, mode: 'box', unit_of_measurement: 'Std' } } },
];
const HEADER_LABELS = {
  name: 'Name in der Begrüßung (leer = angemeldeter Benutzer)', weather: 'Wetter (leer = automatisch)',
  show_weather: 'Wetter zeigen', part: 'Teil', forecast_days: 'Vorschau (Tage, ab 4 als Wochenleiste)', show_alerts: 'Hinweise zeigen', light_hours: 'Hinweis, wenn Licht länger an ist als',
};

// Gemeinsamer Editor auf Basis von ha-form
class GlassHomeFormEditor extends HTMLElement {
  setConfig(config) { this._config = { ...this.constructor.defaults, ...config }; this._update(); }
  set hass(hass) { this._hass = hass; this._update(); }
  _update() {
    if (!this._config || !this._hass) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.computeLabel = (s) => this.constructor.labels[s.name] || s.name;
      this._form.addEventListener('value-changed', (ev) => {
        const config = { ...ev.detail.value };
        for (const k of Object.keys(config)) if (config[k] === '' || config[k] == null) delete config[k];
        this._config = config;
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
      });
      this.appendChild(this._form);
    }
    this._form.hass = this._hass;
    this._form.schema = this.constructor.schema;
    this._form.data = this._config;
  }
}

class GlassHomeHeaderEditor extends GlassHomeFormEditor {
  static schema = HEADER_SCHEMA;
  static labels = HEADER_LABELS;
  static defaults = { show_weather: true, show_alerts: true, light_hours: 2, forecast_days: 3 };
}

/* ------------------------------------------------------------------ */
/* Hilfen für Symbole: mdi-Namen über ha-icon, sonst eigene Symbole    */
/* ------------------------------------------------------------------ */
const anyIcon = (name, size = 20) => {
  if (name && name.includes(':')) return `<ha-icon icon="${esc(name)}" style="--mdc-icon-size:${size}px;width:${size}px;height:${size}px;display:flex"></ha-icon>`;
  return icon(name || 'home', size);
};

const guessIcon = (text = '') => {
  const t = text.toLowerCase();
  if (/nacht|night|schlaf/.test(t)) return 'moon';
  if (/abend|morgen|evening|morning|sonne/.test(t)) return 'sun';
  if (/film|kino|tv|movie/.test(t)) return 'play';
  if (/weg|abwesend|urlaub|away/.test(t)) return 'shield';
  if (/rollo|beschatt|sonnenschutz/.test(t)) return 'blinds';
  if (/aus|off/.test(t)) return 'bulb';
  if (/energie|pv|strom/.test(t)) return 'bolt';
  if (/müll|muell|abfall/.test(t)) return 'trash';
  if (/einkauf|liste/.test(t)) return 'cart';
  if (/raum|räume|zimmer/.test(t)) return 'sofa';
  if (/licht/.test(t)) return 'bulb';
  return 'home';
};

/* ------------------------------------------------------------------ */
/* Szenen                                                              */
/* ------------------------------------------------------------------ */
const SCENE_STYLE = `
  :host{container-type:inline-size}
  /* mindestens 4 Spalten, damit eine einzelne Kachel nicht die ganze Breite füllt */
  .row{display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:10px}
  @container (max-width:900px){ .row{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))} }
  .sc{display:flex;align-items:center;gap:12px;padding:10px 14px;min-height:62px;cursor:pointer;user-select:none;-webkit-user-select:none;
      transition:transform .12s,background .3s,border-color .3s}
  .sc:active{transform:scale(.97)}
  .sc .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:rgba(255,255,255,.08);color:var(--gh-mute);flex:none}
  .sc b{font-size:15px;font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sc small{font-size:12px;color:var(--gh-mute);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sc>div{min-width:0}
  .sc.on{border-color:rgba(var(--gh-lit),.6);background:rgba(var(--gh-lit),.12)}
  .sc.on .ic{background:rgba(var(--gh-lit),.25);color:rgb(var(--gh-lit))}
  .sc.flash{background:rgba(255,255,255,.16)}
  .empty{padding:14px 16px;font-size:13px;color:var(--gh-dim)}
  @container (max-width:520px){
    .row{grid-template-columns:repeat(3,1fr);gap:8px}
    .sc{flex-direction:column;justify-content:center;text-align:center;padding:10px 6px;gap:6px}
    .sc b{font-size:13px}.sc small{display:none}
  }
`;

class GlassHomeScenesCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-scenes-editor'); }
  static getStubConfig() { return { all_off: true }; }

  setConfig(config) {
    this._config = { all_off: true, max: 5, ...(config || {}) };
    this._sig = '';
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const sig = this._items().map((it) => `${it.entity}|${hass.states[it.entity]?.state}`).join(';') + '|' + this._lightsOn().length;
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 'full' }; }

  // Einträge: Liste aus der Konfiguration, sonst alle sichtbaren Szenen
  _items() {
    const h = this._hass, c = this._config;
    let list = (c.scenes || []).map((x) => (typeof x === 'string' ? { entity: x } : x)).filter((x) => x && x.entity);
    if (!list.length) {
      list = Object.keys(h.states).filter((id) => id.startsWith('scene.') && visible(h, id))
        .sort((a, b) => (h.states[a].attributes.friendly_name || a).localeCompare(h.states[b].attributes.friendly_name || b, 'de'))
        .slice(0, Math.max(1, (Number(c.max) || 5) - (c.all_off ? 1 : 0)))
        .map((entity) => ({ entity }));
    }
    return list;
  }

  _lightsOn() {
    const h = this._hass;
    return Object.keys(h.states).filter((id) => id.startsWith('light.') && visible(h, id) && entityArea(h, id) && h.states[id].state === 'on');
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, c = this._config;
    const items = this._items();

    // Als "aktiv" gilt die zuletzt ausgelöste Szene, wenn das weniger als 6 Std her ist
    let active = null, newest = 0;
    for (const it of items) {
      const st = h.states[it.entity];
      if (!st || !it.entity.startsWith('scene.')) continue;
      const t = Date.parse(st.state);
      if (!isNaN(t) && t > newest) { newest = t; active = it.entity; }
    }
    if (Date.now() - newest > 6 * 3600e3) active = null;

    const tiles = items.map((it, i) => {
      const st = h.states[it.entity];
      const name = it.name || st?.attributes.friendly_name || it.entity;
      const ic = it.icon || st?.attributes.icon || guessIcon(name);
      const on = it.entity === active || (it.entity.startsWith('script.') && st?.state === 'on');
      const sub = it.sub || (on ? 'aktiv' : !st ? 'nicht gefunden' : '');
      return `<div class="sc p ${on ? 'on' : ''}" data-i="${i}"><span class="ic">${anyIcon(ic, 20)}</span>
        <div><b>${esc(name)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div></div>`;
    });
    if (c.all_off) {
      const n = this._lightsOn().length;
      tiles.push(`<div class="sc p" data-i="off"><span class="ic">${icon('bulb', 20)}</span>
        <div><b>Alles aus</b><small>${n ? `${n === 1 ? '1 Licht' : n + ' Lichter'} an` : 'alle Lichter aus'}</small></div></div>`);
    }

    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${SCENE_STYLE}</style>
      ${tiles.length ? `<div class="row" style="--n:${Math.max(4, tiles.length)}">${tiles.join('')}</div>` : '<div class="p empty">Noch keine Szenen. In HA unter Einstellungen → Automationen & Szenen anlegen.</div>'}`;

    this.shadowRoot.querySelectorAll('.sc').forEach((el) => el.addEventListener('click', () => {
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 350);
      if (el.dataset.i === 'off') {
        const ids = this._lightsOn();
        if (ids.length) h.callService('light', 'turn_off', { entity_id: ids });
        return;
      }
      const id = items[el.dataset.i].entity;
      const dom = id.split('.')[0];
      if (dom === 'scene' || dom === 'script') h.callService(dom, 'turn_on', { entity_id: id });
    }));
  }
}

class GlassHomeScenesEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'scenes', selector: { entity: { multiple: true, filter: [{ domain: 'scene' }, { domain: 'script' }] } } },
    {
      type: 'grid', name: '', schema: [
        { name: 'all_off', selector: { boolean: {} } },
        { name: 'max', selector: { number: { min: 2, max: 10, step: 1, mode: 'box' } } },
      ],
    },
  ];
  static labels = { scenes: 'Szenen und Skripte (leer = alle Szenen automatisch)', all_off: 'Kachel „Alles aus“', max: 'Höchstens (automatisch)' };
  static defaults = { all_off: true, max: 5 };
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
const NAV_STYLE = `
  :host{container-type:inline-size}
  .nav{display:flex;align-items:center;gap:6px;padding:8px;min-height:60px;height:100%;box-sizing:border-box}
  .nav a{height:42px;min-width:42px;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;color:var(--gh-mute);
         padding:0 12px;font-size:14px;cursor:pointer;text-decoration:none;white-space:nowrap;user-select:none;-webkit-user-select:none}
  .nav a.on{background:rgba(255,255,255,.14);color:var(--gh-txt);font-weight:600;font-size:15px}
  .nav .sp{flex:1}
  .clk{text-align:right;margin-right:8px;line-height:1.15}.clk b{font-size:26px;font-weight:400;display:block}.clk span{font-size:11px;color:var(--gh-mute)}
  @container (max-width:620px){
    .nav a:not(.on) em{display:none}
    .nav a{padding:0 10px}
    .clk b{font-size:20px}
  }
  @container (max-width:360px){ .clk span{display:none} }
  em{font-style:normal}
`;

// Lovelace-Konfiguration über die Shadow-DOM-Grenzen hinweg suchen
function findLovelace(el) {
  let n = el;
  for (let i = 0; n && i < 40; i++) {
    if (n.lovelace?.config?.views) return n.lovelace;
    n = n.parentNode || n.host;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Kiosk: HA-Kopfzeile und Seitenleiste ausblenden (z. B. Wandtablet) */
/* kiosk: [viewer] | non_admin | true; ?kiosk / ?kiosk=0 in der URL   */
/* ------------------------------------------------------------------ */
const KIOSK_CSS = {
  // neue Seitenleiste ab HA 2026.10 (.sidebar-shell/.app-content) und ältere (.mdc-drawer)
  drawer: '.sidebar-shell,.mdc-drawer{display:none!important}.app-content,.mdc-drawer-app-content{padding-left:0!important;padding-inline-start:0!important;margin-left:0!important;width:100%!important}',
  main: 'ha-sidebar{display:none!important}',
  root: '.header{display:none!important}#view{padding-top:0!important;margin-top:0!important;min-height:100vh!important}',
};
let kioskUsers = 0;

function kioskWanted(hass, opt) {
  // ?kiosk schaltet für diesen Tab ein, ?kiosk=0 aus (z. B. um an die Einstellungen zu kommen)
  const q = new URLSearchParams(location.search).get('kiosk');
  try { if (q !== null) sessionStorage.setItem('gh_kiosk', q === '0' ? '0' : '1'); } catch (e) {}
  let s = null;
  try { s = sessionStorage.getItem('gh_kiosk'); } catch (e) {}
  if (q !== null) s = q === '0' ? '0' : '1';
  if (s === '0') return false;
  if (s === '1') return true;
  const u = hass?.user;
  if (!opt || !u) return false;
  if (opt === true || opt === 'all') return true;
  if (opt === 'non_admin') return !u.is_admin;
  const list = Array.isArray(opt) ? opt : [opt];
  return list.some((n) => String(n).toLowerCase() === (u.name || '').toLowerCase());
}

function kioskStyle(root, css) {
  if (!root) return false;
  let st = root.querySelector('style[data-gh-kiosk]');
  if (!css) { st?.remove(); return false; }
  if (!st) { st = document.createElement('style'); st.dataset.ghKiosk = ''; root.appendChild(st); }
  if (st.textContent !== css) { st.textContent = css; return true; }
  return false;
}

// hui-root liegt oberhalb der Karte; die Seitenleiste in home-assistant-main
function applyKiosk(on, from) {
  const main = document.querySelector('home-assistant')?.shadowRoot?.querySelector('home-assistant-main');
  const drawer = main?.shadowRoot?.querySelector('ha-drawer');
  let root = null;
  for (let n = from, i = 0; n && i < 60; i++) {
    if (n.localName === 'hui-root') { root = n; break; }
    n = n.parentNode || n.host;
  }
  if (!root) root = main?.shadowRoot?.querySelector('ha-panel-lovelace')?.shadowRoot?.querySelector('hui-root');
  let changed = kioskStyle(drawer?.shadowRoot, on && KIOSK_CSS.drawer);
  changed = kioskStyle(main?.shadowRoot, on && KIOSK_CSS.main) || changed;
  changed = kioskStyle(root?.shadowRoot, on && KIOSK_CSS.root) || changed;
  if (root) { if (on) root.style.setProperty('--header-height', '0px'); else root.style.removeProperty('--header-height'); }
  // sections-Layout rechnet die Spalten neu
  if (changed) requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
}

class GlassHomeNavCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-nav-editor'); }
  static getStubConfig() { return { show_clock: true }; }

  setConfig(config) {
    this._config = { show_clock: true, ...(config || {}) };
    if (this._hass) this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first && this._config) this._render();
    this._kiosk();
  }

  // Kiosk prüfen und anwenden; HA baut die Seitenleiste beim Laden neu, daher regelmäßig nachziehen
  _kiosk() {
    const on = !!this._hass && kioskWanted(this._hass, this._config?.kiosk);
    if (!on && !this._kioskOn) return;
    this._kioskOn = on;
    applyKiosk(on, this);
  }

  connectedCallback() {
    kioskUsers++;
    this._kTick = setInterval(() => this._kiosk(), 2e3);
    this._kiosk();
    this._onLoc = () => this._render();
    window.addEventListener('location-changed', this._onLoc);
    window.addEventListener('popstate', this._onLoc);
    this._tick = setInterval(() => this._clock(), 15e3);
    // Ansichten sind erst nach dem Einhängen erreichbar
    requestAnimationFrame(() => this._hass && this._render());
  }

  disconnectedCallback() {
    window.removeEventListener('location-changed', this._onLoc);
    window.removeEventListener('popstate', this._onLoc);
    clearInterval(this._tick);
    clearInterval(this._kTick);
    kioskUsers--;
    // beim Ansichtswechsel kommt gleich die nächste Navigation; erst wenn keine mehr da ist, wieder einblenden
    if (this._kioskOn) setTimeout(() => { if (kioskUsers <= 0) applyKiosk(false, null); }, 800);
  }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 'full' }; }

  _basePath() {
    const parts = location.pathname.split('/').filter(Boolean);
    return '/' + (parts[0] || 'lovelace');
  }

  // Einträge: aus der Konfiguration, sonst aus den Ansichten des Dashboards
  _items() {
    const c = this._config, base = this._basePath();
    const mods = this._hass ? detectModules(this._hass) : {};
    if (c.items?.length) {
      return c.items
        .filter((it) => !it.module || mods[it.module] !== false)
        .map((it) => ({ name: it.name || '', icon: it.icon || guessIcon(it.name), path: it.path?.startsWith('/') ? it.path : `${base}/${it.path ?? ''}` }));
    }
    const views = findLovelace(this)?.config?.views || [];
    return views
      .map((v, i) => ({ v, i }))
      .filter(({ v }) => !v.subview && v.visible !== false)
      .map(({ v, i }) => ({ name: v.title || '', icon: v.icon || guessIcon(v.title), path: `${base}/${v.path ?? i}` }));
  }

  _render() {
    if (!this._config) return;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const items = this._items();
    const here = location.pathname.replace(/\/$/, '');
    // aktiver Eintrag: genauer Pfad, sonst erster Eintrag auf der Startadresse des Dashboards
    let act = items.findIndex((it) => it.path === here);
    if (act < 0 && here === this._basePath()) act = 0;

    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${NAV_STYLE}</style>
      <nav class="nav p">
        ${items.map((it, i) => `<a class="${i === act ? 'on' : ''}" data-p="${esc(it.path)}" title="${esc(it.name)}" style="--nc:${NAV_COLORS[i % NAV_COLORS.length]}">${anyIcon(it.icon, 20)}${it.name ? `<em>${esc(it.name)}</em>` : ''}</a>`).join('')}
        ${items.length ? '' : '<span style="color:var(--gh-dim);font-size:13px;padding:0 8px">Keine Ansichten gefunden</span>'}
        <span class="sp"></span>
        ${this._config.show_clock ? '<div class="clk"><b></b><span></span></div>' : ''}
      </nav>`;
    this._clock();

    this.shadowRoot.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      const p = a.dataset.p;
      if (!p || p === location.pathname) return;
      history.pushState(null, '', p);
      window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
    }));
  }

  _clock() {
    const el = this.shadowRoot?.querySelector('.clk');
    if (!el) return;
    const d = new Date();
    const tz = this._hass?.config?.time_zone;
    const opt = tz ? { timeZone: tz } : {};
    el.querySelector('b').textContent = d.toLocaleTimeString('de-AT', { ...opt, hour: '2-digit', minute: '2-digit' });
    el.querySelector('span').textContent = d.toLocaleDateString('de-AT', { ...opt, weekday: 'short', day: 'numeric', month: 'long' });
  }
}

class GlassHomeNavEditor extends GlassHomeFormEditor {
  static schema = [{ name: 'show_clock', selector: { boolean: {} } }];
  static labels = { show_clock: 'Uhrzeit und Datum zeigen (Einträge kommen automatisch aus den Ansichten)' };
  static defaults = { show_clock: true };
}

/* ------------------------------------------------------------------ */
/* Statuskacheln mit Übersichts-Popup                                  */
/* ------------------------------------------------------------------ */
const OPENING_CLASSES = ['door', 'window', 'opening', 'garage_door'];
const NON_BLIND_COVERS = ['garage', 'gate', 'door'];

// Alle sichtbaren Entitäten einer Art, nach Bereich gruppiert (Bereiche alphabetisch, ohne Bereich zuletzt)
function collect(hass, kind, list) {
  // feste Auswahl aus der Kartenkonfiguration (z.B. plugs: [...]): genau diese, nach Bereich gruppiert
  const fixed = Array.isArray(list) ? new Set(list.filter((id) => hass.states[id])) : null;
  const pick = fixed ? (id) => fixed.has(id) : {
    lights: (id) => id.startsWith('light.'),
    covers: (id) => id.startsWith('cover.') && !NON_BLIND_COVERS.includes(hass.states[id].attributes.device_class),
    climate: (id) => id.startsWith('climate.') || (id.startsWith('sensor.') && ['temperature', 'humidity'].includes(hass.states[id].attributes.device_class)),
    openings: (id) => (id.startsWith('binary_sensor.') && OPENING_CLASSES.includes(hass.states[id].attributes.device_class))
      || (id.startsWith('cover.') && NON_BLIND_COVERS.includes(hass.states[id].attributes.device_class)),
    locks: (id) => id.startsWith('lock.'),
    // Steckdosen: Schalter mit Geräteklasse outlet oder passendem Namen
    plugs: (id) => id.startsWith('switch.') && (hass.states[id].attributes.device_class === 'outlet'
      || /steckdose|plug|outlet|socket/i.test(id + ' ' + (hass.states[id].attributes.friendly_name || ''))),
    presence: (id) => id.startsWith('person.'),
  }[kind];
  const ids = fixed ? [...fixed] : Object.keys(hass.states);
  const groups = new Map();
  for (const id of ids) {
    if ((!fixed && !visible(hass, id)) || !pick(id)) continue;
    // Temperaturen ohne Bereich (z.B. Außenfühler, Demo-Werte) gehören nicht in die Innenübersicht
    const area = entityArea(hass, id);
    if (kind === 'climate' && !area && !fixed) continue;
    if (!groups.has(area)) groups.set(area, []);
    groups.get(area).push(id);
  }
  const name = (a) => (a ? hass.areas?.[a]?.name || a : kind === 'presence' ? 'Personen' : 'Ohne Bereich');
  return [...groups.entries()]
    .sort(([a], [b]) => (a ? 0 : 1) - (b ? 0 : 1) || name(a).localeCompare(name(b), 'de'))
    .map(([area, ids]) => ({ area, name: name(area), ids }));
}

const isOpen = (hass, id) => {
  const s = hass.states[id];
  if (!s) return false;
  return id.startsWith('cover.') ? s.state !== 'closed' : s.state === 'on';
};

function avg(list) { return list.length ? list.reduce((a, b) => a + b, 0) / list.length : null; }

// Kurzwerte für Kachel und Popup-Kopf
function summarize(hass, kind, list) {
  const g = collect(hass, kind, list), ids = g.flatMap((x) => x.ids);
  if (!ids.length) return null;
  const st = (id) => hass.states[id];
  switch (kind) {
    case 'lights': {
      const on = ids.filter((id) => st(id).state === 'on').length;
      return { value: on ? `${on} an` : 'Alle aus', label: `Lichter · ${ids.length}`, icon: 'bulb', hot: on > 0, color: '255,183,77' };
    }
    case 'covers': {
      const open = ids.filter((id) => st(id).state !== 'closed').length;
      return { value: open ? `${open} offen` : 'Alle zu', label: `Rollos · ${ids.length}`, icon: 'blinds', color: '201,210,220' };
    }
    case 'climate': {
      const t = avg(ids.filter((id) => id.startsWith('sensor.') && st(id).attributes.device_class === 'temperature').map((id) => parseFloat(st(id).state)).filter((v) => !isNaN(v)));
      const tc = avg(ids.filter((id) => id.startsWith('climate.')).map((id) => st(id).attributes.current_temperature).filter((v) => v != null));
      // feste Auswahl: alle gewählten Fühler und Thermostate zusammen
      const v = list ? avg(ids.map((id) => tempOf(hass, id)).filter((x) => x != null)) : t ?? tc;
      if (v == null) return null;
      return { value: `${fmt(v)}°`, label: 'Ø Innen', icon: 'temp', color: '95,214,142' };
    }
    case 'openings': {
      const open = ids.filter((id) => isOpen(hass, id)).length;
      return { value: open ? `${open} offen` : 'Alle zu', label: 'Fenster & Türen', icon: 'door', hot: open > 0, warn: open > 0, color: '255,183,77' };
    }
    case 'locks': {
      const open = ids.filter((id) => st(id).state !== 'locked').length;
      return { value: open ? `${open} offen` : 'Versperrt', label: `Schlösser · ${ids.length}`, icon: 'lock', warn: open > 0, color: open ? '255,183,77' : '95,214,142' };
    }
    case 'plugs': {
      const on = ids.filter((id) => st(id).state === 'on').length;
      return { value: on ? `${on} an` : 'Alle aus', label: `Steckdosen · ${ids.length}`, icon: 'plug', hot: on > 0, color: '77,208,225' };
    }
    case 'presence': {
      const home = ids.filter((id) => st(id).state === 'home');
      const first = (id) => (st(id).attributes.friendly_name || id.split('.')[1]).split(' ')[0];
      const value = home.length === ids.length ? (ids.length > 1 ? 'Alle zuhause' : 'Zuhause') : home.length ? `${home.length} von ${ids.length} da` : 'Niemand da';
      const label = home.length && home.length < 4 ? home.map(first).join(', ') : 'Anwesenheit';
      return { value, label, icon: 'home', hot: home.length > 0, color: '180,140,255' };
    }
  }
  return null;
}

// Leere Kachel zum Einrichten (nur Steckdosen und Temperatur, die man selbst zusammenstellt)
const EDIT_KINDS = ['plugs', 'climate'];
const emptyTile = (kind) => (kind === 'plugs'
  ? { value: 'Keine', label: 'Steckdosen · antippen', icon: 'plug', color: '77,208,225', empty: true }
  : { value: '–', label: 'Temperatur · antippen', icon: 'temp', color: '95,214,142', empty: true });

// Kandidaten zum Hinzufügen im Popup
function candidates(hass, kind) {
  const name = (id) => hass.states[id].attributes.friendly_name || id;
  const ok = kind === 'plugs'
    ? (id) => id.startsWith('switch.')
    : (id) => id.startsWith('climate.') || (id.startsWith('sensor.') && ['temperature', 'humidity'].includes(hass.states[id].attributes.device_class));
  return Object.keys(hass.states).filter((id) => ok(id) && visible(hass, id))
    .map((id) => {
      const a = entityArea(hass, id);
      return { id, label: name(id) + (a ? ` · ${hass.areas?.[a]?.name || a}` : '') };
    })
    .sort((a, b) => a.label.localeCompare(b.label, 'de'));
}

// Temperaturkarte im Dashboard: ihre Fühler gelten auch für die Statuskachel
const GH_SHARED = { temp: null, open: null, live: new Set() };
const setSharedTemp = (v) => { GH_SHARED.temp = v; window.dispatchEvent(new CustomEvent('gh-temps')); };

// Beim Speichern baut HA die Karten neu; das offene Popup bleibt und geht an die neue Karte über
function keepPopup(card, type, rebind) {
  const pop = card._popup;
  GH_SHARED.open = { type, pop, rebind };
  // nach dem Neuaufbau übernimmt die neue Karte; findet sich keine, schließt das Popup
  for (const t of [300, 1500, 4000, 10000]) setTimeout(() => {
    if (GH_SHARED.open?.pop !== pop) return;
    const next = [...GH_SHARED.live].find((c) => c._ghType === type && c.isConnected && c !== card);
    if (next) adoptPopup(next, type);
    else if (t === 10000) { GH_SHARED.open = null; pop.close('keine Karte nach dem Speichern'); }
  }, t);
}

function adoptPopup(card, type) {
  const o = GH_SHARED.open;
  if (!o || o.type !== type || (card._popup && card._popup !== o.pop) || !o.pop.isConnected) return;
  GH_SHARED.open = null;
  card._popup = o.pop;
  o.rebind(card);
  o.pop.onclose = () => { if (card._popup === o.pop) card._popup = null; };
}

// Kartenkonfiguration speichern lassen (übernimmt die Glass-Rasteransicht)
function saveCard(el, detail) {
  const d = { ...detail, handled: false };
  // HA baut nach dem Speichern die Karten (oft zweimal) neu; so lange bleibt ein offenes Popup erhalten
  GH_SHARED.savingUntil = Date.now() + 10000;
  el.dispatchEvent(new CustomEvent('gh-save-card', { detail: d, bubbles: true, composed: true }));
  return d.handled;
}

const KIND_TITLE = { lights: 'Lichter', covers: 'Rollos', climate: 'Temperaturen', openings: 'Fenster & Türen', locks: 'Schlösser', plugs: 'Steckdosen', presence: 'Wer ist zuhause' };
// Reihenfolge der Statuskacheln
const ALL_KINDS = ['openings', 'lights', 'covers', 'plugs', 'presence', 'climate', 'locks'];

const STATUS_STYLE = `
  :host{container-type:inline-size;height:100%}
  .row{height:100%;box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:10px}
  .tile{display:flex;align-items:center;gap:12px;padding:10px 14px;min-height:0;overflow:hidden;cursor:pointer;user-select:none;-webkit-user-select:none;transition:transform .12s,border-color .3s}
  .tile:active{transform:scale(.97)}
  .tile .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;flex:none;
            background:rgba(var(--c),.16);color:rgb(var(--c))}
  .tile.off .ic{background:rgba(255,255,255,.08);color:var(--gh-mute)}
  .tile.warn{border-color:rgba(255,183,77,.55)}
  .tile>div{min-width:0}
  .tile b{font-size:16px;font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .tile small{font-size:12px;color:var(--gh-mute);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  /* eng: eine Zeile, Kacheln kompakter, notfalls seitlich wischen */
  @container (max-width:1100px){
    .row{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:minmax(118px,1fr);gap:8px;overflow-x:auto;scrollbar-width:none}
    .row::-webkit-scrollbar{display:none}
    .tile{padding:6px 10px;gap:8px}.tile .ic{width:30px;height:30px;border-radius:10px}.tile b{font-size:15px}.tile small{font-size:11.5px}
  }
  @container (max-width:520px){ .row{grid-template-columns:1fr 1fr;grid-auto-flow:row;grid-auto-columns:auto;overflow:visible} .tile{padding:10px 12px;min-height:62px} }
`;

class GlassHomeStatusCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-status-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { ...(config || {}) };
    this._sig = null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    adoptPopup(this, 'status');
    if (this._popup) this._popup.hass = hass;
    if (!this._config) return;
    const sig = this._tiles().map((t) => JSON.stringify(this._sum(t.type))).join(';');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  connectedCallback() {
    this._ghType = 'status';
    GH_SHARED.live.add(this);
    this._onTemps = () => { this._sig = ''; if (this._hass) this.hass = this._hass; };
    window.addEventListener('gh-temps', this._onTemps);
    if (this._hass) adoptPopup(this, 'status');
  }

  disconnectedCallback() {
    GH_SHARED.live.delete(this);
    window.removeEventListener('gh-temps', this._onTemps);
    if (this._popup && Date.now() < (GH_SHARED.savingUntil || 0)) {
      const pop = this._popup, kind = pop.kind;
      keepPopup(this, 'status', (c) => { pop.onedit = (ids) => c._saveList(kind, ids); });
      return;
    }
    this._popup?.close('Statuskarte entfernt');
  }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 'full' }; }

  // feste Auswahl: Steckdosen aus plugs, Temperatur aus der Temperaturkarte oder temps
  _list(kind) {
    if (kind === 'plugs') return this._config.plugs;
    if (kind === 'climate') {
      const t = GH_SHARED.temp;
      if (t) return Array.isArray(t.ids) ? t.ids : t.owner?._hass ? t.owner._ids() : undefined;
      return this._config.temps;
    }
    return undefined;
  }

  _canEdit() { return !!this._hass?.user?.is_admin; }

  _sum(kind) {
    const s = summarize(this._hass, kind, this._list(kind));
    if (s || !EDIT_KINDS.includes(kind)) return s;
    // leer: Admins sehen die Kachel zum Einrichten, sonst nur wenn ausdrücklich gewählt
    const chosen = this._config.tiles?.some((t) => (typeof t === 'string' ? t : t.type) === kind);
    return chosen || this._canEdit() ? emptyTile(kind) : null;
  }

  _saveList(kind, ids) {
    if (kind === 'climate' && GH_SHARED.temp) {
      GH_SHARED.temp.ids = ids;
      return saveCard(this, { type: 'custom:glass-home-temperature', patch: { entities: ids } });
    }
    const key = kind === 'plugs' ? 'plugs' : 'temps';
    this._config = { ...this._config, [key]: ids };
    return saveCard(this, { self: true, patch: { [key]: ids } });
  }

  // Kacheln: aus der Konfiguration (Text oder {type, navigate, name}), sonst alle erkannten
  _tiles() {
    const list = (this._config.tiles?.length ? this._config.tiles : ALL_KINDS)
      .map((t) => (typeof t === 'string' ? { type: t } : t))
      .filter((t) => ALL_KINDS.includes(t.type));
    return list.filter((t) => this._sum(t.type));
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const tiles = this._tiles();
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${STATUS_STYLE}</style>
      <div class="row" style="--n:${Math.max(4, tiles.length)}">${tiles.map((t, i) => {
        const s = this._sum(t.type);
        return `<div class="tile p ${s.warn ? 'warn' : ''} ${!s.empty && (s.hot || s.warn || t.type === 'climate' || t.type === 'locks') ? '' : 'off'}" data-i="${i}" style="--c:${s.color}">
          <span class="ic">${icon(s.icon, 20)}</span><div><b>${esc(s.value)}</b><small>${esc(t.name || s.label)}</small></div></div>`;
      }).join('')}</div>`;
    this.shadowRoot.querySelectorAll('.tile').forEach((el) => el.addEventListener('click', () => {
      const t = tiles[el.dataset.i];
      if (t.navigate) {
        history.pushState(null, '', t.navigate);
        window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
        return;
      }
      this._open(t.type);
    }));
  }

  _open(kind) {
    this._popup?.close();
    const pop = document.createElement('glass-home-popup');
    pop.kind = kind;
    pop.list = this._list(kind);
    if (EDIT_KINDS.includes(kind) && this._canEdit()) pop.onedit = (ids) => this._saveList(kind, ids);
    pop.onclose = () => { if (this._popup === pop) this._popup = null; };
    document.body.appendChild(pop);
    pop.hass = this._hass;
    this._popup = pop;
  }
}

const POPUP_STYLE = `
  :host{position:fixed;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;height:auto}
  .bg{position:absolute;inset:0;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);animation:fade .2s}
  .sheet{position:relative;width:min(760px,calc(100vw - 32px));max-height:min(86vh,900px);display:flex;flex-direction:column;
         background:var(--glass-home-popup,rgba(34,38,43,.94));animation:up .22s ease-out}
  .top{display:flex;align-items:center;gap:10px;padding:16px 18px 10px}
  .top h2{margin:0;font-size:20px;font-weight:600}
  .top small{color:var(--gh-mute);font-size:13px}
  .x{margin-left:auto;width:38px;height:38px;border-radius:12px;border:0;background:rgba(255,255,255,.08);color:var(--gh-txt);font-size:20px;cursor:pointer}
  .acts{display:flex;gap:8px;padding:0 18px 10px;flex-wrap:wrap}
  .acts button{height:38px;padding:0 16px;border-radius:12px;border:0;background:rgba(255,255,255,.08);color:var(--gh-txt);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
  .acts button:active,.x:active{transform:scale(.96)}
  .body{overflow:auto;padding:4px 18px 18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:10px;align-items:start}
  .grp{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}
  .grp h3{margin:0 0 2px;font-size:13px;font-weight:600;color:var(--gh-mute);letter-spacing:.02em}
  .ln{display:flex;align-items:center;gap:10px;min-height:36px;font-size:14px}
  .ln span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ln b{font-weight:600;white-space:nowrap}
  .ln b.warn{color:var(--gh-warn)}
  .ln b.ok{color:#8fe3b0}
  .ln button{height:32px;padding:0 12px;border-radius:10px;border:0;background:rgba(255,255,255,.1);color:var(--gh-txt);font:inherit;font-size:12px;font-weight:600;cursor:pointer}
  .ln.tap{cursor:pointer}
  .big{font-size:20px;font-weight:300}
  .cell{display:contents}
  .ln button.xrm{width:32px;padding:0;flex:none;background:rgba(255,255,255,.06);color:var(--gh-mute)}
  .addr{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:0 18px 18px;font-size:13px;color:var(--gh-mute)}
  .addr select{flex:1;min-width:180px;height:40px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:var(--gh-txt);font:inherit;font-size:14px;padding:0 10px}
  .addr select option{background:#22262b;color:#eef1f4}
  .addr button{height:40px;padding:0 16px;border-radius:12px;border:0;background:rgba(255,183,77,.22);color:#ffcf8a;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
  .addr .warnm{color:var(--gh-warn);width:100%}
  .sl span.n{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  @keyframes fade{from{opacity:0}}
  @keyframes up{from{transform:translateY(16px);opacity:0}}
  @media (max-width:600px){
    :host{align-items:flex-end}
    .sheet{width:100vw;max-height:88vh;border-radius:22px 22px 0 0}
    .body{grid-template-columns:1fr}
  }
`;

class GlassHomePopup extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (this._dragging) return;
    const g = this.kind === 'room' ? this._roomGroups(hass) : collect(hass, this.kind, this.list);
    const sig = g.flatMap((x) => x.ids).map((id) => {
      const s = hass.states[id];
      return `${id}|${s?.state}|${s?.attributes.brightness}|${s?.attributes.current_position}|${s?.attributes.current_temperature}`;
    }).join(';');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render(g);
  }

  connectedCallback() {
    this._esc = (ev) => ev.key === 'Escape' && this.close();
    window.addEventListener('keydown', this._esc);
  }

  disconnectedCallback() { window.removeEventListener('keydown', this._esc); }

  close(why) {
    if (!this.isConnected) return;
    if (why) console.info('[Glass Home] Popup geschlossen:', why);
    this.remove();
    this.onclose?.();
  }

  // Raum-Popup: je Art eine Gruppe mit den Geräten dieses Bereichs
  _roomGroups(hass) {
    const room = hass.areas?.[this.area]?.name || this.area;
    return ALL_KINDS.map((k) => ({ k, ids: collect(hass, k).find((g) => g.area === this.area)?.ids || [] }))
      .filter((g) => g.ids.length).map((g) => ({ area: g.k, name: KIND_TITLE[g.k], ids: g.ids, kind: g.k, room }));
  }

  // Eine Zeile pro Gerät. Wird bei Änderungen einzeln ersetzt, damit nichts flackert.
  _row(id, area, k = this.kind) {
    const h = this._hass, st = h.states[id];
    if (!st) return '';
    let n = h.entities?.[id]?.name || st.attributes.friendly_name || id;
    // Bereichsnamen vorne weglassen, steht schon in der Überschrift
    if (area && n.toLowerCase().startsWith(area.toLowerCase() + ' ')) n = n.slice(area.length + 1);
    n = esc(n);
    if (k === 'lights') {
      const on = st.state === 'on', p = on ? lightPct(h, [id]) : 0;
      return `<div class="sl l ${on ? 'on' : ''} ${p >= 30 ? 'lbl' : ''} ${p >= 85 ? 'full' : ''}" data-k="light" data-id="${id}">
        <span class="f" style="width:${p}%"></span>${icon('bulb', 15)}<span class="n">${n}</span><b>${on ? (dimmable(h, [id]) ? p + ' %' : 'An') : 'Aus'}</b></div>`;
    }
    if (k === 'covers') {
      const cl = coverClosed(h, [id]);
      return `<div class="sl c" data-k="cover" data-id="${id}"><span class="f" style="width:${cl}%"></span>${icon('blinds', 15)}
        <span class="n">${n}</span><b>${cl === 0 ? 'Offen' : cl === 100 ? 'Zu' : cl + ' %'}</b></div>`;
    }
    if (k === 'climate') {
      const isCl = id.startsWith('climate.');
      const val = isCl ? st.attributes.current_temperature : parseFloat(st.state);
      const unit = st.attributes.device_class === 'humidity' ? ' %' : '°';
      const extra = isCl && st.attributes.temperature != null ? ` <small style="color:var(--gh-mute)">→ ${fmt(st.attributes.temperature)}°</small>` : '';
      return `<div class="ln tap" data-mi="${id}"><span>${n}</span><b class="big">${val != null && !isNaN(val) ? fmt(val) + unit : '–'}</b>${extra}</div>`;
    }
    if (k === 'openings') {
      const o = isOpen(h, id);
      return `<div class="ln tap" data-mi="${id}"><span>${n}</span><b class="${o ? 'warn' : 'ok'}">${o ? 'Offen' : 'Zu'}</b></div>`;
    }
    if (k === 'locks') {
      const locked = st.state === 'locked';
      return `<div class="ln"><span>${n}</span><b class="${locked ? 'ok' : 'warn'}">${locked ? 'Versperrt' : st.state === 'jammed' ? 'Blockiert' : 'Offen'}</b>
        <button data-lock="${id}" data-to="${locked ? 'unlock' : 'lock'}">${locked ? 'Aufsperren' : 'Zusperren'}</button></div>`;
    }
    if (k === 'plugs') {
      const on = st.state === 'on';
      return `<div class="ln"><span>${n}</span><b class="${on ? 'warn' : ''}">${on ? 'An' : 'Aus'}</b>
        <button data-tog="${id}">${on ? 'Ausschalten' : 'Einschalten'}</button></div>`;
    }
    if (k === 'presence') {
      const where = st.state === 'home' ? 'Zuhause' : st.state === 'not_home' ? 'Unterwegs' : (st.state === 'unknown' || st.state === 'unavailable') ? 'Unbekannt' : st.state;
      return `<div class="ln tap" data-mi="${id}"><span>${n}</span><b class="${st.state === 'home' ? 'ok' : ''}">${esc(where)}</b></div>`;
    }
    return '';
  }

  _rowE(id, area, k) {
    const html = this._row(id, area, k);
    if (!this.onedit || !html) return html;
    return html.replace(/<\/div>\s*$/, `<button class="xrm" data-rm="${id}" title="Entfernen">✕</button></div>`);
  }

  _setList(ids) {
    this.list = ids;
    const ok = this.onedit?.(ids);
    this._saveMsg = ok === false ? 'Speichern geht nur im Glass-Raster.' : '';
    // null statt '': eine leere Auswahl hat ebenfalls die Signatur ''
    this._sig = null;
    this.hass = this._hass;
  }

  _bindRow(box) {
    const h = () => this._hass;
    box.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this._setList(this._all.filter((x) => x !== b.dataset.rm));
    }));
    box.querySelectorAll('.sl').forEach((el) => bindSlider(el, this, h, [el.dataset.id]));
    box.querySelectorAll('[data-mi]').forEach((el) => el.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.mi }, bubbles: true, composed: true }));
      this.close();
    }));
    box.querySelectorAll('[data-lock]').forEach((b) => b.addEventListener('click', () => h().callService('lock', b.dataset.to, { entity_id: b.dataset.lock })));
    box.querySelectorAll('[data-tog]').forEach((b) => b.addEventListener('click', () => h().callService('switch', 'toggle', { entity_id: b.dataset.tog })));
  }

  _render(groups) {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, k = this.kind, s = k === 'room' ? null : summarize(h, k, this.list);
    this._all = groups.flatMap((x) => x.ids);

    // Rahmen nur einmal aufbauen, sonst startet die Einblend-Animation bei jedem Update neu
    if (!this._shell) {
      let acts = '';
      if (k === 'lights') acts = '<button data-a="lights_off">Alle aus</button>';
      if (k === 'covers') acts = '<button data-a="covers_open">▲ Alle auf</button><button data-a="covers_stop">■ Stopp</button><button data-a="covers_close">▼ Alle zu</button>';
      this.shadowRoot.innerHTML = `<style>${GH_STYLE}${ROOM_STYLE}${POPUP_STYLE}</style>
        <div class="bg"></div>
        <div class="sheet p">
          <div class="top"><div><h2>${esc(k === 'room' ? h.areas?.[this.area]?.name || this.area : KIND_TITLE[k])}</h2><small class="sum"></small></div><button class="x" aria-label="Schließen">✕</button></div>
          ${acts ? `<div class="acts">${acts}</div>` : ''}
          <div class="body"></div>
          <div class="addb"></div>
        </div>`;
      this.shadowRoot.querySelector('.bg').addEventListener('click', () => this.close());
      this.shadowRoot.querySelector('.x').addEventListener('click', () => this.close());
      this.shadowRoot.querySelectorAll('.acts button').forEach((b) => b.addEventListener('click', () => {
        const hh = this._hass, all = this._all;
        const lightsOn = all.filter((id) => hh.states[id]?.state === 'on');
        const a = b.dataset.a;
        if (a === 'lights_off' && lightsOn.length) hh.callService('light', 'turn_off', { entity_id: lightsOn });
        if (a === 'covers_open') hh.callService('cover', 'open_cover', { entity_id: all });
        if (a === 'covers_stop') hh.callService('cover', 'stop_cover', { entity_id: all });
        if (a === 'covers_close') hh.callService('cover', 'close_cover', { entity_id: all });
      }));
      this._shell = true;
    }
    this.shadowRoot.querySelector('.sum').textContent = s ? s.value : '';

    const bodyEl = this.shadowRoot.querySelector('.body');
    const struct = groups.map((g) => g.area + ':' + g.ids.join(',')).join('|');
    if (struct !== this._struct) {
      // Geräte oder Bereiche haben sich geändert: Inhalt neu aufbauen
      this._struct = struct;
      // gemerkt wird der erzeugte Text, nicht innerHTML (der Browser schreibt ihn anders zurück)
      this._rows = {};
      bodyEl.innerHTML = groups.map((g) => {
        let ids = g.ids;
        const gk = g.kind || k, trim = g.room || g.name;
        if (gk === 'openings') ids = [...ids].sort((a, b) => isOpen(h, b) - isOpen(h, a));
        return `<div class="grp"><h3>${esc(g.name)}</h3>${ids.map((id) => {
          this._rows[id] = this._rowE(id, trim, gk);
          return `<div class="cell" data-row="${id}" data-area="${esc(trim)}" data-kind="${gk}">${this._rows[id]}</div>`;
        }).join('')}</div>`;
      }).join('') || `<span style="color:var(--gh-dim)">${this.onedit ? 'Noch nichts ausgewählt. Unten hinzufügen.' : 'Keine Geräte gefunden'}</span>`;
      bodyEl.querySelectorAll('.cell').forEach((c) => this._bindRow(c));
      this._renderAdd();
      return;
    }
    // Nur geänderte Zeilen ersetzen
    bodyEl.querySelectorAll('.cell').forEach((c) => {
      const html = this._rowE(c.dataset.row, c.dataset.area, c.dataset.kind);
      if (html === this._rows[c.dataset.row]) return;
      this._rows[c.dataset.row] = html;
      c.innerHTML = html;
      this._bindRow(c);
    });
  }
}

// Popup: Auswahl zum Hinzufügen (Steckdosen, Temperaturfühler)
GlassHomePopup.prototype._renderAdd = function () {
  const box = this.shadowRoot.querySelector('.addb');
  if (!box) return;
  if (!this.onedit) { box.innerHTML = ''; return; }
  const have = new Set(this._all);
  const opts = candidates(this._hass, this.kind).filter((c) => !have.has(c.id));
  const what = this.kind === 'plugs' ? 'Steckdose' : 'Temperaturfühler';
  box.innerHTML = `<div class="addr">${opts.length
    ? `<select><option value="">${what} hinzufügen …</option>${opts.map((o) => `<option value="${esc(o.id)}">${esc(o.label)}</option>`).join('')}</select><button>Hinzufügen</button>`
    : `<span>${this.kind === 'plugs' ? 'Keine (weiteren) Schalter in HA gefunden. Zuerst die Steckdose in HA koppeln.' : 'Keine (weiteren) Temperaturfühler in HA gefunden.'}</span>`}
    ${this._saveMsg ? `<span class="warnm">${esc(this._saveMsg)}</span>` : ''}</div>`;
  const sel = box.querySelector('select');
  box.querySelector('button')?.addEventListener('click', () => { if (sel.value) this._setList([...this._all, sel.value]); });
};

/* ------------------------------------------------------------------ */
/* Temperatur: selbst gewählte Fühler mit Durchschnitt                 */
/* ------------------------------------------------------------------ */
const TEMP_STYLE = `
  :host{container-type:inline-size}
  .card{padding:14px 14px 12px;display:flex;flex-direction:column;height:100%;box-sizing:border-box;overflow:auto;gap:8px}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:16px;padding:0 2px 2px}
  .hd .ti{color:#7ab8ff;display:flex}
  .hd small{margin-left:auto;font-weight:400;font-size:12.5px;color:var(--gh-mute);white-space:nowrap}
  .hd button{width:30px;height:30px;border-radius:9px;border:0;background:none;color:var(--gh-mute);cursor:pointer;display:grid;place-items:center;flex:none}
  .hd button:hover{background:rgba(255,255,255,.08)}
  .tr{display:grid;grid-template-columns:32px minmax(0,1fr) auto;align-items:center;column-gap:12px;padding:10px 14px;border-radius:14px;
      background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:border-color .3s}
  .tr.warn{border-color:rgba(255,183,77,.6);box-shadow:0 0 0 3px rgba(255,183,77,.06)}
  .tr .ic{color:var(--gh-mute);display:grid;place-items:center;width:32px;height:32px}
  .tr .nm{min-width:0}
  .tr .nm b{display:block;font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:8px}
  .bar{height:6px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden}
  .bar i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,#4dd0e1,#7ed08a 45%,#ffb74d 75%,#ff7a59)}
  .tr .v{text-align:right;line-height:1.1}
  .tr .v b{display:block;font-size:24px;font-weight:300}
  .tr .v small{font-size:12.5px;color:var(--gh-mute)}
  .tr.warn .v small{color:#ffb74d;font-weight:600}
  .msg{font-size:13px;color:var(--gh-mute);line-height:1.45}
  @container (max-width:300px){ .tr{padding:8px 10px;column-gap:8px} .tr .v b{font-size:20px} }
`;


const isHum = (hass, id) => id.startsWith('sensor.') && hass.states[id]?.attributes.device_class === 'humidity';
const humOf = (hass, id) => { const v = parseFloat(hass.states[id]?.state); return isNaN(v) ? null : v; };
const tempOf = (hass, id) => {
  const st = hass.states[id];
  if (!st || isHum(hass, id)) return null;
  const v = id.startsWith('climate.') ? st.attributes.current_temperature : parseFloat(st.state);
  return v == null || isNaN(v) ? null : Number(v);
};

class GlassHomeTemperatureCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-temperature-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { ...(config || {}) };
    this._sig = null;
    if (this.isConnected) setSharedTemp({ ids: this._config.entities, owner: this });
    if (this._hass) this._render();
  }

  connectedCallback() {
    this._ghType = 'temperature';
    GH_SHARED.live.add(this);
    if (this._config) setSharedTemp({ ids: this._config.entities, owner: this });
    if (this._hass) adoptPopup(this, 'temperature');
  }

  disconnectedCallback() {
    GH_SHARED.live.delete(this);
    if (GH_SHARED.temp?.owner === this) setSharedTemp(null);
    if (this._popup && Date.now() < (GH_SHARED.savingUntil || 0)) {
      const pop = this._popup;
      keepPopup(this, 'temperature', (c) => { pop.onedit = (ids) => c._edit(ids); });
      return;
    }
    this._popup?.close('Temperaturkarte entfernt');
  }

  set hass(hass) {
    this._hass = hass;
    adoptPopup(this, 'temperature');
    if (this._popup) this._popup.hass = hass;
    if (!this._config) return;
    const sig = JSON.stringify(this._rooms().map((r) => [r.key, r.temp, r.hum]));
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: 4, rows: 6 }; }

  // gewählte Fühler, sonst alle Innen-Temperaturen und -Feuchten (mit Bereich)
  _ids() {
    if (Array.isArray(this._config.entities)) return this._config.entities.filter((id) => this._hass.states[id]);
    return collect(this._hass, 'climate').flatMap((g) => g.ids);
  }

  // je Raum (Bereich) eine Zeile: Ø Temperatur, Feuchte (gewählt oder aus dem Bereich), sonst je Fühler
  _rooms() {
    const h = this._hass, ids = this._ids(), map = new Map();
    for (const id of ids) {
      const ar = entityArea(h, id);
      const key = ar || id;
      if (!map.has(key)) map.set(key, { key, area: ar, name: ar ? h.areas?.[ar]?.name || ar : h.entities?.[id]?.name || h.states[id].attributes.friendly_name || id, t: [], hm: [], ids: [] });
      const r = map.get(key);
      r.ids.push(id);
      if (isHum(h, id)) r.hm.push(id); else r.t.push(id);
    }
    return [...map.values()].map((r) => {
      let hm = r.hm;
      // keine Feuchte gewählt: Feuchtesensor aus demselben Bereich nehmen
      if (!hm.length && r.area) hm = collect(h, 'climate').find((g) => g.area === r.area)?.ids.filter((id) => isHum(h, id)) || [];
      const temp = avg(r.t.map((id) => tempOf(h, id)).filter((v) => v != null));
      const hum = avg(hm.map((id) => humOf(h, id)).filter((v) => v != null));
      return { ...r, temp, hum, main: r.t[0] || hm[0] || r.ids[0] };
    });
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, rooms = this._rooms();
    const admin = !!h.user?.is_admin;
    const warnAt = Number(this._config.humidity_warn ?? 60);
    const ri = (name) => { const i = roomIcon(name); return i === 'home' ? 'temp' : i; };
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${TEMP_STYLE}</style>
      <div class="card p">
        <div class="hd"><span class="ti">${icon('temp', 18)}</span><span>${esc(this._config.name || 'Räume')}</span><small>Temperatur · Luftfeuchte</small>${admin ? `<button class="ed" title="Fühler wählen" aria-label="Fühler wählen"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg></button>` : ''}</div>
        ${rooms.length ? rooms.map((r) => {
          const p = r.temp == null ? 0 : Math.max(4, Math.min(100, ((r.temp - 15) / 12) * 100));
          const warn = r.hum != null && r.hum >= warnAt;
          return `<div class="tr ${warn ? 'warn' : ''}" data-id="${esc(r.main)}" style="--rc:${roomColor(r.name, r.area, this._config.room_colors)}"><span class="ic">${icon(ri(r.name), 19)}</span>
            <div class="nm"><b>${esc(r.name)}</b><div class="bar"><i style="width:${p}%;background-size:${p ? 10000 / p : 100}% 100%"></i></div></div>
            <div class="v"><b>${r.temp != null ? fmt(r.temp) + '°' : '–'}</b><small>${r.hum != null ? Math.round(r.hum) + ' %' + (warn ? ' ⚠' : '') : '–'}</small></div></div>`;
        }).join('') : `<div class="msg">Noch keine Temperaturfühler. ${admin ? 'Über den Stift oben rechts auswählen.' : ''}</div>`}
      </div>`;
    this.shadowRoot.querySelectorAll('.tr').forEach((el) => el.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.id }, bubbles: true, composed: true }));
    }));
    this.shadowRoot.querySelector('.ed')?.addEventListener('click', () => this._open());
  }

  _open() {
    this._popup?.close();
    const pop = document.createElement('glass-home-popup');
    pop.kind = 'climate';
    pop.list = this._ids();
    pop.onedit = (ids) => this._edit(ids);
    pop.onclose = () => { if (this._popup === pop) this._popup = null; };
    document.body.appendChild(pop);
    pop.hass = this._hass;
    this._popup = pop;
  }
}

GlassHomeTemperatureCard.prototype._edit = function (ids) {
  this._config = { ...this._config, entities: ids };
  setSharedTemp({ ids, owner: this });
  this._sig = '';
  this.hass = this._hass;
  return saveCard(this, { self: true, patch: { entities: ids } });
};

class GlassHomeTemperatureEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'name', selector: { text: {} } },
    { name: 'entities', selector: { entity: { multiple: true, filter: [{ domain: 'sensor', device_class: 'temperature' }, { domain: 'sensor', device_class: 'humidity' }, { domain: 'climate' }] } } },
    { name: 'humidity_warn', selector: { number: { min: 40, max: 90, step: 1, unit_of_measurement: '%', mode: 'box' } } },
  ];
  static labels = { name: 'Titel (Standard: Räume)', entities: 'Fühler für Temperatur und Feuchte (leer = alle mit Bereich)', humidity_warn: 'Feuchte-Warnung ab (Standard 60 %)' };
  static defaults = {};
}

class GlassHomeStatusEditor extends GlassHomeFormEditor {
  static schema = [
    {
      name: 'tiles', selector: {
        select: {
          multiple: true, mode: 'list', options: [
            { value: 'lights', label: 'Lichter' }, { value: 'covers', label: 'Rollos' }, { value: 'climate', label: 'Temperaturen' },
            { value: 'openings', label: 'Fenster & Türen' }, { value: 'locks', label: 'Schlösser' },
            { value: 'plugs', label: 'Steckdosen' }, { value: 'presence', label: 'Wer ist zuhause' },
          ],
        },
      },
    },
    { name: 'plugs', selector: { entity: { multiple: true, filter: { domain: 'switch' } } } },
    { name: 'temps', selector: { entity: { multiple: true, filter: [{ domain: 'sensor', device_class: 'temperature' }, { domain: 'climate' }] } } },
  ];
  static labels = { tiles: 'Kacheln (keine Auswahl = alle, die es gibt)', plugs: 'Steckdosen (leer = automatisch erkennen)', temps: 'Temperaturfühler (nur ohne Temperaturkarte)' };
  static defaults = {};
}

/* ------------------------------------------------------------------ */
/* Energie / PV aus dem HA-Energie-Dashboard                           */
/* ------------------------------------------------------------------ */
const ENERGY_STYLE = `
  :host{container-type:inline-size}
  .tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
  .tile{display:flex;align-items:center;gap:12px;padding:10px 14px;min-height:66px}
  .tile .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;flex:none;background:rgba(var(--c),.18);color:rgb(var(--c))}
  .tile b{font-size:18px;font-weight:600;display:block;white-space:nowrap}
  .tile small{font-size:12px;color:var(--gh-mute);display:block;line-height:1.3}
  .tile>div{min-width:0}
  .chart{margin-top:10px;padding:14px 16px;display:flex;flex-direction:column}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin-bottom:8px;flex-wrap:wrap}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  .seg{display:flex;gap:2px;background:rgba(255,255,255,.06);border:1px solid var(--gh-line);border-radius:12px;padding:3px;margin-left:10px}
  .seg button{all:unset;cursor:pointer;font-size:13px;font-weight:500;color:var(--gh-mute);padding:5px 12px;border-radius:9px;font-family:inherit}
  .seg button.on{background:rgba(255,255,255,.12);color:var(--gh-txt)}
  .sum{display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap}
  .sum span{background:rgba(255,255,255,.06);border-radius:999px;padding:4px 11px;font-size:12.5px;color:var(--gh-mute)}
  .sum b{color:var(--gh-txt);font-weight:600}
  .plot{position:relative;height:var(--gh-chart-h,220px)}
  svg.cv{position:absolute;inset:0;width:100%;height:100%}
  .yl,.yr,.xl,.now{position:absolute;font-size:11.5px;color:var(--gh-mute);white-space:nowrap}
  .yl{left:4px;transform:translateY(-120%)}
  .yr{right:4px;transform:translateY(-120%);color:#b48cff}
  /* Zeitmarke mittig unter ihrer Stunde, 00:00 bündig links */
  .xl{bottom:0;transform:translateX(-50%)}
  .xl.x0{transform:none}
  .now{top:0}
  .lg{display:flex;gap:14px;font-size:12px;color:var(--gh-mute);margin-top:4px;flex-wrap:wrap}
  .lg i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}
  .lg i.d{border-radius:2px;height:3px;width:14px;vertical-align:middle}
  .msg{padding:14px 16px;font-size:13px;color:var(--gh-mute);line-height:1.45}
  /* im Glass-Raster füllt das Diagramm die restliche Höhe der Fläche */
  .en{display:flex;flex-direction:column;height:100%;min-height:0}
  .en .chart{flex:1;min-height:0}
  .en.only .chart{margin-top:0}
  .en .plot{flex:1;min-height:120px;height:auto}
  /* nur Kacheln: 2 × 2 und volle Höhe */
  .en.tl .tiles{flex:1;grid-auto-rows:1fr}
  .en.tl .tile{min-height:0}
  @container (max-width:620px){
    .tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    /* eine übrige Kachel nutzt die ganze Reihe */
    .tile:last-child:nth-child(odd){grid-column:1/-1}
    .tile{padding:10px 12px}.tile b{font-size:16px}
    .plot{height:170px}
    .seg{margin-left:0;order:3;width:100%}.seg button{flex:1;text-align:center;padding:5px 4px}
  }
  @container (max-width:460px){
    .tile{min-height:56px;padding:8px 10px;gap:8px}.tile .ic{width:32px;height:32px}.tile b{font-size:15px}
    .tile small{font-size:11px}.chart{padding:12px}.sum span{font-size:11.5px;padding:3px 9px}
  }
`;

const kWh = (v) => (v == null ? '–' : `${fmt(v, v >= 100 ? 0 : 1)} kWh`);

// Leistung anzeigen: unter 1 kW in W, sonst kW
const powerFmt = (v) => { const a = Math.abs(v || 0); return a < 1 ? `${Math.round(a * 1000)} W` : `${fmt(a)} kW`; };

// Leistung in kW aus einem Sensor (W oder kW)
function powerKw(h, id) {
  const s = id && h.states[id];
  if (!s) return null;
  const v = parseFloat(s.state);
  if (isNaN(v)) return null;
  const u = (s.attributes.unit_of_measurement || 'W').toLowerCase();
  return u === 'kw' ? v : u === 'mw' ? v * 1000 : v / 1000;
}

// Energiequellen aus dem Energie-Dashboard (einmal je Seite geladen)
let ghEnergyPrefs = null;
const energyPrefs = (h) => (ghEnergyPrefs ||= h.callWS({ type: 'energy/get_prefs' }).catch((e) => { ghEnergyPrefs = null; throw e; }));
function energyIds(prefs) {
  const src = prefs?.energy_sources || [];
  const grid = src.filter((s) => s.type === 'grid'), bat = src.filter((s) => s.type === 'battery');
  const u = (a) => [...new Set(a.filter(Boolean))];
  return {
    solar: u(src.filter((s) => s.type === 'solar').map((s) => s.stat_energy_from)),
    from: u(grid.flatMap((g) => [...(g.flow_from || []).map((f) => f.stat_energy_from), g.stat_energy_from])),
    to: u(grid.flatMap((g) => [...(g.flow_to || []).map((f) => f.stat_energy_to), g.stat_energy_to])),
    batIn: u(bat.map((b) => b.stat_energy_to)),     // in den Akku geladen
    batOut: u(bat.map((b) => b.stat_energy_from)),  // aus dem Akku entladen
    power: { solar: src.find((s) => s.type === 'solar' && s.stat_rate)?.stat_rate, grid: grid.find((g) => g.stat_rate)?.stat_rate },
  };
}

// eigene Energiezähler statt Energie-Dashboard (z. B. Tageszähler des Wechselrichters)
const EN_OWN = ['solar_energy', 'home_energy', 'grid_import_energy', 'grid_export_energy', 'battery_charge_energy', 'battery_discharge_energy'];
function ownEnergyIds(c) {
  if (!EN_OWN.some((k) => c[k])) return null;
  const l = (k) => (c[k] ? [c[k]] : []);
  return { own: true, solar: l('solar_energy'), home: l('home_energy'), from: l('grid_import_energy'), to: l('grid_export_energy'),
    batIn: l('battery_charge_energy'), batOut: l('battery_discharge_energy'), power: {} };
}
// Zählerstand in kWh (Wh und MWh werden umgerechnet)
function energyKwh(h, id) {
  const s = id && h.states[id];
  const v = s ? parseFloat(s.state) : NaN;
  if (isNaN(v)) return null;
  const u = (s.attributes.unit_of_measurement || 'kWh').toLowerCase();
  return u === 'wh' ? v / 1000 : u === 'mwh' ? v * 1000 : v;
}

// Zeiträume: Heute/Gestern stündlich, Woche/Monat täglich, Jahr monatlich
const EN_PERIODS = [['day', 'Heute'], ['yesterday', 'Gestern'], ['week', 'Woche'], ['month', 'Monat'], ['year', 'Jahr']];
const EN_MON = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const EN_MON_L = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const EN_WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
function energyRange(p) {
  const d0 = new Date(); d0.setHours(0, 0, 0, 0);
  const day = (n) => { const x = new Date(d0); x.setDate(x.getDate() + n); return x; };
  if (p === 'yesterday') return { start: day(-1), end: d0, period: 'hour', n: 24, idx: (t) => t.getHours() };
  if (p === 'week') { const s = day(-6); return { start: s, period: 'day', n: 7, idx: (t) => Math.round((new Date(t).setHours(0, 0, 0, 0) - s) / 864e5), lab: (i) => { const x = new Date(s); x.setDate(x.getDate() + i); return `${EN_WD[x.getDay()]} ${x.getDate()}.`; } }; }
  if (p === 'month') { const s = new Date(d0.getFullYear(), d0.getMonth(), 1), n = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate(); return { start: s, period: 'day', n, idx: (t) => t.getDate() - 1, lab: (i) => `${i + 1}.`, step: n > 20 ? 3 : 1 }; }
  if (p === 'year') return { start: new Date(d0.getFullYear(), 0, 1), period: 'month', n: 12, idx: (t) => t.getMonth(), lab: (i) => EN_MON[i] };
  return { start: d0, period: 'hour', n: 24, idx: (t) => t.getHours() };
}
const energyWhen = (p) => {
  const d = new Date();
  return { day: 'heute', yesterday: 'gestern', week: 'in 7 Tagen', month: `im ${EN_MON_L[d.getMonth()]}`, year: String(d.getFullYear()) }[p] || 'heute';
};
const energyTitle = (p) => {
  const d = new Date(), y = new Date(Date.now() - 864e5);
  return { day: 'Heute', yesterday: `Gestern · ${EN_WD[y.getDay()]}., ${y.getDate()}. ${EN_MON_L[y.getMonth()]}`, week: 'Letzte 7 Tage', month: `${EN_MON_L[d.getMonth()]} ${d.getFullYear()}`, year: `Jahr ${d.getFullYear()}` }[p];
};
// gewählter Zeitraum gilt für alle Energiekarten der Seite (Kacheln und Diagramm getrennt platziert)
let ghEnergyPeriod = 'day';

class GlassHomeEnergyCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-energy-editor'); }
  static getStubConfig() { return { chart: true }; }

  constructor() {
    super();
    this._data = {};
    this._onPeriod = () => { if (this._period !== ghEnergyPeriod) { this._period = ghEnergyPeriod; this._load(); this._render(); } };
  }

  setConfig(config) {
    this._config = { chart: true, periods: true, part: 'both', ...(config || {}) };
    this._period = this._config.periods ? ghEnergyPeriod : 'day';
    this._sig = '';
    this._ids = null;
    this._data = {};
    if (this._hass) this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first) this._load();
    const c = this._config;
    const sig = [c.solar_power, c.grid_power, c.home_power, ...EN_OWN.map((k) => c[k]), c.solar_energy_month, c.solar_energy_year].map((id) => id && hass.states[id]?.state).join('|');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  connectedCallback() {
    // Werte alle 5 Minuten neu holen
    this._tick = setInterval(() => this._load(true), 5 * 60e3);
    window.addEventListener('glass-home-energy-period', this._onPeriod);
    this._onPeriod();
    if (this._hass && !this._data[this._period]) this._load();
  }

  disconnectedCallback() { clearInterval(this._tick); window.removeEventListener('glass-home-energy-period', this._onPeriod); }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: 'full' }; }

  async _load(force) {
    const h = this._hass, p = this._period;
    if (!h?.callWS || this._loading === p) return;
    const old = this._data[p];
    // abgeschlossene Zeiträume nur einmal laden, laufende alle 5 Minuten
    if (old && !old.error && !(force && p !== 'yesterday')) return;
    this._loading = p;
    try {
      const ids = this._ids || (this._ids = ownEnergyIds(this._config) || energyIds(await energyPrefs(h)));
      const all = [...ids.solar, ...ids.from, ...ids.to, ...ids.batIn, ...ids.batOut, ...(ids.home || [])];
      if (!all.length) { this._data[p] = { empty: true }; return; }
      const r = energyRange(p), soc = this._config.battery_soc;
      const msg = { type: 'recorder/statistics_during_period', start_time: r.start.toISOString(), period: r.period, statistic_ids: all, types: ['change'], units: { energy: 'kWh' } };
      if (r.end) msg.end_time = r.end.toISOString();
      const [res, socRes] = await Promise.all([
        h.callWS(msg),
        soc && r.period === 'hour' ? h.callWS({ ...msg, statistic_ids: [soc], types: ['mean'], units: {} }).catch(() => ({})) : Promise.resolve({}),
      ]);
      // Werte je Gruppe in Fächer aufsummieren (Stunden, Tage oder Monate)
      const bins = (list, key = 'change') => {
        const out = new Array(r.n).fill(null);
        for (const id of list) for (const row of res[id] || socRes[id] || []) {
          const i = r.idx(new Date(typeof row.start === 'number' ? row.start : Date.parse(row.start)));
          if (i >= 0 && i < r.n && row[key] != null) out[i] = key === 'mean' ? row[key] : (out[i] || 0) + row[key];
        }
        return out;
      };
      const d = { r, solar: bins(ids.solar), from: bins(ids.from), to: bins(ids.to), batIn: bins(ids.batIn), batOut: bins(ids.batOut) };
      d.soc = soc ? bins([soc], 'mean') : null;
      // Hausverbrauch: eigener Zähler, sonst Bezug + PV + Akku entladen − Einspeisung − Akku geladen
      d.use = ids.home?.length ? bins(ids.home) : d.from.map((v, i) => ([v, d.solar[i], d.batOut[i]].every((x) => x == null) ? null
        : Math.max(0, (v || 0) + (d.solar[i] || 0) + (d.batOut[i] || 0) - (d.to[i] || 0) - (d.batIn[i] || 0))));
      this._data[p] = d;
    } catch (e) {
      this._data[p] = { error: e.message || String(e) };
    } finally {
      if (this._loading === p) this._loading = null;
      if (p === this._period) this._render();
    }
  }

  _setPeriod(p) {
    ghEnergyPeriod = p;
    window.dispatchEvent(new CustomEvent('glass-home-energy-period'));
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => { const b = ev.target.closest('.seg button'); if (b) this._setPeriod(b.dataset.p); });
    }
    const h = this._hass, c = this._config, p = this._period, st = this._data[p];
    const style = `<style>${GH_STYLE}${ENERGY_STYLE}</style>`;
    if (!st) { this.shadowRoot.innerHTML = `${style}<div class="p msg">Energiedaten werden geladen …</div>`; return; }
    if (st.error) { this.shadowRoot.innerHTML = `${style}<div class="p msg">Energiedaten nicht verfügbar: ${esc(st.error)}</div>`; return; }
    if (st.empty) {
      this.shadowRoot.innerHTML = `${style}<div class="p msg">Im Energie-Dashboard ist noch keine Quelle eingetragen.<br>Einstellungen → Dashboards → Energie: Netz, Solar und Batterie hinzufügen.</div>`;
      return;
    }

    const sum = (a) => a.reduce((x, y) => x + (y || 0), 0);
    const hasSolar = this._ids.solar.length > 0;
    // Heute direkt aus den Tageszählern, PV für Monat und Jahr aus eigenen Zählern, sonst aus der Statistik
    const day = p === 'day', kv = (id) => energyKwh(h, id);
    const pick = (...v) => v.find((x) => x != null);
    const pv = pick(day ? kv(c.solar_energy) : null, p === 'month' ? kv(c.solar_energy_month) : null, p === 'year' ? kv(c.solar_energy_year) : null, sum(st.solar));
    const from = pick(day ? kv(c.grid_import_energy) : null, sum(st.from));
    const to = pick(day ? kv(c.grid_export_energy) : null, sum(st.to));
    const use = pick(day ? kv(c.home_energy) : null, sum(st.use));
    const autark = use > 0 ? Math.round(Math.max(0, Math.min(1, 1 - from / use)) * 100) : null;
    const when = energyWhen(p);

    // aktuelle Leistung (nur Heute), wenn Sensoren bekannt sind
    const live = p === 'day';
    const pSolar = live ? powerKw(h, c.solar_power || this._ids.power?.solar) : null;
    const pGrid = live ? powerKw(h, c.grid_power || this._ids.power?.grid) : null;   // + Bezug, − Einspeisung
    let pHome = live ? powerKw(h, c.home_power) : null;
    if (pHome == null && pSolar != null && pGrid != null) pHome = Math.max(0, pSolar + pGrid);
    const kw = powerFmt;

    const tiles = [];
    if (hasSolar) tiles.push({ c: '245,200,76', i: 'sun', v: pSolar != null ? kw(pSolar) : kWh(pv), l: pSolar != null ? `Erzeugung · heute ${kWh(pv)}` : `PV erzeugt ${when}` });
    tiles.push({ c: '77,208,225', i: 'home', v: pHome != null ? kw(pHome) : kWh(use), l: pHome != null ? `Hausverbrauch · heute ${kWh(use)}` : `Haus verbraucht ${when}` });
    if (pGrid != null) tiles.push(pGrid < 0
      ? { c: '95,214,142', i: 'plug', v: kw(pGrid), l: 'Einspeisung jetzt' }
      : { c: '255,138,101', i: 'plug', v: kw(pGrid), l: 'Netzbezug jetzt' });
    else if (hasSolar || to > 0) tiles.push({ c: '95,214,142', i: 'plug', v: `${fmt(to, to >= 100 ? 0 : 1)} / ${kWh(from)}`, l: 'eingespeist / bezogen' });
    else tiles.push({ c: '255,138,101', i: 'plug', v: kWh(from), l: `Netzbezug ${when}` });
    if (hasSolar && autark != null) tiles.push({ c: '201,210,220', i: 'leaf', v: `${autark} %`, l: `Autarkie ${when}` });

    const part = c.part || 'both';
    const showTiles = part !== 'chart', showChart = part !== 'tiles' && c.chart !== false;
    const seg = c.periods ? `<span class="seg">${EN_PERIODS.map(([k, n]) => `<button data-p="${k}" class="${k === p ? 'on' : ''}">${n}</button>`).join('')}</span>` : '';
    const chart = showChart ? (st.r.period === 'hour' ? this._curve(st, hasSolar, p) : this._bars(st, hasSolar, to > 0)) : '';
    const title = c.periods ? energyTitle(p) : (hasSolar ? 'Photovoltaik heute' : 'Energie heute');
    const tilesHtml = showTiles ? `<div class="tiles">${tiles.map((t) => `<div class="tile p" style="--c:${t.c}"><span class="ic">${icon(t.i, 20)}</span><div><b>${esc(t.v)}</b><small>${esc(t.l)}</small></div></div>`).join('')}</div>` : '';
    const chartHtml = showChart ? `<section class="chart p">
        <div class="hd">${icon(hasSolar ? 'sun' : 'bolt', 18)}${esc(title)}${seg}<small>${chart.unit}</small></div>
        ${c.periods ? '' : `<div class="sum">${hasSolar ? `<span>Erzeugt <b>${kWh(pv)}</b></span>` : ''}<span>Verbraucht <b>${kWh(use)}</b></span>
          ${hasSolar || to > 0 ? `<span>Eingespeist <b>${kWh(to)}</b></span>` : ''}<span>Bezogen <b>${kWh(from)}</b></span></div>`}
        ${chart.html}
      </section>` : '';
    this.shadowRoot.innerHTML = `${style}<div class="en${part === 'tiles' ? ' tl' : ''}${part === 'chart' ? ' only' : ''}">${tilesHtml}${chartHtml}</div>`;
  }

  // Stundenkurve (Heute, Gestern): PV-Fläche, Verbrauch, Netzbezug als Balken, Akku-Ladestand gestrichelt
  _curve(st, hasSolar, p) {
    const isToday = p === 'day';
    const prod = st.solar, cons = st.use, buy = st.from, soc = st.soc && st.soc.some((v) => v != null) ? st.soc : null;
    const now = isToday ? new Date().getHours() + new Date().getMinutes() / 60 : 24;
    const max = Math.max(0.5, ...prod.filter((v) => v != null), ...cons.filter((v) => v != null));
    const W = 800, H = 230, top = 22, bot = 200;
    const x = (i) => ((i + 0.5) / 24) * W;
    const y = (v) => bot - (v / max) * (bot - top);
    const y2 = (v) => bot - (v / 100) * (bot - top);
    const path = (arr, fy) => {
      const pts = arr.map((v, i) => (v == null ? null : [x(i), fy(v)])).filter(Boolean);
      if (pts.length < 2) return '';
      // weiche Kurve durch die Stundenwerte
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
        d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
      }
      return { d, first: pts[0], last: pts[pts.length - 1] };
    };
    const pp = hasSolar ? path(prod, y) : '', pc = path(cons, y), ps = soc ? path(soc, y2) : '';
    const bw = W / 24 * 0.42;
    const bars = buy.map((v, i) => (v > 0.005 ? `<rect x="${x(i) - bw / 2}" y="${y(v)}" width="${bw}" height="${bot - y(v)}" rx="3" fill="rgba(255,138,101,.7)"/>` : '')).join('');
    const xn = (now / 24) * W;
    const grid = [0.5, 1].map((f) => `<line x1="0" x2="${W}" y1="${y(max * f)}" y2="${y(max * f)}" stroke="rgba(255,255,255,.08)"/>`).join('');
    const pctY = (v) => (v / H) * 100;
    const labels = [0.5, 1].map((f) => `<span class="yl" style="top:${pctY(y(max * f))}%">${fmt(max * f)} kWh</span>`).join('')
      + (ps ? [50, 100].map((v) => `<span class="yr" style="top:${pctY(y2(v))}%">${v} %</span>`).join('') : '')
      + [0, 6, 12, 18].map((hr) => `<span class="xl${hr ? '' : ' x0'}" style="left:${(hr / 24) * 100}%">${String(hr).padStart(2, '0')}:00</span>`).join('')
      + (isToday ? `<span class="now" style="left:calc(${Math.min((now / 24) * 100, 92)}% + 6px)">jetzt</span>` : '');
    const html = `<div class="plot"><svg class="cv" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        <defs><linearGradient id="gy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5c84c" stop-opacity=".42"/><stop offset="1" stop-color="#f5c84c" stop-opacity="0"/></linearGradient></defs>
        ${grid}<line x1="0" x2="${W}" y1="${bot}" y2="${bot}" stroke="rgba(255,255,255,.12)"/>${bars}
        ${pp ? `<path d="${pp.d} L${pp.last[0]} ${bot} L${pp.first[0]} ${bot} Z" fill="url(#gy)"/><path d="${pp.d}" fill="none" stroke="#f5c84c" stroke-width="3" vector-effect="non-scaling-stroke"/>` : ''}
        ${pc ? `<path d="${pc.d}" fill="none" stroke="#4dd0e1" stroke-width="3" vector-effect="non-scaling-stroke"/>` : ''}
        ${ps ? `<path d="${ps.d}" fill="none" stroke="#b48cff" stroke-width="2.5" stroke-dasharray="6 5" vector-effect="non-scaling-stroke"/>` : ''}
        ${isToday ? `<line x1="${xn}" x2="${xn}" y1="${top - 8}" y2="${bot}" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>` : ''}
      </svg>${labels}</div>
      <div class="lg">${hasSolar ? '<span><i style="background:#f5c84c"></i>PV-Erzeugung</span>' : ''}<span><i style="background:#4dd0e1"></i>Hausverbrauch</span><span><i style="background:#ff8a65"></i>Netzbezug</span>${ps ? '<span><i class="d" style="background:#b48cff"></i>Akku-Ladestand</span>' : ''}</div>`;
    return { html, unit: 'pro Stunde' };
  }

  // Balken je Tag oder Monat (Woche, Monat, Jahr): Erzeugung, Verbrauch, Einspeisung, Bezug
  _bars(st, hasSolar, hasFeed) {
    const r = st.r;
    const keys = [hasSolar && ['solar', '245,200,76', 'PV-Erzeugung'], ['use', '77,208,225', 'Hausverbrauch'], (hasSolar || hasFeed) && ['to', '95,214,142', 'Einspeisung'], ['from', '255,138,101', 'Netzbezug']].filter(Boolean);
    const max = Math.max(0.5, ...keys.flatMap(([k]) => st[k].filter((v) => v != null))) * 1.08;
    const W = 800, H = 230, top = 16, bot = 200, L = 64, slot = (W - L) / r.n, bw = Math.min(14, slot * 0.8 / keys.length);
    const y = (v) => bot - (v / max) * (bot - top);
    const rects = Array.from({ length: r.n }, (_, i) => {
      const cx = L + slot * (i + 0.5), x0 = cx - (bw * keys.length) / 2;
      if (keys.every(([k]) => st[k][i] == null)) return `<rect x="${cx - slot * 0.3}" y="${bot - 2}" width="${slot * 0.6}" height="2" fill="rgba(255,255,255,.08)"/>`;
      return keys.map(([k, col], j) => { const v = st[k][i] || 0; return v > 0 ? `<rect x="${x0 + j * bw}" y="${y(v)}" width="${bw - 1.2}" height="${bot - y(v)}" rx="2" fill="rgba(${col},.85)"/>` : ''; }).join('');
    }).join('');
    const pctY = (v) => (v / H) * 100;
    const labels = [0.5, 1].map((f) => `<span class="yl" style="top:${pctY(y(max / 1.08 * f))}%">${fmt(max / 1.08 * f, max >= 100 ? 0 : 1)} kWh</span>`).join('')
      + Array.from({ length: r.n }, (_, i) => (i % (r.step || 1) ? '' : `<span class="xl" style="left:${((L + slot * (i + 0.5)) / W) * 100}%">${esc(r.lab(i))}</span>`)).join('');
    const grid = [0.5, 1].map((f) => `<line x1="0" x2="${W}" y1="${y(max / 1.08 * f)}" y2="${y(max / 1.08 * f)}" stroke="rgba(255,255,255,.08)"/>`).join('');
    const html = `<div class="plot"><svg class="cv" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${grid}
        <line x1="0" x2="${W}" y1="${bot}" y2="${bot}" stroke="rgba(255,255,255,.12)"/>${rects}</svg>${labels}</div>
      <div class="lg">${keys.map(([, col, n]) => `<span><i style="background:rgb(${col})"></i>${n}</span>`).join('')}</div>`;
    return { html, unit: r.period === 'month' ? 'pro Monat' : 'pro Tag' };
  }
}

class GlassHomeEnergyEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'part', selector: { select: { mode: 'dropdown', options: [{ value: 'both', label: 'Kacheln und Diagramm' }, { value: 'tiles', label: 'Nur Kacheln' }, { value: 'chart', label: 'Nur Diagramm' }] } } },
    { name: 'periods', selector: { boolean: {} } },
    { name: 'chart', selector: { boolean: {} } },
    { name: 'battery_soc', selector: { entity: { domain: 'sensor' } } },
    { name: 'solar_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'home_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'grid_import_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'grid_export_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'battery_charge_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'battery_discharge_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'solar_energy_month', selector: { entity: { domain: 'sensor' } } },
    { name: 'solar_energy_year', selector: { entity: { domain: 'sensor' } } },
    { name: 'solar_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
    { name: 'grid_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
    { name: 'home_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  ];
  static labels = {
    part: 'Inhalt',
    solar_energy: 'Eigene Zähler statt Energie-Dashboard: PV heute (kWh)',
    home_energy: 'Hausverbrauch heute (kWh)',
    grid_import_energy: 'Netzbezug heute (kWh)',
    grid_export_energy: 'Einspeisung heute (kWh)',
    battery_charge_energy: 'Akku geladen heute (kWh, optional)',
    battery_discharge_energy: 'Akku entladen heute (kWh, optional)',
    solar_energy_month: 'PV diesen Monat (kWh, optional)',
    solar_energy_year: 'PV dieses Jahr (kWh, optional)',
    periods: 'Zeitraum wählbar (Heute, Gestern, Woche, Monat, Jahr)',
    chart: 'Diagramm zeigen',
    battery_soc: 'Akku-Ladestand für die Kurve (optional)',
    solar_power: 'PV-Leistung jetzt in den Kacheln (optional)',
    grid_power: 'Netz-Leistung jetzt, + Bezug / − Einspeisung (optional)',
    home_power: 'Hausverbrauch jetzt (optional, sonst berechnet)',
  };
  static defaults = { chart: true, periods: true, part: 'both' };
}

/* ------------------------------------------------------------------ */
/* Energiefluss jetzt: PV, Netz, Haus, Akku                            */
/* ------------------------------------------------------------------ */
const FLOW_STYLE = `
  .fl{height:100%;padding:14px 16px;display:flex;flex-direction:column;min-height:0}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  .fl svg.f{flex:1;min-height:0;width:100%}
  .lbl{font-size:12.5px;fill:var(--gh-mute)}.val{font-size:15px;font-weight:600;fill:var(--gh-txt)}
  .msg{padding:14px 16px;font-size:13px;color:var(--gh-mute);line-height:1.45}
`;
const FLOW_C = { solar: '245,200,76', home: '77,208,225', feed: '95,214,142', buy: '255,138,101', bat: '180,140,255' };
const FLOW_ICON = {
  solar: ICONS.sun, home: ICONS.home,
  grid: '<path d="M8 22 12 2l4 20M6 8h12M5 14h14M9.5 14 12 8l2.5 6"/>',
  bat: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M11 9l-2 3h4l-2 3"/>',
};

// Leistungen jetzt (kW): Akku + lädt / − entlädt, Netz + Bezug / − Einspeisung; fehlende Werte werden berechnet
function energyNow(h, c, auto = {}) {
  const pv = powerKw(h, c.solar_power || auto.solar);
  let grid = powerKw(h, c.grid_power || auto.grid), home = powerKw(h, c.home_power), bat = powerKw(h, c.battery_power);
  if (bat != null && c.invert_battery) bat = -bat;
  if (grid != null && c.invert_grid) grid = -grid;
  if (home == null && grid != null) home = Math.max(0, (pv || 0) + grid - (bat || 0));
  if (grid == null && home != null) grid = home - (pv || 0) + (bat || 0);
  const s = h.states[c.battery_soc], soc = s && !isNaN(parseFloat(s.state)) ? parseFloat(s.state) : null;
  return { pv, grid, home, bat, soc };
}

class GlassHomeEnergyFlowCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-energy-flow-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { ...(config || {}) }; this._sig = ''; if (this._hass) this._render(); }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first && hass.callWS) energyPrefs(hass).then((p) => { this._auto = energyIds(p).power; this._sig = ''; this._render(); }).catch(() => {});
    this._render();
  }
  getCardSize() { return 6; }
  getGridOptions() { return { columns: 7, rows: 5 }; }

  _render() {
    const h = this._hass, c = this._config;
    const n = energyNow(h, c, this._auto || {});
    const r1 = (v) => (v == null ? '' : Math.round(v * 100) / 100);
    const sig = [n.pv, n.grid, n.home, n.bat].map(r1).join('|') + '|' + Math.round(n.soc ?? -1);
    if (sig === this._sig) return;
    this._sig = sig;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const style = `<style>${GH_STYLE}${FLOW_STYLE}</style>`;
    if (n.home == null && n.pv == null) {
      this.shadowRoot.innerHTML = `${style}<div class="fl p"><div class="hd">${icon('bolt', 18)}Energiefluss<small>jetzt</small></div><div class="msg" style="padding:8px 0">Leistungssensoren im Karten-Editor wählen (PV, Netz, Hausverbrauch, Akku).</div></div>`;
      return;
    }
    const hasPv = n.pv != null, hasBat = n.bat != null || n.soc != null;
    // Flüsse verteilen: PV zuerst ins Haus, dann in den Akku, Rest ins Netz; Akku und Netz decken den Rest
    const pv = Math.max(0, n.pv || 0), home = Math.max(0, n.home || 0);
    const chg = Math.max(0, n.bat || 0), dis = Math.max(0, -(n.bat || 0));
    const imp = Math.max(0, n.grid || 0), exp = Math.max(0, -(n.grid || 0));
    let need = home, charge = chg;
    const f = {};
    f.pv_home = Math.min(pv, need); need -= f.pv_home;
    let rest = pv - f.pv_home;
    f.pv_bat = Math.min(rest, charge); charge -= f.pv_bat; rest -= f.pv_bat;
    f.pv_grid = Math.min(rest, exp);
    f.bat_home = Math.min(dis, need); need -= f.bat_home;
    f.bat_grid = Math.max(0, Math.min(dis - f.bat_home, exp - f.pv_grid));
    f.grid_home = Math.min(imp, need);
    f.grid_bat = Math.max(0, Math.min(imp - f.grid_home, charge));

    const N = { solar: [340, 62], grid: [92, 168], home: [588, 168], bat: [340, 274] }, R = 46;
    const P = {
      pv_home: `M${N.solar[0] + 30} ${N.solar[1] + 35} C${N.solar[0] + 90} ${N.home[1]} ${N.home[0] - 120} ${N.home[1]} ${N.home[0] - R} ${N.home[1]}`,
      pv_grid: `M${N.solar[0] - 30} ${N.solar[1] + 35} C${N.solar[0] - 90} ${N.grid[1]} ${N.grid[0] + 120} ${N.grid[1]} ${N.grid[0] + R} ${N.grid[1]}`,
      pv_bat: `M${N.solar[0]} ${N.solar[1] + R} L${N.bat[0]} ${N.bat[1] - R}`,
      grid_home: `M${N.grid[0] + R} ${N.grid[1]} L${N.home[0] - R} ${N.home[1]}`,
      bat_home: `M${N.bat[0] + 30} ${N.bat[1] - 35} C${N.bat[0] + 90} ${N.home[1]} ${N.home[0] - 120} ${N.home[1]} ${N.home[0] - R} ${N.home[1]}`,
      bat_grid: `M${N.bat[0] - 30} ${N.bat[1] - 35} C${N.bat[0] - 90} ${N.grid[1]} ${N.grid[0] + 120} ${N.grid[1]} ${N.grid[0] + R} ${N.grid[1]}`,
      grid_bat: `M${N.grid[0] + R} ${N.grid[1]} C${N.grid[0] + 120} ${N.grid[1]} ${N.bat[0] - 90} ${N.grid[1]} ${N.bat[0] - 30} ${N.bat[1] - 35}`,
    };
    const col = { pv_home: FLOW_C.solar, pv_bat: FLOW_C.solar, pv_grid: FLOW_C.feed, bat_home: FLOW_C.bat, bat_grid: FLOW_C.feed, grid_home: FLOW_C.buy, grid_bat: FLOW_C.buy };
    const shown = Object.keys(P).filter((k) => (hasPv || !k.startsWith('pv')) && (hasBat || !k.includes('bat')));
    let s = '';
    shown.filter((k) => !(f[k] > 0.02)).forEach((k) => { if (k !== 'grid_bat') s += `<path d="${P[k]}" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="2"/>`; });
    shown.filter((k) => f[k] > 0.02).forEach((k, i) => {
      s += `<path id="l${i}" d="${P[k]}" fill="none" stroke="rgba(${col[k]},.55)" stroke-width="2.5"/>`;
      const dur = Math.max(1.2, Math.min(8, 4 / f[k]));
      for (let j = 0; j < 3; j++) s += `<circle r="4" fill="rgb(${col[k]})"><animateMotion dur="${dur.toFixed(1)}s" begin="${(-j * dur / 3).toFixed(2)}s" repeatCount="indefinite"><mpath href="#l${i}"/></animateMotion></circle>`;
    });
    const kw = powerFmt;
    const node = (k, cl, val, lbl, side) => {
      const [x, y] = N[k];
      const lx = side === 'r' ? x + R + 14 : x, anchor = side === 'r' ? 'start' : 'middle', ly = side === 'b' ? y + R + 20 : y - 4;
      return `<circle cx="${x}" cy="${y}" r="${R}" fill="rgba(${cl},.13)" stroke="rgb(${cl})" stroke-width="2"/>
        <g transform="translate(${x - 13} ${y - 28}) scale(1.08)" fill="none" stroke="rgb(${cl})" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${FLOW_ICON[k]}</g>
        <text x="${x}" y="${y + 20}" text-anchor="middle" class="val">${esc(val)}</text>
        <text x="${lx}" y="${ly}" text-anchor="${anchor}" class="lbl">${esc(lbl)}</text>`;
    };
    if (hasPv) s += node('solar', FLOW_C.solar, kw(n.pv), 'PV-Erzeugung', 'r');
    const g = n.grid || 0;
    s += node('grid', g < -0.02 ? FLOW_C.feed : g > 0.02 ? FLOW_C.buy : '201,210,220', kw(g), g < -0.02 ? 'Einspeisung' : g > 0.02 ? 'Netzbezug' : 'Netz', 'b');
    s += node('home', FLOW_C.home, kw(n.home), 'Hausverbrauch', 'b');
    if (hasBat) {
      const b = n.bat || 0, st = b > 0.02 ? `lädt · ${kw(b)}` : b < -0.02 ? `entlädt · ${kw(b)}` : 'Akku bereit';
      s += node('bat', FLOW_C.bat, n.soc != null ? `${Math.round(n.soc)} %` : kw(b), n.soc != null ? `Akku ${st}` : (b < -0.02 ? 'Akku entlädt' : 'Akku lädt'), 'r');
    }
    const vb = hasBat ? '0 0 680 330' : '0 0 680 236';
    this.shadowRoot.innerHTML = `${style}<div class="fl p"><div class="hd">${icon('bolt', 18)}Energiefluss<small>jetzt</small></div>
      <svg class="f" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${s}</svg></div>`;
  }
}

const FLOW_SCHEMA = [
  { name: 'solar_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  { name: 'grid_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  { name: 'home_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  { name: 'battery_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  { name: 'battery_soc', selector: { entity: { domain: 'sensor' } } },
  { name: 'invert_battery', selector: { boolean: {} } },
  { name: 'invert_grid', selector: { boolean: {} } },
];
const FLOW_LABELS = {
  solar_power: 'PV-Leistung',
  grid_power: 'Netz-Leistung (+ Bezug / − Einspeisung)',
  home_power: 'Hausverbrauch (optional, sonst berechnet)',
  battery_power: 'Akku-Leistung (+ lädt / − entlädt)',
  battery_soc: 'Akku-Ladestand in %',
  invert_battery: 'Akku-Vorzeichen umdrehen (Sensor zeigt + beim Entladen)',
  invert_grid: 'Netz-Vorzeichen umdrehen (Sensor zeigt + bei Einspeisung)',
  capacity: 'Akku-Größe in kWh (für Restzeit)',
};
class GlassHomeEnergyFlowEditor extends GlassHomeFormEditor {
  static schema = FLOW_SCHEMA;
  static labels = FLOW_LABELS;
  static defaults = {};
}

/* ------------------------------------------------------------------ */
/* Akku: Ladestand, Leistung, Restzeit, heute geladen/entladen          */
/* ------------------------------------------------------------------ */
const BAT_STYLE = `
  .bt{height:100%;padding:14px 16px;display:flex;flex-direction:column;min-height:0;container-type:size}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  .bb{display:flex;align-items:center;gap:18px;flex:1;min-height:0}
  .ring{position:relative;height:min(112px,calc(100cqh - 44px));aspect-ratio:1;flex:none}
  .ring svg{width:100%;height:100%}
  .ring b{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(17px,7cqh,26px);font-weight:600}
  .tx{flex:1;min-width:0}
  .big{font-size:20px;font-weight:600;display:flex;align-items:center;gap:8px}
  .chip{font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;background:rgba(180,140,255,.18);color:#b48cff}
  .sub{font-size:13px;color:var(--gh-mute);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bar{height:8px;border-radius:99px;background:rgba(255,255,255,.08);margin:10px 0 6px;overflow:hidden}
  .bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,rgba(180,140,255,.55),#b48cff)}
  .mini{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:var(--gh-mute)}.mini b{color:var(--gh-txt);font-weight:600}
  .msg{padding:14px 16px;font-size:13px;color:var(--gh-mute);line-height:1.45}
  @container (max-height:150px){.bar{display:none}.big{font-size:17px}}
`;
class GlassHomeBatteryCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-battery-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { ...(config || {}) }; this._sig = ''; if (this._hass) this._render(); }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first) this._load();
    this._render();
  }
  connectedCallback() { this._tick = setInterval(() => this._load(), 5 * 60e3); }
  disconnectedCallback() { clearInterval(this._tick); }
  getCardSize() { return 3; }
  getGridOptions() { return { columns: 5, rows: 3 }; }

  // heute geladen / entladen aus dem Energie-Dashboard (Batterie)
  async _load() {
    const h = this._hass;
    if (!h?.callWS) return;
    try {
      const ids = energyIds(await energyPrefs(h));
      const all = [...ids.batIn, ...ids.batOut];
      if (!all.length) return;
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const res = await h.callWS({ type: 'recorder/statistics_during_period', start_time: start.toISOString(), period: 'day', statistic_ids: all, types: ['change'], units: { energy: 'kWh' } });
      const sum = (l) => l.reduce((a, id) => a + (res[id] || []).reduce((x, r) => x + (r.change || 0), 0), 0);
      this._today = { in: sum(ids.batIn), out: sum(ids.batOut) };
      this._sig = '';
      this._render();
    } catch (e) { /* ohne Tageswerte weiter */ }
  }

  _render() {
    const h = this._hass, c = this._config;
    const n = energyNow(h, { battery_power: c.battery_power, battery_soc: c.battery_soc, invert_battery: c.invert_battery });
    // heute geladen/entladen: eigene Zähler, sonst Energie-Dashboard
    const tin = energyKwh(h, c.battery_charge_energy), tout = energyKwh(h, c.battery_discharge_energy);
    const t = tin != null || tout != null ? { in: tin, out: tout } : this._today;
    const sig = [n.soc, n.bat == null ? '' : Math.round(n.bat * 100), t?.in, t?.out, c.capacity_entity && h.states[c.capacity_entity]?.state].join('|');
    if (sig === this._sig) return;
    this._sig = sig;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const style = `<style>${GH_STYLE}${BAT_STYLE}</style>`;
    const cap = Number(c.capacity) || energyKwh(h, c.capacity_entity) || null;
    const bIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${FLOW_ICON.bat}</svg>`;
    const head = `<div class="hd">${bIcon}${esc(c.name || 'Akku')}<small>${cap ? `${fmt(cap, cap % 1 ? 1 : 0)} kWh Speicher` : ''}</small></div>`;
    if (n.soc == null) {
      this.shadowRoot.innerHTML = `${style}<div class="bt p">${head}<div class="msg" style="padding:8px 0">Akku-Ladestand im Karten-Editor wählen.</div></div>`;
      return;
    }
    const soc = Math.max(0, Math.min(100, n.soc)), b = n.bat;
    const state = b == null ? '' : b > 0.02 ? 'lädt' : b < -0.02 ? 'entlädt' : 'bereit';
    // Restzeit bis voll bzw. leer
    let rest = '';
    if (cap && b && Math.abs(b) > 0.05) {
      const hrs = b > 0 ? ((100 - soc) / 100) * cap / b : (soc / 100) * cap / -b;
      const hh = Math.floor(hrs), mm = Math.round((hrs - hh) * 60);
      if (hrs < 48) rest = `${b > 0 ? 'voll' : 'leer'} in ca. ${[hh ? `${hh} Std` : '', mm || !hh ? `${mm} Min` : ''].filter(Boolean).join(' ')}`;
    }
    const subs = [rest, cap ? `${fmt((soc / 100) * cap)} von ${fmt(cap, cap % 1 ? 1 : 0)} kWh` : ''].filter(Boolean).join(' · ');
    const C = 2 * Math.PI * 47;
    this.shadowRoot.innerHTML = `${style}<div class="bt p">${head}
      <div class="bb">
        <div class="ring"><svg viewBox="0 0 112 112"><circle cx="56" cy="56" r="47" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="10"/>
          <circle cx="56" cy="56" r="47" fill="none" stroke="#b48cff" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(soc / 100) * C} ${C}" transform="rotate(-90 56 56)"/></svg><b>${Math.round(soc)} %</b></div>
        <div class="tx">
          ${b != null ? `<div class="big">${powerFmt(b)} <span class="chip">${state}</span></div>` : ''}
          ${subs ? `<div class="sub">${esc(subs)}</div>` : ''}
          <div class="bar"><i style="width:${soc}%"></i></div>
          ${t ? `<div class="mini"><span>heute geladen <b>${kWh(t.in)}</b></span><span>entladen <b>${kWh(t.out)}</b></span></div>` : ''}
        </div>
      </div></div>`;
  }
}
class GlassHomeBatteryEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'battery_soc', selector: { entity: { domain: 'sensor' } } },
    { name: 'battery_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
    { name: 'capacity', selector: { number: { min: 0, max: 200, step: 0.1, mode: 'box', unit_of_measurement: 'kWh' } } },
    { name: 'capacity_entity', selector: { entity: { domain: 'sensor' } } },
    { name: 'battery_charge_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'battery_discharge_energy', selector: { entity: { domain: 'sensor' } } },
    { name: 'invert_battery', selector: { boolean: {} } },
    { name: 'name', selector: { text: {} } },
  ];
  static labels = { ...FLOW_LABELS, name: 'Titel (Standard: Akku)', capacity_entity: 'Akku-Größe aus Sensor (statt Zahl)', battery_charge_energy: 'Heute geladen (kWh, optional)', battery_discharge_energy: 'Heute entladen (kWh, optional)' };
  static defaults = {};
}

/* ------------------------------------------------------------------ */
/* Energie kompakt (Startseite): Akku-Ring, Leistungen jetzt, Tageskurve */
/* ------------------------------------------------------------------ */
const MINI_STYLE = `
  .mi{height:100%;padding:14px 16px;display:flex;flex-direction:column;min-height:0;overflow:hidden}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute);white-space:nowrap}.hd small b{color:var(--gh-txt);font-weight:600}
  .top{display:flex;gap:14px;margin-top:12px;align-items:center}
  .ring{position:relative;width:112px;height:112px;flex:none}
  .ring svg{width:100%;height:100%}
  .ring .c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .ring b{font-size:23px;font-weight:600}.ring span{font-size:11.5px;color:var(--gh-mute);margin-top:2px}
  .rows{flex:1;display:flex;flex-direction:column;gap:6px;min-width:0}
  .row{display:flex;align-items:center;gap:9px;padding:6px 11px;border-radius:12px;background:rgba(255,255,255,.06);font-size:13px;color:var(--gh-mute);white-space:nowrap}
  .row i{width:9px;height:9px;border-radius:50%;flex:none}
  .row b{margin-left:auto;color:var(--gh-txt);font-size:15px;font-weight:600}
  .row em{font-style:normal;font-size:11px;color:var(--gh-mute);margin-left:4px;font-weight:400}
  .lg{display:flex;gap:12px;font-size:12px;color:var(--gh-mute);margin:12px 0 2px;align-items:center;white-space:nowrap}
  .lg i{display:inline-block;width:12px;height:3px;border-radius:2px;margin-right:6px;vertical-align:middle}
  .lg small{margin-left:auto;font-size:11.5px}.lg small b{color:var(--gh-txt)}
  .plot{position:relative;flex:1;min-height:60px}
  .plot svg{position:absolute;inset:0;width:100%;height:100%}
  .t{position:absolute;font-size:10.5px;color:var(--gh-mute);white-space:nowrap}
  .msg{padding:8px 0;font-size:13px;color:var(--gh-mute);line-height:1.45}
  @container (max-width:360px){.ring{width:92px;height:92px}.ring b{font-size:19px}.row{font-size:12px;padding:5px 9px}.row b{font-size:14px}.lg span:nth-child(3){display:none}}
`;
class GlassHomeEnergyMiniCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-energy-mini-editor'); }
  static getStubConfig() { return {}; }
  setConfig(config) { this._config = { chart: true, ...(config || {}) }; this._sig = ''; this._curve = null; if (this._hass) this._render(); }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first) this._load();
    this._render();
  }
  connectedCallback() { this._tick = setInterval(() => this._load(), 5 * 60e3); this.style.containerType = 'inline-size'; }
  disconnectedCallback() { clearInterval(this._tick); }
  getCardSize() { return 6; }
  getGridOptions() { return { columns: 4, rows: 6 }; }

  // Tageskurve: 5-Minuten-Statistik, ohne state_class aus dem Verlauf gemittelt
  async _load() {
    const h = this._hass, c = this._config;
    if (!h?.callWS || !c.chart) return;
    const ids = { pv: c.solar_power, use: c.home_power, soc: c.battery_soc };
    const list = Object.values(ids).filter(Boolean);
    if (!list.length) return;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const N = 288, slot = (t) => Math.floor((t - start) / 3e5);
    const out = {};
    try {
      const res = await h.callWS({ type: 'recorder/statistics_during_period', start_time: start.toISOString(), period: '5minute', statistic_ids: list, types: ['mean'], units: { power: 'kW' } }).catch(() => ({}));
      const missing = list.filter((id) => !(res[id] || []).length);
      for (const id of list) if (!missing.includes(id)) {
        const a = new Array(N).fill(null);
        for (const r of res[id]) { const i = slot(typeof r.start === 'number' ? r.start : Date.parse(r.start)); if (i >= 0 && i < N && r.mean != null) a[i] = r.mean; }
        out[id] = a;
      }
      if (missing.length && h.callApi) {
        const hist = await h.callApi('GET', `history/period/${start.toISOString()}?filter_entity_id=${missing.join(',')}&minimal_response&no_attributes`);
        for (const arr of hist || []) {
          const id = arr[0]?.entity_id;
          if (!id) continue;
          const sum = new Array(N).fill(0), cnt = new Array(N).fill(0);
          const u = (h.states[id]?.attributes.unit_of_measurement || '').toLowerCase();
          const k = id === c.battery_soc ? 1 : u === 'kw' ? 1 : u === 'mw' ? 1000 : 1 / 1000;
          for (const r of arr) {
            const v = parseFloat(r.state), i = slot(Date.parse(r.last_changed || r.lu * 1000));
            if (!isNaN(v) && i >= 0 && i < N) { sum[i] += v * k; cnt[i]++; }
          }
          // Lücken mit dem letzten Wert füllen, bis jetzt
          const now = slot(Date.now());
          let last = null;
          out[id] = sum.map((s, i) => { if (cnt[i]) last = s / cnt[i]; return i <= now ? last : null; });
        }
      }
      this._curve = { pv: out[ids.pv], use: out[ids.use], soc: out[ids.soc] };
      this._sig = '';
      this._render();
    } catch (e) { /* ohne Kurve weiter */ }
  }

  _render() {
    const h = this._hass, c = this._config;
    const n = energyNow(h, c);
    const today = energyKwh(h, c.solar_energy);
    const r2 = (v) => (v == null ? '' : Math.round(v * 100));
    const sig = [n.pv, n.grid, n.home, n.bat].map(r2).join('|') + '|' + Math.round(n.soc ?? -1) + '|' + today + '|' + (this._curve ? 1 : 0);
    if (sig === this._sig) return;
    this._sig = sig;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const style = `<style>${GH_STYLE}${MINI_STYLE}</style>`;
    const head = `<div class="hd">${icon('sun', 18)}${esc(c.name || 'Energie')}${today != null ? `<small>heute <b>${kWh(today)}</b> erzeugt</small>` : ''}</div>`;
    if (n.home == null && n.pv == null && n.soc == null) {
      this.shadowRoot.innerHTML = `${style}<div class="mi p">${head}<div class="msg">Leistungssensoren im Karten-Editor wählen (PV, Netz, Hausverbrauch, Akku).</div></div>`;
      return;
    }
    const b = n.bat, bState = b == null ? '' : b > 0.02 ? 'lädt' : b < -0.02 ? 'entlädt' : 'bereit';
    const g = n.grid;
    const rows = [];
    if (n.pv != null) rows.push(['#f5c84c', 'Erzeugung', powerFmt(n.pv), '']);
    if (n.home != null) rows.push(['#4dd0e1', 'Hausverbrauch', powerFmt(n.home), '']);
    if (g != null) rows.push([g < -0.02 ? '#5fd68e' : g > 0.02 ? '#ff8a65' : '#c9d2dc', g < -0.02 ? 'Einspeisung' : g > 0.02 ? 'Netzbezug' : 'Netz', powerFmt(g), '']);
    if (b != null) rows.push(['#b48cff', 'Akku', powerFmt(b), bState]);
    const C = 2 * Math.PI * 47, soc = n.soc != null ? Math.max(0, Math.min(100, n.soc)) : null;
    const ring = soc != null ? `<div class="ring"><svg viewBox="0 0 112 112"><circle cx="56" cy="56" r="47" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="9"/>
        <circle cx="56" cy="56" r="47" fill="none" stroke="#b48cff" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(soc / 100) * C} ${C}" transform="rotate(-90 56 56)"/></svg>
        <div class="c"><b>${Math.round(soc)} %</b><span>Akku${bState && bState !== 'bereit' ? ` ${bState}` : ''}</span></div></div>` : '';
    this.shadowRoot.innerHTML = `${style}<div class="mi p">${head}
      <div class="top">${ring}<div class="rows">${rows.map(([col, l, v, e]) => `<div class="row"><i style="background:${col}"></i>${l}<b>${v}${e ? `<em>${e}</em>` : ''}</b></div>`).join('')}</div></div>
      ${c.chart ? this._chart() : ''}</div>`;
  }

  _chart() {
    const cv = this._curve;
    if (!cv || (!cv.pv && !cv.use)) return '';
    const N = 288, W = 400, H = 160, l = 30, r = cv.soc ? W - 30 : W - 6, top = 8, bot = H - 16;
    const all = [...(cv.pv || []), ...(cv.use || [])].filter((v) => v != null);
    const max = Math.max(1, Math.ceil(Math.max(...all) * 1.1));
    const x = (i) => l + (i / N) * (r - l), y = (v) => bot - (v / max) * (bot - top), y2 = (v) => bot - (v / 100) * (bot - top);
    const line = (a, fy) => { let d = '', on = false; a.forEach((v, i) => { if (v == null) { on = false; return; } d += `${on ? 'L' : 'M'}${x(i).toFixed(1)} ${fy(v).toFixed(1)}`; on = true; }); return d; };
    const lastI = (a) => { for (let i = a.length - 1; i >= 0; i--) if (a[i] != null) return i; return -1; };
    let peak = null;
    (cv.pv || []).forEach((v, i) => { if (v != null && (!peak || v > peak.v)) peak = { v, i }; });
    const pt = (i) => { const m = i * 5; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
    const now = (Date.now() - new Date().setHours(0, 0, 0, 0)) / 3e5;
    const xn = x(now);
    const step = max > 4 ? 2 : 1;
    let grid = '', ly = '';
    for (let v = step; v < max; v += step) { grid += `<line x1="${l}" x2="${r}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(255,255,255,.07)"/>`; ly += `<span class="t" style="left:0;top:${(y(v) / H) * 100}%;transform:translateY(-50%)">${v} kW</span>`; }
    const pv = cv.pv ? line(cv.pv, y) : '', li = cv.pv ? lastI(cv.pv) : -1;
    const svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5c84c" stop-opacity=".4"/><stop offset="1" stop-color="#f5c84c" stop-opacity="0"/></linearGradient></defs>
      ${grid}<line x1="${l}" x2="${r}" y1="${bot}" y2="${bot}" stroke="rgba(255,255,255,.14)"/>
      ${pv && li >= 0 ? `<path d="${pv} L${x(li)} ${bot} L${x(cv.pv.findIndex((v) => v != null))} ${bot} Z" fill="url(#gm)"/><path d="${pv}" fill="none" stroke="#f5c84c" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>` : ''}
      ${cv.use ? `<path d="${line(cv.use, y)}" fill="none" stroke="#4dd0e1" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>` : ''}
      ${cv.soc ? `<path d="${line(cv.soc, y2)}" fill="none" stroke="#b48cff" stroke-width="2" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/>` : ''}
      <line x1="${xn}" x2="${xn}" y1="${top}" y2="${bot}" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>
    </svg>`;
    // Punkte am Kurvenende als HTML, damit sie bei gestrecktem SVG rund bleiben
    const dots = [[cv.use, '#4dd0e1', y], [cv.pv, '#f5c84c', y]].map(([a, col]) => { const i = a ? lastI(a) : -1; return i < 0 ? '' : `<span style="position:absolute;left:${(x(i) / W) * 100}%;top:${(y(a[i]) / H) * 100}%;width:9px;height:9px;margin:-4.5px;border-radius:50%;background:${col};box-shadow:0 0 0 2px #15171a"></span>`; }).join('');
    const xl = [0, 6, 12, 18].map((hr) => `<span class="t" style="left:${(x(hr * 12) / W) * 100}%;bottom:0;${hr ? 'transform:translateX(-50%)' : ''}">${String(hr).padStart(2, '0')}:00</span>`).join('');
    const yr = cv.soc ? [50, 100].map((v) => `<span class="t" style="right:0;top:${(y2(v) / H) * 100}%;transform:translateY(-50%);color:#b48cff">${v} %</span>`).join('') : '';
    return `<div class="lg">${cv.pv ? '<span><i style="background:#f5c84c"></i>Erzeugung</span>' : ''}${cv.use ? '<span><i style="background:#4dd0e1"></i>Verbrauch</span>' : ''}${cv.soc ? '<span><i style="background:#b48cff"></i>Akku</span>' : ''}
        ${peak && peak.v > 0.05 ? `<small>Spitze <b>${powerFmt(peak.v)}</b> · ${pt(peak.i)}</small>` : ''}</div>
      <div class="plot">${svg}${dots}${ly}${yr}${xl}</div>`;
  }
}
class GlassHomeEnergyMiniEditor extends GlassHomeFormEditor {
  static schema = [...FLOW_SCHEMA, { name: 'solar_energy', selector: { entity: { domain: 'sensor' } } }, { name: 'chart', selector: { boolean: {} } }, { name: 'name', selector: { text: {} } }];
  static labels = { ...FLOW_LABELS, solar_energy: 'PV heute in kWh (Kopfzeile, optional)', chart: 'Tageskurve zeigen', name: 'Titel (Standard: Energie)' };
  static defaults = { chart: true };
}

/* ------------------------------------------------------------------ */
/* Müllabfuhr (Waste Collection Schedule)                              */
/* ------------------------------------------------------------------ */
const WASTE_COLORS = [
  [/bio/i, '#8b5e3c'], [/rest/i, '#7b7f86'], [/gelb|plastik|verpack|leicht|lvp/i, '#f5c84c'],
  [/papier|karton/i, '#e05555'], [/glas/i, '#4caf50'], [/metall|dose/i, '#4dd0e1'], [/sperr/i, '#b48cff'], [/gr[üu]n|baum|strauch/i, '#6fbf73'],
];
const wasteColor = (name) => (WASTE_COLORS.find(([re]) => re.test(name)) || [null, '#a3a9b1'])[1];

// Sensoren von Waste Collection Schedule haben das Attribut daysTo
function wasteSensors(h) {
  return Object.keys(h.states).filter((id) => id.startsWith('sensor.') && visible(h, id) && h.states[id].attributes.daysTo !== undefined && h.states[id].attributes.daysTo !== null);
}

const dayWord = (d) => (d === 0 ? 'heute' : d === 1 ? 'morgen' : d === 2 ? 'übermorgen' : `in ${d} Tagen`);

const WASTE_STYLE = `
  :host{container-type:inline-size}
  /* kompakt: bis zu 4 Abfuhren als 2×2-Kacheln, die nächste hervorgehoben */
  .wg{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(0,1fr);gap:8px}
  .wg.one{grid-template-columns:1fr}
  .wt{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:14px;min-width:0;overflow:hidden;cursor:pointer;
      background:color-mix(in srgb,var(--c) 10%,transparent);border:1px solid color-mix(in srgb,var(--c) 30%,transparent)}
  .wt.nx{background:color-mix(in srgb,var(--c) 24%,transparent);border-color:color-mix(in srgb,var(--c) 65%,transparent)}
  .wt .bin{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--c);color:#fff;flex:none}
  .wt>div{min-width:0}
  .wt b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .wt small{display:block;font-size:12px;color:var(--gh-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .wt.soon small{color:var(--gh-warn);font-weight:600}
  .wt em{display:block;font-style:normal;font-size:11.5px;color:var(--gh-dim);white-space:nowrap}
  .card.tight .wt em{display:none}.card.tight .wt .bin{width:28px;height:28px;border-radius:9px}
  @container (max-width:300px){.wg{grid-template-columns:1fr}.wt em{display:none}}
  .card{padding:14px 16px;display:flex;flex-direction:column;height:100%;overflow:hidden}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin-bottom:10px}
  .card.tight .wn{padding:8px 10px}.card.tight .wn .bin{width:36px;height:36px}.card.tight .hd{margin-bottom:6px}
  .wn{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;margin-bottom:10px;
      background:color-mix(in srgb,var(--c) 22%,transparent);border:1px solid color-mix(in srgb,var(--c) 60%,transparent)}
  .wn .bin{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:var(--c);color:#fff;flex:none}
  .wn b{display:block;font-size:16px}.wn small{color:var(--gh-mute);font-size:12.5px}
  .wn.soon small{color:var(--gh-warn)}
  .wl{display:flex;align-items:center;gap:10px;padding:7px 2px;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
  .wl:last-child{border-bottom:0}
  .wl i{width:12px;height:12px;border-radius:4px;background:var(--c);flex:none}
  .wl small{margin-left:auto;color:var(--gh-mute);font-size:12.5px;white-space:nowrap}
  .msg{font-size:13px;color:var(--gh-mute);line-height:1.45}
`;

class GlassHomeWasteCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-waste-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { max: 5, ...(config || {}) };
    this._sig = '';
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const cals = this._cals();
    const sig = this._sensors().map((id) => `${id}|${hass.states[id].attributes.daysTo}`).join(';')
      + cals.map((id) => `${id}|${hass.states[id].attributes.start_time}`).join(';') + new Date().toDateString();
    if (sig === this._sig) return;
    this._sig = sig;
    if (cals.length) this._load(cals);
    else this._render();
  }

  connectedCallback() { this._tick = setInterval(() => { this._sig = ''; if (this._hass) this.hass = this._hass; }, 60 * 60e3); }
  disconnectedCallback() { clearInterval(this._tick); }

  getCardSize() { return 4; }
  getGridOptions() { return { columns: 6, min_columns: 4 }; }

  _sensors() {
    const c = this._config;
    return (c.entities?.length ? c.entities.filter((id) => id.startsWith('sensor.')) : wasteSensors(this._hass)).filter((id) => this._hass.states[id]);
  }

  // Kalender nur, wenn es keine Sensoren gibt (oder einer ausdrücklich gewählt ist)
  _cals() {
    const c = this._config, h = this._hass;
    if (c.entities?.length) return c.entities.filter((id) => id.startsWith('calendar.') && h.states[id]);
    if (this._sensors().length) return [];
    return Object.keys(h.states).filter((id) => visible(h, id) && isWasteCal(h, id));
  }

  // nächster Termin je Müllart aus dem Kalender
  async _load(cals) {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 864e5);
    const q = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    const lists = await Promise.all(cals.map((id) => this._hass.callApi('GET', `calendars/${id}?${q}`)
      .then((evs) => evs.map((ev) => ({ ...ev, cal: id }))).catch(() => [])));
    const next = new Map();
    for (const ev of lists.flat()) {
      const d = daysUntil(ev.start?.date || ev.start?.dateTime), name = (ev.summary || '').trim();
      if (!name || isNaN(d) || d < 0) continue;
      if (!next.has(name) || next.get(name).d > d) next.set(name, { id: ev.cal, name, d });
    }
    this._calItems = [...next.values()];
    this._render();
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const fromSensors = this._sensors().map((id) => {
      const s = h.states[id];
      return { id, name: s.attributes.friendly_name || id, d: Number(s.attributes.daysTo) };
    });
    const items = [...fromSensors, ...(this._cals().length ? this._calItems || [] : [])]
      .map((x) => ({ ...x, date: new Date(today.getTime() + x.d * 864e5) }))
      .filter((x) => !isNaN(x.d) && x.d >= 0).sort((a, b) => a.d - b.d).slice(0, Number(this._config.max) || 5);

    let body;
    if (!items.length && this._cals().length && !this._calItems) {
      body = '';
    } else if (!items.length) {
      body = '<div class="msg">Keine Abholtermine gefunden. Die Integration „Waste Collection Schedule“ einrichten (Einstellungen → Marketplace).</div>';
    } else {
      const four = items.slice(0, 4);
      items.length = four.length;
      body = `<div class="wg ${four.length === 1 ? 'one' : ''}">${four.map((x, i) => `<div class="wt ${i === 0 ? 'nx' : ''} ${x.d <= 1 ? 'soon' : ''}" style="--c:${wasteColor(x.name)}">
          <span class="bin">${icon('trash', 18)}</span><div><b>${esc(x.name)}</b><small>${dayWord(x.d)}${x.d === 1 ? ' · rausstellen' : ''}</small>
          <em>${WEEKDAY[x.date.getDay()]}., ${x.date.getDate()}.${x.date.getMonth() + 1}.</em></div></div>`).join('')}</div>`;
    }
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${WASTE_STYLE}</style>
      <div class="card p"><div class="hd">${icon('trash', 18)}${esc(this._config.title || 'Müllabfuhr')}</div>${body}</div>`;
    this.shadowRoot.querySelectorAll('.wt').forEach((el, i) => el.addEventListener('click', () =>
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: items[i].id }, bubbles: true, composed: true }))));
    this._fit();
    if (!this._ro && window.ResizeObserver) { this._ro = new ResizeObserver(() => this._fit()); this._ro.observe(this); }
  }

  // nicht scrollen: nur so viele Termine zeigen, wie in die Kachel passen
  _fit() {
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => {
      const card = this.shadowRoot?.querySelector('.card');
      if (!card || !card.clientHeight) return;
      // Kacheln zu niedrig: Datum ausblenden, Symbol kleiner
      card.classList.remove('tight');
      const tiles = [...card.querySelectorAll('.wt')];
      if (tiles.some((t) => t.scrollHeight > t.clientHeight + 1) || card.scrollHeight > card.clientHeight + 1) card.classList.add('tight');
    });
  }
}

class GlassHomeWasteEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'title', selector: { text: {} } },
    { name: 'entities', selector: { entity: { multiple: true, domain: ['sensor', 'calendar'] } } },
    { name: 'max', selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
  ];
  static labels = { title: 'Titel (leer = Müllabfuhr)', entities: 'Müll-Sensoren oder -Kalender (leer = automatisch)', max: 'Höchstens anzeigen' };
  static defaults = { max: 5 };
}

/* ------------------------------------------------------------------ */
/* Einkauf & Termine: offene Einträge einer HA-Liste und nächste       */
/* Kalendertermine. Beides ist eingebaut, braucht kein HACS.           */
/* ------------------------------------------------------------------ */
// Einkaufsliste bevorzugen, sonst die erste Liste
function defaultTodo(h) {
  const ids = Object.keys(h.states).filter((id) => id.startsWith('todo.') && visible(h, id));
  return ids.find((id) => /shopping|einkauf/i.test(id + (h.states[id].attributes.friendly_name || ''))) || ids[0];
}
// Müllkalender zeigt die Müllkarte, deshalb hier nicht noch einmal
const calendarIds = (h) => Object.keys(h.states).filter((id) => id.startsWith('calendar.') && visible(h, id) && !isWasteCal(h, id));

const AGENDA_STYLE = `
  .card{padding:14px 16px;display:flex;flex-direction:column;gap:12px;height:100%;overflow:auto}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  section{display:flex;flex-direction:column;gap:6px}
  section[hidden]{display:none}
  .add{display:flex;gap:8px}
  .add input{flex:1;min-width:0;height:38px;border-radius:12px;border:1px solid var(--gh-line);background:var(--gh-ctl);
     color:var(--gh-txt);padding:0 12px;font:inherit;font-size:14px;outline:none}
  .add input:focus{border-color:rgba(var(--gh-lit),.6)}
  .add button{width:38px;height:38px;border-radius:12px;border:0;background:rgba(var(--gh-lit),.22);color:rgb(var(--gh-lit));
     font-size:22px;line-height:1;cursor:pointer}
  .it{display:flex;align-items:center;gap:10px;padding:6px 2px;font-size:14px;border-bottom:1px solid rgba(255,255,255,.06)}
  .it:last-child{border-bottom:0}
  .it button{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--gh-mute);background:none;color:transparent;
     display:grid;place-items:center;padding:0;cursor:pointer;flex:none}
  .it button:hover{border-color:rgb(var(--gh-lit));color:rgb(var(--gh-lit))}
  .it span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ev{display:flex;gap:12px;align-items:baseline;padding:6px 2px;font-size:14px;border-bottom:1px solid rgba(255,255,255,.06);cursor:pointer}
  .ev:last-child{border-bottom:0}
  .ev small{flex:none;width:112px;color:var(--gh-mute);font-size:12.5px;white-space:nowrap}
  .ev.today small{color:rgb(var(--gh-lit))}
  .ev span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .more,.msg{font-size:12.5px;color:var(--gh-mute)}
  .more{cursor:pointer}
`;

class GlassHomeAgendaCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-agenda-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { max_items: 6, max_events: 5, days: 7, ...(config || {}) };
    this._sig = '';
    if (this._hass) this._refresh();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    // neu laden, wenn sich eine Liste oder ein Kalender meldet
    const sig = [this._todo(), ...this._cals()].map((id) => id && `${id}:${hass.states[id]?.last_updated}`).join('|');
    if (sig === this._sig) return;
    this._sig = sig;
    this._refresh();
  }

  connectedCallback() { this._tick = setInterval(() => this._refresh(), 15 * 60e3); }
  disconnectedCallback() { clearInterval(this._tick); }

  getCardSize() { return 5; }
  getGridOptions() { return { columns: 6, min_columns: 4 }; }

  _todo() { return this._config.todo === false ? null : this._config.todo || defaultTodo(this._hass); }
  _cals() {
    const c = this._config.calendars;
    return c === false ? [] : (c?.length ? c : calendarIds(this._hass)).filter((id) => this._hass.states[id]);
  }

  async _refresh() {
    const h = this._hass, c = this._config;
    const todo = this._todo(), cals = this._cals();
    try {
      this._items = todo
        ? ((await h.callWS({ type: 'todo/item/list', entity_id: todo })).items || []).filter((i) => i.status === 'needs_action')
        : null;
    } catch (e) { this._items = []; }
    const start = new Date(), end = new Date(start.getTime() + (Number(c.days) || 7) * 864e5);
    const q = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    const lists = await Promise.all(cals.map((id) => h.callApi('GET', `calendars/${id}?${q}`)
      .then((evs) => evs.map((ev) => ({ ...ev, cal: id }))).catch(() => [])));
    const when = (t) => new Date(t.dateTime || `${t.date}T00:00:00`);
    this._events = cals.length ? lists.flat().map((ev) => ({ ...ev, at: when(ev.start), allDay: !ev.start.dateTime }))
      .sort((a, b) => a.at - b.at) : null;
    this._render();
  }

  _shell() {
    // einmal aufbauen, damit das Eingabefeld beim Aktualisieren nicht verloren geht
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${AGENDA_STYLE}</style><div class="card p">
      <section class="todo"><div class="hd">${icon('cart', 18)}<span class="tt"></span><small class="cnt"></small></div>
        <div class="list"></div>
        <form class="add"><input placeholder="Hinzufügen …" enterkeyhint="done" aria-label="Eintrag hinzufügen"><button type="submit" aria-label="Hinzufügen">+</button></form></section>
      <section class="cal"><div class="hd">${icon('cal', 18)}Termine<small class="rng"></small></div><div class="evs"></div></section></div>`;
    const root = this.shadowRoot;
    root.querySelector('form').addEventListener('submit', (ev) => {
      ev.preventDefault();
      const inp = root.querySelector('input'), text = inp.value.trim();
      if (!text || !this._todo()) return;
      this._hass.callService('todo', 'add_item', { item: text }, { entity_id: this._todo() });
      inp.value = '';
    });
    root.querySelector('.list').addEventListener('click', (ev) => {
      const b = ev.target.closest('button[data-uid]');
      if (b) { this._hass.callService('todo', 'update_item', { item: b.dataset.uid, status: 'completed' }, { entity_id: this._todo() }); return; }
      if (ev.target.closest('.more')) this._moreInfo(this._todo());
    });
    root.querySelector('.evs').addEventListener('click', (ev) => {
      const r = ev.target.closest('[data-cal]');
      if (r) this._moreInfo(r.dataset.cal);
    });
  }

  _moreInfo(entityId) {
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this.shadowRoot) this._shell();
    const h = this._hass, c = this._config, root = this.shadowRoot;
    const todo = this._todo(), items = this._items, events = this._events;

    root.querySelector('.todo').hidden = !todo;
    if (todo) {
      root.querySelector('.tt').textContent = c.title || h.states[todo]?.attributes.friendly_name || 'Einkaufsliste';
      root.querySelector('.cnt').textContent = items?.length ? `${items.length} offen` : '';
      const max = Number(c.max_items) || 6, shown = (items || []).slice(0, max);
      root.querySelector('.list').innerHTML = !items?.length ? '<div class="msg">Alles erledigt.</div>'
        : shown.map((i) => `<div class="it"><button data-uid="${esc(i.uid)}" aria-label="Erledigt">${icon('check', 14)}</button><span>${esc(i.summary)}</span></div>`).join('')
          + (items.length > max ? `<div class="more">+${items.length - max} weitere</div>` : '');
    }

    root.querySelector('.cal').hidden = !events;
    if (events) {
      root.querySelector('.rng').textContent = `nächste ${Number(c.days) || 7} Tage`;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const day = (d) => Math.round((new Date(d).setHours(0, 0, 0, 0) - today) / 864e5);
      const label = (ev) => {
        const d = day(ev.at), t = ev.allDay ? '' : ` ${String(ev.at.getHours()).padStart(2, '0')}:${String(ev.at.getMinutes()).padStart(2, '0')}`;
        if (d <= 0) return `Heute${t}`;
        if (d === 1) return `Morgen${t}`;
        return `${WEEKDAY[ev.at.getDay()]}., ${ev.at.getDate()}.${ev.at.getMonth() + 1}.${t}`;
      };
      root.querySelector('.evs').innerHTML = !events.length ? '<div class="msg">Keine Termine.</div>'
        : events.slice(0, Number(c.max_events) || 5).map((ev) => `<div class="ev ${day(ev.at) <= 0 ? 'today' : ''}" data-cal="${esc(ev.cal)}"><small>${label(ev)}</small><span>${esc(ev.summary)}</span></div>`).join('');
    }
  }
}

/* ------------------------------------------------------------------ */
/* Kalender: ein Tag als Karte, antippen zeigt die Woche               */
/* ------------------------------------------------------------------ */
const CAL_COLORS = ['#4dd0e1', '#ffb74d', '#b48cff', '#7ed08a', '#ff7a59', '#7ab8ff', '#f06292'];
const hhmm = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
const dayStart = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const WEEKDAY_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

// Termine aller gewählten Kalender in einem Zeitraum, mit Farbe und Ganztags-Kennung
async function loadEvents(h, cals, from, to, colorOf) {
  const q = `start=${encodeURIComponent(from.toISOString())}&end=${encodeURIComponent(to.toISOString())}`;
  const lists = await Promise.all(cals.map((id) => h.callApi('GET', `calendars/${id}?${q}`)
    .then((evs) => evs.map((ev) => ({ ...ev, cal: id }))).catch(() => [])));
  const at = (t) => new Date(t.dateTime || `${t.date}T00:00:00`);
  return lists.flat().map((ev) => {
    const allDay = !ev.start.dateTime;
    return { ...ev, at: at(ev.start), until: at(ev.end), allDay, color: colorOf(ev) };
  }).sort((a, b) => b.allDay - a.allDay || a.at - b.at);
}
// fällt der Termin (auch mehrtägig) auf diesen Tag?
const onDay = (ev, d) => { const s = dayStart(d), e = addDays(s, 1); return ev.at < e && (ev.until > s || +ev.at === +s); };

const CAL_STYLE = `
  :host{container-type:inline-size}
  .card{padding:14px 16px 12px;display:flex;flex-direction:column;height:100%;box-sizing:border-box;cursor:pointer;min-height:0}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px}
  .hd .cl{font-weight:400;color:var(--gh-mute);font-size:12.5px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .hd .nv{margin-left:auto;display:flex;gap:4px;flex:none}
  .hd .nv button{width:30px;height:30px;border-radius:9px;border:0;background:rgba(255,255,255,.07);color:var(--gh-mute);font-size:16px;cursor:pointer}
  .big{display:flex;align-items:baseline;gap:10px;margin:6px 0 8px;white-space:nowrap}
  .big b{font-size:28px;font-weight:300}.big span{color:var(--gh-mute);font-size:13px;overflow:hidden;text-overflow:ellipsis}
  .ad{display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap}
  .ad span{font-size:12px;padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--c) 22%,transparent);border:1px solid color-mix(in srgb,var(--c) 55%,transparent);white-space:nowrap}
  .ls{flex:1;min-height:0;overflow:hidden}
  .ev{display:grid;grid-template-columns:46px 4px minmax(0,1fr);gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)}
  .ev:last-child{border:0}
  .ev time{font-size:13px;color:var(--gh-mute);text-align:right}
  .ev i{height:30px;border-radius:2px;background:var(--c)}
  .ev b{font-size:14px;font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ev small{font-size:12px;color:var(--gh-mute);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ev.now time{color:#ffcf8a}.ev.past{opacity:.45}
  .ft{font-size:12.5px;color:var(--gh-mute);padding-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ft b{color:var(--gh-txt);font-weight:600}
  .msg{font-size:13.5px;color:var(--gh-mute);padding:6px 0}
`;

const WEEK_STYLE = `
  :host{position:fixed;inset:0;z-index:9;display:flex;align-items:center;justify-content:center}
  .bg{position:absolute;inset:0;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
  .sheet{position:relative;width:min(1100px,calc(100vw - 32px));max-height:min(88vh,900px);display:flex;flex-direction:column;padding:16px 18px 18px;box-sizing:border-box;
         background:var(--glass-home-popup,rgba(34,38,43,.96))}
  .wt{display:flex;align-items:center;gap:10px;margin-bottom:10px}
  .wt h2{margin:0;font-size:20px;font-weight:600}.wt small{color:var(--gh-mute);font-size:13px}
  .wt .x{margin-left:auto;display:flex;gap:6px}
  .wt .x button{height:38px;min-width:38px;padding:0 12px;border-radius:12px;border:0;background:rgba(255,255,255,.08);color:var(--gh-txt);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
  .leg{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--gh-mute);margin-bottom:12px}
  .leg i{display:inline-block;width:9px;height:9px;border-radius:3px;background:var(--c);margin-right:6px}
  .cols{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;overflow:auto;min-height:0}
  .col{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:8px;min-height:260px}
  .col.today{border-color:rgba(255,183,77,.55);background:rgba(255,183,77,.06)}
  .col h4{margin:0 0 8px;font-size:12px;color:var(--gh-mute);font-weight:600}
  .col h4 b{display:block;font-size:20px;color:var(--gh-txt);font-weight:300}
  .col.today h4 b{color:#ffcf8a}
  .e{border-radius:9px;padding:6px 8px;margin-bottom:6px;font-size:12px;background:color-mix(in srgb,var(--c) 20%,transparent);border-left:3px solid var(--c);cursor:pointer}
  .e b{display:block;font-weight:600;font-size:12.5px;overflow-wrap:anywhere}.e span{color:var(--gh-mute)}
  .e.all{border:1px dashed color-mix(in srgb,var(--c) 70%,transparent)}
  .e.past{opacity:.5}
  .none{font-size:12px;color:var(--gh-dim)}
  @media (max-width:700px){
    :host{align-items:flex-end}
    .sheet{width:100vw;border-radius:22px 22px 0 0}
    .cols{grid-template-columns:1fr;grid-auto-rows:max-content;flex:1 1 auto}.col{min-height:auto}
    .col h4{display:flex;gap:8px;align-items:baseline}.col h4 b{display:inline;font-size:16px}
  }
`;

class GlassHomeCalendarCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-calendar-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { show_past: true, tomorrow: true, next_when_empty: true, evening: 20, week_start: 1, show_waste: false, ...(config || {}) };
    this._off = 0;
    this._sig = null;
    if (this._hass) this._refresh();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const sig = this._cals().map((id) => `${id}:${hass.states[id]?.last_updated}`).join('|');
    if (sig === this._sig) return;
    this._sig = sig;
    this._refresh();
  }

  connectedCallback() {
    // jede Minute neu zeichnen (laufender Termin, Tageswechsel), alle 15 Minuten neu laden
    this._tick = setInterval(() => (++this._n % 15 ? this._render() : this._refresh()), 60e3);
    this._n = 0;
  }
  disconnectedCallback() { clearInterval(this._tick); this._week?.remove(); }

  getCardSize() { return 4; }
  getGridOptions() { return { columns: 4, rows: 3 }; }

  _cals() {
    const h = this._hass, c = this._config.calendars;
    const all = Object.keys(h.states).filter((id) => id.startsWith('calendar.') && visible(h, id) && (this._config.show_waste || !isWasteCal(h, id)));
    return (c?.length ? c : all).filter((id) => h.states[id]);
  }

  _color(ev) {
    const h = this._hass, cals = this._cals(), set = this._config.colors || {};
    if (set[ev.cal]) return set[ev.cal];
    if (isWasteCal(h, ev.cal)) return wasteColor(ev.summary || '');
    return CAL_COLORS[Math.max(0, cals.indexOf(ev.cal)) % CAL_COLORS.length];
  }

  _calName(id) { return (this._hass.states[id]?.attributes.friendly_name || id.split('.')[1]).replace(/^calendar\s*/i, ''); }

  // angezeigter Tag: heute, ab der Abendstunde morgen, plus Blättern
  _day() {
    const now = new Date(), ev = Number(this._config.evening) || 0;
    const base = ev && now.getHours() >= ev ? addDays(dayStart(now), 1) : dayStart(now);
    return addDays(base, this._off);
  }

  async _refresh() {
    const h = this._hass, cals = this._cals();
    if (!cals.length) { this._events = []; this._render(); return; }
    const from = addDays(dayStart(new Date()), -1);
    this._events = await loadEvents(h, cals, from, addDays(from, 45), (e) => this._color(e));
    this._loaded = +from;
    this._render();
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, c = this._config, d = this._day(), now = new Date();
    const evs = this._events || [], today = dayStart(now);
    const diff = Math.round((d - today) / 864e5);
    const label = diff === 0 ? 'Heute' : diff === 1 ? 'Morgen' : diff === -1 ? 'Gestern' : WEEKDAY_LONG[d.getDay()];
    const sub = `${diff === 0 || diff === 1 || diff === -1 ? WEEKDAY_LONG[d.getDay()] + ', ' : ''}${d.getDate()}. ${MONTHS[d.getMonth()]}`;
    const dayEvs = evs.filter((e) => onDay(e, d));
    const all = dayEvs.filter((e) => e.allDay), timed = dayEvs.filter((e) => !e.allDay && (c.show_past || e.until > now));
    const cals = this._cals();
    let foot = '';
    if (!dayEvs.length && c.next_when_empty) {
      const nx = evs.find((e) => e.at >= addDays(d, 1));
      if (nx) foot = `Nächster: <b>${esc(nx.summary)}</b> · ${WEEKDAY[nx.at.getDay()]}., ${nx.at.getDate()}.${nx.at.getMonth() + 1}.${nx.allDay ? '' : ' ' + hhmm(nx.at)}`;
    } else if (c.tomorrow && diff === 0) {
      const tm = evs.filter((e) => onDay(e, addDays(d, 1)));
      if (tm.length) foot = `Morgen: <b>${esc(tm[0].summary)}</b>${tm[0].allDay ? '' : ' ' + hhmm(tm[0].at)}${tm.length > 1 ? ` · +${tm.length - 1}` : ''}`;
    }
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${CAL_STYLE}</style>
      <div class="card p">
        <div class="hd">${icon('cal', 18)}<span>${esc(c.title || 'Kalender')}</span><span class="cl">${esc(cals.map((id) => this._calName(id)).join(' · '))}</span>
          <span class="nv"><button data-n="-1" aria-label="Vorheriger Tag">‹</button><button data-n="1" aria-label="Nächster Tag">›</button></span></div>
        <div class="big"><b>${label}</b><span>${esc(sub)}</span></div>
        ${all.length ? `<div class="ad">${all.map((e) => `<span style="--c:${e.color}">${esc(e.summary)}</span>`).join('')}</div>` : ''}
        <div class="ls">${!cals.length ? '<div class="msg">Kein Kalender gefunden.</div>'
          : !dayEvs.length ? `<div class="msg">${diff === 0 ? 'Heute keine Termine' : 'Keine Termine'}</div>`
          : timed.map((e) => `<div class="ev ${e.until <= now ? 'past' : e.at <= now ? 'now' : ''}" style="--c:${e.color}"><time>${hhmm(e.at)}</time><i></i>
              <div><b>${esc(e.summary)}</b><small>${esc([this._calName(e.cal), e.at <= now && e.until > now ? 'bis ' + hhmm(e.until) : '', e.location || ''].filter(Boolean).join(' · '))}</small></div></div>`).join('')}</div>
        <div class="ft">${foot}</div>
      </div>`;
    const root = this.shadowRoot;
    root.querySelectorAll('.nv button').forEach((b) => b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this._off += Number(b.dataset.n);
      this._render();
    }));
    root.querySelector('.card').addEventListener('click', () => this._openWeek());
    // was nicht in die Fläche passt, zählt als „+ n weitere“
    requestAnimationFrame(() => {
      const ls = root.querySelector('.ls'), rows = [...root.querySelectorAll('.ev')];
      if (!ls) return;
      let hidden = 0;
      for (const r of rows) if (r.offsetTop - ls.offsetTop + r.offsetHeight > ls.clientHeight + 1) { r.style.display = 'none'; hidden++; }
      if (hidden) {
        const ft = root.querySelector('.ft');
        ft.innerHTML = `+ ${hidden} weitere · antippen für die Woche${ft.innerHTML ? ' · ' + ft.innerHTML : ''}`;
      }
    });
  }

  _openWeek() {
    this._week?.remove();
    const w = document.createElement('glass-home-week');
    w.card = this;
    w.start = this._weekStart(this._day());
    document.body.appendChild(w);
    this._week = w;
    w.load();
  }

  _weekStart(d) {
    const ws = Number(this._config.week_start) || 0, x = dayStart(d);
    return addDays(x, -((x.getDay() - ws + 7) % 7));
  }
}

class GlassHomeWeekPopup extends HTMLElement {
  connectedCallback() {
    this._esc = (ev) => ev.key === 'Escape' && this.remove();
    window.addEventListener('keydown', this._esc);
  }
  disconnectedCallback() { window.removeEventListener('keydown', this._esc); }

  async load() {
    const c = this.card, h = c._hass, cals = c._cals();
    this._render(null);
    this._evs = cals.length ? await loadEvents(h, cals, this.start, addDays(this.start, 7), (e) => c._color(e)) : [];
    this._render(this._evs);
  }

  _render(evs) {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const c = this.card, s = this.start, e7 = addDays(s, 6), now = new Date(), today = dayStart(now);
    const thisWeek = +c._weekStart(today) === +s;
    const cals = c._cals();
    const range = s.getMonth() === e7.getMonth() ? `${s.getDate()}. – ${e7.getDate()}. ${MONTHS[s.getMonth()]}` : `${s.getDate()}. ${MONTHS[s.getMonth()]} – ${e7.getDate()}. ${MONTHS[e7.getMonth()]}`;
    const days = Array.from({ length: 7 }, (_, i) => addDays(s, i));
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${WEEK_STYLE}</style><div class="bg"></div>
      <div class="sheet p">
        <div class="wt"><div><h2>${thisWeek ? 'Diese Woche' : 'Woche'}</h2><small>${range}</small></div>
          <span class="x"><button data-w="-7" aria-label="Vorige Woche">‹</button><button data-w="0">Heute</button><button data-w="7" aria-label="Nächste Woche">›</button><button class="cls" aria-label="Schließen">✕</button></span></div>
        <div class="leg">${cals.map((id) => `<span><i style="--c:${isWasteCal(c._hass, id) ? '#a3a9b1' : c._color({ cal: id })}"></i>${esc(c._calName(id))}</span>`).join('')}</div>
        <div class="cols">${days.map((d) => {
          const list = (evs || []).filter((e) => onDay(e, d));
          return `<div class="col ${+d === +today ? 'today' : ''}"><h4>${WEEKDAY[d.getDay()]}${+d === +today ? ' · heute' : ''}<b>${d.getDate()}</b></h4>
            ${evs === null ? '<div class="none">…</div>' : list.length ? list.map((e) => `<div class="e ${e.allDay ? 'all' : ''} ${e.until <= now ? 'past' : ''}" style="--c:${e.color}" data-cal="${esc(e.cal)}">
              <b>${esc(e.summary)}</b><span>${e.allDay ? 'ganztägig' : hhmm(e.at) + (e.until - e.at > 0 && e.until - e.at < 864e5 ? ' – ' + hhmm(e.until) : '')}</span></div>`).join('') : '<div class="none">–</div>'}</div>`;
        }).join('')}</div>
      </div>`;
    const r = this.shadowRoot;
    // Handy: Tage untereinander, zum heutigen Tag scrollen
    const cols = r.querySelector('.cols'), td = r.querySelector('.col.today');
    if (td && innerWidth < 700) cols.scrollTop = td.offsetTop - cols.offsetTop;
    r.querySelector('.bg').addEventListener('click', () => this.remove());
    r.querySelector('.cls').addEventListener('click', () => this.remove());
    r.querySelectorAll('[data-w]').forEach((b) => b.addEventListener('click', () => {
      const n = Number(b.dataset.w);
      this.start = n ? addDays(this.start, n) : c._weekStart(today);
      this.load();
    }));
    r.querySelectorAll('.e[data-cal]').forEach((el) => el.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.cal }, bubbles: true, composed: true }));
      this.remove();
    }));
  }
}

class GlassHomeCalendarEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'title', selector: { text: {} } },
    { name: 'calendars', selector: { entity: { multiple: true, domain: 'calendar' } } },
    { name: 'show_waste', selector: { boolean: {} } },
    { name: 'show_past', selector: { boolean: {} } },
    { name: 'tomorrow', selector: { boolean: {} } },
    { name: 'next_when_empty', selector: { boolean: {} } },
    { name: 'evening', selector: { number: { min: 0, max: 23, step: 1, mode: 'box' } } },
    { name: 'week_start', selector: { select: { mode: 'dropdown', options: [{ value: 1, label: 'Montag' }, { value: 0, label: 'Sonntag' }] } } },
  ];
  static labels = {
    title: 'Titel (Standard: Kalender)', calendars: 'Kalender (leer = alle)', show_waste: 'Müll-Termine zeigen', show_past: 'Vergangene Termine zeigen (abgedunkelt)',
    tomorrow: 'Vorschau „Morgen: …“', next_when_empty: 'Bei leerem Tag den nächsten Termin zeigen', evening: 'Ab dieser Stunde schon den nächsten Tag zeigen (0 = aus)', week_start: 'Woche beginnt am',
  };
  static defaults = { show_past: true, tomorrow: true, next_when_empty: true, evening: 20, week_start: 1, show_waste: false };
}

class GlassHomeAgendaEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'title', selector: { text: {} } },
    { name: 'todo', selector: { entity: { domain: 'todo' } } },
    { name: 'calendars', selector: { entity: { multiple: true, domain: 'calendar' } } },
    { name: 'days', selector: { number: { min: 1, max: 31, step: 1, mode: 'box' } } },
    { name: 'max_items', selector: { number: { min: 1, max: 20, step: 1, mode: 'box' } } },
    { name: 'max_events', selector: { number: { min: 1, max: 20, step: 1, mode: 'box' } } },
  ];
  static labels = {
    title: 'Titel der Liste (leer = Name der Liste)', todo: 'Liste (leer = Einkaufsliste)', calendars: 'Kalender (leer = alle)',
    days: 'Termine für so viele Tage', max_items: 'Höchstens Einträge', max_events: 'Höchstens Termine',
  };
  static defaults = { days: 7, max_items: 6, max_events: 5 };
}

/* ------------------------------------------------------------------ */
/* Räume-Liste: alle Bereiche untereinander, Temperatur, Feuchte,     */
/* Licht. Tippen öffnet die Raumübersicht. Für Flächen 4 x 6.          */
/* ------------------------------------------------------------------ */
const ROOMS_STYLE = `
  .card{padding:14px 14px 10px;display:flex;flex-direction:column;height:100%;overflow:auto}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin:0 2px 10px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  .ls{display:flex;flex-direction:column;gap:8px;flex:1}
  .r{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:4px 10px;padding:9px 12px;border-radius:14px;cursor:pointer;
     background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);flex:1;min-height:52px;max-height:84px}
  .r:active{transform:scale(.99)}
  .r.on{border-color:rgba(var(--gh-lit),.45)}
  .r.warn{border-color:rgba(255,183,77,.6)}
  .r .ic{grid-row:1/3;width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:rgba(255,255,255,.07);color:var(--gh-mute)}
  .r.on .ic{background:rgba(var(--gh-lit),.18);color:rgb(var(--gh-lit))}
  .r b{font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .r small{grid-column:2;font-size:12px;color:var(--gh-mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .r.warn small{color:var(--gh-warn)}
  .r .t{grid-row:1/3;grid-column:3;text-align:right;font-size:20px;font-weight:300;line-height:1.1}
  .r .t em{display:block;font-style:normal;font-size:11.5px;color:var(--gh-mute)}
  .msg{font-size:13px;color:var(--gh-mute)}
`;

class GlassHomeRoomsCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-rooms-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) { this._config = { ...(config || {}) }; this._sig = ''; if (this._hass) this._render(); }

  set hass(hass) {
    this._hass = hass;
    if (this._popup) this._popup.hass = hass;
    if (!this._config) return;
    const sig = this._rooms().map((r) => JSON.stringify(r)).join(';');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: 6, min_columns: 4 }; }

  _rooms() {
    const h = this._hass, c = this._config, hide = new Set(c.hide_areas || []);
    const ids = c.areas?.length ? c.areas : Object.values(h.areas || {}).sort((a, b) => a.name.localeCompare(b.name, 'de')).map((a) => a.area_id);
    return ids.filter((id) => h.areas?.[id] && !hide.has(id)).map((id) => {
      const e = areaEntities(h, id), name = h.areas[id].name;
      const num = (list) => avg(list.map((x) => parseFloat(h.states[x].state)).filter((v) => !isNaN(v)));
      const temp = e.temps.length ? num(e.temps) : avg(e.climates.map((x) => h.states[x].attributes.current_temperature).filter((v) => v != null));
      const hum = num(e.hums);
      const on = e.lights.filter((x) => h.states[x].state === 'on');
      const open = e.openings.filter((x) => h.states[x].state === 'on');
      const parts = [];
      if (open.length) parts.push(open.length === 1 ? (h.states[open[0]].attributes.friendly_name || 'Fenster') + ' offen' : `${open.length} Fenster offen`);
      if (e.lights.length) parts.push(on.length ? (on.length === 1 ? 'Licht an' : `${on.length} Lichter an`) : 'Licht aus');
      if (e.covers.length) { const cl = coverClosed(h, e.covers); parts.push(cl >= 100 ? 'Rollo zu' : cl <= 0 ? 'Rollo offen' : `Rollo ${cl} % zu`); }
      return { id, name, temp, hum, on: on.length > 0, warn: open.length > 0, sub: parts.join(' · '), any: e.lights.length + e.covers.length + e.temps.length + e.climates.length + e.openings.length };
    }).filter((r) => r.any);
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const rooms = this._rooms();
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${ROOMS_STYLE}</style><div class="card p">
      <div class="hd">${icon('home', 18)}${esc(this._config.title || 'Räume')}<small>${rooms.length}</small></div>
      <div class="ls">${rooms.length ? rooms.map((r) => `<div class="r ${r.on ? 'on' : ''} ${r.warn ? 'warn' : ''}" data-a="${esc(r.id)}" style="--rc:${roomColor(r.name, r.id, this._config.room_colors)}">
        <span class="ic">${icon(roomIcon(r.name), 18)}</span><b>${esc(r.name)}</b>
        <span class="t">${r.temp != null ? `${fmt(r.temp)}°` : '–'}${r.hum != null ? `<em>${Math.round(r.hum)} %</em>` : ''}</span>
        <small>${esc(r.sub)}</small></div>`).join('') : '<div class="msg">Keine Räume mit Geräten gefunden.</div>'}</div></div>`;
    this.shadowRoot.querySelectorAll('.r').forEach((el) => el.addEventListener('click', () => this._open(el.dataset.a)));
  }

  _open(area) {
    document.querySelector('glass-home-popup')?.close();
    const pop = document.createElement('glass-home-popup');
    pop.kind = 'room';
    pop.area = area;
    document.body.appendChild(pop);
    pop.hass = this._hass;
    this._popup = pop;
    pop.onclose = () => { if (this._popup === pop) this._popup = null; };
  }
}

class GlassHomeRoomsEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'title', selector: { text: {} } },
    { name: 'areas', selector: { area: { multiple: true } } },
  ];
  static labels = { title: 'Titel (leer = Räume)', areas: 'Räume (leer = alle mit Geräten)' };
  static defaults = {};
}

/* ------------------------------------------------------------------ */
/* Glass-Raster: eigene Ansicht mit festem 12-Spalten-Raster           */
/* type: custom:glass-home-grid; Karten: grid_options {columns, rows}  */
/* Standard: Kopf 12x1, Begrüßung 9x2 + Wetter 3x2, Status 12x1,       */
/* Flächen 4x3 (zusammenlegbar zu 4x6, 8x3, 8x6, 12x3, 12x6)           */
/* ------------------------------------------------------------------ */
const GRID_STYLE = `
  :host{display:block;box-sizing:border-box;padding:var(--gh-pad,12px);--gh-gap:10px}
  .g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:var(--gh-row,64px);gap:var(--gh-gap);grid-auto-flow:row dense;
     max-width:var(--glass-home-max-width,1920px);margin:0 auto}
  .c{position:relative;min-width:0;min-height:0;grid-column:span var(--w);grid-row:span var(--h)}
  .c>*:not(.ed){display:block;height:100%;overflow:hidden;border-radius:var(--glass-home-radius,22px)}
  .ed{position:absolute;inset:0;z-index:2;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:4px;padding:4px;box-sizing:border-box;background:rgba(10,12,14,.62);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);border-radius:var(--glass-home-radius,22px)}
  .ed{gap:2px}
  .ed .grp{display:flex;background:#1c1f23;border:1px solid rgba(255,255,255,.18);border-radius:999px;pointer-events:auto}
  .ed .grp button{background:none;padding:6px 7px;font:600 11px/1 system-ui;min-width:24px}
  .ed .grp button:hover{background:rgba(255,255,255,.15)}
  .ed .dim{color:#cfd6de;font:600 11px/1 system-ui;padding:6px 2px;align-self:center}
  .c.edit{outline:1px dashed rgba(255,255,255,.25);outline-offset:2px;border-radius:var(--glass-home-radius,22px)}
  .ed button,.add{border:0;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;font:600 12px/1 system-ui;padding:7px 10px;cursor:pointer}
  .add{grid-column:span 12;padding:14px;border:1px dashed rgba(255,255,255,.3);background:rgba(255,255,255,.04);border-radius:16px}
  .pg{grid-column:span 12;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
  .pg button,.pg input{height:40px;border-radius:12px;font:600 13px/1 system-ui;padding:0 14px}
  .pg button{border:1px dashed rgba(255,255,255,.3);background:rgba(255,255,255,.04);color:#fff;cursor:pointer}
  .pg button.pri{border-style:solid;background:rgba(255,183,77,.22);border-color:rgba(255,183,77,.5);color:#ffcf8a}
  .pg button.dng{border-color:rgba(255,120,100,.5);color:#ffb3a6}
  .pg input{flex:1;min-width:180px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.25);color:#fff;font-weight:500}
  .pg small{color:rgba(255,255,255,.6);font:500 12px system-ui}
  /* Tablet hochkant: Flächen halb statt drittel breit */
  @media (max-width:1000px){ .c{grid-column:span var(--wm)} }
  /* Handy: untereinander, Höhe nach Inhalt (mindestens das Raster) */
  @media (max-width:700px){
    :host{--gh-pad:8px;--gh-gap:8px}
    .g{grid-auto-rows:auto}
    .c{grid-column:span var(--ws);grid-row:auto;min-height:calc(var(--h) * 56px)}
  }
`;

class GlassHomeGridView extends HTMLElement {
  // HA ruft setConfig mit der Ansichtskonfiguration auf, bevor es Karten setzt
  setConfig(config) { this._config = config || {}; this._render(); }
  set hass(h) { this._hass = h; (this._cards || []).forEach((c) => { c.hass = h; }); }
  set lovelace(l) { this._lovelace = l; this._render(); }
  get lovelace() { return this._lovelace; }
  set index(i) { this._index = i; }
  set cards(c) { this._cards = c || []; this._render(); }
  set badges(b) { this._badges = b; }
  set narrow(n) { this._narrow = n; }
  set isStrategy(v) { this._isStrategy = v; }

  connectedCallback() {
    this._onResize = () => this._fit();
    window.addEventListener('resize', this._onResize);
    this._render();
  }

  disconnectedCallback() { window.removeEventListener('resize', this._onResize); }

  _cfg(i) {
    const card = this._cards[i];
    return card?.config || this._config?.cards?.[i] || this._lovelace?.config?.views?.[this._index]?.cards?.[i] || {};
  }

  // Zeilenhöhe so, dass das Grundraster (10 Zeilen) genau den sichtbaren Bereich füllt
  _fit() {
    if (!this.isConnected) return;
    const rows = Number(this._config?.rows ?? this._lovelace?.config?.views?.[this._index]?.rows) || 10;
    const top = Math.max(0, this.getBoundingClientRect().top + window.scrollY);
    const pad = 12, gap = 10;
    const avail = window.innerHeight - top - pad * 2 - gap * (rows - 1);
    // hochkant und schmal feste Zeilen, sonst Bildschirm füllen (56 bis 110 px)
    const row = window.innerWidth <= 1000 ? 64 : Math.min(110, Math.max(56, Math.floor(avail / rows)));
    this.style.setProperty('--gh-row', `${row}px`);
  }

  // Größe ändern oder verschieben: Ansicht in der Dashboard-Konfiguration anpassen und speichern
  _saveCards(fn) {
    const l = this._lovelace;
    if (!l?.config?.views || typeof l.saveConfig !== 'function') return false;
    const views = l.config.views.slice();
    const view = { ...views[this._index] };
    const cards = (view.cards || []).slice();
    if (fn(cards) === false) return false;
    view.cards = cards;
    views[this._index] = view;
    l.saveConfig({ ...l.config, views });
    return true;
  }

  // Karten speichern eigene Einstellungen (z.B. Steckdosenauswahl) über das Ereignis gh-save-card
  _onSave(ev, g) {
    const d = ev.detail || {};
    ev.stopPropagation();
    d.handled = this._saveCards((cards) => {
      let i = -1;
      if (d.self) {
        const cell = ev.composedPath().find((n) => n.parentNode === g && n.classList?.contains('c'));
        i = cell ? [...g.children].indexOf(cell) : -1;
      } else if (d.type) i = cards.findIndex((c) => c.type === d.type);
      if (i < 0 || !cards[i]) return false;
      cards[i] = { ...cards[i], ...d.patch };
      return true;
    });
  }

  _change(i, a, w, h) {
    this._saveCards((cards) => this._resize(cards, i, a, w, h));
  }

  _resize(cards, i, a, w, h) {
    if (!cards[i]) return false;
    if (a === 'up' || a === 'down') {
      const j = a === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= cards.length) return false;
      [cards[i], cards[j]] = [cards[j], cards[i]];
    } else {
      const STEPS = [1, 2, 3, 4, 6, 8, 9, 12];
      let nw = w, nh = h;
      if (a === 'w+') nw = STEPS.find((x) => x > w) || 12;
      if (a === 'w-') nw = [...STEPS].reverse().find((x) => x < w) || 1;
      if (a === 'h+') nh = Math.min(12, h + 1);
      if (a === 'h-') nh = Math.max(1, h - 1);
      cards[i] = { ...cards[i], grid_options: { ...(cards[i].grid_options || {}), columns: nw, rows: nh } };
    }
    return true;
  }

  _render() {
    if (!this._cards || !this.isConnected) return;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const edit = !!this._lovelace?.editMode;
    const root = this.shadowRoot;
    root.innerHTML = `<style>${GRID_STYLE}</style><div class="g"></div>`;
    const g = root.querySelector('.g');
    g.addEventListener('gh-save-card', (ev) => this._onSave(ev, g));
    this._cards.forEach((card, i) => {
      const go = this._cfg(i).grid_options || {};
      const w = go.columns === 'full' ? 12 : Math.min(12, Math.max(1, Number(go.columns) || 4));
      const h = Math.max(1, Number(go.rows) || 3);
      const cell = document.createElement('div');
      cell.className = 'c';
      // Tablet hochkant: Drittel -> Hälfte; Handy: Kacheln bis 2 breit halb, sonst ganz
      cell.style.cssText = `--w:${w};--h:${h};--wm:${w === 4 ? 6 : w === 8 ? 12 : w === 9 ? 8 : w === 3 ? 4 : w};--ws:${w <= 2 ? 6 : 12}`;
      if (this._hass) card.hass = this._hass;
      cell.appendChild(card);
      // HA steckt die Karte in hui-card: Attribut an die Glass-Karte selbst, auch wenn sie später entsteht
      const flat = (this._config?.icon_colors ?? this._lovelace?.config?.views?.[this._index]?.icon_colors) === false;
      const mark = () => [card, ...card.querySelectorAll('*')].forEach((el) => { if (el.localName.startsWith('glass-home-')) el.toggleAttribute('gh-flat', flat); });
      mark();
      new MutationObserver(mark).observe(card, { childList: true, subtree: true });
      if (edit) {
        const ed = document.createElement('div');
        ed.className = 'ed';
        ed.innerHTML = '<div class="grp"><button data-a="up" title="Nach vorne">‹</button><button data-a="down" title="Nach hinten">›</button></div>'
          + '<div class="grp"><button data-a="w-" title="Schmaler">B−</button><span class="dim">' + w + '×' + h + '</span><button data-a="w+" title="Breiter">B+</button>'
          + '<button data-a="h-" title="Niedriger">H−</button><button data-a="h+" title="Höher">H+</button></div>'
          + '<div class="grp"><button data-a="edit" title="Bearbeiten">✎</button><button data-a="del" title="Löschen">✕</button></div>';
        cell.classList.add('edit');
        ed.addEventListener('click', (ev) => {
          const a = ev.target.closest('button')?.dataset.a;
          if (a && /^(up|down|w[+-]|h[+-])$/.test(a)) { this._change(i, a, w, h); return; }
          if (a === 'edit') this.dispatchEvent(new CustomEvent('ll-edit-card', { detail: { path: [this._index, i] }, bubbles: true, composed: true }));
          if (a === 'del') this.dispatchEvent(new CustomEvent('ll-delete-card', { detail: { path: [this._index, i], confirm: true }, bubbles: true, composed: true }));
        });
        cell.appendChild(ed);
      }
      g.appendChild(cell);
    });
    if (edit) {
      const add = document.createElement('button');
      add.className = 'add';
      add.textContent = '+ Karte hinzufügen';
      add.addEventListener('click', () => this.dispatchEvent(new CustomEvent('ll-create-card', { detail: {}, bubbles: true, composed: true })));
      g.appendChild(add);
      const pg = document.createElement('div');
      pg.className = 'pg';
      g.appendChild(pg);
      this._pages(pg);
    }
    requestAnimationFrame(() => this._fit());
  }

  // Seiten anlegen, umbenennen, löschen (im Bearbeiten-Modus); neue Seiten bekommen nur die Navigation
  _pages(box, mode) {
    const l = this._lovelace, views = l?.config?.views || [], cur = views[this._index] || {};
    if (!mode) {
      box.innerHTML = `<button data-a="new">+ Neue Seite</button><button data-a="ren">Seite umbenennen</button>${views.length > 1 ? '<button data-a="del" class="dng">Seite löschen</button>' : ''}`;
    } else if (mode === 'del') {
      box.innerHTML = `<small>Seite „${esc(cur.title || cur.path || '')}“ mit allen Karten löschen?</small><button data-a="delok" class="dng">Ja, löschen</button><button data-a="x">Abbrechen</button>`;
    } else {
      box.innerHTML = `<input placeholder="${mode === 'new' ? 'Name der neuen Seite, z. B. Garten' : 'Neuer Name'}" value="${mode === 'ren' ? esc(cur.title || '') : ''}"><button data-a="${mode}ok" class="pri">${mode === 'new' ? 'Anlegen' : 'Speichern'}</button><button data-a="x">Abbrechen</button>`;
      const inp = box.querySelector('input');
      inp.focus();
      inp.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') box.querySelector('.pri').click(); if (ev.key === 'Escape') this._pages(box); });
    }
    box.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      const a = b.dataset.a, name = box.querySelector('input')?.value.trim();
      if (a === 'new' || a === 'ren' || a === 'del') return this._pages(box, a);
      if (a === 'x') return this._pages(box);
      if ((a === 'newok' || a === 'renok') && !name) return box.querySelector('input').focus();
      this._savePages(a, name);
    }));
  }

  _savePages(a, name) {
    const l = this._lovelace;
    if (!l?.config?.views || typeof l.saveConfig !== 'function') return;
    const views = l.config.views.slice(), i = this._index, cur = views[i] || {};
    const base = '/' + (location.pathname.split('/').filter(Boolean)[0] || 'lovelace');
    const go = (path) => { history.pushState(null, '', `${base}/${path}`); window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } })); };
    if (a === 'newok') {
      const slug = name.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seite';
      let path = slug, n = 2;
      while (views.some((v) => v.path === path)) path = `${slug}-${n++}`;
      // Navigation der aktuellen Seite übernehmen (mit Kiosk usw.), sonst eine neue
      const nav = (cur.cards || []).find((c) => c.type === 'custom:glass-home-nav') || { type: 'custom:glass-home-nav' };
      views.push({ title: name, path, ...(cur.theme ? { theme: cur.theme } : {}), type: 'custom:glass-home-grid',
        cards: [{ ...nav, grid_options: { columns: 12, rows: 1 } }] });
      l.saveConfig({ ...l.config, views }).then?.(() => go(path));
      return;
    }
    if (a === 'renok') { views[i] = { ...cur, title: name }; l.saveConfig({ ...l.config, views }); return; }
    if (a === 'delok' && views.length > 1) {
      // erst auf eine andere Seite wechseln, dann löschen (sonst rendert HA noch die gelöschte Ansicht)
      const to = i === 0 ? 1 : 0;
      go(views[to].path ?? to);
      views.splice(i, 1);
      setTimeout(() => l.saveConfig({ ...l.config, views }), 300);
    }
  }
}


/* ------------------------------------------------------------------ */
/* Dashboard-Strategie: baut alle Seiten aus den erkannten Modulen     */
/* strategy: { type: custom:glass-home }                               */
/* ------------------------------------------------------------------ */
class GlassHomeDashboardStrategy extends HTMLElement {
  static async generate(config, hass) {
    const c = config || {};
    const off = c.modules || {};               // z.B. modules: { energy: false }
    const mods = detectModules(hass);
    // Energie gilt als vorhanden, wenn im Energie-Dashboard eine Quelle steht
    try {
      const prefs = await hass.callWS({ type: 'energy/get_prefs' });
      mods.energy = (prefs?.energy_sources || []).some((s) => s.type === 'solar' || s.type === 'grid');
    } catch (e) { mods.energy = false; }
    for (const k of Object.keys(off)) if (off[k] === false) mods[k] = false;

    // Bereiche mit Licht, Rollo, Klima oder Fenster, alphabetisch
    const hidden = new Set(c.hide_areas || []);
    const rooms = Object.values(hass.areas || {})
      .filter((a) => !hidden.has(a.area_id))
      .filter((a) => {
        const e = areaEntities(hass, a.area_id);
        return (mods.lights && e.lights.length) || (mods.covers && e.covers.length) || e.temps.length || e.climates.length || e.openings.length;
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'de'));

    // Design nur für dieses Dashboard (nicht HA-weit): Graphit, wenn installiert, sonst theme: aus der Strategie
    const themeOf = () => {
      if (c.theme === false) return {};
      const t = c.theme || 'glass_home_graphit';
      return !c.theme && !hass.themes?.themes?.[t] ? {} : { theme: t };
    };
    const statusKinds = ALL_KINDS;
    const hasStatus = statusKinds.some((k) => summarize(hass, k));
    const full = { columns: 'full' };
    const nav = { type: 'custom:glass-home-nav', grid_options: full, ...(c.kiosk ? { kiosk: c.kiosk } : {}) };
    const header = { type: 'custom:glass-home-header', grid_options: full, ...(c.name ? { name: c.name } : {}), ...(c.names ? { names: c.names } : {}) };
    const status = { type: 'custom:glass-home-status', grid_options: full };
    const roomCards = rooms.map((a) => ({ type: 'custom:glass-home-room', area: a.area_id, grid_options: { columns: 12 } }));
    const energy = { type: 'custom:glass-home-energy', grid_options: { columns: mods.waste ? 24 : 'full' } };
    const waste = { type: 'custom:glass-home-waste', grid_options: { columns: 12 } };
    const agenda = { type: 'custom:glass-home-agenda', grid_options: { columns: 12 } };

    const empty = { type: 'markdown', content: 'Glass Home hat noch keine Geräte gefunden. Geräte in HA einem **Bereich** zuordnen, dann erscheinen sie hier automatisch.' };
    if (c.layout !== 'sections') {
      // Glass-Raster (Standard): 12 Spalten, Flächen 4 x 3
      const gc = (card, columns, rows) => ({ ...card, grid_options: { columns, rows } });
      const hasWx = mods.weather;
      const cards = [gc(nav, 12, 1)];
      cards.push(gc({ ...header, part: hasWx ? 'hero' : 'both' }, hasWx ? 9 : 12, 2));
      if (hasWx) cards.push(gc({ type: 'custom:glass-home-header', part: 'weather', show_alerts: false }, 3, 2));
      if (hasStatus) cards.push(gc(status, 12, 1));
      const areas = [];
      if (mods.todo || mods.calendar) areas.push(gc(agenda, 4, 3));
      if (mods.energy) areas.push(gc(energy, roomCards.length ? 4 : 8, 6));
      // passen die Räume nicht in die 6 Flächen, kommt die Räume-Liste (4 x 6) statt einzelner Raumkarten
      const used = areas.reduce((n, a) => n + (a.grid_options.columns / 4) * (a.grid_options.rows / 3), 0) + (mods.waste ? 1 : 0);
      if (roomCards.length && used + roomCards.length > 6) areas.push(gc({ type: 'custom:glass-home-rooms', ...(c.hide_areas ? { hide_areas: c.hide_areas } : {}) }, 4, 6));
      else areas.push(...roomCards.map((r) => gc(r, 4, 3)));
      if (mods.waste) areas.push(gc(waste, 4, 3));
      if (!areas.length) areas.push(gc(empty, 12, 2));
      const gview = (title, path, icon, list) => ({ title, path, icon, ...themeOf(), type: 'custom:glass-home-grid', cards: list });
      const gviews = [gview('Start', 'start', 'mdi:home', [...cards, ...areas])];
      if (mods.energy) gviews.push(gview('Energie', 'energie', 'mdi:lightning-bolt', [gc(nav, 12, 1), gc(energy, 12, 6)]));
      return { title: c.title || 'Zuhause', views: gviews };
    }

    const section = (cards) => ({ type: 'grid', column_span: 4, cards });
    // Energie kommt auf die Startseite, wenn es keine Räume gibt (z.B. nur PV-Kunde)
    const energyOnStart = mods.energy && !roomCards.length;

    const start = [nav, header];
    if (hasStatus) start.push(status);
    const startSections = [section(start)];
    const extra = [];
    if (energyOnStart) extra.push(energy);
    if (mods.waste) extra.push(waste);
    if (mods.todo || mods.calendar) extra.push(agenda);
    // Müll und Einkauf füllen freie Plätze neben den Räumen, statt eine eigene Reihe zu öffnen
    if (roomCards.length) startSections.push(section([...roomCards, ...extra]));
    else if (extra.length) startSections.push(section(extra));

    const view = (title, path, icon, sections) => ({ title, path, icon, ...themeOf(), type: 'sections', max_columns: 4, sections });
    const views = [view('Start', 'start', 'mdi:home', startSections)];
    if (mods.energy && !energyOnStart) {
      views.push(view('Energie', 'energie', 'mdi:lightning-bolt', [section([nav, { ...energy, grid_options: full }])]));
    }
    if (!roomCards.length && !mods.energy && !mods.waste && !mods.todo && !mods.calendar) {
      startSections.push(section([empty]));
    }
    return { title: c.title || 'Zuhause', views };
  }
}

/* ------------------------------------------------------------------ */
/* Registrierung                                                       */
/* ------------------------------------------------------------------ */
if (!customElements.get('glass-home-room')) customElements.define('glass-home-room', GlassHomeRoomCard);
if (!customElements.get('glass-home-room-editor')) customElements.define('glass-home-room-editor', GlassHomeRoomEditor);
if (!customElements.get('glass-home-header')) customElements.define('glass-home-header', GlassHomeHeaderCard);
if (!customElements.get('glass-home-header-editor')) customElements.define('glass-home-header-editor', GlassHomeHeaderEditor);
if (!customElements.get('glass-home-scenes')) customElements.define('glass-home-scenes', GlassHomeScenesCard);
if (!customElements.get('glass-home-scenes-editor')) customElements.define('glass-home-scenes-editor', GlassHomeScenesEditor);
if (!customElements.get('glass-home-nav')) customElements.define('glass-home-nav', GlassHomeNavCard);
if (!customElements.get('glass-home-nav-editor')) customElements.define('glass-home-nav-editor', GlassHomeNavEditor);
if (!customElements.get('glass-home-status')) customElements.define('glass-home-status', GlassHomeStatusCard);
if (!customElements.get('glass-home-status-editor')) customElements.define('glass-home-status-editor', GlassHomeStatusEditor);
if (!customElements.get('glass-home-popup')) customElements.define('glass-home-popup', GlassHomePopup);
if (!customElements.get('glass-home-energy')) customElements.define('glass-home-energy', GlassHomeEnergyCard);
if (!customElements.get('glass-home-energy-editor')) customElements.define('glass-home-energy-editor', GlassHomeEnergyEditor);
if (!customElements.get('glass-home-energy-flow')) customElements.define('glass-home-energy-flow', GlassHomeEnergyFlowCard);
if (!customElements.get('glass-home-energy-flow-editor')) customElements.define('glass-home-energy-flow-editor', GlassHomeEnergyFlowEditor);
if (!customElements.get('glass-home-battery')) customElements.define('glass-home-battery', GlassHomeBatteryCard);
if (!customElements.get('glass-home-battery-editor')) customElements.define('glass-home-battery-editor', GlassHomeBatteryEditor);
if (!customElements.get('glass-home-energy-mini')) customElements.define('glass-home-energy-mini', GlassHomeEnergyMiniCard);
if (!customElements.get('glass-home-energy-mini-editor')) customElements.define('glass-home-energy-mini-editor', GlassHomeEnergyMiniEditor);
if (!customElements.get('glass-home-waste')) customElements.define('glass-home-waste', GlassHomeWasteCard);
if (!customElements.get('glass-home-waste-editor')) customElements.define('glass-home-waste-editor', GlassHomeWasteEditor);
if (!customElements.get('glass-home-agenda')) customElements.define('glass-home-agenda', GlassHomeAgendaCard);
if (!customElements.get('glass-home-agenda-editor')) customElements.define('glass-home-agenda-editor', GlassHomeAgendaEditor);
if (!customElements.get('glass-home-rooms')) customElements.define('glass-home-rooms', GlassHomeRoomsCard);
if (!customElements.get('glass-home-rooms-editor')) customElements.define('glass-home-rooms-editor', GlassHomeRoomsEditor);
if (!customElements.get('glass-home-temperature')) customElements.define('glass-home-temperature', GlassHomeTemperatureCard);
if (!customElements.get('glass-home-temperature-editor')) customElements.define('glass-home-temperature-editor', GlassHomeTemperatureEditor);
if (!customElements.get('glass-home-calendar')) customElements.define('glass-home-calendar', GlassHomeCalendarCard);
if (!customElements.get('glass-home-calendar-editor')) customElements.define('glass-home-calendar-editor', GlassHomeCalendarEditor);
if (!customElements.get('glass-home-week')) customElements.define('glass-home-week', GlassHomeWeekPopup);
if (!customElements.get('glass-home-grid')) customElements.define('glass-home-grid', GlassHomeGridView);
if (!customElements.get('ll-strategy-dashboard-glass-home')) customElements.define('ll-strategy-dashboard-glass-home', GlassHomeDashboardStrategy);

window.customCards = window.customCards || [];
for (const card of [
  { type: 'glass-home-nav', name: 'Glass Home – Navigation', description: 'Navigation aus den Ansichten des Dashboards, mit Uhrzeit.' },
  { type: 'glass-home-header', name: 'Glass Home – Kopfzeile', description: 'Begrüßung, Hinweise mit Aktion (offene Fenster, lange brennendes Licht, Schloss) und Wetter.' },
  { type: 'glass-home-status', name: 'Glass Home – Status', description: 'Kacheln für Lichter, Rollos, Steckdosen, Anwesenheit, Temperatur, Fenster und Schlösser. Tippen öffnet die Übersicht; Steckdosen und Temperaturfühler lassen sich dort hinzufügen und entfernen.' },
  { type: 'glass-home-energy', name: 'Glass Home – Energie', description: 'PV-Erzeugung, Verbrauch, Einspeisung, Autarkie und Diagramm aus dem Energie-Dashboard, Zeitraum Heute bis Jahr. Kacheln und Diagramm auch einzeln.' },
  { type: 'glass-home-energy-flow', name: 'Glass Home – Energiefluss', description: 'PV, Netz, Haus und Akku jetzt, mit Fluss-Animation.' },
  { type: 'glass-home-energy-mini', name: 'Glass Home – Energie kompakt', description: 'Für die Startseite: Akku-Ring, PV, Haus, Netz und Akku jetzt, Tageskurve mit Spitze.' },
  { type: 'glass-home-battery', name: 'Glass Home – Akku', description: 'Ladestand, Leistung, Restzeit und heute geladen/entladen.' },
  { type: 'glass-home-waste', name: 'Glass Home – Müll', description: 'Nächste Abholtermine aus Waste Collection Schedule.' },
  { type: 'glass-home-agenda', name: 'Glass Home – Einkauf & Termine', description: 'Offene Einträge der Einkaufsliste zum Abhaken und Hinzufügen, dazu die nächsten Kalendertermine.' },
  { type: 'glass-home-temperature', name: 'Glass Home – Temperatur', description: 'Räume mit Temperatur, Luftfeuchte und Farbbalken, Warnung bei hoher Feuchte. Die Statuskachel Temperatur zeigt den Durchschnitt.' },
  { type: 'glass-home-calendar', name: 'Glass Home – Kalender', description: 'Ein Tag mit Terminen und ganztägigen Einträgen, ‹ › blättert. Antippen zeigt die ganze Woche.' },
  { type: 'glass-home-scenes', name: 'Glass Home – Szenen', description: 'Szenen und Skripte als Kacheln, dazu „Alles aus“.' },
  { type: 'glass-home-rooms', name: 'Glass Home – Räume-Liste', description: 'Alle Räume untereinander mit Temperatur, Feuchte und Licht. Tippen öffnet die Raumübersicht.' },
  { type: 'glass-home-room', name: 'Glass Home – Raum', description: 'Ein Bereich mit Temperatur, Licht- und Rollo-Regler. Geräte kommen automatisch aus dem Bereich.' },
]) {
  if (!window.customCards.some((c) => c.type === card.type)) window.customCards.push({ ...card, preview: true });
}

// Für spätere Module (Strategie, Navigation) und zum Testen
window.GlassHome = { version: GH_VERSION, detectModules, areaEntities, generate: GlassHomeDashboardStrategy.generate };

console.info(`%c GLASS HOME %c ${GH_VERSION} `, 'background:#2b2f34;color:#eef1f4;font-weight:700', 'background:#ffb74d;color:#1b1206');
