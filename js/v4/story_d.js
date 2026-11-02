/* 혈월회귀록 v4 — 이야기 d: E7 혈월의 진실 · E8 잔월 · E9 황혼의 전쟁 · E10 마지막 혈월 · 최종 결전.
   ※ 마지막 혈월(d_final)은 finalMonth()(언제나 12k+1월)에 온다. 같은 달의 다른 장 이벤트에 밀리지 않도록
     이 파일의 장 이벤트는 12k+1월을 피하고, d_final을 가장 먼저 등록한다. */

/* ================= 공용 도구 ================= */
function dF() { return S.flags; }
function dNpcKey(name) { var ks = Object.keys(NPC).filter(function (k) { return NPC[k] && NPC[k].n === name; }); return ks[0] || ''; }
function dMet(k) { var n = NPC[k]; if (!n) return false; if (n.flag) return !!S.flags[n.flag]; if (n.v4) return !!S.flags['met_' + k]; return true; }
function dFriend(name, t) { var k = NPC[name] ? name : dNpcKey(name); return !!k && alive(k) && dMet(k) && tr(k) >= (t || 0); }
function dPost() { return !!S.flags.seen_d_final; }
function dPre() { return !S.flags.seen_d_final; }
function dDisc() { return (S.disc || []).slice().sort(function (a, b) { return b.p - a.p; }); }
function dTopDisc() { var d = dDisc()[0]; return d ? esc(d.n) : ''; }
function dSect() { return S.sect ? '<b>' + esc(S.sect.n) + '</b>' : ''; }
function dSeats() { var F = S.flags; return (F.d_s7 ? 1 : 0) + (F.d_s5 ? 1 : 0) + (F.d_s3 ? 1 : 0) + (F.d_s2 ? 1 : 0); }
function dTruth() { return hasMem('d_truth') || !!S.flags.d_truth; }
function dAllies() {
  var F = S.flags, L = [];
  if (F.d_ally_jeong) L.push(W('산 아래에서 올라온 무림맹의 흰 깃발', '무림맹의 검수들', '무림맹의 흰 깃발'));
  if (F.d_ally_ma) L.push(W('천마신교의 검은 깃발', '산을 넘어온 마교의 검은 옷들', '흩어졌던 마교의 잔당'));
  if (F.d_ally_hwa && !F.d_hwaDead) L.push('구천문을 등진 육좌 화원');
  if (F.d_ally_town) L.push('역병 때 살려 낸 마을 사람들');
  [['dg', '독고강'], ['hr', '홍란'], ['mk', '묵야'], ['yn', '연이'], ['cn', '철노'], ['nj', '남궁진'], ['bw', '백운'], ['sm', '사마령'], ['hs', '한서생']].forEach(function (x) { if (NPC[x[0]] && dFriend(x[0], 3)) L.push(x[1]); });
  ['소화', '금만석', '빙린', '진무', '곡달'].forEach(function (n) { if (dFriend(n, 3)) L.push(n); });
  return L;
}
/* 준비의 무게: 문파·제자·동맹·꺾은 사자·진실 */
function dPrep() {
  var s = (S.sect ? S.sect.lv : 0) + Math.min(4, (S.disc || []).length) + Math.min(6, dAllies().length) + dSeats() * 1.5;
  if (hasMem('d_gate')) s += 2; if (dTruth()) s += 1; if (S.flags.d_intel) s += 1; if (S.flags.d_armory) s += 1.5; if (S.flags.d_jgBetray) s -= 1;
  return s;
}
function dJoin(a) { return a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ', 그리고 ' + a[a.length - 1]; }
function dMad(n) { S.mad = clamp(S.mad + n, 0, 100); }
function dLife(n) { var b = S.lifeBonus || 0; S.lifeBonus = Math.min(12, b + n); return S.lifeBonus - b; }

/* ================= 적 ================= */
ENM.d_warden = { n: '총묘의 수문장', hp: 210, atk: 22, w: { strong: 5, rapid: 1, feint: 1, charge: 3 } }; GLY.d_warden = '門';
ENM.d_shade = { n: '무면천마의 잔영', hp: 240, atk: 25, boss: true, w: { strong: 2, rapid: 3, feint: 5, charge: 2 } }; GLY.d_shade = '無';
ENM.d_ghoul = { n: '혈역의 시귀', hp: 100, atk: 16, w: { strong: 2, rapid: 5, feint: 1, charge: 1 } }; GLY.d_ghoul = '疫';
ENM.d_rebel = { n: '반역한 문도', hp: 150, atk: 20, w: { strong: 3, rapid: 3, feint: 3, charge: 1 } }; GLY.d_rebel = '逆';
ENM.d_acolyte = { n: '구천문 신도', hp: 110, atk: 17, w: { strong: 2, rapid: 2, feint: 3, charge: 3 } }; GLY.d_acolyte = '信';
ENM.d_s7 = { n: '칠좌 철우', hp: 320, atk: 30, boss: true, w: { strong: 6, rapid: 1, feint: 0, charge: 4 } }; GLY.d_s7 = '七';
ENM.d_s5 = { n: '오좌 수경', hp: 290, atk: 29, boss: true, w: { strong: 1, rapid: 2, feint: 6, charge: 2 } }; GLY.d_s5 = '五';
ENM.d_s3 = { n: '삼좌 백야', hp: 300, atk: 32, boss: true, w: { strong: 1, rapid: 6, feint: 2, charge: 1 } }; GLY.d_s3 = '三';
ENM.d_s2 = { n: '이좌 공명', hp: 360, atk: 34, boss: true, w: { strong: 3, rapid: 2, feint: 3, charge: 4 } }; GLY.d_s2 = '二';
ENM.d_s1 = { n: '구천문 일좌 · 천문', hp: 420, atk: 37, boss: true, w: { strong: 3, rapid: 3, feint: 3, charge: 3 } }; GLY.d_s1 = '天';

/* ================= 기억 · 죽음 · 업적 ================= */
MEM.d_depth = ['천마총 심층의 길', '천마총 심층의 수문장은 왼쪽 셋째 기둥 아래로 비켜 가면 깨어나지 않는다.'];
MEM.d_redhaze = ['적하의 말', '제7대 천마 적하: “굴레는 끊는 것이 아니라 누군가 짊어지는 것이다.”'];
MEM.d_truth = ['굴레의 목적', '혈월의 굴레는 저주가 아니라 자물쇠다. 되감기는 시간이 구천의 문을 잠가 왔다.'];
MEM.d_gate = ['구천의 문이 열리는 법', '구천의 문은 마지막 혈월에 열린다. 일좌는 문이 반쯤 열린 순간에만 몸을 드러낸다.'];
MEM.d_plague = ['붉은 역병의 근원', '붉은 역병은 혈정 가루에서 퍼진다. 우물에 숯과 해독단을 넣으면 번지지 않는다.'];
MEM.d_mirror = ['수경의 거울', '오좌 수경은 거울로 수를 되비춘다. 허초가 아니라 정직한 강타에 깨진다.'];
DEATHS.d_tomb = ['천마총 심층에서', '스물세 천마가 걸어간 길 끝에 당신의 뼈도 하나 더 놓였다.'];
DEATHS.d_plague = ['붉은 역병', '열이 사흘 동안 내리지 않았다. 마지막 날 밤, 달이 유난히 붉었다.'];
DEATHS.d_seat = ['사자의 손에', '하늘 위의 하늘에서 내려온 손이 당신의 숨을 거두어 갔다.'];
DEATHS.d_gate = ['구천의 문 앞에서', '문이 열리는 소리를 들으며 쓰러졌다. 그 너머는 끝내 보지 못했다.'];
DEATHS.d_rebel = ['제 손으로 키운 칼에', '가르친 초식이 그대로 돌아와 가슴에 박혔다. 잘 가르쳤다는 생각이 마지막이었다.'];
ACH.d_truth = ['스물네 번째 대답', '혈월천마에게서 굴레의 목적을 들었다'];
ACH.d_seats = ['일곱 자리를 꺾다', '구천문의 네 사자를 한 생에 모두 꺾었다'];
ACH.d_gate = ['마지막 혈월', '구천의 문 앞에서 일좌를 쓰러뜨렸다'];
ACH.d_old = ['백 년의 벗', '마지막 혈월에 옛 동료 셋 이상이 곁에 섰다'];

/* ================= 결말 ================= */
ENDINGS.d_seal = ['문을 닫다', 520]; ART.d_seal = ['end_guard', '', '50% 50%'];
ENDINGS.d_break = ['문을 부수다', 450]; ART.d_break = ['end_burn', '', '50% 50%'];
ENDINGS.d_ascend = ['하늘 위의 하늘', 480]; ART.d_ascend = ['wudang', '', '50% 50%'];
ENDINGS.d_heir = ['스물네 번째 천마', 400]; ART.d_heir = ['end_cheonma', '', '50% 50%'];
ENDINGS.d_peace = ['이름 없는 평화', 540]; ART.d_peace = ['end_peace', '', '50% 50%'];
ENDINGS.d_true = ['한 번뿐인 봄', 600]; ART.d_true = ['end_true', '', '50% 50%'];

ENDTEXT4.d_seal = function () {
  var a = age(), ds = dDisc().map(function (d) { return esc(d.n); });
  return ps(
    '당신은 문 안쪽으로 걸어 들어갔다. 그리고 안에서 문을 닫았다.',
    '구천의 문은 바깥에서는 잠기지 않는다. 스물세 천마가 알고도 하지 못한 일이었다. 누군가는 안에 남아 빗장이 되어야 했다. ' + a + '세의 몸은 빗장으로 쓰기에 꼭 알맞게 낡아 있었다.',
    W('혈월봉 위의 하늘이 갈라진 자리를 메웠다.', '맹의 뜰에서 올려다본 하늘의 금이 아물었다.', '이름 모를 산마루에서 하늘의 금이 아물었다.') + ' ' + (ds.length ? ds.join(', ') + '이(가) 문이 닫힌 자리에 오래 서 있었다. 아무도 울지 않으려 했고, 모두 울었다.' : '문이 닫힌 자리에는 바람만 불었다.'),
    '이듬해 봄, 달은 붉지 않았다. 그다음 해에도. 사람들은 왜인지 몰랐고, 몰라도 되었다.',
    '이 생은, 스스로 자물쇠가 된 생이었다.');
};
ENDTEXT4.d_break = function () {
  return ps(
    '당신은 문을 닫지 않았다. 부쉈다.',
    '문짝이 산산이 흩어지며 하늘 위의 하늘로 가는 길이 함께 무너졌다. 오를 수 없게 된 하늘은 더는 누구의 것도 아니었다. 구천문의 남은 자들은 갈 곳을 잃고 땅으로 흩어졌다.',
    '대가는 컸다. 혈맥 절반이 끊어졌고, 칼을 쥐던 손이 다시는 주먹을 쥐지 못했다. ' + W('교도들이 당신을 업고 산을 내려왔다.', '맹의 무사들이 들것을 메고 산을 내려왔다.', '지나가던 약초꾼이 당신을 업고 산을 내려왔다.'),
    '하늘에는 이제 문이 없다. 대신 아무도 닿지 못할 높이가 생겼다. 무인들은 그 높이를 올려다보며 다시 처음부터 칼을 갈았다.',
    '이 생은, 하늘의 문을 부수고 땅을 남긴 생이었다.');
};
ENDTEXT4.d_ascend = function () {
  return ps(
    '문 너머는 하얬다. 소리도, 냄새도, 달도 없었다.',
    '일좌가 앉았던 자리가 비어 있었다. 당신은 그 자리에 앉지 않고 그 옆에 섰다. 아래를 내려다보니 강호가 손바닥만 했다. ' + W('혈월봉', '무림맹의 뜰', '당신이 걸어온 길') + '도, 무덤들도, 아직 살아 있는 얼굴들도.',
    REALMS[S.realm].n + '의 끝에는 또 하나의 끝이 있었다. 하늘 위의 하늘에서는 나이를 먹지 않는다. 다만 아래에 두고 온 것들이 하나씩 늙어 가는 것을 볼 수 있을 뿐이다.',
    '가끔 당신은 붉지 않은 달을 아래로 내려 보냈다. 누군가 그것을 보고 고개를 들기를 바라며.',
    '이 생은, 끝 너머로 걸어 들어간 생이었다.');
};
ENDTEXT4.d_heir = function () {
  return ps(
    '당신은 혈월천마의 빈 자리에 앉았다. 붉은 달의 숨이 당신의 숨이 되었다.',
    '굴레를 끊으면 문이 열린다. 문을 닫을 사람이 없다면, 굴레를 이어 갈 사람이라도 있어야 했다. 스물세 천마가 차례로 거절한 자리였다. 스물네 번째로 앉은 자는 거절하지 않았다.',
    '이제 누군가 죽을 때마다 당신은 그 사람의 봄을 되감는다. 그들은 왜 다시 매화 지는 봄에 눈을 뜨는지 모를 것이다. 당신이 그랬던 것처럼.',
    W('혈월봉', '맹의 뜰', '이름 모를 마을') + '에서 이름 없는 아이 하나가 처음으로 붉은 달을 올려다보았다. 당신은 그 아이를 알아보았다. 오래전의 당신이었다.',
    '이 생은, 굴레를 끊지 않고 짊어진 생이었다.');
};
ENDTEXT4.d_peace = function () {
  var a = age(), ds = dDisc().map(function (d) { return esc(d.n); }), h = S.flags.d_heirName ? esc(S.flags.d_heirName) : (ds[0] || '');
  return ps(
    '마지막 혈월이 지나고 몇 해. 당신은 ' + a + '세가 되어 있었다.',
    '문은 닫히지도 부서지지도 않았다. 반쯤 열린 채로 지켜볼 사람들이 생겼을 뿐이다. ' + (S.sect ? dSect() + '의 문도들이 해마다 돌아가며 문 앞을 지켰다. ' : '') + (h ? h + '이(가) 그 일을 맡겠다고 했을 때, 당신은 처음으로 마음 놓고 웃었다.' : '당신이 칼을 가르친 아이들이 그 일을 맡았다.'),
    '당신의 이름은 기록에 남지 않았다. 일부러 그렇게 했다. 이름이 남으면 사람들은 다음에도 한 사람을 기다린다. 이번에는 모두가 조금씩 지키기를 바랐다.',
    '마지막 봄, 마당에 매화가 졌다. 당신은 처음 매화 지는 봄에 눈을 떴던 시종을 떠올렸다. 그 아이는 이렇게 끝날 줄 몰랐을 것이다. 그래도 이 끝을 좋아했을 것이다.',
    '이 생은, 이름 대신 사람을 남긴 생이었다.');
};
ENDTEXT4.d_true = function () {
  var a = age();
  return ps(
    '당신은 이미 굴레 밖의 사람이었다. 죽으면 돌아오지 않는 몸. 구천의 문은 그런 몸을 읽지 못했다.',
    '문은 되감긴 시간을 먹고 열린다. 빌린 봄, 되풀이된 해들. 당신에게는 빌린 것이 하나도 없었다. 당신은 남은 해를 고스란히 문 앞에 내려놓았다. 한 번뿐인 해들은 무거웠다. 문이 그 무게를 이기지 못하고 닫혔다.',
    '그해부터 달은 하얗게 떴다. 다시 붉어지지 않았다. 굴레도, 문도, 함께 끝났다. 스물세 천마가 바란 것을 스물네 번째도 아닌 이름 없는 시종이 해냈다.',
    a + '세의 봄. 당신은 ' + W('혈월봉', '맹의 뜰', '작은 마을') + '의 마루에 앉아 하얀 달을 보았다. ' + ((S.disc || []).length ? dTopDisc() + '이(가) 차를 내왔다.' : '누군가 차를 내왔다.') + ' 내일도 봄이 올 것이다. 단 한 번씩.',
    '이 생은, 단 한 번이어서 모든 것을 끝낸 생이었다.');
};

/* 미뤄 둔 결말: 이름 없는 평화와 진엔딩은 남은 해를 다 산 뒤에 닫힌다 */
var _dNaturalEnd = naturalEnd;
naturalEnd = function () {
  if (S && S.flags && S.flags.d_after && ENDINGS[S.flags.d_after]) {
    var id = S.flags.d_after;
    scene('천수', '<p>' + age() + '세. 마지막 혈월이 지나간 하늘 아래에서, 오래 걸어온 길이 끝났다.</p>', [{ t: '마지막 봄을 맞는다', c: 'primary', f: function () { closeLife('end', id); } }], 'night');
    return;
  }
  _dNaturalEnd();
};

/* ================= 최종 결전: 마지막 혈월 ================= */
EVENTS.unshift({ m: 'final', id: 'd_final', run: function () { dFinal(); } });
function dFinal() {
  var F = S.flags, allies = dAllies(), seats = dSeats(), early = S.month < 793;
  var p1 = ps(
    age() + '세의 ' + SEASON[Math.floor(((S.month - 1) % 12) / 3)] + '. 달이 떠올랐다. 처음 본 그 달보다 크고, 그 어느 해보다 붉었다.',
    W('혈월봉 북쪽 절벽 위', '맹의 뜰에서 보이는 서쪽 하늘', '당신이 머물던 마을 뒤 산마루') + '에 금이 갔다. 금은 천천히 벌어져 문의 모양이 되었다. 구천의 문이다.',
    early ? '구천문은 기다리지 않았다. 당신이 준비를 마치기도 전에, 하늘이 먼저 열렸다.' : '황혼의 전쟁은 이 밤을 위한 것이었다. 이제 남은 것은 문 하나와 그 앞에 선 자 하나다.');
  var p2 = [];
  p2.push(dTruth() ? '당신은 안다. 굴레는 자물쇠였고, 그 자물쇠가 지금 녹아내리고 있다는 것을.' : '왜 하필 지금인지 당신은 모른다. 다만 붉은 달과 저 문이 같은 숨을 쉬고 있다는 것만은 알 수 있었다.');
  p2.push(allies.length ? '문 아래로 사람들이 모여들었다. ' + dJoin(allies) + '.' : '문 아래에 선 사람은 당신 하나였다.');
  if (S.sect || (S.disc || []).length) p2.push((S.sect ? dSect() + '의 문도들이 횃불을 들었다. ' : '') + ((S.disc || []).length ? dTopDisc() + '이(가) 당신의 칼을 받쳐 들고 뒤에 섰다.' : ''));
  if (seats) p2.push('일곱 자리 중 ' + seats + '자리는 이미 비어 있다. 문 안에서 들려오는 숨소리가 그만큼 가늘다.');
  if (hasMem('d_gate')) p2.push('지난 생의 기억이 말한다. 일좌는 문이 반쯤 열린 순간에만 몸을 드러낸다. 그때를 노려라.');
  pages('마지막 혈월', [p1, ps.apply(null, p2)], 'ch6', function () { dFinalPrep(); });
}
function dFinalPrep() {
  var F = S.flags, prep = dPrep(), ds = S.disc || [], allies = dAllies();
  var base = clamp(1.3 - prep * .05, .6, 1.3);
  var go = function (mul, note) { dFinalFight(mul, note); };
  var ch = [];
  ch.push({ t: '문도와 제자를 앞세워 문을 에워싼다', h: '사자들의 길을 막는다 · 일좌가 크게 약해진다 · 누군가 다칠 수 있다', off: (S.sect || ds.length >= 2) ? null : '앞세울 문도나 제자가 없다', f: function () {
    var lost = ds.length >= 3 && Math.random() < .5 ? dDisc()[ds.length - 1] : null;
    if (lost) { S.disc = S.disc.filter(function (d) { return d !== lost; }); F.d_finalLost = lost.n; }
    go(base * .8, lost ? '<b>' + esc(lost.n) + '</b>이(가) 사자 하나를 끌어안고 함께 떨어졌다. 그 빈자리를 밟고 당신이 문 앞에 섰다.' : '문도들이 사자들의 길을 막았다. 당신은 곧장 문 앞으로 걸었다.'); } });
  ch.push({ t: '동맹에게 문의 양 날개를 맡긴다', h: '함께 싸운다 · 일좌가 약해진다', off: allies.length >= 2 ? null : '함께 설 동맹이 둘은 있어야 한다', f: function () { if (allies.length >= 3) ach('d_old'); go(base * .85, dJoin(allies.slice(0, 3)) + '이(가) 문의 좌우를 맡았다. 오랜 세월 갈라져 있던 깃발들이 한 줄로 섰다.'); } });
  if (hasMem('d_gate')) ch.push({ t: '문이 반쯤 열릴 때를 기다린다', h: '[기억] 일좌가 드러나는 순간을 노린다', c: 'primary', f: function () { go(base * .78, '문이 반쯤 열렸다. 그 틈으로 흰 손 하나가 나오는 순간, 당신은 이미 거기 있었다.'); } });
  if (S.noReturn) ch.push({ t: '돌아올 수 없는 몸으로 맨 앞에 선다', h: '[굴레 밖] 문이 당신을 읽지 못한다 · 일좌가 약해진다', f: function () { go(base * .85, '문은 되감긴 시간을 먹는다. 당신에게는 되감을 시간이 없다. 문에서 흘러나온 힘이 당신을 비켜 갔다.'); } });
  ch.push({ t: '홀로 문 앞에 선다', h: '치명적 결전 · 준비한 만큼만 쉬워진다', f: function () { go(base, '당신은 혼자 걸어 나갔다. 오래전부터 이렇게 끝날 것 같았다.'); } });
  scene('구천의 문', '<p>문이 숨을 쉰다. 들이쉴 때마다 달이 붉어지고, 내쉴 때마다 하늘에서 하얀 재가 내린다.</p><p>문틈 너머에서 목소리가 들렸다. “스물네 번째로구나. 앞의 스물셋처럼, 너도 문을 열어 주러 왔느냐.”</p><p class="dim">준비의 무게 ' + Math.round(prep) + ' · 문파 ' + (S.sect ? S.sect.lv : 0) + ' · 제자 ' + ds.length + ' · 동맹 ' + allies.length + ' · 꺾은 사자 ' + dSeats() + '</p>', ch, 'ch6');
}
function dFinalFight(mul, note) {
  result('일좌', ps(note, '하얀 옷의 사내가 문틈에서 걸어 나왔다. 나이도 얼굴도 읽히지 않았다. 구천문 일좌, 사람들은 그를 천문이라 불렀다.', '“오래 기다렸다. 붉은 달이 다 녹을 때까지.”'), function () {
    fight('d_s1', et() + .9, { auto: true, title: '구천의 문 · 마지막 혈월', heal: 1, hpMul: mul,
      win: function () { S.flags.d_finalWon = true; ach('d_gate'); dFinalChoice(); },
      lose: function () { die('d_gate'); } });
  }, 'ch6');
}
function dFinalChoice() {
  var F = S.flags, ds = S.disc || [], allies = dAllies(), ch = [];
  var body = ps('일좌가 무릎을 꿇었다. 그의 흰 옷이 재가 되어 날렸다. “문은... 너를 기다리고 있다. 닫든, 부수든, 지나가든.”',
    '문은 아직 열려 있다. 붉은 달이 문틈으로 조금씩 빨려 들어간다. 이대로 두면 굴레도, 이 세상의 봄도 저 너머로 흘러갈 것이다.',
    F.d_finalLost ? esc(F.d_finalLost) + '의 칼이 문 앞 바위에 꽂혀 있었다.' : '바람이 멎었다. 이제 고를 시간이다.');
  ch.push({ t: '문 안으로 들어가 안에서 문을 닫는다', h: '희생 · 이 생이 여기서 끝난다', f: function () { finish('d_seal'); } });
  ch.push({ t: '문을 부순다', h: '하늘로 가는 길을 무너뜨린다 · 몸이 상한다', off: (S.realm >= 6 || dSeats() >= 2) ? null : '문을 부술 힘이 없다 (현경 이상, 또는 사자 둘 이상을 꺾어야 한다)', f: function () { finish('d_break'); } });
  ch.push({ t: '문을 지나 하늘 위의 하늘로 오른다', h: '승천 · 아래 세상을 두고 간다', off: (S.realm >= 7 || (S.realm >= 6 && S.mad < 50)) ? null : '문 너머를 견딜 몸이 아니다 (생사경 이상, 또는 현경에 마기 50 미만)', f: function () { finish('d_ascend'); } });
  ch.push({ t: '혈월천마의 빈 자리에 앉는다', h: '굴레를 이어받는다 · 되감기를 지키는 자가 된다', off: S.noReturn ? '굴레를 끊은 몸은 다시 굴레에 앉을 수 없다' : (dTruth() || S.path === 'cheonma' || S.path === 'throne' ? null : '굴레의 목적을 알아야 한다'), f: function () { finish('d_heir'); } });
  ch.push({ t: '문을 반쯤 열어 둔 채 다음 세대에게 맡긴다', h: '이름 없는 평화 · 남은 해를 살고 결말을 맞는다', off: ((S.sect && S.sect.lv >= 2) || ds.length >= 2 || allies.length >= 3) ? null : '문을 맡길 사람이 없다 (문파 2단계, 제자 둘, 또는 동맹 셋)', f: function () { dDefer('d_peace', '당신은 문 앞에 첫 번째 파수를 세웠다. ' + (ds.length ? dTopDisc() + '이(가) 맨 앞에 섰다.' : '사람들이 돌아가며 서기로 했다.') + ' 당신은 산을 내려왔다.'); } });
  if (S.noReturn) ch.push({ t: '한 번뿐인 남은 해를 문 앞에 내려놓는다', h: '[진엔딩] 굴레와 문을 함께 끝낸다', c: 'primary', off: dTruth() ? null : '굴레의 목적을 아직 모른다 (천마총 심층에서 진실을 들어야 한다)', f: function () { dDefer('d_true', '문이 닫혔다. 달이 하얗게 식었다. 당신의 남은 해는 그대로 당신에게 돌아왔다. 다만 이제 그 해들은 정말로 한 번씩만 온다.'); } });
  scene('문 앞에서', body, ch, 'ch6');
}
function dDefer(id, txt) {
  S.flags.d_after = id;
  scene('마지막 혈월 이후', ps(txt, '이야기는 여기서 맺을 수도 있고, 남은 해를 끝까지 산 뒤에 맺을 수도 있다.'), [
    { t: '남은 날들을 산다', h: '수명이 다하면 이 결말을 맞는다 · 후일담이 이어진다', c: 'primary', f: function () { S.hp = maxHp(); S.mad = 0; done('붉은 달이 진 뒤의 첫 아침이었다. 몸 구석구석이 아팠고, 그것이 살아 있다는 뜻이었다.', 'event'); } },
    { t: '여기서 이야기를 맺는다', h: '바로 결말을 맞는다', f: function () { finish(id); } }], id === 'd_true' ? 'true' : 'peace');
}

/* ================= 인물 ================= */
addNpc('d_jeokha', { n: '적하', role: '제7대 천마의 잔영', desc: '천마총 깊은 곳에서 웃는 붉은 그림자. 굴레를 사랑으로 끊으려 했던 천마.', world: ['ma', 'jeong', 'wander'], flag: 'd_jeokha_met', dead: 'd_jeokhaGone' },
  function () {
    var q1 = qiPct(.02), q2 = qiPct(.045);
    scene('천마총 심층', npcHead('d_jeokha') + '<p>' + pick(['붉은 그림자가 석관 위에 걸터앉아 다리를 흔들었다. “또 왔네. 산 사람은 여기 오래 있으면 안 되는데.”', '적하는 벽에 손가락으로 매화를 그리고 있었다. 그린 자리마다 붉은 빛이 잠깐 피었다 졌다.', '“밖은 지금 무슨 계절이야?” 적하가 물었다. 대답하자 그녀는 그 계절의 냄새를 떠올리려는 듯 눈을 감았다.']) + '</p>', [
      { t: '그녀의 옛이야기를 듣는다', h: '마기 -15 · 내공 +' + q1, f: function () { S.mad = Math.max(0, S.mad - 15); S.qi += q1; gain('d_jeokha', 1, '<p>적하는 오백 년 전 강가에서 만난 검객 이야기를 했다. 이름은 끝내 말하지 않았다. “이름을 말하면 그 사람이 여기 갇힐 것 같아서.”</p>'); } },
      { t: '혈월의 기운을 다스리는 법을 묻는다', h: '내공 +' + q2 + ' · 마기 +8', f: function () { S.qi += q2; dMad(8); gain('d_jeokha', 1, '<p>“달을 삼키려 하지 마. 달이 지나가게 둬.” 그녀의 손이 당신 등에 닿자 붉은 기운이 혈맥을 한 바퀴 돌고 빠져나갔다.</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { learnMem('d_redhaze'); result('적하의 말', npcHead('d_jeokha') + '<p>“나는 굴레를 끊으려고 그 사람에게 기억을 줬어. 몇 번을 죽어도 나를 기억하게. 그게 그 사람을 부쉈지.” 적하가 웃었다. 웃는 얼굴이 울고 있었다.</p><p>“굴레는 끊는 게 아니야. 누군가 짊어지는 거야. 그걸 너무 늦게 알았어.”</p>', d); } },
   { t: 4, run: function (d) { var g = dLife(2); result('남은 숨', npcHead('d_jeokha') + '<p>적하가 당신의 손을 잡았다. 차가운 손이었는데, 잡힌 자리가 오래 따뜻했다. “나한텐 이제 쓸 데 없는 거야. 가져가.”</p><p>' + (g ? '수명이 <b>' + g + '년</b> 늘었다.' : '이미 몸이 받을 만큼 받았다. 그래도 마음이 따뜻했다.') + '</p>', d); } }]);

/* ================= E7 혈월의 진실 (601~696) ================= */
EVENTS.push({ m: 603, id: 'd_e7_open', cond: dPre, run: function () {
  var q = qiPct(.04);
  scene('지지 않는 달', ps(
    '그해 봄, 혈월이 지지 않았다. 해가 떠도 서쪽 하늘에 붉은 달이 희미하게 걸려 있었다.',
    W('장로들은 흉조라 했고, 교도들은 쉬쉬했다. 천마총 쪽 절벽에서 밤마다 숨소리 같은 바람이 올라왔다.', '맹의 천문관이 사흘 밤을 새우고도 이유를 대지 못했다. 맹주는 입을 닫으라 명했다.', '객잔 사람들은 달을 보지 않으려고 창을 닫았다. 아이들만 손가락으로 달을 가리켰다.'),
    age() + '세. 당신은 그 달을 오래 올려다보았다. 처음 본 그 밤의 달과 같은 색이었다. 아니, 조금 더 짙었다.'), [
    { t: '천마총으로 내려간다', h: '심층의 문이 열린다 · 내공 +' + q, c: 'primary', f: function () { S.flags.d_tomb7 = 1; S.flags.tomb = true; S.qi += q; done('천마총 입구의 돌문이 전보다 한 자 더 열려 있었다. 그 안쪽, 지금껏 없던 계단이 아래로 이어졌다.', 'event'); } },
    { t: '옛 기록부터 뒤진다', h: '은전 -' + price(60) + ' · 기억이 단단해진다', off: S.silver < price(60) ? '은전이 모자란다' : null, f: function () { S.silver -= price(60); S.flags.d_tomb7 = 1; S.flags.tomb = true; if (!hasMem('lore')) learnMem('lore'); done('사람을 사서 묵은 기록을 모았다. 오백 년 동안 혈월이 지지 않은 해는 스물세 번. 그때마다 천마 한 명이 천마총으로 내려가 돌아오지 않았다.', 'event'); } },
    { t: '창을 닫고 운기한다', h: '마기 -10 · 아무 일도 없다', f: function () { S.mad = Math.max(0, S.mad - 10); done('달을 보지 않기로 했다. 그래도 눈을 감으면 붉은빛이 눈꺼풀 안쪽에 남았다.', 'rest'); } }], 'loc_tomb');
} });

EVENTS.push({ m: 615, id: 'd_e7_depth', cond: dPre, run: function () {
  var F = S.flags;
  if (S.realm < 3) { hurt(.2); result('밀어내는 문', ps('심층으로 내려가는 계단 앞에서 피가 거꾸로 돌았다. 문이 당신을 밀어냈다.', '아직은 그 아래를 버틸 몸이 아니다. 절정에 이르러야 한다.'), function () { done('계단 아래에서 무언가 기다리는 기척만 느끼고 돌아섰다.', 'fail'); }, 'loc_tomb'); return; }
  var body = ps('계단은 끝이 없었다. 셈을 그만둘 즈음 넓은 석실이 나왔다. 스물세 개의 기둥이 원을 그리며 서 있고, 한가운데 돌 거인이 무릎을 꿇고 있었다.',
    '거인의 가슴에 글자가 새겨져 있다. 「지나가려는 자는 무게를 증명하라」.' + (hasMem('d_depth') ? ' 그리고 당신은 기억한다. 왼쪽 셋째 기둥 아래로 가면 거인은 눈을 뜨지 않는다.' : ''));
  var ch = [];
  if (hasMem('d_depth')) ch.push({ t: '셋째 기둥 아래로 비켜 간다', h: '[기억] 싸우지 않고 지나간다 · 옥정', c: 'primary', f: function () { addMat('jade', 2); F.d_depth = 1; done('거인은 끝내 눈을 뜨지 않았다. 기둥 밑에 굴러다니던 옥정 <b>2</b>개를 주워 더 깊이 내려갔다.', 'event'); } });
  ch.push({ t: '거인과 맞선다', h: '강적 · 이기면 길과 기억 · 지면 크게 다친다', f: function () {
    fight('d_warden', et() * 1.05, { auto: true, spar: true, title: '총묘의 수문장', heal: .3,
      win: function () { var q = qiPct(.06); S.qi += q; addMat('jade', 2); addMat('bone', 3); F.d_depth = 1; learnMem('d_depth'); done('거인이 무너지며 왼쪽 셋째 기둥 쪽으로 쓰러졌다. 그 자리만 바닥이 닳아 있었다. 앞서 온 누군가는 싸우지 않고 지나갔다는 뜻이다. 내공 +' + q + ', 옥정 2, 영수의 뼈 3.', 'fight'); },
      lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .25)); learnMem('d_depth'); done('돌주먹에 기둥까지 날아갔다. 기둥 밑에 엎드려 피를 토하는 동안 거인은 당신을 보지 못했다. 왼쪽 셋째 기둥 아래였다.', 'fail'); } }); } });
  ch.push({ t: '아직은 돌아선다', h: '아무 일도 없다', f: function () { done('계단을 다시 올랐다. 다 올라왔을 때 무릎이 떨렸다. 나이 탓만은 아니었다.', 'event'); } });
  scene('스물세 개의 기둥', body, ch, 'loc_tomb');
} });

EVENTS.push({ m: 627, id: 'd_e7_jeokha', cond: dPre, run: function () {
  var F = S.flags, q = qiPct(.06);
  pages('붉은 그림자', [ps('기둥들 너머는 무덤이었다. 스물세 개의 석관이 아니라, 스물세 개의 방. 방마다 누군가 살다 간 흔적이 있었다.',
    '일곱 번째 방에서 웃음소리가 났다. 석관 위에 붉은 옷의 여인이 앉아 있었다. 발끝이 땅에 닿지 않았다.',
    '“살아 있는 사람이네.” 여인이 손뼉을 쳤다. “제7대 천마, 적하야. 하도 오래돼서 이름이 맞는지도 모르겠지만.”')], 'loc_tomb', function () {
    scene('제7대 천마', '<p>“너도 굴레를 끊으러 왔어? 다들 그러더라. 나도 그랬고.” 적하가 다리를 흔들었다. “앉아. 산 사람 얼굴 보는 거 오백 년 만이야.”</p>', [
      { t: '마주 앉아 이야기를 청한다', h: '적하와 인연을 맺는다 · 기억', c: 'primary', f: function () { meet('d_jeokha'); F.d_jeokha_met = true; F.d_shadeN = (F.d_shadeN || 0) + 1; learnMem('d_redhaze'); gain('d_jeokha', 1, '<p>적하는 굴레를 끊으려 했다고 했다. 사랑하는 사람에게 기억을 주어, 몇 번을 죽어도 자기를 잊지 않게 했다고.</p><p>“그 사람은 백 번째 봄에 미쳤어. 기억은 칼이야. 손잡이가 없는.” 그녀가 당신을 보았다. “너는 손잡이를 쥐고 있네. 신기하다.”</p>'); } },
      { t: '천마의 힘을 나눠 달라고 한다', h: '내공 +' + q + ' · 마기 +15', f: function () { S.qi += q; dMad(15); meet('d_jeokha'); F.d_jeokha_met = true; F.d_shadeN = (F.d_shadeN || 0) + 1; done('적하가 깔깔 웃더니 당신 이마에 입김을 불었다. 붉은 것이 정수리로 쏟아져 들어왔다. “욕심 많은 애는 오래 살아.” 내공 +' + q + '.', 'qi'); } },
      { t: '절하고 물러난다', h: '마기 -15', f: function () { S.mad = Math.max(0, S.mad - 15); done('일곱 번째 방 앞에서 절을 했다. 등 뒤에서 적하가 중얼거렸다. “예의 바른 애는 금방 죽던데.”', 'rest'); } }], 'loc_tomb');
  });
} });

EVENTS.push({ m: 639, id: 'd_e7_mumyeon', cond: dPre, run: function () {
  var F = S.flags;
  scene('얼굴 없는 천마', ps('열다섯 번째 방은 비어 있었다. 벽에 걸린 가면 하나만 빼고.',
    '가면이 바닥에 떨어지자 그 아래에서 사람의 형체가 일어섰다. 얼굴이 있어야 할 자리가 매끈했다. 제15대 천마, 무면. 기록에는 이름조차 지워져 있던 자다.',
    '“말은 칼로 하자.” 목소리가 방 전체에서 울렸다. “내 앞의 열넷도, 뒤의 여덟도, 말만 많았다.”'), [
    { t: '칼로 답한다', h: '강적 · 져도 죽지는 않는다 · 이기면 구천문의 이야기', c: 'primary', f: function () {
      fight('d_shade', et() + .3, { auto: true, spar: true, title: '무면천마의 잔영', heal: .4,
        win: function () { var q = qiPct(.07); S.qi += q; F.d_mumyeon = 2; F.d_shadeN = (F.d_shadeN || 0) + 1;
          result('얼굴을 찢은 이유', ps('무면이 칼을 거두었다. “구천문이 나를 찾아왔었다. 문을 열어 주면 하늘 위로 데려가 주겠다고. 이름과 얼굴이 하늘에 새겨질 거라고.”', '“그래서 얼굴을 찢었다. 새길 것이 없으면 데려갈 것도 없지.” 매끈한 얼굴이 당신을 향했다. “너는 무엇을 찢을 테냐.”', '내공 +' + q + '.'), function () { done('열다섯 번째 방을 나서며 얼굴을 한 번 쓸어 보았다. 주름이 깊었다. 아직은 찢을 생각이 없었다.', 'fight'); }, 'loc_tomb'); },
        lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); F.d_mumyeon = 1; F.d_shadeN = (F.d_shadeN || 0) + 1; done('무면의 칼이 목 앞에서 멈췄다. “구천문. 그 이름만 가져가라.” 그 말을 끝으로 그는 다시 가면 속으로 들어갔다.', 'fail'); } }); } },
    { t: '가면을 다시 벽에 건다', h: '마기 -10 · 싸우지 않는다', f: function () { S.mad = Math.max(0, S.mad - 10); F.d_shadeN = (F.d_shadeN || 0) + 1; done('가면을 주워 제자리에 걸었다. 형체가 스르르 가라앉았다. 마지막에 들린 말은 “구천”이라는 두 글자뿐이었다.', 'rest'); } }], 'loc_tomb');
} });

EVENTS.push({ m: 651, id: 'd_e7_hyeokryeon', cond: dPre, run: function () {
  var F = S.flags, q = qiPct(.08), tru = S.path === 'true';
  var body = ps('스물두 번째 방에는 늙은 잔영이 가부좌를 틀고 있었다. 제22대 천마 혁련승. ' + W('위무강의 스승이다. 총단 대전에 걸린 초상화보다 훨씬 작았다.', '마교의 기록이 그를 위무강의 스승이라 적고 있었다.', '이름은 처음 듣는다. 그러나 앉은 자세에서 위무강의 그림자가 보였다.'),
    '“네가 올 줄 알았다.” 노인이 눈을 떴다. ' + (tru ? '“아니, 네가 그 아이로구나. 핵을 부순 아이. 그래서 문이 이리 빨리 열리는 게야.”' : '“다들 핵을 부수면 끝날 줄 알지. 핵을 부수면 문이 열린다. 그건 아무도 안 적어 놨지.”'),
    F.masterDead ? '“무강이는 갔더구나. 여기 오지는 않았다. 잘한 일이다.”' : '“무강이는 아직 숨이 붙어 있느냐. 그 아이는 여기 오지 말라 해라.”');
  scene('제22대 천마', body, [
    { t: '구천의 문을 묻는다', h: '기억 · 마지막 결전이 수월해진다', c: 'primary', f: function () { learnMem('d_gate'); F.d_shadeN = (F.d_shadeN || 0) + 1; done('“마지막 혈월에 문이 열린다. 일좌는 겁이 많아서 문이 반쯤 열리기 전엔 나오지 않아.” 노인은 손가락 하나를 세웠다. “그 반 각을 놓치지 마라. 나는 놓쳤다.”', 'event'); } },
    { t: '남은 내공을 받는다', h: '내공 +' + q, f: function () { S.qi += q; F.d_shadeN = (F.d_shadeN || 0) + 1; done('노인의 손바닥이 당신의 단전에 닿았다. 오래 묵은 기운이 강물처럼 흘러들었다. “어차피 내 것도 아니었다.” 내공 +' + q + '.', 'qi'); } },
    { t: '위무강의 젊은 날을 묻는다', h: '체력 회복 · 마기 -20', f: function () { S.hp = maxHp(); S.mad = Math.max(0, S.mad - 20); F.d_shadeN = (F.d_shadeN || 0) + 1; done('노인은 한참 웃었다. 위무강은 열여섯 살 때 매화 가지로 칼싸움을 하다 사형의 눈썹을 밀어 버렸다고 했다. 무덤 속에서 처음으로 웃었다.', 'rest'); } }], 'loc_tomb');
} });

EVENTS.push({ m: 663, id: 'd_e7_founder', cond: dPre, run: function () {
  var F = S.flags, n = F.d_shadeN || 0, known = hasMem('d_truth');
  pages('혈월천마', [ps('가장 깊은 곳에는 방이 없었다. 하늘만 있었다. 땅 밑인데 하늘이 있었고, 그 하늘에 붉은 달이 떠 있었다.',
    '달 아래에 한 사람이 서 있었다. 등을 돌린 채였다. 오백 년 전 이 모든 것을 시작한 자, 혈월천마.',
    n >= 3 ? '“' + (n >= 4 ? '넷' : '셋') + '을 만났구나. 그 아이들이 말을 많이 했겠지.” 그가 돌아섰다. 얼굴은 평범했다. 너무 평범해서 서글펐다.' : '“여기까지 내려온 스물넷째로구나.” 그가 돌아섰다. 얼굴은 평범했다. 너무 평범해서 서글펐다.'),
    ps(known ? '당신은 이미 이 이야기를 안다. 그래도 그의 입으로 다시 듣고 싶었다.' : '그가 하늘의 달을 가리켰다.',
      '“이건 저주가 아니다. 자물쇠다. 하늘 위에 문이 있다. 그 문을 열려는 자들이 있다. 문은 시간이 쌓이면 열린다. 그래서 나는 시간을 되감았다. 죽으면 봄으로 돌아가게. 쌓이지 못하게.”',
      '“스물셋이 이 굴레를 끊으러 왔다. 끊으면 문이 열린다고 말해 주었다. 다들 돌아가지 않았다. 여기서 늙었다. 굴레를 끊지도, 짊어지지도 못하고.”',
      '“이제 달이 녹는다. 오백 년이면 자물쇠도 녹슨다. 마지막 혈월이 온다. 그때 문 앞에 누가 서 있을지, 나는 궁금하다.”')], 'ch6', function () {
    learnMem('d_truth'); F.d_truth = 1; ach('d_truth');
    var q = qiPct(.05);
    scene('굴레의 목적', '<p>혈월천마가 당신의 대답을 기다린다.</p>', [
      { t: '“왜 우리에게 말하지 않았소.”', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); done('“말했으면 너희는 살았겠느냐. 죽는 것이 두렵지 않은 자는 문을 지키지 못한다.” 그는 그렇게 말하고 다시 등을 돌렸다. 그 등이 생각보다 좁았다.', 'event'); } },
      { t: '“그 문, 내가 닫겠소.”', h: '내공 +' + q, c: 'primary', f: function () { S.qi += q; F.d_vow = 1; done('혈월천마가 처음으로 웃었다. “앞의 스물셋도 그렇게 말했다.” 그러나 그는 당신의 어깨를 한 번 두드렸다. 그 손에서 달빛 같은 기운이 흘러들었다. 내공 +' + q + '.', 'qi'); } },
      { t: '말없이 칼을 뽑는다', h: '마기 +10 · 그는 싸우지 않는다', f: function () { dMad(10); done('혈월천마는 칼끝을 보고도 움직이지 않았다. “나를 베도 달은 그대로다.” 칼을 거두는 데 오래 걸렸다.', 'event'); } }], 'ch6');
  });
} });

EVENTS.push({ m: 675, id: 'd_e7_choice', cond: dPre, run: function () {
  var F = S.flags, tru = dTruth();
  var body = ps(tru ? '천마총에서 올라온 지 한 해. 들은 이야기가 목에 걸려 있다. 굴레는 자물쇠다. 그리고 그 자물쇠가 녹고 있다.' : '천마총 깊은 곳에서 들은 소문이 강호로 새어 나갔다. 혈월이 무언가를 막고 있다는, 반쯤 미친 소리였다.',
    W('장로회는 당신의 입을 바라보고 있다. 말 한마디에 교가 흔들릴 수도 있다.', '맹의 원로들은 당신이 무엇을 보고 왔는지 묻지 않았다. 묻지 않는 것이 더 무서웠다.', '객잔의 늙은 이야기꾼이 당신에게 술을 샀다. “그 아래 뭐가 있소?”'));
  scene('진실 앞에서', body, [
    { t: '본 것을 세상에 알린다', h: '동맹이 생긴다 · 원한도 생긴다', f: function () { F.d_reveal = 1; if (worldOf() === 'jeong') F.d_ally_jeong = 1; else if (worldOf() === 'ma') F.d_ally_ma = 1; else F.d_ally_town = 1; F.d_grudge = (F.d_grudge || 0) + 1; done(W('대전에서 장로들 앞에 섰다. 절반은 믿었고 절반은 당신을 미쳤다고 했다. 믿은 절반이 검은 깃발 아래 모였다.', '원로회에서 모든 것을 말했다. 청허의 제자들은 침묵했고, 젊은 검수들은 칼자루를 쥐었다. 흰 깃발 하나가 당신 쪽으로 기울었다.', '이야기꾼에게 다 말해 주었다. 한 달 뒤 그 이야기는 열 개 고을의 노래가 되어 있었다.') + ' 그리고 그 노래를 싫어하는 자들도 생겼다.', 'people'); } },
    { t: '가슴에 묻는다', h: '마기 -20 · 내공 +' + qiPct(.04), f: function () { var q = qiPct(.04); F.d_secret = 1; S.mad = Math.max(0, S.mad - 20); S.qi += q; done('아무에게도 말하지 않았다. 대신 밤마다 달 아래에서 운기했다. 혼자 아는 진실은 무거웠지만, 그 무게가 단전을 눌러 주었다. 내공 +' + q + '.', 'qi'); } },
    { t: '구천문의 꼬리를 먼저 쫓는다', h: '전투 · 이기면 구천문의 정보', f: function () {
      fight('d_acolyte', et(), { auto: true, spar: true, title: '혈정 밀매꾼', heal: .2,
        win: function () { F.d_intel = 1; S.silver += price(150); addMat('gem', 1); done('서역 혈정 밀매꾼의 장부를 빼앗았다. 장부 끝에 아홉 개의 자리가 그려져 있고, 그 중 둘이 지워져 있었다. 은전 <b>' + price(150) + '</b>냥, 보석 1.', 'fight'); },
        lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('밀매꾼은 하얀 연기와 함께 사라졌다. 연기에서 단 냄새가 났다.', 'fail'); } }); } }], 'court');
} });

EVENTS.push({ m: 687, id: 'd_e7_envoy', cond: dPre, run: function () {
  var F = S.flags;
  scene('철의 깃', ps('천마총 입구에 낯선 사내가 서 있었다. 키가 아홉 자, 어깨에 쇳빛 깃털 망토. 사내가 주먹으로 바위를 누르자 바위가 소리 없이 가루가 되었다.',
    '“구천문 칠좌, 철우다. 아래 늙은이들과 이야기했느냐.” 사내가 웃었다. “상관없다. 마지막 혈월에 문이 열린다. 그날 길을 비켜라. 그러면 너도 위로 데려가 주마.”'), [
    { t: '지금 겨룬다', h: '보스 · 져도 죽지는 않는다 · 이기면 칠좌의 자리가 빈다', f: function () {
      fight('d_s7', et() + .6, { auto: true, spar: true, title: '칠좌 철우', heal: .5,
        win: function () { F.d_s7 = 1; var q = qiPct(.08); S.qi += q; addMat('core', 1); done('철우의 쇠 깃털이 한 장씩 떨어져 나갔다. 그는 무릎을 꿇은 채 웃었다. “늙은 몸으로...” 그리고 하얀 재가 되었다. 내공 +' + q + ', 영단 1.', 'fight'); },
        lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); F.d_s7read = 1; done('철우의 주먹이 당신 옆의 바위를 부쉈다. 일부러 빗나간 것이다. “다음엔 맞힌다.” 그의 주먹은 늘 크게 휘두르고, 휘두르기 전에 숨을 모은다. 그것만은 보았다.', 'fail'); } }); } },
    { t: '대답하지 않고 그의 버릇을 읽는다', h: '다음 싸움이 수월해진다', f: function () { F.d_s7read = 1; done('철우는 말할 때마다 오른발에 무게를 실었다. 힘으로만 사는 자의 버릇이었다. 당신은 끝까지 대답하지 않았다. 그가 혀를 차고 떠났다.', 'event'); } },
    { t: '“위로 가서 무엇을 하려는가.”', h: '구천문의 속을 떠본다', f: function () { F.d_intel = 1; done('“하늘 위의 하늘엔 늙음도 죽음도 없다.” 철우가 말했다. “그러니 너희 같은 것들이 필요 없지.” 그가 떠난 뒤에도 그 말이 오래 남았다.', 'event'); } }], 'loc_tomb');
} });

addNpc('d_hwa', { n: '화원', role: '구천문을 등진 육좌', desc: '하늘 위로 오르기를 그만둔 초월자. 늙는 법을 배우는 중이다.', world: ['ma', 'jeong', 'wander'], flag: 'd_hwa_met', dead: 'd_hwaDead' },
  function () {
    var q = qiPct(.03);
    scene('화원의 은신처', npcHead('d_hwa') + '<p>' + pick(['화원은 텃밭에서 무를 뽑고 있었다. 흙 묻은 손을 한참 들여다보았다. “이것도 하늘 위엔 없지.”', '화원이 거울 앞에 앉아 흰머리를 세고 있었다. “어제보다 셋 늘었소. 신기한 일이오.”', '은신처 문 앞에 화원이 앉아 해 지는 것을 보고 있었다. 그는 노을을 처음 보는 사람처럼 보았다.']) + '</p>', [
      { t: '사자들의 버릇을 묻는다', h: '내공 +' + q + ' · 사자와의 싸움이 수월해진다', f: function () { S.qi += q; S.flags.d_intel = 1; S.flags[pick(['d_s5read', 'd_s3read', 'd_s2read'])] = 1; gain('d_hwa', 1, '<p>화원은 옛 동료들의 이야기를 담담하게 했다. 누가 왼손을 아끼는지, 누가 숨을 들이쉴 때 빈틈이 생기는지. “미안해할 줄 알았는데, 그렇지도 않구려.”</p>'); } },
      { t: '혈정을 씻어 내는 법을 배운다', h: '마기 -20 · 해독단 +1', f: function () { S.mad = Math.max(0, S.mad - 20); S.items.antidote = (S.items.antidote || 0) + 1; gain('d_hwa', 1, '<p>화원이 숯과 쑥을 섞어 환을 빚었다. “혈정은 위에서 내려 보낸 미끼요. 삼키면 위가 그립게 되지.”</p>'); } },
      { t: '돌아간다', f: function () { hub(); } }]);
  },
  [{ t: 2, run: function (d) { learnMem('d_mirror'); result('수경의 거울', npcHead('d_hwa') + '<p>“오좌 수경은 거울을 쓰오. 당신이 꾀를 쓰면 그 꾀가 그대로 돌아오지.” 화원이 주먹을 쥐어 보였다. “정직하게 치시오. 거울은 정직한 것에 약하오.”</p>', d); } },
   { t: 3, run: function (d) { S.flags.d_ally_hwa = 1; result('화원의 맹세', npcHead('d_hwa') + '<p>화원이 무릎을 꿇었다. 초월자가 무릎을 꿇는 모습은 생각보다 어색했다. “마지막 혈월에 문 앞에 서겠소. 이번에는 아래쪽에.”</p>', d); } }]);

/* ================= E8 잔월 (697~792) ================= */
EVENTS.push({ m: 699, id: 'd_e8_plague', cond: dPre, run: function () {
  var F = S.flags, cost = price(400);
  var body = ps('봄이 오기 전에 병이 먼저 왔다. 열이 오르고, 눈이 붉어지고, 사흘째 밤에 숨이 멎는다. 사람들은 붉은 역병이라 불렀다.',
    W('산 아래 마을부터 시작해 총단 외당까지 번졌다. 약당의 불이 꺼지지 않았다.', '맹의 의원들이 성마다 흩어졌지만 일손이 모자랐다. 무사들도 쓰러졌다.', '당신이 머물던 고을의 우물가에서 처음 시작되었다. 객잔 주인이 첫 번째로 죽었다.'),
    alive('hr') && dMet('hr') ? '홍란이 늙은 손으로 맥을 짚다가 고개를 저었다. “이건 병이 아니야. 독이야. 누가 뿌린 거야.”' : '병자들의 피에서 희미하게 단 냄새가 났다.');
  var ch = [];
  if (hasMem('d_plague')) ch.push({ t: '우물마다 숯과 해독단을 넣는다', h: '[기억] 역병이 멈춘다 · 사람들이 당신을 기억한다', c: 'primary', f: function () { F.d_ally_town = 1; F.d_plagueStop = 1; S.mad = Math.max(0, S.mad - 15); done('지난 생에 배운 대로 했다. 이레 만에 열이 내렸다. 사람들은 당신을 신선이라 불렀다. 당신은 그저 기억을 갖고 있었을 뿐이다.', 'people'); } });
  ch.push({ t: '곳간을 열어 약과 쌀을 푼다', h: '은전 -' + cost + ' · 마을이 은혜를 기억한다', off: S.silver < cost ? '은전이 모자란다' : null, f: function () { S.silver -= cost; F.d_ally_town = 1; S.mad = Math.max(0, S.mad - 10); done('은전 <b>' + cost + '</b>냥어치 약재와 쌀을 풀었다. 죽는 사람은 줄지 않았지만, 굶어 죽는 사람은 없었다.', 'people'); } });
  ch.push({ t: '병의 근원을 쫓는다', h: '전투 · 이기면 역병의 비밀', f: function () {
    fight('d_ghoul', et() * .95, { auto: true, spar: true, title: '혈역의 시귀', heal: .2,
      win: function () { learnMem('d_plague'); F.d_plagueStop = 1; F.d_ally_town = 1; addMat('herb', 4); done('우물 바닥에 웅크린 시귀를 베었다. 그 몸에서 붉은 가루가 쏟아졌다. 혈정이었다. 숯과 해독단을 우물에 넣자 물이 맑아졌다. 약초 4.', 'fight'); },
      lose: function () { if (S.noReturn || Math.random() < .7) { S.hp = Math.max(1, Math.round(maxHp() * .2)); S.hpBonus = Math.max(0, (S.hpBonus || 0) - 6); done('시귀의 손톱에 긁혔다. 열이 이레 동안 내리지 않았다. 살아남았지만 몸이 한 겹 얇아졌다. 최대 체력 -6.', 'fail'); } else die('d_plague'); } }); } });
  ch.push({ t: '문을 걸어 잠근다', h: '은전을 지킨다 · 원한이 남는다 · 마기 +10', f: function () { F.d_grudge = (F.d_grudge || 0) + 1; dMad(10); done('문을 잠그고 병자들을 들이지 않았다. 문 밖의 기침 소리가 겨울 내내 이어졌다. 봄이 되자 그 소리가 멎었다.', 'event'); } });
  scene('붉은 역병', body, ch, 'loc_village');
} });

EVENTS.push({ m: 711, id: 'd_e8_famine', cond: dPre, run: function () {
  var F = S.flags, cost = price(500), gm = dFriend('금만석', 2);
  var body = ps('역병이 지나간 자리에 기근이 왔다. 밭을 갈 사람이 죽었고, 남은 사람은 씨앗을 먹었다.',
    '쌀값이 열 배가 되었다. ' + (gm ? '금만석이 늙은 몸을 이끌고 찾아왔다. “창고를 열겠소. 대신 길을 지켜 주시오.”' : '상인들은 창고를 걸어 잠갔다.'),
    W('교도들이 산 아래 마을의 곡식을 거두자고 했다.', '맹의 원로들이 세가의 창고는 세가의 것이라 했다.', '굶은 사람들이 당신 집 앞을 기웃거렸다.'));
  var ch = [];
  if (gm) ch.push({ t: '금만석의 수레를 호위한다', h: '전투 · 마을이 산다 · 은전', c: 'primary', f: function () { fight('bandit', et() * .9, { auto: true, spar: true, title: '굶주린 도적 떼', win: function () { F.d_ally_town = 1; S.silver += price(200); done('도적 떼를 쫓아내고 수레를 고을까지 끌었다. 금만석이 은전 <b>' + price(200) + '</b>냥을 쥐여 주었다. “남는 장사는 아니었소. 그래도 할 만했소.”', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('수레 반을 빼앗겼다. 남은 반으로 고을 하나가 겨울을 났다.', 'fail'); } }); } });
  ch.push({ t: '곡식을 사서 나눈다', h: '은전 -' + cost + ' · 마기 -15', off: S.silver < cost ? '은전이 모자란다' : null, f: function () { S.silver -= cost; F.d_ally_town = 1; S.mad = Math.max(0, S.mad - 15); done('곡식을 사서 고을마다 나누었다. 가는 곳마다 노인들이 당신 손을 잡았다. 당신보다 젊은 노인들이었다.', 'people'); } });
  ch.push({ t: '산에 들어가 짐승을 잡아 나눈다', h: '전투 · 가죽과 고기', f: function () { fight('tiger', et() * .8, { auto: true, spar: true, title: '굶주린 범', win: function () { addMat('hide', 3); addMat('bone', 2); F.d_ally_town = 1; done('늙은 범 한 마리를 잡아 고을에 내려보냈다. 범도 굶어 있었다. 짐승 가죽 3, 영수의 뼈 2.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('범도 굶주려 있었다. 서로 피만 흘리고 헤어졌다.', 'fail'); } }); } });
  ch.push({ t: '내 사람들부터 챙긴다', h: '은전 +' + price(200) + ' · 원한이 남는다', f: function () { S.silver += price(200); F.d_grudge = (F.d_grudge || 0) + 1; done('곳간을 걸고 ' + (S.sect ? dSect() + '의 문도들부터' : '가까운 사람들부터') + ' 먹였다. 남는 곡식은 비싸게 팔았다. 은전 <b>' + price(200) + '</b>냥. 고을 사람들의 눈빛은 팔지 못했다.', 'item'); } });
  scene('기근', body, ch, 'loc_village');
} });

EVENTS.push({ m: 723, id: 'd_e8_heir', cond: dPre, run: function () {
  var F = S.flags, ds = dDisc(), sect = S.sect ? S.sect.n : '';
  if (ds.length >= 2) {
    var a = ds[0], b = ds[1];
    scene('후계 전쟁', ps('당신이 일흔을 훌쩍 넘기자 사람들이 다음을 묻기 시작했다.',
      '<b>' + esc(a.n) + '</b>와(과) <b>' + esc(b.n) + '</b>. 둘 다 당신이 키웠다. 한 사람은 칼이 곧고, 한 사람은 사람을 모은다. ' + (sect ? dSect() + '의 문도들이 두 패로 갈렸다.' : '제자들이 두 패로 갈렸다.'),
      '어느 밤, ' + esc(b.n) + '의 사람들이 ' + esc(a.n) + '의 거처에 불을 질렀다. 불은 꺼졌지만, 이제 더 미룰 수 없다.'), [
      { t: esc(a.n) + '을(를) 후계로 세운다', h: esc(b.n) + '이(가) 칼을 든다 · 전투', c: 'primary', f: function () {
        F.d_heirName = a.n;
        fight('d_rebel', et() * .9, { auto: true, spar: true, title: '반역한 제자 ' + b.n, heal: .3,
          win: function () { S.disc = S.disc.filter(function (d) { return d !== b; }); F.d_rebelGone = b.n; done(esc(b.n) + '의 칼을 부러뜨렸다. 그는 당신이 가르친 초식으로 덤볐고, 당신은 가르치지 않은 초식으로 이겼다. ' + esc(b.n) + '은(는) 그날 밤 산을 내려갔다.', 'fight'); },
          lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); S.disc = S.disc.filter(function (d) { return d !== b; }); F.d_rebelGone = b.n; F.d_grudge = (F.d_grudge || 0) + 1; done(esc(b.n) + '의 칼이 당신 옆구리를 스쳤다. 그는 칼을 떨어뜨리고 울며 떠났다. 이긴 사람도 진 사람도 없었다.', 'fail'); } }); } },
      { t: esc(b.n) + '을(를) 후계로 세운다', h: esc(a.n) + '은(는) 조용히 떠난다', f: function () { F.d_heirName = b.n; S.disc = S.disc.filter(function (d) { return d !== a; }); F.d_rebelGone = a.n; done(esc(a.n) + '은(는) 아무 말 없이 절하고 떠났다. 칼이 곧은 사람은 꺾이지 않고 떠난다. 그 등이 오래 눈에 밟혔다.', 'people'); } },
      { t: '둘에게 나누어 맡긴다', h: '다툼이 가라앉는다 · 마기 -10 · 둘 다 남는다', f: function () { F.d_heirName = a.n; F.d_twoHeirs = 1; S.mad = Math.max(0, S.mad - 10); a.p = Math.min(100, a.p + 10); b.p = Math.min(100, b.p + 10); done('칼은 ' + esc(a.n) + '에게, 사람은 ' + esc(b.n) + '에게 맡겼다. 둘은 한참 서로를 노려보다가 함께 당신에게 절했다. 이게 오래가지 않을 수도 있다. 그래도 지금은 이것으로 됐다.', 'people'); } }], 'court');
    return;
  }
  if (ds.length === 1) {
    var d1 = ds[0], q = qiPct(.04);
    scene('하나뿐인 제자', ps('당신의 제자는 <b>' + esc(d1.n) + '</b> 하나뿐이다. 다툴 사람도 없었다.', '그런데도 ' + esc(d1.n) + '은(는) 당신 앞에서 고개를 들지 못했다. “제가 감당할 수 있을지 모르겠습니다.”'), [
      { t: '평생의 구결을 전한다', h: '제자 수련 +30 · 내공 +' + q, c: 'primary', f: function () { F.d_heirName = d1.n; d1.p = Math.min(100, d1.p + 30); S.qi += q; done('사흘 밤낮을 마주 앉아 평생 쌓은 것을 말로 옮겼다. 말하는 동안 당신도 처음 알게 된 것들이 있었다. 내공 +' + q + '.', 'people'); } },
      { t: '“감당 못 해도 된다.”', h: '마기 -20', f: function () { F.d_heirName = d1.n; S.mad = Math.max(0, S.mad - 20); done('“나도 감당 못 했다. 그래도 여기까지 왔다.” ' + esc(d1.n) + '이(가) 처음으로 웃었다.', 'rest'); } }], 'court');
    return;
  }
  scene('이름을 노리는 자들', ps('당신에게는 제자가 없다. 그런데도 강호에서는 당신의 후계를 자처하는 자가 둘이나 나타났다.', '한 사람은 당신 칼법을 흉내 내고, 한 사람은 당신 이름을 판다. 둘이 저잣거리에서 칼을 맞대었다는 소문이 들렸다.'), [
    { t: '둘을 불러 혼을 낸다', h: '전투 · 은전', f: function () { fight('d_rebel', et() * .8, { auto: true, spar: true, title: '이름을 판 자', win: function () { S.silver += price(150); done('흉내 낸 칼법으로는 진짜를 이길 수 없었다. 둘은 물러났고, 당신 이름으로 거둔 은전 <b>' + price(150) + '</b>냥을 토해 냈다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('흉내 낸 칼법이 진짜보다 젊었다. 웃음이 나왔다.', 'fail'); } }); } },
    { t: '내버려 둔다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('이름이 그렇게 쓰일 수도 있다. 쓰이다 보면 닳고, 닳으면 아무 이름도 아니게 된다.', 'rest'); } }], 'court');
} });

EVENTS.push({ m: 735, id: 'd_e8_yeon', cond: dPre, run: function () {
  var F = S.flags;
  if (alive('yn')) {
    var close = tr('yn') >= 2 || F.fleeWith;
    pages('연이', [ps(F.fleeWith ? '연이는 평생 당신 곁에 있었다. 산을 내려온 그날부터 지금까지. 그 연이가 겨울 초입에 자리에 누웠다.' : W('총단 시종 숙소 끝방, 연이가 자리에 누웠다는 전갈이 왔다.', '마교 쪽 산 아래 마을에서 서신이 왔다. 연이가 오래 못 간다고.', '연이가 사는 마을에서 서신이 왔다. 글씨가 삐뚤었다.'),
      '머리가 하얗게 센 연이가 당신을 보고 웃었다. 해진 소매를 꿰매던 손버릇은 그대로였다. 손이 너무 가늘어서 바늘이 무거워 보였다.',
      close ? '“이름 지어 주겠다던 약속. 기억해?” 연이가 당신 손을 끌어당겼다. “오십 년 넘게 생각했어. 이제 정했어.”' : '“오랜만이네.” 연이가 말했다. “너는 늘 바빴지. 괜찮아. 그래서 네가 여기까지 온 거니까.”')], 'night', function () {
      F.ynDead = true;
      var q = qiPct(.03);
      scene('마지막 겨울', close ? ps('연이가 당신 귀에 이름 하나를 속삭였다. 짧은 이름이었다. 당신만 들었다.', '그날 밤 연이는 웃는 얼굴로 숨을 거두었다. 바늘에 꿴 실이 소매에 반쯤 걸려 있었다.') : ps('연이는 그날 밤 조용히 숨을 거두었다. 머리맡에 말린 감 두 개가 놓여 있었다.'), [
        { t: '그 이름을 가슴에 새긴다', h: '마기 모두 가라앉는다 · 체력 회복', off: close ? null : '그만큼 가까운 사이가 아니었다', c: 'primary', f: function () { S.mad = 0; S.hp = maxHp(); F.d_named = 1; done('평생 이름 없이 살았다. 이제 이름이 하나 있다. 아무도 부르지 않을 이름이다. 그래도 있다.', 'people'); } },
        { t: '연이의 바늘을 품에 넣는다', h: '내공 +' + q + ' · 마기 -15', f: function () { S.qi += q; S.mad = Math.max(0, S.mad - 15); done('바늘 하나를 품에 넣었다. 칼보다 가벼운데, 칼보다 무거웠다.', 'people'); } }], 'night');
    });
    return;
  }
  scene('연이의 무덤', ps('연이가 떠난 지 오래다. ' + age() + '세가 되어 처음으로 그 무덤을 찾았다.', '무덤 앞에 누군가 말린 감을 놓고 갔다. 당신 말고도 연이를 기억하는 사람이 있다.'), [
    { t: '감 하나를 더 놓는다', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); done('감 두 개가 나란히 놓였다. 연이가 좋아했을 것이다.', 'rest'); } },
    { t: '무덤 앞에서 하룻밤을 지샌다', h: '체력 회복', f: function () { S.hp = maxHp(); done('밤새 무덤 앞에 앉아 있었다. 할 말이 많을 줄 알았는데, 아무 말도 하지 않았다. 그래도 됐다.', 'rest'); } }], 'night');
} });

EVENTS.push({ m: 747, id: 'd_e8_old', cond: dPre, run: function () {
  var F = S.flags, P1 = [], bwOk = alive('bw') && F.bw, smOk = alive('sm') && F.sm, gone = [];
  if (bwOk) { F.bwDead = true; gone.push('백운'); S.weapon = Math.max(S.weapon || 0, 5);
    P1.push(ps('백운이 무당산에서 내려왔다. 지팡이를 짚고 있었지만 허리는 여전히 반듯했다.', '“칼 쓰는 법은 옛날 그대로요. 사람만 바뀌었지.” 그는 당신 앞에 검 한 자루를 내려놓았다. 현철로 벼린 검이었다. “이제 내게는 무겁소.”', '사흘 뒤, 백운은 돌아가는 길 위 매화나무 아래에서 앉은 채로 숨을 거두었다. 고향에 매화가 많다던 그 말을 당신은 아직 기억했다.')); }
  if (smOk) { F.smDead = true; F.d_s4 = 1; F.d_intel = 1; gone.push('사마령');
    P1.push(ps('사마령이 지붕 위에서 내려오지 않은 채 말했다. “구천문 사좌가 남쪽에 와 있어. 혼자 갈 거야.” 말리기도 전에 그림자는 사라졌다.', '한 달 뒤 쪽지 하나가 창틈에 꽂혀 있었다. 「사좌는 끝났어. 그림자는 늙지 않아. 다만 지칠 뿐이지.」 피가 번진 글씨였다.', '그 뒤로 지붕 위에서 아무도 당신을 내려다보지 않았다.')); }
  if (!P1.length) {
    var pool = [['dg', '독고강', 'dgDead', '독고강은 목도를 지팡이처럼 짚고 연무장에 섰다. 마지막 한 번을 휘두르고, 그 자리에 앉아 눈을 감았다. 외팔이 무릎 위에 반듯이 놓여 있었다.'], ['hr', '홍란', 'hrDead', '홍란이 마지막으로 당신 맥을 짚었다. “오래 못 간다고 했는데, 내가 틀렸네.” 그날 밤 약절구 소리가 멎었다.'], ['nj', '남궁진', 'njDead', '남궁진은 새벽마다 하던 검을 백 번이 아니라 한 번만 휘둘렀다. 그 한 번이 끝나자 검을 내려놓고 다시 들지 않았다.'], ['cn', '철노', 'cnDead', '철노의 대장간에서 불이 꺼졌다. 풀무 옆에 반쯤 두드린 쇠가 식어 있었다. “쇠는 늙지 않는다.” 그 말이 맞았다.'], ['mk', '묵야', 'mkDead', '묵야는 절벽 길 바위에 앉은 채 떠났다. 지팡이 끝이 당신이 늘 오던 방향을 가리키고 있었다.'], ['hs', '한서생', 'hsDead', '한서생은 서고에서 마지막 책을 덮었다. 그 책에는 당신의 이름이 없었다. 처음부터 없었으니까.']].filter(function (x) { return NPC[x[0]] && alive(x[0]) && dMet(x[0]); });
    if (pool.length) { var o = pool[0]; F[o[2]] = true; gone.push(o[1]); P1.push(ps('그해 겨울, ' + o[1] + '이(가) 떠났다.', o[3])); }
  }
  if (!P1.length) P1.push(ps('그해 겨울에는 아무도 떠나지 않았다. 떠날 사람이 이미 남아 있지 않았다.', '옛 얼굴들은 모두 무덤 속에 있다. 당신만 아직 서 있다.'));
  pages('잔월', P1, 'night', function () {
    var q = qiPct(.04);
    scene('잔월', '<p>' + (gone.length ? dJoin(gone) + '. 이름 하나를 부를 때마다 달이 조금씩 이지러졌다.' : '하늘에는 이지러진 달만 걸려 있다.') + '</p>', [
      { t: '무덤 앞에서 운기한다', h: '내공 +' + q, f: function () { S.qi += q; done('무덤 앞에 앉아 그들이 가르쳐 준 것들을 하나씩 돌렸다. 기억은 내공이 되었다. 내공 +' + q + '.', 'qi'); } },
      { t: '술 한 병을 따르고 마신다', h: '마기 -25 · 체력 회복', f: function () { S.mad = Math.max(0, S.mad - 25); S.hp = maxHp(); done('한 잔은 무덤에, 한 잔은 당신에게. 남은 술이 다 떨어질 때까지 그렇게 했다.', 'rest'); } }], 'night');
  });
} });

EVENTS.push({ m: 759, id: 'd_e8_jegal', cond: dPre, run: function () {
  var F = S.flags, nm = F.jgDead ? '제갈휘의 손자 제갈연' : '제갈휘';
  if (worldOf() === 'jeong') {
    scene('맹의 책사', ps('맹의 늙은 책사 ' + nm + '이(가) 서역 상인들과 밤마다 만난다는 보고가 올라왔다.', '그의 서재에서 붉은 가루가 담긴 상자가 나왔다. 혈정이다. 장부에는 구천문의 인장이 찍혀 있었다.', '“하늘 위로 오르고 싶지 않은 자가 있소?” ' + nm + '이(가) 부채를 펼쳤다. 손이 떨리고 있었다. “나는 너무 늙었소. 한 번만 더 젊고 싶었을 뿐이오.”'), [
      { t: '비무대 위에서 끝을 본다', h: '보스 · 져도 죽지는 않는다 · 맹이 하나로 뭉친다', c: 'primary', f: function () { fight('jg', et() + .3, { auto: true, spar: true, title: nm, heal: .4, win: function () { F.d_ally_jeong = 1; F.d_intel = 1; F.jgDead = true; done(nm + '의 부채가 두 동강 났다. 그는 웃으며 쓰러졌다. “젊음보다... 네가 부럽구나.” 맹의 원로들이 처음으로 당신 앞에 한 줄로 섰다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); F.d_grudge = (F.d_grudge || 0) + 1; done(nm + '은(는) 서역으로 달아났다. 구천문의 품으로.', 'fail'); } }); } },
      { t: '원로회에 장부를 넘긴다', h: '피 없이 끝낸다 · 맹이 당신 편에 선다', f: function () { F.d_ally_jeong = 1; done('원로회는 ' + nm + '을(를) 옥에 가두었다. 그는 옥 안에서 이듬해 봄에 죽었다. 사람들은 그가 마지막까지 창밖의 달을 보았다고 했다.', 'event'); } },
      { t: '못 본 척한다', h: '마기 +10 · 나중에 화가 될 수 있다', f: function () { dMad(10); F.d_jgBetray = 1; done('늙은이의 마지막 욕심이다. 눈감아 주었다. 그 눈감음이 무엇을 낳을지는 아직 모른다.', 'event'); } }], 'alliance');
    return;
  }
  scene('흰 깃발의 사신', ps('무림맹의 사신이 ' + W('혈월봉 산문', '', '당신의 거처') + ' 앞에 섰다. ' + nm + '이었다. 반백 년 전 비무대에서 부채를 접던 그 얼굴이 이제는 주름투성이였다.',
    '“구천문이 강호의 고수들을 하나씩 데려가고 있소. 맹은 혼자서 버틸 수 없소.” 그가 부채를 내려놓았다. “마교든 무명객이든 상관없소. 손을 잡읍시다.”'), [
    { t: '손을 잡는다', h: '무림맹이 동맹이 된다', c: 'primary', f: function () { F.d_ally_jeong = 1; done('검은 손과 흰 손이 맞잡혔다. 오십 년 전이라면 상상도 못 할 일이었다. ' + nm + '이(가) 중얼거렸다. “늙으니 별일이 다 있구려.”', 'people'); } },
    { t: '먼저 칼로 증명하라 한다', h: '전투 · 져도 죽지는 않는다 · 이기면 동맹과 내공', f: function () { fight('jg', et() + .2, { auto: true, spar: true, title: nm + '과의 비무', heal: .4, win: function () { var q = qiPct(.05); S.qi += q; F.d_ally_jeong = 1; done('부채가 땅에 떨어졌다. ' + nm + '은(는) 한참 웃고는 무릎을 털었다. “이 정도면 믿을 만하오.” 내공 +' + q + '.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); F.d_ally_jeong = 1; done('늙은 부채가 아직 날카로웠다. “내가 이겼으니 내 말을 들으시오.” 동맹은 맺어졌다. 체면은 조금 깎였다.', 'fail'); } }); } },
    { t: '돌려보낸다', h: '홀로 버틴다 · 마기 +5', f: function () { dMad(5); F.d_grudge = (F.d_grudge || 0) + 1; done(nm + '은(는) 아무 말 없이 돌아갔다. 산을 내려가는 그의 등이 몹시 작아 보였다.', 'event'); } }], 'alliance');
} });

EVENTS.push({ m: 771, id: 'd_e8_gather', cond: dPre, run: function () {
  var F = S.flags, q = qiPct(.05);
  pages('하늘이 모은다', [ps('그해 여름, 강호의 이름난 고수들이 하나둘 사라졌다. 사라진 자리에는 하얀 재만 남았다.',
    '서역에서 들어오던 혈정이 이제는 하늘에서 내렸다. 붉은 우박처럼. 그것을 주워 삼킨 자들은 젊어졌고, 이레 뒤 하늘을 보며 걸어 나가 돌아오지 않았다.',
    '구천문이 힘을 모으고 있다. 문을 열 사람, 문을 지킬 사람, 문 너머로 데려갈 사람을.'),
    ps('그 무렵, 하얀 옷의 사내 하나가 당신을 찾아왔다. 얼굴에 주름이 막 생기기 시작한 참이었다.',
      '“구천문 육좌, 화원이오. 아니, 이었소.” 사내가 흙 묻은 손을 내밀었다. “늙어 보고 싶어졌소. 그래서 내려왔소. 위에서는 나를 배신자라 부르겠지.”')], 'loc_village', function () {
    scene('내려온 초월자', '<p>화원은 당신의 대답을 기다리며 하늘을 힐끔거렸다. 하늘이 무서운 사람의 눈이었다.</p>', [
      { t: '받아들인다', h: '화원과 인연을 맺는다', c: 'primary', f: function () { meet('d_hwa'); F.d_hwa_met = true; gain('d_hwa', 1, '<p>화원은 당신이 내준 낡은 방에서 첫날 밤을 보냈다. 이튿날 아침, 그는 처음으로 늦잠이라는 것을 잤다고 했다. 몹시 기뻐 보였다.</p>'); } },
      { t: '사자들에 대해 캐묻고 돌려보낸다', h: '정보 · 사자와의 싸움이 수월해진다', f: function () { F.d_intel = 1; F.d_s5read = 1; done('화원은 묻는 대로 다 말했다. 마지막에 그가 물었다. “나는 어디로 가야 하오?” 당신은 대답하지 않았다. 그는 남쪽으로 걸어갔다.', 'event'); } },
      { t: '벤다', h: '내공 +' + q + ' · 마기 +15', f: function () { S.qi += q; dMad(15); F.d_hwaDead = true; done('화원은 피하지 않았다. 쓰러지며 그가 말했다. “아래에서 죽는 것도... 나쁘지 않구려.” 그의 몸에서 흘러나온 하늘의 기운이 당신에게 스며들었다. 내공 +' + q + '.', 'fight'); } }], 'loc_village');
  });
} });

EVENTS.push({ m: 783, id: 'd_e8_council', cond: dPre, run: function () {
  var F = S.flags, al = dAllies(), cost = price(800), ds = S.disc || [], q = qiPct(.06);
  scene('전야의 회의', ps('잔월의 마지막 해. 하늘의 금이 낮에도 보이기 시작했다.',
    al.length ? '당신의 거처에 사람들이 모였다. ' + dJoin(al) + '. 모두 늙었거나, 늙어 가고 있었다.' : '당신의 거처에는 아무도 오지 않았다. 다들 각자의 문을 걸어 잠갔다.',
    '“전쟁이오.” 누군가 말했다. 아무도 반박하지 않았다.'), [
    { t: '은전을 풀어 무기와 약을 댄다', h: '은전 -' + cost + ' · 마지막 결전이 수월해진다', off: S.silver < cost ? '은전이 모자란다' : null, f: function () { S.silver -= cost; F.d_armory = 1; S.items.pill = Math.min(8, S.items.pill + 2); done('대장간마다 불을 지폈다. 약당마다 솥을 걸었다. 은전 <b>' + cost + '</b>냥이 연기처럼 사라졌다. 회춘단 2.', 'item'); } },
    { t: '제자들을 사신으로 보낸다', h: '새 동맹을 얻는다', off: ds.length ? null : '보낼 제자가 없다', f: function () { if (worldOf() === 'jeong') F.d_ally_ma = 1; else F.d_ally_jeong = 1; done(dTopDisc() + '이(가) ' + W('흰 깃발의 성으로', '검은 깃발의 산으로', '맹의 성으로') + ' 떠났다. 석 달 뒤 답이 왔다. 「함께 서겠다.」', 'people'); } },
    { t: '홀로 폐관에 든다', h: '내공 +' + q, f: function () { S.qi += q; done('회의를 남에게 맡기고 동굴에 들었다. 늙은 몸으로 할 수 있는 일은 하나뿐이다. 더 날카로워지는 것. 내공 +' + q + '.', 'qi'); } }], 'alliance');
} });

/* ================= E9 황혼의 전쟁 (793~888) ================= */
function dSeatFight(id, title, mul, heal, winTxt, loseTxt, lethal) {
  var F = S.flags;
  fight(id, et() + .7, { auto: true, spar: !(lethal && !S.noReturn), title: title, heal: heal, hpMul: mul,
    win: function () { F[id] = 1; var q = qiPct(.09); S.qi += q; addMat(pick(['core', 'scale', 'gem']), 1); if (dSeats() >= 4) ach('d_seats'); done(winTxt + ' 내공 +' + q + '.', 'fight'); },
    lose: lethal && !S.noReturn ? function () { die('d_seat'); } : function () { S.hp = Math.max(1, Math.round(maxHp() * .2)); F.d_seatLoss = (F.d_seatLoss || 0) + 1; done(loseTxt, 'fail'); } });
}
function dEmptySeat(name, txt) {
  var q = qiPct(.04);
  scene(name + '의 빈자리', ps(txt, '전장은 그만큼 조용했다. 당신은 그 고요를 다른 곳에 쓰기로 했다.'), [
    { t: '부상자를 돌본다', h: '마기 -15 · 동맹이 단단해진다', f: function () { S.mad = Math.max(0, S.mad - 15); S.flags.d_ally_town = 1; done('늙은 손으로 붕대를 감았다. 젊은 무사 하나가 당신을 알아보고 울었다.', 'people'); } },
    { t: '다음 자리를 위해 운기한다', h: '내공 +' + q, f: function () { S.qi += q; done('칼을 무릎에 올려놓고 숨을 골랐다. 내공 +' + q + '.', 'qi'); } }], 'siege');
}

EVENTS.push({ m: 795, id: 'd_e9_war', cond: dPre, run: function () {
  var F = S.flags, al = dAllies(), q = qiPct(.05);
  pages('황혼의 전쟁', [ps('하늘의 금 아래로 하얀 옷의 군세가 내려왔다. 발이 땅에 닿지 않았다. 구천문이 마침내 전쟁을 선포했다.',
    '그들의 요구는 하나였다. 「마지막 혈월에 문 앞을 비워라.」',
    age() + '세. 당신은 갑옷 끈을 묶다가 손이 떨려 두 번을 다시 묶었다. ' + (al.length ? '옆에서 ' + al[0] + '이(가) 대신 묶어 주었다.' : '아무도 대신 묶어 주지 않았다. 세 번째에 묶였다.')),
    ps(al.length >= 3 ? '깃발들이 모였다. 오십 년 동안 서로를 베던 깃발들이 한 산자락에 나란히 꽂혔다. 누가 시작했는지 아무도 묻지 않았다.' : (al.length ? '모인 깃발은 많지 않았다. 그래도 하나보다는 나았다.' : '당신의 깃발은 당신 하나였다.'),
      (F.d_grudge || 0) >= 2 ? '그리고 당신을 원망하는 자들도 전장에 나왔다. 그들은 구천문 쪽에 서 있었다.' : '하늘을 등진 자들 사이에서 당신 이름이 오르내렸다.')], 'siege', function () {
    scene('첫 싸움', '<p>하늘에서 첫 번째 하얀 화살이 내려왔다.</p>', [
      { t: '선봉에 선다', h: '전투 · 내공 +' + q, c: 'primary', f: function () { fight('d_acolyte', et(), { auto: true, spar: true, title: '구천문 선봉', heal: .3, win: function () { S.qi += q; F.d_vanguard = 1; done('하얀 옷들이 재가 되어 흩어졌다. 늙은 장수가 맨 앞에 선 것을 본 젊은이들이 함성을 질렀다. 내공 +' + q + '.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('선봉에서 밀렸다. 젊은이들이 당신을 업고 뒤로 물러났다. 부끄럽지는 않았다. 고마웠다.', 'fail'); } }); } },
      { t: '성벽을 지키며 사람들을 들인다', h: '체력 회복 · 회춘단 +1 · 마을 사람들이 편에 선다', f: function () { S.hp = maxHp(); S.items.pill = Math.min(8, S.items.pill + 1); F.d_ally_town = 1; done('성문을 열어 피난민을 들였다. 성 안이 사람으로 가득 찼다. 화살보다 그 숨소리가 더 크게 들렸다.', 'people'); } }], 'siege');
  });
} });

EVENTS.push({ m: 807, id: 'd_e9_s7', cond: dPre, run: function () {
  var F = S.flags;
  if (F.d_s7) { dEmptySeat('칠좌', '칠좌 철우는 이미 당신 손에 재가 되었다. 구천문은 그 자리를 아직 채우지 못했다.'); return; }
  var read = F.d_s7read;
  if (!read) hurt(.12);
  scene('쇠 깃털의 비', ps('하늘에서 쇠 깃털이 비처럼 쏟아졌다. ' + (read ? '당신은 철우가 오른발에 무게를 싣는 순간을 기다렸다. 깃털은 그 직전에만 쏟아진다.' : '깃털 하나가 어깨에 박혔다. 뽑자 피가 검었다.'),
    '구름 위에서 칠좌 철우가 뛰어내렸다. 땅이 발밑에서 파였다. “늙은이, 아직 살아 있었나.”'), [
    { t: '맞선다', h: '보스 · 강타와 운기를 즐긴다' + (read ? ' · [버릇을 안다] 수월해진다' : '') + ' · 져도 죽지는 않는다', c: 'primary', f: function () { dSeatFight('d_s7', '칠좌 철우', read ? .8 : 1, .3, '철우의 쇠 망토가 갈라졌다. 깃털이 한 장씩 떨어지며 그도 함께 무너졌다. “힘으로는... 안 되는군.”', '철우의 주먹에 성벽까지 날아갔다. 그가 웃으며 하늘로 돌아갔다. 칠좌는 아직 살아 있다.'); } },
    { t: '동맹에게 맡기고 물러난다', h: '피를 아낀다 · 칠좌는 남는다', off: dAllies().length ? null : '맡길 사람이 없다', f: function () { S.hp = maxHp(); done('동맹들이 철우를 하루 종일 붙잡아 두었다. 그 사이 당신은 숨을 골랐다. 칠좌는 저녁에 물러갔다.', 'rest'); } }], 'siege');
} });

EVENTS.push({ m: 819, id: 'd_e9_return', cond: dPre, run: function () {
  var F = S.flags, g = F.d_grudge || 0, parts = [], ch = [];
  parts.push('전쟁이 길어지자 지난 세월이 한꺼번에 돌아왔다. 은혜를 입은 자들과 원한을 품은 자들이, 같은 해에.');
  if (F.d_ally_town) parts.push('역병과 기근 때 살려 낸 고을 사람들이 수레에 쌀과 약을 싣고 왔다. 맨 앞의 노인이 말했다. “그때 받은 거요.”');
  if (dFriend('곡달', 1)) parts.push('흑천왕 곡달의 늙은 깃발도 보였다. “사파도 하늘은 싫다.” 그가 침을 뱉었다.');
  if (dFriend('빙린', 1)) parts.push('북해에서 얼음 수레가 내려왔다. 빙린이 보낸 것이었다. 편지는 한 줄이었다. 「갚는다.」');
  if (dFriend('소화', 1)) parts.push('소화가 백발을 휘날리며 성문을 넘어왔다. “늦었지? 나도 늙었어.”');
  if (F.d_rebelGone) parts.push('그리고 ' + esc(F.d_rebelGone) + '. 후계 다툼 끝에 산을 내려간 제자가 ' + (g >= 2 ? '하얀 옷을 입고 구천문 쪽에 서 있었다.' : '흙투성이가 되어 성문 앞에 무릎을 꿇었다.'));
  if (g >= 2) parts.push('당신이 문을 잠그고 곡식을 쥐었던 해들을 기억하는 자들이 구천문 깃발 아래 모여 있었다.');
  if (parts.length === 1) parts.push('그러나 당신에게는 돌아올 은혜도 원한도 많지 않았다. 너무 조용히 살았거나, 너무 많이 잊었다.');
  if (F.d_rebelGone && g < 2) ch.push({ t: esc(F.d_rebelGone) + '을(를) 다시 받아들인다', h: '제자가 돌아온다', c: 'primary', f: function () { S.disc = S.disc || []; if (S.disc.length < 8) S.disc.push({ n: F.d_rebelGone, p: 70, t: 3, a: 40 }); F.d_rebelGone = ''; done('일으켜 세우자 제자가 울었다. 당신도 조금 울었다. 늙으면 눈물이 헐거워진다.', 'people'); } });
  if (g >= 2 || F.d_rebelGone) ch.push({ t: '원한을 품은 자들과 칼로 마주한다', h: '전투 · 져도 죽지는 않는다 · 이기면 원한이 풀린다', f: function () { fight('d_rebel', et() + .2, { auto: true, spar: true, title: '돌아온 원한', heal: .3, win: function () { F.d_grudge = 0; F.d_rebelGone = ''; S.silver += price(200); done('원한은 칼로 풀리지 않는다. 그러나 칼을 받아 준 것만으로 풀리는 원한도 있다. 패한 자들이 하얀 옷을 벗었다. 은전 <b>' + price(200) + '</b>냥.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .25)); done('원한이 더 날카로웠다. 그들은 당신을 죽이지 않고 하늘로 돌아갔다. 죽이는 것보다 무서운 일이었다.', 'fail'); } }); } });
  ch.push({ t: '은혜와 원한을 함께 장부에 적는다', h: '마기 -15 · 은전 +' + price(120), f: function () { S.mad = Math.max(0, S.mad - 15); S.silver += price(120); done('한 장에 은혜를, 한 장에 원한을 적었다. 두 장은 비슷한 두께였다. 그것이 한 사람의 평생이었다.', 'event'); } });
  scene('돌아온 것들', ps.apply(null, parts), ch, 'alliance');
} });

EVENTS.push({ m: 831, id: 'd_e9_s5', cond: dPre, run: function () {
  var F = S.flags, mem = hasMem('d_mirror');
  if (F.d_s5) { dEmptySeat('오좌', '오좌 수경의 거울은 깨진 채로 성 밖에 나뒹군다. 아무도 그 조각을 들여다보지 않는다.'); return; }
  if (!mem) dMad(10);
  scene('거울의 여인', ps('안개 속에서 은빛 거울을 든 여인이 걸어 나왔다. 오좌 수경. 거울 속에 당신이 있었다. 젊은 날의 당신이.',
    mem ? '기억이 말한다. 거울은 꾀를 되비춘다. 정직하게 쳐라.' : '거울 속의 젊은 당신이 웃자, 늙은 당신의 마기가 끓었다. 거울은 마음을 되비춘다.',
    '“네가 버린 봄들이 다 여기 있다.” 수경이 거울을 기울였다. “돌아가고 싶지 않으냐.”'), [
    { t: '거울을 향해 정직하게 친다', h: '보스 · 허초를 즐긴다' + (mem ? ' · [기억] 크게 수월해진다' : '') + (F.d_s5read ? ' · [정보] 수월해진다' : '') + ' · 져도 죽지는 않는다', c: 'primary', f: function () { dSeatFight('d_s5', '오좌 수경', (mem ? .72 : 1) * (F.d_s5read ? .88 : 1), .3, '거울이 한가운데부터 금이 갔다. 젊은 당신의 얼굴이 조각조각 흩어졌다. 수경이 깨진 조각 하나를 쥐고 중얼거렸다. “늙은 얼굴이... 더 낫구나.”', '거울 속에서 젊은 당신이 늙은 당신을 베었다. 수경은 당신을 내려다보다 안개 속으로 돌아갔다.'); if (!mem) learnMem('d_mirror'); } },
    { t: '눈을 감고 물러난다', h: '마기 -10 · 오좌는 남는다', f: function () { S.mad = Math.max(0, S.mad - 10); done('거울을 보지 않기로 했다. 버린 봄들은 버린 대로 두었다.', 'rest'); } }], 'siege');
} });

EVENTS.push({ m: 843, id: 'd_e9_disc', cond: dPre, run: function () {
  var F = S.flags, ds = dDisc();
  if (ds.length) {
    var d = ds[0];
    scene('제자의 전장', ps('전선의 서쪽 고개가 무너졌다. 구천문 신도들이 몰려든다. ' + esc(d.n) + '이(가) 칼을 들고 당신 앞에 섰다.', '“스승님은 여기 계십시오. 이번에는 제가 가겠습니다.” ' + (d.p >= 80 ? '그 칼끝이 당신보다 고요했다.' : '그 칼끝이 조금 떨렸다.')), [
      { t: '보낸다', h: '제자가 크게 자란다 · 다칠 수 있다', f: function () { var ok = Math.random() < .45 + d.p / 200; if (ok) { d.p = Math.min(100, d.p + 25); F.d_discHero = d.n; done(esc(d.n) + '이(가) 고개를 지켜 냈다. 피투성이로 돌아와 웃었다. 당신은 처음으로 그 아이에게 절을 받지 않고, 먼저 고개를 숙였다.', 'people'); } else { d.p = Math.max(0, d.p - 10); hurt(.15); done('고개는 지켰지만 ' + esc(d.n) + '이(가) 크게 다쳤다. 당신이 업고 내려왔다. 무거웠다. 자란 무게였다.', 'fail'); } } },
      { t: '함께 간다', h: '전투 · 제자 수련 +15', c: 'primary', f: function () { fight('d_acolyte', et() * 1.05, { auto: true, spar: true, title: '서쪽 고개', heal: .3, win: function () { d.p = Math.min(100, d.p + 15); S.qi += qiPct(.03); done('늙은 칼과 젊은 칼이 등을 맞댔다. 서로의 숨소리로 수를 읽었다. 가르친 적 없는 합이 저절로 나왔다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('고개를 내주었다. 그러나 둘 다 살았다. 그거면 됐다.', 'fail'); } }); } },
      { t: '뒤로 물려 살린다', h: '제자는 안전하다 · 마기 -10', f: function () { F.d_discSafe = 1; S.mad = Math.max(0, S.mad - 10); done('“너는 다음 전쟁을 위해 남아라.” ' + esc(d.n) + '은(는) 이를 악물고 물러났다. 고개는 당신이 혼자 지켰다.', 'event'); } }], 'siege');
    return;
  }
  scene('이름 모를 젊은이', ps('서쪽 고개에서 이름 모를 젊은이가 당신 곁으로 왔다. “어릴 때 어른 이야기를 듣고 칼을 잡았습니다.”', '당신은 그 이야기가 어떤 이야기인지 묻지 않았다. 반은 거짓이었을 테니까.'), [
    { t: '한 수 가르쳐 준다', h: '제자를 얻는다', off: (S.disc || []).length >= 8 ? '제자가 너무 많다' : null, f: function () { S.disc = S.disc || []; S.disc.push({ n: randName(), p: 30, t: rnd(2, 4), a: rnd(18, 24) }); done('고개를 지키는 사이사이 칼 잡는 법을 고쳐 주었다. 전쟁 중에 제자를 들였다. 늙으면 순서가 엉망이 된다.', 'people'); } },
    { t: '함께 고개를 지킨다', h: '전투', f: function () { fight('d_acolyte', et(), { auto: true, spar: true, title: '서쪽 고개', win: function () { S.qi += qiPct(.03); done('젊은이는 살아남았다. 이름을 묻자 그가 웃었다. “어르신처럼 없습니다.”', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .3)); done('고개를 내주었다. 젊은이가 당신을 업고 뛰었다.', 'fail'); } }); } }], 'siege');
} });

EVENTS.push({ m: 855, id: 'd_e9_s3', cond: dPre, run: function () {
  var F = S.flags, rd = F.d_s3read;
  if (F.d_s3) { dEmptySeat('삼좌', '삼좌 백야는 쓰러졌다. 그 뒤로 밤이 제때 찾아왔다.'); return; }
  scene('끝나지 않는 밤', ps('해가 지지 않았다. 아니, 해가 진 뒤에도 하늘이 하얬다. 삼좌 백야의 밤이다. 이 밤에는 아무도 잠들 수 없고, 잠들지 못한 자는 상처가 아물지 않는다.',
    '하얀 머리칼의 소년 같은 자가 지붕 위를 달렸다. 발소리가 빗소리처럼 잘게 이어졌다. “할아버지, 오래 버티지 마요. 지루하니까.”'), [
    { t: '하얀 밤 속에서 맞선다', h: '보스 · 연타가 매섭다 · 싸움 전 회복이 없다' + (rd ? ' · [정보] 수월해진다' : '') + ' · 져도 죽지는 않는다', c: 'primary', f: function () { dSeatFight('d_s3', '삼좌 백야', rd ? .82 : 1, rd ? .3 : 0, '백야가 지붕에서 떨어졌다. 그가 쓰러지자 하늘이 처음으로 어두워졌다. 소년의 얼굴이 순식간에 늙었다. “아... 졸려.”', '연타가 끝나지 않았다. 쓰러진 당신 위로 하얀 밤이 사흘 더 이어졌다.'); } },
    { t: '잠들지 않고 버틴다', h: '체력 -25% · 내공 +' + qiPct(.04) + ' · 삼좌는 남는다', f: function () { var q = qiPct(.04); hurt(.25); S.qi += q; done('사흘 밤을 눈 뜨고 버텼다. 백야가 지루해져 떠났다. 지루함도 무기가 된다. 내공 +' + q + '.', 'qi'); } }], 'siege');
} });

EVENTS.push({ m: 867, id: 'd_e9_s2', cond: dPre, run: function () {
  var F = S.flags, al = dAllies(), rd = F.d_s2read;
  if (F.d_s2) { dEmptySeat('이좌', '이좌 공명이 쓰러진 뒤로 전장에 다시 소리가 돌아왔다.'); return; }
  var mul = (al.length >= 3 ? .82 : 1) * (rd ? .85 : 1) * (F.d_armory ? .92 : 1);
  scene('소리를 먹는 자', ps('전장에서 소리가 사라졌다. 칼 부딪는 소리도, 비명도, 당신의 숨소리도. 이좌 공명이 왔다.',
    '그는 말하지 않았다. 입이 없었다. 대신 그가 손을 들자 동맹들의 함성이 그 손바닥으로 빨려 들어갔다. ' + (al.length >= 3 ? '그러나 함성이 너무 많았다. 공명의 손이 떨렸다.' : '빨려 들어간 소리만큼 그가 커졌다.'),
    '구천문 둘째 자리. 일좌 바로 아래. ' + (S.noReturn ? '돌아올 수 없는 몸으로 맞서기에는 너무 큰 상대다.' : '여기서 쓰러지면 다시 봄으로 돌아갈 것이다.')), [
    { t: '소리 없는 전장에서 맞선다', h: '치명적 보스' + (S.noReturn ? ' (굴레 밖: 지면 크게 다친다)' : ' · 지면 죽는다') + (al.length >= 3 ? ' · [동맹] 수월해진다' : '') + (rd ? ' · [정보] 수월해진다' : ''), c: 'primary', f: function () { dSeatFight('d_s2', '이좌 공명', mul, .5, '공명의 몸이 터지며 삼켰던 소리들이 한꺼번에 쏟아져 나왔다. 수천의 함성, 수천의 비명. 그 가운데 당신 이름을 부르는 소리도 있었다.', '공명이 당신의 숨소리까지 삼켰다. 동맹들이 당신을 끌어냈다. 이좌는 아직 서 있다.', true); } },
    { t: '함성을 멈추게 하고 물러난다', h: '피를 아낀다 · 이좌는 남는다', f: function () { done('동맹들에게 입을 다물라 했다. 먹을 소리가 없자 공명은 천천히 하늘로 돌아갔다. 침묵으로 이긴 것은 아니다. 다만 지지 않았다.', 'event'); } }], 'siege');
} });

EVENTS.push({ m: 879, id: 'd_e9_eve', cond: dPre, run: function () {
  var F = S.flags, n = dSeats(), q = qiPct(.05);
  if (n >= 4) ach('d_seats');
  scene('문 앞의 밤', ps('황혼의 전쟁이 끝나 간다. 일곱 자리 중 ' + (n + (F.d_s4 ? 1 : 0) + (F.d_hwaDead || F.d_hwa_met ? 1 : 0)) + '자리가 비었다. 남은 것은 문과 일좌.',
    '하늘의 금이 문의 모양을 거의 다 갖추었다. 마지막 혈월이 멀지 않았다.',
    age() + '세. 당신은 처음으로 칼을 닦지 않고 그냥 두었다. 내일 닦아도 된다. 아직 내일이 있다.'), [
    { t: '유언을 적는다', h: '마기 모두 가라앉는다', f: function () { F.d_will = 1; S.mad = 0; done('짧게 적었다. 「문 앞에 서라. 혼자 서지 마라.」 다 적고 나니 할 말이 그것뿐이었다.', 'event'); } },
    { t: '마지막 수련을 한다', h: '내공 +' + q, c: 'primary', f: function () { S.qi += q; done('어두운 연무장에서 처음 배운 초식부터 다시 했다. 손이 기억하고 있었다. 내공 +' + q + '.', 'qi'); } },
    { t: '무덤들을 돈다', h: '체력 회복 · 마기 -20', f: function () { S.hp = maxHp(); S.mad = Math.max(0, S.mad - 20); done('하룻밤에 무덤 여럿을 돌았다. 다 돌고 나니 새벽이었다. 무덤마다 한마디씩 했다. 곧 간다고.', 'rest'); } }], 'night');
} });

/* ================= E10 마지막 혈월 이후 (889~960, 남은 해를 사는 자만) ================= */
function dAfterOk() { return dPost() && !!S.flags.d_after; }
function dWhite() { return S.flags.d_after === 'd_true'; }

EVENTS.push({ m: 891, id: 'd_e10_spring', cond: dAfterOk, run: function () {
  var q = qiPct(.03);
  scene('붉지 않은 봄', ps(age() + '세의 봄. ' + (dWhite() ? '달이 하얗게 떴다. 올해도. 아이들은 달이 원래 하얀 줄 안다.' : '달은 여전히 조금 붉다. 그러나 해마다 조금씩 옅어진다. 문 앞의 파수꾼들이 그 색을 장부에 적는다.'),
    '매화가 졌다. 당신은 마루에 앉아 꽃잎이 떨어지는 것을 끝까지 보았다. 젊을 때는 한 번도 끝까지 본 적이 없었다.'), [
    { t: '꽃잎을 주워 차를 우린다', h: '마기 -20 · 체력 회복', f: function () { S.mad = Math.max(0, S.mad - 20); S.hp = maxHp(); done('매화차는 싱거웠다. 싱거운 것이 좋아지는 나이가 되었다.', 'rest'); } },
    { t: '마당에서 칼을 한 번 휘두른다', h: '내공 +' + q, f: function () { S.qi += q; done('한 번만 휘둘렀다. 꽃잎 하나가 두 쪽이 되어 떨어졌다. 아직 된다. 내공 +' + q + '.', 'qi'); } }], 'peace');
} });

EVENTS.push({ m: 903, id: 'd_e10_watch', cond: dAfterOk, run: function () {
  var h = S.flags.d_heirName ? esc(S.flags.d_heirName) : (dTopDisc() || '젊은 파수꾼');
  scene(dWhite() ? '닫힌 문 자리' : '문 앞의 파수', ps(dWhite() ? '문이 있던 하늘 자리를 보러 산에 올랐다. 아무것도 없었다. 그냥 하늘이었다. 그게 그렇게 좋았다.' : '문 앞을 지키는 ' + h + '을(를) 찾아갔다. 반쯤 열린 문 아래에 작은 초막이 생겨 있었다.',
    dWhite() ? '내려오는 길에 나무꾼이 물었다. “어르신, 저기 뭐가 있었습니까?” “하늘.”' : h + '이(가) 차를 따르며 장부를 내밀었다. 「붉음 셋 푼 줄다.」 글씨가 반듯했다.'), [
    { t: '장부 끝에 한 줄 적는다', h: '마기 -15 · 은전 +' + price(100), f: function () { S.mad = Math.max(0, S.mad - 15); S.silver += price(100); done('「잘 지키고 있다.」 다섯 글자를 적었다. ' + h + '이(가) 그 장을 오래 들여다보았다. 문파에서 보낸 공양 은전 <b>' + price(100) + '</b>냥을 받아 왔다.', 'people'); } },
    { t: '하룻밤 함께 지킨다', h: '내공 +' + qiPct(.03), f: function () { var q = qiPct(.03); S.qi += q; done('밤새 문 아래에 앉아 있었다. 문틈에서 아무 소리도 나지 않았다. 지키는 일이란 대개 그런 것이다. 내공 +' + q + '.', 'qi'); } }], dWhite() ? 'true' : 'peace');
} });

EVENTS.push({ m: 915, id: 'd_e10_book', cond: dAfterOk, run: function () {
  scene('이야기책', ps('저잣거리에 이야기책 하나가 돌았다. 「혈월을 닫은 이름 없는 고수」. 당신 이야기였다. 반은 맞고 반은 틀렸다.',
    '책 속의 당신은 키가 일곱 자에 칼 한 번에 산을 갈랐다. 연애도 세 번 했다. 그중 둘은 당신도 처음 듣는 이야기였다.'), [
    { t: '지은이를 찾아가 바로잡는다', h: '은전 +' + price(80) + ' · 이야기가 조금 정확해진다', f: function () { S.silver += price(80); done('젊은 서생이 엎드려 절했다. 키는 고쳤다. 연애는 고치지 말아 달라고 사정해서 그냥 두었다. 서생이 고마움의 표시로 은전 <b>' + price(80) + '</b>냥을 내밀었다.', 'people'); } },
    { t: '그냥 둔다', h: '마기 -15', f: function () { S.mad = Math.max(0, S.mad - 15); done('틀린 이야기가 더 오래 산다. 그래도 괜찮다. 이름이 없으니 틀려도 아무도 다치지 않는다.', 'rest'); } },
    { t: '책 맨 뒤에 몰래 한 줄 더한다', h: '아무도 모른다', f: function () { done('책방 구석에서 붓을 빌려 맨 뒷장에 적었다. 「그는 혼자가 아니었다.」 다음 판본부터 그 줄이 그대로 찍혀 나왔다.', 'event'); } }], 'peace');
} });

EVENTS.push({ m: 927, id: 'd_e10_sword', cond: dAfterOk, run: function () {
  var ds = dDisc(), who = S.flags.d_heirName ? esc(S.flags.d_heirName) : (ds[0] ? esc(ds[0].n) : '');
  scene('칼을 넘기다', ps(who ? who + '이(가) 찾아왔다. 머리에 흰 것이 섞여 있었다. 제자도 늙는다.' : '옆집 아이가 당신의 칼을 가리켰다. “할아버지, 그건 뭐예요?”',
    '평생 쥔 칼이 벽에 걸려 있다. 이제 들면 팔이 떨린다.'), [
    { t: who ? who + '에게 칼을 넘긴다' : '아이에게 칼을 넘긴다', h: '마기 모두 가라앉는다', c: 'primary', f: function () { S.mad = 0; S.flags.d_swordGiven = 1; done(who ? '칼을 건네자 ' + who + '이(가) 두 손으로 받았다. 받는 손이 떨렸다. 그래서 안심했다. 무게를 아는 손이다.' : '아이는 칼을 질질 끌고 갔다. 언젠가 들 수 있게 될 것이다. 아니어도 괜찮다.', 'people'); } },
    { t: '조금 더 쥐고 있는다', h: '내공 +' + qiPct(.02), f: function () { var q = qiPct(.02); S.qi += q; done('아직은 아니다. 칼을 내려 닦았다. 손이 떨렸지만 닦는 데는 충분했다. 내공 +' + q + '.', 'qi'); } }], 'peace');
} });

EVENTS.push({ m: 939, id: 'd_e10_moon', cond: dAfterOk, run: function () {
  var id = ENDINGS[S.flags.d_after] ? S.flags.d_after : 'd_peace';
  scene('마지막 달맞이', ps(age() + '세. 달맞이 날 밤, 마당에 사람들이 모였다. ' + ((S.disc || []).length ? dJoin(dDisc().slice(0, 3).map(function (d) { return esc(d.n); })) + '. ' : '') + '이름을 다 기억할 수 없을 만큼.',
    dWhite() ? '하얀 달이 떴다. 당신이 처음 본 달은 붉었다. 마지막으로 보는 달이 하얘서 다행이었다.' : '옅은 붉은 달이 떴다. 처음 본 그 달의 색이 거의 다 빠져 있었다.',
    '이제 언제 이야기를 맺어도 된다.'), [
    { t: '달을 보며 눈을 감는다', h: '여기서 결말을 맞는다', f: function () { finish(id); } },
    { t: '내년 달도 보겠다고 말한다', h: '조금 더 산다 · 체력 회복', c: 'primary', f: function () { S.hp = maxHp(); done('“내년에도 보자.” 사람들이 웃었다. 당신도 웃었다. 약속은 지킬 수도 있고 못 지킬 수도 있다. 그래도 하는 것이다.', 'people'); } }], dWhite() ? 'true' : 'night');
} });

/* ================= 우연한 사건 (67~96세) ================= */
LIFE.push({ id: 'd_l_memory', from: 67, w: 3, cd: 30, run: function () {
  var who = pick(['독고강의 외팔', '홍란의 쓴 약', '연이의 말린 감', '혈월봉의 첫 매화', '처음 쥔 목도', '이름 없던 시종 시절의 짚신']);
  scene('회상', ps('아침에 일어나 한참 앉아 있었다. 꿈에서 ' + who + '을(를) 보았다.', W('창밖으로 혈월봉의 능선이 보인다. 그 능선은 오십 년 전과 똑같다.', '맹의 뜰에 흰 깃발이 펄럭인다. 그 깃발 아래 몇이나 묻었는지 세다가 그만두었다.', '낯선 마을 처마 끝에 고드름이 맺혀 있다. 어디서 봐도 고드름은 고드름이다.')), [
    { t: '기억을 따라 옛 초식을 펼친다', h: '내공 +' + qiPct(.02), f: function () { var q = qiPct(.02); S.qi += q; done('젊을 때 배운 초식을 늙은 몸으로 다시 해 보았다. 느렸다. 느려서 비로소 보이는 것이 있었다. 내공 +' + q + '.', 'qi'); } },
    { t: '그냥 앉아 있는다', h: '마기 -15', f: function () { S.mad = Math.max(0, S.mad - 15); done('해가 질 때까지 앉아 있었다. 아무것도 하지 않은 하루였다. 그런 하루가 귀하다는 것을 이제는 안다.', 'rest'); } }]);
} });
LIFE.push({ id: 'd_l_funeral', from: 67, to: 94, w: 2, cd: 36, run: function () {
  var who = pick(['옛 전우', '오래전 칼을 섞었던 적수', '젊은 날 묵었던 객잔 주인', '처음 칼을 벼려 준 대장장이의 아들', '같은 해에 입문한 동기']);
  scene('장례', ps(who + '의 부고가 왔다. ' + age() + '세가 되니 부고는 계절처럼 온다.', '상가에 가니 아는 얼굴보다 모르는 얼굴이 많았다. 죽은 이의 손자가 당신을 알아보고 절했다.'), [
    { t: '부의를 넉넉히 놓는다', h: '은전 -' + price(80) + ' · 마기 -15', off: S.silver < price(80) ? '은전이 모자란다' : null, f: function () { S.silver -= price(80); S.mad = Math.max(0, S.mad - 15); done('봉투를 놓고 향을 피웠다. 향이 다 탈 때까지 서 있었다. 다리가 저렸다.', 'people'); } },
    { t: '관 앞에서 칼을 한 번 뽑았다 넣는다', h: '무인의 예 · 내공 +' + qiPct(.015), f: function () { var q = qiPct(.015); S.qi += q; done('칼집에서 한 치를 뽑았다가 넣었다. 무인끼리의 작별이다. 상주들은 모르는 인사였다. 죽은 이는 알았을 것이다.', 'event'); } }], 'night');
} });
LIFE.push({ id: 'd_l_ill', from: 67, w: 3, cd: 24, cond: function () { return S.realm < 8; }, run: function () {
  var c = price(100 + S.realm * 30);
  scene('노환', ps(pick(['밤새 기침이 멎지 않았다.', '무릎이 붓더니 사흘째 가라앉지 않는다.', '아침에 손이 떨려 찻잔을 떨어뜨렸다.', '눈앞이 뿌옇게 흐려 칼끝이 둘로 보였다.']), '경지가 몸을 붙들어 주지만, 세월은 경지보다 끈질기다.'), [
    { t: '좋은 약을 지어 먹는다', h: '은전 -' + c + ' · 체력 회복', off: S.silver < c ? '은전이 모자란다' : null, f: function () { S.silver -= c; S.hp = maxHp(); done('비싼 약이 쓴맛만큼은 값을 했다. 사흘 만에 일어났다.', 'rest'); } },
    { t: '약초를 직접 달인다', h: '약초 -3 · 체력 회복', off: mat('herb') < 3 ? '약초가 모자란다' : null, f: function () { S.mat.herb -= 3; S.hp = maxHp(); done('직접 달인 약은 맛이 없었다. 그래도 효험은 있었다.', 'rest'); } },
    { t: '운기로 버틴다', h: '체력 -20% · 마기 -5', f: function () { hurt(.2); S.mad = Math.max(0, S.mad - 5); done('기를 돌려 아픈 곳을 눌렀다. 아픔은 가라앉지 않고 자리를 옮겨 다녔다.', 'fail'); } }]);
} });
LIFE.push({ id: 'd_l_train', from: 67, w: 3, cd: 24, run: function () {
  var q = qiPct(.05);
  scene('마지막 수련', ps('새벽에 깼다. 늙으면 잠이 준다. 남는 새벽을 어디에 쓸지는 오래전에 정했다.', REALMS[S.realm].n + '의 몸이다. 더 오를 데가 있는지, 이제는 잘 모르겠다. 그래도 연무장으로 나갔다.'), [
    { t: '해가 뜰 때까지 운기한다', h: '내공 +' + q + ' · 체력 -10%', f: function () { S.qi += q; hurt(.1); done('해가 떴을 때 무릎이 펴지지 않았다. 그래도 단전이 뜨거웠다. 내공 +' + q + '.', 'qi'); } },
    { t: '가볍게 몸만 푼다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('천천히 몸을 풀었다. 욕심을 버리는 것도 수련이다. 그걸 아는 데 육십 년이 걸렸다.', 'rest'); } }]);
} });
LIFE.push({ id: 'd_l_road', from: 70, w: 2, once: 'life', run: function () {
  scene('옛 길', ps(W('혈월봉 뒷산 길을 걸었다. 열여섯에 약초를 캐던 길이다.', '마교에서 무림맹으로 넘어오던 그 산길을 다시 걸었다. 흰 옷을 처음 받던 마을 어귀가 그대로였다.', '처음 떠돌기 시작한 그 길을 다시 걸었다. 첫 밤을 보낸 다리 밑이 그대로였다.'),
    '길은 그대로인데 걸음이 달랐다. 예전에는 한나절이면 넘던 고개를 이틀에 걸쳐 넘었다.', '고개 꼭대기에서 아래를 내려다보았다. 아무것도 아닌 풍경이었다. 그래서 오래 보았다.'), [
    { t: '고개 마루에 돌 하나를 올린다', h: '수명 +1년 · 마기 -20', f: function () { var g = dLife(1); S.mad = Math.max(0, S.mad - 20); done('돌무더기에 돌 하나를 얹었다. 다음에 누군가 또 얹을 것이다. ' + (g ? '몸이 조금 가벼워졌다. 수명 +' + g + '년.' : '몸은 그대로였지만 마음이 가벼웠다.'), 'rest'); } },
    { t: '길가의 약초를 캔다', h: '약초 +4 · 옥정', f: function () { addMat('herb', 4); addMat('jade', 1); done('그 시절 캐던 자리에 약초가 또 자라 있었다. 약초 4, 옥정 1.', 'item'); } }], 'loc_hill');
} });
LIFE.push({ id: 'd_l_grand', from: 68, w: 3, cd: 36, cond: function () { return (S.disc || []).some(function (d) { return d.p >= 60; }); }, run: function () {
  var d = dDisc()[0];
  scene('손제자', ps(esc(d.n) + '이(가) 어린아이 하나를 데려왔다. “제 제자입니다. 스승님께 인사드리러 왔습니다.”', '아이가 꾸벅 절했다. 당신 제자의 제자. 손제자다. 아이의 칼 잡는 손이 ' + esc(d.n) + '과(와) 똑같이 틀려 있었다. 당신이 오래전에 가르친 그 버릇이다.'), [
    { t: '버릇을 고쳐 준다', h: '제자 수련 +10 · 내공 +' + qiPct(.02), f: function () { var q = qiPct(.02); d.p = Math.min(100, d.p + 10); S.qi += q; done('아이의 손을 고쳐 잡아 주자 ' + esc(d.n) + '이(가) 얼굴을 붉혔다. 자기도 그렇게 잡고 있었으니까. 내공 +' + q + '.', 'people'); } },
    { t: '그대로 두고 웃는다', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); done('틀린 버릇도 삼대를 가면 문파의 초식이 된다. 당신은 웃기만 했다.', 'rest'); } }]);
} });
LIFE.push({ id: 'd_l_young', from: 67, to: 92, w: 3, cd: 30, cond: function () { return S.realm >= 3; }, run: function () {
  scene('젊은 도전자', ps('스무 살 남짓한 무인이 길을 막았다. “노선배의 이름을 듣고 왔습니다. 한 수 가르쳐 주십시오.”', '젊다. 젊은 것이 무섭다. 젊은 것은 지는 법을 모른다.'), [
    { t: '받아 준다', h: '전투 · 져도 죽지는 않는다 · 은전', f: function () { fight('swordsman', et() * .9, { auto: true, spar: true, title: '젊은 도전자', win: function () { var g = price(60 + S.realm * 20); S.silver += g; done('칼끝으로 그의 갓끈만 잘랐다. 젊은이는 넋이 나가 있다가 큰절을 하고 은전 <b>' + g + '</b>냥을 놓고 갔다.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .4)); done('젊은 칼이 늙은 칼을 넘었다. 당신은 웃으며 일어났다. “잘했다. 이제 가서 더 센 놈을 찾아라.”', 'fail'); } }); } },
    { t: '말로 가르친다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('“지는 법부터 배워라.” 젊은이는 알아듣지 못한 얼굴로 돌아갔다. 십 년 뒤에 알아들을 것이다.', 'event'); } }]);
} });
LIFE.push({ id: 'd_l_letter', from: 67, w: 2, once: 'life', run: function () {
  scene('오래된 편지', ps('짐을 정리하다 낡은 편지 뭉치를 찾았다. ' + W('혈월봉 시절에 받은 것들이다.', '맹에 처음 들어왔을 때 받은 것들이다.', '떠돌던 시절 객잔마다 남겨진 것들이다.'), '보낸 사람 대부분이 이미 세상에 없다. 맨 아래 편지는 아직 뜯지도 않았다.'), [
    { t: '뜯어 읽는다', h: '기억이 되살아난다 · 내공 +' + qiPct(.03), f: function () { var q = qiPct(.03); S.qi += q; done('「살아 있으면 답장해라.」 단 한 줄. 이제는 답장할 곳이 없다. 대신 그 한 줄을 오래 읽었다. 내공 +' + q + '.', 'people'); } },
    { t: '뜯지 않고 태운다', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); done('뜯지 않은 편지는 영원히 좋은 소식일 수 있다. 불 속에서 글자 하나 보지 않고 재가 되었다.', 'rest'); } }]);
} });
LIFE.push({ id: 'd_l_tea', from: 67, w: 2, cd: 18, run: function () {
  scene('차 한 잔', '<p>' + pick(['비가 왔다. 처마 밑에서 차를 끓였다.', '눈이 왔다. 화로에 주전자를 올렸다.', '바람이 좋았다. 마루에 찻상을 내놓았다.']) + ' ' + ((S.disc || []).length ? dTopDisc() + '이(가) 맞은편에 앉았다.' : '맞은편 자리는 비어 있었다. 찻잔은 둘을 놓았다.') + '</p>', [
    { t: '천천히 마신다', h: '체력 · 마기 회복', f: function () { S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .3)); S.mad = Math.max(0, S.mad - 12); done('차가 식을 때까지 아무 말도 하지 않았다. 식은 차도 맛이 있었다.', 'rest'); } },
    { t: '찻잎을 보며 운기한다', h: '내공 +' + qiPct(.015), f: function () { var q = qiPct(.015); S.qi += q; done('찻잎이 가라앉는 속도에 숨을 맞췄다. 내공 +' + q + '.', 'qi'); } }]);
} });
LIFE.push({ id: 'd_l_moon', from: 67, to: 92, w: 2, cd: 36, cond: dPre, run: function () {
  var q = qiPct(.04);
  scene('혈월을 올려다보다', ps('그해에도 혈월이 떴다. ' + (dTruth() ? '이제 당신은 저 달이 무엇인지 안다. 녹아 가는 자물쇠다.' : '왜 뜨는지 모르는 달이다. 이 나이까지 모르는 것이 많다.'), '달빛이 해마다 조금씩 짙어진다. 젊은 사람들은 모른다. 늙은이들만 안다.'), [
    { t: '달빛 아래에서 운기한다', h: '내공 +' + q + ' · 마기 +12', f: function () { S.qi += q; dMad(12); done('붉은 달빛을 들이마셨다. 단전이 끓었다. 이것이 마지막에 무엇을 부를지 알면서도. 내공 +' + q + '.', 'qi'); } },
    { t: '창을 닫는다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('창을 닫았다. 붉은빛이 문틈으로 가늘게 새어 들었다.', 'rest'); } }], 'night');
} });
LIFE.push({ id: 'd_l_will', from: 75, w: 2, once: 'life', cond: function () { return !!S.sect || (S.disc || []).length > 0; }, run: function () {
  scene('유언장', ps('붓을 들었다. ' + (S.sect ? dSect() + '을(를) 누구에게 맡길지,' : '제자들에게 무엇을 남길지,') + ' 은전은 어떻게 나눌지.', '첫 줄을 쓰는 데 하루가 걸렸다. 다음 줄은 금방이었다. 마지막 줄을 쓰는 데 다시 하루가 걸렸다.'), [
    { t: '재산을 문도와 제자에게 나눈다', h: '은전 -' + price(300) + ' · 제자 수련 상승', off: S.silver < price(300) ? '은전이 모자란다' : null, f: function () { S.silver -= price(300); (S.disc || []).forEach(function (d) { d.p = Math.min(100, d.p + 8); }); S.flags.d_willDone = 1; done('살아 있을 때 나누기로 했다. 죽은 뒤에 나누면 다툼이 생긴다. 살아서 나누면 고맙다는 말을 듣는다.', 'people'); } },
    { t: '한 줄만 남긴다', h: '마기 -20', f: function () { S.mad = Math.max(0, S.mad - 20); S.flags.d_willDone = 1; done('「사이좋게.」 그것만 적었다. 나머지는 알아서 할 것이다. 그렇게 가르쳤으니까.', 'event'); } }]);
} });
LIFE.push({ id: 'd_l_orphan', from: 75, to: 82, w: 3, once: 'life', run: function () {
  scene('역병의 아이', ps('역병이 휩쓴 마을 어귀에서 아이 하나가 울지도 않고 앉아 있었다. 부모를 묻은 지 사흘째라 했다.', '아이의 눈이 당신을 보았다. 오래전 이름 없던 시종의 눈이었다.'), [
    { t: '거두어 제자로 삼는다', h: '제자를 얻는다', off: (S.disc || []).length >= 8 ? '제자가 너무 많다' : null, f: function () { S.disc = S.disc || []; var d = { n: randName(), p: 5, t: rnd(3, 5), a: rnd(8, 11) }; S.disc.push(d); done('아이에게 이름을 지어 주었다. <b>' + esc(d.n) + '</b>. 이름을 받은 아이가 그제야 울었다.', 'people'); } },
    { t: '마을 사람에게 맡기고 은전을 남긴다', h: '은전 -' + price(120) + ' · 마기 -15', off: S.silver < price(120) ? '은전이 모자란다' : null, f: function () { S.silver -= price(120); S.mad = Math.max(0, S.mad - 15); done('아이를 맡기고 은전을 남겼다. 돌아서는데 아이가 소매를 잡았다. 놓아 주는 데 오래 걸렸다.', 'people'); } }], 'loc_village');
} });
LIFE.push({ id: 'd_l_spy', from: 83, to: 90, w: 3, cd: 24, cond: dPre, run: function () {
  scene('하얀 옷의 첩자', ps('밤중에 창틈으로 단 냄새가 스며들었다. 혈정 연기다. 하얀 옷의 그림자가 지붕 위를 지나갔다.', '구천문이 당신을 살피고 있다. 늙은이 하나를 이렇게까지 살피는 것을 보면, 아직 쓸모가 있다는 뜻이다.'), [
    { t: '쫓아간다', h: '전투 · 져도 죽지는 않는다 · 정보', f: function () { fight('d_acolyte', et() * .95, { auto: true, spar: true, title: '구천문 첩자', win: function () { S.flags.d_intel = 1; addMat('gem', 1); done('첩자의 품에서 사자들의 동선이 적힌 쪽지가 나왔다. 보석 1.', 'fight'); }, lose: function () { S.hp = Math.max(1, Math.round(maxHp() * .35)); done('늙은 다리로는 지붕을 쫓지 못했다. 그림자는 하얀 연기와 함께 사라졌다.', 'fail'); } }); } },
    { t: '창을 닫고 숯을 피운다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('숯 냄새가 단 냄새를 덮었다. 그림자는 다시 오지 않았다. 아직은.', 'rest'); } }], 'night');
} });
LIFE.push({ id: 'd_l_hall', from: 67, world: ['ma'], w: 2, cd: 40, run: function () {
  scene('대전의 초상화', ps('총단 대전에 역대 교주의 초상화가 걸려 있다. 위무강의 초상화 앞에서 걸음이 멈췄다.', S.flags.masterDead ? '그림 속의 그는 병들기 전의 얼굴이었다. 당신이 아는 그는 늘 기침을 하고 있었다.' : '그림 속 얼굴보다 실물이 훨씬 늙었다. 그래도 눈빛만은 그림과 같았다.', '젊은 교도들이 당신을 보고 길을 비켰다. 그들에게는 당신이 초상화 속 사람이다.'), [
    { t: '초상화 앞에 향을 올린다', h: '마기 -15', f: function () { S.mad = Math.max(0, S.mad - 15); done('향 연기가 초상화를 타고 올라갔다. 그림 속 눈빛이 조금 부드러워진 것 같았다.', 'rest'); } },
    { t: '젊은 교도들을 불러 모은다', h: '은전 +' + price(80) + ' · 내공 +' + qiPct(.015), f: function () { S.silver += price(80); S.qi += qiPct(.015); done('대전 마당에서 옛 이야기를 했다. 교도들이 눈을 반짝였다. 장로회가 수고비로 은전 <b>' + price(80) + '</b>냥을 보냈다.', 'people'); } }], 'throne');
} });
LIFE.push({ id: 'd_l_banquet', from: 67, world: ['jeong'], w: 2, cd: 40, run: function () {
  scene('맹의 연회', ps('무림맹의 연회에 상석으로 불려 갔다. 마교 출신이 상석에 앉는 것을 두고 수군대던 시절이 있었다. 이제 그 수군대던 자들은 대부분 죽었다.', '젊은 세가의 자제들이 돌아가며 술을 따랐다. 누구의 손자인지 다 알아볼 수 있었다.'), [
    { t: '한 잔씩 다 받는다', h: '은전 +' + price(100) + ' · 체력 -10%', f: function () { S.silver += price(100); hurt(.1); done('술이 몸을 이기는 나이가 되었다. 그래도 다 받았다. 세가들이 보낸 예물이 은전 <b>' + price(100) + '</b>냥이었다.', 'people'); } },
    { t: '일찍 자리를 뜬다', h: '마기 -10', f: function () { S.mad = Math.max(0, S.mad - 10); done('달을 핑계로 일찍 나왔다. 연회장의 웃음소리가 뒤에서 멀어졌다. 혼자 걷는 밤길이 좋았다.', 'rest'); } }], 'alliance');
} });
LIFE.push({ id: 'd_l_inn', from: 67, world: ['wander'], w: 2, cd: 40, run: function () {
  scene('객잔의 단골', ps('오래 묵은 객잔의 주인이 바뀌었다. 옛 주인의 딸이다. 그녀는 당신을 보자마자 제일 구석 자리를 비웠다. “아버지가 늘 저 자리는 비워 두라 했어요.”', '창가 자리. 칼을 벽에 기대 놓기 좋은 자리다.'), [
    { t: '그 자리에 앉아 국수를 시킨다', h: '체력 회복 · 마기 -10', f: function () { S.hp = maxHp(); S.mad = Math.max(0, S.mad - 10); done('국수 맛은 그대로였다. 주인의 딸이 그 아버지의 비법이라 했다. 비법이라기에는 짰다. 그래서 그대로였다.', 'rest'); } },
    { t: '객잔 지붕을 고쳐 준다', h: '은전 +' + price(60) + ' · 정철 +2', f: function () { S.silver += price(60); addMat('iron', 2); done('늙은 몸으로 지붕에 올랐다. 다 고치고 내려오니 숙박비가 일 년 치 면제되어 있었다. 은전 <b>' + price(60) + '</b>냥어치. 남은 정철 2개도 챙겼다.', 'item'); } }], 'loc_village');
} });
LIFE.push({ id: 'd_l_after_white', from: 67, w: 5, once: 'life', cond: dAfterOk, run: function () {
  scene(dWhite() ? '하얀 달' : '옅어지는 달', ps(dWhite() ? '달이 하얗다. 마지막 혈월 이후 처음 맞는 보름이다. 사람들이 밖으로 나와 달을 보았다. 무서워하지 않고.' : '보름달이 떴다. 붉은빛이 지난해보다 한 겹 옅었다. 문 앞을 지키는 사람들의 장부에 그렇게 적혔다.', '당신은 마루에 누워 달을 보았다. 이제는 저 달이 내일 당신을 어디로도 되돌려 보내지 않는다.'), [
    { t: '달빛 아래 잠든다', h: '체력 · 마기 회복', f: function () { S.hp = maxHp(); S.mad = 0; done('마루에서 잠들었다. 깨어 보니 누군가 이불을 덮어 주었다. 아침이었다. 같은 날의 아침이 아니라, 다음 날의 아침이었다.', 'rest'); } },
    { t: '달을 보며 운기한다', h: '내공 +' + qiPct(.03), f: function () { var q = qiPct(.03); S.qi += q; done('달빛이 단전으로 내려왔다. 맑았다. 내공 +' + q + '.', 'qi'); } }], dWhite() ? 'true' : 'peace');
} });
LIFE.push({ id: 'd_l_after_kids', from: 67, w: 4, once: 'life', cond: dAfterOk, run: function () {
  scene('아이들의 놀이', ps('골목에서 아이들이 칼싸움 놀이를 했다. 한 아이가 외쳤다. “내가 문을 닫는 사람 할래!” 다른 아이가 외쳤다. “그럼 나는 일좌!”', '문을 닫는 사람 역할의 아이는 이름이 없었다. 놀이에서도 그 사람은 이름 없이 불렸다. 그게 당신이 바란 것이었다.'), [
    { t: '나뭇가지로 한 수 가르쳐 준다', h: '마기 -15 · 내공 +' + qiPct(.015), f: function () { S.mad = Math.max(0, S.mad - 15); S.qi += qiPct(.015); done('“문 닫는 사람은 이렇게 서는 거다.” 아이가 따라 섰다. 꽤 그럴듯했다.', 'people'); } },
    { t: '조용히 지나간다', h: '아무 일 없다', f: function () { done('아이들 웃음소리를 등에 지고 걸었다. 그 소리가 이 세상이 아직 여기 있다는 증거였다.', 'event'); } }], 'peace');
} });
