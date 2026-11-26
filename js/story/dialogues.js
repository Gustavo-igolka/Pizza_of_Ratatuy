/* ===== STORY MODE: УНИВЕРСАЛЬНЫЙ ДВИЖОК ДИАЛОГОВ ===== */
// Формат строки: {speaker, text, subtitle?, voice?}.
// subtitle — отдельный текст субтитров; если его нет, используется text.
// voice — путь к аудиофайлу. Пустые/отсутствующие файлы не ломают диалог.

function storyStopDialogueVoice(d){
 if(!d||!d.voice)return;
 const audio=d.voice;
 d.voice=null;
 try{audio.pause();audio.currentTime=0}catch(e){}
}

function storyBeginDialogue(lines,after){
 const previous=S.storyDialogue;
 storyStopDialogueVoice(previous);
 S.storyDialogue={
  lines:Array.isArray(lines)?lines.slice():[],
  index:0,
  shown:0,
  after:typeof after==='function'?after:null,
  voice:null,
  voiceState:'idle',
  voiceError:false
 };
 S.scene='storyDialogue';
 storyPlayDialogueVoice();
}

function storyAdvanceDialogue(){
 const d=S.storyDialogue;if(!d)return;
 const line=d.lines[d.index];
 if(!line){
  const after=d.after;
  storyStopDialogueVoice(d);
  S.storyDialogue=null;
  if(after)after();else S.scene='menu';
  return;
 }
 const full=String(line.subtitle??line.text??'');
 if(d.shown<full.length){d.shown=full.length;return}
 storyStopDialogueVoice(d);
 d.index++;
 d.shown=0;
 d.voiceState='idle';
 d.voiceError=false;
 if(d.index>=d.lines.length)storyAdvanceDialogue();
 else storyPlayDialogueVoice();
}

function storyPlayDialogueVoice(){
 const d=S.storyDialogue,line=d&&d.lines[d.index];
 if(!d||!line||!line.voice||S.mute){
  if(d)d.voiceState=line&&line.voice&&S.mute?'muted':'none';
  return;
 }
 storyStopDialogueVoice(d);
 try{
  const audio=new Audio(line.voice);
  d.voice=audio;
  d.voiceState='loading';
  d.voiceError=false;
  audio.volume=1;
  audio.onplaying=()=>{if(S.storyDialogue===d&&d.voice===audio)d.voiceState='playing'};
  audio.onended=()=>{if(S.storyDialogue===d&&d.voice===audio){d.voice=null;d.voiceState='ended'}};
  audio.onerror=()=>{
   if(S.storyDialogue===d&&d.voice===audio){
    d.voice=null;d.voiceState='error';d.voiceError=true;
   }
  };
  const result=audio.play();
  if(result&&typeof result.catch==='function'){
   result.catch(()=>{
    if(S.storyDialogue===d&&d.voice===audio){
     d.voice=null;d.voiceState='error';d.voiceError=true;
    }
   });
  }
 }catch(e){
  d.voice=null;d.voiceState='error';d.voiceError=true;
 }
}

function drawStoryDialogue(){
 checker();
 const d=S.storyDialogue;if(!d)return;
 const line=d.lines[d.index];
 if(!line){storyAdvanceDialogue();return}
 const full=String(line.subtitle??line.text??'');
 d.shown=Math.min(full.length,d.shown+Math.max(1,Math.ceil(full.length/90)));
 rr(54,350,852,150,12);g.fillStyle='#100a09';g.fill();g.lineWidth=3;g.strokeStyle=C.cream;g.stroke();
 txt(line.speaker||'',82,378,20,C.cheese,'left','bold');
 wrap(full.slice(0,d.shown),76).forEach((part,i)=>txt(part,82,414+i*25,19,C.cream));
 const hint=d.shown>=full.length?'Нажмите, чтобы продолжить':'Текст появляется…';
 txt(hint,878,480,13,'#b9a78e','right');
 if(line.voice){
  const voiceLabel=d.voiceState==='playing'?'Озвучка…':d.voiceState==='error'?'Озвучка недоступна':d.voiceState==='ended'?'Озвучка завершена':d.voiceState==='muted'?'Озвучка выключена':'';
  if(voiceLabel)txt(voiceLabel,82,480,12,d.voiceState==='error'?'#d58c78':'#b9a78e','left');
 }
 hits.push({x:54,y:350,w:852,h:150,fn:storyAdvanceDialogue});
}
