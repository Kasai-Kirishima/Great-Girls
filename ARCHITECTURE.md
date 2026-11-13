# Great Girls — architecture (v0.4)

The project remains a static browser application with separate feature modules.

- `assets/js/data.js` — character database, gifts, locations, themes and frames.
- `assets/js/modules/core.js` — shared helpers, routing primitives and independent filter state.
- `assets/js/modules/state.js` — versioned local persistence and daily refresh rules.
- `assets/js/modules/views.js` — page rendering: dashboard, player collection, global card catalog, shop, packs, battle, relationships, promo codes and settings.
- `assets/js/modules/cards.js` — card details, catalog details, rewards, store purchases, gifts, dates and promo redemption.
- `assets/js/modules/battle.js` — battle setup and combat rules.
- `assets/js/modules/actions.js` — UI action dispatcher and upgrades.
- `assets/js/modules/bootstrap.js` — delegated UI events and application startup.
- `assets/css/style.css` — shared visual system and page-specific styles.

## Change boundaries

- Add or edit character information only in `data.js`.
- Change the global game catalog or player collection layout in `views.js`; their filter state is separate.
- Change daily rewards and store purchase logic in `cards.js`.
- Change the daily reset timestamp and save migration only in `state.js`.
- Change battle logic only in `battle.js`.
- Add UI action routes in `actions.js`; delegated click handling remains in `bootstrap.js`.

Save schema is version 3 and migrates existing v1/v2 browser saves. This build is offline/local only.
