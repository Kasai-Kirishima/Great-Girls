# GREAT GIRLS (GG) — Offline Browser Build v0.2

A first playable prototype of the Great Girls collectible-card game. It runs in a browser and stores progress in that browser's `localStorage`.

## Run

1. Unzip the archive.
2. Open `index.html` in a modern browser.
3. On first launch, the game grants a starter box with three random cards.

No server, account, API key, build step, or external game service is required. The Google Fonts import is optional; if unavailable, the game falls back to system sans-serif fonts.

## Included in this build

- 16 character cards, including Übel.
- Ten rarity tiers, rating bands from 1 to 100, and the provided character HP values.
- Starter box with three different cards.
- Collection filters and card detail screens.
- Daily shop with three unowned cards, refreshed on the local browser date at midnight.
- Small, large, and mega packs with sequential reveal animation and a reward summary.
- Banknotes, rubies, gifts, and card/skill upgrade materials.
- Daily free reward bundle.
- 30-day relationship timer, gift preferences, date locations, and a small date-choice event.
- 3-v-3 turn-based PvE battles with HP, mana, shields, healing, status effects, and a simple enemy AI.
- Per-card battle frame selection.
- Ten interface color themes and five language selectors.
- Promo codes: `Giv4ikmani`, `Fulhausdai`, `Hangty67`.
- Save export/import and local reset.

## Important prototype rules

- Cards expire after 30 real days. Expired cards are removed from the collection.
- A card defeated in battle remains in the collection. Battle HP is temporary and resets for the next battle.
- PvP, online accounts, cloud saves, guilds, seasons, and real-money purchases are not connected.
- Rubies are only an in-game currency in this offline prototype; there is no payment system.
- Some game values (pack prices, drop chances, date preferences, battle AI and rewards) are prototype balance values and can be adjusted.
- UI navigation and common labels support Russian, Ukrainian, English, Kazakh, and Korean. Character descriptions and several game-specific phrases are currently authored in Russian.

## Card artwork

All 16 current characters have their supplied artwork URLs connected in `assets/js/data.js`. Cards use one shared vertical portrait frame (3:4) and crop with `object-fit: cover`; the same art appears in the collection, card details, daily shop offers, pack reveals, and battle portraits.

The images are linked from their original image hosts and are not embedded in the ZIP. An internet connection is therefore required to load the artwork. If a host blocks hotlinking, expires a link, or removes the image, the game automatically displays its designed placeholder.

To replace or add artwork, open `assets/js/data.js`, find the card object by its `id`, and set its `image` field to a direct image URL, for example:

```js
{
  id: 'makima',
  name: 'Макима',
  // ...other fields...
  image: 'https://example.com/makima-art.jpg'
}
```

Use direct image links that the browser can load. If no image URL is provided, the game displays a designed placeholder in the same card frame.

## Project structure

```text
Great-Girls-GG/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── data.js
        └── app.js
```

## Hosting later

This project is static and can be uploaded to a GitHub repository and served through GitHub Pages. Since this build is offline-only, each browser/device has its own separate save. A later online version will need a backend and server-side validation before purchases, promos, accounts, or PvP can be considered secure.

## Prototype balance notes

- Card upgrades are capped at +3. Each step adds +1 rating (up to 100) and +5% to HP and maximum mana.
- Stat upgrade points can be spent separately: +10 maximum HP or +5 maximum mana per point.
- Each skill has up to +3 upgrades; numeric skill effects increase by 5% per upgrade.
- Maximum mana starts at 100 and regenerates by 20 at the start of each new player round.
- A successful date (preferred location + preferred conversation choice) adds 3 days; a partially successful one adds 1 day; a failed one removes 1 day.
- A liked gift adds 3 days, a neutral gift adds 1 day, and a disliked gift does not extend the timer.
- Packs can be purchased with banknotes or rubies. There is no real-money payment integration.
