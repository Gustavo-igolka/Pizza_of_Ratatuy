/* ===== ЗАПУСК И ГЛАВНЫЙ ЦИКЛ ===== */
// Подключается последним: к этому моменту все аниматроники уже зарегистрированы.
const SCENES={
 menu:drawMenu,sound:drawSound,select:drawSelect,exit:drawExit,chal:drawChal,extra:drawExtra,scare:drawScare,
 tower:drawTowerHub,pick:drawPick,towerwin:drawTowerWin,towerend:drawTowerEnd,
 win:()=>drawEnd(true),lose:()=>drawEnd(false)
};
let last=0;
function frame(t){
 const dt=Math.min(50,t-last);last=t;hits=[];
 if(S.toastT>0)S.toastT-=dt;
 if(!hasMedia&&humG)humG.gain.setTargetAtTime((S.scene==='game'&&!S.mute&&S.power)?0.025:0,AC.currentTime,0.1);
 setBgm(bgmFor());
 (SCENES[S.scene]||drawGame)(dt);
 drawFX(dt);
 if(S.toastT>0){
  rr(W/2-220,52,440,44,10);g.fillStyle='rgba(0,0,0,.8)';g.fill();
  txt(S.toast,W/2,74,20,C.cream,'center');
 }
 cv.style.cursor=hits.some(b=>mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h)?'pointer':'default';
 requestAnimationFrame(frame);
}
load();
requestAnimationFrame(frame);
