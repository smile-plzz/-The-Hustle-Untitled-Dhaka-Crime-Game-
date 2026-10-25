# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-10-25
### Changed
- Rebalanced game presentation to sleek Dhaka Noir aesthetic: sleek English narrative prose and UI with authentic Dhakaiya spoken dialogues and local slang in Bengali.
- Reverted UI components back to clean English:
  - Header: `MONEY`, `LOYALTY`, `HEAT`, `MORALITY`, `CREW`, and nav buttons (`Timeline`, `Relationships`, `Archive`, `Sources`, `Menu`).
  - Pause Menu: `PAUSED`, `Resume Game`, `Save / Load Game`, `Historical Archive`, `Dual Timeline`, `Relationships & Moral Memory`, audio & CRT toggles.
  - Save/Load Modal: `Save Progress`, `Load Game`, slot information.
  - Scene Player: `Real Events`, `Fictional`, `What's the history?`.
  - Ending Screen: `FINAL RESOLUTION`, `THE OUTCOME`, `WHAT BECAME OF THEM`, `FINAL RECORD`, ending badges, and action buttons.
  - Psychological Ledger: English accounting metrics (`Medical Debt`, `Cash in Hand`, `Police`, `Mother`, `Suppliers`, `Crew`, etc.).
- Reverted third-person narrative setups (`getSetupText`), outcome notices, and choice action descriptions to evocative noir English.
- Preserved in authentic Dhakaiya Bengali script: All spoken character dialogue lines (`“...”`) and cultural slang (*dyl*, *yaba*, *guti*, *bhai*, *chacha*, *Daroga*, *thana*, *khep*, *mal*, etc.).

## [0.4.0] - 2026-10-25
### Added
- Authentic local Dhakaiya Bengali dialogue lines wired across all scenes in Stages 1 through 5 (`storyData.ts`).
- Emotional micro-contexts for Amena, Noyon, Babu, Tanvir, Shuvo, Inspector Haque, Reshma, Kalam, and the 12-year-old child runner.
- Whispered character fate lines in the ending epilogue with authentic Bengali phrasing and English subtitles (`engine.ts`).

## [0.3.0] - 2026-10-25
### Added
- Authentic Bengali news wire tickers (T-01 to T-12) covering national historical milestones in Dhaka and regional border corridors.
- Bilingual stage cards and Dhaka location titles across Stages 1 through 5.
- Bengali choice prompts with parenthetical English context across all story branches.
- Traditional Bengali Lal Khata accounting metrics in the Psychological Ledger interface.
- Bilingual HUD and stats bar (`টাকা`, `আনুগত্য`, `নজরদারি`, `নৈতিকতা`, `দলবল`).
- Bilingual Ending badges (`মুক্তি ও প্রায়শ্চিত্ত`, `অস্পৃশ্য মহাজন`, `গ্রেফতার ও কারাদণ্ড`, `যাত্রাবাড়ীর গলিতে লাশ`, `অদৃশ্য কুয়াশা`).
- Bilingual pause menu and local save/load slot management.

## [0.2.0] - 2026-10-25
### Added
- Agent Voice, Dialect & Tone System Prompt (`AGENTS_PROMPT_GUIDE.md`).
- Canonical Narrative & Game Design Foundation (`CANONICAL_DESIGN.md`).
- Multi-dimensional Relationship Trajectory specification for Amena, Noyon, Reshma, Kalam, Babu, and the clean touchstone relationship.
- Evolving Psychological Ledger specification (Ages 14, 18, 22, 26).
- 5-Phase Narrative & Systems Enhancement Roadmap.

## [0.1.1] - 2026-10-25
### Added
- GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`) for automatic testing, building, and deployment to GitHub Pages.
- `GDD.md` containing the full authoritative Game Design & Development Document.
- Relative asset base URL in `vite.config.ts` for cross-platform hosting support.
- Updated repository documentation with live game URL and build status badges.

## [0.1.0] - 2026-10-25
### Added
- Project initialization with comprehensive documentation (README.md, dev-log.md, context.md, CHANGELOG.md).
- GDD specification integration.
- Game engine design and data modeling for Stages 1 through 5.
- Archive, Timeline, Sources, News Ticker, and Help system specifications.
- Complete deterministic choice engine passing all 7 reference playthrough tests.
- React frontend with custom Dhaka Noir UI, Web Audio procedural rain soundscape, and CRT scanline filter.
