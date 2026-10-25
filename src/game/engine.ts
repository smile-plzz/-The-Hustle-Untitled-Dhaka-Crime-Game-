import {
  GameState,
  EndingResult,
  CharacterLine,
  RelationshipTrajectory,
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
    characterLines.push({ character: 'আমেনা (Amena)', line: 'আমেনা এখনো তার জন্য একটা প্লেট সাজায়। (Amena still sets a plate for him.)' });
  } else if (stats.loyalty >= 21) {
    characterLines.push({ character: 'আমেনা (Amena)', line: 'আমেনা বছরে একবার চিঠি লেখে। (Amena writes to him once a year.)' });
  } else {
    characterLines.push({ character: 'আমেনা (Amena)', line: 'আমেনা তার নাম মুখে আনে না। (Amena does not say his name.)' });
  }

  // Babu
  if (flags.babuStatus === 'loyal') {
    characterLines.push({
      character: 'বাবু (Babu)',
      line: 'বাবু এখন বয়স্ক, তবু চায়ের দোকান দিয়া খবর পাঠায়। (Babu, older now, still sends word through the tea stall.)',
    });
  } else if (flags.babuStatus === 'gone') {
    characterLines.push({
      character: 'বাবু (Babu)',
      line: '২০১৮-র অভিযানের পর বাবু কোথায় গেল, মিরপুরে কেউ বলে না। (Nobody in Mirpur will say where Babu went after the 2018 sweep.)',
    });
  } else {
    characterLines.push({
      character: 'বাবু (Babu)',
      line: 'বাবু নিজের দূরত্ব আর না বলা ঋণ ধইরা রাখছে। (Babu keeps his distance and an unmentioned debt.)',
    });
  }

  // Shuvo
  if (flags.shuvoStatus === 'peace') {
    characterLines.push({
      character: 'শুভ (Shuvo)',
      line: 'শুভো আর রফিক একই হাইওয়ে আর একই নীরবতা শেয়ার করে। (Shuvo and Rafiq share a highway and a silence.)',
    });
  } else if (flags.shuvoStatus === 'paid') {
    characterLines.push({
      character: 'শুভ (Shuvo)',
      line: 'চায়ের দোকানে শুভর নাম এখনো ওঠে, তার ভাগ এখনো দেওয়া হয়। (Shuvo\'s cut is still paid.)',
    });
  } else if (flags.shuvoStatus === 'war') {
    characterLines.push({
      character: 'শুভ (Shuvo)',
      line: 'যাত্রাবাড়ীর শুভর দিকটা এমন শান্ত যা নিয়ে কেউ কথা বলে না। (Shuvo\'s side of Jatrabari is quiet in a way nobody discusses.)',
    });
  }

  // Haque
  if (flags.haqueOwnsYou) {
    characterLines.push({
      character: 'দারোগা হক (Inspector Haque)',
      line: 'ইন্সপেক্টর হকের দাম বাড়তে বাড়তে রফিকের সামর্থ্যের বাইরে চইলা গেল। (Inspector Haque\'s price rose until it was more than Rafiq had.)',
    });
  } else if (flags.haqueBribed) {
    characterLines.push({
      character: 'দারোগা হক (Inspector Haque)',
      line: 'হক টাকাটা নিয়া নিছিল, কখনো নাম জিজ্ঞাসা করে নাই। (Haque took the money and never asked for a name.)',
    });
  } else if (flags.informedOnShuvo) {
    characterLines.push({
      character: 'দারোগা হক (Inspector Haque)',
      line: 'হক রফিকের দেওয়া নামটা ড্রয়ারে যত্ন করে রেখে দিছিল। (Haque kept the name Rafiq gave him in a drawer.)',
    });
  } else {
    characterLines.push({
      character: 'দারোগা হক (Inspector Haque)',
      line: 'হক তার ওপর একটা ফাইল রেখে দিছিল। (Haque kept a file on him.)',
    });
  }

  // Noyon
  if (crew.noyon === 90) {
    characterLines.push({ character: 'নয়ন (Noyon)', line: 'নয়নই একমাত্র যে দেখতে আসে। (Noyon is the only one who visits.)' });
  } else {
    characterLines.push({ character: 'নয়ন (Noyon)', line: 'নয়ন শেষ পর্যন্ত পাশে ছিল। (Noyon stayed to the end.)' });
  }

  // Reshma
  if (flags.reshmaDefected) {
    characterLines.push({
      character: 'রেশমা (Reshma)',
      line: 'রেশমা তার ভাগ আর চট্টগ্রামের একটা গলি নিয়া আর পেছনে ফিরে তাকায় নাই। (Reshma took her share and a lane in Chattogram and never looked back.)',
    });
  } else if (crew.reshma >= 50) {
    characterLines.push({
      character: 'রেশমা (Reshma)',
      line: 'রেশমা এখন চট্টগ্রামের নিজের কোণা সামলায়, রফিকের নীরব সম্মতিতে। (Reshma runs her own corner of Chattogram now.)',
    });
  } else {
    characterLines.push({
      character: 'রেশমা (Reshma)',
      line: 'রেশমা রয়ে গেল, কিন্তু কথা বলা বন্ধ কইরা দিল। (Reshma stayed, but stopped talking.)',
    });
  }

  // Kalam
  if (flags.kalamViolence) {
    characterLines.push({
      character: 'কালাম (Kalam)',
      line: 'কালামের নাম দুই জেলার পুলিশ ফাইলে আছে। (Kalam\'s name is in a police file in two districts.)',
    });
  } else {
    characterLines.push({
      character: 'কালাম (Kalam)',
      line: 'কালাম চুপচাপ সাধারণ জীবনে ফিরে গেল। (Kalam went back to a quiet life.)',
    });
  }

  // The boy
  if (flags.childrenProtected) {
    characterLines.push({
      character: 'বারো বছরের ছেলেটা (The Boy)',
      line: 'একটা বারো বছরের ছেলে মিরপুরের স্কুলের বেঞ্চে বইসা আছে... কে টাকা দিছিল সে জানে না। (A twelve-year-old sits at a school desk in Mirpur and does not know who paid.)',
    });
  } else {
    characterLines.push({
      character: 'বারো বছরের ছেলেটা (The Boy)',
      line: 'ছেলেটার নাম কোনো ফাইলে ওঠে নাই। (The boy\'s name is in no file.)',
    });
  }

  return {
    ending,
    variant,
    coreText,
    characterLines,
  };
}

export function getRelationshipTrajectories(state: GameState): RelationshipTrajectory[] {
  const { stats, flags, crew, currentSceneId } = state;
  const stageNum = parseInt(currentSceneId.charAt(1), 10) || 1;

  const trajectories: RelationshipTrajectory[] = [];

  // 1. Amena
  if (stageNum === 1) {
    trajectories.push({
      character: 'Amena',
      stage: 'Stage 1 (Age 14)',
      status: 'Pride & Relief',
      perception: 'Hopes Rafiq will focus on his books and that the family can slowly recover from the factory disaster.',
    });
  } else if (stageNum === 2) {
    trajectories.push({
      character: 'Amena',
      stage: 'Stage 2 (Age 16)',
      status: stats.loyalty >= 70 ? 'Suspicion & Gratitude' : 'Growing Distrust',
      perception: stats.loyalty >= 70
        ? 'Accepts the debt relief and quiet house, but listens anxiously when he walks in late after dark.'
        : 'Notices the quiet lies, the new shoes left by the door, and the questions from neighbours.',
    });
  } else if (stageNum === 3) {
    trajectories.push({
      character: 'Amena',
      stage: 'Stage 3 (Age 18)',
      status: flags.attemptedQuit ? 'Denial & Complicity' : 'Withdrawing Emotionally',
      perception: 'Stands before the humming white refrigerator with factory dust on her fingers. She has stopped asking where the cash comes from.',
    });
  } else if (stageNum === 4) {
    trajectories.push({
      character: 'Amena',
      stage: 'Stage 4 (Age 20-22)',
      status: stats.loyalty >= 60 ? 'Unspoken Grief' : 'Emotional Severance',
      perception: stats.loyalty >= 60
        ? 'Still sets a plate for him every evening, even when he does not return for weeks.'
        : 'The silence between them has hardened into a wall. She refuses to look at his hands.',
    });
  } else {
    trajectories.push({
      character: 'Amena',
      stage: 'Stage 5 (Age 24-26)',
      status: stats.loyalty >= 60 ? 'Grief & Vigil' : 'Severance',
      perception: stats.loyalty >= 60
        ? 'Writes to him once a year and keeps his childhood school notebooks in the metal trunk.'
        : 'Amena no longer says his name aloud in the lane.',
    });
  }

  // 2. Noyon
  if (stageNum <= 2) {
    trajectories.push({
      character: 'Noyon',
      stage: `Stage ${stageNum} (Age 14-16)`,
      status: 'Childhood Brother',
      perception: "Still calls him 'Rafi'. Remembers the broken football goalpost in Kalshi and copying his algebra homework.",
    });
  } else if (stageNum === 3) {
    trajectories.push({
      character: 'Noyon',
      stage: 'Stage 3 (Age 18)',
      status: 'Concerned Observer',
      perception: "Sees Rafiq meeting Shuvo's men near Kamalapur. Warns him that thana lockups don't spare friends.",
    });
  } else if (stageNum === 4) {
    trajectories.push({
      character: 'Noyon',
      stage: 'Stage 4 (Age 20-22)',
      status: crew.noyon >= 90 ? 'The Last Conscience' : 'Participant with Doubts',
      perception: crew.noyon >= 90
        ? "Stands in the Jatrabari doorway whispering 'Rafi...'—refusing to let Rafiq forget who he was."
        : 'Counts the highway delivery crates, but turns his face away when Kalam brings out the iron pipe.',
    });
  } else {
    trajectories.push({
      character: 'Noyon',
      stage: 'Stage 5 (Age 24-26)',
      status: flags.childrenProtected ? 'The Faithful Friend' : 'Broken Tether',
      perception: flags.childrenProtected
        ? 'The only one who visits. Remembers the quiet schoolboy before 2013.'
        : "Brought the 12-year-old runner to the warehouse, then walked away into the rain.",
    });
  }

  // 3. Reshma
  if (stageNum < 4) {
    trajectories.push({
      character: 'Reshma',
      stage: 'Not yet met',
      status: 'Future Associate',
      perception: 'Operating independent courier lines in Chattogram.',
    });
  } else if (flags.reshmaDefected) {
    trajectories.push({
      character: 'Reshma',
      stage: `Stage ${stageNum}`,
      status: 'Defected Rival',
      perception: 'Carved out her own independent corridor in Bakalia, Chattogram. Never looked back.',
    });
  } else if (crew.reshma >= 50) {
    trajectories.push({
      character: 'Reshma',
      stage: `Stage ${stageNum}`,
      status: 'Strategic Partner',
      perception: "Runs her own corner of Chattogram now. Respects performance and autonomy over sentimental loyalty.",
    });
  } else {
    trajectories.push({
      character: 'Reshma',
      stage: `Stage ${stageNum}`,
      status: 'Strained Subordinate',
      perception: 'Stayed for the volume, but stopped talking. Watching for the first crack in Rafiq’s armor.',
    });
  }

  // 4. Kalam
  if (stageNum < 4) {
    trajectories.push({
      character: 'Kalam',
      stage: 'Not yet met',
      status: 'Serving Time',
      perception: 'Incarcerated at Kashimpur Central Jail.',
    });
  } else if (flags.kalamViolence) {
    trajectories.push({
      character: 'Kalam',
      stage: `Stage ${stageNum}`,
      status: 'Entrenched Enforcer',
      perception: "A dangerous convenience. Name entered into police files across two districts.",
    });
  } else {
    trajectories.push({
      character: 'Kalam',
      stage: `Stage ${stageNum}`,
      status: 'Restrained Muscle',
      perception: 'Keeps the warehouse shutters closed without unnecessary blood.',
    });
  }

  // 5. Babu
  if (stageNum <= 2) {
    trajectories.push({
      character: 'Babu',
      stage: `Stage ${stageNum} (Age 14-16)`,
      status: 'Neighbourhood Fixer',
      perception: 'Taught Rafiq the first quiet rules of the Mirpur lanes: small packets, known faces.',
    });
  } else if (flags.babuStatus === 'loyal') {
    trajectories.push({
      character: 'Babu',
      stage: `Stage ${stageNum}`,
      status: 'Older Brother in Shadows',
      perception: 'Never forgot the 5,000 Tk bail Rafiq paid. Still sends quiet word through the tea stall.',
    });
  } else if (flags.babuStatus === 'owes') {
    trajectories.push({
      character: 'Babu',
      stage: `Stage ${stageNum}`,
      status: 'Distant Debtor',
      perception: 'Keeps his distance, remembering the price Inspector Haque demanded to set him free.',
    });
  } else if (flags.babuStatus === 'gone') {
    trajectories.push({
      character: 'Babu',
      stage: `Stage ${stageNum}`,
      status: 'Vanished into the Sweeps',
      perception: 'Nobody in Mirpur speaks his name after the 2018 anti-drug campaign sweeps.',
    });
  } else {
    trajectories.push({
      character: 'Babu',
      stage: `Stage ${stageNum}`,
      status: 'The Living Origin',
      perception: "Asks Rafiq: 'Do you remember when 200 taka was enough?'",
    });
  }

  // 6. Shirin (The Clean Touchstone)
  if (stageNum === 1) {
    trajectories.push({
      character: 'Shirin',
      stage: 'Stage 1 (Age 14)',
      status: 'School Friend',
      perception: 'Shared algebra notes across classroom desks. Believed Rafiq would become an engineer.',
    });
  } else if (stageNum === 2) {
    trajectories.push({
      character: 'Shirin',
      stage: 'Stage 2 (Age 16)',
      status: 'The Coaching Centre Alleys',
      perception: 'A quiet glance near the rickshaw stand. Notices Rafiq is no longer attending tuition batches.',
    });
  } else if (stageNum === 3) {
    trajectories.push({
      character: 'Shirin',
      stage: 'Stage 3 (Age 18)',
      status: 'The Unread SMS',
      perception: 'Sent a message asking if he took the university admission exam. Rafiq deleted the thread.',
    });
  } else {
    trajectories.push({
      character: 'Shirin',
      stage: `Stage ${stageNum} (Age 20-26)`,
      status: 'The Life Discarded',
      perception: 'Became a teacher in Sylhet. Represents the uncorrupted life Rafiq traded for 100-taka packets.',
    });
  }

  return trajectories;
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
