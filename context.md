# Context & Specifications

## Goals
Implement "The Hustle" (Untitled Dhaka Crime Game) according to the authoritative Game Design and Development Document (GDD) and the canonical narrative and game design foundation in [CANONICAL_DESIGN.md](./CANONICAL_DESIGN.md).

## Core Philosophy
> **Rafiq does not become a criminal because he suddenly becomes evil. He becomes one because, year after year, the most rational option in front of him becomes slightly worse.**

**Priority Hierarchy:**
Relationships → Moral choices → Consequences → Light management systems

## Tech Stack
- Frontend: React 18 / 19, TypeScript, Vite.
- Styling: Modern CSS / custom design system with gritty Dhaka Noir aesthetic.
- State Engine: Pure TypeScript state machine with deterministic transitions, clamping, conditional branching, and ledger calculations.
- Testing: Vitest for running automated reference playthrough assertions.
- Storage: LocalStorage for persistent archive unlocks across playthroughs and manual/autosave game slots.
- CI/CD: GitHub Actions deploying to GitHub Pages on every push to `main`.

## Constraints & System Rules
1. **Starting Stats**: Money 0, Loyalty 50, Heat 0, Morality 70.
2. **Stat Bounds**: Money >= 0 whole taka (no max). Loyalty, Heat, Morality clamped between 0 and 100 after each choice.
3. **Choice Conditions**: Evaluated *before* applying the choice's own effects. Percentage changes round down and calculate against current money.
4. **Greyed-out Choices**: Any choice costing more money than currently held must be disabled. Every scene has at least one free choice.
5. **Ledger**: Applied automatically between stages, evolving from raw financial accounting into Rafiq's psychological balance sheet.
6. **Haque Multiplier**: If `haqueOwnsYou` is true, bribe costs to Inspector Haque are multiplied by 1.5 (floored).
7. **Endings Evaluation Order**:
   1. If `surrendered`: Redemption if Morality >= 65 and Loyalty >= 40, else Caught (surrendered variant).
   2. If Heat >= 70: Caught.
   3. If Loyalty <= 20 and Money >= 50,000: Killed in the Turf War.
   4. If `fled`: Ghost (fled variant).
   5. If Morality >= 65 and Loyalty >= 40: Redemption.
   6. If Money >= 80,000: The Untouchable Kingpin.
   7. Otherwise: Ghost.
8. **Sensitive Handling**: No operational drug recipes or glorification; sensitive depiction of child carriers in S5-2 with warning and no graphic imagery; Help screen referencing official Department of Narcotics Control (DNC) treatment resources.

## Phased Enhancement Plan
- **Phase 1**: Emotional foundation (Amena's presence & withdrawal, Noyon's "Rafi" nickname and moral memory, Reshma's alternative philosophy, Kalam's convenience, Babu's mirror, Clean touchstone).
- **Phase 2**: Narrative agency (Fine-tuned moral dilemmas across Stages 2–5, COVID-era loyalty choices, the 12-year-old runner confrontation).
- **Phase 3**: Consequence systems (Relationship trajectories, community micro-interactions, hidden debt variables).
- **Phase 4**: Light management (Psychological Ledger balance sheet, route risks tied to personal relationships, shop fronts).
- **Phase 5**: Endgame (The Final Door sequence, accumulated 12-year resolution, nuanced character fates).
