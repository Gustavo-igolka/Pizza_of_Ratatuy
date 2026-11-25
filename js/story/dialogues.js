/* ===== STORY MODE: УНИВЕРСАЛЬНЫЙ ДВИЖОК ДИАЛОГОВ ===== */
// Формат строки: {speaker, text, voice?, subtitle?}. Голос необязателен.
// Сценарные реплики добавляются отдельно; этот модуль не содержит выдуманных реплик.
function storyBeginDialogue(lines,after){
 S.storyDialogue={lines:(lines||[]).slice(),index:0,shown:0,after:after||null,voice:null};
 S.scene='storyDialogue';
}
function storyAdvanceDialogue(){
 const d=S.storyDialogue;if(!d)return;
 const line=d.lines[d.index];
 if(!line){const after=d.after;S.storyDialogue=null;if(after)after();else S.scene='menu';return}
 const full=String(line.text||'');
 if(d.shown<full.length){d.shown=full.length;return}
 if(d.voice){try{d.voice.pause()}catch(e){}d.voice=null}
 d.index++;d.shown=0;
 if(d.index>=d.lines.length)storyAdvanceDialogue();
 else storyPlayDialogueVoice();
}
function storyPlayDialogueVoice(){
 const d=S.storyDialogue,line=d&&d.lines[d.index];
 if(!line||!line.voice||S.mute)return;
 try{d.voice=new Audio(line.voice);d.voice.volume=1;d.voice.play().catch(()=>{})}catch(e){}
}
function drawStoryDialogue(){
 checker();
 const d=S.storyDialogue;if(!d)return;
 const line=d.lines[d.index];
 if(!line){storyAdvanceDialogue();return}
 const full=String(line.text||'');
 d.shown=Math.min(full.length,d.shown+Math.max(1,Math.ceil(full.length/90)));
 rr(54,350,852,150,12);g.fillStyle='#100a09';g.fill();g.lineWidth=3;g.strokeStyle=C.cream;g.stroke();
 txt(line.speaker||'',82,378,20,C.cheese,'left','bold');
 wrap(full.slice(0,d.shown),76).forEach((part,i)=>txt(part,82,414+i*25,19,C.cream));
 txt(d.shown>=full.length?'Нажмите, чтобы продолжить':'Текст появляется…',878,480,13,'#b9a78e','right');
 hits.push({x:54,y:350,w:852,h:150,fn:storyAdvanceDialogue});
}
