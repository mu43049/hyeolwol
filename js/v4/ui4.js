/* 혈월회귀록 v4 — 화면. 나이와 수명, 생활 메뉴(사냥·폐관·제작·문파), 장비 보기. */
function statusHtml() {
  var R = REALMS[S.realm], nx = S.realm < REALMS.length - 1 ? REALMS[S.realm + 1].q : null, base = R.q;
  var pct = nx ? clamp((S.qi - base) / (nx - base) * 100, 0, 100) : 100;
  var stage = canBreak() ? '벽 앞' : (nx ? ['초입', '소성', '대성', '원만'][Math.min(3, Math.floor(pct / 25))] : '극의');
  var ci = chapInfo(chapIdx(S.month)), a = age(), ls = lifespan(), lp = clamp(S.month / MAXM * 100, 0, 100), ed = ERAS.map(function (e) { return e[0] / MAXM * 100; });
  var left = 18 - S.month, sub;
  if (S.month <= YOUTH_END) sub = left > 0 ? '혈월까지 ' + left + '개월' : (left === 0 ? '혈월의 밤' : (S.month < 30 ? '정사대전까지 ' + (30 - S.month) + '개월' : (S.month === 30 ? '정사대전' : '끝까지 ' + (36 - S.month) + '개월')));
  else sub = '예상 수명 ' + ls + '세 · 앞으로 약 ' + Math.max(0, ls - a) + '년';
  return '<div class="pn stp" style="grid-area:st">' + ph(ci[1] + ' · ' + ci[2]) +
    '<div class="lab">회귀 ' + lifeNo() + '회차' + (S.route && S.month <= YOUTH_END ? ' · <b class="rt ' + S.route + '">' + routeName() + '</b>' : '') + (S.rank ? ' · <b class="rt ' + (S.world === 'jeong' ? 'jeong' : 'ma') + '">' + S.rank + '</b>' : '') + (S.noReturn ? ' · <b class="gd2">돌아갈 수 없다</b>' : '') + ' · 현재 경지</div><div class="rname">' + R.n + ' <span>(' + R.h + ')</span></div><div class="rsub">[ ' + stage + ' · ' + monthLabel() + ' ]</div>' +
    '<div class="bars">' + bar('체력', S.hp, maxHp(), 'hp', S.hp + ' / ' + maxHp()) + bar('내공', nx ? S.qi - base : 1, nx ? nx - base : 1, 'qi', nx ? S.qi + ' / ' + nx : String(S.qi)) + bar('마기', S.mad, 100, 'mad', S.mad + ' / 100') + '</div>' + statLine() +
    '<div class="prog"><div class="prog-h">경지 진행도<b>' + pct.toFixed(1) + '%</b></div><div class="prog-t"><div class="prog-f" style="width:' + pct + '%"></div>' +
    [0, 33.33, 66.66, 100].map(function (p) { return '<i class="' + (pct >= p - .01 ? 'on' : '') + '" style="left:' + p + '%"></i>'; }).join('') + '</div><div class="prog-l"><span>초입</span><span>소성</span><span>대성</span><span>원만</span></div></div>' +
    '<div class="cal"><div class="lifebar"><div class="lb-f" style="width:' + lp + '%"></div>' + ed.map(function (p) { return '<i style="left:' + p + '%"></i>'; }).join('') + '<i class="lb-d" style="left:' + clamp((ls - START_AGE) / 80 * 100, 0, 100) + '%"></i></div><div class="track-l"><span>' + a + '세</span><span class="red">' + sub + '</span><span>' + (START_AGE + 80) + '세</span></div></div>' +
    '<div class="meta">' + itemsHtml() + '</div></div>';
}
function lifeTile(label, fn, ic, hint) { return btn(label, fn, { ic: ic, h: hint }); }
function hub(msg) {
  if (msg !== undefined) S.msg = msg;
  var m = S.msg; S.msg = ''; fx('bg', 'r' + S.realm); fx('aura', S.realm); bgm('hub');
  var cap = (m || pick(FLAV2[Math.floor(((S.month - 1) % 12) / 3)])) + (news() ? '<div class="news">소문 · ' + news() + '</div>' : '') + (S.month > YOUTH_END && age() >= lifespan() - 4 ? '<div class="news">몸이 무겁다. 남은 시간이 길지 않다.</div>' : '');
  show(function () {
    var R = REALMS[S.realm], nx = S.realm < REALMS.length - 1 ? REALMS[S.realm + 1].q : null;
    var heroC = '<div class="pn hc" style="grid-area:hero"><div class="hc-art">' + art('r' + S.realm) + '<div class="vtw"><div class="vt">' + R.n + '</div><div class="vs">' + R.h + '</div></div><div class="cap">' + cap + '</div></div></div>';
    var wall = '<div class="pn wall" style="grid-area:wall">' + ph('경지의 벽') + '<div class="wall-b"><span class="cr" style="background-image:' + imgUrl(TL.brk) + '"></span><div style="flex:1;min-width:0"><div class="wq">' + S.qi + (nx ? ' <span>/ ' + nx + '</span>' : '') + '</div><div class="sm dim">' +
      (nx ? (canBreak() ? '벽에 닿았다. <b>돌파 시련</b>에서 심마를 이기면 ' + REALMS[S.realm + 1].n + '에 오른다.' + (S.insightBuff ? ' <b class="gd2">깨달음으로 벽이 얇다.</b>' : '') : '다음 경지 ' + REALMS[S.realm + 1].n + '까지 내공 ' + (nx - S.qi) + ' · 운기, 수련, 폐관, 전투, 기연으로 쌓인다') : '더 오를 경지가 없다') + '</div><div class="bar"><i class="foe" style="width:' + (nx ? clamp(S.qi / nx * 100, 0, 100) : 100) + '%"></i></div></div></div>' +
      (nx ? btn('돌파 시련', doBreak, { c: 'primary', off: canBreak() ? null : '내공이 모자란다', h: canBreak() ? '심마 · 체력 ' + trialEnemy(S.realm + 1).hp + ' · 지면 기가 역류한다' : null }) : '') + '</div>';
    var acts = '<div class="acts" style="grid-area:acts">' + tile('운기조식', meditate, TL.meditate, '내공 +' + qiGain(12 + S.realm * 4)) + tile('수련', trainMenu, TL.train, '무공 성 · 내공') + tile('휴식', rest, TL.rest, '체력 · 마기 회복') +
      tile('교류', visitMenu, TL.social, '인연과 가르침') + tile('탐색', exploreMenu, TL.explore, '기연과 깨달음') + tile('의뢰', missionMenu, TL.mission, '은전과 실전') + tile('저잣거리', shop, TL.shop, '시간이 들지 않는다') + '</div>';
    var lifeP = '<div class="pn" style="grid-area:life">' + ph('생활') + '<div class="grid2">' +
      btn('사냥 · 채집', farmMenu, { ic: 'flame', h: '재료와 은전 · 한 달' }) + btn('폐관 수행', retreatMenu, { ic: 'qi', h: '3~12개월 한 번에' }) +
      btn('제작 · 연단', craftMenu, { ic: 'seal', h: '장비 · 약 · 한 달' }) + btn(S.month > YOUTH_END || S.disc && S.disc.length ? '문파 · 제자' : '문파 · 제자', guildMenu, { ic: 'people', h: age() < 28 ? '스물여덟부터' : '말로를 남긴다' }) + '</div></div>';
    var lg = (S.log || []).slice(0, 5);
    var logp = '<div class="pn logp" style="grid-area:log">' + ph('강호 기록') + (lg.length ? lg.map(logRow).join('') : '<p class="sm dim" style="text-align:center">아직 기록이 없다.</p>') + '<div class="more">' + btn('더 보기', logView, { c: 'ghost' }) + '</div></div>';
    var ppl = '<div class="pn ppl" style="grid-area:ppl">' + ph('인연') + '<div class="plist">' + visibleNpc().map(personBtn).join('') + '</div><p class="sm dim" style="margin:10px 0 0;text-align:center">만나러 가면 한 달이 지난다.</p></div>';
    var more = '<div class="pn more2" style="grid-area:more">' + ph('행낭') + '<div class="meta" style="margin:0 0 12px">' + itemsHtml() + '</div><div class="grid2">' + btn('무공', info, { ic: 'book', h: '피해량 · 패시브' }) + btn('장비 · 삶', gearView, { ic: 'shield', h: '수명 · 장비 · 재료' }) + btn('타이틀', title, { ic: 'home', h: '진행은 저장된다' }) + '</div></div>';
    return topbar() + '<div class="hub">' + heroC + statusHtml() + wall + acts + lifeP + logp + ppl + more + '</div>' + nav('hub');
  });
}
function gearView() {
  show(function () {
    var ds = S.disc || [], ac = Object.keys(ACC).map(function (s) { var t = ACC[s].t[S.acc[s] || 0]; return '<tr><td>' + ACC[s].n + '</td><td class="num">' + (t ? t.n : '—') + '</td></tr>'; }).join('');
    return topbar() + '<div class="solo"><div class="pn">' + ph('몸과 수명') + '<table class="tbl"><tr><td>나이</td><td class="num"><b>' + age() + '세</b></td></tr><tr><td>예상 수명</td><td class="num"><b>' + lifespan() + '세</b></td></tr><tr><td>노화</td><td class="num">' + (ageMul() < 1 ? '공격·체력 ' + Math.round((1 - ageMul()) * 100) + '% 감소' : '아직 없다') + '</td></tr><tr><td>고정 수입</td><td class="num">' + monthlyIncomeTxt() + '</td></tr></table><p class="sm dim" style="margin:8px 0 0">쉰이 넘으면 몸이 쇠한다. 경지가 높을수록 천천히 쇠하고, 장생단은 수명을 늘린다.</p></div>' +
      '<div class="pn">' + ph('장비') + '<table class="tbl"><tr><td>무기</td><td class="num">' + WEAP[S.weapon].n + ' (+' + WEAP[S.weapon].a + ')</td></tr><tr><td>방어구</td><td class="num">' + ARMOR[S.armor || 0].n + '</td></tr>' + ac + '</table></div>' +
      '<div class="pn">' + ph('재료') + '<div class="meta" style="margin:0"><span>운철 <b>' + (S.items.ore || 0) + '</b></span>' + (matsLine() || '') + '</div></div>' +
      '<div class="pn">' + ph('후계') + '<p class="sm" style="margin:0">' + (S.sect ? S.sect.n + ' Lv ' + S.sect.lv + ' · ' : '문파 없음 · ') + '제자 ' + ds.length + '명' + (P.cp && P.cp.at === lifeNo() && S.month > YOUTH_END ? '<br><span class="dim">죽으면 조각 ' + rewindCost() + '개로 이 시대의 초입(' + ageOf(P.cp.month) + '세)으로 되감을 수 있다.</span>' : '') + '</p></div>' +
      '<div class="stack">' + btn('돌아간다', function () { hub(); }, { c: 'primary' }) + '</div></div>' + nav('hub');
  });
}
/* 탐색 장소 안내가 개월 수 기준이라 긴 삶에서는 문구만 바꾼다 */
function title() {
  fx('bg', 'title'); fx('aura', 0); bgm('title');
  show(function () {
    return '<section class="title"><div class="pn" style="padding:6px"><div class="title-art">' + art('title') + '<span class="ver">' + VERSION + '</span><div class="tlogo"><div class="tl-b">혈월회귀록</div><div class="tl-s">열여섯에서 아흔여섯까지, 여든 해의 회귀</div></div><div class="cap">죽으면 같은 해 봄으로 돌아온다. 이름 없는 시종의 긴 삶.</div></div></div><div class="stack">' +
      (S ? btn('이어하기', function () { hub(); }, { c: 'primary', h: lifeNo() + '번째 생 · ' + REALMS[S.realm].n + ' · ' + monthLabel() }) : '') +
      btn(S ? '새 생 시작' : (P.lives ? '다음 생을 시작' : '이야기를 시작'), function () { startLife(); }, { c: S ? '' : 'primary', ic: 'burst', h: S ? '진행 중인 생은 사라진다' : null }) +
      (P.lives ? btn('회귀 각인', upgrades, { ic: 'seal', h: '회귀력 조각 ' + P.shards }) : '') +
      btn('삽화와 결말 도감', codex, { ic: 'book' }) +
      (Object.keys(P.endings).length ? btn('난이도 · ' + (P.hard ? '어려움' : '보통'), function () { P.hard = !P.hard; save(); title(); }, { ic: 'shield', h: '어려움: 적이 1.25배 강하고 수가 덜 읽힌다 · 조각 1.5배' }) : '') +
      btn('소리 · ' + (P.settings.mute ? '꺼짐' : '켜짐'), function () { P.settings.mute = !P.settings.mute; try { Sound.setMute(P.settings.mute); } catch (e) {} save(); title(); }, { ic: P.settings.mute ? 'mute' : 'sound', h: '배경 음악과 효과음' }) +
      btn(resetArmed ? '정말 모두 지운다' : '저장 초기화', function () { if (resetArmed) { P = defP(); S = null; C = null; resetArmed = false; save(); title(); } else { resetArmed = true; title(); } }, { h: resetArmed ? '한 번 더 누르면 되돌릴 수 없다' : null }) + '</div></section>';
  });
}
