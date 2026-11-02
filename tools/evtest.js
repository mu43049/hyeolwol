/* 이벤트 점검기: 새 이벤트(EVENTS의 m>36, LIFE)를 세계×경지×나이 조합으로 수백 번 돌려 오류·막힘·'undefined' 문구를 찾는다.
   사용: node tools/evtest.js [id접두사] [반복횟수] */
var fs = require('fs'), vm = require('vm'), path = require('path');
var root = path.join(__dirname, '..');
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
var files = (html.match(/<script src="([^"]+)"/g) || []).map(function (s) { return s.slice(13, -1); }).filter(function (f) { return !/phaser|audio|main\.js|stage\.js/.test(f); });
var PREFIX = process.argv[2] || '', REP = +process.argv[3] || 40, seed = 99;
function rng() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }
var store = {}, ctx = { console: console, JSON: JSON, Date: Date, Math: Object.create(Math), Object: Object, Array: Array, Number: Number, String: String, parseInt: parseInt, parseFloat: parseFloat, isNaN: isNaN, Error: Error, RegExp: RegExp, setTimeout: function () {}, clearTimeout: function () {}, setInterval: function () {} };
ctx.Math.random = rng; ctx.window = ctx; ctx.document = { getElementById: function () { return null; }, addEventListener: function () {}, documentElement: { setAttribute: function () {} } };
ctx.localStorage = { getItem: function (k) { return store[k] || null; }, setItem: function (k, v) { store[k] = v; } };
ctx.SIM = { rng: rng, ch: [], scenes: 0, fights: 0, ended: null, scan: true, bad: [] };
vm.createContext(ctx);
files.concat(['tools/simhook.js']).forEach(function (f) { try { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }); } catch (e) { console.error('LOAD FAIL', f, e.stack.split('\n').slice(0, 4).join('\n')); process.exit(1); } });
var code = '(' + function (PREFIX, REP) {
  var out = { errors: [], stuck: [], bad: [], ran: 0, ids: {} };
  var items = [];
  EVENTS.forEach(function (e) { if ((e.m === 'final' || e.m > 36) && e.id.indexOf(PREFIX) === 0) items.push({ kind: 'EV', e: e }); });
  LIFE.forEach(function (e) { if (e.id.indexOf(PREFIX) === 0) items.push({ kind: 'LIFE', e: e }); });
  var paths = ['guard', 'throne', 'cheonma', 'shadow', 'betray', 'peace', 'maengju', 'flee', 'burn', 'true'];
  items.forEach(function (it) {
    for (var r = 0; r < REP; r++) {
      var e = it.e, pth = paths[Math.floor(SIM.rng() * paths.length)];
      startLife(); S.path = pth; S.world = PATH_WORLD[pth] || 'ma'; if (pth === 'true') { S.noReturn = true; S.world = SIM.rng() < .5 ? 'jeong' : 'ma'; } S.rank = PATH_RANK[pth];
      S.realm = Math.min(8, Math.floor(SIM.rng() * 9)); var m = it.kind === 'EV' ? (e.m === 'final' ? finalMonth() : e.m) : Math.floor(40 + SIM.rng() * 900);
      if (it.kind === 'LIFE') { var lo = (e.from || 19), hi = Math.min(96, e.to || 95); m = (lo - 16) * 12 + 1 + Math.floor(SIM.rng() * Math.max(1, (hi - lo) * 12)); }
      S.month = Math.min(959, m); S.qi = Math.max(S.qi, REALMS[S.realm].q); S.hp = maxHp(); S.silver = Math.floor(SIM.rng() * 6000);
      S.trust = S.trust || {}; Object.keys(NPC).forEach(function (k) { if (SIM.rng() < .5) S.trust[k] = Math.floor(SIM.rng() * 6); });
      Object.keys(MATS).forEach(function (k) { if (SIM.rng() < .5) addMat(k, Math.floor(SIM.rng() * 6)); });
      if (SIM.rng() < .5) S.disc = [{ n: '김제자', p: 50, t: 3, a: 14 }]; if (SIM.rng() < .4) S.sect = { n: '시험문', lv: 2 };
      SIM.ended = null; SIM.stuck = null; SIM.hubReady = false; SIM.bad.length = 0; S.inEvent = true;
      try { e.run(); } catch (err) { out.errors.push(it.kind + ' ' + e.id + ' [' + pth + ' r' + S.realm + ' m' + S.month + ']: ' + err.message + ' @ ' + String(err.stack).split('\n')[1]); continue; }
      out.ran++;
      if (SIM.stuck) out.stuck.push(e.id + ': 선택지 없음 (' + SIM.stuck + ')');
      else if (!SIM.hubReady && !SIM.ended && S) out.stuck.push(e.id + ': 끝나지 않음 (마지막 장면 ' + SIM.last + ')');
      SIM.bad.forEach(function (b) { out.bad.push(e.id + ' => ' + b); });
    }
  });
  var uniq = function (a) { var s = {}; return a.filter(function (x) { var k = x.slice(0, 160); if (s[k]) return false; s[k] = 1; return true; }); };
  out.errors = uniq(out.errors); out.stuck = uniq(out.stuck); out.bad = uniq(out.bad); out.events = items.length;
  return JSON.stringify(out);
}.toString() + ')(' + JSON.stringify(PREFIX) + ',' + REP + ')';
var res = JSON.parse(vm.runInContext(code, ctx));
console.log('이벤트 ' + res.events + '개, 실행 ' + res.ran + '회');
['errors', 'stuck', 'bad'].forEach(function (k) { if (res[k].length) { console.log('\n[' + k + '] ' + res[k].length); res[k].slice(0, 40).forEach(function (x) { console.log(' - ' + x); }); } });
if (!res.errors.length && !res.stuck.length && !res.bad.length) console.log('문제 없음');
process.exit(res.errors.length || res.stuck.length || res.bad.length ? 1 : 0);
