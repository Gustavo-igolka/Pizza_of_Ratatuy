/* ===== НОЧЬ: часы, рубильники, питание, двери, мерцание, сигнализация ===== */
function startNight(){
 Object.assign(S,{scene:'game',ri:0,anim:null,light:true,power:true,doorL:false,doorR:false,dl:0,dr:0,cams:false,alarm:false,camOpen:false,cam:0,dist:[0,0,0,0,0],distT:[0,0,0,0,0],alarmCd:0,t:0,flash:false});
 initAI();const ch=S.mode==='tower'?{}:S.chal;HOUR_MS=ch.fast?25000:45000;MAXSW=ch.tight?2:3;if(ch.dark)S.light=false;save();
}
const onCount=()=>(S.light?1:0)+(S.cams?1:0)+(S.alarm?1:0)+(S.doorL?1:0)+(S.doorR?1:0);
function tog(k){
 if(!S.power)return say('Нет питания');
 if(!S[k]&&onCount()>=MAXSW)return say('Включить можно максимум '+MAXSW+' рубильника');
 S[k]=!S[k];
}
function updateNight(dt){
 S.t+=dt;
 if(S.t>=(S.mode==='tower'?2:6)*HOUR_MS){
  S.flash=false;
  const bad=(S.ai||[]).find(o=>o.a.failsNight&&o.a.failsNight(o));
  if(bad){S.killer=bad.a;if(S.mode==='tower')towerOver(false);else S.scene='lose';return}
  if(S.mode==='tower')towerNightWon();else{S.scene='win';recordWin()}
 }
}
function clockText(){const h=Math.min(5,Math.floor(S.t/HOUR_MS));return (h===0?12:h)+':00 AM'}
function togDoor(r){const k=r?'doorR':'doorL',b=S[k];tog(k);if(S[k]!==b){SFX.door();if(S.mode==='tower'&&S.run)S.run.doors++}}
function togPower(){
 S.power=!S.power;
 if(!S.power){S.doorL=S.doorR=S.light=S.cams=S.alarm=S.camOpen=S.flash=false;say('Питание выключено — всё отключилось');SFX.down();if(S.mode==='tower'&&S.run)S.run.powerOffs++}
}
function togCams(){tog('cams')}
function togAlarm(){tog('alarm')}
function togLight(){if(S.blackout>0)return say('🐬 Свет отключён — включить нельзя');if(S.mode!=='tower'&&S.chal.dark)return say('Свет сломан — только фонарик');tog('light')}
function updateDoors(dt){
 const k=dt/220;
 [['dl',S.power&&S.doorL],['dr',S.power&&S.doorR]].forEach(([n,on])=>{
  const t=on?1:0,d=t-S[n];S[n]+=Math.sign(d)*Math.min(Math.abs(d),k);
 });
}
function updateFlicker(dt){
 if(S.fkT>0){S.fkT-=dt;return}
 S.fk-=dt;
 if(S.fk<=0){S.fk=4000+Math.random()*8000;S.fkT=180+Math.random()*260;if(S.power&&S.light)SFX.buzz()}
}

/* --- сигнализация --- */
// S.dist[i] — «отвлечение» на камере i (0/1)
const ALARM_MS=8000, ALARM_CD=12000;
function useAlarm(){
 if(!S.camOpen)return say('Сигнал подаётся с планшета камер (W)');
 if(!S.alarm)return say('Сигнализация выключена на щитке');
 if(S.alarmCd>0)return say('Сигнал перезаряжается');
 S.dist[S.cam]=1;S.distT[S.cam]=ALARM_MS;S.alarmCd=ALARM_CD;SFX.alarm();callHook('onSiren',S.cam);if(S.mode==='tower'&&S.run)S.run.alarms++;
}
function updateAlarm(dt){
 if(!S.power){S.dist.fill(0);S.alarmCd=0;return}
 S.alarmCd=Math.max(0,S.alarmCd-dt);
 for(let i=0;i<5;i++)if(S.dist[i]){S.distT[i]-=dt;if(S.distT[i]<=0)S.dist[i]=0}
}

