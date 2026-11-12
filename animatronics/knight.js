/* Рыцарь К3 — приходит к окну. Свети фонариком 6 с суммарно — уйдёт; 10 с без света — убьёт. */
(()=>{
const LIGHT_MS=6000,KILL_MS=10000;
const wait=d=>(60000-50000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
const lit=()=>S.flash&&S.power&&!S.camOpen&&!S.anim&&side()===0&&Math.hypot(mx-480,my-205)<130;
registerAnim({
 id:'knight',name:'Рыцарь К3',icon:'🛡️',diff:5,kind:'window',pay:16,
 desc:'Появляется за окном. Свети на него фонариком 6 секунд',
 lore:'',scare:true,
 play:'Появляется за окном и смотрит на тебя. Свети на него фонариком (ПКМ) в сумме 6 секунд — он уйдёт. Пока на него светят, таймер убийства стоит; без света через 10 секунд он убьёт. Сложность задаёт, как часто он приходит.',
 init(o){o.loc='away';o.lit=0;o.kt=KILL_MS;o.w=wait(o.a.diff)},
 holdsWindow:o=>o.loc==='window',
 drawWindow(o){
  if(o.loc!=='window')return;
  const k=1-o.kt/KILL_MS;
  g.save();g.globalAlpha=1-0.6*o.lit/LIGHT_MS;
  txt('🛡️',480+(k>.6?Math.sin(S.t/30)*4:0),215,110+70*k,C.cream,'center');g.restore();
 },
 update(o,dt){
  if(o.loc==='away'){o.t+=dt;if(o.t>=o.w){if(windowBusy(o))return;o.loc='window';o.lit=0;o.kt=KILL_MS;SFX.knock()}return}
  if(lit()){o.lit+=dt;if(o.lit>=LIGHT_MS){o.loc='away';o.t=0;o.w=wait(o.a.diff);SFX.door()}}
  else{o.kt-=dt;if(o.kt<=0)kill(o)}
 }
});
})();
