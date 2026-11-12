/* ===== ГЛАВНОЕ МЕНЮ ===== */
function drawMenu(){
 checker();
 txt('🐀',W/2,120,90,C.cream,'center');
 txt('Pizza of Ratatuy',W/2+4,229,68,'#5a1510','center','bold');
 txt('Pizza of Ratatuy',W/2,225,68,C.cheese,'center','bold');
 txt('пародия на ночные смены',W/2,278,22,C.cream,'center');
 txt('💵 Баланс: $'+(S.money||0),W-24,24,18,C.cheese,'right','bold');
 btn(380,296,200,52,'Песочница',()=>{S.mode='sandbox';S.scene='select'});
 btn(380,356,200,52,'Башня',startTower);
 btn(380,416,200,52,'Экстра',()=>{S.xsel=0;S.xscroll=0;S.scene='extra'});
 btn(860,486,76,40,S.mute?'🔇':'🔊',toggleMute,{sz:20});
 btn(380,476,200,52,'Выход',()=>{S.scene='exit';try{window.close()}catch(e){}});
}
function drawExit(){
 checker();
 txt('Смена окончена',W/2,230,56,C.cheese,'center','bold');
 txt('Можно закрыть вкладку.',W/2,290,24,C.cream,'center');
 btn(380,340,200,64,'В меню',()=>S.scene='menu');
}
