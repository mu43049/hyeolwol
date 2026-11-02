/* 혈월회귀록 v4 — 졸라맨. 초상화가 없는 조연은 이름으로 모양을 정해 그린다(같은 이름은 늘 같은 모양). */
function hash32(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
var STICK_INK = ['#e9dcc6', '#f0c8c0', '#cfe3d4', '#d8cdef', '#f2dba0', '#c6dbe8'];
var STICK_BG = ['#2b1417', '#1b1a2b', '#17261f', '#2a2114', '#241522', '#14222b'];
function stickSvg(key) {
  var h = hash32(key), g = function (n) { var v = h % n; h = Math.imul(h ^ (h >>> 7), 2654435761) >>> 0; return v; };
  var ink = STICK_INK[g(6)], bg = STICK_BG[g(6)], hat = g(7), wp = g(6), beard = g(4) === 0, fem = g(5) === 0, lean = g(3) - 1, bent = g(6) === 0;
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="' + bg + '"/><circle cx="76" cy="22" r="11" fill="#7a1d24" opacity=".75"/>';
  s += '<g stroke="' + ink + '" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none">';
  var hx = 50 + lean * 3, hy = bent ? 32 : 28;
  s += '<circle cx="' + hx + '" cy="' + hy + '" r="9" fill="' + bg + '"/>';
  s += '<path d="M' + hx + ' ' + (hy + 9) + 'L' + (50 - lean * 2) + ' 62"/>';
  s += '<path d="M' + hx + ' 43L33 56M' + hx + ' 43L67 54"/>';
  s += '<path d="M' + (50 - lean * 2) + ' 62L38 88M' + (50 - lean * 2) + ' 62L62 88"/>';
  if (fem) s += '<path d="M' + (hx - 9) + ' ' + hy + 'Q' + (hx - 14) + ' ' + (hy + 16) + ' ' + (hx - 8) + ' ' + (hy + 22) + '"/>';
  if (beard) s += '<path d="M' + (hx - 4) + ' ' + (hy + 8) + 'L' + hx + ' ' + (hy + 20) + 'L' + (hx + 4) + ' ' + (hy + 8) + '"/>';
  if (hat === 0) s += '<path d="M' + (hx - 15) + ' ' + (hy - 6) + 'L' + hx + ' ' + (hy - 20) + 'L' + (hx + 15) + ' ' + (hy - 6) + 'Z" fill="' + bg + '"/>';
  if (hat === 1) s += '<path d="M' + (hx - 11) + ' ' + (hy - 8) + 'H' + (hx + 11) + 'M' + (hx - 6) + ' ' + (hy - 8) + 'V' + (hy - 16) + 'H' + (hx + 6) + 'V' + (hy - 8) + '"/>';
  if (hat === 2) s += '<path d="M' + (hx - 8) + ' ' + (hy - 8) + 'Q' + hx + ' ' + (hy - 18) + ' ' + (hx + 8) + ' ' + (hy - 8) + 'M' + (hx + 6) + ' ' + (hy - 10) + 'L' + (hx + 16) + ' ' + (hy - 2) + '"/>';
  if (hat === 3) s += '<circle cx="' + hx + '" cy="' + (hy - 11) + '" r="3.6"/>';
  if (hat === 4) s += '<path d="M' + (hx - 9) + ' ' + (hy - 6) + 'H' + (hx + 9) + '"/>';
  if (wp === 0) s += '<path d="M67 54L84 24M82 29L87 27"/>';
  if (wp === 1) s += '<path d="M67 54L88 80" stroke-width="2.6"/><path d="M63 57L72 51"/>';
  if (wp === 2) s += '<path d="M33 56L18 30M18 30L14 22"/>';
  if (wp === 3) s += '<path d="M67 54L74 36L84 40Z" fill="' + ink + '" opacity=".6"/>';
  if (wp === 4) s += '<path d="M72 92V50"/>';
  s += '</g></svg>';
  return s;
}
function stickUrl(key) { return "url('data:image/svg+xml;utf8," + encodeURIComponent(stickSvg(key)).replace(/'/g, '%27') + "')"; }
function ppic(k, cls) {
  if (PT[k]) return '<span class="' + cls + '" style="background-image:' + imgUrl(PT[k]) + '"></span>';
  var nm = (typeof NPC !== 'undefined' && NPC[k]) ? NPC[k].n : k;
  return '<span class="' + cls + ' stk" style="background-image:' + stickUrl(nm) + ';background-size:cover;background-position:center"></span>';
}
