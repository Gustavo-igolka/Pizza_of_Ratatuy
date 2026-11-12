/* Рок-стар Краб — ждёт, пока игрок посмотрит на окно, потом появляется у края: закрой ближайшую дверь */
(()=>{
const wait=d=>(40000-28000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
const runTime=d=>(8-4*(Math.max(1,d)-1)/19)*1000;
registerAnim({
 id:'rcrab',name:'Рок-стар Краб',icon:'🤘',diff:5,kind:'rcrab',grp:'rock',pay:15,
 desc:'Появляется у края окна, как только посмотришь на окно',lore:'',scare:false,
 play:'Прячется, пока ты не посмотришь прямо на окно. Тогда появляется у левого или правого края окна: беги на щиток и закрой ближайшую к нему дверь, пока не вышло время. Сложность: от 8 секунд до 4 на пробежку.',
 init(o){o.loc='away';o.w=wait(o.a.diff)},
 holdsWindow:o=>o.loc==='window',
 drawWindow(o){
  if(o.loc!=='window')return;
  const ex=o.edge==='left'?310:650;
  txt(o.a.icon,ex+Math.sin(S.t/120)*3,215,125,C.cream,'center');
 },
 update(o,dt){
  if(o.loc==='away'){
   o.t+=dt;
   if(o.t>=o.w&&side()===0&&!S.anim&&!S.camOpen){
    if(windowBusy(o))return;
    o.loc='window';o.edge=Math.random()<.5?'left':'right';o.rt=runTime(o.a.diff);
    SFX.knock();say('🤘 Рок-стар Краб у '+(o.edge==='left'?'левого':'правого')+' края окна! Закрой '+(o.edge==='left'?'левую':'правую')+' дверь!');
   }
   return;
  }
  if(doorClosed(o.edge)){o.loc='away';o.t=0;o.w=wait(o.a.diff);SFX.door();return}
  o.rt-=dt;if(o.rt<=0)kill(o);
 }
});
})();
