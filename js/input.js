/* ===== УПРАВЛЕНИЕ ===== */
function turn(d){
 if(S.anim||S.camOpen)return;
 const from=side();S.ri=(S.ri+d+4)%4;
 S.anim={from,to:side(),d,t:0};SFX.turn();
}
function pos(e){const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)*W/r.width;my=(e.clientY-r.top)*H/r.height}
let volDrag=null;
function volAt(e){if(!volDrag)return;const r=cv.getBoundingClientRect();
 const x=(e.clientX-r.left)*W/r.width;const [bx,bw]=volDrag;setVol(volDrag[2],(x-bx)/bw)}
// зоны ползунков на экране «Настройки звука» (координаты совпадают с drawSound в menu.js)
function volHit(){const bx=280,bw=400;
 if(mx>=bx-14&&mx<=bx+bw+14){
  if(my>=215&&my<=268)return[bx,bw,'sfx'];
  if(my>=315&&my<=368)return[bx,bw,'bgm']}
 return null}
cv.addEventListener('mousemove',pos);
addEventListener('mousemove',e=>{volAt(e)});
addEventListener('mouseup',e=>{if(e.button===0)volDrag=null});
cv.addEventListener('mousedown',e=>{
 pos(e);ac();unlockAudio();
 if(e.button===0){
  const vd=S.scene==='sound'?volHit():null;
  if(vd){volDrag=vd;volAt(e);return}
  for(let i=hits.length-1;i>=0;i--){const b=hits[i];if(mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h){SFX.click();b.fn();break}}
 }
 else if(e.button===2&&S.scene==='game'){
  const blk=systemsBlock();
  if(blk)return say(blk.flash||'Системы заблокированы!');
  if(S.power)S.flash=true;else say('Нет питания');
 }
});
addEventListener('mouseup',e=>{if(e.button===2)S.flash=false});
addEventListener('contextmenu',e=>e.preventDefault());
// колесо мыши — прокрутка списка в «Экстра»
cv.addEventListener('wheel',e=>{
 if(S.scene!=='extra')return;
 e.preventDefault();
 S.xscroll=Math.max(0,Math.min(S.xmax||0,S.xscroll+(e.deltaY>0?1:-1)));
},{passive:false});
addEventListener('keydown',e=>{
 if(e.code==='Space')e.preventDefault();
 ac();unlockAudio();
 if(e.repeat)return;
 if(e.code==='KeyM'){toggleMute();say(S.mute?'Звук выключен':'Звук включён');return}
 if(S.scene==='game'){
  if(e.code==='KeyA')turn(-1);         // A — повернуть налево
  else if(e.code==='KeyD')turn(1);     // D — повернуть направо
  else if(e.code==='KeyW'){
   const blk=systemsBlock();
   if(blk)return say(blk.tablet||'Системы заблокированы!');
   if(S.camOpen)S.camOpen=false;
   else if(!S.power||!S.cams)say('Камеры выключены — включи их на щитке');
   else if(!S.anim){S.camOpen=true;S.flash=false;SFX.tab()}
  }
  else if(e.code==='Space')useAlarm();
  else if(e.code==='Escape'){if(S.camOpen)S.camOpen=false;else S.scene='menu'}
 }else if(e.code==='Escape'&&S.scene!=='menu')S.scene='menu';
});
