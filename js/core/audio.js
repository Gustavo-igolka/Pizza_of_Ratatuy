/* ===== ЗВУК: свои файлы из media/ + синтез как запасной вариант ===== */
// Как пользоваться: см. media/README.md
//   * Положил media/<имя>.ogg (или .mp3/.wav/.m4a) — играет твой файл.
//   * Удалил файл — снова играет встроенный синтезированный звук.
//   * «🔇» в меню глушит и музыку, если загружен хотя бы один медиафайл.

let AC=null,humG=null;
const MEDIA_DIR='media/';
const EXT=['ogg','mp3','wav','m4a'];                 // что пробуем и в каком порядке
const SFX_NAMES=['click','door','turn','tab','down','buzz','step','knock','scare','win','alarm'];
const BGM_NAMES=['menu','night','tower'];
const loaded={},bgmEl={};                             // имя → Audio или null
let bgmCur=null,bgmWant='menu',unlockDone=false,hasMedia=false;
const vSfx=()=>S.volSfx,vBgm=()=>S.volBgm;

function ac(){try{
 if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();const h=AC.createOscillator();humG=AC.createGain();
  h.type='sawtooth';h.frequency.value=55;humG.gain.value=0;h.connect(humG);humG.connect(AC.destination);h.start()}
 if(AC.state==='suspended')AC.resume()}catch(e){}return AC}
function tone(f,d,type,vol,to,delay){
 if(S.mute||!AC)return;if(!hasMedia){vol=vol||.06}else vol=(vol||.06)*.4;
 try{const t=AC.currentTime+(delay||0),o=AC.createOscillator(),v=AC.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
  v.gain.setValueAtTime(vol*vSfx(),t);v.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(v);v.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}
}

/* --- поиск и загрузка своих файлов --- */
function probe(src){return new Promise(res=>{const a=new Audio();a.preload='auto';
 a.oncanplaythrough=a.onerror=()=>res(a.error?null:a);a.src=src})}
async function findSound(name){for(const e of EXT){const s=await probe(MEDIA_DIR+name+'.'+e);if(s)return s}return null}
async function loadMedia(){
 await Promise.all(SFX_NAMES.concat(BGM_NAMES).map(async n=>{
  const s=await findSound(n);if(!s)return;loaded[n]=s;s.volume=vSfx();
  if(BGM_NAMES.includes(n)){bgmEl[n]=s;s.loop=true;s.volume=vBgm()}}));
 hasMedia=Object.keys(loaded).length>0;
 setBgm(bgmWant,true);
}

/* --- эффекты: файл, если есть, иначе синтез --- */
function playFx(n,fallback){if(S.mute)return;const s=loaded[n];
 if(s){try{s.currentTime=0;s.volume=vSfx();s.play().catch(()=>{})}catch(e){}}
 else if(fallback)fallback();}

const SYN={
 click:()=>tone(700,.05,'square',.04),
 door:()=>tone(110,.3,'sine',.12,40),
 turn:()=>tone(300,.18,'triangle',.05,150),
 tab:()=>tone(400,.15,'sine',.06,900),
 down:()=>tone(300,.9,'sawtooth',.07,40),
 buzz:()=>tone(120,.15,'sawtooth',.05),
 step:()=>tone(80,.12,'square',.08,60),
 knock:()=>{tone(160,.25,'square',.1,70);tone(120,.25,'square',.1,60,.2)},
 scare:()=>{tone(200,.6,'sawtooth',.18,40);tone(90,.6,'square',.12,30)},
 win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.25,'triangle',.08,0,i*.18)),
 alarm:()=>{tone(660,.3,'square',.07,440);tone(660,.3,'square',.07,440,.35)}
};
const SFX={};SFX_NAMES.forEach(n=>SFX[n]=()=>playFx(n,SYN[n]));

/* --- фоновая музыка --- */
function bgmFor(){
 if(['scare','win','lose','exit','towerwin','towerend'].includes(S.scene))return null;
 if(S.mode==='tower'&&(S.scene==='tower'||S.scene==='pick'))return 'tower';
 if(S.scene==='game')return 'night';
 return 'menu';
}
function setBgm(name,force){
 if(!force&&name===bgmCur)return;bgmCur=name;bgmWant=name;
 for(const n in bgmEl){const el=bgmEl[n];if(el)try{el.pause()}catch(e){}}
 if(!name||S.mute)return;const el=bgmEl[name];if(!el)return;
 try{el.volume=vBgm();el.loop=true;const p=el.play();if(p)p.catch(()=>{})}catch(e){}
}
function applyMute(){if(S.mute)setBgm(null);else setBgm(bgmWant,true)}

/* --- громкость (экран настроек) --- */
function setVol(which,v){
 v=Math.max(0,Math.min(1,v));
 if(which==='sfx')S.volSfx=v;else{S.volBgm=v;for(const n in bgmEl)if(bgmEl[n])bgmEl[n].volume=v}
 save();
}

/* --- разблокировка звука первым жестом (требование браузеров) --- */
function unlockAudio(){
 if(unlockDone)return;unlockDone=true;ac();
 for(const n in loaded){const s=loaded[n];try{s.muted=true;s.currentTime=0;
  const p=s.play();if(p)p.then(()=>{s.pause();s.currentTime=0;s.muted=false}).catch(()=>{s.muted=false})}catch(e){}}
 setBgm(bgmFor(),true);
}

function toggleMute(){S.mute=!S.mute;applyMute();save()}
loadMedia();
