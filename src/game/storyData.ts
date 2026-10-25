import { SceneDefinition, StageLedgerData } from '../types';

export const ERA_BANNERS: Record<number, { text: string }> = {
  1: { text: 'Mirpur, Dhaka. 2013. Age 14.' },
  2: { text: 'Kalshi & Jhilpar. 2015–2017. Age 16–18.' },
  3: { text: 'Mirpur & Jatrabari. 2017–2019. Age 18–20.' },
  4: { text: 'Jatrabari, Highway & Teknaf. 2019–2021. Age 20–22.' },
  5: { text: 'Dhaka & Chattogram. 2023–2025. Age 24–26.' },
};

export const SCENES: Record<string, SceneDefinition> = {
  // STAGE 1: School Days
  'S1-1': {
    id: 'S1-1',
    stage: 1,
    year: '2013',
    month: 'May',
    locationName: 'Mirpur (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-01',
    archiveIds: ['A-02'],
    getSetupText: () =>
      "Two weeks after the Rana Plaza collapse in Savar, panic grips Mirpur's garment belt. A lathe accident has shattered Rafiq's father's spine; there is no compensation, and the hospital demands ৳15,000 for emergency surgeries.\n\nAmena stands by the doorway with her factory ID tag clutched in her hand, exhausted — “রফিক, কিছু একটা ভাবতে পারবি?”\n\nRafiq is fourteen, quick with numbers; his algebra notebook lies open on top of the wooden trunk.",
    choices: [
      {
        key: 'A',
        label: '“আমি টাকা জোগাড় কইরা নিমু মা।” (I will find the money, Ma.)',
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
        label: '“এডা আমার ঠিক করার মতো বিষয় না মা।” (That is not something I can fix, Ma.)',
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
    locationName: 'Gudaraghat Bazar',
    locationArea: 'Mirpur-1, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Near the tea stall, Babu—two years older and already seasoned—notices Rafiq's sullen face. Across the lane, Shirin and the other girls walk past with heavy backpacks, talking about coaching.\n\nBabu slips the small parcel into Rafiq's palm, speaking low — “এই ছোট প্যাকেজটা তিন গলি পার হইয়া দোকানে দিয়া আয়। দুইশ টাকা। কোনো প্রশ্ন নাই।”",
    choices: [
      {
        key: 'A',
        label: 'Deliver the parcel — ৳200',
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
        label: '“না ভাই... আমাকে নরমাল কাজ দেন।” (No bhai... give me a normal job)',
        resultText: 'Babu smiles faintly — “নরমাল কাজের টাকা মাসে পায়। একটু ভাব।”',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'Babu smiles faintly — “নরমাল কাজের টাকা মাসে পায়। একটু ভাব।”',
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
    locationName: 'Mirpur (Home)',
    locationArea: 'Mirpur-1, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "The final red notice arrives from the hospital. The pharmacy cuts off credit for his father's painkillers. Babu appears at the door with a heavier fold of currency.\n\nBabu smiles faintly — “পাঁচশ টাকা। নে।”",
    choices: [
      {
        key: 'A',
        label: 'Take the cash — “পাঁচশ টাকা। নে।” (Take the ৳500)',
        resultText: 'Rafiq takes the money. Babu says nothing.',
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
          resultText: 'Rafiq takes the money. Babu says nothing.',
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
      "Rafiq's fingers grip the crisp bank notes in his pocket—more than Amena earns in a full week of overtime at the sewing line. On the wooden study table, his geometry set sits beside a rusted compass.",
    choices: [
      {
        key: 'A',
        label: 'Give all the money to Amena',
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
        label: 'Give half to Amena and keep half',
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
        label: 'Look mother in the eye and lie — “এডা টিউশন কইরা কামাইছি মা।” (Lie: made it from tutoring)',
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
    locationName: 'Kalshi & Jhilpar',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    archiveIds: ['A-04'],
    getSetupText: () =>
      "Kicking a scuffed football against a brick boundary wall, Noyon shouts across the dirt ground — “রফি! কোচ ডাকতেছে! তাড়াতাড়ি আয়!”\n\nRafiq turns toward the tea stall instead. Babu coaches him on the unwritten rules of the lane — “ছোট ছোট অ্যামাউন্ট, চেনা মুখ... স্কুল গেটের কাছে কখনো না।”\n\n৳100 to ৳200 paper packets of weed. His first steady buyers are older boys from the adjacent alley.",
    choices: [
      {
        key: 'A',
        label: 'Sell to known buyers only',
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
    locationName: 'Mirpur Alleys',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Tenth-grader Tanvir is trembling at the alley corner; local moneylenders beat his elder brother yesterday.\n\nTanvir presses his hands together in desperation — “রফিক ভাই, মায়ের কসম, মাসের শেষে টাকা দিমু। একটু বাকিতে দেন না প্লিজ।”\n\nIn the distance, Shirin walks past the library gate.",
    choices: [
      {
        key: 'A',
        label: 'Front the product on credit',
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
        label: 'Cold refusal: “বাকি নাই। ক্যাশ অনলি।” (Refuse: Cash only)',
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
    locationName: 'Market Lane',
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
      "A neighbourhood grocer who has known Amena for years watches a quick hand-to-hand exchange, stepping closer while wiping flour off his apron.",
    choices: [
      {
        key: 'A',
        label: 'Turn and run',
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
        label: 'Weave an excuse: “চাচা, আমার জন্য না... আমার কাজিনের জন্য নিছিলাম।” (Talk his way out)',
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
      "Two older men shuffle up to Babu at the rail-line stall looking for codeine cough syrup — “বাবু, ডাইল আছে?”\n\nBabu shrugs — “মানুষ চায় তো রফিক। আমরা না আনলে অন্য কেউ আনবে।” He glances at Rafiq, seeing if he will carry it too.",
    choices: [
      {
        key: 'A',
        label: 'Agree to carry the syrup (Phensedyl)',
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
        label: 'Refuse and stick strictly to weed',
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
    locationName: 'Mirpur (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "The kettle boils over on the mud burner. By the wooden threshold, Amena stops dead, staring at a new pair of polished Bata leather shoes.\n\nAmena looks at the shoes and asks quietly — “এই টাকা কোথা থিকা আসতেছে রফিক?”",
    choices: [
      {
        key: 'A',
        label: 'Lie: “একটা দোকানে পার্ট-টাইম কাজ করি মা।” (Lie: part-time shop job)',
        resultText: 'She lets it go, and he sees that it costs her something.',
        execute: (state) => {
          const ledger: StageLedgerData = {
            stage: 2,
            amount: 4000,
            age: 16,
            text: 'The hospital debt is paid. Nobody says where the last of it came from.',
            nextSceneId: 'S3-1',
            metrics: [
              { label: 'Medical Debt', value: '৳0 (PAID)', statusClass: 'safe' },
              { label: 'Cash in Hand', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'Police', value: 'WATCHING', statusClass: 'warning' },
              { label: 'Mother', value: 'SUSPICIOUS', statusClass: 'warning' },
              { label: 'Noyon', value: 'CONCERNED', statusClass: 'warning' },
            ],
          };
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 10)),
              },
              stageLedger: ledger,
            },
            resultText: 'She lets it go, and he sees that it costs her something.',
            nextSceneId: 'S3-1',
          };
        },
      },
      {
        key: 'B',
        label: 'Half-truth: “বাবুকে কিছু ডেলিভারিতে হেল্প করি মা।” (Half-truth: help Babu)',
        resultText: 'She hears what she needs to hear.',
        execute: (state) => {
          const ledger: StageLedgerData = {
            stage: 2,
            amount: 4000,
            age: 16,
            text: 'The hospital debt is paid. Nobody says where the last of it came from.',
            nextSceneId: 'S3-1',
            metrics: [
              { label: 'Medical Debt', value: '৳0 (PAID)', statusClass: 'safe' },
              { label: 'Cash in Hand', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'Police', value: 'WATCHING', statusClass: 'warning' },
              { label: 'Mother', value: 'SUSPICIOUS', statusClass: 'warning' },
              { label: 'Noyon', value: 'CONCERNED', statusClass: 'warning' },
            ],
          };
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              },
              stageLedger: ledger,
            },
            resultText: 'She hears what she needs to hear.',
            nextSceneId: 'S3-1',
          };
        },
      },
      {
        key: 'C',
        label: 'Speak the truth: “রাস্তায় বেচি মা...” (Tell truth: selling on the street)',
        execute: (state) => {
          const moralEnough = state.stats.morality >= 50;
          const resultText = moralEnough
            ? 'She is silent for a long time, then takes his hand.'
            : 'She stands up and leaves the room without a word.';
          const loyaltyDelta = moralEnough ? 20 : -20;
          const ledger: StageLedgerData = {
            stage: 2,
            amount: 4000,
            age: 16,
            text: 'The hospital debt is paid. Nobody says where the last of it came from.',
            nextSceneId: 'S3-1',
            metrics: [
              { label: 'Medical Debt', value: '৳0 (PAID)', statusClass: 'safe' },
              { label: 'Cash in Hand', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'Police', value: 'WATCHING', statusClass: 'warning' },
              { label: 'Mother', value: moralEnough ? 'AWARE & HURT' : 'WITHDRAWN', statusClass: 'warning' },
              { label: 'Noyon', value: 'CONCERNED', statusClass: 'warning' },
            ],
          };
          return {
            state: {
              ...state,
              stats: {
                ...state.stats,
                loyalty: Math.min(100, Math.max(0, state.stats.loyalty + loyaltyDelta)),
                morality: Math.min(100, Math.max(0, state.stats.morality + 10)),
              },
              stageLedger: ledger,
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
    locationName: 'Dhalpur side, Jatrabari',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-03',
    archiveIds: ['A-03', 'A-05'],
    getSetupText: () =>
      "Newspaper headlines scream about the Teknaf frontier and pink yaba pills flooding Dhaka. Babu escorts Rafiq past Kamalapur Station to Shuvo's den in Dhalpur. Over sweet tea, Shuvo sizes Rafiq up with cold, assessing eyes.\n\nSitting across the wooden table, Shuvo speaks low — “হিসাব বোঝে আর মুখ বন্ধ রাখে — এমন ছেলেই আমার পছন্দ। এই অফার দুইবার আসে না।”",
    choices: [
      {
        key: 'A',
        label: 'Accept and start with yaba distribution',
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
        label: 'Offer Inspector Haque a ৳2,000 bribe',
        resultText: "হক নোট গুনতে গুনতে চোখ না তুইলা কয় — “ভালো। হাঁট। পেছনে তাকাবি না।”",
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
          resultText: "হক নোট গুনতে গুনতে চোখ না তুইলা কয় — “ভালো। হাঁট। পেছনে তাকাবি না।”",
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
        label: "Inform on Shuvo: give Haque Shuvo's name",
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
    locationName: 'Jhilpar Outpost Lockup',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Rafiq spends three nights at the thana lockup. Amena pays a bail she cannot afford with money borrowed from factory coworkers.',
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
    locationName: 'Mirpur (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: (state) => {
      const packet =
        state.flags.trade === 'yaba'
          ? 'a small plastic pouch of pink tablets'
          : 'a wrapped paper packet of dried leaves';
      return `Tucked underneath his geometry set inside the school bag, Amena discovers it: ${packet}. She holds it between her thumb and forefinger as if gripping burning charcoal, motionless.`;
    },
    choices: [
      {
        key: 'A',
        label: 'Kneel and confess: “সব খুইলা কইছি মা। ওয়াদা করছি থামু। মাফ কইরা দেন।” (Confess & promise to stop)',
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
        label: 'Shout defensively: “কে ব্যাগে রাখছে জানি না! আপনে সবসময় সন্দেহ করেন কেন?!” (Deny it and shout)',
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
        label: 'Cold reality: “বাড়ি চালাইতে এই টাকা লাগে মা। কারখানার বেতন দিয়া চলে না... আপনেও জানেন।” (Family needs money)',
        resultText: 'আমেনা দীর্ঘশ্বাস ফেলিয়া আস্তে কয় — “শুধু সাবধানে থাকিস...”',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty - 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'আমেনা দীর্ঘশ্বাস ফেলিয়া আস্তে কয় — “শুধু সাবধানে থাকিস...”',
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
      "Babu gets picked up in a sudden Mirpur sweep. Word arrives from the thana lockup: he needs ৳5,000 for bail, or someone needs to speak to Inspector Haque.\n\nBabu passes a whispered message from the cell — “রফিককে কইস... দুইশ টাকা যখন যথেষ্ট ছিল, সেই কথা মনে রাখুক।”",
    choices: [
      {
        key: 'A',
        label: "Pay Babu's ৳5,000 bail",
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
        label: 'Use Inspector Haque to make the charges disappear',
        resultText: 'দারোগা হক হালকা হাসি দিয়া কয় — “এখন বুঝলাম বন্ধুর জন্য কতদূর যাবি, রফিক।”',
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
          resultText: 'দারোগা হক হালকা হাসি দিয়া কয় — “এখন বুঝলাম বন্ধুর জন্য কতদূর যাবি, রফিক।”',
          nextSceneId: 'S3-5',
        }),
      },
      {
        key: 'C',
        label: 'Do nothing and protect yourself',
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
    locationName: "Rafiq's room, Mirpur",
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-05',
    archiveIds: ['A-08'],
    getSetupText: () =>
      "December 2018. Parliament passes the amended Narcotics Control Act: 200g of yaba carries the death penalty. With his profits, Rafiq replaces the cracked clay water pitcher in the kitchen with a brand-new white Walton refrigerator.\n\nLooking at the humming appliance, Rafiq tells himself — “আমি তো মায়ের দেখাশোনা করছি...”\n\nAmena stands in front of the humming white box with grey thread still clinging to her fingers, as if someone had placed a corpse in the kitchen. Under the yellow bulb, Rafiq counts his cash bundles.",
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
        const updatedTotal = state.stats.money + baseAmount;
        const ledger: StageLedgerData = {
          stage: 3,
          amount: baseAmount,
          age: 18,
          text:
            state.flags.trade === 'yaba'
              ? state.flags.attemptedQuit
                ? 'Yaba earnings curtailed by promises made to Amena.'
                : 'Yaba distribution in Jatrabari and Mirpur yields real profit.'
              : state.flags.attemptedQuit
              ? 'Weed sales curtailed by Rafiq holding back.'
              : 'Steady weed trade across quiet Mirpur lanes.',
          nextSceneId: 'S4-1',
          metrics: [
            { label: 'Cash in Hand', value: `৳${updatedTotal.toLocaleString()}`, statusClass: 'neutral' },
            { label: 'Trade', value: state.flags.trade === 'yaba' ? 'YABA NETWORK' : 'WEED', statusClass: state.flags.trade === 'yaba' ? 'danger' : 'warning' },
            { label: 'Mother', value: 'WITHDRAWN / REFRIGERATOR HUMS', statusClass: 'warning' },
            { label: 'Police', value: state.flags.haqueOwnsYou ? 'HAQUE HOLDS LEVERAGE' : 'PATROLS ACTIVE', statusClass: 'danger' },
            { label: 'Babu', value: state.flags.babuStatus.toUpperCase(), statusClass: 'neutral' },
          ],
        };
        return {
          ...state,
          stageLedger: ledger,
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
    locationName: 'Jatrabari warehouse',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-06',
    archiveIds: ['A-09'],
    getSetupText: (state) => {
      const babuLine =
        state.flags.babuStatus === 'loyal' || state.flags.babuStatus === 'owes'
          ? 'Babu stands by the threshold with a cigarette glowing.'
          : 'The doorway is empty; no one speaks Babu\'s name.';
      return `Rafiq leases the rear bay of a freight warehouse near the Jatrabari highway flyover. Noyon arrives first with a tea flask, staring at the heavy steel shutters. Then Reshma enters, sharp-eyed with her account book. Then Kalam, hardened from Kashimpur jail. By the door, ${babuLine}\n\nNoyon steps into the room packed with cash bundles and enforcers, speaking in an old voice — “রফি...”`;
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
    locationName: 'Bakalia',
    locationArea: 'Chattogram',
    factTag: 'fictional',
    getSetupText: () =>
      "Reshma unrolls a transit map of Chattogram's Bakalia district across the wooden table.\n\nReshma closes her ledger and looks up — “সবকিছু ঢাকার ভিতর দিয়া কেন যাবে যখন বাকালিয়া নিজেই দাঁড়াইতে পারে? তুমি রিস্ক হিসাব করো রফিক... আমি অপরচুনিটি হিসাব করি।”",
    choices: [
      {
        key: 'A',
        label: 'Approve Bakalia route expansion',
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
        label: 'Deny expansion and keep tight control',
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
      "TV screens across road stalls broadcast 102 listed drug godfathers surrendering before the Home Minister in Teknaf. At midnight, Shuvo calls on an unregistered burner.\n\nOver the line, Shuvo's voice is chilled steel — “বড় গডফাদাররা টেকনাফে সারেন্ডার কইরাছে... তাই ছোট খেলোয়াড়দের দ্বিগুণ দিতে হয়। হাইওয়েতে কিছুই বদলায় নাই রফিক, শুধু শ্বাস নেওয়ার দাম বাড়ছে।”",
    choices: [
      {
        key: 'A',
        label: "Pay Shuvo's bigger cut",
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
        label: 'Refuse & prepare for conflict',
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
        label: 'Broker peace through Inspector Haque',
        resultText: 'হক নোটের বান্ডিল ঠেলিয়া দিয়া কয় — “এটাকে দুই ভদ্রলোকের মধ্যে একটা ফেভার হিসাবে নাও।”',
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
            resultText: 'হক নোটের বান্ডিল ঠেলিয়া দিয়া কয় — “এটাকে দুই ভদ্রলোকের মধ্যে একটা ফেভার হিসাবে নাও।”',
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
    locationName: 'Geneva Camp & Mirpur',
    locationArea: 'Mohammadpur & Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-08',
    archiveIds: ['A-11'],
    getSetupText: () =>
      "COVID-19 locks down the city. In the narrow alleys, a single yaba pill fetches ৳250 to ৳300. But with daily wage labor halted, families in Mirpur have nothing to eat.\n\nLooking out over the shuttered lanes, Noyon speaks quietly — “রিকশাওয়ালাদের ঘরে বাচ্চাগুলার খাওয়ার কিছু নাই রফি। এত টাকা দিয়া কী হবে যদি চোখের সামনে গলিটার মানুষ না খাইয়া মরে?”",
    choices: [
      {
        key: 'A',
        label: 'Expand aggressive sales while police are distracted',
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
        label: 'Stay quiet & protect the crew',
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
        label: 'Share earnings & distribute relief with lane',
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
      "Following the Shamlapur checkpoint shooting of Major Sinha, reports of gunfights dominate the airwaves. In Jatrabari, one of Rafiq's runners is caught skimming cash from the drop.\n\nNoyon shakes his head at Kalam's proposal — “ওর বাবার লগে কথা বলা উচিত রফি। তুই আগে এভাবে সমস্যা সমাধান করতিস না।”\n\nKalam leans in with dead eyes — “কাম সোজা থাকতে প্যাচান ক্যান ভাই? এক দুপুর মাইক্রোবাসের পিছে কাটাইয়া আসলেই পুরা হাইওয়ে সোজা হইয়া যাইব।”",
    choices: [
      {
        key: 'A',
        label: 'Let Kalam handle it his way (Violence)',
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
        label: 'Handle with a severe warning',
        resultText: 'The dealer stays, and stays afraid.',
        execute: (state) => ({
          state,
          resultText: 'The dealer stays, and stays afraid.',
          nextSceneId: 'S4-6',
        }),
      },
      {
        key: 'C',
        label: 'Let the runner go with a docked share',
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
    locationName: 'Karwan Bazar & Sadarghat',
    locationArea: 'Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Two years pass in a blur of ledgers, police envelopes, and highway fuel receipts. Rafiq is 22, owns three phones, and has one real friend who barely speaks. A fork in the road is waiting.',
    choices: [
      {
        key: 'A',
        label: 'Push for total control of highway transit routes',
        resultText: 'Every lane answers to him now. None of them like it.',
        execute: (state) => {
          const gain = state.flags.trade === 'yaba' ? 30000 : 10000;
          const ledgerAmount = state.flags.trade === 'yaba' ? 45000 : 15000;
          const ledger: StageLedgerData = {
            stage: 4,
            amount: ledgerAmount,
            age: 22,
            text:
              state.flags.trade === 'yaba'
                ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                : 'Weed distribution across major Dhaka hubs generates consistent income.',
            nextSceneId: 'S5-1',
            metrics: [
              { label: 'Cash in Hand', value: '৳██████', statusClass: 'redacted' },
              { label: 'Suppliers', value: '3 HIGHWAY DEPOTS', statusClass: 'neutral' },
              { label: 'Crew', value: '17 ACTIVE RUNNERS', statusClass: 'neutral' },
              { label: 'Reshma', value: state.flags.reshmaDefected ? 'DEFECTED' : 'EXPANDING', statusClass: state.flags.reshmaDefected ? 'danger' : 'warning' },
              { label: 'Noyon', value: 'DISTANT / SILENT', statusClass: 'warning' },
              { label: 'Kalam', value: 'USEFUL', statusClass: 'danger' },
            ],
          };
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
              stageLedger: ledger,
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
        execute: (state) => {
          const ledgerAmount = state.flags.trade === 'yaba' ? 45000 : 15000;
          const ledger: StageLedgerData = {
            stage: 4,
            amount: ledgerAmount,
            age: 22,
            text:
              state.flags.trade === 'yaba'
                ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                : 'Weed distribution across major Dhaka hubs generates consistent income.',
            nextSceneId: 'S5-1',
            metrics: [
              { label: 'Cash in Hand', value: '৳██████', statusClass: 'redacted' },
              { label: 'Suppliers', value: 'DISGUISED THROUGH FRONTS', statusClass: 'safe' },
              { label: 'Crew', value: '17 ACTIVE RUNNERS', statusClass: 'neutral' },
              { label: 'Reshma', value: state.flags.reshmaDefected ? 'DEFECTED' : 'MANAGING STORES', statusClass: 'neutral' },
              { label: 'Noyon', value: 'DISTANT', statusClass: 'warning' },
              { label: 'Kalam', value: 'RESTRAINED', statusClass: 'safe' },
            ],
          };
          return {
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
              stageLedger: ledger,
            },
            resultText: 'A ledger with clean pages, for the first time.',
            nextSceneId: 'S5-1',
          };
        },
      },
      {
        key: 'C',
        label: 'Hold the balance and maintain current scale',
        resultText: 'Nothing changes, and he knows that is a choice too.',
        execute: (state) => {
          const ledgerAmount = state.flags.trade === 'yaba' ? 45000 : 15000;
          const ledger: StageLedgerData = {
            stage: 4,
            amount: ledgerAmount,
            age: 22,
            text:
              state.flags.trade === 'yaba'
                ? 'Highway supply network across Chattogram and Dhaka pays massive returns.'
                : 'Weed distribution across major Dhaka hubs generates consistent income.',
            nextSceneId: 'S5-1',
            metrics: [
              { label: 'Cash in Hand', value: '৳██████', statusClass: 'redacted' },
              { label: 'Suppliers', value: 'UNSTABLE', statusClass: 'warning' },
              { label: 'Crew', value: '17 RUNNERS', statusClass: 'neutral' },
              { label: 'Reshma', value: state.flags.reshmaDefected ? 'DEFECTED' : 'RESTLESS', statusClass: 'warning' },
              { label: 'Noyon', value: 'TIRED', statusClass: 'warning' },
              { label: 'Kalam', value: 'WATCHING', statusClass: 'danger' },
            ],
          };
          return {
            state: {
              ...state,
              flags: {
                ...state.flags,
                path: 'drift',
              },
              stageLedger: ledger,
            },
            resultText: 'Nothing changes, and he knows that is a choice too.',
            nextSceneId: 'S5-1',
          };
        },
      },
    ],
  },

  // STAGE 5: Reckoning
  'S5-1': {
    id: 'S5-1',
    stage: 5,
    year: '2024',
    month: 'September',
    locationName: 'Karwan Bazar & Sadarghat',
    locationArea: 'Dhaka',
    factTag: 'real',
    tickerId: 'T-10',
    archiveIds: ['A-13'],
    getSetupText: () =>
      "September 2024. Following the massive political upheaval in August, police thanas across Dhaka stand gutted and charred. Traffic officers are gone; students in yellow vests direct the intersections. On the unpatrolled streets, supply lines for crystal meth (ice) and yaba sit wide open.\n\nOn an encrypted burner, Inspector Haque speaks low — “ইউনিফর্ম এখন খোলা রফিক। কিন্তু ফাইল কখনো পোড়ে না।”",
    choices: [
      {
        key: 'A',
        label: 'Move more volume into the unpoliced vacuum',
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
        label: 'Stay put and watch the shifting tide',
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
        label: 'Pay Haque for intelligence on newly formed units',
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
      "Noyon leads a twelve-year-old boy in a torn school shirt to the warehouse door. The kid is shivering, clutching a packet of pink tablets behind his back.\n\nRafiq looks down at him — “তোর বয়স কত?”\nThe boy drops his eyes — “বারো।”\nRafiq was twelve when his father's spine was crushed and the debt began.\n\nNoyon steps forward, his voice cracking — “ওর দিকে তাকা রফি। তুই কী হইয়া গেছিস দেখ।”",
    choices: [
      {
        key: 'A',
        label: 'Send the child home, pay his family, and cut the supplier',
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
        label: 'Say nothing and keep the profitable pipeline',
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
        label: 'Leave the decision to your lieutenants',
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
    locationName: 'Room near Shah Amanat Bridge',
    locationArea: 'Chattogram',
    factTag: 'real',
    tickerId: 'T-12',
    getSetupText: () =>
      "November 2025. A damp rental room near Chattogram's Shah Amanat Bridge. Outside, highway trucks rumble through the dark. Beside the bed sits a duffel bag stuffed with bank notes and an unread SMS from an old Mirpur number. On the wooden landing outside, heavy footsteps come to a sudden halt.\n\nA heavy knock rattles against the thin wooden door.",
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
        label: 'Pay for a way out across the border and disappear',
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
        label: 'Open the door and keep going',
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
