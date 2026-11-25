/* ===== STORY MODE: ДАННЫЕ КАМПАНИИ ===== */
const STORY_CHARACTERS=[
 {id:'alexey',name:'Алексей Макшток',difficulty:'Лёгкая',summary:'Новый охранник. Не знаком с компанией и её внутренними проблемами.',traits:'Неопытность · обучающие реплики',voiceProfile:'Короткие персональные реплики'},
 {id:'danil',name:'Данил Тышалд',difficulty:'Средняя',summary:'Сотрудник бухгалтерии. Отрабатывает смены охранника в обмен на добавку к отпуску, который ему задолжали четыре месяца назад.',traits:'Сухой юмор · раздражение · бухгалтерский взгляд',voiceProfile:'Расширенная озвучка; длинные монологи остаются текстовыми'},
 {id:'mikhail',name:'Михаил Олделников',difficulty:'Высокая',summary:'Фанат сети Pizza of Ratatuy. Его замечали за кражей мерча.',traits:'Фанатичное отношение к компании · необычное поведение',voiceProfile:'Персональные короткие реплики'}
];
const STORY_VENUES={
 pizza:{name:'Pizza of Ratatuy',ids:['rat','crab','carp','bvr','proto']},
 aquapark:{name:'Аквапарк',ids:['dolphin','neocrab','minituy']},
 castle:{name:'Старый замок',ids:['knight','mage','trap','773j3']},
 rockstar:{name:'Rockstar-заведение',ids:['rockstar','rbvr','rcrab','rcarp']},
 toy:{name:'Toy-заведение',ids:['toyrat','toybvr','toyraccoon']}
};
// Порядок ночей и эвакуаций соответствует плану. Очерёдность самих закрытых заведений
// в плане не утверждена, поэтому она не фиксируется здесь.
const STORY_INITIAL_ROSTER=STORY_VENUES.pizza.ids.slice();
const STORY_SAVE_KEY='ratatuy_story_save_v1';
