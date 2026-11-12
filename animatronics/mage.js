/* Маг — появляется в левом/правом проходе, блокирует аниматроников у этой двери.
   Сигнал на камере прогоняет его. Не успел — убивает. */
(()=>{
const wait=d=>(50000-38000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
const killTime=d=>20000-12000*(Math.max(1,d)-1)/19;
registerAnim({
 id:'mage',name:'Маг',icon:'🧙',diff:5,kind:'mage',pay:15,
 desc:'Появляется в проходе. Прогони его сигнализацией на камере',lore:'',scare:false,
 play:'Появляется в левом или правом проходе (виден на камере коридора). Пока он там, он блокирует аниматроника, идущего к этой же двери. Включи сигнал (Space) на камере этого коридора — он уйдёт, но проход откроется для других. Не успеешь — убьёт. Сложность: чаще приходит и быстрее убивает.',
 init(o){o.loc='away';o.w=wait(o.a.diff)},
 holdsDoor:(o,s)=>o.loc===s,
 onSiren(o,ci){
  if(o.loc!=='away'&&LOC[o.loc]===ci){const sd=o.loc;o.loc='away';o.t=0;o.w=wait(o.a.diff);S.blockUntil[sd]=S.t+3000;SFX.door();say('Маг ушёл — проход открыт (ещё 3 секунды безопасно)')}
 },
 update(o,dt){
  if(o.loc==='away'){
   o.t+=dt;
   if(o.t>=o.w){
    o.loc=Math.random()<.5?'left':'right';o.kt=killTime(o.a.diff);SFX.knock();
    if(o.loc==='left')S.doorL=false;else S.doorR=false; // открывает свою дверь
    say('🧙 Маг в '+(o.loc==='left'?'левом':'правом')+' проходе! Включи сигнал на его камере');
   }
   return;
  }
  o.kt-=dt;if(o.kt<=0)kill(o);
 }
});
})();
