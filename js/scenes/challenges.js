/* ===== ЧЕЛЛЕНДЖИ ===== */
const CHALS=[
 {k:'fast',name:'Быстрая ночь',desc:'Один час длится 25 секунд'},
 {k:'tight',name:'Тугое питание',desc:'Одновременно можно включить только 2 рубильника'},
 {k:'dark',name:'Тёмная ночь',desc:'Свет сломан, остаётся только фонарик'}
];
function drawChal(){
 checker();
 txt('Челленджи',W/2,55,40,C.cheese,'center','bold');
 CHALS.forEach((c,i)=>{const on=S.chal[c.k];
  btn(150,110+i*95,660,80,(on?'✔ ':'')+c.name,()=>{S.chal[c.k]=!on;save()},{fill:on?C.green:'#3a2420',sz:28,sub:c.desc})});
 btn(380,420,200,56,'← Назад',()=>S.scene='select',{sz:22});
}
