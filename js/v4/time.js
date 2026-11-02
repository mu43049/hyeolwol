/* 혈월회귀록 v4 — 80년의 시간. 나이, 시대(장), 수명, 노화, 한 해의 흐름.
   한 달에 한 행동. 16세(1개월)에서 96세(960개월)까지. 첫 36개월은 '청년기'(옛 이야기)이고 그 뒤가 새 이야기다. */
var MAXM = 960, START_AGE = 16, YOUTH_END = 36;
function ageOf(m) { return START_AGE + Math.floor((m - 1) / 12); }
function age() { return ageOf(S.month); }
function yearOf(m) { return Math.floor(((m || S.month) - 1) / 12) + 1; }

/* 시대. [시작 개월, 장 이름, {세계별 제목}, {세계별 부제}] — 세계: ma(마교 계열) / jeong(정파 계열) / wander(방랑 계열) */
var ERAS = [
  [37, { ma: '재건', jeong: '새 맹약', wander: '이름 하나' }, { ma: '불탄 자리에 다시 기둥을 세운다.', jeong: '두 깃발 사이에서 길을 찾는다.', wander: '이름 없는 사람이 처음으로 이름을 얻는다.' }],
  [121, { ma: '흑천맹', jeong: '강호행', wander: '풍진' }, { ma: '사파 연합이 산 아래서 이를 간다.', jeong: '맹의 검이 되어 천하를 돈다.', wander: '길 위의 소문이 발목을 잡는다.' }],
  [217, { ma: '북해의 눈보라', jeong: '북해의 눈보라', wander: '북해의 눈보라' }, { ma: '바깥에서 온 칼이 강호의 경계를 넘는다.', jeong: '바깥에서 온 칼이 강호의 경계를 넘는다.', wander: '바깥에서 온 칼이 강호의 경계를 넘는다.' }],
  [313, { ma: '황실의 그물', jeong: '황실의 그물', wander: '황실의 그물' }, { ma: '조정이 무림에 그물을 던진다.', jeong: '조정이 무림에 그물을 던진다.', wander: '조정이 무림에 그물을 던진다.' }],
  [409, { ma: '천외천', jeong: '천외천', wander: '천외천' }, { ma: '하늘 위에도 하늘이 있다는 소문이 돈다.', jeong: '하늘 위에도 하늘이 있다는 소문이 돈다.', wander: '하늘 위에도 하늘이 있다는 소문이 돈다.' }],
  [505, { ma: '문하의 시대', jeong: '문하의 시대', wander: '문하의 시대' }, { ma: '내가 가르친 아이들이 나를 넘보기 시작한다.', jeong: '내가 가르친 아이들이 나를 넘보기 시작한다.', wander: '내가 가르친 아이들이 나를 넘보기 시작한다.' }],
  [601, { ma: '혈월의 진실', jeong: '혈월의 진실', wander: '혈월의 진실' }, { ma: '붉은 달이 왜 뜨는지 알게 되는 때.', jeong: '붉은 달이 왜 뜨는지 알게 되는 때.', wander: '붉은 달이 왜 뜨는지 알게 되는 때.' }],
  [697, { ma: '잔월', jeong: '잔월', wander: '잔월' }, { ma: '옛 얼굴들이 하나둘 사라진다.', jeong: '옛 얼굴들이 하나둘 사라진다.', wander: '옛 얼굴들이 하나둘 사라진다.' }],
  [793, { ma: '황혼의 전쟁', jeong: '황혼의 전쟁', wander: '황혼의 전쟁' }, { ma: '늙은 몸으로 마지막 전쟁에 나선다.', jeong: '늙은 몸으로 마지막 전쟁에 나선다.', wander: '늙은 몸으로 마지막 전쟁에 나선다.' }],
  [889, { ma: '마지막 혈월', jeong: '마지막 혈월', wander: '마지막 혈월' }, { ma: '처음 본 그 달을 마지막으로 올려다본다.', jeong: '처음 본 그 달을 마지막으로 올려다본다.', wander: '처음 본 그 달을 마지막으로 올려다본다.' }]
];
function eraIdx(m) { var i = -1; for (var j = 0; j < ERAS.length; j++) if (m >= ERAS[j][0]) i = j; return i; }
function worldOf() { return (S && S.world) || (S && S.route === 'jeong' ? 'jeong' : 'ma'); }
/* 세계별 문장 고르기: W(마교, 정파, 방랑) — 방랑을 생략하면 마교 문장을 쓴다 */
function W(ma, jeong, wander) { var w = worldOf(); return w === 'jeong' ? (jeong !== undefined ? jeong : ma) : (w === 'wander' ? (wander !== undefined ? wander : ma) : ma); }

/* 장 번호: 0~5는 청년기(옛 CH), 6부터 새 시대 */
function chapIdx(m) { if (m <= YOUTH_END) { var i = 0; for (var j = 0; j < CH.length; j++) if (m >= CH[j][0]) i = j; return i; } return 6 + eraIdx(m); }
function chapInfo(i) {
  if (i < 6) return (S && S.route && CHR[S.route] && CHR[S.route][i]) || CH[i];
  var e = ERAS[i - 6], w = worldOf(); return [e[0], '제' + (i + 1) + '장', e[1][w], e[2][w]];
}
function monthLabel() { var m = S.month; return age() + '세 · ' + yearOf(m) + '년차 ' + SEASON[Math.floor(((m - 1) % 12) / 3)]; }

/* 노화와 수명 */
function ageMul() { if (!S) return 1; var a = age(); if (a <= 44) return 1; var d = (a - 44) * .0075 * (1 - .085 * S.realm); return Math.max(.55, 1 - d); }
function lifespan() { return Math.min(96, 74 + 2 * S.realm + Math.min(12, S.lifeBonus || 0) + upL('life')); }
function yearsLeft() { return lifespan() - age(); }
/* 마지막 혈월은 수명보다 3년 앞선 해에 온다 — EVENTS에 m:'final'로 등록한다 */
function finalMonth() { return Math.max(YOUTH_END + 60, (lifespan() - 3 - START_AGE) * 12 + 1); }
function eventDue(m) { return EVENTS.filter(function (x) { return (x.m === m || (x.m === 'final' && m === finalMonth())) && !S.flags['seen_' + x.id] && (!x.cond || x.cond()); })[0]; }

/* 한 해가 바뀔 때 */
function yearTick() {
  var y = yearOf(S.month);
  if (typeof estateTick === 'function') estateTick();
  if (typeof discipleTick === 'function') discipleTick();
  S.stock = null; /* 상점 재고 갱신 */
  if (age() >= 50 && S.month % 12 === 1 && S.realm < 6) logE('age', '몸이 예전 같지 않다. <b>' + age() + '세</b>.');
}

/* 시대가 바뀔 때 되감기 지점을 남긴다 */
function saveCheckpoint() {
  try { var c = JSON.parse(JSON.stringify(S)); c.log = (c.log || []).slice(0, 12); P.cp = { era: eraIdx(S.month), month: S.month, S: c, at: lifeNo() }; } catch (e) {}
}
function rewindCost() { return 12 + 6 * Math.max(0, eraIdx(S.month || 37)); }

/* 한 달이 지난다 */
function advance() {
  if (S.inEvent) { S.inEvent = false; hub(); return; }
  S.month++; P.stats.actions++;
  S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * .08));
  S.mad = Math.max(0, S.mad - 2 - (sk('gwiwon') ? 2 : 0) - (sk('jeongsim') ? 4 : 0));
  if (S.realm >= 5) S.hp = maxHp();
  if (S.flags.danDead && !S.flags.gotHyeolma) { S.flags.gotHyeolma = true; learn('hyeolma'); }
  if (typeof demonCount === 'function' && demonCount() >= 6) ach('demon');
  if (typeof achCheck === 'function') achCheck();
  if (typeof incomeTick === 'function') incomeTick();
  if (S.month > YOUTH_END && !S.path) { finish('guard'); return; }
  if (S.month > MAXM || (S.month > YOUTH_END && S.month % 12 === 1 && age() > lifespan())) { naturalEnd(); return; }
  if (S.month > YOUTH_END && S.month % 12 === 1) yearTick();
  var go = function () {
    var ev = eventDue(S.month);
    if (ev) { S.flags['seen_' + ev.id] = true; S.inEvent = true; ev.run(); return; }
    if (S.month > YOUTH_END && typeof lifeEvent === 'function' && lifeEvent()) return;
    hub();
  };
  if (chapIdx(S.month) !== chapIdx(S.month - 1)) { if (S.month > YOUTH_END) saveCheckpoint(); chapterCard(chapIdx(S.month), go); } else go();
}
