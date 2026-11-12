/* ===== ЗВУК (синтез, без файлов) ===== */
let AC=null,humG=null;
function ac(){try{
 if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();const h=AC.createOscillator();humG=AC.createGain();
  h.type='sawtooth';h.frequency.value=55;humG.gain.value=0;h.connect(humG);humG.connect(AC.destination);h.start()}
 if(AC.state==='suspended')AC.resume()}catch(e){}return AC}
function tone(f,d,type,vol,to,delay){
 if(S.mute||!AC)return;
 try{const t=AC.currentTime+(delay||0),o=AC.createOscillator(),v=AC.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
  v.gain.setValueAtTime(vol||.06,t);v.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(v);v.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}
}
const SFX={
 click:()=>tone(700,.05,'square',.04),
 door:()=>tone(110,.3,'sine',.12,40),
 turn:()=>tone(300,.18,'triangle',.05,150),
 tab:()=>tone(400,.15,'sine',.06,900),
 down:()=>tone(300,.9,'sawtooth',.07,40),
 buzz:()=>tone(120,.15,'sawtooth',.05),
 step:()=>tone(80,.12,'square',.08,60),
 knock:()=>{tone(160,.25,'square',.1,70);tone(120,.25,'square',.1,60,.2)},
 scare:()=>{tone(200,.6,'sawtooth',.18,40);tone(90,.6,'square',.12,30)},
 win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.25,'triangle',.08,0,i*.18))
};
function toggleMute(){S.mute=!S.mute;save()}
