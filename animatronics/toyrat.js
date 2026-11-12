/* Toy Рататуй — в офисе появляются Toy Минитуи; свети на каждого 0,75 с. Больше пяти — смерть. */
(()=>{
registerAnim({
 id:'toyrat',name:'Toy Рататуй',icon:'🐀',diff:5,kind:'toyminis',grp:'toy',pay:20,
 desc:'Отгоняй маленьких Toy Минитуев фонариком — не допускай, чтобы их стало больше пяти',
 lore:'Toy Рататуй — главный маскот аркадной пиццерии. Его корпус полностью пластиковый: гладкий белый пластик, золотистые детали и яркая рекламная улыбка. Днём встречает гостей и присматривает за маленькими Toy Минитуями. Они не отдельные аниматроники для выбора, а часть его механики.',
 scare:false,
 play:'В офисе появляются маленькие Toy Минитуи. Свети фонариком на каждого в течение 0,75 секунды, чтобы он исчез. Если одновременно остаётся больше пяти Минитуев, Toy Рататуй приходит и убивает охранника. В башне выбирается только Toy Рататуй — Минитуи всегда идут вместе с ним.',
 init(o){o.minis=Array.from({length:3},(_,i)=>({x:280+i*150,y:180+(i%2)*100,lit:0,gone:false}))},
 drawOffice(o){
  o.minis.forEach((m,i)=>{
   if(m.gone)return;
   txt('🐭',m.x,m.y,34+Math.sin(S.t/90+i)*3,C.cream,'center');
   if(m.lit>0){g.strokeStyle=C.cheese;g.lineWidth=3;g.beginPath();g.arc(m.x,m.y,22,0,Math.PI*2*m.lit/750);g.stroke()}
  });
  if(o.minis.filter(m=>!m.gone).length>5)txt('🐀',480,115,90,C.red,'center','bold');
 },
 update(o,dt){
  o.t+=dt;
  if(o.t>=Math.max(4500,11000-300*o.a.diff)){
   o.t=0;
   const count=o.minis.filter(m=>!m.gone).length;
   if(count<8)o.minis.push({x:250+Math.random()*460,y:145+Math.random()*220,lit:0,gone:false});
  }
  if(S.flash&&S.power&&!S.camOpen&&!S.anim&&side()===0){
   for(const m of o.minis){
    if(m.gone)continue;
    if(Math.hypot(mx-m.x,my-m.y)<46){m.lit+=dt;if(m.lit>=750){m.gone=true;SFX.door();say('Toy Минитуй прогнан!')}}
    else m.lit=0;
   }
  }else o.minis.forEach(m=>{if(!m.gone)m.lit=0});
  const count=o.minis.filter(m=>!m.gone).length;
  if(count>5){o.n+=dt;if(o.n>=900)kill(o)}else o.n=0;
 }
});
})();
