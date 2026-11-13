/* ===== ГЛАВНОЕ МЕНЮ ===== */
function drawMenu(){
 S.t=(S.t||0)+(1/60)*1000; // время для мигания вывески
 checker();
 // дальний свет прожектора
 const sp=g.createRadialGradient(W/2,140,40,W/2,140,420);
 sp.addColorStop(0,'rgba(242,193,78,.10)');sp.addColorStop(1,'rgba(242,193,78,0)');
 g.fillStyle=sp;g.fillRect(0,0,W,H);
 txt('🐀',W/2,120,90,C.cream,'center');
 neonTitle('Pizza of Ratatuy',W/2,225,68,C.cheese,[2,7,12]);
 txt('пародия на ночные смены',W/2,278,22,C.cream,'center');
 txt('💵 Баланс: $'+(S.money||0),W-24,24,18,C.cheese,'right','bold');
 btn(380,296,200,52,'Песочница',()=>{S.mode='sandbox';S.scene='select'});
 btn(380,356,200,52,'Башня',startTower);
 btn(380,416,200,52,'Экстра',()=>{S.xsel=0;S.xscroll=0;S.scene='extra'});
 btn(860,486,76,40,S.mute?'🔇':'🔊',toggleMute,{sz:20});
 btn(774,486,80,40,'🎚 Звук',()=>{S.scene='sound'},{sz:15});
 btn(380,476,200,52,'Выход',()=>{S.scene='exit';try{window.close()}catch(e){}});
}
function drawSound(){
 checker();
 txt('Настройки звука',W/2,90,44,C.cheese,'center','bold');
 txt(hasMedia?'Свои файлы найдены в media/ — играет они (чего нет — синтез)':'Своих файлов в media/ нет — играет встроенный синтез. Как добавить: media/README.md',W/2,140,16,C.cream,'center');
 const bx=280,bw=400;
 txt('Громкость эффектов',bx,210,22,C.cream);
 rr(bx,232,bw,18,9);g.fillStyle='#3a2420';g.fill();
 rr(bx,232,bw*S.volSfx,18,9);g.fillStyle=C.cheese;g.fill();
 const sx=Math.max(bx,Math.min(bx+bw,mx));
 g.fillStyle=C.cream;g.beginPath();g.arc(sx,241,13,0,7);g.fill();
 txt('Громкость музыки',bx,310,22,C.cream);
 rr(bx,332,bw,18,9);g.fillStyle='#3a2420';g.fill();
 rr(bx,332,bw*S.volBgm,18,9);g.fillStyle=C.green;g.fill();
 const gx=Math.max(bx,Math.min(bx+bw,mx));
 g.fillStyle=C.cream;g.beginPath();g.arc(gx,341,13,0,7);g.fill();
 txt(Math.round(S.volSfx*100)+'%',bx+bw+30,241,20,C.cream);
 txt(Math.round(S.volBgm*100)+'%',bx+bw+30,341,20,C.cream);
 btn(330,410,140,52,'▶ Тест',()=>{S.mute=false;SFX.knock()},{sz:20});
 btn(490,410,140,52,'Тест двери',()=>{S.mute=false;SFX.door()},{sz:17});
 btn(380,470,200,52,'Назад',()=>S.scene='menu',{sz:22});
}
function drawExit(){
 checker();
 txt('Смена окончена',W/2,230,56,C.cheese,'center','bold');
 txt('Можно закрыть вкладку.',W/2,290,24,C.cream,'center');
 btn(380,340,200,64,'В меню',()=>S.scene='menu');
}
