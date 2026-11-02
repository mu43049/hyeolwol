/* 혈월회귀록 v3 — 소리. 코드로 연주하는 오음계(궁상각치우) BGM과 효과음.
   BGM_FILES(js/content/assets.js)에 파일 경로를 넣으면 그 파일이 대신 재생된다. */
var Sound = (function () {
  var AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
  var ctx = null, master, music, fxg, verb, timer = null, mood = null, want = null, nextT = 0, stepN = 0, audioEl = null, unlocked = false;
  var MOODS = {
    title: { bpm: 58, root: 146.83, scale: [0, 3, 5, 7, 10], lead: .55, drone: true, drum: 0, arp: [0, -1, 2, -1, 4, -1, 3, -1, 1, -1, -1, -1, 2, -1, 0, -1] },
    hub: { bpm: 74, root: 164.81, scale: [0, 2, 4, 7, 9], lead: .5, drone: true, drum: 0, arp: [0, 2, 4, 2, 5, 4, 2, -1, 1, 3, 5, 3, 4, -1, 2, -1] },
    story: { bpm: 54, root: 130.81, scale: [0, 3, 5, 7, 10], lead: .45, drone: true, drum: 0, flute: true, arp: [0, -1, -1, -1, 4, -1, -1, -1, 3, -1, -1, -1, 2, -1, -1, -1] },
    battle: { bpm: 118, root: 146.83, scale: [0, 3, 5, 7, 10], lead: .5, drone: false, drum: 1, arp: [0, 0, 3, 0, 4, 0, 3, 2, 0, 0, 3, 0, 5, 4, 3, 2] },
    boss: { bpm: 132, root: 110, scale: [0, 1, 5, 7, 8], lead: .55, drone: true, drum: 2, arp: [0, 0, 2, 0, 3, 2, 0, 4, 0, 0, 2, 0, 5, 4, 3, 1] },
    ending: { bpm: 62, root: 174.61, scale: [0, 2, 4, 7, 9], lead: .5, drone: true, drum: 0, flute: true, arp: [4, -1, 3, -1, 2, -1, 0, -1, 1, -1, 2, -1, 0, -1, -1, -1] },
    death: { bpm: 46, root: 98, scale: [0, 3, 5, 7, 10], lead: .4, drone: true, drum: 0, arp: [0, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, 1, -1, -1, -1] }
  };
  function vol() { return (typeof P !== 'undefined' && P.settings) ? P.settings : { bgm: .55, sfx: .8, mute: false }; }
  function init() {
    if (ctx || !AC) return; ctx = new AC();
    master = ctx.createGain(); master.gain.value = vol().mute ? 0 : 1; master.connect(ctx.destination);
    music = ctx.createGain(); music.gain.value = vol().bgm * .5; fxg = ctx.createGain(); fxg.gain.value = vol().sfx * .7;
    verb = ctx.createConvolver(); var len = ctx.sampleRate * 2.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = ir.getChannelData(c); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    verb.buffer = ir; var wet = ctx.createGain(); wet.gain.value = .32; verb.connect(wet); wet.connect(master);
    music.connect(master); music.connect(verb); fxg.connect(master); fxg.connect(verb);
  }
  function note(scale, root, deg, oct) { var n = scale.length, o = Math.floor(deg / n), s = scale[((deg % n) + n) % n]; return root * Math.pow(2, (s + 12 * (o + (oct || 0))) / 12); }
  function pluck(f, t, dur, v, dest) { /* 가야금·고쟁 느낌: 삼각파 + 배음, 빠른 감쇠, 저역 통과 */
    var g = ctx.createGain(), lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(f * 7, t); lp.frequency.exponentialRampToValueAtTime(f * 1.6, t + dur);
    [[1, 'triangle', 1], [2, 'sine', .35], [3.01, 'sine', .12]].forEach(function (h) { var o = ctx.createOscillator(); o.type = h[1]; o.frequency.value = f * h[0]; var hg = ctx.createGain(); hg.gain.value = h[2]; o.connect(hg); hg.connect(lp); o.start(t); o.stop(t + dur + .05); });
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .006); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    lp.connect(g); g.connect(dest || music);
  }
  function flute(f, t, dur, v) { var o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain(); o.type = 'sine'; o.frequency.value = f; lfo.frequency.value = 5.2; lg.gain.value = f * .012; lfo.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + dur * .3); g.gain.linearRampToValueAtTime(v * .7, t + dur * .7); g.gain.linearRampToValueAtTime(0, t + dur); o.connect(g); g.connect(music); o.start(t); lfo.start(t); o.stop(t + dur + .1); lfo.stop(t + dur + .1); }
  function drone(f, t, dur, v) { [1, 1.5].forEach(function (m, i) { var o = ctx.createOscillator(), g = ctx.createGain(); o.type = i ? 'sine' : 'sawtooth'; o.frequency.value = f * m / 2; var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 380;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v * (i ? .6 : .3), t + 1.2); g.gain.linearRampToValueAtTime(0, t + dur); o.connect(lp); lp.connect(g); g.connect(music); o.start(t); o.stop(t + dur + .1); }); }
  function noise(t, dur, v, freq, q, dest, type) { var b = ctx.createBuffer(1, Math.max(1, ctx.sampleRate * dur), ctx.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    var s = ctx.createBufferSource(); s.buffer = b; var f = ctx.createBiquadFilter(); f.type = type || 'bandpass'; f.frequency.value = freq; f.Q.value = q || 1; var g = ctx.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
    s.connect(f); f.connect(g); g.connect(dest || music); s.start(t); return f; }
  function drum(t, v, low, dest) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(low ? 110 : 180, t); o.frequency.exponentialRampToValueAtTime(low ? 42 : 70, t + .25); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + (low ? .5 : .25));
    o.connect(g); g.connect(dest || music); o.start(t); o.stop(t + .6); noise(t, .05, v * .4, 1800, .8, dest); }
  function gong(t, v, dest) { [1, 1.48, 2.02, 2.74, 3.6].forEach(function (m, i) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 98 * m; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v / (i + 1), t + .02); g.gain.exponentialRampToValueAtTime(.0005, t + 3.5 - i * .4); o.connect(g); g.connect(dest || music); o.start(t); o.stop(t + 3.6); }); }
  function tick() {
    if (!ctx || !mood) return; var M = MOODS[mood], spb = 60 / M.bpm / 4;
    while (nextT < ctx.currentTime + .18) {
      var i = stepN % 16, bar = Math.floor(stepN / 16), deg = M.arp[i];
      var shift = [0, 0, -2, 1][bar % 4];
      if (deg >= 0) pluck(note(M.scale, M.root, deg + shift, 1), nextT, M.drum ? .45 : 1.6, .16 * M.lead);
      if (i === 0 && M.drone && bar % 2 === 0) drone(note(M.scale, M.root, shift), nextT, spb * 32, .09);
      if (M.flute && i === 0 && bar % 2 === 1) flute(note(M.scale, M.root, 4 + shift, 2), nextT, spb * 14, .05);
      if (M.drum === 1) { if (i % 8 === 0) drum(nextT, .5, true); if (i % 8 === 4) drum(nextT, .28, false); if (i % 2 === 1) noise(nextT, .03, .05, 6000, 1); }
      if (M.drum === 2) { if (i % 4 === 0) drum(nextT, .6, true); if (i === 6 || i === 14) drum(nextT, .4, false); if (i % 2 === 1) noise(nextT, .03, .06, 7000, 1); if (i === 0 && bar % 4 === 0) gong(nextT, .12); }
      if (!M.drum && i === 8 && bar % 4 === 3) noise(nextT, .4, .03, 3000, 3);
      nextT += spb; stepN++;
    }
  }
  function startMood(m) {
    if (audioEl) { audioEl.pause(); audioEl = null; }
    if (typeof BGM_FILES !== 'undefined' && BGM_FILES[m]) { mood = null; audioEl = new Audio(BGM_FILES[m]); audioEl.loop = true; audioEl.volume = vol().mute ? 0 : vol().bgm; audioEl.play().catch(function () {}); return; }
    if (!ctx) return;
    var now = ctx.currentTime; music.gain.cancelScheduledValues(now); music.gain.setValueAtTime(music.gain.value, now); music.gain.linearRampToValueAtTime(0, now + .35);
    setTimeout(function () { mood = m; stepN = 0; nextT = ctx.currentTime + .05; music.gain.cancelScheduledValues(ctx.currentTime); music.gain.linearRampToValueAtTime(vol().bgm * .5, ctx.currentTime + .6); }, 380);
    if (!timer) timer = setInterval(tick, 40);
  }
  function unlock() { if (unlocked || !AC) return; unlocked = true; init(); if (ctx.state === 'suspended') ctx.resume(); if (want) startMood(want); }
  if (typeof document !== 'undefined' && document.addEventListener) { document.addEventListener('pointerdown', unlock, { once: false, passive: true }); document.addEventListener('keydown', unlock, { passive: true }); }
  var SFX = {
    click: function (t) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(1300, t); o.frequency.exponentialRampToValueAtTime(700, t + .05); g.gain.setValueAtTime(.22, t); g.gain.exponentialRampToValueAtTime(.001, t + .08); o.connect(g); g.connect(fxg); o.start(t); o.stop(t + .1); },
    hit: function (t) { var f = noise(t, .18, .6, 2400, .9, fxg); f.frequency.exponentialRampToValueAtTime(600, t + .18); drum(t, .35, false, fxg); },
    crit: function (t) { var f = noise(t, .3, .8, 5000, .7, fxg); f.frequency.exponentialRampToValueAtTime(400, t + .3); drum(t, .55, true, fxg); pluck(880, t, .4, .2, fxg); },
    hurt: function (t) { drum(t, .6, true, fxg); noise(t, .2, .3, 500, .7, fxg, 'lowpass'); },
    qi: function (t) { [0, 4, 7, 12].forEach(function (s, i) { pluck(523 * Math.pow(2, s / 12), t + i * .07, 1.2, .1, fxg); }); },
    train: function (t) { var f = noise(t, .12, .35, 3500, 2, fxg); f.frequency.exponentialRampToValueAtTime(1500, t + .12); pluck(660, t + .05, .3, .12, fxg); },
    coin: function (t) { pluck(1568, t, .25, .15, fxg); pluck(2093, t + .06, .35, .12, fxg); },
    gong: function (t) { gong(t, .35, fxg); },
    win: function (t) { [0, 2, 4, 7].forEach(function (s, i) { pluck(392 * Math.pow(2, s / 12), t + i * .09, 1, .16, fxg); }); }
  };
  return {
    bgm: function (m) { want = m; if (mood === m && !audioEl) return; if (unlocked) startMood(m); },
    sfx: function (n) { if (!ctx || vol().mute || !SFX[n]) return; try { SFX[n](ctx.currentTime + .01); } catch (e) {} },
    setMute: function (m) { if (master) master.gain.value = m ? 0 : 1; if (audioEl) audioEl.volume = m ? 0 : vol().bgm; }
  };
})();
