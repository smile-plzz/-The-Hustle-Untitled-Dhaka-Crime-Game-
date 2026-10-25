# Development Log

## [2026-10-25 13:51:00] Initial Project Initialization
- Task: Receive Game Design & Development Document for "The Hustle" (Untitled Dhaka Crime Game) and build the complete application.
- Initialized core documentation: README.md, dev-log.md, context.md, CHANGELOG.md per workflow requirements.
- Planned architecture:
  1. React + TypeScript + Vite project setup.
  2. Pure deterministic game engine module (`src/game/engine.ts`, `src/game/storyData.ts`, `src/game/archiveData.ts`).
  3. Vitest test suite executing the 7 reference playthroughs (R, K, C, X, G, F, S) from Section 9.
  4. Rich UI with Noir Dhaka visual theme, Era Banner, News Ticker, Fact Tags, History side-drawer, Timeline view, Sources list, Archive browser, and Help screen.
  5. Save/Load system and local storage persistence for archive unlocks.

## [2026-10-25 14:04:00] Verification & Build Completion
- Completed implementation of deterministic choice engine (`src/game/engine.ts`), complete narrative and choice data (`src/game/storyData.ts`), archive citations (`src/game/archiveData.ts`), and TypeScript typings (`src/types.ts`).
- Completed user interface and experience components:
  - Era Banner, News Ticker, Fact Tag badges, and History Button.
  - History drawer for contextual historical reading during scenes.
  - Full Persistent Archive Screen with 15 entries, search, filter, and locked states.
  - Dual-Track Timeline (2013–2025) tracking national history alongside Rafiq's life milestones.
  - Sources Screen with all 29 journalistic and academic citations.
  - Substance Abuse Support & Treatment Help Screen (Archive A-15, DNC resources).
  - Inter-stage financial Ledger modal.
  - Ending resolution and epilogue screen with character fates.
  - Save/Load modal with 4 persistent local storage slots.
  - Gritty Dhaka Noir theme with optional CRT scanlines overlay and ambient monsoon rain audio generator via Web Audio API.
- Test Verification:
  - Executed `npm test` running all 7 reference playthroughs (R, K, C, X, G, F, S) from Section 9.
  - Result: 7/7 passed with exact Money, Loyalty, Heat, Morality, and Ending values.
- Build Verification:
  - Executed `npm run build` (`tsc && vite build`).
  - Result: Success, generated production bundle in `dist/`.

## [2026-10-25 14:35:00] Shipping to GitHub & CI/CD Deployment
- Task: Connect local repository to `https://github.com/smile-plzz/-The-Hustle-Untitled-Dhaka-Crime-Game-` and ship the completed build.
- Exported initial GDD into permanent repository asset `GDD.md`.
- Updated `vite.config.ts` with relative base path (`base: './'`) for GitHub Pages compatibility.
- Added GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic testing, building, and deployment to GitHub Pages.
- Updated `README.md` with live site link, architecture diagrams, and badges.
- Ran test suite and production build: All 7 playthrough tests passed and build bundle generated cleanly.
- Staged, committed, and pushed changes to remote `origin/main`.

## [2026-10-25 14:55:00] Adoption of Canonical Narrative & Design Direction
- Integrated the user's merged canonical narrative and game design foundation into `CANONICAL_DESIGN.md` and updated `context.md`.
- Formulated the 5-Phase implementation roadmap prioritizing: Relationships -> Moral choices -> Consequences -> Light management systems.
- Documented core character arcs:
  - Amena: Love surviving alongside denial; refrigerator motif; emotional withdrawal as ultimate consequence.
  - Noyon: Moral memory system; strategic use of childhood nickname "Rafi".
  - Reshma: Alternative approach to crime (opportunity, independence, performance).
  - Kalam: Seductive convenience of violence ("Why make this complicated?").
  - Babu: Living connection to Stage 1 ("Remember when ৳200 was enough?").
  - Clean Relationship: Uncorrupted touchstone from outside the trade.
- Planned psychological evolution of the Ledger interface across ages 14, 18, 22, and 26.

## [2026-10-25 15:05:00] Implementation of Phase 1: Emotional Foundations & Psychological Ledger
- Enriched all scene scripts across Stages 1–5 in `src/game/storyData.ts` with canonical micro-moments:
  - S1-1 & S1-2: Lathe workshop accident context, Shirin passing with school backpacks, algebra notebook.
  - S2-1 & S2-2: Noyon calling out childhood nickname "Rafi" while kicking a bald football in Kalshi; Tanvir's desperation.
  - S2-5: Leather shoes by the threshold, boiling clay stove, and Stage 2 Psychological Ledger breakdown.
  - S3-1 & S3-3: Shuvo's sizing up of Rafiq's arithmetic skills; Amena finding pills under the geometry set.
  - S3-5: The Walton Refrigerator scene (Rafiq's rationalization of filial care vs. Amena's grief-stricken gaze).
  - S4-1: Noyon's quiet whisper "Rafi..." in the Jatrabari depot among hardened enforcers.
  - S4-2: Reshma's alternative philosophy (Opportunity vs. Risk, Partner vs. Laborer).
  - S4-4 & S4-5: COVID starvation in Mirpur and Kalam's seductive convenience ("Why make it complicated?").
  - S4-6: Stage 4 Psychological Ledger with redacted cash metrics (`৳██████`).
  - S5-1: August 2024 political upheaval, burned thanas, student traffic controllers, and Haque's burner call.
  - S5-2: The 12-year-old runner confrontation ("How old are you?" / "Twelve" / "Look at who you became, Rafi").
  - S5-3: Shah Amanat Bridge quiet rented room, unread SMS, and the final knock.
- Created `RelationshipsModal.tsx`: dynamic trajectory viewer for Amena, Noyon, Reshma, Kalam, Babu, and Shirin tracking internal perceptions across all stages.
- Re-architected `LedgerModal.tsx` into the evocative typewriter-style Psychological Ledger balance sheet with status badges and redacted metrics.
- Integrated Relationships viewer into both Header and Pause Menu with keyboard and click navigation.
- Verified all 7 automated reference playthrough tests pass with exact parity; production build generated cleanly.

## [2026-10-25 15:15:00] Creation of Agent Voice, Dialect & Tone System Prompt
- Authored `AGENTS_PROMPT_GUIDE.md` defining the dialect architecture and character vocal profiles:
  - Pronoun registers (তুই vs. তুমি vs. আপনি).
  - Authentic vocabulary (mal, puriya, dyl, baba, guti, chakki, khep, line, hundi, thana, gunfight, khata).
  - Character emotional tones: Amena (weary maternal devotion and devastating silence), Noyon (moral memory and childhood "Rafi"), Kalam (cold, seductive convenience of violence), Reshma (calculative, opportunity-focused ambition), Babu (cynical street fixer), Shirin (clean, uncorrupted touchstone), Inspector Haque (smooth, institutional extortion).
  - Directorial rules for writing aggressive, emotional, and romantic scenes.
- Updated `context.md` to reference `AGENTS_PROMPT_GUIDE.md`.
- Staged, committed, and pushed changes to remote `origin/main`.

## [2026-10-25 15:28:00] Bilingual Bengali Integration Across Entire Experience
- Incorporated authentic Bengali and bilingual elements across every layer of the game while preserving deterministic stat engine compatibility:
  - **News Wires (`archiveData.ts`)**: Translated all 12 ticker items (T-01 to T-12) into authentic Bangla news bulletins covering the Rana Plaza disaster, border drug raids, 2018 anti-drug drives, COVID lockdowns, and the August 2024 political shift.
  - **Stage Cards & Scene Locations (`storyData.ts`)**: Updated all 5 Era Banners, location titles, and area markers to bilingual Dhaka locations (e.g. `যাত্রাবাড়ী ওয়্যারহাউজ`, `রেললাইন চা স্টল`, `ঝিলপাড় বস্তি ও ফাঁড়ি`, `বাকলিয়া, চট্টগ্রাম`, `কারওয়ান বাজার ও সদরঘাট`).
  - **Choice Prompts (`storyData.ts`)**: All choice actions across Stages 1–5 now feature evocative Bengali action labels alongside clear parenthetical English translations (e.g. `ফেনসিডিলও টানতে রাজি হওয়া (Carry the syrup)`, `দারোগা হককে ২,০০০ টাকা ঘুষ দেওয়া (Offer 2,000 Tk bribe)`, `বাচ্চাটারে ঘরে পাঠাইয়া ওই বিক্রেতারে কাট করা (Send child home, pay family, cut seller)`).
  - **Psychological Ledger (Lal Khata) Metrics**: Converted inter-stage financial ledger items into traditional Bengali account book categories (`চিকিৎসা ঋণ`, `হাতে নগদ`, `ডিপো`, `লাইনম্যান`, `আমেনা: মুখ বন্ধ / ফ্রিজ চলছে`, `দারোগা হক`).
  - **HUD & Navigation Header (`Header.tsx`)**: Re-labeled stats and nav buttons to bilingual text (`টাকা (MONEY)`, `আনুগত্য (LOYALTY)`, `নজরদারি (HEAT)`, `নৈতিকতা (MORALITY)`, `দলবল (CREW)`, `ঘটনাক্রম`, `সম্পর্ক`, `আর্কাইভ`).
  - **Scene Metadata & History (`ScenePlayer.tsx`)**: Fact tags updated to `বাস্তব ঘটনা (Real Events)` / `কাল্পনিক (Fictional)`; history drawer button updated to `ইতিহাস কী বলে? (What's the history?)`.
  - **Ending Resolution Screen (`EndingScreen.tsx`)**: The 5 core endings and variants now display bilingual badges:
    - `Redemption` -> `মুক্তি ও প্রায়শ্চিত্ত (REDEMPTION)`
    - `The Untouchable Kingpin` -> `অস্পৃশ্য মহাজন (THE UNTOUCHABLE KINGPIN)`
    - `Caught` -> `গ্রেফতার ও কারাদণ্ড (CAUGHT)`
    - `Killed in the Turf War` -> `যাত্রাবাড়ীর গলিতে লাশ (KILLED IN TURF WAR)`
    - `Ghost` -> `অদৃশ্য কুয়াশা (GHOST)`
    - Variants: `আত্মসমর্পণ (SURRENDERED)`, `পলাতক (FLED)`, `বিশ্বাসঘাতকতা (BETRAYED)`.
  - **Pause Menu & Save/Load (`PauseMenu.tsx`, `SaveLoadModal.tsx`)**: Full bilingual support for menu actions, save slots, audio toggles, and CRT scanlines.
- Build & Test Verification:
  - Vitest test suite (`npm test`): 7/7 reference playthroughs passed with 100% exact parity.
  - Production build (`npm run build`): Generated clean bundle in `dist/`.
