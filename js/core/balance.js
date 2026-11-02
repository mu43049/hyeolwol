/* 혈월회귀록 v3 — 밸런스. 숫자를 바꾸면 게임 전체 난이도가 바뀐다. tools/balance-sim.js로 검증할 것. */
var REALMS = [
  { n: '삼류', g: '三', h: '三流', q: 0 },
  { n: '이류', g: '二', h: '二流', q: 80 },
  { n: '일류', g: '一', h: '一流', q: 220 },
  { n: '절정', g: '絶', h: '絶頂', q: 420 },
  { n: '초절정', g: '超', h: '超絶頂', q: 700 },
  { n: '화경', g: '化', h: '化境', q: 1080 },
  { n: '현경', g: '玄', h: '玄境', q: 1580 },
  { n: '생사경', g: '生', h: '生死境', q: 2250 },
  { n: '자연경', g: '然', h: '自然境', q: 3100 }
];
var WEAP = [{ n: '맨손', a: 0 }, { n: '철도', a: 4 }, { n: '흑철도', a: 9 }, { n: '혈철도', a: 15 }, { n: '천마도', a: 23 }];
var ARMOR = [{ n: '무명옷', d: 0, h: 0 }, { n: '가죽갑', d: 2, h: 12 }, { n: '흑린갑', d: 5, h: 28 }, { n: '천잠보의', d: 9, h: 50 }];

/* 회귀 각인 (영구 성장). cost(l)는 l레벨에서 다음 레벨로 갈 때 드는 조각 */
var UPG = [
  { k: 'hp', n: '체력 단련', d: '매 생 최대 체력 +12', max: 10, cost: function (l) { return 8 + 6 * l; } },
  { k: 'atk', n: '근골 단련', d: '매 생 공격력 +2', max: 10, cost: function (l) { return 10 + 7 * l; } },
  { k: 'def', n: '철피', d: '매 생 방어력 +1.5', max: 8, cost: function (l) { return 10 + 7 * l; } },
  { k: 'qi', n: '선천 내공', d: '시작 내공 +25', max: 10, cost: function (l) { return 8 + 5 * l; } },
  { k: 'gain', n: '오성(悟性)', d: '얻는 내공 +8%', max: 5, cost: function (l) { return 15 + 12 * l; } },
  { k: 'eye', n: '밝은 눈', d: '안력 +1 · 수가 더 잘 읽히고 치명타가 오른다', max: 3, cost: function (l) { return 12 + 10 * l; } },
  { k: 'silver', n: '노잣돈', d: '시작 은전 +30', max: 5, cost: function (l) { return 5 + 3 * l; } },
  { k: 'trust', n: '낯익은 얼굴', d: '모든 인연이 신뢰 1에서 시작', max: 1, cost: function () { return 20; } },
  { k: 'trace', n: '회귀의 흔적', d: '지난 최고 경지 내공의 10%를 지니고 시작', max: 3, cost: function (l) { return 25 + 20 * l; } }
];
function upL(k) { return (P.up && P.up[k]) || 0; }

/* 적 전체 보정: 플레이어 능력치 체계에 맞추기 위한 배율 */
var BAL = { enemyHp: 1.35, enemyAtk: 1.12, enemyDefK: .32, defK: .6, eDefK: .5, critK: 1.6 };

function effEye() { return S.eye + (S.realm >= 2 ? 1 : 0); }
function maxHp() { return Math.round((80 + 32 * S.realm + S.hpBonus + upL('hp') * 12 + sk('cheolgol') * 5 + ARMOR[S.armor || 0].h) * (S.realm >= 4 ? 1.2 : 1)); }
function maxKi() { return 30 + S.realm * 10 + sk('gong') * 2 + (S.realm >= 6 ? 30 : 0); }
function pAtk() {
  var a = 10 + 7 * S.realm + WEAP[S.weapon].a + upL('atk') * 2;
  if (S.mad >= 85) a *= 1.35; else if (S.mad >= 60) a *= 1.15;
  a *= 1 + .02 * sk('mara') + (S.hp < maxHp() * .4 ? .03 * sk('sihyeol') : 0);
  if (S.realm >= 8) a *= 1.3;
  return a;
}
function pDef() { return 2 + 2.5 * S.realm + sk('geumgang') * .8 + ARMOR[S.armor || 0].d + upL('def') * 1.5; }
function critRate() { return Math.min(.35, .06 + .015 * effEye()); }
function qiGain(n) { return Math.round(n * (1 + .08 * upL('gain'))); }
function canBreak() { return S.realm < REALMS.length - 1 && S.qi >= REALMS[S.realm + 1].q; }
function nextQ() { return REALMS[S.realm + 1] ? REALMS[S.realm + 1].q : S.qi; }
function madMul() { return S.realm >= 8 ? 0 : (S.realm >= 4 ? .7 : 1); }
function freeDodgeAny() { return sk('heuk') || sk('gwiyeong') || sk('gunrim') || sk('jeun'); }
function dodgeCost() { return (freeDodgeAny() || S.realm >= 5) ? 0 : (S.realm >= 1 ? 1 : 3); }
function counterK2() { return sk('gunrim') ? .9 : ((sk('gwiyeong') || sk('jeun')) ? .7 : .4); }
function skillMul(id) { var s = sk(id); return SK[id].mult * (1 + .07 * (s - 1)) * (s >= 12 ? 1.2 : 1); }

/* 돌파 시련: 다음 경지로 가려면 심마(心魔)를 이겨야 한다 */
function trialEnemy(target) {
  var R = target - 1;
  return { id: 'heart', n: '심마 · ' + REALMS[target].n + '의 벽', boss: true,
    hp: Math.round((95 + 55 * R + 9 * R * R) * (S.insightBuff ? .75 : 1)),
    atk: 9 + 4.6 * R, def: Math.round(2 + 1.8 * R), w: { strong: 3, rapid: 3, feint: 3, charge: 2 } };
}
