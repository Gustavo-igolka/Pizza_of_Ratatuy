/* ===== КАМЕРЫ: фоны комнат и планшет ===== */
function camCorridor(right){
 const p=right?S.dr:S.dl;
 g.fillStyle='#1c1210';g.beginPath();g.moveTo(0,0);g.lineTo(650,0);g.lineTo(400,120);g.lineTo(250,120);g.fill();
 g.fillStyle='#2a1814';g.beginPath();g.moveTo(0,420);g.lineTo(650,420);g.lineTo(400,300);g.lineTo(250,300);g.fill();
 g.fillStyle='#3a2420';g.beginPath();g.moveTo(0,0);g.lineTo(250,120);g.lineTo(250,300);g.lineTo(0,420);g.fill();
 g.beginPath();g.moveTo(650,0);g.lineTo(400,120);g.lineTo(400,300);g.lineTo(650,420);g.fill();
 g.strokeStyle='#4a2c24';g.lineWidth=2;
 for(let i=0;i<=6;i++){g.beginPath();g.moveTo(i*650/6,420);g.lineTo(250+i*25,300);g.stroke()}
 g.fillStyle=p>.5?'#7a7d86':'#050202';g.fillRect(250,120,150,180);
 if(p>.5){g.fillStyle=C.red;g.beginPath();g.arc(325,140,6,0,7);g.fill()}
}
function camHall(){
 g.fillStyle='#34201a';g.fillRect(0,0,650,420);
 for(let r=0;r<4;r++)for(let c=0;c<13;c++){g.fillStyle=(r+c)%2?'#2b1612':'#3e2119';g.fillRect(c*50,252+r*42,50,42)}
 g.fillStyle='#6b3a2c';g.fillRect(130,230,390,22);
 g.fillStyle='#4a2a1e';g.fillRect(150,120,350,110);
 g.fillStyle='#7a1f1a';g.fillRect(150,30,350,95);
 g.fillStyle='#5a1510';for(let i=0;i<8;i++)g.fillRect(150+i*44,30,14,95);
 txt('Pizza of Ratatuy',325,78,24,C.cheese,'center','bold');
 txt('🍕',80,330,44,C.cream,'center');txt('🍕',570,330,44,C.cream,'center');
 txt('🎈',60,150,40,C.cream,'center');txt('🎉',590,150,40,C.cream,'center');
}
function camPrize(){
 g.fillStyle='#3a1f2e';g.fillRect(0,0,650,420);g.fillStyle='#24120e';g.fillRect(0,300,650,120);
 g.fillStyle='#6b3a2c';[110,200,290].forEach(y=>g.fillRect(60,y,530,10));
 const em=['🧸','🎁','🏆','🎈'];
 for(let r=0;r<3;r++)for(let c=0;c<7;c++)txt(em[(r+c)%4],100+c*75,80+r*90,44,C.cream,'center');
 g.fillStyle='#7a4630';g.fillRect(180,335,290,60);
 txt('Призы',325,365,28,C.cheese,'center','bold');
}
function camParts(){
 g.fillStyle='#22262a';g.fillRect(0,0,650,420);g.fillStyle='#15181b';g.fillRect(0,320,650,100);
 g.fillStyle='#4a4f55';[100,190,280].forEach(y=>g.fillRect(40,y,570,10));
 const em=['⚙️','🔩','🔧','🔌'];
 for(let r=0;r<3;r++)for(let c=0;c<7;c++)txt(em[(r+c)%4],80+c*80,70+r*90,38,C.cream,'center');
 g.fillStyle='#3a3f45';g.fillRect(200,340,250,50);
 txt('Запчасти',325,365,26,'#cfd4da','center','bold');
}
const CAMF=[()=>camCorridor(false),()=>camCorridor(true),camHall,camPrize,camParts];

function drawTablet(){
 g.fillStyle='#0a0d0b';g.fillRect(0,0,W,H);
 g.save();g.translate(30,50);g.beginPath();g.rect(0,0,650,420);g.clip();
 CAMF[S.cam]();
 animsIn(S.cam).forEach(a=>txt(a.icon,a.x,a.y,a.s||70,C.cream,'center'));
 if(S.flash&&S.power){const r=g.createRadialGradient(mx-30,my-50,0,mx-30,my-50,150);r.addColorStop(0,'rgba(255,240,180,.45)');r.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=r;g.fillRect(0,0,650,420)}
 txt('ПКМ — фонарик',600,22,14,'#9dffb5','right');
 g.fillStyle='rgba(40,255,120,.10)';g.fillRect(0,0,650,420);
 for(let i=0;i<70;i++){g.fillStyle='rgba(255,255,255,'+Math.random()*.1+')';g.fillRect(Math.random()*650,Math.random()*420,Math.random()*30+2,2)}
 g.fillStyle='rgba(0,0,0,.18)';for(let y=0;y<420;y+=4)g.fillRect(0,y,650,1);
 txt('CAM '+(S.cam+1)+' — '+CAMS[S.cam],14,22,18,'#9dffb5','left','bold');
 if(S.dist[S.cam]){txt('🔊 Отвлечение: 1',14,48,18,C.cheese,'left','bold');g.strokeStyle='rgba(242,193,78,'+(.5+.4*Math.sin(S.t/120))+')';g.lineWidth=6;g.strokeRect(3,3,644,414)}
 if(Math.floor(S.t/500)%2===0){g.fillStyle='#ff3b30';g.beginPath();g.arc(620,22,8,0,7);g.fill()}
 g.restore();
 g.lineWidth=4;g.strokeStyle='#3b423d';g.strokeRect(30,50,650,420);
 drawSubs(355,380);
 txt(clockText(),W/2,26,22,C.cheese,'center','bold');
 txt('Камеры',815,72,26,C.cheese,'center','bold');
 CAMS.forEach((n,i)=>btn(705,95+i*62,220,52,(S.dist[i]?'🔊 ':'')+(i+1)+'. '+n,()=>S.cam=i,{sz:18,fill:i===S.cam?C.green:'#3a2420'}));
 // лёгкая хроматическая аберрация поверх кадра
 g.save();g.globalCompositeOperation='screen';g.globalAlpha=.05;g.filter='blur(1px)';
 g.fillStyle='#ff0040';g.fillRect(32,50,650,420);
 g.fillStyle='#00e0ff';g.fillRect(28,50,650,420);g.restore();
 g.fillStyle='rgba(0,0,0,.35)';g.fillRect(32,50,650,6);g.fillRect(32,464,650,6);
 callHook('drawCamUI');
 btn(705,415,220,56,'Закрыть (W)',()=>S.camOpen=false,{sz:20});
 btn(30,480,300,44,'Сигнал на камере (Space)',useAlarm,{sz:18,fill:S.alarm?C.red:'#3a2420'});
 g.fillStyle='#150a07';g.fillRect(350,492,330,20);
 g.fillStyle=S.alarmCd>0?C.cheese:'#5fa35a';g.fillRect(350,492,330*(S.alarmCd>0?1-S.alarmCd/ALARM_CD:1),20);
 txt(!S.alarm?'сигнализация выключена на щитке':S.alarmCd>0?'перезарядка…':'сигнал готов',515,502,14,C.dark,'center','bold');
}
