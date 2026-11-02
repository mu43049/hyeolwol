/* 혈월회귀록 이야기·사건·인물 대화. EVENTS 배열에 {m:개월,id,cond,run}을 추가하면 새 사건이 생긴다. */
function ach(id){P.ach=P.ach||{};if(P.ach[id]||!ACH[id])return;P.ach[id]=1;if(S&&S.alive)logE('event','업적 달성 · <b>'+ACH[id][0]+'</b>');}
function achCheck(){if(!S)return;var F=S.flags;
  if(F.danDead)ach('dan');if(S.month>=19&&F.masterAlive)ach('savior');if(S.month>=19)ach('night');if(F.siegeWon)ach('siege');
  if(F.smAlly)ach('smAlly');if(F.bwAlly)ach('bwAlly');if(S.weapon>=4)ach('weapon4');
  var b=0;for(var k in S.trust)if(S.trust[k]>=4)b++;if(b>=3)ach('bonds');
  if(Object.keys(MEM).every(function(m){return P.mem[m];}))ach('allMem');}
function tr(k){return S.trust[k]||0;}
function hurt(p){S.hp=Math.max(1,S.hp-Math.round(maxHp()*p));}
function done(t,k){afterAct(t,k||'event');}
function et(){return S.realm*.7;}
function efight(id,title,win,lethal,mul){fight(id,et()*(mul||1),{auto:true,title:title,spar:lethal===false,win:win,lose:lethal===false?function(){S.hp=Math.max(1,Math.round(maxHp()*.25));done('간신히 빠져나왔다. 몸이 성한 곳이 없다.','fail');}:function(){die('explore');}});}
function ore(n){S.items.ore=(S.items.ore||0)+n;}
function upSkill(n){var ks=Object.keys(S.skills).filter(function(k){return S.skills[k].s<12;});if(!ks.length)return '';ks.sort(function(a,b){return S.skills[b].s-S.skills[a].s;});var k=ks[0];S.skills[k].s=Math.min(12,S.skills[k].s+n);return esc(skn(k));}

function explore(k){
  P.exploreN=(P.exploreN||0)+1;S.flags['v_'+k]=1;
  if(Object.keys(LOCS).every(function(x){return S.flags['v_'+x];}))ach('allLoc');
  if(P.exploreN>=30)ach('explorer');
  if(k==='tomb'&&S.realm<3){S.hp=Math.max(1,Math.round(S.hp*.6));result('피의 문','<p>붉은 문 앞에 서자 피가 거꾸로 도는 것 같았다. 문이 당신을 밀어냈다. 절정에 이르기 전에는 들어갈 수 없다.</p>',function(){advance();},'loc_tomb');return;}
  var pool=ENC.filter(function(e){return e.loc===k&&(!e.cond||e.cond())&&!(e.once==='life'&&S.flags['enc_'+e.id])&&!(e.once==='save'&&P.encs&&P.encs[e.id]);});
  if(!pool.length){S.qi+=5;done(LOCS[k].n+'을(를) 한 바퀴 돌았지만 별일은 없었다.','event');return;}
  var tot=0;pool.forEach(function(e){tot+=e.w||1;});var r=Math.random()*tot,e=pool[0];
  for(var i=0;i<pool.length;i++){r-=pool[i].w||1;if(r<=0){e=pool[i];break;}}
  if(e.once==='life')S.flags['enc_'+e.id]=1;if(e.once==='save'){P.encs=P.encs||{};P.encs[e.id]=1;}
  scene(e.t,'<p>'+e.x+'</p>',e.ch(),'loc_'+k);
}
function doArena(r){
  var a=ARENA[r];
  fight(a[0],Math.max(0,S.realm*.5-.2+r*.15),{auto:true,spar:true,title:'혈투장 '+(5-r)+'위전',
    win:function(){S.arena=r+1;S.silver+=a[1];S.qi+=10+r*6;var t='혈투장에서 <b>'+ENM[a[0]].n+'</b>을(를) 꺾었다. 상금 <b>'+a[1]+'</b>냥.';
      if(r===4){learn('pacheon');ach('arena');t+=' 혈투장의 왕이 되었다. <b>파천일격</b>을 얻었다.';}afterAct(t,'fight');},
    lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.3));S.silver=Math.max(0,S.silver-20);afterAct('혈투장 모래 위에 쓰러졌다. 치료비로 은전 20냥이 나갔다.','fail');}});
}
var VIS2={
 kj:function(){scene('교주의 처소',npcHead('kj')+'<p>교주는 창가에 앉아 혈월봉을 내려다보고 있었다. 기침 소리가 길다.</p>',[
  {t:'차를 따른다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);gain('kj',1,'<p>찻물이 끓는 동안 교주는 말이 없었다. 다 마신 잔을 내려놓으며 그가 말했다. "좋은 손이다."</p>');}},
  {t:'무공을 묻는다',h:'내공 +15',f:function(){S.qi+=15;gain('kj',1,'<p>"힘은 쌓는 게 아니라 흐르게 하는 것이다." 교주가 손바닥을 펴자 방 안의 촛불이 일제히 기울었다.</p>');}}]);},
 sm:function(){scene('지붕 위',npcHead('sm')+'<p>사마령은 늘 그렇듯 지붕 위에 있었다. 당신이 올라오자 귀찮다는 듯 자리를 비켜 주었다.</p>',[
  {t:'그림자 수련을 함께한다',h:'내공 +10',f:function(){S.qi+=10;gain('sm',1,'<p>기척을 지우는 법을 배웠다. 사마령은 "아직 시끄러워"라고만 했다.</p>');}},
  {t:'술 한 병을 나눈다',h:'마기 -15',f:function(){S.mad=Math.max(0,S.mad-15);gain('sm',1,'<p>사마령은 술을 반이나 마시고도 얼굴색 하나 변하지 않았다. 대신 별 이름을 몇 개 알려 주었다.</p>');}}]);},
 bw:function(){scene('외당 뒤뜰',npcHead('bw')+'<p>백운은 아무도 없는 뒤뜰에서 검을 닦고 있었다. 칼날에 흰 천을 감은 채였다.</p>',[
  {t:'정파 이야기를 듣는다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);gain('bw',1,'<p>정파에도 굶는 아이가 있고, 마교에도 웃는 아이가 있다. 백운은 그걸 이제 알았다고 했다.</p>');}},
  {t:'검을 겨룬다',h:'내공 +12',f:function(){S.qi+=12;gain('bw',1,'<p>반듯한 검과 굽은 칼이 백 번 부딪쳤다. 둘 다 웃고 있었다.</p>');}}]);},
 cn:function(){scene('대장간',npcHead('cn')+'<p>망치 소리가 쉬지 않는다. 철노는 당신을 보지도 않고 풀무를 가리켰다.</p>',[
  {t:'풀무질을 돕는다',h:'은전 +10',f:function(){S.silver+=10;gain('cn',1,'<p>불이 하얗게 달아오를 때까지 풀무를 밟았다. 철노가 은전 몇 푼을 던져 주었다.</p>');}},
  {t:'쇠 이야기를 듣는다',h:'내공 +8',f:function(){S.qi+=8;gain('cn',1,'<p>"쇠도 사람도 두드려야 단단해진다. 너무 두드리면 부러지고." 철노는 그렇게만 말했다.</p>');}}]);},
 hs:function(){scene('서고',npcHead('hs')+'<p>한서생은 촛불 아래서 두루마리를 고치고 있었다. 당신을 보자 붓을 내려놓았다.</p>',[
  {t:'필사를 돕는다',h:'은전 +12',f:function(){S.silver+=12;gain('hs',1,'<p>밤새 글씨를 베꼈다. 한서생은 당신 글씨가 칼 같다고 했다.</p>');}},
  {t:'책 이야기를 나눈다',h:'내공 +10',f:function(){S.qi+=10;gain('hs',1,'<p>한서생은 오백 년 전 천마의 이야기를 들려주었다. 이상하게 익숙한 이야기였다.</p>');}}]);}
};
var MS2={
 kj:[{t:2,run:function(d){learn('cheon');result('천마의 구결',npcHead('kj')+'<p>교주가 손가락으로 당신의 이마를 짚었다. 뜨거운 것이 흘러들어 왔다. "내 대에서 끊길 줄 알았던 구결이다."</p><p><b>천마강신</b>을 얻었다.</p>',d);}},
     {t:4,run:function(d){S.flags.masterTrust=true;learnMem('kyoju');result('교주의 호패',npcHead('kj')+'<p>"나는 내 찻잔에 무엇이 들었는지 안다." 교주가 검은 호패를 내밀었다. "그 밤이 오면 이걸로 금위대를 불러라."</p>',d);}}],
 sm:[{t:2,run:function(d){learn('bido');result('비도술',npcHead('sm')+'<p>사마령이 손목을 털자 비도 네 자루가 나무에 일렬로 박혔다. "가르쳐 줄게. 대신 아무에게도 말하지 마."</p><p><b>비도술</b>을 얻었다.</p>',d);}},
     {t:4,run:function(d){S.flags.smAlly=true;learnMem('samaryeong');result('사마령의 고백',npcHead('sm')+'<p>"단목환이 나한테 교주를 죽이라고 했어. 혈월이 뜨는 밤에." 사마령이 처음으로 눈을 피했다. "...그날 네 편에 설게."</p>',d);}}],
 bw:[{t:3,run:function(d){learn('cheongheo');result('청허검법',npcHead('bw')+'<p>백운이 나뭇가지로 땅에 검로를 그렸다. "정파의 검이오. 마기를 다스리는 데 도움이 될 거요."</p><p><b>청허검법</b>을 얻었다.</p>',d);}},
     {t:4,run:function(d){S.flags.bwAlly=true;result('백운의 약속',npcHead('bw')+'<p>"전쟁이 오면 맹주께 직접 말하겠소. 이 산에도 사람이 산다고."</p>',d);}}],
 cn:[{t:2,run:function(d){S.flags.forgeDisc=true;ore(1);result('철노의 인정',npcHead('cn')+'<p>"손이 쓸 만하군. 앞으로 쇠값은 덜 받겠다." 철노가 운철 한 덩이를 던져 주었다.</p><p>대장간 비용이 줄었다. 운철 +1.</p>',d);}},
     {t:4,run:function(d){learn('cheolgol');result('철골공',npcHead('cn')+'<p>"쇠를 두드리듯 몸을 두드려라." 철노는 달군 쇠 앞에서 웃통을 벗었다.</p><p><b>철골공</b>을 얻었다.</p>',d);}}],
 hs:[{t:2,run:function(d){learn('gwiwon');result('귀원심법',npcHead('hs')+'<p>한서생이 낡은 책 한 권을 밀어 주었다. "이 서고에서 제일 지루한 책이오. 그래서 아무도 안 읽었지."</p><p><b>귀원심법</b>을 얻었다.</p>',d);}},
     {t:4,run:function(d){learnMem('lore');result('금지된 연대기',npcHead('hs')+'<p>"이건 교주님께도 보여 드린 적 없소." 한서생이 펼친 마지막 장. 「천마는 혈월봉 북쪽 절벽 아래 잠들었다.」</p>',d);}}]
};
function evLib(){scene('서고의 불빛','<p>한밤중 서고에 불이 켜져 있다. 마른 서생 하나가 촛불 아래서 두루마리를 고치고 있다. "도와줄 손이 하나 필요하던 참이오."</p>',[
  {t:'돕는다',h:'한서생과 안면을 튼다 · 서고 탐색이 열린다',f:function(){S.flags.hs=true;gain('hs',1,'<p>밤새 두루마리를 정리했다. 한서생은 이름을 묻더니, 없다는 대답에 한참 웃었다. "그럼 서고에선 그냥 \'손\'이라 부르겠소."</p>');}},
  {t:'모른 척 지나간다',h:'',f:function(){advance();}}],'loc_lib');}
function evArena(){scene('혈투장의 초대','<p>외당 게시판에 붉은 방이 붙었다. 「혈투장 개장. 이기면 은전, 지면 망신. 죽어도 책임지지 않음.」</p>',[
  {t:'이름을 적는다',h:'의뢰에 혈투장이 열린다 · 내공 +5',f:function(){S.flags.arena=true;S.arena=0;S.qi+=5;result('혈투장','<p>모래 냄새와 피 냄새가 뒤섞인 지하 투기장. 다섯 개의 이름이 벽에 걸려 있다. 맨 위는 귀왕.</p>',function(){advance();},'arena');}},
  {t:'나중에 생각한다',h:'의뢰에 혈투장이 열린다',f:function(){S.flags.arena=true;S.arena=0;advance();}}],'arena');}
function evForge(){scene('대장간의 노인','<p>산문 아래 대장간에서 망치 소리가 그치지 않는다. 노인이 당신의 손을 보고 혀를 찼다. "칼도 없이 마교에서 버티겠다고?"</p>',[
  {t:'풀무질을 돕는다',h:'철노와 안면을 튼다 · 운철 +1',f:function(){S.flags.cn=true;ore(1);gain('cn',1,'<p>철노는 말없이 운철 한 덩이를 던져 주었다. "다음에 가져와. 칼로 만들어 주지." 저잣거리에서 대장간을 쓸 수 있다.</p>');}},
  {t:'지나간다',h:'대장간은 저잣거리에서 쓸 수 있다',f:function(){S.flags.cn=true;advance();}}]);}
function evShadow(){scene('그림자','<p>교주의 처소 지붕 위에 검은 그림자가 엎드려 있다. 눈이 마주쳤다. 붉은 눈이다.</p>',[
  {t:'말을 건다',h:'사마령과 안면을 튼다',f:function(){S.flags.sm=true;gain('sm',1,'<p>"눈이 좋네." 그림자가 소리 없이 내려섰다. 그림자 호법, 사마령이라 했다. "오늘 본 건 잊어. 그럼 친구가 될 수도 있지."</p>');}},
  {t:'경비에게 알린다',h:'강적 사마령과 싸운다 · 지면 죽는다',f:function(){fight('sm',0,{title:'지붕 위',win:function(){S.flags.smDead=true;S.silver+=60;result('그림자가 사라지다','<p>사마령은 피를 흘리며 어둠 속으로 사라졌다. 경비대장이 은전 60냥을 내렸다.</p>',function(){advance();});},lose:function(){die('caught');}});}},
  {t:'못 본 척한다',h:'',f:function(){advance();}}]);}
function evAudience(){scene('교주 알현','<p>교주 위무강이 당신을 불렀다. 병색이 짙은 얼굴인데 눈빛만은 칼 같다. "신년제에 내 곁에 선 아이로구나."</p>',[
  {t:'무릎을 꿇는다',h:'교주와 인연을 맺는다',f:function(){S.flags.kj=true;gain('kj',1,'<p>"일어나라. 내 곁엔 무릎 꿇는 자가 너무 많다." 교주는 찻잔을 하나 더 꺼냈다.</p>');}}],'throne');}
function evBaekun(){scene('낯선 교도','<p>외당에 새로 들어온 교도 백운. 칼 쓰는 법이 너무 반듯하다. 밤에 그가 흰 띠를 꺼내 매만지는 것을 보았다.</p>'+(hasMem('baekun')?'<p>기억이 말한다. 저자는 정파의 첩자다.</p>':''),[
  {t:'비밀을 지켜 준다',h:'백운과 인연을 맺는다',f:function(){S.flags.bw=true;gain('bw',2,'<p>"...왜 나를 고발하지 않소?" 백운은 오래 당신을 바라보았다. "이 빚은 꼭 갚겠소."</p>');}},
  {t:'고발하고 직접 벤다',h:'강적 · 지면 죽는다 · 이기면 은전 100',f:function(){fight('bw',0,{title:'외당 뒤뜰',win:function(){S.flags.bwDead=true;S.silver+=100;logE('fight','정파 첩자 <b>백운</b>을 베었다.');result('첩자의 최후','<p>백운은 흰 띠를 움켜쥔 채 쓰러졌다. 단목환의 사람이 와서 시체를 끌고 갔다.</p>',function(){advance();});},lose:function(){die('caught');}});}},
  {t:'못 본 척한다',h:'',f:function(){advance();}}]);}
function evHunt(){scene('흑림 토벌','<p>흑림의 마수가 산문 아래 마을을 덮쳤다. 외당에 토벌령이 떨어졌다.</p>',[
  {t:'토벌대에 지원한다',h:'강적 · 운철 +2 · 은전 60',f:function(){fight('beast',S.realm*.6+.4,{title:'흑림 토벌',heal:.3,win:function(){ore(2);S.silver+=60;S.qi+=20;logE('fight','흑림의 마수를 토벌했다.');result('토벌','<p>마수의 머리를 산문에 걸었다. 운철 2덩이와 은전 60냥이 상으로 내려왔다.</p>',function(){advance();});},lose:function(){die('explore');}});}},
  {t:'몸이 좋지 않다고 빠진다',h:'마기 +5',f:function(){S.mad=clamp(S.mad+5,0,100);advance();}}],'loc_forest');}
function evWave(){var F=S.flags;scene('첫 번째 파도','<p>정파 선발대가 산 아래 초소를 쳤다. 초소를 지키던 외당 교도들이 쫓겨 올라오고 있다.</p>',[
  {t:'초소를 되찾으러 간다',h:'전투 · 공적'+(F.plans?' · 진법도로 허점을 안다':''),f:function(){fight('vanguard',S.realm*.4,{title:'산 아래 초소',heal:.2,hpMul:F.plans?.75:1,win:function(){F.wave1=true;S.silver+=50;S.qi+=25;logE('fight','산 아래 초소를 되찾았다.');result('초소 탈환','<p>흰 깃발이 꺾였다. 외당 교도들이 처음으로 당신 이름을 물었다.</p>',function(){advance();});},lose:function(){die('siege');}});}},
  {t:'총단 방비를 굳힌다',h:'회춘단 +2',f:function(){S.items.pill+=2;advance();}}],'siege');}
function evSaint(){scene('검성의 도전','<p>정파의 검성 남궁진이 홀로 산문 앞에 섰다. "마교에 검을 쥔 자가 있다면 나와라. 한 사람만 베고 돌아가겠다."</p>',[
  {t:'나선다',h:'최강의 적 · 져도 목숨은 남는다',f:function(){fight('gs',0,{title:'산문 앞 결투',spar:true,heal:.5,win:function(){S.flags.gsWin=true;S.qi+=60;ach('gs');logE('fight','검성 <b>남궁진</b>을 꺾었다.');result('검성을 꺾다','<p>남궁진의 검끝이 처음으로 땅에 닿았다. 그는 한참 웃더니 고개를 숙였다. "다음엔 전장에서 보겠군." 내공이 60 늘었다.</p>',function(){advance();});},lose:function(){S.hp=1;result('검성의 자비','<p>검끝이 목젖 앞에서 멈췄다. "아직 멀었다." 그는 검을 거두고 돌아섰다.</p>',function(){advance();});}});}},
  {t:'나서지 않는다',h:'',f:function(){advance();}}],'siege');}
function evTomb(){S.flags.tomb=true;learnMem('lore');result('천마총의 문','<p>정사대전이 끝난 밤, 산이 울었다. 북쪽 절벽이 갈라지며 붉은 빛이 새어 나온다.</p><p>탐색에 <b>천마총</b>이 열렸다. 절정에 이른 몸이어야 버틸 수 있다.</p>',function(){advance();},'loc_tomb');}
function evLast(){var b=[];
  if(tr('sm')>=3&&!S.flags.smDead)b.push('사마령이 지붕 위에서 당신 이름을 불렀다. 당신에게 이름이 없다는 걸 알면서도.');
  if(tr('bw')>=3&&!S.flags.bwDead)b.push('백운에게서 편지가 왔다. 「끝이 오면, 함께 끝을 고릅시다.」');
  if(tr('yn')>=2&&!S.flags.purge)b.push('연이가 말린 감을 또 내밀었다. 이번엔 두 개였다.');
  if(!b.length)b.push('혈월봉에 눈이 내린다. 서른넷째 달. 끝이 가깝다.');
  result('마지막 겨울',ps.apply(null,b)+'<p>체력이 모두 회복되었다.</p>',function(){S.hp=maxHp();advance();},'ch6');}
function ev36(){
  var F=S.flags,ch=[];
  var body=ps('셋째 해의 마지막 달. 혈월이 다시 차오른다. 처음 그 봄으로부터 서른여섯 번째 달이다.','지금 서 있는 자리에서, 이 생을 어떻게 끝낼지 정할 때다.');
  var canTrue=hasMem('cheonma')&&hasMem('core')&&F.tombDone&&F.masterAlive;
  if(canTrue)ch.push({t:'혈월의 핵을 부순다',h:'[진실] 천마의 잔영과 싸운다',c:'primary',f:function(){fight('cm',0,{title:'혈월의 핵',heal:1,win:function(){finish('true');},lose:function(){die('final');}});}});
  else if(hasMem('core'))ch.push({t:'혈월의 핵을 부순다',off:'교주가 살아 있고, 이번 생에 핵을 직접 만져야 한다',f:function(){}});
  if(F.throne||(F.heir&&F.masterAlive))ch.push({t:'옥좌에 오른다',h:'천마의 자리를 잇는다',f:function(){finish('throne');}});
  if(tr('sm')>=4&&!F.smDead)ch.push({t:'사마령과 함께 그림자로 사라진다',h:'보이지 않는 곳에서 교를 쥔다',f:function(){finish('shadow');}});
  if(tr('bw')>=4&&!F.bwDead)ch.push({t:'백운과 함께 화친을 맺는다',h:'두 깃발을 나란히 세운다',f:function(){finish('peace');}});
  ch.push({t:'마교를 지킨다',h:'혈월봉의 사람으로 남는다',f:function(){finish('guard');}});
  ch.push({t:'산을 내려간다',h:'이름 없는 사람으로',f:function(){if(tr('yn')>=2&&!F.purge)F.fleeWith=true;finish('flee');}});
  scene('혈월이 다시 뜨는 밤',body,ch,'ch6');
}
function chapInfo(i){return (S&&S.route&&CHR[S.route]&&CHR[S.route][i])||CH[i];}
function routeName(){return S.route==='ma'?'천마의 길':(S.route==='jeong'?'정파의 길':'');}
function freeDodge(){return sk('heuk')||sk('gwiyeong')||sk('gunrim')||sk('jeun');}
function counterK(){return sk('gunrim')?.9:((sk('gwiyeong')||sk('jeun'))?.7:.4);}
function demonCount(){return Object.keys(S.skills).filter(function(k){return SK[k].mad>0;}).length;}
function ruler(){var F=S.flags;if(F.danRule&&!F.danDead)return '단목환이 옥좌에 앉아 있다. 그의 사람들이 총단의 모든 문을 지킨다.';if(F.masterAlive)return '교주 위무강은 살아남았다. 병든 몸이지만 옥좌는 아직 그의 것이다.';if(F.throne)return '옥좌는 당신의 것이 되었다. 장로들은 아직 당신을 시험하는 눈으로 본다.';return '교주도 단목환도 없는 총단은 장로회가 겨우 붙들고 있다.';}

function news(){var r=S.route&&NEWS[S.route]&&NEWS[S.route][S.month];return r||NEWS.n[S.month]||'';}

function evTrial(){pages('혈로행',[ps('외당의 시종 몇에게 정식 교도가 될 기회가 주어졌다. 시험의 이름은 혈로행. 혈월봉 뒤편 골짜기를 사흘 동안 홀로 건너는 것이다.','살아서 돌아오는 자에게는 교의 첫 마공이 주어진다. 돌아오지 못한 자는 처음부터 없던 사람이 된다.')],'court',function(){
  scene('혈로행','<p>골짜기 입구에서 독고강이 횃불을 건넸다. "늑대보다 무서운 건 네 안에서 올라오는 겁이다."</p>',[
   {t:'혈로행에 나선다',h:'전투 · 살아 돌아오면 첫 마공',f:function(){fight('wolf',S.realm*.6,{title:'혈로행',spar:true,heal:.3,win:trialWin,lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.3));result('실패','<p>셋째 날 새벽, 피투성이로 골짜기를 기어 나왔다. 독고강은 아무 말 없이 등을 돌렸다. 정식 교도는 되지 못했다.</p>',function(){advance();});}});}},
   {t:'시종으로 남는다',h:'아무 일도 없다',f:function(){advance();}}]);});}
function trialWin(){S.flags.gyodo=true;logE('event','혈로행을 통과해 <b>정식 교도</b>가 되었다.');
  scene('교의 첫 마공','<p>사흘 만에 골짜기를 빠져나오자 장로 하나가 세 권의 얇은 책을 내밀었다. "하나만 골라라. 마공은 욕심을 먹고 자란다. 둘을 쥐면 둘 다 잃는다."</p>',[
   {t:'마혼장',h:'기본 마공 · 진기 적게 듦',f:function(){learn('mahon');advance();}},
   {t:'흑살장',h:'관통하는 장력 · 어떤 수에도 적중',f:function(){learn('heuksal');advance();}},
   {t:'혈영신공',h:'세 번 치는 핏빛 잔상 · 출혈',f:function(){learn('hyeolyeong');advance();}}]);}
function evCross(){var F=S.flags,bw=F.bw&&!F.bwDead;
  pages('갈림길',[function(){return ps('혈월의 밤이 지나고 석 달. 총단은 겉으로는 평온을 되찾았다.',ruler(),'그러나 당신은 안다. 이대로 가면 서른째 달에 정파가 오고, 이 산은 다시 피로 젖는다.');},
    function(){return ps('그날 밤, 두 개의 제안이 당신을 찾아왔다.','하나는 교의 깊은 곳에서 왔다. 천마신공의 첫 구결이 적힌 붉은 비단. 「천마의 길을 걸을 자격이 있는 자에게.」 보낸 이의 이름은 없었다.','다른 하나는 산 아래에서 왔다. '+(bw?'백운의 글씨였다. 「무림맹이 당신을 받아들일 준비가 되어 있소. 이 굴레를 끝내고 싶다면, 내려오시오.」':'정파의 인장이 찍힌 쪽지. 「마교를 버리고 내려오는 자는 무림맹이 받아 준다.」'));}],'ch4',function(){
   scene('갈림길','<p>붉은 비단과 흰 쪽지가 탁자 위에 나란히 놓여 있다. 어느 쪽을 집든, 다시는 지금의 자리로 돌아올 수 없다.</p>',[
    {t:'천마의 길을 걷는다',h:'마도 루트 · 마공이 강해지고 천마의 자리를 노린다',f:function(){S.route='ma';learn('mara');logE('event','<b>천마의 길</b>을 걷기로 했다.');
      result('마도','<p>붉은 비단을 펼치자 글자들이 피처럼 번져 손바닥으로 스며들었다. <b>마라신공</b>. 천마의 길을 걷는 자가 처음 익히는 심법이다.</p><p>이제부터 마기는 당신을 해치는 독이 아니라 쥐고 다스릴 힘이다. 마기가 폭주해도 살아남을 확률이 오른다.</p>',function(){advance();},'ch4');}},
    {t:'정파로 넘어간다',off:S.mad>=60?'마기가 너무 짙어 정파가 받아 주지 않는다 (마기 60 미만 필요)':null,h:'정파 루트 · 마교를 떠나 무림맹주를 노린다',f:function(){
      result('하산','<p>새벽, 짐 하나 없이 산문을 나섰다. 연이에게도 말하지 못했다.</p><p>산길 중턱에서 횃불이 보였다. 마교 추격대였다. 배신자는 살려 보내지 않는다.</p>',function(){
        fight('chaser',S.realm*.6,{title:'하산',heal:.3,win:function(){S.route='jeong';logE('event','마교를 떠나 <b>정파의 길</b>에 들어섰다.');
          result('흰 옷','<p>추격대를 베고 산을 내려왔다. 산 아래 마을 어귀에서 '+(bw?'백운이':'정파의 무인 둘이')+' 기다리고 있었다. 흰 옷 한 벌이 건네졌다.</p><p>검은 옷을 벗자 몸이 이상하게 가벼웠다. 그리고 조금, 추웠다.</p>',function(){advance();},'alliance');},lose:function(){die('caught');}});},'ch4');}},
    {t:'마교에 남아 지금 자리를 지킨다',h:'본래의 길',f:function(){logE('event','어느 쪽도 고르지 않고 마교에 남았다.');advance();}}]);});}
function evMTest(){pages('장로회',[function(){return ps('천마의 길을 걷겠다는 자는 먼저 장로회를 넘어야 한다. 천마신교의 일곱 장로는 교주가 아니라 천마의 법을 따른다.',S.flags.masterAlive?'교주는 당신을 후계로 세우겠다고 장로회에 알렸다. 장로들은 증명을 원했다.':(S.flags.danRule&&!S.flags.danDead?'단목환은 장로회를 손에 쥐고 있다. 그를 넘으려면 장로들부터 꺾어야 한다.':'옥좌가 빈 지금, 장로회가 곧 교의 법이다.'));}],'throne',function(){
  scene('장로의 시험','<p>장로회 대청, 가장 나이 든 장로가 지팡이를 내려놓고 일어섰다. "천마의 길을 걷겠다고? 그럼 늙은이 하나쯤은 넘어 보아라."</p>',[
   {t:'장로와 겨룬다',h:'강적 · 져도 죽지는 않는다 · 이기면 천마군림보',f:function(){fight('elder',S.realm*.3,{title:'장로회 대청',spar:true,heal:.4,win:function(){S.flags.elders=true;learn('gunrim');logE('fight','장로회의 시험을 통과했다.');result('천마의 걸음','<p>장로의 지팡이가 부러졌다. 그는 한참 웃더니 땅에 발자국 하나를 남겼다. "따라 걸어 보아라." <b>천마군림보</b>를 얻었다.</p>',function(){advance();});},lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.3));result('아직 이르다','<p>"아직 멀었다." 장로는 지팡이로 당신의 어깨를 두드리고 돌아섰다.</p>',function(){advance();});}});}},
   {t:'고개를 숙이고 물러난다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);advance();}}]);});}
function evMBlood(){pages('혈지',[ps('혈월봉 북쪽, 천마총으로 가는 길목에 혈지라는 연못이 있다. 역대 천마들이 마공을 완성할 때 몸을 담갔다는 붉은 물이다.','물에 들어간 자의 절반은 살아 나오지 못했다. 나머지 절반은 사람이 아니게 되어 나왔다고 한다.')],'bloodpool',function(){
  scene('혈지','<p>연못이 숨을 쉬듯 부풀었다 가라앉는다. 수면 아래에서 무언가 당신을 부른다.</p>',[
   {t:'혈지에 몸을 담근다',h:'혈룡참 · 마기 +30 · 실패하면 크게 다친다',f:function(){S.mad=clamp(S.mad+30,0,100);if(Math.random()<.55+S.realm*.07){learn('hyeolryong');S.qi+=40;logE('skill','혈지에서 <b>혈룡참</b>을 깨우쳤다.');result('붉은 용','<p>핏물 속에서 용 한 마리가 눈을 떴다. 그것이 당신의 팔을 타고 올라왔다. <b>혈룡참</b>을 얻었다. 내공이 40 늘었다.</p>',function(){advance();},'bloodpool');}else{hurt(.5);result('삼켜지다','<p>물이 당신을 끌어내렸다. 정신을 차렸을 때는 연못가에 피를 토하며 쓰러져 있었다.</p>',function(){advance();},'bloodpool');}}},
   {t:'물 한 모금만 마신다',h:'시혈마공 · 마기 +12',f:function(){S.mad=clamp(S.mad+12,0,100);learn('sihyeol');result('피의 맛','<p>비린 물이 목을 넘어가자 상처들이 욱신거리며 뜨거워졌다. 피를 흘릴수록 강해지는 마공, <b>시혈마공</b>을 얻었다.</p>',function(){advance();},'bloodpool');}},
   {t:'돌아선다',h:'',f:function(){advance();}}]);});}
function evMPurge(){var F=S.flags,bw=F.bw&&!F.bwDead;pages('첩자 사냥',[ps('정사대전을 앞두고 총단에 정파의 첩자가 숨어 있다는 밀고가 들어왔다. 장로회는 그 일을 천마의 길을 걷는 자에게 맡겼다.',bw?'명단 맨 위에 백운의 이름이 있었다.':'명단에는 낯선 이름 다섯이 적혀 있었다.')],null,function(){
  var ch=[];
  if(bw){ch.push({t:'백운을 몰래 놓아준다',h:'백운 신뢰 +2 · 마기 -10',f:function(){F.bwFreed=true;S.mad=Math.max(0,S.mad-10);gain('bw',2,'<p>한밤중 뒷문을 열어 주었다. 백운은 한참 당신을 바라보다 고개를 숙였다. "이 은혜, 전장에서 갚겠소."</p>');}});
    ch.push({t:'백운을 벤다',h:'강적 · 지면 죽는다 · 마기 +15',f:function(){fight('bw',0,{title:'첩자 사냥',win:function(){F.bwDead=true;S.mad=clamp(S.mad+15,0,100);learn('seophon');logE('fight','첩자 <b>백운</b>을 베었다.');result('흰 띠','<p>백운은 흰 띠를 움켜쥔 채 쓰러졌다. 그의 품에서 정파의 섭혼술을 파훼하려던 기록이 나왔다. 거꾸로 읽으니 마공이었다. <b>섭혼대법</b>을 얻었다.</p>',function(){advance();});},lose:function(){die('caught');}});}});}
  else ch.push({t:'첩자들을 소탕한다',h:'전투 · 이기면 섭혼대법',f:function(){fight('swordsman',S.realm*.6,{title:'첩자 사냥',heal:.3,win:function(){learn('seophon');S.silver+=60;logE('fight','총단의 첩자들을 소탕했다.');result('심문','<p>살아남은 첩자를 심문하며 넋을 빼앗는 법을 익혔다. <b>섭혼대법</b>을 얻었다. 장로회가 은전 60냥을 내렸다.</p>',function(){advance();});},lose:function(){die('caught');}});}});
  ch.push({t:'명단을 태운다',h:'아무도 잡지 않는다',f:function(){advance();}});
  scene('첩자 사냥','<p>명단을 쥔 손에 땀이 밴다. 이 이름들을 어떻게 할지는 당신 손에 달렸다.</p>',ch);});}
function evMWar(){pages('전쟁 준비',[ps('정파 연합의 깃발이 산 아래 마을까지 내려왔다. 이제 당신의 말에 움직이는 교도가 수백이다.','장로들이 묻는다. 어떻게 싸울 것인가.')],'siege',function(){
  scene('군령','<p>탁자 위에 혈월봉 지도가 펼쳐져 있다.</p>',[
   {t:'산길에 독을 푼다',h:'정사대전의 적이 약해진다 · 마기 +10',f:function(){S.flags.strat='poison';S.mad=clamp(S.mad+10,0,100);logE('event','산길에 독을 풀었다.');advance();}},
   {t:'야습으로 선봉을 친다',h:'지금 전투 · 이기면 결전이 크게 수월해진다',f:function(){fight('vanguard',S.realm*.4,{title:'야습',heal:.2,win:function(){S.flags.strat='raid';logE('fight','야습으로 정파 선봉을 무너뜨렸다.');result('야습','<p>정파 선봉의 막사가 불타올랐다. 결전의 날, 적은 반쯤 무너진 채로 올라올 것이다.</p>',function(){advance();});},lose:function(){die('siege');}});}},
   {t:'총단에서 농성한다',h:'회춘단 +3',f:function(){S.flags.strat='hold';S.items.pill+=3;advance();}}]);});}
function evMSiege(){var F=S.flags,mul=F.strat==='raid'?.65:(F.strat==='poison'?.8:1);pages('혈해',[ps('서른째 달. 정파 연합이 산문을 넘었다. 이번에는 당신이 교도들의 맨 앞에 선다.','적의 선두에 흰 옷의 검객이 있었다. 검성 남궁진. "네가 그 시종이었나. 결국 마도로 들어섰군."')],'siege',function(){
  scene('혈해','<p>뒤에서 수백의 교도가 당신의 이름 없는 등을 바라보고 있다.</p>',[
   {t:'검성과 맞선다',h:'최강의 적 · 지면 죽는다'+(mul<1?' · 준비한 계책이 통한다':''),c:'primary',f:function(){fight('gs',0,{title:'혈해',heal:.5,hpMul:mul,win:function(){F.siegeWon=true;F.gsDead=true;ach('gs');logE('fight','검성 <b>남궁진</b>을 베고 정파를 물리쳤다.');result('혈해를 건너다','<p>남궁진의 검이 부러졌다. 그가 쓰러지자 흰 깃발들이 한꺼번에 무너졌다. 교도들의 함성이 산을 흔들었다. 처음으로 누군가 당신을 천마라고 불렀다.</p>',function(){advance();},'siege');},lose:function(){die('siege');}});}},
   {t:'교도들을 버리고 홀로 빠져나간다',h:'이름 없는 사람으로',f:function(){finish('flee');}}]);});}
function evMCall(){pages('천마의 부름',[ps('천마총이 열린 뒤로 밤마다 같은 목소리가 들린다. "오너라. 내 이름을 이을 자여."','목소리는 회귀의 꿈보다 더 오래된 것 같았다.')],'loc_tomb',function(){
  scene('천마의 부름','<p>천마총 가장 깊은 계단 앞. 붉은 빛이 맥박처럼 뛴다.</p>',[
   {t:'부름에 응한다',off:S.realm<4?'초절정 이상이어야 버틴다':null,h:'천마신공 · 마기 +20'+(S.mad>=60?' · 마기가 짙어 해체대법까지 깨우친다':''),f:function(){var deep=S.mad>=60;S.mad=clamp(S.mad+20,0,100);learn('cheonmaSG');if(deep)learn('haeche');S.flags.called=true;logE('skill','천마총에서 <b>천마신공</b>을 이었다.');
     result('천마신공','<p>계단 끝 석실에서 스물셋 천마의 그림자가 한꺼번에 당신을 내려다보았다. 그들의 구결이 머릿속으로 쏟아져 들어왔다. <b>천마신공</b>을 얻었다.'+(deep?' 그리고 몸을 허물어 모든 것을 거는 금지된 초식, <b>천마해체대법</b>까지.':'')+'</p>',function(){advance();},'loc_tomb');}},
   {t:'귀를 막는다',h:'마기 -20',f:function(){S.mad=Math.max(0,S.mad-20);advance();}}]);});}
function evMFinal(){var F=S.flags,canTrue=hasMem('cheonma')&&hasMem('core')&&F.tombDone&&F.masterAlive;
  pages('천마군림',[PRE.final[1][0],ps('천마총 가장 깊은 곳. 천마의 잔영이 옥좌에 앉아 당신을 기다리고 있었다.','"천마의 이름을 원하느냐. 그렇다면 나를 삼켜라. 혈월과 함께, 영원히."')],'ch6',function(){
   var ch=[{t:'잔영을 삼키고 천마가 된다',h:'천마의 잔영과 싸운다 · 지면 죽는다',c:'primary',f:function(){fight('cm',0,{title:'천마군림',heal:1,hpMul:F.called?.85:1,win:function(){finish('cheonma');},lose:function(){die('final');}});}}];
   if(canTrue)ch.push({t:'잔영을 삼키지 않고 혈월의 핵을 부순다',h:'[진실] 굴레를 끊는다',f:function(){fight('cm',0,{title:'혈월의 핵',heal:1,win:function(){finish('true');},lose:function(){die('final');}});}});
   ch.push({t:'천마총을 봉인하고 산을 내려간다',h:'이름 없는 사람으로',f:function(){finish('flee');}});
   scene('천마의 옥좌','<p>잔영이 손을 내민다. 그 손을 잡으면 당신은 이름을 얻는다. 천마라는 이름을.</p>',ch,'ch6');});}
function evJSuspect(){var memN=Object.keys(P.mem).length;pages('무림맹의 의심',[ps('무림맹 총단 백련각. 마교에서 넘어온 자를 맞는 정파의 눈빛은 차가웠다.','맹주 청허는 백발이 성성한 노인이었다. 그는 오래 당신을 바라보다 입을 열었다. "마교의 아이가 왜 정파로 왔는가. 거짓을 말하면 이 자리에서 목이 떨어진다."')],'alliance',function(){
  function accept(t){S.flags.jTrust=true;S.mad=Math.max(0,S.mad-50);learn('jeongsim');logE('event','무림맹이 당신을 받아들였다. 세수역근으로 마기를 씻었다.');result('세수역근',t+'<p>사흘 밤낮 소림의 세수역근을 받았다. 뼈마디마다 박힌 마기가 땀과 피로 빠져나왔다. 마기가 크게 줄고 <b>정심공</b>을 얻었다.</p>',function(){advance();},'alliance');}
  scene('백련각','<p>대청 양옆으로 오대세가의 가주들이 늘어서 있다. 몇은 이미 칼자루에 손을 얹고 있다.</p>',[
   {t:'혈월과 회귀에 대해 모두 털어놓는다',h:memN>=3?'기억이 충분하다 · 신뢰를 얻는다':'기억이 부족하면 믿어 주지 않는다',f:function(){if(memN>=3)accept('<p>당신이 혈월의 밤과 단목환의 밀약, 교주의 독까지 하나하나 맞히자 대청이 조용해졌다. 청허가 천천히 고개를 끄덕였다. "하늘이 굴레를 끊으라고 보낸 아이로구나."</p>');else{hurt(.3);result('불신','<p>"미친 소리로군." 가주 하나가 당신을 걷어찼다. 청허가 말리지 않았다면 목이 떨어졌을 것이다. 당신은 감시를 받으며 맹에 머물게 되었다.</p>',function(){advance();},'alliance');}}},
   {t:'단목환의 밀서를 내민다',off:S.items.letter<1?'밀서가 없다':null,h:'확실한 증거 · 신뢰를 얻는다',f:function(){accept('<p>밀서를 읽은 청허의 손이 떨렸다. "맹 안에 단목환과 손잡은 자가 있었다니." 그는 당신을 일으켜 세웠다.</p>');}},
   {t:'마교의 내부 사정을 판다',h:'신뢰를 얻는다 · 옛 인연을 판다',f:function(){S.flags.soldOut=true;S.trust.dg=0;S.trust.yn=0;accept('<p>외당의 경비 교대, 무기고의 위치, 장로들의 약점. 당신이 아는 것을 모두 말했다. 가주들의 눈빛이 조금 누그러졌다. 연이의 얼굴이 떠올랐지만 고개를 저었다.</p>');}}]);});}
function evJWudang(){pages('무당산',[ps('세수역근을 마친 당신을 백운이 무당산으로 데려갔다. 안개 낀 자소궁 마당에서 늙은 도사 하나가 허공에 태극을 그리고 있었다.','"마교의 칼은 끊으려 하고, 무당의 검은 이으려 한다." 도사가 눈을 감은 채 말했다.')],'wudang',function(){
  scene('자소궁','<p>도사의 검끝이 그리는 원이 끝없이 이어진다.</p>',[
   {t:'태극의 이치를 배운다',h:'태극검법 · 마기 -10',f:function(){learn('taegeuk');S.mad=Math.max(0,S.mad-10);result('태극','<p>한 달 동안 원만 그렸다. 어느 날 칼끝이 저절로 원을 그리기 시작했다. <b>태극검법</b>을 얻었다.</p>',function(){advance();},'wudang');}},
   {t:'검을 겨루자고 청한다',h:'강적 · 져도 죽지 않는다 · 이기면 태극검법과 내공 +40',f:function(){fight('taoist',S.realm*.5,{title:'자소궁',spar:true,heal:.3,win:function(){learn('taegeuk');S.qi+=40;result('일합','<p>도사가 처음으로 눈을 떴다. "마교의 칼로 태극을 베다니." 그가 남긴 검로에서 <b>태극검법</b>을 익혔다.</p>',function(){advance();},'wudang');},lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.4));learn('taegeuk');result('패배','<p>칼이 원 속으로 빨려 들어갔다. 진 뒤에야 보였다. 그것이 <b>태극검법</b>이었다.</p>',function(){advance();},'wudang');}});}}]);});}
function evJWave(){var t=tr('dg');pages('선봉',[ps('정파 연합의 첫 진격. 당신은 마교의 길을 아는 자로서 선봉에 섰다. 산 아래 초소, 지난 생에 당신이 지켰던 바로 그곳이다.','초소를 지키는 자는 외당 교관 독고강이었다. 한쪽 팔뿐인 사내가 당신을 알아보았다. "...너였냐."')],'siege',function(){
  scene('옛 교관','<p>독고강이 목도 대신 진검을 쥐고 있다. 그의 뒤에는 외당의 어린 교도들이 떨고 있다.</p>',[
   {t:'독고강과 싸운다',h:'전투 · 지면 죽는다',f:function(){fight('dg',S.realm*.6,{title:'산 아래 초소',heal:.3,win:function(){S.flags.dgSpared=true;S.flags.wave1=true;logE('fight','산 아래 초소에서 <b>독고강</b>을 꺾었다.');result('외팔의 사내','<p>독고강이 무릎을 꿇었다. "베라. 그게 강호다." 당신은 칼을 거두었다. 정파의 무인들이 수군거렸지만, 남궁진만은 그 모습을 오래 지켜보았다.</p>',function(){advance();},'siege');},lose:function(){die('siege');}});}},
   {t:'독고강을 설득한다',off:t<3?'독고강과의 신뢰 3 필요':null,h:'싸우지 않고 초소를 연다',f:function(){S.flags.dgJoin=true;S.flags.wave1=true;logE('people','<b>독고강</b>이 초소를 열어 주었다.');result('목도','<p>"그때 연무장 담장 밑에서 훔쳐보던 놈이." 독고강은 진검을 땅에 꽂았다. "애들은 살려 보내라." 초소의 문이 열렸다.</p>',function(){advance();},'siege');}},
   {t:'다른 길로 돌아간다',h:'',f:function(){advance();}}]);});}
function evJMaster(){pages('검성의 제자',[ps('검성 남궁진이 당신을 불렀다. "마교에서 온 아이가 선봉에서 칼을 거두었다지. 왜 베지 않았나?"','대답을 들은 그는 한참 웃었다. "좋다. 내 검을 가르쳐 주마. 대신 내 검으로는 다시는 약한 자를 베지 마라."')],'alliance',function(){S.flags.nj=true;gain('nj',1,'<p>남궁진은 그날부터 매일 새벽 당신을 깨웠다. 정파 사람들은 검성이 마교 출신을 제자로 받았다며 술렁였다.</p>');});}
function evJSiege(){var F=S.flags,boss,txt;
  if(F.danRule&&!F.danDead){boss='dan';txt='산문 위에 단목환이 서 있었다. "배신자가 정파의 개가 되어 돌아왔구나."';}
  else if(F.masterAlive){boss='kjBoss';txt='산문 위에는 병든 몸을 이끌고 나온 교주 위무강이 있었다. 그가 당신을 내려다보았다. 실망도 분노도 없는 눈이었다.';}
  else{boss='elder';txt='산문을 지키는 것은 마교의 장로들이었다.';}
  pages('혈월봉 공략',[ps('서른째 달. 이번에는 산 아래에서 혈월봉을 올려다본다. 흰 깃발 수천 개가 산길을 메웠다.',txt)],'siege',function(){
   var ch=[{t:(boss==='dan'?'단목환':(boss==='kjBoss'?'교주':'장로'))+'와 맞선다',h:'보스전 · 지면 죽는다',c:'primary',f:function(){fight(boss,boss==='elder'?S.realm*.4:0,{title:'혈월봉 공략',heal:.5,win:function(){F.siegeWon=true;if(boss==='dan')F.danDead=true;if(boss==='kjBoss'){F.masterAlive=false;F.masterDead=true;F.kjFell=true;}logE('fight','혈월봉 공략에서 승리했다.');
      result('혈월봉 함락',boss==='kjBoss'?'<p>교주는 마지막까지 서 있었다. 쓰러지며 그가 말했다. "그래도... 네가 이 산을 끝내는구나." 혈월봉에 흰 깃발이 꽂혔다.</p>':'<p>마지막 저항이 무너지자 혈월봉에 흰 깃발이 꽂혔다. 정파의 무인들이 당신의 이름을 묻기 시작했다.</p>',function(){advance();},'siege');},lose:function(){die('siege');}});}}];
   if(boss==='kjBoss'&&tr('kj')>=4)ch.push({t:'교주를 설득해 항복을 받는다',h:'교주와의 신뢰 4 · 피를 흘리지 않는다',f:function(){F.siegeWon=true;F.kjSurrender=true;logE('people','교주가 산문을 열고 항복했다.');result('산문이 열리다','<p>"네가 정파에 갔다고 들었을 때, 이상하게 화가 나지 않았다." 교주는 산문을 열었다. 혈월봉은 피를 흘리지 않고 함락되었다.</p>',function(){advance();},'siege');}});
   ch.push({t:'전장을 버리고 떠난다',h:'이름 없는 사람으로',f:function(){finish('flee');}});
   scene('산문 앞',' <p>옛 집의 문 앞에서, 당신은 칼을 쥔다.</p>',ch);});}
function evJPolitics(){pages('맹주 선거',[ps('혈월봉이 함락되자 무림맹은 새 맹주를 뽑기로 했다. 노쇠한 청허가 물러나겠다고 선언한 것이다.','유력한 후보는 제갈세가의 제갈휘. 머리가 좋고, 마교 출신을 누구보다 싫어한다. 그리고 놀랍게도 당신의 이름도 후보에 올랐다.')],'alliance',function(){
  scene('제갈휘','<p>"마교의 개가 맹주라니. 정파의 수치요." 제갈휘가 대청에서 대놓고 말했다. 그의 뒤에 줄을 선 가주가 적지 않다.</p>',[
   {t:'백운과 남궁진의 지지를 모은다',h:'신뢰가 높으면 결전이 수월해진다',f:function(){var ok=tr('bw')>=3||tr('nj')>=2;S.flags.support=ok;result(ok?'지지':'냉담',ok?'<p>백운이 대청에서 당신의 이름을 외쳤다. 남궁진이 말없이 당신 옆에 섰다. 가주 몇이 고개를 끄덕였다.</p>':'<p>당신을 위해 목소리를 내 주는 사람은 많지 않았다.</p>',function(){advance();},'alliance');}},
   {t:'제갈휘의 뒷일을 캔다',h:'결전에서 제갈휘가 흔들린다',f:function(){S.flags.dirt=true;result('그림자 장부','<p>제갈세가의 장부에서 단목환에게 흘러간 은자의 흔적을 찾았다. 결전의 날, 제갈휘는 이것을 보고 흔들릴 것이다.</p>',function(){advance();},'alliance');}}]);});}
function evJFinal(){var F=S.flags,canTrue=hasMem('cheonma')&&hasMem('core')&&F.tombDone&&(F.masterAlive||F.kjSurrender);
  pages('무림대회',[PRE.final[1][0],ps('무림맹주를 가리는 무림대회. 마지막 비무대에 오른 것은 당신과 제갈휘였다.','"마교의 개가 맹주가 되는 일은 없다." 제갈휘가 부채를 접으며 웃었다.')],'alliance',function(){
   var mul=(F.dirt?.8:1)*(F.support?.9:1);
   var ch=[{t:'제갈휘와 겨룬다',off:S.mad>=60?'마기가 짙어 비무대에 오를 수 없다 (마기 60 미만)':null,h:'결승 · 져도 죽지는 않는다',c:'primary',f:function(){fight('jg',0,{title:'무림대회 결승',spar:true,heal:1,hpMul:mul,win:function(){finish('maengju');},lose:function(){result('준우승','<p>제갈휘의 부채가 목젖에 닿았다. 맹주의 자리는 그에게 돌아갔다. 당신은 정파의 검 하나로 남기로 했다.</p>',function(){finish('betray');});}});}}];
   if(canTrue)ch.push({t:'비무대를 내려와 천마총으로 간다',h:'[진실] 굴레를 끊는다',f:function(){fight('cm',0,{title:'혈월의 핵',heal:1,win:function(){finish('true');},lose:function(){die('final');}});}});
   if(tr('bw')>=4&&!F.bwDead)ch.push({t:'백운과 함께 화친을 제안한다',h:'맹주 대신 두 깃발의 화해를',f:function(){finish('peace');}});
   ch.push({t:'모든 것을 내려놓고 떠난다',h:'이름 없는 사람으로',f:function(){finish('flee');}});
   scene('비무대','<p>수천의 눈이 비무대를 내려다본다. 마교의 시종이었던 자가, 지금 무림의 정점 앞에 서 있다.</p>',ch,'alliance');});}
function gain(who,g,text,next){
  S.trust[who]=tr(who)+g;logE('people','<b>'+NPC[who].n+'</b>와(과)의 인연이 깊어졌다.');
  result(NPC[who].n,npcHead(who)+text,function(){checkMs(who,next||function(){advance();});});
}
function checkMs(who,done){
  var list=MS[who].filter(function(m){return S.trust[who]>=m.t&&!S.flags['ms_'+who+m.t];});
  list.forEach(function(m){S.flags['ms_'+who+m.t]=true;});
  (function nx(){var m=list.shift();if(m)m.run(nx);else done();})();
}
var VIS={
  dg:function(){scene('외당 연무장',npcHead('dg')+'<p>독고강은 한쪽 팔뿐인 몸으로 목도를 거꾸로 쥐고 서 있다. 눈이 마주치자 턱짓으로 마당을 가리켰다.</p>',[
    {t:'대련을 청한다',h:'내공 +10 · 체력을 잃을 수 있다',f:function(){
      fight('dg',S.realm*.7,{auto:true,spar:true,title:'독고강과의 대련',
        win:function(){S.qi+=10;gain('dg',1,'목도가 허공에서 멈췄다. 독고강이 처음으로 코웃음 아닌 소리를 냈다. “나쁘지 않군.”');},
        lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.3));S.qi+=10;gain('dg',1,'바닥에 나동그라졌다. 독고강이 손을 내밀지는 않았지만, 일어날 때까지 기다려 주었다.');}});}},
    {t:'연무장 뒷일을 거든다',h:'은전 +15',f:function(){S.silver+=15;gain('dg',1,'목도를 닦고 모래를 고르는 동안 독고강은 한마디도 하지 않았다. 해 질 녘에야 은전 몇 푼이 바닥에 떨어져 있었다.');}}]);},
  hr:function(){scene('약당',npcHead('hr')+'<p>약당은 늘 쓴 냄새가 난다. 홍란은 약절구를 두들기다 말고 당신을 흘끗 보았다.</p>',[
    {t:'약초 손질을 돕는다',h:'체력 +30%',f:function(){S.hp=Math.min(maxHp(),S.hp+Math.round(maxHp()*.3));gain('hr',1,'독초와 약초를 가르는 법을 어깨너머로 배웠다. 홍란은 다친 손등에 말없이 연고를 발라 주었다.');}},
    {t:'은전 10냥을 내고 진맥을 받는다',off:S.silver<10?'은전이 모자란다':null,h:'마기 -20',f:function(){S.silver-=10;S.mad=Math.max(0,S.mad-20);gain('hr',1,'손목을 쥔 홍란의 눈썹이 한 번 올라갔다. “맥이 거칠어. 오래 못 가는 몸이야.” 그래도 침 몇 대에 숨이 트였다.');}}]);},
  mk:function(){scene('절벽 길',npcHead('mk')+'<p>눈먼 노인이 바위에 앉아 있다. 당신이 다가가자 묻지도 않고 말했다. “오늘은 발소리가 가볍군.”</p>',[
    {t:'곁에 앉아 이야기를 듣는다',h:'내공 +8',f:function(){S.qi+=8;gain('mk',1,'묵야는 오래된 싸움 이야기를 했다. 이긴 이야기는 하나도 없었다. 그런데 이상하게 마음이 단단해졌다.');}},
    {t:'길 안내를 해 준다',h:'은전 +15',f:function(){S.silver+=15;gain('mk',1,'노인의 지팡이 끝이 닿는 자리마다 돌을 치워 주었다. 노인은 웃으며 은전 몇 푼을 소매에서 꺼냈다.');}}]);},
  yn:function(){scene('시종 숙소',npcHead('yn')+'<p>연이는 해진 소매를 꿰매다 말고 환하게 웃었다. 이 총단에서 당신 이름을 지어 부르려 한 유일한 사람이다.</p>',[
    {t:'함께 밥을 먹는다',h:'체력 +20%',f:function(){S.hp=Math.min(maxHp(),S.hp+Math.round(maxHp()*.2));gain('yn',1,'식은 만두 한 개를 둘이 나눠 먹었다. 연이는 내일은 꼭 고기를 먹자고 했다. 내일은 늘 오지 않지만.');}},
    {t:'몰래 술을 구해 온다',off:S.silver<10?'은전이 모자란다':null,h:'마기 -15 · 은전 10',f:function(){S.silver-=10;S.mad=Math.max(0,S.mad-15);gain('yn',1,'지붕 위에서 훔친 술을 나눠 마셨다. 연이가 취해 웃었다. 별이 많은 밤이었다.');}}]);}
};
var MS={
  dg:[{t:2,run:function(d){learn('nak');learnMem('dokgo');result('낙일참','<p>독고강이 목도를 던졌다. “해가 지는 걸 본 적 있나. 지는 해는 천천히 지지 않는다. 마지막에 떨어진다.” 그는 오른팔 하나로 허공을 내리그었다. 바람이 두 쪽으로 갈라졌다.</p><p><b>낙일참</b>을 배웠다.</p>',d);}},
      {t:4,run:function(d){S.weapon=Math.max(S.weapon,1);result('낡은 철도','<p>독고강이 허리의 철도를 풀어 던졌다. “내가 쓰던 거다. 부러뜨리면 네 책임이다.”</p><p>무기가 <b>철도</b>로 바뀌었다.</p>',d);}}],
  hr:[{t:2,run:function(d){S.items.antidote++;learnMem('hong');result('해독단','<p>홍란이 작은 환약 하나를 건넸다. “독을 만지는 일을 하다 보면 해독단 하나쯤은 품고 있어야 해. 아무에게나 주는 건 아니야.”</p><p><b>해독단</b> 1개를 얻었다.</p>',d);}},
      {t:3,run:function(d){S.flags.poison=true;learnMem('poison');result('찻잔의 비밀','<p>홍란이 문을 걸어 잠갔다. “교주님의 찻잔에서 나온 침전물이야. 느리게 퍼지는 독이다. 얼마 남지 않았어.” 그녀가 입술을 깨물었다. “이 이야기를 아는 사람은 이제 너와 나뿐이야.”</p>',d);}}],
  mk:[{t:2,run:function(d){scene('묵야의 가르침','<p>“하나만 가져가거라. 둘은 욕심이고, 하나도 안 가져가면 오만이다.”</p>',[
        {t:'흑영보',h:'그림자 같은 보법',f:function(){learn('heuk');learnMem('muk');d();}},
        {t:'은월검법',h:'달빛 같은 세 번의 검',f:function(){learn('eun');learnMem('muk');d();}}]);}},
      {t:3,run:function(d){S.flags.knowEve=true;learnMem('eve');result('눈먼 노인의 예언','<p>“혈월이 가장 붉은 밤, 총단에 칼이 돈다.” 묵야는 정확히 당신 쪽을 바라보았다. “누가 칼을 쥘지는 아직 내가 보지 못했다. 네가 쥘 수도 있고, 네가 맞을 수도 있지.”</p>',d);}}],
  yn:[{t:2,run:function(d){S.hp=maxHp();result('말린 감','<p>연이가 소매 속에서 말린 감을 꺼냈다. “아껴 둔 건데, 너 줄게.” 달았다. 혀끝에 오래 남았다.</p><p>체력이 가득 찼다.</p>',d);}},
      {t:3,run:function(d){S.items.letter=1;learnMem('letter');result('주워 온 서신','<p>“어제 좌호법님 서재 청소하다 이걸 주웠어. 글은 몰라. 근데 이 인장, 정파 것 같더라.” 연이가 떨리는 손으로 구겨진 종이를 내밀었다.</p><p>좌호법 단목환이 정파 맹주와 주고받은 <b>밀서</b>를 얻었다.</p>',d);}}]
};

for(var _k in VIS2)VIS[_k]=VIS2[_k];for(var _m in MS2)MS[_m]=MS2[_m];
VIS.nj=function(){scene('검성의 거처',npcHead('nj')+'<p>남궁진은 매일 새벽 같은 자리에서 같은 초식을 천 번 휘두른다.</p>',[
  {t:'함께 검을 휘두른다',h:'내공 +12',f:function(){S.qi+=12;gain('nj',1,'<p>천 번째 검을 휘두를 때쯤 남궁진이 처음으로 "됐다"고 했다.</p>');}},
  {t:'마교 이야기를 들려준다',h:'마기 -10',f:function(){S.mad=Math.max(0,S.mad-10);gain('nj',1,'<p>연이 이야기를 하자 검성이 오래 말이 없었다. "그 아이도 살아야 할 텐데."</p>');}}]);};
MS.nj=[{t:2,run:function(d){learn('jeun');result('제운종',npcHead('nj')+'<p>"발이 무겁다. 마교의 걸음이야." 남궁진이 구름을 밟듯 물 위를 걸어 보였다. <b>제운종</b>을 얻었다.</p>',d);}},
  {t:3,run:function(d){learn('igieo');result('이기어검',npcHead('nj')+'<p>검이 남궁진의 손을 떠나 허공에서 원을 그리고 돌아왔다. "검을 쥐지 말고, 검과 함께 숨 쉬어라." <b>이기어검</b>을 얻었다.</p>',d);}}];
MS.sm.push({t:3,run:function(d){learn('gwihon');result('귀혼무',npcHead('sm')+'<p>"이건 내가 처음 사람을 죽였을 때 배운 거야." 사마령의 비도가 원혼처럼 허공을 돌았다. <b>귀혼무</b>를 얻었다.</p>',d);}});
MS.kj.push({t:3,run:function(d){learn('mara');result('마라신공',npcHead('kj')+'<p>"마교의 심법은 모두 이것에서 나왔다." 교주가 손수 구결을 적어 주었다. <b>마라신공</b>을 얻었다.</p>',d);}});
MS.hr.push({t:4,run:function(d){learn('dokjang');result('독장',npcHead('hr')+'<p>홍란이 장갑을 벗었다. 손끝이 검푸르다. "독을 다루는 손은 사람을 살리기도 하고 죽이기도 해. 둘 다 가르쳐 줄게."</p><p><b>독장</b>을 얻었다.</p>',d);}});
var EVENTS=[
 {m:3,id:'enter',run:function(){
   var ch=[
    {t:'독고강의 연무장으로 간다',h:hasMem('dokgo')?'[기억] 낙일참을 청할 길을 안다':'도법을 어깨너머로 훔쳐본다',f:function(){gain('dg',hasMem('dokgo')?2:1,hasMem('dokgo')?'독고강 앞에 서서 말했다. 낙일참을 배우고 싶다고. 한쪽 팔뿐인 사내의 눈이 가늘어졌다. “누가 그런 소릴 하더냐.” 대답 대신 목도를 쥐었다.':'연무장 담장 밑에서 한나절 도법을 훔쳐보았다. 독고강이 알고도 모른 척해 주었다.');}},
    {t:'홍란의 약당으로 간다',h:hasMem('hong')?'[기억] 해독단을 얻을 길을 안다':'약초와 독초를 배운다',f:function(){gain('hr',hasMem('hong')?2:1,hasMem('hong')?'약당 문턱에서 홍란에게 말했다. 독을 다루는 사람은 해독단을 품고 있다고 들었다고. 홍란이 약절구를 내려놓았다.':'하루 종일 약초를 말렸다. 홍란은 말이 없었지만 저녁 무렵 연고 하나를 건네주었다.');}},
    {t:'연이와 뒷산에 오른다',h:'오랜만에 쉰다',f:function(){gain('yn',1,'뒷산 바위에 앉아 총단 지붕을 내려다보았다. 연이가 저 중에 우리 방 지붕이 제일 작다고 했다.');}}];
   if(hasMem('muk'))ch.push({t:'절벽 길로 눈먼 노인을 찾아간다',h:'[기억] 아직 이른 시기지만 안다',f:function(){gain('mk',1,'절벽 길에 묵야가 앉아 있었다. 묻지도 않았는데 노인이 말했다. “일찍 왔구나.”');}});
   scene('입교 심사','<p>봄이 깊어 외당에서 새 교도를 가리는 심사가 열렸다. 시종 따위에게 자격이 있을 리 없지만, 심사가 열린 날은 감시가 느슨하다.</p><p>어디에 얼굴을 비출지는 당신 몫이다.</p>',ch);}},
 {m:6,id:'tourney',run:function(){
   scene('외당 비무','<p>외당 비무대회가 열렸다. 우승자에게는 은전과 이름이 주어진다. 이름이 알려진다는 것이 이곳에서 늘 좋은 일은 아니다.</p>',[
    {t:'출전한다',h:'은전 +50 · 단목환의 눈에 띈다',f:function(){
      fight('junior',S.realm*.8+.3,{auto:true,spar:true,title:'외당 비무',
        win:function(){S.silver+=50;S.flags.noticed=true;result('우승','<p>마지막 상대가 무릎을 꿇었다. 환호 사이로 누군가의 시선이 느껴졌다. 단상 위, 검은 장포를 입은 사내가 천천히 고개를 끄덕였다. 좌호법 단목환이다.</p><p>은전 50냥을 받았다.</p>',function(){advance();});},
        lose:function(){S.hp=Math.max(1,Math.round(maxHp()*.4));result('탈락','<p>일 합 차이로 졌다. 누구도 당신 이름을 기억하지 않을 것이다. 지금은 그게 나을지도 모른다.</p>',function(){advance();});}});}},
    {t:'구경만 한다',h:'내공 +6',f:function(){S.qi+=6;result('구경','<p>끝 모를 합을 지켜보며 몸을 쓰는 법을 눈으로 배웠다. 내공이 조금 늘었다.</p>',function(){advance();});}}]);}},
 {m:9,id:'clue',run:function(){
   var ch=[];
   var body='<p>가을이 들자 총단에 낮은 소문이 돈다. 교주의 안색이 나쁘다는 것, 약당 출입이 잦다는 것, 단목환의 서재에 밤늦도록 불이 켜진다는 것.</p>';
   if(S.trust.hr>=1||S.flags.poison||hasMem('poison')){
     ch.push({t:'홍란과 함께 증거를 모은다',h:'신뢰 +1 · 해독단 +1 · 독의 증거를 쥔다',f:function(){S.flags.poison=true;learnMem('poison');S.items.antidote++;S.trust.hr++;result('찻잔의 침전물','<p>홍란과 밤새 찻잔 찌꺼기를 걸러 냈다. 바닥에 가라앉은 붉은 가루. 홍란이 해독단 하나를 더 쥐여 주었다. “이게 없으면 교주님은 겨울을 못 넘겨.”</p>',function(){checkMs('hr',function(){advance();});});}});
   }
   if(hasMem('letter')){
     ch.push({t:'단목환의 서재에 잠입한다',h:'[기억] 밀서가 있는 곳을 안다 · 위험하다',f:function(){
       var p=.5+S.eye*.08+S.realm*.06;
       if(Math.random()<p){S.items.letter=1;result('서재','<p>서가 세 번째 칸 뒤, 기억 속 그 자리에 밀서가 있었다. 인장도, 필체도 같았다. 숨소리를 죽이고 빠져나왔다.</p>',function(){advance();});}
       else{result('들켰다','<p>서가를 더듬는 순간 등 뒤에서 문이 열렸다. 호위 하나가 칼을 뽑았다.</p>',function(){
         fight('guard',S.realm*.8,{title:'서재',win:function(){result('입을 막다','<p>호위가 쓰러졌다. 시체를 어둠 속에 끌어다 놓고 도망쳤다. 밀서는 손에 넣지 못했다.</p>',function(){advance();});},lose:function(){die('caught');}});});}}});
   }
   ch.push({t:'모른 척한다',h:'소문은 소문일 뿐이다',f:function(){advance();}});
   scene('흉흉한 소문',body,ch);}},
 {m:12,id:'newyear',run:function(){
   var ch=[
    {t:'교주 곁에 선다',h:'충성을 택한다',f:function(){S.flags.loyal=true;result('신년제','<p>천마 위무강은 옥좌에 앉아 있었지만 손끝이 미세하게 떨렸다. 시선이 마주치자 노인은 짧게 고개를 끄덕였다. 한 명이라도 곁에 선 이가 있다는 것을 안다는 듯이.</p>',function(){advance();});}},
    {t:'단목환의 손을 잡는다',h:'혈사장을 얻는다 · 마기 +10',f:function(){S.flags.dan=true;learn('hyul');S.mad=clamp(S.mad+10,0,100);result('검은 장포','<p>단목환은 술잔 너머로 웃었다. “강한 놈은 알아본다. 줄을 설 때를 아는 놈이면 더 좋고.” 그가 건넨 서책에는 핏빛 장법이 적혀 있었다.</p><p><b>혈사장</b>을 얻었다.</p>',function(){advance();});}},
    {t:'어느 쪽에도 서지 않는다',h:'눈에 띄지 않는다',f:function(){S.flags.neutral=true;S.qi+=10;result('구석 자리','<p>신년제의 불빛은 멀리서 보면 아름답다. 구석에서 술 한 잔 마시지 않고 오래도록 두 사람을 보았다.</p><p>내공이 10 늘었다.</p>',function(){advance();});}}];
   if(S.items.antidote>0&&(S.flags.poison||hasMem('poison')))ch.push({t:'교주에게 해독단을 건넨다',h:'[기억] 교주를 미리 살린다 · 위험하다',f:function(){
     var p=.45+S.trust.hr*.08+S.realm*.04;
     if(Math.random()<p){S.items.antidote--;S.flags.masterWarned=true;S.flags.loyal=true;result('해독','<p>잔을 올리는 척 소매 속 환약을 교주의 술잔에 풀었다. 위무강의 눈이 한순간 번뜩였다. 그는 잔을 비우고 아무 말도 하지 않았다. 다음 날 아침, 당신의 처소에 그의 호패가 놓여 있었다.</p>',function(){advance();});}
     else{S.flags.noticed=true;S.hp=Math.max(1,Math.round(maxHp()*.4));result('발각','<p>단목환의 호위가 소매를 낚아챘다. 끌려 나가 흠씬 두들겨 맞았다. 해독단은 손에 남았다. 목숨도 남았다. 다만 눈 밖에 났다.</p>',function(){advance();});}}});
   scene('신년제','<p>새해 첫 달, 총단 대전에 모든 교도가 모였다. 옥좌에는 교주 위무강이, 그 아래 첫 줄에는 좌호법 단목환이 있다. 두 사람의 사이에는 아무도 서지 않는다.</p><p>당신은 어디에 설 것인가.</p>',ch);}},
 {m:15,id:'letter',cond:function(){return S.items.letter<1;},run:function(){
   if(S.trust.yn>=2){S.items.letter=1;learnMem('letter');S.flags.ms_yn3=true;result('주워 온 서신','<p>연이가 숨을 헐떡이며 뛰어왔다. “이거, 이거 단목환 서재에서 주웠어.” 정파의 인장이 찍힌 밀서였다. 단목환과 정파 맹주가 혈월의 밤에 산문을 열기로 한 약조.</p><p><b>밀서</b>를 얻었다.</p>',function(){advance();});}
   else{advance();}}},
 {m:17,id:'eve',run:function(){
   var ch=[];
   if(hasMem('eve')&&S.trust.yn>=2&&!S.flags.purge)ch.push({t:'연이의 손을 잡고 총단을 떠난다',h:'[기억] 혈월의 밤을 피한다',f:function(){S.flags.fleeWith=true;finish('flee');}});
   if(hasMem('eve'))ch.push({t:'혼자 총단을 떠난다',h:'[기억] 혈월의 밤을 피한다',f:function(){finish('flee');}});
   ch.push({t:'남는다',h:'내일 밤을 맞는다',f:function(){advance();}});
   scene('혈월 전야','<p>내일이면 달이 가장 붉다. 총단 곳곳에 이상한 기척이 돈다. 평소 보이지 않던 호위들이 외당 건물 사이를 오간다.</p>'+(hasMem('eve')?'<p>기억이 속삭인다. 내일이다. 그 밤이다.</p>':'<p>이유는 모르지만 마음이 불길하다.</p>'),ch,'title');}},
 {m:18,id:'night',run:function(){ev18();}},
 {m:20,id:'after',run:function(){ev20();}},
 {m:5,id:'lib',run:evLib},
 {m:7,id:'trial',run:evTrial},
 {m:8,id:'arena',run:evArena},
 {m:10,id:'forge',run:evForge},
 {m:14,id:'shadow',run:evShadow},
 {m:16,id:'audience',cond:function(){return (S.flags.loyal||S.flags.masterWarned)&&!S.flags.kj;},run:evAudience},
 {m:21,id:'cross',run:evCross},
 {m:22,id:'baekun',cond:function(){return S.route!=='jeong';},run:evBaekun},
 {m:22,id:'jsuspect',cond:function(){return S.route==='jeong';},run:evJSuspect},
 {m:23,id:'mtest',cond:function(){return S.route==='ma';},run:evMTest},
 {m:24,id:'hunt',cond:function(){return S.route!=='jeong';},run:evHunt},
 {m:24,id:'jwudang',cond:function(){return S.route==='jeong';},run:evJWudang},
 {m:25,id:'mblood',cond:function(){return S.route==='ma';},run:evMBlood},
 {m:26,id:'wave',cond:function(){return S.route!=='jeong';},run:evWave},
 {m:26,id:'jwave',cond:function(){return S.route==='jeong';},run:evJWave},
 {m:27,id:'mpurge',cond:function(){return S.route==='ma';},run:evMPurge},
 {m:28,id:'saint',cond:function(){return !S.route;},run:evSaint},
 {m:28,id:'jmaster',cond:function(){return S.route==='jeong';},run:evJMaster},
 {m:29,id:'mwar',cond:function(){return S.route==='ma';},run:evMWar},
 {m:30,id:'siege',cond:function(){return !S.route;},run:function(){ev22();}},
 {m:30,id:'msiege',cond:function(){return S.route==='ma';},run:evMSiege},
 {m:30,id:'jsiege',cond:function(){return S.route==='jeong';},run:evJSiege},
 {m:32,id:'tomb',run:evTomb},
 {m:33,id:'mcall',cond:function(){return S.route==='ma';},run:evMCall},
 {m:34,id:'last',run:evLast},
 {m:35,id:'jpolitics',cond:function(){return S.route==='jeong';},run:evJPolitics},
 {m:36,id:'final',cond:function(){return !S.route;},run:ev36},
 {m:36,id:'mfinal',cond:function(){return S.route==='ma';},run:evMFinal},
 {m:36,id:'jfinal',cond:function(){return S.route==='jeong';},run:evJFinal}
];
EVENTS.forEach(function(e){var p=PRE[e.id];if(p){var r=e.run;e.run=function(){pages(p[0],p[1],p[2],r);};}});
function ev1(){
  if(P.lives===0){
    scene('혈월봉의 새벽',ps('꿈의 잔상을 털어 내고 일어났다. 연이는 벌써 물을 길으러 나갔다.','오늘도 누군가의 요강을 비우고, 누군가의 칼을 닦고, 누군가의 피를 씻어 내는 하루가 시작된다. 다만 오늘은, 그 꿈이 자꾸 마음에 걸린다.'),[{t:'일어난다',c:'primary',f:function(){hub('<b>1개월째.</b> 한 달에 한 번 움직인다. 운기, 수련, 휴식, 교류, 탐색, 의뢰 중 무엇을 할지는 당신이 정한다. 열여덟째 달에 혈월이 뜨고, 서른째 달에 정파가 오며, 서른여섯째 달에 이 생이 끝난다.');}}],'dawn');
  }else{
    var n=Object.keys(P.mem).length;
    scene('다시, 봄',ps('입안에 피 맛이 남아 있다. 눈을 뜨자 낡은 천장과 젖은 짚 냄새, 창밖의 매화가 보인다. <b>'+lifeNo()+'번째</b> 봄이다.','죽음은 끝이 아니었다. 본 것은 남고, 몸이 익힌 것은 흔적이 된다.',n?'<span class="dim">품고 있는 기억 '+n+'개. 정보 화면에서 다시 볼 수 있다.</span>':''),[{t:'일어난다',c:'primary',f:function(){hub('<b>1개월째.</b> 이번에는 다르게 움직일 수 있다.');}}],'return');
  }
}
function ev18(){
  learnMem('eve');
  var hasA=S.items.antidote>0,hasL=S.items.letter>0,ch=[];
  var body=ps('혈월이 떴다. 달은 핏물에 담근 듯 붉고, 총단의 모든 횃불이 한꺼번에 꺼졌다.','처음은 비명이었다. 그다음은 쇠 부딪는 소리. 외당 마당에 사람 그림자가 쏟아져 나오고, 누군가 외쳤다. 좌호법께서 교주를 베셨다고.');
  if(S.flags.dan)ch.push({t:'단목환 곁에서 칼을 뽑는다',h:'쿠데타에 가담한다 · 천마강신 · 마기 +10',f:function(){
    S.flags.masterDead=true;S.flags.danRule=true;S.mad=clamp(S.mad+10,0,100);S.silver+=60;learn('cheon');
    result('칼끝','<p>단목환의 명이 떨어졌다. 당신은 그의 뒤에서 칼을 뽑았다. 외당 마당의 비명이 하나씩 끊겼다. 새벽이 되자 옥좌에는 다른 이가 앉아 있었다.</p><p>그는 보상으로 마공 서책 한 권과 은전을 건넸다. <b>천마강신</b>을 얻었다.</p>',function(){advance();});}});
  if(hasL)ch.push({t:'교주 앞에 서서 모든 것을 밝힌다',h:'밀서를 증거로 단목환과 맞선다 · 보스전',f:function(){
    fight('dan',0,{title:'혈월의 밤',heal:.3,hpMul:S.flags.masterWarned?.7:1,
      win:function(){S.flags.danDead=true;S.items.letter=0;
        if(hasA){S.items.antidote--;S.flags.masterAlive=true;}else{S.flags.masterDead=true;}
        result('혈월은 졌다',hasA?'<p>단목환이 쓰러졌다. 당신은 숨이 끊어질 듯한 교주의 입에 해독단을 밀어 넣었다. 새벽 무렵, 노인의 손가락이 움직였다.</p>':'<p>단목환이 쓰러졌다. 그러나 이미 독이 깊어 교주는 새벽이 오기 전에 눈을 감았다. 옥좌가 비었다.</p>',function(){advance();});},
      lose:function(){die('eveDuel');}});}});
  if(hasA)ch.push({t:'교주의 처소로 달려가 해독단을 먹인다',h:'호위를 뚫는다 · 단목환은 살아남는다',f:function(){
    fight('guard',S.realm*.8,{title:'교주의 처소',heal:.3,
      win:function(){S.items.antidote--;S.flags.masterAlive=true;S.flags.danAlive=true;result('새벽','<p>호위를 베고 처소에 뛰어들었다. 피를 토하던 교주의 입에 해독단을 밀어 넣었다. 단목환은 포위망을 뚫고 산을 내려갔다는 소식이 아침에 들렸다.</p>',function(){advance();});},
      lose:function(){die('eve');}});}});
  if(S.flags.smAlly&&!S.flags.smDead)ch.push({t:'사마령과 함께 단목환을 친다',h:'그림자의 도움 · 보스전',f:function(){
    fight('dan',0,{title:'혈월의 밤',heal:.3,hpMul:.6,win:function(){S.flags.danDead=true;if(S.items.antidote>0){S.items.antidote--;S.flags.masterAlive=true;}else S.flags.masterDead=true;
      result('그림자와 칼',S.flags.masterAlive?'<p>사마령의 비도가 단목환의 등을 꿰뚫었고, 당신의 칼이 마무리를 지었다. 교주의 입에 해독단을 밀어 넣었다.</p>':'<p>단목환은 쓰러졌다. 그러나 교주는 이미 숨을 거둔 뒤였다.</p>',function(){advance();});},lose:function(){die('eveDuel');}});}});
  if(S.flags.masterTrust)ch.push({t:'교주의 호패로 금위대를 부른다',h:'싸우지 않고 교주를 지킨다',f:function(){var ok=S.items.antidote>0;if(ok){S.items.antidote--;S.flags.masterAlive=true;S.flags.danAlive=true;}else{S.flags.masterDead=true;S.flags.danRule=true;}
    result('금위대',ok?'<p>호패를 본 금위대가 교주의 처소를 에워쌌다. 해독단도 늦지 않았다. 단목환은 이를 갈며 산을 내려갔다.</p>':'<p>금위대가 처소를 에워쌌지만 독이 먼저였다. 교주가 숨을 거두자 금위대는 단목환에게 무릎을 꿇었다.</p>',function(){advance();});}});
  ch.push({t:'혼란 속에서 살아남으려 한다',h:'생존 확률은 경지와 인연에 달렸다',f:function(){
    var p=.25+S.realm*.12+S.trust.dg*.04;
    if(Math.random()<p){S.hp=Math.max(1,Math.round(maxHp()*.5));S.flags.chaos=true;S.flags.danRule=false;S.flags.masterDead=true;
      result('시체 사이','<p>시체 더미 속에 숨어 밤을 났다. 새벽에 일어나 보니 옥좌의 주인이 바뀌어 있었다.</p>',function(){advance();});}
    else die('eve');}});
  scene('혈월의 밤',body,ch,'night');
}
function ev20(){
  var F=S.flags;
  if(F.danRule&&!F.danDead){
    scene('새 천마의 명',ps('단목환이 옥좌에 앉았다. 그는 외당에 남은 옛 교주파를 정리하라 명했다. 목록에는 독고강과 연이의 이름이 있었다.','칼은 이미 당신 손에 있다. 누구를 향할지는 아직 당신이 정할 수 있다.'),[
      {t:'명을 따른다',h:'은전 +120 · 마기 +15 · 인연이 끊긴다',f:function(){F.purge=true;S.trust.dg=0;S.trust.yn=0;S.silver+=120;S.mad=clamp(S.mad+15,0,100);result('숙청','<p>외당 연무장은 조용해졌다. 독고강의 목도가 마당에 꽂혀 있었다. 연이의 침상은 비어 있었다. 손에 쥔 은전이 유난히 무거웠다.</p>',function(){advance();});}},
      {t:'칼끝을 단목환에게 돌린다',h:'보스전 · 이기면 옥좌가 비는 대신 당신이 선다',f:function(){
        fight('dan',0,{title:'옥좌 앞',heal:.3,win:function(){F.danDead=true;F.throne=true;result('옥좌','<p>단목환이 옥좌 아래로 굴러떨어졌다. 대전이 숨을 죽였다. 누군가 무릎을 꿇었고, 곧 모두가 꿇었다.</p>',function(){advance();},'throne');},lose:function(){die('eveDuel');}});}}]);
  }else if(F.masterAlive&&F.danAlive){
    scene('교주의 포상',ps('교주 위무강은 병석에서 일어나 앉았다. 단목환은 정파로 달아났다. 총단은 상처를 입었지만 죽지 않았다.','노인이 당신을 불렀다. “이름 없는 아이야. 네게 호교의 자리를 줄 수는 없지만 검은 줄 수 있다.”'),[
      {t:'검을 받는다',h:'흑철도 · 체력 회복',f:function(){S.weapon=2;S.hp=maxHp();result('흑철도','<p>검은 칼날에 붉은 문양이 새겨진 흑철도였다. 무기가 <b>흑철도</b>로 바뀌었다.</p>',function(){advance();});}},
      {t:'수련에 매진하겠다고 청한다',h:'내공 +40',f:function(){S.qi+=40;result('폐관','<p>교주가 고개를 끄덕였다. 한 달 동안 총단 가장 깊은 방에서 기를 돌렸다. 내공이 40 늘었다.</p>',function(){advance();});}}]);
  }else if(F.masterAlive&&F.danDead){
    scene('다시 선 옥좌',ps('단목환의 시체가 효수되었다. 교주 위무강은 노쇠했지만 눈빛은 살아 있다.','노인이 당신을 오래 바라보았다. “이 자리는 오래 비워 둘 수 없다.”'),[
      {t:'후계 수업을 받는다',h:'내공 +30 · 교를 이을 이로 지목된다',f:function(){F.heir=true;S.qi+=30;result('후계','<p>교주는 매일 밤 당신을 불러 교의 역사와 마공의 이치를 가르쳤다. 내공이 30 늘었다.</p>',function(){advance();});}},
      {t:'수련에 힘쓴다',h:'내공 +25 · 체력 회복',f:function(){S.qi+=25;S.hp=maxHp();result('수련','<p>누구의 후계가 되든, 침공이 오면 칼이 필요하다. 내공이 25 늘었다.</p>',function(){advance();});}}]);
  }else if(F.masterDead&&F.danDead){
    var ok=S.realm>=3;
    scene('빈 옥좌',ps('교주는 죽었고 단목환도 죽었다. 옥좌는 비어 있고, 아무도 앉으려 하지 않는다.','대전 한가운데서 사람들이 당신만 쳐다보고 있다.'),[
      {t:'옥좌에 앉는다',off:ok?null:'절정에 이르지 못하면 교도들이 따르지 않는다',h:'천마의 자리를 잇는다',f:function(){F.throne=true;S.qi+=20;result('옥좌','<p>옥좌는 차가웠다. 누군가 숨을 삼켰고, 곧 무릎 꿇는 소리가 대전을 채웠다.</p>',function(){advance();},'throne');}},
      {t:'자리를 비워 둔 채 수련한다',h:'내공 +25',f:function(){S.qi+=25;result('빈자리','<p>옥좌는 비어 있는 채 침공의 날이 다가온다. 내공이 25 늘었다.</p>',function(){advance();});}}],'throne');
  }else{
    scene('새 시대',ps('총단은 단목환의 것이 되었다. 옛 교주의 사람들은 하나둘 사라졌다.','시종 하나쯤은 살아남을 수 있다. 어느 쪽에 서든.'),[
      {t:'단목환에게 복종한다',h:'은전 +30 · 쓰임을 받는다',f:function(){F.danRule=true;S.silver+=30;result('복종','<p>무릎을 꿇고 이마를 바닥에 댔다. 단목환은 당신 이름을 묻지 않았다. 칼 한 자루가 늘었다고만 여겼을 것이다.</p>',function(){advance();});}},
      {t:'숨어서 칼을 간다',h:'내공 +35 · 마기 +5',f:function(){S.qi+=35;S.mad=clamp(S.mad+5,0,100);result('칼을 간다','<p>숨죽여 달을 세었다. 이를 갈며 기를 돌렸다. 내공이 35 늘었다.</p>',function(){advance();});}}]);
  }
}
function ev22(){
  learnMem('siege');
  var F=S.flags,boss=F.danAlive&&!F.danDead,enemy=boss?'dan':'vanguard',ch=[];
  var body=ps('서른 번째 달, 산문이 열렸다. 정파 연합이 깃발을 세우고 오르고 있다. 횃불의 행렬이 산허리를 따라 뱀처럼 굽이쳤다.',boss?'선두에는 단목환이 서 있다. 그가 정파의 칼이 되어 돌아왔다.':'선두의 장수는 정파 선봉장. 총단 안에서는 아무도 살아 나갈 길을 장담하지 못한다.');
  function win(){
    return function(){F.siegeWon=true;logE('event','정파의 침공을 막아 냈다.');advance();};
  }
  if(F.danRule&&!F.danDead){
    ch.push({t:'단목환의 명을 따라 선봉에 선다',h:'그가 약속을 지킬지는 알 수 없다',f:function(){die('servant');}});
    ch.push({t:'단목환의 등을 벤다',h:'보스전 · 이기면 천마의 자리가 남는다',f:function(){
      fight('dan',0,{title:'산문 앞',heal:.3,win:function(){F.danDead=true;F.throne=true;result('배신자의 최후','<p>단목환이 비명도 없이 쓰러졌다. 그의 명을 기다리던 교도들이 갈 곳을 잃고 당신을 바라보았다.</p>',function(){F.siegeWon=true;advance();});},lose:function(){die('eveDuel');}});}});
  }else{
    ch.push({t:'산문에 서서 막는다',h:(boss?'단목환':'정파 선봉장')+'과 정면으로 맞선다 · 보스전',f:function(){
      fight(enemy,boss?0:S.realm*.4,{title:'산문 앞',heal:.3,hpMul:(F.masterWarned&&boss?.7:1)*(F.plans?.75:1),win:function(){result('산문','<p>적장이 쓰러지자 정파 연합의 깃발이 흔들렸다. 총단의 함성이 계곡을 울렸다.</p>',win());},lose:function(){die('siege');}});}});
  }
  if(tr('bw')>=4&&!F.bwDead&&S.items.letter>0)ch.push({t:'백운을 통해 맹주에게 화친을 청한다',h:'밀서로 단목환의 배신을 증명한다',f:function(){finish('peace');}});
  if(S.items.letter>0)ch.push({t:'맹주 청허에게 밀서를 바친다',h:'정파로 투신한다',f:function(){finish('betray');}});
  if(S.mad>=85&&S.realm>=4)ch.push({t:'총단에 불을 지른다',h:'마기에 몸을 맡긴다',f:function(){finish('burn');}});
  ch.push({t:'혼란을 틈타 도망친다',h:'이름 없는 사람으로',f:function(){if(S.trust.yn>=2&&!F.purge)F.fleeWith=true;finish('flee');}});
  scene('산문',body,ch,'siege');
}

function endText(id){
  var F=S.flags;
  if(id==='guard')return ps('산문 앞의 칼들이 물러갔다. 총단은 폐허에 가까웠지만 혈월봉의 깃발은 꺾이지 않았다.',F.masterAlive?'병석의 교주가 당신의 어깨에 손을 얹었다. “이름이 없어도 이 산의 사람이다.”':'옥좌는 비어 있지만 교도들은 당신을 중심으로 다시 모였다.','이 생은, 마교를 지켜 낸 생이었다.');
  if(id==='throne')return ps('옥좌 앞에 선 이가 이제 당신이다. 교도들이 무릎을 꿇고, 정파의 깃발은 산 아래로 흩어졌다.','천마(天魔). 이름 없던 시종에게 처음으로 불리는 이름이 생겼다.','그 이름이 얼마나 무거운지는, 앉아 본 자만 안다.');
  if(id==='flee')return ps(F.fleeWith?'연이의 손을 잡고 새벽안개 속으로 산을 내려갔다. 등 뒤에서 총단이 불타는 소리가 들렸다.':'혼자 산을 내려왔다. 등 뒤에서 총단이 무너지는 소리가 들렸지만 돌아보지 않았다.','어느 이름 모를 마을에서, 당신은 처음으로 이름을 하나 지었다.','이 생은, 달아나서 살아남은 생이었다.');
  if(id==='betray')return ps('청허는 밀서를 읽고 오래 말이 없었다. “이 인장이 진짜라면 총단 안에도 눈이 있었다는 뜻이군.”','당신은 그날부터 정파의 검이 되었다. 마교의 이름을 쥔 채 정파의 깃발 아래 서는 일은 쉽지 않았다.','이 생은, 칼의 방향을 바꾼 생이었다.');
  if(id==='cheonma')return ps('잔영이 당신 안으로 녹아들었다. 스물세 천마의 기억과 혈월의 숨이 핏줄을 타고 흘렀다.','천마총을 나서자 혈월봉의 모든 교도가 무릎을 꿇고 있었다. 정파는 다시 백 년 동안 이 산을 넘보지 못할 것이다.','이름 없던 시종은 이제 이름을 갖는다. 천마. 다만 그 이름과 함께, 혈월의 굴레도 영원히 당신의 것이 되었다.');
  if(id==='maengju')return ps('제갈휘의 부채가 반으로 갈라졌다. 비무대 아래가 한참 조용하다가, 백운이 먼저 소리쳤다. 이어 함성이 무림맹을 뒤덮었다.','마교의 시종이었던 자가 무림맹주가 되었다. 첫 명령은 혈월봉의 교도들을 죽이지 말라는 것이었다.','강호는 그날을 정사가 처음으로 같은 사람을 우러른 날로 기억한다.');
  if(id==='true')return ps('검이 혈월의 핵을 꿰뚫자 하늘의 붉은 달이 금 가듯 갈라졌다. 갈라진 틈으로 처음 보는 새벽빛이 쏟아졌다.','천마의 잔영은 웃으며 흩어졌다. "드디어 끝을 내는 자가 왔구나."','눈을 뜨면 다시 봄일까. 아니었다. 다음 날 아침에도, 그다음 날에도 시간은 앞으로만 흘렀다.','회귀는 끝났다. 이름 없는 시종은 마침내 자기 이름으로 늙어 갈 수 있게 되었다.');
  if(id==='peace')return ps('백운이 맹주 앞에 밀서를 펼쳤다. 단목환의 배신이 드러나자 정파의 깃발이 멈춰 섰다.','돌다리 위에서 흰 옷과 검은 옷이 서로에게 고개를 숙였다. 백 년 만의 일이었다.','이 생은, 칼 대신 손을 내민 생이었다.');
  if(id==='shadow')return ps('그날 밤 이후 아무도 당신을 보지 못했다. 다만 교의 모든 결정은 어느새 한 사람의 뜻대로 흘렀다.','사마령은 지붕 위에서 웃었다. "옥좌보다 그림자가 편하지?"','이 생은, 보이지 않는 왕이 된 생이었다.');
  return ps('횃불을 던졌다. 오래된 전각이 불을 삼키며 하늘로 붉은 연기를 토했다.','혈월봉이 이름 그대로 붉게 타올랐다. 정파도 마교도 한 줌 재가 되어 계곡으로 흩어졌다.','이 생은, 모든 것을 끝낸 생이었다.');
}
function die(id){closeLife('death',id);}
function finish(id){closeLife('end',id);}
