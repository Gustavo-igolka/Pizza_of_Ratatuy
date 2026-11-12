/* Рок-стар Бобёр — приходит к окну и задаёт глупые вопросы */
(()=>{
const QUIZ=[
 {q:'Сколько месяцев в году?',a:['12','13','11']},
 {q:'Сколько весит 20-килограммовая свинья?',a:['20 кг','25 кг','Не знаю']},
 {q:'Что тяжелее: кг пуха или кг гвоздей?',a:['Одинаково','Гвозди','Пух']},
 {q:'Сколько дней в неделе?',a:['7','8','6']},
 {q:'Сколько будет дважды два?',a:['4','5','22']},
 {q:'Сколько ног у трёх табуреток?',a:['12','9','Три']},
 {q:'Какого цвета белый конь Наполеона?',a:['Белого','Серого','Рок-н-ролльного']}
];
const quizTime=d=>(25-13*(Math.max(1,d)-1)/19)*1000;
const wait=d=>(60000-50000*(Math.max(1,d)-1)/19)*(0.75+Math.random()*0.5)*3; // втрое реже Рыцаря
function answer(o,j){
 if(j===o.ans){o.loc='away';o.t=0;o.w=wait(o.a.diff);sub('🎤 Верно! Ты такой умный, я в шоке!',2500)}
 else{o.qt-=5000;sub('🎤 Неправильно! Ну-ка ещё раз!',2000);SFX.buzz()}
}
registerAnim({
 id:'rbvr',name:'Рок-стар Бобёр',icon:'🎤',diff:5,kind:'quiz',grp:'rock',pay:9,
 desc:'Приходит к окну и задаёт глупые вопросы',lore:'',scare:false,
 play:'Приходит через окно (втрое реже Рыцаря) и задаёт глупые вопросы вроде «сколько месяцев в году». Повернись к окну и выбери ответ кнопкой. Неправильный ответ отнимает 5 секунд, закончится время — убьёт. Сложность: меньше времени на ответ.',
 init(o){o.loc='away';o.w=wait(o.a.diff)},
 holdsWindow:o=>o.loc==='window',
 drawWindow(o){
  if(o.loc!=='window')return;
  txt(o.a.icon,480+Math.sin(S.t/120)*3,215,110,C.cream,'center');
 },
 drawOverlay(o){
  if(o.loc!=='window')return;
  rr(250,88,460,48,10);g.fillStyle='rgba(0,0,0,.78)';g.fill();
  txt(o.q,480,112,21,C.cream,'center','bold');
  g.fillStyle='#150a07';g.fillRect(330,146,300,10);
  g.fillStyle=o.qt<5000?C.red:C.cheese;g.fillRect(330,146,300*Math.max(0,o.qt)/o.qmax,10);
  o.opts.forEach((t,j)=>btn(255+j*155,280,145,46,t,()=>answer(o,j),{sz:18}));
 },
 update(o,dt){
  if(o.loc==='away'){
   o.t+=dt;
   if(o.t>=o.w){
    if(windowBusy(o))return;
    const q=pickOf(QUIZ),idx=[0,1,2].sort(()=>Math.random()-.5);
    o.q=q.q;o.opts=idx.map(i=>q.a[i]);o.ans=idx.indexOf(0);
    o.qmax=o.qt=quizTime(o.a.diff);o.loc='window';
    SFX.knock();say('🎤 Рок-стар Бобёр у окна! Повернись и ответь');
   }
   return;
  }
  o.qt-=dt;if(o.qt<=0)kill(o);
 }
});
})();
