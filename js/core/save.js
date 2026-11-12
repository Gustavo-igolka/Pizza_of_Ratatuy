/* ===== СОХРАНЕНИЕ (localStorage) ===== */
// Сложность хранится по id аниматроника, поэтому новые аниматроники ничего не ломают.
const SAVE_KEY='ratatuy_save_v1';
function save(){try{
 const diff={};ANIMS.forEach(a=>diff[a.id]=a.diff);
 localStorage.setItem(SAVE_KEY,JSON.stringify({diff,wins:S.wins,chal:S.chal,mute:!!S.mute,tower:{best:S.tbest,wins:S.twins,runs:S.truns},money:S.money||0}))}catch(e){}}
function load(){try{
 const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(!d)return;
 ANIMS.forEach(a=>{const v=d.diff&&d.diff[a.id];if(v>=0&&v<=20)a.diff=v});
 Object.assign(S.wins,d.wins||{});Object.assign(S.chal,d.chal||{});S.mute=!!d.mute;S.money=Math.max(0,Number(d.money)||0);if(d.tower){S.tbest=d.tower.best|0;S.twins=d.tower.wins|0;S.truns=d.tower.runs|0}}catch(e){}}
function recordWin(){S.wins.total=(S.wins.total||0)+1;save();SFX.win()}
