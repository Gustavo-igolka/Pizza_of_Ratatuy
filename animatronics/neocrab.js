/* Нео-краб — клешня у щитка. Свет: +2/с, темнота: −1/с. На нуле убивает. Фонарик на клешню = свет. */
(()=>{
const clawMax=d=>(40-25*(Math.max(1,d)-1)/19);
const clawPos=o=>({x:870,y:60+(1-o.c/o.cmax)*300});
const clawLit=o=>{const p=clawPos(o);return S.flash&&S.power&&!S.camOpen&&!S.anim&&side()===3&&Math.hypot(mx-p.x,my-(p.y+30))<110};
registerAnim({
 id:'neocrab',name:'Нео-краб',icon:'🦞',diff:5,kind:'claw',pay:16,
 desc:'Клешня у щитка. Держи свет включённым',lore:'',scare:false,
 play:'У щитка опускается клешня. Без света счётчик падает на 1 в секунду, со светом растёт на 2 в секунду; на нуле клешня убивает. Когда свет выключен, подсвети клешню фонариком (ПКМ) на щитке. Сложность уменьшает таймер атаки.',
 drawBack(o){
  if(o.cmax===undefined)return;
  const p=clawPos(o);
  g.fillStyle='#3a3f45';g.fillRect(p.x-6,0,12,p.y+10);
  g.fillStyle='#5a6068';for(let y=14;y<p.y;y+=26)g.fillRect(p.x-9,y,18,5);
  txt('🦞',p.x,p.y+30,70,C.cream,'center');
  g.fillStyle='#150a07';g.fillRect(p.x-45,478,90,10);
  g.fillStyle=o.c<o.cmax*.3?C.red:'#5fa35a';g.fillRect(p.x-45,478,90*o.c/o.cmax,10);
 },
 update(o,dt){
  if(o.cmax===undefined){o.cmax=clawMax(o.a.diff);o.c=o.cmax;o.warned=false}
  const lit=S.light||clawLit(o);
  o.c=Math.min(o.cmax,o.c+(lit?2:-1)*dt/1000);
  if(o.c<o.cmax*.4&&!o.warned){o.warned=true;SFX.buzz();say('🦞 Клешня опускается! Нужен свет')}
  if(o.c>o.cmax*.6)o.warned=false;
  if(o.c<=0)kill(o);
 }
});
})();
