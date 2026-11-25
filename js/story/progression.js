/* ===== STORY MODE: ПРОГРЕСС И ОТДЕЛЬНОЕ СОХРАНЕНИЕ ===== */
function storySave(){
 if(!S.story)return;
 try{localStorage.setItem(STORY_SAVE_KEY,JSON.stringify(S.story))}catch(e){console.warn('Story save failed',e)}
}
function storyLoad(){
 try{
  const raw=JSON.parse(localStorage.getItem(STORY_SAVE_KEY)||'null');
  if(!raw||!STORY_CHARACTERS.some(c=>c.id===raw.character))return;
  S.story=Object.assign({chapter:'intro',night:1,evacuationIndex:0,evacuations:[],rescued:[],completed:false,ending:null,activeIds:STORY_INITIAL_ROSTER.slice(),nightsCleared:0},raw);
 }catch(e){console.warn('Story save load failed',e)}
}
function storyStartCampaign(characterId){
 if(!STORY_CHARACTERS.some(c=>c.id===characterId))return;
 S.story={character:characterId,chapter:'intro',night:1,evacuationIndex:0,evacuations:[],rescued:[],completed:false,ending:null,activeIds:STORY_INITIAL_ROSTER.slice(),nightDeaths:0,nightsCleared:0};
 S.mode='story';storySave();S.scene='storyIntro';
}
function storyStartNight(){
 if(!S.story)return;
 S.mode='story';S.story.chapter='night';
 S.story.activeIds=S.story.activeIds||STORY_INITIAL_ROSTER.slice();
 storySave();startNight();
}
function storyNightWon(){
 if(!S.story)return;
 S.story.nightsCleared=(S.story.nightsCleared||0)+1;
 if(S.story.night>=5){
  S.story.chapter='ending';S.story.completed=true;
  S.story.ending={nightsCleared:S.story.nightsCleared,evacuations:S.story.evacuations.length,rescued:S.story.rescued.slice()};
  storySave();S.scene='storyEnding';return;
 }
 S.story.chapter='nightResult';storySave();S.scene='storyNightResult';
}
function storyBeginEvacuation(){
 if(!S.story||S.story.night>=5||S.story.evacuationIndex>=4)return;
 const character=STORY_CHARACTERS.find(c=>c.id===S.story.character);
 if(!character)return;
 const venueKey=STORY_EVACUATIONS[S.story.evacuationIndex];
 const venue=STORY_VENUES[venueKey];
 if(!venue)return;
 S.story.chapter='evacuation';
 S.story.evacuation={venueKey,selected:[],required:character.evacuationCount};
 S.mode='story';storySave();
 S.scene='storyEvacuation';
 storyEvacuationInit();
}
function storyEvacuationComplete(){
 if(!S.story||!S.story.evacuation)return;
 const ev=S.story.evacuation;
 if(ev.selected.length!==ev.required)return;
 const venue=STORY_VENUES[ev.venueKey];
 S.story.evacuations.push({venue:ev.venueKey,animatronics:ev.selected.slice()});
 ev.selected.forEach(id=>{if(!S.story.rescued.includes(id))S.story.rescued.push(id)});
 S.story.activeIds=STORY_INITIAL_ROSTER.concat(S.story.rescued.filter(id=>!STORY_INITIAL_ROSTER.includes(id)));
 S.story.evacuation=null;S.story.evacuationIndex++;
 S.story.night=S.story.evacuationIndex+1;
 S.story.chapter='night';storySave();
 storyStartNight();
}
function storyReset(){
 try{localStorage.removeItem(STORY_SAVE_KEY)}catch(e){}
 S.story=null;S.mode='sandbox';S.scene='menu';
}
function storyResume(){
 if(!S.story)return;
 S.mode='story';
 if(S.story.chapter==='intro')S.scene='storyIntro';
 else if(S.story.chapter==='nightResult')S.scene='storyNightResult';
 else if(S.story.chapter==='evacuation'){S.scene='storyEvacuation';storyEvacuationInit()}
 else if(S.story.chapter==='ending')S.scene='storyEnding';
 else storyStartNight();
}
