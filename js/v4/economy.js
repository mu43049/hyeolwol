/* 혈월회귀록 v4 — 경제·파밍·제작·연단·폐관·문파·제자. 80년 동안 돈과 재료와 사람을 쌓는 층. */
function infl() { return 1 + .025 * (yearOf(S.month) - 1); }
function price(n) { return Math.round(n * infl()); }

/* 내공 보상: 지금 경지 폭의 p(0~1)만큼. 이벤트 보상은 이걸 쓰면 시대에 맞게 자란다 */
function qiPct(p) { var w = S.realm < REALMS.length - 1 ? REALMS[S.realm + 1].q - REALMS[S.realm].q : 3000; return qiGain(Math.max(10, Math.round(w * p))); }

/* ---- 재료 ---- */
var MATS = {
  herb: { n: '약초', p: 12 }, iron: { n: '정철', p: 18 }, hide: { n: '짐승 가죽', p: 15 }, bone: { n: '영수의 뼈', p: 22 },
  jade: { n: '옥정', p: 160 }, gem: { n: '보석', p: 230 }, scale: { n: '용린', p: 650 }, core: { n: '영단', p: 950 }
};
function mat(k) { return (S.mat && S.mat[k]) || 0; }
function addMat(k, n) { S.mat = S.mat || {}; S.mat[k] = mat(k) + n; return n; }
function matTxt(m) { return Object.keys(m).map(function (k) { return MATS[k].n + ' ' + m[k]; }).join(' · '); }
function hasMats(m) { return Object.keys(m).every(function (k) { return mat(k) >= m[k]; }); }
function useMats(m) { Object.keys(m).forEach(function (k) { S.mat[k] -= m[k]; }); }
function matsLine() { return Object.keys(MATS).filter(function (k) { return mat(k) > 0; }).map(function (k) { return '<span>' + MATS[k].n + ' <b>' + mat(k) + '</b></span>'; }).join(''); }

/* ---- 장신구 ---- */
var ACC = {
  ring: { n: '반지', t: [null, { n: '철가락지', a: 3 }, { n: '은 인장반지', a: 6, d: 1 }, { n: '자옥 반지', a: 10, d: 2 }, { n: '혈옥 반지', a: 16, d: 3 }, { n: '천룡 옥반지', a: 24, d: 5 }] },
  charm: { n: '부적', t: [null, { n: '호신부', d: 2, h: 10 }, { n: '벽사부', d: 4, h: 25 }, { n: '금강 호패', d: 7, h: 45 }, { n: '천잠 노리개', d: 11, h: 70 }, { n: '불괴 영패', d: 16, h: 110 }] },
  belt: { n: '허리띠', t: [null, { n: '가죽 허리띠', q: 3 }, { n: '영초 띠', q: 6 }, { n: '운기대', q: 10, h: 20 }, { n: '선천 요대', q: 15, h: 40 }, { n: '태허 요대', q: 22, h: 70 }] }
};
function accSum(k) { if (!S || !S.acc) return 0; var s = 0; Object.keys(S.acc).forEach(function (slot) { var t = ACC[slot] && ACC[slot].t[S.acc[slot]]; if (t && t[k]) s += t[k]; }); return s; }

/* ---- 매달 들어오는 돈 ---- */
function estateIncome() { return Math.round((S.estate || 0) * 6 * (1 + .05 * eraIdx(S.month))); }
function sectIncome() { return S.sect && !S.sect.fixed ? S.sect.lv * 12 : (S.sect ? S.sect.lv * 4 : 0); }
function discIncome() { return (S.disc || []).filter(function (d) { return d.p >= 40; }).length * 7; }
function incomeTick() { if (S.month <= YOUTH_END) return; var g = estateIncome() + sectIncome() + discIncome(); if (g) S.silver += g; }
function estateTick() { if (S.estate && Math.random() < .08) { var l = Math.round(price(60) * S.estate * .5); S.silver = Math.max(0, S.silver - l); logE('item', '상단이 도적을 만나 <b>' + l + '</b>냥을 잃었다.'); } }
function monthlyIncomeTxt() { var g = estateIncome() + sectIncome() + discIncome(); return g ? '매달 은전 +' + g : '아직 고정 수입이 없다'; }

/* ---- 저잣거리 (시간이 들지 않는다) ---- */
var BOOKS = [['bido', 120, 0], ['cheolgol', 200, 1], ['dokjang', 260, 1], ['pageom', 420, 2], ['nak', 450, 2], ['heuksal', 520, 3], ['gwihon', 800, 3], ['hyeolyeong', 800, 3], ['geomsa', 700, 3], ['seophon', 1000, 3], ['taegeuk', 650, 3], ['gwiwon', 900, 3], ['tanji', 950, 4], ['heupseong', 1300, 4], ['geumgang', 1200, 4], ['ganggi', 1600, 4], ['singeom', 3200, 5], ['pacheon', 2400, 5], ['hyeolryong', 4200, 6], ['muhyeong', 6500, 7]];
function stock() {
  if (S.stock) return S.stock;
  var ok = BOOKS.filter(function (b) { return SK[b[0]] && !S.skills[b[0]] && S.realm >= b[2] && S.realm <= b[2] + 3; });
  var picked = []; while (ok.length && picked.length < 4) picked.push(ok.splice(rnd(0, ok.length - 1), 1)[0]);
  S.stock = { books: picked.map(function (b) { return b[0]; }) }; return S.stock;
}
function bookPrice(id) { var b = BOOKS.filter(function (x) { return x[0] === id; })[0]; return price(b ? b[1] : 500); }
function shop() {
  show(function () {
    var yk = 'pq' + yearOf(S.month), used = S.flags[yk] || 0, qiAmt = Math.max(30, Math.round((nextQ() - REALMS[S.realm].q) * .05));
    var cons = [
      { n: '회춘단', p: price(40), h: '체력 40% 회복. 싸움 중 사용 · 보유 ' + S.items.pill, ok: S.items.pill < 8, f: function () { S.items.pill++; } },
      { n: '정심환', p: price(60), h: '마기가 100이 될 때 자동으로 복용 · 보유 ' + S.items.calm, ok: S.items.calm < 4, f: function () { S.items.calm++; } },
      { n: '해독단', p: price(50), h: '독을 푼다 · 보유 ' + S.items.antidote, ok: S.items.antidote < 5, f: function () { S.items.antidote++; } },
      { n: '내공단', p: price(120 + S.realm * 60), h: '내공 +' + qiAmt + ' · 올해 ' + (3 - used) + '번 남음', ok: used < 3 && S.realm < REALMS.length - 1, f: function () { S.qi += qiGain(qiAmt); S.flags[yk] = used + 1; } }];
    var gear = [
      { n: '철도', p: price(70), h: '공격력 +4', ok: S.weapon < 1, f: function () { S.weapon = 1; } },
      { n: '흑철도', p: price(170), h: '공격력 +9 (철도 필요)', ok: S.weapon === 1, f: function () { S.weapon = 2; } },
      { n: '가죽갑', p: price(60), h: '방어력 +2 · 최대 체력 +12', ok: (S.armor || 0) < 1, f: function () { S.armor = 1; } }];
    var books = stock().books.map(function (id) { return { n: '비급 · ' + SK[id].n, p: bookPrice(id), h: SK[id].t + ' · ' + SK[id].d, ok: !S.skills[id], f: function () { learn(id); } }; });
    var mk = function (it) { return btn(it.n + ' · ' + it.p + '냥', function () { S.silver -= it.p; it.f(); sfx('coin'); logE('item', '<b>' + it.n + '</b>을(를) 샀다.'); shop(); }, { off: !it.ok ? '지금은 살 수 없다' : (S.silver < it.p ? '은전이 모자란다' : null), h: it.h }); };
    var sell = Object.keys(MATS).filter(function (k) { return mat(k) > 0; }).map(function (k) { return btn(MATS[k].n + ' 모두 팔기 · ' + mat(k) + '개', function () { var g = mat(k) * MATS[k].p; S.silver += g; S.mat[k] = 0; sfx('coin'); logE('item', MATS[k].n + '을(를) 팔아 <b>' + g + '</b>냥을 벌었다.'); shop(); }, { h: '+' + (mat(k) * MATS[k].p) + '냥' }); }).join('');
    var estCost = price(300 * Math.pow((S.estate || 0) + 1, 1.5));
    return '<section class="scene"><h2>저잣거리</h2>' + miniStatus() + '<div class="meta" style="margin:0 0 10px">' + matsLine() + '</div><p class="sm dim" style="text-align:center;margin:-4px 0 10px">시간이 들지 않는다 · ' + monthlyIncomeTxt() + '</p>' +
      '<div class="forge">' + ph('약과 단') + '<div class="stack">' + cons.map(mk).join('') + '</div></div>' +
      (books.length ? '<div class="forge">' + ph('올해의 비급') + '<div class="stack">' + books.map(mk).join('') + '</div></div>' : '') +
      '<div class="forge">' + ph('기초 장비') + '<div class="stack">' + gear.map(mk).join('') + '</div></div>' +
      (sell ? '<div class="forge">' + ph('재료 팔기') + '<div class="stack">' + sell + '</div></div>' : '') +
      (age() >= 24 ? '<div class="forge">' + ph('투자') + '<div class="stack">' + btn('상단에 투자 · Lv ' + (S.estate || 0) + '/10', function () { S.silver -= estCost; S.estate = (S.estate || 0) + 1; sfx('coin'); logE('item', '상단에 <b>' + estCost + '</b>냥을 투자했다.'); shop(); }, { off: (S.estate || 0) >= 10 ? '최대' : (S.silver < estCost ? '은전 ' + estCost + '냥 필요' : null), h: '매달 은전이 들어온다 · 가끔 도적을 만난다 · ' + estCost + '냥' }) + '</div></div>' : '') +
      '<div class="stack" style="margin-top:12px">' + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></section>';
  });
}

/* ---- 제작과 연단 (한 달이 걸린다) ---- */
function craftList() {
  var L = [], cn = S.flags.cn || S.route === 'jeong', dc = S.flags.forgeDisc && S.route !== 'jeong' ? .8 : 1;
  var W = function (tier, s, m, h, need) { L.push({ g: '무기', n: WEAP[tier].n, ok: S.weapon === tier - 1, need: need || null, s: Math.round(price(s) * dc), m: m, h: h || ('공격력 +' + WEAP[tier].a), f: function () { S.weapon = tier; } }); };
  var A = function (tier, s, m, h, need) { L.push({ g: '방어구', n: ARMOR[tier].n, ok: (S.armor || 0) === tier - 1, need: need || null, s: Math.round(price(s) * dc), m: m, h: h || ('방어력 +' + ARMOR[tier].d + ' · 체력 +' + ARMOR[tier].h), f: function () { S.armor = tier; } }); };
  W(3, 260, { }, '공격력 +15 (흑철도 필요)'); L[L.length - 1].m = { }; L[L.length - 1].o = 2;
  W(4, 420, { }, '공격력 +23 (혈철도 필요)', (tr('cn') >= 3 || S.route === 'jeong') ? null : '철노 신뢰 3 필요'); L[L.length - 1].o = 4;
  W(5, 900, { iron: 8, gem: 1 }, null); L[L.length - 1].o = 6;
  W(6, 2400, { iron: 14, jade: 3, gem: 3 });
  W(7, 6000, { scale: 4, bone: 6 }); L[L.length - 1].o = 10;
  W(8, 14000, { scale: 10, core: 3, jade: 8, gem: 8 });
  A(2, 150, { }, '방어력 +5 · 체력 +28 (가죽갑 필요)'); L[L.length - 1].o = 1;
  A(3, 320, { }, '방어력 +9 · 체력 +50 (흑린갑 필요)', (tr('cn') >= 4 || (S.route === 'jeong' && tr('nj') >= 2)) ? null : (S.route === 'jeong' ? '남궁진 신뢰 2 필요' : '철노 신뢰 4 필요')); L[L.length - 1].o = 3;
  A(4, 800, { iron: 8, hide: 6 }); A(5, 2200, { hide: 14, jade: 3 }); A(6, 5500, { scale: 4, hide: 20 }); A(7, 13000, { scale: 9, core: 3, jade: 6 });
  Object.keys(ACC).forEach(function (slot) {
    for (var t = 1; t <= 5; t++) (function (t) {
      var a = ACC[slot].t[t], base = [0, 120, 400, 1200, 3500, 9000][t], m = [{}, { iron: 1 }, { iron: 3, hide: 2 }, { jade: 1, gem: 1 }, { jade: 3, gem: 2, bone: 4 }, { scale: 3, core: 2, jade: 4 }][t];
      var h = ['a', 'd', 'h', 'q'].filter(function (k) { return a[k]; }).map(function (k) { return ({ a: '공격 +', d: '방어 +', h: '체력 +', q: '내공 획득 +' })[k] + a[k] + (k === 'q' ? '%' : ''); }).join(' · ');
      L.push({ g: '장신구', n: a.n, ok: (S.acc[slot] || 0) === t - 1, s: price(base), m: m, h: ACC[slot].n + ' · ' + h, f: function () { S.acc[slot] = t; } });
    })(t);
  });
  return L;
}
function alchemyList() {
  var yk = 'pq' + yearOf(S.month), r = S.realm;
  return [
    { n: '회춘단 빚기', m: { herb: 2 }, s: 0, ok: S.items.pill < 8, h: '회춘단 +1', f: function () { S.items.pill++; return '회춘단 한 알을 빚었다.'; } },
    { n: '정심환 빚기', m: { herb: 3, bone: 1 }, s: 0, ok: S.items.calm < 4, h: '정심환 +1', f: function () { S.items.calm++; return '정심환 한 알을 빚었다.'; } },
    { n: '내공단 달이기', m: { herb: 4, jade: 1 }, s: 0, ok: (S.flags[yk] || 0) < 3 && r < REALMS.length - 1, h: '내공 크게 상승 · 올해 ' + (3 - (S.flags[yk] || 0)) + '번', f: function () { var g = qiGain(Math.max(60, Math.round((nextQ() - REALMS[r].q) * .1))); S.qi += g; S.flags[yk] = (S.flags[yk] || 0) + 1; return '달인 약을 마시자 단전이 뜨거워졌다. 내공 +' + g; } },
    { n: '환골단 빚기', m: { herb: 6, bone: 2, jade: 1 }, s: 0, ok: (S.hpBonus || 0) < 120, h: '최대 체력 +8 (영구, 이번 생)', f: function () { S.hpBonus += 8; return '뼈마디가 새로 맞물렸다. 최대 체력 +8'; } },
    { n: '장생단 달이기', m: { core: 1, jade: 2, herb: 6 }, s: 0, ok: r >= 3 && (S.lifeBonus || 0) < 12, h: '수명 +2년 (최대 +12년)', f: function () { S.lifeBonus = (S.lifeBonus || 0) + 2; return '쓰디쓴 약이 오장을 씻어 내렸다. 수명이 <b>2년</b> 늘었다.'; } }
  ];
}
function craftMenu() {
  show(function () {
    var cr = craftList().filter(function (x) { return x.ok || (x.g === '무기' || x.g === '방어구'); });
    var avail = cr.filter(function (x) { return x.ok; }), alch = alchemyList();
    var row = function (x) { var o = x.o ? { ore: x.o } : null, mm = x.m || {}, lack = x.need || (S.silver < x.s ? '은전 ' + x.s + '냥 필요' : (o && (S.items.ore || 0) < o.ore ? '운철 ' + o.ore + '개 필요' : (!hasMats(mm) ? '재료가 모자란다' : null)));
      return btn(x.n + (x.s ? ' · ' + x.s + '냥' : ''), function () { S.silver -= x.s; if (o) S.items.ore -= o.ore; useMats(mm); x.f(); sfx('coin'); logE('item', '<b>' + x.n + '</b>을(를) 만들었다.'); afterAct('<b>' + x.n + '</b>을(를) 완성했다.', 'item'); }, { off: lack, h: x.h + (o ? ' · 운철 ' + o.ore : '') + (Object.keys(mm).length ? ' · ' + matTxt(mm) : '') }); };
    var arow = function (x) { return btn(x.n, function () { useMats(x.m); sfx('qi'); var t = x.f(); afterAct(t, 'item'); }, { off: !x.ok ? '지금은 할 수 없다' : (!hasMats(x.m) ? '재료가 모자란다' : null), h: x.h + ' · ' + matTxt(x.m) }); };
    return '<section class="scene"><h2>제작 · 연단</h2>' + miniStatus() + '<div class="meta" style="margin:0 0 10px"><span>운철 <b>' + (S.items.ore || 0) + '</b></span>' + matsLine() + '</div><p class="sm dim" style="text-align:center;margin:-4px 0 10px">만들고 달이는 데 한 달이 걸린다.</p>' +
      '<div class="forge">' + ph(S.route === 'jeong' ? '무림맹 대장간' : '대장간') + '<div class="stack">' + (avail.length ? avail.map(row).join('') : '<div class="note sm">지금 만들 수 있는 장비가 없다. 하위 단계부터 갖춰야 한다.</div>') + '</div></div>' +
      '<div class="forge">' + ph('연단') + '<div class="stack">' + alch.map(arow).join('') + '</div></div>' +
      '<div class="stack" style="margin-top:12px">' + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></section>';
  });
}

/* ---- 사냥과 채집 (파밍) ---- */
ENM.boar = { n: '철모 멧돼지', hp: 60, atk: 10, w: { strong: 5, rapid: 1, feint: 1, charge: 2 } }; GLY.boar = '猪';
ENM.tiger = { n: '백액 대호', hp: 75, atk: 13, w: { strong: 3, rapid: 4, feint: 1, charge: 1 } }; GLY.tiger = '虎';
ENM.ape = { n: '철비원', hp: 85, atk: 12, w: { strong: 2, rapid: 3, feint: 3, charge: 1 } }; GLY.ape = '猿';
ENM.golem = { n: '광맥 석인', hp: 110, atk: 12, w: { strong: 5, rapid: 1, feint: 1, charge: 3 } }; GLY.golem = '偶';
ENM.wraith = { n: '유적의 혼귀', hp: 90, atk: 15, w: { strong: 1, rapid: 3, feint: 5, charge: 1 } }; GLY.wraith = '魂';
ENM.serpent = { n: '이무기', hp: 150, atk: 18, boss: true, w: { strong: 3, rapid: 3, feint: 2, charge: 3 } }; GLY.serpent = '蟒';
ENM.drake = { n: '화룡의 새끼', hp: 220, atk: 22, boss: true, w: { strong: 4, rapid: 2, feint: 2, charge: 4 } }; GLY.drake = '龍';
var FARM = [
  { k: 'herb', n: '약초밭', d: '약초와 가끔 옥정. 짐승이 덮치기도 한다', r: 0, e: ['wolf', 'snake', 'boar'], fp: .22, y: function (t) { addMat('herb', rnd(2, 3 + Math.floor(t / 2))); if (Math.random() < .06 + .01 * t) addMat('jade', 1); } },
  { k: 'mine', n: '정철 광맥', d: '정철과 운철, 가끔 보석. 석인이 지킨다', r: 1, e: ['golem', 'bandit'], fp: .3, y: function (t) { addMat('iron', rnd(2, 3 + Math.floor(t / 2))); if (Math.random() < .22) S.items.ore = (S.items.ore || 0) + 1; if (Math.random() < .08 + .01 * t) addMat('gem', 1); } },
  { k: 'hunt', n: '사냥터', d: '싸워서 가죽과 뼈를 얻는다', r: 1, e: ['boar', 'tiger', 'ape', 'beast'], fp: 1, y: function (t) { addMat('hide', rnd(2, 3 + Math.floor(t / 3))); addMat('bone', rnd(1, 2)); if (Math.random() < .08) addMat('gem', 1); } },
  { k: 'ruin', n: '고대 유적', d: '옥정과 보석, 때로 영단. 강한 혼귀가 있다', r: 3, e: ['wraith', 'stone', 'ghost'], fp: 1, y: function (t) { addMat('jade', rnd(1, 2)); if (Math.random() < .35) addMat('gem', 1); if (Math.random() < .12 + .01 * t) addMat('core', 1); } },
  { k: 'lair', n: '용혈', d: '용린과 영단을 노린다. 강적이 있다', r: 6, e: ['serpent', 'drake'], fp: 1, boss: true, y: function (t) { addMat('scale', rnd(1, 2)); if (Math.random() < .3) addMat('core', 1); addMat('bone', rnd(2, 4)); } }
];
function farmMenu() {
  show(function () {
    var t = Math.min(S.realm, 8);
    return '<section class="scene"><h2>사냥 · 채집</h2>' + miniStatus() + '<div class="meta" style="margin:0 0 10px">' + matsLine() + '</div><div class="stack">' +
      FARM.map(function (f) { var ok = S.realm >= f.r; return btn(f.n, function () { doFarm(f); }, { off: ok ? null : '경지 ' + REALMS[f.r].n + ' 이상', h: f.d }); }).join('') +
      btn('돌아간다', function () { hub(); }) + '</div><p class="sm dim" style="text-align:center;margin:10px 0">한 달이 걸린다. 얻은 재료는 제작·연단에 쓰거나 저잣거리에서 팔 수 있다.</p></section>';
  });
}
function doFarm(f) {
  var t = Math.min(S.realm, 8), yieldIt = function (extra) { var before = JSON.stringify(S.mat || {}), ore0 = S.items.ore || 0; f.y(t); var got = []; Object.keys(MATS).forEach(function (k) { var d = mat(k) - ((JSON.parse(before)[k]) || 0); if (d > 0) got.push(MATS[k].n + ' ' + d); }); if ((S.items.ore || 0) > ore0) got.push('운철 ' + ((S.items.ore || 0) - ore0));
    var sv = Math.round(rnd(6, 14) * (1 + t * .6)); S.silver += sv; S.qi += qiGain(2 + t); return (extra || '') + '<b>' + f.n + '</b>에서 ' + (got.join(', ') || '별 소득 없이') + ' — 은전 ' + sv + '냥.'; };
  if (Math.random() < f.fp) {
    var id = pick(f.e), tier = Math.max(0, t * .8 - .3) + (f.boss ? .6 : 0);
    fight(id, tier, { auto: true, title: f.n, spar: !f.boss && f.k !== 'ruin', win: function () { afterAct(yieldIt(ENM[id].n + '을(를) 쓰러뜨렸다. '), 'fight'); },
      lose: function () { if (f.boss || f.k === 'ruin') die('explore'); else { S.hp = Math.max(1, Math.round(maxHp() * .3)); afterAct('쓰러졌다가 간신히 빠져나왔다.', 'fail'); } } });
  } else afterAct(yieldIt('한 달 동안 별 탈 없이 '), 'event');
}

/* ---- 폐관 수행: 여러 달을 한 번에 ---- */
function quietMonth() {
  S.month++; P.stats.actions++;
  S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .08)); S.mad = Math.max(0, S.mad - 2 - (sk('gwiwon') ? 2 : 0) - (sk('jeongsim') ? 4 : 0));
  if (S.realm >= 5) S.hp = maxHp();
  incomeTick(); if (S.month % 12 === 1) yearTick();
}
function retreat(n) {
  var gain = 0, did = 0, stopped = '';
  for (var i = 0; i < n; i++) {
    var g = qiGain((10 + S.realm * 4 + sk('gong') * 1.5 + effEye() * 1.5 + rnd(0, 4)) * .9); if (Math.random() < .03) { g = Math.round(g * 3); S.mad = Math.max(0, S.mad - 10); }
    S.qi += g; gain += g; S.mad = Math.max(0, S.mad - 6); did++;
    if (S.mad >= 100) { stopped = '마기가 치밀어 폐관을 접었다.'; break; }
    if (canBreak()) { stopped = '경지의 벽에 닿아 폐관을 마쳤다.'; break; }
    if (i < n - 1) {
      var nm = S.month + 1;
      if (nm > MAXM || (nm % 12 === 1 && ageOf(nm) > lifespan())) { stopped = '수명이 다해 간다.'; break; }
      if (eventDue(nm) || chapIdx(nm) !== chapIdx(S.month)) { stopped = '바깥에서 부르는 소리가 들렸다.'; break; }
      quietMonth();
    }
  }
  sfx('qi'); afterAct('<b>' + did + '개월</b> 동안 폐관했다. 내공이 <b>' + gain + '</b> 늘었다.' + (stopped ? ' ' + stopped : ''), 'qi');
}
function retreatMenu() {
  show(function () {
    return '<section class="scene"><h2>폐관 수행</h2>' + miniStatus() + '<div class="prose"><p>산문을 닫고 운기에만 매달린다. 여러 달을 한 번에 보낼 수 있다. 중요한 사건이 다가오거나 경지의 벽에 닿으면 폐관을 마친다.</p></div><div class="stack">' +
      [3, 6, 12].map(function (n) { return btn(n + '개월 폐관', function () { retreat(n); }, { h: '운기조식을 ' + n + '번 · 마기 -6씩' }); }).join('') + btn('돌아간다', function () { hub(); }) + '</div></section>';
  });
}

/* ---- 문파와 제자 ---- */
var SURN = '김이박최정강조윤장임한오서신권황안송류홍전고문양손배백허유남심노하곽성차주우구민나진지엄채원천방공현함변염여추도소석선설마길연위표명기반왕금옥'.split('');
var GN1 = '지민서준하은도현재우시윤예수진태건영승유빈라온'.split(''), GN2 = '호연준아린우혁솔빈찬결담휘별샘람온'.split('');
function randName() { return pick(SURN) + pick(GN1) + pick(GN2); }
function recruit() {
  var cost = price(120), d = { n: randName(), p: 0, t: rnd(1, 5), a: rnd(9, 15) };
  S.silver -= cost; S.disc = S.disc || []; S.disc.push(d); logE('people', '<b>' + d.n + '</b>을(를) 제자로 거두었다.');
  afterAct('거리에서 눈빛이 남다른 아이를 보았다. <b>' + esc(d.n) + '</b>(' + d.a + '세, 재능 ' + '★'.repeat(d.t) + ')을(를) 제자로 거두었다.', 'people');
}
function teach() {
  var n = (S.disc || []).length, g = 0; (S.disc || []).forEach(function (d) { var x = 4 + d.t * 2; d.p = Math.min(100, d.p + x); g += x; });
  var q = qiGain(4 + n * 2); S.qi += q; S.mad = Math.max(0, S.mad - 4);
  afterAct('제자들을 가르치며 한 달을 보냈다. 가르치는 동안 오히려 깨달음이 있었다. 내공 +' + q, 'people');
}
function discipleTick() { (S.disc || []).forEach(function (d) { d.a++; d.p = Math.min(100, d.p + d.t); }); }
function guildMenu() {
  show(function () {
    var ds = S.disc || [], cost = price(120), sect = S.sect, found = price(3000), up = sect && sect.lv < 5 ? price(2500 * Math.pow(sect.lv, 1.5)) : 0;
    var dl = ds.map(function (d) { return '<div class="le"><span class="li" style="background-image:' + stickUrl('d:' + d.n) + '"></span><div class="lt"><b>' + esc(d.n) + '</b> · ' + d.a + '세 · 재능 ' + '★'.repeat(d.t) + '<br><span class="dim sm">수련 ' + d.p + ' / 100' + (d.p >= 100 ? ' · 대성' : '') + '</span></div></div>'; }).join('') || '<p class="sm dim" style="text-align:center">아직 제자가 없다.</p>';
    return '<section class="scene"><h2>문파 · 제자</h2>' + miniStatus() + '<div class="pn">' + ph(sect ? sect.n + ' (Lv ' + sect.lv + ')' : '문파 없음') + '<p class="sm dim" style="margin:0 0 6px">' + monthlyIncomeTxt() + '</p>' + dl + '</div><div class="stack">' +
      btn('제자를 거둔다 · ' + cost + '냥', recruit, { off: age() < 28 ? '스물여덟은 되어야 제자를 둘 수 있다' : (ds.length >= 8 ? '제자는 여덟까지' : (S.silver < cost ? '은전이 모자란다' : null)), h: '한 달이 걸린다 · 말로에 영향을 준다' }) +
      btn('제자를 가르친다', teach, { off: ds.length ? null : '가르칠 제자가 없다', h: '한 달 · 제자 수련 상승 · 내공 소량' }) +
      (!sect ? '<input class="txt" id="sectName" maxlength="8" placeholder="문파의 이름 (최대 8자)" autocomplete="off">' + btn('문파를 연다 · ' + found + '냥', function () { var el = document.getElementById('sectName'), v = ((el && el.value) || '').trim().slice(0, 8); if (!v) return; S.silver -= found; S.sect = { n: v, lv: 1 }; sfx('gong'); logE('event', '<b>' + esc(v) + '</b>을(를) 열었다.'); guildMenu(); }, { off: age() < 35 ? '서른다섯은 넘어야 한다' : (S.realm < 3 ? '절정 이상이어야 한다' : (S.silver < found ? '은전 ' + found + '냥 필요' : null)), h: '매달 은전이 들어온다 · 말로에 영향' }) :
        (up ? btn('문파를 키운다 · ' + up + '냥', function () { S.silver -= up; S.sect.lv++; sfx('gong'); logE('event', '<b>' + esc(S.sect.n) + '</b>이(가) 커졌다. (Lv ' + S.sect.lv + ')'); guildMenu(); }, { off: S.silver < up ? '은전 ' + up + '냥 필요' : null, h: '수입과 명성이 오른다' }) : '')) +
      btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></section>';
  });
}
