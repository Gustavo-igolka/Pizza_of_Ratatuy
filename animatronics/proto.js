/* Прототип — шкала заряда; на нуле 4 секунды предупреждения, потом убивает */
(()=>{
registerAnim({
 id:'proto',name:'Прототип',icon:'🤖',diff:5,kind:'meter',pay:17,
 desc:'Заряжай его шкалу на камере «Запчасти»',lore:'',scare:false,
 play:'Шкала заряда медленно падает. Нажми «Зарядить» на камере «Запчасти», чтобы вернуть 100%. На нуле он просыпается и через 4 секунды убивает.',
 init(o){o.meter=100;o.warn=0;o.n=0;o.loc='parts'},
 camSprite:o=>({icon:o.a.icon,x:560+(o.warn>0?Math.sin(S.t/40)*6:0),y:300,s:o.warn>0?110:80}),
 drawCamUI(o){
  if(S.cam!==4)return;
  txt('Заряд Прототипа: '+Math.ceil(o.meter)+'%',40,415,15,'#9dffb5','left','bold');
  g.fillStyle='#150a07';g.fillRect(40,426,180,14);g.fillStyle=o.meter<25?C.red:'#5fa35a';g.fillRect(40,426,180*o.meter/100,14);
  btn(490,412,180,46,'⚡ Зарядить',()=>{o.meter=100;o.warn=0},{sz:18,fill:C.green});
 },
 update(o,dt){
  if(o.warn>0){
   o.warn-=dt;const n=Math.floor((4000-o.warn)/500);if(n>o.n){o.n=n;SFX.buzz()}
   if(o.warn<=0)kill(o);
   return;
  }
  o.meter-=dt/1000*100/(90-60*(o.a.diff-1)/19);
  if(o.meter<=0){o.meter=0;o.warn=4000;o.n=0;say('Прототип просыпается! Зарядите его на камере «Запчасти»')}
 }
});
})();
