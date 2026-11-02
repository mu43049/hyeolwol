/* 혈월회귀록 v4 — 이야기 기준 파일. 새 이벤트를 쓸 때 이 파일의 모양을 따른다.
   ※ 장 이벤트는 EVENTS.push({m,id,...}), 우연한 사건은 LIFE.push({id,...}). 둘 다 run()이 끝나면 done()/afterAct()로 닫아야 한다(한 달 소모 없음). */

/* ---- 새 시대의 첫 달 (세계별) ---- */
EVENTS.push({ m: 37, id: 'c_open', run: function () {
  var w = worldOf(), P1, ch;
  var body = ps(
    W('혈월봉의 재가 식었다. 사람들이 폐허 위에 다시 기둥을 세우기 시작했다.', '맹의 깃발 아래에서 맞는 첫 봄이다. 흰 옷은 이제 어색하지 않다.', '낯선 마을의 객잔 방에서 눈을 떴다. 창밖으로 매화가 아니라 살구꽃이 지고 있었다.'),
    '열아홉 살. 처음 매화 지는 봄을 맞은 지 세 해가 지났다. ' + (S.noReturn ? '이번에는 다음 봄이 오지 않을 수도 있다. 그래서인지 아침이 유난히 또렷하다.' : '앞으로 몇 번의 봄이 남았는지는 아무도 모른다. 다만 이번 생은 길 것이다.'),
    '이제부터는 달마다 큰일이 오지 않는다. 수련하고, 돈을 벌고, 사람을 만나고, 때로 칼을 뽑으며 오래 걸어야 한다.');
  ch = [
    { t: '장부와 지도를 펼쳐 놓고 앞날을 그린다', h: '은전 +60 · 내공 +15', f: function () { S.silver += price(60); S.qi += qiGain(15); done('앞으로 십 년을 어떻게 살지 종이 위에 선 몇 개를 그었다. 선은 자주 고쳐지겠지만, 그리는 일 자체가 힘이 되었다.', 'event'); } },
    { t: '곧장 수련장으로 간다', h: '내공 +30', f: function () { S.qi += qiGain(30); done('생각은 나중에 해도 된다. 땀부터 흘렸다. 해 질 녘에는 단전이 따뜻했다.', 'qi'); } },
    { t: '옛 인연을 찾아 안부를 묻는다', h: '체력·마기 회복', f: function () { S.hp = maxHp(); S.mad = Math.max(0, S.mad - 20); done('살아남은 얼굴들을 한 명씩 찾아다녔다. 모두 조금씩 늙어 있었다. 그것이 이상하게 위로가 되었다.', 'people'); } }];
  scene(W('불탄 자리 위의 봄', '두 깃발 아래의 봄', '이름을 얻은 봄'), body, ch, 'dawn');
} });

/* ---- 우연한 사건의 예 ---- */
LIFE.push({ id: 'c_letter', from: 19, w: 3, run: function () {
  scene('오래된 서신', '<p>문 앞에 낡은 서신이 놓여 있다. ' + W('혈월봉의 옛 동료가 보낸 것이다.', '무림맹 하급 무사 시절 알던 이의 필적이다.', '이름 모를 행인이 두고 간 것이다.') + ' 안부와 부탁이 반씩 적혀 있다.</p>', [
    { t: '은전을 보내 준다', h: '은전 -' + price(40) + ' · 신뢰할 사람이 늘어난다', off: S.silver < price(40) ? '은전이 모자란다' : null, f: function () { S.silver -= price(40); S.qi += qiGain(6); done('답장과 함께 은전을 보냈다. 보답은 바라지 않았지만, 마음이 가벼워졌다.', 'people'); } },
    { t: '답장만 쓴다', h: '아무 일 없다', f: function () { done('짧게 안부만 적어 보냈다. 서로가 살아 있다는 것을 아는 것만으로 충분했다.', 'event'); } }]);
} });
LIFE.push({ id: 'c_challenger', from: 20, w: 3, cond: function () { return S.realm >= 2; }, cd: 18, run: function () {
  var tier = et() * .9;
  scene('도전자', '<p>저잣거리에서 낯선 무인이 길을 막았다. “당신 이름이 이 근방에서 제일 높다더군. 한 수 청하겠소.”</p>', [
    { t: '받아들인다', h: '전투 · 이기면 은전과 내공', f: function () { fight('swordsman', tier, { auto: true, spar: true, title: '도전자', win: function () { var g = Math.round(price(40) * (1 + S.realm * .4)); S.silver += g; done('칼끝이 목에서 멈췄다. 도전자는 고개를 숙이고 물러났다. 사례금 <b>' + g + '</b>냥을 놓고 갔다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .35)); done('바닥에 쓰러졌다. 상대는 칼을 거두고 의원을 불러 주었다. 자존심이 더 아팠다.', 'fail'); } }); } },
    { t: '웃으며 돌려보낸다', h: '명성은 그대로', f: function () { done('술 한잔을 사 주고 돌려보냈다. 도전자는 의아해하며 떠났다.', 'event'); } }]);
} });
LIFE.push({ id: 'c_illness', from: 50, w: 4, cond: function () { return S.realm < 7; }, cd: 36, run: function () {
  scene('병', '<p>아침에 일어나자 허리가 펴지지 않았다. 한참 숨을 고르고서야 몸이 움직였다. 나이는 칼보다 느리게, 그러나 확실하게 베어 온다.</p>', [
    { t: '약을 먹고 며칠 쉰다', h: '은전 -' + price(80) + ' · 체력 회복', off: S.silver < price(80) ? '은전이 모자란다' : null, f: function () { S.silver -= price(80); S.hp = maxHp(); done('약을 달여 먹고 사흘을 누워 있었다. 몸이 조금 풀렸다.', 'rest'); } },
    { t: '버틴다', h: '체력 -25%', f: function () { hurt(.25); done('이를 악물고 하루를 버텼다. 몸은 말을 듣지 않았지만 마음은 한 걸음 더 단단해졌다.', 'fail'); } }]);
} });
