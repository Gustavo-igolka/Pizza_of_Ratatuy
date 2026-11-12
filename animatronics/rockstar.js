/* Рок-стар Рататуй — приходит в проход, открывает дверь, блокирует других, говорит (субтитры) и уходит.
   Закрыл перед ним дверь — ломается и через 0,5 с убивает. */
(()=>{
const TXT={
 greet:['Приветик! Это же ты!','Привет-привет, дружище!','О, ночной гость! Здравствуй!'],
 topic:['Как у тебя дела? Надеюсь, всё чудесно!','Желаю тебе самой лучшей ночи в жизни!','Улыбайся почаще — тебе очень идёт!','Как настроение? Пусть всё сложится наилучшим образом!'],
 bye:['Ну, мне пора. Береги себя!','Было здорово! До новых встреч!','Хорошей тебе ночи, друг!'],
 broke:['З-з-закрыл д-дверь? Я... ошибка... ОШИБКА!!','Не... ком... ф-ф-ортно... СИСТЕМА СЛОМАНА!','Зачем... д-д-дверь...? ХРР-Р-Р...']
};
const LINE_MS=2600;
const wait=d=>(50000-38000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5);
registerAnim({
 id:'rockstar',name:'Рок-стар Рататуй',icon:'🎸',diff:5,kind:'rock',grp:'rock',pay:14,
 desc:'Весёлый гость в проходе. Не закрывай перед ним дверь',lore:'',scare:false,
 play:'Появляется в левом или правом проходе, сам открывает закрытую дверь и блокирует остальных аниматроников у неё. Дружелюбно говорит (субтитры внизу): приветствие, тема, прощание — и уходит. Если закрыть перед ним дверь, он ломается, говорит фразу поломки и через 0,5 секунды убивает.',
 init(o){o.loc='away';o.w=wait(o.a.diff)},
 holdsDoor:(o,s)=>o.loc===s,
 update(o,dt){
  if(o.loc==='away'){
   o.t+=dt;
   if(o.t>=o.w){
    o.loc=Math.random()<.5?'left':'right';
    if(o.loc==='left')S.doorL=false;else S.doorR=false; // открывает закрытую дверь
    o.stage=0;o.lt=0;o.broke=0;
    o.lines=[pickOf(TXT.greet),pickOf(TXT.topic),pickOf(TXT.bye)];
    sub('🎸 '+o.lines[0],LINE_MS);SFX.knock();
   }
   return;
  }
  if(o.broke>0){o.broke-=dt;if(o.broke<=0)kill(o);return}
  if(doorClosed(o.loc)){o.broke=500;sub('🎸 '+pickOf(TXT.broke),1600);SFX.buzz();return}
  o.lt+=dt;
  if(o.lt>=LINE_MS){
   o.lt=0;o.stage++;
   if(o.stage<3)sub('🎸 '+o.lines[o.stage],LINE_MS);
   else{const sd=o.loc;o.loc='away';o.t=0;o.w=wait(o.a.diff);S.blockUntil[sd]=S.t+3000;S.sub=null}
  }
 }
});
})();
