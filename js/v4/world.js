/* 혈월회귀록 v4 — 갈림길(옛 결말)과 긴 삶의 끝. 청년기의 결말은 '전환점'이 되어 삶이 이어지고,
   진짜 결말은 수명이 다하거나 쓰러질 때 온다. 죽으면 회귀하지만, 시대 초입으로 되감을 수도 있다. */
var PATH_WORLD = { guard: 'ma', throne: 'ma', cheonma: 'ma', shadow: 'ma', betray: 'jeong', maengju: 'jeong', peace: 'jeong', flee: 'wander', burn: 'wander' };
var PATH_RANK = { guard: '호교', throne: '천마', cheonma: '천마', shadow: '그림자의 주인', betray: '맹의 검', peace: '화친사', maengju: '무림맹주', flee: '무명객', burn: '재야의 방랑자', 'true': '혈월을 끊은 자' };
var TURN_IDS = ['guard', 'throne', 'cheonma', 'shadow', 'betray', 'peace', 'maengju', 'flee', 'burn', 'true'];

/* 새 결말 등록: 세계 3 × 말로 5 + 진엔딩 2 */
var LEG_NAMES = { sect: '문파의 창시자', master: '스승', hermit: '은거 고수', wander: '떠돌이', mad: '마(魔)에 먹힌 자' };
var WORLD_NAMES = { ma: '마교', jeong: '정파', wander: '강호' };
['ma', 'jeong', 'wander'].forEach(function (w) {
  ['sect', 'master', 'hermit', 'wander', 'mad'].forEach(function (t) {
    ENDINGS['nat_' + w + '_' + t] = [({ ma: '혈월의 늙은 ', jeong: '백발의 ', wander: '강호의 늙은 ' })[w] + LEG_NAMES[t], 180 + (t === 'mad' ? 0 : 60)];
    var a = ({ ma: 'end_guard', jeong: 'end_maengju', wander: 'end_flee' })[w];
    ART['nat_' + w + '_' + t] = [({ sect: 'end_maengju', master: 'end_peace', hermit: 'wudang', wander: 'end_flee', mad: 'end_burn' })[t] || a, '', '50% 50%'];
  });
});
ENDINGS.nat_true = ['자기 이름으로 늙다', 600]; ART.nat_true = ['end_true', '', '50% 50%'];
ENDINGS.nat_true_fall = ['마지막까지 나의 이름으로', 420]; ART.nat_true_fall = ['end_true', 'f-dim', '50% 50%'];

function legacyType() {
  if (S.mad >= 90) return 'mad';
  if (S.sect && S.sect.lv >= 3) return 'sect';
  if ((S.disc || []).length >= 3) return 'master';
  if (S.realm >= 6) return 'hermit';
  return 'wander';
}
function legacyScore() { return (S.sect ? S.sect.lv * 60 : 0) + (S.disc || []).reduce(function (a, d) { return a + 10 + Math.floor(d.p / 4); }, 0) + Math.floor((S.silver || 0) / 400); }

var ENDTEXT4 = {}; /* 새 결말 본문: ENDTEXT4.id = function () { return ps('...', '...'); } */
function endText(id) {
  if (ENDTEXT4[id]) return ENDTEXT4[id]();
  if (id.indexOf('nat_') !== 0) return endTextV3(id);
  var F = S.flags, w = worldOf(), t = id === 'nat_true' || id === 'nat_true_fall' ? 'true' : legacyType(), a = age(), R = REALMS[S.realm].n, ds = (S.disc || []).map(function (d) { return d.n; });
  var p = [];
  if (id === 'nat_true') {
    p.push('혈월이 끊어진 뒤의 봄은 정말로 한 번씩만 왔다. 당신은 그 봄을 ' + (a - START_AGE) + '번 더 보았다.');
    p.push(a + '세의 겨울. 방 안에는 화로 하나와 낡은 목도 하나뿐이었다. ' + (ds.length ? ds.join(', ') + '이(가) 머리맡을 지켰다.' : '곁을 지키는 이는 없었지만 쓸쓸하지 않았다.'));
    p.push('눈을 감으면 다시 매화 지는 봄이 올 것 같았지만, 이번에는 오지 않았다. 처음으로, 이야기가 끝났다.');
    p.push('이 생은, 이름 없는 시종이 자기 이름으로 끝까지 산 생이었다.');
    return p.map(function (x) { return '<p>' + x + '</p>'; }).join('');
  }
  if (id === 'nat_true_fall') {
    p.push('돌아올 수 없는 몸이라는 것을 알면서도 칼을 놓지 않았다. ' + a + '세, ' + R + '의 몸이 쓰러졌다.');
    p.push('다음 봄은 오지 않는다. 그래서 마지막 한 합까지 온전히 당신의 것이었다.');
    p.push('이 생은, 되돌릴 수 없어서 더 빛난 생이었다.');
    return p.map(function (x) { return '<p>' + x + '</p>'; }).join('');
  }
  p.push(({ ma: '붉은 달이 걸린 혈월봉에서 ' + a + '세의 당신은 마지막 숨을 골랐다.', jeong: '흰 깃발이 나부끼는 맹의 뜰에서 ' + a + '세의 당신은 마지막 숨을 골랐다.', wander: '이름 모를 마을의 처마 밑에서 ' + a + '세의 당신은 마지막 숨을 골랐다.' })[w]);
  p.push(({
    sect: (S.sect ? '<b>' + esc(S.sect.n) + '</b>의 문도들이 뜰을 가득 메웠다. 당신이 세운 문파는 당신보다 오래 살아남을 것이다.' : '당신이 세운 문파의 문도들이 뜰을 메웠다.'),
    master: (ds.length ? ds.join(', ') + ' — 당신이 키운 제자들이 차례로 무릎을 꿇었다. 칼보다 사람을 남긴 삶이었다.' : '당신이 키운 제자들이 차례로 무릎을 꿇었다.'),
    hermit: R + '의 경지에 이른 고수는 누구에게도 제자를 두지 않은 채 산속 초막에서 조용히 눈을 감았다. 강호는 한동안 그의 이름을 몰랐다.',
    wander: '평생 칼 한 자루를 쥐고 떠돌았다. 남긴 것은 몇 개의 소문과 낡은 칼뿐이었다. 그래도 그 소문들은 오래 돌았다.',
    mad: '마기는 끝내 가라앉지 않았다. 눈이 붉어진 채 웃으며 쓰러진 노인의 곁에는 아무도 다가가지 못했다.'
  })[t]);
  p.push(({ sect: '이 생은, 이름을 새긴 문파를 남긴 생이었다.', master: '이 생은, 사람을 키워 낸 생이었다.', hermit: '이 생은, 홀로 높이 오른 생이었다.', wander: '이 생은, 끝까지 길 위에 있던 생이었다.', mad: '이 생은, 피에 삼켜진 생이었다.' })[t]);
  return p.map(function (x) { return '<p>' + x + '</p>'; }).join('');
}

/* 갈림길 → 전환점. 옛 결말에서 삶이 끝나지 않고 이어진다 */
function transition(id) {
  var L = S, info = ENDINGS[id], first = !P.endings[id], trustSum = 0, k;
  for (k in L.trust) trustSum += L.trust[k];
  var score = 36 * 8 + L.realm * 90 + L.kills * 10 + trustSum * 20 + (info[1] || 0);
  var shards = Math.floor((Math.floor(score / 45) + (first ? 12 : 0)) * (P.hard ? 1.5 : 1));
  P.endings[id] = (P.endings[id] || 0) + 1; P.shards += shards;
  if (id === 'cheonma') ach('cheonmaEnd'); if (id === 'maengju') ach('maengjuEnd');
  if (P.endings.cheonma && P.endings.maengju) ach('twoRoads');
  var ne = Object.keys(P.endings).length; if (ne >= 4) ach('ending4');
  if (id === 'true') { ach('cm'); P.trueDone = 1; }
  L.path = id; L.world = id === 'true' ? (L.route === 'jeong' ? 'jeong' : 'ma') : PATH_WORLD[id]; L.rank = PATH_RANK[id] || '';
  L.month = Math.max(L.month, YOUTH_END); L.inEvent = false;
  if (id === 'true') L.noReturn = true;
  if (id === 'throne' || id === 'cheonma') L.sect = { n: '천마신교', lv: 3, fixed: 1 };
  if (id === 'maengju') L.sect = { n: '무림맹', lv: 3, fixed: 1 };
  if (id === 'guard') L.sect = { n: '천마신교', lv: 1, fixed: 1 };
  if (id === 'shadow') L.sect = { n: '그림자 호법원', lv: 2, fixed: 1 };
  if (id === 'peace') L.sect = { n: '화친의 다리', lv: 2, fixed: 1 };
  if (id === 'betray') L.sect = { n: '무림맹', lv: 1, fixed: 1 };
  L.silver += 200; saveCheckpoint(); save();
  var ak = id === 'flee' && !L.flags.fleeWith ? 'flee1' : id; bgm('ending'); fx('bg', ak);
  scene('갈림길의 끝 · ' + info[0], endText(id) + '<div class="insight"><b>이야기는 계속된다</b>' + (id === 'true' ? '혈월의 굴레가 끊어졌다. <b>이제 죽으면 돌아오지 못한다.</b> 하지만 처음으로, 천수를 누릴 수 있다.' : '앞으로 <b>' + (MAXM / 12 - 3) + '년</b>이 남았다. 이 길이 만든 세계에서 삶이 이어진다.') + '<br>회귀력 조각 +' + shards + (first ? ' (첫 결말 보너스 포함)' : '') + '</div>',
    [{ t: '삶이 이어진다', c: 'primary', f: function () { bgm('hub'); S.msg = '<b>' + L.rank + '</b>. ' + age() + '세의 봄이 온다.'; chapterCard(chapIdx(S.month + 1), function () { S.month++; hub(); }); } }], ak);
}

function finish(id) {
  if (S && !S.path && S.month <= YOUTH_END + 1 && TURN_IDS.indexOf(id) >= 0) { transition(id); return; }
  closeLife('end', id);
}
function naturalEnd() {
  var id = S.path === 'true' ? 'nat_true' : 'nat_' + worldOf() + '_' + legacyType();
  scene('천수', '<p>' + age() + '세. 몸이 더는 칼을 따라 주지 않는다. 오래 걸어온 길의 끝이 가까워졌다.</p>', [{ t: '마지막 봄을 맞는다', c: 'primary', f: function () { closeLife('end', id); } }], 'night');
}

/* 죽음: 회귀하거나, 시대 초입으로 되감는다 */
function die(id) {
  var d = DEATHS[id] || ['쓰러지다', '숨이 멎었다.'];
  if (S && S.noReturn) { closeLife('end', 'nat_true_fall'); return; }
  if (S && S.month > YOUTH_END && P.cp && P.cp.S && P.cp.at === lifeNo() && P.shards >= rewindCost()) {
    var cost = rewindCost(), cp = P.cp; fx('bg', 'death'); bgm('death');
    scene('죽음의 문턱 · ' + d[0], '<p>' + d[1] + '</p><p class="dim">붉은 달이 어른거린다. 이대로 다시 봄으로 돌아갈 수도 있고, 회귀력 조각을 태워 <b>이 시대가 시작되던 때(' + age2(cp.month) + ')</b>로 되감을 수도 있다.</p>',
      [{ t: '시대 초입으로 되감는다', h: '조각 ' + cost + ' · 이 시대에서 얻은 것은 사라진다', c: 'primary', f: function () { P.shards -= cost; S = JSON.parse(JSON.stringify(cp.S)); S.alive = true; S.inEvent = false; C = null; logE('event', '되감기. 죽음의 문턱에서 시대 초입으로 돌아왔다.'); save(); bgm('hub'); hub('죽음의 문턱에서 되돌아왔다.'); } },
       { t: '그대로 회귀한다', h: '죽음을 받아들이고 다시 봄으로', f: function () { closeLife('death', id); } }], 'death');
    return;
  }
  closeLife('death', id);
}
function age2(m) { return ageOf(m) + '세'; }

/* 결말 정산 (v3의 closeLife를 긴 삶에 맞게 고쳤다) */
function closeLife(kind, id) {
  var L = S, info = (kind === 'end' ? ENDINGS : DEATHS)[id] || ['끝', '이야기가 끝났다.'];
  var body = kind === 'end' ? endText(id) : '<p>' + info[1] + '</p>';
  if (kind === 'death' && (id === 'eve' || id === 'eveDuel' || id === 'servant')) learnMem('eve');
  if (kind === 'death' && id === 'eve') learnMem('yeon');
  var trustSum = 0, sung = 0, k;
  for (k in L.trust) trustSum += L.trust[k];
  for (k in L.skills) { P.carry[k] = Math.max(P.carry[k] || 0, Math.floor(L.skills[k].s / 2)); sung += L.skills[k].s; }
  var first = kind === 'end' && !P.endings[id];
  var yrs = Math.floor(L.month / 12);
  var score = yrs * 24 + L.realm * 90 + L.kills * 4 + trustSum * 20 + sung * 3 + legacyScore() + (kind === 'end' ? (info[1] || 0) : 0) + (L.path ? 120 : 0);
  var shards = Math.floor((Math.floor(score / 45) + (first ? 12 : 0)) * (P.hard ? 1.5 : 1));
  if (kind === 'end') P.endings[id] = (P.endings[id] || 0) + 1; else P.stats.deaths++;
  P.lives++; P.maxRealm = Math.max(P.maxRealm, L.realm); P.best = Math.max(P.best, score); P.shards += shards; P.bestAge = Math.max(P.bestAge || 0, ageOf(L.month));
  if (kind === 'death') ach('first_death');
  if (kind === 'end') { var ne = Object.keys(P.endings).length; if (ne >= 4) ach('ending4'); if (ne >= Object.keys(ENDINGS).length) ach('ending8'); if (id === 'cheonma') ach('cheonmaEnd'); if (id === 'maengju') ach('maengjuEnd'); if (P.endings.cheonma && P.endings.maengju) ach('twoRoads'); if (P.hard) ach('hard'); if (id === 'true') { ach('cm'); P.trueDone = 1; } }
  if (P.lives >= 5) ach('lives5'); if (P.lives >= 10) ach('lives10');
  if (ageOf(L.month) >= 60) ach('age60'); if (ageOf(L.month) >= 80) ach('age80'); if (ageOf(L.month) >= 96) ach('age96');
  var mems = Object.keys(L.newMem).map(function (m) { return '<li><b>' + MEM[m][0] + '</b> ' + MEM[m][1] + '</li>'; }).join('');
  var carried = Object.keys(L.skills).filter(function (s) { return Math.floor(L.skills[s].s / 2) >= 2; }).map(function (s) { return esc(skn(s)) + ' ' + Math.floor(L.skills[s].s / 2) + '성'; }).join(', ');
  S = null; C = null; P.cp = null; save();
  var ak = kind === 'end' ? (id === 'flee' && !L.flags.fleeWith ? 'flee1' : id) : 'death';
  bgm(kind === 'end' ? 'ending' : 'death');
  showEnd({ kind: kind, id: id, L: L, info: info, body: body, score: score, shards: shards, first: first, mems: mems, carried: carried, art: ak });
}
ACH.age60 = ['환갑', '60세까지 살았다']; ACH.age80 = ['팔순', '80세까지 살았다']; ACH.age96 = ['천수', '96세까지 살았다'];

/* 긴 삶의 우연한 사건. LIFE에 {id, from, to, world, cond, w, once:'life'|'save', run}을 넣는다 */
var LIFE = [];
function lifeRate() { return .2; }
function lifeEvent() {
  if (Math.random() > lifeRate()) return false;
  var a = age(), w = worldOf(), pool = LIFE.filter(function (e) {
    if (e.from && a < e.from) return false; if (e.to && a > e.to) return false;
    if (e.world && e.world.indexOf(w) < 0) return false; if (e.cond && !e.cond()) return false;
    if (e.once === 'life' && S.flags['le_' + e.id]) return false;
    if (e.once === 'save' && P.encs && P.encs['le_' + e.id]) return false;
    var cd = e.cd || (e.once ? 0 : 48); if (cd && S.lastLE && S.lastLE[e.id] && S.month - S.lastLE[e.id] < cd) return false;
    return true;
  });
  if (!pool.length) return false;
  var tot = 0; pool.forEach(function (e) { tot += e.w || 1; });
  var r = Math.random() * tot, e = pool[0];
  for (var i = 0; i < pool.length; i++) { r -= pool[i].w || 1; if (r <= 0) { e = pool[i]; break; } }
  if (e.once === 'life') S.flags['le_' + e.id] = 1; if (e.once === 'save') { P.encs = P.encs || {}; P.encs['le_' + e.id] = 1; }
  S.lastLE = S.lastLE || {}; S.lastLE[e.id] = S.month; S.inEvent = true; e.run(); return true;
}

/* 새 생의 시작 값 */
var _newLife0 = newLife;
newLife = function () {
  _newLife0();
  S.acc = { ring: 0, charm: 0, belt: 0 }; S.mat = {}; S.disc = []; S.sect = null; S.estate = 0; S.lifeBonus = 0; S.stock = null; S.world = null; S.path = null; S.rank = ''; S.noReturn = false; S.lastLE = {};
  if (upL('mat')) { addMat('herb', upL('mat') * 3); addMat('iron', upL('mat') * 2); }
  P.cp = null;
};
UPG.push({ k: 'life', n: '장생의 기억', d: '수명 +1년', max: 5, cost: function (l) { return 18 + 12 * l; } });
UPG.push({ k: 'mat', n: '짐꾸러미', d: '시작 재료 (약초·정철) 증가', max: 5, cost: function (l) { return 10 + 6 * l; } });
function doMission(m, t) {
  var k = 1 + t * .5;
  fight(m.e, t * .9, { auto: true, title: m.n, win: function () {
    var s = Math.round(rnd(m.r[0], m.r[1]) * k), txt = m.n + '을(를) 마쳤다. 은전 <b>' + s + '</b>.';
    S.silver += s; if (Math.random() < .2) { S.items.pill++; txt += ' 전리품 속에서 회춘단 하나를 건졌다.'; }
    if (Math.random() < .35) { var mk = pick(['herb', 'hide', 'iron', 'bone']); addMat(mk, rnd(1, 2)); txt += ' ' + MATS[mk].n + '도 챙겼다.'; }
    afterAct(txt, 'fight'); }, lose: function () { die('mission'); } });
}

/* ---- 인물: 긴 삶에서의 보이기/죽음/옛 인연 방문 ---- */
NPC.dg.dead = 'dgDead'; NPC.hr.dead = 'hrDead'; NPC.mk.dead = 'mkDead'; NPC.yn.dead = 'ynDead'; NPC.kj.dead = 'masterDead'; NPC.cn.dead = 'cnDead'; NPC.hs.dead = 'hsDead'; NPC.nj.dead = 'njDead';
function alive(k) { var n = NPC[k]; return !(n && n.dead && S.flags[n.dead]); }
var _visibleNpc3 = visibleNpc;
visibleNpc = function () {
  if (!S || S.month <= YOUTH_END) return _visibleNpc3();
  var w = worldOf();
  return Object.keys(NPC).filter(function (k) {
    var n = NPC[k]; if (n.dead && S.flags[n.dead]) return false;
    if (n.world && n.world.indexOf(w) < 0) return false;
    if (n.when && !n.when()) return false;
    if (n.side === 'jeong' && w !== 'jeong' && !S.flags[n.flag]) return false;
    if (n.flag) return !!S.flags[n.flag];
    return n.keep !== false && (n.v4 ? !!S.flags['met_' + k] : true);
  });
};
/* 새 인물 등록: addNpc('xx', {n,role,desc,world,flag?}, visitFn) — 이름만 있으면 졸라맨이 그려진다 */
function addNpc(k, o, visit, ms) { o.v4 = true; NPC[k] = o; if (visit) VIS[k] = visit; MS[k] = ms || []; S && 0; }
function meet(k) { if (!S.flags['met_' + k]) { S.flags['met_' + k] = 1; logE('people', '<b>' + NPC[k].n + '</b>을(를) 알게 되었다.'); } }
/* 옛 인연을 늙어서 찾아갈 때 */
var OLDLINES = {
  dg: ['독고강은 이제 목도를 지팡이처럼 짚고 있다. 그래도 눈빛은 그대로다. “아직도 팔이 둘이냐. 건방지게.”', '독고강은 기침을 하다 말고 웃었다. “네가 이만큼 올 줄은 몰랐다. 아니, 알았지.”'],
  hr: ['홍란의 약방에서는 여전히 쓴 냄새가 난다. 손끝이 더 검푸르러졌다. “맥을 보자. 오래 못 가는 몸이라고 내가 말했었지.”', '홍란은 약절구를 내려놓고 오래 당신을 바라보았다. “살아 있어서 다행이야. 그것뿐이야.”'],
  mk: ['묵야는 눈이 없어도 당신이 늙은 것을 아는 듯했다. “발소리가 무거워졌군. 좋은 일이다.”'],
  yn: ['연이는 머리가 반쯤 세었다. 해진 소매를 꿰매던 손버릇은 그대로다. “이름 지어 주겠다던 약속, 아직 안 잊었어.”', '연이와 마주 앉아 식은 차를 나눠 마셨다. 말이 없어도 편했다.'],
  kj: ['교주의 자리를 이은 지 오래다. 위무강의 그림자는 아직도 대전 어딘가에 서 있는 것 같다.'],
  cn: ['철노의 대장간은 불이 꺼질 줄 모른다. “쇠는 늙지 않는다. 사람만 늙지.”'],
  hs: ['한서생은 서고의 먼지 속에서 여전히 책을 외우고 있다. “이 책은 네가 쓴 거냐? 아니, 곧 쓰게 되겠지.”'],
  nj: ['남궁진은 매일 새벽 같은 자리에서 검을 휘두른다. 천 번이 아니라 이제는 백 번이지만 검은 조금도 흐트러지지 않는다.'],
  sm: ['사마령은 지붕 위에서 내려오지 않은 채 말했다. “아직도 눈에 띄는군. 그림자는 늙지 않아.”'],
  bw: ['백운이 반듯한 자세로 찻잔을 내밀었다. “이 칼 쓰는 법은 옛날 그대로야. 사람만 바뀌었지.”']
};
['dg', 'hr', 'mk', 'yn', 'kj', 'cn', 'hs', 'nj', 'sm', 'bw'].forEach(function (k) {
  var old = VIS[k];
  VIS[k] = function () {
    if (S.month <= YOUTH_END) return old();
    var lines = OLDLINES[k] || ['옛 얼굴과 마주 앉았다.'];
    scene(NPC[k].n, npcHead(k) + '<p>' + pick(lines) + '</p>', [
      { t: '안부를 나누며 차를 마신다', h: '체력 · 마기 회복', f: function () { S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .25)); S.mad = Math.max(0, S.mad - 12); gain(k, 1, '오래 묵은 이야기를 나누었다. 몸보다 마음이 먼저 풀렸다.'); } },
      { t: '한 수 가르침을 청한다', h: '내공 ' + (tr(k) >= 2 ? '+' + qiGain(10 + S.realm * 4) : '(신뢰 2 필요)'), off: tr(k) >= 2 ? null : '아직 그만한 사이가 아니다', f: function () { var q = qiGain(10 + S.realm * 4); S.qi += q; gain(k, 1, '말 몇 마디에 막혀 있던 곳이 풀렸다. 내공이 <b>' + q + '</b> 늘었다.'); } },
      { t: '돌아간다', f: function () { hub(); } }
    ]);
  };
});
