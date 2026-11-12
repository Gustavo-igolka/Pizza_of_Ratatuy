/* Общее поведение «ходок»: зал → коридор (у двери) → офис.
   Использование: registerAnim({...Behaviors.walker, id:'...', route:['hall','left'], cd:5000, ...}) */
Behaviors.walker={
 kind:'walker',
 init(o){o.loc=o.a.route[0]},
 update(o,dt){
  const a=o.a;
  if(o.loc!=='hall'&&doorClosed(o.loc)){o.loc='hall';o.t=0;return} // дверь закрыта — сразу уходит
  if(o.loc!=='hall'&&doorHeld(o.loc))return; // дверь держит Маг/Рок-стар — стоит
  o.t+=dt;if(o.t<a.cd)return;o.t-=a.cd;
  if(Math.random()>=chance(a.diff))return;
  if(o.loc==='hall'){
   const free=(a.route[1]==='*'?['left','right']:[a.route[1]]).filter(x=>!doorHeld(x)&&S.t>=(S.blockUntil[x]||0));
   if(!free.length)return; // оба прохода заняты
   o.loc=free[Math.floor(Math.random()*free.length)];
  }else kill(o); // у двери, дверь открыта
 }
};
