/* 혈월회귀록 v3 — 화면. 모든 화면은 show(html)로 그려지고, 버튼은 btn()으로 만들면 data-i로 연결된다. */
IC.sound='<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>';IC.mute='<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>';
var IMG_DIR = 'assets/img/';
var FILT = { 'f-dim': 1, 'f-dawn': 1, 'f-blood': 1, 'f-gold': 1, 'f-jade': 1, 'f-crimson': 1, 'f-void': 1, 'f-fire': 1, 'f-ash': 1 };
function art(kind) { var a = ART[kind] || ART.r0; return '<div class="art' + (a[1] ? ' ' + a[1] : '') + '" style="background-image:url(' + IMG_DIR + a[0] + '.webp);background-position:' + a[2] + '"></div>'; }
function imgUrl(k) { return 'url(' + IMG_DIR + k + '.webp)'; }
function ppic(k, cls) { return PT[k] ? '<span class="' + cls + '" style="background-image:' + imgUrl(PT[k]) + '"></span>' : '<span class="' + cls + ' gl">' + (NG[k] || GLY[k] || '人') + '</span>'; }
function ico(k) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[k] || '') + '</svg>'; }
var LI = { train: 'tile_train', qi: 'tile_meditate', rest: 'tile_rest', fight: 'tile_mission', people: 'tile_social', realm: 'tile_break', fail: 'tile_break', item: 'tile_shop', skill: 'tile_train', event: 'insight' };

function btn(t, fn, o) {
  o = o || {}; var i = H.push(fn) - 1;
  return '<button class="btn ' + (o.c || '') + '" data-i="' + i + '"' + (o.off ? ' disabled' : '') + '>' + (o.ic ? '<span class="ico">' + ico(o.ic) + '</span>' : '') +
    '<span class="bt"><span class="bl">' + t + '</span>' + ((o.h || o.off) ? '<small>' + (o.off || o.h) + '</small>' : '') + '</span>' + (o.r ? '<span class="br">' + o.r + '</span>' : '') + '</button>';
}
function show(build) {
  H = []; var html = build();
  if ($app) { $app.innerHTML = html; try { window.scrollTo(0, 0); } catch (e) {} }
  try { if (document.documentElement && document.documentElement.setAttribute) document.documentElement.setAttribute('data-realm', S ? S.realm : 0); } catch (e) {}
  save();
}
if ($app && $app.addEventListener) $app.addEventListener('click', function (e) { var b = e.target && e.target.closest ? e.target.closest('button[data-i]') : null; if (!b || b.disabled) return; var f = H[+b.dataset.i]; if (f) { sfx('click'); f(); } });

function bar(label, v, max, cls, txt) { return '<div class="row"><span class="rl"><i class="gem ' + cls + '"></i>' + label + '</span><div class="bar"><i class="' + cls + '" style="width:' + clamp(max ? v / max * 100 : 0, 0, 100) + '%"></i></div><b>' + txt + '</b></div>'; }
function ph(t) { return '<div class="ph"><i></i><span>' + t + '</span><i></i></div>'; }
function logRow(e) { return '<div class="le"><span class="li" style="background-image:' + imgUrl(LI[e.k] || 'insight') + '"></span><div class="lt"><em>[' + e.m + '개월]</em>' + e.t + '</div></div>'; }
function soundBtn() { var i = H.push(function () { P.settings.mute = !P.settings.mute; try { Sound.setMute(P.settings.mute); } catch (e) {} save(); var b = document.getElementById('sndb'); if (b) b.innerHTML = P.settings.mute ? ico('mute') : ico('sound'); })-1; return '<button class="nv snd" id="sndb" data-i="' + i + '" aria-label="소리 켜기/끄기">' + (P.settings.mute ? ico('mute') : ico('sound')) + '</button>'; }
function topbar() { return '<header class="top"><div class="logo"><b>혈월회귀록</b><span class="lseal">血月</span><small>피로 물든 회귀, 천하를 다시 쓴다</small></div><div class="res"><span title="회귀력 조각"><i class="ri" style="background-image:' + imgUrl(TL.brk) + '"></i>' + P.shards + '</span>' + (S ? '<span><i class="coin"></i>' + S.silver + '</span>' : '') + soundBtn() + '</div></header>'; }
function nav(act) {
  var it = [['hub', '상태', 'home', function () { hub(); }], ['skill', '무공', 'train', function () { info(); }], ['people', '인연', 'people', function () { peopleView(); }], ['log', '기록', 'scroll', function () { logView(); }], ['menu', '메뉴', 'book', function () { title(); }]];
  return '<nav class="nav">' + it.map(function (x) { var i = H.push(x[3]) - 1; return '<button class="nv' + (act === x[0] ? ' on' : '') + '" data-i="' + i + '">' + ico(x[2]) + '<span>' + x[1] + '</span></button>'; }).join('') + '</nav>';
}
function visibleNpc() { return Object.keys(NPC).filter(function (k) { var n = NPC[k]; if (n.dead && S.flags[n.dead]) return false; if (S.route === 'jeong') { if (k !== 'bw' && n.side !== 'jeong') return false; } else if (n.side === 'jeong') return false; if (n.flag) return !!S.flags[n.flag]; return S.month >= n.from || (k === 'mk' && hasMem('muk')); }); }
function personBtn(k) { var i = H.push(function () { VIS[k](); }) - 1; return '<button class="btn person" data-i="' + i + '">' + ppic(k, 'pp') + '<span class="bt"><span class="bl">' + NPC[k].n + '<em>' + NPC[k].role + '</em></span><span class="tb"><i style="width:' + Math.min(100, tr(k) * 25) + '%"></i></span><small>신뢰 ' + tr(k) + ' · ' + NPC[k].desc + '</small></span></button>'; }
function npcHead(k) { return '<div class="npc-h">' + ppic(k, 'pp') + '<div><b>' + NPC[k].n + '</b><span class="dim">' + NPC[k].role + ' · 신뢰 ' + tr(k) + '</span></div></div>'; }
function tile(label, fn, img, hint, o) { o = o || {}; var i = H.push(fn) - 1; return '<button class="btn tile' + (o.glow ? ' glow' : '') + '" data-i="' + i + '"' + (o.off ? ' disabled' : '') + '><span class="ta" style="background-image:' + imgUrl(img) + '"></span><span class="bt"><span class="bl">' + label + '</span><small>' + hint + '</small></span></button>'; }
function itemsHtml() { return '<span>회춘단 <b>' + S.items.pill + '</b></span><span>해독단 <b>' + S.items.antidote + '</b></span>' + (S.items.calm ? '<span>정심환 <b>' + S.items.calm + '</b></span>' : '') + (S.items.letter ? '<span>밀서 <b>1</b></span>' : '') + '<span>운철 <b>' + (S.items.ore || 0) + '</b></span><span>병기 <b>' + WEAP[S.weapon].n + '</b></span><span>방어구 <b>' + ARMOR[S.armor || 0].n + '</b></span>'; }
function statLine() { return '<div class="stl"><span>공격 <b>' + Math.round(pAtk() * ATKM2[S.realm]) + '</b></span><span>방어 <b>' + Math.round(pDef()) + '</b></span><span>치명 <b>' + Math.round(critRate() * 100) + '%</b></span><span>진기 <b>' + maxKi() + '</b></span></div>'; }
function statusHtml() {
  var R = REALMS[S.realm], nx = S.realm < REALMS.length - 1 ? REALMS[S.realm + 1].q : null, base = R.q;
  var pct = nx ? clamp((S.qi - base) / (nx - base) * 100, 0, 100) : 100;
  var stage = canBreak() ? '벽 앞' : (nx ? ['초입', '소성', '대성', '원만'][Math.min(3, Math.floor(pct / 25))] : '극의');
  var cells = ''; for (var i = 1; i <= 36; i++) cells += '<i class="' + ((i === 18 || i === 30) ? 'e' : (i < S.month ? 'p' : (i === S.month ? 'n' : ''))) + '"></i>';
  var left = 18 - S.month, ci = chapInfo(chapIdx(S.month));
  return '<div class="pn stp" style="grid-area:st">' + ph(ci[1] + ' · ' + ci[2]) +
    '<div class="lab">회귀 ' + lifeNo() + '회차' + (S.route ? ' · <b class="rt ' + S.route + '">' + routeName() + '</b>' : '') + ' · 현재 경지</div><div class="rname">' + R.n + ' <span>(' + R.h + ')</span></div><div class="rsub">[ ' + stage + ' · ' + monthLabel() + ' ]</div>' +
    '<div class="bars">' + bar('체력', S.hp, maxHp(), 'hp', S.hp + ' / ' + maxHp()) + bar('내공', nx ? S.qi - base : 1, nx ? nx - base : 1, 'qi', nx ? S.qi + ' / ' + nx : String(S.qi)) + bar('마기', S.mad, 100, 'mad', S.mad + ' / 100') + '</div>' + statLine() +
    '<div class="prog"><div class="prog-h">경지 진행도<b>' + pct.toFixed(1) + '%</b></div><div class="prog-t"><div class="prog-f" style="width:' + pct + '%"></div>' +
    [0, 33.33, 66.66, 100].map(function (p) { return '<i class="' + (pct >= p - .01 ? 'on' : '') + '" style="left:' + p + '%"></i>'; }).join('') + '</div><div class="prog-l"><span>초입</span><span>소성</span><span>대성</span><span>원만</span></div></div>' +
    '<div class="cal"><div class="track">' + cells + '</div><div class="track-l"><span>봄</span><span class="red">' + (left > 0 ? '혈월까지 ' + left + '개월' : (left === 0 ? '혈월의 밤' : (S.month < 30 ? '정사대전까지 ' + (30 - S.month) + '개월' : (S.month === 30 ? '정사대전' : '끝까지 ' + (36 - S.month) + '개월')))) + '</span><span>천마총</span></div></div>' +
    '<div class="meta">' + itemsHtml() + '</div></div>';
}
function miniStatus() { return '<div class="mini"><span>' + REALMS[S.realm].n + '</span><span>체력 <b>' + S.hp + '/' + maxHp() + '</b></span><span>내공 <b>' + S.qi + '</b></span><span>마기 <b>' + S.mad + '</b></span><span>은전 <b>' + S.silver + '</b></span><span>' + monthLabel() + '</span></div>'; }
function scene(title, body, choices, kind) {
  if (kind) fx('bg', kind);
  show(function () { return '<section class="scene">' + (kind ? '<div class="sb">' + art(kind) + '</div>' : '') + (title ? '<h2>' + title + '</h2>' : '') + (S ? miniStatus() : '') + '<div class="prose">' + body + '</div><div class="stack">' +
    choices.map(function (c) { return btn(c.t, c.f, { h: c.h, off: c.off, c: c.c }); }).join('') + '</div></section>'; });
}
function result(title, body, cont, kind) { scene(title, body, [{ t: '계속', f: cont, c: 'primary' }], kind); }
function pages(title, arr, kind, done) { var i = 0; (function nx() { if (i >= arr.length) { done(); return; } var h = typeof arr[i] === 'function' ? arr[i]() : arr[i]; i++; scene(title, h, [{ t: i < arr.length ? '다음' : '계속', c: 'primary', f: nx }], kind); })(); }
function chapterCard(i, go) { var c = chapInfo(i); fx('ink'); sfx('gong'); scene(c[1] + ' · ' + c[2], '<p class="chap">' + c[3] + '</p>', [{ t: '계속', c: 'primary', f: go }], 'ch' + (i + 1)); }
function cutscene(u, cont) {
  var r = u.r, R = REALMS[r], X = RX[r] || {}, b = u.before, a = u.after;
  fx('bg', 'r' + r); bgm('story');
  show(function () {
    var rows = [['체력', 'hp'], ['진기', 'ki'], ['공격력', 'atk'], ['방어력', 'def']].map(function (x) { return '<div class="gr"><span>' + x[0] + '</span><b class="cnt" data-from="' + b[x[1]] + '" data-to="' + a[x[1]] + '">' + a[x[1]] + '</b><em>+' + Math.max(0, a[x[1]] - b[x[1]]) + '</em></div>'; }).join('');
    var un = ''; if (X.p) un += '<div class="unl pas"><i>경지 패시브</i><b>' + X.p[0] + '</b><span>' + X.p[1] + '</span></div>';
    if (X.sk) un += '<div class="unl"><i>새 절초</i><b>' + SK[X.sk].n + '</b><span>' + SK[X.sk].d + '</span></div>';
    (X.ev || []).forEach(function (v) { un += '<div class="unl"><i>기본기 진화</i><b>' + v[0] + ' → ' + v[1] + '</b><span>' + v[2] + '</span></div>'; });
    return '<section class="cut pn"><div class="cut-art">' + art('r' + r) + '<div class="cut-top">경지 달성!</div><div class="vtw"><div class="vt">' + R.n + '</div><div class="vs">' + R.h + '</div></div><div class="cap">' + (u.src ? '<b>' + u.src + '</b><br>' : '') + REALMS[r - 1].n + ' → ' + R.n + '</div></div>' +
      '<div>' + ph('성장') + '<div class="grow">' + rows + '</div></div>' + (un ? '<div class="unls">' + un + '</div>' : '') + '<div class="stack">' + btn('확인', cont, { c: 'primary' }) + '</div></section>';
  });
  fx('realmUp', r); countUp();
}
function countUp() {
  try { if (!$app || !$app.querySelectorAll || !P.settings.fx) return; var els = $app.querySelectorAll('.cnt');
    Array.prototype.forEach.call(els, function (el) { var a = +el.getAttribute('data-from'), b = +el.getAttribute('data-to'), t0 = performance.now(); el.textContent = a;
      (function f(t) { var k = Math.min(1, (t - t0 - 500) / 1000); if (k < 0) { requestAnimationFrame(f); return; } el.textContent = Math.round(a + (b - a) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0); });
  } catch (e) {}
}

/* ---- 거점 ---- */
var FLAV2 = FLAV;
function hub(msg) {
  if (msg !== undefined) S.msg = msg;
  var m = S.msg; S.msg = ''; fx('bg', 'r' + S.realm); fx('aura', S.realm); bgm('hub');
  var cap = (m || pick(FLAV2[Math.floor(((S.month - 1) % 12) / 3)])) + (news() ? '<div class="news">소문 · ' + news() + '</div>' : '');
  show(function () {
    var R = REALMS[S.realm], nx = S.realm < REALMS.length - 1 ? REALMS[S.realm + 1].q : null;
    var heroC = '<div class="pn hc" style="grid-area:hero"><div class="hc-art">' + art('r' + S.realm) + '<div class="vtw"><div class="vt">' + R.n + '</div><div class="vs">' + R.h + '</div></div><div class="cap">' + cap + '</div></div></div>';
    var wall = '<div class="pn wall" style="grid-area:wall">' + ph('경지의 벽') + '<div class="wall-b"><span class="cr" style="background-image:' + imgUrl(TL.brk) + '"></span><div style="flex:1;min-width:0"><div class="wq">' + S.qi + (nx ? ' <span>/ ' + nx + '</span>' : '') + '</div><div class="sm dim">' +
      (nx ? (canBreak() ? '벽에 닿았다. <b>돌파 시련</b>에서 심마를 이기면 ' + REALMS[S.realm + 1].n + '에 오른다.' + (S.insightBuff ? ' <b class="gd2">깨달음으로 벽이 얇다.</b>' : '') : '다음 경지 ' + REALMS[S.realm + 1].n + '까지 내공 ' + (nx - S.qi) + ' · 운기, 수련, 전투, 기연으로 쌓인다') : '더 오를 경지가 없다') + '</div><div class="bar"><i class="foe" style="width:' + (nx ? clamp(S.qi / nx * 100, 0, 100) : 100) + '%"></i></div></div></div>' +
      (nx ? btn('돌파 시련', doBreak, { c: 'primary', off: canBreak() ? null : '내공이 모자란다', h: canBreak() ? '심마 · 체력 ' + trialEnemy(S.realm + 1).hp + ' · 지면 기가 역류한다' : null }) : '') + '</div>';
    var acts = '<div class="acts" style="grid-area:acts">' + tile('운기조식', meditate, TL.meditate, '내공 +' + qiGain(12 + S.realm * 4)) + tile('수련', trainMenu, TL.train, '무공 성 · 내공') + tile('휴식', rest, TL.rest, '체력 · 마기 회복') +
      tile('교류', visitMenu, TL.social, '인연과 가르침') + tile('탐색', exploreMenu, TL.explore, '기연과 깨달음') + tile('의뢰', missionMenu, TL.mission, '은전과 실전') + tile('저잣거리', shop, TL.shop, '시간이 들지 않는다') + '</div>';
    var lg = (S.log || []).slice(0, 5);
    var logp = '<div class="pn logp" style="grid-area:log">' + ph('강호 기록') + (lg.length ? lg.map(logRow).join('') : '<p class="sm dim" style="text-align:center">아직 기록이 없다.</p>') + '<div class="more">' + btn('더 보기', logView, { c: 'ghost' }) + '</div></div>';
    var ppl = '<div class="pn ppl" style="grid-area:ppl">' + ph('인연') + '<div class="plist">' + visibleNpc().map(personBtn).join('') + '</div><p class="sm dim" style="margin:10px 0 0;text-align:center">만나러 가면 한 달이 지난다.</p></div>';
    var more = '<div class="pn more2" style="grid-area:more">' + ph('행낭') + '<div class="meta" style="margin:0 0 12px">' + itemsHtml() + '</div><div class="grid2">' + btn('무공', info, { ic: 'book', h: '피해량 · 패시브' }) + btn('타이틀', title, { ic: 'home', h: '진행은 저장된다' }) + '</div></div>';
    return topbar() + '<div class="hub">' + heroC + statusHtml() + wall + acts + logp + ppl + more + '</div>' + nav('hub');
  });
}
function skillRows(list) {
  return list.map(function (k) { var s = S.skills[k], m = SK[k];
    var dmg = m.passive ? '—' : (function () { var per = Math.max(1, Math.round(pAtk() * skillMul(k))), h = m.hits || 1; return (h > 1 ? per + '×' + h : String(per)); })();
    return '<tr><td><b>' + esc(skn(k)) + '</b> <span class="dim">' + m.t + ' · ' + s.s + '성' + (s.s >= 12 ? ' 대성' : '') + '</span><br><span class="dim sm">' + m.d + '</span></td><td class="num">' + (m.passive ? '<span class="dim">패시브</span>' : '<b>' + dmg + '</b><br><span class="dim sm">진기 ' + m.cost + '</span>') + '</td></tr>'; }).join('');
}
function info() {
  fx('bg', 'r' + S.realm);
  show(function () {
    var ks = Object.keys(S.skills); var act = ks.filter(function (k) { return !SK[k].passive; }), pas = ks.filter(function (k) { return SK[k].passive; });
    var basic = ['atk', 'parry', 'dodge'].map(function (a) { var r = resolve(a, null, a === 'atk' ? 'feint' : (a === 'parry' ? 'rapid' : 'strong')); return '<tr><td><b>' + actName(a) + '</b> <span class="dim">기본기</span><br><span class="dim sm">' + ({ atk: '허초와 운기를 벤다', parry: '연타를 흘리고 반격한다', dodge: '강타를 피한다' })[a] + '</span></td><td class="num"><b>' + Math.max(0, Math.round(pAtk() * r.mul * r.em)) + '</b><br><span class="dim sm">맞대응 시</span></td></tr>'; }).join('');
    return topbar() + '<div class="solo"><div class="pn">' + ph('능력치') + statLine() + '<p class="sm dim" style="margin:8px 0 0">피해 = 공격력 × 배율 − 적 방어 × 0.5 · 받는 피해 = 적 공격 − 방어 × 0.6</p></div>' +
      '<div class="pn">' + ph('무공 · 기준 피해') + '<table class="tbl">' + basic + skillRows(act) + skillRows(pas) + '</table><p class="sm dim" style="margin:8px 0 0">기준 피해는 방어가 없는 상대에게 맞대응했을 때의 한 번 피해예요. 실제 피해는 전투 버튼에 상대별로 보여요.</p></div>' +
      '<div class="pn">' + ph('경지 패시브') + '<div class="psv">' + RX.map(function (x, i) { if (!x.p) return ''; return '<div class="' + (i <= S.realm ? '' : 'lock') + '"><b>' + REALMS[i].n + ' · ' + x.p[0] + '</b>' + x.p[1] + '</div>'; }).join('') + '</div></div>' +
      '<div class="pn">' + ph('싸움의 이치') + '<p class="sm" style="margin:0">강타는 피하고, 연타는 흘리고, 허초와 운기는 벤다. 무공은 진기를 쓰는 공격이라 허초와 운기에 가장 잘 먹힌다. 지난 생에 싸워 본 상대는 수가 정확히 읽힌다. 경지를 넘으려면 돌파 시련에서 심마를 이겨야 한다.</p></div>' +
      '<div class="stack">' + btn('수련하러 간다', trainMenu, { ic: 'train', h: '한 달이 지난다' }) + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></div>' + nav('skill');
  });
}
function peopleView() { show(function () { return topbar() + '<div class="solo"><div class="pn">' + ph('인연') + '<div class="plist">' + visibleNpc().map(personBtn).join('') + '</div><p class="sm dim" style="margin:10px 0 0;text-align:center">만나러 가면 한 달이 지난다. 신뢰가 쌓이면 가르침과 비밀을 얻는다.</p></div><div class="stack">' + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></div>' + nav('people'); }); }
function logView() {
  show(function () {
    var mem = Object.keys(P.mem).map(function (k) { return '<li><b>' + MEM[k][0] + '</b> ' + MEM[k][1] + '</li>'; }).join('') || '<li>아직 지난 생의 기억이 없다.</li>';
    return topbar() + '<div class="solo"><div class="pn">' + ph('강호 기록') + ((S.log || []).map(logRow).join('') || '<p class="sm dim">아직 기록이 없다.</p>') + '</div><div class="pn">' + ph('지난 생의 기억') + '<ul class="mem">' + mem + '</ul></div><div class="stack">' + btn('삽화와 결말 도감', codex, { ic: 'book' }) + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></div>' + nav('log');
  });
}
function trainMenu() {
  show(function () {
    var list = Object.keys(S.skills).map(function (k) { var s = S.skills[k]; return btn(esc(skn(k)) + ' · ' + s.s + '성', function () { doTrain(k); }, { off: s.s >= 12 ? '대성했다' : null, h: SK[k].t + ' · 숙련 ' + s.xp + ' / ' + need(s.s) + (SK[k].passive ? '' : ' · 성마다 피해 +7%') }); }).join('');
    return '<section class="scene"><h2>수련</h2>' + miniStatus() + '<p class="sm dim" style="text-align:center;margin:-6px 0 12px">수련하면 무공 숙련과 내공이 함께 오른다. 한 달이 지난다.</p><div class="stack">' + list + btn('돌아간다', function () { hub(); }) + '</div></section>';
  });
}
function missionMenu() {
  var t = Math.min(S.realm, 6), k = 1 + t * .5;
  var L = [(S.route === 'jeong' ? { n: '마교 잔당 소탕', d: '산 아래로 흩어진 마교 잔당을 쫓는다.', e: 'junior', r: [22, 38] } : { n: '외곽 순찰', d: '산문 주변에 정파 척후가 어른거린다.', e: 'scout', r: [20, 36] }),
    { n: '약초 채집', d: '절벽 아래 약초밭. 늑대 울음이 들린다.', e: 'wolf', r: [16, 30] }, { n: '상단 호위', d: '변방 상단을 지나 산적 두목을 친다.', e: 'bandit', r: [34, 60] }];
  show(function () {
    return '<section class="scene"><h2>의뢰</h2>' + miniStatus() + '<div class="stack">' + L.map(function (m) { var e = mkEnemy(m.e, t * .9), lo = Math.round(m.r[0] * k), hi = Math.round(m.r[1] * k);
      return btn(m.n, function () { doMission(m, t); }, { h: m.d + ' · 은전 ' + lo + '~' + hi, r: '<b>' + e.n + '</b><span>체력 ' + e.max + ' · 공 ' + Math.round(e.atk) + '</span>' }); }).join('') +
      (S.flags.arena && S.route !== 'jeong' ? ((S.arena || 0) < 5 ? btn('혈투장 · ' + (5 - (S.arena || 0)) + '위 도전', function () { doArena(S.arena || 0); }, { h: '상금 ' + ARENA[S.arena || 0][1] + '냥 · 져도 죽지는 않는다', r: (function () { var a = ARENA[S.arena || 0], e = mkEnemy(a[0], Math.max(0, S.realm * .5 - .2 + (S.arena || 0) * .15)); return '<b>' + e.n + '</b><span>체력 ' + e.max + ' · 공 ' + Math.round(e.atk) + '</span>'; })() }) : '<div class="note sm">혈투장의 왕좌는 이미 당신의 것이다.</div>') : '') +
      btn('돌아간다', function () { hub(); }) + '</div></section>';
  });
}
function visitMenu() { var list = visibleNpc(); show(function () { return '<section class="scene"><h2>교류</h2>' + miniStatus() + '<div class="plist">' + list.map(personBtn).join('') + '</div><div class="stack" style="margin-top:10px">' + btn('돌아간다', function () { hub(); }) + '</div></section>'; }); }
function exploreMenu() {
  show(function () {
    return '<section class="scene"><h2>탐색</h2>' + miniStatus() + '<div class="locs">' + Object.keys(LOCS).map(function (k) { var L = LOCS[k], op = L.open(), i = H.push(function () { explore(k); }) - 1;
      return '<button class="btn loc" data-i="' + i + '"' + (op ? '' : ' disabled') + '><span class="la">' + art('loc_' + k) + '</span><span class="bt"><span class="bl">' + L.n + '</span><small>' + (op ? L.d : '잠김 · ' + L.lock) + '</small></span></button>'; }).join('') +
      '</div><p class="sm dim" style="text-align:center;margin:10px 0">탐색하면 한 달이 지난다.</p><div class="stack">' + btn('돌아간다', function () { hub(); }) + '</div></section>';
  });
}
function shop() {
  show(function () {
    var items = [
      { n: '회춘단', p: 40, h: '체력 40% 회복. 싸움 중 사용 · 보유 ' + S.items.pill, ok: S.items.pill < 5, f: function () { S.items.pill++; } },
      { n: '정심환', p: 60, h: '마기가 100이 될 때 자동으로 복용 · 보유 ' + S.items.calm, ok: S.items.calm < 3, f: function () { S.items.calm++; } },
      { n: '내공단', p: 120, h: '내공 +30 · 이번 생에 ' + (3 - (S.flags.pillQi || 0)) + '번 남음', ok: (S.flags.pillQi || 0) < 3, f: function () { S.qi += 30; S.flags.pillQi = (S.flags.pillQi || 0) + 1; } },
      { n: '철도', p: 70, h: '공격력 +4', ok: S.weapon < 1, f: function () { S.weapon = 1; } },
      { n: '흑철도', p: 170, h: '공격력 +9 (철도 필요)', ok: S.weapon === 1, f: function () { S.weapon = 2; } },
      { n: '가죽갑', p: 60, h: '방어력 +2 · 최대 체력 +12', ok: (S.armor || 0) < 1, f: function () { S.armor = 1; } }];
    return '<section class="scene"><h2>저잣거리</h2>' + miniStatus() + '<div class="stack">' + items.map(function (it) { return btn(it.n + ' · ' + it.p + '냥', function () { S.silver -= it.p; it.f(); sfx('coin'); logE('item', '<b>' + it.n + '</b>을(를) 샀다.'); shop(); }, { off: !it.ok ? '지금은 살 수 없다' : (S.silver < it.p ? '은전이 모자란다' : null), h: it.h }); }).join('') +
      '</div>' + forgeHtml() + '<div class="stack" style="margin-top:12px">' + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></section>';
  });
}
function forgeHtml() {
  if (!S.flags.cn && S.route !== 'jeong') return '';
  var dc = S.flags.forgeDisc && S.route !== 'jeong' ? .8 : 1;
  var fg = [
    { n: '혈철도 단조', ok: S.weapon === 2, s: 260, o: 2, h: '공격력 +15 (흑철도 필요)', f: function () { S.weapon = 3; } },
    { n: '천마도 단조', ok: S.weapon === 3, need: (tr('cn') >= 3 || S.route === 'jeong') ? null : '철노 신뢰 3 필요', s: 420, o: 4, h: '공격력 +23 (혈철도 필요)', f: function () { S.weapon = 4; } },
    { n: '흑린갑 제작', ok: (S.armor || 0) === 1, s: 150, o: 1, h: '방어력 +5 · 최대 체력 +28 (가죽갑 필요)', f: function () { S.armor = 2; } },
    { n: '천잠보의 제작', ok: (S.armor || 0) === 2, need: (tr('cn') >= 4 || (S.route === 'jeong' && tr('nj') >= 2)) ? null : (S.route === 'jeong' ? '남궁진 신뢰 2 필요' : '철노 신뢰 4 필요'), s: 320, o: 3, h: '방어력 +9 · 최대 체력 +50 (흑린갑 필요)', f: function () { S.armor = 3; } }];
  return '<div class="forge">' + ph(S.route === 'jeong' ? '무림맹 대장간' : '철노의 대장간') + '<div class="stack">' + fg.map(function (x) { var c = Math.round(x.s * dc);
    return btn(x.n + ' · ' + c + '냥 · 운철 ' + x.o, function () { S.silver -= c; S.items.ore -= x.o; x.f(); sfx('coin'); logE('item', '<b>' + x.n.split(' ')[0] + '</b>을(를) 얻었다.'); shop(); }, { off: !x.ok ? '지금은 만들 수 없다' : (x.need || (S.silver < c ? '은전이 모자란다' : ((S.items.ore || 0) < x.o ? '운철이 모자란다' : null))), h: x.h }); }).join('') + '</div></div>';
}

/* ---- 전투 화면 ---- */
function renderFight() {
  var e = C.e, o = C.o;
  show(function () {
    var chips = C.hint.map(function (k) { var d = intentDmg(e, k); return '<span class="chip">' + INT[k].n + '<small>' + (e.charged && k === 'strong' ? '충전된 일격' : INT[k].d) + (d ? ' · 예상 <b>' + d + '</b>' : '') + '</small></span>'; }).join('');
    var logs = C.log.slice(0, 3).map(function (l) { return '<p>' + l + '</p>'; }).join('');
    var skl = Object.keys(S.skills).filter(function (k) { return !SK[k].passive; });
    function pv(a, sid) { var p = preview(a, sid); return '<span class="pv"><i class="d">가함 ' + rangeTxt(p.d) + '</i><i class="t">받음 ' + rangeTxt(p.t) + '</i></span>'; }
    var acts;
    if (C.menu) {
      acts = '<div class="stack">' + skl.map(function (k) { var sm = SK[k]; return btn(esc(skn(k)) + ' · ' + S.skills[k].s + '성', function () { playTurn('skill', k); }, { ic: 'flame', off: C.ki < sm.cost ? '진기가 모자란다 (필요 ' + sm.cost + ')' : null, h: '진기 ' + sm.cost + (sm.hits ? ' · ' + sm.hits + '연타' : '') + (sm.pierce ? ' · 관통' : '') + (sm.mad > 0 ? ' · 마기 +' + Math.round(sm.mad * madMul()) : ''), r: pv('skill', k) }); }).join('') + btn('뒤로', function () { C.menu = false; renderFight(); }, { ic: 'back' }) + '</div>';
    } else {
      var dc = dodgeCost();
      acts = '<div class="stack">' + btn(actName('atk'), function () { playTurn('atk'); }, { ic: 'train', h: '허초·운기에 강하다', r: pv('atk') }) + btn(actName('parry'), function () { playTurn('parry'); }, { ic: 'shield', h: '연타를 흘리고 반격', r: pv('parry') }) +
        btn(actName('dodge'), function () { playTurn('dodge'); }, { ic: 'wind', off: C.ki < dc ? '진기가 모자란다' : null, h: '강타를 피한다' + (dc ? ' · 진기 ' + dc : ''), r: pv('dodge') }) + '</div><div class="grid" style="margin-top:8px">' +
        btn('무공', function () { C.menu = true; renderFight(); }, { ic: 'flame', h: skl.length ? skl.length + '가지 · 진기 사용' : '익힌 무공 없음', off: skl.length ? null : '익힌 무공이 없다' }) +
        btn('회춘단', function () { playTurn('pill'); }, { ic: 'pill', off: S.items.pill < 1 ? '없다' : null, h: '체력 +' + Math.round(maxHp() * .4) + ' · ' + S.items.pill + '개' }) +
        (o.auto && !e.boss ? btn('자동 전투', autoFight, { ic: 'fast', h: '알려진 수에 맞춰 싸운다' }) : '') + '</div>';
    }
    return '<section class="fight"><div class="arena-space"></div><div class="pn foe' + (e.boss ? ' boss' : '') + '"><div class="foe-i"><div class="ft">' + (o.title ? esc(o.title) + ' · ' : '') + C.turn + '합째' + (e.boss ? ' · <b class="bossb">강적</b>' : '') + '</div><h2>' + esc(e.n) + '</h2>' + bar('적', Math.max(0, e.hp), e.max, 'foe', Math.max(0, e.hp) + ' / ' + e.max) +
      '<div class="estat"><span>공격 <b>' + Math.round(e.atk) + '</b></span><span>방어 <b>' + e.def + '</b></span>' + (e.bleed ? '<span class="bl2">출혈 ' + e.bleed + '</span>' : '') + (e.stun ? '<span>혼미</span>' : '') + '</div></div></div>' +
      '<div class="pn me">' + bar('체력', S.hp, maxHp(), 'hp', S.hp + ' / ' + maxHp()) + bar('진기', C.ki, maxKi(), 'qi', C.ki + ' / ' + maxKi()) + (S.mad >= 60 ? bar('마기', S.mad, 100, 'mad', String(S.mad)) : '') + '</div>' +
      '<div class="pn">' + ph('읽힌 수') + '<div class="chips">' + chips + '</div><div class="hint">' + (C.hint.length > 1 ? '둘 중 하나다. ' : '') + '강타는 피하고, 연타는 흘리고, 허초와 운기는 벤다.</div></div>' +
      (logs ? '<div class="logl">' + logs + '</div>' : '') + acts + '</section>';
  });
  if (C.last) { var L = C.last; if (L.skill) fx('skill', L.skill); if (L.dmg) { fx('hit', L.dmg, L.crit); sfx(L.crit ? 'crit' : 'hit'); } if (L.hurt) { fx('hurt', L.hurt); sfx('hurt'); } if (L.heal) fx('heal', L.heal); C.last = null; }
  fx('enemyHp', C.e.hp / C.e.max);
}

/* ---- 결말 / 회귀 ---- */
function showEnd(d) {
  fx('bg', d.art);
  show(function () {
    return '<section class="endp"><div class="pn" style="padding:6px"><div class="end-art">' + art(d.art) + '<div class="cap end-cap"><div class="sec">' + (d.kind === 'end' ? '결말' : '죽음') + ' · ' + d.L.month + '개월째 · ' + REALMS[d.L.realm].n + '</div><h2>' + d.info[0] + '</h2></div></div></div>' +
      '<div class="pn"><div class="prose">' + d.body + '</div></div>' +
      '<div class="pn">' + ph('회귀의 흔적') + '<div class="sh-row"><span class="cr" style="background-image:' + imgUrl(TL.brk) + '"></span><div><div class="shard">+' + d.shards + '</div><div class="sm dim">점수 ' + d.score + (d.first ? ' · 첫 결말 보너스 +12' : '') + ' · 보유 조각 ' + P.shards + '</div></div></div>' +
      (d.carried ? '<p class="sm dim" style="margin:10px 0 0">몸이 기억하는 무공: ' + d.carried + '</p>' : '') + '</div>' +
      (d.mems ? '<div class="pn">' + ph('새로 얻은 기억') + '<ul class="mem">' + d.mems + '</ul></div>' : '') +
      '<div class="stack">' + btn('회귀 각인', upgrades, { ic: 'seal', h: '다음 생을 강하게 한다 · 조각 ' + P.shards }) +
      ((Object.keys(P.endings).length || P.maxRealm >= 3) ? btn(P.dok ? '독문무공: ' + esc(P.dok.n) : '독문무공을 창안한다', ownArt, { ic: 'flame', h: P.dok ? '이름 확인' : '조각 25 필요' }) : '') +
      btn('다시 봄으로', startLife, { c: 'primary', h: lifeNo() + '번째 생' }) + btn('타이틀', title, { ic: 'home' }) + '</div></section>';
  });
}
function upgrades() {
  show(function () {
    return '<section class="scene"><h2>회귀 각인</h2><div class="card"><div class="sh-row"><span class="cr" style="background-image:' + imgUrl(TL.brk) + '"></span><div><div class="sm dim">보유 회귀력 조각</div><div class="shard">' + P.shards + '</div></div></div><p class="sm dim" style="margin:8px 0 0">각인은 모든 다음 생에 영원히 남는다. 죽고 돌아올수록 강해진다.</p></div><div class="stack">' +
      UPG.map(function (u) { var l = upL(u.k), c = u.cost(l), mx = l >= u.max; return btn(u.n + ' · ' + l + '/' + u.max, function () { P.shards -= c; P.up[u.k] = l + 1; sfx('coin'); save(); upgrades(); }, { off: mx ? '최대' : (P.shards < c ? '조각 ' + c + ' 필요' : null), h: u.d + (mx ? '' : ' · 조각 ' + c) }); }).join('') +
      btn('돌아간다', function () { afterUpgrade(); }, { c: 'primary' }) + '</div></section>';
  });
}
function afterUpgrade() { show(function () { return '<section class="scene"><h2>다음 생</h2><p class="dim" style="text-align:center">준비가 되면 봄으로 돌아간다.</p><div class="stack">' + btn('다시 봄으로', startLife, { c: 'primary', h: lifeNo() + '번째 생' }) + btn('회귀 각인', upgrades) + btn('타이틀', title) + '</div></section>'; }); }
function ownArt() {
  show(function () {
    return '<section class="scene"><h2>독문무공</h2><div class="prose"><p>한 번뿐인 초식을 만든다. 모든 수에 적중하고 받는 피해가 줄어든다. 이름은 한 번 정하면 바꿀 수 없다.</p></div>' +
      (P.dok ? '<div class="card"><h3>' + esc(P.dok.n) + '</h3><p class="dim" style="margin:0">' + SK.own.d + ' 다음 생부터 시작할 때 익히고 있다.</p></div><div class="stack">' + btn('돌아간다', afterUpgrade) + '</div>' :
        '<input class="txt" id="ownName" maxlength="8" placeholder="초식의 이름 (최대 8자)" autocomplete="off"><div class="stack">' + btn('창안한다 · 조각 25', function () { var el = document.getElementById('ownName'), v = ((el && el.value) || '').trim().slice(0, 8); if (!v || P.shards < 25) return; P.dok = { n: v }; P.shards -= 25; ach('own'); save(); ownArt(); }, { off: P.shards < 25 ? '조각이 모자란다' : null }) + btn('돌아간다', afterUpgrade) + '</div>') + '</section>';
  });
}
function galItem(kind, label, open) { return open ? '<div class="gal-i">' + art(kind) + '<span class="gal-l">' + esc(label) + '</span></div>' : '<div class="gal-i lock">???</div>'; }
function codex() {
  show(function () {
    var en = Object.keys(ENDINGS).map(function (k) { return '<tr><td>' + (P.endings[k] ? ENDINGS[k][0] : '???') + '</td><td>' + (P.endings[k] ? P.endings[k] + '회' : '') + '</td></tr>'; }).join('');
    var gal = ''; for (var r = 0; r < REALMS.length; r++) gal += galItem('r' + r, REALMS[r].n, r <= P.maxRealm || (S && r <= S.realm));
    Object.keys(ENDINGS).forEach(function (k) { gal += galItem(k, ENDINGS[k][0], !!P.endings[k]); }); gal += galItem('death', '회귀', P.lives > 0);
    return '<div class="solo"><div class="pn">' + ph('삽화 도감') + '<div class="meta" style="margin:0 0 12px;justify-content:center"><span>지난 생 <b>' + P.lives + '</b></span><span>최고 점수 <b>' + P.best + '</b></span><span>최고 경지 <b>' + REALMS[P.maxRealm].n + '</b></span><span>승리 <b>' + P.stats.wins + '</b></span></div><div class="gal">' + gal + '</div></div>' +
      '<div class="pn">' + ph('결말 ' + Object.keys(P.endings).length + ' / ' + Object.keys(ENDINGS).length) + '<table class="tbl">' + en + '</table></div>' +
      '<div class="pn">' + ph('업적 ' + Object.keys(P.ach || {}).length + ' / ' + Object.keys(ACH).length) + '<div class="achs">' + Object.keys(ACH).map(function (a) { return '<div class="ach' + ((P.ach || {})[a] ? ' on' : '') + '"><b>' + ACH[a][0] + '</b><span>' + ACH[a][1] + '</span></div>'; }).join('') + '</div></div>' +
      '<div class="stack">' + btn('돌아간다', function () { if (S) logView(); else title(); }, { c: 'primary' }) + '</div></div>';
  });
}
function title() {
  fx('bg', 'title'); fx('aura', 0); bgm('title');
  show(function () {
    return '<section class="title"><div class="pn" style="padding:6px"><div class="title-art">' + art('title') + '<span class="ver">' + VERSION + '</span><div class="tlogo"><div class="tl-b">혈월회귀록</div><div class="tl-s">피로 물든 회귀, 천하를 다시 쓴다</div></div><div class="cap">죽으면 같은 해 봄으로 돌아오는 마교 무협 RPG.<br>본 것은 기억에 남고, 쌓은 것은 각인으로 남는다.</div></div></div><div class="stack">' +
      (S ? btn('이어하기', function () { hub(); }, { c: 'primary', h: lifeNo() + '번째 생 · ' + REALMS[S.realm].n + ' · ' + monthLabel() }) : '') +
      btn(S ? '새 생 시작' : (P.lives ? '다음 생을 시작' : '이야기를 시작'), function () { startLife(); }, { c: S ? '' : 'primary', ic: 'burst', h: S ? '진행 중인 생은 사라진다' : null }) +
      (P.lives ? btn('회귀 각인', upgrades, { ic: 'seal', h: '회귀력 조각 ' + P.shards }) : '') +
      btn('삽화와 결말 도감', codex, { ic: 'book' }) +
      (Object.keys(P.endings).length ? btn('난이도 · ' + (P.hard ? '어려움' : '보통'), function () { P.hard = !P.hard; save(); title(); }, { ic: 'shield', h: '어려움: 적이 1.25배 강하고 수가 덜 읽힌다 · 조각 1.5배' }) : '') +
      btn('소리 · ' + (P.settings.mute ? '꺼짐' : '켜짐'), function () { P.settings.mute = !P.settings.mute; try { Sound.setMute(P.settings.mute); } catch (e) {} save(); title(); }, { ic: P.settings.mute ? 'mute' : 'sound', h: '배경 음악과 효과음' }) +
      btn(resetArmed ? '정말 모두 지운다' : '저장 초기화', function () { if (resetArmed) { P = defP(); S = null; C = null; resetArmed = false; save(); title(); } else { resetArmed = true; title(); } }, { h: resetArmed ? '한 번 더 누르면 되돌릴 수 없다' : null }) + '</div></section>';
  });
}
