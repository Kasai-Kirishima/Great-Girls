/* Great Girls — character database.
   Add image URLs to `image` when supplied by the project owner.
   Images are cropped to a shared 3:4 portrait frame in the UI. */
window.GG_CARDS = [
  {
    id:'makima', name:'Макима', universe:'Chainsaw Man', collection:'Прогулка', cls:'Контролёр', rating:68, hp:270,
    description:'Загадочная и влиятельная сотрудница Бюро общественной безопасности. Спокойная, расчётливая и манипулятивная. Обладает способностями Дьявола Контроля.',
    skills:[
      {name:'Копьё',desc:'Создаёт мощное оружие и атакует противника на расстоянии.',type:'damage',value:50,cost:25,target:'enemy'},
      {name:'Спустить собак',desc:'Призывает подчинённых существ, которые атакуют выбранную карту.',type:'damage',value:70,cost:40,target:'enemy'},
      {name:'Неуязвимость',desc:'Блокирует следующие 100 единиц урона.',type:'shield',value:100,cost:40,target:'self'}
    ], likes:['Телефон','Кольцо','Книга'], dislikes:['Плюшевая игрушка'], spots:['Ресторан','Театр','Отель'], image:"https://i.pinimg.com/736x/2d/fc/ec/2dfcec2cec0151acdfc9c3747952e0b5.jpg?utm_source=chatgpt.com"
  },
  {
    id:'hinata', name:'Хината Хьюга', universe:'Naruto', collection:'Прогулка', cls:'Универсал', rating:45, hp:135,
    description:'Представительница клана Хьюга. Сдержанная и добрая, но решительная девушка, мастер ближнего боя.',
    skills:[
      {name:'Бьякуган',desc:'Видит чакру и слабые места противника, после чего проводит точную атаку.',type:'damage',value:40,cost:25,target:'enemy'},
      {name:'Кулаки чакры',desc:'Направляет чакру через ладони и наносит мощную серию ударов.',type:'damage',value:75,cost:45,target:'enemy'},
      {name:'Простой удар',desc:'Обычная физическая атака.',type:'damage',value:15,cost:0,target:'enemy'}
    ], likes:['Плюшевая игрушка','Букет цветов','Коробка конфет'], dislikes:['Телефон'], spots:['Парк','Кафе','Кинотеатр'], image:"https://i.pinimg.com/736x/01/dd/1a/01dd1abc751273de273ec9ced2d7dbf6.jpg?utm_source=chatgpt.com"
  },
  {
    id:'sakura', name:'Сакура Харуно', universe:'Naruto', collection:'Прогулка', cls:'Медик', rating:56, hp:165,
    description:'Куноичи из Деревни Скрытого Листа, ученица Цунаде. Специализируется на медицинском ниндзюцу и обладает огромной физической силой.',
    skills:[
      {name:'Простое лечение',desc:'Восстанавливает выбранной союзной карте 30 HP.',type:'heal',value:30,cost:20,target:'ally'},
      {name:'Метка',desc:'Восстанавливает себе 35 HP в течение 2 ходов.',type:'regen',value:35,duration:2,cost:35,target:'self'},
      {name:'Призыв слизи',desc:'Восстанавливает всем союзникам 10 HP за ход в течение 5 ходов.',type:'teamregen',value:10,duration:5,cost:45,target:'team'}
    ], likes:['Книга','Платье','Букет цветов'], dislikes:['Коробка конфет'], spots:['Музей','Ресторан','Парк'], image:"https://i.pinimg.com/736x/64/6f/6a/646f6a531338b4f687e24b43f7e5c6ac.jpg?utm_source=chatgpt.com"
  },
  {
    id:'konan', name:'Конан', universe:'Naruto', collection:'Бой', cls:'Защитник', rating:60, hp:240,
    description:'Одна из основателей Акацуки и близкая соратница Нагато и Яхико. Использует бумажное ниндзюцу для создания оружия, крыльев и ловушек.',
    skills:[
      {name:'Бумажные крылья',desc:'Блокирует 70 урона.',type:'shield',value:70,cost:30,target:'self'},
      {name:'Взрывные печати',desc:'Наносит случайный урон: 25 / 50 / 75 / 100.',type:'randomdamage',values:[25,50,75,100],cost:40,target:'enemy'},
      {name:'Неуязвимость',desc:'Полностью блокирует входящий урон в течение одного хода.',type:'invuln',value:1,cost:55,target:'self'}
    ], likes:['Книга','Букет цветов','Платье'], dislikes:['Телефон'], spots:['Музей','Лес','Театр'], image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu3S88KXbKAZmQ6QoTxbWcZjAN4wBRZw7RTX621SUYSvalcJqozD08J6L&s=10"
  },
  {
    id:'power', name:'Пауэр', universe:'Chainsaw Man', collection:'Прогулка', cls:'Штурмовик', rating:80, hp:300,
    description:'Кровавый демон в человеческом теле. Самоуверенная, эгоистичная, агрессивная и импульсивная. Управляет кровью и создаёт из неё оружие.',
    skills:[
      {name:'Кровяной молоток',desc:'Создаёт огромный молот из собственной крови.',type:'damage',value:95,cost:50,target:'enemy'},
      {name:'Кровавые клинки',desc:'Формирует острые кровавые лезвия для быстрой атаки.',type:'damage',value:50,cost:30,target:'enemy'},
      {name:'Кровавые колья',desc:'Создаёт несколько острых кольев.',type:'damage',value:25,cost:15,target:'enemy'}
    ], likes:['Коробка конфет','Плюшевая игрушка','Платье'], dislikes:['Книга'], spots:['Ресторан','Кинотеатр','Лес'], image:"https://i.pinimg.com/736x/e4/31/cc/e431ccbb4291e06a3949f1f02144ca54.jpg?utm_source=chatgpt.com"
  },
  {
    id:'anri', name:'Анри Теиэри', universe:'Blue Lock', collection:'Чирлидерши', cls:'Тактик', rating:65, hp:190,
    description:'Сотрудница Японского футбольного союза и одна из инициаторов проекта Blue Lock. Умная, целеустремлённая и увлечённая футболом.',
    skills:[
      {name:'Аналитика',desc:'Увеличивает урон следующей атаки выбранного союзника на 10%.',type:'buff',value:10,cost:20,target:'ally'},
      {name:'Удар ногой',desc:'Обычная физическая атака.',type:'damage',value:15,cost:0,target:'enemy'},
      {name:'Рамён',desc:'Восстанавливает 15 HP и дополнительно до 15 HP в зависимости от рейтинга карты.',type:'healrating',value:15,cost:20,target:'ally'}
    ], likes:['Коробка конфет','Телефон','Букет цветов'], dislikes:['Кольцо'], spots:['Кафе','Ресторан','Кинотеатр'], image:"https://images-ng.pixai.art/gi/thumb/e1d8826b-5788-44d2-b7f0-78f38cc72d2b?utm_source=chatgpt.com"
  },
  {
    id:'kotoha', name:'Котоха Татибана', universe:'WIND BREAKER', collection:'Работа', cls:'Поддержка', rating:55, hp:145,
    description:'Работает в кафе Pothos. Спокойная, уверенная и рассудительная. Не боится высказывать мнение и часто становится голосом разума.',
    skills:[
      {name:'Яйцо с рисом',desc:'Восстанавливает выбранной карте 25 HP.',type:'heal',value:25,cost:20,target:'ally'},
      {name:'Кофе',desc:'Восстанавливает выбранной карте 10 HP.',type:'heal',value:10,cost:10,target:'ally'},
      {name:'Ближний бой',desc:'Проводит обычную физическую атаку.',type:'damage',value:25,cost:0,target:'enemy'}
    ], likes:['Книга','Коробка конфет','Букет цветов'], dislikes:['Кольцо'], spots:['Кафе','Парк','Музей'], image:"https://images-ng.pixai.art/images/orig/1d53e393-0fb0-4cb7-bd91-b03b6017bf41?utm_source=chatgpt.com"
  },
  {
    id:'akiko', name:'Акико Ёсано', universe:'Bungou Stray Dogs', collection:'Работа', cls:'Медик', rating:43, hp:140,
    description:'Врач Вооружённого детективного агентства. Обладает пугающим спокойствием и необычным чувством юмора. Её способность позволяет исцелять тяжело раненых.',
    skills:[
      {name:'Лечение через боль',desc:'Наносит союзнику 30 урона, а через ход восстанавливает 60 HP.',type:'riskheal',damage:30,value:60,cost:35,target:'ally'},
      {name:'Разрез',desc:'Использует медицинские инструменты для атаки.',type:'damage',value:35,cost:0,target:'enemy'},
      {name:'Аптечка',desc:'Восстанавливает выбранной карте 15 HP.',type:'heal',value:15,cost:15,target:'ally'}
    ], likes:['Книга','Телефон','Кольцо'], dislikes:['Плюшевая игрушка'], spots:['Музей','Театр','Кафе'], image:"https://imagedelivery.net/5ejkUOtsMH5sf63fw6q33Q/9d1b9310-c66e-499a-ab22-c7ba198ffe00/public?utm_source=chatgpt.com"
  },
  {
    id:'reze', name:'Резе', universe:'Chainsaw Man', collection:'Прогулка', cls:'Подрывник', rating:50, hp:200,
    description:'Девушка-гибрид Бомбы. На вид милая и дружелюбная, но на деле опасный боец с большим боевым опытом.',
    skills:[
      {name:'Граната',desc:'Использует небольшой взрыв для атаки.',type:'damage',value:20,cost:15,target:'enemy'},
      {name:'Подрыв',desc:'Создаёт мощный локальный взрыв.',type:'damage',value:45,cost:30,target:'enemy'},
      {name:'Сильный взрыв',desc:'Применяет мощную взрывную атаку.',type:'damage',value:115,cost:65,target:'enemy'}
    ], likes:['Платье','Букет цветов','Коробка конфет'], dislikes:['Книга'], spots:['Кинотеатр','Парк','Кафе'], image:"https://images-ng.pixai.art/images/orig/24a7c040-9f2f-4ff1-9df4-b96afee83b64?utm_source=chatgpt.com"
  },
  {
    id:'touka', name:'Тоука Киришима', universe:'Tokyo Ghoul', collection:'Работа', cls:'Регенератор', rating:40, hp:160,
    description:'Гуль из Токио, работающая в кафе Антэйку. Снаружи резкая и вспыльчивая, но заботится о близких. Обладает кагуне типа Укаку.',
    skills:[
      {name:'Кофе',desc:'Восстанавливает 25 HP.',type:'heal',value:25,cost:20,target:'self'},
      {name:'Удар кагуне',desc:'Использует кагуне для мощной атаки.',type:'damage',value:40,cost:25,target:'enemy'},
      {name:'Регенерация',desc:'Восстанавливает 15 HP за ход в течение 5 ходов.',type:'regen',value:15,duration:5,cost:35,target:'self'}
    ], likes:['Кофе','Книга','Платье'], dislikes:['Коробка конфет'], spots:['Кафе','Лес','Парк'], image:"https://image.cdn2.seaart.me/temp-convert-webp/highwebp/2025-11-14/d4ba7pte878c738h98bg/825ecab912decc81320c3b09ad8bfd45_low.webp?utm_source=chatgpt.com"
  },
  {
    id:'rize', name:'Ризе Камиширо', universe:'Tokyo Ghoul', collection:'Прогулка', cls:'Штурмовик', rating:56, hp:210,
    description:'Могущественный гуль, известный жестокостью, самоуверенностью и огромным аппетитом. Её кагуне типа Ринкаку обладает большой силой и регенерацией.',
    skills:[
      {name:'Лёгкая атака',desc:'Использует кагуне для быстрой атаки.',type:'damage',value:25,cost:15,target:'enemy'},
      {name:'Сильная атака',desc:'Проводит мощный удар несколькими щупальцами кагуне.',type:'damage',value:75,cost:40,target:'enemy'},
      {name:'Регенерация',desc:'Восстанавливает 30 HP за ход в течение 5 ходов.',type:'regen',value:30,duration:5,cost:45,target:'self'}
    ], likes:['Ресторан','Платье','Кольцо'], dislikes:['Плюшевая игрушка'], spots:['Ресторан','Отель','Театр'], image:"https://images-ng.pixai.art/images/orig/96306a75-1e37-4a8e-8848-c8dbd6d1b190?utm_source=chatgpt.com"
  },
  {
    id:'momo', name:'Момо Аясе', universe:'Dandadan', collection:'Пижама', cls:'Контролёр', rating:53, hp:155,
    description:'Энергичная и смелая школьница с экстрасенсорными способностями. Использует телекинез, чтобы захватывать, перемещать и отбрасывать объекты.',
    skills:[
      {name:'Защита',desc:'Снижает получаемый урон на 30% до следующего хода.',type:'mitigation',value:30,cost:30,target:'self'},
      {name:'Отталкивание',desc:'Наносит 10 урона и лишает противника следующего действия.',type:'stunDamage',value:10,cost:20,target:'enemy'},
      {name:'Две руки',desc:'Захватывает противника телекинезом и наносит 30 урона, лишая его действия.',type:'stunDamage',value:30,cost:35,target:'enemy'}
    ], likes:['Телефон','Плюшевая игрушка','Коробка конфет'], dislikes:['Кольцо'], spots:['Кинотеатр','Парк','Кафе'], image:"https://images-ng.pixai.art/images/orig/9e9aa13a-6219-476a-827d-b823a357bce3?utm_source=chatgpt.com"
  },
  {
    id:'aira', name:'Сиратори Айра', universe:'Dandadan', collection:'Бой', cls:'Дуэлянт', rating:95, hp:400,
    description:'Уверенная в себе и гордая девушка. После встречи с паранормальным миром получает способности, связанные с Акробатической Силкой.',
    skills:[
      {name:'Уклонение',desc:'Позволяет избежать 70% входящего урона до следующего хода.',type:'mitigation',value:70,cost:40,target:'self'},
      {name:'Удар ногой',desc:'Использует усиленную физическую атаку.',type:'damage',value:100,cost:50,target:'enemy'},
      {name:'Хват волос',desc:'Наносит 65 урона и лишает противника следующего действия.',type:'stunDamage',value:65,cost:45,target:'enemy'}
    ], likes:['Платье','Кольцо','Букет цветов'], dislikes:['Книга'], spots:['Театр','Ресторан','Кинотеатр'], image:"https://images-ng.pixai.art/images/thumb/149d895f-fbe8-4b83-9b23-f53ee97e47d0?utm_source=chatgpt.com"
  },
  {
    id:'seiko', name:'Сейко Аясе', universe:'Dandadan', collection:'Бой', cls:'Защитник', rating:70, hp:260,
    description:'Бабушка Момо, обладающая знаниями о сверхъестественном мире. Опытная медиумка, использующая магию, талисманы и ритуалы.',
    skills:[
      {name:'Удар битой',desc:'Использует биту для мощной физической атаки.',type:'damage',value:70,cost:35,target:'enemy'},
      {name:'Изгнание демона',desc:'Применяет духовную силу и ритуальные техники.',type:'damage',value:110,cost:60,target:'enemy'},
      {name:'Защита',desc:'Снижает получаемый урон на 50% до следующего хода.',type:'mitigation',value:50,cost:35,target:'self'}
    ], likes:['Книга','Коробка конфет','Плюшевая игрушка'], dislikes:['Телефон'], spots:['Музей','Лес','Театр'], image:"https://images-ng.pixai.art/images/orig/7f6a89ba-6af8-4833-86cf-0a0b85944f00?utm_source=chatgpt.com"
  },
  {
    id:'tsunade', name:'Цунаде', universe:'Naruto', collection:'Свадьба', cls:'Медик', rating:68, hp:230,
    description:'Одна из легендарных Саннинов и Пятая Хокаге. Выдающийся медицинский ниндзя с колоссальной физической силой и огромным запасом чакры.',
    skills:[
      {name:'Хил',desc:'Восстанавливает выбранной союзной карте 100 HP.',type:'heal',value:100,cost:55,target:'ally'},
      {name:'Сильный удар',desc:'Направляет чакру в кулак и наносит сокрушительный удар.',type:'damage',value:80,cost:45,target:'enemy'},
      {name:'Метка',desc:'Восстанавливает 40 HP за ход в течение 4 ходов.',type:'regen',value:40,duration:4,cost:50,target:'self'}
    ], likes:['Кольцо','Ресторан','Платье'], dislikes:['Плюшевая игрушка'], spots:['Ресторан','Отель','Театр'], image:"https://i.pinimg.com/736x/93/9c/39/939c39906263a4f6a2f4a10421901394.jpg?utm_source=chatgpt.com"
  },
  {
    id:'ubel', name:'Юбель', universe:'Frieren: Beyond Journey\'s End', collection:'Домина', cls:'Архимаг', rating:99, hp:500, starter:false,
    description:'Талантливая и опасная волшебница первого класса. Обладает необычным восприятием магии и способна применять заклинания, если может представить их действие.',
    skills:[
      {name:'Резонанс',desc:'Разрушительная магическая атака по выбранной карте.',type:'damage',value:150,cost:70,target:'enemy'},
      {name:'Удар посохом',desc:'Наносит физический удар магическим посохом.',type:'damage',value:70,cost:30,target:'enemy'},
      {name:'Магический барьер',desc:'Снижает входящий урон на 60% до следующего хода.',type:'mitigation',value:60,cost:45,target:'self'},
      {name:'Страпон',desc:'Особый приём: наносит 99% текущего HP цели, но не может опустить её ниже 1 HP. Один раз за бой.',type:'percentDamage',value:99,cost:100,target:'enemy',once:true}
    ], likes:['Книга','Кольцо','Платье'], dislikes:['Коробка конфет'], spots:['Лес','Музей','Театр'], image:"https://images-ng.pixai.art/gi/orig/dac78435-57ca-40ed-8510-47647493fbd4?utm_source=chatgpt.com"
  }
];

window.GG_GIFTS = [
  {name:'Букет цветов', icon:'💐', price:120},
  {name:'Коробка конфет', icon:'🍫', price:90},
  {name:'Телефон', icon:'📱', price:650},
  {name:'Кольцо', icon:'💍', price:900},
  {name:'Платье', icon:'👗', price:450},
  {name:'Плюшевая игрушка', icon:'🧸', price:180},
  {name:'Книгу', icon:'📖', price:140}
];
window.GG_LOCATIONS = [
  {name:'Парк',icon:'🌳',price:50}, {name:'Кафе',icon:'☕',price:100},
  {name:'Ресторан',icon:'🍽️',price:250}, {name:'Музей',icon:'🏛️',price:80},
  {name:'Лес',icon:'🌲',price:40}, {name:'Дома у неё',icon:'🏠',price:0},
  {name:'Дома у тебя',icon:'🛋️',price:0}, {name:'В отеле',icon:'🏨',price:400},
  {name:'Театр',icon:'🎭',price:200}, {name:'В кинотеатре',icon:'🎬',price:150}
];
window.GG_THEMES = [
  {id:'midnight',name:'Полночь',color:'#8c78ff'}, {id:'violet',name:'Фиолетовая',color:'#b18aff'},
  {id:'sakura',name:'Сакура',color:'#ff8eb5'}, {id:'ocean',name:'Океан',color:'#55b8ed'},
  {id:'emerald',name:'Изумруд',color:'#51c89a'}, {id:'crimson',name:'Рубин',color:'#ff657c'},
  {id:'amber',name:'Янтарь',color:'#e9ad4e'}, {id:'rose',name:'Роза',color:'#e67fd0'},
  {id:'graphite',name:'Графит',color:'#9ca6b8'}, {id:'lavender',name:'Лаванда',color:'#a69cff'}
];
window.GG_FRAMES = [
  {id:'classic',name:'Классическая'}, {id:'gold',name:'Золотая'}, {id:'ruby',name:'Рубиновая'},
  {id:'sakura',name:'Сакура'}, {id:'aurora',name:'Аврора'}, {id:'obsidian',name:'Обсидиан'}
];
