/* Бобр — фазы 1–4 в призовом уголке, 5-я — бежит к правой двери */
(()=>{
registerAnim({
 id:'bvr',name:'Бобр',icon:'🦫',diff:5,kind:'phases',cd:8000,pay:11,
 desc:'Растёт в призовом уголке, потом бежит к правой двери',lore:'',scare:false,
 play:'Сидит в призовом уголке. Каждые 8 секунд с шансом растёт его фаза (1–4). Пока открыта камера уголка, таймер стоит. На 5 фазе бежит к правой двери: закрыта — откат на 2 фазу, открыта — убивает.',
 init(o){o.phase=1;o.run=0;o.n=0;o.loc='prize'},
 hideAtDoor:o=>o.run>1500, // пока бежит издали — у двери ещё не виден
 camSprite(o){if(o.loc==='prize')return {icon:o.a.icon,x:110+o.phase*95,y:310,s:44+o.phase*10}},
 update(o,dt){
  const a=o.a;
  if(o.phase<5){
   if(S.camOpen&&S.cam===3)return; // смотришь на уголок — таймер стоит
   o.t+=dt;if(o.t<a.cd)return;o.t-=a.cd;
   if(Math.random()<chance(a.diff)){o.phase++;if(o.phase===5){o.run=4000;o.n=0;o.loc='right'}}
  }else{
   o.run-=dt;
   const n=Math.floor((4000-o.run)/450);if(n>o.n){o.n=n;SFX.step()}
   if(o.run<=0){
    if(doorHeld('right')||S.t<(S.blockUntil.right||0)){o.run=0;return} // дверь держат или защитная пауза — Бобр ждёт
    if(doorClosed('right')){o.phase=2;o.loc='prize';o.t=0;SFX.door()}
    else kill(o);
   }
  }
 }
});
})();
