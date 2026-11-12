/* Toy Енот — задания на мониторе справа; все нужно выполнить до 6:00 */
(()=>{
const TASKS=[
 {id:'light',label:'Включить свет',test:()=>S.power&&S.light},
 {id:'cams',label:'Включить камеры',test:()=>S.power&&S.cams},
 {id:'alarm',label:'Включить сигнализацию',test:()=>S.power&&S.alarm},
 {id:'left',label:'Закрыть левую дверь',test:()=>S.power&&S.doorL},
 {id:'right',label:'Закрыть правую дверь',test:()=>S.power&&S.doorR},
 {id:'parts',label:'Посетить камеру «Запчасти»',test:()=>S.camOpen&&S.cam===4}
];
function makeTasks(){const n=1+Math.floor(Math.random()*3),pool=TASKS.slice().sort(()=>Math.random()-.5);return pool.slice(0,n).map(t=>({id:t.id,label:t.label,done:false}))}
registerAnim({
 id:'toyraccoon',name:'Toy Енот',icon:'🦝',diff:5,kind:'toyraccoon',grp:'toy',pay:15,
 desc:'Выполняй задания на мониторе справа до конца ночи',
 lore:'Toy Енот — специальный пластиковый аниматроник ARCADE, посвящённый краскам и изобразительному искусству. Днём он проводит занятия по рисованию, помогает детям раскрашивать и создаёт декорации. Внутренняя памятка: не оставлять открытые банки с краской и не позволять Еноту рисовать на других аниматрониках.',
 scare:false,
 play:'На правой стороне офиса появляется монитор с одним или несколькими заданиями. Все задания нужно выполнить до конца ночи. Если хотя бы одно останется невыполненным к 6:00, охранник проигрывает вместо победы.',
 init(o){o.tasks=makeTasks()},
 failsNight:o=>o.tasks.some(x=>!x.done),
 drawOffice(o){
  rr(755,82,190,255,10);g.fillStyle='#101b1b';g.fill();g.lineWidth=3;g.strokeStyle='#69c6a0';g.stroke();
  txt('🎨 TOY ЕНОТ',850,105,18,'#9dffb5','center','bold');txt('ЗАДАНИЯ',850,130,15,C.cheese,'center','bold');
  o.tasks.forEach((task,i)=>txt((task.done?'✔ ':'□ ')+task.label,850,165+i*48,13,task.done?'#79df91':C.cream,'center'));
  txt('До конца ночи!',850,315,13,C.cheese,'center','bold');
 },
 update(o,dt){for(const task of o.tasks){if(task.done)continue;const def=TASKS.find(x=>x.id===task.id);if(def&&def.test())task.done=true}}
});
})();
