/* =====================================================================
   ДВИЖОК ИИ: сервисы для аниматроников
   Ядро ничего не знает про конкретных аниматроников. Оно вызывает
   необязательные «хуки», которые аниматроник описывает в своём файле:
     init(o)            — начальное состояние экземпляра o
     update(o,dt)       — ИИ каждый кадр
     holdsDoor(o,side)  — true, если держит дверь 'left'/'right' (блокирует остальных)
     holdsWindow(o)     — true, если сейчас занимает окно
     blocksSystems(o)   — {hud,flash,tablet} если блокирует планшет/фонарик
     hideAtDoor(o)      — true, если у двери его пока не видно
     camSprite(o,ctx)   — свой спрайт на камере {icon,x,y,s} (или null)
     onSiren(o,cam)     — сигнал подан на камере cam
     failsNight(o)      — true, если из-за него ночь проиграна в 6:00
     drawWindow(o)      — рисует в окне главной комнаты
     drawOffice(o)      — рисует поверх главной комнаты
     drawBack(o)        — рисует в комнате щитка
     drawOverlay(o)     — рисует поверх темноты, когда смотришь на окно
     drawCamUI(o)       — рисует на планшете камер (кнопки, шкалы)
   ===================================================================== */
const doorClosed=s=>S.power&&(s==='left'?S.doorL:S.doorR);
const chance=d=>d<=0?0:.10+.40*(d-1)/19; // шанс хода: 10% на сложности 1 → 50% на 20
const doorHeld=s=>(s==='left'||s==='right')&&(S.ai||[]).some(o=>o.a.holdsDoor&&o.a.holdsDoor(o,s));
const windowBusy=self=>(S.ai||[]).some(o=>o!==self&&o.a.holdsWindow&&o.a.holdsWindow(o));
function systemsBlock(){for(const o of S.ai||[]){const b=o.a.blocksSystems&&o.a.blocksSystems(o);if(b)return b}return null}
const nightLen=()=>(S.mode==='tower'?2:6)*HOUR_MS;

// Субтитры: S.sub — основная строка, S.sub2 — строка выше
function sub(text,ms){S.sub={text,until:S.t+ms}}
function drawSubs(cx,cy){
 [[S.sub,cy],[S.sub2,cy-40]].forEach(([sb,y])=>{
  if(!sb||S.t>=sb.until)return;
  g.font='bold 20px "Trebuchet MS",Arial,sans-serif';
  const w=Math.min(W-40,g.measureText(sb.text).width+36);
  rr(cx-w/2,y-18,w,36,8);g.fillStyle='rgba(0,0,0,.78)';g.fill();
  txt(sb.text,cx,y,20,C.cream,'center','bold');
 });
}

function initAI(){
 S.killer=null;S.blockUntil={left:0,right:0};
 S.ai=activeList().map(a=>{const o={a,t:0,n:0,loc:'none'};if(a.init)a.init(o);return o});
 S.blackout=0;S.sub=null;S.sub2=null;
}
function kill(o){
 S.killer=o.a;S.flash=false;S.camOpen=false;SFX.scare();
 const done=()=>{if(S.mode==='tower')towerOver(false);else S.scene='lose'};
 if(o.a.scare){S.scare={a:o.a,t:0,done};S.scene='scare'}else done();
}
function updateAI(dt){
 if(!S.ai||S.scene!=='game')return;
 for(const o of S.ai){
  if(o.a.update)o.a.update(o,dt);
  if(S.scene!=='game')return;
 }
}
// вызвать хук у всех аниматроников (в порядке слоёв: layer меньше — рисуется раньше)
function callHook(name,...args){
 if(!S.ai)return;
 const list=S.ai.some(o=>o.a.layer)?S.ai.slice().sort((x,y)=>(x.a.layer||0)-(y.a.layer||0)):S.ai;
 for(const o of list)if(o.a[name])o.a[name](o,...args);
}
const atDoor=side=>(S.ai||[]).filter(o=>o.loc===side&&!(o.a.hideAtDoor&&o.a.hideAtDoor(o)));
function animsIn(ci){
 const out=[];
 (S.ai||[]).forEach(o=>{
  if(LOC[o.loc]!==ci)return;
  const k=out.length,off=k?(k%2?1:-1)*Math.ceil(k/2)*70:0;
  const custom=o.a.camSprite&&o.a.camSprite(o,{ci,k,off});
  if(custom)out.push(custom);
  else if(ci===2)out.push({icon:o.a.icon,x:200+k*110,y:205,s:72});
  else out.push({icon:o.a.icon,x:325+off,y:235,s:84});
 });
 return out;
}
