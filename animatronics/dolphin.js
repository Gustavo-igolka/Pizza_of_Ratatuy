/* Дельфин — один раз за ночь отключает свет; на время отключения свет не включить */
(()=>{
registerAnim({
 id:'dolphin',name:'Дельфин',icon:'🐬',diff:5,kind:'blackout',pay:13,
 desc:'Один раз за ночь отключает свет',lore:'',scare:false,
 play:'Один раз за ночь в случайный момент выключает свет, всё становится ещё темнее, и свет нельзя включить, пока идёт отключение. Сложность: чем выше, тем дольше отключение (от 6 до 25 секунд).',
 update(o,dt){
  if(o.st===2)return;
  if(o.st===undefined){o.st=0;o.at=nightLen()*(0.15+0.7*Math.random())}
  if(o.st===0){
   if(S.t>=o.at&&S.power){o.st=1;o.rem=(5+Math.max(1,o.a.diff))*1000;S.light=false;S.blackout=o.rem;SFX.down();say('🐬 Дельфин отключил свет!')}
   return;
  }
  o.rem-=dt;S.blackout=Math.max(0,o.rem);
  if(o.rem<=0){o.st=2;S.blackout=0;say('Свет снова можно включить')}
 }
});
})();
