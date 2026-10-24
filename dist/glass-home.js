// Glass Home – Dashboard-Paket im Glas-Stil für Kundeninstallationen
const GH_VERSION = '0.6.1';

/* ------------------------------------------------------------------ */
/* Gemeinsamer Stil (Graphit). Jede Farbe kann über das Theme          */
/* glass_home_graphit oder ein eigenes Theme überschrieben werden.     */
/* ------------------------------------------------------------------ */
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
    calendar: has((id) => id.startsWith('calendar.')),
    scenes: has((id) => id.startsWith('scene.')),
    // Waste Collection Schedule legt Sensoren mit dem Attribut "daysTo" an
    waste: has((id) => id.startsWith('sensor.') && hass.states[id].attributes.daysTo !== undefined),
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
    // Vorläufig: Detailansicht des ersten Geräts. Später eigenes Raum-Popup.
    const e = this._ents || {};
    const id = [...(e.lights || []), ...(e.covers || []), ...(e.climates || []), ...(e.temps || [])][0];
    if (!id) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
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
  .al.more{padding:4px 12px;color:var(--gh-mute);background:rgba(255,255,255,.06);border-color:var(--gh-line)}
  .wx{padding:16px 20px;display:flex;align-items:center;gap:16px;cursor:pointer;
      background:linear-gradient(135deg,rgba(255,200,90,.12),rgba(255,255,255,.05) 60%),var(--gh-bg)}
  .wx .t{font-size:52px;font-weight:200;line-height:1;white-space:nowrap}.wx .t sup{font-size:20px;color:var(--gh-mute);vertical-align:top}
  .wx small{display:block;font-size:12px;color:var(--gh-mute);margin-top:4px}
  .fc{display:flex;gap:10px;margin-top:8px;font-size:11.5px;color:var(--gh-mute)}.fc b{color:var(--gh-txt);font-weight:500}
  .wrap.nowx{grid-template-columns:1fr}
  @container (max-width:620px){
    .wrap{grid-template-columns:1fr}
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
    return Object.keys(this._hass.states).find((id) => id.startsWith('weather.') && visible(this._hass, id)) || null;
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
    const ids = Object.keys(h.states).filter((id) => /^(light|lock|binary_sensor|weather)\./.test(id) || (id.startsWith('sensor.') && h.states[id].attributes.device_class === 'temperature'));
    return ids.map((id) => `${id}|${h.states[id].state}|${h.states[id].attributes.temperature ?? ''}`).join(';') + greeting();
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
    const who = c.name || (first ? first.charAt(0).toUpperCase() + first.slice(1) : '');
    const alerts = c.show_alerts ? this._alerts() : [];
    const shown = alerts.slice(0, 4), rest = alerts.length - shown.length;
    const wxId = this._weatherId(), wx = wxId && h.states[wxId];

    let wxHtml = '';
    if (wx) {
      const a = wx.attributes, unit = a.temperature_unit || '°C';
      const fc = (this._forecast || []).slice(1, 4).map((f) => {
        const d = new Date(f.datetime);
        return `<span>${WEEKDAY[d.getDay()]} <b>${Math.round(f.temperature)}°</b></span>`;
      }).join('');
      const extra = a.apparent_temperature != null ? ` · gefühlt ${Math.round(a.apparent_temperature)}°` : a.humidity != null ? ` · ${Math.round(a.humidity)} %` : '';
      wxHtml = `<section class="wx p">${icon(WX_ICON[wx.state] || 'cloudsun', 58)}
        <div><div class="t">${a.temperature != null ? fmt(a.temperature) : '–'}<sup>${esc(unit)}</sup></div>
        <small>${esc(WX_TEXT[wx.state] || wx.state)}${extra}</small>${fc ? `<div class="fc">${fc}</div>` : ''}</div></section>`;
    }

    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${HEADER_STYLE}</style>
      <div class="wrap ${wx ? '' : 'nowx'}">
        <section class="hero p">
          <h1>${greeting()}${who ? `, <b>${esc(who)}</b>` : ''}</h1>
          <p>${esc(this._summary())}</p>
          ${alerts.length ? `<div class="alerts">${shown.map((al, i) => `
            <span class="al ${al.ok ? 'ok' : ''}">${icon(al.icon, 16)}${esc(al.text)}${al.act ? `<button class="act" data-i="${i}">${al.act}</button>` : ''}</span>`).join('')}
            ${rest > 0 ? `<span class="al more">+${rest} weitere</span>` : ''}</div>` : ''}
        </section>
        ${wxHtml}
      </div>`;

    this.shadowRoot.querySelectorAll('.act').forEach((b) => b.addEventListener('click', (ev) => {
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
      { name: 'show_alerts', selector: { boolean: {} } },
    ],
  },
  { name: 'light_hours', selector: { number: { min: 1, max: 12, step: 1, mode: 'box', unit_of_measurement: 'Std' } } },
];
const HEADER_LABELS = {
  name: 'Name in der Begrüßung (leer = angemeldeter Benutzer)', weather: 'Wetter (leer = automatisch)',
  show_weather: 'Wetter zeigen', show_alerts: 'Hinweise zeigen', light_hours: 'Hinweis, wenn Licht länger an ist als',
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
  static defaults = { show_weather: true, show_alerts: true, light_hours: 2 };
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
  .nav{display:flex;align-items:center;gap:6px;padding:8px;min-height:60px}
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
  }

  connectedCallback() {
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
        ${items.map((it, i) => `<a class="${i === act ? 'on' : ''}" data-p="${esc(it.path)}" title="${esc(it.name)}">${anyIcon(it.icon, 20)}${it.name ? `<em>${esc(it.name)}</em>` : ''}</a>`).join('')}
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
function collect(hass, kind) {
  const pick = {
    lights: (id) => id.startsWith('light.'),
    covers: (id) => id.startsWith('cover.') && !NON_BLIND_COVERS.includes(hass.states[id].attributes.device_class),
    climate: (id) => id.startsWith('climate.') || (id.startsWith('sensor.') && ['temperature', 'humidity'].includes(hass.states[id].attributes.device_class)),
    openings: (id) => (id.startsWith('binary_sensor.') && OPENING_CLASSES.includes(hass.states[id].attributes.device_class))
      || (id.startsWith('cover.') && NON_BLIND_COVERS.includes(hass.states[id].attributes.device_class)),
    locks: (id) => id.startsWith('lock.'),
  }[kind];
  const groups = new Map();
  for (const id of Object.keys(hass.states)) {
    if (!visible(hass, id) || !pick(id)) continue;
    // Temperaturen ohne Bereich (z.B. Außenfühler, Demo-Werte) gehören nicht in die Innenübersicht
    const area = entityArea(hass, id);
    if (kind === 'climate' && !area) continue;
    if (!groups.has(area)) groups.set(area, []);
    groups.get(area).push(id);
  }
  const name = (a) => (a ? hass.areas?.[a]?.name || a : 'Ohne Bereich');
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
function summarize(hass, kind) {
  const g = collect(hass, kind), ids = g.flatMap((x) => x.ids);
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
      const v = t ?? tc;
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
  }
  return null;
}

const KIND_TITLE = { lights: 'Lichter', covers: 'Rollos', climate: 'Temperaturen', openings: 'Fenster & Türen', locks: 'Schlösser' };
const ALL_KINDS = ['lights', 'covers', 'climate', 'openings', 'locks'];

const STATUS_STYLE = `
  :host{container-type:inline-size}
  .row{display:grid;grid-template-columns:repeat(var(--n,4),minmax(0,1fr));gap:10px}
  .tile{display:flex;align-items:center;gap:12px;padding:10px 14px;min-height:62px;cursor:pointer;user-select:none;-webkit-user-select:none;transition:transform .12s,border-color .3s}
  .tile:active{transform:scale(.97)}
  .tile .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;flex:none;
            background:rgba(var(--c),.16);color:rgb(var(--c))}
  .tile.off .ic{background:rgba(255,255,255,.08);color:var(--gh-mute)}
  .tile.warn{border-color:rgba(255,183,77,.55)}
  .tile>div{min-width:0}
  .tile b{font-size:16px;font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .tile small{font-size:12px;color:var(--gh-mute);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  @container (max-width:900px){ .row{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))} }
  @container (max-width:520px){ .row{grid-template-columns:1fr 1fr;gap:8px} .tile{padding:10px 12px} }
`;

class GlassHomeStatusCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-status-editor'); }
  static getStubConfig() { return {}; }

  setConfig(config) {
    this._config = { ...(config || {}) };
    this._sig = '';
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._popup) this._popup.hass = hass;
    if (!this._config) return;
    const sig = this._tiles().map((t) => JSON.stringify(summarize(hass, t.type))).join(';');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  disconnectedCallback() { this._popup?.close(); }

  getCardSize() { return 1; }
  getGridOptions() { return { columns: 'full' }; }

  // Kacheln: aus der Konfiguration (Text oder {type, navigate, name}), sonst alle erkannten
  _tiles() {
    const list = (this._config.tiles?.length ? this._config.tiles : ALL_KINDS)
      .map((t) => (typeof t === 'string' ? { type: t } : t))
      .filter((t) => ALL_KINDS.includes(t.type));
    return list.filter((t) => summarize(this._hass, t.type));
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const tiles = this._tiles();
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${STATUS_STYLE}</style>
      <div class="row" style="--n:${Math.max(4, tiles.length)}">${tiles.map((t, i) => {
        const s = summarize(this._hass, t.type);
        return `<div class="tile p ${s.warn ? 'warn' : ''} ${s.hot || s.warn || t.type === 'climate' || t.type === 'locks' ? '' : 'off'}" data-i="${i}" style="--c:${s.color}">
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
  .body{overflow:auto;padding:4px 18px 18px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;align-items:start}
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
    const g = collect(hass, this.kind);
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

  close() {
    if (!this.isConnected) return;
    this.remove();
    this.onclose?.();
  }

  // Eine Zeile pro Gerät. Wird bei Änderungen einzeln ersetzt, damit nichts flackert.
  _row(id, area) {
    const h = this._hass, k = this.kind, st = h.states[id];
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
    return '';
  }

  _bindRow(box) {
    const h = () => this._hass;
    box.querySelectorAll('.sl').forEach((el) => bindSlider(el, this, h, [el.dataset.id]));
    box.querySelectorAll('[data-mi]').forEach((el) => el.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: el.dataset.mi }, bubbles: true, composed: true }));
      this.close();
    }));
    box.querySelectorAll('[data-lock]').forEach((b) => b.addEventListener('click', () => h().callService('lock', b.dataset.to, { entity_id: b.dataset.lock })));
  }

  _render(groups) {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, k = this.kind, s = summarize(h, k);
    this._all = groups.flatMap((x) => x.ids);

    // Rahmen nur einmal aufbauen, sonst startet die Einblend-Animation bei jedem Update neu
    if (!this._shell) {
      let acts = '';
      if (k === 'lights') acts = '<button data-a="lights_off">Alle aus</button>';
      if (k === 'covers') acts = '<button data-a="covers_open">▲ Alle auf</button><button data-a="covers_stop">■ Stopp</button><button data-a="covers_close">▼ Alle zu</button>';
      this.shadowRoot.innerHTML = `<style>${GH_STYLE}${ROOM_STYLE}${POPUP_STYLE}</style>
        <div class="bg"></div>
        <div class="sheet p">
          <div class="top"><div><h2>${KIND_TITLE[k]}</h2><small class="sum"></small></div><button class="x" aria-label="Schließen">✕</button></div>
          ${acts ? `<div class="acts">${acts}</div>` : ''}
          <div class="body"></div>
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
        if (k === 'openings') ids = [...ids].sort((a, b) => isOpen(h, b) - isOpen(h, a));
        return `<div class="grp"><h3>${esc(g.name)}</h3>${ids.map((id) => {
          this._rows[id] = this._row(id, g.name);
          return `<div class="cell" data-row="${id}" data-area="${esc(g.name)}">${this._rows[id]}</div>`;
        }).join('')}</div>`;
      }).join('') || '<span style="color:var(--gh-dim)">Keine Geräte gefunden</span>';
      bodyEl.querySelectorAll('.cell').forEach((c) => this._bindRow(c));
      return;
    }
    // Nur geänderte Zeilen ersetzen
    bodyEl.querySelectorAll('.cell').forEach((c) => {
      const html = this._row(c.dataset.row, c.dataset.area);
      if (html === this._rows[c.dataset.row]) return;
      this._rows[c.dataset.row] = html;
      c.innerHTML = html;
      this._bindRow(c);
    });
  }
}

class GlassHomeStatusEditor extends GlassHomeFormEditor {
  static schema = [
    {
      name: 'tiles', selector: {
        select: {
          multiple: true, mode: 'list', options: [
            { value: 'lights', label: 'Lichter' }, { value: 'covers', label: 'Rollos' }, { value: 'climate', label: 'Temperaturen' },
            { value: 'openings', label: 'Fenster & Türen' }, { value: 'locks', label: 'Schlösser' },
          ],
        },
      },
    },
  ];
  static labels = { tiles: 'Kacheln (keine Auswahl = alle, die es gibt)' };
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
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin-bottom:8px}
  .hd small{margin-left:auto;font-weight:400;font-size:12px;color:var(--gh-mute)}
  .sum{display:flex;gap:8px;margin-bottom:6px;flex-wrap:wrap}
  .sum span{background:rgba(255,255,255,.06);border-radius:999px;padding:4px 11px;font-size:12.5px;color:var(--gh-mute)}
  .sum b{color:var(--gh-txt);font-weight:600}
  .plot{position:relative;height:var(--gh-chart-h,220px)}
  svg.cv{position:absolute;inset:0;width:100%;height:100%}
  .yl,.xl,.now{position:absolute;font-size:11.5px;color:var(--gh-mute);white-space:nowrap}
  .yl{left:4px;transform:translateY(-120%)}
  .xl{bottom:0}
  .now{top:0}
  .lg{display:flex;gap:14px;font-size:12px;color:var(--gh-mute);margin-top:4px}
  .lg i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}
  .msg{padding:14px 16px;font-size:13px;color:var(--gh-mute);line-height:1.45}
  @container (max-width:620px){
    .tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .tile{padding:10px 12px}.tile b{font-size:16px}
    .plot{height:170px}
  }
`;

const kWh = (v) => (v == null ? '–' : `${fmt(v, v >= 100 ? 0 : 1)} kWh`);

// Leistung in kW aus einem Sensor (W oder kW)
function powerKw(h, id) {
  const s = id && h.states[id];
  if (!s) return null;
  const v = parseFloat(s.state);
  if (isNaN(v)) return null;
  const u = (s.attributes.unit_of_measurement || 'W').toLowerCase();
  return u === 'kw' ? v : u === 'mw' ? v * 1000 : v / 1000;
}

class GlassHomeEnergyCard extends HTMLElement {
  static getConfigElement() { return document.createElement('glass-home-energy-editor'); }
  static getStubConfig() { return { chart: true }; }

  setConfig(config) {
    this._config = { chart: true, ...(config || {}) };
    this._sig = '';
    if (this._hass) this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first) this._load();
    const c = this._config;
    const sig = [c.solar_power, c.grid_power, c.home_power].map((id) => id && hass.states[id]?.state).join('|');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  connectedCallback() {
    // Tageswerte alle 5 Minuten neu holen
    this._tick = setInterval(() => this._load(), 5 * 60e3);
    if (this._hass && !this._stats) this._load();
  }

  disconnectedCallback() { clearInterval(this._tick); }

  getCardSize() { return 6; }
  getGridOptions() { return { columns: 'full' }; }

  async _load() {
    const h = this._hass;
    if (!h?.callWS || this._loading) return;
    this._loading = true;
    try {
      if (!this._prefs) this._prefs = await h.callWS({ type: 'energy/get_prefs' });
      const src = this._prefs?.energy_sources || [];
      const solar = src.filter((s) => s.type === 'solar').map((s) => s.stat_energy_from).filter(Boolean);
      const grid = src.filter((s) => s.type === 'grid');
      const from = grid.flatMap((g) => [...(g.flow_from || []).map((f) => f.stat_energy_from), g.stat_energy_from]).filter(Boolean);
      const to = grid.flatMap((g) => [...(g.flow_to || []).map((f) => f.stat_energy_to), g.stat_energy_to]).filter(Boolean);
      this._ids = { solar, from, to };
      // Leistungssensoren aus dem Energie-Dashboard übernehmen, falls dort hinterlegt
      this._autoPower = {
        solar: src.find((s) => s.type === 'solar' && s.stat_rate)?.stat_rate,
        grid: grid.find((g) => g.stat_rate)?.stat_rate,
      };
      const all = [...solar, ...from, ...to];
      if (!all.length) { this._stats = { empty: true }; return; }
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const res = await h.callWS({
        type: 'recorder/statistics_during_period', start_time: start.toISOString(), period: 'hour',
        statistic_ids: all, types: ['change'], units: { energy: 'kWh' },
      });
      // Stundenwerte je Gruppe aufsummieren (24 Fächer)
      const hours = (ids) => {
        const out = new Array(24).fill(null);
        for (const id of ids) for (const row of res[id] || []) {
          const hr = new Date(typeof row.start === 'number' ? row.start : Date.parse(row.start)).getHours();
          out[hr] = (out[hr] || 0) + (row.change || 0);
        }
        return out;
      };
      this._stats = { solar: hours(solar), from: hours(from), to: hours(to) };
    } catch (e) {
      this._stats = { error: e.message || String(e) };
    } finally {
      this._loading = false;
      this._render();
    }
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass, c = this._config, st = this._stats;
    const style = `<style>${GH_STYLE}${ENERGY_STYLE}</style>`;
    if (!st) { this.shadowRoot.innerHTML = `${style}<div class="p msg">Energiedaten werden geladen …</div>`; return; }
    if (st.error) { this.shadowRoot.innerHTML = `${style}<div class="p msg">Energiedaten nicht verfügbar: ${esc(st.error)}</div>`; return; }
    if (st.empty) {
      this.shadowRoot.innerHTML = `${style}<div class="p msg">Im Energie-Dashboard ist noch keine Quelle eingetragen.<br>Einstellungen → Dashboards → Energie: Netz und Solar hinzufügen.</div>`;
      return;
    }

    const sum = (a) => a.reduce((x, y) => x + (y || 0), 0);
    const hasSolar = this._ids.solar.length > 0;
    const pv = sum(st.solar), from = sum(st.from), to = sum(st.to);
    const use = Math.max(0, from + pv - to);
    const autark = use > 0 ? Math.round(Math.max(0, Math.min(1, 1 - from / use)) * 100) : null;

    // aktuelle Leistung, wenn Sensoren bekannt sind
    const pSolar = powerKw(h, c.solar_power || this._autoPower?.solar);
    const pGrid = powerKw(h, c.grid_power || this._autoPower?.grid);   // + Bezug, − Einspeisung
    let pHome = powerKw(h, c.home_power);
    if (pHome == null && pSolar != null && pGrid != null) pHome = Math.max(0, pSolar + pGrid);
    const kw = (v) => `${fmt(Math.abs(v))} kW`;

    const tiles = [];
    if (hasSolar) tiles.push({ c: '245,200,76', i: 'sun', v: pSolar != null ? kw(pSolar) : kWh(pv), l: pSolar != null ? `Erzeugung · heute ${kWh(pv)}` : 'Erzeugt heute' });
    tiles.push({ c: '77,208,225', i: 'home', v: pHome != null ? kw(pHome) : kWh(use), l: pHome != null ? `Hausverbrauch · heute ${kWh(use)}` : 'Verbraucht heute' });
    if (pGrid != null) tiles.push(pGrid < 0
      ? { c: '95,214,142', i: 'plug', v: kw(pGrid), l: 'Einspeisung jetzt' }
      : { c: '255,138,101', i: 'plug', v: kw(pGrid), l: 'Netzbezug jetzt' });
    else if (hasSolar) tiles.push({ c: '95,214,142', i: 'plug', v: kWh(to), l: 'Eingespeist heute' });
    else tiles.push({ c: '255,138,101', i: 'plug', v: kWh(from), l: 'Netzbezug heute' });
    if (hasSolar && autark != null) tiles.push({ c: '201,210,220', i: 'leaf', v: `${autark} %`, l: 'Autarkie heute' });

    let chart = '';
    if (c.chart) {
      const prod = st.solar, cons = st.solar.map((s, i) => (st.from[i] == null && s == null ? null : Math.max(0, (st.from[i] || 0) + (s || 0) - (st.to[i] || 0))));
      const now = new Date().getHours() + new Date().getMinutes() / 60;
      const max = Math.max(0.5, ...prod.filter((v) => v != null), ...cons.filter((v) => v != null));
      const W = 800, H = 230, top = 22, bot = 200;
      const x = (i) => ((i + 0.5) / 24) * W;
      const y = (v) => bot - (v / max) * (bot - top);
      const path = (arr) => {
        const pts = arr.map((v, i) => (v == null ? null : [x(i), y(v)])).filter(Boolean);
        if (pts.length < 2) return '';
        // weiche Kurve durch die Stundenwerte
        let d = `M${pts[0][0]} ${pts[0][1]}`;
        for (let i = 1; i < pts.length; i++) {
          const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
          d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`;
        }
        return { d, first: pts[0], last: pts[pts.length - 1] };
      };
      const pp = hasSolar ? path(prod) : '', pc = path(cons);
      const xn = (now / 24) * W;
      const grid = [0.5, 1].map((f) => `<line x1="0" x2="${W}" y1="${y(max * f)}" y2="${y(max * f)}" stroke="rgba(255,255,255,.08)"/>`).join('');
      const pctY = (v) => (y(v) / H) * 100;
      const labels = [0.5, 1].map((f) => `<span class="yl" style="top:${pctY(max * f)}%">${fmt(max * f)} kWh</span>`).join('')
        + [0, 6, 12, 18].map((hr) => `<span class="xl" style="left:${(hr / 24) * 100}%">${String(hr).padStart(2, '0')}:00</span>`).join('')
        + `<span class="now" style="left:calc(${Math.min((now / 24) * 100, 92)}% + 6px)">jetzt</span>`;
      chart = `<section class="chart p">
        <div class="hd">${icon(hasSolar ? 'sun' : 'bolt', 18)}${hasSolar ? 'Photovoltaik heute' : 'Energie heute'}<small>pro Stunde</small></div>
        <div class="sum">${hasSolar ? `<span>Erzeugt <b>${kWh(pv)}</b></span>` : ''}<span>Verbraucht <b>${kWh(use)}</b></span>
          ${hasSolar ? `<span>Eingespeist <b>${kWh(to)}</b></span>` : ''}<span>Bezogen <b>${kWh(from)}</b></span></div>
        <div class="plot"><svg class="cv" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
          <defs><linearGradient id="gy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5c84c" stop-opacity=".42"/><stop offset="1" stop-color="#f5c84c" stop-opacity="0"/></linearGradient></defs>
          ${grid}<line x1="0" x2="${W}" y1="${bot}" y2="${bot}" stroke="rgba(255,255,255,.12)"/>
          ${pp ? `<path d="${pp.d} L${pp.last[0]} ${bot} L${pp.first[0]} ${bot} Z" fill="url(#gy)"/><path d="${pp.d}" fill="none" stroke="#f5c84c" stroke-width="3" vector-effect="non-scaling-stroke"/>` : ''}
          ${pc ? `<path d="${pc.d}" fill="none" stroke="#4dd0e1" stroke-width="3" vector-effect="non-scaling-stroke"/>` : ''}
          <line x1="${xn}" x2="${xn}" y1="${top - 8}" y2="${bot}" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/>
        </svg>${labels}</div>
        <div class="lg">${hasSolar ? '<span><i style="background:#f5c84c"></i>Erzeugung</span>' : ''}<span><i style="background:#4dd0e1"></i>Verbrauch</span></div>
      </section>`;
    }

    this.shadowRoot.innerHTML = `${style}
      <div class="tiles">${tiles.map((t) => `<div class="tile p" style="--c:${t.c}"><span class="ic">${icon(t.i, 20)}</span><div><b>${esc(t.v)}</b><small>${esc(t.l)}</small></div></div>`).join('')}</div>
      ${chart}`;
  }
}

class GlassHomeEnergyEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'chart', selector: { boolean: {} } },
    { name: 'solar_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
    { name: 'grid_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
    { name: 'home_power', selector: { entity: { domain: 'sensor', device_class: 'power' } } },
  ];
  static labels = {
    chart: 'Tageskurve zeigen',
    solar_power: 'PV-Leistung jetzt (optional)',
    grid_power: 'Netz-Leistung jetzt, + Bezug / − Einspeisung (optional)',
    home_power: 'Hausverbrauch jetzt (optional, sonst berechnet)',
  };
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
  .card{padding:14px 16px;display:flex;flex-direction:column;height:100%}
  .hd{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;margin-bottom:10px}
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
    const sig = this._sensors().map((id) => `${id}|${hass.states[id].attributes.daysTo}`).join(';');
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  getCardSize() { return 4; }
  getGridOptions() { return { columns: 6, min_columns: 4 }; }

  _sensors() {
    const c = this._config;
    return (c.entities?.length ? c.entities : wasteSensors(this._hass)).filter((id) => this._hass.states[id]);
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const h = this._hass;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const items = this._sensors().map((id) => {
      const s = h.states[id];
      const d = Number(s.attributes.daysTo);
      const name = s.attributes.friendly_name || id;
      return { id, name, d, date: new Date(today.getTime() + d * 864e5) };
    }).filter((x) => !isNaN(x.d) && x.d >= 0).sort((a, b) => a.d - b.d).slice(0, Number(this._config.max) || 5);

    let body;
    if (!items.length) {
      body = '<div class="msg">Keine Abholtermine gefunden. Die Integration „Waste Collection Schedule“ aus HACS einrichten und pro Müllart einen Sensor anlegen.</div>';
    } else {
      const [n, ...rest] = items;
      const hint = n.d === 1 ? ' · heute Abend rausstellen' : n.d === 0 ? ' · heute' : '';
      body = `<div class="wn ${n.d <= 1 ? 'soon' : ''}" style="--c:${wasteColor(n.name)}"><span class="bin">${icon('trash', 22)}</span>
          <div><b>${esc(n.name)}</b><small>${dayWord(n.d)}${hint}</small></div></div>
        ${rest.map((x) => `<div class="wl" style="--c:${wasteColor(x.name)}"><i></i>${esc(x.name)}<small>${x.d <= 2 ? dayWord(x.d) : `${WEEKDAY[x.date.getDay()]}., ${x.date.getDate()}.${x.date.getMonth() + 1}.`}</small></div>`).join('')}`;
    }
    this.shadowRoot.innerHTML = `<style>${GH_STYLE}${WASTE_STYLE}</style>
      <div class="card p"><div class="hd">${icon('trash', 18)}${esc(this._config.title || 'Müllabfuhr')}</div>${body}</div>`;
    this.shadowRoot.querySelectorAll('.wn,.wl').forEach((el, i) => el.addEventListener('click', () =>
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: items[i].id }, bubbles: true, composed: true }))));
  }
}

class GlassHomeWasteEditor extends GlassHomeFormEditor {
  static schema = [
    { name: 'title', selector: { text: {} } },
    { name: 'entities', selector: { entity: { multiple: true, domain: 'sensor' } } },
    { name: 'max', selector: { number: { min: 1, max: 10, step: 1, mode: 'box' } } },
  ];
  static labels = { title: 'Titel (leer = Müllabfuhr)', entities: 'Müll-Sensoren (leer = automatisch)', max: 'Höchstens anzeigen' };
  static defaults = { max: 5 };
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

    const statusKinds = ['lights', 'covers', 'climate', 'openings', 'locks'];
    const hasStatus = statusKinds.some((k) => summarize(hass, k));
    const full = { columns: 'full' };
    const nav = { type: 'custom:glass-home-nav', grid_options: full };
    const header = { type: 'custom:glass-home-header', grid_options: full, ...(c.name ? { name: c.name } : {}) };
    const status = { type: 'custom:glass-home-status', grid_options: full };
    const roomCards = rooms.map((a) => ({ type: 'custom:glass-home-room', area: a.area_id, grid_options: { columns: 12 } }));
    const energy = { type: 'custom:glass-home-energy', grid_options: { columns: mods.waste ? 24 : 'full' } };
    const waste = { type: 'custom:glass-home-waste', grid_options: { columns: 12 } };

    const section = (cards) => ({ type: 'grid', column_span: 4, cards });
    // Energie kommt auf die Startseite, wenn es keine Räume gibt (z.B. nur PV-Kunde)
    const energyOnStart = mods.energy && !roomCards.length;

    const start = [nav, header];
    if (hasStatus) start.push(status);
    const startSections = [section(start)];
    if (roomCards.length) startSections.push(section(roomCards));
    const extra = [];
    if (energyOnStart) extra.push(energy);
    if (mods.waste) extra.push(waste);
    if (extra.length) startSections.push(section(extra));

    const view = (title, path, icon, sections) => ({ title, path, icon, type: 'sections', max_columns: 4, sections });
    const views = [view('Start', 'start', 'mdi:home', startSections)];
    if (mods.energy && !energyOnStart) {
      views.push(view('Energie', 'energie', 'mdi:lightning-bolt', [section([nav, { ...energy, grid_options: full }])]));
    }
    if (!roomCards.length && !mods.energy && !mods.waste) {
      startSections.push(section([{ type: 'markdown', content: 'Glass Home hat noch keine Geräte gefunden. Geräte in HA einem **Bereich** zuordnen, dann erscheinen sie hier automatisch.' }]));
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
if (!customElements.get('glass-home-waste')) customElements.define('glass-home-waste', GlassHomeWasteCard);
if (!customElements.get('glass-home-waste-editor')) customElements.define('glass-home-waste-editor', GlassHomeWasteEditor);
if (!customElements.get('ll-strategy-dashboard-glass-home')) customElements.define('ll-strategy-dashboard-glass-home', GlassHomeDashboardStrategy);

window.customCards = window.customCards || [];
for (const card of [
  { type: 'glass-home-nav', name: 'Glass Home – Navigation', description: 'Navigation aus den Ansichten des Dashboards, mit Uhrzeit.' },
  { type: 'glass-home-header', name: 'Glass Home – Kopfzeile', description: 'Begrüßung, Hinweise mit Aktion (offene Fenster, lange brennendes Licht, Schloss) und Wetter.' },
  { type: 'glass-home-status', name: 'Glass Home – Status', description: 'Kacheln für Lichter, Rollos, Temperaturen, Fenster und Schlösser. Tippen öffnet die Übersicht aller Geräte.' },
  { type: 'glass-home-energy', name: 'Glass Home – Energie', description: 'PV-Erzeugung, Verbrauch, Einspeisung, Autarkie und Tageskurve aus dem Energie-Dashboard.' },
  { type: 'glass-home-waste', name: 'Glass Home – Müll', description: 'Nächste Abholtermine aus Waste Collection Schedule.' },
  { type: 'glass-home-scenes', name: 'Glass Home – Szenen', description: 'Szenen und Skripte als Kacheln, dazu „Alles aus“.' },
  { type: 'glass-home-room', name: 'Glass Home – Raum', description: 'Ein Bereich mit Temperatur, Licht- und Rollo-Regler. Geräte kommen automatisch aus dem Bereich.' },
]) {
  if (!window.customCards.some((c) => c.type === card.type)) window.customCards.push({ ...card, preview: true });
}

// Für spätere Module (Strategie, Navigation) und zum Testen
window.GlassHome = { version: GH_VERSION, detectModules, areaEntities, generate: GlassHomeDashboardStrategy.generate };

console.info(`%c GLASS HOME %c ${GH_VERSION} `, 'background:#2b2f34;color:#eef1f4;font-weight:700', 'background:#ffb74d;color:#1b1206');
