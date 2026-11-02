/* 혈월회귀록 v3 — 공통 유틸 */
var VERSION = 'v3.0';
var rnd = function (a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; };
var frand = function (a, b) { return a + Math.random() * (b - a); };
var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var ps = function () { return Array.prototype.map.call(arguments, function (x) { return '<p>' + x + '</p>'; }).join(''); };
var $app = (typeof document !== 'undefined' && document.getElementById) ? document.getElementById('app') : null;

/* 바깥 연출 모듈(무대, 소리)이 없어도 게임이 돌아가도록 하는 안전 호출 */
function fx(name) {
  var args = Array.prototype.slice.call(arguments, 1);
  try { if (typeof Stage !== 'undefined' && Stage[name]) Stage[name].apply(Stage, args); } catch (e) { if (typeof console !== 'undefined') console.warn('fx', name, e); }
}
function sfx(name) { try { if (typeof Sound !== 'undefined') Sound.sfx(name); } catch (e) {} }
function bgm(mood) { try { if (typeof Sound !== 'undefined') Sound.bgm(mood); } catch (e) {} }
