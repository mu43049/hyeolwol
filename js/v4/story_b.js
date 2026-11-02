/* 혈월회귀록 v4 — 이야기 b. E3 북해의 눈보라(217~312) · E4 황실의 그물(313~408). 접두사 b_ */

/* ---- 공용 도우미 ---- */
function b_wup() {
  if (S.weapon >= 7) { addMat('scale', 2); addMat('jade', 2); return '쇠는 이미 당신의 칼을 넘지 못했다. 대신 남은 재료를 넘겨받았다. <b>용린 2 · 옥정 2</b>'; }
  S.weapon = Math.min(7, Math.max(S.weapon + 1, 4)); return '무기가 <b>' + WEAP[S.weapon].n + '</b>(으)로 바뀌었다.';
}
function b_aup() {
  var a = S.armor || 0;
  if (a >= 6) { addMat('scale', 2); addMat('hide', 6); return '갑옷은 이미 더 손댈 데가 없었다. 대신 남은 재료를 넘겨받았다. <b>용린 2 · 짐승 가죽 6</b>'; }
  S.armor = Math.min(6, Math.max(a + 1, 3)); return '방어구가 <b>' + ARMOR[S.armor].n + '</b>(으)로 바뀌었다.';
}
function b_eat(p) {
  var q = qiPct(p || .07); S.qi += q; S.mad = clamp(S.mad + 22, 0, 100);
  S.flags.b_ate = (S.flags.b_ate || 0) + 1; learnMem('b_hyeoljeong'); if (S.flags.b_ate >= 3) ach('b_crystal'); return q;
}
function b_side() { return W('교도들', '맹의 무사들', '마을 장정들'); }
function b_rest(p) { S.hp = Math.max(1, Math.round(maxHp() * (p || .3))); }
function b_disc() {
  S.disc = S.disc || []; if (S.disc.length >= 8) return '';
  var d = { n: randName(), p: 0, t: rnd(2, 5), a: rnd(10, 14) }; S.disc.push(d); logE('people', '<b>' + d.n + '</b>을(를) 제자로 거두었다.'); return d.n;
}
function b_imp() { return S.flags.b_imp || ''; }
function b_impTxt() {
  var k = b_imp();
  if (k === 'yield') return W('천마신교는 조정의 호패를 받았다.', '무림맹은 조정의 무림사가 되었다.', '당신은 관의 호패를 찼다.');
  if (k === 'resist') return W('혈월봉은 산문을 닫고 칼을 들었다.', '무림맹은 역도의 이름을 얻었다.', '당신은 수배된 의적이 되었다.');
  if (k === 'betray') return W('당신은 교의 이름을 조정에 팔았다.', '당신은 동료 문파의 이름을 조정에 넘겼다.', '당신은 무림인의 목을 관에 넘기는 사냥꾼이 되었다.');
  return '';
}

/* ---- 적 ---- */
ENM.b_frostscout = { n: '빙궁 척후', hp: 70, atk: 13, w: { strong: 2, rapid: 4, feint: 2, charge: 1 } }; GLY.b_frostscout = '氷';
ENM.b_icewarrior = { n: '빙궁 한철위', hp: 105, atk: 16, def: 2, w: { strong: 4, rapid: 1, feint: 1, charge: 3 } }; GLY.b_icewarrior = '寒';
ENM.b_arah = { n: '설랑장 아라', hp: 260, atk: 29, boss: true, w: { strong: 1, rapid: 5, feint: 3, charge: 1 } }; GLY.b_arah = '狼';
ENM.b_ugyeom = { n: '빙철장 우겸', hp: 360, atk: 32, def: 4, boss: true, w: { strong: 5, rapid: 1, feint: 1, charge: 4 } }; GLY.b_ugyeom = '鐵';
ENM.b_binglin = { n: '빙궁주 빙린', hp: 330, atk: 33, boss: true, w: { strong: 2, rapid: 3, feint: 4, charge: 2 } }; GLY.b_binglin = '鱗';
ENM.b_jinyi = { n: '금의위 천호', hp: 170, atk: 22, w: { strong: 3, rapid: 3, feint: 2, charge: 2 } }; GLY.b_jinyi = '錦';
ENM.b_dongchang = { n: '동창 번자', hp: 90, atk: 16, w: { strong: 1, rapid: 3, feint: 5, charge: 1 } }; GLY.b_dongchang = '廠';
ENM.b_jinmu = { n: '총지휘사 진무', hp: 380, atk: 34, boss: true, w: { strong: 3, rapid: 3, feint: 3, charge: 2 } }; GLY.b_jinmu = '武';

/* ---- 기억 ---- */
MEM.b_hyeoljeong = ['혈정의 값', '서역 파사교의 혈정은 내공을 단숨에 올리지만, 그만큼 마기를 쌓는다. 세 알째부터 사람이 바뀐다.'];
MEM.b_arah = ['백랑령의 매복', '서른다섯 해 겨울, 설랑장 아라가 백랑령 고개를 친다. 미리 사람을 심어 두면 늑대가 덫에 걸린다.'];
MEM.b_binglin = ['빙린의 셈법', '빙궁주 빙린은 칼보다 신의를 센다. 빙궁 탈주자 설영을 살려 두면 협상의 문이 열린다.'];
MEM.b_ugyeom = ['우겸의 창고', '빙철장 우겸은 혈정에 취해 협정을 깬다. 총공세 전에 그의 혈정 창고를 태우면 기세가 꺾인다.'];
MEM.b_ninedots = ['아홉 점의 인장', '혈정을 담은 은함에는 아홉 점이 원을 이룬 인장이 찍혀 있다. 파사교 뒤에 누군가 있다.'];
MEM.b_edict = ['무림소탕령', '마흔세 살 봄, 조정이 무림소탕령을 내린다. 총지휘사 진무는 어릴 적 무인들의 싸움에 고향을 잃었다.'];
MEM.b_spy = ['찻집의 귀', '소탕령 이듬해, 곁에 동창의 밀정이 든다. 찻집 주인 옥선이다. 죽이기보다 쓰는 편이 낫다.'];
MEM.b_dongchang = ['동창의 붓', '동창 제독 조환이 진무를 역모로 엮는다. 붓으로 쓴 죄는 칼보다 먼저 사람을 죽인다.'];

/* ---- 죽음 ---- */
DEATHS.b_pass = ['백랑령의 눈', '설랑장의 칼이 눈보라보다 빨랐다. 고개의 눈이 당신을 덮었다.'];
DEATHS.b_siege = ['빙철의 성벽', '빙철장 우겸의 철퇴가 성벽과 함께 당신을 무너뜨렸다. 눈 위에 붉은 꽃이 번졌다.'];
DEATHS.b_binglin = ['빙하 위의 담판', '빙린의 손끝에서 서리가 피었다. 심장이 마지막으로 뛴 소리를 들었다.'];
DEATHS.b_jinmu = ['수춘도의 끝', '진무의 수춘도가 정확히 한 번 움직였다. 그는 칼을 거두며 “법대로”라고 말했다.'];
DEATHS.b_frozen = ['눈보라', '눈보라 속에서 길을 잃었다. 잠이 쏟아졌고, 다시 깨지 않았다.'];

/* ---- 업적 ---- */
ACH.b_icebreaker = ['빙벽을 깨다', '빙궁의 총공세를 막아 냈다'];
ACH.b_mokdo = ['목도를 물려받다', '독고강의 마지막 가르침을 받았다'];
ACH.b_net = ['그물 밖으로', '황실의 그물이 걷힐 때까지 살아남았다'];
ACH.b_crystal = ['붉은 수정', '혈정을 세 번 삼켰다'];

/* ---- 새 인물: E3 ---- */
addNpc('b_sabar', { n: '사바르', role: '파사교 밀수상', desc: '붉은 수정을 은함에 담아 파는 서역 상인.', world: ['ma', 'jeong', 'wander'], flag: 'b_sabar_met', dead: 'b_sabarGone' },
  function () {
    var c = price(240 + S.realm * 30), q = qiPct(.05), g = price(200);
    scene('사바르의 천막', npcHead('b_sabar') + '<p>향 냄새가 짙다. 사바르는 은함을 손바닥 위에서 굴리며 웃었다. “오늘도 추운 얼굴이시군. 몸을 데울 것이 있소.”</p>', [
      { t: '혈정 한 알을 산다', h: '은전 -' + c + ' · 내공 +' + q + ' · 마기가 크게 오른다', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; b_eat(.05); gain('b_sabar', 1, '<p>수정은 혀 위에서 녹았다. 단전이 끓었다. 끓은 것이 무엇인지는 묻지 않았다.</p>'); } },
      { t: '보석과 옥을 흥정한다', h: '은전 -' + g + ' · 보석 1 · 옥정 1', off: S.silver < g ? '은전이 모자란다' : null, f: function () { S.silver -= g; addMat('gem', 1); addMat('jade', 1); gain('b_sabar', 1, '<p>사바르는 값을 세 번 올렸다가 두 번 내렸다. 그것이 서역의 예법이라고 했다.</p>'); } },
      { t: '서역 이야기를 듣는다', h: '마기 -8 · 소문', f: function () { S.mad = Math.max(0, S.mad - 8); gain('b_sabar', 1, '<p>' + pick(['모래 위의 불의 사원 이야기를 들었다. 그곳의 사제들은 하늘에 문이 있다고 믿는다고 했다.', '사막을 건너는 낙타 이야기를 들었다. 물이 없으면 피를 마신다고 했다. 농담인지 알 수 없었다.', '사바르의 고향에도 붉은 달이 뜬다고 했다. 다만 그곳 사람들은 그 달을 문의 열쇠라고 부른다.']) + '</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { S.items.calm = Math.min(4, S.items.calm + 1); result('서역의 향', npcHead('b_sabar') + '<p>“단골에게만 주는 것이오.” 사바르가 검은 향 한 자루를 내밀었다. 피우면 머리가 식는다고 했다.</p><p><b>정심환</b> 1개를 얻었다.</p>', d); } },
   { t: 3, run: function (d) { learnMem('b_ninedots'); S.flags.b_sabarTold = 1; result('아홉 자리', npcHead('b_sabar') + '<p>사바르가 처음으로 웃지 않았다. “수정은 내가 만든 것이 아니오. 위에서 내려온 것이지. 아홉 자리에 앉은 분들이 붉은 달의 힘을 모으고 있소.”</p><p>그는 은함 바닥의 인장을 손톱으로 긁었다. 아홉 개의 점이 원을 이루고 있었다.</p>', d); } }]);

addNpc('b_seolyeong', { n: '설영', role: '빙궁 탈주 무사', desc: '자기 동족에게 칼을 돌린 북해의 여무사.', world: ['ma', 'jeong', 'wander'], flag: 'b_seol_met', dead: 'b_seolDead' },
  function () {
    var q = qiPct(.02);
    scene('설영의 거처', npcHead('b_seolyeong') + '<p>설영은 창을 열어 둔 채 앉아 있다. 방 안이 바깥보다 춥다. “남쪽 사람들은 불을 너무 좋아해.”</p>', [
      { t: '빙궁의 한기 운용을 배운다', h: '내공 +' + q + ' · 마기 -8', f: function () { S.qi += qiPct(.02); S.mad = Math.max(0, S.mad - 8); gain('b_seolyeong', 1, '<p>숨을 차갑게 들이쉬고 뜨겁게 내쉬는 법을 배웠다. 끓던 피가 한 김 식었다.</p>'); } },
      { t: '함께 사냥을 나간다', h: '짐승 가죽 2 · 영수의 뼈 1', f: function () { addMat('hide', 2); addMat('bone', 1); gain('b_seolyeong', 1, '<p>설영은 눈 위의 발자국만 보고 짐승의 나이를 맞혔다. 해가 지기 전에 썰매가 무거워졌다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { S.hpBonus = (S.hpBonus || 0) + 6; result('빙백 호흡', npcHead('b_seolyeong') + '<p>“얼음 바다에 빠졌을 때 쓰는 숨이야. 심장을 느리게 하는 거지.” 설영이 당신의 등에 손을 얹었다. 차가운 것이 척추를 따라 내려갔다.</p><p>최대 체력 <b>+6</b>.</p>', d); } },
   { t: 3, run: function (d) { learnMem('b_binglin'); S.flags.b_seolBond = 1; result('궁주의 이름', npcHead('b_seolyeong') + '<p>“빙린은 나를 죽이지 않을 거야. 내가 도망친 이유를 아니까.” 설영이 처음으로 궁주의 이름을 불렀다. “장로들이 서역 수정을 먹기 시작했어. 빙린은 그걸 막지 못했지.”</p>', d); } }]);

addNpc('b_binglin', { n: '빙린', role: '북해빙궁주', desc: '칼보다 신의를 세는 얼음 궁의 주인.', world: ['ma', 'jeong', 'wander'], flag: 'b_binglin_met', dead: 'b_binglinDead' },
  function () {
    var g = price(180 + S.realm * 20), q = qiPct(.03);
    scene('빙궁의 사절관', npcHead('b_binglin') + '<p>빙린은 남쪽 땅에서도 털옷을 벗지 않았다. 찻잔에 얼음 한 조각을 띄워 마셨다. “' + pick(['겨울이 짧군. 부럽다.', '네 얼굴에 주름이 늘었다. 남쪽은 사람을 빨리 늙게 하는군.', '오늘은 칼 이야기는 하지 않겠다.']) + '”</p>', [
      { t: '빙궁과 교역한다', h: '은전 +' + g + ' · 짐승 가죽 2', f: function () { S.silver += g; addMat('hide', 2); gain('b_binglin', 1, '<p>북해의 모피와 남쪽의 소금이 오갔다. 빙린은 장부를 직접 읽었다. 틀린 곳을 두 군데 찾아냈다.</p>'); } },
      { t: '대련을 청한다', h: '전투 · 이기면 내공 +' + q, f: function () { fight('b_binglin', et() * .85, { auto: true, spar: true, title: '빙린과의 대련', win: function () { S.qi += qiPct(.03); gain('b_binglin', 1, '<p>서리가 칼끝에서 녹았다. 빙린이 고개를 끄덕였다. “남쪽에도 겨울을 아는 칼이 있군.”</p>'); }, lose: function () { b_rest(.35); gain('b_binglin', 1, '<p>손끝이 얼어 칼을 놓쳤다. 빙린은 당신의 손을 자기 품에 넣어 녹여 주었다. 아무 말도 없었다.</p>'); } }); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 3, run: function (d) { var ok = (S.lifeBonus || 0) < 12; if (ok) S.lifeBonus = (S.lifeBonus || 0) + 2; else addMat('core', 1); result('만년설련', npcHead('b_binglin') + '<p>빙린이 얼음 상자를 열었다. 하얀 연꽃 한 송이가 얼어 있었다. “빙궁에 백 년에 한 번 피는 꽃이다. 궁주만 먹는다. 나는 아직 필요 없다.”</p><p>' + (ok ? '수명이 <b>2년</b> 늘었다.' : '<b>영단 1</b>을 얻었다.') + '</p>', d); } }]);

/* ================= E3 북해의 눈보라 (217~312) ================= */

EVENTS.push({ m: 218, id: 'b_n_omen', run: function () {
  var c = price(120), q = qiPct(.03), mem = hasMem('b_arah') || hasMem('b_ugyeom');
  var body = ps('첫눈이 예년보다 한 달 일렀다. 북쪽에서 온 짐마차 바퀴에 살얼음이 끼어 있었다.',
    W('혈월봉 북쪽 초소에서 전서구가 내려왔다. 변경 마을 셋이 하룻밤에 비었다고 했다. 사람도 가축도 선 채로 얼어 있었다.', '무림맹에 북방 문파들의 구원 요청이 연달아 올라왔다. 성벽 위에 흰 깃발이 꽂혔다고 했다. 깃발에는 얼음 빙(氷) 한 글자.', '고갯마루 객잔에서 피난민들이 떠들었다. 북해에서 얼음 궁의 군대가 내려온다고. 그들이 지나간 마을에는 불 대신 서리가 남는다고.'),
    '서른다섯. 칼을 쥔 지 스무 해가 다 되었다. 이번 겨울은 길 것 같았다.' + (mem ? ' 기억이 먼저 몸을 떨게 했다. 이 겨울을 당신은 이미 한 번 보았다.' : ''));
  var ch = [
    { t: '직접 북쪽 길을 정찰한다', h: '전투 · 이기면 내공 +' + q + ' · 적의 사정을 안다', f: function () {
      fight('b_frostscout', et() * .85, { auto: true, spar: true, title: '눈 속의 척후', win: function () { S.qi += qiPct(.03); S.flags.b_scouted = 1; done('흰 털옷을 입은 척후를 눈 속에서 끌어냈다. 품에서 나온 지도에는 고개 이름 하나에 붉은 점이 찍혀 있었다. 백랑령.', 'fight'); },
        lose: function () { b_rest(.35); done('척후는 눈 속으로 사라졌다. 화살 한 대가 어깨에 박혀 있었다. 촉이 얼음이었다.', 'fail'); } }); } },
    { t: '피난민에게서 소식을 산다', h: '은전 -' + c + ' · 적의 사정을 안다', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.flags.b_scouted = 1; done('은전을 풀어 국밥을 돌렸다. 숟가락을 든 입들이 하나씩 열렸다. 빙궁의 장수 둘, 늑대처럼 빠른 여자와 쇠처럼 무거운 사내. 그리고 백랑령.', 'people'); } },
    { t: '겨울 채비부터 한다', h: '짐승 가죽 3 · 약초 3 · 회춘단 +1', f: function () { addMat('hide', 3); addMat('herb', 3); S.items.pill = Math.min(8, S.items.pill + 1); done('털옷을 깁고 약을 달였다. 전쟁보다 먼저 오는 것은 추위다. 그것만은 확실했다.', 'item'); } }];
  if (mem) ch.unshift({ t: '지난 생의 기억대로 백랑령에 사람을 심는다', h: '다가올 매복전이 쉬워진다', c: 'primary', f: function () { S.flags.b_prep = 1; S.flags.b_scouted = 1; done('아무도 묻지 않은 고개에 ' + b_side() + ' 열을 보냈다. 왜냐고 묻는 이에게는 대답하지 않았다. 늑대가 올 길을 당신은 안다.', 'event'); } });
  scene('북풍', body, ch, 'loc_border');
} });

EVENTS.push({ m: 227, id: 'b_n_sabar', run: function () {
  var c = price(260), q = qiPct(.07), r = price(380);
  var body = ps(W('총단 아래 장터', '맹 외곽의 시장', '국경 나루터의 장터') + '에 낯선 천막이 섰다. 서역의 향 냄새가 눈 냄새를 덮었다.',
    '천막 주인은 사바르라는 상인이었다. 파사교의 불꽃 문양을 목에 걸었다. 그가 은함을 열자 손톱만 한 붉은 수정이 빛났다. “혈정(血晶)이오. 한 알이면 석 달 운기를 대신하지.”',
    '수정 속에서 무언가가 천천히 돌고 있었다. 혈월과 같은 빛이었다.' + (hasMem('b_hyeoljeong') ? ' 기억이 혀끝에서 쓴맛을 냈다. 지난 생, 이것을 몇 알이나 삼켰던가.' : ''));
  meet('b_sabar'); S.flags.b_sabar_met = 1;
  scene('붉은 수정', body, [
    { t: '한 알 사서 그 자리에서 삼킨다', h: '은전 -' + c + ' · 내공 +' + q + ' · 마기 크게 상승', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; var g = b_eat(.07); done('수정이 혀 위에서 녹았다. 단전에 불이 붙었다. 내공이 <b>' + g + '</b> 늘었다. 그날 밤 꿈에 붉은 문 하나가 보였다.', 'qi'); } },
    { t: '사서 되판다', h: '은전 -' + c + ' → +' + r + ' · 소문이 돈다', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver += r - c; S.flags.b_resold = 1; done('혈정은 사흘 만에 곱절 값에 팔렸다. 산 자는 ' + W('외당의 젊은 교도', '세가의 둘째 아들', '떠돌이 무사') + '였다. 그 뒤로 그를 보지 못했다.', 'item'); } },
    { t: '사서 의원에게 감정을 맡긴다', h: '은전 -' + c + ' · 혈정의 정체를 안다 · 마기 -10', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.mad = Math.max(0, S.mad - 10); learnMem('b_hyeoljeong'); S.flags.b_knowCrystal = 1; done((alive('hr') ? '홍란' : '늙은 의원') + '이 수정을 물에 녹였다. 물이 핏빛으로 변하더니 끓기 시작했다. “내공이 아니야. 남의 피에 밴 혈월의 기운이지. 먹으면 먹은 만큼 마(魔)가 쌓여.”', 'event'); } },
    { t: '거절하고 지켜본다', h: '아무 일 없다', f: function () { done('사바르는 웃으며 은함을 닫았다. “겨울은 길어요. 또 오시오.” 그 웃음이 오래 마음에 걸렸다.', 'event'); } }], 'night');
} });

EVENTS.push({ m: 236, id: 'b_n_village', run: function () {
  var q = qiPct(.04), body = ps('삭풍촌. 북쪽 변경의 마지막 마을이다. 눈보라 속에서 종소리가 끊겼다 이어졌다.',
    '당신과 ' + b_side() + '이 마을에 닿았을 때 빙궁의 한철위들이 울타리를 넘고 있었다. 그런데 마을 어귀에서 흰 옷의 여자 하나가 그들을 막고 있었다. 빙궁의 갑옷을 입은 여자였다.',
    '같은 옷을 입은 자들끼리 베고 있었다.');
  pages('삭풍촌', [body], 'loc_village', function () {
    fight('b_icewarrior', et() * .95, { auto: true, spar: true, title: '삭풍촌의 눈보라', heal: .15,
      win: function () { S.qi += qiPct(.04); after(true); }, lose: function () { b_rest(.3); after(false); } });
  });
  function after(won) {
    scene('흰 옷의 탈주자', ps(won ? '마지막 한철위가 눈 위에 쓰러졌다. 마을은 반쯤 남았다.' : '쓰러진 당신을 누군가 마구간으로 끌고 갔다. 정신이 들었을 때 마을은 반쯤 타 있었다. 불이 아니라 서리에.',
      '흰 옷의 여자가 옆구리를 누른 채 앉아 있었다. 이름은 설영. 빙궁의 백인장이었다고 했다. “장로들이 서역 수정을 먹고 미쳤어. 나는 따라가지 않았을 뿐이야.”'), [
      { t: '상처를 치료해 준다', h: '설영을 알게 된다 · 뒤에 빙궁과의 협상에 도움', c: 'primary', f: function () { meet('b_seolyeong'); S.flags.b_seol_met = 1; S.trust.b_seolyeong = 1; done('상처를 꿰매는 동안 설영은 신음 한 번 내지 않았다. 다 끝나자 짧게 말했다. “빚이야. 북쪽 사람은 빚을 잊지 않아.”', 'people'); } },
      { t: '묶어서 ' + W('장로회', '맹', '관아') + '에 넘긴다', h: '은전 +' + price(220) + ' · 빙궁의 정보', f: function () { S.silver += price(220); S.flags.b_seolHanded = 1; learnMem('b_arah'); done('설영은 저항하지 않았다. 심문에서 그녀는 설랑장 아라가 백랑령을 노린다고 털어놓았다. 상금이 나왔다. 그녀의 눈빛은 받지 않았다.', 'item'); } },
      { t: '적은 적이다. 벤다', h: '마기 +12 · 내공 소량', f: function () { S.flags.b_seolDead = 1; S.mad = clamp(S.mad + 12, 0, 100); S.qi += qiPct(.015); done('설영은 마지막에 웃었다. “남쪽도 북쪽과 다르지 않군.” 눈이 그녀의 얼굴을 덮었다.', 'fight'); } }]);
  }
} });

EVENTS.push({ m: 247, id: 'b_n_arah', run: function () {
  var prep = S.flags.b_prep || hasMem('b_arah') || S.flags.b_seol_met && !S.flags.b_seolDead, q = qiPct(.06), sv = price(300);
  var body = ps('백랑령. 북쪽에서 남쪽으로 넘어오는 유일한 고개다. 피난민 행렬이 그 고개를 넘고 있었다.',
    '해 질 녘, 산등성이에서 늑대 울음이 났다. 진짜 늑대가 아니었다. 흰 털옷의 기병들이 눈 위를 미끄러져 내려왔다. 선두의 여자가 쌍도를 뽑았다. 설랑장 아라.',
    prep ? (S.flags.b_prep ? '미리 심어 둔 ' + b_side() + '이 바위 뒤에서 활을 겨누고 있었다.' : (hasMem('b_arah') ? '기억이 길을 알려 주었다. 그녀는 늘 왼쪽 능선으로 돈다.' : '설영이 귓가에 속삭였다. “아라는 첫 합을 왼쪽에서 들어와.”')) : '준비할 틈이 없었다.');
  var lose = function () { die('b_pass'); };
  var win = function () { S.qi += qiPct(.06); S.silver += price(300); addMat('hide', 3); S.flags.b_arahDead = 1; learnMem('b_arah'); done('아라의 쌍도가 눈 위에 꽂혔다. 그녀는 무릎을 꿇은 채 남쪽 하늘을 보았다. “따뜻하군.” 그것이 마지막 말이었다. 행렬은 무사히 고개를 넘었다. 은전 <b>' + price(300) + '</b>냥의 포상이 내려왔다.', 'fight'); };
  var ch = [
    { t: '정면으로 맞선다', h: '목숨을 건 보스전 · 이기면 내공 +' + q + ' · 은전 +' + sv, f: function () { fight('b_arah', et() + .45, { auto: true, title: '설랑장 아라', win: win, lose: lose }); } },
    { t: '행렬을 먼저 피신시키고 물러난다', h: '체력 -20% · 고개를 잃는다 · 아라의 수를 기억한다', f: function () { hurt(.2); S.flags.b_passLost = 1; learnMem('b_arah'); done('마지막 수레가 고개를 넘을 때까지 뒤를 막았다. 아라의 칼이 세 번 스쳤다. 고개는 빙궁의 것이 되었다. 그녀가 늘 왼쪽에서 들어온다는 것만은 몸에 새겨졌다.', 'fail'); } }];
  if (prep) ch.unshift({ t: '매복으로 늑대를 덫에 건다', h: '목숨을 건 보스전 · 적이 약해진 채 시작', c: 'primary', f: function () { fight('b_arah', et() + .3, { auto: true, hpMul: .65, title: '백랑령의 덫', win: win, lose: lose }); } });
  scene('백랑령', body, ch, 'siege');
} });

EVENTS.push({ m: 258, id: 'b_n_cheolno', cond: function () { return alive('cn') && (S.flags.cn || worldOf() !== 'jeong'); }, run: function () {
  var body = ps(W('철노의 대장간', '북쪽 변경의 낡은 대장간', '국경 마을의 대장간') + '에 불이 꺼져 있었다. 처음 있는 일이었다.',
    '철노는 화로 앞 의자에 앉아 기침을 하고 있었다. 손등에 검버섯이 번졌다. 그래도 눈은 쇠를 볼 때처럼 날카로웠다. ' + (S.flags.b_arahDead ? '“설랑장의 칼을 주워 왔다고? 빙철이군. 평생 한 번 만져 보고 싶던 쇠다.”' : '“북쪽에서 빙철이 흘러 들어오더군. 전쟁은 늘 좋은 쇠를 남기지.”'),
    '“마지막으로 하나만 두드려 보마. 무엇을 원하느냐.”');
  var fin = function (t, k) {
    S.flags.cnDead = 1;
    pages('마지막 망치질', [ps(t, '사흘 밤낮 망치 소리가 그치지 않았다. 나흘째 아침, 소리가 멎었다.', '철노는 모루에 이마를 댄 채 잠들어 있었다. 손에는 아직 망치가 쥐어져 있었다. 다시 깨지 않았다.', '“쇠는 늙지 않는다. 사람만 늙지.” 그 말이 화로의 재 속에 남았다.')], 'night', function () { done('철노가 죽었다. 마지막 작품이 당신의 손에 남았다. ' + k, 'item'); });
  };
  scene('꺼진 화로', body, [
    { t: '칼을 부탁한다', h: '무기 한 단계 이상 상승', c: 'primary', f: function () { var r = b_wup(); fin('철노는 빙철을 세 번 접고 일곱 번 담금질했다. 칼날에 서리 무늬가 앉았다.', r); } },
    { t: '갑옷을 부탁한다', h: '방어구 한 단계 이상 상승', f: function () { var r = b_aup(); fin('철노는 빙철을 비늘처럼 얇게 펴서 한 장씩 엮었다. 입으면 겨울바람이 비켜 갔다.', r); } },
    { t: '만들지 말고 쉬시라 한다', h: '정철 6 · 보석 1 · 마기 -20', f: function () { addMat('iron', 6); addMat('gem', 1); S.mad = Math.max(0, S.mad - 20); S.flags.cnDead = 1; pages('쉬는 대장장이', [ps('철노는 코웃음을 쳤지만 망치를 내려놓았다. 그 겨울 당신은 몇 번 그의 화로 곁에서 술을 마셨다.', '봄이 오기 전, 그는 앉은 채로 숨을 거두었다. 쌓아 둔 정철과 보석 한 알이 당신 이름 앞으로 남겨져 있었다.')], 'night', function () { done('철노가 죽었다. 칼 대신 겨울 몇 밤이 남았다.', 'people'); }); } }], 'night');
} });

EVENTS.push({ m: 268, id: 'b_n_namgung', cond: function () { return alive('nj'); }, run: function () {
  var jeong = worldOf() === 'jeong', q = qiPct(.07), q2 = qiPct(.04);
  var sk = S.realm >= 4 && SK.singeom ? 'singeom' : 'igieo';
  var teach = function () { var had = !!S.skills[sk]; learn(sk); return had ? (upSkill(2) || '무공') + '의 성취가 깊어졌다.' : '<b>' + SK[sk].n + '</b>을(를) 얻었다.'; };
  if (jeong) {
    scene('검성의 북행', ps('남궁진이 흰 머리를 묶고 갑옷을 입었다. 일흔이 넘은 몸이다.', '“북쪽 성벽이 셋째 무너졌다고 하더군. 맹의 젊은 것들이 얼어 죽는 걸 앉아서 들을 수는 없다.” 그는 당신을 보았다. “함께 가겠느냐. 아니면 늙은이를 말리겠느냐.”'), [
      { t: '함께 북으로 간다', h: '전투 · 검성의 마지막 검 · 내공 +' + q, c: 'primary', f: function () {
        fight('b_icewarrior', et() * 1.05, { auto: true, spar: true, title: '검성과 함께', heal: .2, win: function () { var t = teach(); S.qi += qiPct(.07); S.flags.njDead = 1; S.flags.b_njFell = 1;
          pages('검성의 마지막 검', [ps('성벽 위에서 남궁진은 백 명을 베었다. 천 번 휘두르던 검을 이제는 백 번밖에 휘두르지 못한다고 했던 노인이었다.', '마지막 검을 휘두르고 그는 성가퀴에 등을 기댔다. “검을 쥐지 말고, 검과 함께 숨 쉬어라. 기억하느냐.” 그것이 그의 마지막 가르침이었다.')], 'siege', function () { done('검성 남궁진이 북쪽 성벽에서 죽었다. 맹 전체가 사흘 동안 흰 등을 걸었다. ' + t, 'skill'); }); },
          lose: function () { b_rest(.3); S.flags.njDead = 1; S.flags.b_njFell = 1; done('당신이 쓰러진 사이 남궁진이 당신을 성 안으로 업어 들였다. 그날 밤 그는 다시 성벽으로 나갔고, 돌아오지 않았다.', 'fail'); } }); } },
      { t: '은퇴를 권한다', h: '그는 떠난다 · 검과 검보를 남긴다', f: function () { var r = b_wup(); S.qi += qiPct(.04); S.flags.njDead = 1; S.flags.b_njRetired = 1; done('남궁진은 오래 말이 없었다. 그러고는 허리의 검을 풀었다. “늙은 검은 젊은 손에 있어야 하는 법이지.” 그는 남궁세가의 옛집으로 돌아갔고, 다시 맹에 오지 않았다. ' + r, 'people'); } },
      { t: '대신 가겠다고 하고 마지막 대련을 청한다', h: '대련 · 이기면 검성의 검 · 그는 그해 겨울 잠든다', f: function () { fight('gs', et(), { auto: true, spar: true, title: '검성과의 마지막 대련', win: function () { var t = teach(); S.flags.njDead = 1; done('검이 당신의 목 앞에서, 당신의 검이 그의 가슴 앞에서 멈췄다. 남궁진이 크게 웃었다. 그해 겨울, 그는 새벽 수련을 마치고 앉은 채로 잠들었다. ' + t, 'skill'); }, lose: function () { b_rest(.35); S.qi += qiPct(.03); S.flags.njDead = 1; done('또 졌다. 남궁진은 만족한 얼굴로 검을 거두었다. 그해 겨울 그는 앉은 채로 잠들었다. 마지막으로 이긴 상대가 당신이었다는 말이 돌았다.', 'fail'); } }); } }], 'alliance');
  } else {
    scene('늙은 검성의 방문', ps('눈길을 걸어 노인 하나가 찾아왔다. 흰 옷, 흰 머리, 허리의 검 한 자루. 검성 남궁진이었다.', '“북으로 간다. 돌아오지 못할 길이지. 그 전에 ' + W('마교의 칼', '그 칼', '강호에 떠도는 칼') + '과 한 번은 겨뤄 보고 싶었다.”'), [
      { t: '검을 받아 준다', h: '대련 · 이기면 내공 +' + q2 + ' · 검성의 깨달음', c: 'primary', f: function () { fight('gs', et(), { auto: true, spar: true, title: '늙은 검성', win: function () { S.qi += qiPct(.04); var t = upSkill(2); S.flags.njDead = 1; done('남궁진은 검을 거두고 고개를 숙였다. “적이었던 것이 아깝군.” 그는 북으로 갔고, 석 달 뒤 북쪽 성벽에서 죽었다는 소식이 왔다.' + (t ? ' ' + t + '의 성취가 깊어졌다.' : ''), 'skill'); }, lose: function () { b_rest(.35); S.qi += qiPct(.02); S.flags.njDead = 1; done('검성은 여전히 검성이었다. 그는 쓰러진 당신에게 말했다. “다음 생에는 이겨라.” 석 달 뒤 그가 북쪽 성벽에서 죽었다는 소식이 왔다.', 'fail'); } }); } },
      { t: '거절하고 술을 따른다', h: '마기 -15 · 그는 떠난다', f: function () { S.mad = Math.max(0, S.mad - 15); S.flags.njDead = 1; done('남궁진은 웃으며 술잔을 비웠다. “늙으니 칼보다 술이 낫긴 하군.” 그는 북으로 갔다. 그해 겨울 검성이 북쪽 성벽에서 죽었다는 소식이 왔다.', 'people'); } }], 'arena');
  }
} });

EVENTS.push({ m: 280, id: 'b_n_binglin', run: function () {
  var score = (S.flags.b_seol_met && !S.flags.b_seolDead ? 2 : 0) + (S.flags.b_seolBond ? 1 : 0) + (hasMem('b_binglin') ? 1 : 0) + (S.flags.b_arahDead ? 1 : 0) + (S.realm >= 5 ? 1 : 0);
  var q = qiPct(.08), sv = price(500);
  var body = ps('빙하가 강을 덮은 날, 빙궁에서 휴전의 깃발이 왔다. 궁주가 직접 담판을 원한다고 했다.',
    '얼음 위에 친 흰 막사. 빙린은 생각보다 젊었다. 서리 낀 속눈썹 아래 눈이 피곤해 보였다. “남쪽 땅을 원하는 게 아니다. 북해의 샘이 말랐다. 그리고 서역 상인이 판 수정이 내 장로들을 미치게 했다.”',
    '“전쟁을 멈출 셈이 있느냐. 아니면 여기서 칼로 셈하겠느냐.”' + (S.flags.b_seol_met && !S.flags.b_seolDead ? ' 막사 밖에서 설영이 기다리고 있었다.' : '') + (hasMem('b_binglin') ? ' 기억이 말한다. 이 여자는 칼보다 신의를 센다.' : ''));
  learnMem('b_binglin');
  scene('빙하 위의 담판', body, [
    { t: '협상한다', h: score >= 2 ? '조건이 맞다 · 협정과 교역' : '아직 신의가 모자라다 · 반쯤의 협정', c: 'primary', f: function () {
      if (score >= 2) { S.flags.b_binglin = 'pact'; meet('b_binglin'); S.flags.b_binglin_met = 1; S.silver += price(300); S.qi += qiPct(.04); done('밤새 지도를 사이에 두고 앉았다. 빙궁은 백랑령 북쪽으로 물러나고, 남쪽은 소금과 곡식을 판다. 빙린이 장갑을 벗고 손을 내밀었다. 손이 차가웠다. 교역의 첫 몫으로 은전 <b>' + price(300) + '</b>냥이 들어왔다.', 'people'); }
      else { S.flags.b_binglin = 'half'; S.silver += price(120); done('빙린은 당신의 말을 끝까지 들었다. 그러고는 고개를 저었다. “말은 좋다. 그러나 나는 너를 모른다.” 반쪽짜리 휴전이 맺어졌다. 봄까지는 칼이 쉰다.', 'event'); } } },
    { t: '결투로 담판을 짓는다', h: '목숨을 건 보스전 · 이기면 내공 +' + q + ' · 그녀의 존중', f: function () {
      fight('b_binglin', et() + .55, { auto: true, title: '빙궁주 빙린', win: function () { S.qi += qiPct(.08); S.flags.b_binglin = 'respect'; meet('b_binglin'); S.flags.b_binglin_met = 1; done('빙린의 서리가 당신의 칼끝에서 녹았다. 그녀는 무릎을 꿇지 않았다. 대신 칼을 거꾸로 꽂았다. “북해의 법이다. 이긴 자의 말을 듣는다.”', 'fight'); }, lose: function () { die('b_binglin'); } }); } },
    { t: '막사를 기습해 궁주를 사로잡는다', h: '전투 · 이기면 은전 +' + sv + ' · 원수가 생긴다 · 마기 +10', f: function () {
      S.mad = clamp(S.mad + 10, 0, 100);
      fight('b_binglin', et() * .9, { auto: true, spar: true, hpMul: .8, title: '흰 막사의 칼', win: function () { S.silver += price(500); S.flags.b_binglin = 'feud'; done('빙린은 피를 흘리며 얼음 강으로 뛰어들었다. 사로잡지는 못했다. 대신 그녀의 인장과 금괴 상자가 남았다. 은전 <b>' + price(500) + '</b>냥. 강 건너에서 그녀가 외쳤다. “이 겨울을 기억하겠다.”', 'fight'); },
        lose: function () { b_rest(.3); S.flags.b_binglin = 'feud'; done('기습은 실패했다. 빙린은 당신의 칼을 맨손으로 꺾었다. “남쪽의 신의는 이 정도로군.” 휴전의 깃발이 불탔다.', 'fail'); } }); } }], 'court');
} });

EVENTS.push({ m: 294, id: 'b_n_ugyeom', run: function () {
  var bl = S.flags.b_binglin, ally = bl === 'pact' || bl === 'respect', q = qiPct(.08), sv = price(450), mem = hasMem('b_ugyeom');
  var body = ps(ally ? '협정은 반년을 가지 못했다. 빙궁의 장로파가 궁주를 버렸다. 그들의 칼은 빙철장 우겸이 쥐었다.' : '봄이 오기 전에 빙궁이 다시 움직였다. 이번에는 전부였다. 선두에 빙철장 우겸이 섰다.',
    '우겸은 사람보다 곰에 가까웠다. 쇠 철퇴를 한 손으로 돌렸다. 그의 눈은 붉었다. 혈정을 씹어 먹은 눈이었다.',
    ally ? '빙린이 남은 친위대를 이끌고 당신 곁에 섰다. “내 사람이 아니다. 내 손으로 끝내겠다.”' : '성벽 위의 ' + b_side() + '이 당신만 보았다.');
  var winF = function () { S.qi += qiPct(.08); S.silver += price(450); addMat('iron', 6); if (Math.random() < .5) addMat('scale', 1); S.flags.b_ugyeomDead = 1; learnMem('b_ugyeom'); ach('b_icebreaker'); done('철퇴가 빙판 위에 떨어지며 얼음이 갈라졌다. 우겸은 그 틈으로 가라앉았다. 빙궁의 깃발이 하나씩 내려갔다. 은전 <b>' + price(450) + '</b>냥과 빙철 더미가 전리품으로 남았다.', 'fight'); };
  var ch = [
    { t: '선두에서 우겸을 노린다', h: '목숨을 건 보스전 · 이기면 내공 +' + q + ' · 은전 +' + sv, c: 'primary', f: function () { fight('b_ugyeom', et() + (ally ? .4 : .6), { auto: true, heal: ally ? .3 : .1, title: '빙철장 우겸', win: winF, lose: function () { die('b_siege'); } }); } },
    { t: '성벽을 지키며 버틴다', h: '전투 · 우겸은 다른 손에 죽는다 · 보상이 적다', f: function () { fight('b_icewarrior', et(), { auto: true, spar: true, title: '성벽의 밤', win: function () { S.qi += qiPct(.03); S.flags.b_ugyeomDead = 1; learnMem('b_ugyeom'); done('사흘 밤을 성벽에서 버텼다. 나흘째 아침 우겸의 목이 ' + (ally ? '빙린의 창끝에' : '다른 장수의 창끝에') + ' 걸렸다. 공은 남의 것이 되었지만 성은 남았다.', 'fight'); }, lose: function () { b_rest(.25); S.flags.b_ugyeomDead = 1; learnMem('b_ugyeom'); done('성벽에서 굴러떨어졌다. 깨어 보니 전쟁은 끝나 있었다. 우겸은 죽었고, 당신은 그 장면을 보지 못했다.', 'fail'); } }); } }];
  if (mem) ch.unshift({ t: '먼저 혈정 창고를 불태운다', h: '목숨을 건 보스전 · 우겸이 약해진다', f: function () { S.qi += qiPct(.02); fight('b_ugyeom', et() + .35, { auto: true, hpMul: .7, heal: .2, title: '불타는 창고', win: winF, lose: function () { die('b_siege'); } }); } });
  scene('빙철의 총공세', body, ch, 'siege');
} });

EVENTS.push({ m: 308, id: 'b_n_thaw', run: function () {
  var bl = S.flags.b_binglin;
  var p1 = bl === 'pact' || bl === 'respect' ? '얼음이 녹자 빙린이 사절을 보냈다. 빙궁은 북해로 돌아간다고 했다. 사절이 얼음 상자 하나를 두고 갔다. “궁주께서 빚은 갚는다고 하셨소.”' :
    (bl === 'feud' ? '얼음이 녹자 빙궁은 물러갔다. 강 건너 바위에 누군가 칼로 새겨 두었다. 「다음 겨울」. 빙린의 글씨였다.' : '얼음이 녹자 빙궁은 말없이 물러갔다. 이긴 것인지 끝난 것인지 아무도 몰랐다.');
  var ally = bl === 'pact' || bl === 'respect';
  if (bl === 'feud') { S.flags.b_binglin_met = 0; }
  learnMem('b_ninedots');
  scene('해빙', ps(p1, '우겸의 진영을 치우던 ' + b_side() + '이 은함 수십 개를 찾아냈다. 텅 빈 함들이었다. 바닥마다 같은 인장이 찍혀 있었다. 아홉 개의 점이 원을 이루는 문양.', '사바르의 은함에서 본 것과 같았다. 서역에서 온 붉은 수정은 빙궁을 미치게 했고, 빙궁은 남쪽을 쳤다. 누가 이 전쟁에서 이겼는지 처음으로 의심이 들었다.'), [
    { t: ally ? '빙린의 선물을 연다' : '전리품을 나눈다', h: ally ? '최대 체력 +10 · 옥정 2' : '은전 +' + price(200) + ' · 옥정 1', c: 'primary', f: function () { if (ally) { S.hpBonus = (S.hpBonus || 0) + 10; addMat('jade', 2); done('상자 안에는 빙궁의 한옥으로 깎은 호신패가 들어 있었다. 차가운 것이 몸에 들어와 오래 머물렀다. 최대 체력 <b>+10</b>.', 'item'); } else { S.silver += price(200); addMat('jade', 1); done('전리품을 나누고 죽은 이들을 묻었다. 언 땅이라 삽이 잘 들어가지 않았다.', 'item'); } } },
    { t: '은함을 모두 태운다', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); done('은함을 쌓아 불을 질렀다. 불꽃이 잠시 붉게, 아주 붉게 타올랐다. 연기가 아홉 갈래로 갈라져 하늘로 올라갔다.', 'event'); } },
    { t: S.flags.b_sabar_met && !S.flags.b_sabarGone ? '은함 하나를 들고 사바르를 찾아간다' : '은함 하나를 간직한다', h: S.flags.b_sabar_met && !S.flags.b_sabarGone ? '사바르의 신뢰 +1 · 아홉 자리의 소문' : '훗날의 단서', f: function () { S.flags.b_box = 1; if (S.flags.b_sabar_met && !S.flags.b_sabarGone) { S.trust.b_sabar = tr('b_sabar') + 1; done('사바르는 은함을 보더니 천막을 걷었다. “이건 내 물건이 아니오. 나는 그저 나르는 사람이지.” 그의 손이 떨렸다. 처음 보는 모습이었다.', 'people'); } else done('은함 하나를 품에 넣었다. 아홉 점은 손끝으로 만져도 차가웠다.', 'event'); } }], 'dawn');
} });

/* ---- E3 우연한 사건 ---- */
LIFE.push({ id: 'b_l_snow', from: 35, to: 44, w: 3, cd: 30, run: function () {
  var who = pick(['소금 상단', '피난민 일가', '약초꾼 노인', '젊은 순찰 무사 둘']), q = qiPct(.02), sv = price(90 + S.realm * 15);
  scene('눈보라 속의 불빛', ps('사흘째 눈보라가 그치지 않았다. 길도 하늘도 같은 색이었다.', '고갯길 아래에서 희미한 불빛이 흔들렸다. ' + who + '이(가) 눈 속에 갇혀 있었다. 말 한 마리는 이미 얼어 있었다.'), [
    { t: '내려가 끌어낸다', h: '체력 -15% · 은전 +' + sv + ' · 내공 +' + q, c: 'primary', f: function () { hurt(.15); S.silver += sv; S.qi += q; done('눈을 헤치고 한 사람씩 업어 올렸다. 손가락 감각이 사라졌다. 살아난 ' + who + '이(가) 품에서 은전 <b>' + sv + '</b>냥을 꺼냈다. 거절했지만 눈 위에 두고 갔다.', 'people'); } },
    { t: '내공으로 길을 녹이며 이끈다', h: S.realm >= 4 ? '마기 -10 · 내공 소모 없음' : '초절정 이상', off: S.realm < 4 ? '내공이 모자란다' : null, f: function () { S.mad = Math.max(0, S.mad - 10); done('손바닥의 열기로 눈길을 녹이며 걸었다. 뒤따르는 발자국이 하나씩 늘었다. 사람을 살리는 데 쓰는 내공은 이상하게 줄지 않았다.', 'qi'); } },
    { t: '내 몸도 위태롭다. 지나친다', h: '마기 +6', f: function () { S.mad = clamp(S.mad + 6, 0, 100); done('불빛을 등지고 걸었다. 다음 날 그 고개에서 언 시체가 나왔다는 말을 들었다. 듣지 않은 척했다.', 'fail'); } }], 'loc_border');
} });

LIFE.push({ id: 'b_l_crystal', from: 35, to: 50, w: 2, cd: 20, cond: function () { return S.month >= 228; }, run: function () {
  var c = price(220 + S.realm * 30), q = qiPct(.045), seller = pick(['얼굴을 가린 서역인', '파사교의 불꽃 목걸이를 건 소년', '눈이 붉은 떠돌이 약장수']);
  scene('뒷골목의 수정', ps(seller + '이(가) 소매를 끌었다. 손바닥 위에 붉은 수정 한 알. “혈정이오. 요즘 고수들은 다 이걸 먹소.”', (S.flags.b_ate ? '혀끝이 먼저 기억했다. 단전이 저절로 달아올랐다.' : '수정 속에서 무언가가 천천히 돌았다.') + (hasMem('b_hyeoljeong') ? ' 기억이 경고했다. 세 알째부터 사람이 바뀐다.' : '')), [
    { t: '사서 삼킨다', h: '은전 -' + c + ' · 내공 +' + q + ' · 마기 크게 상승', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; var g = b_eat(.045); done('수정이 녹았다. 내공이 <b>' + g + '</b> 늘었다. 그날 밤 거울 속 눈동자가 조금 붉었다.' + (S.flags.b_ate >= 3 ? ' 이제는 그 붉은빛이 낯설지 않았다.' : ''), 'qi'); } },
    { t: '상인을 붙잡아 출처를 캔다', h: '전투 · 이기면 은전과 단서', f: function () { fight('b_frostscout', et() * .8, { auto: true, spar: true, title: '뒷골목', win: function () { S.silver += price(80); if (Math.random() < .5) learnMem('b_ninedots'); done('호위로 붙은 자를 쓰러뜨렸다. 상인은 도망쳤고, 떨어뜨린 은함이 남았다. 바닥에 아홉 개의 점이 찍혀 있었다.', 'fight'); }, lose: function () { b_rest(.4); done('골목 끝에서 칼이 날아왔다. 정신을 차리니 상인도 수정도 없었다.', 'fail'); } }); } },
    { t: '고개를 젓는다', h: '마기 -5', f: function () { S.mad = Math.max(0, S.mad - 5); done('지나쳤다. 등 뒤에서 상인이 다른 사람을 부르는 소리가 났다.', 'event'); } }], 'night');
} });

LIFE.push({ id: 'b_l_frostbite', from: 35, to: 44, w: 2, cd: 36, run: function () {
  var c = price(70);
  scene('동상', ps('새벽 순찰에서 돌아오니 왼발 발가락 두 개가 검었다. 감각이 없었다.', W('약당의 젊은 의원이', '맹의 의원이', '마을 의원이') + ' 고개를 저었다. “잘라야 할 수도 있소. 아니면 비싼 약을 쓰든가.”'), [
    { t: '비싼 약을 쓴다', h: '은전 -' + c + ' · 체력 회복', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.hp = maxHp(); done('곰 기름과 약초로 한 달을 감쌌다. 발가락은 살아났다. 걸음이 조금 달라졌을 뿐이다.', 'rest'); } },
    { t: '내공으로 피를 돌린다', h: '체력 -20% · 내공 +' + qiPct(.015), f: function () { hurt(.2); S.qi += qiPct(.015); done('밤새 발끝으로 진기를 밀어 넣었다. 검은 살이 서서히 붉어졌다. 아픈 것은 살아 있다는 뜻이었다.', 'qi'); } },
    { t: '약초로 직접 고친다', h: '약초 3 필요 · 체력 회복', off: mat('herb') < 3 ? '약초가 모자란다' : null, f: function () { S.mat.herb -= 3; S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .5)); done('스스로 약을 찧었다. 쓴 냄새가 방에 배었다. 젊을 때 어깨너머로 배운 것이 이렇게 쓰였다.', 'rest'); } }]);
} });

LIFE.push({ id: 'b_l_rumor', from: 35, to: 42, w: 3, cd: 18, run: function () {
  var r = pick([
    '빙궁의 군사들은 밥 대신 얼음을 씹는다는 소문이 돌았다. 누군가는 그들이 피를 마신다고 했다.',
    '북쪽 성벽 아래에서 언 채로 발견된 시체의 품에 붉은 수정이 있었다는 이야기가 돌았다.',
    W('장로회가 북벌군을 보내느냐 마느냐로 사흘째 다툰다는 말이 들렸다.', '맹의 세가들이 북벌 비용을 누가 대느냐로 다툰다는 말이 들렸다.', '북쪽 마을들이 통째로 남쪽으로 내려오고 있다는 말이 들렸다. 객잔 방값이 두 배가 되었다.'),
    '빙궁주가 아직 서른도 안 된 여자라는 이야기가 돌았다. 웃는 사람도, 웃지 않는 사람도 있었다.',
    '올겨울 강이 바닥까지 얼었다. 노인들은 평생 처음 본다고 했다.']);
  scene('겨울의 소문', '<p>' + r + '</p>', [
    { t: '소문을 따라가 본다', h: '은전 +' + price(50) + ' 또는 헛걸음', f: function () { if (Math.random() < .55) { S.silver += price(50); done('소문 끝에서 작은 일감 하나를 얻었다. 은전 <b>' + price(50) + '</b>냥.', 'item'); } else { hurt(.08); done('헛걸음이었다. 눈길에 미끄러져 무릎만 깼다.', 'fail'); } } },
    { t: '흘려듣고 수련한다', h: '내공 +' + qiPct(.012), f: function () { S.qi += qiPct(.012); done('소문은 바람이고 수련은 땅이다. 오늘도 땅을 밟았다.', 'qi'); } }]);
} });

LIFE.push({ id: 'b_l_wolves', from: 35, to: 46, w: 2, cd: 24, run: function () {
  scene('굶주린 늑대 떼', ps('겨울이 길어지자 늑대들이 마을까지 내려왔다. 밤마다 울타리 너머에서 눈이 반짝였다.', '아이 하나가 물려 갔다는 말이 들렸다.'), [
    { t: '늑대 떼를 친다', h: '전투 · 짐승 가죽과 뼈', c: 'primary', f: function () { fight('wolf', et() * .9 + .6, { auto: true, spar: true, title: '눈 위의 늑대 떼', win: function () { addMat('hide', rnd(2, 4)); addMat('bone', rnd(1, 2)); done('우두머리의 목을 베자 나머지가 흩어졌다. 가죽과 뼈를 챙겼다. 마을 사람들이 국 한 그릇씩을 가져왔다.', 'fight'); }, lose: function () { b_rest(.4); done('늑대는 생각보다 영리했다. 팔뚝에 이빨 자국을 남기고 물러났다.', 'fail'); } }); } },
    { t: '덫을 놓는 법을 가르친다', h: '마기 -6 · 짐승 가죽 1', f: function () { S.mad = Math.max(0, S.mad - 6); addMat('hide', 1); done('마을 사내들에게 덫 놓는 법을 가르쳤다. 사흘 뒤 덫에 늑대 한 마리가 걸렸다. 가죽 한 장이 당신 몫으로 왔다.', 'people'); } }], 'loc_forest');
} });

LIFE.push({ id: 'b_l_orphan', from: 35, to: 50, w: 2, cd: 48, cond: function () { return (S.disc || []).length < 8; }, run: function () {
  var c = price(60), war = S.month <= 312;
  scene(war ? '전쟁고아' : '거리의 아이', ps(war ? '피난민 행렬 끝에 아이 하나가 혼자 걷고 있었다. 맨발이었다. 신발 대신 누군가의 칼집을 끌고 있었다.' : '관아 앞 거리에서 아이 하나가 금의위 졸개의 주머니를 털다 붙잡혔다. 손이 빨랐다. 눈은 더 빨랐다.', '아이가 당신을 올려다보았다. 처음 매화 지던 봄, 당신도 저런 눈이었을 것이다.'), [
    { t: '제자로 거둔다', h: '은전 -' + c + ' · 제자 +1', c: 'primary', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; var n = b_disc(); done(n ? '아이에게 밥을 먹이고 이름을 물었다. 이름이 없다고 했다. <b>' + esc(n) + '</b>. 당신이 지어 준 이름이다.' : '아이를 맡길 곳을 찾아 주었다.', 'people'); } },
    { t: '은전 몇 푼을 쥐여 준다', h: '은전 -' + price(15) + ' · 마기 -5', off: S.silver < price(15) ? '은전이 모자란다' : null, f: function () { S.silver -= price(15); S.mad = Math.max(0, S.mad - 5); done('아이는 은전을 받고 고개를 숙였다. 다시 돌아보지 않고 사라졌다. 그게 강호에서 사는 법이다.', 'people'); } },
    { t: '지나친다', h: '아무 일 없다', f: function () { done('지나쳤다. 그 눈빛은 며칠 동안 꿈에 나왔다.', 'event'); } }], 'loc_village');
} });

LIFE.push({ id: 'b_l_fur', from: 35, to: 44, w: 2, cd: 30, cond: function () { return S.month <= 330; }, run: function () {
  var c = price(200), g = price(420);
  scene('모피 한 수레', ps('전쟁 통에 북해 모피값이 세 배로 뛰었다. 국경 너머에서 빼돌린 모피 한 수레를 넘기겠다는 장사꾼이 찾아왔다.', '“남쪽 성에 닿기만 하면 곱절이오. 길이 험해서 그렇지.”'), [
    { t: '사서 직접 남쪽으로 나른다', h: '은전 -' + c + ' · 성공하면 +' + g + ' · 도적이 나올 수 있다', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; if (Math.random() < .5) fight('bandit', et() * .9 + .4, { auto: true, spar: true, title: '모피 수레', win: function () { S.silver += g; done('고갯길의 도적을 쫓아내고 성에 닿았다. 모피는 하루 만에 팔렸다. 은전 <b>' + g + '</b>냥.', 'item'); }, lose: function () { b_rest(.35); done('도적에게 수레를 빼앗겼다. 장사는 칼보다 어렵다.', 'fail'); } }); else { S.silver += g; done('무사히 성에 닿았다. 모피는 하루 만에 팔렸다. 은전 <b>' + g + '</b>냥.', 'item'); } } },
    { t: '가죽만 조금 받는다', h: '은전 -' + price(40) + ' · 짐승 가죽 3', off: S.silver < price(40) ? '은전이 모자란다' : null, f: function () { S.silver -= price(40); addMat('hide', 3); done('질 좋은 가죽 세 장만 샀다. 욕심을 덜 내면 잠이 편하다.', 'item'); } },
    { t: '밀수품이다. 돌려보낸다', h: '아무 일 없다', f: function () { done('장사꾼은 혀를 차며 다른 문을 두드리러 갔다.', 'event'); } }]);
} });

LIFE.push({ id: 'b_l_ice', from: 35, to: 50, w: 2, cd: 36, run: function () {
  var q = qiPct(.035);
  scene('얼음 깨지는 소리', ps(pick(['한밤중 강에서 얼음 깨지는 소리가 났다. 길고 낮은 소리였다.', '처마 끝 고드름이 떨어져 산산이 부서졌다. 소리가 늦게 왔다.', '언 호수 한가운데 섰다. 발밑에서 얼음이 울었다.']), '그 소리 속에 무언가가 있었다. 단단한 것이 무너지는 순간, 가장 큰 힘이 난다.'), [
    { t: '그 자리에 앉아 운기한다', h: '내공 +' + q, c: 'primary', f: function () { S.qi += q; done('밤새 얼음 위에 앉아 있었다. 막혀 있던 혈 하나가 깨지는 소리를 들었다. 내공이 <b>' + q + '</b> 늘었다.', 'qi'); } },
    { t: '초식에 담아 본다', h: '무공 성취 상승', f: function () { var t = upSkill(1); done(t ? '<b>' + t + '</b>의 한 수가 달라졌다. 무너지듯 들어가는 칼이었다.' : '칼을 휘둘러 보았다. 아직은 잡히지 않았다.', 'skill'); } }], 'insight');
} });

/* ---- 새 인물: E4 ---- */
addNpc('b_jinmu', { n: '진무', role: '금의위 총지휘사', desc: '법 밖의 칼을 미워하는 조정의 칼.', world: ['ma', 'jeong', 'wander'], flag: 'b_jinmu_met', dead: 'b_jinmuDead' },
  function () {
    var q = qiPct(.03);
    scene('금의위 별관', npcHead('b_jinmu') + '<p>진무는 서류 더미 사이에서 고개를 들었다. 붉은 비단옷 소매에 먹물이 묻어 있었다. “' + pick(['또 왔소. 차는 식었소만.', '오늘 명단에서 이름 셋을 지웠소. 당신 덕은 아니오.', '무인들은 왜 늘 밤에 찾아오오?']) + '”</p>', [
      { t: '차를 나누며 이야기한다', h: '마기 -12 · 조정의 사정', f: function () { S.mad = Math.max(0, S.mad - 12); gain('b_jinmu', 1, '<p>' + pick(['진무는 고향 이야기를 했다. 아홉 살 때 무인 둘이 싸우다 마을을 태웠다고. 두 사람 다 이름난 협객이었다고.', '진무는 황제 이야기를 하지 않았다. 대신 저잣거리의 쌀값 이야기를 했다. 그것이 그의 법이었다.', '진무는 붓을 내려놓고 오래 창밖을 보았다. “칼보다 붓이 더 많이 죽이오. 나는 둘 다 쥐고 있지.”']) + '</p>'); } },
      { t: '수춘도와 겨뤄 본다', h: '대련 · 이기면 내공 +' + q, f: function () { fight('b_jinmu', et() * .85, { auto: true, spar: true, title: '진무와의 대련', win: function () { S.qi += qiPct(.03); gain('b_jinmu', 1, '<p>진무는 칼을 거두며 웃지 않았다. “이러니 무인을 그냥 둘 수가 없는 거요.” 칭찬이었다.</p>'); }, lose: function () { b_rest(.35); gain('b_jinmu', 1, '<p>수춘도는 군더더기가 없었다. 진무가 손을 내밀었다. “법도 칼도, 짧은 게 이기오.”</p>'); } }); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { S.flags.b_pass = 1; result('금의위 통행패', npcHead('b_jinmu') + '<p>진무가 구리 패 하나를 탁자 위에 밀었다. “검문에서 보이시오. 쓸 일이 없기를 바라오만.”</p><p><b>금의위 통행패</b>를 얻었다.</p>', d); } },
   { t: 3, run: function (d) { learnMem('b_dongchang'); S.flags.b_jinmuWarn = 1; result('붓의 이름', npcHead('b_jinmu') + '<p>“동창의 조환이 내 이름을 쓰고 있소. 역모라는 두 글자 옆에.” 진무는 담담했다. “붓으로 쓴 죄는 칼보다 먼저 사람을 죽이지. 내가 쓰러지면 당신 이름이 다음이오.”</p>', d); } }]);

addNpc('b_okseon', { n: '옥선', role: '찻집 주인 · 동창 밀정', desc: '두 주인을 섬기는 찻집 여인.', world: ['ma', 'jeong', 'wander'], flag: 'b_ok_met', dead: 'b_okDead' },
  function () {
    var g = price(110);
    scene('옥선의 찻집', npcHead('b_okseon') + '<p>찻집은 늘 반쯤 비어 있다. 옥선은 찻잔을 닦으며 고개도 들지 않았다. “' + pick(['오늘 동창에 올린 보고는 세 줄이에요. 다 거짓이죠.', '이번 달 검문은 동문 쪽이에요. 돌아서 가세요.', '저도 늙나 봐요. 거짓말이 힘들어요.']) + '”</p>', [
      { t: '동창의 움직임을 듣는다', h: '은전 +' + g + ' (단속을 피한 몫)', f: function () { S.silver += g; gain('b_okseon', 1, '<p>옥선이 알려 준 대로 장부와 물건을 옮겼다. 다음 날 그 창고에 동창 번자들이 들이닥쳤다. 빈 창고였다.</p>'); } },
      { t: '그녀를 지켜 준다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); gain('b_okseon', 1, '<p>찻집 앞을 서성이던 번자 둘을 말없이 쳐다보았다. 그들은 자리를 떴다. 옥선이 처음으로 찻값을 받지 않았다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { learnMem('b_spy'); S.flags.b_okInfo = 1; result('동창의 장부', npcHead('b_okseon') + '<p>옥선이 얇은 책 한 권을 내밀었다. 동창이 누구에게 무엇을 받고 무엇을 썼는지. “이걸 들고 있으면 저는 죽어요. 그러니 당신이 들고 있어요.”</p>', d); } }]);

/* ================= E4 황실의 그물 (313~408) ================= */

EVENTS.push({ m: 314, id: 'b_i_edict', run: function () {
  var c = price(100), c2 = price(150), q = qiPct(.02);
  var body = ps('봄비 속에 관아의 북이 울렸다. 성문마다 같은 방이 붙었다. 「무림소탕령」.',
    '무인은 모두 관에 이름을 올리고 호패를 찬다. 문파는 관의 허가를 받는다. 허가 없는 칼은 역도의 칼이다. 어기는 자는 금의위가 다스린다.',
    W('천마신교의 이름은 방 맨 아래 따로 적혀 있었다. 「사교(邪敎)는 해산한다.」', '무림맹은 협조를 요구받았다. 조정은 맹을 쓸 생각이었다. 쓰고 버릴 생각인지는 아무도 몰랐다.', '떠돌이 무인에게는 호패를 받을 곳도, 숨을 곳도 없었다.') + ' 마흔셋의 봄이었다.' + (hasMem('b_edict') ? ' 기억대로였다. 이번에는 그물이 어디로 오는지 안다.' : ''));
  var ch = [
    { t: '칙서를 끝까지 읽는다', h: '내공 +' + q + ' · 조정의 셈을 안다', c: 'primary', f: function () { S.qi += q; learnMem('b_edict'); done('칙서의 끝에 서명이 있었다. 금의위 총지휘사 진무. 글씨가 단정했다. 단정한 글씨로 쓴 칼이었다.', 'event'); } },
    { t: '비급과 칼을 숨긴다', h: '은전 -' + c + ' · 뒤의 검문이 쉬워진다', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.flags.b_hid = 1; done('비급은 기름종이에 싸서 우물 벽에, 칼은 관 속에 넣어 묻었다. 장례를 치르듯 했다.', 'item'); } }];
  if (hasMem('b_edict')) ch.push({ t: '지난 생의 기억대로 미리 관에 줄을 댄다', h: '은전 -' + c2 + ' · 통행패', off: S.silver < c2 ? '은전이 모자란다' : null, f: function () { S.silver -= c2; S.flags.b_pass = 1; done('방이 붙기 전에 이미 아전 하나를 사 두었다. 이름 없는 통행패 하나가 품에 들어왔다.', 'item'); } });
  scene('무림소탕령', body, ch, 'court');
} });

EVENTS.push({ m: 322, id: 'b_i_jinmu', run: function () {
  var q = qiPct(.04);
  var body = ps('붉은 비단옷의 기병 서른이 ' + W('혈월봉 산문 앞에', '맹의 정문 앞에', '당신이 묵는 객잔 앞에') + ' 섰다. 앞장선 사내가 말에서 내렸다. 마흔 남짓, 왼쪽 눈썹에 오래된 칼자국. 허리에 수춘도.',
    '“금의위 총지휘사 진무요.” 그는 당신의 손을 먼저 보았다. 칼을 쥐는 손이었다.',
    '“나는 무인을 미워하지 않소. 무인이 법 밖에 있는 것을 미워할 뿐이오. 아홉 살 때 협객 둘이 내 마을에서 겨뤘소. 둘 다 이름난 사람들이었지. 마을은 남지 않았소.”');
  scene('수춘도', body, [
    { t: '예를 갖춰 마주 앉는다', h: '진무를 알게 된다 · 조정과 말이 통한다', c: 'primary', f: function () { meet('b_jinmu'); S.flags.b_jinmu_met = 1; S.trust.b_jinmu = 1; learnMem('b_edict'); done('차 한 잔을 사이에 두고 오래 앉아 있었다. 진무는 협박하지 않았다. 숫자만 말했다. 금의위 삼천, 동창 번자 수백, 그리고 굶는 백성 몇만. 그의 셈은 틀리지 않았다.', 'people'); } },
    { t: '칼로 그의 법을 시험한다', h: '대련 · 이기면 내공 +' + q + ' · 그의 존중', f: function () { fight('b_jinmu', et() * .9, { auto: true, spar: true, title: '총지휘사의 칼', win: function () { S.qi += qiPct(.04); meet('b_jinmu'); S.flags.b_jinmu_met = 1; S.trust.b_jinmu = 1; done('칼끝이 그의 목 앞에서 멈췄다. 진무는 눈을 감지 않았다. “그러니 법이 필요한 거요. 당신 같은 사람이 마음을 바꾸지 않도록.”', 'fight'); }, lose: function () { b_rest(.3); S.flags.b_jinmuCold = 1; done('수춘도가 정확히 한 번 움직였다. 소매가 갈라졌다. “다음에는 소매가 아닐 거요.” 진무는 말에 올랐다.', 'fail'); } }); } },
    { t: '문을 닫고 돌려보낸다', h: '조정과 사이가 틀어진다 · 마기 -5', f: function () { S.flags.b_jinmuCold = 1; S.mad = Math.max(0, S.mad - 5); done('문을 닫았다. 문 너머에서 진무가 말했다. “문은 오래 못 버티오.” 말발굽 소리가 멀어졌다.', 'event'); } }], 'court');
} });

EVENTS.push({ m: 330, id: 'b_i_spy', run: function () {
  var know = hasMem('b_spy');
  var body = ps('편지 한 통이 이상했다. 봉인이 두 번 녹은 자국이 있었다.',
    know ? '기억이 먼저 이름을 알려 주었다. 옥선. 반년 전부터 드나든 찻집의 주인. 동창의 밀정이다.' : '사흘을 뒤밟은 끝에 찾았다. 옥선. 반년 전부터 드나든 찻집의 주인. 그녀의 부엌 아궁이에서 당신의 편지를 베낀 종이가 반쯤 타고 있었다.',
    '옥선은 도망치지 않았다. 찻잔을 내려놓고 말했다. “동창은 제 동생을 데리고 있어요. 하실 일을 하세요.”');
  var ch = [
    { t: '이중 밀정으로 쓴다', h: '옥선을 알게 된다 · 동창의 움직임을 안다', c: 'primary', f: function () { S.flags.b_spy = 'turn'; meet('b_okseon'); S.flags.b_ok_met = 1; S.trust.b_okseon = 1; learnMem('b_spy'); done('“동창에는 계속 보고하시오. 다만 내가 불러 주는 대로.” 옥선이 오래 당신을 보다가 고개를 끄덕였다. 거짓말 한 줄이 그녀와 동생을 살렸다.', 'people'); } },
    { t: '조용히 처리한다', h: '마기 +12 · 동창이 눈치챈다', f: function () { S.flags.b_spy = 'kill'; S.flags.b_okDead = 1; S.mad = clamp(S.mad + 12, 0, 100); learnMem('b_spy'); done('찻집은 그날 밤 문을 닫았다. 다시 열리지 않았다. 동창은 밀정 하나를 잃었고, 당신의 이름에 붉은 점을 하나 찍었다.', 'fight'); } },
    { t: '거짓 정보를 흘리며 모른 척한다', h: '은전 +' + price(180) + ' · 동창을 속인다', f: function () { S.flags.b_spy = 'feed'; S.silver += price(180); learnMem('b_spy'); done('일부러 엉뚱한 창고 이름을 편지에 적었다. 동창 번자들이 그 창고를 뒤지는 사이 진짜 물건을 팔았다. 은전 <b>' + price(180) + '</b>냥.', 'item'); } }];
  if (S.flags.b_jinmu_met) ch.push({ t: '진무에게 넘긴다', h: '진무의 신뢰 +1 · 옥선은 끌려간다', f: function () { S.flags.b_spy = 'hand'; S.trust.b_jinmu = tr('b_jinmu') + 1; done('진무는 옥선을 보고 한숨을 쉬었다. “동창의 사람이군. 금의위 옥에 두는 편이 그녀에게도 낫소.” 옥선은 끌려가며 한 번도 돌아보지 않았다.', 'people'); } });
  scene('찻집의 귀', body, ch, 'night');
} });

EVENTS.push({ m: 340, id: 'b_i_choice', run: function () {
  var g1 = price(400), g3 = price(800), q = qiPct(.05);
  var body = ps('소탕령 세 해째. 그물이 조여 왔다. ' + W('혈월봉 아래 마을에 금의위의 진이 섰다. 교도 열둘이 저잣거리에서 목이 걸렸다.', '맹의 세가 둘이 역모로 몰려 문을 닫았다. 맹주의 자리가 조정의 허락을 기다리게 되었다.', '아는 떠돌이 무인 셋이 차례로 사라졌다. 한 명은 관아 앞에 걸렸다.'),
    (S.flags.b_jinmu_met ? '진무가 서신을 보냈다. 짧았다.' : '금의위의 사자가 칙서를 가져왔다.') + ' 「고개를 숙이면 살리고, 칼을 들면 벤다. 이름을 넘기면 상을 준다.」',
    '셋 중 하나를 고르는 데 평생이 걸린 것 같았다.');
  scene('그물', body, [
    { t: W('교를 조정 아래 둔다 (굴복)', '맹을 조정의 무림사로 바친다 (굴복)', '호패를 찬다 (굴복)'), h: '은전 +' + g1 + ' · 통행패 · 옛 동료의 눈총', f: function () { S.flags.b_imp = 'yield'; S.flags.b_pass = 1; S.silver += g1; S.mad = clamp(S.mad + 6, 0, 100);
      done(W('천마신교의 산문에 조정의 현판이 걸렸다. 「호국무원(護國武院)」. 장로 둘이 그날 밤 산을 떠났다.', '무림맹은 무림사가 되었다. 맹주의 인장 옆에 관인이 찍혔다. 세가의 노인들은 당신을 보면 고개를 돌렸다.', '호패를 찼다. 관아 포쾌들이 당신을 “선생”이라 불렀다. 떠돌이 친구들은 당신을 다른 이름으로 불렀다.') + ' 녹봉으로 은전 <b>' + g1 + '</b>냥이 나왔다.', 'event'); } },
    { t: W('혈월봉의 산문을 닫는다 (저항)', '맹의 깃발을 지킨다 (저항)', '숲으로 들어가 칼을 든다 (저항)'), h: '내공 +' + q + ' · 조정의 적이 된다', c: 'primary', f: function () { S.flags.b_imp = 'resist'; S.qi += q; S.mad = Math.max(0, S.mad - 8); if (!S.flags.b_jinmuFriend) S.flags.b_jinmu_met = 0;
      done(W('산문을 닫았다. 교도들이 처음으로 천마가 아니라 당신의 이름을 외쳤다.', '맹의 깃발을 내리지 않았다. 세가들이 하나둘 당신 뒤에 섰다. 역도의 이름과 함께.', '숲으로 들어갔다. 관에 쫓기는 무인들이 하나둘 모여들었다. 백성들은 그들을 의적이라 불렀다.') + ' 이제 금의위가 올 것이다.', 'event'); } },
    { t: W('교의 이름을 조정에 판다 (배신)', '동료 문파의 이름을 넘긴다 (배신)', '무인의 목을 관에 판다 (배신)'), h: '은전 +' + g3 + ' · 마기 +15 · 옛 인연의 신뢰 하락', f: function () { S.flags.b_imp = 'betray'; S.flags.b_pass = 1; S.silver += g3; S.mad = clamp(S.mad + 15, 0, 100);
      ['dg', 'hr', 'yn', 'sm', 'bw', 'mk'].forEach(function (k) { if (S.trust[k]) S.trust[k] = Math.max(0, S.trust[k] - 1); });
      done(W('장로회의 명단을 넘겼다. 사흘 뒤 혈월봉의 장로 넷이 금의위 옥에 갇혔다. 당신의 이름은 명단에 없었다.', '역모의 증좌라며 세가 둘의 장부를 넘겼다. 맹은 당신을 의심했지만 증명하지 못했다.', '현상금 방 앞에 섰다. 아는 얼굴이 셋 있었다. 한 달 만에 둘이 관에 넘겨졌다.') + ' 상금 은전 <b>' + g3 + '</b>냥. 잠은 오지 않았다.', 'item'); } }], 'throne');
} });

function b_dgLast(t) {
  var had = !!S.skills.pacheon; learn('pacheon'); var u = had ? upSkill(2) : '';
  S.qi += qiPct(.06); S.flags.dgDead = 1; S.flags.b_mokdo = 1; S.hpBonus = (S.hpBonus || 0) + 8; ach('b_mokdo');
  pages('외팔의 마지막 가르침', [ps(t, '“칼은 팔로 휘두르는 게 아니다. 나는 팔 하나를 잃고 그걸 알았다. 너는 팔 둘을 다 가지고 알아라.” 독고강이 남은 팔로 허공을 내리그었다. 바람이 산을 넘어갔다.', '그날 밤 그는 목도를 무릎 위에 올린 채 숨을 거두었다. 목도는 손때로 검었다.')], 'night', function () {
    done('독고강이 죽었다. ' + (had ? (u ? '<b>' + u + '</b>의 성취가 깊어졌다.' : '파천일격이 손에 익었다.') : '<b>파천일격</b>을 얻었다.') + ' 낡은 목도를 유품으로 받았다. 최대 체력 <b>+8</b>.', 'skill');
  });
}
EVENTS.push({ m: 350, id: 'b_i_dg', cond: function () { return alive('dg'); }, run: function () {
  var k = b_imp(), c = price(200);
  if (k === 'resist') {
    pages('퇴로', [ps('금의위의 첫 토벌대가 왔다. 퇴로를 막는 자가 필요했다.', '독고강이 목도를 쥐고 앞에 섰다. 일흔을 넘긴 외팔이 노인이었다. “늙은이가 먼저 죽는 게 순서다. 네가 할 일은 뒤에서 내 등을 보는 거다.”')], 'siege', function () {
      fight('b_jinyi', et() * .95, { auto: true, spar: true, title: '독고강과 함께', win: function () { b_dgLast('천호의 수춘도가 당신의 칼에 꺾였다. 돌아보니 독고강이 길목에 앉아 있었다. 옆구리가 붉었다. 그래도 길은 지켰다.'); }, lose: function () { b_rest(.3); b_dgLast('당신이 쓰러진 사이 독고강이 홀로 길목을 지켰다. 깨어 보니 그는 길목에 앉아 있었다. 옆구리가 붉었다.'); } });
    });
  } else if (k === 'betray') {
    scene('목도의 방문', ps('비 오는 밤, 문 앞에 외팔이 노인이 서 있었다. 독고강이었다. 목도를 쥐고 있었다.', '“네가 넘긴 명단 말이다. 내 이름도 있더군. 금의위가 늙은이는 봐줬지만.” 그는 웃지 않았다. “칼을 뽑아라. 가르칠 게 하나 남았다.”'), [
      { t: '칼을 뽑는다', h: '대련 · 승패와 관계없이 마지막 가르침', c: 'primary', f: function () { fight('dg', et() + .4, { auto: true, spar: true, title: '독고강', win: function () { b_dgLast('목도가 부러졌다. 독고강은 부러진 목도를 내려다보며 오래 서 있었다. “칼은 배신하지 않는다. 사람이 하지.”'); }, lose: function () { b_rest(.35); b_dgLast('목도가 당신의 이마 앞에서 멈췄다. “아직 멀었다.” 독고강이 처음으로 웃었다.'); } }); } },
      { t: '무릎을 꿇는다', h: '마기 -15 · 마지막 가르침', f: function () { S.mad = Math.max(0, S.mad - 15); b_dgLast('당신은 칼을 뽑지 않고 무릎을 꿇었다. 독고강은 목도로 당신의 어깨를 한 번 쳤다. 아팠다. 그것으로 끝이었다.'); } }], 'night');
  } else {
    scene('옥에 갇힌 노인', ps(k === 'yield' ? '금의위가 무기 압수를 하던 날, 독고강이 목도를 내놓지 않았다. 그는 관아 옥에 갇혔다.' : '독고강이 앓아누웠다는 소식이 왔다. 기침에 피가 섞인다고 했다.', k === 'yield' ? '“나무 칼이오.” 그가 말했다고 한다. “이것도 빼앗으면 내 팔도 빼앗아 가시오.”' : '찾아가니 그는 목도를 머리맡에 두고 누워 있었다. “올 줄 알았다. 앉아라.”'), [
      { t: k === 'yield' ? '보석금을 내고 빼낸다' : '곁을 지킨다', h: k === 'yield' ? '은전 -' + c + ' · 마지막 가르침' : '마지막 가르침', c: 'primary', off: k === 'yield' && S.silver < c ? '은전이 모자란다' : null, f: function () { if (k === 'yield') S.silver -= c; b_dgLast(k === 'yield' ? '옥에서 나온 독고강은 사흘을 앓았다. 나흘째 그는 당신을 마당으로 불렀다.' : '그는 일어나 앉더니 당신을 마당으로 불렀다.'); } },
      { t: k === 'yield' ? (S.flags.b_jinmu_met ? '진무에게 부탁한다' : '관아에 줄을 대 본다') : '명의를 수소문한다', h: '은전 소모 없음 · 마지막 가르침', f: function () { if (S.flags.b_jinmu_met) S.trust.b_jinmu = tr('b_jinmu') + 1; b_dgLast(k === 'yield' ? (S.flags.b_jinmu_met ? '진무는 아무 말 없이 문서 한 장에 붓을 그었다. 독고강은 그날로 풀려났다. “나무 칼까지 뺏을 법은 없소.”' : '아전 셋을 거쳐 겨우 그를 꺼냈다.') : '명의는 고개를 저었다. 독고강은 그럴 줄 알았다는 듯 당신을 마당으로 불렀다.'); } }], 'night');
  }
} });

EVENTS.push({ m: 360, id: 'b_i_branch', run: function () {
  var k = b_imp(), q = qiPct(.05), sv = price(300);
  if (k === 'resist') {
    var body = ps('금의위 천호 하나가 토벌대 오백을 이끌고 왔다. 깃발에 붉은 비단이 감겨 있었다.', W('혈월봉의 산길', '맹의 성벽', '숲의 오솔길') + '마다 화살이 박혔다. 사흘째 밤, 천호가 직접 앞으로 나왔다.');
    scene('토벌대', body, [
      { t: '천호를 친다', h: '전투 · 이기면 내공 +' + q + ' · 은전 +' + sv + ' · 지면 큰 손실', c: 'primary', f: function () { fight('b_jinyi', et() + .3, { auto: true, spar: true, title: '금의위 천호', win: function () { S.qi += qiPct(.05); S.silver += price(300); S.flags.b_jinyiBeat = 1; done('천호의 수춘도가 부러졌다. 토벌대는 물러갔다. 군량 수레 열 대가 남았다. 백성들에게 반을 나눠 주고도 은전 <b>' + price(300) + '</b>냥이 남았다.', 'fight'); }, lose: function () { b_rest(.25); S.silver = Math.max(0, S.silver - price(300)); done('밀렸다. 창고가 불탔고 사람들이 흩어졌다. 은전 <b>' + price(300) + '</b>냥어치를 잃었다.', 'fail'); } }); } },
      { t: '길을 내주고 숨는다', h: '체력 -15% · 손실을 줄인다', f: function () { hurt(.15); S.silver = Math.max(0, S.silver - price(80)); done('싸우지 않고 깊이 숨었다. 토벌대는 빈 집만 태우고 돌아갔다. 지는 것도 싸움의 한 방법이다.', 'event'); } }], 'siege');
  } else if (k === 'betray') {
    var foe = W('elder', 'swordsman', 'chaser'), who = W('금의위 옥을 빠져나온 장로 하나', '문을 닫은 세가의 막내아들', '관에 넘긴 무인의 동생');
    scene('원한', ps('밤에 문이 부서졌다. ' + who + '이(가) 칼을 들고 서 있었다.', '“네가 판 이름 값을 받으러 왔다.” 그 눈은 당신이 처음 매화 지던 봄에 품었던 눈과 같았다.'), [
      { t: '맞선다', h: '전투 · 마기 +8', c: 'primary', f: function () { S.mad = clamp(S.mad + 8, 0, 100); fight(foe, et() + .2, { auto: true, spar: true, title: '원한의 칼', win: function () { S.silver += price(150); done('그는 쓰러지며 웃었다. “다음은 누가 올까.” 관아에서 포상금 은전 <b>' + price(150) + '</b>냥이 나왔다. 받는 손이 무거웠다.', 'fight'); }, lose: function () { b_rest(.3); done('칼이 옆구리를 지나갔다. 그는 당신을 죽이지 않았다. “살아서 기억해라.”', 'fail'); } }); } },
      { t: '칼을 내려놓고 사과한다', h: '마기 -12 · 체력 -25%', f: function () { S.mad = Math.max(0, S.mad - 12); hurt(.25); done('그의 칼이 당신의 어깨를 갈랐다. 피하지 않았다. 그는 울면서 떠났다. 그날 처음으로 잠이 왔다.', 'people'); } }], 'night');
  } else {
    var name = W('흑천맹의 옛 잔당 산채', '소림의 속가 무관', '당신과 술을 마시던 떠돌이 무사들의 은신처');
    scene('토벌 명령', ps('금의위에서 명령이 내려왔다. 호패를 받지 않은 무인을 잡아들이라는 것이다. 이번 대상은 ' + name + '.', '명단을 넘기다 손이 멈췄다. 아는 이름이 하나 있었다.'), [
      { t: '명령대로 친다', h: '전투 · 은전 +' + sv + ' · 마기 +12', f: function () { S.mad = clamp(S.mad + 12, 0, 100); fight('swordsman', et() + .2, { auto: true, spar: true, title: '토벌', win: function () { S.silver += price(300); done('명령을 수행했다. 은전 <b>' + price(300) + '</b>냥이 나왔다. 아는 이름은 끝내 찾지 못한 척했다.', 'fight'); }, lose: function () { b_rest(.35); done('상대가 더 독했다. 물러나 보고서에 “소탕 완료”라고 적었다.', 'fail'); } }); } },
      { t: '미리 귀띔해 도망치게 한다', h: S.flags.b_spy === 'turn' || S.flags.b_pass ? '들키지 않는다 · 마기 -10' : '들킬 수 있다 · 마기 -10', c: 'primary', f: function () { S.mad = Math.max(0, S.mad - 10); var safe = S.flags.b_spy === 'turn' || S.flags.b_pass || Math.random() < .5; if (safe) done('밤에 사람을 보냈다. 새벽에 들이닥친 곳은 비어 있었다. 보고서에는 “이미 달아남”이라고 적었다.', 'people'); else { S.silver = Math.max(0, S.silver - price(200)); hurt(.15); done('동창이 귀띔을 알아챘다. 벌금으로 은전 <b>' + price(200) + '</b>냥을 물고 곤장을 맞았다. 도망친 이들은 살았다.', 'fail'); } } }], 'court');
  }
} });

LIFE.push({ id: 'b_l_famine', from: 43, to: 50, w: 3, once: 'life', cond: function () { return S.month >= 318 && S.month <= 408; }, run: function () {
  var c = price(250), g = price(500), q = qiPct(.03);
  scene('끊긴 곡식길', ps('소탕령으로 표국들이 문을 닫았다. 표사 없는 곡식 수레는 길에서 사라졌다.', '그해 가을 남쪽 세 고을에 쌀이 닿지 않았다. ' + W('혈월봉 아래 마을', '맹 근처 성읍', '당신이 머무는 고을') + ' 쌀값이 다섯 배가 되었다. 아이들이 나무껍질을 씹었다.'), [
    { t: '직접 곡식 수레를 호송한다', h: '전투 · 마기 -12 · 내공 +' + q, c: 'primary', f: function () { fight('bandit', et() + .3, { auto: true, spar: true, title: '곡식 수레', win: function () { S.mad = Math.max(0, S.mad - 12); S.qi += qiPct(.03); done('굶은 산적들은 칼보다 배고픔이 무서웠다. 쌀 한 섬씩 쥐여 돌려보냈다. 수레가 고을에 닿자 사람들이 길에 나와 울었다.', 'people'); }, lose: function () { b_rest(.35); done('수레 셋 중 하나를 빼앗겼다. 둘은 닿았다. 그것으로 몇 집은 겨울을 났다.', 'fail'); } }); } },
    { t: '쌀을 사서 푼다', h: '은전 -' + c + ' · 마기 -15', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.mad = Math.max(0, S.mad - 15); done('곳간을 열었다. 은전 <b>' + c + '</b>냥어치의 쌀이 하루 만에 사라졌다. 사람들이 당신 이름을 기억했다.', 'people'); } },
    { t: '쌀을 사재기했다 비싸게 판다', h: '은전 +' + g + ' · 마기 +10', f: function () { S.silver += g; S.mad = clamp(S.mad + 10, 0, 100); done('곳간을 닫고 기다렸다. 은전 <b>' + g + '</b>냥이 남았다. 고을 사람들은 당신 집 앞을 지날 때 침을 뱉었다.', 'item'); } }], 'loc_village');
} });

EVENTS.push({ m: 374, id: 'b_i_east', run: function () {
  var know = hasMem('b_dongchang') || S.flags.b_okInfo || S.flags.b_jinmuWarn, sv = price(500), q = qiPct(.04);
  var body = ps('동창 제독 조환이 금의위를 쳤다. 칼이 아니라 붓으로. 「총지휘사 진무, 무림과 내통하여 역모를 꾀함.」',
    '증좌로 올라간 문서에 ' + (S.flags.b_jinmu_met || S.flags.b_jinmuFriend ? '당신과 진무가 주고받은 서신이 있었다. 한 글자도 진짜가 아니었다.' : '당신의 이름도 있었다. 만난 적도 없는 사이로 엮여 있었다.'),
    (know ? '당신은 이 붓의 움직임을 알고 있었다. ' + (S.flags.b_okInfo ? '옥선이 건넨 동창의 장부가 품 안에 있었다.' : '기억이 말한다. 조환의 붓이 먼저 진무를 죽인다.') : '') + ' 그날 밤 진무가 혼자 찾아왔다. 비단옷 대신 낡은 무명옷이었다. “부탁할 처지가 아니오. 그래도 부탁하오.”');
  var ch = [
    { t: '진무를 돕는다', h: '전투 · 진무의 동지가 된다 · 내공 +' + q, c: 'primary', f: function () { fight('b_dongchang', et() + .2, { auto: true, spar: true, hpMul: 1.4, title: '동창의 번자들', win: function () { S.qi += qiPct(.04); S.flags.b_jinmuFriend = 1; meet('b_jinmu'); S.flags.b_jinmu_met = 1; S.trust.b_jinmu = tr('b_jinmu') + 1; done('진무를 쫓던 번자들을 골목에서 쓰러뜨렸다. 진무는 피 묻은 소매로 얼굴을 닦았다. “법 밖의 칼에 목숨을 빚졌군. 우습소.”', 'fight'); }, lose: function () { b_rest(.3); S.flags.b_jinmuFriend = 1; S.flags.b_jinmu_met = 1; done('번자들에게 밀렸다. 진무와 함께 하수구로 빠져나왔다. 둘 다 진흙투성이였다. 진무가 처음으로 웃었다.', 'fail'); } }); } },
    { t: '동창에 그를 넘긴다', h: '은전 +' + sv + ' · 마기 +12', f: function () { S.silver += sv; S.mad = clamp(S.mad + 12, 0, 100); S.flags.b_jinmuFall = 1; done('진무가 등을 돌린 사이 문밖에 신호를 보냈다. 그는 붙잡히면서도 칼을 뽑지 않았다. “셈이 맞는군.” 동창이 은전 <b>' + sv + '</b>냥을 보냈다.', 'item'); } },
    { t: '문을 열어 주지 않는다', h: '아무 일 없다 · 진무는 홀로 남는다', f: function () { S.flags.b_jinmuFall = 1; done('문 너머에서 발소리가 오래 머물다 사라졌다. 사흘 뒤 진무가 붙잡혔다는 방이 붙었다.', 'event'); } }];
  if (know && S.flags.b_okInfo) ch.splice(1, 0, { t: '동창의 장부를 조정에 올린다', h: '조환이 무너진다 · 진무의 동지가 된다', f: function () { S.flags.b_jinmuFriend = 1; S.flags.b_johwanFall = 1; meet('b_jinmu'); S.flags.b_jinmu_met = 1; S.trust.b_jinmu = tr('b_jinmu') + 2; S.qi += qiPct(.03); done('옥선의 장부가 어사의 손을 거쳐 황제의 책상에 올랐다. 붓은 붓으로 꺾였다. 조환이 하옥되던 날, 진무는 금의위 별관에서 혼자 술을 마셨다.', 'event'); } });
  scene('동창의 붓', body, ch, 'court');
} });

EVENTS.push({ m: 388, id: 'b_i_reckon', run: function () {
  var k = b_imp(), q = qiPct(.09), sv = price(600);
  if (S.flags.b_jinmuFriend && !S.flags.b_jinmuDead) {
    var body = ps(S.flags.b_johwanFall ? '조환은 무너졌지만 동창은 남았다. 그의 잔당들이 마지막으로 진무의 별관에 불을 질렀다.' : '조환이 진무를 끝내 옥에 넣으려 했다. 동창 번자 수십이 금의위 별관을 에워쌌다.', '진무가 수춘도를 뽑았다. “이번엔 법이 아니라 칼로 셈하겠소. 당신 식으로.”');
    scene('불타는 별관', body, [
      { t: '진무와 등을 맞댄다', h: '전투 · 이기면 내공 +' + q + ' · 진무가 산다', c: 'primary', f: function () { fight('b_dongchang', et() + .45, { auto: true, hpMul: 1.8, heal: .25, title: '동창의 마지막 밤', spar: true, win: function () { S.qi += qiPct(.09); S.flags.b_jinmuLive = 1; S.trust.b_jinmu = tr('b_jinmu') + 1; done('새벽까지 싸웠다. 불탄 별관 앞에서 진무가 수춘도를 땅에 꽂았다. “총지휘사는 그만두겠소. 이 칼로는 이제 사람을 지키고 싶소.”', 'fight'); }, lose: function () { b_rest(.25); S.flags.b_jinmuDead = 1; done('쓰러진 당신을 진무가 창밖으로 밀어냈다. 그는 불 속에 남았다. 아침에 재 속에서 부러진 수춘도가 나왔다.', 'fail'); } }); } }], 'siege');
  } else if (k === 'resist' && !S.flags.b_jinmuFall) {
    scene('진무', ps('진무가 직접 왔다. 이번에는 혼자였다.', '“금의위 삼천을 데려오면 당신 사람들이 다 죽소. 나 하나로 셈합시다. 내가 지면 소탕령은 이 고을에서 멈추오. 당신이 지면 당신 목 하나로 끝내겠소.”'), [
      { t: '받아들인다', h: '목숨을 건 보스전 · 이기면 내공 +' + q + ' · 은전 +' + sv, c: 'primary', f: function () { fight('b_jinmu', et() + .6, { auto: true, title: '총지휘사 진무', win: function () { S.qi += qiPct(.09); S.silver += price(600); S.flags.b_jinmuDead = 1; done('수춘도가 눈 위에 떨어졌다. 진무는 무릎을 꿇은 채 웃었다. “아홉 살 때 본 것과 같군. 이번엔 마을이 남았소.” 그는 약속을 지켰다. 그 고을에 다시 금의위가 오지 않았다. 그가 남긴 군자금 은전 <b>' + price(600) + '</b>냥이 백성들에게 돌아갔다가 일부가 당신 몫으로 왔다.', 'fight'); }, lose: function () { die('b_jinmu'); } }); } },
      { t: '사람들을 데리고 떠난다', h: '체력 -20% · 터를 잃는다', f: function () { hurt(.2); S.silver = Math.max(0, S.silver - price(300)); done('싸우지 않았다. 사람들을 데리고 더 깊은 산으로 들어갔다. 진무는 쫓지 않았다. 빈 터에 그의 글씨로 「법대로」라고 적힌 방이 남았다.', 'event'); } }], 'arena');
  } else {
    var txt = S.flags.b_jinmuFall ? '진무가 저잣거리에서 목이 베였다. 죄명은 역모. 마지막까지 한마디도 하지 않았다고 했다.' : '진무가 조정에서 밀려났다. 변방으로 귀양 가던 길에 동창의 칼을 맞았다는 소문이 돌았다.';
    S.flags.b_jinmuDead = 1;
    scene('수춘도의 끝', ps(txt, '며칠 뒤 이름 없는 서신 한 통이 왔다. 진무의 단정한 글씨였다. 「동창 내탕고에 서역의 붉은 수정이 쌓여 있소. 아홉 점의 인장이 찍혀 있었소. 조정 위에도 누군가 있는 모양이오.」'), [
      { t: '서신을 태운다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); learnMem('b_ninedots'); done('서신을 화로에 넣었다. 단정한 글씨가 오그라들며 탔다. 아홉 점만 끝까지 남았다가 재가 되었다.', 'event'); } },
      { t: '서신을 간직한다', h: '훗날의 단서 · 내공 +' + qiPct(.02), c: 'primary', f: function () { S.qi += qiPct(.02); S.flags.b_jinmuLetter = 1; learnMem('b_ninedots'); done('서신을 접어 품에 넣었다. 법 안의 칼도, 법 밖의 칼도 같은 그물에 걸려 있었다.', 'event'); } }], 'night');
  }
} });

EVENTS.push({ m: 402, id: 'b_i_lift', run: function () {
  var k = b_imp(), ach1 = function () { ach('b_net'); };
  var p1 = '새 황제가 즉위했다. 첫 칙서는 무림소탕령의 철회였다. 붉은 비단옷의 기병들이 성문을 떠났다.';
  var p2 = k === 'yield' ? W('「호국무원」 현판은 그대로 남았다. 교도들은 녹봉을 받으며 늙어 갔다. 산을 떠났던 장로들은 돌아오지 않았다.', '무림사는 다시 무림맹이 되었다. 관인은 지워졌지만 자국은 남았다.', '호패를 벗었다. 허리가 이상하게 가벼웠다.') :
    (k === 'resist' ? W('닫혔던 산문이 열렸다. 혈월봉의 교도들이 처음으로 산 아래 장터에 내려갔다. 사람들이 그들을 피하지 않았다.', '맹의 깃발은 끝내 내려가지 않았다. 세가들이 당신 이름을 먼저 불렀다.', '숲에서 나왔다. 의적이라 불리던 이들이 하나둘 마을로 돌아갔다. 당신 이름이 노래가 되었다.') :
    (k === 'betray' ? '상금으로 산 땅은 넓었다. 그러나 찾아오는 옛 얼굴은 없었다.' : '그물이 걷혔다. 강호는 언제 그랬냐는 듯 다시 시끄러워졌다.'));
  var p3 = S.flags.b_jinmuLive ? '진무가 무명옷 차림으로 찾아왔다. “이제 법 밖의 사람이 되었소. 생각보다 춥지 않군.”' : (S.flags.b_jinmuDead ? '진무의 무덤은 어디에도 없었다. 당신만 그의 글씨를 기억했다.' : '금의위의 총지휘사가 바뀌었다는 소식이 들렸다.');
  var ch = [];
  if (k === 'yield') ch.push({ t: '관의 연줄로 상단을 늘린다', h: '상단 +1', c: 'primary', f: function () { S.estate = Math.min(10, (S.estate || 0) + 1); ach1(); done('녹봉 대신 관의 연줄이 남았다. 상단 하나를 더 꾸렸다. 그물은 걷혔지만 그물코를 잡는 법은 남았다.', 'item'); } });
  else if (k === 'resist') ch.push({ t: '이름을 따라 사람들이 모인다', h: S.sect && !S.sect.fixed && S.sect.lv < 5 ? '문파 한 단계 성장' : '제자 +1 · 내공 +' + qiPct(.04), c: 'primary', f: function () { if (S.sect && !S.sect.fixed && S.sect.lv < 5) { S.sect.lv++; ach1(); done('<b>' + esc(S.sect.n) + '</b>의 문 앞에 입문하겠다는 젊은이들이 줄을 섰다.', 'people'); } else { var n = b_disc(); S.qi += qiPct(.04); ach1(); done((n ? '<b>' + esc(n) + '</b>라는 아이가 문 앞에서 사흘을 기다렸다. 제자로 거두었다. ' : '') + '그물 속에서 버틴 칼은 조금 더 단단해졌다.', 'people'); } } });
  else if (k === 'betray') ch.push({ t: '남은 재물을 센다', h: '은전 +' + price(300) + ' · 마기 +5', c: 'primary', f: function () { S.silver += price(300); S.mad = clamp(S.mad + 5, 0, 100); ach1(); done('땅을 팔고 은전을 셌다. 숫자는 많았다. 셀수록 방이 넓어졌다.', 'item'); } });
  ch.push({ t: '그물이 걷힌 하늘을 본다', h: '마기 -15 · 체력 회복', f: function () { S.mad = Math.max(0, S.mad - 15); S.hp = maxHp(); ach1(); done('쉰 살을 앞둔 봄이었다. 혈월은 여전히 해마다 떴다. 그물보다 오래된 것이 하늘에 걸려 있었다.', 'rest'); } });
  scene('그물이 걷히다', ps(p1, p2, p3), ch, 'dawn');
} });

/* ---- E4 우연한 사건 ---- */
function b_inNet() { return S.month >= 314 && S.month <= 404; }
LIFE.push({ id: 'b_l_census', from: 43, to: 50, w: 4, cd: 18, cond: b_inNet, run: function () {
  var c = price(60 + S.realm * 10), k = b_imp();
  scene('호패 검문', ps('성문 앞에 금의위 검문소가 섰다. 칼 찬 사람은 모두 줄을 섰다. 앞사람의 칼집이 부러져 길가에 던져졌다.', k === 'resist' ? '당신 얼굴은 방에 붙어 있다. 수염을 길렀지만 눈은 그대로다.' : (S.flags.b_pass ? '품속의 통행패가 무거웠다.' : '당신에게는 호패가 없었다.')), [
    { t: '통행패를 보인다', h: '아무 일 없다', off: S.flags.b_pass ? null : '통행패가 없다', c: 'primary', f: function () { done('졸개가 패를 보더니 허리를 굽혔다. 뒤에 선 무인들의 눈길이 등에 꽂혔다.', 'event'); } },
    { t: '뇌물을 찔러 준다', h: '은전 -' + c, off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; done('소매 속에서 은전이 오갔다. 졸개는 하품을 하며 손을 저었다. 법은 은전 앞에서 자주 졸았다.', 'item'); } },
    { t: '담을 넘는다', h: '전투가 날 수 있다', f: function () { if (Math.random() < .5) fight('b_jinyi', et() * .8, { auto: true, spar: true, title: '성벽 아래', win: function () { S.qi += qiPct(.015); done('쫓아온 금의위 무사를 성벽 아래서 쓰러뜨렸다. 소란이 커지기 전에 골목으로 사라졌다.', 'fight'); }, lose: function () { b_rest(.35); S.silver = Math.max(0, S.silver - c); done('붙잡혀 곤장을 맞고 벌금을 물었다. 은전 <b>' + c + '</b>냥.', 'fail'); } }); else done('밤을 기다려 담을 넘었다. 늙은 몸으로도 아직 담은 넘을 만했다.', 'event'); } }], 'loc_border');
} });

LIFE.push({ id: 'b_l_innspy', from: 43, to: 50, w: 3, cd: 30, cond: b_inNet, run: function () {
  scene('객잔의 귀', ps('객잔 구석 자리, 두 사내가 목소리를 낮췄다. 하나는 장사꾼 차림이지만 손이 너무 희었다. 동창의 번자다.', '“' + pick(['다음 달 동문 밖 표국을 친다더군.', '총지휘사가 요즘 무인과 차를 마신다던데.', '서역 상인이 또 은함을 들여왔다지.']) + '”'), [
    { t: '엿듣고 이용한다', h: '은전 +' + price(120), c: 'primary', f: function () { S.silver += price(120); done('들은 말을 필요한 사람에게 팔았다. 은전 <b>' + price(120) + '</b>냥. 소문도 물건이다.', 'item'); } },
    { t: '뒤를 밟아 처리한다', h: '전투 · 동창의 원한', f: function () { fight('b_dongchang', et() * .9, { auto: true, spar: true, title: '어두운 골목', win: function () { S.flags.b_dcAngry = 1; S.qi += qiPct(.02); done('골목에서 번자를 쓰러뜨렸다. 품에서 이름 열두 개가 적힌 종이가 나왔다. 불에 태웠다.', 'fight'); }, lose: function () { b_rest(.4); done('번자는 생각보다 빨랐다. 독침 하나가 목덜미를 스쳤다.', 'fail'); } }); } },
    { t: '자리를 뜬다', h: '아무 일 없다', f: function () { done('술값을 두고 일어났다. 귀가 많은 곳에서는 입을 닫는 게 상책이다.', 'event'); } }], 'night');
} });

LIFE.push({ id: 'b_l_bounty', from: 43, to: 50, w: 3, cd: 24, cond: b_inNet, run: function () {
  var k = b_imp(), g = price(260);
  if (k === 'resist') {
    scene('내 얼굴의 방', ps('저잣거리 벽에 당신 얼굴이 붙어 있었다. 「역도. 산 채로 은전 ' + price(3000) + '냥.」 그림이 젊었다. 실물보다 잘생겼다.', '아이 하나가 방과 당신 얼굴을 번갈아 보았다.'), [
      { t: '아이에게 사탕을 쥐여 준다', h: '마기 -8', c: 'primary', f: function () { S.mad = Math.max(0, S.mad - 8); done('아이는 사탕을 받고 손가락을 입에 댔다. 쉿. 그 고을에서 당신을 고발한 사람은 끝내 없었다.', 'people'); } },
      { t: '방을 뜯어 간다', h: '아무 일 없다', f: function () { done('방을 뜯어 품에 넣었다. 나중에 늙으면 꺼내 볼 것이다.', 'event'); } }]);
  } else {
    var tgt = pick(['독수 삼형제', '관아를 턴 도적', '파사교 밀수꾼', '역참을 불태운 사파 무인']);
    scene('현상금 방', ps('관아 앞 방에 ' + tgt + '의 얼굴이 붙어 있었다. 산 채로 잡으면 은전 ' + g + '냥.'), [
      { t: '사냥에 나선다', h: '전투 · 은전 +' + g, c: 'primary', f: function () { fight(pick(['bandit', 'chaser', 'b_dongchang']), et() + .2, { auto: true, spar: true, title: tgt, win: function () { S.silver += g; done(tgt + '을(를) 묶어 관아에 넘겼다. 은전 <b>' + g + '</b>냥.' + (k === 'betray' ? ' 이제 이런 일이 손에 익었다.' : ''), 'fight'); }, lose: function () { b_rest(.35); done('놓쳤다. 다음 날 방에 붙은 금액이 올라 있었다.', 'fail'); } }); } },
      { t: '지나친다', h: '아무 일 없다', f: function () { done('방 앞을 지나쳤다. 남의 목값을 세는 일은 젊을 때 충분히 했다.', 'event'); } }]);
  }
} });

LIFE.push({ id: 'b_l_scholar', from: 43, to: 50, w: 2, once: 'life', cond: b_inNet, run: function () {
  var q = qiPct(.03);
  scene('파직된 어사', ps('주막에서 늙은 선비 하나가 홀로 술을 마셨다. 소탕령에 반대하는 상소를 올렸다가 파직된 어사라고 했다.', '“칼 든 자들이 무서운 게 아니라오. 붓 든 자들이 칼을 무서워하는 게 무섭지.”'), [
    { t: '술을 사고 이야기를 듣는다', h: '내공 +' + q + ' · 마기 -8', c: 'primary', f: function () { S.qi += q; S.mad = Math.max(0, S.mad - 8); done('노인은 밤새 옛 법전 이야기를 했다. 법은 원래 약한 자를 위해 쓰였다고. 칼도 그렇다고. 오래 막혀 있던 무언가가 풀렸다.', 'qi'); } },
    { t: '여비를 쥐여 준다', h: '은전 -' + price(80) + ' · 훗날의 인연', off: S.silver < price(80) ? '은전이 모자란다' : null, f: function () { S.silver -= price(80); S.flags.b_scholar = 1; done('노인은 은전을 받고 오래 고개를 숙였다. “내가 다시 붓을 쥐면 당신 이름을 쓰겠소.” 그는 남쪽으로 떠났다.', 'people'); } }]);
} });

LIFE.push({ id: 'b_l_bribe', from: 43, to: 50, w: 2, cd: 36, cond: b_inNet, run: function () {
  var g = price(350);
  scene('동창의 선물', ps('밤에 비단 상자 하나가 배달되었다. 안에는 은괴와 짧은 쪽지.', '「' + W('혈월봉의 장로', '맹의 원로', '아는 떠돌이') + ' 아무개의 행방을 알려 주시면, 이것은 시작일 뿐입니다. — 동창」'), [
    { t: '상자를 돌려보낸다', h: '마기 -6 · 동창이 기억한다', c: 'primary', f: function () { S.mad = Math.max(0, S.mad - 6); S.flags.b_dcAngry = 1; done('상자를 그대로 돌려보냈다. 은괴 하나 빼지 않았다. 다음 날 문 앞을 서성이는 사람이 둘로 늘었다.', 'event'); } },
    { t: '받고 거짓 행방을 알려 준다', h: '은전 +' + g + ' · 들키면 위험하다', f: function () { S.silver += g; if (Math.random() < .35) { hurt(.25); done('은괴를 챙겼다. 한 달 뒤 거짓이 들통났다. 골목에서 동창 번자들에게 몰매를 맞았다. 그래도 은괴는 남았다.', 'fail'); } else done('은괴를 챙기고 엉뚱한 산 이름을 적어 보냈다. 동창 번자들이 그 산을 뒤지는 동안 겨울이 지나갔다.', 'item'); } },
    { t: '받고 진짜 행방을 알려 준다', h: '은전 +' + g + ' · 마기 +15', f: function () { S.silver += g; S.mad = clamp(S.mad + 15, 0, 100); done('진짜 이름을 적었다. 손이 떨리지 않았다. 그게 더 무서웠다.', 'item'); } }], 'night');
} });

LIFE.push({ id: 'b_l_gray', from: 40, to: 50, w: 3, once: 'life', run: function () {
  var q = qiPct(.025);
  scene('흰 머리', ps('세숫물에 비친 얼굴의 귀밑머리가 하얬다. 하나가 아니라 한 줌이었다.', age() + '세. 처음 매화 지던 봄의 아이는 이제 없다. ' + (S.noReturn ? '이 머리는 다시 검어지지 않는다.' : '죽으면 다시 검어지겠지만, 이 생의 흰 머리는 이 생의 것이다.')), [
    { t: '뽑지 않고 둔다', h: '마기 -12', c: 'primary', f: function () { S.mad = Math.max(0, S.mad - 12); done('그대로 두었다. 흰 머리도 싸워서 얻은 것이다.', 'rest'); } },
    { t: '늙기 전에 더 높이 오른다', h: '내공 +' + q, f: function () { S.qi += q; done('그날부터 새벽 수련을 한 시진 늘렸다. 몸이 늦게 따라왔지만, 따라왔다.', 'qi'); } }]);
} });

LIFE.push({ id: 'b_l_oldfriend', from: 40, to: 50, w: 2, cd: 36, run: function () {
  var who = pick(['청년기 외당에서 같이 매를 맞던 동기', '흑천맹 전쟁 때 등을 맡겼던 칼잡이', '한때 당신을 쫓던 추격대의 막내', '처음 묵었던 객잔의 주인 아들']), state = pick(['다리를 절었다', '머리가 다 세었다', '눈 하나를 잃었다', '살이 많이 쪘다']);
  scene('옛 얼굴', ps('장터에서 누가 당신 이름을 불렀다. ' + who + '였다. ' + state + '.', '“살아 있었구나.” 그 말이 그렇게 반가울 줄 몰랐다.'), [
    { t: '술을 산다', h: '은전 -' + price(30) + ' · 마기 -15', off: S.silver < price(30) ? '은전이 모자란다' : null, c: 'primary', f: function () { S.silver -= price(30); S.mad = Math.max(0, S.mad - 15); done('밤새 죽은 사람들 이름을 하나씩 불렀다. 산 사람 이름은 몇 개 안 되었다. 그래서 더 마셨다.', 'people'); } },
    { t: '그의 부탁을 들어준다', h: '전투 · 은전 +' + price(140), f: function () { fight('bandit', et() + .2, { auto: true, spar: true, title: '옛 친구의 부탁', win: function () { S.silver += price(140); done('그의 가게를 괴롭히던 왈패들을 쫓아냈다. 그는 은전 <b>' + price(140) + '</b>냥을 억지로 쥐여 주었다.', 'fight'); }, lose: function () { b_rest(.4); done('왈패 따위에게 밀렸다. 옛 친구가 당신을 부축하며 웃었다. “우리 늙었구나.”', 'fail'); } }); } }], 'loc_village');
} });

LIFE.push({ id: 'b_l_cough', from: 40, to: 50, w: 2, cd: 36, cond: function () { return S.realm < 7; }, run: function () {
  var c = price(90);
  scene('겨울 기침', ps('지난겨울 얻은 기침이 봄까지 떨어지지 않았다. 운기를 할 때마다 가슴 한쪽이 걸렸다.', pick(['북해의 찬바람이 폐에 남은 것이다.', '나이가 칼보다 먼저 폐를 찔렀다.', '피가 섞이진 않았다. 아직은.'])), [
    { t: '의원에게 간다', h: '은전 -' + c + ' · 체력 회복 · 마기 -5', off: S.silver < c ? '은전이 모자란다' : null, c: 'primary', f: function () { S.silver -= c; S.hp = maxHp(); S.mad = Math.max(0, S.mad - 5); done((alive('hr') && worldOf() === 'ma' ? '홍란이 혀를 찼다. “오래 못 간다고 했잖아.” 그래도 약은 잘 들었다.' : '의원이 쓴 약을 지어 주었다. 한 달 만에 숨이 트였다.'), 'rest'); } },
    { t: '빙궁의 호흡법으로 다스린다', h: '체력 회복', off: S.flags.ms_b_seolyeong2 || S.flags.b_binglin_met ? null : '북해의 호흡을 모른다', f: function () { S.hp = maxHp(); done('찬 숨을 들이쉬고 뜨거운 숨을 내쉬었다. 북쪽에서 배운 것이 남쪽에서 쓰였다.', 'qi'); } },
    { t: '참는다', h: '체력 -20%', f: function () { hurt(.2); done('기침을 삼키며 한 철을 났다. 칼끝이 가끔 흔들렸다.', 'fail'); } }]);
} });

LIFE.push({ id: 'b_l_northman', from: 35, to: 45, w: 2, once: 'life', cond: function () { return S.month >= 240; }, run: function () {
  var q = qiPct(.03);
  scene('빙궁의 낙오병', ps('헛간에 빙궁 군사 하나가 숨어 있었다. 열여섯쯤 된 소년이었다. 털옷 아래 갈비뼈가 드러나 있었다.', '소년이 떨리는 손으로 칼을 들었다. 칼끝이 당신이 아니라 자기 목을 향했다.'), [
    { t: '칼을 빼앗고 밥을 준다', h: '마기 -10 · 북해의 이야기', c: 'primary', f: function () { S.mad = Math.max(0, S.mad - 10); S.qi += q; done('소년은 밥을 세 그릇 먹고 잠들었다. 깨어나서 북해의 얼음 동굴과 숨 쉬는 법 이야기를 했다. 그 숨으로 운기해 보니 단전이 맑아졌다. 봄에 소년은 북쪽으로 돌아갔다.', 'people'); } },
    { t: '관에 넘긴다', h: '은전 +' + price(100), f: function () { S.silver += price(100); done('소년은 관졸에게 끌려가며 당신을 보지 않았다. 은전 <b>' + price(100) + '</b>냥.', 'item'); } },
    { t: '제자로 삼는다', h: '제자 +1 · 마기 -5', off: (S.disc || []).length >= 8 ? '제자가 너무 많다' : null, f: function () { var n = b_disc(); S.mad = Math.max(0, S.mad - 5); done(n ? '소년에게 남쪽 이름을 지어 주었다. <b>' + esc(n) + '</b>. 그는 북해의 칼과 당신의 칼을 함께 배우기 시작했다.' : '소년을 거두었다.', 'people'); } }], 'loc_village');
} });
