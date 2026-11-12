/* ===== ВЫБОР АНИМАТРОНИКОВ (песочница) ===== */
// 21 карточка на странице (7×3). Когда аниматроников больше — появляются кнопки ‹ ›.
const SEL_PAGE=21;
function drawSelect(){
 checker();
 txt('Выбор аниматроников',W/2,34,36,C.cheese,'center','bold');
 txt('Сложность 0 — аниматроник выключен',W/2,66,16,C.cream,'center');
 const pages=Math.max(1,Math.ceil(ANIMS.length/SEL_PAGE));
 S.page=Math.min(S.page,pages-1);
 ANIMS.slice(S.page*SEL_PAGE,(S.page+1)*SEL_PAGE).forEach((a,i)=>{
  const x=15+(i%7)*134,y=90+Math.floor(i/7)*128,w=124,h=118,on=a.diff>0;
  rr(x,y,w,h,10);g.fillStyle=on?'#4a2418':'#2a1410';g.fill();
  g.lineWidth=on?3:2;g.strokeStyle=on?C.cheese:'#6b3a2c';g.stroke();
  g.globalAlpha=on?1:.35;txt(a.icon,x+w/2,y+26,36,C.cream,'center');g.globalAlpha=1;
  txt(a.name,x+w/2,y+58,a.name.length>12?11:13,C.cream,'center','bold');
  const gr=GROUPS.find(q=>q.id===a.grp);
  if(gr&&gr.badge)txt(gr.badge,x+w-13,y+13,13,C.cream,'center');
  txt(on?'Сложность '+a.diff:'выключен',x+w/2,y+76,12,C.cream,'center');
  btn(x+8,y+86,48,26,'−',()=>{a.diff=Math.max(0,a.diff-1);save()},{sz:18});
  btn(x+w-56,y+86,48,26,'+',()=>{a.diff=Math.min(20,a.diff+1);save()},{sz:18});
 });
 if(pages>1){
  btn(20,16,44,36,'‹',()=>{S.page=Math.max(0,S.page-1)},{sz:22});
  txt('Стр. '+(S.page+1)+'/'+pages,118,34,16,C.cream,'center');
  btn(172,16,44,36,'›',()=>{S.page=Math.min(pages-1,S.page+1)},{sz:22});
 }
 txt('🏆 '+(S.wins.total||0),W-30,34,20,C.cheese,'right','bold');
 btn(60,484,200,44,'← Назад',()=>S.scene='menu',{sz:20});
 btn(330,484,220,44,'Челленджи'+(Object.values(S.chal).some(Boolean)?' ✔':''),()=>S.scene='chal',{sz:20});
 btn(620,484,280,44,'Начать ночь',()=>{if(!ANIMS.some(a=>a.diff>0))return say('Включи хотя бы одного аниматроника');startNight()},{fill:C.green,sz:22});
}
