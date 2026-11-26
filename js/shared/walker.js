/* Общее поведение «ходок»: зал → коридор → у двери → атака.
   Коридор и дверь — разные фазы. В коридоре аниматроник виден на камере,
   но ещё не отображается в офисном дверном проёме.
   Использование: registerAnim({...Behaviors.walker, id:'...', route:['hall','left'], cd:5000, ...}) */
Behaviors.walker={
 kind:'walker',
 init(o){o.loc=o.a.route[0];o.walkerPhase='corridor'},
 hideAtDoor(o){return o.walkerPhase!=='door'},
 update(o,dt){
  const a=o.a;
  if(o.loc!=='hall'&&doorClosed(o.loc)){o.loc='hall';o.walkerPhase='corridor';o.t=0;return}
  if(o.loc!=='hall'&&doorHeld(o.loc))return;
  o.t+=dt;if(o.t<a.cd)return;o.t-=a.cd;
  if(Math.random()>=chance(a.diff))return;
  if(o.loc==='hall'){
   const free=(a.route[1]==='*'?['left','right']:[a.route[1]]).filter(x=>!doorHeld(x)&&S.t>=(S.blockUntil[x]||0));
   if(!free.length)return;
   o.loc=free[Math.floor(Math.random()*free.length)];
   o.walkerPhase='corridor';
   return;
  }
  if(o.walkerPhase!=='door'){
   o.walkerPhase='door';
   return;
  }
  kill(o); // отдельный бросок уже после перехода к двери
 }
};
