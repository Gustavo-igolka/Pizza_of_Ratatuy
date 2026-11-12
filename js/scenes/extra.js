/* ===== ЭКСТРА: энциклопедия аниматроников ===== */
// Слева список (4 в ряд, группы с заголовками, прокрутка колесом или ▲▼), справа описание.
function drawExtra(){
 checker();
 txt('Экстра',W/2,40,36,C.cheese,'center','bold');
 btn(20,14,120,40,'← Меню',()=>S.scene='menu',{sz:18});

 const LIST_TOP=90,LIST_BOT=528,lines=[];
 const rows=ids=>{for(let k=0;k<ids.length;k+=4)lines.push({h:72,cells:ids.slice(k,k+4)})};
 const all=ANIMS.map((a,i)=>i);
 rows(all.filter(i=>!GROUPS.some(gr=>gr.id===ANIMS[i].grp)));
 GROUPS.forEach(gr=>{
  const ids=all.filter(i=>ANIMS[i].grp===gr.id);
  if(!ids.length)return;
  lines.push({h:26,title:gr.title});rows(ids);
 });
 // сколько строк можно пролистать, чтобы список всё ещё заполнял экран
 let acc=0,maxStart=lines.length;
 while(maxStart>0&&acc+lines[maxStart-1].h<=LIST_BOT-LIST_TOP){acc+=lines[maxStart-1].h;maxStart--}
 S.xmax=maxStart;S.xscroll=Math.max(0,Math.min(S.xscroll,maxStart));
 let y=LIST_TOP;
 for(let li=S.xscroll;li<lines.length&&y+lines[li].h<=LIST_BOT;li++){
  const l=lines[li];
  if(l.title)txt(l.title,30,y+12,16,C.cheese,'left','bold');
  else l.cells.forEach((i,k)=>btn(30+k*72,y,66,66,ANIMS[i].icon,()=>S.xsel=i,{sz:36,fill:i===S.xsel?C.green:'#3a2420'}));
  y+=l.h;
 }
 if(maxStart>0){
  btn(150,14,44,40,'▲',()=>{S.xscroll=Math.max(0,S.xscroll-1)},{sz:18});
  btn(200,14,44,40,'▼',()=>{S.xscroll=Math.min(S.xmax,S.xscroll+1)},{sz:18});
 }

 // описание выбранного
 const a=ANIMS[S.xsel]||ANIMS[0];
 rr(330,80,600,440,14);g.fillStyle='rgba(0,0,0,.45)';g.fill();g.lineWidth=2;g.strokeStyle='#6b3a2c';g.stroke();
 txt(a.icon,385,135,70,C.cream,'center');
 txt(a.name,445,135,34,C.cheese,'left','bold');
 txt('Стоимость: $'+(a.value||a.pay*1000)+' · охраннику: $'+a.pay,445,166,17,C.cream,'left');
 const lore=a.lore||'Информации пока нет.',play=a.play||'Описание геймплея пока не написано.';
 // шрифт подбирается так, чтобы длинные тексты влезали в панель: [размер, символов в строке, шаг строки]
 const FIT=[[17,58,24],[14,70,20],[12,82,17]];
 let f=FIT[FIT.length-1];
 for(const c of FIT){if(205+28+wrap(lore,c[1]).length*c[2]+14+28+wrap(play,c[1]).length*c[2]+14<=498){f=c;break}}
 let yy=205;
 txt('Описание',350,yy,20,C.cheese,'left','bold');yy+=28;
 wrap(lore,f[1]).forEach(l=>{txt(l,350,yy,f[0],C.cream);yy+=f[2]});
 yy+=14;txt('Геймплей',350,yy,20,C.cheese,'left','bold');yy+=28;
 wrap(play,f[1]).forEach(l=>{txt(l,350,yy,f[0],C.cream);yy+=f[2]});
 yy+=14;txt('Скример',350,yy,20,C.cheese,'left','bold');
 if(a.scare)btn(480,yy-20,200,40,'▶ Посмотреть',()=>{S.scare={a,t:0,done:()=>S.scene='extra'};S.scene='scare';SFX.scare()},{sz:17});
 else txt('нет',480,yy,17,'#cbb99a');
}
