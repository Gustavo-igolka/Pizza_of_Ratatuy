/* ===== КОНЕЦ НОЧИ И СКРИМЕР ===== */
function drawEnd(win){
 g.fillStyle=win?'#1a1508':'#000';g.fillRect(0,0,W,H);
 if(win){
  txt('6:00 AM',W/2,150,80,C.cheese,'center','bold');
  txt('Ты пережил ночь!',W/2,235,36,C.cream,'center');
 }else{
  txt('Ночь проиграна',W/2,170,52,C.red,'center','bold');
  txt('Попробуй ещё раз',W/2,235,24,C.cream,'center');
  if(S.killer)txt('Тебя настиг: '+S.killer.icon+' '+S.killer.name,W/2,290,26,C.cheese,'center','bold');
 }
 btn(330,340,300,60,win?'Ещё раз':'Заново',startNight,{fill:C.green});
 btn(330,420,300,56,'В меню',()=>S.scene='menu',{sz:22});
}
function drawScare(dt){
 const sc=S.scare;sc.t+=dt;const k=Math.min(1,sc.t/1200);
 g.fillStyle=Math.floor(sc.t/60)%2?'#300':'#000';g.fillRect(0,0,W,H);
 txt(sc.a.icon,W/2+(Math.random()-.5)*30,H/2+(Math.random()-.5)*30,220+300*k,C.cream,'center');
 if(sc.t>=1400){const d=sc.done;S.scare=null;d()}
}
