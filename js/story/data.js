/* ===== STORY MODE: ДАННЫЕ КАМПАНИИ ===== */
const STORY_CHARACTERS=[
 {id:'alexey',name:'Алексей Макшток',difficulty:'Лёгкая',evacuationCount:1,summary:'Новый охранник. Не знаком с компанией и её внутренними проблемами.',traits:'Неопытность · обучающие реплики',voiceProfile:'Короткие персональные реплики'},
 {id:'danil',name:'Данил Тышалд',difficulty:'Средняя',evacuationCount:2,summary:'Сотрудник бухгалтерии. Отрабатывает смены охранника в обмен на добавку к отпуску, который ему задолжали четыре месяца назад.',traits:'Сухой юмор · раздражение · бухгалтерский взгляд',voiceProfile:'Расширенная озвучка; длинные монологи остаются текстовыми'},
 {id:'mikhail',name:'Михаил Олделников',difficulty:'Высокая',evacuationCount:3,summary:'Фанат сети Pizza of Ratatuy. Его замечали за кражей мерча.',traits:'Фанатичное отношение к компании · необычное поведение',voiceProfile:'Персональные короткие реплики'}
];
/* Первая локация — основная игровая пиццерия. Остальные четыре используются
   только как отдельные 2D-карты эвакуации. */
const STORY_VENUES={
 pizza:{name:'Основная пиццерия',type:'night',ids:['rat','crab','carp','bvr','proto']},
 aquapark:{name:'Пиццерия «Аквапарк»',type:'evacuation',ids:['dolphin','neocrab','minituy']},
 castle:{name:'Пиццерия «Старый замок»',type:'evacuation',ids:['knight','mage','trap','glitch']},
 rockstar:{name:'Пиццерия Rockstar',type:'evacuation',ids:['rockstar','rbvr','rcrab','rcarp']},
 toy:{name:'Пиццерия Toy',type:'evacuation',ids:['toyrat','toybvr','toyraccoon']}
};
const STORY_INITIAL_ROSTER=STORY_VENUES.pizza.ids.slice();
const STORY_EVACUATIONS=['aquapark','castle','rockstar','toy'];
const STORY_SAVE_KEY='ratatuy_story_save_v1';
