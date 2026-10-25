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

## [2026-10-25 15:45:00] Wiring Full Dhakaiya Dialogue & Scene Contexts
- Task: Wire the user's authentic local Dhakaiya Bengali dialogue translations, emotional micro-contexts, and whispered character fates into the game narrative and engine:
  - **Stage 1 (School Days - 2013 | Mirpur)**:
    - S1-1: Amena's exhausted plea at the doorway (`“রফিক, কিছু একটা ভাবতে পারবি?”`) with factory ID and machine oil context. Rafiq's filial response (`“আমি টাকা জোগাড় কইরা নিমু মা।”`) vs. withdrawal (`“এডা আমার ঠিক করার মতো বিষয় না মা।”`).
    - S1-2: Babu's quiet street offer (`“এই ছোট প্যাকেজটা তিন গলি পার হইয়া দোকানে দিয়া আয়। দুইশ টাকা। কোনো প্রশ্ন নাই।”`) and Rafiq asking for normal work (`“না ভাই... আমাকে নরমাল কাজ দেন।”`) met with Babu's street reality (`“নরমাল কাজের টাকা মাসে পায়। একটু ভাব।”`).
    - S1-2B: Babu at the threshold (`“পাঁচশ টাকা। নে।”`).
    - S1-3: Rafiq's lie looking his mother in the eye (`“এডা টিউশন কইরা কামাইছি মা।”`).
  - **Stage 2 (First Hustle - 2015–2017 | Kalshi & Jhilpar)**:
    - S2-1: Noyon's shout from the soccer wall (`“রফি! কোচ ডাকতেছে! তাড়াতাড়ি আয়!”`) vs. Babu's rules (`“ছোট ছোট অ্যামাউন্ট, চেনা মুখ... স্কুল গেটের কাছে কখনো না।”`).
    - S2-2: Tanvir's desperate plea on credit (`“রফিক ভাই, মায়ের কসম, মাসের শেষে টাকা দিমু। একটু বাকিতে দেন না প্লিজ।”`) vs. Rafiq's hard stance (`“বাকি নাই। ক্যাশ অনলি।”`).
    - S2-3: Rafiq talking his way out before the grocer (`“চাচা, আমার জন্য না... আমার কাজিনের জন্য নিছিলাম।”`).
    - S2-4: Older clients asking for syrup (`“বাবু, ডাইল আছে?”`) and Babu's rationalization (`“মানুষ চায় তো রফিক। আমরা না আনলে অন্য কেউ আনবে।”`).
    - S2-5: Amena noticing Bata shoes by the threshold (`“এই টাকা কোথা থিকা আসতেছে রফিক?”`) and Rafiq's responses (`“একটা দোকানে পার্ট-টাইম কাজ করি মা।”`, `“বাবুকে কিছু ডেলিভারিতে হেল্প করি মা।”`, `“রাস্তায় বেচি মা...”`).
  - **Stage 3 (The Climb - 2017–2018 | Jatrabari & Mirpur)**:
    - S3-1: Shuvo sizing up Rafiq across sweet cha (`“হিসাব বোঝে আর মুখ বন্ধ রাখে — এমন ছেলেই আমার পছন্দ। এই অফার দুইবার আসে না।”`).
    - S3-2: Inspector Haque counting currency without looking down (`“ভালো। হাঁট। পেছনে তাকাবি না।”`).
    - S3-3: The geometry box confrontation and Rafiq's responses (`“সব খুইলা কইছি মা। ওয়াদা করছি থামু। মাফ কইরা দেন।”`, `“কে ব্যাগে রাখছে জানি না! আপনে সবসময় সন্দেহ করেন কেন?!”`, `“বাড়ি চালাইতে এই টাকা লাগে মা। কারখানার বেতন দিয়া চলে না... আপনেও জানেন।”`) and Amena's heavy sigh (`“শুধু সাবধানে থাকিস...”`).
    - S3-4: Babu's message from the thana lockup (`“রফিককে কইস... দুইশ টাকা যখন যথেষ্ট ছিল, সেই কথা মনে রাখুক।”`) and Haque's leverage (`“এখন বুঝলাম বন্ধুর জন্য কতদূর যাবি, রফিক।”`).
    - S3-5: Rafiq counting alone by the lamp looking at the new Walton refrigerator (`“আমি তো মায়ের দেখাশোনা করছি...”`).
  - **Stage 4 (Empire - 2019–2022 | Warehouse & Highway)**:
    - S4-1: Noyon murmuring Rafiq's childhood nickname in the enforcer-filled warehouse (`“রফি...”`).
    - S4-2: Reshma closing the transit ledger (`“সবকিছু ঢাকার ভিতর দিয়া কেন যাবে যখন বাকালিয়া নিজেই দাঁড়াইতে পারে? তুমি রিস্ক হিসাব করো রফিক... আমি অপরচুনিটি হিসাব করি।”`).
    - S4-3: Shuvo raspy midnight burner call (`“বড় গডফাদাররা টেকনাফে সারেন্ডার কইরাছে... তাই ছোট খেলোয়াড়দের দ্বিগুণ দিতে হয়। হাইওয়েতে কিছুই বদলায় নাই রফিক, শুধু শ্বাস নেওয়ার দাম বাড়ছে।”`) and Haque taking bribes as favours (`“এটাকে দুই ভদ্রলোকের মধ্যে একটা ফেভার হিসাবে নাও।”`).
    - S4-4: Noyon confronting COVID lockdown profits (`“রিকশাওয়ালাদের ঘরে বাচ্চাগুলার খাওয়ার কিছু নাই রফি। এত টাকা দিয়া কী হবে যদি চোখের সামনে গলিটার মানুষ না খাইয়া মরে?”`).
    - S4-5: Ideological clash between Noyon (`“ওর বাবার লগে কথা বলা উচিত রফি। তুই আগে এভাবে সমস্যা সমাধান করতিস না।”`) and Kalam's cold convenience (`“কাম সোজা থাকতে প্যাচান ক্যান ভাই? এক দুপুর মাইক্রোবাসের পিছে কাটাইয়া আসলেই পুরা হাইওয়ে সোজা হইয়া যাইব।”`).
  - **Stage 5 (Reckoning - 2023–2025 | Dhaka & Chattogram)**:
    - S5-1: Haque's call amidst post-uprising burned police stations (`“ইউনিফর্ম এখন খোলা রফিক। কিন্তু ফাইল কখনো পোড়ে না।”`).
    - S5-2: The confrontation with the twelve-year-old child runner (`“তোর বয়স কত?”` / `“বারো।”` / Noyon: `“ওর দিকে তাকা রফি। তুই কী হইয়া গেছিস দেখ।”`).
    - S5-3: Chattogram rented room near Shah Amanat Bridge and the heavy night knock on the wooden door (`রাতের বেলা শাহ আমানত ব্রিজের কাছে ভাড়া করা ঘরের দরজায় ভারী নক পড়ে।`).
  - **Whispered Epilogue Fates (`engine.ts`)**:
    - Amena: `আমেনা এখনো তার জন্য একটা প্লেট সাজায়।` / `আমেনা বছরে একবার চিঠি লেখে।` / `আমেনা তার নাম মুখে আনে না।`
    - Babu: `বাবু এখন বয়স্ক, তবু চায়ের দোকান দিয়া খবর পাঠায়।` / `২০১৮-র অভিযানের পর বাবু কোথায় গেল, মিরপুরে কেউ বলে না।`
    - Shuvo: `শুভো আর রফিক একই হাইওয়ে আর একই নীরবতা শেয়ার করে।`
    - Haque: `ইন্সপেক্টর হকের দাম বাড়তে বাড়তে রফিকের সামর্থ্যের বাইরে চইলা গেল।`
    - Noyon: `নয়নই একমাত্র যে দেখতে আসে।`
    - Reshma: `রেশমা তার ভাগ আর চট্টগ্রামের একটা গলি নিয়া আর পেছনে ফিরে তাকায় নাই।`
    - Kalam: `কালামের নাম দুই জেলার পুলিশ ফাইলে আছে।`
    - The Boy: `একটা বারো বছরের ছেলে মিরপুরের স্কুলের বেঞ্চে বইসা আছে... কে টাকা দিছিল সে জানে না।`
- Build & Test Verification:
  - `npm test`: 7/7 reference playthrough tests passed with 100% exact parity.
  - `npm run build`: Zero errors, production bundle compiled cleanly in `dist/`.
