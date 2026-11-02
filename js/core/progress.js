/* 혈월회귀록 v3 — 한 생의 흐름, 행동, 경지 돌파, 회귀 */
function newLife() {
  S = { alive: true, month: 1, realm: 0, qi: upL('qi') * 25, mad: 0, silver: 30 + upL('silver') * 30, hpBonus: 0, skills: {},
    trust: { dg: upL('trust'), hr: upL('trust'), mk: 0, yn: upL('trust'), kj: 0, sm: 0, bw: 0, cn: 0, hs: 0, nj: 0 }, flags: {},
    items: { pill: 1, antidote: 0, calm: 0, letter: 0, ore: 0 }, weapon: 0, armor: 0, arena: 0, eye: upL('eye'), newMem: {}, kills: 0, msg: '', insightBuff: false };
  learn('gong');
  for (var id in P.master) if (P.master[id] && SK[id]) S.skills[id] = { s: 6, xp: 0 };
  if (P.dok) learn('own');
  S.qi += Math.round(REALMS[Math.min(P.maxRealm || 0, REALMS.length - 1)].q * .1 * upL('trace'));
  S.hp = maxHp(); S.log = [];
}
function startLife() {
  newLife(); S.flags.seen_1 = true; bgm('story');
  if (P.lives === 0) pages('서장 · 혈월봉', [
    ps('천마신교. 강호가 마교라 부르며 이를 가는 곳. 그 총단은 서북 변방의 혈월봉에 있다.', '해마다 한 번, 혈월봉 위로 핏빛 달이 뜬다. 교도들은 그것을 천마의 숨이라 부른다. 달이 붉을수록 교는 강해진다고, 그리고 그만큼 피를 원한다고.'),
    ps('당신은 외당의 시종이다. 부모도 이름도 없다. 다섯 살에 산문 앞에 버려졌고, 열여섯이 된 지금까지 남의 칼을 닦고 남의 피를 씻어 왔다.', '같은 방을 쓰는 연이만이 당신을 사람처럼 대한다. 그 아이는 언젠가 당신에게 이름을 지어 주겠다고 했다.'),
    ps('그리고 오늘 아침, 당신은 꿈에서 깨어났다.', '꿈속에서 달은 붉었고 총단은 불타고 있었다. 연이가 쓰러져 있었고, 당신의 가슴에도 칼이 꽂혀 있었다. 너무 생생해서 손을 가슴에 대 보았다. 상처는 없었다.', '창밖에는 매화가 지고 있었다. 첫째 해의 봄이었다.')], 'title', ev1);
  else pages('다시, 봄', [function () { return ps('숨이 끊어지는 감각. 그리고 다시, 젖은 짚 냄새.', lifeNo() + '번째 봄이다. 같은 천장, 같은 매화, 같은 아침. 연이가 옆 침상에서 뒤척이고 있다.', '꿈이 아니었다. 당신은 죽었고, 돌아왔다.'); },
    function () { var ms = Object.keys(P.mem).map(function (k) { return MEM[k][0]; }); return ms.length ? ps('지난 생들이 남긴 것이 있다.', '<b>' + ms.join(' · ') + '</b>', '이번에는 무엇을 바꿀 것인가.') : ps('아직은 무엇을 바꿔야 할지 모른다.', '하지만 몸은 기억한다. 이번에는 조금 더 오래 살아남을 수 있을 것이다.'); }], 'return', ev1);
}
function chapIdx(m) { var i = 0; for (var j = 0; j < CH.length; j++) if (m >= CH[j][0]) i = j; return i; }
function advance() {
  if (S.inEvent) { S.inEvent = false; hub(); return; }
  S.month++; P.stats.actions++;
  S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .08));
  S.mad = Math.max(0, S.mad - 2 - (sk('gwiwon') ? 2 : 0) - (sk('jeongsim') ? 4 : 0));
  if (S.realm >= 5) S.hp = maxHp();
  if (S.flags.danDead && !S.flags.gotHyeolma) { S.flags.gotHyeolma = true; learn('hyeolma'); }
  if (typeof demonCount === 'function' && demonCount() >= 6) ach('demon');
  if (typeof achCheck === 'function') achCheck();
  if (S.month > 36) { finish('guard'); return; }
  var go = function () {
    var ev = EVENTS.filter(function (x) { return x.m === S.month && !S.flags['seen_' + x.id] && (!x.cond || x.cond()); })[0];
    if (ev) { S.flags['seen_' + ev.id] = true; S.inEvent = true; ev.run(); } else hub();
  };
  if (chapIdx(S.month) !== chapIdx(S.month - 1)) chapterCard(chapIdx(S.month), go); else go();
}
function afterAct(t, k) {
  if (k) logE(k, t);
  if (S.mad >= 100) { madCrisis(function () { S.msg = t; advance(); }); return; }
  S.msg = t; advance();
}
function madCrisis(next) {
  if (S.items.calm > 0) { S.items.calm--; S.mad = 60; result('정심환', '마기가 목구멍까지 치밀 때, 품속의 정심환을 삼켰다. 쓴맛이 혼을 붙들었다.', next); return; }
  var p = .3 + S.realm * .05 + tr('hr') * .05 + (S.route === 'ma' ? .25 : 0) + (S.realm >= 4 ? .3 : 0);
  if (Math.random() < p) { S.mad = 55; S.hp = 1; result('주화입마', '핏줄이 터지는 소리를 들었다. 눈앞이 붉어졌다가 검어졌다. 살아남은 것은 운이었다.', next); }
  else die('rampage');
}

/* ---- 행동 ---- */
function meditate() {
  var g = qiGain((12 + S.realm * 4 + sk('gong') * 1.5 + effEye() * 1.5 + rnd(0, 6)) * (1 + .03 * sk('gwiwon')));
  var dono = Math.random() < .06 + .02 * sk('gwiwon'); if (dono) g = Math.round(g * 1.8);
  S.qi += g; S.mad = Math.max(0, S.mad - 6 - (sk('jeongsim') ? 6 : 0));
  sfx('qi');
  if (dono && canBreak()) { S.insightBuff = true; ach('insight'); }
  afterAct((dono ? '<b>돈오(頓悟)</b>. 막혀 있던 기혈이 한꺼번에 이어졌다. ' : '단전에 기를 돌렸다. ') + '내공이 <b>' + g + '</b> 늘었다.' + (canBreak() ? ' <b>경지의 벽</b>에 닿았다. 돌파 시련을 치를 수 있다.' : ''), 'qi');
}
function rest() {
  S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .6)); S.mad = Math.max(0, S.mad - 20);
  afterAct('하루를 통째로 잤다. 체력이 돌아오고 머리가 맑아졌다.', 'rest');
}
function doTrain(id) {
  var k = S.skills[id], g = 14 + effEye() * 2 + rnd(0, 6), up = 0;
  k.xp += g; while (k.s < 12 && k.xp >= need(k.s)) { k.xp -= need(k.s); k.s++; up++; }
  var t = esc(skn(id)) + '을(를) 되풀이해 익혔다.';
  if (up) t += ' <b>' + k.s + '성</b>에 이르렀다.';
  if (k.s >= 12) { k.s = 12; k.xp = 0; if (!P.master[id]) { P.master[id] = true; var mc = Object.keys(P.master).length; if (mc >= 1) ach('master1'); if (mc >= 5) ach('master5'); t += ' <b>대성.</b> 이 무공은 다음 생부터 몸이 먼저 기억한다.'; if (canBreak()) { S.insightBuff = true; t += ' 대성과 함께 벽이 얇아졌다.'; } } }
  var qg = qiGain(5 + S.realm * 2 + Math.floor(k.s / 3)); S.qi += qg; t += ' 내공이 <b>' + qg + '</b> 늘었다.';
  if (SK[id].mad > 0) { S.mad = clamp(S.mad + Math.round(5 * madMul()), 0, 100); t += ' 마기가 조금 올랐다.'; }
  sfx('train');
  afterAct(t, 'train');
}
function doMission(m, t) {
  var k = 1 + t * .5;
  fight(m.e, t * .9, { auto: true, title: m.n, win: function () {
    var s = Math.round(rnd(m.r[0], m.r[1]) * k), txt = m.n + '을(를) 마쳤다. 은전 <b>' + s + '</b>.';
    S.silver += s; if (Math.random() < .2) { S.items.pill++; txt += ' 전리품 속에서 회춘단 하나를 건졌다.'; }
    afterAct(txt, 'fight'); }, lose: function () { die('mission'); } });
}

/* ---- 경지 ---- */
function snap() { return { hp: maxHp(), ki: maxKi(), atk: Math.round(pAtk() * ATKM2[S.realm]), def: Math.round(pDef()) }; }
function realmUp(src) {
  var before = snap(); S.realm++; var r = S.realm; S.hp = maxHp(); S.insightBuff = false; P.stats.breaks++;
  if (RX[r] && RX[r].sk) learn(RX[r].sk);
  logE('realm', '<b>' + REALMS[r].n + '(' + REALMS[r].h + ')</b>에 도달했다.' + (src ? ' ' + src : ''));
  if (r === 3) ach('r3'); if (r === 6) ach('r5'); if (r === 8) ach('r8'); P.maxRealm = Math.max(P.maxRealm, r);
  return { r: r, before: before, after: snap(), src: src || '' };
}
function insightGain(p) { var g = qiGain(Math.max(10, Math.round((nextQ() - S.qi) * p))); if (S.qi >= nextQ()) g = qiGain(8 + S.realm * 3); S.qi += g; return g; }
function insightEnc(text) {
  if (canBreak()) { S.insightBuff = true; ach('insight'); done(text + ' <b>벽이 얇아졌다.</b> 다음 돌파 시련이 쉬워진다.', 'qi'); }
  else { var g = insightGain(.35); done(text + ' 내공이 <b>' + g + '</b> 늘었다.', 'qi'); }
}
var TRIAL_TXT = ['', '숨이 가빠지는 벽. 처음으로 몸 안의 기가 스스로 움직이려 한다.', '검을 쥔 손이 떨린다. 일류의 문턱에서 지난날의 겁이 형체를 얻었다.', '기를 바깥으로 뿜어내려는 순간, 마음속 그림자가 칼을 들었다.', '뼈가 비명을 지른다. 다시 태어나려면 지금의 나를 베어야 한다.', '늙음과 젊음의 경계. 시간이 거꾸로 흐르며 지난 생들이 덤벼든다.', '세 송이 꽃이 피려는 찰나, 다섯 기운이 서로를 삼키려 한다.', '삶과 죽음의 문 앞. 수없이 죽었던 당신 자신이 길을 막는다.', '하늘과 땅이 하나가 되려는 순간, 마지막 아집이 칼이 되어 남는다.'];
function doBreak() {
  var target = S.realm + 1, e = trialEnemy(target);
  pages('돌파 시련', [ps('내공이 차올라 벽에 닿았다. 가부좌를 틀고 눈을 감자 마음속에서 무언가가 일어섰다.', TRIAL_TXT[target] || '', S.insightBuff ? '<b>깨달음 덕분에 벽이 얇다.</b> 심마의 힘이 약해져 있다.' : '심마를 이기면 경지가 오른다. 지면 기가 역류한다.')], 'insight', function () {
    fight('heart', 0, { enemy: e, title: '돌파 시련', trial: true, heal: .2, spar: true,
      win: function () { var u = realmUp('심마를 베고 벽을 넘었다.'); sfx('gong'); cutscene(u, function () { S.msg = '<b>' + REALMS[u.r].n + '</b>에 올랐다. 세상이 한 겹 느려져 보인다.'; advance(); }); },
      lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); S.qi = Math.round(S.qi * .9); S.mad = clamp(S.mad + 12, 0, 100); logE('fail', '돌파에 실패했다. 기가 역류했다.');
        var tt = '심마에게 졌다. 역류한 기가 오장을 훑고 지나갔다. 내공이 조금 흩어졌다.'; if (S.mad >= 100) madCrisis(function () { S.msg = tt; advance(); }); else result('돌파 실패', tt, function () { S.msg = tt; advance(); }); } });
  });
}

/* ---- 회귀 ---- */
function die(id) { closeLife('death', id); }
function finish(id) { closeLife('end', id); }
function closeLife(kind, id) {
  var L = S, info = (kind === 'end' ? ENDINGS : DEATHS)[id];
  var body = kind === 'end' ? endText(id) : '<p>' + DEATHS[id][1] + '</p>';
  if (kind === 'death' && (id === 'eve' || id === 'eveDuel' || id === 'servant')) learnMem('eve');
  if (kind === 'death' && id === 'eve') learnMem('yeon');
  var trustSum = 0, sung = 0, k;
  for (k in L.trust) trustSum += L.trust[k];
  for (k in L.skills) { P.carry[k] = Math.max(P.carry[k] || 0, Math.floor(L.skills[k].s / 2)); sung += L.skills[k].s; }
  var first = kind === 'end' && !P.endings[id];
  var score = L.month * 8 + L.realm * 90 + L.kills * 10 + trustSum * 20 + sung * 3 + (kind === 'end' ? ENDINGS[id][1] : 0);
  var shards = Math.floor((Math.floor(score / 45) + (first ? 12 : 0)) * (P.hard ? 1.5 : 1));
  if (kind === 'end') P.endings[id] = (P.endings[id] || 0) + 1; else P.stats.deaths++;
  P.lives++; P.maxRealm = Math.max(P.maxRealm, L.realm); P.best = Math.max(P.best, score); P.shards += shards;
  if (kind === 'death') ach('first_death');
  if (kind === 'end') { var ne = Object.keys(P.endings).length; if (ne >= 4) ach('ending4'); if (ne >= Object.keys(ENDINGS).length) ach('ending8'); if (id === 'cheonma') ach('cheonmaEnd'); if (id === 'maengju') ach('maengjuEnd'); if (P.endings.cheonma && P.endings.maengju) ach('twoRoads'); if (P.hard) ach('hard'); if (id === 'true') { ach('cm'); P.trueDone = 1; } }
  if (P.lives >= 5) ach('lives5'); if (P.lives >= 10) ach('lives10');
  var mems = Object.keys(L.newMem).map(function (m) { return '<li><b>' + MEM[m][0] + '</b> ' + MEM[m][1] + '</li>'; }).join('');
  var carried = Object.keys(L.skills).filter(function (s) { return Math.floor(L.skills[s].s / 2) >= 2; }).map(function (s) { return esc(skn(s)) + ' ' + Math.floor(L.skills[s].s / 2) + '성'; }).join(', ');
  S = null; C = null; save();
  var ak = kind === 'end' ? (id === 'flee' && !L.flags.fleeWith ? 'flee1' : id) : 'death';
  bgm(kind === 'end' ? 'ending' : 'death');
  showEnd({ kind: kind, id: id, L: L, info: info, body: body, score: score, shards: shards, first: first, mems: mems, carried: carried, art: ak });
}
