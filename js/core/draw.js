/* ===== РИСОВАНИЕ: утилиты ===== */
function txt(s,x,y,sz,col,al,f){g.font=(f||'')+' '+sz+'px "Trebuchet MS",Arial,sans-serif';g.fillStyle=col;g.textAlign=al||'left';g.textBaseline='middle';g.fillText(s,x,y)}
function rr(x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r)}
function btn(x,y,w,h,label,fn,o){o=o||{};
 const hov=mx>=x&&mx<=x+w&&my>=y&&my<=y+h&&!S.anim;
 if(!S.anim&&!noHit)hits.push({x,y,w,h,fn});
 rr(x,y,w,h,12);g.fillStyle=hov?C.cheese:(o.fill||C.red);g.fill();
 g.lineWidth=3;g.strokeStyle=C.cream;g.stroke();
 const col=hov?C.dark:C.cream;
 txt(label,x+w/2,y+h/2-(o.sub?12:0),o.sz||26,col,'center','bold');
 if(o.sub)txt(o.sub,x+w/2,y+h/2+22,18,col,'center');
}
function checker(){
 g.fillStyle='#1c0b09';g.fillRect(0,0,W,H);g.fillStyle='#2e1210';
 for(let y=0;y<H;y+=60)for(let x=((y/60)%2)*60;x<W;x+=120)g.fillRect(x,y,60,60);
}
function wrap(t,n){const out=[];let l='';t.split(' ').forEach(w=>{if((l+' '+w).trim().length>n){out.push(l);l=w}else l=(l+' '+w).trim()});if(l)out.push(l);return out}
const fmt=ms=>{const t=Math.round(ms/1000);return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')};
