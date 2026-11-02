/* 인물 방문(VIS)과 신뢰 마일스톤(MS)을 긴 삶 상태에서 무작위로 돌려 본다 */
var fs = require('fs'), vm = require('vm'), path = require('path'), root = path.join(__dirname, '..');
var files = (fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<script src="([^"]+)"/g) || []).map(function (s) { return s.slice(13, -1); }).filter(function (f) { return !/phaser|audio|main\.js|stage\.js/.test(f); });
var seed = 5; function rng() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }
var store = {}, ctx = { console: console, JSON: JSON, Math: Object.create(Math), Object: Object, Array: Array, Number: Number, String: String, Error: Error, RegExp: RegExp, parseInt: parseInt, isNaN: isNaN, setTimeout: function () {}, setInterval: function () {} };
ctx.Math.random = rng; ctx.window = ctx; ctx.document = { getElementById: function () { return null; }, addEventListener: function () {}, documentElement: { setAttribute: function () {} } };
ctx.localStorage = { getItem: function (k) { return store[k] || null; }, setItem: function (k, v) { store[k] = v; } };
ctx.SIM = { rng: rng, ch: [], scenes: 0, fights: 0, scan: true, bad: [] }; vm.createContext(ctx);
files.concat(['tools/simhook.js']).forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); });
var r = vm.runInContext('(' + function () {
  var errs = [], n = 0, paths = ['guard', 'cheonma', 'betray', 'maengju', 'flee', 'burn', 'true'];
  Object.keys(VIS).forEach(function (k) {
    for (var i = 0; i < 25; i++) {
      startLife(); var p = paths[Math.floor(SIM.rng() * paths.length)]; S.path = p; S.world = PATH_WORLD[p] || 'ma';
      S.month = 40 + Math.floor(SIM.rng() * 900); S.realm = Math.floor(SIM.rng() * 9); S.qi = REALMS[S.realm].q; S.hp = maxHp(); S.silver = 5000;
      S.trust[k] = Math.floor(SIM.rng() * 5); SIM.stuck = null; SIM.hubReady = false; SIM.bad.length = 0;
      try { VIS[k](); n++; } catch (e) { errs.push(k + ': ' + e.message + ' @ ' + String(e.stack).split('\n')[1]); }
      if (SIM.stuck) errs.push(k + ': stuck ' + SIM.stuck);
      SIM.bad.forEach(function (b) { errs.push(k + ' => ' + b); });
    }
  });
  var u = {}; return JSON.stringify({ n: n, errs: errs.filter(function (e) { if (u[e]) return false; u[e] = 1; return true; }) });
}.toString() + ')()', ctx);
console.log(r);
