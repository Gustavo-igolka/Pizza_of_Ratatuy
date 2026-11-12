/* ===== УПРАВЛЕНИЕ ===== */
function turn(d){
 if(S.anim||S.camOpen)return;
 const from=side();S.ri=(S.ri+d+4)%4;
 S.anim={from,to:side(),d,t:0};SFX.turn();
}
function pos(e){const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)*W/r.width;my=(e.clientY-r.top)*H/r.height}
cv.addEventListener('mousemove',pos);
cv.addEventListener('mousedown',e=>{
 pos(e);ac();
 if(e.button===0){for(let i=hits.length-1;i>=0;i--){const b=hits[i];if(mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h){SFX.click();b.fn();break}}}
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
 ac();
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
