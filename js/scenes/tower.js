/* ===== РЕЖИМ БАШНИ ===== */
// Этапы идут подряд. Перед каждым игра предлагает TOWER_OFFER случайных аниматроников из ВСЕХ записей ANIMS,
// игрок берёт TOWER_PICK. Выбранные остаются в составе. Новые аниматроники попадают в башню сами.
const TOWER_STAGES=10,TOWER_OFFER=8,TOWER_DIFF=10;
// Сколько аниматроников берёт игрок на каждом этапе.
const TOWER_PICKS=[3,2,2,2,2,1,1,1,1,1];
function activeList(){
 return S.mode==='tower'&&S.tower?S.tower.roster.map(id=>({...ANIMS.find(x=>x.id===id),diff:TOWER_DIFF})):ANIMS.filter(a=>a.diff>0);
}
function startTower(){
 S.mode='tower';S.truns++;
 S.tower={stage:1,roster:[]};
 S.run={t:0,flash:0,cam:0,doors:0,powerOffs:0,alarms:0,cleared:0,earned:0,kills:{}};
 prepareStage();save();
}
function prepareStage(){
 const T=S.tower,pool=ANIMS.filter(a=>!T.roster.includes(a.id)).map(a=>a.id);
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 S.offer=pool.slice(0,TOWER_OFFER);S.need=Math.min(TOWER_PICKS[T.stage-1]||1,S.offer.length);S.pickSel=[];S.towerNew=[];
 if(S.offer.length<=S.need){T.roster.push(...S.offer);S.towerNew=S.offer.slice();S.scene='tower'}
 else S.scene='pick';
}
function confirmPick(){
 if(S.pickSel.length!==S.need)return say('Нужно выбрать: '+S.need);
 S.tower.roster.push(...S.pickSel);S.towerNew=S.pickSel.slice();S.scene='tower';
}
function startTowerNight(){S.mode='tower';startNight()}
function towerNightWon(){
 const stagePay=S.tower.roster.reduce((sum,id)=>sum+((ANIMS.find(a=>a.id===id)||{}).pay||10),0);S.run.earned=(S.run.earned||0)+stagePay;S.money=(S.money||0)+stagePay;
 S.run.cleared=S.tower.stage;S.tbest=Math.max(S.tbest,S.run.cleared);SFX.win();
 if(S.tower.stage>=TOWER_STAGES)towerOver(true);else{S.scene='towerwin';save()}
}
function towerOver(win){
 S.towerWin=win;S.scene='towerend';
 if(win)S.twins++;
 if(!win&&S.killer)S.run.kills[S.killer.id]=(S.run.kills[S.killer.id]||0)+1;
 save();
}
function trackStats(dt){
 const r=S.run;if(S.mode!=='tower'||!r||S.scene!=='game')return;
 r.t+=dt;if(S.flash&&S.power)r.flash+=dt;if(S.camOpen)r.cam+=dt;
}
function drawTowerHub(){
 checker();
 txt('Башня',W/2,48,44,C.cheese,'center','bold');
 txt('Этап '+S.tower.stage+' из '+TOWER_STAGES,W/2,98,28,C.cream,'center','bold');
 txt('Ночь 12:00 — 2:00 · все на средней сложности',W/2,132,18,C.cream,'center');
 const R=S.tower.roster;
 txt('Аниматроников на этапе: '+R.length,W/2,170,20,C.cheese,'center','bold');
 R.forEach((id,i)=>txt(ANIMS.find(x=>x.id===id).icon,95+(i%10)*85,225+Math.floor(i/10)*50,38,C.cream,'center'));
 txt(S.towerNew.length?'Новые: '+S.towerNew.map(id=>ANIMS.find(x=>x.id===id).name).join(', '):'Новых аниматроников больше нет — остаются прежние',W/2,385,18,C.cream,'center');
 btn(330,420,300,60,'Начать ночь',startTowerNight,{fill:C.green});
 btn(40,440,200,48,'В меню',()=>S.scene='menu',{sz:20});
}
function drawPick(){
 checker();
 txt('Этап '+S.tower.stage+': выбери '+S.need+' из '+S.offer.length,W/2,38,34,C.cheese,'center','bold');
 txt('Выбрано: '+S.pickSel.length+' / '+S.need,W/2,76,18,C.cream,'center');
 S.offer.forEach((id,i)=>{
  const a=ANIMS.find(x=>x.id===id),x=30+(i%4)*225,y=100+Math.floor(i/4)*160,on=S.pickSel.includes(id);
  hits.push({x,y,w:210,h:148,fn:()=>{
   if(on)S.pickSel=S.pickSel.filter(v=>v!==id);
   else if(S.pickSel.length>=S.need)say('Уже выбрано '+S.need+' — сними выбор с другого');
   else S.pickSel.push(id)}});
  rr(x,y,210,148,12);g.fillStyle=on?'#4a2418':'#2a1410';g.fill();
  g.lineWidth=on?5:2;g.strokeStyle=on?C.cheese:'#6b3a2c';g.stroke();
  txt(a.icon,x+105,y+38,50,C.cream,'center');
  txt(a.name,x+105,y+80,19,C.cream,'center','bold');
  wrap(a.desc||'',26).slice(0,2).forEach((l,k)=>txt(l,x+105,y+106+k*16,13,'#cbb99a','center'));
  if(on)txt('✔',x+190,y+20,24,C.cheese,'center','bold');
 });
 btn(330,440,300,56,'Подтвердить',confirmPick,{fill:S.pickSel.length===S.need?C.green:'#3a2420'});
}
function drawTowerWin(){
 g.fillStyle='#1a1508';g.fillRect(0,0,W,H);
 txt('Этап '+S.tower.stage+' пройден!',W/2,170,52,C.cheese,'center','bold');
 txt('Впереди этап '+(S.tower.stage+1)+' из '+TOWER_STAGES+' — аниматроников станет больше',W/2,235,22,C.cream,'center');txt('Заработано за этап: $'+S.tower.roster.reduce((sum,id)=>sum+((ANIMS.find(a=>a.id===id)||{}).pay||10),0)+' · Баланс: $'+S.money,W/2,278,20,C.cheese,'center','bold');
 btn(330,320,300,60,'Дальше',()=>{S.tower.stage++;prepareStage()},{fill:C.green});
 btn(330,400,300,56,'В меню',()=>S.scene='menu',{sz:22});
}
function drawTowerEnd(){
 const r=S.run,win=S.towerWin;
 g.fillStyle=win?'#1a1508':'#000';g.fillRect(0,0,W,H);
 txt(win?'Башня покорена!':'Забег окончен',W/2,50,46,win?C.cheese:C.red,'center','bold');
 if(!win&&S.killer)txt('Тебя настиг: '+S.killer.icon+' '+S.killer.name,W/2,95,22,C.cream,'center');
 const rows=[
  ['Этапов пройдено',r.cleared+' из '+TOWER_STAGES],
  ['Рекорд башни',S.tbest+' из '+TOWER_STAGES],
  ['Аниматроников в составе',S.tower.roster.length],
  ['Время в ночах',fmt(r.t)],
  ['Переключений дверей',r.doors],
  ['Фонарик включён',fmt(r.flash)],
  ['Просмотр камер',fmt(r.cam)],
  ['Сигналов подано',r.alarms],
  ['Отключений питания',r.powerOffs],
  ['Деньги за этот забег','$'+(r.earned||0)],['Общий баланс','$'+(S.money||0)],['Побед / забегов в башне',S.twins+' / '+S.truns]
 ];
 rows.forEach((row,i)=>{txt(row[0],250,132+i*26,18,C.cream);txt(String(row[1]),710,132+i*26,18,C.cheese,'right','bold')});
 btn(220,470,240,52,'Заново',startTower,{fill:C.green,sz:22});
 btn(500,470,240,52,'В меню',()=>S.scene='menu',{sz:22});
}
