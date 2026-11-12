/* 773j3 — уходит из главного зала в случайную комнату; простоял 15 с — выключает питание. Сигнал оглушает. */
(()=>{
const ROOMS=['left','right','prize','parts'],STAY=15000;
const wait=d=>(32000-24000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
registerAnim({
 id:'glitch',name:'773j3',icon:'👾',diff:5,kind:'glitch',pay:20,
 desc:'Уходит из главного зала в случайную комнату и вырубает питание',lore:'',scare:false,
 play:'Из главного зала уходит в случайную комнату (левый или правый коридор, призовой уголок, запчасти). Если простоит там 15 секунд — выключит всё питание. Сигнал (Space) на камере, где он стоит, оглушает его, и он возвращается в зал. Сложность: чаще уходит из главного зала.',
 init(o){o.loc='hall';o.w=wait(o.a.diff)},
 onSiren(o,ci){
  if(o.loc!=='hall'&&LOC[o.loc]===ci){o.loc='hall';o.t=0;o.w=wait(o.a.diff);SFX.door();say('Сигнал оглушил 773j3')}
 },
 update(o,dt){
  if(o.loc==='hall'){
   o.t+=dt;
   if(o.t>=o.w){o.loc=pickOf(ROOMS);o.st=0;SFX.buzz()}
   return;
  }
  o.st+=dt;
  if(o.st>=STAY){
   if(S.power){S.power=false;S.doorL=S.doorR=S.light=S.cams=S.alarm=S.camOpen=S.flash=false;SFX.down();say('👾 773j3 отключил всё питание!')}
   o.loc='hall';o.t=0;o.w=wait(o.a.diff);
  }
 }
});
})();
