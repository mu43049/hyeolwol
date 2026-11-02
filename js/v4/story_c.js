/* 혈월회귀록 v4 — 이야기 C: E5 천외천(409~504개월, 51~58세) · E6 문하의 시대(505~600개월, 59~66세). 접두사 c4_ */

/* ================= 도우미 ================= */
function c4Q(p) { var q = qiPct(p); S.qi += q; return q; }
function c4Silver(n) { var g = price(n); S.silver += g; return g; }
function c4Life(n) { var before = S.lifeBonus || 0; S.lifeBonus = Math.min(12, before + n); return S.lifeBonus - before; }
function c4Mad(n) { S.mad = clamp(S.mad + n, 0, 100); }
function c4Heal(p) { S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * p)); }
function c4Disc() { return (S.disc || []).slice().sort(function (a, b) { return b.p - a.p; }); }
function c4Top() { return c4Disc()[0] || null; }
function c4DN(d) { return '<b>' + esc(d.n) + '</b>'; }
function c4Drop(d) { var i = (S.disc || []).indexOf(d); if (i >= 0) S.disc.splice(i, 1); }
function c4Up(d, n) { d.p = Math.min(100, d.p + n); }
function c4SectName() { return S.sect ? '<b>' + esc(S.sect.n) + '</b>' : ''; }
/* 승천을 시도할 옛 동료: 백운 → 사마령 → 제갈휘 */
var C4_FRIEND = { bw: ['백운', 'bwDead'], sm: ['사마령', 'smDead'], jg: ['제갈휘', 'c4_jgDead'] };
function c4Friend() {
  if (S.flags.bw && !S.flags.bwDead) return 'bw';
  if (S.flags.sm && !S.flags.smDead) return 'sm';
  if (!S.flags.c4_jgDead) return 'jg';
  return null;
}
/* 목숨이 걸린 싸움: 굴레를 끊은 자는 지면 쓰러질 뿐 죽지 않는다 */
function c4Lethal(deathId, onSurvive) {
  return function () { if (S.noReturn) { S.hp = Math.max(1, Math.round(maxHp() * .2)); onSurvive(); } else die(deathId); };
}

/* ================= 적 ================= */
ENM.c4_herald = { n: '구천문 시자', hp: 120, atk: 20, w: { strong: 2, rapid: 3, feint: 3, charge: 1 } }; GLY.c4_herald = '侍';
ENM.c4_ninth = { n: '구좌 사자 설무', hp: 300, atk: 29, boss: true, w: { strong: 1, rapid: 3, feint: 5, charge: 1 } }; GLY.c4_ninth = '霧';
ENM.c4_eighth = { n: '팔좌 사자 담천', hp: 400, atk: 35, boss: true, w: { strong: 4, rapid: 1, feint: 1, charge: 4 } }; GLY.c4_eighth = '覃';
ENM.c4_ascended = { n: '불타는 혼백', hp: 280, atk: 31, boss: true, w: { strong: 3, rapid: 3, feint: 2, charge: 3 } }; GLY.c4_ascended = '燼';
ENM.c4_traitor = { n: '등 돌린 제자', hp: 180, atk: 24, w: { strong: 2, rapid: 4, feint: 3, charge: 1 } }; GLY.c4_traitor = '叛';
ENM.c4_raider = { n: '천외의 그림자', hp: 95, atk: 17, w: { strong: 2, rapid: 4, feint: 2, charge: 1 } }; GLY.c4_raider = '影';
ENM.c4_hound = { n: '구천문 추혼사', hp: 260, atk: 30, boss: true, w: { strong: 3, rapid: 2, feint: 3, charge: 3 } }; GLY.c4_hound = '追';
ENM.c4_addict = { n: '혈정에 미친 무인', hp: 105, atk: 18, w: { strong: 4, rapid: 2, feint: 1, charge: 3 } }; GLY.c4_addict = '晶';

/* ================= 기억 ================= */
MEM.c4_rumor = ['하늘 위의 하늘', '자연경 위에 문이 있다는 소문은 서역의 혈정 상인들에게서 시작된다.'];
MEM.c4_ninth = ['설무의 세 번째 허초', '구좌 사자 설무는 세 번째 허초 뒤에 반드시 등을 비운다.'];
MEM.c4_eighth = ['담천의 숨', '팔좌 사자 담천은 크게 운기한 직후 반 호흡 동안 왼쪽이 빈다.'];
MEM.c4_ascend = ['타오르는 문', '혈정으로 문을 열면 몸이 먼저 탄다. 진의 동쪽 자리가 틀려 있다.'];
MEM.c4_stars = ['아홉 별', '구천문의 아홉 자리는 혈월 곁의 아홉 별이다. 구좌는 가장 늦게 뜨고 가장 먼저 진다.'];
MEM.c4_hrrecipe = ['홍란의 마지막 처방', '독초 셋에 약초 아홉, 불은 반 시진. 홍란이 평생 아껴 둔 처방이다.'];
MEM.c4_traitor = ['밤마다 켜지는 등불', '배신할 제자는 몇 달 전부터 밤마다 홀로 하늘을 본다.'];
MEM.c4_yeon = ['연이가 지은 이름', '연이는 오래전부터 당신에게 줄 이름을 정해 두고 있었다.'];

/* ================= 죽음 · 업적 ================= */
DEATHS.c4_eighth = ['팔좌의 손아래서', '담천의 손바닥이 가슴에 닿았다. 뜨거운 것이 등 뒤로 빠져나갔다. 하늘 위의 하늘은 끝내 보지 못했다.'];
DEATHS.c4_ascend = ['문 앞의 불길', '혈정의 불이 옛 동료와 당신을 함께 삼켰다. 산정에는 검은 재 두 무더기만 남았다.'];
DEATHS.c4_raid = ['문하를 지키다', '마지막까지 문 앞에 서 있었다. 등 뒤의 아이들이 달아날 시간은 벌었다.'];
DEATHS.c4_traitor = ['제자의 칼', '가르친 초식이 그대로 돌아왔다. 피하는 법은 가르치지 않았다.'];
ACH.c4_ninthwin = ['아홉째 자리', '구좌 사자 설무를 꺾었다'];
ACH.c4_eighthwin = ['여덟째 자리', '팔좌 사자 담천을 쓰러뜨렸다'];
ACH.c4_heir = ['의발 전수', '제자에게 의발을 물려주었다'];
ACH.c4_alone = ['홀로 걷는 노인', '제자도 문파도 없이 문하의 시대를 홀로 걸었다'];

/* ================= 새 인물 ================= */
addNpc('c4_seolmu', { n: '설무', role: '구천문 구좌 사자', desc: '청의를 입은 여인. 하늘 위를 믿지만 하늘 아래를 버리지 못한다.', world: ['ma', 'jeong', 'wander'], flag: 'c4_seolmu_met', dead: 'c4_seolmuDead' },
  function () {
    scene('설무', npcHead('c4_seolmu') + '<p>' + pick(['설무는 창가에 앉아 하늘만 보고 있었다. “오늘은 별이 하나 덜 떴어.”', '청의 소매에 핏자국이 말라붙어 있었다. 설무는 묻기도 전에 말했다. “내 피는 아니야.”', '설무가 찻잔을 밀어 주었다. “구천문에서는 차를 마시지 않아. 맛을 느끼는 건 아래쪽 사람들의 일이래.”']) + '</p>', [
      { t: '대련을 청한다', h: '전투 · 져도 다치지 않는다 · 내공', f: function () {
        fight('c4_ninth', et() * .9, { auto: true, spar: true, title: '설무와의 대련', win: function () { var q = c4Q(.03); gain('c4_seolmu', 1, '<p>소매 끝이 당신의 목에 닿기 직전에 멈췄다. 이번에는 당신이 반 호흡 빨랐다. 내공 +<b>' + q + '</b></p>'); },
          lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .4)); var q = c4Q(.015); gain('c4_seolmu', 1, '<p>세 번째 허초에 또 속았다. 설무가 웃지도 않고 손을 내밀었다. 내공 +<b>' + q + '</b></p>'); } }); } },
      { t: '구천문에 대해 묻는다', h: '마기 감소 · 소문', f: function () { c4Mad(-10); gain('c4_seolmu', 1, '<p>“아홉 자리 위에는 아무도 없어. 그래서 다들 올라가려는 거야.” 설무는 그 말을 하고 오래 입을 다물었다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { learnMem('c4_ninth'); result('세 번째 허초', npcHead('c4_seolmu') + '<p>“내 버릇을 알려 줄게. 다음에 누가 내 초식을 쓰면, 그 사람도 이렇게 등이 빌 거야.” 설무가 천천히 세 번 손을 흔들었다.</p>', d); } },
   { t: 3, run: function (d) { addMat('scale', 1); addMat('jade', 2); result('하늘의 비늘', npcHead('c4_seolmu') + '<p>설무가 푸른 비늘 한 장과 옥 두 덩이를 내려놓았다. “구좌의 봉록이야. 나보다 당신이 잘 쓰겠지.”</p><p>용린 1 · 옥정 2</p>', d); } }]
);
addNpc('c4_najing', { n: '나경', role: '쫓겨난 천문관', desc: '흠천감에서 쫓겨난 늙은 천문관. 별을 읽고 술을 마신다.', world: ['ma', 'jeong', 'wander'], flag: 'c4_najing_met', dead: 'c4_najingDead' },
  function () {
    scene('나경의 초막', npcHead('c4_najing') + '<p>' + pick(['나경은 지붕에 구멍을 뚫어 놓고 누워 있었다. “별 보는 데 지붕은 거추장스럽지.”', '초막 바닥에 성도(星圖)가 숯으로 그려져 있다. 나경은 그것을 밟지 말라고 소리쳤다.', '나경이 술병을 흔들었다. “빈 병이군. 별 이야기는 술값을 받고 한다.”']) + '</p>', [
      { t: '함께 별을 본다', h: '마기 -12 · 체력 회복', f: function () { c4Mad(-12); c4Heal(.3); gain('c4_najing', 1, '<p>밤새 별자리 이름을 들었다. 반은 잊었다. 그래도 마음이 고요해졌다.</p>'); } },
      { t: '술값을 내고 고서를 풀이받는다', h: '은전 -' + price(80) + ' · 내공', off: S.silver < price(80) ? '은전이 모자란다' : null, f: function () { S.silver -= price(80); var q = c4Q(.03); gain('c4_najing', 1, '<p>나경이 낡은 죽간의 구결을 한 줄씩 짚어 주었다. 별의 운행과 기의 운행이 같다고 했다. 내공 +<b>' + q + '</b></p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { learnMem('c4_stars'); result('아홉 별', npcHead('c4_najing') + '<p>“혈월 곁의 아홉 별, 그게 구천문의 아홉 자리야. 구좌는 가장 늦게 뜨고 가장 먼저 지지.” 나경이 숯으로 별 아홉 개를 찍었다.</p>', d); } },
   { t: 3, run: function (d) { var l = c4Life(2); result('천문 양생법', npcHead('c4_najing') + '<p>“별이 도는 대로 숨을 쉬어 봐. 흠천감 늙은이들이 백 살까지 산 비결이야.”</p><p>' + (l ? '수명 +<b>' + l + '</b>년' : '더 늘릴 수명은 없지만 숨이 고와졌다.') + '</p>', d); } }]
);
addNpc('c4_soya', { n: '강소야', role: '떠돌이 아이', desc: '눈이 매서운 고아. 밥값을 칼로 치르겠다고 우긴다.', world: ['ma', 'jeong', 'wander'], flag: 'c4_soya_met', dead: 'c4_soyaGone' },
  function () {
    scene('강소야', npcHead('c4_soya') + '<p>' + pick(['소야는 나뭇가지로 당신의 초식을 흉내 내고 있었다. 틀린 데가 셋이었다.', '소야가 훔친 만두를 반으로 쪼개 내밀었다. “어르신 몫이에요. 훔친 건 아니고, 빌린 거예요.”', '소야의 손바닥에 물집이 터져 있었다. 밤새 혼자 칼을 휘두른 모양이다.']) + '</p>', [
      { t: '자세를 고쳐 준다', h: '내공 소량 · 신뢰', f: function () { var q = c4Q(.015); gain('c4_soya', 1, '<p>팔꿈치를 조금 내려 주었다. 소야의 가지 끝이 처음으로 바람 소리를 냈다. 가르치는 동안 당신도 배웠다. 내공 +<b>' + q + '</b></p>'); } },
      { t: '밥을 사 준다', h: '은전 -' + price(20) + ' · 체력 · 마기 회복', off: S.silver < price(20) ? '은전이 모자란다' : null, f: function () { S.silver -= price(20); c4Heal(.2); c4Mad(-8); gain('c4_soya', 1, '<p>소야는 세 그릇을 비우고 네 번째 그릇을 싸 갔다. 당신은 한 그릇도 다 먹지 못했다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 3, run: function (d) {
    var full = (S.disc || []).length >= 8;
    scene('무릎', npcHead('c4_soya') + '<p>소야가 땅에 무릎을 꿇었다. “밥값은 다 못 갚았어요. 그러니까 평생 갚게 해 주세요. 제자로.”</p>', [
      { t: '제자로 받는다', h: '제자 +1', off: full ? '제자가 이미 여덟이다' : null, f: function () { S.disc = S.disc || []; S.disc.push({ n: '강소야', p: 20, t: 4, a: 14 }); S.flags.c4_soyaGone = true; S.flags.c4_soyaDisc = true; logE('people', '<b>강소야</b>를 제자로 거두었다.'); result('제자', '<p>소야가 이마를 땅에 세 번 찧었다. 이마에 흙이 묻은 채로 웃었다.</p>', d); } },
      { t: '아직은 아니라고 한다', h: '인연은 그대로', f: function () { result('아직', '<p>“네 칼이 네 밥값을 할 때 다시 오너라.” 소야는 입술을 깨물고 고개를 끄덕였다.</p>', d); } }]);
  } }]
);

/* ================= E5 천외천 (409~504) ================= */
EVENTS.push({ m: 410, id: 'c4_e5open', run: function () {
  var body = ps(
    W('천마총을 지키던 교도 하나가 미쳐서 돌아왔다. 그는 하늘을 가리키며 “문이 열린다”는 말만 되풀이했다.', '맹의 원로 하나가 좌화(坐化)하기 전 이렇게 말했다고 한다. “자연경은 끝이 아니다. 그 위에 문이 있다.”', '객잔 구석에서 서역 상인 둘이 소곤거렸다. 붉은 결정 한 알이면 하늘 위의 하늘을 엿볼 수 있다고.'),
    age() + '세. 이제 웬만한 소문은 귀에 들어오기도 전에 흘려보낸다. 그런데 이 소문은 이상하게 오래 남았다.',
    '하늘 위에도 하늘이 있다. 천외천(天外天). 사람들은 그 말을 농담처럼 했지만, 웃는 얼굴은 하나도 없었다.');
  scene('하늘 위의 하늘', body, [
    { t: '소문의 출처를 쫓는다', h: '기억 · 내공 소량', c: 'primary', f: function () { S.flags.c4_rumor = 1; learnMem('c4_rumor'); var q = c4Q(.02); done('석 달 동안 소문을 거슬러 올라갔다. 끝에는 늘 서역의 혈정 상인이 있었다. 북해에서 처음 보았던 그 붉은 결정이다. 내공 +<b>' + q + '</b>', 'event'); } },
    { t: '흘려듣고 수련에 전념한다', h: '내공 +', f: function () { var q = c4Q(.03); done('하늘 위가 어떻든, 발밑부터 다져야 한다. 한 달 내내 운기만 했다. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '스스로 경지의 끝을 더듬어 본다', h: '내공 크게 · 마기 +12', off: S.realm < 7 ? '생사경 이상이어야 끝이 보인다' : null, f: function () { c4Mad(12); var q = c4Q(.06); done('깊은 입정 속에서 벽을 만졌다. 벽 너머에서 누군가 마주 손을 대고 있는 것 같았다. 식은땀을 흘리며 깨어났다. 내공 +<b>' + q + '</b>', 'insight'); } }], 'night');
} });

EVENTS.push({ m: 420, id: 'c4_ninth', run: function () {
  var know = hasMem('c4_ninth');
  var body = ps('밤에 문이 열렸다. 바람은 불지 않았다. 청의를 입은 여인이 문턱에 서 있었다. 발끝이 땅에서 한 치쯤 떠 있었다.',
    '“구천문(九天門). 아홉 자리 가운데 가장 낮은 구좌(九座)의 사자, 설무.” 여인이 패 하나를 들어 보였다. 아홉 개의 별이 새겨져 있었다.',
    '“당신에게서 돌아오는 자의 냄새가 나. 위에서 당신을 보고 싶어 해. 그 전에, 내가 먼저 봐야겠어.”' + (know ? '<br>— 그 손놀림을 당신은 기억한다. 세 번째 허초 뒤에 등이 빈다.' : ''));
  var after = function (won) {
    S.flags.c4_seolmu_met = true; meet('c4_seolmu');
    if (won) { S.flags.c4_ninthWin = 1; ach('c4_ninthwin'); learnMem('c4_ninth'); var q = c4Q(.06); done('설무가 소매를 거두었다. “아래에도 이런 사람이 있구나.” 그녀는 패를 탁자에 두고 사라졌다. 패에 남은 기운을 빨아들였다. 내공 +<b>' + q + '</b>', 'fight'); }
    else { S.hp = Math.max(1, Math.round(maxHp() * .3)); var q2 = c4Q(.02); done('세 번째 허초에서 무너졌다. 설무는 쓰러진 당신을 내려다보다가 고개를 저었다. “아직이야. 하지만 나쁘지 않아.” 내공 +<b>' + q2 + '</b>', 'fail'); }
  };
  var ch = [
    { t: '시험을 받는다', h: '보스 전투 · 져도 죽지 않는다', c: 'primary', f: function () { fight('c4_ninth', et() + .5, { auto: true, spar: true, title: '구좌의 사자', heal: .3, win: function () { after(true); }, lose: function () { after(false); } }); } },
    { t: '문을 닫는다', h: '마기 -8 · 설무는 다시 온다', f: function () { S.flags.c4_refused9 = 1; S.flags.c4_seolmu_met = true; meet('c4_seolmu'); c4Mad(-8); done('“하늘 위의 손님은 받지 않소.” 문을 닫았다. 문틈으로 웃음소리가 새어 들었다. “그럼 다음엔 아래로 내려올게.”', 'event'); } }];
  if (know) ch.unshift({ t: '세 번째 허초를 기다린다', h: '[기억] 유리한 보스 전투', f: function () { fight('c4_ninth', et() + .5, { auto: true, spar: true, hpMul: .65, title: '구좌의 사자', heal: .4, win: function () { after(true); }, lose: function () { after(false); } }); } });
  scene('구좌의 사자', body, ch, 'night');
} });

EVENTS.push({ m: 432, id: 'c4_stars', run: function () {
  S.flags.c4_najing_met = true; meet('c4_najing');
  var body = ps(W('총단 서고로 늙은 천문관 하나가 굴러들어 왔다.', '맹의 문객 가운데 흠천감에서 쫓겨난 늙은이가 있었다.', '산마을 초막에 별을 보는 늙은이가 산다고 했다.') + ' 이름은 나경. 조정이 무림을 칠 때 별자리를 잘못 읽었다는 죄로 쫓겨났다고 했다.',
    '“잘못 읽은 게 아니야. 혈월 곁에 별 아홉이 떠 있었어. 그걸 보고했더니 미쳤다더군.” 나경이 숯으로 바닥에 별을 그렸다.',
    '“구좌는 가장 늦게 뜨고 가장 먼저 지지. 그래서 아무도 그 자리를 못 봐. 오늘 밤 아홉 별 가운데 하나가 비어 있어. 어느 쪽인지 맞혀 봐.”');
  var right = function () { S.flags.c4_clue = 1; learnMem('c4_stars'); var q = c4Q(.04); done('나경이 술병을 떨어뜨렸다. “맞아. 늦게 떠서 먼저 지는 자리. 구좌가 비었어. 누군가 그 자리를 떠난 거야.” 별을 읽는 동안 기가 별을 따라 돌았다. 내공 +<b>' + q + '</b>', 'insight'); };
  var wrong = function (t) { var q = c4Q(.01); done(t + ' 나경이 혀를 찼다. “틀렸어. 그래도 별을 오래 본 눈은 좋아지지.” 내공 +<b>' + q + '</b>', 'event'); };
  scene('쫓겨난 천문관', body, [
    { t: '동쪽 지평선에 막 뜬 흐린 별', h: '늦게 뜨고 먼저 지는 자리', f: right },
    { t: '혈월 바로 곁의 가장 붉은 별', h: '가장 눈에 띄는 자리', f: function () { wrong('붉은 별을 가리켰다.'); } },
    { t: '정수리 위의 가장 밝은 별', h: '가장 높은 자리', f: function () { wrong('가장 높은 별을 가리켰다.'); } }], 'night');
} });

EVENTS.push({ m: 444, id: 'c4_ascend', cond: function () { return !!c4Friend(); }, run: function () {
  var k = c4Friend(), nm = C4_FRIEND[k][0], dead = C4_FRIEND[k][1], know = hasMem('c4_ascend') || S.flags.c4_clue;
  var line = ({ bw: '“무당의 도는 하늘로 오르는 길이라 배웠지. 평생 칼만 잘 썼어. 이번엔 하늘을 써 보려고.”', sm: '“그림자로 평생 살았다. 한 번쯤은 빛 속으로 들어가 보고 싶어.”', jg: '“천하제일의 책사가 하늘의 수를 못 읽는다면 웃음거리지.”' })[k];
  var body = ps('서신이 왔다. ' + nm + '의 필적이었다. 손이 떨린 자국이 있었다.',
    line, '그는 혈정 아홉 알을 모았다고 했다. 다음 혈월에 산정에서 진을 펼쳐 문을 열겠다고. 마지막 줄은 이랬다. “보러 와 주게. 혼자 오르기엔 너무 높아서.”');
  var gone = function () { S.flags[dead] = true; S.flags.c4_friendGone = k; };
  var ch = [
    { t: '산정으로 가서 곁을 지킨다', h: know ? '[단서] 진의 틀린 자리를 고칠 수 있다' : '무엇이 일어날지 모른다 · 위험', c: 'primary', f: function () {
      if (know) {
        pages('산정의 혈월', [ps('붉은 달 아래 혈정 아홉 알이 원을 그리며 놓여 있었다. 동쪽 자리 하나가 어긋나 있었다. 당신은 말없이 그 돌을 한 치 옮겼다.', nm + '이 당신을 보았다. 설명할 필요는 없었다.'), ps('빛이 기둥처럼 섰다. ' + nm + '의 몸이 타지 않고 엷어졌다. 마지막으로 그가 웃었다. “먼저 가서 자리를 봐 두겠네.”', '빛이 걷혔을 때 그는 없었다. 땅에는 별 아홉이 새겨진 패 하나가 남아 있었다.')], 'night', function () {
          gone(); S.flags.c4_ascendOk = 1; var q = c4Q(.08); addMat('core', 1); done(nm + '은(는) 하늘 위로 갔다. 살았는지 죽었는지는 아무도 모른다. 남은 기운이 당신에게 스몄다. 내공 +<b>' + q + '</b> · 영단 1', 'realm');
        });
      } else {
        pages('산정의 혈월', [ps('붉은 달 아래 혈정 아홉 알이 원을 그리며 놓여 있었다. ' + nm + '이 원 한가운데 앉았다.', '빛이 섰다. 그런데 빛이 위로 오르지 않고 안으로 파고들었다. ' + nm + '의 비명이 불길에 묻혔다.'), ps('불이 꺼졌을 때, 거기에는 사람이 아닌 것이 서 있었다. 눈구멍에서 붉은 불이 흘렀다.')], 'night', function () {
          gone(); learnMem('c4_ascend');
          fight('c4_ascended', et() + .6, { auto: true, title: '불타는 혼백', heal: .3, win: function () { var q = c4Q(.07); addMat('bone', 3); done('혼백이 무너지며 재가 되었다. 재 속에서 ' + nm + '의 목소리가 한 번 들렸다. “고맙네.” 진의 동쪽 자리가 어긋나 있었다는 것을 그제야 보았다. 내공 +<b>' + q + '</b>', 'fight'); },
            lose: c4Lethal('c4_ascend', function () { done('불길에 밀려 산 아래로 굴렀다. 다시 올라갔을 때는 재뿐이었다.', 'fail'); }) });
        });
      }
    } },
    { t: '말린다', h: tr(k) >= 3 ? '신뢰가 깊다 · 그가 멈출지도 모른다' : '신뢰가 얕다 · 듣지 않을 수 있다', f: function () {
      if (tr(k) >= 3 || (k === 'jg' && S.realm >= 7)) { S.flags.c4_ascendStop = k; if (NPC[k]) S.trust[k] = tr(k) + 1; c4Mad(-10); done('밤새 술을 마시며 말렸다. 새벽에 ' + nm + '이 혈정을 하나씩 강물에 던졌다. “하늘은 다음 생에 보지.” 그 말이 농담인지 알 수 없었다.', 'people'); }
      else { gone(); learnMem('c4_ascend'); c4Mad(8); done(nm + '은(는) 듣지 않았다. 다음 혈월 밤, 먼 산정에서 붉은 기둥이 솟았다가 꺼졌다. 다음 날 올라가 보니 재뿐이었다.', 'fail'); }
    } },
    { t: '가지 않는다', h: '그는 혼자 오른다 · 유품', f: function () { gone(); addMat('jade', 2); c4Mad(6); done('가지 않았다. 혈월 밤에 먼 산정이 붉게 타올랐다. 한 달 뒤 ' + nm + '의 유품이라며 옥 두 덩이가 왔다. 서신은 없었다. 옥정 2', 'fail'); } }];
  scene('승천', body, ch, 'night');
} });

EVENTS.push({ m: 456, id: 'c4_hunt', run: function () {
  var know = hasMem('c4_eighth');
  var body = ps(W('교도들이 하나둘 사라졌다. 모두 혈공을 깊이 익힌 자들이었다. 시신은 피 한 방울 없이 말라 있었다.', '맹의 고수들이 실종되었다. 남은 것은 몸속의 기가 모두 빠져나간 시신뿐이었다.', '이 고을 저 고을에서 이름난 무인들이 말라 죽었다. 사람들은 귀신 짓이라 했다.'),
    '시신 곁에는 늘 같은 흔적이 있었다. 별 아홉 개가 새겨진 발자국.',
    '구천문 시자들이 혈월의 기운을 거두고 있다. 당신 차례가 오는 것도 시간문제였다.');
  var ch = [
    { t: '흔적을 쫓아 시자를 친다', h: '전투 · 은전과 보석', c: 'primary', f: function () { fight('c4_herald', et() * 1.05, { auto: true, spar: true, title: '구천문 시자', win: function () { var g = c4Silver(220); addMat('gem', 1); S.flags.c4_huntWon = 1; done('시자의 가면이 깨졌다. 속은 텅 비어 있었다. 사람의 껍데기에 기를 채운 것이었다. 몸에 지닌 은전 <b>' + g + '</b>냥과 보석 하나를 거두었다.', 'fight'); },
      lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('시자는 싸우다 말고 물러갔다. 당신의 기를 맛본 것만으로 충분하다는 듯이.', 'fail'); } }); } },
    { t: '혈공을 익힌 자들을 피신시킨다', h: '마기 -10 · 인연', f: function () { c4Mad(-10); S.flags.c4_sheltered = 1; done('혈공을 익힌 이들을 모아 깊은 골짜기로 옮겼다. 몇은 살았고 몇은 늦었다. 살아남은 이들이 당신의 이름을 기억하기로 했다.', 'people'); } },
    { t: '시자 하나를 사로잡아 심문한다', h: know ? '[기억] 이미 안다 · 내공' : '팔좌의 비밀을 캔다 · 위험', off: S.realm < 5 ? '화경 이상이어야 사로잡을 수 있다' : null, f: function () {
      if (know) { var q = c4Q(.04); done('물어볼 것도 없었다. 담천의 숨이 어디서 끊기는지 당신은 이미 안다. 시자를 단칼에 베고 그 기운을 거두었다. 내공 +<b>' + q + '</b>', 'qi'); return; }
      hurt(.25); learnMem('c4_eighth'); S.flags.c4_know8 = 1; done('시자는 혀를 깨물기 전에 한마디를 흘렸다. “팔좌께서는… 크게 숨을 들이켠 뒤… 왼쪽이…” 그 말을 마치지 못했다. 그것으로 충분했다.', 'event'); } }];
  scene('말라 죽은 무인들', body, ch, 'loc_forest');
} });

EVENTS.push({ m: 468, id: 'c4_hrlast', run: function () {
  if (!alive('hr')) {
    scene('약당의 유품', ps('홍란 밑에서 약을 배웠다는 늙은 약사가 찾아왔다. 품에 낡은 상자 하나를 안고 있었다.', '“선생님이 살아 계실 때 말씀하셨습니다. 언젠가 그 사람이 쉰을 넘기면 이걸 주라고.”', '상자 안에는 마른 약초와 쪽지 한 장. 글씨는 바래 있었지만 알아볼 수 있었다. <i>“아직 살아 있구나. 그럼 됐어.”</i>'), [
      { t: '처방대로 약을 달인다', h: '마기 정화 · 체력 회복 · 기억', c: 'primary', f: function () { S.mad = 0; S.hp = maxHp(); learnMem('c4_hrrecipe'); done('쓴맛이 혀끝에서 오래 갔다. 그녀가 늘 말하던 쓴맛이었다. 마기가 말끔히 가라앉았다.', 'rest'); } },
      { t: '약초를 그대로 간직한다', h: '약초 +6', f: function () { addMat('herb', 6); done('상자를 닫았다. 쓰지 못할 것 같았다. 약초 <b>6</b>', 'item'); } }], 'night');
    return;
  }
  var body = ps('홍란이 쓰러졌다는 전갈이 왔다. 평생 독을 만진 손이 마침내 그녀의 몸을 거꾸로 삼키고 있었다.',
    '약방에서는 여전히 쓴 냄새가 났다. 홍란은 누운 채로 당신의 손목을 잡았다. 맥을 짚는 버릇은 끝까지 남아 있었다.',
    '“맥이 거칠어. 오래 못 가는 몸이라고 내가 말했었지. 근데 나보다 오래 가네.” 그녀가 웃었다. “마지막 약이야. 둘 중 하나만 지을 힘이 남았어.”');
  var end = function (txt, kind) {
    S.flags.hrDead = true; learnMem('c4_hrrecipe');
    pages('홍란', [ps(txt), ps('그날 밤 홍란은 눈을 감았다. 마지막 말은 처방이었다. “독초 셋, 약초 아홉, 불은 반 시진. 잊지 마.”', '당신은 그 말을 외웠다. 다음 생에도 잊지 않을 것이다.')], 'night', function () { done('홍란이 세상을 떠났다. 약당의 불이 꺼졌다.', kind); });
  };
  scene('마지막 약', body, [
    { t: '목숨을 잇는 약을 받는다', h: '수명 +2년', c: 'primary', f: function () { var l = c4Life(2); end('홍란이 떨리는 손으로 환약을 굴렸다. “오래 살아. 지겨울 만큼.” ' + (l ? '수명 +<b>' + l + '</b>년' : '몸은 이미 한계까지 버티고 있었지만, 약은 따뜻했다.'), 'rest'); } },
    { t: '마기를 씻는 약을 받는다', h: '마기 0 · 최대 체력 +10', f: function () { S.mad = 0; S.hpBonus = (S.hpBonus || 0) + 10; S.hp = maxHp(); end('홍란이 침 아홉 대를 놓았다. 평생 들러붙어 있던 붉은 것이 빠져나갔다. “이제야 네 맥이 사람 맥 같네.” 최대 체력 +<b>10</b>', 'rest'); } },
    { t: '약은 됐다며 곁에 앉는다', h: '아무것도 받지 않는다 · 마음', f: function () { c4Mad(-20); var q = c4Q(.04); end('“약은 당신이 드시오.” 홍란이 처음으로 소리 내어 울었다. 그리고 그 손으로 당신의 손을 오래 쥐었다. 내공 +<b>' + q + '</b>', 'people'); } }], 'night');
} });

EVENTS.push({ m: 480, id: 'c4_eighth', run: function () {
  var know = hasMem('c4_eighth'), sm = S.flags.c4_seolmu_met && !S.flags.c4_seolmuDead;
  var body = ps((sm ? '한 달 전 설무가 짧은 쪽지를 보냈다. <i>“여덟째가 내려가. 도망쳐.”</i> 도망치지 않았다. ' : '') + '하늘이 낮아졌다. 구름이 땅에 닿을 듯 내려앉더니 그 사이로 사람 하나가 걸어 나왔다.',
    '키가 크고 손이 컸다. 손바닥에 붉은 별 여덟 개가 박혀 있었다. “팔좌의 사자, 담천. 구좌는 너를 시험했다지. 나는 거둔다.”',
    '“돌아오는 자의 혈월. 그 기운이면 문이 반 뼘은 열리지.”' + (know ? '<br>— 당신은 그의 숨을 안다. 크게 들이켠 뒤 반 호흡, 왼쪽이 빈다.' : ''));
  var win = function () { S.flags.c4_eighthDead = 1; ach('c4_eighthwin'); var q = c4Q(.1); addMat('core', 1); addMat('scale', 1); done('담천의 손바닥이 당신의 어깨를 스쳤고, 당신의 칼이 그의 왼쪽으로 들어갔다. 하늘 위의 사람도 피는 붉었다. 그가 쥐고 있던 기운이 당신에게 쏟아졌다. 내공 +<b>' + q + '</b> · 영단 1 · 용린 1', 'fight'); };
  var survive = function () { S.flags.c4_eighthLive = 1; done('바닥에 쓰러졌다. 담천은 당신의 기운을 한 움큼 쥐어 가고는 하늘로 돌아갔다. 숨은 붙어 있었다.', 'fail'); };
  var ch = [
    { t: '맞선다', h: '보스 · 목숨을 건 싸움 · 이기면 큰 보상', c: 'primary', f: function () { fight('c4_eighth', et() + .8, { auto: true, title: '팔좌의 사자', heal: .4, hpMul: know ? .75 : 1, win: win, lose: c4Lethal('c4_eighth', survive) }); } }];
  if (S.sect || (S.disc || []).length) ch.push({ t: (S.sect ? esc(S.sect.n) + '의 문도들' : '제자들') + '과 진을 짜서 맞선다', h: '보스 · 덜 위험하다 · 대신 문하가 다친다', f: function () {
    fight('c4_eighth', et() + .5, { auto: true, title: '팔좌의 사자', heal: .5, hpMul: (know ? .75 : 1) * .85, win: function () { (S.disc || []).forEach(function (d) { c4Up(d, 6); }); win(); },
      lose: c4Lethal('c4_eighth', survive) }); } });
  ch.push({ t: '물러나 몸을 숨긴다', h: '체력 -30% · 마기 +10 · 그는 살아남는다', f: function () { hurt(.3); c4Mad(10); S.flags.c4_eighthLive = 1; S.flags.c4_fled8 = 1; done('등을 보였다. 담천이 웃었다. “어차피 다시 온다.” 사흘 밤낮을 달려 그의 기척에서 벗어났다.', 'fail'); } });
  scene('팔좌의 사자', body, ch, 'siege');
} });

EVENTS.push({ m: 492, id: 'c4_seolmu', run: function () {
  if (!S.flags.c4_seolmu_met || S.flags.c4_seolmuDead) {
    scene('버려진 패', ps('산길에 시신 하나가 쓰러져 있었다. 청의를 입은 여인이었다. 얼굴은 보이지 않았다.', '손에는 별 아홉 개가 새겨진 패가 쥐어져 있었다. 아홉째 별이 칼로 긁혀 지워져 있었다.'), [
      { t: '시신을 묻어 주고 패를 거둔다', h: '내공 · 단서', f: function () { S.flags.c4_clue = 1; var q = c4Q(.03); done('양지바른 곳에 묻었다. 패에서 차가운 기가 흘러나왔다. 하늘 위의 누군가가 아래를 내려다보는 기운이었다. 내공 +<b>' + q + '</b>', 'event'); } },
      { t: '패를 팔아 버린다', h: '은전', f: function () { var g = c4Silver(260); done('패를 서역 상인에게 넘겼다. 상인은 값을 깎지도 않았다. 은전 <b>' + g + '</b>냥', 'item'); } }], 'loc_hill');
    return;
  }
  var body = ps('비 오는 밤, 설무가 문 앞에 쓰러져 있었다. 청의가 피로 검게 젖어 있었다.',
    S.flags.c4_eighthDead ? '“여덟째가 죽었어. 아래로 내려간 내 탓이래. 구좌는 이제 빈자리야.”' : '“여덟째에게 당신이 있는 곳을 말하지 않았어. 그게 죄래.”',
    '그녀는 웃으려다 기침을 했다. “하늘 위에서 쫓겨난 사람은 어디로 가야 해?”');
  scene('구좌의 선택', body, [
    { t: '숨겨 준다', h: '설무가 남는다 · 내공 · 신뢰', c: 'primary', f: function () { S.flags.c4_seolmuAlly = 1; S.trust.c4_seolmu = tr('c4_seolmu') + 1; var q = c4Q(.04); done('다락방을 내주었다. 설무는 사흘을 내리 잤다. 깨어나서 처음 한 말은 “차가 쓰네”였다. 그녀가 남은 기를 나눠 주었다. 내공 +<b>' + q + '</b>', 'people'); } },
    { t: '구천문이 있는 곳을 묻는다', h: '단서 · 그녀는 떠난다', f: function () { S.flags.c4_gateKnown = 1; S.flags.c4_clue = 1; learnMem('c4_stars'); S.flags.c4_seolmuDead = true; done('“혈월이 가장 붉을 때, 천마총 가장 깊은 곳 위에 문이 선다.” 설무는 그 말만 남기고 빗속으로 사라졌다. 다시는 오지 않았다.', 'event'); } },
    { t: '내쫓는다', h: '은전 · 그녀는 죽는다', f: function () { S.flags.c4_seolmuDead = true; var g = c4Silver(180); c4Mad(10); done('문을 닫았다. 아침에 문 앞에는 패 하나만 남아 있었다. 패를 팔았다. 은전 <b>' + g + '</b>냥. 그 돈으로 산 술은 맛이 없었다.', 'fail'); } }], 'night');
} });

EVENTS.push({ m: 503, id: 'c4_e5end', run: function () {
  var lost = [];
  if (S.flags.hrDead) lost.push('홍란');
  if (S.flags.c4_friendGone) lost.push(C4_FRIEND[S.flags.c4_friendGone][0]);
  var body = ps(age() + '세의 겨울. 눈이 내렸다. 밤하늘에 붉은 달이 걸리고, 그 곁에 별 아홉이 희미하게 떴다. 이제는 그 별이 보인다.',
    (lost.length ? lost.join(', ') + '의 이름을 부를 사람이 하나 줄었다. ' : '') + '하늘 위에 하늘이 있다는 것을, 이제는 소문이 아니라 손바닥의 감각으로 안다.',
    '남은 생을 어디로 향할지 정할 때가 왔다.');
  scene('별 아홉', body, [
    { t: '문을 찾아 오르겠다', h: '내공 · 이후 구천문과 엮인다', f: function () { S.flags.c4_stance = 'seek'; var q = c4Q(.04); done('하늘을 향해 손을 뻗었다. 닿지 않았다. 아직은. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '문을 닫겠다', h: '마기 -15 · 이후 구천문과 맞선다', c: 'primary', f: function () { S.flags.c4_stance = 'shut'; c4Mad(-15); done('하늘 위의 누구도 아래 사람의 피로 문을 열게 두지 않겠다. 그렇게 다짐하자 마음이 오히려 가벼워졌다.', 'event'); } },
    { t: '지켜보겠다', h: '체력 회복 · 결정을 미룬다', f: function () { S.flags.c4_stance = 'watch'; S.hp = maxHp(); done('늙은이가 서두를 일은 없다. 눈 내리는 소리를 오래 들었다.', 'rest'); } }], 'night');
} });

/* ================= E6 문하의 시대 (505~600) ================= */
EVENTS.push({ m: 506, id: 'c4_e6open', run: function () {
  var ds = c4Disc();
  if (ds.length) {
    var body = ps(age() + '세의 봄. ' + (S.sect ? c4SectName() + '의 뜰에서' : '마당에서') + ' 제자들이 새벽 수련을 하고 있었다. 칼 소리가 고르지 않았다. 고르지 않은 것이 좋았다.',
      ds.map(function (d) { return c4DN(d) + '(' + d.a + '세)'; }).join(', ') + '. 하나하나 거둔 날이 기억났다.',
      '아이들이 서로를 곁눈질하기 시작했다. 누가 맏이인가. 이제 그것을 정해 줄 때가 되었다.');
    var ch = ds.slice(0, 3).map(function (d) { return { t: esc(d.n) + '을(를) 맏제자로 세운다', h: '수련 ' + d.p + ' · 재능 ' + '★'.repeat(d.t), f: function () { S.flags.c4_heir = d.n; c4Up(d, 8); done(c4DN(d) + '이(가) 무릎을 꿇었다. 다른 아이들의 눈빛이 잠깐 흔들렸다가 가라앉았다. 가라앉지 않은 눈도 하나쯤 있었다.', 'people'); } }; });
    ch.push({ t: '아직 정하지 않는다', h: '모두 조금씩 자란다 · 다툼의 씨앗', f: function () { S.flags.c4_noHeir = 1; ds.forEach(function (d) { c4Up(d, 3); }); done('“맏이는 칼이 정한다.” 그 말에 아이들의 수련이 사나워졌다.', 'people'); } });
    scene('문하의 봄', body, ch, 'dawn');
    return;
  }
  scene('빈 마당', ps(age() + '세의 봄. 마당에 칼 소리가 없었다. 당신의 칼 소리뿐이었다.', W('교도들은 당신을 어려워했고, 아무도 곁에서 배우려 하지 않았다.', '맹의 젊은이들은 당신의 이름을 알았지만 문 앞까지 오지는 않았다.', '떠도는 사람에게는 문하가 없다.'),
    '담장 너머에서 아이 하나가 당신의 수련을 훔쳐보고 있었다. 눈이 매서웠다.'), [
    { t: '아이에게 밥을 사 준다', h: '새 인연', c: 'primary', f: function () { S.flags.c4_soya_met = true; meet('c4_soya'); done('아이의 이름은 강소야. 부모는 없고 칼은 있다고 했다. 칼이라야 나뭇가지였다. “어르신 칼, 저도 배울 수 있어요?” 대답하지 않았다. 대신 다음 날도 밥을 샀다.', 'people'); } },
    { t: '홀로 수련을 잇는다', h: '내공 · 고독한 길', f: function () { S.flags.c4_alone = 1; var q = c4Q(.05); done('담장 너머의 기척은 곧 사라졌다. 칼은 여전히 홀로 무거웠다. 내공 +<b>' + q + '</b>', 'qi'); } }], 'dawn');
} });

EVENTS.push({ m: 518, id: 'c4_tourney', run: function () {
  var d = c4Top(), place = W('혈투장', '무림대회', '강남 객잔 연합의 비무대');
  if (!d) {
    var who = W('장로회', '맹의 원로원', '옛 친구');
    scene('은거의 권유', ps(who + '에서 사람이 왔다. 깊은 산의 초막 한 채와 밭뙈기를 내주겠다고 했다.', '“이제 칼은 젊은이들에게 맡기시지요.” 정중한 말이었다. 속뜻은 짐작이 갔다. 늙은 고수는 쓰기도 버리기도 곤란하다.'), [
      { t: '초막을 받아 들어간다', h: '수명 +2년 · 체력 회복', f: function () { S.flags.c4_hermitage = 1; var l = c4Life(2); S.hp = maxHp(); done('산은 조용했다. 아침마다 물을 긷고 저녁마다 칼을 닦았다. ' + (l ? '수명 +<b>' + l + '</b>년' : '몸은 그대로였지만 마음이 쉬었다.'), 'rest'); } },
      { t: '거절한다', h: '내공 · 마기 +5', c: 'primary', f: function () { c4Mad(5); var q = c4Q(.03); done('“칼을 내려놓는 날은 내가 정하오.” 사자는 고개를 숙이고 물러갔다. 그날 밤 칼을 평소보다 오래 휘둘렀다. 내공 +<b>' + q + '</b>', 'qi'); } }], 'loc_hill');
    return;
  }
  scene('제자의 비무', ps(place + '에 ' + c4DN(d) + '의 이름이 올랐다. 당신의 이름을 등에 지고 나가는 첫 싸움이다.', c4DN(d) + '이(가) 밤늦게 찾아왔다. “사부님, 이길 수 있을까요?” 손이 떨리고 있었다.'), [
    { t: '숨겨 둔 초식 하나를 전수한다', h: '제자 수련 +12 · 내공 소량', c: 'primary', f: function () { c4Up(d, 12); var q = c4Q(.02); done('밤새 초식 하나를 가르쳤다. 새벽에 ' + c4DN(d) + '의 칼이 처음으로 당신의 소매를 베었다. 내공 +<b>' + q + '</b>', 'people'); } },
    { t: '아무것도 가르치지 않고 내보낸다', h: '제자의 실력에 달렸다', f: function () {
      if (d.p >= 55 || Math.random() < .35) { c4Up(d, 8); var g = c4Silver(300); S.flags.c4_tourneyWon = d.n; done(c4DN(d) + '이(가) ' + place + '에서 이겼다. 상금은 은전 <b>' + g + '</b>냥. 제자는 그 돈을 모두 당신 앞에 내려놓았다.', 'people'); }
      else { c4Up(d, 5); done(c4DN(d) + '이(가) 졌다. 돌아와서 한마디도 하지 않고 새벽까지 칼을 휘둘렀다. 지는 법을 배운 것이다.', 'fail'); } } },
    { t: '비무대의 심판을 맡는다', h: '은전 · 명성', f: function () { var g = c4Silver(150); c4Up(d, 3); done('늙은 고수가 심판석에 앉자 비무대가 조용해졌다. 제자는 당신의 눈을 피해 싸웠다. 사례금 <b>' + g + '</b>냥', 'event'); } }], 'arena');
} });

EVENTS.push({ m: 530, id: 'c4_yeon', run: function () {
  if (!alive('yn')) {
    scene('이름 없는 무덤', ps('연이의 무덤을 찾았다. 비석에는 이름이 없다. 그 아이는 당신에게 이름을 지어 주려 했고, 정작 자기 이름은 비석에 남기지 못했다.', '무덤가에 들꽃이 피어 있었다.'), [
      { t: '비석에 이름을 새긴다', h: '마기 -20', c: 'primary', f: function () { c4Mad(-20); done('칼끝으로 비석에 두 글자를 새겼다. 연이(蓮伊). 손이 떨려 획이 비뚤었다. 그래도 됐다.', 'people'); } },
      { t: '말없이 술 한 잔을 따른다', h: '체력 회복', f: function () { S.hp = maxHp(); done('술 한 잔을 따르고, 한 잔은 마셨다. 해가 질 때까지 앉아 있었다.', 'rest'); } }], 'night');
    return;
  }
  var nm = pick(['월하(月下)', '소운(素雲)', '무진(無塵)']);
  var body = ps((S.flags.fleeWith ? '평생 곁에 있던 연이가 자리에 누웠다.' : '연이가 앓아누웠다는 소식에 밤길을 달렸다.') + ' 머리는 하얗게 세었고, 해진 소매를 꿰매던 손은 이제 바늘을 쥐지 못했다.',
    '“이름 지어 주겠다던 약속, 아직 안 잊었어.” 연이가 웃었다. “사실은 진작 정해 놨어. 부르면 네가 대답 안 할까 봐 못 불렀지.”',
    '“' + nm + '. 붉은 달 말고, 다른 것 아래 사는 사람 같아서.”');
  S.flags.c4_ynName = nm;
  var end = function (txt, kind) { S.flags.ynDead = true; learnMem('c4_yeon'); pages('연이', [ps(txt), ps('그 봄이 끝나기 전에 연이가 눈을 감았다. 마지막까지 당신을 그 이름으로 불렀다.', '처음 만난 시종 숙소의 좁은 방이 떠올랐다. 식은 만두 하나를 나눠 먹던 밤. 내일은 꼭 고기를 먹자던 말.')], 'night', function () { done('연이가 세상을 떠났다. 당신에게 이름 하나를 남기고.', kind); }); };
  var ch = [
    { t: '그 이름으로 대답한다', h: '마기 0 · 체력 회복', c: 'primary', f: function () { S.mad = 0; S.hp = maxHp(); end('“응.” 대답했다. 쉰 해 넘게 걸린 대답이었다. 연이가 눈을 감고 오래 웃었다.', 'people'); } },
    { t: '업고 바깥 구경을 시켜 준다', h: '내공 · 마지막 나들이', f: function () { var q = c4Q(.05); end('연이를 업고 강가까지 걸었다. 가벼웠다. 너무 가벼웠다. 연이는 물에 비친 달을 보고 “하나도 안 붉네” 했다. 내공 +<b>' + q + '</b>', 'people'); } }];
  ch.push({ t: '영단을 달여 먹인다', h: '영단 -1 · 연이가 몇 해 더 산다', off: mat('core') < 1 ? '영단이 없다' : null, f: function () { S.mat.core -= 1; S.flags.c4_ynSaved = 1; learnMem('c4_yeon'); done('영단을 달여 한 숟갈씩 먹였다. 사흘 만에 연이가 일어나 앉았다. “아까운 걸 왜 나한테 써.” 그래도 몇 해는 더 그 이름으로 불릴 것이다.', 'people'); } });
  scene('지어 둔 이름', body, ch, 'night');
} });

EVENTS.push({ m: 542, id: 'c4_betray', run: function () {
  var ds = c4Disc(), know = hasMem('c4_traitor');
  if (!ds.length) {
    scene('이름을 훔친 자', ps('당신의 이름을 대며 문도를 모으는 자가 있다는 소문이 들려왔다. “' + W('혈월봉', '맹', '강호') + '의 그 노고수가 나의 사부다.”', '그는 제자들에게 혈정을 먹이고 있었다. 별 아홉이 새겨진 패를 차고.'), [
      { t: '찾아가 가면을 벗긴다', h: '전투 · 은전', c: 'primary', f: function () { fight('c4_raider', et() * 1.1, { auto: true, spar: true, title: '이름을 훔친 자', win: function () { var g = c4Silver(240); done('가면 아래는 아무것도 아닌 얼굴이었다. 그는 혈정 한 줌을 남기고 달아났다. 아이들을 흩어 보냈다. 압수한 은전 <b>' + g + '</b>냥', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('늙은 몸이 따라가지 못했다. 그는 당신의 이름을 그대로 쥐고 사라졌다.', 'fail'); } }); } },
      { t: '내버려 둔다', h: '마기 +6', f: function () { c4Mad(6); done('이름 따위 가져가라지. 그렇게 생각했지만, 밤마다 그 이름이 남의 입에서 불리는 꿈을 꾸었다.', 'event'); } }], 'loc_village');
    return;
  }
  var cand = ds.filter(function (d) { return d.n !== S.flags.c4_heir; });
  var d = cand.length ? cand[0] : ds[0];
  var body = ps(c4DN(d) + '의 방에 밤마다 등불이 켜져 있었다. 창 너머로 그 아이가 홀로 하늘을 보는 모습이 보였다.',
    '어느 새벽, 서고의 비급 한 권과 함께 ' + c4DN(d) + '이(가) 사라졌다. 탁자 위에 쪽지가 있었다. <i>“사부님은 땅에 머무르세요. 저는 위로 갑니다.”</i>',
    '쪽지 귀퉁이에 별 아홉이 그려져 있었다.');
  var ch = [];
  if (know) ch.push({ t: '[기억] 등불이 켜지던 첫날 불러 앉힌다', h: '배신을 막는다 · 제자 수련 +10', c: 'primary', f: function () { c4Up(d, 10); S.flags.c4_betrayStopped = d.n; done('사실은 쪽지가 남기 전이었다. 등불이 처음 켜진 밤, ' + c4DN(d) + '을(를) 불러 차를 따랐다. “하늘 이야기는 나도 들었다. 나도 한때 올라가 보고 싶었지.” 아이는 울었고, 등불은 다시 켜지지 않았다.', 'people'); } });
  ch.push({ t: '쫓아가 막는다', h: '전투 · 이기면 데려온다', c: know ? null : 'primary', f: function () {
    ENM.c4_traitor.n = d.n;
    fight('c4_traitor', et() * .9 + d.p / 60, { auto: true, spar: true, title: '등 돌린 제자', win: function () {
      scene('무릎 꿇은 제자', '<p>' + c4DN(d) + '이(가) 칼을 떨어뜨리고 무릎을 꿇었다. 손에는 아직 비급이 쥐어져 있었다.</p>', [
        { t: '용서하고 데려온다', h: '제자가 남는다 · 마기 -8', f: function () { c4Up(d, 5); c4Mad(-8); S.flags.c4_forgave = d.n; done('비급을 받아 들고 아이의 어깨를 두드렸다. 돌아오는 길 내내 둘 다 말이 없었다.', 'people'); } },
        { t: '파문한다', h: '제자를 잃는다 · 비급과 내공', f: function () { c4Drop(d); learnMem('c4_traitor'); var q = c4Q(.04); done(c4DN(d) + '의 무공을 거두었다. 혈맥을 짚는 손이 떨렸다. 아이는 이름 없는 사람이 되어 산을 내려갔다. 내공 +<b>' + q + '</b>', 'fail'); } }]);
    }, lose: function () { c4Drop(d); learnMem('c4_traitor'); S.hp = Math.max(1, Math.round(maxHp() * .3)); done('당신이 가르친 초식이 당신의 가슴을 쳤다. ' + c4DN(d) + '은(는) 쓰러진 사부에게 절을 하고 떠났다.', 'fail'); } });
  } });
  ch.push({ t: '보내 준다', h: '제자를 잃는다 · 마기 +10', f: function () { c4Drop(d); learnMem('c4_traitor'); c4Mad(10); done('쫓지 않았다. 하늘을 보는 아이를 땅에 붙들어 둘 방법은 없다. 그것을 너무 늦게 알았다.', 'fail'); } });
  scene('밤마다 켜지는 등불', body, ch, 'night');
} });

EVENTS.push({ m: 554, id: 'c4_oldfriends', run: function () {
  var bw = S.flags.bw && !S.flags.bwDead, sm = S.flags.sm && !S.flags.smDead;
  if (bw) {
    scene('백운의 마지막 대련', npcHead('bw') + ps('백운이 찾아왔다. 머리가 학처럼 희었다. 칼 쓰는 자세는 그대로 반듯했다.', '“무당산으로 돌아가네. 다시는 내려오지 않을 거야. 그 전에 한 번만.” 그가 칼을 뽑았다.'), [
      { t: '마지막 대련을 받는다', h: '전투 · 져도 다치지 않는다', c: 'primary', f: function () { fight('bw', et() + .3, { auto: true, spar: true, title: '마지막 대련', heal: .3, win: function () { S.flags.bwDead = true; var q = c4Q(.05); done('백 합 끝에 백운의 칼이 멈췄다. “이겼군. 처음이야, 진 게 기쁜 건.” 그는 산으로 올라갔다. 내공 +<b>' + q + '</b>', 'fight'); }, lose: function () { S.flags.bwDead = true; var q = c4Q(.03); done('백운의 칼끝이 당신의 목 앞에서 멈췄다. “여전하군.” 그가 웃으며 칼을 거두고 산으로 올라갔다. 내공 +<b>' + q + '</b>', 'fight'); } }); } },
      { t: '칼 대신 차를 나눈다', h: '마기 -20 · 체력 회복', f: function () { S.flags.bwDead = true; c4Mad(-20); S.hp = maxHp(); done('밤새 차를 마셨다. 첩자였던 날의 이야기도 했다. 둘 다 웃었다. 새벽에 백운이 산으로 떠났다. 뒷모습이 오래 보였다.', 'people'); } }], 'wudang');
    return;
  }
  if (sm) {
    scene('그림자의 마지막 청부', npcHead('sm') + ps('사마령이 처음으로 지붕에서 내려와 문으로 들어왔다. 붉은 눈이 흐려져 있었다.', '“마기가 눈까지 왔어. 곧 누군지도 모르고 칼을 휘두르겠지. 마지막 청부야. 그 전에 나를 끝내 줘.”'), [
      { t: '정심의 약으로 마기를 붙든다', h: '약초 -4 · 사마령은 떠난다', off: mat('herb') < 4 ? '약초 4가 필요하다' : null, f: function () { S.mat.herb -= 4; S.flags.smDead = true; done('밤새 약을 달였다. 붉은 눈이 조금 맑아졌다. 사마령은 “청부를 어겼군” 하고 웃었다. 다음 날 그녀는 그림자 속으로 사라졌다. 그 뒤로 지붕 위에 기척이 없었다.', 'people'); } },
      { t: '청부를 받는다', h: '전투 · 사마령이 죽는다 · 내공', c: 'primary', f: function () { fight('sm', et() + .4, { auto: true, spar: true, title: '마지막 청부', heal: .3, win: function () { S.flags.smDead = true; var q = c4Q(.06); done('비도 하나가 바닥에 떨어졌다. 사마령은 당신 품에서 “고마워”라고 했다. 그녀의 그림자가 당신의 그림자에 겹쳐 사라졌다. 내공 +<b>' + q + '</b>', 'fight'); }, lose: function () { S.flags.smDead = true; done('사마령의 비도가 당신의 목을 스쳤다. 일부러 빗나간 것이었다. “못 하겠으면 됐어.” 그녀는 혼자 절벽 쪽으로 걸어갔다. 다시 보지 못했다.', 'fail'); } }); } },
      { t: '거절한다', h: '마기 +8 · 그녀는 홀로 떠난다', f: function () { S.flags.smDead = true; c4Mad(8); done('“못 하오.” 사마령은 고개를 끄덕였다. 그날 밤 먼 곳에서 짐승 같은 웃음소리가 들렸다가 끊겼다.', 'fail'); } }], 'shadow');
    return;
  }
  var mk = alive('mk');
  scene('옛 이름들', ps('옛 동료들의 이름을 종이에 적어 보았다. 절반이 넘는 이름 옆에 먹으로 선을 그었다.', mk ? '묵야만이 아직 절벽 길 바위에 앉아 있다고 했다. 백 살이 넘었을 것이다.' : '선을 긋지 않은 이름은 당신 하나뿐이었다.'), [
    { t: mk ? '묵야를 찾아간다' : '이름들을 태운다', h: mk ? '내공 · 묵야의 마지막 말' : '마기 -15', c: 'primary', f: function () {
      if (mk) { S.flags.mkDead = true; var q = c4Q(.05); done('묵야는 눈 없는 얼굴로 웃었다. “발소리가 이제야 가벼워졌군. 늙은이 발소리야.” 이튿날 그는 바위에 앉은 채로 숨을 거두었다. 내공 +<b>' + q + '</b>', 'people'); }
      else { c4Mad(-15); done('종이를 불에 넣었다. 이름들이 재가 되어 혈월 쪽으로 날아갔다.', 'event'); } } },
    { t: '종이를 접어 품에 넣는다', h: '체력 회복', f: function () { S.hp = maxHp(); done('종이는 가벼웠다. 그래도 품이 무거워졌다.', 'rest'); } }], 'night');
} });

EVENTS.push({ m: 566, id: 'c4_raid', run: function () {
  var ds = S.disc || [], has = S.sect || ds.length;
  var body = ps('밤하늘에서 검은 것들이 떨어졌다. 구천문 추혼사(追魂使)와 그림자들이었다. ' + (S.flags.c4_eighthDead ? '“팔좌를 죽인 자를 찾는다.”' : '“돌아오는 자의 피를 거두러 왔다.”'),
    has ? (S.sect ? c4SectName() + '의 문이 부서졌다.' : '제자들의 방 문이 부서졌다.') + ' 아이들이 칼을 쥐고 뛰어나왔다. 아직 사람을 베어 본 적 없는 칼들이었다.' : '초막의 문이 부서졌다. 지킬 사람은 없다. 당신 하나뿐이다.');
  var winRes = function (extra) { var q = c4Q(.08); addMat('core', 1); done('추혼사가 쓰러졌다. 그림자들은 하늘로 흩어졌다. ' + (extra || '') + '내공 +<b>' + q + '</b> · 영단 1', 'fight'); };
  if (!has) {
    scene('천외의 습격', body, [
      { t: '홀로 맞선다', h: '보스 전투 · 져도 숨은 붙는다', c: 'primary', f: function () { fight('c4_hound', et() + .5, { auto: true, spar: true, title: '구천문 추혼사', heal: .3, win: function () { winRes(); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .25)); c4Mad(10); done('추혼사가 당신의 기를 한 움큼 뜯어 갔다. 초막은 불탔다. 살아남은 것은 당신과 칼 한 자루였다.', 'fail'); } }); } },
      { t: '불을 지르고 빠져나간다', h: '은전 손실 · 체력 -20%', f: function () { var l = Math.min(S.silver, price(200)); S.silver -= l; hurt(.2); done('초막에 불을 지르고 연기 속으로 빠져나갔다. 모아 둔 은전 <b>' + l + '</b>냥이 함께 탔다.', 'fail'); } }], 'siege');
    return;
  }
  var ch = [
    { t: '아이들을 먼저 피신시키고 홀로 막는다', h: '보스 · 목숨을 건 싸움 · 문하는 무사하다', c: 'primary', f: function () { fight('c4_hound', et() + .8, { auto: true, title: '구천문 추혼사', heal: .4, win: function () { ds.forEach(function (d) { c4Up(d, 4); }); winRes('뒷산에 숨었던 아이들이 내려와 울었다. '); }, lose: c4Lethal('c4_raid', function () { done('쓰러졌지만 아이들은 모두 달아났다. 추혼사는 당신의 기를 뜯어 가고 물러났다.', 'fail'); }) }); } }];
  if (ds.length) ch.push({ t: '제자들과 함께 싸운다', h: '보스 · 덜 위험하다 · 제자 하나를 잃을 수 있다', f: function () {
    fight('c4_hound', et() + .4, { auto: true, spar: true, title: '구천문 추혼사', heal: .4, win: function () {
      var v = (S.disc || []).slice().sort(function (a, b) { return a.p - b.p; })[0];
      if (v && Math.random() < .6) { c4Drop(v); S.flags.c4_sacrifice = v.n; (S.disc || []).forEach(function (d) { c4Up(d, 10); }); winRes(c4DN(v) + '이(가) 당신 대신 칼을 맞았다. 마지막에 “사부님, 저 잘했죠” 하고 물었다. 남은 아이들의 눈빛이 달라졌다. '); }
      else { (S.disc || []).forEach(function (d) { c4Up(d, 8); }); winRes('아이들 모두 살아남았다. 처음으로 피를 본 칼들이 떨고 있었다. '); }
    }, lose: function () { var v = (S.disc || []).slice().sort(function (a, b) { return a.p - b.p; })[0]; if (v) { c4Drop(v); S.flags.c4_sacrifice = v.n; } S.hp = Math.max(1, Math.round(maxHp() * .25)); done((v ? c4DN(v) + '이(가) 쓰러진 당신을 감싸다 죽었다. ' : '') + '추혼사는 기를 뜯어 가고 물러났다. 마당에 새 무덤이 생겼다.', 'fail'); } }); } });
  scene('천외의 습격', body, ch, 'siege');
} });

EVENTS.push({ m: 578, id: 'c4_succession', run: function () {
  var ds = c4Disc();
  if (ds.length >= 2) {
    var a = ds[0], b = ds[1];
    scene('후계 다툼', ps('뜰에서 칼 소리가 났다. 수련 소리가 아니었다. ' + c4DN(a) + '과(와) ' + c4DN(b) + '이(가) 진검을 겨누고 있었다.', '“사부님의 의발은 저에게 와야 합니다.” 둘이 같은 말을 했다. 다른 아이들은 벽에 붙어 숨을 죽였다.'), [
      { t: esc(a.n) + '에게 의발을 준다', h: esc(b.n) + '은(는) 떠날 수 있다', c: 'primary', f: function () { S.flags.c4_heir = a.n; c4Up(a, 10); ach('c4_heir'); var stay = Math.random() < .5; if (!stay) c4Drop(b); done(c4DN(a) + '에게 낡은 칼을 넘겼다. ' + (stay ? c4DN(b) + '은(는) 이를 악물고 남았다.' : c4DN(b) + '은(는) 그날 밤 산문을 나섰다. 뒤돌아보지 않았다.'), 'people'); } },
      { t: esc(b.n) + '에게 의발을 준다', h: esc(a.n) + '은(는) 떠날 수 있다', f: function () { S.flags.c4_heir = b.n; c4Up(b, 12); ach('c4_heir'); var stay = Math.random() < .4; if (!stay) c4Drop(a); done('뜻밖의 선택에 뜰이 술렁였다. ' + c4DN(b) + '이(가) 떨리는 손으로 칼을 받았다. ' + (stay ? c4DN(a) + '은(는) 오래 고개를 숙이고 있다가, 사제에게 절을 했다.' : c4DN(a) + '은(는) 웃으며 떠났다. 그 웃음이 오래 귀에 남았다.'), 'people'); } },
      { t: '둘 다 꾸짖고 의발을 미룬다', h: '모두 남는다 · 마기 +8', f: function () { c4Mad(8); ds.forEach(function (d) { c4Up(d, 4); }); done('두 칼을 맨손으로 꺾었다. “내가 죽기 전에는 아무도 내 칼을 못 가진다.” 그날 밤 혼자 술을 마셨다. 그 말이 틀렸다는 것을 알았다.', 'event'); } }], 'arena');
    return;
  }
  if (ds.length === 1) {
    var d = ds[0];
    scene('의발', ps('제자는 ' + c4DN(d) + ' 하나뿐이다. 다툴 사람도, 견줄 사람도 없다.', '봄볕 아래서 낡은 칼과 손때 묻은 구결서를 꺼냈다.'), [
      { t: '의발을 전한다', h: '제자 수련 +15 · 업적', c: 'primary', f: function () { S.flags.c4_heir = d.n; c4Up(d, 15); ach('c4_heir'); done(c4DN(d) + '이(가) 두 손으로 칼을 받았다. 받는 손이 당신이 처음 칼을 받던 손과 닮아 있었다.', 'people'); } },
      { t: '아직 이르다', h: '내공', f: function () { var q = c4Q(.03); done('“네 칼이 내 칼을 꺾는 날에.” 제자는 고개를 숙였다. 그날부터 새벽 수련이 한 시진 길어졌다. 내공 +<b>' + q + '</b>', 'qi'); } }], 'dawn');
    return;
  }
  var soya = S.flags.c4_soya_met && !S.flags.c4_soyaGone;
  var ch = [{ t: '칼을 강물에 던진다', h: '마기 -20 · 홀로 끝까지', f: function () { S.flags.c4_alone = 1; c4Mad(-20); done('물려줄 사람이 없는 칼은 강이 가져갔다. 빈손이 가벼웠다. 다음 날 장터에서 새 칼을 하나 샀다. 싸구려였다.', 'event'); } },
    { t: '칼을 품고 떠돈다', h: '내공 · 고독한 길', c: 'primary', f: function () { S.flags.c4_alone = 1; var q = c4Q(.04); done(age() + '세의 떠돌이. 이 고을 저 고을 객잔에 늙은 칼잡이 하나가 묵었다 갔다는 소문만 남았다. 내공 +<b>' + q + '</b>', 'qi'); } }];
  if (soya) ch.unshift({ t: '강소야에게 칼을 준다', h: '소야가 제자가 된다', off: (S.disc || []).length >= 8 ? '제자가 이미 여덟이다' : null, f: function () { S.disc = S.disc || []; S.disc.push({ n: '강소야', p: 30, t: 4, a: 18 }); S.flags.c4_soyaGone = true; S.flags.c4_soyaDisc = true; S.flags.c4_heir = '강소야'; ach('c4_heir'); done('소야는 칼을 받고 한참 울었다. “밥값, 평생 갚을게요.” 늦게 둔 첫 제자였다.', 'people'); } });
  scene('물려줄 사람', ps(age() + '세. 칼을 닦다가 문득 생각했다. 이 칼은 누구에게 가는가.', '물려줄 문파도 제자도 없다. 칼은 대답하지 않았다.'), ch, 'night');
} });

EVENTS.push({ m: 596, id: 'c4_e6end', run: function () {
  var ds = c4Disc();
  var body = ps(age() + '세의 겨울. ' + (ds.length ? '제자들이 마당의 눈을 쓸었다. ' + ds.slice(0, 4).map(c4DN).join(', ') + '. 이제는 당신이 비질을 하려 하면 빗자루를 빼앗는다.' : '빈 마당에 눈이 쌓였다. 발자국은 하나뿐이다.'),
    (S.flags.c4_heir ? '맏이는 <b>' + esc(S.flags.c4_heir) + '</b>. ' : '') + '하늘의 별 아홉이 해마다 조금씩 밝아진다. 혈월도 그렇다.',
    '어떤 늙은이는 이 나이에 손주를 본다. 당신은 천마총 깊은 곳에서 무언가가 당신을 부르는 소리를 듣는다.');
  var ch = [
    { t: '천마총으로 갈 채비를 한다', h: '내공 · 다음 시대로', c: 'primary', f: function () { S.flags.c4_toTomb = 1; var q = c4Q(.05); done('낡은 칼을 갈고 짐을 꾸렸다. 혈월의 진실은 그 아래에 있다. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '겨울 동안 푹 쉰다', h: '체력 · 마기 회복', f: function () { S.hp = maxHp(); c4Mad(-25); done('겨울 내내 화롯가에 앉아 있었다. 가끔 졸았다. 꿈에 처음 매화 지던 봄이 보였다.', 'rest'); } }];
  if (ds.length) ch.push({ t: '제자들에게 모든 초식을 풀어 놓는다', h: '제자 수련 크게 · 내공 소량', f: function () { ds.forEach(function (d) { c4Up(d, 10); }); var q = c4Q(.02); done('겨울 석 달 동안 아는 것을 모두 가르쳤다. 아이들은 반도 알아듣지 못했다. 반이면 충분했다. 내공 +<b>' + q + '</b>', 'people'); } });
  else { if (S.flags.c4_alone && age() >= 64) ach('c4_alone'); }
  scene('늙은 칼의 겨울', body, ch, 'night');
} });

/* ================= 우연한 사건 (50~66세) ================= */
LIFE.push({ id: 'c4_l_stars', from: 50, to: 66, w: 3, cd: 30, run: function () {
  var n = S.flags.c4_clue || hasMem('c4_stars') ? '혈월 곁의 별 아홉이 오늘따라 또렷했다. 구좌 자리는 역시 비어 있었다.' : pick(['별 하나가 긴 꼬리를 끌며 떨어졌다.', '밤하늘에 이름 모를 별이 하나 늘어 있었다.', '구름 사이로 별들이 이상하게 한쪽으로 몰려 있었다.']);
  scene('밤하늘', '<p>' + W('혈월봉 망루', '맹의 누각', '객잔 지붕') + '에 누워 하늘을 보았다. ' + n + '</p>', [
    { t: '별의 흐름을 따라 운기한다', h: '내공 소량', f: function () { var q = c4Q(.015); done('별이 도는 속도로 숨을 쉬었다. 새벽이 오는 줄도 몰랐다. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '그냥 잠든다', h: '체력 회복', f: function () { c4Heal(.3); done('지붕 위에서 잠이 들었다. 이슬에 젖어 깼다. 몸은 개운했다.', 'rest'); } }]);
} });
LIFE.push({ id: 'c4_l_crystal', from: 50, to: 62, w: 3, cd: 30, run: function () {
  var c = price(300);
  scene('붉은 결정', '<p>서역 상인이 소매 속에서 붉은 결정을 꺼냈다. 혈정이다. “한 알이면 십 년 공부. 하늘 위도 엿볼 수 있소.” ' + (hasMem('c4_ascend') ? '산정에서 타오르던 불길이 떠올랐다.' : '상인의 손가락 끝이 검게 타 있었다.') + '</p>', [
    { t: '산다', h: '은전 -' + c + ' · 내공 크게 · 마기 +18', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; c4Mad(18); var q = c4Q(.05); done('혈정을 삼켰다. 단전이 불타올랐다. 내공 +<b>' + q + '</b>. 그 열기는 한동안 식지 않았다.', 'qi'); } },
    { t: '빼앗아 부순다', h: '전투 · 은전', f: function () { fight('c4_addict', et(), { auto: true, spar: true, title: '혈정 상인의 호위', win: function () { var g = c4Silver(120); done('호위를 쓰러뜨리고 혈정을 발로 밟아 부쉈다. 붉은 연기가 피어올랐다. 상인이 두고 간 은전 <b>' + g + '</b>냥', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .35)); done('혈정에 취한 호위의 힘은 사람의 것이 아니었다. 상인은 웃으며 떠났다.', 'fail'); } }); } },
    { t: '지나친다', h: '아무 일 없다', f: function () { done('고개를 저었다. 하늘은 그렇게 사는 것이 아니다.', 'event'); } }]);
} });
LIFE.push({ id: 'c4_l_hermit', from: 52, to: 66, w: 2, once: 'life', cond: function () { return S.realm >= 6; }, run: function () {
  scene('산중의 은자', '<p>산길에서 백 살은 넘어 보이는 노인을 만났다. 노인은 당신을 보자마자 물었다. “자연경 다음은 무엇인가?”</p>', [
    { t: '“모르오.”', h: '정직한 대답 · 내공', c: 'primary', f: function () { var q = c4Q(.05); done('노인이 껄껄 웃었다. “그게 정답이야. 아는 놈들은 다 미쳤지.” 노인이 손가락으로 당신의 이마를 한 번 짚었다. 내공 +<b>' + q + '</b>', 'insight'); } },
    { t: '“하늘 위의 하늘.”', h: '소문대로의 대답 · 마기', f: function () { c4Mad(8); learnMem('c4_rumor'); done('노인의 얼굴이 굳었다. “구천문 놈들 말을 하는군.” 그는 등을 돌려 안개 속으로 걸어갔다.', 'event'); } },
    { t: '“다시 처음.”', h: '회귀자의 대답', f: function () { c4Mad(-15); c4Heal(.5); done('노인이 오래 당신을 보았다. “돌아오는 자로군. 불쌍하기도 하지.” 그는 품에서 떡 하나를 꺼내 주고 떠났다.', 'people'); } }], 'loc_hill');
} });
LIFE.push({ id: 'c4_l_ache', from: 50, to: 66, w: 4, cd: 24, cond: function () { return S.realm < 8; }, run: function () {
  var part = pick(['무릎', '어깨', '허리', '손목']), herb = mat('herb') >= 2;
  scene('묵은 상처', '<p>' + W('흑천맹과 싸울 때', '북해에서', '어느 이름 없는 골목에서') + ' 다친 ' + part + '가 다시 쑤셨다. ' + age() + '세의 몸은 젊은 날의 빚을 잊지 않는다.</p>', [
    { t: '약초를 찧어 붙인다', h: '약초 -2 · 체력 회복', off: herb ? null : '약초가 모자란다', f: function () { S.mat.herb -= 2; S.hp = maxHp(); done('약초를 찧어 ' + part + '에 붙였다. 홍란이 하던 대로. 쓴 냄새가 방에 가득 찼다.', 'rest'); } },
    { t: '운기로 다스린다', h: '내공 소량 · 체력 -10%', f: function () { hurt(.1); var q = c4Q(.012); done('아픈 자리로 기를 몰았다. 통증이 길을 알려 주었다. 내공 +<b>' + q + '</b>', 'qi'); } }]);
} });
LIFE.push({ id: 'c4_l_herald', from: 50, to: 60, w: 2, cd: 36, run: function () {
  scene('별 아홉의 발자국', '<p>문 앞 진흙에 별 아홉 개가 찍힌 발자국이 있었다. 구천문 시자가 다녀간 것이다. 아직 근처에 있다.</p>', [
    { t: '쫓는다', h: '전투 · 보석이나 옥정', c: 'primary', f: function () { fight('c4_herald', et() * .95, { auto: true, spar: true, title: '구천문 시자', win: function () { var k = pick(['gem', 'jade']); addMat(k, 1); done('시자의 빈 껍데기가 무너졌다. 그 속에서 ' + MATS[k].n + ' 하나가 굴러 나왔다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .35)); c4Mad(5); done('시자가 당신의 기를 조금 맛보고 사라졌다. 입안이 썼다.', 'fail'); } }); } },
    { t: '발자국을 지운다', h: '마기 -5', f: function () { c4Mad(-5); done('비로 발자국을 쓸었다. 쓸어도 별 모양은 자꾸 눈앞에 남았다.', 'event'); } }]);
} });
LIFE.push({ id: 'c4_l_children', from: 54, to: 66, w: 3, cd: 30, run: function () {
  var call = pick(['할아버지', '어르신', '늙은 칼잡이']);
  scene('아이들', '<p>' + W('총단 아래 마을', '맹 앞 장터', '지나는 마을') + '의 아이들이 당신을 “' + call + '”라고 불렀다. 칼을 보여 달라고 졸랐다.</p>', [
    { t: '칼춤을 보여 준다', h: '마기 -12', f: function () { c4Mad(-12); done('천천히, 아주 천천히 칼을 휘둘렀다. 아이들이 손뼉을 쳤다. 사람을 베지 않는 칼은 오랜만이었다.', 'people'); } },
    { t: '엿을 사 준다', h: '은전 -' + price(10), off: S.silver < price(10) ? '은전이 모자란다' : null, f: function () { S.silver -= price(10); c4Heal(.15); done('엿 한 판을 사서 나눠 주었다. 이가 시원찮아 당신은 먹지 못했다.', 'people'); } }]);
} });
LIFE.push({ id: 'c4_l_obituary', from: 52, to: 66, w: 3, cd: 30, run: function () {
  var who = W(pick(['외당 동기', '옛 교도', '혈월봉의 늙은 문지기']), pick(['맹의 옛 동료', '같이 북해에 갔던 검수', '맹의 늙은 마부']), pick(['객잔 주인', '나루터 뱃사공', '함께 청부를 뛰던 칼잡이']));
  scene('부고', '<p>' + who + '의 부고가 왔다. 얼굴이 잘 떠오르지 않았다. 그런데 그가 웃던 소리는 기억났다.</p>', [
    { t: '조문을 간다', h: '은전 -' + price(30) + ' · 마기 -10', off: S.silver < price(30) ? '은전이 모자란다' : null, f: function () { S.silver -= price(30); c4Mad(-10); done('부의금을 내고 향을 올렸다. 조문객 가운데 아는 얼굴이 하나도 없었다.', 'people'); } },
    { t: '술 한 잔으로 대신한다', h: '아무 일 없다', f: function () { done('한 잔을 땅에 붓고 한 잔을 마셨다. 다음은 누구일까, 생각하다 그만두었다.', 'event'); } }]);
} });
LIFE.push({ id: 'c4_l_eyes', from: 55, to: 66, w: 2, once: 'life', run: function () {
  scene('흐려지는 눈', '<p>아침에 서신을 읽으려는데 글자가 번졌다. 팔을 멀리 뻗어야 겨우 보였다. 칼끝은 아직 보인다. 글자가 먼저 멀어졌다.</p>', [
    { t: '눈을 감고 기척으로 사는 법을 익힌다', h: '내공 · 묵야처럼', c: 'primary', f: function () { var q = c4Q(.03); done('사흘 동안 눈을 가리고 지냈다. 넷째 날, 눈을 감고도 날아오는 파리를 잡았다. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '돋보기를 산다', h: '은전 -' + price(60), off: S.silver < price(60) ? '은전이 모자란다' : null, f: function () { S.silver -= price(60); done('서역에서 온 둥근 유리를 샀다. 글자가 다시 커졌다. 늙는다는 것은 물건이 하나씩 느는 일이다.', 'item'); } }]);
} });
LIFE.push({ id: 'c4_l_quarrel', from: 52, to: 66, w: 4, cd: 24, cond: function () { return (S.disc || []).length >= 2; }, run: function () {
  var ds = c4Disc(), a = ds[0], b = ds[ds.length - 1];
  scene('제자들의 다툼', '<p>' + c4DN(a) + '과(와) ' + c4DN(b) + '이(가) 주먹다짐을 했다. 이유는 밥상의 반찬 하나였다. 그 아래에 다른 이유가 있다는 것쯤은 안다.</p>', [
    { t: '둘에게 한 달 동안 같이 물을 긷게 한다', h: '두 제자 수련 +5', f: function () { c4Up(a, 5); c4Up(b, 5); done('한 달 뒤, 둘은 물통을 나눠 들고 다녔다. 여전히 서로를 노려보면서.', 'people'); } },
    { t: '대련으로 결판을 내게 한다', h: '이긴 쪽 +10 · 진 쪽 +2', f: function () { var w = Math.random() < .6 ? a : b, l = w === a ? b : a; c4Up(w, 10); c4Up(l, 2); done(c4DN(w) + '이(가) 이겼다. ' + c4DN(l) + '은(는) 사흘 동안 밥을 먹지 않았다.', 'people'); } }]);
} });
LIFE.push({ id: 'c4_l_discsick', from: 50, to: 66, w: 3, cd: 30, cond: function () { return (S.disc || []).length > 0; }, run: function () {
  var d = pick(S.disc), c = price(90);
  scene('앓아누운 제자', '<p>' + c4DN(d) + '이(가) 열에 들떠 앓아누웠다. 무리한 수련 탓이다. 당신도 그 나이에 그랬다.</p>', [
    { t: '의원을 부른다', h: '은전 -' + c, off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; done('의원이 침을 놓고 약을 지었다. 사흘 만에 ' + c4DN(d) + '이(가) 일어났다.', 'people'); } },
    { t: '직접 내공으로 열을 내린다', h: '체력 -20% · 제자 수련 +6', f: function () { hurt(.2); c4Up(d, 6); done('밤새 등에 손을 대고 기를 밀어 넣었다. 새벽에 열이 내렸다. 제자의 혈맥이 조금 넓어졌다.', 'people'); } },
    { t: '스스로 이겨 내게 둔다', h: '제자가 약해질 수 있다', f: function () { if (Math.random() < .5) { c4Up(d, 3); done(c4DN(d) + '이(가) 혼자 열을 이겨 냈다. 눈빛이 조금 단단해졌다.', 'people'); } else { d.p = Math.max(0, d.p - 5); done('열은 내렸지만 ' + c4DN(d) + '의 기가 한동안 흩어졌다.', 'fail'); } } }]);
} });
LIFE.push({ id: 'c4_l_discname', from: 56, to: 66, w: 3, cd: 36, cond: function () { return c4Disc().some(function (d) { return d.p >= 40; }); }, run: function () {
  var d = c4Disc()[0], deed = pick(['산적 떼를 홀로 쫓아냈다', '이름난 검객과 비겨 이름을 얻었다', '물에 빠진 상단 사람들을 건졌다', '객잔에서 시비를 건 고수를 한 수에 꺾었다']);
  scene('강호의 소문', '<p>장터에서 소문을 들었다. ' + W('혈월봉', '맹', '어느 늙은 칼잡이') + '의 제자 ' + c4DN(d) + '이(가) ' + deed + '고.</p>', [
    { t: '모른 척 웃는다', h: '마기 -10 · 은전', f: function () { c4Mad(-10); var g = c4Silver(60); done('주막 주인이 “그 사부라는 분이 얼마나 대단하길래” 하며 술값을 받지 않았다. 아낀 은전 <b>' + g + '</b>냥', 'people'); } },
    { t: '불러서 자만을 꾸짖는다', h: '제자 수련 +6', f: function () { c4Up(d, 6); done('“이름은 칼보다 무겁다. 아직 들 힘이 없다.” 제자는 고개를 숙였지만 입꼬리는 올라가 있었다.', 'people'); } }]);
} });
LIFE.push({ id: 'c4_l_envoy', from: 50, to: 66, w: 3, cd: 36, cond: function () { return !!S.sect; }, run: function () {
  var who = pick(W(['혈교의 분타', '사천의 독문', '새외의 마도 문파'], ['종남파', '공동파', '점창파'], ['녹림 연합', '강남 표국 연합', '해남의 검문']));
  scene('사절', '<p>' + who + '에서 사절이 왔다. ' + c4SectName() + '과(와) 맹약을 맺자고 했다. 예물 상자가 무거워 보였다.</p>', [
    { t: '맹약을 맺는다', h: '은전 · 의무가 따른다', f: function () { var g = c4Silver(200); S.flags.c4_pact = (S.flags.c4_pact || 0) + 1; done('맹약서에 인장을 찍었다. 예물은 은전 <b>' + g + '</b>냥. 언젠가 그들이 칼을 빌리러 올 것이다.', 'item'); } },
    { t: '정중히 돌려보낸다', h: '내공 소량', f: function () { var q = c4Q(.015); done('예물은 받지 않았다. 문파가 커지는 것보다 칼이 무뎌지지 않는 것이 먼저다. 내공 +<b>' + q + '</b>', 'event'); } }], 'court');
} });
LIFE.push({ id: 'c4_l_fire', from: 50, to: 66, w: 2, cd: 48, cond: function () { return !!S.sect && !S.sect.fixed; }, run: function () {
  var l = Math.min(S.silver, price(150));
  scene('창고의 불', '<p>한밤중에 ' + c4SectName() + '의 창고에서 불길이 솟았다. 비급 몇 권과 한 해 먹을 쌀이 거기 있다.</p>', [
    { t: '불 속으로 뛰어든다', h: '체력 -30% · 비급을 건진다', c: 'primary', f: function () { hurt(.3); var q = c4Q(.02); done('불 속에서 비급 상자를 안고 나왔다. 수염이 반쯤 탔다. 문도들이 웃음을 참았다. 내공 +<b>' + q + '</b>', 'event'); } },
    { t: '사람부터 대피시킨다', h: '은전 -' + l, f: function () { S.silver -= l; done('다친 사람은 없었다. 창고는 재가 되었다. 다시 쌀을 사는 데 은전 <b>' + l + '</b>냥이 들었다.', 'fail'); } }], 'burn');
} });
LIFE.push({ id: 'c4_l_secretart', from: 52, to: 66, w: 3, cd: 40, cond: function () { return (S.disc || []).length > 0; }, run: function () {
  var d = pick(S.disc);
  scene('몰래 익힌 무공', '<p>' + c4DN(d) + '의 손바닥이 붉었다. 당신이 가르치지 않은 ' + W('혈공', '마공', '사파의 독공') + '을 몰래 익히고 있었다.</p>', [
    { t: '혈맥을 짚어 무공을 거둔다', h: '제자 수련 -8 · 마기 -5', f: function () { d.p = Math.max(0, d.p - 8); c4Mad(-5); done('혈맥 셋을 짚었다. 붉은 기운이 빠져나갔다. ' + c4DN(d) + '은(는) 울면서도 고맙다고 했다.', 'people'); } },
    { t: '허락하고 다스리는 법을 가르친다', h: '제자 수련 +10 · 마기 +8', f: function () { c4Up(d, 10); c4Mad(8); done('“먹히지 말고 부려라.” 당신이 평생 해 온 일을 가르쳤다. 그 말을 하면서 당신의 혈맥도 조금 들끓었다.', 'people'); } },
    { t: '못 본 척한다', h: '훗날의 씨앗', f: function () { S.flags.c4_secretArt = d.n; done('못 본 척 지나갔다. 아이의 손이 다음 달에는 더 붉어져 있을 것이다.', 'event'); } }]);
} });
LIFE.push({ id: 'c4_l_stray', from: 52, to: 66, w: 3, once: 'life', cond: function () { return !(S.disc || []).length; }, run: function () {
  var n = randName(), a = rnd(10, 14);
  scene('따라오는 아이', '<p>사흘째 아이 하나가 열 걸음 뒤에서 따라오고 있었다. ' + a + '살쯤. 맨발이었다. 돌아보면 멈추고, 걸으면 따라왔다.</p>', [
    { t: '이름을 묻는다', h: '제자 +1 · 은전 -' + price(60), off: S.silver < price(60) ? '은전이 모자란다' : null, f: function () { S.silver -= price(60); S.disc = S.disc || []; S.disc.push({ n: n, p: 0, t: rnd(2, 5), a: a }); logE('people', '<b>' + n + '</b>을(를) 제자로 거두었다.'); done('“' + esc(n) + '.” 아이가 작게 대답했다. 신을 사 주었다. 그날부터 열 걸음이 한 걸음이 되었다.', 'people'); } },
    { t: '은전 몇 닢을 쥐여 보낸다', h: '은전 -' + price(15), off: S.silver < price(15) ? '은전이 모자란다' : null, f: function () { S.silver -= price(15); done('아이는 은전을 받고도 한참 서 있다가 돌아섰다. 다음 날부터는 보이지 않았다.', 'event'); } },
    { t: '못 본 척 걷는다', h: '마기 +4', f: function () { c4Mad(4); done('나흘째 아이는 따라오지 않았다. 고개를 돌려 확인하지는 않았다.', 'event'); } }]);
} });
LIFE.push({ id: 'c4_l_rival', from: 50, to: 66, w: 2, cd: 40, cond: function () { return S.realm >= 3; }, run: function () {
  var nm = W('옛 외당의 맞수', '맹의 옛 경쟁자', '젊은 날 객잔에서 겨룬 칼잡이');
  scene('늙은 맞수', '<p>' + nm + '가 지팡이를 짚고 찾아왔다. “죽기 전에 한 번 더. 이번엔 내가 이긴다.” 눈빛만은 서른 살이었다.</p>', [
    { t: '받아 준다', h: '전투 · 져도 다치지 않는다 · 내공', c: 'primary', f: function () { fight('swordsman', et() * 1.1, { auto: true, spar: true, title: '늙은 맞수', win: function () { var q = c4Q(.03); done('세 합 만에 지팡이가 날아갔다. 그가 웃었다. “역시 안 되는군. 그래도 시원하다.” 내공 +<b>' + q + '</b>', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .4)); var q = c4Q(.02); done('졌다. 그가 소리 내어 울었다. 기뻐서 우는 노인은 처음 보았다. 내공 +<b>' + q + '</b>', 'fight'); } }); } },
    { t: '술상을 차린다', h: '마기 -12', f: function () { c4Mad(-12); done('칼 대신 잔을 부딪쳤다. 그는 취해서 젊은 날 당신을 얼마나 미워했는지 한 시진을 이야기했다.', 'people'); } }]);
} });
LIFE.push({ id: 'c4_l_dream', from: 50, to: 66, w: 2, cd: 48, cond: function () { return P.lives > 0; }, run: function () {
  scene('지난 생의 꿈', '<p>꿈에 다른 생의 당신이 나왔다. 그 생에서 당신은 ' + pick(['스물에 죽었다', '마교의 시종으로 늙었다', '이름 없이 길가에 쓰러졌다', '피에 먹혀 미쳤다']) + '. 꿈속의 당신이 물었다. “이번엔 어디까지 갔어?”</p>', [
    { t: '대답한다', h: '내공 · 마기 -8', f: function () { c4Mad(-8); var q = c4Q(.02); done('“' + REALMS[S.realm].n + '. 그리고 ' + age() + '세.” 꿈속의 당신이 웃으며 사라졌다. 깨어 보니 베개가 젖어 있었다. 내공 +<b>' + q + '</b>', 'insight'); } },
    { t: '대답하지 않는다', h: '체력 회복', f: function () { c4Heal(.3); done('대답하지 않고 돌아누웠다. 꿈은 다시 오지 않았다.', 'rest'); } }], 'return');
} });
LIFE.push({ id: 'c4_l_redmoon', from: 50, to: 66, w: 3, cd: 36, run: function () {
  scene('붉은 달의 밤', '<p>혈월이 떴다. ' + (age() >= 58 ? '이 나이에도' : '해마다 그렇듯') + ' 혈맥이 달을 따라 끓었다. 달 곁의 별들이 예전보다 가까웠다.</p>', [
    { t: '끓는 기운을 받아들인다', h: '내공 · 마기 +15', f: function () { c4Mad(15); var q = c4Q(.035); done('붉은 기운을 단전으로 삼켰다. 달이 질 때까지 몸이 떨렸다. 내공 +<b>' + q + '</b>', 'qi'); } },
    { t: '문을 걸어 잠그고 정좌한다', h: '마기 -10', c: 'primary', f: function () { c4Mad(-10); done('창을 가리고 밤새 정좌했다. 달빛이 문틈으로 손가락처럼 들어왔다 나갔다.', 'rest'); } }], 'night');
} });

/* 조건이 맞지 않은 채 불려도 막히지 않도록 */
EVENTS.concat(LIFE).forEach(function (e) {
  if (!e.id || e.id.indexOf('c4_') !== 0 || !e.cond || e._c4w) return;
  var r = e.run; e._c4w = 1;
  e.run = function () { if (!e.cond()) { done('조용한 달이 지나갔다.', 'event'); return; } r(); };
});
