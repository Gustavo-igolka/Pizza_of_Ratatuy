/* Toy Бобр — появляется у двери; субтитры говорят у какой. Закрой её, чтобы прогнать. */
(()=>{
const wait=d=>(18000-9000*(Math.max(1,d)-1)/19)*(0.8+Math.random()*0.4);
registerAnim({
 id:'toybvr',name:'Toy Бобр',icon:'🦫',diff:5,kind:'toybvr',grp:'toy',pay:10,
 desc:'Следи за субтитрами и закрывай указанную дверь',
 lore:'Toy Бобр — полностью пластиковая версия Бобра из яркой аркадной коллекции. Днём помогает проверять автоматы, переносит призы и следит за игровым залом.',
 scare:false,
 play:'Появляется в одной из дверей, если она не заблокирована. Субтитры сообщают, у какой именно двери он появился. Закрой эту дверь, чтобы прогнать его.',
 init(o){o.loc='away';o.w=wait(o.a.diff)},
 update(o,dt){
  if(o.loc==='away'){
   o.t+=dt;
   if(o.t>=o.w){
    const sides=['left','right'].filter(sd=>!doorClosed(sd)&&S.t>=(S.blockUntil[sd]||0));
    if(!sides.length){o.t=0;o.w=wait(o.a.diff);return}
    o.loc=sides[Math.floor(Math.random()*sides.length)];o.kt=4500;SFX.knock();
    sub('🦫 Toy Бобр появился у '+(o.loc==='left'?'ЛЕВОЙ':'ПРАВОЙ')+' двери!',3000);
   }
   return;
  }
  if(doorClosed(o.loc)){const sd=o.loc;o.loc='away';o.t=0;o.w=wait(o.a.diff);S.blockUntil[sd]=S.t+3000;SFX.door();say('Toy Бобр прогнан! Проход защищён ещё 3 секунды');return}
  o.kt-=dt;if(o.kt<=0)kill(o);
 }
});
})();
