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
    locationName: 'মিরপুরের ঘর (Home)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    tickerId: 'T-01',
    archiveIds: ['A-02'],
    getSetupText: () =>
      "সাভারের রানা প্লাজা কারখানা ধসের দুই সপ্তাহ পর মিরপুরের পোশাকপল্লীর প্রতিটা পরিবার আতঙ্কে। কারখানার লেদ মেশিনের দুর্ঘটনায় রফিকের বাবার শরীর ভেঙে গেছে, আর কাজ করার ক্ষমতা নাই। হাসপাতালের দাবি ১৫,০০০ টাকা।\n\nআমেনা কারখানার আইডি হাতে দরজার কাছে দাঁড়াইয়া, ক্লান্ত গলায় কয় — “রফিক, কিছু একটা ভাবতে পারবি?”\n\nরফিকের বয়স ১৪, অঙ্কে তুখোড়; কাঠের ট্রাঙ্কের ওপর তার বীজগণিতের খাতা খোলা পড়ে রইছে।",
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
    locationName: 'গুদারাঘাট বাজার এলাকা (Gudaraghat Bazar)',
    locationArea: 'Mirpur-1, Dhaka',
    factTag: 'fictional',
    getSetupText: () =>
      "চা স্টলের পাশে রফিকের বিষণ্ণ মুখ খেয়াল করে দুই বছরের বড় বাবু। গলির মুখে শিরীন আর অন্য মেয়েরা ভারী স্কুলব্যাগ নিয়া কোচিংয়ের কথা বলতে বলতে চইলা যায়।\n\nবাবু প্যাকেজটা হাতে দিয়া আস্তে কয় — “এই ছোট প্যাকেজটা তিন গলি পার হইয়া দোকানে দিয়া আয়। দুইশ টাকা। কোনো প্রশ্ন নাই।”",
    choices: [
      {
        key: 'A',
        label: 'প্যাকেজটা দোকানে দিয়া আসা (Deliver the parcel — ৳200)',
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
        resultText: 'বাবু হালকা হাসি দিয়া কয় — “নরমাল কাজের টাকা মাসে পায়। একটু ভাব।”',
        execute: (state) => ({
          state: {
            ...state,
            stats: {
              ...state.stats,
              loyalty: Math.min(100, Math.max(0, state.stats.loyalty + 5)),
              morality: Math.min(100, Math.max(0, state.stats.morality + 5)),
            },
          },
          resultText: 'বাবু হালকা হাসি দিয়া কয় — “নরমাল কাজের টাকা মাসে পায়। একটু ভাব।”',
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
      "হাসপাতালের শেষ লাল নোটিশটা আসে। ওষুধের দোকান বাকি দেওয়া বন্ধ করে। দরজায় আইসা বাবু আরেকটা বড় অফার দেয়।\n\nবাবু হালকা হাসি দিয়া কয় — “পাঁচশ টাকা। নে।”",
    choices: [
      {
        key: 'A',
        label: '“পাঁচশ টাকা। নে।” (Take the 500 Tk)',
        resultText: 'রফিক টাকাটা হাতে নেয়। বাবু কোনো কথা কয় না।',
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
          resultText: 'রফিক টাকাটা হাতে নেয়। বাবু কোনো কথা কয় না।',
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
      "পকেটে নতুন কড়কড়ে টাকার নোটগুলো চেপে ধরে রফিক। কারখানায় আমেনার এক সপ্তাহের টানা ওভারটাইমের চেয়েও বেশি টাকা। কাঠের পড়ার টেবিলে মরিচা ধরা কম্পাস দেওয়া তার জ্যামিতি বক্সটা পড়ে আছে।",
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
        label: 'মায়ের চোখের দিকে তাকাইয়া মিথ্যা কয় — “এডা টিউশন কইরা কামাইছি মা।” (Lie: made it from tutoring)',
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
      "ইটের দেয়ালে পুরনো ন্যাড়া ফুটবল মারতে মারতে নয়ন দূরে থিকা চিৎকার কইরা কয় — “রফি! কোচ ডাকতেছে! তাড়াতাড়ি আয়!”\n\nকিন্তু রফিক চায়ের দোকানের দিকে ফিরে দাঁড়ায়। বাবু রফিককে গলির অলিখিত নিয়ম শিখায় — “ছোট ছোট অ্যামাউন্ট, চেনা মুখ... স্কুল গেটের কাছে কখনো না।”\n\n১০০ থেকে ২০০ টাকার গাঁজার পুড়িয়া। তার প্রথম খরিদ্দার পাশের গলির বড় ছেলেরা।",
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
      "ক্লাস টেনের তানভীর গলির কোণায় কাঁপতেছে। সুদের মহাজনরা ওর বড় ভাইকে মারধোর করছে।\n\nতানভীর হাত জোড় কইরা কয় — “রফিক ভাই, মায়ের কসম, মাসের শেষে টাকা দিমু। একটু বাকিতে দেন না প্লিজ।”\n\nদূরে লাইব্রেরির সামনে দিয়ে শিরীন হেঁটে চলে যায়।",
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
        label: 'শক্ত গলায় কয় — “বাকি নাই। ক্যাশ অনলি।” (Refuse: Cash only)',
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
      "আমেনাকে চেনে এমন এক মুদি দোকানি হাতাহাতি লেনদেন দেখে সন্দেহভাজন চোখে এগিয়ে আসে, এপ্রন দিয়ে ময়দা মুছতে মুছতে।",
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
        label: 'চাচার সামনে কথা সাজাইয়া কয় — “চাচা, আমার জন্য না... আমার কাজিনের জন্য নিছিলাম।” (Talk his way out)',
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
      "দুইজন বয়স্ক খরিদ্দার এসে দোকানে বাবুর কাছে কোডিনের কাশির সিরাপ খোঁজে — “বাবু, ডাইল আছে?”\n\nবাবু কাঁধ ঝাড়া দিয়া কয় — “মানুষ চায় তো রফিক। আমরা না আনলে অন্য কেউ আনবে।” সে রফিকের দিকে তাকায়, রফিকও সাথে টানবে কি না।",
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
      "মাটির চুলার ওপর চায়ের পানি উপচে পড়ে। দরজার কাছে রফিকের বাটার নতুন চকচকে চামড়ার জুতা দেখে আমেনা থমকে দাঁড়ায়।\n\nআমেনা নতুন জুতা দেখিয়া আস্তে কয় — “এই টাকা কোথা থিকা আসতেছে রফিক?”",
    choices: [
      {
        key: 'A',
        label: 'মিথ্যা বলা: “একটা দোকানে পার্ট-টাইম কাজ করি মা।” (Lie: shop job)',
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
        label: 'অর্ধসত্য: “বাবুকে কিছু ডেলিভারিতে হেল্প করি মা।” (Half-truth: help Babu)',
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
        label: 'চোখ নামিয়া সত্যি কইয়া ফেলে — “রাস্তায় বেচি মা...” (Tell the truth: street)',
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
    locationName: 'ধলপুর, যাত্রাবাড়ী (Dhalpur side)',
    locationArea: 'Jatrabari, Dhaka',
    factTag: 'real',
    tickerId: 'T-03',
    archiveIds: ['A-03', 'A-05'],
    getSetupText: () =>
      "পত্রিকাগুলোতে টেকনাফ সীমান্ত আর গোলাপি ইয়াবার খবরের ছড়াছড়ি। বাবু রফিককে কমলাপুর স্টেশন পার করে যাত্রাবাড়ীর ধলপুরে শুভর আস্তানায় নিয়ে যায়। মিষ্টি চায়ে চুমুক দিয়ে শুভ ঠান্ডা চোখে রফিককে মাপে।\n\nশুভ টেবিলের ওপারে বইসা ঠান্ডা গলায় কয় — “হিসাব বোঝে আর মুখ বন্ধ রাখে — এমন ছেলেই আমার পছন্দ। এই অফার দুইবার আসে না।”",
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
          ? 'গোলাপি ট্যাবলেটের ছোট প্লাস্টিক প্যাকেট'
          : 'শুকনা পাতার মোড়ানো পুড়িয়া';
      return `স্কুলের জ্যামিতি বক্সের নিচ থেকে রফিকের ব্যাগে প্যাকেটটা খুঁজে পায় আমেনা: ${packet}। যেন জ্বলন্ত কয়লা হাতে ধরেছে, এমনভাবে আঙুলে ধরে আমেনা স্তব্ধ হয়ে তাকিয়ে থাকে।`;
    },
    choices: [
      {
        key: 'A',
        label: 'মায়ের পায়ের কাছে বইসা কয় — “সব খুইলা কইছি মা। ওয়াদা করছি থামু। মাফ কইরা দেন।” (Confess & promise to stop)',
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
        label: 'উত্তেজিত হইয়া কয় — “কে ব্যাগে রাখছে জানি না! আপনে সবসময় সন্দেহ করেন কেন?!” (Deny it and shout)',
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
        label: 'চোখের দিকে তাকাইয়া কয় — “বাড়ি চালাইতে এই টাকা লাগে মা। কারখানার বেতন দিয়া চলে না... আপনেও জানেন।” (Family needs money)',
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
    locationName: 'মিরপুর (Mirpur)',
    locationArea: 'Mirpur, Dhaka',
    factTag: 'real',
    archiveIds: ['A-07'],
    getSetupText: () =>
      "মিরপুরের অভিযানে বাবু ধরা পড়ে। থানা থেকে বাবু খবর পাঠায়: জামিনের জন্য পাঁচ হাজার টাকা লাগবে, অথবা হকের সাথে কথা বলতে হবে।\n\nবাবু লকআপ থিকা খবর পাঠায় — “রফিককে কইস... দুইশ টাকা যখন যথেষ্ট ছিল, সেই কথা মনে রাখুক।”",
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
      "২০১৮ সালের মাদকদ্রব্য নিয়ন্ত্রণ আইন পাস হয়: ২০০ গ্রাম ইয়াবার জন্য মৃত্যুদণ্ড বা যাবজ্জীবন। উপার্জনের টাকা দিয়ে রফিক মাটির কলসি সরিয়ে রান্নাঘরে একটা নতুন সাদা ওয়ালটন ফ্রিজ কিনে দেয়।\n\nরফিক নতুন ফ্রিজের দিকে তাকাইয়া মনে মনে কয় — “আমি তো মায়ের দেখাশোনা করছি...”\n\nআমেনা আঙুলে ধূসর সুতা মেখে গুনগুন করা ফ্রিজটার সামনে দাঁড়িয়ে থাকে, যেন ঘরে কোনো লাশ পড়ে আছে। বাতির নিচে একলা বসে রফিক তার বান্ডিল গোনে।",
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
          ? 'দরজায় সিগারেট হাতে দাঁড়ায়া বাবু।'
          : 'দরজাটা ফাঁকা, বাবুর নাম কেউ মুখে আনে না।';
      return `যাত্রাবাড়ীতে হাইওয়ের কাছে একটা ওয়্যারহাউজের পেছনের অংশ ভাড়া নেয় রফিক। চায়ের ফ্লাস্ক হাতে সবার আগে আসে নয়ন, ইস্পাতের শাটারের দিকে তাকিয়ে থাকে। তারপর আসে রেশমা, তীক্ষ্ণ চোখ আর হিসাবের খাতা নিয়ে। তারপর কাশিমপুর জেলের দাগি কালাম। দরজায় ${babuLine}\n\nনয়ন নগদ আর এনফোর্সার ভরা গুদামের ঘরে ঢুইকা, পুরোনো গলায় আস্তে কয় — “রফি...”`;
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
      "টেবিলের ওপর চট্টগ্রামের বাকলিয়ার ট্রানজিট ম্যাপ মেলে ধরে রেশমা।\n\nরেশমা হিসাবের খাতা বন্ধ কইরা তাকায় — “সবকিছু ঢাকার ভিতর দিয়া কেন যাবে যখন বাকালিয়া নিজেই দাঁড়াইতে পারে? তুমি রিস্ক হিসাব করো রফিক... আমি অপরচুনিটি হিসাব করি।”",
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
      "টেকনাফে স্বরাষ্ট্রমন্ত্রীর সামনে একশ’র বেশি গডফাদারের সারেন্ডারের দৃশ্য চায়ের দোকানের টিভিতে ভেসে ওঠে। মধ্যরাতে শুভর ফোন আসে।\n\nশুভ ফোনের ওপাশ থিকা ঠান্ডা গলায় কয় — “বড় গডফাদাররা টেকনাফে সারেন্ডার কইরাছে... তাই ছোট খেলোয়াড়দের দ্বিগুণ দিতে হয়। হাইওয়েতে কিছুই বদলায় নাই রফিক, শুধু শ্বাস নেওয়ার দাম বাড়ছে।”",
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
    locationName: 'জেনেভা ক্যাম্প ও মিরপুর (Geneva Camp & Mirpur)',
    locationArea: 'মোহাম্মদপুর ও মিরপুরের গলি (Mohammadpur & Mirpur)',
    factTag: 'real',
    tickerId: 'T-08',
    archiveIds: ['A-11'],
    getSetupText: () =>
      "করোনায় পুরো দেশ লকডাউন। গলিতে এক পিস ইয়াবা বিক্রি হয় ২৫০ থেকে ৩০০ টাকায়। কিন্তু কাজ ছাড়া মিরপুরের বহু পরিবারে খাবার নাই।\n\nনয়ন লকডাউনের সময় গলির দিকে তাকাইয়া কয় — “রিকশাওয়ালাদের ঘরে বাচ্চাগুলার খাওয়ার কিছু নাই রফি। এত টাকা দিয়া কী হবে যদি চোখের সামনে গলিটার মানুষ না খাইয়া মরে?”",
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
      "মেজর সিনহা হত্যাকাণ্ডের পর যখন চারদিকে বন্দুকযুদ্ধের খবর, তখন রফিকের নেটওয়ার্কের এক লাইনম্যান টাকা চুরি করতে গিয়ে ধরা পড়ে।\n\nনয়ন কালামের প্রস্তাব শুনিয়া মাথা নাড়াইয়া কয় — “ওর বাবার লগে কথা বলা উচিত রফি। তুই আগে এভাবে সমস্যা সমাধান করতিস না।”\n\nকালাম ঠান্ডা চোখে তাকাইয়া কয় — “কাম সোজা থাকতে প্যাচান ক্যান ভাই? এক দুপুর মাইক্রোবাসের পিছে কাটাইয়া আসলেই পুরা হাইওয়ে সোজা হইয়া যাইব।”",
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
      "২০২৪-এর আগস্টের পর ঢাকার থানাগুলো পুড়ে ছাই। রাস্তায় ট্রাফিক পুলিশ নাই, মাথায় হেলমেট পরা ছাত্ররা মোড় সামলায়। শূন্য রাস্তায় বরফ (আইস) আর ইয়াবার লাইন উন্মুক্ত।\n\nএনক্রিপ্টেড বার্নার ফোনে ইন্সপেক্টর হক আস্তে কয় — “ইউনিফর্ম এখন খোলা রফিক। কিন্তু ফাইল কখনো পোড়ে না।”",
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
      "ছেঁড়া স্কুল শার্ট পরা বারো বছরের এক বাচ্চাকে গুদামের দরজায় নিয়ে আসে নয়ন। ছেলেটা পেছনে এক প্যাকেট গোলাপি ট্যাবলেট আঁকড়ে ধরে শীতে কাঁপছে।\n\nরফিক বারো বছরের ছেলেটার দিকে তাকাইয়া জিজ্ঞাসা করে — “তোর বয়স কত?”\nছেলেটা চোখ নামিয়া কয় — “বারো।”\nরফিক নিজেও বারো বছরের ছিল যখন কারখানায় বাবার হাত গুঁড়ো হয়ে ঋণ শুরু হয়েছিল।\n\nনয়ন এক পা এগাইয়া আস্তে কয় — “ওর দিকে তাকা রফি। তুই কী হইয়া গেছিস দেখ।”",
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
      "২০২৫ সালের নভেম্বর। চট্টগ্রামের শাহ আমানত ব্রিজের কাছে একটা স্যাঁতসেঁতে ভাড়া ঘর। অন্ধকারে বাইরে হাইওয়ের গাড়ি চলার শব্দ। বিছানার পাশে টাকার বান্ডিলভর্তি ডাফল ব্যাগ আর মিরপুরের এক পুরনো নম্বর থেকে আসা অপঠিত এসএমএস। কাঠের পাটাতনে কারও ভারী পায়ের আওয়াজ থেমে যায়।\n\nরাতের বেলা শাহ আমানত ব্রিজের কাছে ভাড়া করা ঘরের দরজায় ভারী নক পড়ে।",
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
