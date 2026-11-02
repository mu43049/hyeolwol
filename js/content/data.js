/* 혈월회귀록 콘텐츠 데이터. 무공(SK), 적(ENM), 인물(NPC), 기억(MEM), 결말(ENDINGS), 탐색(LOCS/ENC) 등을 여기서 추가·수정한다. */
var NG={kj:'魔',sm:'影',bw:'雲',cn:'鐵',hs:'書',dg:'獨',yn:'燕',mk:'盲',hr:'藥'};
var IC={
  train:'<path d="M5 19 19 5M14 5h5v5"/><path d="M6.5 14.5l3 3M3.5 20.5l3-3"/>',
  qi:'<circle cx="12" cy="7.5" r="2.4"/><path d="M5 20c0-4 3-6.5 7-6.5s7 2.5 7 6.5M2.5 17.5c2-.2 3.4.6 4 2M21.5 17.5c-2-.2-3.4.6-4 2"/>',
  scroll:'<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.5-3.6 2.7-5.5 5.5-5.5s5 1.9 5.5 5.5"/><circle cx="17.5" cy="9" r="2.2"/><path d="M16 14c2.6-.4 4.5 1.2 5 4.5"/>',
  moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  burst:'<path d="M12 2.8l2.3 6 6.3.3-5 3.9 1.8 6.1L12 15.5 6.6 19.1l1.8-6.1-5-3.9 6.3-.3z"/>',
  coin:'<circle cx="12" cy="12" r="8.5"/><rect x="9.2" y="9.2" width="5.6" height="5.6" rx="1"/>',
  book:'<path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
  home:'<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
  play:'<path d="M8 5v14l11-7z"/>',
  shield:'<path d="M12 3.5 19 6v6c0 4.3-3 7.3-7 8.5-4-1.2-7-4.2-7-8.5V6z"/>',
  wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h7"/>',
  flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1 2 1.8 2.2C10.5 8 10.8 5.5 12 3z"/>',
  pill:'<rect x="3.5" y="9" width="17" height="6.5" rx="3.25" transform="rotate(-35 12 12.25)"/><path d="M9.6 8.4l5.6 7.4"/>',
  fast:'<path d="M5 5l7 7-7 7M13 5l7 7-7 7"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  seal:'<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8.5 9h7M12 9v7M8.5 16h7"/>'
};
var GLY={scout:'斥',bandit:'賊',wolf:'狼',junior:'徒',dg:'獨',guard:'衛',dan:'段',vanguard:'鋒'};


var SEASON=['봄','여름','가을','겨울'];
var NPC={
  dg:{n:'독고강',role:'외당 교관',from:1,desc:'외팔의 교관. 말보다 목도가 먼저 나간다.'},
  hr:{n:'홍란',role:'약당 의원',from:1,desc:'독과 약을 같은 손으로 다루는 의원.'},
  mk:{n:'묵야',role:'눈먼 호교 장로',from:5,desc:'보이지 않는 것을 보는 노인.'},
  yn:{n:'연이',role:'같은 방 시종',from:1,desc:'당신 이름을 지어 부르려 하는 아이.'}
};
var SK={
  gong:{n:'혈월기공',t:'심법',passive:true,d:'운기 효율과 돌파 확률을 높이는 교의 기초 심법.'},
  nak:{n:'낙일참',t:'도법',cost:8,mult:1.9,d:'해가 지듯 내리꽂는 단 한 번의 도격.'},
  eun:{n:'은월검법',t:'검법',cost:12,mult:0.85,hits:3,d:'달빛처럼 가늘게 세 번 베는 검.'},
  heuk:{n:'흑영보',t:'보법',passive:true,d:'그림자처럼 움직인다. 회피에 진기가 들지 않고 반격도 얹는다.'},
  hyul:{n:'혈사장',t:'마공',cost:10,mult:2.4,mad:12,bleed:true,d:'핏빛 장력이 살갗 아래로 파고든다. 출혈을 일으키고 마기가 오른다.'},
  cheon:{n:'천마강신',t:'마공',cost:22,mult:3.6,mad:25,leech:0.25,d:'천마가 남긴 마공. 입힌 피해의 일부가 몸으로 돌아온다.'},
  own:{n:'독문무공',t:'독문',cost:14,mult:2.8,pierce:true,d:'오직 나만의 초식. 어떤 수에도 적중하고, 받는 피해가 반으로 줄어든다.'}
};
var INT={strong:{n:'강타',d:'묵직한 일격'},rapid:{n:'연타',d:'빗발치는 세 합'},feint:{n:'허초',d:'속임수'},charge:{n:'운기',d:'기를 모은다'}};
var IM={strong:1.7,rapid:1.8,feint:1.1,charge:0};
var TBL={
  strong:{atk:[1,1],parry:[.5,.5],dodge:[0,0]},
  rapid:{atk:[1,1],parry:[0,.8],dodge:[.5,0]},
  feint:{atk:[.4,1.2],parry:[1.4,0],dodge:[0,0]},
  charge:{atk:[0,1.5],parry:[0,0],dodge:[0,0]}
};
var LINE={
  strong:{atk:'서로의 일격이 정면으로 부딪쳤다.',parry:'칼날을 비껴 흘렸지만 충격이 손목을 울렸다.',dodge:'묵직한 일격이 허공을 갈랐다.'},
  rapid:{atk:'빗발치는 연격 속으로 뛰어들었다.',parry:'연격을 하나하나 흘려내며 빈틈을 찔렀다.',dodge:'몇 합은 피했지만 마지막 한 수가 스쳤다.'},
  feint:{atk:'허초를 꿰뚫고 빈틈을 베었다.',parry:'허초에 속아 막은 곳이 텅 비어 버렸다.',dodge:'속임수를 깨끗이 피했다.'},
  charge:{atk:'기를 모으던 상대의 숨통을 끊어 놓았다.',parry:'상대는 기를 모으고 있었다. 방어는 헛수고였다.',dodge:'물러난 사이 상대의 기세가 더 차올랐다.'}
};
var ENM={
  scout:{n:'정파 척후',hp:36,atk:7,w:{strong:3,rapid:3,feint:1,charge:1}},
  bandit:{n:'산적 두목',hp:52,atk:9,w:{strong:5,rapid:1,feint:1,charge:2}},
  wolf:{n:'설원늑대',hp:34,atk:8,w:{strong:1,rapid:5,feint:2,charge:1}},
  junior:{n:'외당 동기',hp:44,atk:8,w:{strong:2,rapid:2,feint:2,charge:1}},
  dg:{n:'독고강',hp:90,atk:13,w:{strong:3,rapid:2,feint:2,charge:1}},
  guard:{n:'단목환의 호위',hp:80,atk:14,w:{strong:2,rapid:3,feint:2,charge:2}},
  dan:{n:'좌호법 단목환',hp:210,atk:20,boss:true,w:{strong:2,rapid:2,feint:3,charge:3}},
  vanguard:{n:'정파 선봉장',hp:120,atk:18,w:{strong:3,rapid:3,feint:2,charge:2}}
};
var MEM={
  eve:['혈월의 밤','이듬해 여름, 혈월이 가장 붉은 밤에 총단에 칼이 돈다.'],
  poison:['교주의 찻잔','교주의 찻잔에 느린 독이 들어간다. 홍란은 그것을 안다.'],
  letter:['단목환의 밀서','좌호법 단목환이 정파 맹주와 내통한다. 연이가 밀서를 주워 온다.'],
  siege:['정파의 침공','혈월의 밤이 지나고 몇 달 뒤, 정파 연합이 산문을 넘는다.'],
  dokgo:['독고강의 도법','독고강은 마음을 얻으면 낙일참을 가르쳐 준다.'],
  hong:['홍란의 해독단','홍란은 신뢰를 얻으면 해독단을 건넨다.'],
  muk:['묵야의 눈','눈먼 묵야는 다섯째 달부터 절벽 길에 앉아 있고, 가르침을 준다.'],
  yeon:['연이의 죽음','연이는 혈월의 밤에 죽는다.']
};
var ENDINGS={
  guard:['혈월은 지지 않는다',150],
  throne:['새로운 천마',200],
  flee:['이름 없는 사람으로',100],
  betray:['회개의 검',120],
  burn:['재가 된 혈월',150]
};
var CH=[[1,'제1장','이름 없는 시종','외당의 시종으로 첫 봄을 맞는다.'],[7,'제2장','혈로','피로 길을 내는 자만이 이름을 얻는다.'],[13,'제3장','혈월','달이 붉어질수록 칼끝이 가까워진다.'],
  [19,'제4장','잿더미','무너진 자리에 누가 서는가.'],[25,'제5장','정사대전','흰 깃발이 산을 오른다.'],[31,'제6장','천마총','혈월의 근원이 잠든 곳으로.']];
SK.gwiwon={n:'귀원심법',t:'심법',passive:true,d:'숨을 근원으로 되돌린다. 운기조식 효율이 성마다 3% 오르고 마기가 빨리 가라앉는다.'};
SK.heupseong={n:'흡성대법',t:'마공',cost:14,mult:1.6,mad:15,leech:.5,d:'상대의 기를 빨아들인다. 입힌 피해의 절반이 몸으로 돌아온다.'};
SK.gwiyeong={n:'귀영보',t:'보법',passive:true,d:'귀신 같은 보법. 회피에 진기가 들지 않고 강한 반격이 붙는다.'};
SK.bido={n:'비도술',t:'암기',cost:6,mult:.6,hits:4,d:'비도 네 자루를 연달아 던진다.'};
SK.cheongheo={n:'청허검법',t:'검법',cost:12,mult:2,mad:-8,d:'정파의 맑은 검. 쓸 때마다 마기가 가라앉는다.'};
SK.cheolgol={n:'철골공',t:'외공',passive:true,d:'뼈를 쇠처럼 단련한다. 성마다 최대 체력 +4.'};
SK.geumgang={n:'금강불괴',t:'외공',passive:true,d:'칼이 잘 들지 않는 몸. 성마다 방어력이 오른다.'};
SK.pacheon={n:'파천일격',t:'도법',cost:18,mult:3.2,d:'하늘을 깨뜨리는 일격. 혈투장 왕의 기술.'};
SK.hyeolwol={n:'혈월검',t:'마검',cost:20,mult:2.6,hits:2,mad:18,bleed:true,d:'천마의 벽화에서 얻은 검. 두 번 베고 출혈을 남긴다.'};
SK.dokjang={n:'독장',t:'독공',cost:9,mult:1.4,bleed:true,d:'독을 실은 장법. 상대를 서서히 중독시킨다.'};

NPC.kj={n:'위무강',role:'천마신교 교주',flag:'kj',desc:'병든 천마. 눈빛만은 아직 칼 같다.'};
NPC.sm={n:'사마령',role:'그림자 호법',flag:'sm',dead:'smDead',desc:'붉은 눈의 암살자. 누구의 칼인지 아무도 모른다.'};
NPC.bw={n:'백운',role:'외당 교도',flag:'bw',dead:'bwDead',desc:'칼 쓰는 법이 너무 반듯한 신입.'};
NPC.cn={n:'철노',role:'대장장이',flag:'cn',desc:'사람보다 쇠를 먼저 믿는 노인.'};
NPC.hs={n:'한서생',role:'서고지기',flag:'hs',desc:'서고의 책을 모두 외운다는 서생.'};

ENM.snake={n:'흑림 독사떼',hp:40,atk:9,w:{strong:1,rapid:5,feint:2,charge:1}};
ENM.beast={n:'흑림 마수',hp:95,atk:15,w:{strong:5,rapid:1,feint:1,charge:3}};
ENM.swordsman={n:'정파 검수',hp:62,atk:12,w:{strong:2,rapid:3,feint:3,charge:1}};
ENM.taoist={n:'무당 도사',hp:80,atk:13,w:{strong:1,rapid:2,feint:4,charge:2}};
ENM.stone={n:'석상 수호자',hp:140,atk:18,w:{strong:5,rapid:1,feint:1,charge:3}};
ENM.ghost={n:'서고의 그림자',hp:50,atk:10,w:{strong:1,rapid:2,feint:5,charge:1}};
ENM.ar1={n:'투귀 철곰',hp:70,atk:12,w:{strong:5,rapid:1,feint:1,charge:2}};
ENM.ar2={n:'쌍도 귀녀',hp:64,atk:13,w:{strong:1,rapid:5,feint:2,charge:1}};
ENM.ar3={n:'독수 마랑',hp:82,atk:14,w:{strong:2,rapid:2,feint:4,charge:2}};
ENM.ar4={n:'검귀 무명',hp:105,atk:16,w:{strong:3,rapid:3,feint:3,charge:2}};
ENM.ar5={n:'귀왕',hp:160,atk:19,boss:true,w:{strong:4,rapid:2,feint:2,charge:3}};
ENM.bw={n:'백운',hp:120,atk:17,boss:true,w:{strong:2,rapid:3,feint:3,charge:1}};
ENM.sm={n:'사마령',hp:105,atk:18,boss:true,w:{strong:1,rapid:4,feint:4,charge:1}};
ENM.gs={n:'검성 남궁진',hp:250,atk:23,boss:true,w:{strong:3,rapid:3,feint:3,charge:2}};
ENM.cm={n:'천마의 잔영',hp:330,atk:27,boss:true,w:{strong:3,rapid:2,feint:3,charge:4}};
GLY.snake='蛇';GLY.beast='獸';GLY.swordsman='劍';GLY.taoist='道';GLY.stone='石';GLY.ghost='鬼';GLY.ar1='熊';GLY.ar2='雙';GLY.ar3='毒';GLY.ar4='刃';GLY.ar5='王';GLY.bw='雲';GLY.sm='影';GLY.gs='聖';GLY.cm='魔';

MEM.lore=['천마총의 위치','천마는 혈월봉 북쪽 절벽 아래 잠들었다. 절정에 이른 몸이면 그 문 안으로 들어갈 수 있다.'];
MEM.cheonma=['천마의 숨','천마는 죽지 않았다. 혈월은 그의 숨이고, 회귀는 그 숨이 만든 굴레다.'];
MEM.core=['혈월의 핵','천마총 가장 깊은 곳의 핵을 부수면 굴레가 끊긴다. 교주가 살아 있고, 그 생에 핵을 직접 만져야 한다.'];
MEM.kyoju=['교주는 알고 있다','교주는 자신이 독에 당한 것을 안다. 신뢰를 얻으면 금위대를 부를 호패를 준다.'];
MEM.samaryeong=['그림자의 명령','사마령은 단목환에게 교주 암살을 명받았다. 마음을 얻으면 혈월의 밤에 편이 된다.'];
MEM.baekun=['백운의 정체','외당의 백운은 무당의 속가 제자, 정파의 첩자다. 스물두 번째 달에 정체가 드러난다.'];

ENDINGS.true=['혈월을 끊다',400];ENDINGS.peace=['정사화친',220];ENDINGS.shadow=['그림자의 왕',200];

var ACH={first_death:['첫 번째 봄','처음으로 죽고 회귀했다'],r3:['절정','절정에 올랐다'],r5:['현경','현경에 올랐다'],r8:['자연경','자연경에 이르렀다'],insight:['돈오','깨달음으로 경지의 벽을 넘었다'],master1:['대성','무공 하나를 12성까지 익혔다'],master5:['무학의 탑','무공 다섯 개를 대성했다'],
 arena:['혈투장의 왕','혈투장 1위에 올랐다'],explorer:['발이 닳도록','탐색을 30번 했다'],allLoc:['강호 유람','한 생에 여섯 장소를 모두 가 봤다'],dan:['배신자의 최후','단목환을 쓰러뜨렸다'],
 gs:['검성을 꺾다','검성 남궁진을 이겼다'],cm:['혈월을 베다','천마의 잔영을 쓰러뜨렸다'],savior:['교주의 은인','혈월의 밤에 교주를 살렸다'],night:['붉은 밤을 넘어','혈월의 밤에서 살아남았다'],
 siege:['산문을 지키다','정파의 침공을 막아 냈다'],lives5:['다섯 번의 봄','5번 회귀했다'],lives10:['열 번의 봄','10번 회귀했다'],own:['나만의 초식','독문무공을 창안했다'],
 bonds:['인연의 끈','한 생에 세 사람과 신뢰 4 이상'],smAlly:['그림자의 편','사마령이 편이 되었다'],bwAlly:['정파의 벗','백운과 약속을 나눴다'],weapon4:['천마도','천마도를 손에 넣었다'],
 allMem:['모든 것을 기억하다','기억을 모두 모았다'],ending4:['네 갈래 길','결말 4개를 보았다'],ending8:['모든 길의 끝','결말 8개를 모두 보았다'],hard:['어려움 정복','어려움으로 결말을 보았다']};
var LOCS={
 hill:{n:'혈월봉 뒷산',d:'약초와 짐승, 가끔은 길 잃은 사람',lock:'',open:function(){return true;}},
 lib:{n:'마교 서고',d:'금서와 먼지, 그리고 교의 기록',lock:'서고지기와 안면을 터야 한다 · 정파의 길에서는 갈 수 없다',open:function(){return !!S.flags.hs&&S.route!=='jeong';}},
 forest:{n:'흑림',d:'붉은 안개 속의 독충과 마수',lock:'8개월째부터',open:function(){return S.month>=8;}},
 village:{n:'변방 마을',d:'소문과 물건이 모이는 곳',lock:'10개월째부터',open:function(){return S.month>=10;}},
 border:{n:'정파 국경',d:'적의 땅. 위험한 만큼 얻을 것이 많다',lock:'19개월째부터',open:function(){return S.month>=19;}},
 tomb:{n:'천마총',d:'천마가 잠든 곳. 절정 이상만 버틴다',lock:'아직 입구를 모른다',open:function(){return !!S.flags.tomb||hasMem('lore');}}
};
var ENC=[
 /* hill */
 {id:'h_herb',loc:'hill',w:3,t:'약초 군락',x:'바위틈에 붉은 영지가 무리 지어 피어 있다. 오래 묵은 것이다.',ch:function(){return [
  {t:'그 자리에서 먹는다',h:'최대 체력 +6',f:function(){S.hpBonus+=6;S.hp=Math.min(maxHp(),S.hp+20);done('쓴맛 끝에 뜨거운 기운이 퍼졌다. 최대 체력이 <b>6</b> 늘었다.','rest');}},
  {t:'홍란에게 가져간다',h:'홍란 신뢰 +1 · 회춘단 +1',f:function(){S.trust.hr=tr('hr')+1;S.items.pill++;done('홍란이 영지를 받아 들고 처음으로 웃었다. 회춘단 하나를 건네주었다.','people');}}];}},
 {id:'h_wolf',loc:'hill',w:3,t:'굶주린 늑대 떼',x:'눈밭에 발자국이 어지럽다. 등 뒤에서 낮은 울음이 들린다.',ch:function(){return [
  {t:'맞서 싸운다',h:'전투 · 은전과 내공',f:function(){efight('wolf','늑대 떼',function(){S.silver+=15;S.qi+=8;done('늑대 가죽을 팔아 은전 <b>15</b>냥을 벌었다. 내공이 8 늘었다.','fight');});}},
  {t:'나무 위로 피한다',h:'체력 -10%',f:function(){hurt(.1);done('밤새 나무 위에서 떨었다. 늑대는 새벽에야 물러갔다.','rest');}}];}},
 {id:'h_cave',loc:'hill',w:2,once:'save',t:'동굴 속 해골',x:'무너진 동굴 안, 가부좌를 튼 해골 하나. 무릎 위에 낡은 서책이 놓여 있다.',ch:function(){return [
  {t:'절하고 서책을 펼친다',h:'귀원심법을 얻는다',f:function(){learn('gwiwon');done('「귀원심법」. 숨을 근원으로 되돌리는 심법이었다. <b>귀원심법</b>을 익혔다.','skill');}},
  {t:'해골을 묻어 준다',h:'마기 -20 · 내공 +10',f:function(){S.mad=Math.max(0,S.mad-20);S.qi+=10;done('흙을 덮는 동안 마음이 가라앉았다.','rest');}}];}},
 {id:'h_spring',loc:'hill',w:2,t:'숨은 온천',x:'바위 사이로 김이 오른다. 아무도 모르는 온천이다.',ch:function(){return [
  {t:'몸을 담근다',h:'체력 모두 회복 · 마기 -25',f:function(){S.hp=maxHp();S.mad=Math.max(0,S.mad-25);done('뜨거운 물에 몸을 담그자 오래 묵은 피로가 녹아내렸다.','rest');}},
  {t:'물가에서 운기한다',h:'내공 +18',f:function(){S.qi+=18;done('김 속에서 기를 돌렸다. 내공이 <b>18</b> 늘었다.','qi');}}];}},
 {id:'h_merchant',loc:'hill',w:2,t:'길 잃은 상인',x:'짐을 잔뜩 진 상인이 산길에서 헤매고 있다. 당신의 검은 옷을 보자 얼굴이 하얘졌다.',ch:function(){return [
  {t:'길을 안내한다',h:'은전 +25',f:function(){S.silver+=25;done('상인은 몇 번이나 고개를 숙이고 은전 <b>25</b>냥을 쥐여 주었다.','item');}},
  {t:'짐을 빼앗는다',h:'은전 +70 · 마기 +12',f:function(){S.silver+=70;S.mad=clamp(S.mad+12,0,100);done('비명은 금방 멎었다. 은전 <b>70</b>냥이 손에 남았다.','item');}}];}},
 {id:'h_nest',loc:'hill',w:2,t:'절벽의 영조 둥지',x:'깎아지른 절벽 중턱에 영조의 둥지가 보인다. 영조의 알은 내공을 키운다고 한다.',ch:function(){return [
  {t:'절벽을 오른다',h:'성공하면 내공 +30',f:function(){if(Math.random()<.45+S.realm*.1){S.qi+=30;done('손끝이 찢어지도록 올라 알 하나를 삼켰다. 내공이 <b>30</b> 늘었다.','qi');}else{hurt(.25);done('발을 헛디뎌 굴러떨어졌다. 체력이 크게 줄었다.','fail');}}},
  {t:'포기한다',h:'아무 일도 없다',f:function(){done('아쉬움을 삼키고 내려왔다.','rest');}}];}},
 /* library */
 {id:'l_forbid',loc:'lib',w:2,once:'life',t:'금서의 서가',x:'쇠사슬로 묶인 서가. 맨 위 칸에 핏자국이 밴 책이 있다. 표지에 「흡성」 두 글자.',ch:function(){return [
  {t:'사슬을 끊고 펼친다',h:'흡성대법 · 마기 +15',f:function(){learn('heupseong');S.mad=clamp(S.mad+15,0,100);done('남의 기를 제 것으로 삼는 마공, <b>흡성대법</b>을 익혔다. 손끝이 차갑다.','skill');}},
  {t:'건드리지 않는다',h:'한서생 신뢰 +1',f:function(){S.trust.hs=tr('hs')+1;done('한서생이 멀리서 그 모습을 보고 고개를 끄덕였다.','people');}}];}},
 {id:'l_chron',loc:'lib',w:2,cond:function(){return !hasMem('lore');},t:'교의 연대기',x:'천마신교 오백 년의 기록. 마지막 장이 찢겨 나가다 만 채 남아 있다.',ch:function(){return [
  {t:'끝까지 읽는다',h:'기억을 얻는다',f:function(){learnMem('lore');done('「천마는 혈월봉 북쪽 절벽 아래 잠들었다.」 이 문장이 머릿속에 박혔다. 다음 생에도 잊지 않을 것이다.','event');}},
  {t:'덮는다',h:'',f:function(){done('책을 덮었다. 알아서 좋을 것 없는 이야기도 있다.','event');}}];}},
 {id:'l_copy',loc:'lib',w:3,t:'필사',x:'한서생이 산더미 같은 두루마리를 내밀었다. 베껴 쓰면 품삯을 준다고 한다.',ch:function(){return [
  {t:'밤새 베껴 쓴다',h:'은전 +20 · 한서생 신뢰 +1',f:function(){S.silver+=20;S.trust.hs=tr('hs')+1;done('손목이 저릴 때까지 베껴 썼다. 은전 <b>20</b>냥을 받았다.','people');}},
  {t:'베끼며 무리를 읽는다',h:'무공 하나 +1성',f:function(){var n=upSkill(1);done(n?'두루마리 속에서 <b>'+n+'</b>의 실마리를 찾았다. 1성 올랐다.':'더 익힐 무공이 없다.','skill');}}];}},
 {id:'l_secret',loc:'lib',w:2,once:'life',cond:function(){return tr('hs')>=3;},t:'숨겨진 방',x:'한서생이 서가 하나를 밀자 좁은 방이 나타났다. "교주님도 모르는 곳이오."',ch:function(){return [
  {t:'금강불괴의 비급을 고른다',h:'금강불괴',f:function(){learn('geumgang');done('칼이 들지 않는 몸을 만드는 비급, <b>금강불괴</b>를 얻었다.','skill');}},
  {t:'천잠보의를 고른다',h:'최고급 방어구',f:function(){S.armor=3;done('천년 누에실로 짠 옷, <b>천잠보의</b>를 얻었다.','item');}}];}},
 {id:'l_shadow',loc:'lib',w:2,t:'서고의 그림자',x:'등불이 꺼지고, 서가 사이로 누군가 미끄러지듯 움직였다.',ch:function(){return [
  {t:'쫓아간다',h:'전투',f:function(){efight('ghost','서고의 그림자',function(){S.qi+=15;S.silver+=20;done('그림자는 서책 도둑이었다. 한서생이 은전 <b>20</b>냥을 내주었다.','fight');});}},
  {t:'등불을 다시 켠다',h:'아무 일도 없다',f:function(){done('다시 켠 불빛 아래에는 아무도 없었다.','event');}}];}},
 {id:'l_manual',loc:'lib',w:2,t:'무공 서적 더미',x:'정리되지 않은 무공 서적이 산처럼 쌓여 있다.',ch:function(){return [
  {t:'익힌 무공의 해설서를 찾는다',h:'가장 높은 무공 +2성',f:function(){var n=upSkill(2);done(n?'<b>'+n+'</b>의 해설서를 찾았다. 2성 올랐다.':'더 익힐 무공이 없다.','skill');}},
  {t:'잡학서를 읽는다',h:'안력 +1 (이번 생)',f:function(){S.eye++;done('사람의 어깨와 발끝을 읽는 법을 배웠다. 상대의 수가 더 잘 보일 것이다.','skill');}}];}},
 /* forest */
 {id:'f_snake',loc:'forest',w:3,t:'독사 무리',x:'붉은 안개 속에서 비늘 스치는 소리가 사방에서 들린다.',ch:function(){return [
  {t:'베어 넘긴다',h:'전투',f:function(){efight('snake','독사 무리',function(){S.qi+=10;S.silver+=12;done('뱀 쓸개를 팔아 은전 <b>12</b>냥을 벌었다.','fight');});}},
  {t:'해독단을 먹고 돌파한다',off:S.items.antidote<1?'해독단이 없다':null,h:'해독단 -1 · 운철 +1',f:function(){S.items.antidote--;ore(1);done('독기를 뚫고 안쪽 광맥에 닿았다. 운철 한 덩이를 캤다.','item');}}];}},
 {id:'f_ore',loc:'forest',w:3,t:'운철 광맥',x:'검은 바위에 별처럼 박힌 금속. 운철이다.',ch:function(){return [
  {t:'캐낸다',h:'운철 +1 (절정 이상 +2)',f:function(){var n=S.realm>=3?2:1;ore(n);done('운철 <b>'+n+'</b>덩이를 캤다. 철노가 좋아할 것이다.','item');}},
  {t:'더 깊이 판다',h:'운철 +2 · 체력 -20%',f:function(){ore(2);hurt(.2);done('바위가 무너지는 바람에 다쳤지만 운철 <b>2</b>덩이를 건졌다.','item');}}];}},
 {id:'f_beast',loc:'forest',w:2,t:'흑림의 마수',x:'나무를 쓰러뜨리며 거대한 짐승이 다가온다. 눈이 붉게 탄다.',ch:function(){return [
  {t:'맞선다',h:'강적 · 운철 +2 · 회춘단',f:function(){efight('beast','흑림의 마수',function(){ore(2);S.items.pill++;S.qi+=20;done('마수의 심장에서 운철 <b>2</b>덩이가 나왔다. 회춘단 하나도 챙겼다.','fight');});}},
  {t:'물러난다',h:'',f:function(){done('나무 뒤에 숨어 숨을 죽였다. 짐승은 지나갔다.','event');}}];}},
 {id:'f_corpse',loc:'forest',w:2,once:'save',t:'자객의 시신',x:'나무에 기댄 채 죽은 자객. 품에서 얇은 보법서가 비죽 나와 있다.',ch:function(){return [
  {t:'보법서를 읽는다',h:'귀영보',f:function(){learn('gwiyeong');done('귀신처럼 사라지는 보법, <b>귀영보</b>를 익혔다.','skill');}},
  {t:'시신을 묻어 준다',h:'마기 -15',f:function(){S.mad=Math.max(0,S.mad-15);done('이름 모를 자객을 묻었다. 언젠가 당신도 이렇게 묻힐지 모른다.','rest');}}];}},
 {id:'f_fog',loc:'forest',w:2,t:'붉은 안개',x:'안개를 들이마시자 피가 끓는다. 마기가 섞인 안개다.',ch:function(){return [
  {t:'안개 속에서 운기한다',h:'내공 +40 · 마기 +22',f:function(){S.qi+=40;S.mad=clamp(S.mad+22,0,100);done('붉은 기운을 억지로 삼켰다. 내공이 <b>40</b> 늘었지만 눈앞이 붉다.','qi');}},
  {t:'숨을 참고 빠져나온다',h:'체력 -10%',f:function(){hurt(.1);done('안개를 빠져나오자 기침이 멎지 않았다.','rest');}}];}},
 {id:'f_sm',loc:'forest',w:3,cond:function(){return S.flags.sm&&!S.flags.smDead;},t:'안개 속의 사마령',x:'나뭇가지 위에서 사마령이 내려다본다. "따라올 수 있으면 따라와 봐."',ch:function(){return [
  {t:'그림자를 쫓는다',h:'사마령 신뢰 +1 · 내공 +10',f:function(){S.qi+=10;gain('sm',1,'<p>한나절을 쫓은 끝에 사마령의 옷자락을 잡았다. "제법인데?" 그녀가 처음으로 소리 내어 웃었다.</p>');}},
  {t:'모른 척한다',h:'',f:function(){done('사마령은 혀를 차고 안개 속으로 사라졌다.','event');}}];}},
 {id:'f_bloodtree',loc:'forest',w:2,once:'life',t:'피를 먹는 나무',x:'붉은 수액이 흐르는 고목. 뿌리 아래 마공서 한 권이 반쯤 묻혀 있다.',ch:function(){return [
  {t:'수액을 바르고 마공서를 읽는다',h:'시혈마공 · 마기 +10',f:function(){learn('sihyeol');S.mad=clamp(S.mad+10,0,100);done('상처에서 피가 흐를수록 힘이 솟는 마공, <b>시혈마공</b>을 익혔다.','skill');}},
  {t:'나무를 베어 버린다',h:'운철 +1',f:function(){ore(1);done('나무 속에서 운철 한 덩이가 나왔다.','item');}}];}},
 {id:'l_soul',loc:'lib',w:2,once:'life',t:'섭혼술 서책',x:'겉장에 아무것도 적혀 있지 않은 책. 펼치자 글자들이 눈을 마주쳐 온다.',ch:function(){return [
  {t:'눈을 피하지 않는다',h:'섭혼대법 · 마기 +12',f:function(){learn('seophon');S.mad=clamp(S.mad+12,0,100);done('글자가 당신의 넋을 잡아끌었다가 놓았다. 남의 넋을 빼앗는 법, <b>섭혼대법</b>을 익혔다.','skill');}},
  {t:'책을 덮는다',h:'',f:function(){done('책을 덮자 등 뒤의 한기가 사라졌다.','event');}}];}},
 {id:'t_haeche',loc:'tomb',w:2,once:'save',cond:function(){return S.realm>=4;},t:'해체의 벽화',x:'몸이 산산이 부서지며 하늘을 가르는 사내의 벽화. 아래에 「해체」 두 글자.',ch:function(){return [
  {t:'벽화를 따른다',h:'천마해체대법 · 마기 +20',f:function(){learn('haeche');S.mad=clamp(S.mad+20,0,100);done('몸을 허물어 모든 것을 거는 금지된 초식, <b>천마해체대법</b>을 익혔다.','skill');}},
  {t:'외면한다',h:'',f:function(){done('그런 힘은 원하지 않았다.','event');}}];}},
 {id:'h_fall',loc:'hill',w:2,t:'깨달음의 폭포',x:'산 깊은 곳, 쉬지 않고 떨어지는 폭포. 물소리 속에 무언가 규칙이 있다.',ch:function(){return [
  {t:'폭포 아래 앉는다',h:'깨달음 · 벽 앞이면 경지가 오른다',f:function(){insightEnc('떨어지는 물의 결이 검로처럼 보였다.');}},
  {t:'그냥 돌아간다',h:'',f:function(){done('물소리만 귀에 남았다.','event');}}];}},
 {id:'v_monk',loc:'village',w:2,t:'탁발승의 화두',x:'마을 어귀의 늙은 탁발승이 묻는다. "칼을 쥔 손과 칼을 놓은 손, 어느 쪽이 더 강하냐?"',ch:function(){return [
  {t:'화두를 붙든다',h:'깨달음 · 벽 앞이면 경지가 오른다',f:function(){insightEnc('사흘 밤낮 화두를 붙들었다. 답은 손이 아니라 마음에 있었다.');}},
  {t:'모르겠다고 웃는다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);done('탁발승도 따라 웃었다.','rest');}}];}},
 {id:'b_go',loc:'border',w:1,once:'life',t:'바둑 두는 노인',x:'국경의 정자에서 노인 하나가 혼자 바둑을 두고 있다. 판 위의 돌이 검진처럼 보인다.',ch:function(){return [
  {t:'맞은편에 앉는다',h:'깨달음 · 벽 앞이면 경지가 오른다',f:function(){insightEnc('한 판을 지고 나서야 보였다. 돌 하나가 판 전체를 움직이는 이치가.');}},
  {t:'지나간다',h:'',f:function(){done('노인은 고개도 들지 않았다.','event');}}];}},
 {id:'t_scent',loc:'tomb',w:2,t:'천마의 잔향',x:'석실에 남은 천마의 기운이 아지랑이처럼 일렁인다.',ch:function(){return [
  {t:'기운을 받아들인다',h:'깨달음 · 마기 +10',f:function(){S.mad=clamp(S.mad+Math.round(10*madMul()),0,100);insightEnc('오백 년 전 천마가 남긴 숨결이 몸 안을 한 바퀴 돌았다.');}},
  {t:'물러난다',h:'',f:function(){done('발걸음을 돌렸다.','event');}}];}},
 /* village */
 {id:'v_inn',loc:'village',w:3,t:'객잔의 소문',x:'객잔 구석에서 상인들이 소곤댄다. 마교 안에 정파의 눈이 숨어 있다는 이야기다.',ch:function(){return [
  {t:'술을 사며 귀를 기울인다',off:S.silver<10?'은전이 모자란다':null,h:'은전 -10 · 소문을 얻는다',f:function(){S.silver-=10;if(!hasMem('baekun')&&Math.random()<.65){learnMem('baekun');done('“외당에 백운이라는 놈이 있는데, 무당의 속가 제자라더군.” 귀가 번쩍 뜨였다.','event');}else done('쓸 만한 소문은 없었다. 술맛은 좋았다.','rest');}},
  {t:'그냥 나온다',h:'',f:function(){done('소문은 소문일 뿐이다.','event');}}];}},
 {id:'v_market',loc:'village',w:2,t:'떠돌이 상인',x:'낙타에 짐을 실은 서역 상인이 희귀한 물건을 펼쳐 놓았다.',ch:function(){return [
  {t:'정심환 두 알 · 80냥',off:S.silver<80?'은전이 모자란다':null,h:'마기 폭주를 두 번 막는다',f:function(){S.silver-=80;S.items.calm+=2;done('정심환 두 알을 샀다.','item');}},
  {t:'대환단 · 150냥',off:S.silver<150?'은전이 모자란다':null,h:'내공 +60',f:function(){S.silver-=150;S.qi+=60;done('대환단을 삼키자 단전이 불타올랐다. 내공이 <b>60</b> 늘었다.','qi');}},
  {t:'구경만 한다',h:'',f:function(){done('서역의 물건들은 신기했지만 주머니가 가벼웠다.','event');}}];}},
 {id:'v_thug',loc:'village',w:3,t:'마을의 불량배',x:'불량배들이 약 파는 노인을 두들기고 있다.',ch:function(){return [
  {t:'혼내 준다',h:'전투 · 마기 -10',f:function(){efight('bandit','마을 불량배',function(){S.silver+=20;S.mad=Math.max(0,S.mad-10);done('불량배들이 달아났다. 노인이 은전 <b>20</b>냥을 억지로 쥐여 주었다.','fight');},true,.6);}},
  {t:'지나친다',h:'마기 +5',f:function(){S.mad=clamp(S.mad+5,0,100);done('비명이 등 뒤로 멀어졌다.','event');}}];}},
 {id:'v_gamble',loc:'village',w:2,t:'도박판',x:'주사위 소리가 요란하다. 판돈은 은전 50냥.',ch:function(){return [
  {t:'50냥을 건다',off:S.silver<50?'은전이 모자란다':null,h:'절반의 확률로 두 배',f:function(){if(Math.random()<.5+.03*S.eye){S.silver+=50;done('주사위가 당신 편이었다. 은전 <b>50</b>냥을 땄다.','item');}else{S.silver-=50;done('주사위는 냉정했다. 은전 50냥을 잃었다.','fail');}}},
  {t:'구경만 한다',h:'',f:function(){done('남의 돈이 오가는 걸 구경하는 것도 나쁘지 않았다.','event');}}];}},
 {id:'v_child',loc:'village',w:2,t:'약초 파는 아이',x:'맨발의 아이가 시든 약초를 팔고 있다. 연이 생각이 났다.',ch:function(){return [
  {t:'남은 약초를 다 산다',off:S.silver<15?'은전이 모자란다':null,h:'은전 -15 · 회춘단 +1 · 마기 -10',f:function(){S.silver-=15;S.items.pill++;S.mad=Math.max(0,S.mad-10);done('아이가 활짝 웃었다. 약초를 달여 회춘단 하나를 만들었다.','item');}},
  {t:'은전 몇 푼을 쥐여 준다',off:S.silver<5?'은전이 모자란다':null,h:'은전 -5 · 연이 신뢰 +1',f:function(){S.silver-=5;S.trust.yn=tr('yn')+1;done('돌아와서 그 이야기를 하자 연이가 오래 웃었다.','people');}}];}},
 {id:'v_master',loc:'village',w:1,once:'save',t:'은거한 노고수',x:'마을 끝 초가에 사는 노인. 장작 패는 도끼질에 군더더기가 없다.',ch:function(){return [
  {t:'가르침을 청한다',h:'철골공',f:function(){learn('cheolgol');done('노인은 사흘 동안 당신을 두들겨 팼다. <b>철골공</b>을 익혔다.','skill');}},
  {t:'장작을 대신 팬다',h:'체력 회복 · 내공 +10',f:function(){S.hp=maxHp();S.qi+=10;done('땀 흘린 만큼 몸이 가벼워졌다.','rest');}}];}},
 /* border */
 {id:'b_patrol',loc:'border',w:3,t:'정파 순찰대',x:'흰 옷의 검수들이 국경을 돈다. 숨을 곳은 많지 않다.',ch:function(){return [
  {t:'기습한다',h:'전투 · 은전',f:function(){efight('swordsman','정파 순찰대',function(){S.silver+=40;S.qi+=15;done('순찰대를 쓰러뜨리고 은전 <b>40</b>냥을 챙겼다.','fight');});}},
  {t:'숨어서 지나보낸다',h:'안력 판정',f:function(){if(Math.random()<.4+S.eye*.12){S.qi+=8;done('숨을 죽이고 그들이 지나가기를 기다렸다. 들키지 않았다.','event');}else{efight('swordsman','들켰다',function(){S.silver+=40;done('결국 칼을 뽑았다. 은전 <b>40</b>냥을 챙겼다.','fight');});}}}];}},
 {id:'b_plans',loc:'border',w:2,once:'life',t:'정파의 진법도',x:'버려진 초소 책상 위에 정파의 공성 진법도가 펼쳐져 있다.',ch:function(){return [
  {t:'훔쳐 온다',h:'정사대전이 수월해진다',f:function(){S.flags.plans=true;done('진법도를 품에 넣었다. 정사대전에서 적장의 허점을 알 수 있을 것이다.','item');}},
  {t:'불태운다',h:'마기 -5',f:function(){S.mad=Math.max(0,S.mad-5);done('종이가 타들어 갔다.','event');}}];}},
 {id:'b_taoist',loc:'border',w:2,once:'save',t:'무당의 도사',x:'고목 아래 도사 하나가 눈을 감고 앉아 있다. "마교의 아이로구나. 검을 겨뤄 보겠느냐."',ch:function(){return [
  {t:'겨룬다',h:'강적 · 이기면 청허검법',f:function(){efight('taoist','무당의 도사',function(){learn('cheongheo');done('도사는 검을 거두고 웃었다. "마음이 맑구나." 그가 남긴 검로에서 <b>청허검법</b>을 익혔다.','skill');},false);}},
  {t:'고개를 숙이고 지나간다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);done('도사는 눈을 뜨지 않았다. 묘하게 마음이 편해졌다.','rest');}}];}},
 {id:'b_refugee',loc:'border',w:2,t:'피난민 행렬',x:'전쟁을 피해 남쪽으로 가는 사람들. 마교의 옷을 보고 아이들이 운다.',ch:function(){return [
  {t:'먹을 것을 나눠 준다',off:S.silver<20?'은전이 모자란다':null,h:'은전 -20 · 마기 -20',f:function(){S.silver-=20;S.mad=Math.max(0,S.mad-20);if(S.flags.bw)S.trust.bw=tr('bw')+1;done('아이 하나가 울음을 그치고 떡을 받아 들었다.'+(S.flags.bw?' 이 이야기를 들은 백운이 고개를 숙였다.':''),'people');}},
  {t:'외면한다',h:'마기 +5',f:function(){S.mad=clamp(S.mad+5,0,100);done('울음소리가 오래 귀에 남았다.','event');}}];}},
 {id:'b_bw',loc:'border',w:3,cond:function(){return S.flags.bw&&!S.flags.bwDead;},t:'국경의 백운',x:'국경 숲에서 백운이 기다리고 있었다. "여기선 마교도 정파도 아니오. 그냥 우리 둘이오."',ch:function(){return [
  {t:'이야기를 나눈다',h:'백운 신뢰 +1',f:function(){gain('bw',1,'<p>해가 질 때까지 이야기를 나눴다. 백운의 고향에는 매화가 많다고 했다.</p>');}},
  {t:'돌아선다',h:'',f:function(){done('백운은 아무 말 없이 당신의 등을 바라보았다.','event');}}];}},
 {id:'b_loot',loc:'border',w:2,t:'무너진 초소',x:'전투가 지나간 초소. 시체 사이에 쓸 만한 것들이 남아 있다.',ch:function(){return [
  {t:'뒤진다',h:'은전 · 운철 · 위험',f:function(){if(Math.random()<.7){S.silver+=35;ore(1);done('은전 <b>35</b>냥과 운철 한 덩이를 찾았다.','item');}else efight('swordsman','매복',function(){S.silver+=35;done('매복을 뚫고 은전 <b>35</b>냥을 챙겼다.','fight');});}},
  {t:'그냥 지나간다',h:'',f:function(){done('죽은 자의 것은 죽은 자에게 두었다.','event');}}];}},
 /* tomb */
 {id:'t_guard',loc:'tomb',w:3,t:'석상 수호자',x:'천마총 회랑의 석상이 눈을 떴다. 돌 부딪는 소리가 회랑을 울린다.',ch:function(){return [
  {t:'부순다',h:'강적 · 운철 +2 · 내공 +25',f:function(){efight('stone','석상 수호자',function(){ore(2);S.qi+=25;done('석상이 무너지며 운철 <b>2</b>덩이가 굴러 나왔다.','fight');});}},
  {t:'달아난다',h:'체력 -20%',f:function(){hurt(.2);done('돌주먹이 등을 스쳤다. 간신히 회랑을 빠져나왔다.','fail');}}];}},
 {id:'t_mural',loc:'tomb',w:3,once:'life',t:'천마의 벽화',x:'벽 가득 붉은 안료로 그려진 그림. 혈월 아래 한 사내가 하늘을 찢고 있다.',ch:function(){return [
  {t:'벽화를 따라 검을 휘두른다',h:'혈월검 · 마기 +18',f:function(){learn('hyeolwol');S.mad=clamp(S.mad+18,0,100);done('벽화 속 사내의 검로가 몸에 새겨졌다. <b>혈월검</b>을 익혔다.','skill');}},
  {t:'벽화의 글을 읽는다',h:'기억을 얻는다',f:function(){learnMem('cheonma');done('「나는 죽지 않는다. 붉은 달이 나의 숨이니.」 혈월과 회귀의 정체를 알았다.','event');}}];}},
 {id:'t_bones',loc:'tomb',w:2,once:'life',t:'역대 교주의 관',x:'스물세 개의 관. 마지막 관만 비어 있고, 뚜껑에 "위무강"이라 새겨져 있다.',ch:function(){return [
  {t:'빈 관 속을 살핀다',h:'천마강신의 구결',f:function(){learn('cheon');done('관 바닥에 새겨진 구결을 읽었다. <b>천마강신</b>을 익혔다.','skill');}},
  {t:'관에 절한다',h:'교주 신뢰 +1 · 마기 -15',f:function(){S.trust.kj=tr('kj')+1;S.mad=Math.max(0,S.mad-15);done('스물세 명의 천마에게 절했다.','rest');}}];}},
 {id:'t_core',loc:'tomb',w:4,once:'life',cond:function(){return hasMem('cheonma')&&S.realm>=4;},t:'혈월의 핵',x:'가장 깊은 곳, 허공에 붉은 심장 같은 것이 떠 있다. 맥박에 맞춰 바깥의 달이 붉어진다.',ch:function(){return [
  {t:'핵에 손을 댄다',h:'기억을 얻는다 · 체력 -40%',f:function(){learnMem('core');S.flags.tombDone=true;hurt(.4);done('손끝이 타들어 갔다. 그리고 보았다. 수없이 되풀이된 당신의 봄들을. 이 핵이 회귀의 근원이다.','event');}},
  {t:'물러난다',h:'',f:function(){done('아직은 때가 아니다.','event');}}];}},
 {id:'t_echo',loc:'tomb',w:2,once:'life',t:'과거의 메아리',x:'회랑 끝 거울 같은 바위에 당신의 얼굴들이 비친다. 죽었던 생의 얼굴들이다.',ch:function(){return [
  {t:'얼굴들을 마주 본다',h:'회귀력 조각 +5',f:function(){P.shards+=5;done('지난 생의 얼굴들이 하나씩 고개를 끄덕였다. 회귀력 조각 <b>5</b>개를 얻었다.','realm');}},
  {t:'눈을 감는다',h:'마기 -20',f:function(){S.mad=Math.max(0,S.mad-20);done('보지 않기로 했다. 지금 이 생만 보기로.','rest');}}];}},
 {id:'t_trap',loc:'tomb',w:2,t:'함정 회랑',x:'바닥의 돌이 꺼지며 화살이 쏟아진다.',ch:function(){return [
  {t:'보법으로 빠져나간다',h:'보법이 있으면 무사',f:function(){if(sk('heuk')||sk('gwiyeong')){S.qi+=10;done('화살 사이를 그림자처럼 빠져나갔다.','qi');}else{hurt(.3);done('보법이 없었다. 화살 세 대가 박혔다.','fail');}}},
  {t:'몸으로 막고 돌파한다',h:'체력 -25% · 운철 +1',f:function(){hurt(.25);ore(1);done('화살을 맞으며 회랑 끝까지 달렸다. 운철 한 덩이가 떨어져 있었다.','item');}}];}}
];
var ARENA=[['ar1',40],['ar2',70],['ar3',110],['ar4',160],['ar5',300]];
SK.mahon={n:'마혼장',t:'마공',cost:8,mult:1.6,mad:6,d:'외당 교도가 처음 받는 마공. 손바닥에 검은 기운이 맺힌다.'};
SK.heuksal={n:'흑살장',t:'마공',cost:11,mult:1.9,pierce:true,mad:8,d:'막아도 뚫고 들어오는 검은 장력. 어떤 수에도 적중하고 받는 피해가 반으로 준다.'};
SK.hyeolyeong={n:'혈영신공',t:'마공',cost:10,mult:.75,hits:3,bleed:true,mad:10,d:'핏빛 잔상을 남기며 세 번 친다. 출혈을 일으킨다.'};
SK.seophon={n:'섭혼대법',t:'마공',cost:12,mult:1,stun:true,mad:10,d:'눈을 마주친 상대의 넋을 빼앗는다. 맞은 상대는 다음 합을 쉰다.'};
SK.gwihon={n:'귀혼무',t:'마공',cost:14,mult:.8,hits:4,mad:10,d:'원혼이 춤추듯 네 번 벤다.'};
SK.sihyeol={n:'시혈마공',t:'심법',passive:true,d:'피를 흘릴수록 강해진다. 체력이 40% 아래일 때 성마다 공격력 3%.'};
SK.mara={n:'마라신공',t:'심법',passive:true,d:'마교 정통 심법. 성마다 공격력이 2% 오른다.'};
SK.hyeolma={n:'혈마대법',t:'마공',cost:16,mult:2.2,leech:.3,mad:14,d:'단목환의 비전. 피를 삼켜 힘으로 바꾼다.'};
SK.gunrim={n:'천마군림보',t:'보법',passive:true,d:'천마의 걸음. 회피에 진기가 들지 않고 가장 강한 반격이 붙는다.'};
SK.hyeolryong={n:'혈룡참',t:'마도',cost:22,mult:3.4,bleed:true,mad:15,d:'혈지에서 깨어난 붉은 용의 일격.'};
SK.cheonmaSG={n:'천마신공',t:'마공',cost:26,mult:4.2,leech:.2,mad:20,d:'역대 천마만이 익힌 궁극의 마공.'};
SK.haeche={n:'천마해체대법',t:'마공',cost:30,mult:5.2,selfDmg:.2,mad:30,d:'몸을 허물어 한 번의 일격에 모든 것을 건다. 쓸 때마다 체력 20%를 잃는다.'};
SK.taegeuk={n:'태극검법',t:'검법',cost:14,mult:2.4,mad:-10,d:'무당의 검. 부드러움으로 강함을 이긴다. 마기를 가라앉힌다.'};
SK.jeongsim={n:'정심공',t:'심법',passive:true,d:'세수역근으로 얻은 정파 심법. 마기가 달마다 더 빨리 가라앉는다.'};
SK.jeun={n:'제운종',t:'보법',passive:true,d:'구름을 밟는 무당 경공. 회피에 진기가 들지 않고 반격이 붙는다.'};
SK.igieo={n:'이기어검',t:'검법',cost:24,mult:3.8,pierce:true,mad:-15,d:'기로 검을 부리는 검성의 경지. 어떤 수에도 적중하고 마기를 씻어 낸다.'};
INT.stun={n:'혼미',d:'넋이 나갔다'};IM.stun=0;TBL.stun={atk:[0,1.4],parry:[0,0],dodge:[0,0]};
LINE.stun={atk:'넋이 나간 상대를 마음껏 베었다.',parry:'상대는 넋이 나가 있었다.',dodge:'상대는 넋이 나가 있었다.'};
ENM.elder={n:'마교 장로',hp:150,atk:20,w:{strong:3,rapid:2,feint:3,charge:2}};
ENM.chaser={n:'마교 추격대',hp:80,atk:14,w:{strong:2,rapid:4,feint:2,charge:1}};
ENM.kjBoss={n:'천마 위무강',hp:290,atk:26,boss:true,w:{strong:3,rapid:2,feint:3,charge:3}};
ENM.jg={n:'제갈휘',hp:280,atk:25,boss:true,w:{strong:2,rapid:3,feint:4,charge:2}};
GLY.elder='老';GLY.chaser='追';GLY.kjBoss='魔';GLY.jg='智';
NPC.nj={n:'남궁진',role:'검성',flag:'nj',side:'jeong',desc:'정파 제일검. 마교 출신을 처음으로 제자로 받았다.'};
NG.nj='聖';
ENDINGS.cheonma=['천마군림',320];ENDINGS.maengju=['무림맹주',320];
ACH.ending8=['모든 길의 끝','결말을 모두 보았다'];
ACH.cheonmaEnd=['천마군림','천마의 길 끝에서 천마가 되었다'];ACH.maengjuEnd=['무림맹주','정파의 길 끝에서 무림맹주가 되었다'];ACH.twoRoads=['두 갈래 길','천마와 맹주, 두 결말을 모두 보았다'];
ACH.demon=['마공의 길','마공을 여섯 가지 익혔다'];
var CHR={ma:[0,0,0,[19,'제4장','마도','칼끝을 천마의 자리로 돌린다.'],[25,'제5장','혈해','피의 바다를 건너야 옥좌에 닿는다.'],[31,'제6장','천마군림','천마의 이름을 잇는 자.']],
  jeong:[0,0,0,[19,'제4장','전향','검은 옷을 벗고 흰 옷을 입는다.'],[25,'제5장','정사대전','옛 동료에게 칼을 겨눈다.'],[31,'제6장','맹주의 자리','무림을 이끌 자를 가린다.']]};
var NEWS={n:['','외당에 새 시종들이 들어왔다. 겨울을 못 넘긴 자리가 그만큼 많았다는 뜻이다.','교주 위무강이 대전에 나오지 않은 지 한 달. 감기라고들 한다.','외당 입교 심사가 다가온다. 시종들 사이에 묘한 기대가 돈다.','좌호법 단목환의 사람들이 외당 요직에 하나둘 앉고 있다.','서고에 밤마다 불이 켜진다는 소문. 귀신이라는 사람도 있다.','외당 비무대회가 열린다. 단목환이 직접 단상에 앉는다고 한다.','혈로행 시험이 공고되었다. 살아 돌아오면 정식 교도가 된다.','지하 혈투장이 문을 열었다. 돈과 피가 함께 흐른다.','교주의 약재를 단목환의 사람이 직접 나른다는 이야기가 돈다.','산문 아래 대장간 노인이 쉬지 않고 칼을 벼린다. 누가 주문했는지는 모른다.','정파 무림맹이 서북으로 사람을 보냈다는 소문.','신년제. 교주가 반년 만에 옥좌에 앉는다.','교주의 기침 소리가 대전 밖까지 들린다.','밤마다 교주 처소 지붕 위에 그림자가 앉아 있다는 경비병의 증언.','단목환이 장로 셋을 자기 처소로 불렀다.','교주가 신년제에 곁에 섰던 자들을 하나씩 부른다고 한다.','혈월이 차오른다. 금위대 교대 시간이 바뀌었다.','오늘 밤, 달이 가장 붉다.','혈월의 밤이 남긴 피를 아직 다 씻지 못했다.','총단의 새 질서가 자리를 잡아 간다.','정파 연합이 진군을 결의했다는 소식이 들어왔다.','외당에 새 교도가 들어왔다. 칼 쓰는 법이 이상하게 반듯하다.','정파의 척후가 산 아래 마을에서 목격되었다.','흑림의 마수가 마을을 덮쳤다. 전쟁의 기운에 짐승도 미쳐 간다.','흰 깃발이 산 아래 강을 건넜다.','정파 선발대가 산 아래 초소를 노린다.','산문 앞에 검성 남궁진이 나타났다는 소문.','검성이 도전자를 기다린다.','정파 본대가 혈월봉을 에워쌌다. 결전이 머지않았다.','산문이 흔들린다.','전쟁이 끝난 산에 까마귀가 내려앉았다.','북쪽 절벽에서 붉은 빛이 새어 나온다.','천마총에 들어갔다 나온 자들이 밤마다 헛소리를 한다.','셋째 해의 겨울. 눈이 그치지 않는다.','혈월이 다시 차오르기 시작했다.','처음 그 꿈의 밤이 온다.'],
 ma:{21:'붉은 비단에 적힌 구결이 손끝을 태운다.',22:'장로들이 당신을 시험하겠다고 했다.',23:'장로회가 열린다.',24:'당신을 따르는 교도들이 생기기 시작했다.',25:'혈지의 물이 끓고 있다는 보고가 올라왔다.',26:'정파 선발대가 움직인다. 교도들이 당신의 명을 기다린다.',27:'총단에 정파 첩자가 숨어 있다는 밀고.',28:'산 아래 정파 진영의 불빛이 하루가 다르게 늘어난다.',29:'결전 준비. 어떻게 싸울지는 당신이 정한다.',30:'혈해의 날.',31:'정파가 물러간 산에서 교도들이 당신을 천마라 부르기 시작했다.',32:'천마총의 문이 열렸다.',33:'밤마다 목소리가 당신을 부른다.',34:'장로들이 당신 앞에 무릎을 꿇었다.',35:'천마총의 붉은 빛이 강해진다.',36:'천마의 이름을 이을 밤.'},
 jeong:{21:'흰 옷이 아직 어색하다.',22:'무림맹의 눈길이 따갑다.',23:'세수역근을 거친 몸이 가볍다.',24:'백운이 무당산 이야기를 꺼냈다.',25:'정파 연합이 진군을 시작했다.',26:'선봉에 설 자를 찾는다. 마교의 길을 아는 자가 필요하다.',27:'맹 안에서 당신을 마교의 개라 부르는 자들이 있다.',28:'검성 남궁진이 당신을 찾는다.',29:'혈월봉 공략 전야.',30:'흰 깃발이 산을 오른다.',31:'혈월봉이 함락되었다.',32:'혈월봉 북쪽 절벽에서 붉은 빛이 새어 나온다.',33:'맹주 청허가 물러나겠다고 선언했다.',34:'맹주 후보 제갈휘가 당신의 과거를 들추고 다닌다.',35:'무림대회가 열린다.',36:'맹주를 가리는 날.'}};
var PRE={
 enter:['입교 심사',[ps('봄이 깊어지자 외당에 새 교도를 가리는 심사가 열렸다. 마교에서 시종은 사람으로 치지 않는다. 그러나 심사 날 눈에 띈 시종이 교도로 발탁되는 일이 아주 없지는 않았다.','외당 교관 독고강은 십 년 전 정파와의 싸움에서 오른팔을 잃었다. 약당의 홍란은 독으로 사람을 살리는 의원이다. 이 둘의 눈에 드는 것이 시종이 이 산에서 살아남는 가장 빠른 길이다.')],'court'],
 tourney:['외당 비무',[ps('외당 비무대회는 마교식 등용문이다. 지는 자는 다치고, 이기는 자는 높은 사람의 눈에 띈다.','올해 비무대회 단상에는 좌호법 단목환이 직접 앉았다. 교주가 병상에 누운 뒤로, 그는 교의 일을 하나둘 제 손에 쥐어 왔다. 그가 눈여겨본 자는 출세하거나, 사라진다.')],'court'],
 clue:['흉흉한 소문',[ps('가을. 교주 위무강이 반년째 대전에 나오지 않는다. 대신 좌호법 단목환의 명이 교주의 명처럼 내려온다.','장로들 사이에서도 말이 갈린다. 교주가 곧 일어날 것이라는 자, 이미 끝났다는 자. 그리고 그 틈에서 누군가는 칼을 갈고 있다.')],null],
 newyear:['신년제',[ps('새해 첫날, 천마신교의 모든 교도가 대전에 모이는 신년제가 열린다. 반년 만에 교주가 옥좌에 앉는다는 소식에 대전이 술렁였다.','옥좌의 위무강은 눈에 띄게 야위었다. 그 아래 첫 줄의 단목환은 교주보다 더 교주처럼 앉아 있었다. 교도들은 두 사람 중 누구를 봐야 할지 몰라 눈을 내리깔았다.','이 자리에서 누구 곁에 서느냐가, 반년 뒤 누가 살아남느냐를 정할 것이다.')],'throne'],
 eve:['혈월 전야',[function(){return ps('여름이 깊어 간다. 혈월이 차오를수록 총단의 공기가 무거워진다.','단목환의 사람들이 무기고를 드나든다. 금위대의 교대 시간이 바뀌었다. 약당에서는 교주의 약재가 끊겼다는 말이 돈다.',(S.items.letter?'품속의 밀서가 무겁다. ':'')+(S.items.antidote?'해독단 한 알이 손끝에 만져진다. ':'')+'준비가 충분한지는 내일 밤이 알려 줄 것이다.');}],'title'],
 night:['혈월의 밤',[ps('그날 밤, 달은 유난히 낮게 떠 있었다. 산 전체가 붉은 물에 잠긴 것 같았다.','연이가 잠결에 당신의 소매를 잡았다. "오늘따라 달이 무서워." 당신은 대답하지 못했다.','멀리서 첫 번째 비명이 들려왔다.')],'night'],
 after:['혈월 이후',[function(){var F=S.flags,t=[];t.push('사흘 동안 총단에서는 시체를 치웠다. 외당 마당의 핏자국은 비가 와도 지워지지 않았다.');
   if(F.danDead)t.push('좌호법 단목환은 죽었다. 그의 처소에서 정파 맹주와 주고받은 서신 뭉치가 쏟아져 나왔다.');else if(F.danRule)t.push('단목환은 교주를 시해했다고 선언하지 않았다. 다만 "병사했다"고 했을 뿐이다. 아무도 반박하지 않았다.');else if(F.danAlive)t.push('단목환은 산 아래로 달아났다. 정파 쪽으로 갔다는 소문이 돈다.');
   t.push(F.masterAlive?'교주 위무강은 살아남았다. 처소 밖으로 나오지는 못하지만, 그의 숨이 붙어 있는 한 교는 무너지지 않는다.':'교주 위무강은 그 밤을 넘기지 못했다.');return ps.apply(null,t);}],null],
 siege:['정사대전',[ps('정파 연합이 마침내 움직였다. 무림맹주 청허가 직접 이끄는 오대세가와 구파일방의 연합군이 혈월봉 아래 진을 쳤다.','이 싸움의 결과에 따라 마교는 사라지거나, 다시 백 년을 버틸 것이다.')],'siege'],
 final:['혈월이 다시 뜨는 밤',[ps('셋째 해의 마지막 달. 처음 꿈에서 본 그 붉은 달이 다시 차오르고 있다.','돌이켜 보면 서른여섯 달이었다. 이름 없는 시종으로 시작해, 지금 이 자리까지 왔다.')],'ch6']
};

SK.pageom={n:'파검식',t:'절초',cost:9,mult:2.1,d:'일류 고수의 첫 절초. 상대의 검로를 부수며 들어간다.'};
SK.geomsa={n:'검사',t:'절초',cost:12,mult:.9,hits:3,d:'실처럼 가는 검기 세 줄기를 뿜는다.'};
SK.ganggi={n:'강기폭',t:'절초',cost:16,mult:3,pierce:true,d:'응축한 검강을 터뜨린다. 어떤 수에도 적중한다.'};
SK.tanji={n:'탄지신통',t:'절초',cost:10,mult:.7,hits:5,pierce:true,d:'손가락 끝으로 기를 튕겨 다섯 번 꿰뚫는다.'};
SK.singeom={n:'신검합일',t:'절초',cost:22,mult:4.2,pierce:true,d:'몸과 검이 하나가 되어 날아든다.'};
SK.muhyeong={n:'무형검',t:'절초',cost:24,mult:4.6,pierce:true,stun:true,d:'형체 없는 검. 맞은 자는 무엇에 베였는지도 모른 채 넋을 잃는다.'};
SK.jayeon={n:'자연검',t:'절초',cost:28,mult:6,pierce:true,leech:.3,mad:-20,d:'바람과 물과 산이 함께 벤다. 피해의 일부가 몸으로 돌아오고 마기가 씻긴다.'};
var RX=[{},
 {p:['경공 입문','몸이 가벼워진다. 회피가 「경공」이 되어 진기 소모가 3에서 1로 준다.'],ev:[['회피','경공','진기 소모 3 → 1']]},
 {p:['기감(氣感)','상대의 기의 흐름이 느껴진다. 수가 더 잘 읽힌다.'],sk:'pageom',ev:[['흘리기','사량발천근','흘린 뒤 반격이 강해진다']]},
 {p:['검기상인(劍氣傷人)','기를 실어 벤다. 기본 공격이 「검기」가 되어 피해 +15%.'],sk:'geomsa',ev:[['공격','검기','피해 +15%']]},
 {p:['환골탈태(換骨奪胎)','뼈와 근육이 새로 태어난다. 최대 체력 +25%, 마공의 마기 상승 30% 감소, 주화입마 저항.'],sk:'ganggi',ev:[['검기','검강','피해 +35%']]},
 {p:['반로환동(返老還童)','몸이 젊음을 되찾는다. 달마다 체력이 모두 회복되고, 전투 중 매 합 체력 3% 회복.'],sk:'tanji',ev:[['경공','이화접목','피하면 상대의 힘을 되돌려 준다']]},
 {p:['삼화취정 · 오기조원','세 꽃이 정수리에 모이고 다섯 기운이 근원으로 돌아간다. 최대 진기 +30, 전투 중 진기 회복 +5.'],sk:'singeom',ev:[['검강','심검','반드시 적중, 피해 +60%']]},
 {p:['생사초월(生死超越)','죽음의 문턱을 넘는다. 전투마다 한 번, 쓰러져도 체력 40%로 일어선다.'],sk:'muhyeong',ev:[['사량발천근','무형지기','모든 공격을 막고 반격한다']]},
 {p:['천인합일(天人合一)','하늘과 사람이 하나가 된다. 모든 피해 +30%, 받는 피해 -30%, 마기가 더는 쌓이지 않는다.'],sk:'jayeon',ev:[['심검','무위자연','피해 +100%'],['이화접목','허공답보','모든 공격을 피하고 되돌린다']]}];
var ATKN=['공격','공격','공격','검기','검강','검강','심검','심검','무위자연'],ATKM=[1,1,1,1.15,1.35,1.35,1.6,1.6,2];
var FLAV={
  0:['매화가 지고 있다. 총단의 아침은 늘 쇠 냄새로 시작한다.','낮은 길고 일은 많다. 그래도 칼은 오늘도 손에 있다.'],
  1:['여름 산은 습하고 뜨겁다. 땀과 피는 마르는 속도가 비슷하다.','장마 전의 바람이 연무장 흙먼지를 말아 올린다.'],
  2:['낙엽이 지는 소리가 발소리처럼 들린다.','가을 달이 밝다. 이상하게도 붉은빛이 돈다.'],
  3:['눈이 쌓여 연무장이 하얗다. 입김이 칼날 위에 서린다.','겨울 산은 조용하다. 누군가 쓰러져도 한참 뒤에야 알 것이다.']
};
var DEATHS={
  mission:['의뢰 중 쓰러지다','낯선 산길에서 숨이 멎었다. 이름 없는 시체는 아무도 거두지 않는다.'],
  rampage:['주화입마','마기가 혈맥을 찢었다. 마지막으로 본 것은 달이 아닌 붉은 천장이었다.'],
  eve:['혈월의 밤에 쓰러지다','어둠 속에서 칼이 날아왔다. 누구의 칼인지는 끝내 몰랐다. 연이의 비명이 먼저 멈췄다.'],
  eveDuel:['단목환의 칼 아래서','붉은 달 아래 두 칼이 부딪쳤고, 하나가 부러졌다. 당신의 칼이었다.'],
  servant:['쓰임을 다한 칼','선두에 서자마자 등 뒤에서 차가운 것이 박혔다. 단목환은 쓸모를 다한 칼을 오래 쥐지 않는다.'],
  siege:['산문 앞에서','정파의 칼이 가슴을 뚫었다. 쓰러지며 본 하늘에는 여전히 붉은 달이 걸려 있었다.'],
  caught:['서재에서 붙잡히다','호위를 이기지 못했다. 단목환의 서재 바닥에서 당신은 눈을 감았다.']
};
DEATHS.explore=['탐색 중 쓰러지다','낯선 곳에서 숨이 멎었다. 아무도 당신이 어디로 갔는지 몰랐다.'];DEATHS.final=['천마의 잔영 앞에서','혈월의 근원은 당신보다 오래되었다. 아직은.'];
