'use strict';
  function openCardDetail(instanceId){const inst=getOwned(instanceId);if(!inst)return;const card=getData(inst.cardId);const tier=cardTier(card,inst);const skills=card.skills.map((sk,i)=>{const up=inst.skillUpgrades[i]||0;const val=skillValue(sk,up);return `<div class="skill-row"><div class="skill-index">${i+1}</div><div class="skill-main"><b>${escapeHTML(sk.name)} <span class="muted">${up?`+${up}`:''}</span></b><p>${escapeHTML(sk.desc)}${up?` · усиление +${up*5}%`:''}</p></div><div class="skill-cost">${sk.cost} MANA</div></div>`;}).join('');
    const frames=GG_FRAMES.map(f=>`<option value="${f.id}" ${inst.frame===f.id?'selected':''}>${f.name}</option>`).join('');
    openModal(`<div class="detail-layout"><div class="panel detail-portrait">${cardPortrait(card,inst,true)}<div class="detail-meta" style="padding:10px 4px 4px"><div class="small muted">${t('timeLeft')}: ${fmtTime(inst)}</div><div class="progress-track" style="margin-top:7px"><span style="width:${Math.max(1,daysLeft(inst)/30*100)}%"></span></div></div></div><div class="panel detail-content"><div class="detail-topline"><span class="tag" style="color:${tier[3]}">${tier[0]} TIER</span><span class="tag">${escapeHTML(card.cls)}</span><span class="tag">LV. ${inst.level} · XP ${inst.xp||0}/100</span></div><h2 class="detail-name">${escapeHTML(card.name)}</h2><div class="detail-universe">${escapeHTML(card.universe)} · ${escapeHTML(card.collection)}</div><p class="detail-desc">${escapeHTML(card.description)}</p><div class="detail-stats"><div class="detail-stat"><span>${t('rating')}</span><b>${getRating(card,inst)}</b></div><div class="detail-stat"><span>${t('hp')}</span><b>${getHP(card,inst)}</b></div><div class="detail-stat"><span>${t('mana')}</span><b>${getManaMax(card,inst)}</b></div><div class="detail-stat"><span>${t('upgradeLevel')}</span><b>+${inst.upgrade}/3</b></div></div><h3 class="section-title" style="margin:15px 0 10px">${t('skills')}</h3><div class="skill-list">${skills}</div><div class="detail-edit"><label>${t('frame')}</label><select class="select-input" id="frameSelect">${frames}</select></div><div class="detail-actions"><button class="btn btn-primary" data-action="upgrade-card" data-id="${inst.instanceId}" ${inst.upgrade>=3||state.materials.card<=0?'disabled':''}>✧ ${t('upgradeCard')} (${state.materials.card})</button><button class="btn btn-secondary" data-action="xp-card" data-id="${inst.instanceId}">Тренировка · 100 BN</button></div><div class="detail-actions"><button class="btn btn-secondary" data-action="stat-open" data-id="${inst.instanceId}" ${state.materials.stat<=0?'disabled':''}>Повысить характеристики (${state.materials.stat})</button></div><div class="detail-actions">${card.skills.map((sk,i)=>`<button class="btn btn-ghost" data-action="upgrade-skill" data-id="${inst.instanceId}" data-index="${i}" ${(inst.skillUpgrades[i]||0)>=3||state.materials.skill<=0?'disabled':''}>${t('upgradeSkill')} ${i+1} · +${inst.skillUpgrades[i]||0}</button>`).join('')}</div></div></div>`);
    $('#frameSelect').addEventListener('change',e=>{inst.frame=e.target.value;save();toast('Рамка боя обновлена.');});
  }
  function openCatalogDetail(cardId){
    const card=getData(cardId);if(!card)return;
    const inst=state.collection.find(x=>x.cardId===cardId)||null;
    const tier=tierInfo(getRating(card,inst));
    const skills=card.skills.map((sk,i)=>`<div class="skill-row"><div class="skill-index">${i+1}</div><div class="skill-main"><b>${escapeHTML(sk.name)}</b><p>${escapeHTML(sk.desc)}</p></div><div class="skill-cost">${sk.cost} MANA</div></div>`).join('');
    openModal(`<div class="detail-layout"><div class="panel detail-portrait">${cardPortrait(card,inst,true)}${inst?`<div class="detail-meta" style="padding:10px 4px 4px"><div class="small muted">Срок отношений: ${fmtTime(inst)}</div></div>`:''}</div><div class="panel detail-content"><div class="detail-topline"><span class="tag" style="color:${tier[3]}">${tier[0]} TIER</span><span class="tag">${escapeHTML(card.cls)}</span><span class="tag">${inst?'ПОЛУЧЕНА':'НЕ ПОЛУЧЕНА'}</span></div><h2 class="detail-name">${escapeHTML(card.name)}</h2><div class="detail-universe">${escapeHTML(card.universe)} · ${escapeHTML(card.collection)}</div><p class="detail-desc">${escapeHTML(card.description)}</p><div class="detail-stats"><div class="detail-stat"><span>Рейтинг</span><b>${getRating(card,inst)}</b></div><div class="detail-stat"><span>HP</span><b>${getHP(card,inst)}</b></div><div class="detail-stat"><span>Мана</span><b>${getManaMax(card,inst)}</b></div><div class="detail-stat"><span>Уровень</span><b>${inst?inst.level:'—'}</b></div></div><h3 class="section-title" style="margin:15px 0 10px">Способности</h3><div class="skill-list">${skills}</div><div class="catalog-detail-foot">${inst?`<button class="btn btn-primary" data-action="card-detail" data-id="${inst.instanceId}">Открыть мою карточку</button>`:`<p class="small muted">Карточку можно получить из паков или ежедневного магазина.</p><button class="btn btn-primary" data-action="modal-close">Понятно</button>`}</div></div></div>`);
  }
  function skillValue(sk,up){if(sk.value==null)return 0;return Math.round(sk.value*(1+up*.05));}
  function buyOffer(cardId){const card=getData(cardId);if(!card||ownedIds().has(cardId))return;const price=500+card.rating*18;if(state.banknotes<price){toast('Недостаточно банкнот.','error');return;}state.banknotes-=price;const inst=addOwned(cardId);if(!inst){toast('Эта карточка уже есть в коллекции.','error');return;}save();toast(`${card.name} добавлена в коллекцию!`);render();}
  function buyGift(name){const gift=GG_GIFTS.find(g=>g.name===name);if(!gift)return;if(state.banknotes<gift.price){toast('Недостаточно банкнот.','error');return;}state.banknotes-=gift.price;state.gifts[name]=(state.gifts[name]||0)+1;save();toast(`${gift.name} куплено.`);render();}
  function buyMaterial(material){const items={card:{price:650,label:'Улучшение карточки'},stat:{price:420,label:'Очки характеристик'},skill:{price:500,label:'Улучшение навыка'}};const item=items[material];if(!item)return;if(state.banknotes<item.price){toast('Недостаточно банкнот.','error');return;}state.banknotes-=item.price;state.materials[material]=(state.materials[material]||0)+1;save();toast(`${item.label} куплено.`);render();}
  function createReward(type,data={}){return {type,...data};}
  function grantCardReward(cardId){const inst=addOwned(cardId);const card=getData(cardId);return inst?createReward('card',{cardId,name:card.name,instanceId:inst.instanceId}):createReward('rubies',{amount:120,name:'Компенсация за недоступную карточку'});}
  function randomUnowned(exclude=[]){const taken=new Set([...ownedIds(),...exclude]);const pool=CARD_DATA.filter(c=>!taken.has(c.id));if(!pool.length)return null;const weights=pool.map(c=>Math.pow(.72,Math.max(0,c.rating-40)/10));const total=weights.reduce((a,b)=>a+b,0);let roll=Math.random()*total;for(let i=0;i<pool.length;i++){roll-=weights[i];if(roll<=0)return pool[i];}return pool[pool.length-1];}
  function buildPackRewards(type){const p=PACKS[type];const weights=type==='small'?[.57,.06,.21,.16]:type==='large'?[.43,.11,.24,.22]:[.34,.17,.23,.26];const rewards=[];
    for(let i=0;i<p.slots;i++){const r=Math.random();if(r<weights[0])rewards.push(createReward('banknotes',{amount:Math.floor((type==='small'?110:type==='large'?220:400)*(0.6+Math.random()*1.2))}));else if(r<weights[0]+weights[1])rewards.push(createReward('rubies',{amount:Math.floor((type==='small'?2:type==='large'?4:8)*(0.5+Math.random()*1.3))}));else if(r<weights[0]+weights[1]+weights[2])rewards.push(createReward('upgrade',{material:random(['card','stat','skill']),amount:type==='mega'&&Math.random()<.25?2:1}));else{const gift=random(GG_GIFTS);rewards.push(createReward('gift',{name:gift.name,icon:gift.icon,amount:1}));}}
    const chance=Math.random();let cardCount=0;if(chance<p.card)cardCount=1;if(type!=='small'&&Math.random()<p.multi)cardCount+=type==='mega'?Math.floor(Math.random()*2)+1:1;
    const chosen=[];for(let i=0;i<cardCount;i++){const card=randomUnowned(chosen);if(card)chosen.push(card.id);}
    chosen.forEach(id=>rewards.push(grantCardReward(id)));
    if(cardCount&&!chosen.length)rewards.push(createReward('rubies',{amount:120,name:'Компенсация'}));
    return shuffle(rewards);
  }
  function applyReward(r){switch(r.type){case'banknotes':state.banknotes+=r.amount;break;case'rubies':state.rubies+=r.amount;break;case'gift':state.gifts[r.name]=(state.gifts[r.name]||0)+r.amount;break;case'upgrade':state.materials[r.material]+=r.amount;break;case'card':break;}}
  function rewardIcon(r){return ({banknotes:'▰',rubies:'◆',gift:r.icon||'🎁',upgrade:'✧',card:'▤'})[r.type]||'✦';}
  function rewardName(r){return r.type==='banknotes'?`Банкноты +${money(r.amount)}`:r.type==='rubies'?`Рубины +${money(r.amount)}`:r.type==='gift'?`${r.name} ×${r.amount}`:r.type==='upgrade'?`${r.material==='card'?'Улучшение карточки':r.material==='stat'?'Очки характеристик':'Улучшение навыка'} ×${r.amount}`:r.name;}
  function openRewards(rewards,title='Награды'){rewardSession={rewards,index:0,title,summary:false};rewards.forEach(applyReward);save();renderRewardStep();}
  function renderRewardStep(){if(!rewardSession)return;const {rewards,index,title,summary}=rewardSession;const current=rewards[index];if(summary){openModal(`<div class="eyebrow">${title}</div><h2 class="modal-title">${t('summary')}</h2><p class="modal-subtitle">Все награды уже добавлены в твой аккаунт.</p><div class="summary-grid">${rewards.map(r=>`<div class="summary-item">${r.type==='card'?`<span>▤</span>`:`<span>${rewardIcon(r)}</span>`}<b>${escapeHTML(rewardName(r))}</b><small>${r.type==='card'?'Новая карточка':'Получено'}</small></div>`).join('')}</div><button class="btn btn-primary btn-block" data-action="reward-close">${t('finish')}</button>`);return;}
    const remaining=rewards.length-index-1;let visual='';if(current.type==='card'){const card=getData(current.cardId);const inst=getOwned(current.instanceId);visual=`<div class="opening-card">${cardPortrait(card,inst,true)}</div>`;}else{visual=`<div class="opening-reward"><div><div class="reward-icon">${rewardIcon(current)}</div><h3>${escapeHTML(rewardName(current))}</h3><p>${current.type==='gift'?'Предмет добавлен в инвентарь':current.type==='upgrade'?'Материал улучшения добавлен':'Награда добавлена на баланс'}</p></div></div>`;}
    openModal(`<div style="text-align:center"><div class="eyebrow">${escapeHTML(title)}</div><h2 class="modal-title">${current.type==='card'?'Новая карточка!':'Награда получена'}</h2><div class="opening-progress"><span>${index+1} / ${rewards.length}</span><span>${t('remaining')}: ${remaining}</span></div>${visual}<button class="btn btn-primary btn-block" data-action="reward-next">${remaining?`${t('next')} · ${remaining} ${t('remaining').toLowerCase()}`:t('summary')}</button></div>`);
  }
  function buyPack(type,free=false,byRuby=false){const p=PACKS[type];if(!p)return;if(!free&&byRuby&&state.rubies<p.rubyPrice){toast('Недостаточно рубинов.','error');return;}if(!free&&!byRuby&&state.banknotes<p.price){toast('Недостаточно банкнот.','error');return;}if(!free&&byRuby)state.rubies-=p.rubyPrice;else if(!free)state.banknotes-=p.price;const rewards=buildPackRewards(type);save();openRewards(rewards,free?'Ежедневный бесплатный сундук':p.name);}
  function claimDaily(){if(state.dailyClaim===dayKey())return;state.dailyClaim=dayKey();const kind=random(['banknotes','rubies','gift','upgrade']);let reward;if(kind==='banknotes')reward=createReward('banknotes',{amount:Math.floor(150+Math.random()*351)});else if(kind==='rubies')reward=createReward('rubies',{amount:Math.floor(1+Math.random()*4)});else if(kind==='gift'){const gift=random(GG_GIFTS);reward=createReward('gift',{name:gift.name,icon:gift.icon,amount:1});}else reward=createReward('upgrade',{material:random(['card','stat','skill']),amount:1});save();openRewards([reward],'Ежедневная награда · 1 предмет');render();}

  function openGiftModal(instanceId){const inst=getOwned(instanceId);if(!inst)return;const card=getData(inst.cardId);openModal(`<div class="eyebrow">GG / GIFT</div><h2 class="modal-title">Подарок для ${escapeHTML(card.name)}</h2><p class="modal-subtitle">У каждого персонажа есть предпочтения. Любимый подарок продлевает отношения сильнее.</p><div class="summary-grid">${GG_GIFTS.map(g=>`<button class="summary-item" data-action="give-gift" data-id="${instanceId}" data-gift="${escapeHTML(g.name)}" ${!(state.gifts[g.name]>0)?'disabled':''}><span>${g.icon}</span><b>${escapeHTML(g.name)}</b><small>В наличии: ${state.gifts[g.name]||0}</small></button>`).join('')}</div>`);}
  function giveGift(instanceId,name){
    const inst=getOwned(instanceId);
    if(!inst||!state.gifts[name])return;
    const card=getData(inst.cardId);
    if(inst.giftDay!==dayKey()){inst.giftDay=dayKey();inst.giftsToday=0;}
    if((inst.giftsToday||0)>=2){toast('Этой карточке можно подарить не больше двух подарков в день.','error');return;}
    inst.giftsToday=(inst.giftsToday||0)+1;
    state.gifts[name]--;
    let days=1,msg=t('giftNeutral');
    if(card.likes.includes(name)){days=3;msg=t('giftLiked');}
    else if(card.dislikes.includes(name)){days=-1;msg=t('giftDisliked');}
    if(days>0){const actual=addDays(inst,days);msg+=actual<days?` (добавлено ${actual} дн. из-за лимита 60 дней)`:'';}
    else if(days<0){inst.expiresAt=Math.max(Date.now(),inst.expiresAt+days*DAY);}
    if(!state.gifts[name])delete state.gifts[name];
    save();closeModal();toast(`${msg} ${days>0?`+${Math.min(days,60)} дн.`:days<0?'−1 день':'Срок не изменился.'}`);render();
  }
  const classPrompts={Медик:['Поговорить о любимом деле и лечении','Поспорить о том, кто сильнее'],Тактик:['Обсудить планы и стратегию','Говорить только о себе'],Контролёр:['Дать ей вести разговор','Постоянно перебивать'],Защитник:['Поговорить о её опыте и взглядах','Хвастаться своими победами'],Штурмовик:['Обсудить яркие приключения','Пожаловаться на скуку'],Подрывник:['Обсудить необычные впечатления','Читать скучную лекцию'],Поддержка:['Поблагодарить за заботу','Игнорировать её мнение'],Дуэлянт:['Отметить её сильные стороны','Сравнивать её с другими'],Универсал:['Узнать, что ей сейчас интересно','Навязывать свои планы'],Регенератор:['Поговорить о любимых местах','Обсуждать только работу'],Архимаг:['Обсудить магию и необычные идеи','Спорить о бытовых мелочах']};
  const dateStageData=[
    [
      {text:'Спросить о том, что ей действительно нравится',score:2},
      {text:'Обсудить планы и интересы',score:1},
      {text:'Говорить только о себе',score:-1}
    ],
    [
      {text:'Предложить занятие, которое ей интересно',score:2},
      {text:'Спросить, чего ей хочется прямо сейчас',score:1},
      {text:'Самостоятельно решить за неё',score:-1}
    ],
    [
      {text:'Спокойно решить неожиданную проблему вместе',score:2},
      {text:'Разрядить ситуацию уместной шуткой',score:1},
      {text:'Раздражаться и обвинять её',score:-1}
    ],
    [
      {text:'Искренне поблагодарить за вечер и предложить новую встречу',score:2},
      {text:'Сделать комплимент и попрощаться',score:1},
      {text:'Резко попрощаться и уйти',score:-1}
    ]
  ];
  const dateStageTitles=['Первое впечатление','Совместное занятие','Неожиданный момент','Завершение вечера'];
  const locationPrompts={
    'Парк':['Предложить прогулку по красивому маршруту','Найти тихое место и поговорить','Всё время смотреть в телефон'],
    'Кафе':['Предложить выбрать десерт вместе','Спросить, какой напиток она любит','Заказать за неё, не спросив'],
    'Ресторан':['Учитывать её вкус и дать выбрать блюдо','Обсудить атмосферу и музыку','Торопить её с заказом'],
    'Музей':['Обсудить экспонат, который её заинтересовал','Предложить выбрать любимый зал','Проходить всё молча и торопиться'],
    'Лес':['Выбрать безопасную красивую тропу','Сделать паузу и насладиться природой','Уйти далеко без предупреждения'],
    'Дома у неё':['Предложить фильм или настольную игру','Спросить, чем ей хочется заняться','Начать переставлять её вещи'],
    'Дома у тебя':['Подготовить уютную атмосферу','Предложить вместе приготовить что-нибудь','Оставить её одну и заняться своими делами'],
    'В отеле':['Заранее продумать комфортный план вечера','Уточнить, всё ли ей удобно','Игнорировать её просьбы'],
    'Театр':['Обсудить постановку после спектакля','Узнать, что ей понравилось','Перебивать во время представления'],
    'В кинотеатре':['Выбрать фильм с учётом её вкусов','Взять любимые закуски','Выбрать фильм только по своему вкусу']
  };
  function openDateModal(instanceId){
    const inst=getOwned(instanceId);if(!inst)return;
    if(inst.lastDateAt&&Date.now()-inst.lastDateAt<DAY){
      const hours=Math.ceil((DAY-(Date.now()-inst.lastDateAt))/3600000);
      toast(`Следующее свидание с этой карточкой будет доступно примерно через ${hours} ч.`,'error');return;
    }
    const card=getData(inst.cardId);
    openModal(`<div class="eyebrow">GG / DATE</div><h2 class="modal-title">Свидание с ${escapeHTML(card.name)}</h2><div class="date-profile-strip"><span>${escapeHTML(card.cls)}</span><span>3 ЭТАПА</span><span>Лимит: 1 раз в 24 часа</span></div><p class="modal-subtitle">Выбери место. Затем пройди три этапа свидания — разговор, совместное занятие и прощание.</p><div class="date-location-grid">${GG_LOCATIONS.map(l=>`<button class="date-location-card" data-action="date-location" data-id="${instanceId}" data-location="${escapeHTML(l.name)}"><span>${l.icon}</span><b>${escapeHTML(l.name)}</b><small>${l.price?`▰ ${money(l.price)} BN`:'Бесплатно'}</small><em>${card.spots.includes(l.name)?'Ей нравится':'Неизвестное место'}</em></button>`).join('')}</div>`);
  }
  function dateLocation(instanceId,location){
    const inst=getOwned(instanceId);if(!inst)return;
    if(inst.lastDateAt&&Date.now()-inst.lastDateAt<DAY){toast('С этой карточкой уже было свидание за последние 24 часа.','error');return;}
    const spot=GG_LOCATIONS.find(l=>l.name===location);if(!spot)return;
    if(state.banknotes<spot.price){toast('Недостаточно банкнот для этого свидания.','error');return;}
    const card=getData(inst.cardId);
    dateSession={instanceId,location,price:spot.price,step:0,score:0,cardId:card.id};
    renderDateStage();
  }
  function renderDateStage(){
    if(!dateSession)return;
    const inst=getOwned(dateSession.instanceId);if(!inst){closeModal();return;}
    const card=getData(dateSession.cardId),step=dateSession.step;
    let options=dateStageData[step].map(x=>({...x}));
    if(step===0){
      const prompts=classPrompts[card.cls]||[];
      if(prompts.length){options=[{text:prompts[0],score:2},{text:'Обсудить планы и интересы',score:1},{text:prompts[1],score:-1}];}
    } else if(step===1){
      const prompts=locationPrompts[dateSession.location]||[];
      if(prompts.length)options=[{text:prompts[0],score:2},{text:prompts[1],score:1},{text:prompts[2],score:-1}];
    }
    options=shuffle(options);
    dateSession.currentOptions=options;
    const progress=[0,1,2,3].map(i=>`<i class="${i<=step?'active':''}"></i>`).join('');
    openModal(`<div class="date-stage-top"><div class="eyebrow">GG / DATE · ${escapeHTML(dateSession.location)}</div><span>ЭТАП ${step+1} / 4</span></div><div class="date-progress">${progress}</div><h2 class="modal-title">${dateStageTitles[step]}</h2><p class="modal-subtitle">${escapeHTML(card.name)} ждёт твоего решения. Выбор повлияет на итог встречи.</p><div class="date-scene"><span>${GG_LOCATIONS.find(l=>l.name===dateSession.location)?.icon||'♡'}</span><b>${['О чём поговорите?','Что будете делать вместе?','Как поступите в неожиданной ситуации?','Как закончится вечер?'][step]}</b><small>${['Первое впечатление задаёт настроение.','Выбор занятия зависит от места встречи.','Твоя реакция повлияет на настроение свидания.','Последний момент тоже имеет значение.'][step]}</small></div><div class="date-choice-list">${options.map((op,i)=>`<button class="date-choice" data-action="date-choice" data-id="${dateSession.instanceId}" data-choice="${i}"><span>${['A','B','C'][i]}</span><b>${escapeHTML(op.text)}</b><i>Выбрать</i></button>`).join('')}</div>`);
  }
  function dateChoice(instanceId,choiceIndex){
    const session=dateSession;if(!session||session.instanceId!==instanceId)return;
    const inst=getOwned(instanceId);if(!inst){closeModal();return;}
    const choice=session.currentOptions?.[choiceIndex];if(!choice)return;
    session.score+=choice.score;
    session.step++;
    if(session.step<4){renderDateStage();return;}
    const card=getData(session.cardId),likesPlace=card.spots.includes(session.location);
    session.score+=likesPlace?2:-2;
    if(state.banknotes<session.price){toast('Не хватает банкнот для оплаты свидания.','error');closeModal();return;}
    state.banknotes-=session.price;
    inst.lastDateAt=Date.now();
    let days=session.score>=8?5:session.score>=5?3:session.score>=2?1:-2;
    let actual=0;
    if(days>0)actual=addDays(inst,days);
    else{const before=inst.expiresAt;inst.expiresAt=Math.max(Date.now(),inst.expiresAt+days*DAY);actual=-Math.round((before-inst.expiresAt)/DAY);}
    const resultText=days>0?(actual>0?`+${actual} дней отношений`:'Лимит отношений уже достигнут.'):`${actual} дней отношений`;
    const mood=days>=3?'Идеальное свидание':days>0?'Хороший вечер':'Встреча прошла неудачно';
    const score=session.score;
    dateSession=null;
    save();
    openModal(`<div class="date-result date-result-epic"><div class="eyebrow">DATE COMPLETE</div><div class="date-result-symbol">${days>0?'♡':'…'}</div><h2>${mood}</h2><p>${escapeHTML(card.name)} запомнит эту встречу.</p><div class="date-result-score"><span>Совместимость</span><b>${Math.max(0,Math.min(100,Math.round((score+6)/16*100)))}%</b></div><div class="date-result-days">${resultText}</div><button class="btn btn-primary btn-block" style="margin-top:18px" data-action="modal-close">ЗАВЕРШИТЬ</button></div>`);
  }

  function redeem(code){const normalized=String(code||'').trim().toLowerCase();if(!normalized){toast('Введите промокод.','error');return;}if(state.promos.includes(normalized)){toast('Этот промокод уже использован.','error');return;}let rewards=[];
    if(normalized==='giv4ikmani'){rewards=[createReward('banknotes',{amount:1000000}),createReward('rubies',{amount:1000})];}
    else if(normalized==='fulhausdai'){const cards=CARD_DATA.filter(c=>!ownedIds().has(c.id));cards.forEach(c=>{const inst=addOwned(c.id);if(inst)rewards.push(createReward('card',{cardId:c.id,name:c.name,instanceId:inst.instanceId}));});}
    else if(normalized==='hangty67'){if(ownedIds().has('ubel')){toast('Юбель уже есть в коллекции.','error');return;}const inst=addOwned('ubel');rewards=[createReward('card',{cardId:'ubel',name:'Юбель',instanceId:inst.instanceId})];}
    else{toast('Такого промокода нет.','error');return;}
    state.promos.push(normalized);save();if(rewards.length)openRewards(rewards,`Промокод ${code}`);else{toast('Коллекция уже полная.');render();}}
