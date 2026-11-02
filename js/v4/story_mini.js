/* 혈월회귀록 v4 — 소소한 하루. 오래 반복되어도 질리지 않도록 가변 문장으로 짠 짧은 우연 사건들 (접두사 m_) */
var SEASON_NAME = function () { return SEASON[Math.floor(((S.month - 1) % 12) / 3)]; };
var MINI_PLACE = function () { return W(pick(['혈월봉 아래 장터', '총단 외곽 저잣거리', '산문 앞 주막']), pick(['무림맹 앞 시장', '맹 외곽 주막', '성곽 아래 장터']), pick(['낯선 마을 장터', '나루터 주막', '고갯길 객잔'])); };

LIFE.push({ id: 'm_season', from: 17, w: 5, run: function () {
  var s = SEASON_NAME(), t = {
    '봄': ['매화가 지고 복사꽃이 피었다. 꽃잎이 칼날에 한 장 내려앉았다.', '봄비가 사흘 내렸다. 처마 밑에서 칼을 닦으며 비 그치기를 기다렸다.'],
    '여름': ['한낮의 더위에 연무장 흙이 갈라졌다. 그늘에서 숨을 고르는 것도 수련이다.', '장마 끝에 개울이 불었다. 물소리가 귀에 오래 남았다.'],
    '가을': ['낙엽이 발소리처럼 쌓였다. 가을 달이 유난히 붉은 날이었다.', '추수가 끝난 들판에 바람이 지나갔다. 논두렁에 앉아 한참을 있었다.'],
    '겨울': ['눈이 쌓여 소리가 죽었다. 입김이 칼날 위에 서렸다.', '화로 곁에서 낡은 무공서를 다시 넘겼다. 읽던 곳에서 새 뜻이 보였다.'] }[s];
  scene(s + '의 하루', '<p>' + pick(t) + '</p>', [
    { t: '그 풍경 속에서 운기한다', h: '내공 +', f: function () { var q = qiPct(.012); S.qi += q; S.mad = Math.max(0, S.mad - 6); done('계절의 숨에 맞춰 호흡을 골랐다. 내공이 <b>' + q + '</b> 늘었다.', 'qi'); } },
    { t: '아무 생각 없이 쉰다', h: '체력 회복', f: function () { S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .3)); done('아무것도 하지 않은 하루였다. 그런 하루가 가끔은 필요하다.', 'rest'); } }]);
} });
LIFE.push({ id: 'm_rumor', from: 17, w: 5, run: function () {
  var rumors = ['서쪽 고개에서 이름 모를 고수가 나타나 산적을 모조리 베었다고 한다.', '상단 하나가 통째로 사라졌다는 소문이 돈다. 마지막으로 목격된 곳은 흑림 근처다.', '강남에서 신병(神兵)이 나왔다는 이야기가 퍼지고 있다. 사실이라면 칼을 든 자들이 몰려들 것이다.', '어느 문파의 장로가 하룻밤 사이에 백발이 되었다고 한다. 무슨 일을 보았느냐고 묻는 이도 없다.', '붉은 달이 올해는 유난히 크다고 다들 말한다. 늙은이들은 불길하다고 혀를 찬다.', '떠돌이 의원이 마을마다 약을 거저 돌린다고 한다. 거저 주는 약일수록 값이 비싸다는 것을 모르는 사람은 없다.'];
  scene('소문', '<p>' + MINI_PLACE() + '에서 귀에 들어온 이야기다.</p><p>' + pick(rumors) + '</p>', [
    { t: '자세히 캐묻는다', h: '은전 -' + price(8) + ' · 단서', off: S.silver < price(8) ? '은전이 모자란다' : null, f: function () { S.silver -= price(8); var r = Math.random(); if (r < .4) { var q = qiPct(.02); S.qi += q; done('술값을 낸 만큼의 이야기를 들었다. 쓸 만한 대목이 있었다. 내공 +' + q, 'qi'); } else if (r < .7) { var g = price(rnd(15, 40)); S.silver += g; done('이야기 끝에 일거리를 소개받았다. 은전 <b>' + g + '</b>냥.', 'item'); } else done('허풍이었다. 술값만 날렸다.', 'event'); } },
    { t: '흘려듣는다', h: '아무 일 없다', f: function () { done('소문은 소문일 뿐이다. 귀를 닫고 길을 갔다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_traveler', from: 18, w: 4, run: function () {
  var who = pick(['등짐을 진 행상', '다친 소금 장수', '길을 잃은 늙은 선비', '아이를 업은 아낙', '병든 말을 끄는 청년']);
  scene('길손', '<p>길가에서 ' + who + '이(가) 도움을 청했다.</p>', [
    { t: '은전을 건넨다', h: '은전 -' + price(20) + ' · 마기 -10', off: S.silver < price(20) ? '은전이 모자란다' : null, f: function () { S.silver -= price(20); S.mad = Math.max(0, S.mad - 10); var r = Math.random(); if (r < .35) { addMat('herb', rnd(2, 4)); done('길손은 연신 고개를 숙이며 약초 꾸러미를 건넸다. 답례였다.', 'people'); } else done('길손은 눈물을 글썽이며 떠났다. 마음이 조금 맑아졌다.', 'people'); } },
    { t: '길을 안내해 준다', h: '체력 소모 · 인연', f: function () { hurt(.05); if (Math.random() < .3) { S.qi += qiPct(.015); done('함께 걷는 동안 지나온 길 이야기를 들었다. 어딘가 깨우침이 있었다.', 'qi'); } else done('한나절을 함께 걸었다. 헤어질 때 길손이 두 손을 모았다.', 'people'); } },
    { t: '못 본 척 지나간다', h: '마기 +4', f: function () { S.mad = clamp(S.mad + 4, 0, 100); done('고개를 돌렸다. 발걸음이 조금 무거웠다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_thief', from: 17, w: 4, run: function () {
  scene('소매치기', '<p>' + MINI_PLACE() + '에서 누군가 허리춤을 스쳤다. 돌아보니 그림자 하나가 골목으로 뛰어든다.</p>', [
    { t: '쫓아가 잡는다', h: '전투 · 은전 회수', f: function () { fight('junior', Math.max(0, et() * .5), { auto: true, spar: true, title: '소매치기', win: function () { var g = price(rnd(10, 30)); S.silver += g; done('멱살을 잡아 올리니 품에서 은전이 쏟아졌다. <b>' + g + '</b>냥을 되찾았다.', 'fight'); }, lose: function () { S.silver = Math.max(0, S.silver - price(15)); done('놓쳤다. 은전 주머니가 가벼워졌다.', 'fail'); } }); } },
    { t: '내버려 둔다', h: '은전 소량 손실', f: function () { var l = Math.min(S.silver, price(10)); S.silver -= l; done('쫓기엔 귀찮았다. 은전 ' + l + '냥이 날아갔다.', 'fail'); } }]);
} });
LIFE.push({ id: 'm_haggle', from: 18, w: 4, run: function () {
  var item = pick([['약초 한 줌', 'herb'], ['짐승 가죽', 'hide'], ['쇳덩이', 'iron'], ['오래된 뼈', 'bone']]);
  scene('장터 흥정', '<p>' + MINI_PLACE() + '에서 ' + item[0] + '을(를) 헐값에 내놓은 상인을 만났다.</p>', [
    { t: '흥정해서 산다', h: '은전 -' + price(16) + ' · 재료 +3', off: S.silver < price(16) ? '은전이 모자란다' : null, f: function () { S.silver -= price(16); addMat(item[1], 3); done('입씨름 끝에 ' + MATS[item[1]].n + ' 세 개를 건졌다. 남는 장사였다.', 'item'); } },
    { t: '값을 더 후려친다', h: '재료 +3 또는 허탕', f: function () { if (Math.random() < .5) { addMat(item[1], 3); done('상인이 혀를 차며 졌다. ' + MATS[item[1]].n + ' 세 개를 공짜나 다름없이 얻었다.', 'item'); } else done('상인이 흥정을 거두고 짐을 쌌다. 아무것도 얻지 못했다.', 'event'); } },
    { t: '구경만 한다', h: '아무 일 없다', f: function () { done('구경만 하고 돌아섰다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_insight', from: 17, w: 5, run: function () {
  scene('불현듯', '<p>' + pick(['빨래터의 물소리를 듣다가', '칼을 닦다가', '길을 걷다가', '찻물이 끓는 소리를 듣다가', '아이들의 놀이를 구경하다가']) + ' 막혀 있던 한 구절이 풀리는 느낌이 들었다.</p>', [
    { t: '그 자리에 앉아 곱씹는다', h: '내공 ++', f: function () { var q = qiPct(.03); S.qi += q; if (canBreak()) { S.insightBuff = true; } done('한참을 앉아 그 느낌을 붙들었다. 내공이 <b>' + q + '</b> 늘었다.' + (canBreak() ? ' <b>벽이 얇아졌다.</b>' : ''), 'qi'); } },
    { t: '가던 길을 간다', h: '내공 +', f: function () { var q = qiPct(.008); S.qi += q; done('스쳐 가는 느낌이었다. 그래도 조금은 남았다. 내공 +' + q, 'qi'); } }]);
} });
LIFE.push({ id: 'm_oldwound', from: 42, w: 4, cond: function () { return S.realm < 8; }, run: function () {
  scene('옛 상처', '<p>비 오는 날이면 어김없이 쑤시는 흉터가 있다. 오늘은 칼로 도려내는 듯하다. 젊을 땐 몰랐던 값을 치르는 중이다.</p>', [
    { t: '뜨거운 약탕에 몸을 담근다', h: '은전 -' + price(25) + ' · 체력 회복', off: S.silver < price(25) ? '은전이 모자란다' : null, f: function () { S.silver -= price(25); S.hp = maxHp(); S.mad = Math.max(0, S.mad - 10); done('약탕에서 한 시진을 보냈다. 통증이 가라앉았다.', 'rest'); } },
    { t: '이를 물고 수련한다', h: '내공 + · 체력 -', f: function () { hurt(.15); var q = qiPct(.015); S.qi += q; done('아픔 속에서 호흡을 밀어붙였다. 내공 +' + q, 'qi'); } }]);
} });
LIFE.push({ id: 'm_kids', from: 24, w: 4, run: function () {
  var kid = randName(), canTake = age() >= 28 && (S.disc || []).length < 8 && S.silver >= price(60);
  scene('아이들', '<p>' + MINI_PLACE() + ' 한쪽에서 아이들이 나뭇가지로 칼싸움을 하고 있다. 그중 한 아이, <b>' + kid + '</b>의 발놀림이 눈에 들어왔다.</p>', [
    { t: '아이를 제자로 거둔다', h: '은전 -' + price(60) + ' · 제자 +1', off: canTake ? null : (age() < 28 ? '스물여덟은 되어야 한다' : ((S.disc || []).length >= 8 ? '제자는 여덟까지' : '은전이 모자란다')), f: function () { S.silver -= price(60); S.disc = S.disc || []; var d = { n: kid, p: 0, t: rnd(2, 5), a: rnd(9, 13) }; S.disc.push(d); logE('people', '<b>' + kid + '</b>을(를) 제자로 거두었다.'); done('아이의 부모에게 사례를 하고 제자로 데려왔다. 재능은 ' + '★'.repeat(d.t) + '쯤 되어 보인다.', 'people'); } },
    { t: '기본 자세를 잡아 준다', h: '내공 소량 · 마기 -', f: function () { S.qi += qiPct(.008); S.mad = Math.max(0, S.mad - 8); done('팔꿈치를 바로잡아 주고 나뭇가지 쥐는 법을 일러 주었다. 아이가 환하게 웃었다.', 'people'); } },
    { t: '웃으며 지나간다', h: '아무 일 없다', f: function () { done('웃으며 지나갔다. 이제는 그런 풍경이 눈에 오래 남는다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_inn', from: 18, w: 4, run: function () {
  scene('객잔의 밤', '<p>비를 피해 든 객잔에서 낯선 무인들이 술판을 벌이고 있다. 화제는 어느새 당신의 이름 근처를 맴돈다.</p>', [
    { t: '조용히 앉아 듣는다', h: '정보 · 내공 +', f: function () { S.qi += qiPct(.012); done('내 이름이 어떻게 와전되었는지 듣는 것은 기묘한 경험이었다. 그래도 몇 가지 쓸 만한 이야기가 있었다.', 'qi'); } },
    { t: '술을 한 순배 돌린다', h: '은전 -' + price(15) + ' · 마기 -12', off: S.silver < price(15) ? '은전이 모자란다' : null, f: function () { S.silver -= price(15); S.mad = Math.max(0, S.mad - 12); done('이름을 밝히지 않고 술 한 순배를 돌렸다. 한바탕 웃고 헤어졌다.', 'people'); } },
    { t: '시비가 붙기 전에 자리를 뜬다', h: '아무 일 없다', f: function () { done('시비가 붙기 전에 자리를 떴다. 젊을 땐 이런 판단을 못 했다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_herbalist', from: 18, w: 3, run: function () {
  scene('약초꾼', '<p>산길에서 약초꾼을 만났다. 광주리에 갓 캔 약초가 가득하다. “이건 오늘 아침에 캔 겁니다. 값을 쳐 드리지요.”</p>', [
    { t: '약초를 산다', h: '은전 -' + price(24) + ' · 약초 +5', off: S.silver < price(24) ? '은전이 모자란다' : null, f: function () { S.silver -= price(24); addMat('herb', 5); if (Math.random() < .12) addMat('jade', 1); done('약초를 넉넉히 샀다. 광주리 바닥에서 반짝이는 것이 하나 섞여 나왔다.', 'item'); } },
    { t: '대신 약초 캐는 법을 묻는다', h: '체력 · 약초 +2', f: function () { addMat('herb', 2); S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .15)); done('약초꾼이 쓴 풀 맛 보는 법을 가르쳐 주었다. 약초 두 줌을 덤으로 얻었다.', 'item'); } }]);
} });
LIFE.push({ id: 'm_duel_old', from: 45, w: 3, cond: function () { return S.realm >= 4; }, cd: 60, run: function () {
  scene('늙은 무인', '<p>산길 정자에서 백발의 무인이 홀로 바둑을 두고 있다. 눈이 마주치자 그가 판을 가리켰다. “한 수 두겠소?”</p>', [
    { t: '바둑을 둔다', h: '내공 ++ 또는 가르침', f: function () { var r = Math.random(); if (r < .5) { var q = qiPct(.03); S.qi += q; done('승부는 졌지만 바둑 한 판에 길 하나가 보였다. 내공 <b>' + q + '</b>.', 'qi'); } else { S.mad = Math.max(0, S.mad - 20); done('끝내 이겼다. 노인은 껄껄 웃으며 이름도 묻지 않고 떠났다. 마음이 맑아졌다.', 'rest'); } } },
    { t: '칼을 두고 한 수 겨룬다', h: '전투 · 내공', f: function () { fight('elder', et() * .9, { auto: true, spar: true, title: '늙은 무인', win: function () { var q = qiPct(.03); S.qi += q; done('노인은 칼을 거두며 웃었다. “아직 팔팔하군.” 내공 <b>' + q + '</b>.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .4)); done('보기 좋게 졌다. 노인이 부축해 주었다. “나이 값이오.”', 'fail'); } }); } },
    { t: '정중히 사양한다', h: '아무 일 없다', f: function () { done('고개를 숙여 사양하고 지나갔다.', 'event'); } }]);
} });
LIFE.push({ id: 'm_blood', from: 20, w: 2, cond: function () { return S.mad >= 40; }, cd: 36, run: function () {
  scene('붉은 꿈', '<p>밤새 붉은 달 꿈을 꾸었다. 일어나 보니 손바닥에 손톱자국이 깊이 박혀 있다. 마기가 속삭이는 것 같다.</p>', [
    { t: '정심환을 삼킨다', h: '정심환 -1 · 마기 크게 감소', off: S.items.calm < 1 ? '정심환이 없다' : null, f: function () { S.items.calm--; S.mad = Math.max(0, S.mad - 45); done('쓴 환약이 목을 타고 내려갔다. 붉은 기운이 물러갔다.', 'rest'); } },
    { t: '찬물을 끼얹고 좌선한다', h: '마기 -20 · 체력 소모', f: function () { S.mad = Math.max(0, S.mad - 20); hurt(.1); done('찬물이 정신을 깨웠다. 좌선하는 동안 속삭임이 잦아들었다.', 'rest'); } },
    { t: '그 힘을 받아들여 본다', h: '내공 + · 마기 +15', f: function () { S.mad = clamp(S.mad + 15, 0, 100); var q = qiPct(.03); S.qi += q; done('마기에 몸을 맡기자 피가 뜨거워졌다. 내공이 <b>' + q + '</b> 늘었지만 눈앞이 붉다.', 'qi'); } }]);
} });
