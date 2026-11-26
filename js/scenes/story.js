/* ===== STORY MODE: МЕНЮ, ВЫБОР ПЕРСОНАЖА И СЮЖЕТНЫЕ ЭКРАНЫ ===== */
function drawStorySelect(){
 checker();txt('Story Mode',W/2,42,42,C.cheese,'center','bold');txt('Выберите охранника',W/2,82,20,C.cream,'center');
 STORY_CHARACTERS.forEach((c,i)=>{
  const x=55+i*292,y=135,w=266,h=300;
  rr(x,y,w,h,12);g.fillStyle='#24130f';g.fill();g.lineWidth=3;g.strokeStyle=C.cream;g.stroke();
  txt(c.name,x+w/2,y+42,21,C.cheese,'center','bold');txt('Сложность: '+c.difficulty,x+w/2,y+78,16,C.cream,'center');
  txt('Эвакуация: '+c.evacuationCount+' аниматроник'+(c.evacuationCount===1?'':'а'),x+w/2,y+105,14,C.cheese,'center','bold');
  wrap(c.summary,31).forEach((line,k)=>txt(line,x+18,y+137+k*18,13,C.cream));
  wrap(c.traits,29).forEach((line,k)=>txt(line,x+18,y+222+k*17,12,'#c9aa83'));
  btn(x+28,y+250,w-56,40,'Выбрать',()=>storyStartCampaign(c.id),{fill:C.green,sz:19});
 });
 btn(30,24,130,40,'← В меню',()=>S.scene='menu',{sz:17});
}
function storyBeginIntro(){
 const lines=STORY_INTRO_DIALOGUES[S.story?.character]||[];
 storyBeginDialogue(lines,storyStartNight);
}
function drawStoryIntro(){
 checker();const c=STORY_CHARACTERS.find(x=>x.id===S.story?.character);if(!c){S.scene='storySelect';return}
 txt('Прибытие',W/2,48,38,C.cheese,'center','bold');g.fillStyle='#17100e';g.fillRect(0,280,W,260);
 g.fillStyle='#4b3024';g.fillRect(560,145,300,145);g.fillStyle='#24100d';g.fillRect(595,185,70,105);g.fillRect(690,185,70,105);
 txt('PIZZA OF RATATUY',710,165,16,C.cheese,'center','bold');g.fillStyle='#20252a';rr(110,345,330,95,18);g.fill();g.fillStyle='#8a969b';g.fillRect(160,355,105,42);g.fillRect(280,355,105,42);
 g.fillStyle='#111';g.beginPath();g.arc(180,444,27,0,Math.PI*2);g.arc(370,444,27,0,Math.PI*2);g.fill();
 txt(c.name,W/2,90,25,C.cream,'center','bold');wrap(c.summary,78).slice(0,2).forEach((line,i)=>txt(line,W/2,468+i*20,14,C.cream,'center'));
 btn(650,365,250,58,'Продолжить',storyBeginIntro,{fill:C.green,sz:20});btn(30,470,150,42,'← Выбор',()=>S.scene='storySelect',{sz:17});
}
function storyCallBoss(){
 storyBeginDialogue([
  {speaker:'Томас Краткий',text:'Охранник, слушай внимательно. После смены нужно вернуться в пиццерию и вывезти оттуда дорогое имущество.'},
  {speaker:'Томас Краткий',text:'Внутри остались аниматроники. Осмотри их, выбери положенное количество и покинь здание.'},
  {speaker:'Томас Краткий',text:'Не задерживайся. После эвакуации возвращайся к следующей смене.'}
 ],storyBeginEvacuation);
}
function drawStoryNightResult(){
 checker();txt('6:00 AM',W/2,105,72,C.cheese,'center','bold');txt('Смена '+S.story.night+' завершена',W/2,190,34,C.cream,'center','bold');
 txt('Прогресс Story Mode сохранён.',W/2,245,20,C.cream,'center');txt('Босс ожидает доклада и поручает эвакуацию имущества.',W/2,285,17,'#d0b99a','center');
 btn(350,365,260,58,'Ответить на звонок',storyCallBoss,{fill:C.green,sz:21});btn(350,440,260,48,'В меню',()=>{S.scene='menu';S.mode='sandbox';save();},{sz:19});
}
function drawStoryEnding(){
 checker();txt('КОНЕЦ ИСТОРИИ',W/2,90,44,C.cheese,'center','bold');txt('Пятая смена завершена',W/2,160,27,C.cream,'center');
 txt('ИТОГИ ЗАБЕГА',W/2,225,20,C.cheese,'center','bold');const s=S.story.ending||{};
 txt('Пройдено смен: '+(s.nightsCleared||5)+' / 5',W/2,275,20,C.cream,'center');txt('Эвакуаций: '+(s.evacuations||4)+' / 4',W/2,310,20,C.cream,'center');
 txt('Вывезено аниматроников: '+(s.rescued||[]).length,W/2,345,20,C.cream,'center');
 btn(350,420,260,54,'Вернуться в меню',()=>{S.scene='menu';S.mode='sandbox';},{sz:20});
}


function drawStoryPause(){
 checker();
 txt('ПАУЗА',W/2,115,48,C.cheese,'center','bold');
 txt('Story Mode · Ночь '+(S.story?.night||1),W/2,165,19,C.cream,'center');
 btn(350,230,260,58,'Продолжить',()=>{
  S.scene=S.storyPauseReturn||'game';
  S.storyPauseReturn=null;
 },{fill:C.green,sz:21});
 btn(350,310,260,58,'Сохранить и выйти',()=>{
  storySave();
  S.mode='sandbox';
  S.storyPauseReturn=null;
  S.scene='menu';
 },{sz:20});
}
