const fs = require('node:fs');
const path = require('node:path');
const root = process.cwd();
const cssFile = path.join(root, 'public/invitation.css');
const jsFile = path.join(root, 'public/invitation.js');
if (!fs.existsSync(cssFile) || !fs.existsSync(jsFile)) {
  console.error('Run this installer inside the Groom Invitation project folder.');
  process.exit(1);
}
const js = fs.readFileSync(jsFile, 'utf8');
if (!js.includes('PREMIUM STACKED WEDDING EVENT DECK')) {
  console.error('Existing stacked wedding deck was not found; nothing changed.');
  process.exit(1);
}
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.join(root, 'backup-royal-deck-' + stamp);
fs.mkdirSync(backupDir);
for (const f of [cssFile, jsFile]) fs.copyFileSync(f, path.join(backupDir, path.basename(f)));
let css = fs.readFileSync(cssFile, 'utf8');
const marker = '/* =========================================================\n   PREMIUM FOUR-CARD STACKED WEDDING DECK';
const start = css.indexOf(marker);
if (start < 0) { console.error('Deck CSS marker missing; nothing changed.'); process.exit(1); }
css = css.slice(0, start);
const floralSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none"><g stroke="#967747" stroke-width="1.2" stroke-linecap="round"><path d="M-6 123C27 107 42 72 58 14M-3 151C40 124 73 99 111 78M17 111C51 110 80 119 109 140"/><path d="M22 100Q-4 83 9 65Q32 69 22 100ZM35 83Q20 58 40 42Q56 59 35 83ZM48 52Q39 27 57 13Q69 32 48 52ZM61 104Q61 77 83 72Q91 94 61 104ZM85 92Q91 69 116 64Q118 87 85 92ZM44 122Q51 142 72 144Q75 126 44 122ZM87 130Q106 113 129 125Q121 147 87 130Z" fill="#859777" stroke="#728667"/><path d="M9 69Q4 46 20 32Q39 49 23 68ZM72 34Q76 11 96 7Q104 30 72 34ZM112 78Q124 56 148 60Q145 85 112 78Z" fill="#c9b27f" stroke="#a58a54"/></g><g fill="#e8cfac" stroke="#b98b70" stroke-width="1"><g transform="translate(46 64)"><ellipse rx="9" ry="18" transform="rotate(0) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(72) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(144) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(216) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(288) translate(0 -11)"/><circle r="5" fill="#b08b4d"/></g><g transform="translate(105 112) scale(.7)"><ellipse rx="9" ry="18" transform="rotate(0) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(72) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(144) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(216) translate(0 -11)"/><ellipse rx="9" ry="18" transform="rotate(288) translate(0 -11)"/><circle r="5" fill="#b08b4d"/></g></g><g fill="#c5a36e"><circle cx="77" cy="40" r="2"/><circle cx="119" cy="36" r="2"/><circle cx="129" cy="98" r="2"/></g></svg>`;
fs.writeFileSync(path.join(root, 'public/wedding-botanical.svg'), floralSvg);
css += `
/* ROYAL BOTANICAL WEDDING DECK — CLEAN SINGLE SOURCE OF TRUTH */
.events.events-deck-ready { background: #faf5eb !important; overflow: hidden !important; }
.events.events-deck-ready .event-tabs-wrap { display:none !important; }
.events.events-deck-ready > article.event { display:none !important; }
.events.events-deck-ready .wedding-card-deck {
  position:relative !important; display:block !important; isolation:isolate !important;
  width:min(100% - 54px, 405px) !important; height:535px !important;
  margin:32px auto 40px !important; padding:0 !important;
  overflow:visible !important; touch-action:pan-y !important;
}
.events.events-deck-ready .wedding-card-deck > article.event {
  position:absolute !important; inset:0 !important; display:flex !important;
  flex-direction:column !important; justify-content:flex-start !important;
  align-items:stretch !important; width:100% !important; height:100% !important;
  min-height:0 !important; max-height:none !important; margin:0 !important;
  padding:36px 27px 24px !important; box-sizing:border-box !important;
  border:2px solid var(--metal) !important; border-radius:20px !important;
  overflow:hidden !important; background:var(--paper-card) !important;
  color:var(--ink) !important; box-shadow:0 14px 24px #30231820, 0 3px 5px #30231813 !important;
  text-align:center !important; animation:none !important; opacity:1;
  transition:transform .42s cubic-bezier(.22,.7,.2,1), opacity .35s ease !important;
}
.events.events-deck-ready #event-nikkah { --paper-card:#fbf5e9; --ink:#183d32; --metal:#b99a61; --accent:#17483b; --accent-text:#fff6e8; }
.events.events-deck-ready #event-mehndi { --paper-card:#f9e9e9; --ink:#773d4c; --metal:#bc9298; --accent:#864455; --accent-text:#fff7f6; }
.events.events-deck-ready #event-baraat { --paper-card:#f8eedf; --ink:#654329; --metal:#b99560; --accent:#7a552f; --accent-text:#fff8e9; }
.events.events-deck-ready #event-walima { --paper-card:#153e34; --ink:#fff4df; --metal:#c4a46a; --accent:#d9bd86; --accent-text:#153e34; }
/* The two borders are card and ::before; no diagonal ornament pseudo-elements. */
.events.events-deck-ready .wedding-deck-card::before {
  content:"" !important; display:block !important; position:absolute !important;
  inset:7px !important; width:auto !important; height:auto !important;
  background:none !important; border:1px solid var(--metal) !important;
  border-radius:12px !important; transform:none !important; opacity:.85 !important;
  pointer-events:none !important; z-index:1 !important;
}
.events.events-deck-ready .wedding-deck-card::after { content:none !important; display:none !important; }
.events.events-deck-ready .wedding-deck-card .royal-botanical {
  display:block !important; position:absolute !important; z-index:2 !important;
  width:91px !important; height:91px !important; pointer-events:none !important;
  background:url('/wedding-botanical.svg') center/contain no-repeat !important;
  opacity:.85 !important; filter:none !important;
}
.events.events-deck-ready #event-mehndi .royal-botanical { filter:sepia(.25) hue-rotate(302deg) saturate(.85) !important; }
.events.events-deck-ready #event-walima .royal-botanical { filter:sepia(.55) saturate(1.2) brightness(1.15) !important; opacity:.95 !important; }
.events.events-deck-ready .royal-botanical.tl { top:7px;left:7px; }
.events.events-deck-ready .royal-botanical.tr { top:7px;right:7px;transform:scaleX(-1); }
.events.events-deck-ready .royal-botanical.bl { bottom:7px;left:7px;transform:scaleY(-1); }
.events.events-deck-ready .royal-botanical.br { bottom:7px;right:7px;transform:scale(-1); }
/* Only the real header and compact event data are displayed. */
.events.events-deck-ready .wedding-deck-card > :not(.nikkah-header):not(.celebration-header):not(.deck-compact-content):not(.royal-botanical) { display:none !important; }
.events.events-deck-ready .wedding-deck-card > .nikkah-header,
.events.events-deck-ready .wedding-deck-card > .celebration-header,
.events.events-deck-ready .wedding-deck-card > .deck-compact-content {
  position:relative !important; z-index:3 !important; display:flex !important;
  flex-direction:column !important; align-items:center !important; width:100% !important;
  min-width:0 !important; max-width:100% !important; margin:0 !important;
  padding:0 !important; border:0 !important; background:none !important;
  box-shadow:none !important; transform:none !important;
}
.events.events-deck-ready .wedding-deck-card .nikkah-header::before,
.events.events-deck-ready .wedding-deck-card .nikkah-header::after,
.events.events-deck-ready .wedding-deck-card .celebration-header::before,
.events.events-deck-ready .wedding-deck-card .celebration-header::after,
.events.events-deck-ready .wedding-deck-card .nikkah-header *::before,
.events.events-deck-ready .wedding-deck-card .nikkah-header *::after,
.events.events-deck-ready .wedding-deck-card .celebration-header *::before,
.events.events-deck-ready .wedding-deck-card .celebration-header *::after { content:none !important; display:none !important; }
.events.events-deck-ready .wedding-deck-card .nikkah-header,
.events.events-deck-ready .wedding-deck-card .celebration-header { flex:0 0 auto !important; }
.events.events-deck-ready .wedding-deck-card .celebration-kicker,
.events.events-deck-ready .wedding-deck-card .nikkah-script {
  font-family:'DM Sans',sans-serif !important; font-size:9px !important;
  letter-spacing:.25em !important; text-transform:uppercase !important;
  font-weight:600 !important; color:var(--metal) !important;
}
.events.events-deck-ready .wedding-deck-card h3 {
  font-family:'Cormorant Garamond',Georgia,serif !important;
  font-size:clamp(45px, 11vw, 57px) !important; line-height:1 !important;
  font-weight:500 !important; letter-spacing:-.03em !important;
  margin:7px 0 6px !important; color:var(--ink) !important; text-shadow:none !important;
}
.events.events-deck-ready .wedding-deck-card .celebration-divider {
  display:flex !important; width:110px !important; margin:3px auto 9px !important;
  color:var(--metal) !important; background:none !important;
}
.events.events-deck-ready .wedding-deck-card .celebration-header p,
.events.events-deck-ready .wedding-deck-card .nikkah-header p {
  max-width:245px !important; font:400 11px/1.5 'DM Sans',sans-serif !important;
  margin:5px auto 8px !important; color:var(--ink) !important;
}
.events.events-deck-ready .wedding-deck-card .deck-compact-content {
  flex:1 1 auto !important; min-height:0 !important; justify-content:space-evenly !important;
}
.events.events-deck-ready .deck-compact-date {
  margin:7px 0 8px !important; font:600 19px/1.2 'Cormorant Garamond',serif !important;
  color:var(--ink) !important; letter-spacing:0 !important;
}
.events.events-deck-ready .deck-compact-schedule {
  width:100% !important; max-width:290px !important; margin:0 auto 9px !important;
  border-top:1px solid var(--metal) !important; border-bottom:1px solid var(--metal) !important;
  background:none !important;
}
.events.events-deck-ready .deck-schedule-row {
  display:flex !important; flex-direction:row !important; justify-content:space-between !important;
  align-items:center !important; gap:8px !important; padding:6px 2px !important;
  border:0 !important; border-bottom:1px solid color-mix(in srgb,var(--metal) 36%,transparent) !important;
  font:400 10px/1.4 'DM Sans',sans-serif !important; color:var(--ink) !important;
}
.events.events-deck-ready .deck-schedule-row:last-child { border-bottom:0 !important; }
.events.events-deck-ready .deck-schedule-row strong { font-weight:600 !important; white-space:nowrap !important; }
.events.events-deck-ready .deck-schedule-row span { text-align:right !important; }
.events.events-deck-ready .deck-compact-venue { display:flex !important; flex-direction:column !important; gap:2px !important; margin:3px auto 9px !important; }
.events.events-deck-ready .deck-compact-venue span { color:var(--metal) !important; font:600 8px/1.2 'DM Sans',sans-serif !important; letter-spacing:.2em !important; text-transform:uppercase !important; }
.events.events-deck-ready .deck-compact-venue strong { color:var(--ink) !important; font:600 22px/1.2 'Cormorant Garamond',serif !important; }
.events.events-deck-ready .deck-compact-actions {
  display:flex !important; flex-direction:row !important; flex-wrap:nowrap !important;
  justify-content:center !important; align-items:center !important;
  gap:8px !important; width:100% !important; max-width:290px !important;
  margin:0 auto !important;
}
.events.events-deck-ready .deck-compact-actions > button,
.events.events-deck-ready .deck-compact-actions > a {
  display:inline-flex !important; flex:1 1 0 !important; width:auto !important; min-width:0 !important;
  min-height:38px !important; margin:0 !important; padding:7px 6px !important;
  justify-content:center !important; align-items:center !important; gap:4px !important;
  border:1px solid var(--metal) !important; border-radius:999px !important;
  background:transparent !important; color:var(--ink) !important;
  box-shadow:none !important; text-decoration:none !important;
  font:600 9px/1.1 'DM Sans',sans-serif !important; letter-spacing:0 !important;
  white-space:nowrap !important; text-align:center !important;
}
.events.events-deck-ready .deck-compact-actions > a.deck-location-button {
  background:var(--accent) !important; color:var(--accent-text) !important;
  border-color:var(--accent) !important;
}
.events.events-deck-ready .deck-compact-actions svg { width:13px !important;height:13px !important;flex:none !important; }
.events.events-deck-ready .wedding-deck-card[data-depth='0'] { transform:translateY(0) scale(1) !important; pointer-events:auto !important; }
.events.events-deck-ready .wedding-deck-card[data-depth='1'] { transform:translateY(7px) scale(.981) rotate(-.25deg) !important; pointer-events:none !important; }
.events.events-deck-ready .wedding-deck-card[data-depth='2'] { transform:translateY(14px) scale(.962) rotate(.25deg) !important; pointer-events:none !important; }
.events.events-deck-ready .wedding-deck-card[data-depth='3'] { transform:translateY(21px) scale(.943) rotate(-.25deg) !important; pointer-events:none !important; }
.events.events-deck-ready .wedding-deck-card.deck-exiting { transform:translateX(-125%) rotate(-12deg) !important;opacity:0 !important; }
.events.events-deck-ready .wedding-deck-navigation { display:flex !important;align-items:center !important;justify-content:center !important;gap:18px !important;margin:0 auto 20px !important; }
.events.events-deck-ready .deck-nav-button { display:grid !important;place-items:center !important;width:42px !important;height:42px !important;border:1px solid #a98b59 !important;border-radius:50% !important;background:transparent !important;color:#85673d !important;font-size:21px !important; }
.events.events-deck-ready .deck-navigation-status { min-width:115px !important;font:600 18px 'Cormorant Garamond',serif !important;color:#24483a !important; }
@media(max-width:420px) {
  .events.events-deck-ready .wedding-card-deck { width:min(calc(100% - 48px),355px) !important;height:535px !important; }
  .events.events-deck-ready .wedding-card-deck > article.event { padding:33px 19px 22px !important; }
  .events.events-deck-ready .wedding-deck-card .royal-botanical { width:73px !important;height:73px !important; }
  .events.events-deck-ready .wedding-deck-card h3 { font-size:49px !important; }
}
@media(max-width:360px) { .events.events-deck-ready .wedding-card-deck {height:560px !important;} .events.events-deck-ready .deck-compact-actions > button,.events.events-deck-ready .deck-compact-actions > a {font-size:8px !important;} }
`;
fs.writeFileSync(cssFile, css);
const jsMarker = '    card.classList.add("wedding-deck-card");';
if (!js.includes(jsMarker)) { console.error('Could not locate card setup. CSS was updated; JS untouched.'); process.exit(1); }
let updated = js;
const add = `    // Decorative SVG floral corners; purely visual, no effect on event controls.
    for (const corner of ['tl', 'tr', 'bl', 'br']) {
      const ornament = document.createElement('span');
      ornament.className = 'royal-botanical ' + corner;
      ornament.setAttribute('aria-hidden', 'true');
      card.appendChild(ornament);
    }
`;
if (!updated.includes('royal-botanical')) updated = updated.replace(jsMarker, jsMarker + '\n' + add);
fs.writeFileSync(jsFile, updated);
console.log('Royal botanical wedding cards installed.');
console.log('Backups:', backupDir);
console.log('Updated CSS and JS; generated public/wedding-botanical.svg');
console.log('Next: node --check public/invitation.js && npm run build');
