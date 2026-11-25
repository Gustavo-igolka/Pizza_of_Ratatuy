/* ===== STORY MODE: МЕНЮ, ВЫБОР ПЕРСОНАЖА И ВСТУПЛЕНИЕ ===== */
function drawStorySelect(){
 checker();
 txt('Story Mode',W/2,42,42,C.cheese,'center','bold');
 txt('Выберите охранника',W/2,82,20,C.cream,'center');
 STORY_CHARACTERS.forEach((c,i)=>{
  const x=55+i*292,y=135,w=266,h=300;
  rr(x,y,w,h,12);g.fillStyle='#24130f';g.fill();g.lineWidth=3;g.strokeStyle=C.cream;g.stroke();
  txt(c.name,x+w/2,y+42,21,C.cheese,'center','bold');
  txt('Сложность: '+c.difficulty,x+w/2,y+78,16,C.cream,'center');
  wrap(c.summary,31).forEach((line,k)=>txt(line,x+18,y+112+k*18,13,C.cream));
  wrap(c.traits,29).forEach((line,k)=>txt(line,x+18,y+202+k*17,12,'#c9aa83'));
  btn(x+28,y+250,w-56,40,'Выбрать',()=>storyStartCampaign(c.id),{fill:C.green,sz:19});
 });
 btn(30,24,130,40,'← В меню',()=>S.scene='menu',{sz:17});
}
function drawStoryIntro(){
 checker();
 const c=STORY_CHARACTERS.find(x=>x.id===S.story?.character);
 if(!c){S.scene='storySelect';return}
 txt('Прибытие',W/2,48,38,C.cheese,'center','bold');
 // Временная визуальная постановка: силуэт автомобиля и фасад. Персональные сцены
 // и сценарии будут заменены после утверждения их содержания.
 g.fillStyle='#17100e';g.fillRect(0,280,W,260);
 g.fillStyle='#4b3024';g.fillRect(560,145,300,145);
 g.fillStyle='#24100d';g.fillRect(595,185,70,105);g.fillRect(690,185,70,105);
 txt('PIZZA OF RATATUY',710,165,16,C.cheese,'center','bold');
 g.fillStyle='#20252a';rr(110,345,330,95,18);g.fill();
 g.fillStyle='#8a969b';g.fillRect(160,355,105,42);g.fillRect(280,355,105,42);
 g.fillStyle='#111';g.beginPath();g.arc(180,444,27,0,Math.PI*2);g.arc(370,444,27,0,Math.PI*2);g.fill();
 txt(c.name,W/2,90,25,C.cream,'center','bold');
 wrap(c.summary,78).slice(0,2).forEach((line,i)=>txt(line,W/2,468+i*20,14,C.cream,'center'));
 btn(650,365,250,58,'Начать первую смену',storyStartNight,{fill:C.green,sz:20});
 btn(30,470,150,42,'← Выбор',()=>S.scene='storySelect',{sz:17});
}
function drawStoryNightResult(){
 checker();
 txt('6:00 AM',W/2,125,72,C.cheese,'center','bold');
 txt('Первая смена завершена',W/2,205,34,C.cream,'center','bold');
 txt('Прогресс Story Mode сохранён.',W/2,260,20,C.cream,'center');
 txt('Следующий этап по плану: звонок Томаса и эвакуация №1.',W/2,300,17,'#d0b99a','center');
 txt('Система звонков и мини-игра эвакуации будут подключены отдельными этапами.',W/2,330,15,'#a8947d','center');
 btn(350,390,260,54,'В меню',()=>{S.scene='menu';S.mode='sandbox';save();},{sz:21});
}
