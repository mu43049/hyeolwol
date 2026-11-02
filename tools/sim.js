/* 헤드리스 시뮬레이터. 사용: node tools/sim.js [runs] [maxSteps] [seed]  (V=1 이면 자세히) */
var fs = require('fs'), vm = require('vm'), path = require('path');
var root = path.join(__dirname, '..');
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
var files = (html.match(/<script src="([^"]+)"/g) || []).map(function (s) { return s.slice(13, -1); }).filter(function (f) { return !/phaser|audio|main\.js|stage\.js/.test(f); });
var RUNS = +process.argv[2] || 3, MAXSTEPS = +process.argv[3] || 4000, seed = +process.argv[4] || 7;
function rng() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }
function makeCtx() {
  var store = {}, ctx = { console: console, JSON: JSON, Date: Date, Math: Object.create(Math), Object: Object, Array: Array, Number: Number, String: String, parseInt: parseInt, parseFloat: parseFloat, isNaN: isNaN, Error: Error, RegExp: RegExp, setTimeout: function () {}, clearTimeout: function () {}, setInterval: function () {} };
  ctx.Math.random = rng; ctx.window = ctx;
  ctx.document = { getElementById: function () { return null; }, addEventListener: function () {}, documentElement: { setAttribute: function () {} } };
  ctx.localStorage = { getItem: function (k) { return store[k] || null; }, setItem: function (k, v) { store[k] = v; } };
  ctx.SIM = { rng: rng, ch: [], scenes: 0, fights: 0, ended: null };
  vm.createContext(ctx);
  files.concat(['tools/simhook.js']).forEach(function (f) { try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); } catch (e) { console.error('LOAD FAIL', f, e.stack.split('\n').slice(0, 4).join('\n')); process.exit(1); } });
  return ctx;
}
var ctx = makeCtx(), out = [];
for (var i = 0; i < RUNS; i++) {
  ctx.SIM.ended = null; ctx.SIM.stuck = null; ctx.SIM.ch = [];
  try { vm.runInContext('simLife(' + MAXSTEPS + ')', ctx); } catch (e) { console.log('RUN', i, 'ERROR', e.stack.split('\n').slice(0, 6).join('\n')); break; }
  var d = ctx.SIM.ended, S = vm.runInContext('S', ctx);
  var st = vm.runInContext('S?{m:S.month,age:age(),realm:S.realm,silver:S.silver,path:S.path,disc:(S.disc||[]).length}:null', ctx);
  console.log('RUN', i, d ? (d.kind + ':' + d.id) : 'unfinished', 'steps', ctx.SIM.steps, 'scenes', ctx.SIM.scenes, 'fights', ctx.SIM.fights, 'reach', JSON.stringify(ctx.SIM.reach), d ? 'month ' + d.L.month + ' age ' + (16 + Math.floor((d.L.month - 1) / 12)) + ' realm ' + d.L.realm + ' silver ' + d.L.silver + ' path ' + d.L.path : JSON.stringify(st), ctx.SIM.hint || '');
}
