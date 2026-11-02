/* 혈월회귀록 v4 — 작가 A: E1 재편(37~120개월, 19~26세) · E2 흑천맹(121~216개월, 27~34세). 접두사 a_
   E1: 새 세계의 첫 해, 첫 라이벌 혁련무, 옛 인연의 근황, 묵야의 죽음, 흑천맹의 첫 소문.
   E2: 흑천맹 전쟁. 흑천왕 곡달과 세 부하(독왕 묘청 · 창귀 위진 · 귀면 사공혼), 협곡 결전. 동료 소화 · 금만석. 한서생의 죽음. */

/* ---- 적 ---- */
ENM.a_rival = { n: '혁련무', hp: 150, atk: 20, w: { strong: 2, rapid: 4, feint: 3, charge: 1 } }; GLY.a_rival = '赫';
ENM.a_scout = { n: '흑천맹 척후', hp: 78, atk: 14, w: { strong: 1, rapid: 4, feint: 3, charge: 1 } }; GLY.a_scout = '斥';
ENM.a_raider = { n: '흑천맹 도부수', hp: 105, atk: 17, w: { strong: 5, rapid: 1, feint: 1, charge: 3 } }; GLY.a_raider = '黑';
ENM.a_dok = { n: '독왕 묘청', hp: 260, atk: 27, boss: true, w: { strong: 1, rapid: 3, feint: 5, charge: 2 } }; GLY.a_dok = '毒';
ENM.a_chang = { n: '창귀 위진', hp: 300, atk: 30, boss: true, w: { strong: 5, rapid: 2, feint: 1, charge: 3 } }; GLY.a_chang = '槍';
ENM.a_gwi = { n: '귀면 사공혼', hp: 250, atk: 28, boss: true, w: { strong: 1, rapid: 3, feint: 6, charge: 1 } }; GLY.a_gwi = '鬼';
ENM.a_gokdal = { n: '흑천왕 곡달', hp: 400, atk: 35, boss: true, w: { strong: 4, rapid: 2, feint: 3, charge: 3 } }; GLY.a_gokdal = '天';

/* ---- 기억 ---- */
MEM.a_rival = ['혁련무의 어깨', '혁련무는 오른쪽 어깨가 늘 반 박자 늦다. 쾌검의 끝에서 그 틈이 벌어진다.'];
MEM.a_mark = ['검은 해의 표식', '흑천맹 척후는 소매 안쪽에 검은 해를 새긴다. 표식을 알아보면 습격을 먼저 끊을 수 있다.'];
MEM.a_omen = ['묵야의 마지막 말', '“검은 해가 뜨는 해, 협곡에서는 물소리를 따라가라.” 눈먼 노인이 죽기 전에 남긴 말.'];
MEM.a_dok = ['독왕의 독무', '독왕 묘청의 독무는 바람을 거스르지 못한다. 바람을 등지고 서면 독이 닿지 않는다.'];
MEM.a_chang = ['창귀의 세 번째 찌르기', '창귀 위진은 세 번째 찌르기 직전에 왼발을 끈다. 그때 안으로 파고들면 창이 죽는다.'];
MEM.a_gwi = ['귀면의 진짜 몸', '귀면 사공혼의 분신은 등불을 향해 그림자를 드리우지 않는다. 그림자가 있는 쪽이 진짜다.'];
MEM.a_canyon = ['협곡의 물길', '흑천왕 곡달은 협곡 입구에 화약을 묻었다. 서쪽 마른 물길로 돌아 들면 그의 등 뒤로 나온다.'];

/* ---- 죽음 · 업적 ---- */
DEATHS.a_poison = ['독무 속에서', '녹색 안개가 폐를 채웠다. 묘청의 웃음소리가 멀어지며 손끝부터 감각이 사라졌다.'];
DEATHS.a_ghost = ['달 없는 밤', '베어도 베어도 가면만 갈라졌다. 등 뒤에서 들어온 칼은 끝내 보지 못했다.'];
DEATHS.a_canyon = ['흑천협에서', '협곡이 무너지는 소리가 마지막이었다. 곡달의 검은 깃발이 당신의 몸 위로 펄럭였다.'];
DEATHS.a_raid = ['검은 해 아래서', '흑천맹 도부수의 도끼가 어깨를 갈랐다. 이름 없는 길가에 당신이 누웠다.'];
ACH.a_rival = ['맞수', '첫 라이벌 혁련무를 공개 비무에서 꺾었다'];
ACH.a_three = ['세 개의 가면', '흑천맹의 세 부하를 모두 쓰러뜨렸다'];
ACH.a_canyon = ['흑천협의 승자', '흑천왕 곡달을 협곡에서 쓰러뜨렸다'];

/* ---- 작은 도구 ---- */
function a_q(p) { var q = qiPct(p); S.qi += q; return q; }
function a_s(n) { var g = price(Math.round(n * (1 + S.realm * .3))); S.silver += g; return g; }
function a_mad(n) { S.mad = clamp(S.mad + n, 0, 100); return n; }
function a_heal(p) { S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * p)); }
function a_tr(k, n) { S.trust[k] = tr(k) + n; }
function a_spar(id, tier, title, win, lose, o) {
  o = o || {};
  fight(id, tier, { auto: true, spar: true, title: title, heal: o.heal || 0, hpMul: o.hpMul || 1, win: win,
    lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); lose(); } });
}
function a_rv() { return S.flags.a_rvName || '혁련무'; }
function a_place() { return W(pick(['혈월봉 아래', '총단 외곽', '마교 변방 지부']), pick(['맹의 외곽 성채', '장강 나루', '맹 산하 표국']), pick(['고갯길 객잔', '나루터 마을', '변방 장터'])); }

/* =====================================================================
   E1 재편 (37~120개월)
   ===================================================================== */

/* ---- 40: 새 세계의 첫 해 ---- */
EVENTS.push({ m: 40, id: 'a_firstyear', run: function () {
  var w = worldOf(), F = S.flags, top = ['throne', 'cheonma', 'maengju'].indexOf(S.path) >= 0;
  var body, ch;
  if (w === 'ma') {
    body = ps('장로회가 다시 열렸다. 불탄 대전 대신 외당 창고를 비워 탁자를 놓았다. 장로 아홉 중 넷이 살아 있었다.',
      top ? '상석은 당신 자리다. 그래도 노인들은 당신이 아니라 서로를 보며 말했다. 시종 출신 교주에게 머리를 숙이는 법을 아직 모른다.' : '당신은 ' + esc(S.rank || '호교') + '의 자리에 섰다. 노인들의 시선이 한 번씩 당신의 칼을 훑고 지나갔다.',
      '의제는 셋이었다. 무너진 산문, 비어 버린 곳간, 그리고 누가 다음을 잇느냐.');
    ch = [
      { t: '곳간부터 채우자고 말한다', h: '은전 + · 장로들이 당신을 계산하기 시작한다', f: function () { var g = a_s(60); F.a_e1 = 'order'; done('산 아래 상단과 다시 길을 텄다. 첫 수레가 들어오던 날, 장로 둘이 처음으로 당신에게 술을 따랐다. 은전 <b>' + g + '</b>냥.', 'item'); } },
      { t: '말없이 연무장으로 나간다', h: '내공 + · 칼이 먼저 말하게 한다', f: function () { var q = a_q(.04); F.a_e1 = 'blade'; done('회의가 끝나기 전에 자리를 떴다. 그날 밤 연무장의 불은 새벽까지 꺼지지 않았다. 다음 회의에서는 아무도 당신 말을 끊지 않았다. 내공 +' + q, 'qi'); } },
      { t: '살아남은 교도들의 이름을 적는다', h: '마기 - · 옛 인연과 가까워진다', f: function () { a_mad(-15); F.a_e1 = 'people'; ['yn', 'dg', 'hr'].forEach(function (k) { if (alive(k)) a_tr(k, 1); }); done('사흘 동안 숙소를 돌며 이름을 받아 적었다. 이름 없는 시종이었던 당신이, 남의 이름을 적고 있었다.', 'people'); } }];
  } else if (w === 'jeong') {
    body = ps('무림맹 대회의청의 기둥은 흰 칠을 새로 했다. 칠 냄새 아래로 오래된 의심이 그대로 배어 있었다.',
      top ? '맹주의 자리에 앉은 첫 해다. 원로들은 예를 갖추면서도 마교에서 온 맹주라는 말을 등 뒤에서 했다.' : '마교에서 넘어온 칼. 맹 안에서 당신을 부르는 이름은 여전히 그것이다. ' + (alive('nj') ? '남궁진만이 당신을 이름으로 부른다.' : '이름으로 불러 줄 사람은 없다.'),
      '이번 회의의 의제는 청룡대 대주의 자리였다. 젊은 검객들의 눈빛이 그 의자를 향해 있었다.');
    ch = [
      { t: '원로들을 찾아가 머리를 숙인다', h: '은전 + · 정치를 배운다', f: function () { var g = a_s(60); F.a_e1 = 'order'; done('예물을 들고 원로의 집을 하나씩 돌았다. 웃는 얼굴로 문을 닫는 법을 배웠다. 돌아올 때 손에는 은전 <b>' + g + '</b>냥의 녹봉 문서가 있었다.', 'item'); } },
      { t: alive('nj') ? '남궁진의 새벽 수련에 끼어든다' : '홀로 새벽 수련을 시작한다', h: '내공 + · 검으로 증명한다', f: function () { var q = a_q(.04); F.a_e1 = 'blade'; if (alive('nj')) a_tr('nj', 1); done('새벽 이슬이 마르기 전에 검을 천 번 휘둘렀다. 의심은 줄지 않았지만, 아무도 당신의 검을 우습게 보지는 못했다. 내공 +' + q, 'qi'); } },
      { t: '하급 무사들과 밥을 먹는다', h: '마기 - · 사람을 얻는다', f: function () { a_mad(-15); F.a_e1 = 'people'; done('하급 무사들의 식당에서 국을 떠먹었다. 처음엔 자리가 비었고, 한 달 뒤엔 당신 옆자리가 먼저 찼다.', 'people'); } }];
  } else {
    body = ps('객잔 마당의 나무판에 청부 쪽지가 빼곡했다. 산적 토벌, 표물 호위, 사람 찾기. 셋 중 하나는 거짓이고 하나는 함정이다.',
      F.fleeWith && alive('yn') ? '연이가 쪽지를 떼어 읽어 주었다. 글을 배운 지 반년, 이제 당신보다 빨리 읽는다.' : '혼자 쪽지를 읽었다. 이름 없는 사람에게 일을 주는 곳은 이런 데밖에 없다.',
      '이 근방에서 당신을 아는 사람은 아직 없다. 이름은 이제부터 얻어야 한다.');
    ch = [
      { t: '돈이 되는 표물 호위를 맡는다', h: '은전 + · 상인들과 안면을 튼다', f: function () { var g = a_s(60); F.a_e1 = 'order'; done('보름 동안 소금 수레를 따라 걸었다. 산적은 한 번 나왔고, 한 번 만에 끝났다. 은전 <b>' + g + '</b>냥.', 'item'); } },
      { t: '산적 토벌을 맡는다', h: '내공 + · 칼로 이름을 얻는다', f: function () { var q = a_q(.04); F.a_e1 = 'blade'; done('산채 하나를 혼자 정리했다. 다음 날부터 객잔 주인이 당신에게 술값을 받지 않았다. 내공 +' + q, 'qi'); } },
      { t: '사람 찾기를 맡는다', h: '마기 - · 남의 사연을 듣는다', f: function () { a_mad(-15); F.a_e1 = 'people'; done('집 나간 아들을 찾아 달라는 노파의 청이었다. 찾았고, 데려왔다. 노파가 당신 손을 오래 잡고 놓지 않았다.', 'people'); } }];
  }
  scene(W('장로회', '흰 기둥 아래', '청부판'), body, ch, w === 'jeong' ? 'alliance' : (w === 'ma' ? 'throne' : 'loc_village'));
} });

/* ---- 50: 첫 라이벌, 혁련무 ---- */
EVENTS.push({ m: 50, id: 'a_rival1', run: function () {
  var F = S.flags; F.a_rvMet = 1;
  var who = W('장로 혁련상의 손자 혁련무. 장로회의 절반이 다음 자리에 그를 밀고 있었다.', '화산 속가 출신의 쾌검 혁련무. 청룡대 대주 자리를 두고 당신과 이름이 나란히 오르내렸다.', '백발귀라 불리는 젊은 칼잡이 혁련무. 당신이 맡으려던 청부를 하루 먼저 채 갔다.');
  var body = ps(who, '스물을 갓 넘긴 얼굴, 머리카락이 이상할 만큼 희었다. 그는 당신을 보자 웃었다.',
    '“소문만큼은 하나 보군. 한 수 보자. 진검은 아니어도 된다. 나는 지는 걸 싫어하지만, 모르는 건 더 싫거든.”');
  var ch = [
    { t: '목검을 받아 든다', h: hasMem('a_rival') ? '[기억] 오른쪽 어깨의 틈을 안다 · 비무' : '비무 · 져도 죽지 않는다', c: 'primary', f: function () {
      a_spar('a_rival', et() * .9, '혁련무와의 첫 비무', function () { var q = a_q(.035); F.a_rvWin1 = 1; learnMem('a_rival'); done('쾌검 끝에서 그의 오른쪽 어깨가 반 박자 늦었다. 목검이 그의 손목을 쳤다. 혁련무는 떨어진 목검을 오래 내려다보다 웃었다. “다음엔 진검이다.” 내공 +' + q, 'fight'); },
        function () { var q = a_q(.015); F.a_rvLose1 = 1; learnMem('a_rival'); done('목검이 목젖 앞에서 멈췄다. “생각보다 느리군.” 그가 등을 돌릴 때 오른쪽 어깨가 살짝 처지는 게 보였다. 그 틈을 기억해 두었다. 내공 +' + q, 'fail'); },
        { hpMul: hasMem('a_rival') ? .75 : 1 }); } },
    { t: '“지금은 때가 아니다.”', h: '마기 + · 그는 당신을 얕본다', f: function () { a_mad(6); F.a_rvDecline = 1; done('혁련무는 어깨를 으쓱하고 돌아섰다. 다음 날, 당신이 겁을 먹었다는 소문이 ' + W('장로회', '청룡대', '객잔') + '에 돌았다.', 'event'); } },
    { t: '술을 한잔 권한다', h: '은전 - · 그의 사람됨을 본다', off: S.silver < price(30) ? '은전이 모자란다' : null, f: function () { S.silver -= price(30); F.a_rvDrink = 1; a_mad(-8); done('칼 대신 잔을 부딪쳤다. 혁련무는 술이 약했다. 취해서 말했다. 할아버지는 이기는 것밖에 가르치지 않았다고. 지면 밥을 굶겼다고.', 'people'); } }];
  scene('흰 머리의 사내', body, ch, 'arena');
} });

/* ---- 58: 옛 인연의 근황 ---- */
EVENTS.push({ m: 58, id: 'a_oldfaces', run: function () {
  var F = S.flags, lines = [], ch = [];
  if (alive('yn')) {
    lines.push(F.fleeWith ? '연이는 요즘 장터에서 바느질 삯일을 받는다. 손이 빨라 찾는 사람이 많다.' : W('연이는 시종 숙소를 나와 외당 부엌을 맡았다. 이제 시종들이 그녀를 누님이라 부른다.', '연이에게서 서신이 왔다. 혈월봉 아래 마을에 작은 국숫집을 냈다고 했다.', '연이는 강 건너 마을에 산다. 한 철에 한 번, 짧은 편지가 온다.'));
    ch.push({ t: '연이를 찾아간다', h: '체력 · 마기 회복 · 신뢰 +1', f: function () { a_heal(.5); a_mad(-20); a_tr('yn', 1); done('연이가 국수를 말아 주었다. 고명이 넘치도록 올라가 있었다. “옛날엔 만두 하나도 나눠 먹었잖아.” 그녀가 웃었다.', 'people'); } });
  }
  if (alive('dg')) {
    lines.push(W('독고강은 외당 교관 자리를 다시 맡았다. 새로 들어온 아이들이 그의 목도에 매일 나동그라진다.', '독고강이 정파 국경 근처 산채에서 목도를 깎으며 산다는 소문이 들려왔다.', '독고강은 이름 없는 마을에서 아이들에게 칼을 가르친다. 돈은 받지 않는다고 한다.'));
    ch.push({ t: '독고강에게 한 수 청한다', h: '내공 + · 신뢰 +1', f: function () { var q = a_q(.03); a_tr('dg', 1); done('독고강의 목도가 세 번 당신의 어깨를 때렸다. 네 번째는 막았다. “이제 좀 칼 같군.” 내공 +' + q, 'qi'); } });
  }
  if (alive('hr')) {
    lines.push(W('홍란의 약당은 전쟁 뒤로 더 바빠졌다. 그녀의 손끝은 한층 검푸르다.', '홍란은 맹 산하 의방에 객원으로 와 있다. 마교 의원이라는 이유로 복도 끝 방을 받았다.', '홍란이 떠돌이 의원이 되어 이 근방을 돈다는 소식을 들었다.'));
    ch.push({ t: '홍란에게 진맥을 받는다', h: '회춘단 +1 · 마기 - · 신뢰 +1', f: function () { S.items.pill++; a_mad(-12); a_tr('hr', 1); done('홍란이 손목을 짚고 한참 말이 없었다. “맥이 고와졌어. 처음 본 그 시종 맞나 싶네.” 약 한 알을 쥐여 주었다.', 'people'); } });
  }
  if (!lines.length) {
    scene('빈자리', ps('옛 얼굴들의 안부를 묻고 싶었다. 물을 사람이 남아 있지 않았다.', '연이도, 독고강도, 홍란도 없다. 지난 봄들이 남긴 것은 이름 몇 개와 칼 한 자루뿐이다.'), [
      { t: '그들의 이름을 칼자루에 새긴다', h: '내공 + · 마기 +', f: function () { var q = a_q(.03); a_mad(5); done('칼자루에 이름 셋을 새겼다. 쥘 때마다 손바닥에 걸린다. 내공 +' + q, 'qi'); } },
      { t: '술 한 병을 땅에 붓는다', h: '마기 -', f: function () { a_mad(-15); done('한 병을 땅에 부었다. 땅은 아무 말도 하지 않았다.', 'rest'); } }], 'night');
    return;
  }
  ch.push({ t: '안부만 듣고 수련으로 돌아간다', h: '내공 소량', f: function () { var q = a_q(.012); done('살아 있다는 소식만으로 충분했다. 칼을 다시 쥐었다. 내공 +' + q, 'qi'); } });
  scene('옛 얼굴들', ps('스물한 살의 가을. 지나간 봄의 얼굴들이 어디서 무엇을 하는지 하나씩 소식이 들려왔다.').concat(lines.map(function (x) { return '<p>' + x + '</p>'; }).join('')), ch, 'dawn');
} });

/* ---- 68: 흑천맹의 첫 소문 ---- */
EVENTS.push({ m: 68, id: 'a_blacksun', run: function () {
  var F = S.flags;
  var body = ps(a_place() + '으로 가는 길목에서 상단 하나가 통째로 털렸다. 짐도 사람도 없었다. 수레 바퀴 자국만 북쪽으로 길게 이어졌다.',
    '부서진 수레 판자에 검은 칠로 해 하나가 그려져 있었다. 테두리만 있고 속은 빈, 검은 해.',
    '“흑천(黑天)이오.” 늙은 마부가 떨며 말했다. “사파 놈들이 하나로 뭉쳤다는 소문이 있소. 우두머리를 흑천왕이라 부른다더군.”');
  var ch = [];
  if (hasMem('a_mark')) ch.push({ t: '구경꾼 속에서 소매를 걷은 자를 찾는다', h: '[기억] 검은 해의 표식 · 척후를 먼저 잡는다', c: 'primary', f: function () {
    a_spar('a_scout', et() * .7, '흑천맹 척후', function () { var g = a_s(50), q = a_q(.03); F.a_intel = 1; F.a_markSeen = 1; done('구경꾼 틈에 섞여 있던 사내의 소매 안쪽에 검은 해가 있었다. 도망치기 전에 덮쳤다. 품에서 상단 이동표와 은전 <b>' + g + '</b>냥이 나왔다. 흑천맹이 무엇을 노리는지 처음으로 알았다. 내공 +' + q, 'fight'); },
      function () { F.a_markSeen = 1; done('표식은 알아봤지만 놓쳤다. 척후는 지붕을 넘어 사라졌다.', 'fail'); }, { hpMul: .7 }); } });
  ch.push({ t: '바퀴 자국을 따라간다', h: '전투 · 흑천맹의 정체를 엿본다', f: function () {
    a_spar('a_scout', et() * .85, '북쪽 길의 매복', function () { var q = a_q(.03); learnMem('a_mark'); F.a_markSeen = 1; done('매복한 자를 쓰러뜨리고 소매를 걷었다. 안쪽 살갗에 검은 해가 새겨져 있었다. 이 표식을 기억해 두기로 했다. 내공 +' + q, 'fight'); },
      function () { learnMem('a_mark'); done('매복에 걸려 굴러떨어졌다. 정신을 잃기 전, 내려다보는 자의 소매 안쪽에서 검은 해를 보았다.', 'fail'); }); } });
  ch.push({ t: '마부에게 소문을 산다', h: '은전 - · 이름 하나를 듣는다', off: S.silver < price(20) ? '은전이 모자란다' : null, f: function () { S.silver -= price(20); F.a_knowGok = 1; done('마부는 술 한 병 값에 이름 하나를 팔았다. 곡달. 산서의 녹림에서 일어난 사내로, 손으로 사람 머리를 쥐어 터뜨린다고 했다.', 'event'); } });
  ch.push({ t: '남의 일이다', h: '아무 일 없다', f: function () { done('부서진 수레를 지나쳤다. 검은 해가 등 뒤에서 당신을 보고 있는 것 같았다.', 'event'); } });
  scene('검은 해', body, ch, 'loc_border');
} });

/* ---- 78: 묵야의 죽음 ---- */
EVENTS.push({ m: 78, id: 'a_mukya', cond: function () { return alive('mk'); }, run: function () {
  var F = S.flags;
  pages('눈먼 노인의 겨울', [
    ps(W('묵야가 절벽 길 바위에서 내려오지 않은 지 사흘째였다.', '혈월봉에서 사람이 왔다. 묵야가 당신을 찾는다고 했다. 눈먼 노인이 사람을 찾는 것은 처음이었다.', '산길 초막에서 묵야를 다시 만났다. 어떻게 여기까지 왔는지 노인은 말하지 않았다.') + ' 노인의 손이 얼음처럼 차가웠다.',
      '“발소리가 무거워졌군. 좋은 일이다.” 묵야가 웃었다. “나는 이번 겨울을 못 넘긴다. 눈이 없으니 그런 건 잘 보이지.”'),
    ps('노인은 오래 말했다. 마흔 해 전의 싸움, 눈을 잃던 밤, 그 뒤로 보게 된 것들.', '“마지막으로 하나 주마. 이번에도 하나만 가져가거라.”')
  ], 'night', function () {
    var ch = [
      { t: '보지 않고 보는 법', h: '내공 크게 + · 마기 크게 -', f: function () { var q = a_q(.08); a_mad(-30); fin('묵야가 당신의 눈을 손바닥으로 덮었다. 어둠 속에서 바람이 어디로 도는지, 사람의 숨이 어디서 멈추는지 들렸다. 내공 +' + q); } },
      { t: '마지막 예언', h: '회귀해도 남는 지식 · 먼 앞날의 단서', f: function () { learnMem('a_omen'); F.a_omen = 1; var q = a_q(.03); fin('“검은 해가 뜨는 해, 협곡에서는 물소리를 따라가라.” 노인은 그 말만 세 번 되풀이했다. 무슨 뜻이냐고 묻자 웃기만 했다. 내공 +' + q); } }];
    if (!S.skills.gwiwon) ch.push({ t: '노인의 심법', h: '귀원심법을 배운다', f: function () { learn('gwiwon'); fin('묵야가 구결을 읊었다. 숨을 들이쉬는 법보다 내쉬는 법이 길었다. <b>귀원심법</b>을 얻었다.'); } });
    else ch.push({ t: '노인의 지팡이', h: '체력 영구 + · 신뢰의 증표', f: function () { S.hpBonus = (S.hpBonus || 0) + 10; fin('묵야가 지팡이를 내밀었다. “이제 나는 걸을 일이 없다.” 손때가 밴 나무가 이상하게 따뜻했다. 최대 체력 +10.'); } });
    scene('마지막 가르침', npcHead('mk') + '<p>“둘은 욕심이고, 하나도 안 가져가면 오만이다.” 처음 만났을 때와 같은 말이었다.</p>', ch, 'night');
  });
  function fin(t) {
    S.flags.mkDead = true;
    result('묵야', '<p>' + t + '</p><p>그 겨울 첫눈이 내린 아침, 묵야는 앉은 채로 숨을 거두었다. 얼굴은 정확히 혈월봉 쪽을 향해 있었다.</p><p>무덤 앞에 지팡이 자국 같은 선 하나를 그어 두었다.</p>', function () { done('묵야가 세상을 떠났다. 마지막 가르침이 몸에 남았다.', 'people'); }, 'death');
  }
} });

/* ---- 90: 혁련무와의 공개 비무 ---- */
EVENTS.push({ m: 90, id: 'a_rival2', run: function () {
  var F = S.flags, prev = F.a_rvWin1 ? '지난번에 진 뒤로 그는 하루도 쉬지 않았다고 한다.' : (F.a_rvLose1 ? '지난번 비무 이후 그는 당신을 아랫사람 대하듯 했다.' : (F.a_rvMet ? '그는 당신이 피했던 비무를 아직 기억하고 있었다.' : '처음 보는 흰 머리의 사내였지만 그는 당신을 잘 알고 있었다.'));
  F.a_rvMet = 1;
  var stake = W('다음 대 호법의 자리', '청룡대 대주의 자리', '천금 현상금이 걸린 녹림 두목의 목');
  var body = ps('스물네 살의 봄. ' + stake + '를 두고 혁련무와 다시 마주 섰다. 이번에는 구경꾼이 수백이다.', prev,
    '“진검이다.” 혁련무가 칼을 뽑았다. 칼날이 머리카락만큼이나 희었다. “죽이진 않는다. 다만 다시는 칼을 못 들게 해 주지.”');
  var ch = [
    { t: '정면으로 받는다', h: (hasMem('a_rival') ? '[기억] 어깨의 틈 · ' : '') + '비무 · 이기면 이름과 큰 보상', c: 'primary', f: function () {
      a_spar('a_rival', et() + .3, '혁련무 · 공개 비무', function () { var q = a_q(.06), g = a_s(120); F.a_rvBeat = 1; ach('a_rival'); learnMem('a_rival'); done('흰 칼이 하늘로 튀어 올랐다가 모래에 꽂혔다. 혁련무는 무릎을 꿇지 않았다. 대신 칼을 버려 두고 걸어 나갔다. 구경꾼의 함성이 한참 이어졌다. ' + stake + '는 당신의 것이 되었다. 내공 +' + q + ' · 은전 <b>' + g + '</b>냥', 'fight'); },
        function () { var q = a_q(.02); F.a_rvLost = 1; learnMem('a_rival'); a_mad(8); done('흰 칼이 허벅지를 그었다. 쓰러지는 당신 위로 혁련무가 말했다. “이게 너와 나의 차이다.” ' + stake + '는 그에게 갔다. 내공 +' + q, 'fail'); },
        { hpMul: hasMem('a_rival') ? .8 : 1 }); } },
    { t: '비무 전날 밤, 그의 숙소를 찾아간다', h: F.a_rvDrink ? '[인연] 술잔을 나눈 사이 · 다른 길을 연다' : '은전 - · 비무를 거래로 바꾼다', off: !F.a_rvDrink && S.silver < price(80) ? '은전이 모자란다' : null, f: function () {
      if (F.a_rvDrink) { F.a_rvFriend = 1; var q = a_q(.04); a_mad(-10); done('혁련무는 술을 꺼내 놓고 기다리고 있었다. “할아버지가 이기라고 했다. 근데 너랑은 이기는 걸로 끝내고 싶지 않아.” 둘이 합의했다. 비무는 무승부로 끝났고, 자리는 둘이 나눠 맡았다. 내공 +' + q, 'people'); }
      else { S.silver -= price(80); F.a_rvDeal = 1; a_mad(10); done('은전을 놓고 나왔다. 다음 날 혁련무는 오지 않았다. 사람들은 그가 겁을 먹었다고 수군댔다. 당신은 그 소문이 사실이 아니라는 것을 아는 유일한 사람이 되었다.', 'event'); } } },
    { t: '자리를 양보한다', h: '내공 + · 이름을 잃고 시간을 얻는다', f: function () { var q = a_q(.04); F.a_rvYield = 1; done('비무대에 오르지 않았다. 혁련무는 텅 빈 맞은편을 한참 노려보다 내려갔다. 그 한 달 동안 당신은 아무도 모르게 칼을 갈았다. 내공 +' + q, 'qi'); } }];
  scene('흰 칼', body, ch, 'arena');
} });

/* ---- 102: 연이의 가게 ---- */
EVENTS.push({ m: 102, id: 'a_yeon', cond: function () { return alive('yn'); }, run: function () {
  var F = S.flags;
  var body = ps(W('연이가 외당 부엌을 그만두겠다고 했다. 산 아래에 국숫집을 내고 싶다고.', '연이의 국숫집이 장사가 잘된다고 했다. 이제 옆 칸까지 넓히고 싶다는 편지가 왔다.', '연이가 나루터에 객잔을 내고 싶어 했다. 떠돌이들이 쉬어 갈 자리를.'),
    '“돈이 조금 모자라.” 그녀가 손가락을 꼽았다. “근데 너한테 달라는 건 아니야. 그냥 말하고 싶었어.”',
    '창밖으로 저녁 연기가 오르고 있었다. 스물다섯. 연이의 머리에 처음으로 흰 올이 하나 보였다.');
  var ch = [
    { t: '돈을 보탠다', h: '은전 -' + price(200) + ' · 상단 투자 +1 · 신뢰 +1', off: S.silver < price(200) ? '은전이 모자란다' : null, f: function () { S.silver -= price(200); S.estate = Math.min(10, (S.estate || 0) + 1); a_tr('yn', 1); F.a_ynShop = 1; done('연이는 받지 않으려 했다. 당신은 문서에 당신 이름도 적으라고 했다. 그녀가 처음으로 당신 이름을 큰 글씨로 썼다. 매달 조금씩 은전이 들어오게 되었다.', 'item'); } },
    { t: '간판을 직접 깎아 준다', h: '마기 크게 - · 신뢰 +1', f: function () { a_mad(-25); a_tr('yn', 1); F.a_ynShop = 1; done('칼로 나무를 깎는 것은 사람을 베는 것보다 오래 걸렸다. 사흘 만에 간판이 걸렸다. 연이가 그 앞에서 오래 서 있었다.', 'people'); } },
    { t: '“위험한 세상이다. 조금만 기다려.”', h: '내공 + · 연이가 서운해한다', f: function () { var q = a_q(.025); done('연이는 고개를 끄덕였다. 그날 저녁 밥상에 말이 없었다. 당신은 밤새 운기했다. 내공 +' + q, 'qi'); } }];
  scene('연이의 간판', body, ch, 'loc_village');
} });

/* ---- 112: 흑천맹의 사자 ---- */
EVENTS.push({ m: 112, id: 'a_envoy', run: function () {
  var F = S.flags;
  var body = ps('검은 옷의 사내가 찾아왔다. 소매를 걷지 않아도 알았다. 걸음이 녹림의 걸음이었다.',
    '“흑천왕께서 안부를 전하라 하셨소.” 사내가 상자 하나를 내려놓았다. 안에는 금덩이와 검은 비단이 들어 있었다.',
    '“곧 하늘이 바뀌오. ' + W('마교가 정파와 싸우느라 지쳤을 때', '정파가 늙은이들 싸움으로 썩었을 때', '이름 없는 칼들이 굶어 죽기 전에') + ' 우리 편에 서시오. 그러면 검은 하늘 아래서도 당신 자리는 남겨 두겠소.”');
  var ch = [
    { t: '상자를 걷어차고 칼을 뽑는다', h: '전투 · 흑천맹에 선을 긋는다', f: function () {
      a_spar('a_scout', et() * 1.05, '흑천맹 사자', function () { var q = a_q(.035); F.a_envoyCut = 1; done('사자는 반 토막 난 상자를 안고 달아났다. 그날 밤 당신의 이름이 흑천맹 장부에 붉은 먹으로 적혔다는 것을 나중에야 알았다. 내공 +' + q, 'fight'); },
        function () { F.a_envoyCut = 1; done('사자의 칼은 생각보다 빨랐다. 그는 피를 닦으며 말했다. “다음엔 사자가 아니라 군대가 올 거요.”', 'fail'); }); } },
    { t: '받는 척한다', h: '은전 + · 마기 + · 내부 사정을 듣는다', f: function () { var g = a_s(90); a_mad(10); F.a_feign = 1; F.a_intel = 1; done('금덩이를 받고 웃어 주었다. 사자는 신이 나서 떠들었다. 흑천왕 밑에 독, 창, 귀 세 장수가 있다고. 금 <b>' + g + '</b>냥어치가 손에 남았고, 입안이 썼다.', 'item'); } },
    { t: '상자를 돌려보낸다', h: '아무 일 없다 · 흑천왕의 이름을 기억한다', f: function () { F.a_knowGok = 1; done('상자를 닫아 돌려보냈다. 사자는 정중히 고개를 숙이고 떠났다. 정중함이 협박보다 더 불길했다.', 'event'); } }];
  scene('검은 비단', body, ch, 'night');
} });

/* ---- 119: 불길한 밤 (E2로) ---- */
EVENTS.push({ m: 119, id: 'a_fall', run: function () {
  var F = S.flags;
  var town = W('혈월봉 남쪽 관문 적수관', '맹의 북쪽 성채 청하보', '당신이 머물던 나루터 위쪽 마을 백석진');
  var body = ps('스물여섯의 겨울, 혈월이 떴다. 그 밤에 ' + town + '이(가) 무너졌다.',
    '검은 해를 그린 깃발이 수백 개였다. 성벽이 아니라 문이 열렸다. 안에서 누군가 빗장을 풀었다고 했다.',
    '살아 나온 자들이 같은 말을 했다. 깃발 맨 앞에 흰 머리의 젊은 검객이 있었다고. ' + (F.a_rvBeat ? '당신에게 졌던 그 사내.' : (F.a_rvFriend ? '당신과 술잔을 나눴던 그 사내.' : '당신이 아는 얼굴.')));
  var ch = [
    { t: '불길 속으로 달려간다', h: '전투 · 사람들을 구한다', c: 'primary', f: function () {
      a_spar('a_raider', et() * .9, '불타는 ' + town.split(' ').pop(), function () { var q = a_q(.04); F.a_saved = 1; a_mad(-10); done('도부수 셋을 베고 골목 하나를 열었다. 그 길로 아이들과 노인 마흔 명이 빠져나왔다. 새벽에 돌아보니 마을은 재가 되어 있었다. 내공 +' + q, 'fight'); },
        function () { a_mad(10); done('불길 앞에서 쓰러졌다. 깨어 보니 피란민의 수레 위였다. 구하러 간 사람이 구해졌다.', 'fail'); }, { heal: .2 }); } },
    { t: '높은 곳에서 적의 진형을 본다', h: '내공 + · 흑천맹의 싸움법을 익힌다', f: function () { var q = a_q(.04); F.a_intel = 1; done('불타는 마을을 내려다보며 깃발이 움직이는 순서를 외웠다. 셋으로 나뉘어 들어오고, 하나로 뭉쳐 빠져나갔다. 구하지 못한 사람들의 비명도 함께 외웠다. 내공 +' + q, 'qi'); } },
    { t: '연이와 옛 사람들부터 챙긴다', h: alive('yn') ? '체력 회복 · 신뢰 +1' : '마기 -', f: function () { if (alive('yn')) { a_tr('yn', 1); a_heal(.4); done('그 밤 내내 연이의 가게 문 앞에 서 있었다. 불길은 거기까지 오지 않았다. 새벽에 연이가 식은 국을 내왔다.', 'people'); } else { a_mad(-12); done('지킬 사람이 남아 있지 않았다. 그래서 피란민의 짐을 날랐다.', 'people'); } } }];
  scene('검은 해가 뜬 밤', body, ch, 'siege');
} });

/* =====================================================================
   E2 흑천맹 (121~216개월)
   ===================================================================== */

/* ---- 동료: 여협 소화 ---- */
addNpc('a_sohwa', { n: '소화', role: '떠돌이 여협', desc: '흑천맹에 가문을 잃은 검객. 웃을 때도 칼자루에서 손을 떼지 않는다.', world: ['ma', 'jeong', 'wander'], flag: 'a_sohwa_met', dead: 'a_sohwaGone' },
  function () {
    var line = pick(['소화는 칼날에 기름을 먹이고 있었다. 당신을 보고 손을 흔들었지만 다른 손은 칼에 있었다.', '소화가 지붕 위에서 술병을 흔들었다. “올라와. 오늘 달 괜찮아.”', '소화는 피란민 아이들에게 목검 쥐는 법을 가르치고 있었다. 아이들이 그녀를 누나라고 불렀다.']);
    scene('소화', npcHead('a_sohwa') + '<p>' + line + '</p>', [
      { t: '대련을 청한다', h: '내공 + · 체력을 잃을 수 있다', f: function () {
        fight('swordsman', et() * .9, { auto: true, spar: true, title: '소화와의 대련', win: function () { var q = a_q(.02); gain('a_sohwa', 1, '<p>소화의 검이 세 번 허공을 갈랐고 세 번 다 막혔다. “좋아. 그 정도면 같이 죽어도 덜 억울하겠네.” 내공 +' + q + '</p>'); },
          lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); var q = a_q(.01); gain('a_sohwa', 1, '<p>칼등이 옆구리를 쳤다. 소화가 웃으며 손을 내밀었다. “방금 그 수, 다시 해 봐. 거의 될 뻔했어.” 내공 +' + q + '</p>'); } }); } },
      { t: '지붕 위에서 술을 나눈다', h: '마기 - · 체력 회복', f: function () { a_mad(-15); a_heal(.2); gain('a_sohwa', 1, '<p>소화는 가문 이야기를 하지 않았다. 대신 어릴 적 먹던 떡 이야기를 길게 했다. 그 떡집도 이제 없다고 했다.</p>'); } },
      { t: '함께 순찰을 돈다', h: '은전 +', f: function () { var g = a_s(25); gain('a_sohwa', 1, '<p>흑천맹 잔당 둘을 잡아 관아에 넘겼다. 현상금은 반씩 나눴다. 은전 <b>' + g + '</b>냥.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { if (!S.skills.pageom) { learn('pageom'); result('파검식', npcHead('a_sohwa') + '<p>“상대 칼을 부수는 법이야. 우리 집안 거. 이제 물려줄 사람이 없어서.” 소화가 무심하게 말했다.</p><p><b>파검식</b>을 얻었다.</p>', d); } else { var q = a_q(.04); result('파검식의 요결', npcHead('a_sohwa') + '<p>소화가 당신의 파검식을 보더니 손목 각도 하나를 고쳐 주었다. “누구한테 배웠는지 몰라도 반은 틀렸어.” 내공 +' + q + '</p>', d); } } },
   { t: 4, run: function (d) { S.items.antidote += 2; S.flags.a_sohwaVow = 1; result('소화의 사연', npcHead('a_sohwa') + '<p>“우리 집은 독으로 망했어. 묘청이라는 여자야. 우물에 독을 풀고 사흘을 기다렸대. 사흘째에 문을 열고 들어왔지.”</p><p>그녀가 해독단 두 알을 내밀었다. “그 여자를 만나면 써. 나보다 네가 먼저 만날 것 같아서.”</p><p>해독단 +2</p>', d); } }]);

/* ---- 동료: 상인 금만석 ---- */
addNpc('a_geum', { n: '금만석', role: '전쟁 상인', desc: '배가 나온 사내. 웃는 낯으로 화살과 쌀을 같은 값에 판다.', world: ['ma', 'jeong', 'wander'], flag: 'a_geum_met', dead: 'a_geumGone' },
  function () {
    var line = pick(['금만석이 주판을 튕기다 고개를 들었다. “아이고, 우리 귀한 칼님.”', '금만석의 창고에는 화살 다발과 쌀가마가 천장까지 쌓여 있었다. 전쟁은 그에게 장마철 같은 것이다.', '금만석이 비단옷 소매로 땀을 닦았다. “요즘 길이 험해서 이문이 두 배요. 위험도 두 배지만.”']);
    var cost = price(40);
    scene('금만석', npcHead('a_geum') + '<p>' + line + '</p>', [
      { t: '창고 재료를 싸게 산다', h: '은전 -' + cost + ' · 정철 · 가죽 · 약초', off: S.silver < cost ? '은전이 모자란다' : null, f: function () { S.silver -= cost; addMat('iron', 2); addMat('hide', 2); addMat('herb', 2); gain('a_geum', 1, '<p>“다른 데선 이 값에 못 구하오. 칼님이니까.” 정철 2 · 짐승 가죽 2 · 약초 2를 받았다.</p>'); } },
      { t: '수레 호위를 맡는다', h: '은전 +', f: function () { var g = a_s(35); gain('a_geum', 1, '<p>금만석의 수레는 무사히 고개를 넘었다. 그는 품삯을 세며 혀를 찼다. “이 돈이면 무사 셋을 쓰는데.” 그래도 다 주었다. 은전 <b>' + g + '</b>냥.</p>'); } },
      { t: '그의 장사에 돈을 건다', h: '은전 -' + price(100) + ' · 두 배가 되거나 날아간다', off: S.silver < price(100) ? '은전이 모자란다' : null, f: function () { S.silver -= price(100); if (Math.random() < .55) { var g = price(210); S.silver += g; gain('a_geum', 1, '<p>소금 배가 무사히 들어왔다. 금만석이 은전 자루를 내밀었다. “이게 장사요.” 은전 <b>' + g + '</b>냥.</p>'); } else gain('a_geum', 1, '<p>배가 흑천맹에 털렸다. 금만석이 당신보다 더 크게 울었다. 진짜로 우는 것 같았다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { addMat('gem', 1); addMat('jade', 1); result('덤', npcHead('a_geum') + '<p>“단골한테는 덤이 있어야지.” 금만석이 비단 주머니를 던졌다. 보석 한 알과 옥정 하나가 들어 있었다.</p>', d); } },
   { t: 4, run: function (d) { S.estate = Math.min(10, (S.estate || 0) + 1); S.flags.a_geumSupply = 1; result('동업', npcHead('a_geum') + '<p>“동업합시다.” 금만석이 장부를 펼쳤다. 당신 이름이 이미 적혀 있었다. “칼님 이름만 걸어 두면 산적이 비켜 가오. 이문은 반씩.”</p><p>상단 투자 +1. 결전 때 보급을 대 주기로 했다.</p>', d); } }]);

/* ---- 122: 전쟁의 시작 · 소화 ---- */
EVENTS.push({ m: 122, id: 'a_war', run: function () {
  var F = S.flags;
  var body = ps(W('흑천맹이 마교 변방 지부 셋을 한 달 만에 삼켰다. 장로회는 처음으로 정파에 사신을 보내자는 말을 꺼냈다.', '흑천맹 토벌령이 내려졌다. 맹은 젊은 검객들로 토벌대를 꾸렸고, 당신의 이름이 맨 앞에 있었다.', '흑천맹이 마을마다 쌀과 사내를 내놓으라 했다. 내놓지 않은 마을은 다음 날 없었다.'),
    '스물일곱의 봄. 검은 해의 깃발이 ' + a_place() + '까지 내려왔다.',
    '마을 어귀에서 흑천맹 도부수 여럿이 한 사람을 둘러싸고 있었다. 붉은 끈으로 머리를 묶은 여인이었다. 그녀는 포위된 채로 웃고 있었다.');
  var join = function (txt) { meet('a_sohwa'); F.a_sohwa_met = true; a_tr('a_sohwa', 1); return txt + '<p>“소화야. 성은 버렸어.” 그녀가 칼을 털었다. “흑천맹이랑 싸울 거면 같이 가자. 혼자 죽긴 심심하거든.”</p>'; };
  var ch = [];
  if (hasMem('a_mark') || F.a_intel) ch.push({ t: '척후의 표식부터 찾아 끊는다', h: '[' + (hasMem('a_mark') ? '기억' : '정보') + '] 포위를 등 뒤에서 무너뜨린다', c: 'primary', f: function () {
    a_spar('a_raider', et() * .85, '포위를 끊다', function () { var q = a_q(.05), g = a_s(60); result('붉은 끈의 여인', join('<p>소매 안쪽에 검은 해를 새긴 자부터 베었다. 신호가 끊기자 포위가 무너졌다. 내공 +' + q + ' · 은전 <b>' + g + '</b>냥.</p>'), function () { done('흑천맹과의 전쟁이 시작되었다. 소화가 곁에 섰다.', 'people'); }); },
      function () { result('붉은 끈의 여인', join('<p>쓰러진 당신 앞을 그녀가 막아섰다. 둘이서 겨우 빠져나왔다.</p>'), function () { done('흑천맹과의 전쟁이 시작되었다. 소화가 곁에 섰다.', 'people'); }); }, { hpMul: .7 }); } });
  ch.push({ t: '포위 안으로 뛰어든다', h: '전투 · 그녀와 등을 맞댄다', f: function () {
    a_spar('a_raider', et(), '검은 해의 포위', function () { var q = a_q(.04); result('붉은 끈의 여인', join('<p>그녀와 등을 맞대고 열을 셌을 때, 서 있는 흑천맹은 없었다. 내공 +' + q + '</p>'), function () { done('흑천맹과의 전쟁이 시작되었다. 소화가 곁에 섰다.', 'people'); }); },
      function () { result('붉은 끈의 여인', join('<p>도끼 자루에 머리를 맞고 쓰러졌다. 깨어 보니 그녀가 당신을 업고 있었다.</p>'), function () { done('흑천맹과의 전쟁이 시작되었다. 소화가 곁에 섰다.', 'people'); }); }, { heal: .15 }); } });
  ch.push({ t: '지켜본다', h: '그녀의 솜씨를 본다 · 내공 소량', f: function () { var q = a_q(.015); result('붉은 끈의 여인', join('<p>그녀는 혼자 일곱을 베었다. 여덟째가 등 뒤로 돌 때 당신이 돌을 던졌다. 그녀가 고개를 돌려 당신을 보았다. 내공 +' + q + '</p>'), function () { done('흑천맹과의 전쟁이 시작되었다. 소화가 곁에 섰다.', 'people'); }); } });
  scene('검은 해의 전쟁', body, ch, 'siege');
} });

/* ---- 132: 상인 금만석 ---- */
EVENTS.push({ m: 132, id: 'a_geum1', run: function () {
  var F = S.flags;
  var body = ps('흑천맹이 남북 상로를 막았다. 쌀값이 세 배가 되었다. ' + W('총단의 곳간이 다시 비어 가기 시작했다.', '맹의 군량 장부에 빨간 줄이 늘었다.', '객잔 주인이 밥 한 그릇 값을 두 번 올렸다.'),
    '그때 배가 나온 사내 하나가 수레 서른 대를 끌고 나타났다. 비단옷에 진흙이 무릎까지 튀어 있었다.',
    '“금만석이오. 흑천협 옆 샛길로 왔소.” 그가 웃었다. “다음 수레는 백 대요. 다만 길을 지켜 줄 칼이 필요하오. 칼값은 쌀로 치르겠소.”');
  var go = function (t) { meet('a_geum'); F.a_geum_met = true; a_tr('a_geum', 1); done(t, 'people'); };
  var ch = [
    { t: '샛길을 지켜 준다', h: '전투 · 은전 · 재료 · 금만석과 인연', c: 'primary', f: function () {
      a_spar('a_scout', et() * .9, '샛길의 매복', function () { var g = a_s(80); addMat('iron', 2); addMat('herb', 3); go('샛길 매복을 걷어 냈다. 수레 백 대가 무사히 넘어왔다. 금만석이 은전 <b>' + g + '</b>냥과 정철 · 약초를 내밀었다. “칼님, 앞으로도 잘 부탁하오.”'); },
        function () { var g = a_s(25); go('수레 열 대를 잃었다. 금만석은 화를 내지 않았다. “아흔 대면 남는 장사요.” 은전 <b>' + g + '</b>냥.'); }); } },
    { t: '샛길 이야기를 캐묻는다', h: '협곡 지리를 듣는다 · 금만석과 인연', f: function () { F.a_canyonPath = 1; go('금만석은 흑천협 옆 마른 물길을 손가락으로 그려 보였다. “여기 물이 마른 지 십 년이오. 흑천맹 놈들은 길이 아니라고 생각하지.” 그 그림을 머릿속에 새겨 두었다.'); } },
    { t: '쌀값을 올려 받는 그를 꾸짖는다', h: '마기 - · 금만석이 머리를 긁는다', f: function () { a_mad(-10); go('“장사꾼이 이문을 안 남기면 누가 다음 수레를 끌고 오겠소.” 금만석이 머리를 긁었다. 그래도 그날부터 피란민에게는 쌀을 반값에 팔았다.'); } }];
  scene('수레 서른 대', body, ch, 'loc_village');
} });

/* ---- 142: 독왕 묘청 ---- */
EVENTS.push({ m: 142, id: 'a_dok', run: function () {
  var F = S.flags;
  var body = ps('강가 마을 셋의 우물이 한꺼번에 썩었다. 사람들은 물을 마신 지 사흘째에 쓰러졌다.',
    '독왕 묘청. 흑천맹 세 장수의 첫째. 녹색 비단을 입은 늙지 않는 여인이라고 했다. ' + (F.a_sohwaVow ? '소화의 가문을 멸한 그 여자다.' : ''),
    '마을 어귀에 들어서자 땅에서 녹색 안개가 올라왔다. 안개 속에서 웃음소리가 들렸다. “어서 와요. 숨은 천천히 쉬는 게 좋아.”');
  var hp = 1, pre = '';
  var go = function () {
    fight('a_dok', et() + .5, { auto: true, title: '독왕 묘청', hpMul: hp,
      win: function () { learnMem('a_dok'); F.a_dokDown = 1; var q = a_q(.07); S.items.antidote += 2; addMat('herb', 4); addMat('jade', 1); if (F.a_sohwa_met && alive('a_sohwa')) a_tr('a_sohwa', 1);
        done(pre + '녹색 비단이 진흙 위에 내려앉았다. 묘청은 죽으면서도 웃었다. “독은 바람을 못 이겨. 너는 운이 좋았던 거야.” 안개가 걷히자 마을에 다시 바람이 불었다. 내공 +' + q + ' · 해독단 +2', 'fight'); },
      lose: function () { learnMem('a_dok'); die('a_poison'); } });
  };
  var ch = [];
  if (hasMem('a_dok')) ch.push({ t: '바람을 등지고 선다', h: '[기억] 독무가 닿지 않는다 · 치명적 전투', c: 'primary', f: function () { hp = .7; pre = '바람을 등졌다. 녹색 안개가 당신 앞에서 멈칫하더니 묘청 쪽으로 흘러갔다. '; go(); } });
  if (S.items.antidote > 0) ch.push({ t: '해독단을 삼키고 들어간다', h: '해독단 -1 · 치명적 전투', f: function () { S.items.antidote--; hp = .9; pre = '쓴 환약이 목을 넘어가자 폐가 조금 버텼다. '; go(); } });
  if (F.a_sohwa_met && tr('a_sohwa') >= 2 && alive('a_sohwa')) ch.push({ t: '소화와 함께 들어간다', h: '[동료] 체력 회복 · 치명적 전투', f: function () { a_heal(.3); hp = .85; pre = '소화가 앞장서 안개를 갈랐다. 그녀의 칼끝이 떨리고 있었다. '; go(); } });
  ch.push({ t: '숨을 참고 정면으로 들어간다', h: '체력 -20% · 치명적 전투', f: function () { hurt(.2); pre = '안개가 살갗을 태웠다. 숨을 참은 채로 칼을 뽑았다. '; go(); } });
  ch.push({ t: '물러나 마을 사람들부터 옮긴다', h: '싸우지 않는다 · 마기 - · 독왕은 살아남는다', f: function () { a_mad(-10); F.a_dokFled = 1; learnMem('a_dok'); done('사흘 동안 쓰러진 사람들을 등에 업고 바람 부는 언덕으로 옮겼다. 언덕 위에서는 독이 닿지 않았다. 바람을 등지면 된다는 것을, 그때 알았다.', 'people'); } });
  scene('녹색 안개', body, ch, 'loc_forest');
} });

/* ---- 152: 한서생의 죽음 ---- */
EVENTS.push({ m: 152, id: 'a_hanseo', cond: function () { return !S.flags.hsDead; }, run: function () {
  var F = S.flags, known = !!F.hs;
  var place = W('마교 서고', '맹의 장경각', '강가 서원');
  var body = ps('흑천맹이 ' + place + '에 불을 질렀다. 무공서가 아니라 장부와 지도를 노린 불이었다.',
    known ? '불길 속에서 한서생이 책을 안고 나오지 않았다. 서고의 책을 모두 외운다던 그 서생이다.' : '불길 속에 늙은 서생 하나가 남아 있다고 했다. 한서생. 서고의 책을 모두 외운다는 사람이다.',
    '들어가면 지붕이 무너질 것이다. 들어가지 않으면 그도, 책도 남지 않는다.');
  var end = function (t, k) { F.hsDead = true; done(t, k); };
  var ch = [
    { t: '불길 속으로 뛰어든다', h: '체력 -30% · 그의 마지막 말을 듣는다', c: 'primary', f: function () { hurt(.3); F.a_hsNote = 1;
      pages('타는 서고', [ps('기둥 하나를 베어 넘기고 들어갔다. 한서생은 서가 아래 깔려 있었다. 다리가 이미 없었다.', '“왔구나.” 그가 품에서 그을린 책 한 권을 꺼냈다. “귀면의 장부다. 흑천맹 놈들이 이걸 찾으러 불을 질렀어.”'),
        ps('“그놈의 분신은 등불 앞에서 그림자가 없다. 기록에 그렇게 적혀 있어. 나는 다 외우고 있었는데, 이제는 네가 외워야겠다.”', '그는 웃었다. “이 책은 네가 쓴 거냐? 아니, 곧 쓰게 되겠지.” 그것이 마지막 말이었다.')], 'burn',
        function () { learnMem('a_gwi'); end('한서생이 불 속에서 죽었다. 그가 지킨 장부 한 권이 품에 남았다. 귀면 사공혼의 비밀이 적혀 있었다.', 'people'); }); } },
    { t: '불을 끄고 남은 책을 건진다', h: '내공 + · 재료 · 그는 돌아오지 않는다', f: function () { var q = a_q(.04); addMat('jade', 1); end('밤새 물을 날랐다. 새벽에 잿더미에서 그을린 책 몇 권을 건졌다. 한서생은 서가 아래에서 책을 끌어안은 채 발견되었다. 내공 +' + q, 'fail'); } },
    { t: '불을 지른 자들을 쫓는다', h: '전투 · 복수', f: function () {
      a_spar('a_raider', et(), '방화범 추격', function () { var g = a_s(70), q = a_q(.03); F.a_intel = 1; end('방화범 다섯을 강가에서 잡았다. 그중 하나의 짐에 귀면의 인장이 찍힌 명령서가 있었다. 돌아왔을 때 서고는 재가 되어 있었다. 은전 <b>' + g + '</b>냥 · 내공 +' + q, 'fight'); },
        function () { end('방화범들은 강을 건너 사라졌다. 돌아왔을 때 서고는 재가 되어 있었다. 한서생도.', 'fail'); }); } }];
  scene('불타는 ' + place, body, ch, 'burn');
} });

/* ---- 162: 창귀 위진 ---- */
EVENTS.push({ m: 162, id: 'a_chang', run: function () {
  var F = S.flags;
  var body = ps('흑천맹 두 번째 장수, 창귀 위진이 진 앞에 혼자 나와 섰다. 장창 한 자루를 땅에 꽂고 외쳤다.',
    '“군사끼리 싸우면 백이 죽는다. 장수끼리 싸우면 하나만 죽지. 나와라. ' + (S.rank ? esc(S.rank) + '이라는 자.' : '이름 있는 자.') + '”',
    '키가 일곱 자. 창끝에 붉은 술이 달려 있었다. 사람들은 그가 세 번 찌르면 성문도 뚫린다고 했다. ' + (F.a_dokDown ? '독왕이 쓰러진 뒤로 그는 하루도 진을 비우지 않았다.' : ''));
  var reward = function (spared) { var q = a_q(.065); addMat('iron', 4); addMat('gem', 1); F.a_changDown = 1; learnMem('a_chang');
    if (F.a_dokDown && F.a_gwiDown) ach('a_three');
    done((spared ? '위진의 창이 부러졌다. 그는 칼을 받으려 목을 내밀었다. 당신은 칼을 거두었다. 그는 한참 당신을 보다가 부러진 창을 버리고 진을 떠났다. 흑천맹은 장수 하나를 잃었다.' : '세 번째 찌르기가 오기 전에 안으로 파고들었다. 창대가 꺾였고, 위진이 무릎을 꿇었다. “좋은 싸움이었다.” 그는 그 말을 남기고 쓰러졌다.') + ' 내공 +' + q, 'fight'); };
  var duel = function (hm, spared) {
    fight('a_chang', et() + .5, { auto: true, spar: true, title: '창귀 위진', hpMul: hm, win: function () { reward(spared); },
      lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .25)); learnMem('a_chang'); F.a_changLost = 1; done('창끝이 가슴 앞 한 치에서 멈췄다. “장수끼리의 싸움은 하나만 죽는다고 했지. 오늘은 아무도 안 죽는다.” 위진이 창을 거두었다. 그가 세 번째 찌르기 전에 왼발을 끄는 것을, 쓰러지며 보았다.', 'fail'); } });
  };
  var ch = [];
  if (hasMem('a_chang')) ch.push({ t: '세 번째 찌르기를 기다린다', h: '[기억] 왼발을 끄는 순간 · 비무', c: 'primary', f: function () { duel(.7, false); } });
  ch.push({ t: '진 앞으로 걸어 나간다', h: '장수끼리의 결투 · 져도 그는 죽이지 않는다', f: function () { duel(1, false); } });
  ch.push({ t: '“목숨은 걸지 말자.”', h: '이기면 그를 살려 보낸다 · 결투', f: function () { duel(.95, true); } });
  ch.push({ t: '나가지 않는다', h: '마기 + · 흑천맹의 사기가 오른다', f: function () { a_mad(8); F.a_changSkip = 1; done('진문을 닫았다. 위진은 해가 질 때까지 서 있다가 돌아갔다. 그날 밤 적진에서 북소리가 오래 울렸다.', 'event'); } });
  scene('창 한 자루', body, ch, 'arena');
} });

/* ---- 172: 귀면 사공혼 ---- */
EVENTS.push({ m: 172, id: 'a_gwi', run: function () {
  var F = S.flags;
  var body = ps('달 없는 밤이었다. ' + W('장로 둘이', '맹의 원로 둘이', '함께 싸우던 협객 둘이') + ' 같은 밤에 목이 없어졌다. 문은 안에서 잠겨 있었다.',
    '흑천맹 세 번째 장수, 귀면 사공혼. 얼굴 대신 웃는 가면을 쓰고, 한 번에 여섯 곳에 나타난다고 했다.',
    '그리고 오늘 밤, 당신의 방 등불이 저절로 흔들렸다. 문밖에 웃는 가면이 여섯 개 떠 있었다.');
  var know = hasMem('a_gwi') || F.a_hsNote;
  var go = function (hm, pre) {
    fight('a_gwi', et() + .5, { auto: true, title: '귀면 사공혼', hpMul: hm,
      win: function () { learnMem('a_gwi'); F.a_gwiDown = 1; var q = a_q(.07), g = a_s(100); addMat('bone', 3); if (F.a_dokDown && F.a_changDown) ach('a_three');
        done(pre + '가면 하나가 갈라지자 나머지 다섯이 한꺼번에 꺼졌다. 가면 아래에는 평범한 중년 사내의 얼굴이 있었다. 너무 평범해서 오래 기억나지 않을 얼굴이었다. 내공 +' + q + ' · 은전 <b>' + g + '</b>냥', 'fight'); },
      lose: function () { learnMem('a_gwi'); die('a_ghost'); } });
  };
  var ch = [];
  if (know) ch.push({ t: '등불을 들고 그림자를 본다', h: '[' + (hasMem('a_gwi') ? '기억' : '한서생의 장부') + '] 진짜 몸을 찾는다 · 치명적 전투', c: 'primary', f: function () { go(.65, '등불을 높이 들었다. 가면 여섯 중 하나만 벽에 그림자를 드리웠다. 그쪽으로 칼을 뻗었다. '); } });
  ch.push({ t: '가면들을 차례로 벤다', h: '치명적 전투', f: function () { go(1, '베고, 또 베었다. 다섯 번째 가면에서 칼끝에 살이 걸렸다. '); } });
  if (F.a_sohwa_met && alive('a_sohwa')) ch.push({ t: '소화와 등을 맞댄다', h: '[동료] 등 뒤를 맡긴다 · 치명적 전투', f: function () { a_heal(.25); go(.85, '소화가 등 뒤를 맡았다. 뒤에서 오는 칼을 그녀가 막는 동안 앞만 보았다. '); } });
  ch.push({ t: '등불을 끄고 창문으로 빠져나간다', h: '싸우지 않는다 · 마기 + · 그는 살아남는다', f: function () { a_mad(12); F.a_gwiFled = 1; done('어둠 속에서 지붕을 타고 달아났다. 뒤에서 웃음소리가 따라왔다. 다음 날 아침, 방 안의 등불 옆 벽에 칼자국이 하나만 나 있었다. 여섯이 아니라 하나.', 'fail'); } });
  scene('웃는 가면', body, ch, 'night');
} });

/* ---- 185: 흑천맹의 흰 칼 ---- */
EVENTS.push({ m: 185, id: 'a_rival3', run: function () {
  var F = S.flags, bond = F.a_rvFriend || F.a_rvDrink, beat = F.a_rvBeat;
  var body = ps('흑천맹 진영 앞 개울가. 흰 머리의 사내가 혼자 물을 마시고 있었다. 혁련무였다.',
    W('그의 할아버지 혁련상은 장로회에서 쫓겨난 뒤 흑천왕에게 문을 열어 주었다. 손자는 그 문으로 따라 나갔다.', '청룡대 대주가 되지 못한 날, 그는 맹을 떠났다. 맹은 그를 배신자로 적었다.', '청부판에서 이름을 다투던 칼잡이는 이제 흑천왕의 호위대장이 되어 있었다.'),
    '“왔군.” 그가 돌아보지 않고 말했다. ' + (beat ? '“그날 졌을 때부터 알았다. 다시 너를 만나려면 더 높은 데 서야 한다는 걸. 잘못 올라왔지만.”' : (bond ? '“술 생각이 나더군. 여기 술은 맛이 없어.”' : '“이번엔 끝을 보자.”'))) ;
  var ch = [
    { t: '“돌아와라.”', h: (beat || bond) ? '[인연] 그가 흔들린다 · 협곡의 지도를 얻을 수도' : '설득 · 그는 아직 당신을 모른다', f: function () {
      if (beat || bond || Math.random() < .25) { F.a_rvBack = 1; F.a_map = 1; var q = a_q(.04); done('혁련무가 오래 개울을 보았다. 그러다 품에서 접힌 종이를 꺼내 물 위에 띄웠다. 종이가 당신 발치로 흘러왔다. 흑천협의 진형도였다. “나는 돌아가지 않는다. 그건 그냥 떨어뜨린 거다.” 내공 +' + q, 'people'); }
      else { a_mad(6); done('“늦었어.” 그가 일어나 진영으로 돌아갔다. 등 뒤로 오른쪽 어깨가 여전히 반 박자 늦게 흔들렸다.', 'event'); } } },
    { t: '칼을 뽑는다', h: (hasMem('a_rival') ? '[기억] 어깨의 틈 · ' : '') + '결투 · 이기면 지도를 빼앗는다', c: 'primary', f: function () {
      a_spar('a_rival', et() + .7, '흑천맹의 흰 칼', function () { var q = a_q(.06); F.a_map = 1; F.a_rvFell = 1; done('흰 칼이 개울에 떨어졌다. 혁련무는 웃었다. “역시.” 그가 진형도를 던지고 강을 따라 걸어갔다. 흑천맹으로 돌아가지 않았다. 내공 +' + q, 'fight'); },
        function () { a_mad(6); done('흰 칼이 어깨를 꿰뚫고 빠졌다. 그는 숨통을 끊지 않았다. “협곡에서 보자. 거기선 내가 아니라 왕이 너를 죽일 거다.”', 'fail'); }, { hpMul: hasMem('a_rival') ? .8 : 1 }); } },
    { t: '말없이 물을 마시고 돌아선다', h: '마기 - · 둘 사이는 그대로', f: function () { a_mad(-10); if (Math.random() < .5) S.flags.a_canyonPath = 1; done('개울물이 차가웠다. 둘은 한마디도 하지 않았다. 돌아서는 당신 등 뒤에서 그가 혼잣말을 했다. “서쪽 물길은 마른 지 오래다.” 들은 척하지 않았다.', 'event'); } }];
  scene('개울가의 흰 머리', body, ch, 'loc_forest');
} });

/* ---- 198: 흑천협 결전 ---- */
EVENTS.push({ m: 198, id: 'a_canyon', run: function () {
  var F = S.flags, adv = [], hm = 1, heal = 0;
  if (hasMem('a_canyon')) { adv.push('[기억] 서쪽 마른 물길로 돌아 든다. 입구의 화약은 터지지 않는다.'); hm -= .15; }
  else if (F.a_map || F.a_canyonPath) { adv.push((F.a_map ? '혁련무의 진형도' : '금만석의 샛길 그림') + '에 서쪽 물길이 그려져 있었다.'); hm -= .1; }
  if (hasMem('a_omen') || F.a_omen) { adv.push('묵야의 말이 떠올랐다. 물소리를 따라가라.'); hm -= .05; }
  var lt = (F.a_dokDown ? 1 : 0) + (F.a_changDown ? 1 : 0) + (F.a_gwiDown ? 1 : 0);
  if (lt) { adv.push('세 장수 중 ' + ['', '하나가', '둘이', '셋 모두가'][lt] + ' 이미 없다. 곡달의 진은 그만큼 얇다.'); hm -= .05 * lt; }
  else hm += .1;
  if (F.a_geumSupply || tr('a_geum') >= 3) { adv.push('금만석이 밤새 회춘단과 쌀을 실어 왔다.'); heal += .3; S.items.pill++; }
  if (F.a_sohwa_met && alive('a_sohwa') && tr('a_sohwa') >= 3) { adv.push('소화가 선봉을 맡았다.'); heal += .2; hm -= .05; }
  hm = Math.max(.55, hm);
  var body = ps('붉은 달이 아니라 검은 해가 걸린 대낮이었다. 흑천협. 양쪽 절벽 위로 흑천맹 깃발이 빽빽했다.',
    '협곡 끝, 바위 위에 흑천왕 곡달이 앉아 있었다. 맨손이었다. 손바닥이 솥뚜껑만 했다. 그가 일어나자 협곡이 조용해졌다.',
    '“네가 내 장수들을 셋이나 귀찮게 한 놈이냐.” 곡달이 웃었다. “하늘은 원래 검었다. 너희가 낮이라고 우겼을 뿐이지.”') +
    (adv.length ? '<div class="insight">' + adv.map(esc).join('<br>') + '</div>' : '') +
    (S.noReturn ? '<p class="dim">이 싸움에서 쓰러지면 다음 봄은 없다.</p>' : '');
  var win = function () { learnMem('a_canyon'); F.a_gokDown = 1; ach('a_canyon'); var q = a_q(.1), g = a_s(260); addMat('gem', 2); addMat('core', 1); S.hpBonus = (S.hpBonus || 0) + 15;
    pages('흑천협', [ps('곡달의 주먹이 바위를 부수고, 당신의 칼이 그 손목을 지나갔다.', '거인이 무릎을 꿇었다. 그는 마지막까지 웃었다. “하늘은… 또 검어질 거다. 내가 아니어도.”'),
      ps('검은 깃발이 하나씩 절벽 아래로 떨어졌다. 협곡을 빠져나온 바람에서 처음으로 피 냄새가 아니라 물 냄새가 났다.')], 'siege',
      function () { done('흑천왕 곡달을 쓰러뜨렸다. 흑천맹이 무너졌다. 내공 +' + q + ' · 은전 <b>' + g + '</b>냥 · 보석 2 · 영단 1 · 최대 체력 +15', 'fight'); }); };
  var ch = [
    { t: '협곡으로 들어간다', h: '최종 결전 · 치명적 전투' + (adv.length ? ' · 유리한 조건 ' + adv.length + '개' : ''), c: 'primary', f: function () {
      fight('a_gokdal', et() + .8, { auto: true, title: '흑천왕 곡달', hpMul: hm, heal: heal, win: win, lose: function () { learnMem('a_canyon'); die('a_canyon'); } }); } }];
  if (S.noReturn || S.realm < 3) ch.push({ t: '전열 뒤에서 병사들을 지휘한다', h: '직접 싸우지 않는다 · 보상이 적고 동료가 다친다', f: function () { F.a_canyonBack = 1; var q = a_q(.03); if (F.a_sohwa_met && alive('a_sohwa')) { F.a_sohwaHurt = 1; a_tr('a_sohwa', -1); }
    done('뒤에서 깃발을 흔들었다. 사흘 동안 협곡이 피로 찼다. 곡달은 끝내 잡히지 않고 북쪽으로 달아났지만, 흑천맹은 둘로 갈라졌다. 이긴 싸움이었지만 이긴 것 같지 않았다. 내공 +' + q, 'event'); } });
  scene('흑천협', body, ch, 'siege');
} });

/* ---- 208: 전쟁 뒤 ---- */
EVENTS.push({ m: 208, id: 'a_after', run: function () {
  var F = S.flags, ps1 = F.a_gokDown ? '흑천맹이 무너진 지 열 달. 협곡 입구에 비석이 섰다. 비석에는 죽은 자들의 이름과, 당신의 이름이 함께 적혔다.' : '흑천맹은 둘로 갈라져 서로를 물어뜯다 흩어졌다. 곡달의 행방은 아무도 몰랐다. 협곡 입구에는 이름 없는 무덤들만 늘었다.';
  var lines = [ps1];
  var sh = F.a_sohwa_met && alive('a_sohwa'), gm = F.a_geum_met && alive('a_geum');
  if (sh) lines.push(tr('a_sohwa') >= 3 ? '소화는 떠나지 않았다. “복수가 끝나니까 갈 데가 없더라. 여기서 아이들 칼이나 가르칠래.”' : '소화가 짐을 쌌다. “원수는 끝났어. 이제 남은 건 내 몫이야.” 그녀는 붉은 끈 하나를 두고 떠났다.');
  if (gm) lines.push('금만석은 전쟁 중에 번 돈으로 상단을 셋으로 늘렸다. “평화도 장사요. 다만 이문이 적지.”');
  lines.push('서른셋. 장터에 북쪽 이야기가 돌기 시작했다. 눈보라 너머에서 얼음 같은 칼을 든 자들이 내려온다고.');
  var leave = function () { if (sh && tr('a_sohwa') < 3) { S.flags.a_sohwaGone = true; } };
  var ch = [
    { t: '죽은 자들의 이름을 하나씩 읽는다', h: '마기 크게 - · 내공 +', f: function () { leave(); a_mad(-30); var q = a_q(.04); done('비석 앞에서 해가 질 때까지 이름을 읽었다. 아는 이름이 생각보다 많았다. 내공 +' + q, 'rest'); } }];
  if (gm) ch.push({ t: '금만석과 동업 문서를 쓴다', h: '은전 -' + price(250) + ' · 상단 투자 +1', off: S.silver < price(250) ? '은전이 모자란다' : null, f: function () { leave(); S.silver -= price(250); S.estate = Math.min(10, (S.estate || 0) + 1); a_tr('a_geum', 1); done('금만석이 붓을 건넸다. “칼님 이름은 크게 쓰시오. 그래야 장사가 되오.” 상단이 하나 더 당신 이름을 달았다.', 'item'); } });
  if (sh) ch.push({ t: '소화와 마지막으로 겨룬다', h: '비무 · 내공 +', f: function () {
    a_spar('swordsman', et(), '소화와의 비무', function () { leave(); var q = a_q(.04); a_tr('a_sohwa', 1); done('소화의 붉은 끈이 칼바람에 풀렸다. 그녀가 웃었다. “이제 정말 내가 졌네.” 내공 +' + q, 'fight'); },
      function () { leave(); var q = a_q(.02); done('소화의 칼이 당신의 칼을 쳐냈다. “전쟁 끝나니까 느려졌어.” 둘이 한참 웃었다. 내공 +' + q, 'people'); }); } });
  ch.push({ t: '북쪽 소문을 캐 둔다', h: '다음 시대의 단서 · 은전 -' + price(30), off: S.silver < price(30) ? '은전이 모자란다' : null, f: function () { leave(); S.silver -= price(30); F.a_northRumor = 1; done('북쪽에서 온 모피 상인에게 술을 샀다. 그는 얼음 궁전과 하얀 머리의 궁주 이야기를 했다. 이야기 끝에 손을 떨었다.', 'event'); } });
  scene('전쟁 뒤', lines.map(function (x) { return x.indexOf('<p>') === 0 ? x : '<p>' + x + '</p>'; }).join(''), ch, 'dawn');
} });

/* =====================================================================
   우연한 사건 (19~34세)
   ===================================================================== */

/* 찻집 노인의 바둑 */
LIFE.push({ id: 'a_l_baduk', from: 19, to: 34, w: 3, cd: 30, run: function () {
  var old = pick(['머리가 하얗게 센 노인', '한쪽 눈이 먼 노인', '손가락이 넷뿐인 노인']);
  scene('찻집의 바둑판', '<p>' + a_place() + ' 찻집 구석에서 ' + old + '이(가) 혼자 바둑을 두고 있었다. 당신을 보더니 맞은편 의자를 발로 밀었다.</p><p>“한 판 두게. 지면 찻값을 내고, 이기면 내가 하나 알려 주지.”</p>', [
    { t: '앉아서 둔다', h: '내공 + 또는 은전 -', f: function () { if (Math.random() < .45 + S.realm * .04) { var q = a_q(.02); done('중반에 대마를 잡았다. 노인이 돌을 던지고 말했다. “칼도 바둑도 끊는 자리가 같다네.” 그 말이 오래 남았다. 내공 +' + q, 'qi'); } else { var l = Math.min(S.silver, price(15)); S.silver -= l; done('노인의 돌은 칼보다 날카로웠다. 찻값 ' + l + '냥을 내고 나왔다.', 'fail'); } } },
    { t: '구경만 한다', h: '마기 -', f: function () { a_mad(-6); done('노인이 혼자 두는 바둑을 해 질 녘까지 보았다. 흰 돌과 검은 돌이 서로를 죽이지 않고 끝났다.', 'rest'); } }]);
} });

/* 현상금 수배범 */
LIFE.push({ id: 'a_l_bounty', from: 19, to: 34, w: 4, cd: 20, run: function () {
  var who = pick([['쌍도 마영', 'swordsman'], ['산귀 황보칠', 'beast'], ['인두 장삼', 'a_scout'], ['독수 왕구', 'a_scout']]);
  scene('수배서', '<p>' + W('총단 외곽', '관아 앞', '객잔 기둥') + '에 수배서가 붙었다. <b>' + who[0] + '</b>. 현상금이 꽤 컸다.</p><p>그가 묵는다는 산채가 반나절 거리였다.</p>', [
    { t: '목을 따러 간다', h: '전투 · 현상금', f: function () { a_spar(who[1], et() * .9, who[0], function () { var g = a_s(55); done(who[0] + '을(를) 묶어 관아에 넘겼다. 현상금 <b>' + g + '</b>냥.', 'fight'); }, function () { done(who[0] + '은(는) 생각보다 질겼다. 간신히 몸만 빠져나왔다.', 'fail'); }); } },
    { t: '다른 사냥꾼에게 정보를 판다', h: '은전 소량', f: function () { var g = price(15); S.silver += g; done('산채 위치를 다른 사냥꾼에게 넘겼다. 은전 <b>' + g + '</b>냥. 사흘 뒤 그 사냥꾼의 시체가 강에 떴다는 말을 들었다.', 'item'); } },
    { t: '못 본 척한다', h: '아무 일 없다', f: function () { done('수배서는 사흘 뒤 비바람에 찢겨 나갔다.', 'event'); } }]);
} });

/* 혈월이 뜨는 밤 */
LIFE.push({ id: 'a_l_redmoon', from: 19, to: 34, w: 3, cd: 36, run: function () {
  scene('붉은 달', '<p>올해의 혈월이 떴다. ' + W('혈월봉 전체가 붉게 물들었다. 교도들은 문을 닫고 향을 피웠다.', '맹의 성채에서는 붉은 달을 불길하다 하여 등을 모두 껐다.', '마을 사람들이 달을 보지 않으려고 일찍 문을 걸었다.') + '</p><p>' + (S.noReturn ? '이제 당신은 그 달에 묶이지 않는다. 그래도 피가 조금 끓었다.' : '달을 볼 때마다 몸속 어딘가가 되감기는 소리를 낸다.') + '</p>', [
    { t: '달빛 아래서 운기한다', h: '내공 + · 마기 +', f: function () { var q = a_q(.025); a_mad(12); done('붉은 빛이 혈맥을 따라 흘렀다. 힘이 들어왔고, 무언가가 같이 들어왔다. 내공 +' + q, 'qi'); } },
    { t: '문을 닫고 잔다', h: '마기 -', f: function () { a_mad(-10); done('창을 가리고 일찍 누웠다. 꿈에 매화가 졌다.', 'rest'); } }], 'night');
} });

/* 길거리 아이 */
LIFE.push({ id: 'a_l_kid', from: 22, to: 34, w: 2, once: 'life', cond: function () { return (S.disc || []).length < 4; }, run: function () {
  var nm = pick(['석두', '복이', '참새', '돌쇠', '꼬마 진']);
  scene('따라오는 아이', '<p>사흘째 웬 아이 하나가 당신 뒤를 밟았다. 맨발에 나뭇가지를 칼처럼 쥐고 있었다.</p><p>“' + nm + '이에요. 칼 가르쳐 주세요. 밥은 조금만 먹을게요.”</p>', [
    { t: '제자로 거둔다', h: '제자 +1', f: function () { S.disc = S.disc || []; S.disc.push({ n: nm, p: 5, t: rnd(1, 3), a: 11 }); logE('people', '<b>' + nm + '</b>을(를) 제자로 거두었다.'); done(nm + '은(는) 그날 밤 밥을 세 그릇 먹었다. 조금만 먹겠다던 약속은 하루도 지켜지지 않았다.', 'people'); } },
    { t: '밥값을 주어 보낸다', h: '은전 -' + price(15) + ' · 마기 -', off: S.silver < price(15) ? '은전이 모자란다' : null, f: function () { S.silver -= price(15); a_mad(-8); done('은전을 쥐여 주었다. 아이는 고개를 숙이고 갔다가, 골목 끝에서 한 번 돌아보았다.', 'people'); } },
    { t: '쫓아 보낸다', h: '마기 +', f: function () { a_mad(4); done('“칼은 배우는 게 아니다.” 아이가 울면서 달아났다. 당신도 그런 말을 들은 적이 있었다.', 'event'); } }]);
} });

/* 라이벌의 도전장 */
LIFE.push({ id: 'a_l_rvletter', from: 21, to: 26, w: 3, cd: 24, cond: function () { return S.flags.a_rvMet && !S.flags.a_rvBack; }, run: function () {
  scene('흰 봉투', '<p>문틈에 흰 봉투가 끼워져 있었다. 혁련무의 글씨였다. 획이 칼처럼 곧았다.</p><p>“' + pick(['오늘 해 질 녘, 강둑.', '연무장 뒤편 대숲. 혼자 와라.', '내가 더 빨라졌는지 봐 다오.']) + '”</p>', [
    { t: '나간다', h: (hasMem('a_rival') ? '[기억] ' : '') + '비무 · 내공 +', f: function () { a_spar('a_rival', et() * .95, '혁련무의 도전', function () { var q = a_q(.025); done('세 합 만에 끝났다. 혁련무가 숨을 고르며 말했다. “아직이군.” 그는 웃지 않았지만 화도 내지 않았다. 내공 +' + q, 'fight'); }, function () { var q = a_q(.01); done('그의 흰 칼이 당신 소매를 베었다. “이제 내가 하나 앞섰다.” 내공 +' + q, 'fail'); }, { hpMul: hasMem('a_rival') ? .8 : 1 }); } },
    { t: '답장만 보낸다', h: '아무 일 없다', f: function () { done('“바쁘다.” 두 글자를 적어 보냈다. 다음 날 같은 봉투가 또 와 있었다.', 'event'); } }]);
} });

/* 흑천맹 소문 */
LIFE.push({ id: 'a_l_hcrumor', from: 23, to: 34, w: 3, cd: 24, run: function () {
  var war = S.flags.seen_a_war, r = war ? pick(['흑천맹이 소금 배를 통째로 끌고 갔다고 한다.', '흑천왕 곡달이 장수 하나를 맨손으로 찢었다는 이야기가 돈다. 군령을 어겼다고.', '흑천맹 진영에 녹색 비단 마차가 들어갔다고 한다. 독왕의 마차다.', '어느 마을이 흑천맹에 문을 열어 주고 살아남았다는 소문이 돈다. 그 마을은 다음 해에 세금을 두 배로 냈다.']) : pick(['산서 녹림의 산채 열둘이 한 깃발 아래 모였다고 한다.', '검은 해를 그린 쪽지가 마을마다 돌았다고 한다. 글을 모르는 사람들도 그 뜻은 알았다.', '사파 고수들이 한 사람에게 무릎을 꿇었다는 이야기가 들린다. 이름은 곡달.']);
  scene('검은 소문', '<p>' + a_place() + '에서 들은 이야기다.</p><p>' + r + '</p>', [
    { t: '더 캐묻는다', h: '은전 -' + price(10) + ' · 정보 또는 허탕', off: S.silver < price(10) ? '은전이 모자란다' : null, f: function () { S.silver -= price(10); if (Math.random() < .5) { S.flags.a_intel = 1; var q = a_q(.015); done('술값만큼 더 들었다. 흑천맹이 움직이는 순서가 조금 보였다. 내공 +' + q, 'qi'); } else done('뒷이야기는 술주정이었다.', 'event'); } },
    { t: '흘려듣는다', h: '아무 일 없다', f: function () { done('소문은 소문이다. 하지만 검은 해 이야기는 귀에서 잘 떠나지 않았다.', 'event'); } }]);
} });

/* 상단 호위 */
LIFE.push({ id: 'a_l_escort', from: 20, to: 34, w: 4, cd: 18, run: function () {
  var cargo = pick(['비단', '약재', '소금', '차', '쇠붙이']);
  scene('표물 호위', '<p>' + cargo + ' 수레 여섯 대를 고개 너머까지 데려다 달라는 청이 들어왔다. 품삯은 넉넉하다. 고개에는 ' + (S.flags.seen_a_war ? '흑천맹 잔당이' : '산적이') + ' 있다고 했다.</p>', [
    { t: '맡는다', h: '전투 · 은전 · 재료', f: function () { a_spar(S.flags.seen_a_war ? 'a_raider' : 'bandit', et() * .8, '고갯길', function () { var g = a_s(45); var mk = pick(['herb', 'hide', 'iron']); addMat(mk, 2); done('고개 위에서 한 번 칼을 뽑았고, 한 번에 끝났다. 품삯 <b>' + g + '</b>냥에 ' + MATS[mk].n + ' 둘을 덤으로 받았다.', 'fight'); }, function () { var g = price(10); S.silver += g; done('수레 두 대를 잃었다. 상인은 품삯을 반의반만 주었다. 은전 ' + g + '냥.', 'fail'); }); } },
    { t: '값을 올려 부른다', h: '은전 + 또는 거절', f: function () { if (Math.random() < .5) { var g = a_s(30); done('상인이 이를 갈며 승낙했다. 고개는 조용했다. 은전 <b>' + g + '</b>냥.', 'item'); } else done('상인은 다른 칼잡이를 구했다.', 'event'); } },
    { t: '거절한다', h: '아무 일 없다', f: function () { done('오늘은 칼을 뽑고 싶지 않았다.', 'event'); } }]);
} });

/* 주막 술내기 */
LIFE.push({ id: 'a_l_wine', from: 19, to: 30, w: 3, once: 'life', run: function () {
  scene('술내기', '<p>주막에서 덩치 큰 사내가 술동이를 탁자에 내려놓았다. “먼저 쓰러지는 놈이 술값 다 내기!” 사람들이 당신을 가리켰다.</p>', [
    { t: '내공으로 술기운을 밀어낸다', h: '은전 + · 마기 +', f: function () { var g = price(rnd(20, 40)); S.silver += g; a_mad(5); done('손끝으로 술을 흘려보내며 열 사발을 비웠다. 사내가 탁자 밑으로 굴렀다. 판돈 <b>' + g + '</b>냥. 조금 비겁한 승리였다.', 'item'); } },
    { t: '정직하게 마신다', h: '체력 - · 사람들과 가까워진다', f: function () { hurt(.1); a_mad(-12); done('여덟 사발째에 둘이 같이 쓰러졌다. 깨어 보니 사내가 당신 머리맡에서 해장국을 끓이고 있었다.', 'people'); } },
    { t: '사양한다', h: '아무 일 없다', f: function () { done('“술은 혼자 마시는 거요.” 사람들이 야유했다. 개의치 않았다.', 'event'); } }]);
} });

/* 옛 상처 */
LIFE.push({ id: 'a_l_scar', from: 27, to: 34, w: 3, cd: 30, cond: function () { return S.flags.seen_a_war; }, run: function () {
  scene('옛 상처', '<p>비가 오기 전날이면 ' + pick(['왼쪽 어깨', '허벅지의 칼자국', '갈비뼈 아래']) + '가 쑤셨다. 흑천맹과의 싸움이 남긴 자리다.</p>', [
    { t: '의원을 찾는다', h: '은전 -' + price(40) + ' · 체력 회복 · 최대 체력 +', off: S.silver < price(40) ? '은전이 모자란다' : null, f: function () { S.silver -= price(40); a_heal(1); S.hpBonus = (S.hpBonus || 0) + 3; done((alive('hr') ? '홍란이' : '떠돌이 의원이') + ' 침을 놓고 혀를 찼다. “다음엔 덜 다쳐.” 몸이 가벼워졌다.', 'rest'); } },
    { t: '상처 자리로 기를 돌린다', h: '내공 + · 체력 -', f: function () { hurt(.1); var q = a_q(.02); done('아픈 자리에 기를 밀어 넣었다. 막혀 있던 혈이 하나 뚫렸다. 내공 +' + q, 'qi'); } }]);
} });

/* 피란민 */
LIFE.push({ id: 'a_l_refugee', from: 27, to: 34, w: 4, cd: 24, cond: function () { return S.flags.seen_a_war && !S.flags.a_gokDown; }, run: function () {
  scene('피란 행렬', '<p>흑천맹을 피해 내려온 피란민 행렬이 길을 메웠다. 보따리를 인 노인, 아이를 업은 여인, 소 한 마리를 끄는 소년.</p><p>' + W('교도들은 그들을 산문 안에 들일지 말지 다투고 있었다.', '맹의 관리들은 신분을 확인한 자만 성 안에 들이라 했다.', '객잔 주인은 문을 닫아걸었다.') + '</p>', [
    { t: '곳간을 연다', h: '은전 -' + price(60) + ' · 마기 크게 -', off: S.silver < price(60) ? '은전이 모자란다' : null, f: function () { S.silver -= price(60); a_mad(-25); if (Math.random() < .3) { addMat('herb', 3); done('죽을 쑤어 나눴다. 떠날 때 늙은 약초꾼 하나가 약초 꾸러미를 두고 갔다.', 'people'); } else done('사흘 동안 죽을 쑤었다. 행렬이 지나간 자리에 빈 그릇만 남았다.', 'people'); } },
    { t: '행렬 끝을 지킨다', h: '전투 · 추격대를 막는다', f: function () { a_spar('a_scout', et() * .8, '피란 행렬의 꼬리', function () { var q = a_q(.025); a_mad(-10); done('행렬을 쫓던 흑천맹 척후를 베었다. 아무도 고맙다고 하지 않았다. 다들 너무 지쳐 있었다. 내공 +' + q, 'fight'); }, function () { done('척후를 놓쳤다. 다음 날 행렬 끝의 수레 두 대가 사라졌다.', 'fail'); }); } },
    { t: '지나간다', h: '마기 +', f: function () { a_mad(6); done('행렬을 비켜 지나갔다. 소를 끄는 소년의 눈이 오래 등에 붙어 있었다.', 'event'); } }]);
} });

/* 소화의 부름 */
LIFE.push({ id: 'a_l_sohwa', from: 27, to: 34, w: 3, cd: 18, cond: function () { return S.flags.a_sohwa_met && alive('a_sohwa'); }, run: function () {
  scene('붉은 끈', '<p>소화가 숨을 헐떡이며 뛰어왔다. “' + pick(['저 아래 마을에 흑천맹 잔당이 들어왔어.', '피란민 아이 하나가 산으로 들어가서 안 나와.', '내 칼이 부러졌어. 같이 대장간 좀 가.']) + '”</p>', [
    { t: '같이 간다', h: '신뢰 +1 · 내공 +', f: function () { a_tr('a_sohwa', 1); var q = a_q(.015); done('소화와 나란히 달렸다. 일이 끝나고 그녀가 당신 어깨를 쳤다. “역시 너밖에 없어.” 내공 +' + q, 'people'); } },
    { t: '지금은 바쁘다', h: '신뢰 변화 없음', f: function () { done('소화는 혀를 차고 혼자 갔다. 저녁에 돌아온 그녀의 소매에 피가 묻어 있었다.', 'event'); } }]);
} });

/* 금만석의 귀띔 */
LIFE.push({ id: 'a_l_geum', from: 27, to: 34, w: 3, cd: 20, cond: function () { return S.flags.a_geum_met && alive('a_geum'); }, run: function () {
  var goods = pick([['약초', 'herb'], ['정철', 'iron'], ['짐승 가죽', 'hide'], ['옥정', 'jade']]), cost = price(goods[1] === 'jade' ? 90 : 35);
  scene('귀띔', '<p>금만석이 소매를 끌어당겼다. “칼님, 이건 우리끼리만. ' + goods[0] + ' 값이 다음 달에 두 배로 뛰오. 지금 사 두시오.”</p>', [
    { t: '산다', h: '은전 -' + cost + ' · ' + goods[0] + ' +' + (goods[1] === 'jade' ? 1 : 4), off: S.silver < cost ? '은전이 모자란다' : null, f: function () { S.silver -= cost; addMat(goods[1], goods[1] === 'jade' ? 1 : 4); a_tr('a_geum', 1); done('창고 구석에서 ' + goods[0] + '을(를) 받았다. 금만석이 장부에 동그라미를 쳤다. 무엇에 친 동그라미인지는 묻지 않았다.', 'item'); } },
    { t: '“당신 말은 반만 믿겠소.”', h: '아무 일 없다', f: function () { done('금만석이 크게 웃었다. “반이면 많이 믿어 주는 거요.”', 'people'); } }]);
} });

/* 지난 생의 꿈 */
LIFE.push({ id: 'a_l_dream', from: 19, to: 34, w: 2, once: 'life', cond: function () { return P.lives > 0 && !S.noReturn; }, run: function () {
  scene('지난 봄의 꿈', '<p>꿈속에서 당신은 다른 나이였다. 다른 칼을 쥐고, 다른 곳에서 쓰러지고 있었다. 깨어나자 손바닥에 그 칼의 무게가 남아 있었다.</p><p>지금까지 ' + P.lives + '번의 봄이 되감겼다.</p>', [
    { t: '꿈속의 칼을 따라 휘둘러 본다', h: '내공 + · 무공 숙련', f: function () { var q = a_q(.03), sn = upSkill(1); done('꿈속의 초식을 그대로 따라 했다. 몸이 먼저 알고 있었다. 내공 +' + q + (sn ? ' · ' + sn + ' 숙련 +1' : ''), 'skill'); } },
    { t: '꿈을 잊으려 한다', h: '마기 -', f: function () { a_mad(-15); done('찬물에 얼굴을 씻었다. 이번 생은 이번 생이다.', 'rest'); } }], 'return');
} });

/* 절벽의 약초 */
LIFE.push({ id: 'a_l_cliff', from: 19, to: 34, w: 3, cd: 24, run: function () {
  scene('절벽의 영초', '<p>' + pick(['안개 낀 절벽', '폭포 옆 바위벽', '까마귀가 맴도는 벼랑']) + ' 중턱에 붉은 잎의 풀이 보였다. 약초꾼들이 백 년에 한 번 핀다고 떠드는 그 풀이다.</p>', [
    { t: '맨손으로 오른다', h: '옥정 · 약초 또는 부상', f: function () { if (Math.random() < .55 + S.realm * .04) { addMat('jade', 1); addMat('herb', 3); done('손톱이 셋 빠졌지만 풀을 뽑았다. 뿌리에 옥 같은 결정이 달려 있었다. 옥정 1 · 약초 3.', 'item'); } else { hurt(.25); addMat('herb', 1); done('바위가 무너졌다. 굴러떨어지며 잎 하나만 건졌다.', 'fail'); } } },
    { t: '약초꾼에게 위치를 판다', h: '은전 +', f: function () { var g = price(rnd(15, 30)); S.silver += g; done('약초꾼이 은전 <b>' + g + '</b>냥을 내고 신이 나서 달려갔다.', 'item'); } }]);
} });

/* 물소리의 깨달음 */
LIFE.push({ id: 'a_l_water', from: 19, to: 34, w: 2, once: 'life', run: function () {
  scene('물소리', '<p>개울가에 앉아 칼을 닦다가 손을 멈췄다. 물은 바위를 베지 않고 돌아가는데, 몇 해가 지나면 바위가 패어 있다.</p>', [
    { t: '물처럼 칼을 흘려 본다', h: '내공 크게 +', f: function () { var q = a_q(.05); done('힘을 빼고 칼을 흘렸다. 칼이 바위를 비켜 가며 이끼만 벗겨 냈다. 그 하루가 일 년 같았다. 내공 +' + q, 'qi'); } },
    { t: '그냥 발을 담근다', h: '체력 · 마기 회복', f: function () { a_heal(.4); a_mad(-12); done('발이 시렸다. 오랜만에 아무 생각도 하지 않았다.', 'rest'); } }]);
} });

/* 중매쟁이 */
LIFE.push({ id: 'a_l_match', from: 20, to: 28, w: 2, once: 'life', run: function () {
  scene('중매쟁이', '<p>분 바른 아주머니가 찾아왔다. “' + W('장로 댁 셋째 따님이', '표국 주인댁 외동이', '포목점 둘째가') + ' 그쪽 칼 쓰는 걸 보고 반했다지 뭐요.”</p><p>' + (alive('yn') ? '문밖에서 연이가 귀를 대고 있는 기척이 났다.' : '방 안이 갑자기 좁게 느껴졌다.') + '</p>', [
    { t: '“칼밖에 모르는 사람이오.”', h: '정중히 거절한다 · 마기 -', f: function () { a_mad(-6); done('중매쟁이가 혀를 차고 갔다. ' + (alive('yn') ? '문밖에서 누군가 작게 웃는 소리가 났다.' : '조용해졌다.'), 'event'); } },
    { t: '선을 본다', h: '은전 + · 혼담은 흐지부지', f: function () { var g = a_s(30); done('찻잔만 비우다 끝났다. 상대 집에서 예물로 보낸 은전 <b>' + g + '</b>냥은 돌려보내지 못했다.', 'item'); } }]);
} });

/* 흑천맹 잔당의 매복 */
LIFE.push({ id: 'a_l_ambush', from: 27, to: 34, w: 3, cd: 20, cond: function () { return S.flags.seen_a_war; }, run: function () {
  var know = hasMem('a_mark');
  scene('길목', '<p>' + a_place() + ' 가는 길목. 나무꾼 둘이 길을 막고 서 있었다. ' + (know ? '하나가 땀을 닦을 때 소매 안쪽에 검은 해가 비쳤다.' : '도끼를 쥔 손이 나무꾼의 손치고 너무 깨끗했다.') + '</p>', [
    { t: know ? '먼저 친다' : '칼을 뽑는다', h: (know ? '[기억] 기습 · ' : '') + '전투', f: function () { a_spar('a_raider', et() * (know ? .75 : .95), '흑천맹 매복', function () { var g = a_s(35); addMat('iron', 1); done('도끼 둘이 땅에 떨어졌다. 품에서 은전 <b>' + g + '</b>냥과 쇳조각이 나왔다.', 'fight'); }, function () { hurt(.1); done('도끼가 어깨를 스쳤다. 숲으로 굴러 간신히 피했다.', 'fail'); }); } },
    { t: '돌아간다', h: '길을 돌아간다 · 체력 -', f: function () { hurt(.05); done('산을 하나 넘어 돌아갔다. 발이 부르텄다.', 'event'); } }]);
} });

/* 대장간의 쇳물 */
LIFE.push({ id: 'a_l_forge', from: 19, to: 34, w: 2, cd: 36, run: function () {
  scene('쇳물', '<p>' + (alive('cn') && S.flags.cn ? '철노의 대장간' : '길가 대장간') + '에서 불이 꺼지지 않았다. 대장장이가 땀을 훔치며 말했다. “풀무질할 사람이 모자라오. 하루만 거들면 쇳조각을 나눠 주지.”</p>', [
    { t: '풀무를 잡는다', h: '정철 + · 체력 -', f: function () { hurt(.08); addMat('iron', 3); if (Math.random() < .2) { S.items.ore = (S.items.ore || 0) + 1; done('하루 종일 풀무를 밟았다. 정철 셋과 운철 한 덩이를 받았다.', 'item'); } else done('하루 종일 풀무를 밟았다. 정철 셋을 받았다.', 'item'); } },
    { t: '불 앞에서 기를 다스린다', h: '내공 + · 마기 -', f: function () { var q = a_q(.015); a_mad(-5); done('쇳물의 열기 속에서 숨을 골랐다. 불도 기도 같은 박자로 오르내렸다. 내공 +' + q, 'qi'); } }]);
} });
