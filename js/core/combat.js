/* 혈월회귀록 v3 — 전투. 읽힌 수(강타/연타/허초/운기)에 맞는 대응을 고르는 턴제. 모든 피해는 미리보기로 보인다. */
var ATKN2 = ['공격', '공격', '공격', '검기', '검강', '검강', '심검', '심검', '무위자연'];
var ATKM2 = [1, 1, 1, 1.15, 1.35, 1.35, 1.6, 1.6, 2];
function actName(a) { var R = S.realm; if (a === 'atk') return ATKN2[R]; if (a === 'parry') return R >= 7 ? '무형지기' : (R >= 2 ? '사량발천근' : '흘리기'); return R >= 8 ? '허공답보' : (R >= 5 ? '이화접목' : (R >= 1 ? '경공' : '회피')); }

function enemyFrom(base, id, tier, hpMul) {
  var b = base, k = (1 + tier * .45) * (P.hard ? 1.25 : 1), bk = (b.boss && id !== 'heart') ? 1 + Math.max(0, S.realm - 4) * .25 : 1;
  var hp = Math.round(b.hp * k * bk * (hpMul || 1) * (id === 'heart' ? 1 : BAL.enemyHp));
  var atk = b.atk * k * bk * (id === 'heart' ? 1 : BAL.enemyAtk);
  var def = Math.round(b.def != null ? b.def * (id === 'heart' ? 1 : k * bk) : b.atk * BAL.enemyDefK * k * bk);
  var lv = Math.max(1, Math.round((b.hp / 12 + b.atk) * k * bk / 4));
  return { id: id, n: b.n, max: hp, hp: hp, atk: atk, def: def, lv: lv, w: b.w, boss: !!b.boss, charged: false, bleed: 0, stun: 0 };
}
function mkEnemy(id, tier, hpMul) { return enemyFrom(ENM[id], id, tier, hpMul); }
function rollIntent(e) { if (e.stun) { e.stun = 0; return 'stun'; } if (e.charged) return 'strong'; var t = 0, k; for (k in e.w) t += e.w[k]; var r = Math.random() * t; for (k in e.w) { r -= e.w[k]; if (r <= 0) return k; } return 'strong'; }
function mkHint(e, it) {
  if (it === 'stun') return ['stun'];
  if (e.charged) return ['strong'];
  if ((!P.hard && (P.codex[e.id] || 0) > 0) || Math.random() < (P.hard ? .1 : .22) + .08 * effEye()) return [it];
  var d = pick(['strong', 'rapid', 'feint', 'charge'].filter(function (k) { return k !== it; }));
  return Math.random() < .5 ? [it, d] : [d, it];
}

/* 한 행동이 한 가지 적 수에 대해 어떻게 작용하는지 계산 (전투와 미리보기가 같이 쓴다) */
function resolve(act, sid, it) {
  var sm = sid ? SK[sid] : null, col = act === 'skill' ? 'atk' : act, pm = 1, em = 0, mul = 1, hits = 1, refl = 0, R = S.realm;
  if (act !== 'pill') { var t = TBL[it][col]; pm = t[0]; em = t[1]; }
  if (sm) { mul = skillMul(sid); hits = sm.hits || 1; if (sm.pierce) { em = Math.max(em, 1); pm *= .5; } }
  if (act === 'dodge' && freeDodgeAny() && pm === 0 && em === 0) em = counterK2();
  if (act === 'atk') { mul *= ATKM2[R]; if (R >= 6) em = Math.max(em, 1); }
  if (act === 'parry') { if (R >= 7) { pm = 0; em = Math.max(em, 1); } else if (R >= 2 && em > 0) em += .3; }
  if (act === 'dodge' && R >= 5) { if (R >= 8 || pm === 0) { pm = 0; refl = R >= 8 ? 1 : .6; em = Math.max(em, .5); } else pm *= .5; }
  return { pm: pm, em: em, mul: mul, hits: hits, refl: refl };
}
function dealt(e, r, rr) { if (r.em <= 0) return 0; return Math.max(1, Math.round(pAtk() * r.mul * r.em * rr - e.def * BAL.eDefK)); }
function enemyRaw(e, it, rr) { if (!IM[it]) return 0; return e.atk * IM[it] * ((it === 'strong' && e.charged) ? 1.6 : 1) * rr; }
function taken(e, it, r, rr) { if (r.pm <= 0 || !IM[it]) return 0; return Math.max(1, Math.round((enemyRaw(e, it, rr) * r.pm - pDef() * BAL.defK) * (S.realm >= 8 ? .7 : 1))); }
function intentDmg(e, it) { if (!IM[it]) return 0; return Math.max(1, Math.round((enemyRaw(e, it, 1) - pDef() * BAL.defK) * (S.realm >= 8 ? .7 : 1))); }
/* 미리보기: 읽힌 수 각각에 대해 가하는/받는 피해 범위 */
function preview(act, sid) {
  var e = C.e, d = [1e9, 0], t = [1e9, 0];
  C.hint.forEach(function (it) {
    var r = resolve(act, sid, it);
    var lo = dealt(e, r, .9) * r.hits, hi = dealt(e, r, 1.1) * r.hits;
    if (r.refl && IM[it]) { lo += Math.round(enemyRaw(e, it, .92) * r.refl); hi += Math.round(enemyRaw(e, it, 1.08) * r.refl); }
    d[0] = Math.min(d[0], lo); d[1] = Math.max(d[1], hi);
    t[0] = Math.min(t[0], taken(e, it, r, .92)); t[1] = Math.max(t[1], taken(e, it, r, 1.08));
  });
  return { d: d, t: t };
}
function rangeTxt(a) { return a[1] <= 0 ? '0' : (a[0] === a[1] ? String(a[0]) : a[0] + '~' + a[1]); }

function fight(id, tier, o) {
  o = o || {};
  if (o.heal) S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * o.heal));
  var e = o.enemy ? enemyFrom(o.enemy, o.enemy.id || id, 0, o.hpMul) : mkEnemy(id, tier, o.hpMul);
  C = { e: e, ki: maxKi(), o: o, log: [], turn: 1, done: false, menu: false, crisis: false, revived: false };
  P.stats.fights++;
  bgm(e.boss ? 'boss' : 'battle');
  fx('battleStart', e, PT[id] || null);
  nextTurn();
}
function nextTurn() { C.intent = rollIntent(C.e); C.hint = mkHint(C.e, C.intent); C.menu = false; renderFight(); }
function playTurn(act, sid) { var r = step(act, sid); if (r) endFight(r); else { C.turn++; nextTurn(); } }

function step(act, sid) {
  var e = C.e, it = C.intent, sm = sid ? SK[sid] : null, R = S.realm, dc = dodgeCost();
  if (act === 'skill') { if (C.ki < sm.cost) return null; C.ki -= sm.cost; }
  if (act === 'dodge') { if (C.ki < dc) return null; C.ki -= dc; }
  var heal = 0;
  if (act === 'pill') { S.items.pill--; heal = Math.round(maxHp() * .4); S.hp = Math.min(maxHp(), S.hp + heal); }
  var r = resolve(act, sid, it), was = e.charged, dmg = 0, crit = false, i;
  if (r.em > 0) for (i = 0; i < r.hits; i++) { var h = dealt(e, r, frand(.9, 1.1)); if (Math.random() < critRate()) { h = Math.round(h * BAL.critK); crit = true; } dmg += h; }
  var ed = taken(e, it, r, frand(.92, 1.08));
  var rd = 0; if (r.refl && IM[it]) { rd = Math.round(enemyRaw(e, it, 1) * r.refl); dmg += rd; }
  e.charged = (it === 'charge' && r.em === 0);
  var lines = [];
  if (act === 'pill') lines.push('회춘단을 삼켰다. 체력이 <b>' + heal + '</b> 돌아왔다.');
  var name = sm ? skn(sid) : null, txt = LINE[it][act === 'skill' ? 'atk' : (act === 'pill' ? 'parry' : act)];
  if (name) lines.push(esc(name) + '을(를) 펼쳤다. ' + txt); else if (act !== 'pill') lines.push(txt);
  if (rd) lines.push(actName('dodge') + '. 상대의 힘을 되돌렸다.');
  if (dmg > 0) lines.push('<b>' + dmg + '</b>의 피해를 입혔다.' + (crit ? ' <b class="crit">치명타!</b>' : ''));
  if (ed > 0) lines.push('<b>' + ed + '</b>의 피해를 입었다.');
  e.hp -= dmg; S.hp -= ed;
  if (sm) {
    if (sm.stun && dmg > 0 && e.hp > 0) e.stun = 1;
    if (sm.selfDmg) { var sd = Math.round(maxHp() * sm.selfDmg); S.hp -= sd; lines.push('몸이 찢어지는 대가를 치렀다. (-' + sd + ')'); }
    if (sm.bleed && dmg > 0) e.bleed = 3;
    if (sm.mad) S.mad = clamp(S.mad + (sm.mad > 0 ? sm.mad * madMul() : sm.mad), 0, 100);
    if (sm.leech && dmg > 0) { var lh = Math.round(dmg * sm.leech); S.hp = Math.min(maxHp(), S.hp + lh); heal += lh; lines.push('피해의 일부가 몸으로 돌아왔다. (+' + lh + ')'); }
  }
  if (e.bleed > 0 && e.hp > 0) { var b = Math.round(4 + R * 2.2); e.hp -= b; e.bleed--; lines.push('출혈로 ' + b + '의 피해가 더해졌다.'); }
  if (S.mad >= 85) S.hp -= 3;
  C.ki = Math.min(maxKi(), C.ki + 3 + (act === 'atk' ? 2 : 0) + (R >= 6 ? 5 : 0));
  if (R >= 5 && S.hp > 0) { var rh = Math.round(maxHp() * .03); S.hp = Math.min(maxHp(), S.hp + rh); }
  if (S.hp > 0 && S.hp < maxHp() * .25 && !C.crisis && e.hp > 0) {
    C.crisis = true;
    if (Math.random() < .3) {
      var hh = Math.round(maxHp() * .3); S.hp = Math.min(maxHp(), S.hp + hh); heal += hh;
      var ig = insightGain(.2); lines.push('<b>생사의 경계에서 무언가가 열렸다.</b> 체력이 돌아오고 내공이 ' + ig + ' 늘었다.');
      if (canBreak()) { S.insightBuff = true; lines.push('<b>벽이 얇아졌다.</b> 다음 돌파 시련이 쉬워진다.'); }
    }
  }
  C.last = { dmg: dmg, crit: crit, hurt: ed, heal: heal, skill: name };
  C.log.unshift(lines.join(' '));
  if (e.hp <= 0) { S.hp = Math.max(1, S.hp); return 'win'; }
  if (S.hp <= 0 && R >= 7 && !C.revived) { C.revived = true; S.hp = Math.round(maxHp() * .4); C.log[0] += ' <b>생사초월. 쓰러진 몸이 다시 일어섰다.</b>'; }
  if (S.hp <= 0) return 'lose';
  return null;
}
function chooseAuto() {
  var it = pick(C.hint), best = { strong: 'dodge', rapid: 'parry', feint: 'atk', charge: 'atk', stun: 'atk' }[it], act = best, sid = null;
  if (Math.random() < .12) act = 'atk';
  if (it === 'feint' || it === 'charge' || Math.random() < .2) {
    var cs = Object.keys(S.skills).filter(function (k) { return !SK[k].passive && C.ki >= SK[k].cost && !(SK[k].mad > 0 && S.mad >= 70) && !SK[k].selfDmg; });
    if (cs.length) { cs.sort(function (a, b) { return skillMul(b) * (SK[b].hits || 1) - skillMul(a) * (SK[a].hits || 1); }); sid = cs[0]; act = 'skill'; }
  }
  if (act === 'dodge' && C.ki < dodgeCost()) act = 'parry';
  if (S.hp < maxHp() * .3 && S.items.pill > 0 && Math.random() < .6) act = 'pill';
  return [act, sid];
}
function autoFight() {
  var r = null, g = 0, a;
  while (!r && g++ < 80) { a = chooseAuto(); r = step(a[0], a[1]); if (!r) { C.turn++; C.intent = rollIntent(C.e); C.hint = mkHint(C.e, C.intent); } }
  if (!r) r = S.hp > C.e.hp ? 'win' : 'lose';
  endFight(r);
}
function fightInsight(e, c) {
  var p = .05 + (e.boss ? .25 : 0) + (c.crisis ? .15 : 0) + .015 * effEye();
  if (Math.random() >= p) return '';
  var g = insightGain(.3); logE('qi', '싸움 속에서 깨달음을 얻었다. 내공 +' + g);
  var t = '<div class="insight"><b>깨달음</b>상대의 칼끝에서 무언가를 보았다. 내공이 <b>' + g + '</b> 늘었다.';
  if (canBreak()) { S.insightBuff = true; t += ' 벽이 얇아졌다. 다음 돌파 시련이 쉬워진다.'; ach('insight'); }
  return t + '</div>';
}
function endFight(r) {
  var o = C.o, e = C.e; C.done = true;
  P.codex[e.id] = (P.codex[e.id] || 0) + 1;
  var last = C.log[0] || '';
  fx('battleEnd', r === 'win');
  if (r === 'win') {
    S.kills++; P.stats.wins++;
    var gq = qiGain(Math.round(4 + e.lv * .8 + S.realm * 1.5)); S.qi += gq;
    var ins = o.trial ? '' : fightInsight(e, C);
    sfx('win');
    scene('승리', '<p>' + esc(e.n) + '이(가) 무너졌다. <span class="dim">내공 +' + gq + '</span></p><p class="dim">' + last + '</p>' + ins, [{ t: '계속', c: 'primary', f: function () { C = null; o.win(); } }]);
  } else {
    if (o.spar) scene('패배', '<p>' + esc(e.n) + '의 칼끝이 목 앞에서 멈췄다. 목숨은 건졌다.</p><p class="dim">' + last + '</p>', [{ t: '계속', c: 'primary', f: function () { C = null; o.lose(); } }]);
    else { C = null; o.lose(); }
  }
}
