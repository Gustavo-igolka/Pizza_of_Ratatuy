/* ===== ХОЛСТ, ЦВЕТА, СОСТОЯНИЕ ===== */
const cv=document.getElementById('c'),g=cv.getContext('2d'),W=960,H=540;
const C={wall:'#3a1f1a',floor:'#24120e',red:'#c8372d',cheese:'#f2c14e',cream:'#f6e7c8',dark:'#140a08',green:'#2f6b3a'};

const CAMS=['Левый коридор','Правый коридор','Главный зал','Призовой уголок','Запчасти'];
const SIDE_NAMES={0:'Главная — окно',1:'Правая сторона',2:'Левая сторона',3:'Щиток'};
const LOC={left:0,right:1,hall:2,prize:3,parts:4}; // место → индекс камеры

const S={scene:'menu',sel:0,mode:'sandbox',xsel:0,xscroll:0,xmax:0,page:0,tbest:0,twins:0,truns:0,wins:{},chal:{fast:false,tight:false,dark:false},mute:false,fk:4000,fkT:0,ring:[0,1,3,2],ri:0,anim:null,
 light:true,power:true,doorL:false,doorR:false,dl:0,dr:0,cams:false,alarm:false,camOpen:false,cam:0,dist:[0,0,0,0,0],distT:[0,0,0,0,0],alarmCd:0,t:0,flash:false,toast:'',toastT:0,money:0,blockUntil:{left:0,right:0}};

let mx=0,my=0,hits=[],noHit=false;       // мышь (в координатах 960×540) и кликабельные зоны кадра
let HOUR_MS=45000;                       // 45 с реального времени = 1 игровой час
let MAXSW=3;                             // максимум включённых рубильников (кроме главного питания)

const side=()=>S.ring[S.ri];             // какая сторона офиса сейчас перед глазами: 0 окно, 1 право, 2 лево, 3 щиток
const say=m=>{S.toast=m;S.toastT=1800};  // всплывающая подсказка сверху
