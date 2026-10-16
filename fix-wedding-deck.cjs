const fs = require('fs');
const path = require('path');
const root = process.cwd();
const cssFile = path.join(root, 'public/invitation.css');
const jsFile = path.join(root, 'public/invitation.js');
if (!fs.existsSync(cssFile) || !fs.existsSync(jsFile)) {
  console.error('Run this from the Groom Invitation project folder.'); process.exit(1);
}
const backup = path.join(root, 'backup-deck-repair-' + new Date().toISOString().replace(/[:.]/g,'-'));
fs.mkdirSync(backup);
for (const f of [cssFile,jsFile]) fs.copyFileSync(f,path.join(backup,path.basename(f)));
let css=fs.readFileSync(cssFile,'utf8');
const marker='/* ROYAL BOTANICAL WEDDING DECK — CLEAN SINGLE SOURCE OF TRUTH */';
const start=css.indexOf(marker);
if(start>=0) css=css.slice(0,start);
const repair=`
/* PREMIUM WEDDING DECK REPAIR — all four cards occupy the same stack */
.events.events-deck-ready {overflow:hidden!important;padding-left:12px!important;padding-right:12px!important;background:#faf5eb!important}
.events.events-deck-ready .event-tabs-wrap {display:none!important}
.events.events-deck-ready > article.event {display:none!important}
.events.events-deck-ready .wedding-card-deck {
 position:relative!important;isolation:isolate!important;display:block!important;
 width:min(calc(100% - 24px),440px)!important;height:clamp(385px,110vw,455px)!important;
 margin:28px auto 36px!important;padding:0!important;overflow:visible!important;touch-action:pan-y!important;
}
.events.events-deck-ready .wedding-card-deck > article.event {
 position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:auto!important;
 display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;
 width:100%!important;max-width:none!important;height:100%!important;min-height:0!important;max-height:none!important;
 margin:0!important;padding:25px 22px 20px!important;box-sizing:border-box!important;
 border:1.5px solid var(--metal)!important;border-radius:13px!important;overflow:hidden!important;
 background:var(--paper-card)!important;color:var(--ink)!important;
 box-shadow:0 15px 32px #30231825!important;text-align:center!important;
 animation:none!important;opacity:1!important;visibility:visible!important;
 transition:transform .4s cubic-bezier(.22,.7,.2,1),opacity .35s ease!important;
}
.events.events-deck-ready #event-nikkah {--paper-card:#fbf5e9;--ink:#214536;--metal:#b99a61;--accent:#214536;--accent-text:#fff8ea}
.events.events-deck-ready #event-mehndi {--paper-card:#f9e9e9;--ink:#773d4c;--metal:#bc9298;--accent:#864455;--accent-text:#fff7f6}
.events.events-deck-ready #event-baraat {--paper-card:#f8eedf;--ink:#654329;--metal:#b99560;--accent:#7a552f;--accent-text:#fff8e9}
.events.events-deck-ready #event-walima {--paper-card:#153e34;--ink:#fff4df;--metal:#c4a46a;--accent:#d9bd86;--accent-text:#153e34}
.events.events-deck-ready .wedding-deck-card::before {
 content:""!important;display:block!important;position:absolute!important;inset:7px!important;
 width:auto!important;height:auto!important;transform:none!important;background:none!important;
 border:1px solid var(--metal)!important;border-radius:8px!important;opacity:.8!important;pointer-events:none!important;z-index:1!important;
}
.events.events-deck-ready .wedding-deck-card::after {content:none!important;display:none!important}
.events.events-deck-ready .wedding-deck-card .royal-botanical {
 display:block!important;position:absolute!important;z-index:2!important;width:65px!important;height:65px!important;
 pointer-events:none!important;background:url('/wedding-botanical.svg') center/contain no-repeat!important;opacity:.72!important;
}
.events.events-deck-ready .royal-botanical.tl{top:7px;left:7px}
.events.events-deck-ready .royal-botanical.tr{top:7px;right:7px;transform:scaleX(-1)}
.events.events-deck-ready .royal-botanical.bl{bottom:7px;left:7px;transform:scaleY(-1)}
.events.events-deck-ready .royal-botanical.br{bottom:7px;right:7px;transform:scale(-1)}
.events.events-deck-ready .wedding-deck-card > :not(.deck-premium-heading):not(.deck-compact-content):not(.royal-botanical) {display:none!important}
.events.events-deck-ready .deck-premium-heading {
 display:block!important;position:relative!important;z-index:3!important;margin:0 0 6px!important;
 font:italic 500 clamp(43px,12vw,62px)/.95 'Cormorant Garamond','Playfair Display',Georgia,serif!important;
 letter-spacing:-.035em!important;color:var(--ink)!important;text-shadow:none!important;
}
.events.events-deck-ready .deck-compact-content {
 display:flex!important;position:relative!important;z-index:3!important;flex-direction:column!important;
 align-items:center!important;justify-content:center!important;gap:10px!important;
 width:100%!important;max-width:335px!important;min-height:0!important;margin:0!important;padding:0!important;
 border:0!important;background:none!important;box-shadow:none!important;transform:none!important;
}
.events.events-deck-ready .deck-compact-date {
 margin:0!important;color:var(--metal)!important;font:600 15px/1.2 'Cormorant Garamond',Georgia,serif!important;
 letter-spacing:.04em!important;
}
.events.events-deck-ready .deck-compact-schedule {
 width:100%!important;max-width:295px!important;margin:0!important;padding:3px 0!important;
 border-top:1px solid var(--metal)!important;border-bottom:1px solid var(--metal)!important;background:none!important;
}
.events.events-deck-ready .deck-schedule-row {
 display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;
 gap:10px!important;padding:4px 2px!important;margin:0!important;border:0!important;
 color:var(--ink)!important;font:400 11px/1.25 'DM Sans',sans-serif!important;
}
.events.events-deck-ready .deck-schedule-row strong {font-weight:600!important;white-space:nowrap!important}
.events.events-deck-ready .deck-schedule-row span {text-align:right!important}
.events.events-deck-ready .deck-compact-venue {display:flex!important;flex-direction:column!important;gap:1px!important;margin:0!important}
.events.events-deck-ready .deck-compact-venue span {color:var(--metal)!important;font:600 9px/1.2 'DM Sans',sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important}
.events.events-deck-ready .deck-compact-venue strong {color:var(--ink)!important;font:500 21px/1.1 'Cormorant Garamond',Georgia,serif!important}
.events.events-deck-ready .deck-compact-actions {display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;gap:8px!important;width:100%!important;max-width:295px!important;margin:0!important}
.events.events-deck-ready .deck-compact-actions > button,
.events.events-deck-ready .deck-compact-actions > a {
 display:inline-flex!important;align-items:center!important;justify-content:center!important;
 flex:1 1 0!important;min-width:0!important;width:auto!important;min-height:35px!important;
 margin:0!important;padding:6px 7px!important;border:1px solid var(--metal)!important;border-radius:30px!important;
 background:transparent!important;color:var(--ink)!important;box-shadow:none!important;
 font:600 10px/1.1 'DM Sans',sans-serif!important;text-decoration:none!important;white-space:nowrap!important;
}
.events.events-deck-ready .deck-compact-actions > a.deck-location-button {background:var(--accent)!important;color:var(--accent-text)!important;border-color:var(--accent)!important}
.events.events-deck-ready .deck-compact-actions svg {width:12px!important;height:12px!important;flex:none!important}
.events.events-deck-ready .wedding-deck-card[data-depth='0'] {transform:translateY(0) scale(1)!important;pointer-events:auto!important}
.events.events-deck-ready .wedding-deck-card[data-depth='1'] {transform:translateY(8px) scale(.985)!important;pointer-events:none!important}
.events.events-deck-ready .wedding-deck-card[data-depth='2'] {transform:translateY(16px) scale(.97)!important;pointer-events:none!important}
.events.events-deck-ready .wedding-deck-card[data-depth='3'] {transform:translateY(24px) scale(.955)!important;pointer-events:none!important}
.events.events-deck-ready .wedding-deck-card.deck-exiting {transform:translateX(-125%) rotate(-9deg)!important;opacity:0!important}
.events.events-deck-ready .wedding-deck-navigation {display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;margin:0 auto 16px!important}
.events.events-deck-ready .deck-nav-button {display:grid!important;place-items:center!important;width:40px!important;height:40px!important;border:1px solid #a98b59!important;border-radius:50%!important;background:transparent!important;color:#85673d!important;font-size:20px!important}
.events.events-deck-ready .deck-navigation-status {min-width:130px!important;color:#24483a!important;font:600 18px 'Cormorant Garamond',serif!important}
@media(max-width:390px){
 .events.events-deck-ready .wedding-card-deck{width:calc(100% - 12px)!important;height:405px!important}
 .events.events-deck-ready .wedding-card-deck > article.event{padding:19px 17px 17px!important}
 .events.events-deck-ready .deck-compact-content{gap:8px!important}
 .events.events-deck-ready .wedding-deck-card .royal-botanical{width:52px!important;height:52px!important}
 .events.events-deck-ready .deck-premium-heading{font-size:49px!important}
}
`;
css += '\n'+repair;
fs.writeFileSync(cssFile,css);
let js=fs.readFileSync(jsFile,'utf8');
const needle='    card.classList.add("wedding-deck-card");';
if (!js.includes(needle)) {console.error('Deck builder not found. JS unchanged. CSS updated; backup:',backup);process.exit(1);}
js=js.replace(needle,needle+`
    // Use one dedicated title, so legacy headers cannot duplicate the date.
    const oldHeading = card.querySelector("h3");
    const premiumHeading = document.createElement("h3");
    premiumHeading.className = "deck-premium-heading";
    premiumHeading.textContent = ({ "event-nikkah":"Nikkah", "event-mehndi":"Mehndi", "event-baraat":"Baraat", "event-walima":"Walima" })[card.id];
    card.prepend(premiumHeading);
`);
fs.writeFileSync(jsFile,js);
console.log('Deck repair installed: single date, four stacked cards, shorter wider mobile layout, premium titles.');
console.log('Backup:',backup);
console.log('Next: node --check public/invitation.js && npm run build');
