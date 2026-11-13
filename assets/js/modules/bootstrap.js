'use strict';
  // All UI events are delegated from document, so newly rendered and modal controls stay active.
  document.addEventListener('click', e => {
    const nav = e.target.closest('.nav-item[data-view]');
    if (nav) {
      e.preventDefault();
      try { setView(nav.dataset.view); } catch (error) { console.error('Navigation error:', error); toast('Не удалось открыть раздел. Обнови страницу и попробуй ещё раз.', 'error'); }
      return;
    }
    const action = e.target.closest('[data-action]');
    if (action && !action.disabled) {
      e.preventDefault();
      try { handleAction(action); } catch (error) { console.error('Action error:', action.dataset.action, error); toast('Не удалось выполнить действие. Попробуй ещё раз.', 'error'); }
    }
  });

  content.addEventListener('input', e => {
    if (e.target.dataset.catalogFilter === 'q') {
      catalogFilters.q = e.target.value;
      const q = catalogFilters.q.toLowerCase();
      const cards=$$('#catalogGrid .catalog-card-open');
      let shown=0;
      cards.forEach(btn => { const visible=(btn.dataset.search||btn.textContent.toLowerCase()).includes(q); btn.style.display=visible?'':'none'; if(visible)shown++; });
      const count=content.querySelector('.filter-count'); if(count)count.textContent=`Найдено: ${shown}`;
    }
    if (e.target.dataset.filter === 'q') {
      collectionFilters.q = e.target.value;
      const q = collectionFilters.q.toLowerCase();
      $$('#collectionGrid .card-open').forEach(btn => {
        btn.style.display = btn.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  });

  content.addEventListener('change', e => {
    if (e.target.dataset.filter) {
      collectionFilters[e.target.dataset.filter] = e.target.value;
      render();
    }
    if (e.target.dataset.catalogFilter && e.target.dataset.catalogFilter !== 'q') {
      catalogFilters[e.target.dataset.catalogFilter] = e.target.value;
      render();
    }
    if (e.target.matches('.battle-ally-target')) {
      selectAllyTarget(Number(e.target.value));
    }
    if (e.target.id === 'languageSelect') {
      state.lang = e.target.value;
      save();
      render();
    }
    if (e.target.id === 'importFile' && e.target.files[0]) importSave(e.target.files[0]);
  });

  content.addEventListener('submit', e => {
    if (e.target.id === 'promoForm') {
      e.preventDefault();
      redeem($('#promoInput').value);
    }
  });

  $('#modalClose').addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  $('#mobileMenu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  $('#profileButton').addEventListener('click', () => openModal(
    `<div class="eyebrow">PLAYER PROFILE</div><h2 class="modal-title">${escapeHTML(state.nickname || 'GREAT GIRLS')}</h2><p class="modal-subtitle">Локальный профиль · Онлайн-аккаунт пока не подключён.</p><div class="detail-stats"><div class="detail-stat"><span>Карточки</span><b>${state.collection.length}</b></div><div class="detail-stat"><span>Победы</span><b>${state.wins}</b></div><div class="detail-stat"><span>Поражения</span><b>${state.losses}</b></div></div><button class="btn btn-primary btn-block" data-action="modal-close">${t('close')}</button>`
  ));

  function importSave(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (![1, 2, 3, 4, 5].includes(parsed.version) || !Array.isArray(parsed.collection)) throw new Error('bad save');
        const currentNickname = state.nickname || '';
        const base = defaultState();
        state = { ...base, ...parsed, version: 5, nickname: parsed.nickname || currentNickname, gifts: { ...base.gifts, ...(parsed.gifts || {}) }, materials: { ...base.materials, ...(parsed.materials || {}) }, matchStats: { ...base.matchStats, ...(parsed.matchStats || {}), played: parsed.matchStats?.played ?? ((parsed.wins || 0) + (parsed.losses || 0)), wins: parsed.matchStats?.wins ?? (parsed.wins || 0), losses: parsed.matchStats?.losses ?? (parsed.losses || 0) }, matchHistory: Array.isArray(parsed.matchHistory) ? parsed.matchHistory.slice(0,30) : [] };
        save();
        closeModal();
        setView(currentView);
        toast('Сохранение импортировано.');
      } catch (e) {
        toast('Файл сохранения не распознан.', 'error');
      }
    };
    reader.readAsText(file);
  }

  function startGame() {
    expireCards(true);
    ensureDailyOffers();
    updateTopbar();
    setView('home');
    if (!state.starterClaimed) starterBox();
  }

  function showAccountSetup() {
    document.body.classList.add('account-required');
    $('#accountSetup').classList.remove('hidden');
    $('#nicknameInput').focus();
  }

  $('#accountForm').addEventListener('submit', e => {
    e.preventDefault();
    const field = $('#nicknameInput');
    const nickname = field.value.trim().replace(/\s+/g, ' ');
    const error = $('#accountError');
    if (nickname.length < 2 || nickname.length > 20) {
      error.textContent = 'Ник должен содержать от 2 до 20 символов.';
      field.focus();
      return;
    }
    state.nickname = nickname;
    state.accountCreatedAt = Date.now();
    save();
    $('#accountSetup').classList.add('hidden');
    document.body.classList.remove('account-required');
    startGame();
  });

  function boot() {
    updateTopbar();
    if (!state.nickname) {
      showAccountSetup();
      return;
    }
    startGame();
  }

  boot();
