'use strict';
  function handleAction(el){
    const a=el.dataset.action,id=el.dataset.id;
    switch(a){
      case'navigate':setView(el.dataset.view);break;
      case'shop-scroll':document.getElementById(el.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});break;
      case'card-detail':openCardDetail(id);break;
      case'catalog-detail':openCatalogDetail(id);break;
      case'catalog-reset':catalogFilters={q:'',tier:'',cls:'',collection:'',universe:'',status:''};render();break;
      case'buy-offer':buyOffer(id);break;
      case'buy-gift':buyGift(id);break;
      case'buy-material':buyMaterial(id);break;
      case'buy-pack':buyPack(id,false,false);break;
      case'buy-pack-ruby':buyPack(id,false,true);break;
      case'daily-claim':claimDaily();break;
      case'reward-next':if(rewardSession){if(rewardSession.index<rewardSession.rewards.length-1){rewardSession.index++;renderRewardStep();}else{rewardSession.summary=true;renderRewardStep();}}break;
      case'reward-close':closeModal();render();break;
      case'modal-close':closeModal();render();break;
      case'gift-open':openGiftModal(id);break;
      case'give-gift':giveGift(id,el.dataset.gift);break;
      case'date-open':openDateModal(id);break;
      case'date-location':dateLocation(id,el.dataset.location);break;
      case'date-choice':dateChoice(id,Number(el.dataset.choice));break;
      case'theme':state.theme=id;save();render();break;
      case'upgrade-card':upgradeCard(id);break;
      case'stat-open':openStatUpgrade(id);break;
      case'stat-upgrade':upgradeStat(id,el.dataset.stat);break;
      case'upgrade-skill':upgradeSkill(id,Number(el.dataset.index));break;
      case'xp-card':trainCard(id);break;
      case'bot-select':selectBot(id);break;
      case'match-details':showMatchDetails(Number(el.dataset.index));break;
      case'battle-start':startBattle();break;
      case'select-ally':selectAlly(Number(el.dataset.index));break;
      case'select-enemy':selectEnemy(Number(el.dataset.index));break;
      case'battle-skill':useBattleSkill(Number(el.dataset.index));break;
      case'battle-endround':endBattleRound();break;
      case'battle-exit':exitBattle();break;
      case'export':exportSave();break;
      case'reset':resetSave();break;
    }
  }

  function upgradeCard(instanceId){const inst=getOwned(instanceId);if(!inst||inst.upgrade>=3||state.materials.card<=0)return;state.materials.card--;inst.upgrade++;inst.xp=(inst.xp||0)+15;save();toast(`Карточка улучшена до +${inst.upgrade}.`);openCardDetail(instanceId);}
  function upgradeSkill(instanceId,index){const inst=getOwned(instanceId);const card=inst&&getData(inst.cardId);if(!inst||!card||state.materials.skill<=0||(inst.skillUpgrades[index]||0)>=3)return;state.materials.skill--;inst.skillUpgrades[index]=(inst.skillUpgrades[index]||0)+1;save();toast(`Навык «${card.skills[index].name}» улучшен.`);openCardDetail(instanceId);}
  function openStatUpgrade(instanceId){const inst=getOwned(instanceId);if(!inst||state.materials.stat<=0)return;const card=getData(inst.cardId);openModal(`<div class="eyebrow">GG / STATS</div><h2 class="modal-title">Улучшение характеристик</h2><p class="modal-subtitle">${escapeHTML(card.name)} · Очки характеристик: ${state.materials.stat}. Выбери одну характеристику.</p><div class="summary-grid"><button class="summary-item" data-action="stat-upgrade" data-id="${instanceId}" data-stat="hp"><span>♥</span><b>+10 HP</b><small>Увеличивает максимальное здоровье</small></button><button class="summary-item" data-action="stat-upgrade" data-id="${instanceId}" data-stat="mana"><span>✧</span><b>+5 MANA</b><small>Увеличивает максимальный запас маны</small></button></div>`);}
  function upgradeStat(instanceId,stat){const inst=getOwned(instanceId);if(!inst||state.materials.stat<=0)return;if(stat==='hp')inst.bonusHp=(inst.bonusHp||0)+10;else if(stat==='mana')inst.bonusMana=(inst.bonusMana||0)+5;else return;state.materials.stat--;save();toast(stat==='hp'?'Максимальное HP увеличено на 10.':'Максимальная мана увеличена на 5.');openCardDetail(instanceId);}
  function trainCard(instanceId){const inst=getOwned(instanceId);if(!inst)return;if(state.banknotes<100){toast('Для тренировки нужно 100 банкнот.','error');return;}state.banknotes-=100;inst.xp=(inst.xp||0)+30;while(inst.xp>=100&&inst.level<100){inst.xp-=100;inst.level++;}if(inst.level>=100)inst.xp=0;save();toast(`Текущий уровень карточки: ${inst.level}.`);openCardDetail(instanceId);}
  function exportSave(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='great-girls-save.json';a.click();URL.revokeObjectURL(url);toast('Резервная копия сохранения скачана.');}
  function resetSave(){if(!confirm('Точно удалить весь прогресс Great Girls в этом браузере?'))return;const nickname=state.nickname||'';localStorage.removeItem(SAVE_KEY);state=defaultState();state.nickname=nickname;state.accountCreatedAt=Date.now();battleSession=null;save();setView('home');starterBox();}
  function starterBox(){if(state.starterClaimed)return;const selected=shuffle(CARD_DATA.filter(c=>c.starter!==false)).slice(0,3);const rewards=[];selected.forEach(c=>{const inst=addOwned(c.id);if(inst)rewards.push(createReward('card',{cardId:c.id,name:c.name,instanceId:inst.instanceId}));});state.starterClaimed=true;save();openRewards(rewards,'Стартовый бокс · 3 карточки');}
