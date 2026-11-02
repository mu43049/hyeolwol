/* 시뮬레이터가 게임 컨텍스트 안에서 실행하는 코드: 화면 함수를 봇으로 바꾼다 */
var _rng = SIM.rng;
show = function () {}; save = function () {};
hub = function (msg) { S.msg = ''; SIM.hubReady = true; };
chapterCard = function (i, go) { SIM.ch.push(i + '@' + S.month); go(); };
cutscene = function (u, cont) { cont(); };
pages = function (t, arr, k, done) { done(); };
result = function (t, b, cont) { cont(); };
scene = function (title, body, ch) {
  SIM.scenes++; if (SIM.scenes > 400000) throw new Error('scene loop ' + title);
  if (SIM.scan && /undefined|NaN|\[object|null/.test(String(title) + String(body))) SIM.bad.push(title + ' :: ' + String(body).replace(/<[^>]+>/g, '').slice(0, 80));
  if (SIM.scan) (ch || []).forEach(function (c) { if (/undefined|NaN|\[object/.test(String(c.t) + String(c.h || ''))) SIM.bad.push('choice ' + c.t + ' / ' + c.h); });
  var ok = (ch || []).filter(function (c) { return !c.off && c.f; }); if (!ok.length) { SIM.stuck = title; return; }
  var pr = ok.filter(function (c) { return c.c === 'primary'; }); var c = (_rng() < .5 && pr.length) ? pr[0] : ok[Math.floor(_rng() * ok.length)];
  SIM.last = title; c.f();
};
renderFight = function () { SIM.fights++; autoFight(); };
showEnd = function (d) { SIM.ended = d; };
function simPick(a) { return a[Math.floor(_rng() * a.length)]; }
function botAct() {
  var r = _rng();
  if (canBreak() && S.hp > maxHp() * .5) return doBreak();
  if (S.hp < maxHp() * .35 || S.mad > 75) return rest();
  if (S.month > 36 && !S.sect && age() >= 35 && S.realm >= 3 && S.silver >= price(3000)) { S.silver -= price(3000); S.sect = { n: '시험문', lv: 1 }; }
  if (S.items.pill < 3 && S.silver > price(200)) { S.silver -= price(40); S.items.pill++; }
  Object.keys(MATS).forEach(function (k) { if (mat(k) > 10) { var n = mat(k) - 6; S.silver += n * MATS[k].p; S.mat[k] -= n; } });
  var cl = craftList().filter(function (x) { return x.ok && !x.need && S.silver >= x.s && hasMats(x.m || {}) && (!x.o || (S.items.ore || 0) >= x.o); });
  if (cl.length && r < .35) { var x = cl[0]; S.silver -= x.s; if (x.o) S.items.ore -= x.o; useMats(x.m || {}); x.f(); return afterAct('craft', 'item'); }
  if (S.month > 40 && r < .12) return retreat(simPick([3, 6, 12]));
  if (r < .42) return meditate();
  if (r < .60) { var ks = Object.keys(S.skills).filter(function (k) { return S.skills[k].s < 12; }); return ks.length ? doTrain(simPick(ks)) : meditate(); }
  if (r < .70) return doMission({ n: '순찰', e: 'scout', r: [20, 36] }, Math.min(S.realm, 8));
  if (r < .84 && S.month > 12) return doFarm(simPick(FARM.filter(function (f) { return S.realm >= f.r; })));
  if (r < .92) return explore(simPick(Object.keys(LOCS).filter(function (k) { return LOCS[k].open(); })));
  return meditate();
}
function simLife(maxSteps) {
  SIM.reach = {}; SIM.steps = 0; startLife();
  while (!SIM.ended && SIM.steps < maxSteps) {
    SIM.steps++; SIM.hubReady = false;
    if (!S) break;
    if (SIM.stuck) { SIM.hint = 'STUCK ' + SIM.stuck; break; }
    botAct();
    if (S && S.realm !== undefined && !SIM.reach['r' + S.realm]) SIM.reach['r' + S.realm] = S.month;
  }
}
