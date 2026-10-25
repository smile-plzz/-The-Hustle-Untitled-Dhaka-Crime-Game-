import {
  GameState,
  EndingResult,
  CharacterLine,
} from '../types';
import { SCENES } from './storyData';

export const INITIAL_FLAGS = {
  fronted: false,
  trade: 'none' as const,
  haqueBribed: false,
  informedOnShuvo: false,
  arrestedOnce: false,
  attemptedQuit: false,
  haqueOwnsYou: false,
  babuStatus: 'none' as const,
  shuvoStatus: 'none' as const,
  reshmaDefected: false,
  kalamViolence: false,
  path: 'none' as const,
  childrenProtected: false,
  surrendered: false,
  fled: false,
};

export function createInitialState(savedArchiveIds: string[] = []): GameState {
  const initialArchive = new Set<string>(savedArchiveIds);
  // S1-1 has archive A-02
  initialArchive.add('A-02');

  return {
    stats: {
      money: 0,
      loyalty: 50,
      heat: 0,
      morality: 70,
    },
    crew: {
      noyon: 80,
      reshma: 40,
      kalam: 50,
    },
    flags: { ...INITIAL_FLAGS },
    currentSceneId: 'S1-1',
    unlockedArchiveIds: Array.from(initialArchive),
    history: [],
  };
}

export function resolveEnding(state: GameState): EndingResult {
  const { stats, flags, crew } = state;

  let ending: EndingResult['ending'] = 'Ghost';
  let variant: EndingResult['variant'] = undefined;
  let coreText = '';

  // Order of evaluation from Section 9:
  // 1. If surrendered is true: Redemption if Morality is 65 or more and Loyalty is 40 or more. Otherwise Caught (surrendered variant).
  // 2. If Heat is 70 or more: Caught.
  // 3. If Loyalty is 20 or less and Money is 50,000 or more: Killed in the Turf War.
  // 4. If fled is true: Ghost (fled variant).
  // 5. If Morality is 65 or more and Loyalty is 40 or more: Redemption.
  // 6. If Money is 80,000 or more: The Untouchable Kingpin.
  // 7. Otherwise: Ghost.

  if (flags.surrendered) {
    if (stats.morality >= 65 && stats.loyalty >= 40) {
      ending = 'Redemption';
    } else {
      ending = 'Caught';
      variant = 'surrendered';
    }
  } else if (stats.heat >= 70) {
    ending = 'Caught';
  } else if (stats.loyalty <= 20 && stats.money >= 50000) {
    ending = 'Killed in the Turf War';
  } else if (flags.fled) {
    ending = 'Ghost';
    variant = 'fled';
  } else if (stats.morality >= 65 && stats.loyalty >= 40) {
    ending = 'Redemption';
  } else if (stats.money >= 80000) {
    ending = 'The Untouchable Kingpin';
  } else {
    ending = 'Ghost';
  }

  // Set core text according to Section 9:
  switch (ending) {
    case 'Caught':
      if (variant === 'surrendered') {
        coreText =
          'Rafiq walks into the thana himself. The sentence is shorter than it would have been, and he serves it knowing why.';
      } else {
        coreText =
          'The knock was the police. Rafiq is charged under the 2018 Act, and the epilogue ends on a court date and a long corridor.';
      }
      break;

    case 'Killed in the Turf War': {
      const perpetrator =
        flags.shuvoStatus === 'war' ? "Shuvo's side did it." : 'Someone in his own crew did.';
      coreText = `Rafiq is shot in a lane in Jatrabari. The papers give it one line and the word dispute. ${perpetrator}`;
      break;
    }

    case 'The Untouchable Kingpin': {
      const routeText =
        flags.path === 'control'
          ? 'Every route answers to him.'
          : 'The money moves through shops and ledgers that look clean.';
      coreText = `Rafiq owns the lanes and the silence. Nobody says his name above a whisper, and he has never felt less like himself. ${routeText}`;
      break;
    }

    case 'Redemption': {
      let exitText = '';
      if (flags.surrendered) {
        exitText = 'He serves a short sentence and Amena visits.';
      } else if (flags.path === 'fronts') {
        exitText = 'He runs a small shop and pays back what he can to the lane.';
      } else {
        exitText = 'He leaves Dhaka with Amena and does not look back.';
      }
      coreText = `Rafiq leaves the trade. ${exitText}`;
      break;
    }

    case 'Ghost':
      if (variant === 'fled') {
        coreText =
          'Somewhere abroad he has a new name, and Amena gets a call every Eid.';
      } else {
        coreText =
          'Rafiq fades out of the lanes with no empire and no ending anyone writes about.';
      }
      break;
  }

  // Character lines
  const characterLines: CharacterLine[] = [];

  // Amena
  if (stats.loyalty >= 60) {
    characterLines.push({ character: 'Amena', line: 'Amena still sets a plate for him.' });
  } else if (stats.loyalty >= 21) {
    characterLines.push({ character: 'Amena', line: 'Amena writes to him once a year.' });
  } else {
    characterLines.push({ character: 'Amena', line: 'Amena does not say his name.' });
  }

  // Babu
  if (flags.babuStatus === 'loyal') {
    characterLines.push({
      character: 'Babu',
      line: 'Babu, older now, still sends word through the tea stall.',
    });
  } else if (flags.babuStatus === 'owes') {
    characterLines.push({
      character: 'Babu',
      line: 'Babu keeps his distance and a debt he never mentions.',
    });
  } else if (flags.babuStatus === 'gone') {
    characterLines.push({
      character: 'Babu',
      line: 'Nobody in Mirpur will say where Babu went after the 2018 sweep.',
    });
  } else {
    characterLines.push({
      character: 'Babu',
      line: 'Babu keeps his distance and a debt he never mentions.',
    });
  }

  // Shuvo
  if (flags.shuvoStatus === 'paid') {
    characterLines.push({
      character: 'Shuvo',
      line: "Shuvo's name still comes up at the tea stalls, and his cut is still paid.",
    });
  } else if (flags.shuvoStatus === 'war') {
    characterLines.push({
      character: 'Shuvo',
      line: "Shuvo's side of Jatrabari is quiet in a way nobody discusses.",
    });
  } else if (flags.shuvoStatus === 'peace') {
    characterLines.push({
      character: 'Shuvo',
      line: 'Shuvo and Rafiq share a highway and a silence.',
    });
  }

  // Haque
  if (flags.haqueOwnsYou) {
    characterLines.push({
      character: 'Inspector Haque',
      line: "Inspector Haque's price rose until it was more than Rafiq had.",
    });
  } else if (flags.haqueBribed) {
    characterLines.push({
      character: 'Inspector Haque',
      line: 'Haque took the money and never asked for a name.',
    });
  } else if (flags.informedOnShuvo) {
    characterLines.push({
      character: 'Inspector Haque',
      line: 'Haque kept the name Rafiq gave him in a drawer.',
    });
  } else {
    characterLines.push({
      character: 'Inspector Haque',
      line: 'Haque kept a file on him.',
    });
  }

  // Noyon
  if (crew.noyon === 90) {
    characterLines.push({ character: 'Noyon', line: 'Noyon is the only one who visits.' });
  } else {
    characterLines.push({ character: 'Noyon', line: 'Noyon stayed to the end.' });
  }

  // Reshma
  if (flags.reshmaDefected) {
    characterLines.push({
      character: 'Reshma',
      line: 'Reshma took her share and a lane in Chattogram and never looked back.',
    });
  } else if (crew.reshma >= 50) {
    characterLines.push({
      character: 'Reshma',
      line: "Reshma runs her own corner of Chattogram now, with Rafiq's silence.",
    });
  } else {
    characterLines.push({
      character: 'Reshma',
      line: 'Reshma stayed, but stopped talking.',
    });
  }

  // Kalam
  if (flags.kalamViolence) {
    characterLines.push({
      character: 'Kalam',
      line: "Kalam's name is in a police file in two districts.",
    });
  } else {
    characterLines.push({
      character: 'Kalam',
      line: 'Kalam went back to a quiet life.',
    });
  }

  // The boy
  if (flags.childrenProtected) {
    characterLines.push({
      character: 'The boy',
      line: 'A twelve-year-old sits at a school desk in Mirpur and does not know who paid.',
    });
  } else {
    characterLines.push({
      character: 'The boy',
      line: "The boy's name is in no file.",
    });
  }

  return {
    ending,
    variant,
    coreText,
    characterLines,
  };
}

export function enterScene(state: GameState, sceneId: string): GameState {
  const scene = SCENES[sceneId];
  if (!scene) {
    throw new Error(`Scene ${sceneId} not found`);
  }

  let nextState: GameState = {
    ...state,
    currentSceneId: sceneId,
    preSceneNotice: undefined,
  };

  // Unlock archives if present
  if (scene.archiveIds && scene.archiveIds.length > 0) {
    const set = new Set(nextState.unlockedArchiveIds);
    for (const archId of scene.archiveIds) {
      set.add(archId);
    }
    nextState.unlockedArchiveIds = Array.from(set);
  }

  // Run onEnter hook if exists
  if (scene.onEnter) {
    const res = scene.onEnter(nextState);
    nextState = res.state;
    if (res.preSceneText) {
      nextState.preSceneNotice = res.preSceneText;
    }
  }

  return nextState;
}

export function chooseOption(
  state: GameState,
  choiceKey: string
): GameState {
  const scene = SCENES[state.currentSceneId];
  if (!scene || !scene.choices) {
    throw new Error(`Scene ${state.currentSceneId} has no choices`);
  }

  const choice = scene.choices.find((c) => c.key === choiceKey);
  if (!choice) {
    throw new Error(`Choice ${choiceKey} not found in scene ${state.currentSceneId}`);
  }

  if (choice.isAvailable) {
    const avail = choice.isAvailable(state);
    if (!avail.available) {
      throw new Error(`Choice ${choiceKey} is not available: ${avail.reason}`);
    }
  }

  const { state: updatedState, resultText, nextSceneId } = choice.execute(state);

  const historyEntry = {
    sceneId: scene.id,
    choiceKey: choice.key,
    text: scene.getSetupText(state),
    resultText,
  };

  const nextHistory = [...state.history, historyEntry];

  // If nextSceneId is 'RESOLVE_ENDING', resolve the ending
  if (nextSceneId === 'RESOLVE_ENDING') {
    const endingResult = resolveEnding(updatedState);
    const set = new Set(updatedState.unlockedArchiveIds);
    set.add('A-15'); // A-15 unlocks at ending screen
    return {
      ...updatedState,
      endingResult,
      unlockedArchiveIds: Array.from(set),
      lastChoiceResult: resultText,
      history: nextHistory,
    };
  }

  // If there's a pending stage ledger, we stay on ledger before proceeding
  if (updatedState.stageLedger) {
    return {
      ...updatedState,
      lastChoiceResult: resultText,
      history: nextHistory,
    };
  }

  // Transition to next scene
  const enteredState = enterScene(
    {
      ...updatedState,
      lastChoiceResult: resultText,
      history: nextHistory,
    },
    nextSceneId
  );

  return enteredState;
}

export function continueFromAuto(state: GameState): GameState {
  const scene = SCENES[state.currentSceneId];
  if (!scene || !scene.autoContinue) {
    throw new Error(`Scene ${state.currentSceneId} does not have autoContinue`);
  }

  let nextState = state;
  if (scene.autoContinue.onContinue) {
    nextState = scene.autoContinue.onContinue(state);
  }

  const nextSceneId = scene.autoContinue.nextSceneId(nextState);

  // If there is a stageLedger created, return state to show ledger
  if (nextState.stageLedger) {
    return nextState;
  }

  return enterScene(nextState, nextSceneId);
}

export function dismissLedger(state: GameState): GameState {
  if (!state.stageLedger) {
    return state;
  }
  const { amount, nextSceneId } = state.stageLedger;
  const nextState: GameState = {
    ...state,
    stats: {
      ...state.stats,
      money: state.stats.money + amount,
    },
    stageLedger: undefined,
  };

  return enterScene(nextState, nextSceneId);
}
