/* =====================================================================
   РЕЕСТР АНИМАТРОНИКОВ
   Каждый аниматроник лежит в своём файле animatronics/<id>.js и сам
   регистрирует себя через registerAnim({...}).
   Порядок подключения файлов в index.html = порядок в меню выбора.
   ===================================================================== */
const ANIMS=[];     // все аниматроники (определения)
const GROUPS=[];    // группы для меню (Рок-стары, Toy...) — см. js/shared/groups.js
const Behaviors={}; // готовые поведения, которые можно подмешать (например Behaviors.walker)

function registerGroup(gr){GROUPS.push(gr)}

function registerAnim(def){
 if(!def||!def.id){console.error('registerAnim: у аниматроника нет id',def);return}
 if(ANIMS.some(a=>a.id===def.id)){console.error('registerAnim: id «'+def.id+'» уже занят — выбери другой');return}
 // значения по умолчанию; pay — выплата охраннику, полная стоимость в 1000 раз выше
 const a=Object.assign({diff:5,desc:'',lore:'',play:'',scare:false,pay:10},def);
 a.value=a.pay*1000;
 ANIMS.push(a);
 return a;
}

/* Общие помощники для написания ИИ */
const diffLerp=(d,easy,hard)=>easy+(hard-easy)*(Math.max(1,d)-1)/19; // значение на сложности 1 → easy, на 20 → hard
const jitter=()=>0.75+Math.random()*0.5;                              // разброс ×0.75…×1.25
const pickOf=a=>a[Math.floor(Math.random()*a.length)];                // случайный элемент массива
