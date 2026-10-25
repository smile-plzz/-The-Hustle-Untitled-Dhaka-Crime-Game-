# Context & Specifications

## Goals
Implement "The Hustle" (Untitled Dhaka Crime Game) according to the authoritative Game Design and Development Document (GDD).

## Tech Stack
- Frontend: React 18 / 19, TypeScript, Vite.
- Styling: Modern CSS / Tailwind CSS with a gritty noir aesthetic (inspired by Papers Please, Disco Elysium, and Dhaka street atmosphere).
- State Engine: Pure TypeScript state machine with deterministic transitions, clamping, conditional branching, and ledger calculations.
- Testing: Vitest for running automated reference playthrough assertions.
- Storage: LocalStorage for persistent archive unlocks across playthroughs and manual/autosave game slots.

## Constraints & Rules (from Section 9 & 10 of GDD)
1. **Starting Stats**: Money 0, Loyalty 50, Heat 0, Morality 70.
2. **Stat Bounds**: Money >= 0 whole taka (no max). Loyalty, Heat, Morality clamped between 0 and 100 after each choice.
3. **Choice Conditions**: Evaluated *before* applying the choice's own effects. Percentage changes round down and calculate against current money.
4. **Greyed-out Choices**: Any choice costing more money than currently held must be disabled. Every scene has at least one free choice.
5. **Ledger**: Applied automatically between stages, with clear financial ledger display.
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
