/* ===== ОФИС: главная комната, боковые двери, щиток, кадр игры ===== */
function mainRoom(){
 g.fillStyle='#5a3322';g.fillRect(215,55,530,300);
 const gr=g.createLinearGradient(0,75,0,335);gr.addColorStop(0,'#0b1330');gr.addColorStop(1,'#1d2a4a');
 g.fillStyle=gr;g.fillRect(235,75,490,260);
 g.fillStyle='#161d33';
 for(let i=0;i<8;i++)for(let j=0;j<3;j++)if((i+j)%2===0)g.fillRect(235+i*61,255+j*27,61,27);
 g.fillStyle=C.cheese;g.beginPath();g.arc(650,125,24,0,7);g.fill();
 // гирлянда лампочек под потолком окна
 for(let i=0;i<7;i++){const lx=265+i*70,ly=92+Math.sin(i*1.1)*4;
  bulbLight(lx,ly,60,i*1.7);g.fillStyle=i%2?'#ffd27a':'#ff9d5c';g.beginPath();g.arc(lx,ly,4.5,0,7);g.fill()}
 g.strokeStyle='#241a10';g.lineWidth=2;g.beginPath();
 for(let i=0;i<=6;i++){const t=i/6,x=265+t*420,y=88+Math.sin(t*6.6)*6;i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
 // тёплые тени на полу
 g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(300,398,150,12,0,0,7);g.fill();
 g.beginPath();g.ellipse(640,398,120,10,0,0,7);g.fill();
 // аниматроники за окном (всё обрезается рамкой окна)
 g.save();g.beginPath();g.rect(235,75,490,260);g.clip();callHook('drawWindow');g.restore();
 g.fillStyle='#5a3322';g.fillRect(472,75,16,260);g.fillRect(235,195,490,14);
 g.fillStyle='#7a4630';g.fillRect(195,350,570,18);
 g.fillStyle='#3b2015';g.fillRect(0,400,W,140);g.fillStyle='#5a3322';g.fillRect(0,400,W,8);
 rr(60,110,110,150,6);g.fillStyle=C.cream;g.fill();
 txt('Pizza',115,140,22,C.red,'center','bold');txt('🐀',115,200,50,C.cream,'center');
 txt('🍕',140,462,56,C.cream,'center');txt('🥤',820,462,50,C.cream,'center');
 // блики на столе и пылинки в свете лампы
 g.fillStyle='rgba(255,230,170,.06)';rr(60,110,110,10,4);g.fill();
 g.fillStyle='rgba(255,235,190,.10)';
 for(let i=0;i<10;i++){const px=240+(i*97+S.fk)%480,py=120+(i*53+Math.sin(((S.t||0)/900)+i)*22)%200;g.fillRect(px,py,2,2)}
 callHook('drawOffice');
}
function sideRoom(id){
 const right=id===1,dx=right?600:140,dw=220,ix=right?70:520;
 const p=right?S.dr:S.dl;
 // интерьер
 g.fillStyle='#6b3a2c';g.fillRect(ix,300,400,12);
 g.fillStyle=C.cheese;for(let i=0;i<3;i++)g.fillRect(ix+20+i*80,256,70,44);
 g.fillStyle='#1a0c09';rr(ix+250,120,140,180,[70,70,0,0]);g.fill();
 const og=g.createRadialGradient(ix+320,290,5,ix+320,270,90);
 og.addColorStop(0,'#ff8a2a');og.addColorStop(1,'#3a0f08');
 g.fillStyle=og;rr(ix+265,150,110,150,[55,55,0,0]);g.fill();
 rr(ix+20,110,110,140,6);g.fillStyle=C.cream;g.fill();
 txt('🍕',ix+75,160,50,C.cream,'center');txt('Pizza of Ratatuy',ix+75,220,13,C.red,'center','bold');
 g.fillStyle='#4a2a1e';for(let i=0;i<4;i++)g.fillRect(ix+20+(i%2)*90,330+Math.floor(i/2)*38,80,34);
 // дверь
 g.fillStyle='#120807';g.fillRect(dx-14,66,dw+28,352);
 const gd=g.createLinearGradient(0,80,0,418);gd.addColorStop(0,'#050202');gd.addColorStop(1,'#1c0e0a');
 g.fillStyle=gd;g.fillRect(dx,80,dw,338);
 atDoor(right?'right':'left').forEach((o,k)=>txt(o.a.icon,dx+dw/2+(k?(k%2?1:-1)*Math.ceil(k/2)*60:0),310,120,C.cream,'center'));
 if(p>.001){
  const dh=338*p,g2=g.createLinearGradient(dx,0,dx+dw,0);
  g2.addColorStop(0,'#5d6068');g2.addColorStop(.5,'#8a8d96');g2.addColorStop(1,'#5d6068');
  g.fillStyle=g2;g.fillRect(dx,80,dw,dh);
  g.fillStyle='#43454c';for(let y=130;y<80+dh-10;y+=60)g.fillRect(dx+12,y,dw-24,6);
  g.fillStyle='#2b2d33';g.fillRect(dx,80+dh-8,dw,8);
  if(dh>40){g.fillStyle=C.red;g.beginPath();g.arc(dx+dw/2,104,9,0,7);g.fill()}
 }
 txt(right?'Правая дверь':'Левая дверь',dx+dw/2,455,20,C.cream,'center');
 // лампа над дверью и тень от неё на полу
 bulbLight(dx+dw/2,74,120,right?2.2:.6);
 g.fillStyle='#3a2015';g.beginPath();g.ellipse(dx+dw/2,72,26,9,0,0,7);g.fill();
 g.fillStyle='rgba(255,200,120,.05)';g.beginPath();g.moveTo(dx+dw/2-30,80);g.lineTo(dx+dw/2+30,80);g.lineTo(dx+dw/2+dw/2+40,418);g.lineTo(dx+dw/2-dw/2-40,418);g.closePath();g.fill();
}
function backRoom(){
 g.fillStyle='#1b1512';g.fillRect(0,0,W,H);
 g.strokeStyle='#2c221c';g.lineWidth=8;
 for(let i=0;i<6;i++){g.beginPath();g.moveTo(40+i*30,0);g.bezierCurveTo(60+i*30,200,10+i*30,300,50+i*30,540);g.stroke();}
 rr(170,40,620,460,16);g.fillStyle='#2b2f2c';g.fill();g.lineWidth=6;g.strokeStyle='#555a55';g.stroke();
 txt('Щиток',W/2,72,26,C.cream,'center','bold');
 const xs=[215,395,575],y1=100,y2=290,h=170-20;
 const onoff=v=>v?'включено':'выключено';
 const st=(v,a,b)=>S.power&&v?a:b, col=v=>S.power&&v?C.green:'#6b2a24';
 // верхний ряд: сигнализация | свет | камеры
 btn(xs[0],y1,170,h,'Сигнализация',togAlarm,{sz:20,fill:col(S.alarm),sub:st(S.alarm,'работает','выключена')});
 btn(xs[1],y1,170,h,'Свет',togLight,{fill:S.blackout>0?'#3a1410':col(S.light),sub:S.blackout>0?'отключён':st(S.light,'включён','выключен')});
 btn(xs[2],y1,170,h,'Камеры',togCams,{fill:col(S.cams),sub:st(S.cams,'работают','выключены')});
 // нижний ряд (вид сзади: левая кнопка = правая дверь)
 btn(xs[0],y2,170,h,'Правая дверь',()=>togDoor(true),{sz:20,fill:col(S.doorR),sub:st(S.doorR,'закрыта','открыта')});
 btn(xs[1],y2,170,h,'Питание',togPower,{fill:S.power?C.green:'#6b2a24',sub:onoff(S.power)});
 btn(xs[2],y2,170,h,'Левая дверь',()=>togDoor(false),{sz:20,fill:col(S.doorL),sub:st(S.doorL,'закрыта','открыта')});
 txt('Включено рубильников: '+onCount()+' / '+MAXSW+' (без питания)',W/2,470,18,C.cream,'center');
 callHook('drawBack');
}
function room(id,ox){
 g.save();g.translate(ox,0);g.beginPath();g.rect(0,0,W,H);g.clip();
 if(id===3)backRoom();
 else{
  g.fillStyle=C.wall;g.fillRect(0,0,W,H);g.fillStyle=C.floor;g.fillRect(0,420,W,120);
  g.fillStyle='#5a2e22';g.fillRect(0,414,W,8);
  if(id===0)mainRoom();else sideRoom(id);
 }
 g.restore();
}
function shade(id){
 const lit=S.power&&S.light;
 let a=!S.power?0.9:lit?0.25:0.8;
 if(lit&&S.fkT>0&&Math.floor(S.fkT/45)%2===0)a=0.78;
 if(S.blackout>0)a=0.97;
 if(id===3)a*=0.6;
 if(S.flash&&S.power){
  const r=g.createRadialGradient(mx,my,20,mx,my,190);
  r.addColorStop(0,'rgba(0,0,0,0)');r.addColorStop(1,'rgba(0,0,0,'+a+')');
  g.fillStyle=r;
 }else g.fillStyle='rgba(0,0,0,'+a+')';
 g.fillRect(0,0,W,H);
 if(S.flash&&S.power){
  const r=g.createRadialGradient(mx,my,0,mx,my,170);
  r.addColorStop(0,'rgba(255,235,170,.22)');r.addColorStop(1,'rgba(255,235,170,0)');
  g.fillStyle=r;g.fillRect(0,0,W,H);
 }
}
function drawGame(dt){
 let id=side();
 updateDoors(dt);
 updateNight(dt);
 updateAlarm(dt);
 updateFlicker(dt);
 updateAI(dt);
 trackStats(dt);
 if(S.camOpen){drawTablet();return}
 if(S.anim){
  const A=S.anim;A.t+=dt/380;
  const t=Math.min(1,A.t),e=t<.5?2*t*t:1-2*(1-t)*(1-t);
  room(A.from,-A.d*e*W);room(A.to,A.d*(1-e)*W);
  id=A.to;
  if(A.t>=1)S.anim=null;
 }else room(id,0);
 shade(id);
 if(!S.anim&&id===0)callHook('drawOverlay');
 // HUD
 g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,34);g.fillRect(0,H-30,W,30);
 txt(S.mode==='tower'?'Этап '+S.tower.stage+'/'+TOWER_STAGES+' · аниматроников: '+(S.ai||[]).length:'Ночь 1 · '+(S.ai||[]).map(o=>o.a.icon).join(' '),12,17,16,C.cream);
 txt(SIDE_NAMES[id],W-12,17,16,C.cheese,'right','bold');
 const blk=systemsBlock();
 txt(blk?blk.hud:'A / D — поворот · ЛКМ — кнопки · ПКМ — фонарик · W — камеры · Пробел — сигнализация · Esc — меню',W/2,H-15,14,blk?C.red:C.cream,'center',blk?'bold':'');
 txt(clockText(),W/2,17,20,C.cheese,'center','bold');
 rr(12,H-82,210,44,8);g.fillStyle='rgba(0,0,0,.6)';g.fill();
 txt('Рубильники:',24,H-60,16,C.cream);
 const n=onCount();
 for(let i=0;i<MAXSW;i++){g.fillStyle=i<n?(n<MAXSW?'#5fa35a':C.red):'#3a2a24';g.fillRect(126+i*26,H-68,22,16)}
 drawSubs(W/2,H-104);
}
