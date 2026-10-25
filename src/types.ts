export interface Stats {
  money: number;
  loyalty: number;
  heat: number;
  morality: number;
}

export interface CrewLoyalty {
  noyon: number;
  reshma: number;
  kalam: number;
}

export interface Flags {
  fronted: boolean;
  trade: 'none' | 'weed' | 'yaba';
  haqueBribed: boolean;
  informedOnShuvo: boolean;
  arrestedOnce: boolean;
  attemptedQuit: boolean;
  haqueOwnsYou: boolean;
  babuStatus: 'none' | 'loyal' | 'owes' | 'gone';
  shuvoStatus: 'none' | 'paid' | 'war' | 'peace';
  reshmaDefected: boolean;
  kalamViolence: boolean;
  path: 'none' | 'control' | 'fronts' | 'drift';
  childrenProtected: boolean;
  surrendered: boolean;
  fled: boolean;
}

export interface ArchiveEntry {
  id: string;
  year: string;
  title: string;
  summary: string;
  unlockSceneId: string;
  sourceIds: string[];
  sensitive?: boolean;
}

export interface TickerLine {
  id: string;
  dateShown: string;
  line: string;
  sourceIds: string[];
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
}

export interface CharacterLine {
  character: string;
  line: string;
}

export interface EndingResult {
  ending: 'Caught' | 'Killed in the Turf War' | 'The Untouchable Kingpin' | 'Redemption' | 'Ghost';
  variant?: 'surrendered' | 'fled';
  coreText: string;
  characterLines: CharacterLine[];
}

export interface ChoiceDefinition {
  key: string; // 'A' | 'B' | 'C'
  label: string;
  resultText?: string | ((state: GameState) => string);
  isAvailable?: (state: GameState) => { available: boolean; reason?: string };
  cost?: (state: GameState) => number;
  execute: (state: GameState) => {
    state: GameState;
    resultText: string;
    nextSceneId: string;
  };
}

export interface SceneDefinition {
  id: string;
  stage: number;
  year: string;
  month?: string;
  locationName: string;
  locationArea: string;
  factTag: 'real' | 'fictional';
  tickerId?: string;
  archiveIds?: string[];
  onEnter?: (state: GameState) => { state: GameState; preSceneText?: string };
  getSetupText: (state: GameState) => string;
  reflectionText?: (state: GameState) => string;
  choices?: ChoiceDefinition[];
  // If scene has no choices, only a continue button
  autoContinue?: {
    buttonLabel?: string;
    nextSceneId: (state: GameState) => string;
    onContinue?: (state: GameState) => GameState;
  };
}

export interface GameState {
  stats: Stats;
  crew: CrewLoyalty;
  flags: Flags;
  currentSceneId: string;
  preSceneNotice?: string;
  lastChoiceResult?: string;
  stageLedger?: {
    stage: number;
    amount: number;
    text: string;
    nextSceneId: string;
  };
  eraBanner?: {
    stage: number;
    text: string;
    nextSceneId: string;
  };
  endingResult?: EndingResult;
  unlockedArchiveIds: string[];
  history: Array<{
    sceneId: string;
    choiceKey?: string;
    text: string;
    resultText?: string;
  }>;
}
