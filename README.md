# Great Girls (GG) — v0.4

Browser-based offline collectible card game prototype.

## Run
Open `index.html` in a modern browser, or publish the folder to GitHub Pages. No build step or package installation is required.

## v0.4 changes
- Added a separate **All Game Cards** catalog showing every card in the database, regardless of player ownership.
- Kept **My Collection** as the player's own cards only.
- Daily login reward is now exactly one random item per day, refreshing at local midnight.
- Shop now sells daily cards, gifts, and three categories of upgrade materials.
- Replaced Konan's art URL with the latest URL supplied by the project owner.
- Reworked the home screen into a compact dashboard and refreshed page styling.
- State schema v3 migrates existing local saves.

The app is still offline: nickname and progress are stored in the browser's local storage. Supabase, accounts across devices and PvP are not connected.
