/* ===== ГРАФИКА: постобработка и декорации (поверх всей сцены) ===== */
// Вызывается из main.js в конце каждого кадра. Ничего не ломает, если отключить строку вызова.
const FX={grain:true,crt:true,vig:true};

// зерно плёнки — один раз генерируем tile 128×128, потом накладываем со сдвигом
let _noise=null,_noiseT=0;
function noiseTile(){
 if(_noise)return _noise;
 const c=document.createElement('canvas');c.width=c.height=128;
 const ctx=c.getContext('2d'),im=ctx.createImageData(128,128),d=im.data;
 for(let i=0;i<d.length;i+=4){const v=Math.random()*255|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255}
 ctx.putImageData(im,0,0);_noise=c;return c
}
function drawFX(dt){
 // лёгкое дрожание зерна между кадрами
 _noiseT=(S.t||0);
 if(FX.grain&&_noise){
  g.save();g.globalAlpha=.05;g.globalCompositeOperation='overlay';
  const p=g.createPattern(_noise,'repeat'),ox=(_noiseT/53)%128,oy=(_noiseT/37)%128;
  g.translate(-ox,-oy);g.fillStyle=p;g.fillRect(0,0,W+128,H+128);g.restore();
 }
 if(FX.vig){
  const r=g.createRadialGradient(W/2,H/2,H*.42,W/2,H/2,H*.95);
  r.addColorStop(0,'rgba(0,0,0,0)');r.addColorStop(1,'rgba(0,0,0,.42)');
  g.fillStyle=r;g.fillRect(0,0,W,H);
 }
 if(FX.crt){
  g.fillStyle='rgba(0,0,0,.08)';
  for(let y=0;y<H;y+=3)g.fillRect(0,y,W,1);
  // редкая бегущая полоса развертки
  const by=((S.t||0)/14)% (H+160)-80;
  const bg=g.createLinearGradient(0,by-40,0,by+40);
  bg.addColorStop(0,'rgba(255,255,255,0)');bg.addColorStop(.5,'rgba(255,255,255,.025)');bg.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=bg;g.fillRect(0,by-40,W,80);
 }
 // мягкое свечение вокруг курсора, когда включён фонарик
 if(S.flash&&S.power&&S.scene==='game'&&!S.camOpen){
  g.save();g.globalCompositeOperation='lighter';
  const r=g.createRadialGradient(mx,my,0,mx,my,150);
  r.addColorStop(0,'rgba(255,225,150,.10)');r.addColorStop(1,'rgba(255,225,150,0)');
  g.fillStyle=r;g.fillRect(0,0,W,H);g.restore();
 }
}

/* Неоновая вывеска для меню: мигающие буквы */
function neonTitle(text,x,y,sz,col,bad){
 bad=bad||[2,7]; // индексы букв, которые «перегорают»
 const fl=Math.floor((S.t||performance.now())/90);
 g.save();g.shadowColor=col;g.shadowBlur=18;
 txt(text,x,y,sz,col,'center','bold');
 g.shadowBlur=0;
 // тёмные (перегоревшие) буквы поверх
 g.font='bold '+sz+'px "Trebuchet MS",Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';
 const wAll=g.measureText(text).width;let cx=x-wAll/2;
 for(let i=0;i<text.length;i++){
  const cw=g.measureText(text[i]).width;
  const dark=bad.includes(i)&&(fl+i*3)%23<2;
  if(dark){g.fillStyle='rgba(30,8,6,.92)';g.fillText(text[i],cx+cw/2,y)}
  cx+=cw;
 }
 g.restore();
}

/* Мерцающая лампа накаливания: тёплое пятно света сверху комнаты */
function bulbLight(x,y,r,seed){
 const m=.85+.15*Math.sin(((S.t||0)/180)+seed)+(Math.random()<.02?-.3:0);
 const rg=g.createRadialGradient(x,y,10,x,y,r);
 rg.addColorStop(0,'rgba(255,205,120,'+(.20*m).toFixed(3)+')');
 rg.addColorStop(1,'rgba(255,205,120,0)');
 g.fillStyle=rg;g.beginPath();g.arc(x,y,r,0,7);g.fill();
}
