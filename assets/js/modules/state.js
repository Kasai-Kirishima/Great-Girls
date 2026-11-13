'use strict';
function refreshDailyOffersForOwned(){
  if(state.dailyOffersDate!==dayKey())return;
  const owned=ownedIds();
  const keep=(state.dailyOffers||[]).filter(id=>!owned.has(id)&&getData(id));
  const used=new Set(keep);
  const pool=shuffle(CARD_DATA.filter(c=>!owned.has(c.id)&&!used.has(c.id)));
  state.dailyOffers=[...keep,...pool.slice(0,Math.max(0,3-keep.length)).map(c=>c.id)];
}
function defaultState(){
  return {
    version:5,nickname:'',accountCreatedAt:0,banknotes:1200,rubies:12,collection:[],
    gifts:{'Букет цветов':1,'Коробка конфет':1},materials:{card:1,stat:1,skill:2},
    theme:'midnight',lang:'ru',dailyClaim:'',dailyOffersDate:'',dailyOffers:[],promos:[],
    wins:0,losses:0,starterClaimed:false,createdAt:Date.now(),
    selectedBotId:null,matchFound:false,battleDay:'',battlesToday:0,
    matchStats:{played:0,wins:0,losses:0,streak:0,bestStreak:0,damageDealt:0,damageTaken:0,healing:0,knockouts:0},
    matchHistory:[]
  };
}
function loadState(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(raw){
      const p=JSON.parse(raw);
      if(p&&(p.version===1||p.version===2||p.version===3||p.version===4||p.version===5)&&Array.isArray(p.collection)){
        const base=defaultState();
        return {
          ...base,...p,version:5,
          gifts:{...base.gifts,...(p.gifts||{})},
          materials:{...base.materials,...(p.materials||{})},
          matchStats:{...base.matchStats,...(p.matchStats||{}),played:p.matchStats?.played??((p.wins||0)+(p.losses||0)),wins:p.matchStats?.wins??(p.wins||0),losses:p.matchStats?.losses??(p.losses||0)},
          matchHistory:Array.isArray(p.matchHistory)?p.matchHistory.slice(0,30):[],
          battlesToday:Number(p.battlesToday)||0
        };
      }
    }
  }catch(e){console.warn('Save load failed',e);}
  return defaultState();
}
function save(){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}
  catch(e){console.warn('Save failed',e);toast('Не удалось сохранить данные браузера.','error');}
  updateTopbar();
}
function expireCards(silent=false){
  const before=state.collection.length;
  state.collection=state.collection.filter(x=>x.expiresAt>Date.now());
  const n=before-state.collection.length;
  if(n&&!silent){toast(`${n} карточек покинули коллекцию: срок отношений закончился.`,'error');save();}
  return n;
}
function ensureDailyOffers(){
  if(state.dailyOffersDate!==dayKey()){
    const pool=shuffle(CARD_DATA.filter(c=>!ownedIds().has(c.id)));
    state.dailyOffers=pool.slice(0,3).map(c=>c.id);
    state.dailyOffersDate=dayKey();
    save();
  }
}
state=loadState();
