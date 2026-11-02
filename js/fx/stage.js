/* 혈월회귀록 v3 — Phaser 무대. 화면 뒤에서 배경, 입자, 전투 연출, 경지 상승 연출을 그린다.
   게임 로직은 fx('이름', ...)으로만 부른다. Phaser가 없으면 모든 호출은 조용히 무시된다. */
var Stage = (function () {
  var NOOP = { bg: function () {}, aura: function () {}, battleStart: function () {}, battleEnd: function () {}, hit: function () {}, hurt: function () {}, heal: function () {}, skill: function () {}, realmUp: function () {}, ink: function () {}, enemyHp: function () {} };
  if (typeof Phaser === 'undefined' || typeof document === 'undefined' || !document.getElementById('stage')) return NOOP;
  var TINT = { 'f-dim': 0xbbbbbb, 'f-dawn': 0xffc6d4, 'f-blood': 0xff6a6a, 'f-gold': 0xffd890, 'f-jade': 0x8ff0c8, 'f-crimson': 0xff5c5c, 'f-void': 0xc8a0ff, 'f-fire': 0xffa060, 'f-ash': 0x9a9a9a };
  var AURA = [0xb0a090, 0x5ab0e8, 0x5fd08a, 0xf2d48e, 0xff5a5a, 0xc88cff, 0xfff1c8, 0xff3b6b, 0x7ff0c8];
  var sc = null, pend = [], cur = { bg: null, aura: 0 };
  var reduce = false; try { reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function call(fn) { if (sc && sc.ready) { try { fn(sc); } catch (e) { console.warn(e); } } else pend.push(fn); }
  function fxOn() { return !reduce && (typeof P === 'undefined' || P.settings.fx !== false); }

  var Scene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () { Phaser.Scene.call(this, { key: 'stage' }); },
    preload: function () {
      var self = this;
      IMG_KEYS.forEach(function (k) { self.load.image(k, 'assets/img/' + k + '.webp'); });
      var g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1); g.fillCircle(8, 8, 8); g.generateTexture('dot', 16, 16); g.clear();
      g.fillStyle(0xffffff, 1); g.fillRect(0, 0, 4, 64); g.generateTexture('streak', 4, 64); g.destroy();
    },
    create: function () {
      var W = this.scale.width, Hh = this.scale.height, self = this;
      this.bgA = this.add.image(W / 2, Hh / 2, IMG_KEYS[0]).setAlpha(0);
      this.bgB = this.add.image(W / 2, Hh / 2, IMG_KEYS[0]).setAlpha(0);
      this.front = this.bgA;
      this.dim = this.add.rectangle(0, 0, W, Hh, 0x07050a, .62).setOrigin(0);
      this.vign = this.add.graphics();
      this.embers = this.add.particles(0, 0, 'dot', { x: { min: 0, max: W }, y: Hh + 10, lifespan: { min: 5000, max: 9000 }, speedY: { min: -70, max: -30 }, speedX: { min: -12, max: 12 },
        scale: { start: .32, end: 0 }, alpha: { start: .9, end: 0 }, tint: 0xff5a4a, frequency: 160, blendMode: 'ADD' });
      this.qi = this.add.particles(0, 0, 'dot', { x: { min: 0, max: W }, y: { min: 0, max: Hh }, lifespan: 4000, speed: { min: 4, max: 18 }, scale: { start: .0, end: .22, ease: 'Sine.easeOut' },
        alpha: { start: .5, end: 0 }, tint: AURA[0], frequency: 260, blendMode: 'ADD' });
      /* 전투 */
      this.battle = this.add.container(W / 2, Math.min(Hh * .2, 190)).setAlpha(0);
      this.foeAura = this.add.particles(0, 0, 'dot', { speed: { min: 10, max: 40 }, lifespan: 1600, scale: { start: .5, end: 0 }, alpha: { start: .6, end: 0 }, tint: 0xff3040, frequency: 60, blendMode: 'ADD', emitZone: { type: 'edge', source: new Phaser.Geom.Circle(0, 0, 80), quantity: 24 } });
      this.foeFrame = this.add.graphics();
      this.foeImg = this.add.image(0, 0, IMG_KEYS[0]).setVisible(false);
      this.foeGlyph = this.add.text(0, 0, '敵', { fontFamily: '"Song Myung", serif', fontSize: '96px', color: '#ffd8d0', stroke: '#3a0a10', strokeThickness: 8 }).setOrigin(.5);
      this.battle.add([this.foeAura, this.foeFrame, this.foeImg, this.foeGlyph]);
      this.flashR = this.add.rectangle(0, 0, W, Hh, 0xff0020, 0).setOrigin(0);
      this.burst = this.add.particles(0, 0, 'dot', { speed: { min: 120, max: 520 }, lifespan: 1400, scale: { start: .6, end: 0 }, alpha: { start: 1, end: 0 }, gravityY: 120, blendMode: 'ADD', emitting: false });
      this.spark = this.add.particles(0, 0, 'streak', { speed: { min: 150, max: 420 }, lifespan: 420, scale: { start: .5, end: 0 }, alpha: { start: 1, end: 0 }, rotate: { min: 0, max: 360 }, tint: [0xffffff, 0xff6a5a, 0xffd2a0], blendMode: 'ADD', emitting: false });
      this.layout(); this.scale.on('resize', function () { self.layout(); });
      this.ready = true; pend.splice(0).forEach(function (fn) { fn(self); });
    },
    layout: function () {
      var W = this.scale.width, Hh = this.scale.height;
      this.dim.setSize(W, Hh); this.flashR.setSize(W, Hh);
      [this.bgA, this.bgB].forEach(function (im) { var s = Math.max(W / im.width, Hh / im.height); im.setPosition(W / 2, Hh / 2).setScale(s * 1.04); im.baseScale = s * 1.04; });
      this.embers.setConfig && 0; this.embers.setEmitZone && 0;
      this.battle.setPosition(W / 2, Math.min(Hh * .19, 180));
      this.vign.clear(); for (var i = 0; i < 18; i++) { this.vign.fillStyle(0x000000, .035); this.vign.fillRect(0, 0, W, Hh * (.02 + i * .006)); this.vign.fillRect(0, Hh - Hh * (.03 + i * .01), W, Hh * (.03 + i * .01)); }
    },
    setBg: function (key, tint) {
      if (!this.textures.exists(key)) return;
      var back = this.front === this.bgA ? this.bgB : this.bgA, W = this.scale.width, Hh = this.scale.height;
      back.setTexture(key); var s = Math.max(W / back.width, Hh / back.height) * 1.04; back.setScale(s); back.baseScale = s; back.setPosition(W / 2, Hh / 2);
      if (tint) back.setTint(tint); else back.clearTint();
      this.tweens.killTweensOf(back); this.tweens.killTweensOf(this.front);
      this.tweens.add({ targets: back, alpha: 1, duration: 900, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: this.front, alpha: 0, duration: 900, ease: 'Sine.easeInOut' });
      if (fxOn()) this.tweens.add({ targets: back, scale: s * 1.1, duration: 22000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
      this.front = back;
    },
    floatText: function (x, y, txt, color, size, stroke) {
      var t = this.add.text(x, y, txt, { fontFamily: '"Noto Sans KR", sans-serif', fontStyle: '900', fontSize: size + 'px', color: color, stroke: stroke || '#000', strokeThickness: 6 }).setOrigin(.5);
      t.setScale(.4); this.tweens.add({ targets: t, scale: 1.15, duration: 140, ease: 'Back.easeOut', onComplete: function () { this.tweens.add({ targets: t, y: y - 70, alpha: 0, scale: 1, duration: 900, ease: 'Cubic.easeOut', onComplete: function () { t.destroy(); } }); }, callbackScope: this });
    },
    slash: function () {
      var g = this.add.graphics(), a = Phaser.Math.FloatBetween(-.6, .6) + (Math.random() < .5 ? 0 : Math.PI), L = 230, cx = this.battle.x, cy = this.battle.y;
      var x1 = cx - Math.cos(a) * L / 2, y1 = cy - Math.sin(a) * L / 2, x2 = cx + Math.cos(a) * L / 2, y2 = cy + Math.sin(a) * L / 2;
      var o = { p: 0 }; this.tweens.add({ targets: o, p: 1, duration: 160, ease: 'Cubic.easeOut', onUpdate: function () { g.clear(); g.lineStyle(10, 0xff3040, .35); g.lineBetween(x1, y1, x1 + (x2 - x1) * o.p, y1 + (y2 - y1) * o.p); g.lineStyle(3, 0xffffff, 1); g.lineBetween(x1, y1, x1 + (x2 - x1) * o.p, y1 + (y2 - y1) * o.p); }, onComplete: function () { this.tweens.add({ targets: g, alpha: 0, duration: 260, onComplete: function () { g.destroy(); } }); }, callbackScope: this });
    }
  });

  var game = new Phaser.Game({ type: (location.protocol === 'file:' ? Phaser.CANVAS : Phaser.AUTO), parent: 'stage', backgroundColor: '#0b0809', scene: [Scene],
    scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
    loader: { imageLoadType: 'HTMLImageElement' }, render: { antialias: true }, banner: false, audio: { noAudio: true } });
  game.events.on('ready', function () { sc = game.scene.getScene('stage'); });
  var poll = setInterval(function () { var s = game.scene && game.scene.getScene && game.scene.getScene('stage'); if (s && s.ready) { sc = s; clearInterval(poll); } }, 100);

  return {
    bg: function (kind) { var a = ART[kind] || ART.r0; if (cur.bg === kind) return; cur.bg = kind; call(function (s) { s.setBg(a[0], TINT[a[1]]); }); },
    aura: function (r) { cur.aura = r; call(function (s) { s.qi.setParticleTint ? s.qi.setParticleTint(AURA[r] || AURA[0]) : (s.qi.particleTint = AURA[r] || AURA[0]); s.qi.frequency = r >= 5 ? 120 : 260; }); },
    battleStart: function (e, pt) {
      call(function (s) {
        s.dim.setAlpha(.72); s.battle.setAlpha(0).setScale(.6);
        s.tweens.add({ targets: s.battle, alpha: 1, scale: 1, duration: 420, ease: 'Back.easeOut' });
        s.foeFrame.clear(); var size = Math.min(s.scale.width * .42, 190);
        if (pt && s.textures.exists(pt)) { s.foeImg.setTexture(pt).setVisible(true); var sc2 = size / Math.max(s.foeImg.width, s.foeImg.height); s.foeImg.setScale(sc2); s.foeGlyph.setVisible(false);
          s.foeFrame.lineStyle(3, e.boss ? 0xf2d48e : 0xd6404a, 1).strokeRect(-size / 2 - 4, -size / 2 - 4, size + 8, size + 8); s.foeFrame.lineStyle(1, 0x000000, .8).strokeRect(-size / 2 - 8, -size / 2 - 8, size + 16, size + 16); }
        else { s.foeImg.setVisible(false); s.foeGlyph.setVisible(true).setText((typeof GLY !== 'undefined' && GLY[e.id]) || (e.id === 'heart' ? '心' : '敵')); }
        s.foeAura.particleTint = e.boss ? 0xf2d48e : 0xff3040; s.foeAura.setParticleTint && s.foeAura.setParticleTint(e.boss ? 0xf2d48e : 0xff3040);
        s.tweens.killTweensOf(s.foeImg); s.tweens.add({ targets: [s.foeImg, s.foeGlyph], scaleY: '*=1.03', duration: 1400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        if (fxOn()) s.cameras.main.flash(250, 120, 0, 10);
      });
    },
    battleEnd: function (won) { call(function (s) { if (won) { s.burst.setParticleTint && s.burst.setParticleTint(0xff5040); s.burst.explode(60, s.battle.x, s.battle.y); }
      s.tweens.add({ targets: s.battle, alpha: 0, scale: won ? 1.3 : .8, duration: 500, ease: 'Cubic.easeIn' }); s.tweens.add({ targets: s.dim, alpha: .62, duration: 600 }); }); },
    hit: function (dmg, crit) { call(function (s) {
      if (!fxOn()) return; var t = s.foeImg.visible ? s.foeImg : s.foeGlyph;
      s.slash(); s.spark.explode(crit ? 24 : 12, s.battle.x, s.battle.y);
      if (t.setTintFill) { t.setTintFill(0xffffff); s.time.delayedCall(90, function () { t.clearTint(); }); }
      s.tweens.add({ targets: s.battle, x: s.battle.x + (crit ? 14 : 8), duration: 40, yoyo: true, repeat: 2 });
      s.floatText(s.battle.x + Phaser.Math.Between(-40, 40), s.battle.y - 20, (crit ? '치명! ' : '') + '-' + dmg, crit ? '#ffe2a0' : '#ffffff', crit ? 44 : 34, crit ? '#a05000' : '#8a0010');
      if (crit) s.cameras.main.shake(160, .006);
    }); },
    hurt: function (dmg) { call(function (s) { if (!fxOn()) return; s.cameras.main.shake(220, .012); s.flashR.setAlpha(.28); s.tweens.add({ targets: s.flashR, alpha: 0, duration: 380 });
      s.floatText(s.scale.width / 2 + Phaser.Math.Between(-60, 60), s.scale.height * .55, '-' + dmg, '#ff9a9a', 30, '#500'); }); },
    heal: function (n) { call(function (s) { if (!fxOn()) return; s.floatText(s.scale.width / 2, s.scale.height * .5, '+' + n, '#9dffb8', 28, '#064'); }); },
    skill: function (name) { call(function (s) {
      if (!fxOn()) return; var W = s.scale.width, y = s.scale.height * .36;
      var band = s.add.rectangle(W / 2, y, W, 92, 0x6a0812, .82).setScale(0, 1);
      var t = s.add.text(W / 2, y, name, { fontFamily: '"East Sea Dokdo", "Song Myung", serif', fontSize: '68px', color: '#fff4e8', stroke: '#2a0004', strokeThickness: 8 }).setOrigin(.5).setAlpha(0).setScale(1.8);
      s.tweens.add({ targets: band, scaleX: 1, duration: 180, ease: 'Cubic.easeOut' });
      s.tweens.add({ targets: t, alpha: 1, scale: 1, duration: 220, ease: 'Back.easeOut' });
      s.tweens.add({ targets: [band, t], alpha: 0, delay: 700, duration: 350, onComplete: function () { band.destroy(); t.destroy(); } });
    }); },
    realmUp: function (r) { call(function (s) {
      var W = s.scale.width, Hh = s.scale.height, col = AURA[r] || 0xf2d48e;
      s.cameras.main.flash(500, 255, 240, 200);
      if (!fxOn()) return;
      s.burst.setParticleTint && s.burst.setParticleTint(col); s.burst.explode(160, W / 2, Hh * .38);
      var rays = s.add.graphics({ x: W / 2, y: Hh * .38 }).setBlendMode('ADD');
      for (var i = 0; i < 18; i++) { var a = i / 18 * Math.PI * 2; rays.fillStyle(col, .14); rays.fillTriangle(0, 0, Math.cos(a - .05) * W, Math.sin(a - .05) * W, Math.cos(a + .05) * W, Math.sin(a + .05) * W); }
      s.tweens.add({ targets: rays, angle: 40, alpha: 0, duration: 2200, onComplete: function () { rays.destroy(); } });
      var ring = s.add.circle(W / 2, Hh * .38, 30).setStrokeStyle(4, col, 1); s.tweens.add({ targets: ring, scale: 16, alpha: 0, duration: 1300, ease: 'Cubic.easeOut', onComplete: function () { ring.destroy(); } });
      var t = s.add.text(W / 2, Hh * .38, REALMS[r].g, { fontFamily: '"Song Myung", serif', fontSize: '170px', color: '#ffffff', stroke: '#000', strokeThickness: 4 }).setOrigin(.5).setScale(2.6).setAlpha(0);
      t.setShadow(0, 0, '#' + col.toString(16).padStart(6, '0'), 40, true, true);
      s.tweens.add({ targets: t, scale: 1, alpha: 1, duration: 360, ease: 'Back.easeOut', onComplete: function () { s.tweens.add({ targets: t, alpha: 0, scale: 1.12, delay: 900, duration: 500, onComplete: function () { t.destroy(); } }); } });
    }); },
    ink: function () { call(function (s) { if (!fxOn()) return; var W = s.scale.width, Hh = s.scale.height; var c = s.add.circle(W / 2, Hh / 2, 10, 0x050304, 1); s.tweens.add({ targets: c, scale: Math.max(W, Hh) / 8, duration: 360, ease: 'Cubic.easeIn', onComplete: function () { s.tweens.add({ targets: c, alpha: 0, duration: 420, onComplete: function () { c.destroy(); } }); } }); }); },
    enemyHp: function (p) { call(function (s) { s.foeAura.frequency = p < .3 ? 25 : 60; }); }
  };
})();
