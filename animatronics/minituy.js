/* Минитуй — появляется в офисе, блокирует планшет и фонарик. Нажми на него! */
(()=>{
const wait=d=>(45000-35000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
registerAnim({
 id:'minituy',name:'Минитуй',icon:'🐭',diff:5,kind:'clicker',pay:8,layer:10,
 desc:'Появляется в офисе и блокирует планшет и фонарик. Нажми на него!',lore:'',scare:false,
 play:'Внезапно появляется в случайной точке офиса. Пока он в офисе, он блокирует планшет камер и фонарик. Быстро кликни по нему мышкой, чтобы прогнать.',
 init(o){o.active=false;o.w=wait(o.a.diff);o.x=0;o.y=0},
 blocksSystems:o=>o.active?{hud:'⚠️ МИНИТУЙ БЛОКИРУЕТ СИСТЕМЫ! НАЖМИ НА НЕГО!',flash:'Минитуй мешает включить фонарик!',tablet:'Минитуй мешает открыть планшет!'}:null,
 drawOffice(o){
  if(!o.active)return;
  const hov=mx>=o.x-30&&mx<=o.x+30&&my>=o.y-30&&my<=o.y+30;
  if(!noHit)hits.push({x:o.x-30,y:o.y-30,w:60,h:60,fn:()=>{o.active=false;o.t=0;o.w=wait(o.a.diff);SFX.click();say('Минитуй испугался!')}});
  g.save();
  if(hov){g.shadowColor=C.cheese;g.shadowBlur=15}
  txt(o.a.icon,o.x,o.y,60+Math.sin(S.t/80)*5,C.cream,'center');
  g.restore();
 },
 update(o,dt){
  if(o.active)return;
  o.t+=dt;
  if(o.t>=o.w){
   o.active=true;
   o.x=260+Math.random()*440;
   o.y=120+Math.random()*240;
   if(S.camOpen)S.camOpen=false;
   S.flash=false;
   SFX.buzz();
   say('Минитуй заблокировал системы!');
  }
 }
});
})();
