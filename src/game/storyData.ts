import { SceneDefinition, StageLedgerData } from '../types';

export const ERA_BANNERS: Record<number, { text: string }> = {
  1: { text: 'মিরপুর, ঢাকা। ২০১৩ সাল। রফিকের বয়স ১৪। (Mirpur, Dhaka. 2013. Age 14)' },
  2: { text: 'মিরপুর, কালশী ও ঝিলপাড়। ২০১৫ সাল। রফিকের বয়স ১৬। (Kalshi & Jhilpar. 2015. Age 16)' },
  3: { text: 'মিরপুর ও যাত্রাবাড়ী। ২০১৭ সাল। রফিকের বয়স ১৮। (Mirpur & Jatrabari. 2017. Age 18)' },
  4: { text: 'যাত্রাবাড়ী, চট্টগ্রাম হাইওয়ে ও টেকনাফ। ২০১৯ সাল। রফিকের বয়স ২০। (Jatrabari, Highway & Teknaf. 2019. Age 20)' },
  5: { text: 'ঢাকা ও চট্টগ্রাম। ২০২৩–২০২৫ সাল। রফিকের বয়স ২৪–২৬। (Dhaka & Chattogram. 2023–2025. Age 24–26)' },
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
      "Two weeks after the Savar garment complex collapse, every garment-worker household in the Mirpur lane is on edge. Rafiq's father was crushed in a lathe workshop accident and cannot work. The hospital wants 15,000 taka. Amena stands in the doorway, smelling of sewing machine oil, her factory ID still pinned to her cotton kameez, and asks Rafiq if he can think of anything. Rafiq is fourteen, good at math, and had his algebra notebook open on the wooden trunk.",
    choices: [
      {
        key: 'A',
        label: 'টাকা আমি জোগাড় করব, মা। (I will find the money, Ma.)',
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
        label: 'এইটা তো আমার পক্ষে ঠিক করা সম্ভব না। (That is not something I can fix.)',
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
    locationName: 'গুদারাঘাট বাজার এলাকা (Gudaraghat Bazar)',
    locationArea: 'Mirpur-1, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Babu, two years older and always near the tea stalls, notices Rafiq's haunted face. In the lane, Shirin and two schoolgirls walk past with heavy backpacks, talking about coaching exams. Babu taps Rafiq on the shoulder and offers 200 taka to carry a small wrapped parcel three lanes away to a mechanic shop. No questions asked.",
    choices: [
      {
        key: 'A',
        label: 'পার্সেলটা ডেলিভারি দেওয়া (Accept the delivery)',
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
        label: 'না করে দিয়ে সাধারণ কাজের খোঁজ করা (Refuse and ask for normal job)',
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
    locationName: 'মিরপুরের ঘর (Home)',
    locationArea: 'Mirpur-1, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'The hospital sends a final red notice. The medicine shop cuts off their credit. Babu is at the door with a bigger offer: 500 taka. There is one choice.',
    choices: [
      {
        key: 'A',
        label: 'টাকাটা নিয়ে নেওয়া (Take it)',
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
    locationName: 'মিরপুর (Mirpur)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Rafiq holds the crisp currency notes in his pocket. It is more than Amena earns in a brutal week of factory overtime. On the desk sits his school geometry box with the rusted compass.",
    choices: [
      {
        key: 'A',
        label: 'সব টাকা আমেনাকে দিয়ে দেওয়া (Give it all to Amena)',
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
        label: 'অর্ধেক আমেনাকে দেওয়া, অর্ধেক রাখা (Give half and keep half)',
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
        label: 'পুরোটা নিজের কাছে রেখে টিউশনির টাকা বলা (Keep it all; lie about tutoring)',
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
    locationName: 'কালশী ও ঝিলপাড় (Kalshi & Jhilpar)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    archiveIds: ['A-04'],
    getSetupText: () =>
      "Babu teaches Rafiq the quiet rules of the lane: small amounts, familiar faces, never near the school gate. Weed sells in lots of 100 to 200 taka. Noyon, kicking a bald football against a brick wall, calls out 'Rafi, coach is calling!' but Rafiq turns his back towards the tea stall. His first buyers are older boys from the next lane.",
    choices: [
      {
        key: 'A',
        label: 'চেনা খরিদ্দারের কাছে বিক্রি (Known buyers only)',
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
        label: 'অচেনা খরিদ্দারের কাছে দ্রুত বিক্রি (Sell to strangers for faster cash)',
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
    locationName: 'মিরপুরের গলি (Mirpur Alleys)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Tanvir from class 10 is shaking at the edge of the alley. His elder brother was beaten by loan sharks. He begs Rafiq to let him take a small packet on credit and swears on his mother's head he will pay by month-end. In the distance, Shirin walks past the library.",
    choices: [
      {
        key: 'A',
        label: 'তানভীরকে বাকি দেওয়া (Let him have it on credit)',
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
        label: 'না করে দেওয়া, নগদ ছাড়া বাকি নাই (Refuse, cash only)',
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
    locationName: 'বাজারের গলি (Market lane)',
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
      "A shopkeeper who knows Amena sees a hand-off near his stall and starts walking over, wiping flour off his apron.",
    choices: [
      {
        key: 'A',
        label: 'দৌড়ে পালিয়ে যাওয়া (Run)',
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
        label: 'মিষ্টি কথায় সামলানো: খালাতো ভাইয়ের জন্য (Talk his way out)',
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
    locationName: 'রেললাইন চা স্টল (Rail-line tea stall)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-02',
    archiveIds: ['A-01'],
    getSetupText: () =>
      "Two older men ask Babu for dyl, the codeine cough syrup that was everywhere when they were young. Babu can get it across the northern border. He looks at Rafiq to see whether Rafiq will carry it too: 'People want it anyway, Rafiq. If we don't bring it, someone else will.'",
    choices: [
      {
        key: 'A',
        label: 'ফেনসিডিলও টানতে রাজি হওয়া (Carry the syrup)',
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
        label: 'না করে শুধু ঘাসে থাকা (Refuse)',
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
    locationName: 'মিরপুরের বাড়ি (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "Amena notices the clean leather Bata shoes by the threshold and the new quiet calm in Rafiq's eyes. On the clay stove, the tea boils over. She asks quietly where the money is coming from.",
    choices: [
      {
        key: 'A',
        label: 'মিথ্যে বলা: দোকানে পার্ট-টাইম কাজ পাইছি (Lie: shop job)',
        resultText: 'She lets it go, and he sees that it costs her something.',
        execute: (state) => {
          const ledger: StageLedgerData = {
            stage: 2,
            amount: 4000,
            age: 16,
            text: 'The hospital debt is paid. Nobody says where the last of it came from.',
            nextSceneId: 'S3-1',
            metrics: [
              { label: 'চিকিৎসা ঋণ (Medical Debt)', value: '৳০ (পরিশোধিত / PAID)', statusClass: 'safe' },
              { label: 'হাতে নগদ (Cash)', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'পুলিশ প্রশাসন (Police)', value: 'নজরদারি (WATCHING)', statusClass: 'warning' },
              { label: 'আমেনা (Mother)', value: 'সন্দেহপ্রবণ (SUSPICIOUS)', statusClass: 'warning' },
              { label: 'নয়ন (Noyon)', value: 'চিন্তিত (CONCERNED)', statusClass: 'warning' },
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
        label: 'অর্ধসত্য বলা: বাবুকে সাহায্য করি (Half-truth: help Babu)',
        resultText: 'She hears what she needs to hear.',
        execute: (state) => {
          const ledger: StageLedgerData = {
            stage: 2,
            amount: 4000,
            age: 16,
            text: 'The hospital debt is paid. Nobody says where the last of it came from.',
            nextSceneId: 'S3-1',
            metrics: [
              { label: 'চিকিৎসা ঋণ (Medical Debt)', value: '৳০ (পরিশোধিত / PAID)', statusClass: 'safe' },
              { label: 'হাতে নগদ (Cash)', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'পুলিশ প্রশাসন (Police)', value: 'নজরদারি (WATCHING)', statusClass: 'warning' },
              { label: 'আমেনা (Mother)', value: 'সন্দেহপ্রবণ (SUSPICIOUS)', statusClass: 'warning' },
              { label: 'নয়ন (Noyon)', value: 'চিন্তিত (CONCERNED)', statusClass: 'warning' },
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
        label: 'সত্যিটা স্বীকার করা (Tell the truth)',
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
              { label: 'চিকিৎসা ঋণ (Medical Debt)', value: '৳০ (পরিশোধিত / PAID)', statusClass: 'safe' },
              { label: 'হাতে নগদ (Cash)', value: `৳${(state.stats.money + 4000).toLocaleString()}`, statusClass: 'neutral' },
              { label: 'পুলিশ প্রশাসন (Police)', value: 'নজরদারি (WATCHING)', statusClass: 'warning' },
              { label: 'আমেনা (Mother)', value: moralEnough ? 'আহত ও ব্যথিত (AWARE & HURT)' : 'মুখ বন্ধ (WITHDRAWN)', statusClass: 'warning' },
              { label: 'নয়ন (Noyon)', value: 'চিন্তিত (CONCERNED)', statusClass: 'warning' },
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
    locationName: 'Dhalpur side',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-03',
    archiveIds: ['A-03', 'A-05'],
    getSetupText: () =>
      "The newspapers are full of refugees across the south-east border and pink tablets named yaba. Babu takes Rafiq across town past Kamalapur station to meet Shuvo on the Dhalpur side of Jatrabari. Shuvo sips sweet cha and sizes up Rafiq: 'A boy who knows arithmetic and keeps his mouth shut.' He offers Rafiq a sub-distributor role moving pills into Mirpur.",
    choices: [
      {
        key: 'A',
        label: 'ইয়াবার সাব-ডিস্ট্রিবিউশনে নামা (Accept and start with yaba)',
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
        label: 'প্রস্তাব ফিরিয়ে শুধু ঘাসে থাকা (Decline and stay with weed)',
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
    locationName: 'ঝিলপাড় বস্তি ও ফাঁড়ি (Jhilpar area)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-04',
    archiveIds: ['A-06'],
    getSetupText: () =>
      'The government has launched a nationwide anti-drug drive. Police and RAB sweep the lanes near Jhilpar. At a corner, Inspector Haque of Jhilpar Outpost stops Rafiq and looks at him for a long time.',
    choices: [
      {
        key: 'A',
        label: 'দারোগা হককে ২,০০০ টাকা ঘুষ দেওয়া (Offer 2,000 Tk bribe)',
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
        label: 'দৌড়ে পালানোর চেষ্টা করা (Refuse and run)',
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
        label: "দারোগাকে শুভর নাম দিয়ে দেওয়া (Give Haque Shuvo's name)",
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
    locationName: 'ঝিলপাড় ফাঁড়ি হাজত (Jhilpar Outpost Lockup)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Rafiq spends three nights at the thana. Amena pays a bail she cannot afford with money borrowed from factory coworkers.',
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
    locationName: 'মিরপুরের বাড়ি (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'fictional',
    getSetupText: (state) => {
      const packet =
        state.flags.trade === 'yaba'
          ? 'a small plastic packet of pink tablets'
          : 'a folded paper of dry leaves';
      return `Amena finds packaging deep inside Rafiq's satchel, tucked under his old school geometry set: ${packet}. She holds it between thumb and forefinger as if it were burning coal, and says nothing.`;
    },
    choices: [
      {
        key: 'A',
        label: 'সব স্বীকার করে ছেড়ে দেওয়ার ওয়াদা (Confess & promise to stop)',
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
        label: 'অস্বীকার করে মেজাজ দেখানো (Deny it and shout)',
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
        label: 'সংসারের খরচের কথা বলে বাস্তবতা বোঝানো (Confess: family needs money)',
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
    locationName: 'মিরপুর (Mirpur)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    archiveIds: ['A-07'],
    getSetupText: () =>
      'Babu is picked up in a sweep of the Mirpur lanes. He sends word from the thana: bail is 5,000 taka, or someone has to speak to Haque. Babu whispers to the courier: "Tell him to remember when 200 taka was enough."',
    choices: [
      {
        key: 'A',
        label: 'বাবুর জামিনের ৫,০০০ টাকা দিয়ে দেওয়া (Pay his 5,000 Tk bail)',
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
        label: 'দারোগা হককে দিয়ে মামলা থামানো (Ask Haque to make it go away)',
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
        label: 'কিছু না করে চুপ থাকা (Do nothing)',
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
    locationName: "মিরপুরের ঘর (Rafiq's room)",
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-05',
    archiveIds: ['A-08'],
    getSetupText: () =>
      "Parliament passes the Narcotics Control Act 2018: 200 grams of yaba now carries death or life in prison. With his earnings, Rafiq replaces the leaking clay water pot and buys a new white Walton refrigerator for the kitchen. He tells himself: 'I am taking care of my mother.' Amena stands before the humming appliance with grey factory lint on her fingers, looking at it as though it were a corpse in the room. Rafiq counts his cash alone by the lamp.",
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
            { label: 'হাতে নগদ (Cash)', value: `৳${updatedTotal.toLocaleString()}`, statusClass: 'neutral' },
            { label: 'ব্যবসা (Trade)', value: state.flags.trade === 'yaba' ? 'ইয়াবা নেটওয়ার্ক (YABA)' : 'গাঁজা (WEED)', statusClass: state.flags.trade === 'yaba' ? 'danger' : 'warning' },
            { label: 'আমেনা (Mother)', value: 'মুখ বন্ধ / ফ্রিজ চলছে (WITHDRAWN / REFRIGERATOR HUMS)', statusClass: 'warning' },
            { label: 'পুলিশ প্রশাসন (Police)', value: state.flags.haqueOwnsYou ? 'হক ব্ল্যাকমেইল করতেছে (HAQUE HOLDS LEVERAGE)' : 'টহল অব্যাহত (PATROLS ACTIVE)', statusClass: 'danger' },
            { label: 'বাবু (Babu)', value: state.flags.babuStatus.toUpperCase(), statusClass: 'neutral' },
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
    locationName: 'যাত্রাবাড়ী ওয়্যারহাউজ (Jatrabari warehouse)',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-06',
    archiveIds: ['A-09'],
    getSetupText: (state) => {
      const babuLine =
        state.flags.babuStatus === 'loyal' || state.flags.babuStatus === 'owes'
          ? 'Babu stands by the door with a cigarette.'
          : 'the doorway is empty and nobody mentions his name.';
      return `Rafiq rents the back half of a warehouse in Jatrabari off the highway. Noyon arrives first, carrying tea and looking at the steel shutters. Then Reshma, sharp and quick with numbers, carrying a ledger of highway delivery timings. Then Kalam, older, silent, scars on his knuckles from Kashimpur jail. In the doorway, ${babuLine} Noyon looks at the money crates, looks at Rafiq, and murmurs under his breath: 'Rafi...'`;
    },
    autoContinue: {
      buttonLabel: 'এগিয়ে যান (Continue)',
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
    locationName: 'বাকলিয়া (Bakalia)',
    locationArea: 'চট্টগ্রাম (Chattogram)',
    factTag: 'fictional',
    getSetupText: () =>
      "Reshma spreads a transit map of Chattogram's Bakalia district across the table. 'Why funnel every single consignment through Dhaka when Bakalia can stand on its own?' she asks. 'You calculate risk, Rafiq. I calculate opportunity.' She waits to see if he treats her as a genuine partner or merely as hired labor.",
    choices: [
      {
        key: 'A',
        label: 'প্রস্তাবে অনুমোদন দেওয়া (Approve it)',
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
        label: 'প্রস্তাব নাকচ করা (Deny it)',
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
    locationName: 'যাত্রাবাড়ী ওয়্যারহাউজ (Jatrabari warehouse)',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-07',
    archiveIds: ['A-10'],
    getSetupText: () =>
      "On the small CRT television in the tea stall, more than a hundred yaba godfathers file onto a ceremonial stage in Teknaf to surrender before the Home Minister. That midnight, Shuvo calls. 'The big men gave up their names so the small men can pay double,' he rasps. 'Nothing has changed on the highway, Rafiq, except the price of breathing.'",
    choices: [
      {
        key: 'A',
        label: 'শুভর বড় ভাগ মেনে নেওয়া (Pay the bigger cut)',
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
        label: 'প্রস্তাব প্রত্যাখ্যান ও সংঘাতের প্রস্তুতি (Refuse & prepare for conflict)',
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
        label: 'দারোগা হককে দিয়ে শুভর সাথে সমঝোতা (Broker peace with Haque)',
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
    locationName: 'জেনেভা ক্যাম্প ও মিরপুর (Geneva Camp & Mirpur)',
    locationArea: 'মোহাম্মদপুর ও মিরপুরের গলি (Mohammadpur & Mirpur)',
    factTag: 'real',
    tickerId: 'T-08',
    archiveIds: ['A-11'],
    getSetupText: () =>
      "COVID-19 closes the country. Police are pulled to quarantine checkpoints and relief lines. In the alleys, a tablet sells for 250 to 300 taka. But half of Mirpur is starving without daily wage work. Noyon says: 'The rickshaw pullers have nothing to feed their children, Rafi. What good is all this money if we just watch them starve?'",
    choices: [
      {
        key: 'A',
        label: 'পুলিশের ব্যস্ততার সুযোগে বিস্তার (Expand while police busy)',
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
        label: 'চুপচাপ থেকে নিজেদের লোক বাঁচানো (Stay quiet & protect crew)',
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
        label: 'নয়নের পরামর্শে পাড়ার পরিবারগুলোকে সাহায্য (Share earnings with lane)',
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
    locationName: 'যাত্রাবাড়ী ওয়্যারহাউজ (Jatrabari warehouse)',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-09',
    archiveIds: ['A-12'],
    getSetupText: () =>
      "One week after Major Sinha is shot dead at the Shamlapur checkpoint and the word gunfight dominates every headline, a carrier in Rafiq's network is caught skimming. Noyon pleads: 'We should talk to his father, Rafi. You didn't use to solve problems like this.' Kalam casually leans an iron rod against the wooden bench: 'Why make it complicated? One afternoon in the back of a microbus and the entire highway stays honest.'",
    choices: [
      {
        key: 'A',
        label: 'কালামকে নিজের মতো সাইজ করতে দেওয়া (Let Kalam handle it)',
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
        label: 'সতর্ক করে নিজেই সামলানো (Handle with warning)',
        resultText: 'The dealer stays, and stays afraid.',
        execute: (state) => ({
          state,
          resultText: 'The dealer stays, and stays afraid.',
          nextSceneId: 'S4-6',
        }),
      },
      {
        key: 'C',
        label: 'ছেড়ে দেওয়া (Let it go)',
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
    locationName: 'কারওয়ান বাজার ও সদরঘাট (Karwan Bazar & Sadarghat)',
    locationArea: 'Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      'Two years pass in a blur of ledgers, police envelopes, and highway fuel receipts. Rafiq is 22, owns three phones, and has one real friend who barely speaks. A fork in the road is waiting.',
    choices: [
      {
        key: 'A',
        label: 'হাইওয়ে রুটের পূর্ণ নিয়ন্ত্রণ নেওয়া (Push for total control)',
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
              { label: 'হাতে নগদ (Cash)', value: '৳██████', statusClass: 'redacted' },
              { label: 'ডিপো (Suppliers)', value: '৩টি হাইওয়ে হাব (3 HIGHWAY DEPOTS)', statusClass: 'neutral' },
              { label: 'লাইনম্যান (Crew)', value: '১৭ জন সক্রিয় রিক্রুট (17 ACTIVE RUNNERS)', statusClass: 'neutral' },
              { label: 'রেশমা (Reshma)', value: state.flags.reshmaDefected ? 'পালিয়ে গেছে (DEFECTED)' : 'বিস্তার করতেছে (EXPANDING)', statusClass: state.flags.reshmaDefected ? 'danger' : 'warning' },
              { label: 'নয়ন (Noyon)', value: 'দূরত্ব / নিস্তব্ধ (DISTANT / SILENT)', statusClass: 'warning' },
              { label: 'কালাম (Kalam)', value: 'কাজে লাগানো হচ্ছে (USEFUL)', statusClass: 'danger' },
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
        label: 'দোকান দিয়ে বৈধ ব্যবসার আড়ালে যাওয়া (Move quietly into legitimate shop fronts)',
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
              { label: 'হাতে নগদ (Cash)', value: '৳██████', statusClass: 'redacted' },
              { label: 'ডিপো (Suppliers)', value: 'বৈধ দোকানের আড়ালে (DISGUISED THROUGH FRONTS)', statusClass: 'safe' },
              { label: 'লাইনম্যান (Crew)', value: '১৭ জন সক্রিয় রিক্রুট (17 ACTIVE RUNNERS)', statusClass: 'neutral' },
              { label: 'রেশমা (Reshma)', value: state.flags.reshmaDefected ? 'পালিয়ে গেছে (DEFECTED)' : 'দোকান সামলাচ্ছে (MANAGING STORES)', statusClass: 'neutral' },
              { label: 'নয়ন (Noyon)', value: 'দূরত্ব (DISTANT)', statusClass: 'warning' },
              { label: 'কালাম (Kalam)', value: 'নিয়ন্ত্রিত (RESTRAINED)', statusClass: 'safe' },
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
        label: 'ভারসাম্য ধরে রাখা (Hold the balance)',
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
              { label: 'হাতে নগদ (Cash)', value: '৳██████', statusClass: 'redacted' },
              { label: 'ডিপো (Suppliers)', value: 'অস্থির সরবরাহ (UNSTABLE)', statusClass: 'warning' },
              { label: 'লাইনম্যান (Crew)', value: '১৭ জন রিক্রুট (17 RUNNERS)', statusClass: 'neutral' },
              { label: 'রেশমা (Reshma)', value: state.flags.reshmaDefected ? 'পালিয়ে গেছে (DEFECTED)' : 'অস্থির (RESTLESS)', statusClass: 'warning' },
              { label: 'নয়ন (Noyon)', value: 'ক্লান্ত (TIRED)', statusClass: 'warning' },
              { label: 'কালাম (Kalam)', value: 'নজর রাখছে (WATCHING)', statusClass: 'danger' },
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
    locationName: 'কারওয়ান বাজার ও সদরঘাট (Karwan Bazar & Sadarghat)',
    locationArea: 'Dhaka',
    factTag: 'real',
    tickerId: 'T-10',
    archiveIds: ['A-13'],
    getSetupText: () =>
      "Following the August 2024 political upheaval, police stations across Dhaka stand burned or half-empty. Traffic police are gone; student volunteers manage intersections in helmets. In the shadows, the drug lines run wide open, and crystal meth ('ice') floods the vacant supply chain. Inspector Haque calls on an encrypted burner, his voice exhausted and predatory: 'The uniform is off for now, Rafiq. But the files never burn.'",
    choices: [
      {
        key: 'A',
        label: 'বেশি মাল বাজারে নামানো (Move more volume)',
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
        label: 'চুপচাপ পর্যবেক্ষণ করা (Stay put)',
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
        label: 'দারোগা হককে খবরের জন্য টাকা দেওয়া (Pay Haque for intel)',
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
    locationName: 'যাত্রাবাড়ী ওয়্যারহাউজ (Jatrabari warehouse)',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-11',
    archiveIds: ['A-14'],
    getSetupText: () =>
      "Noyon brings a twelve-year-old boy in a torn school shirt to the warehouse door. The boy is clutching a parcel of pink tablets behind his back, shivering. Rafiq looks at him and asks: 'How old are you?' The boy whispers: 'Twelve.' The room falls into dead silence. Rafiq was twelve when his father was crushed in the workshop and the debt began. Noyon stands in the doorway, staring straight through Rafiq: 'Look at him, Rafi. Look at who you became.'",
    choices: [
      {
        key: 'A',
        label: 'বাচ্চাটারে ঘরে পাঠাইয়া ওই বিক্রেতারে কাট করা (Send child home, pay family, cut seller)',
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
        label: 'কিছু না বলে বিক্রেতারে রেখে দেওয়া (Say nothing and keep seller)',
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
        label: 'কালাম আর নয়নের ওপর ছেড়ে দেওয়া (Leave it to lieutenants)',
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
    locationName: 'শাহ আমানত সেতু সংলগ্ন ভাড়া ঘর (Room near Shah Amanat Bridge)',
    locationArea: 'চট্টগ্রাম (Chattogram)',
    factTag: 'real',
    tickerId: 'T-12',
    getSetupText: () =>
      "November 2025. A rented, humid room near Shah Amanat Bridge in Chattogram. The highway hums outside in the dark. Beside the bed sits a duffel bag of bank packets and an unread SMS from an old number in Mirpur. Footsteps pause on the wooden landing outside. A slow, heavy knock echoes through the door.",
    choices: [
      {
        key: 'A',
        label: 'থানায় গিয়ে আত্মসমর্পণ করা (Walk into thana and surrender)',
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
        label: 'টাকা দিয়ে নতুন নামে পালিয়ে যাওয়া (Pay for a way out and disappear)',
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
        label: 'সামনে এগিয়ে যাওয়া (Keep going)',
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
