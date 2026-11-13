'use strict';
const MAX_DAILY_MATCHES=10;
function syncBattleDay(){
  if(state.battleDay!==dayKey()){
    state.battleDay=dayKey();
    state.battlesToday=0;
    save();
  }
  if(!state.matchStats)state.matchStats={played:0,wins:0,losses:0,streak:0,bestStreak:0,damageDealt:0,damageTaken:0,healing:0,knockouts:0};
  if(state.matchStats.healing==null)state.matchStats.healing=0;
  if(!Array.isArray(state.matchHistory))state.matchHistory=[];
}
function currentBot(){return (window.GG_BOTS||[]).find(x=>x.id===state.selectedBotId)||null;}
function findOpponent(){
  syncBattleDay();
  if(state.battlesToday>=MAX_DAILY_MATCHES){toast('На сегодня доступно не больше 10 матчей.','error');return;}
  if(ownedEntries().length<3){toast('Для подбора соперника нужны минимум 3 карточки.','error');return;}
  const bots=window.GG_BOTS||[];
  if(!bots.length){toast('Сейчас нет доступных соперников.','error');return;}
  const previous=state.selectedBotId;
  const pool=bots.length>1?bots.filter(bot=>bot.id!==previous):bots;
  const bot=pool[Math.floor(Math.random()*pool.length)];
  state.selectedBotId=bot.id;
  state.matchFound=true;
  save();
  toast(`Соперник найден: ${bot.name}.`);
  render();
}
function renderBattle(){
  syncBattleDay();
  if(battleSession)return renderBattleSession();
  const owned=ownedEntries();
  const bot=state.matchFound?currentBot():null;
  const stats=state.matchStats;
  const remaining=Math.max(0,MAX_DAILY_MATCHES-state.battlesToday);
  const winRate=stats.played?Math.round(stats.wins/stats.played*100):0;
  const teamOptions=owned.map((x,j)=>({id:x.inst.instanceId,name:x.card.name,rating:getRating(x.card,x.inst),j}));
  const botFaces=bot?bot.cardIds.map(id=>{
    const c=getData(id);
    return c?`<span class="bot-face" title="${escapeHTML(c.name)}">${escapeHTML(c.name.slice(0,1))}</span>`:'';
  }).join(''):'';
  const opponentBlock=bot
    ? `<div class="match-found-card"><div class="match-found-info"><small>СЛУЧАЙНЫЙ СОПЕРНИК НАЙДЕН</small><b>${escapeHTML(bot.name)} <span>· ${escapeHTML(bot.division)} · уровень ${bot.rank}/30</span></b><div class="bot-faces">${botFaces}</div></div><div class="match-found-actions"><button class="btn btn-secondary" data-action="match-find" ${remaining<=0?'disabled':''}>ИСКАТЬ ДРУГОГО</button><button class="btn btn-primary" data-action="battle-start" ${owned.length<3||remaining<=0?'disabled':''}>⚔ НАЧАТЬ БОЙ</button></div></div>`
    : `<div class="match-search-card"><div><b>Соперник ещё не найден</b><span>Система случайно выберет одного из 30 ботов.</span></div><button class="btn btn-primary" data-action="match-find" ${owned.length<3||remaining<=0?'disabled':''}>⌕ НАЙТИ СОПЕРНИКА</button></div>`;
  const recent=state.matchHistory.slice(0,8).map((m,i)=>`<button type="button" class="match-history-row" data-action="match-details" data-index="${i}"><span class="match-result-dot ${m.result==='win'?'is-win':'is-loss'}"></span><div class="match-history-main"><b>${escapeHTML(m.botName||'Соперник')}</b><small>${escapeHTML(m.dateLabel||new Date(m.date||Date.now()).toLocaleDateString('ru-RU'))} · ${m.rounds||1} раунд.</small></div><strong class="${m.result==='win'?'good-text':'bad-text'}">${m.result==='win'?'ПОБЕДА':'ПОРАЖЕНИЕ'}</strong><span class="match-reward">+${money(m.reward||0)} BN</span></button>`).join('');
  return `<section class="arena-hero"><div class="arena-hero-glow"></div><div class="arena-hero-copy"><div class="eyebrow">GREAT GIRLS · MATCHMAKING</div><h1>ПОДБОР СОПЕРНИКА</h1><p>Собери отряд из трёх карточек и найди случайного бота.</p><div class="arena-hero-tags"><span>3 VS 3</span><span>ПОШАГОВЫЙ БОЙ</span><span>30 ВОЗМОЖНЫХ СОПЕРНИКОВ</span></div></div><div class="arena-hero-emblem">⌕</div></section>
    <section class="match-stat-grid match-stat-grid-primary"><div class="match-stat panel"><small>МАТЧИ</small><b>${stats.played}</b></div><div class="match-stat panel"><small>ПОБЕДЫ</small><b>${stats.wins}</b></div><div class="match-stat panel"><small>ПОРАЖЕНИЯ</small><b>${stats.losses}</b></div><div class="match-stat panel"><small>WIN RATE</small><b>${winRate}%</b></div><div class="match-stat panel"><small>ТЕКУЩАЯ СЕРИЯ</small><b>${stats.streak||0}</b></div><div class="match-stat panel"><small>ЛУЧШАЯ СЕРИЯ</small><b>${stats.bestStreak||0}</b></div></section><section class="match-stat-grid match-stat-grid-secondary"><div class="match-stat panel"><small>НАНЕСЕНО УРОНА</small><b>${money(stats.damageDealt||0)}</b></div><div class="match-stat panel"><small>ПОЛУЧЕНО УРОНА</small><b>${money(stats.damageTaken||0)}</b></div><div class="match-stat panel"><small>ЛЕЧЕНИЕ</small><b>${money(stats.healing||0)}</b></div><div class="match-stat panel"><small>ПОБЕЖДЕНО</small><b>${stats.knockouts||0}</b></div></section>
    <section class="panel arena-setup"><div class="arena-setup-top"><div><div class="eyebrow">MATCHMAKING</div><h2>Подготовка к бою</h2></div><div class="match-limit"><b>${remaining}/${MAX_DAILY_MATCHES}</b><span>матчей сегодня</span></div></div>
      ${owned.length>=3?`<div class="squad-select-grid">${[0,1,2].map(i=>`<label class="squad-slot"><span>БОЕЦ 0${i+1}</span><select class="select-input team-select" data-slot="${i}">${teamOptions.map((x,j)=>`<option value="${x.id}" ${j===i?'selected':''}>${escapeHTML(x.name)} · ${x.rating}</option>`).join('')}</select></label>`).join('')}</div>`:`<div class="battle-needs-cards"><b>Нужно минимум 3 карточки</b><button class="btn btn-primary" data-action="navigate" data-view="shop">Открыть магазин</button></div>`}
      ${opponentBlock}
      ${remaining<=0?'<p class="limit-note">Лимит на сегодня исчерпан. Новые матчи откроются после 00:00.</p>':''}
    </section>
    <section class="panel match-history-panel"><div class="history-head"><div><div class="eyebrow">CAREER RECORD</div><h2 class="section-title">Последние матчи</h2></div><span class="tag">${state.matchHistory.length} / 30</span></div>${recent?`<div class="match-history-list">${recent}</div>`:'<div class="history-empty">Здесь появятся результаты твоих первых сражений.</div>'}</section>`;
}
function startBattle(){
  syncBattleDay();
  if(state.battlesToday>=MAX_DAILY_MATCHES){toast('На сегодня доступно не больше 10 матчей.','error');return;}
  const selects=$$('.team-select');
  const ids=selects.map(s=>s.value);
  if(ids.length!==3||new Set(ids).size!==3){toast('Выбери три разные карточки.','error');return;}
  const bot=state.matchFound?currentBot():null;
  if(!bot){toast('Сначала найди случайного соперника.','error');return;}
  const allies=ids.map(id=>makeFighter(getOwned(id),null,1,'ally'));
  const enemyScale=.80+bot.rank*.02;
  const enemies=bot.cardIds.map(id=>getData(id)).filter(Boolean).map(c=>makeFighter(null,c,enemyScale,'enemy'));
  if(enemies.length!==3){toast('Не удалось собрать команду соперника.','error');return;}
  state.battlesToday++;
  save();
  battleSession={
    botId:bot.id,botName:bot.name,botRank:bot.rank,botDivision:bot.division,
    round:1,allies,enemies,selected:0,target:0,allyTarget:0,acted:[],
    log:[`${bot.name} найден. Матч начался.`],finished:false,result:null,
    startedAt:Date.now(),stats:{damageDealt:0,damageTaken:0,healing:0,knockouts:0,actions:0}
  };
  render();
}
function makeFighter(inst,cardOverride=null,scale=1,side='ally'){
  const card=cardOverride||getData(inst.cardId);
  const baseHp=getHP(card,inst);
  return {
    cardId:card.id,instanceId:inst?.instanceId||null,name:card.name,
    hpMax:Math.max(1,Math.round(baseHp*scale)),hp:Math.max(1,Math.round(baseHp*scale)),
    manaMax:getManaMax(card,inst),mana:getManaMax(card,inst),shield:0,invuln:false,mitigation:0,
    stunned:false,regen:[],buff:0,usedSpecial:false,rating:getRating(card,inst),
    frame:inst?.frame||'classic',skillUpgrades:inst?.skillUpgrades||card.skills.map(()=>0),
    isEnemy:side==='enemy',powerScale:scale
  };
}
function renderBattleSession(){
  const b=battleSession;
  const selected=b.allies[b.selected]||b.allies.find(f=>f.hp>0);
  const activeIndex=b.allies.indexOf(selected);
  const card=selected?getData(selected.cardId):null;
  const pending=b.allies.filter((f,i)=>f.hp>0&&!b.acted.includes(i)).length;
  const fighterHtml=(f,i,side)=>{
    const cardData=getData(f.cardId),dead=f.hp<=0;
    const isSelected=side==='ally'?activeIndex===i:b.target===i;
    const acted=side==='ally'&&b.acted.includes(i);
    const effect=b.lastAction&&b.lastAction.side===(side==='ally'?'ally':'enemy')&&b.lastAction.index===i?b.lastAction.type:'';
    const pct=Math.max(0,Math.min(100,f.hp/f.hpMax*100));
    const manaPct=Math.max(0,Math.min(100,f.mana/f.manaMax*100));
    return `<button type="button" class="fighter ${side==='ally'?'fighter-ally':'fighter-enemy'} frame-${f.frame} ${dead?'dead':''} ${isSelected?'selected':''} ${acted?'acted':''} ${effect?'battle-'+effect:''}" data-action="${side==='ally'?'select-ally':'select-enemy'}" data-index="${i}" aria-pressed="${isSelected}" ${dead?'disabled':''}>
      <div class="fighter-art"><img src="${escapeHTML(cardData.image||'')}" alt="${escapeHTML(f.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="fighter-fallback" style="--card-tint:${cardTint(f.cardId)};display:${cardData.image?'none':'grid'}">${escapeHTML(f.name.slice(0,1))}</span><span class="fighter-tier">${tierInfo(f.rating)[0]}</span>${acted?'<span class="acted-stamp">ХОД ИСПОЛЬЗОВАН</span>':''}</div>
      <span class="fighter-name">${escapeHTML(f.name)}</span>
      <span class="fighter-bars-label"><b>${f.hp}</b><small>/${f.hpMax} HP</small></span><span class="healthbar"><i style="width:${pct}%"></i></span>
      <span class="fighter-bars-label mana-label"><b>${f.mana}</b><small>/${f.manaMax} MP</small></span><span class="manabar"><i style="width:${manaPct}%"></i></span>
      <span class="fighter-status">${f.shield?`🛡 ${f.shield}`:''}${f.stunned?' · ОГЛУШЕНИЕ':''}${dead?' · ПОВЕРЖЕН':''}</span>
    </button>`;
  };
  if(b.finished){
    const win=b.result==='win';
    const reward=b.reward||0;
    return `<section class="battle-result-screen ${win?'result-win':'result-loss'}"><div class="result-sparks">✦　✧　✦</div><div class="eyebrow">GREAT GIRLS · MATCH RESULT</div><div class="result-versus">${win?'VICTORY':'DEFEAT'}</div><div class="result-opponent">${escapeHTML(b.botName)} · ${b.botDivision} ${b.botRank}/30</div><div class="result-reward">+${money(reward)} <small>БАНКНОТ</small></div><div class="result-stat-row"><div><b>${b.round}</b><span>РАУНДОВ</span></div><div><b>${b.stats.damageDealt}</b><span>НАНЕСЕНО</span></div><div><b>${b.stats.damageTaken}</b><span>ПОЛУЧЕНО</span></div><div><b>${b.stats.healing}</b><span>ЛЕЧЕНИЕ</span></div><div><b>${b.stats.knockouts}</b><span>ПОБЕЖДЕНО</span></div><div><b>${Math.round((Date.now()-b.startedAt)/1000)}с</b><span>ВРЕМЯ</span></div></div><div class="result-team">${b.allies.map(f=>`<div class="result-unit ${f.hp<=0?'dead':''}"><b>${escapeHTML(f.name)}</b><span>${Math.max(0,f.hp)} / ${f.hpMax} HP</span></div>`).join('')}</div><button class="btn btn-primary result-exit" data-action="battle-exit">ВЕРНУТЬСЯ К ПОДБОРУ</button></section>`;
  }
  if(!selected||!card)return '<div class="empty-state">Нет доступных бойцов.</div>';
  const skills=card.skills.map((sk,i)=>{
    const up=selected.skillUpgrades[i]||0;
    const disabled=selected.hp<=0||b.acted.includes(activeIndex)||selected.mana<sk.cost||(sk.once&&selected.usedSpecial)||(sk.target==='enemy'&&!b.enemies.some(f=>f.hp>0));
    const targetLabel=sk.target==='self'?'СЕБЕ':sk.target==='ally'?'СОЮЗНИКУ':sk.target==='team'?'КОМАНДЕ':'ВРАГУ';
    return `<button class="battle-skill" data-action="battle-skill" data-index="${i}" ${disabled?'disabled':''}><span class="skill-cost">${sk.cost} MP</span><b>${escapeHTML(sk.name)}</b><small>${escapeHTML(sk.desc)}</small><em>${targetLabel}${up?` · +${up}`:''}${sk.once?' · 1 РАЗ ЗА БОЙ':''}</em></button>`;
  }).join('');
  const aliveTargets=b.allies.map((f,i)=>({f,i})).filter(x=>x.f.hp>0);
  return `<section class="battle-match"><header class="match-cinematic-head"><div class="match-round-label"><span>РАУНД</span><b>${String(b.round).padStart(2,'0')}</b></div><div class="match-vs-title"><small>GREAT GIRLS BATTLE</small><strong>VS</strong><span>${escapeHTML(b.botName)} · ${b.botRank}/30</span></div><div class="match-turn-label"><b>${pending}</b><span>ХОДОВ ОСТАЛОСЬ</span></div></header>
    <div class="battle-scoreboard"><div><span>ТВОЙ ОТРЯД</span><b>${b.allies.filter(f=>f.hp>0).length}/3</b></div><div class="scoreboard-vs">VS</div><div><span>${escapeHTML(b.botName).toUpperCase()}</span><b>${b.enemies.filter(f=>f.hp>0).length}/3</b></div></div>
    <section class="battle-arena"><div class="battle-side-title"><span>✦</span> ТВОЯ КОМАНДА</div><div class="battlefighters">${b.allies.map((f,i)=>fighterHtml(f,i,'ally')).join('')}</div><div class="arena-divider"><span>VS</span></div><div class="battle-side-title enemy-side-title">КОМАНДА СОПЕРНИКА <span>${b.botDivision.toUpperCase()}</span></div><div class="battlefighters">${b.enemies.map((f,i)=>fighterHtml(f,i,'enemy')).join('')}</div></section>
    <section class="battle-command panel"><div class="command-active"><div class="command-unit-icon">${escapeHTML(selected.name.slice(0,1))}</div><div class="command-active-copy"><small>СЕЙЧАС ДЕЙСТВУЕТ</small><b>${escapeHTML(selected.name)}</b><span>${selected.hp}/${selected.hpMax} HP · ${selected.mana}/${selected.manaMax} MP</span></div><div class="command-acted">${b.acted.length}/${b.allies.filter(f=>f.hp>0).length} ДЕЙСТВИЙ</div></div>
      <div class="command-target-row"><label for="battleAllyTarget">ЦЕЛЬ ДЛЯ ЛЕЧЕНИЯ</label><select id="battleAllyTarget" class="select-input battle-ally-target">${aliveTargets.map(x=>`<option value="${x.i}" ${b.allyTarget===x.i?'selected':''}>${escapeHTML(x.f.name)} · ${x.f.hp}/${x.f.hpMax} HP</option>`).join('')}</select><span class="command-target-hint">Для атаки нажми на карту врага</span></div>
      <div class="command-skill-heading"><b>СПОСОБНОСТИ</b><span>Выбери одно действие</span></div><div class="skill-buttons">${skills}</div>
      <div class="battle-footer-controls"><div class="battle-log-title">ХРОНИКА БОЯ</div><div class="battle-log">${b.log.slice(-4).map(line=>`<div>› ${escapeHTML(line)}</div>`).join('')}</div><button class="btn btn-secondary end-round-btn" data-action="battle-endround">ЗАВЕРШИТЬ ХОД ОТРЯДА</button></div>
    </section></section>`;
}
function selectAlly(i){
  const b=battleSession;if(!b||b.finished)return;
  if(b.allies[i]?.hp>0){b.selected=i;b.lastAction=null;render();}
}
function selectAllyTarget(i){
  const b=battleSession;if(!b||b.finished)return;
  if(b.allies[i]?.hp>0){b.allyTarget=i;render();}
}
function selectEnemy(i){
  const b=battleSession;if(!b||b.finished)return;
  if(b.enemies[i]?.hp>0){b.target=i;b.lastAction=null;render();}
}
function battleLog(text){battleSession.log.push(text);if(battleSession.log.length>36)battleSession.log.shift();}
function alive(side){return battleSession[side].filter(f=>f.hp>0);}
function checkBattleEnd(){const b=battleSession;if(alive('enemies').length===0){finishBattle('win');return true;}if(alive('allies').length===0){finishBattle('loss');return true;}return false;}
function applyBattleDamage(target,amount){
  if(target.hp<=0)return 0;
  let dmg=Math.max(0,Math.round(amount));
  if(target.invuln){battleLog(`${target.name} полностью блокирует атаку.`);return 0;}
  if(target.mitigation>0)dmg=Math.round(dmg*(1-target.mitigation/100));
  if(target.shield>0){const absorbed=Math.min(target.shield,dmg);target.shield-=absorbed;dmg-=absorbed;if(absorbed)battleLog(`Щит ${target.name} поглотил ${absorbed} урона.`);}
  const before=target.hp;target.hp=Math.max(0,target.hp-dmg);const dealt=before-target.hp;
  if(target.isEnemy)battleSession.stats.damageDealt+=dealt;else battleSession.stats.damageTaken+=dealt;
  if(before>0&&target.hp<=0&&target.isEnemy)battleSession.stats.knockouts++;
  return dealt;
}
function selectTargetForSkill(sk){
  const b=battleSession;
  if(sk.target==='self')return {side:'ally',index:b.selected,target:b.allies[b.selected]};
  if(sk.target==='team')return {side:'team',index:-1,target:null};
  if(sk.target==='ally'){
    let idx=b.allyTarget;
    if(!b.allies[idx]||b.allies[idx].hp<=0)idx=b.allies.findIndex(f=>f.hp>0);
    return {side:'ally',index:idx,target:b.allies[idx]};
  }
  if(!b.enemies[b.target]||b.enemies[b.target].hp<=0)b.target=b.enemies.findIndex(f=>f.hp>0);
  return {side:'enemy',index:b.target,target:b.enemies[b.target]};
}
function useBattleSkill(index){
  const b=battleSession;if(!b||b.finished)return;
  const user=b.allies[b.selected];if(!user||user.hp<=0||b.acted.includes(b.selected))return;
  const card=getData(user.cardId),sk=card.skills[index];if(!sk)return;
  if(user.mana<sk.cost){toast('Недостаточно маны.','error');return;}
  if(sk.once&&user.usedSpecial){toast('Эта способность уже использована в бою.','error');return;}
  const targetInfo=selectTargetForSkill(sk);
  if(sk.target!=='team'&&(!targetInfo.target||targetInfo.target.hp<=0)){toast('Выбери доступную цель.','error');return;}
  const up=user.skillUpgrades[index]||0,val=skillValue(sk,up);
  user.mana-=sk.cost;if(sk.once)user.usedSpecial=true;b.stats.actions++;
  const doDamage=(target,amount)=>{
    let final=amount;if(user.buff){final=Math.round(final*(1+user.buff/100));user.buff=0;}
    const dealt=applyBattleDamage(target,final);b.lastAction={side:target.isEnemy?'enemy':'ally',index:(target.isEnemy?b.enemies:b.allies).indexOf(target),type:'hit'};battleLog(`${user.name}: «${sk.name}» · ${target.name} −${dealt} HP`);
  };
  switch(sk.type){
    case'damage':doDamage(targetInfo.target,val);break;
    case'randomdamage':{const n=random(sk.values);doDamage(targetInfo.target,Math.round(n*(1+up*.05)));break;}
    case'heal':case'healrating':{
      const extra=sk.type==='healrating'?Math.min(15,Math.round(user.rating/100*15)):0;
      const target=targetInfo.target,healed=Math.min(target.hpMax-target.hp,val+extra);target.hp+=healed;b.stats.healing+=healed;b.lastAction={side:'ally',index:b.allies.indexOf(target),type:'heal'};battleLog(`${user.name} лечит ${target.name} на ${healed} HP.`);break;
    }
    case'regen':user.regen.push({amount:val,turns:sk.duration});battleLog(`${user.name}: регенерация ${val} HP × ${sk.duration} ходов.`);break;
    case'teamregen':b.allies.filter(f=>f.hp>0).forEach(f=>f.regen.push({amount:val,turns:sk.duration}));battleLog(`${user.name} восстанавливает всю команду.`);break;
    case'shield':user.shield=Math.min(200,user.shield+val);battleLog(`${user.name} получает щит ${val} HP.`);break;
    case'invuln':user.invuln=true;battleLog(`${user.name} активирует неуязвимость.`);break;
    case'mitigation':user.mitigation=val;battleLog(`${user.name} снижает следующий урон на ${val}%.`);break;
    case'buff':targetInfo.target.buff=Math.min(30,targetInfo.target.buff+val);battleLog(`${user.name} усиливает следующую атаку ${targetInfo.target.name} на ${val}%.`);break;
    case'stunDamage':doDamage(targetInfo.target,val);if(targetInfo.target.hp>0){targetInfo.target.stunned=true;battleLog(`${targetInfo.target.name} оглушён.`);}break;
    case'riskheal':{const target=targetInfo.target;const selfDamage=applyBattleDamage(target,sk.damage);target.regen.push({amount:val,turns:1,delayed:true});battleLog(`${user.name}: ${target.name} получает ${selfDamage} урона, затем восстановит ${val} HP.`);break;}
  }
  b.acted.push(b.selected);
  if(checkBattleEnd())return;
  const next=b.allies.findIndex((f,i)=>f.hp>0&&!b.acted.includes(i));
  if(next>=0){b.selected=next;render();}
  else endBattleRound();
}
function endBattleRound(){
  const b=battleSession;if(!b||b.finished)return;
  if(!alive('enemies').length){finishBattle('win');return;}
  battleLog(`${b.botName} отвечает атакой.`);
  for(const enemy of b.enemies){
    if(enemy.hp<=0)continue;
    if(enemy.stunned){enemy.stunned=false;battleLog(`${enemy.name} пропускает действие.`);continue;}
    const targets=b.allies.filter(f=>f.hp>0);if(!targets.length)break;
    const data=getData(enemy.cardId);
    const attacks=data.skills.filter(s=>['damage','randomdamage','stunDamage'].includes(s.type)&&s.cost<=enemy.mana);
    const sk=random(attacks.length?attacks:[{name:'Атака',type:'damage',value:18,cost:0}]);
    if(sk.cost)enemy.mana-=sk.cost;
    const target=random(targets);
    const base=sk.type==='randomdamage'?random(sk.values):sk.value||18;
    const dealt=applyBattleDamage(target,Math.round(base*enemy.powerScale));
    b.lastAction={side:'ally',index:b.allies.indexOf(target),type:'hit'};
    battleLog(`${enemy.name}: «${sk.name}» · ${target.name} −${dealt} HP`);
    if(sk.type==='stunDamage'&&target.hp>0&&Math.random()<.28)target.stunned=true;
    if(checkBattleEnd())return;
  }
  for(const f of b.allies){
    if(f.hp<=0)continue;
    f.regen=f.regen.filter(effect=>{
      const healed=Math.min(f.hpMax-f.hp,effect.amount);f.hp+=healed;b.stats.healing+=healed;
      if(healed)battleLog(`${f.name} восстанавливает ${healed} HP.`);
      if(effect.delayed)return false;
      effect.turns--;return effect.turns>0;
    });
    f.mana=Math.min(f.manaMax,f.mana+20);
  }
  b.enemies.forEach(f=>{if(f.hp>0)f.mana=Math.min(f.manaMax,f.mana+15);});
  b.allies.forEach(f=>{f.invuln=false;f.mitigation=0;});
  b.round++;b.acted=[];
  b.allies.forEach((f,i)=>{if(f.hp>0&&f.stunned){f.stunned=false;b.acted.push(i);battleLog(`${f.name} оглушена и пропускает ход.`);}});
  const next=b.allies.findIndex((f,i)=>f.hp>0&&!b.acted.includes(i));
  if(next>=0){b.selected=next;render();}
  else endBattleRound();
}
function finishBattle(result){
  const b=battleSession;if(!b||b.finished)return;
  b.finished=true;b.result=result;
  const reward=result==='win'?150+b.botRank*12:45+b.botRank*4;
  b.reward=reward;
  const stats=state.matchStats||(state.matchStats={played:0,wins:0,losses:0,streak:0,bestStreak:0,damageDealt:0,damageTaken:0,knockouts:0});
  stats.played++;
  stats.damageDealt+=b.stats.damageDealt;stats.damageTaken+=b.stats.damageTaken;stats.healing=(stats.healing||0)+b.stats.healing;stats.knockouts+=b.stats.knockouts;
  if(result==='win'){
    state.wins++;stats.wins++;stats.streak++;stats.bestStreak=Math.max(stats.bestStreak,stats.streak);
    for(const f of b.allies){if(f.instanceId){const inst=getOwned(f.instanceId);if(inst){inst.xp=(inst.xp||0)+35;while(inst.xp>=100&&inst.level<100){inst.level++;inst.xp-=100;}if(inst.level>=100)inst.xp=0;}}}
  }else{state.losses++;stats.losses++;stats.streak=0;}
  state.banknotes+=reward;
  const date=new Date();
  state.matchHistory.unshift({botId:b.botId,botName:b.botName,botRank:b.botRank,botDivision:b.botDivision,result,rounds:b.round,damageDealt:b.stats.damageDealt,damageTaken:b.stats.damageTaken,healing:b.stats.healing,knockouts:b.stats.knockouts,actions:b.stats.actions,duration:Math.round((Date.now()-b.startedAt)/1000),reward,date:date.toISOString(),dateLabel:date.toLocaleDateString('ru-RU')});
  state.matchHistory=state.matchHistory.slice(0,30);
  save();render();
}
function showMatchDetails(index){
  const m=state.matchHistory[index];if(!m)return;
  openModal(`<div class="eyebrow">MATCH REPORT · ${escapeHTML(m.dateLabel||'')}</div><h2 class="modal-title">${m.result==='win'?'Победа':'Поражение'} против ${escapeHTML(m.botName||'Соперник')}</h2><p class="modal-subtitle">${escapeHTML(m.botDivision||'')} · Уровень ${m.botRank||'—'}/30 · ${m.rounds||1} раундов</p><div class="detail-stats match-detail-stats"><div class="detail-stat"><span>Нанесено урона</span><b>${money(m.damageDealt||0)}</b></div><div class="detail-stat"><span>Получено урона</span><b>${money(m.damageTaken||0)}</b></div><div class="detail-stat"><span>Восстановлено HP</span><b>${money(m.healing||0)}</b></div><div class="detail-stat"><span>Побеждено</span><b>${m.knockouts||0}</b></div><div class="detail-stat"><span>Действий</span><b>${m.actions||0}</b></div><div class="detail-stat"><span>Время</span><b>${m.duration||0} сек.</b></div></div><div class="match-detail-reward">Награда: +${money(m.reward||0)} банкнот</div><button class="btn btn-primary btn-block" data-action="modal-close">ЗАКРЫТЬ</button>`);
}
function exitBattle(){battleSession=null;state.matchFound=false;state.selectedBotId=null;save();setView('battle');}
