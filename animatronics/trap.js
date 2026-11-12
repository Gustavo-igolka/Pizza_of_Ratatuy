/* Капканыч — запчасти → призовой уголок → главный зал → левый коридор. Дверь не защищает.
   Зажми ПКМ на камере с ним: 0,5 с света — шаг назад. */
(()=>{
const ROUTE=['parts','prize','hall','left'];
const step=d=>(12-7*(Math.max(1,d)-1)/19)*1000;
const killTime=d=>(7-3*(Math.max(1,d)-1)/19)*1000;
const camLit=o=>S.flash&&S.power&&S.camOpen&&S.cam===LOC[o.loc]&&mx>=30&&mx<=680&&my>=50&&my<=470;
registerAnim({
 id:'trap',name:'Капканыч',icon:'🪤',diff:5,kind:'trap',pay:18,
 desc:'Идёт от запчастей к левому проходу. Дверь не поможет — свети на него на камерах',lore:'',scare:false,
 play:'Маршрут: запчасти → призовой уголок → главный зал → левый коридор. Дверь от него не защищает. Открой планшет и свети на него (зажми ПКМ над картинкой камеры, где он стоит): через 0,5 секунды он отступит на шаг назад. Шаг у него самый долгий: 12 секунд на сложности 1. Дойдёт до левого прохода и не успеешь отогнать — убьёт.',
 init(o){o.loc='parts'},
 update(o,dt){
  if(o.pos===undefined){o.pos=0;o.t=0;o.lit=0;o.kt=0}
  if(o.pos>0&&camLit(o)){
   o.lit+=dt;
   if(o.lit>=500){o.lit=0;o.pos--;o.loc=ROUTE[o.pos];o.t=0;SFX.door()}
   return;
  }
  o.lit=0;
  if(o.pos<3){
   o.t+=dt;
   if(o.t>=step(o.a.diff)){
    o.t=0;o.pos++;o.loc=ROUTE[o.pos];SFX.step();
    if(o.pos===3){o.kt=killTime(o.a.diff);say('🪤 Капканыч у левого прохода! Свети на него на камере')}
   }
  }else{o.kt-=dt;if(o.kt<=0)kill(o)}
 }
});
})();
