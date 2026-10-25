import { describe, it, expect } from 'vitest';
import {
  createInitialState,
  chooseOption,
  continueFromAuto,
  dismissLedger,
} from './engine';
import { SCENES } from './storyData';
import { GameState } from '../types';

function runPlaythrough(choices: Record<string, string>): GameState {
  let state = createInitialState();

  while (!state.endingResult) {
    if (state.stageLedger) {
      state = dismissLedger(state);
      continue;
    }

    const scene = SCENES[state.currentSceneId];
    if (!scene) {
      throw new Error(`Scene not found: ${state.currentSceneId}`);
    }

    if (scene.autoContinue) {
      state = continueFromAuto(state);
      continue;
    }

    const choiceKey = choices[scene.id];
    if (!choiceKey) {
      throw new Error(`No choice specified for scene ${scene.id}`);
    }

    state = chooseOption(state, choiceKey);
  }

  return state;
}

describe('Reference Playthroughs from Section 9', () => {
  it('Test R: Redemption', () => {
    const choices = {
      'S1-1': 'A',
      'S1-2': 'B',
      'S1-2B': 'A',
      'S1-3': 'A',
      'S2-1': 'A',
      'S2-2': 'A',
      'S2-3': 'A',
      'S2-4': 'B',
      'S2-5': 'C',
      'S3-1': 'B',
      'S3-2': 'A',
      'S3-3': 'A',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'C',
      'S4-4': 'C',
      'S4-5': 'B',
      'S4-6': 'B',
      'S5-1': 'B',
      'S5-2': 'A',
      'S5-3': 'A',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(18850);
    expect(finalState.stats.loyalty).toBe(95);
    expect(finalState.stats.heat).toBe(0);
    expect(finalState.stats.morality).toBe(100);
    expect(finalState.endingResult?.ending).toBe('Redemption');
  });

  it('Test K: The Untouchable Kingpin', () => {
    const choices = {
      'S1-1': 'A',
      'S1-2': 'A',
      'S1-3': 'B',
      'S2-1': 'A',
      'S2-2': 'B',
      'S2-3': 'B',
      'S2-4': 'B',
      'S2-5': 'B',
      'S3-1': 'A',
      'S3-2': 'A',
      'S3-3': 'A',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'A',
      'S4-4': 'A',
      'S4-5': 'B',
      'S4-6': 'A',
      'S5-1': 'A',
      'S5-2': 'B',
      'S5-3': 'C',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(134800);
    expect(finalState.stats.loyalty).toBe(55);
    expect(finalState.stats.heat).toBe(62);
    expect(finalState.stats.morality).toBe(10);
    expect(finalState.endingResult?.ending).toBe('The Untouchable Kingpin');
  });

  it('Test C: Caught', () => {
    const choices = {
      'S1-1': 'B',
      'S1-2': 'A',
      'S1-3': 'C',
      'S2-1': 'B',
      'S2-2': 'B',
      'S2-3': 'A',
      'S2-4': 'A',
      'S2-5': 'A',
      'S3-1': 'A',
      'S3-2': 'B',
      // S3-2X is autoContinue
      'S3-3': 'B',
      'S3-4': 'C',
      'S4-2': 'B',
      'S4-3': 'B',
      'S4-4': 'A',
      'S4-5': 'A',
      'S4-6': 'A',
      'S5-1': 'A',
      'S5-2': 'B',
      'S5-3': 'C',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(127170);
    expect(finalState.stats.loyalty).toBe(0);
    expect(finalState.stats.heat).toBe(100);
    expect(finalState.stats.morality).toBe(0);
    expect(finalState.endingResult?.ending).toBe('Caught');
  });

  it('Test X: Killed in the Turf War', () => {
    const choices = {
      'S1-1': 'B',
      'S1-2': 'A',
      'S1-3': 'C',
      'S2-1': 'A',
      'S2-2': 'B',
      'S2-3': 'B',
      'S2-4': 'B',
      'S2-5': 'A',
      'S3-1': 'A',
      'S3-2': 'A',
      'S3-3': 'B',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'A',
      'S4-4': 'A',
      'S4-5': 'A',
      'S4-6': 'A',
      'S5-1': 'B',
      'S5-2': 'C',
      'S5-3': 'C',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(111880);
    expect(finalState.stats.loyalty).toBe(0);
    expect(finalState.stats.heat).toBe(57);
    expect(finalState.stats.morality).toBe(0);
    expect(finalState.endingResult?.ending).toBe('Killed in the Turf War');
  });

  it('Test G: Ghost', () => {
    const choices = {
      'S1-1': 'A',
      'S1-2': 'A',
      'S1-3': 'B',
      'S2-1': 'A',
      'S2-2': 'B',
      'S2-3': 'B',
      'S2-4': 'A',
      'S2-5': 'B',
      'S3-1': 'B',
      'S3-2': 'A',
      'S3-3': 'C',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'A',
      'S4-4': 'B',
      'S4-5': 'B',
      'S4-6': 'C',
      'S5-1': 'B',
      'S5-2': 'C',
      'S5-3': 'C',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(44120);
    expect(finalState.stats.loyalty).toBe(55);
    expect(finalState.stats.heat).toBe(10);
    expect(finalState.stats.morality).toBe(50);
    expect(finalState.endingResult?.ending).toBe('Ghost');
  });

  it('Test F: Ghost (fled variant)', () => {
    const choices = {
      'S1-1': 'A',
      'S1-2': 'A',
      'S1-3': 'B',
      'S2-1': 'A',
      'S2-2': 'B',
      'S2-3': 'B',
      'S2-4': 'B',
      'S2-5': 'B',
      'S3-1': 'A',
      'S3-2': 'A',
      'S3-3': 'A',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'A',
      'S4-4': 'A',
      'S4-5': 'B',
      'S4-6': 'A',
      'S5-1': 'A',
      'S5-2': 'B',
      'S5-3': 'B',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(104800);
    expect(finalState.stats.loyalty).toBe(45);
    expect(finalState.stats.heat).toBe(32);
    expect(finalState.stats.morality).toBe(15);
    expect(finalState.endingResult?.ending).toBe('Ghost');
    expect(finalState.endingResult?.variant).toBe('fled');
  });

  it('Test S: Caught (surrendered variant)', () => {
    const choices = {
      'S1-1': 'A',
      'S1-2': 'A',
      'S1-3': 'B',
      'S2-1': 'A',
      'S2-2': 'B',
      'S2-3': 'B',
      'S2-4': 'B',
      'S2-5': 'B',
      'S3-1': 'A',
      'S3-2': 'A',
      'S3-3': 'A',
      'S3-4': 'B',
      'S4-2': 'A',
      'S4-3': 'A',
      'S4-4': 'A',
      'S4-5': 'B',
      'S4-6': 'A',
      'S5-1': 'A',
      'S5-2': 'B',
      'S5-3': 'A',
    };

    const finalState = runPlaythrough(choices);

    expect(finalState.stats.money).toBe(124800);
    expect(finalState.stats.loyalty).toBe(60);
    expect(finalState.stats.heat).toBe(52);
    expect(finalState.stats.morality).toBe(35);
    expect(finalState.endingResult?.ending).toBe('Caught');
    expect(finalState.endingResult?.variant).toBe('surrendered');
  });
});
