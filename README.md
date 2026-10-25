# The Hustle (Untitled Dhaka Crime Game)

A slow-burn coming-of-age crime drama and narrative simulation set in real Bangladesh between 2013 and 2025.

The player is Rafiq, a schoolboy from Mirpur in Dhaka, who is pulled into the drug trade by a family medical debt. Over twelve in-game years he navigates the trade as it evolves from weed to yaba, and from local lanes to the Chattogram and Teknaf supply chains, against real documented historical events (Rana Plaza, the 2018 anti-drug drive, the 2018 Narcotics Control Act, the 2020 Teknaf surrender, COVID-19 lockdown, and the 2024 political upheaval).

## Key Features
- **Deterministic Choice Engine**: Full 5-stage story with deterministic stat calculations and branching logic.
- **Real-World Historical Anchor**: News tickers, Era banners, Fact tags ('Based on real events' vs 'Fictional'), and in-game Archive entries linked to published reporting.
- **Interactive Archive & Timeline**: Chronological archive of historical events and dual-track timeline view (2013–2025).
- **Stat Systems**: Tracks Money (taka), Loyalty (0–100), Heat (0–100), Morality (0–100), and individual crew loyalties (Noyon, Reshma, Kalam).
- **Multiple Endings**: Caught, Killed in the Turf War, The Untouchable Kingpin, Redemption, and Ghost (including surrendered and fled variants), with detailed character epilogues.
- **Sensitivity & Treatment Resources**: Dedicated Help screen with Department of Narcotics Control (DNC) treatment facility references and responsible handling of social realism.
- **Persistent Save/Load**: Browser local storage keeps unlocked archive entries and game saves.

## Setup & Running

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Run Automated Tests
```bash
npm test
```
The test suite validates all 7 authoritative reference playthroughs (R, K, C, X, G, F, S) against the exact stat and ending conditions.

### Production Build
```bash
npm run build
```
