/* ===== ГЛАВНОЕ МЕНЮ ===== */
function drawMenu(){
 checker();
 txt('🐀',W/2,120,90,C.cream,'center');
 txt('Pizza of Ratatuy',W/2+4,229,68,'#5a1510','center','bold');
 txt('Pizza of Ratatuy',W/2,225,68,C.cheese,'center','bold');
 txt('пародия на ночные смены',W/2,278,22,C.cream,'center');
 txt('💵 Баланс: $'+(S.money||0),W-24,24,18,C.cheese,'right','bold');
 btn(380,290,200,42,'Story Mode',()=>S.scene='storySelect',{fill:C.green,sz:22});
 if(S.story&&!S.story.completed)btn(600,290,200,42,'Продолжить',storyResume,{sz:18});
 btn(380,340,200,42,'Песочница',()=>{S.mode='sandbox';S.scene='select'});
 btn(380,390,200,42,'Башня',startTower);
 btn(380,440,200,42,'Экстра',()=>{S.xsel=0;S.xscroll=0;S.scene='extra'});
 btn(860,486,76,40,S.mute?'🔇':'🔊',toggleMute,{sz:20});
 btn(380,490,200,42,'Выход',()=>{S.scene='exit';try{window.close()}catch(e){}});
}
function drawExit(){
 checker();
 txt('Смена окончена',W/2,230,56,C.cheese,'center','bold');
 txt('Можно закрыть вкладку.',W/2,290,24,C.cream,'center');
 btn(380,340,200,64,'В меню',()=>S.scene='menu');
}
