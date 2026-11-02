/* 혈월회귀록 v3 — 저장과 상태. 저장 형식이 바뀌면 SAVE_VER를 올리고 migrate()에 변환을 추가한다. */
var KEY = 'hyeolwol-v4';
var SAVE_VER = 4;
function defP() {
  return { ver: SAVE_VER, lives: 0, shards: 0, best: 0, mem: {}, endings: {}, codex: {}, up: {}, carry: {}, master: {}, dok: null,
    maxRealm: 0, ach: {}, encs: {}, exploreN: 0, hard: false, trueDone: 0, noReturn: false, cp: null, bestAge: 0, vault: {},
    settings: { bgm: .55, sfx: .8, mute: false, fx: true },
    stats: { deaths: 0, fights: 0, wins: 0, breaks: 0, actions: 0 } };
}
var P = defP(), S = null, C = null, H = [], resetArmed = false;
function migrate(p) {
  var d = defP();
  p.up = p.up || {}; p.settings = Object.assign(d.settings, p.settings || {}); p.stats = Object.assign(d.stats, p.stats || {});
  p.ver = SAVE_VER; return p;
}
function load() {
  try {
    var r = localStorage.getItem(KEY);
    if (r) { var o = JSON.parse(r); if (o && o.P) { P = migrate(Object.assign(defP(), o.P)); S = (o.S && o.S.alive) ? o.S : null; } }
  } catch (e) {}
}
function save() { try { localStorage.setItem(KEY, JSON.stringify({ P: P, S: S })); } catch (e) {} }

function sk(id) { return (S && S.skills && S.skills[id]) ? S.skills[id].s : 0; }
function skn(id) { return id === 'own' && P.dok ? P.dok.n : SK[id].n; }
function need(s) { return 14 + 7 * s; }
function hasMem(id) { return !!P.mem[id]; }
function learnMem(id) { if (!P.mem[id]) { P.mem[id] = true; S.newMem[id] = true; } }
function learn(id) {
  if (!SK[id]) return;
  if (!S.skills[id]) { S.skills[id] = { s: Math.max(1, P.carry[id] || 1), xp: 0 }; if (S.log) logE('skill', '<b>' + skn(id) + '</b>을(를) 익혔다.'); }
}
function monthLabel() { var m = S.month; return (m <= 12 ? '첫째 해 ' : (m <= 24 ? '둘째 해 ' : '셋째 해 ')) + SEASON[Math.floor(((m - 1) % 12) / 3)] + ' · ' + m + '개월째'; }
function lifeNo() { return P.lives + 1; }
function logE(k, t) { if (!S) return; if (!S.log) S.log = []; S.log.unshift({ m: S.month, k: k, t: t }); if (S.log.length > 60) S.log.length = 60; }
function tr(k) { return (S && S.trust && S.trust[k]) || 0; }
