/* ===== STORY MODE: ПРОГРЕСС И ОТДЕЛЬНОЕ СОХРАНЕНИЕ ===== */
function storySave(){
 if(!S.story)return;
 try{localStorage.setItem(STORY_SAVE_KEY,JSON.stringify(S.story))}catch(e){console.warn('Story save failed',e)}
}
function storyLoad(){
 try{
  const raw=JSON.parse(localStorage.getItem(STORY_SAVE_KEY)||'null');
  if(!raw||!STORY_CHARACTERS.some(c=>c.id===raw.character))return;
  S.story=Object.assign({chapter:'intro',night:1,evacuations:[],rescued:[],completed:false,ending:null},raw);
 }catch(e){console.warn('Story save load failed',e)}
}
function storyStartCampaign(characterId){
 if(!STORY_CHARACTERS.some(c=>c.id===characterId))return;
 S.story={character:characterId,chapter:'intro',night:1,evacuations:[],rescued:[],completed:false,ending:null,activeIds:STORY_INITIAL_ROSTER.slice(),nightDeaths:0};
 S.mode='story';storySave();S.scene='storyIntro';
}
function storyStartNight(){
 if(!S.story)return;
 S.mode='story';
 S.story.chapter='night';
 S.story.activeIds=S.story.activeIds||STORY_INITIAL_ROSTER.slice();
 storySave();
 startNight();
}
function storyNightWon(){
 if(!S.story)return;
 S.story.chapter='nightResult';
 S.story.nightsCleared=(S.story.nightsCleared||0)+1;
 storySave();
 S.scene='storyNightResult';
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
 else storyStartNight();
}
