import { SceneDefinition } from '../types';

export const ERA_BANNERS: Record<number, { text: string }> = {
  1: { text: 'Mirpur, Dhaka. 2013. Rafiq is 14.' },
  2: { text: 'Mirpur, Kalshi and Jhilpar areas. 2015. Rafiq is 16.' },
  3: { text: 'Mirpur and Jatrabari. 2017. Rafiq is 18.' },
  4: { text: 'Jatrabari, Chattogram and Teknaf. 2019. Rafiq is 20.' },
  5: { text: 'Dhaka and Chattogram. 2023. Rafiq is 24.' },
};

export const SCENES: Record<string, SceneDefinition> = {
  // STAGE 1: School Days
  'S1-1': {
    id: 'S1-1',
    stage: 1,
    year: '2013',
    month: 'May',
    locationName: 'Mirpur',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-01',
    archiveIds: ['A-02'],
    getSetupText: () =>
      'Two weeks after the Savar factory collapse, every garment-worker household in the lane is on edge. Rafiq\'s father was hurt in a workshop accident and cannot work. The hospital wants 15,000 taka. Amena stands in the doorway with her factory ID still around her neck and asks Rafiq if he can think of anything.',
    choices: [
      {
        key: 'A',
        label: 'I will find the money, Ma.',
        resultText: 'Amena nods and says nothing. She does not believe it yet.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
            },
          },
          resultText: 'Amena nods and says nothing. She does not believe it yet.',
          nextSceneId: 'S1-2',
        }),
      },
      {
        key: 'B',
        label: 'That is not something I can fix.',
        resultText: 'The door closes softly. It is worse than a slam.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
          },
          resultText: 'The door closes softly. It is worse than a slam.',
          nextSceneId: 'S1-2',
        }),
      },
    ],
  },

  'S1-2': {
    id: 'S1-2',
    stage: 1,
    year: '2013',
    month: 'June',
    locationName: 'Gudaraghat Bazar area',
    locationArea: 'Mirpur-1',
    factTag: 'fictional',
    getSetupText: () =>
      'Babu, two years older and always near the tea stalls, notices Rafiq\'s face. He offers 200 taka to carry a small package to a shop three lanes away. No questions asked.',
    choices: [
      {
        key: 'A',
        label: 'Accept the delivery',
        resultText: 'The package is light. The 200 taka is not.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 200,
              heat: Math.min(100, Math.max(0, state.stats.heat + 2)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
          },
          resultText: 'The package is light. The 200 taka is not.',
          nextSceneId: 'S1-3',
        }),
      },
      {
        key: 'B',
        label: 'Refuse and ask for a normal job',
        resultText: "Babu laughs, not unkindly. 'Normal jobs pay in a month. Think about it.'",
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: "Babu laughs, not unkindly. 'Normal jobs pay in a month. Think about it.'",
          nextSceneId: 'S1-2B',
        }),
      },
    ],
  },

  'S1-2B': {
    id: 'S1-2B',
    stage: 1,
    year: '2013',
    month: 'June',
    locationName: 'Home',
    locationArea: 'Mirpur-1',
    factTag: 'fictional',
    getSetupText: () =>
      'The hospital sends a final notice. Babu is at the door with a bigger offer: 500 taka. There is one choice.',
    choices: [
      {
        key: 'A',
        label: 'Take it',
        resultText: 'Rafiq takes it. Babu does not say I told you so.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 500,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              heat: Math.min(100, Math.max(0, state.stats.heat + 4)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
            },
          },
          resultText: 'Rafiq takes it. Babu does not say I told you so.',
          nextSceneId: 'S1-3',
        }),
      },
    ],
  },

  'S1-3': {
    id: 'S1-3',
    stage: 1,
    year: '2013',
    month: 'July',
    locationName: 'Mirpur',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Rafiq holds more cash than he has ever held. It is more than Amena earns in a week at the factory.',
    choices: [
      {
        key: 'A',
        label: 'Give it all to Amena',
        resultText: 'She asks no question, and that is how he knows she suspects something.',
        execute: (state) => {
          const X = state.stats.money;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: Math.max(0, state.stats.money - X),
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 15)),
                morality: Math.min(100, Math.max(0, state.stats.morality + 10)),
              },
            },
            resultText: 'She asks no question, and that is how he knows she suspects something.',
            nextSceneId: 'S2-1',
          };
        },
      },
      {
        key: 'B',
        label: 'Give half and keep half',
        resultText: 'Half is honest enough, he tells himself.',
        execute: (state) => {
          const X = state.stats.money;
          const half = Math.floor(X / 2);
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: Math.max(0, state.stats.money - half),
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              },
            },
            resultText: 'Half is honest enough, he tells himself.',
            nextSceneId: 'S2-1',
          };
        },
      },
      {
        key: 'C',
        label: 'Keep it all and say it came from tutoring',
        resultText: 'The lie comes easily, which is the problem.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 15)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
            },
          },
          resultText: 'The lie comes easily, which is the problem.',
          nextSceneId: 'S2-1',
        }),
      },
    ],
  },

  // STAGE 2: First Hustle
  'S2-1': {
    id: 'S2-1',
    stage: 2,
    year: '2015',
    month: 'March',
    locationName: 'Mirpur Kalshi area',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    archiveIds: ['A-04'],
    getSetupText: () =>
      'Babu teaches Rafiq the rules of the lane: small amounts, familiar faces, never near the school gate. Weed sells in lots of 100 to 200 taka. Rafiq\'s first customers are older boys from the next lane.',
    choices: [
      {
        key: 'A',
        label: 'Known buyers only',
        resultText: 'Slow money and quiet lanes.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 300,
              heat: Math.min(100, Math.max(0, state.stats.heat + 2)),
            },
          },
          resultText: 'Slow money and quiet lanes.',
          nextSceneId: 'S2-2',
        }),
      },
      {
        key: 'B',
        label: 'Sell to strangers for faster cash',
        resultText: 'The money is faster. So are the looks.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 600,
              heat: Math.min(100, Math.max(0, state.stats.heat + 8)),
            },
          },
          resultText: 'The money is faster. So are the looks.',
          nextSceneId: 'S2-2',
        }),
      },
    ],
  },

  'S2-2': {
    id: 'S2-2',
    stage: 2,
    year: '2015',
    month: 'September',
    locationName: 'Mirpur',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Tanvir from class 10 is in trouble at home. He asks Rafiq to let him take a small amount on credit and swears he will pay by the end of the month.',
    choices: [
      {
        key: 'A',
        label: 'Let him have it on credit',
        resultText: 'Rafiq keeps the amount in his head, not in a book.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 100),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
            },
            flags: {
              ...state.flags,
              fronted: true,
            },
          },
          resultText: 'Rafiq keeps the amount in his head, not in a book.',
          nextSceneId: 'S2-3',
        }),
      },
      {
        key: 'B',
        label: 'Refuse, cash only',
        resultText: 'Tanvir walks away. Rafiq makes a sale elsewhere that day.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 100,
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
          },
          resultText: 'Tanvir walks away. Rafiq makes a sale elsewhere that day.',
          nextSceneId: 'S2-3',
        }),
      },
    ],
  },

  'S2-3': {
    id: 'S2-3',
    stage: 2,
    year: '2016',
    month: 'February',
    locationName: 'Market lane',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    onEnter: (state) => {
      if (state.flags.fronted) {
        if (state.stats.loyalty >= 55) {
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: state.stats.money + 150,
              },
            },
            preSceneText: 'Tanvir pays, with thanks.',
          };
        } else {
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              },
            },
            preSceneText: 'Tanvir stops coming to school.',
          };
        }
      }
      return { state };
    },
    getSetupText: () =>
      'A shopkeeper who knows Amena sees a hand-off near his stall and starts walking over.',
    choices: [
      {
        key: 'A',
        label: 'Run',
        resultText: 'Rafiq leaves the buyer standing there and does not look back.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
            },
          },
          resultText: 'Rafiq leaves the buyer standing there and does not look back.',
          nextSceneId: 'S2-4',
        }),
      },
      {
        key: 'B',
        label: 'Talk his way out: it was for my cousin',
        resultText: 'The shopkeeper half believes him, which is enough.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              heat: Math.min(100, Math.max(0, state.stats.heat - 2)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
          },
          resultText: 'The shopkeeper half believes him, which is enough.',
          nextSceneId: 'S2-4',
        }),
      },
    ],
  },

  'S2-4': {
    id: 'S2-4',
    stage: 2,
    year: '2016',
    month: 'October',
    locationName: 'Rail-line tea stall',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-02',
    archiveIds: ['A-01'],
    getSetupText: () =>
      'Two older men ask Babu for dyl, the codeine cough syrup that was everywhere when they were young. Babu can get it. He looks at Rafiq to see whether Rafiq will carry it too.',
    choices: [
      {
        key: 'A',
        label: 'Carry it',
        resultText: 'Rafiq tells himself it is only cough syrup.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 400,
              heat: Math.min(100, Math.max(0, state.stats.heat + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
          },
          resultText: 'Rafiq tells himself it is only cough syrup.',
          nextSceneId: 'S2-5',
        }),
      },
      {
        key: 'B',
        label: 'Refuse',
        resultText: 'Babu shrugs, but he remembers.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'Babu shrugs, but he remembers.',
          nextSceneId: 'S2-5',
        }),
      },
    ],
  },

  'S2-5': {
    id: 'S2-5',
    stage: 2,
    year: '2017',
    month: 'April',
    locationName: 'Home',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Amena notices the new shoes and the new calm in Rafiq\'s face and asks where the money is coming from.',
    choices: [
      {
        key: 'A',
        label: 'Lie: a part-time job at a shop',
        resultText: 'She lets it go, and he sees that it costs her something.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
            },
            stageLedger: {
              stage: 2,
              amount: 4000,
              text: 'The hospital debt is paid. Nobody says where the last of it came from.',
              nextSceneId: 'S3-1',
            },
          },
          resultText: 'She lets it go, and he sees that it costs her something.',
          nextSceneId: 'S3-1',
        }),
      },
      {
        key: 'B',
        label: 'Half-truth: I help Babu with deliveries',
        resultText: 'She hears what she needs to hear.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
            },
            stageLedger: {
              stage: 2,
              amount: 4000,
              text: 'The hospital debt is paid. Nobody says where the last of it came from.',
              nextSceneId: 'S3-1',
            },
          },
          resultText: 'She hears what she needs to hear.',
          nextSceneId: 'S3-1',
        }),
      },
      {
        key: 'C',
        label: 'Tell the truth',
        execute: (state) => {
          const moralEnough = state.stats.morality >= 50;
          const resultText = moralEnough
            ? 'She is silent for a long time, then takes his hand.'
            : 'She stands up and leaves the room without a word.';
          const loyaltyDelta = moralEnough ? 20 : -20;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty + loyaltyDelta)),
                morality: Math.min(100, Math.max(0, state.stats.morality + 10)),
              },
              stageLedger: {
                stage: 2,
                amount: 4000,
                text: 'The hospital debt is paid. Nobody says where the last of it came from.',
                nextSceneId: 'S3-1',
              },
            },
            resultText,
            nextSceneId: 'S3-1',
          };
        },
      },
    ],
  },

  // STAGE 3: The Climb
  'S3-1': {
    id: 'S3-1',
    stage: 3,
    year: '2017',
    month: 'September',
    locationName: 'Dhalpur side',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-03',
    archiveIds: ['A-03', 'A-05'],
    getSetupText: () =>
      'The news is full of refugees on the south-east border and of yaba. Babu takes Rafiq across the city, past Kamalapur station, to meet Shuvo, who runs the pill trade on this side of Jatrabari and likes good boys from Mirpur. Shuvo offers Rafiq a place as a sub-distributor.',
    choices: [
      {
        key: 'A',
        label: 'Accept and start with yaba',
        resultText: 'Shuvo smiles. Rafiq does not take anything himself and tells himself that matters.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 1000,
              heat: Math.min(100, Math.max(0, state.stats.heat + 15)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 15)),
            },
            flags: {
              ...state.flags,
              trade: 'yaba',
            },
          },
          resultText: 'Shuvo smiles. Rafiq does not take anything himself and tells himself that matters.',
          nextSceneId: 'S3-2',
        }),
      },
      {
        key: 'B',
        label: 'Decline and stay with weed',
        resultText: 'Shuvo says the offer will not come twice.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              morality: Math.min(100, Math.max(0, state.stats.morality + 10)),
            },
            flags: {
              ...state.flags,
              trade: 'weed',
            },
          },
          resultText: 'Shuvo says the offer will not come twice.',
          nextSceneId: 'S3-2',
        }),
      },
    ],
  },

  'S3-2': {
    id: 'S3-2',
    stage: 3,
    year: '2018',
    month: 'May',
    locationName: 'Jhilpar area',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-04',
    archiveIds: ['A-06'],
    getSetupText: () =>
      'The government has launched a nationwide anti-drug drive. Police and RAB sweep the lanes near Jhilpar. At a corner, Inspector Haque of Jhilpar Outpost stops Rafiq and looks at him for a long time.',
    choices: [
      {
        key: 'A',
        label: 'Offer a 2,000 taka bribe',
        resultText: "Haque counts it without looking down. 'Good. Walk.'",
        isAvailable: (state) => ({
          available: state.stats.money >= 2000,
          reason: 'Requires at least 2,000 taka',
        }),
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 2000),
              heat: Math.min(100, Math.max(0, state.stats.heat - 10)),
            },
            flags: {
              ...state.flags,
              haqueBribed: true,
            },
          },
          resultText: "Haque counts it without looking down. 'Good. Walk.'",
          nextSceneId: 'S3-3',
        }),
      },
      {
        key: 'B',
        label: 'Refuse and run',
        resultText: 'Rafiq runs.',
        execute: (state) => {
          const highHeat = state.stats.heat >= 30;
          if (highHeat) {
            return {
              state: {
                ...state,
                stats: {
                  ...state.stats,
                  heat: Math.min(100, Math.max(0, state.stats.heat + 20)),
                },
              },
              resultText: 'Rafiq runs, but officers cut off the alley.',
              nextSceneId: 'S3-2X',
            };
          }
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
                heat: Math.min(100, Math.max(0, state.stats.heat + 20)),
              },
            },
            resultText: 'Rafiq runs.',
            nextSceneId: 'S3-3',
          };
        },
      },
      {
        key: 'C',
        label: 'Give Haque a name instead',
        resultText: "Haque writes it down. The name is Shuvo's.",
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
              heat: Math.min(100, Math.max(0, state.stats.heat - 5)),
            },
            flags: {
              ...state.flags,
              informedOnShuvo: true,
            },
          },
          resultText: "Haque writes it down. The name is Shuvo's.",
          nextSceneId: 'S3-3',
        }),
      },
    ],
  },

  'S3-2X': {
    id: 'S3-2X',
    stage: 3,
    year: '2018',
    month: 'May',
    locationName: 'Jhilpar Outpost (Lockup)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Rafiq spends three nights at the thana. Amena pays a bail she cannot afford.',
    autoContinue: {
      buttonLabel: 'Continue',
      nextSceneId: () => 'S3-3',
      onContinue: (state) => {
        const bailLoss = Math.min(state.stats.money, 5000);
        return {
          ...state,
          stats: {
            ...state.stats,
            money: Math.max(0, state.stats.money - bailLoss),
            loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
            heat: Math.min(100, Math.max(0, state.stats.heat - 30)),
          },
          flags: {
            ...state.flags,
            arrestedOnce: true,
          },
        };
      },
    },
  },

  'S3-3': {
    id: 'S3-3',
    stage: 3,
    year: '2018',
    month: 'June',
    locationName: 'Home',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: (state) => {
      const packet =
        state.flags.trade === 'yaba'
          ? 'a small plastic packet of pink tablets'
          : 'a folded paper of dry leaves';
      return `Amena finds packaging in Rafiq's bag: ${packet}. She holds it up and says nothing.`;
    },
    choices: [
      {
        key: 'A',
        label: 'Confess everything and promise to stop',
        resultText: 'She cries and he promises. It is the truest thing he says that year.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 10)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 15)),
            },
            flags: {
              ...state.flags,
              attemptedQuit: true,
            },
          },
          resultText: 'She cries and he promises. It is the truest thing he says that year.',
          nextSceneId: 'S3-4',
        }),
      },
      {
        key: 'B',
        label: 'Deny it and shout',
        resultText: 'She stops asking. That is worse.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 25)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
            },
          },
          resultText: 'She stops asking. That is worse.',
          nextSceneId: 'S3-4',
        }),
      },
      {
        key: 'C',
        label: 'Confess, but say the family needs the money',
        resultText: 'She is quiet for a long time. Then she asks him to be careful.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'She is quiet for a long time. Then she asks him to be careful.',
          nextSceneId: 'S3-4',
        }),
      },
    ],
  },

  'S3-4': {
    id: 'S3-4',
    stage: 3,
    year: '2018',
    month: 'October',
    locationName: 'Mirpur',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    archiveIds: ['A-07'],
    getSetupText: () =>
      'Babu is picked up in a sweep of the Mirpur lanes. He sends word from the thana: bail is 5,000 taka, or someone has to speak to Haque.',
    choices: [
      {
        key: 'A',
        label: 'Pay his 5,000 taka bail',
        resultText: 'Babu does not forget it.',
        isAvailable: (state) => ({
          available: state.stats.money >= 5000,
          reason: 'Requires 5,000 taka',
        }),
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 5000),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 20)),
            },
            flags: {
              ...state.flags,
              babuStatus: 'loyal',
            },
          },
          resultText: 'Babu does not forget it.',
          nextSceneId: 'S3-5',
        }),
      },
      {
        key: 'B',
        label: 'Ask Haque to make it go away',
        resultText: 'Haque makes a call. Now he knows what Rafiq will do for a friend.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              heat: Math.min(100, Math.max(0, state.stats.heat - 5)),
            },
            flags: {
              ...state.flags,
              haqueOwnsYou: true,
              babuStatus: 'owes',
            },
          },
          resultText: 'Haque makes a call. Now he knows what Rafiq will do for a friend.',
          nextSceneId: 'S3-5',
        }),
      },
      {
        key: 'C',
        label: 'Do nothing',
        resultText: 'Nobody in Mirpur says Babu\'s name around Rafiq again.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 30)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 15)),
            },
            flags: {
              ...state.flags,
              babuStatus: 'gone',
            },
          },
          resultText: 'Nobody in Mirpur says Babu\'s name around Rafiq again.',
          nextSceneId: 'S3-5',
        }),
      },
    ],
  },

  'S3-5': {
    id: 'S3-5',
    stage: 3,
    year: '2018',
    month: 'December',
    locationName: "Rafiq's room",
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-05',
    archiveIds: ['A-08'],
    getSetupText: () =>
      'Parliament has passed a new narcotics law. Yaba is now Class A and 200 grams or more can mean death or life in prison. It takes effect on 27 December. Rafiq counts his money alone in his room.',
    reflectionText: (state) =>
      state.stats.morality >= 50
        ? 'He thinks of Amena at the door and his hands are not steady.'
        : 'He counts twice. He sleeps well. That frightens him more than the law.',
    autoContinue: {
      buttonLabel: 'Continue',
      nextSceneId: () => 'S4-1',
      onContinue: (state) => {
        let baseAmount = state.flags.trade === 'yaba' ? 20000 : 6000;
        if (state.flags.attemptedQuit) {
          baseAmount = Math.floor(baseAmount * 0.75);
        }
        return {
          ...state,
          stageLedger: {
            stage: 3,
            amount: baseAmount,
            text:
              state.flags.trade === 'yaba'
                ? state.flags.attemptedQuit
                  ? 'Yaba earnings curtailed by promises made to Amena.'
                  : 'Yaba distribution in Jatrabari and Mirpur yields real profit.'
                : state.flags.attemptedQuit
                ? 'Weed sales curtailed by Rafiq holding back.'
                : 'Steady weed trade across quiet Mirpur lanes.',
            nextSceneId: 'S4-1',
          },
        };
      },
    },
  },

  // STAGE 4: Empire
  'S4-1': {
    id: 'S4-1',
    stage: 4,
    year: '2019',
    month: 'February',
    locationName: 'Warehouse near Dhaka-Chattogram highway',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-06',
    archiveIds: ['A-09'],
    getSetupText: (state) => {
      const babuLine =
        state.flags.babuStatus === 'loyal' || state.flags.babuStatus === 'owes'
          ? 'Babu stands by the door.'
          : 'the doorway is empty and nobody mentions it.';
      return `Rafiq rents a corner of a warehouse. Noyon arrives first. Then Reshma, sharp and quick with numbers, who knows who to ask. Then Kalam, older, silent, recently out of jail. If anyone looks, ${babuLine}`;
    },
    autoContinue: {
      buttonLabel: 'Continue',
      nextSceneId: () => 'S4-2',
      onContinue: (state) => ({
        ...state,
        crew: {
          noyon: 80,
          reshma: 40,
          kalam: 50,
        },
      }),
    },
  },

  'S4-2': {
    id: 'S4-2',
    stage: 4,
    year: '2019',
    month: 'June',
    locationName: 'Bakalia area',
    locationArea: 'Chattogram',
    factTag: 'fictional',
    getSetupText: () =>
      'Reshma wants to open a new neighbourhood in Chattogram without Rafiq watching every step. She says the profit will be big. She does not say what happens if it goes wrong.',
    choices: [
      {
        key: 'A',
        label: 'Approve it',
        execute: (state) => {
          const highLoyalty = state.stats.loyalty >= 50;
          if (highLoyalty) {
            return {
              state: {
                ...state,
                stats: {
                  ...state.stats,
                  money: state.stats.money + 15000,
                  heat: Math.min(100, Math.max(0, state.stats.heat + 5)),
                },
                crew: {
                  ...state.crew,
                  reshma: Math.min(100, Math.max(0, state.crew.reshma + 10)),
                },
              },
              resultText:
                'It works. Reshma hands over the share on time and looks a little surprised that Rafiq expected it.',
              nextSceneId: 'S4-3',
            };
          } else {
            return {
              state: {
                ...state,
                stats: {
                  ...state.stats,
                  loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
                  heat: Math.min(100, Math.max(0, state.stats.heat + 5)),
                },
                crew: {
                  ...state.crew,
                  reshma: Math.min(100, Math.max(0, state.crew.reshma - 30)),
                },
              },
              resultText: 'Reshma keeps the money and does not pretend otherwise.',
              nextSceneId: 'S4-3',
            };
          }
        },
      },
      {
        key: 'B',
        label: 'Deny it and keep operations central',
        resultText: 'Reshma nods and starts counting how long she will wait.',
        execute: (state) => ({
          state: {
            ...state,
            crew: {
              ...state.crew,
              reshma: Math.min(100, Math.max(0, state.crew.reshma - 10)),
            },
          },
          resultText: 'Reshma nods and starts counting how long she will wait.',
          nextSceneId: 'S4-3',
        }),
      },
    ],
  },

  'S4-3': {
    id: 'S4-3',
    stage: 4,
    year: '2020',
    month: 'February',
    locationName: 'Jatrabari warehouse',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-07',
    archiveIds: ['A-10'],
    getSetupText: () =>
      'On television, more than a hundred yaba godfathers file onto a stage in Teknaf to surrender before the Home Minister. Shuvo calls Rafiq the same night. Nothing has changed, he says, except the price of staying in business.',
    choices: [
      {
        key: 'A',
        label: 'Pay the bigger cut',
        resultText: 'Shuvo says the number is fair. Rafiq knows what fair means.',
        execute: (state) => {
          const cutPct = state.flags.informedOnShuvo ? 0.4 : 0.2;
          const cutAmount = Math.floor(state.stats.money * cutPct);
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: Math.max(0, state.stats.money - cutAmount),
              },
              flags: {
                ...state.flags,
                shuvoStatus: 'paid',
              },
            },
            resultText: 'Shuvo says the number is fair. Rafiq knows what fair means.',
            nextSceneId: 'S4-4',
          };
        },
      },
      {
        key: 'B',
        label: 'Refuse and prepare for conflict',
        resultText: 'The lanes go quiet in the way that comes before something.',
        execute: (state) => {
          // Rule: Apply Heat first, then defection check, then Money
          const newHeat = Math.min(100, Math.max(0, state.stats.heat + 25));
          const reshmaDefects = state.crew.reshma < 50;
          let newLoyalty = state.stats.loyalty;
          let newMoney = state.stats.money;

          if (reshmaDefects) {
            newLoyalty = Math.min(100, Math.max(0, newLoyalty - 10));
            const loss = Math.floor(newMoney * 0.1);
            newMoney = Math.max(0, newMoney - loss);
          }

          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                heat: newHeat,
                loyalty: newLoyalty,
                money: newMoney,
              },
              flags: {
                ...state.flags,
                shuvoStatus: 'war',
                reshmaDefected: reshmaDefects ? true : state.flags.reshmaDefected,
              },
            },
            resultText: 'The lanes go quiet in the way that comes before something.',
            nextSceneId: 'S4-4',
          };
        },
      },
      {
        key: 'C',
        label: 'Broker peace with a payment to Haque, so both sides are protected',
        resultText: 'Haque takes it and calls it a favour.',
        isAvailable: (state) => {
          const price = state.flags.haqueOwnsYou ? 15000 : 10000;
          if (state.flags.informedOnShuvo) {
            return { available: false, reason: 'Unavailable: You informed on Shuvo' };
          }
          if (state.stats.money < price) {
            return { available: false, reason: `Requires ${price.toLocaleString()} taka` };
          }
          return { available: true };
        },
        execute: (state) => {
          const price = state.flags.haqueOwnsYou ? 15000 : 10000;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: Math.max(0, state.stats.money - price),
                heat: Math.min(100, Math.max(0, state.stats.heat - 10)),
                morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
              },
              flags: {
                ...state.flags,
                shuvoStatus: 'peace',
              },
            },
            resultText: 'Haque takes it and calls it a favour.',
            nextSceneId: 'S4-4',
          };
        },
      },
    ],
  },

  'S4-4': {
    id: 'S4-4',
    stage: 4,
    year: '2020',
    month: 'March',
    locationName: 'Geneva Camp area',
    locationArea: 'Mohammadpur and Mirpur lanes',
    factTag: 'real',
    tickerId: 'T-08',
    archiveIds: ['A-11'],
    getSetupText: () =>
      'COVID-19 closes the country. Police are pulled to other duties. In the lanes the sellers are back out and a pill goes for 250 to 300 taka. Noyon says half the lane has nothing to eat.',
    choices: [
      {
        key: 'A',
        label: 'Expand while the police are busy',
        resultText: 'The lanes are loud again.',
        execute: (state) => {
          const gain = state.flags.trade === 'yaba' ? 8000 : 3000;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: state.stats.money + gain,
                heat: Math.min(100, Math.max(0, state.stats.heat + 10)),
                morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
              },
            },
            resultText: 'The lanes are loud again.',
            nextSceneId: 'S4-5',
          };
        },
      },
      {
        key: 'B',
        label: 'Stay quiet and protect the crew',
        resultText: 'A quiet month is not a bad month.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 10)),
              heat: Math.min(100, Math.max(0, state.stats.heat - 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'A quiet month is not a bad month.',
          nextSceneId: 'S4-5',
        }),
      },
      {
        key: 'C',
        label: "Share earnings with families in the lane, Noyon's idea",
        resultText: 'Noyon carries the bags himself and will not take thanks.',
        isAvailable: (state) => ({
          available: state.stats.money >= 3000,
          reason: 'Requires 3,000 taka',
        }),
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 3000),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 15)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 10)),
            },
            crew: {
              ...state.crew,
              noyon: Math.min(100, Math.max(0, state.crew.noyon + 10)),
            },
          },
          resultText: 'Noyon carries the bags himself and will not take thanks.',
          nextSceneId: 'S4-5',
        }),
      },
    ],
  },

  'S4-5': {
    id: 'S4-5',
    stage: 4,
    year: '2020',
    month: 'August',
    locationName: 'Jatrabari warehouse',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-09',
    archiveIds: ['A-12'],
    getSetupText: () =>
      'A week after the news from the Shamlapur checkpoint, one of the dealers in Rafiq\'s chain is caught skimming. Kalam offers to deal with it his own way. The papers are full of the word gunfight.',
    choices: [
      {
        key: 'A',
        label: 'Let Kalam handle it',
        resultText: 'Nobody skims after that. Nobody looks Rafiq in the eye either.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              heat: Math.min(100, Math.max(0, state.stats.heat + 15)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 20)),
            },
            flags: {
              ...state.flags,
              kalamViolence: true,
            },
          },
          resultText: 'Nobody skims after that. Nobody looks Rafiq in the eye either.',
          nextSceneId: 'S4-6',
        }),
      },
      {
        key: 'B',
        label: 'Handle it yourself with a warning',
        resultText: 'The dealer stays, and stays afraid.',
        execute: (state) => ({
          state,
          resultText: 'The dealer stays, and stays afraid.',
          nextSceneId: 'S4-6',
        }),
      },
      {
        key: 'C',
        label: 'Let it go',
        resultText: 'The money keeps leaking. The crew notices.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - Math.min(5000, state.stats.money)),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
            },
          },
          resultText: 'The money keeps leaking. The crew notices.',
          nextSceneId: 'S4-6',
        }),
      },
    ],
  },

  'S4-6': {
    id: 'S4-6',
    stage: 4,
    year: '2021 to 2022',
    locationName: 'Karwan Bazar and Sadarghat backdrops',
    locationArea: 'Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Two years pass in a blur of ledgers and lanes. Rafiq is 22, owns three phones and has one real friend. A decision is waiting.',
    choices: [
      {
        key: 'A',
        label: 'Push for total control of the routes',
        resultText: 'Every lane answers to him now. None of them like it.',
        execute: (state) => {
          const gain = state.flags.trade === 'yaba' ? 30000 : 10000;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: state.stats.money + gain,
                heat: Math.min(100, Math.max(0, state.stats.heat + 20)),
              },
              flags: {
                ...state.flags,
                path: 'control',
              },
              stageLedger: {
                stage: 4,
                amount: state.flags.trade === 'yaba' ? 45000 : 15000,
                text:
                  state.flags.trade === 'yaba'
                    ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                    : 'Weed distribution across major Dhaka hubs generates consistent income.',
                nextSceneId: 'S5-1',
              },
            },
            resultText: 'Every lane answers to him now. None of them like it.',
            nextSceneId: 'S5-1',
          };
        },
      },
      {
        key: 'B',
        label: 'Move quietly into legitimate shop fronts',
        resultText: 'A ledger with clean pages, for the first time.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 5000,
              heat: Math.min(100, Math.max(0, state.stats.heat - 10)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
            flags: {
              ...state.flags,
              path: 'fronts',
            },
            stageLedger: {
              stage: 4,
              amount: state.flags.trade === 'yaba' ? 45000 : 15000,
              text:
                state.flags.trade === 'yaba'
                  ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                  : 'Weed distribution across major Dhaka hubs generates consistent income.',
              nextSceneId: 'S5-1',
            },
          },
          resultText: 'A ledger with clean pages, for the first time.',
          nextSceneId: 'S5-1',
        }),
      },
      {
        key: 'C',
        label: 'Hold the balance',
        resultText: 'Nothing changes, and he knows that is a choice too.',
        execute: (state) => ({
          state: {
            ...state,
            flags: {
              ...state.flags,
              path: 'drift',
            },
            stageLedger: {
              stage: 4,
              amount: state.flags.trade === 'yaba' ? 45000 : 15000,
              text:
                state.flags.trade === 'yaba'
                  ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                  : 'Weed distribution across major Dhaka hubs generates consistent income.',
              nextSceneId: 'S5-1',
            },
          },
          resultText: 'Nothing changes, and he knows that is a choice too.',
          nextSceneId: 'S5-1',
        }),
      },
    ],
  },

  // STAGE 5: Reckoning
  'S5-1': {
    id: 'S5-1',
    stage: 5,
    year: '2024',
    month: 'September',
    locationName: 'Karwan Bazar and Sadarghat',
    locationArea: 'Dhaka',
    factTag: 'real',
    tickerId: 'T-10',
    archiveIds: ['A-13'],
    getSetupText: () =>
      'After the political upheaval of August, many police stations stand half empty. Dealers tell reporters the trade is flowing. Haque calls. He can tell Rafiq what he hears, for a price.',
    choices: [
      {
        key: 'A',
        label: 'Move more volume',
        resultText: 'The streets are quiet. Rafiq fills the quiet.',
        execute: (state) => {
          const gain = state.flags.trade === 'yaba' ? 10000 : 4000;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: state.stats.money + gain,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
                heat: Math.min(100, Math.max(0, state.stats.heat + 10)),
                morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
              },
            },
            resultText: 'The streets are quiet. Rafiq fills the quiet.',
            nextSceneId: 'S5-2',
          };
        },
      },
      {
        key: 'B',
        label: 'Stay put',
        resultText: 'He lets the opening pass. It feels like cowardice and like sense.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              heat: Math.min(100, Math.max(0, state.stats.heat - 5)),
            },
          },
          resultText: 'He lets the opening pass. It feels like cowardice and like sense.',
          nextSceneId: 'S5-2',
        }),
      },
      {
        key: 'C',
        label: 'Pay Haque for information',
        resultText: 'Haque talks for ten minutes and sounds tired.',
        isAvailable: (state) => {
          const price = state.flags.haqueOwnsYou ? 4500 : 3000;
          return {
            available: state.stats.money >= price,
            reason: `Requires ${price.toLocaleString()} taka`,
          };
        },
        execute: (state) => {
          const price = state.flags.haqueOwnsYou ? 4500 : 3000;
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                money: Math.max(0, state.stats.money - price),
                heat: Math.min(100, Math.max(0, state.stats.heat - 10)),
              },
            },
            resultText: 'Haque talks for ten minutes and sounds tired.',
            nextSceneId: 'S5-2',
          };
        },
      },
    ],
  },

  'S5-2': {
    id: 'S5-2',
    stage: 5,
    year: '2025',
    locationName: 'Jatrabari warehouse',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-11',
    archiveIds: ['A-14'],
    getSetupText: () =>
      'Noyon brings a boy of about twelve to the warehouse. The boy has been running errands for one of Rafiq\'s sellers. Noyon cannot look at Rafiq.',
    choices: [
      {
        key: 'A',
        label: 'Send him home, pay his family and cut that seller off',
        resultText: 'The seller is furious. Noyon exhales for the first time in an hour.',
        isAvailable: (state) => ({
          available: state.stats.money >= 5000,
          reason: 'Requires 5,000 taka',
        }),
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 5000),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 20)),
            },
            flags: {
              ...state.flags,
              childrenProtected: true,
            },
          },
          resultText: 'The seller is furious. Noyon exhales for the first time in an hour.',
          nextSceneId: 'S5-3',
        }),
      },
      {
        key: 'B',
        label: 'Say nothing and keep the seller',
        resultText: 'Nobody argues. That is the problem.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 5000,
              heat: Math.min(100, Math.max(0, state.stats.heat + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 20)),
            },
          },
          resultText: 'Nobody argues. That is the problem.',
          nextSceneId: 'S5-3',
        }),
      },
      {
        key: 'C',
        label: 'Leave it to the lieutenants',
        resultText: 'Rafiq tells himself he is delegating.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
            },
          },
          resultText: 'Rafiq tells himself he is delegating.',
          nextSceneId: 'S5-3',
        }),
      },
    ],
  },

  'S5-3': {
    id: 'S5-3',
    stage: 5,
    year: '2025',
    month: 'November',
    locationName: 'Rented room near Shah Amanat Bridge',
    locationArea: 'Chattogram',
    factTag: 'real',
    tickerId: 'T-12',
    getSetupText: () =>
      'Someone is at the door at night. It could be Haque, the Navy, a rival or Amena. Rafiq has a bag of money by the door and an unread message from his mother.',
    choices: [
      {
        key: 'A',
        label: 'Walk into the thana and surrender',
        resultText: 'He leaves the bag by the door and goes out the back, towards the police.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 15)),
            },
            flags: {
              ...state.flags,
              surrendered: true,
            },
          },
          resultText: 'He leaves the bag by the door and goes out the back, towards the police.',
          nextSceneId: 'RESOLVE_ENDING',
        }),
      },
      {
        key: 'B',
        label: 'Pay for a way out and disappear',
        resultText: 'The money buys a road and a name that is not his.',
        isAvailable: (state) => ({
          available: state.stats.money >= 20000,
          reason: 'Requires 20,000 taka',
        }),
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: Math.max(0, state.stats.money - 20000),
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
              heat: Math.min(100, Math.max(0, state.stats.heat - 20)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 5)),
            },
            flags: {
              ...state.flags,
              fled: true,
            },
          },
          resultText: 'The money buys a road and a name that is not his.',
          nextSceneId: 'RESOLVE_ENDING',
        }),
      },
      {
        key: 'C',
        label: 'Keep going',
        resultText: 'He opens the door.',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              money: state.stats.money + 10000,
              heat: Math.min(100, Math.max(0, state.stats.heat + 10)),
              morality: Math.min(100, Math.max(0, state.stats.morality - 10)),
            },
          },
          resultText: 'He opens the door.',
          nextSceneId: 'RESOLVE_ENDING',
        }),
      },
    ],
  },
};
