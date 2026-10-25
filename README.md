# Game Design & Development Document: "Untitled Dhaka Crime Game"

## 1. Project Overview

**Working Title:** The Hustle (placeholder — rename as desired)

**Genre:** Narrative choice-driven visual novel / text-based simulation

**Platform:** Web browser (HTML/JS), built for rapid autonomous development

**Engine/Tech Recommendation:** Twine (for narrative branching prototype) OR a lightweight custom web app using React + a JSON-based story/state engine. For autonomous agent development, the custom React + JSON approach is recommended since it is easier for AI agents to extend, debug, and add systems (stats, save/load, endings) in a structured codebase rather than Twine's proprietary format.

**Core Pitch:** A slow-burn coming-of-age crime drama set in real Bangladesh between 2013 and 2025. The player is Rafiq, a schoolboy from Mirpur in Dhaka, who is pulled from a family medical debt into the drug trade. Over twelve in-game years he rises from selling weed for 100 to 200 taka, to yaba, to a supply chain that runs from Dhaka down the Chattogram highway to Cox's Bazar and Teknaf. Real events of those years change the rules around him: the Rana Plaza collapse, the 2018 anti-drug drive, the 2018 death-penalty law, the 2020 Teknaf surrender, the COVID-19 lockdown and the 2024 political upheaval. It is not an open-world action game. It is a stats-driven choice narrative in the tone of Papers Please and This War of Mine, not GTA.

**Target Experience:** Players should feel the weight of each choice. There is no "win" state in the traditional sense, only different outcomes, ranging from utter ruin to empire to redemption, each earned through accumulated decisions rather than a single ending flag.

### 1A. Real-World Anchor and the In-Game Archive

The story is fiction told inside documented history. Rafiq, his family, his crew and every police officer in the game are invented. The years, laws, crackdowns, places and aggregate figures around them are real and are traced to the published sources in Section 10. The aim is that an older Bangladeshi who lived through the Phensedyl years, the 2018 drive or the Teknaf headlines can open the game, ask 'what is this, what is the history?', and find the answer inside the game.

**Features the build must include:**

- Era Banner: a title card at the start of each stage with the year, Rafiq's age and the area, using the text given at the start of each stage in Section 9.
- News Ticker: a one-line strip above each scene that has a ticker ID. Ticker text is in Section 10.
- Fact Tag: a small label on every scene, either 'Based on real events' or 'Fictional', as marked in each scene header in Section 9.
- History button: on every scene that has an Archive ID, a button labelled What's the history? opens that Archive entry in a side panel without leaving the scene.
- Archive screen: reachable from the main menu and the pause menu. It lists unlocked entries by year with title, summary and sources, and shows a locked placeholder for the rest. An entry unlocks when its scene is reached and stays unlocked across playthroughs (browser local storage).
- Timeline view: one screen with 2013 to 2025 on a single axis, real events as markers in the top row and Rafiq's own milestones in the bottom row.
- Sources screen: every source in Section 10 with title, publisher and link.

**Rules for using real history:**

1. Real events appear only as ticker lines, Archive entries and background dialogue. The player never meets a real private individual and the script never names one. The only named person in the Archive is a victim, covered respectfully (entry A-12).
2. Where official accounts and rights groups disagree, as with the 2018 deaths, the Archive shows both and labels who said what.
3. Figures are used only as written in Section 10, with attribution. Do not add figures from memory.
4. Real neighbourhoods are settings, not accusations. The script must never say that the residents of a place deal drugs. Streets, shops and buildings inside a real neighbourhood are fictional.
5. No operational detail: no concealment methods, no production or dosing information, no routes beyond the place names used in published reporting.

**Places used (real places, fictional events inside them):**

| Place | Used for | Scenes |
| --- | --- | --- |
| Mirpur (Gudaraghat Bazar area, Kalshi, Jhilpar area near Haji Road) | Rafiq's home, school and first dealing | S1-1 to S2-5, S3-2, S3-3, S3-4 |
| Jatrabari (Dhalpur side, Dhaka-Chattogram highway) | Shuvo's base and the crew warehouse | S3-1, S4-1, S4-3, S5-2 |
| Mohammadpur (Geneva Camp) | Lockdown backdrop | S4-4 |
| Kamalapur station, Sadarghat launch ghat, Karwan Bazar, Old Dhaka, Kamrangirchar | Transit and market backdrops | S3-1, S4-6, S5-1 |
| Chattogram (Bakalia, Shah Amanat Bridge) | Middle of the supply chain | S4-2, S5-3 |
| Cox's Bazar and Teknaf (Naf River, Shah Porir Dwip, Shamlapur) | The border end of the chain, seen only through news | S4-3, S4-5 |
| Savar | Rana Plaza, news only, no scene is set there | S1-1 |

## 2. Story Structure

The game has five stages. Each is tied to a span of real years, Rafiq's age and a real area of Bangladesh. Each stage raises the stakes and narrows or widens the player's paths based on earlier choices. Scene-level detail for every stage is in Section 9.

**Stage 1: School Days (2013 to 2015, Rafiq is 14 to 16, Mirpur, Dhaka).** Rafiq is a quiet schoolboy who is good at math, in a working-class Mirpur lane. In April 2013 the Rana Plaza collapse in Savar fills the news and frightens every garment-worker household, including his mother Amena's. A workshop accident leaves his father unable to work and the family owes 15,000 taka in medical bills. Babu, a neighbourhood fixer two years older than Rafiq, offers 200 taka for one delivery. Choices here set Loyalty, Morality and the first traces of Heat.

**Stage 2: First Hustle (2015 to 2017, Rafiq is 16 to 18, Mirpur Kalshi and Jhilpar areas).** Rafiq learns to sell weed in lots of 100 to 200 taka to known buyers, taught by Babu. Older customers still ask for Phensedyl, the codeine cough syrup that swept Bangladesh in the 1980s and 1990s. His first moral lines are drawn: who to sell to, whether to give a classmate credit, how to answer his mother. The stage ends with Amena asking where the new shoes and new calm came from.

**Stage 3: The Climb (2017 to 2018, Rafiq is 18 to 20, Mirpur and Jatrabari).** After the August 2017 refugee influx on the south-east border, yaba is flooding into Dhaka. Shuvo, who runs a Jatrabari operation, offers Rafiq a place in the yaba trade. In May 2018 the government launches a nationwide anti-drug drive. Authorities call the deaths that follow gunfights and rights groups call many of them extrajudicial killings. Rafiq meets Inspector Haque during a raid, Amena discovers the truth, Babu is arrested, and in October parliament passes a law that makes 200 grams or more of yaba punishable by death or life in prison. Heat becomes the central stat.

**Stage 4: Empire (2019 to 2022, Rafiq is 20 to 23, Jatrabari, Chattogram and Teknaf).** Rafiq runs a crew from a Jatrabari warehouse and his supply chain stretches down the Dhaka to Chattogram highway towards Cox's Bazar and Teknaf. In February 2020 more than a hundred listed yaba godfathers surrender at a ceremony in Teknaf, and Shuvo uses the moment to squeeze Rafiq. The COVID-19 lockdown pulls police off the streets. After a retired army major is shot at a Teknaf checkpoint in July 2020, the whole country looks at the word gunfight. Choices cover Reshma's ambition, Shuvo's ultimatum, Kalam's methods and how to hold an empire.

**Stage 5: Reckoning (2023 to 2025, Rafiq is 24 to 26, Dhaka and Chattogram).** After the political upheaval of August 2024 policing is thin and the trade is flush. Reports describe ice rising alongside yaba, police personnel in Chattogram drawn into the yaba chain, and children used as carriers. Rafiq confronts what his network has become. Three final scenes (S5-1 to S5-3) lead into the ending resolution in Section 9, which pulls in named characters and choices from earlier stages.

## 3. Core Gameplay Loop

At each major story beat, the player is presented with a scene (narrative text plus optional simple illustration) and a set of 2 or 3 choices (a few scenes have one or none, as marked in Section 9). Choices are not simply "good" or "bad"; they trade off between the four core stats below. There is no combat system and no real-time action; all tension is delivered through narrative pacing, stat consequences, and delayed payoffs (a choice made in Stage 2 can resurface as a consequence in Stage 4).

Secondary loop: periodic "status check" screens between major beats show the player's current stats and also show the stage Ledger. Nothing is random in this build: scripted consequences (a police raid, a rival's betrayal, a family member finding out) are triggered by the exact stat and flag conditions in Section 9.

## 4. Core Stats System

Four stats track the player's trajectory. **Money** is counted in taka, starts at 0, never drops below 0 and has no maximum. **Loyalty**, **Heat** and **Morality** each run from 0 to 100, are clamped to that range after all changes from a choice are applied, and start at Loyalty 50, Heat 0, Morality 70. The three crew members (Noyon, Reshma, Kalam) also carry a private loyalty number from 0 to 100, set in Scene S4-1.

**Money:** Tracks wealth accumulated. Influences which options are available (bribery, buying protection, expanding operations) and contributes to the "Empire" and "Kingpin" endings.

**Loyalty:** Tracks trust and relationships with crew, family, and friends. Low loyalty increases betrayal events and isolation in the endgame. High loyalty can unlock allies who help the player survive police or rival threats.

**Heat:** Tracks police and law enforcement attention. Rises with risky choices, violence, and expansion; can be lowered through bribery, laying low, or sacrificing others. High heat drives the game toward arrest or death endings.

**Morality (or Guilt):** Tracks the psychological and ethical toll of the player's choices, including harm to family, friends, and the community. Does not block options but shapes internal monologue, available dialogue tone, and is the primary driver of the Redemption ending path.

Design note for the development agent: stats should be modified in small, explainable increments per choice (for example plus five or minus ten), and the documentation for each scene should specify exact stat deltas per choice so the system is fully deterministic and testable.

## 5. Endings

The game supports multiple endings determined by final stat thresholds at the end of Stage 5. Suggested ending set for initial development:

**Caught:** Triggered when Heat reaches 70 or more, whatever the other stats are. The player is arrested; epilogue text covers trial and imprisonment, referencing specific earlier choices.

**Killed in the Turf War:** Triggered by low Loyalty and high Money (envy or betrayal) or by specific high-risk choices made in Stage 4. A violent, consequence-driven end.

**The Untouchable Kingpin:** Triggered by high Money, manageable Heat (kept low through bribery or politics), and low-to-mid Morality. The player has built a lasting criminal empire at significant personal and ethical cost.

**Redemption:** Triggered by high Morality and at least moderate Loyalty, regardless of Money. The player attempts to exit the trade, possibly at great personal cost, and the epilogue reflects an attempt to make amends.

**Ghost (optional fifth ending):** A low Money, low Heat, low everything ending for a player who stayed small-time and simply faded out, neither rising nor falling dramatically. Useful as a baseline or "did nothing" ending.

The exact evaluation order for these endings, including the variants for surrender and escape, is in Section 9 under Ending Resolution. Where this section and Section 9 differ, Section 9 applies.

## 6. Named Characters (final, use these names exactly)

All characters below are fictional and any resemblance to a real person is coincidental. Agents must use these exact names and traits in all scene text and must not invent alternate names.

**Rafiq (the Protagonist):** 14 years old in 2013 (born about 1999) and 26 in the final scene in 2025. Quiet, observant, good at math, wanted to be an engineer before the story's events. Player-controlled, with no fixed personality beyond what the player's choices establish. Lives in Mirpur, Dhaka.

**Amena (the Mother):** Rafiq's mother, a garment factory worker in Mirpur and the family's main income after the father's workshop accident. Represents the Redemption ending's emotional pull. She notices something in Scene S2-5 and learns the full truth no later than Scene S3-3.

**Babu (the First Contact):** A 16-year-old neighbourhood fixer in 2013, two years older than Rafiq, who already moves small amounts of weed. He offers Rafiq the first delivery to help with the medical debt. His state at the end of Stage 3 is stored in the flag babuStatus (loyal, owes or gone), which changes what he says in Stage 4 and in the epilogue.

**Shuvo (the Rival):** Runs a larger operation from Jatrabari, on the Dhalpur side, with a supply line towards Chattogram and Teknaf. Introduced in Scene S3-1 and recurs in Stage 4. Ruthless and business-minded. His state is stored in the flag shuvoStatus (paid, war or peace).

**Inspector Haque (the Officer):** A police inspector at the fictional Jhilpar Outpost in Mirpur. No real police station or officer is depicted. First meets Rafiq in Scene S3-2. Open to bribes, and his prices rise by half once the flag haqueOwnsYou is set. Can become a recurring extortionist or, in the Redemption path, the person Rafiq surrenders to.

**The Crew (recruited in Scene S4-1):** Noyon, a loyal childhood friend of Rafiq's, starting crew loyalty 80. Reshma, a sharp and ambitious recruit, starting crew loyalty 40, who defects in a turf war if her crew loyalty is below 50. Kalam, an older ex-convict who handles violence, starting crew loyalty 50, whose use raises Heat.

## 7. Tone, Sensitivity, and Research Notes

This game deals with real social issues in Bangladesh: youth drug involvement, yaba trafficking, police corruption and the killings of the 2018 drive. Aim for social realism and consequence, never glorification. Show the human cost of Rafiq's choices on his family, on drug users and on himself. Keep the historical record accurate, attributed and even-handed, as set out in Section 1A. Treat the neighbourhoods of Dhaka with dignity: this is a story about poverty, policing and borders, not about the people who live in a place.

The development team or agent must not include real, actionable instructions on producing drugs, concealing or moving them, or evading law enforcement. Keep all such content at the level of narrative summary, for example 'he made the delivery and got paid'. Scene S5-2 and Archive entry A-14 involve children: no child is ever shown in danger on screen and no method of using children is described. After every ending, show the Help screen: the Department of Narcotics Control runs treatment services, including the Central Drug Addiction Treatment Centre in Dhaka, and licensed private centres also exist (Archive entry A-15). The owner will add a verified helpline number before release.

## 8. Technical Implementation Notes for Autonomous Agents

**Recommended stack:** React (frontend), a single JSON or TypeScript data file defining all scenes, choices, and stat deltas, and simple local state management (no backend required for an initial playable prototype). Save/load can use browser local storage.

**Data structure:** Each scene is an object with: id, stage, year, month, location (name and area), factTag ('real' or 'fictional'), tickerId (optional), archiveIds (optional array), setup text, and choices. Each choice has: label, resultText, a requires block (for example minMoney or a flag condition), an effects block (deltas for Money, Loyalty, Heat, Morality, flag changes and crew-loyalty changes) and next (a scene id). Conditional effects, for example 'if Loyalty is 50 or more', are written as an array of if/then/else objects so the engine contains no scene-specific code. Archive entries are objects with id, year, title, summary, sourceIds, unlockSceneId and sensitive (boolean). Sources are objects with id, title, publisher and url. All text strings live in one i18n JSON file from day one so a Bangla translation can be added later without code changes.

**Build order for agents:** First, the state engine with stat clamping and flags, tested against the seven reference playthroughs in Section 9. Second, the scene player reading every scene in Section 9. Third, the ending resolution in Section 9. Fourth, the Archive, ticker, fact tag, history button, timeline view and sources screen from Section 1A, using the data in Section 10. Fifth, the Help screen. Sixth, art, styling and sound, only after steps one to five pass.

**Minimum viable product definition:** A playable, text-based version of all five stages (every scene in Section 9), a working stat and flag system, all five endings reachable and distinguishable (proven by the seven reference playthroughs in Section 9), and the Archive, News Ticker, Fact Tag and Help screen from Section 1A. Art and polish are out of scope for the MVP and should only be attempted after the MVP is confirmed playable end to end.

## 9. Scene Scripts, Exact Numbers and Rules (authoritative)

Every number, name, date and flag in this section is final. Implement it exactly as written and do not rebalance, rename or add scenes. Scenes are played in the order shown. Each scene header gives the date, place, Fact Tag, Ticker ID and Archive ID (see Sections 1A and 10).

**Global rules:**

1. Starting values: Money 0, Loyalty 50, Heat 0, Morality 70.
2. Money is whole taka, minimum 0, no maximum. Loyalty, Heat and Morality run from 0 to 100 and are clamped after all changes of a choice are applied.
3. An 'if' in a table is evaluated on the values at the moment the choice is made, before that choice's own changes. Percent changes use the Money value before the choice and round down.
4. A choice that costs more Money than the player has is shown greyed out and cannot be picked. Every scene keeps at least one choice with no Money cost, so the game can never dead-end.
5. A Ledger line at the end of a stage is applied automatically after the stage's last scene, with a short ledger screen showing the change in Money.
6. Every bribe price paid to Haque is multiplied by 1.5 (rounded down) once the flag haqueOwnsYou is true.
7. Result text in quotes is shown after the choice, exactly as written. Setup text is the scene text. It may be lightly edited for style, but no fact, name or date in it may change.

**Flags (all start at the default shown):**

| Flag | Values | Default | Set in |
| --- | --- | --- | --- |
| fronted | true or false | false | S2-2 choice A |
| trade | none, weed or yaba | none | S3-1 |
| haqueBribed | true or false | false | S3-2 choice A |
| informedOnShuvo | true or false | false | S3-2 choice C |
| arrestedOnce | true or false | false | S3-2X |
| attemptedQuit | true or false | false | S3-3 choice A |
| haqueOwnsYou | true or false | false | S3-4 choice B |
| babuStatus | none, loyal, owes or gone | none | S3-4 |
| shuvoStatus | none, paid, war or peace | none | S4-3 |
| reshmaDefected | true or false | false | S4-3 choice B |
| kalamViolence | true or false | false | S4-5 choice A |
| path | none, control, fronts or drift | none | S4-6 |
| childrenProtected | true or false | false | S5-2 choice A |
| surrendered | true or false | false | S5-3 choice A |
| fled | true or false | false | S5-3 choice B |

Crew loyalty values (Noyon, Reshma, Kalam) are separate numbers from 0 to 100, set in S4-1.

### Stage 1: School Days (2013 to 2015)

Era Banner: Mirpur, Dhaka. 2013. Rafiq is 14.

**S1-1 The Bill.** May 2013, Mirpur. Fact Tag: Based on real events. Ticker T-01. Archive A-02.

Setup: Two weeks after the Savar factory collapse, every garment-worker household in the lane is on edge. Rafiq's father was hurt in a workshop accident and cannot work. The hospital wants 15,000 taka. Amena stands in the doorway with her factory ID still around her neck and asks Rafiq if he can think of anything.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. I will find the money, Ma. | Amena nods and says nothing. She does not believe it yet. | 0 | +5 | 0 | 0 | S1-2 |
| B. That is not something I can fix. | The door closes softly. It is worse than a slam. | 0 | -10 | 0 | -5 | S1-2 |

**S1-2 Babu's Offer.** June 2013, Gudaraghat Bazar area, Mirpur-1. Fact Tag: Fictional. No ticker, no Archive.

Setup: Babu, two years older and always near the tea stalls, notices Rafiq's face. He offers 200 taka to carry a small package to a shop three lanes away. No questions asked.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Accept the delivery | The package is light. The 200 taka is not. | +200 | 0 | +2 | -5 | S1-3 |
| B. Refuse and ask for a normal job | Babu laughs, not unkindly. 'Normal jobs pay in a month. Think about it.' | 0 | +5 | 0 | +5 | S1-2B |

**S1-2B A Week Later.** Only reached from S1-2 choice B. Fact Tag: Fictional.

Setup: The hospital sends a final notice. Babu is at the door with a bigger offer: 500 taka. There is one choice.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Take it | Rafiq takes it. Babu does not say I told you so. | +500 | -5 | +4 | -10 | S1-3 |

**S1-3 First Taste of Cash.** July 2013, Mirpur. Fact Tag: Fictional. Let X be Rafiq's Money at the start of this scene (200 or 500).

Setup: Rafiq holds more cash than he has ever held. It is more than Amena earns in a week at the factory.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Give it all to Amena | She asks no question, and that is how he knows she suspects something. | -X | +15 | 0 | +10 | Stage 2 |
| B. Give half and keep half | Half is honest enough, he tells himself. | -floor(X / 2) | +5 | 0 | 0 | Stage 2 |
| C. Keep it all and say it came from tutoring | The lie comes easily, which is the problem. | 0 | -15 | 0 | -10 | Stage 2 |

Stage 1 has no Ledger. Show a time card: School years pass.

### Stage 2: First Hustle (2015 to 2017)

Era Banner: Mirpur, Kalshi and Jhilpar areas. 2015. Rafiq is 16.

**S2-1 Learning the Trade.** March 2015, Mirpur Kalshi area. Fact Tag: Fictional. Archive A-04.

Setup: Babu teaches Rafiq the rules of the lane: small amounts, familiar faces, never near the school gate. Weed sells in lots of 100 to 200 taka. Rafiq's first customers are older boys from the next lane.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Known buyers only | Slow money and quiet lanes. | +300 | 0 | +2 | 0 | S2-2 |
| B. Sell to strangers for faster cash | The money is faster. So are the looks. | +600 | 0 | +8 | 0 | S2-2 |

**S2-2 A Classmate Asks.** September 2015, Mirpur. Fact Tag: Fictional.

Setup: Tanvir from class 10 is in trouble at home. He asks Rafiq to let him take a small amount on credit and swears he will pay by the end of the month.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Let him have it on credit | Rafiq keeps the amount in his head, not in a book. | -100 | +5 | 0 | 0 | S2-3. Set fronted = true |
| B. Refuse, cash only | Tanvir walks away. Rafiq makes a sale elsewhere that day. | +100 | 0 | 0 | -5 | S2-3 |

**S2-3 Close Call.** February 2016, a market lane in Mirpur. Fact Tag: Fictional.

Before the setup text, resolve the credit: if fronted is true and Loyalty is 55 or more, Money +150 and show 'Tanvir pays, with thanks.' If fronted is true and Loyalty is below 55, Loyalty -5 and show 'Tanvir stops coming to school.'

Setup: A shopkeeper who knows Amena sees a hand-off near his stall and starts walking over.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Run | Rafiq leaves the buyer standing there and does not look back. | 0 | -5 | 0 | 0 | S2-4 |
| B. Talk his way out: it was for my cousin | The shopkeeper half believes him, which is enough. | 0 | 0 | -2 | -5 | S2-4 |

**S2-4 The Syrup Customers.** October 2016, a rail-line tea stall in Mirpur. Fact Tag: Based on real events. Ticker T-02. Archive A-01.

Setup: Two older men ask Babu for dyl, the codeine cough syrup that was everywhere when they were young. Babu can get it. He looks at Rafiq to see whether Rafiq will carry it too.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Carry it | Rafiq tells himself it is only cough syrup. | +400 | 0 | +5 | -5 | S2-5 |
| B. Refuse | Babu shrugs, but he remembers. | 0 | -5 | 0 | +5 | S2-5 |

**S2-5 Amena Notices.** April 2017, home in Mirpur. Fact Tag: Fictional.

Setup: Amena notices the new shoes and the new calm in Rafiq's face and asks where the money is coming from.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Lie: a part-time job at a shop | She lets it go, and he sees that it costs her something. | 0 | -10 | 0 | 0 | Ledger, Stage 3 |
| B. Half-truth: I help Babu with deliveries | She hears what she needs to hear. | 0 | -5 | 0 | 0 | Ledger, Stage 3 |
| C. Tell the truth, if Morality is 50 or more | She is silent for a long time, then takes his hand. | 0 | +20 | 0 | +10 | Ledger, Stage 3 |
| C. Tell the truth, if Morality is below 50 | She stands up and leaves the room without a word. | 0 | -20 | 0 | +10 | Ledger, Stage 3 |

**Stage 2 Ledger:** Money +4,000. Ledger text: The hospital debt is paid. Nobody says where the last of it came from. (The 4,000 is two years of weed income, net of what Rafiq gave towards the debt.)

### Stage 3: The Climb (2017 to 2018)

Era Banner: Mirpur and Jatrabari. 2017. Rafiq is 18.

**S3-1 Shuvo's Territory.** September 2017, Jatrabari, Dhalpur side. Fact Tag: Based on real events. Ticker T-03. Archives A-03 and A-05.

Setup: The news is full of refugees on the south-east border and of yaba. Babu takes Rafiq across the city, past Kamalapur station, to meet Shuvo, who runs the pill trade on this side of Jatrabari and likes good boys from Mirpur. Shuvo offers Rafiq a place as a sub-distributor.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Accept and start with yaba | Shuvo smiles. Rafiq does not take anything himself and tells himself that matters. | +1000 | 0 | +15 | -15 | S3-2. Set trade = yaba |
| B. Decline and stay with weed | Shuvo says the offer will not come twice. | 0 | 0 | 0 | +10 | S3-2. Set trade = weed |

**S3-2 The Raid.** May 2018, Jhilpar area, Mirpur. Fact Tag: Based on real events. Ticker T-04. Archive A-06.

Setup: The government has launched a nationwide anti-drug drive. Police and RAB sweep the lanes near Jhilpar. At a corner, Inspector Haque of Jhilpar Outpost stops Rafiq and looks at him for a long time.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Offer a 2,000 taka bribe | Haque counts it without looking down. 'Good. Walk.' | -2000 (greyed out if Money is below 2,000) | 0 | -10 | 0 | S3-3. Set haqueBribed = true |
| B. Refuse and run | Rafiq runs. | 0 | -5 (skip if S3-2X is triggered) | +20 | 0 | If Heat was 30 or more before this choice, go to S3-2X. Otherwise S3-3 |
| C. Give Haque a name instead | Haque writes it down. The name is Shuvo's. | 0 | -10 | -5 | 0 | S3-3. Set informedOnShuvo = true |

**S3-2X Held.** Only reached from S3-2 choice B. Fact Tag: Fictional. There is no choice.

Setup: Rafiq spends three nights at the thana. Amena pays a bail she cannot afford.

Effects: Money -min(Money, 5000), Loyalty -10, Heat -30, set arrestedOnce = true. Next: S3-3.

**S3-3 Amena's Discovery.** June 2018, home in Mirpur. Fact Tag: Fictional.

Setup: Amena finds packaging in Rafiq's bag. If trade is yaba, it is a small plastic packet of pink tablets. If trade is weed, it is a folded paper of dry leaves. She holds it up and says nothing.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Confess everything and promise to stop | She cries and he promises. It is the truest thing he says that year. | 0 | +10 | 0 | +15 | S3-4. Set attemptedQuit = true |
| B. Deny it and shout | She stops asking. That is worse. | 0 | -25 | 0 | -10 | S3-4 |
| C. Confess, but say the family needs the money | She is quiet for a long time. Then she asks him to be careful. | 0 | -5 | 0 | +5 | S3-4 |

**S3-4 Babu's Mistake.** October 2018, Mirpur. Fact Tag: Based on real events. Archive A-07.

Setup: Babu is picked up in a sweep of the Mirpur lanes. He sends word from the thana: bail is 5,000 taka, or someone has to speak to Haque.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Pay his 5,000 taka bail | Babu does not forget it. | -5000 (greyed out if Money is below 5,000) | +20 | 0 | 0 | S3-5. Set babuStatus = loyal |
| B. Ask Haque to make it go away | Haque makes a call. Now he knows what Rafiq will do for a friend. | 0 | 0 | -5 | 0 | S3-5. Set haqueOwnsYou = true and babuStatus = owes |
| C. Do nothing | Nobody in Mirpur says Babu's name around Rafiq again. | 0 | -30 | 0 | -15 | S3-5. Set babuStatus = gone |

**S3-5 First Real Money.** December 2018, Rafiq's room in Mirpur. Fact Tag: Based on real events. Ticker T-05. Archive A-08. There is no choice, only a Continue button.

Setup: Parliament has passed a new narcotics law. Yaba is now Class A and 200 grams or more can mean death or life in prison. It takes effect on 27 December. Rafiq counts his money alone in his room.

Reflection text: if Morality is 50 or more, show 'He thinks of Amena at the door and his hands are not steady.' Otherwise show 'He counts twice. He sleeps well. That frightens him more than the law.'

**Stage 3 Ledger:** if trade is yaba, Money +20,000. If trade is weed, Money +6,000. If attemptedQuit is true, multiply that amount by 0.75 and round down before adding.

### Stage 4: Empire (2019 to 2022)

Era Banner: Jatrabari, Chattogram and Teknaf. 2019. Rafiq is 20.

**S4-1 Building the Crew.** February 2019, a warehouse in Jatrabari near the Dhaka-Chattogram highway. Fact Tag: Based on real events. Ticker T-06. Archive A-09. There is no choice, only a Continue button.

Setup: Rafiq rents a corner of a warehouse. Noyon arrives first. Then Reshma, sharp and quick with numbers, who knows who to ask. Then Kalam, older, silent, recently out of jail. If babuStatus is loyal or owes, Babu stands by the door. If it is gone, the doorway is empty and nobody mentions it.

Effects: set crew loyalty Noyon 80, Reshma 40, Kalam 50.

**S4-2 Reshma's Ambition.** June 2019, Bakalia area, Chattogram. Fact Tag: Fictional.

Setup: Reshma wants to open a new neighbourhood in Chattogram without Rafiq watching every step. She says the profit will be big. She does not say what happens if it goes wrong.

| Choice | Result text | Money | Loyalty | Heat | Morality | Crew and next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Approve it, if Loyalty is 50 or more | It works. Reshma hands over the share on time and looks a little surprised that Rafiq expected it. | +15000 | 0 | +5 | 0 | Reshma +10. Next S4-3 |
| A. Approve it, if Loyalty is below 50 | Reshma keeps the money and does not pretend otherwise. | 0 | -10 | +5 | 0 | Reshma -30. Next S4-3 |
| B. Deny it and keep operations central | Reshma nods and starts counting how long she will wait. | 0 | 0 | 0 | 0 | Reshma -10. Next S4-3 |

**S4-3 Shuvo's Ultimatum.** February 2020, the Jatrabari warehouse. Fact Tag: Based on real events. Ticker T-07. Archive A-10.

Setup: On television, more than a hundred yaba godfathers file onto a stage in Teknaf to surrender before the Home Minister. Shuvo calls Rafiq the same night. Nothing has changed, he says, except the price of staying in business.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Pay the bigger cut | Shuvo says the number is fair. Rafiq knows what fair means. | -20% of current Money (-40% if informedOnShuvo is true) | 0 | 0 | 0 | S4-4. Set shuvoStatus = paid |
| B. Refuse and prepare for conflict | The lanes go quiet in the way that comes before something. | -10% of current Money, only if Reshma defects | -10 only if Reshma defects | +25 | 0 | S4-4. Set shuvoStatus = war. If Reshma's crew loyalty is below 50, set reshmaDefected = true. Noyon and Kalam stay. Apply Heat first, then the defection check, then Money |
| C. Broker peace with a payment to Haque, so both sides are protected | Haque takes it and calls it a favour. | -10,000 (-15,000 if haqueOwnsYou). Greyed out if Money is below the price or informedOnShuvo is true | 0 | -10 | +5 | S4-4. Set shuvoStatus = peace |

**S4-4 Lockdown.** March 2020, Geneva Camp area in Mohammadpur and the Mirpur lanes. Fact Tag: Based on real events. Ticker T-08. Archive A-11.

Setup: COVID-19 closes the country. Police are pulled to other duties. In the lanes the sellers are back out and a pill goes for 250 to 300 taka. Noyon says half the lane has nothing to eat.

| Choice | Result text | Money | Loyalty | Heat | Morality | Crew and next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Expand while the police are busy | The lanes are loud again. | +8000 if trade is yaba, +3000 if weed | 0 | +10 | -10 | S4-5 |
| B. Stay quiet and protect the crew | A quiet month is not a bad month. | 0 | +10 | -5 | +5 | S4-5 |
| C. Share earnings with families in the lane, Noyon's idea | Noyon carries the bags himself and will not take thanks. | -3000 (greyed out if Money is below 3,000) | +15 | 0 | +10 | Noyon +10. Next S4-5 |

**S4-5 Kalam's Methods.** August 2020, Jatrabari. Fact Tag: Based on real events. Ticker T-09. Archive A-12.

Setup: A week after the news from the Shamlapur checkpoint, one of the dealers in Rafiq's chain is caught skimming. Kalam offers to deal with it his own way. The papers are full of the word gunfight.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Let Kalam handle it | Nobody skims after that. Nobody looks Rafiq in the eye either. | 0 | +5 | +15 | -20 | S4-6. Set kalamViolence = true |
| B. Handle it yourself with a warning | The dealer stays, and stays afraid. | 0 | 0 | 0 | 0 | S4-6 |
| C. Let it go | The money keeps leaking. The crew notices. | -min(5000, Money) | -10 | 0 | 0 | S4-6 |

**S4-6 The Empire's Weight.** 2021 to 2022, Karwan Bazar and Sadarghat backdrops. Fact Tag: Fictional.

Setup: Two years pass in a blur of ledgers and lanes. Rafiq is 22, owns three phones and has one real friend. A decision is waiting.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Push for total control of the routes | Every lane answers to him now. None of them like it. | +30000 if trade is yaba, +10000 if weed | 0 | +20 | 0 | Stage 5. Set path = control |
| B. Move quietly into legitimate shop fronts | A ledger with clean pages, for the first time. | +5000 | 0 | -10 | +5 | Stage 5. Set path = fronts |
| C. Hold the balance | Nothing changes, and he knows that is a choice too. | 0 | 0 | 0 | 0 | Stage 5. Set path = drift |

**Stage 4 Ledger:** if trade is yaba, Money +45,000. If trade is weed, Money +15,000.

### Stage 5: Reckoning (2023 to 2025)

Era Banner: Dhaka and Chattogram. 2023. Rafiq is 24.

**S5-1 The Quiet Streets.** September 2024, Dhaka, Karwan Bazar and Sadarghat backdrops. Fact Tag: Based on real events. Ticker T-10. Archive A-13.

Setup: After the political upheaval of August, many police stations stand half empty. Dealers tell reporters the trade is flowing. Haque calls. He can tell Rafiq what he hears, for a price.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next |
| --- | --- | --- | --- | --- | --- | --- |
| A. Move more volume | The streets are quiet. Rafiq fills the quiet. | +10000 if trade is yaba, +4000 if weed | -5 | +10 | -10 | S5-2 |
| B. Stay put | He lets the opening pass. It feels like cowardice and like sense. | 0 | 0 | -5 | 0 | S5-2 |
| C. Pay Haque for information | Haque talks for ten minutes and sounds tired. | -3000 (-4500 if haqueOwnsYou). Greyed out if Money is below the price | 0 | -10 | 0 | S5-2 |

**S5-2 The Carrier Children.** 2025, the Jatrabari warehouse. Fact Tag: Based on real events. Ticker T-11. Archive A-14 (sensitive). Show nothing on screen beyond a boy standing in a doorway.

Setup: Noyon brings a boy of about twelve to the warehouse. The boy has been running errands for one of Rafiq's sellers. Noyon cannot look at Rafiq.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Send him home, pay his family and cut that seller off | The seller is furious. Noyon exhales for the first time in an hour. | -5000 (greyed out if Money is below 5,000) | -10 | 0 | +20 | S5-3. Set childrenProtected = true |
| B. Say nothing and keep the seller | Nobody argues. That is the problem. | +5000 | 0 | +5 | -20 | S5-3 |
| C. Leave it to Reshma and Kalam | Rafiq tells himself he is delegating. (If reshmaDefected is true, the text says Noyon and Kalam.) | 0 | -5 | 0 | -10 | S5-3 |

**S5-3 The Knock.** November 2025, a rented room near Shah Amanat Bridge, Chattogram. Fact Tag: Based on real events. Ticker T-12.

Setup: Someone is at the door at night. It could be Haque, the Navy, a rival or Amena. Rafiq has a bag of money by the door and an unread message from his mother.

| Choice | Result text | Money | Loyalty | Heat | Morality | Next and flags |
| --- | --- | --- | --- | --- | --- | --- |
| A. Walk into the thana and surrender | He leaves the bag by the door and goes out the back, towards the police. | 0 | +5 | 0 | +15 | Ending Resolution. Set surrendered = true |
| B. Pay for a way out and disappear | The money buys a road and a name that is not his. | -20000 (greyed out if Money is below 20,000) | -10 | -20 | -5 | Ending Resolution. Set fled = true |
| C. Keep going | He opens the door. | +10000 | 0 | +10 | -10 | Ending Resolution |

### Ending Resolution

Evaluate these rules in order after S5-3. The first rule that matches decides the ending.

1. If surrendered is true: Redemption if Morality is 65 or more and Loyalty is 40 or more. Otherwise Caught (surrendered variant).
2. If Heat is 70 or more: Caught.
3. If Loyalty is 20 or less and Money is 50,000 or more: Killed in the Turf War.
4. If fled is true: Ghost (fled variant).
5. If Morality is 65 or more and Loyalty is 40 or more: Redemption.
6. If Money is 80,000 or more: The Untouchable Kingpin.
7. Otherwise: Ghost.

**Core epilogue text for each ending (shown first):**

| Ending | Core text and variants |
| --- | --- |
| Caught | The knock was the police. Rafiq is charged under the 2018 Act, and the epilogue ends on a court date and a long corridor. Surrendered variant: Rafiq walks into the thana himself. The sentence is shorter than it would have been, and he serves it knowing why. |
| Killed in the Turf War | Rafiq is shot in a lane in Jatrabari. The papers give it one line and the word dispute. If shuvoStatus is war, Shuvo's side did it. Otherwise, someone in his own crew did. |
| The Untouchable Kingpin | Rafiq owns the lanes and the silence. Nobody says his name above a whisper, and he has never felt less like himself. If path is control, every route answers to him. Otherwise the money moves through shops and ledgers that look clean. |
| Redemption | Rafiq leaves the trade. If surrendered is true, he serves a short sentence and Amena visits. If path is fronts, he runs a small shop and pays back what he can to the lane. Otherwise he leaves Dhaka with Amena and does not look back. |
| Ghost | Rafiq fades out of the lanes with no empire and no ending anyone writes about. Fled variant: somewhere abroad he has a new name, and Amena gets a call every Eid. |

**Character lines (show one line per character after the core text, in every ending; for each character use the first row whose condition is true):**

| Character | Condition | Line |
| --- | --- | --- |
| Amena | Loyalty is 60 or more | Amena still sets a plate for him. |
| Amena | Loyalty is 21 to 59 | Amena writes to him once a year. |
| Amena | Loyalty is 20 or less | Amena does not say his name. |
| Babu | babuStatus is loyal | Babu, older now, still sends word through the tea stall. |
| Babu | babuStatus is owes | Babu keeps his distance and a debt he never mentions. |
| Babu | babuStatus is gone | Nobody in Mirpur will say where Babu went after the 2018 sweep. |
| Shuvo | shuvoStatus is paid | Shuvo's name still comes up at the tea stalls, and his cut is still paid. |
| Shuvo | shuvoStatus is war | Shuvo's side of Jatrabari is quiet in a way nobody discusses. |
| Shuvo | shuvoStatus is peace | Shuvo and Rafiq share a highway and a silence. |
| Haque | haqueOwnsYou is true | Inspector Haque's price rose until it was more than Rafiq had. |
| Haque | haqueBribed is true | Haque took the money and never asked for a name. |
| Haque | informedOnShuvo is true | Haque kept the name Rafiq gave him in a drawer. |
| Haque | none of the above | Haque kept a file on him. |
| Noyon | Noyon crew loyalty is 90 | Noyon is the only one who visits. |
| Noyon | otherwise | Noyon stayed to the end. |
| Reshma | reshmaDefected is true | Reshma took her share and a lane in Chattogram and never looked back. |
| Reshma | Reshma crew loyalty is 50 or more | Reshma runs her own corner of Chattogram now, with Rafiq's silence. |
| Reshma | otherwise | Reshma stayed, but stopped talking. |
| Kalam | kalamViolence is true | Kalam's name is in a police file in two districts. |
| Kalam | otherwise | Kalam went back to a quiet life. |
| The boy | childrenProtected is true | A twelve-year-old sits at a school desk in Mirpur and does not know who paid. |
| The boy | otherwise | The boy's name is in no file. |

After the epilogue, show the Help screen and unlock Archive entry A-15.

### Reference Playthroughs (automated tests)

The engine must reproduce every row exactly. Choices are listed in the order scenes are played. S3-2X appears only when triggered.

| Test | Choices in order | Money | Loyalty | Heat | Morality | Ending |
| --- | --- | --- | --- | --- | --- | --- |
| R | S1-1 A, S1-2 B, S1-2B A, S1-3 A, S2-1 A, S2-2 A, S2-3 A, S2-4 B, S2-5 C, S3-1 B, S3-2 A, S3-3 A, S3-4 B, S4-2 A, S4-3 C, S4-4 C, S4-5 B, S4-6 B, S5-1 B, S5-2 A, S5-3 A | 18850 | 95 | 0 | 100 | Redemption |
| K | S1-1 A, S1-2 A, S1-3 B, S2-1 A, S2-2 B, S2-3 B, S2-4 B, S2-5 B, S3-1 A, S3-2 A, S3-3 A, S3-4 B, S4-2 A, S4-3 A, S4-4 A, S4-5 B, S4-6 A, S5-1 A, S5-2 B, S5-3 C | 134800 | 55 | 62 | 10 | The Untouchable Kingpin |
| C | S1-1 B, S1-2 A, S1-3 C, S2-1 B, S2-2 B, S2-3 A, S2-4 A, S2-5 A, S3-1 A, S3-2 B, S3-2X, S3-3 B, S3-4 C, S4-2 B, S4-3 B, S4-4 A, S4-5 A, S4-6 A, S5-1 A, S5-2 B, S5-3 C | 127170 | 0 | 100 | 0 | Caught |
| X | S1-1 B, S1-2 A, S1-3 C, S2-1 A, S2-2 B, S2-3 B, S2-4 B, S2-5 A, S3-1 A, S3-2 A, S3-3 B, S3-4 B, S4-2 A, S4-3 A, S4-4 A, S4-5 A, S4-6 A, S5-1 B, S5-2 C, S5-3 C | 111880 | 0 | 57 | 0 | Killed in the Turf War |
| G | S1-1 A, S1-2 A, S1-3 B, S2-1 A, S2-2 B, S2-3 B, S2-4 A, S2-5 B, S3-1 B, S3-2 A, S3-3 C, S3-4 B, S4-2 A, S4-3 A, S4-4 B, S4-5 B, S4-6 C, S5-1 B, S5-2 C, S5-3 C | 44120 | 55 | 10 | 50 | Ghost |
| F | Same as K, but S5-3 B | 104800 | 45 | 32 | 15 | Ghost (fled variant) |
| S | Same as K, but S5-3 A | 124800 | 60 | 52 | 35 | Caught (surrendered variant) |

## 10. Archive Content, Ticker Lines and Sources

All text below is paraphrased from the cited reporting. Use it exactly. Do not add facts from memory (see the rules in Section 1A).

### Archive entries

| ID | Year | Title | Summary | Unlocks at | Sources |
| --- | --- | --- | --- | --- | --- |
| A-01 | 1980s to 2016 | Phensedyl, the syrup that came first | Phensedyl, a codeine cough syrup made legally in India, spread through Bangladesh from the mid 1980s and was later banned here as abuse grew. It was smuggled across the long land border for decades, and commentators describe a generation in the northern districts badly hurt by it. India moved to ban it in March 2016, yet Bangladeshi agencies still seized more than half a million bottles that year, and reports describe it making a comeback beside yaba. | S2-4 | S1, S2, S6, S7 |
| A-02 | 24 April 2013 | Rana Plaza | A nine-storey commercial building in Savar, near Dhaka, collapsed on 24 April 2013 with thousands of garment workers inside, a day after cracks were reported. The search for survivors lasted 19 days and more than 1,100 people died. It became a turning point for worker safety in the global garment industry. | S1-1 | S5 |
| A-03 | 2000s | How yaba reached the capital | Yaba is a pill that combines methamphetamine and caffeine, and the name comes from Thai words for crazy medicine. A Daily Star report notes that RAB recovered about 1.2 lakh pills in a single raid in Gulshan in 2007, and describes pills crossing the Naf River at Teknaf by small boats, with payments moved through informal hundi channels. The border with Myanmar is about 270 km long and hard to police. | S3-1 | S3, S4, S8 |
| A-04 | 2020 to 2026 | Where Dhaka's trade has been reported | Department of Narcotics Control intelligence has named railway stations, bus terminals and launch ghats among the capital's trade points, along with areas including Geneva Camp in Mohammadpur, Mirpur Kalshi, Old Dhaka, Kamrangirchar and Karwan Bazar. A 2020 report also named the Jhilpar slum area in Mirpur. A 2026 academic survey of 1,016 people involved in trafficking in Dhaka found that heroin, cannabis and yaba dominate and that most respondents had little schooling. These are places where enforcement has focused. Most residents have nothing to do with the trade. | S2-1 | S17, S19, S27 |
| A-05 | August 2017 | The refugee influx and the border | After the Myanmar military's clampdown in Rakhine in August 2017, about a million Rohingya were sheltering near Teknaf. Bangladeshi officials said the influx contributed to the spread of yaba. Reporting also describes poor Rohingya being recruited by larger syndicates as carriers, while the pills themselves are made in north-eastern Myanmar. For some refugees it became an easy income, and for others a risk of arrest. | S3-1 | S8, S19, S23 |
| A-06 | May 2018 | The drive | A nationwide anti-drug drive began in early to mid May 2018 on the Prime Minister's direction, led first by RAB, with police running their own drive from 18 May. By 29 May, AFP counted 102 alleged traffickers killed and about 12,000 tried in special courts. By mid-July, a local rights group counted 200 dead and the home ministry said about 25,000 had been arrested. Raids on 28 May reached Dhalpur City Palli in Jatrabari and a Jhilpar slum in Mirpur. | S3-2 | S9, S10, S11, S12 |
| A-07 | 2018 to 2020 | Gunfights or killings? | Officials said the dead were dealers killed in shootouts or fights between rival gangs, and denied that any killings were extrajudicial. Rights groups and the National Human Rights Commission said many deaths looked extrajudicial and asked for impartial inquiries. A Teknaf councillor's widow publicly released recordings she said showed her husband was killed in a set-up on 27 May 2018. In February 2019 authorities counted nearly 300 suspected dealers killed in the campaign and about 25,000 arrests, and a rights activist said record seizures showed the killings had not dented the trade. | S3-4 | S8, S9, S10, S11 |
| A-08 | 27 October 2018 | The new law | Parliament passed the Narcotics Control Act 2018 on 27 October 2018 and made yaba a Class A narcotic. Dealing in 200 grams or more of yaba became punishable by death or life imprisonment, and financing or patronising drug dealing carries a maximum penalty of death. The Act took effect on 27 December 2018. Rights groups noted that the last known death sentence for a drug offence in Bangladesh had been in 2009. | S3-5 | S13, S14 |
| A-09 | 2018 to 2019 | The record seizure | The Department of Narcotics Control said a record 53 million methamphetamine pills were seized in 2018. Officials called it proof the campaign was working, while a leading rights activist said it showed the hundreds of deaths had not made a serious dent in the trade. | S4-1 | S8 |
| A-10 | 16 February 2020 | The Teknaf surrender | On 16 February 2020, 102 listed yaba godfathers and dealers surrendered at a ceremony in Teknaf before the Home Minister and the police chief, after being kept in a police safe house since January. About six weeks later the Daily Star found the trade largely intact, run by relatives and agents, and police were drawing up a second list. A second, smaller surrender of 21 traders followed. | S4-3 | S15, S16, S28 |
| A-11 | March to May 2020 | Lockdown | While police were stretched by COVID-19, the Daily Star reported dealers becoming active again in Dhaka. Drug cases in the capital fell to 123 in April. Geneva Camp in Mohammadpur, home to about 40,000 people, and Jhilpar in Mirpur were named, and a yaba tablet cost 250 to 300 taka. | S4-4 | S17 |
| A-12 | 31 July 2020 | The Shamlapur checkpoint | Retired army Major Sinha Md Rashed Khan was shot dead at a police checkpoint at Shamlapur in Teknaf on 31 July 2020. In January 2022 a Cox's Bazar court sentenced two former police officers to death for the killing. A home ministry inquiry found that 174 people were killed in 106 so-called gunfights during the 33 months a former Teknaf police station chief was in post, and the case drew international attention to alleged extrajudicial killings. | S4-5 | S18, S24 |
| A-13 | 2024 to 2026 | After the upheaval | Dealers told reporters that the collapse of state authority let the trade flourish, and reporting in 2024 described rising seizures of ice, a form of crystal meth once rare in Bangladesh. In Chattogram, six police personnel were arrested with yaba between August 2025 and April 2026 and more than 15 were suspended over missing seized pills. In 2026 the BGB and the Navy kept seizing pills in the hundreds of thousands at the Naf River in Teknaf. | S5-1 | S19, S20, S21, S29 |
| A-14 | 2025 | Children in the trade (sensitive) | The Department of Narcotics Control says about a quarter of the people involved in drug carrying and sales are children, most of them under 16, and that groups recruit street children and children from poor families. Experts say these children lose school, health care and childhood, and that the Children Act 2013 provides a separate justice system for them. Do not describe how children are used. | S5-2 | S22 |
| A-15 | 1990 to 2023 | Help exists | The Department of Narcotics Control, founded on 2 January 1990, runs treatment and rehabilitation services including the Central Drug Addiction Treatment Centre in Dhaka. As of June 2023 there were four government treatment centres with 199 beds and licences for 365 private centres with around 5,000 beds, and reporting notes that capacity is small compared with need. | Ending screen | S25, S26 |

### News ticker lines

| ID | Date shown | Line | Sources |
| --- | --- | --- | --- |
| T-01 | May 2013 | Savar: collapsed garment complex, rescue ends after 19 days, toll above 1,100. | S5 |
| T-02 | October 2016 | India bans Phensedyl. Bangladesh agencies still seize it by the hundred thousand bottles. | S6, S7 |
| T-03 | September 2017 | Refugee influx on the south-east border. Officials link it to rising yaba traffic. | S8 |
| T-04 | May 2018 | Government orders nationwide anti-drug drive. Arrests in the thousands, deaths in gunfights climb. | S9, S10 |
| T-05 | December 2018 | Parliament passes Narcotics Control Act: death or life for 200 g or more of yaba. | S13 |
| T-06 | February 2019 | Record 53 million pills seized in 2018, says narcotics department. | S8 |
| T-07 | February 2020 | 102 listed yaba godfathers surrender at a ceremony in Teknaf. | S15 |
| T-08 | March 2020 | Lockdown: police stretched, dealers active again in Dhaka, report says. | S17 |
| T-09 | August 2020 | Retired army major killed at Teknaf checkpoint. Home ministry orders inquiry into gunfights. | S18 |
| T-10 | September 2024 | Dealers say the trade is flowing as police presence thins. | S19 |
| T-11 | 2025 | Narcotics department: about a quarter of those in drug carrying and sales are children. | S22 |
| T-12 | November 2025 | Chattogram: police personnel arrested and suspended over yaba cases. | S20 |

### Sources

| ID | Title | Publisher | Link |
| --- | --- | --- | --- |
| S1 | Dhaka's evolving drug scenario | Dhaka Tribune | https://www.dhakatribune.com/opinion/op-ed/248184/op-ed-dhaka%E2%80%99s-evolving-drug-scenario |
| S2 | Yaba Invasion-3: Living in drug zone | The Daily Star | https://www.thedailystar.net/frontpage/yaba-invasion-3-living-drug-zone-1576045 |
| S3 | Watch out | The Daily Star | https://www.thedailystar.net/frontpage/watch-out-1574809 |
| S4 | Influential people behind Yaba trade | The Daily Star | https://www.thedailystar.net/news-detail-186585 |
| S5 | Rana Plaza collapse | Wikipedia | https://en.wikipedia.org/wiki/Rana\_Plaza\_collapse |
| S6 | Why smugglers across India-Bangladesh border prefer cough syrup | IANS via Moneylife | https://moneylife.in/article/why-smugglers-across-indiabangladesh-border-prefer-cough-syrup/46243.html |
| S7 | Illicit drug Phensedyl makes a comeback | The Financial Express | https://thefinancialexpress.com.bd/national/illicit-drug-phensedyl-makes-a-comeback-1637378170 |
| S8 | Bangladesh makes record drugs seizure, 53m meth pills | AFP via Gulf News | https://gulfnews.com/world/asia/bangladesh-makes-record-drugs-seizure--53m-meth-pills-1.61987724 |
| S9 | More than 100 dead as Bangladesh drug war escalates | AFP via Inquirer | https://newsinfo.inquirer.net/?p=995364 |
| S10 | Bangladesh drug war death toll hits 200 | AFP via Arab News | https://www.arabnews.com/node/1340251 |
| S11 | Bangladesh's escalated anti-drug campaign draws fire from rights activists, opposition | BenarNews | https://www.benarnews.org/english/news/bengali/drug-crackdown-05232018151004.html |
| S12 | Anti-narcotics drive: 75 held in capital's Jatrabari, Mirpur | The Daily Star | https://www.thedailystar.net/backpage/anti-narcotics-drive-75-held-capitals-jatrabari-mirpur-1582927 |
| S13 | Narcotics Control Bill passed with death penalty for dealing yaba | Dhaka Tribune | https://www.dhakatribune.com/bangladesh/parliament/159403/narcotics-control-bill-passed-with-death-penalty |
| S14 | Bangladesh to begin hanging people for non-violent drug offences | Talking Drugs and IDPC | https://idpc.net/news/2019/01/bangladesh-to-begin-hanging-people-for-non-violent-drug-offences |
| S15 | 102 narcos give themselves up | The Daily Star | https://www.thedailystar.net/country/102-drug-peddlers-surrender-to-bangladesh-police-in-coxs-bazar-bangladesh-1702894 |
| S16 | Yaba trade in Teknaf: Surrender has little impact | The Daily Star | https://www.thedailystar.net/frontpage/news/yaba-trade-teknaf-surrender-hardly-makes-impact-1727158 |
| S17 | Lax surveillance amid Covid-19 crisis: Narcos active again | The Daily Star | https://www.thedailystar.net/backpage/news/lax-surveillance-amid-covid-19-crisis-narcos-active-again-1903033 |
| S18 | 2 Bangladesh ex-cops get death sentence for gunning down retired army major | BenarNews | https://www.benarnews.org/english/news/bengali/bangladesh-policemen-get-death-extrajudicial-killing-01312022152051.html |
| S19 | Myanmar's drug empire poses growing threat to Bangladesh | Dhaka Tribune | https://www.dhakatribune.com/bangladesh/370248/myanmar%E2%80%99s-drug-empire-poses-growing-threat-to |
| S20 | Some cops in Ctg drawn into yaba trade | The Daily Star | https://www.thedailystar.net/chattogram/news/some-cops-ctg-drawn-yaba-trade-4291431 |
| S21 | BGB seizes 1.90 lakh yaba tablets, arrests three in Naf River | BSS | https://www.bssnews.net/district/419275 |
| S22 | Children increasingly used as drug carriers | Dhaka Tribune | https://www.dhakatribune.com/bangladesh/crime/419632/children-increasingly-used-as-drug-carriers |
| S23 | The Myanmar connection | Dhaka Tribune | https://www.dhakatribune.com/bangladesh/crime/11381/the-myanmar-connection |
| S24 | Murder of Major Sinha Mohammed Rashed Khan | Wikipedia | https://en.wikipedia.org/wiki/Murder\_of\_Major\_Sinha\_Mohammed\_Rashed\_Khan |
| S25 | Department of Narcotics Control | Wikipedia | https://en.wikipedia.org/wiki/Department\_of\_Narcotics\_Control |
| S26 | What is Bangladesh doing to check drug smuggling, abuse? | Dhaka Tribune | https://www.dhakatribune.com/amp/bangladesh/340915/what-is-bangladesh-doing-to-check-drug-smuggling |
| S27 | Unveiling patterns and sociodemographic characteristics of drug trafficking in Dhaka city, Bangladesh | PLOS ONE via IDEAS/RePEc | https://ideas.repec.org/a/plo/pone00/0349429.html |
| S28 | 21 Yaba, hundi traders surrender to police | The Daily Star | https://www.thedailystar.net/backpage/news/21-yaba-hundi-traders-surrender-police-1863079 |
| S29 | Navy seizes 5 lakh Yaba worth about Tk 25cr in Teknaf | BSS | https://www.bssnews.net/others/359363 |

### Verification notes for the owner

- Sources were read in October 2026. Re-check every figure and link before release.
- Department of Narcotics Control seizure figures differ between reports (a May 2018 official quoted 60 million pills for 2017, while the February 2019 report gave a record 53 million for 2018). Only the 53 million figure is used.
- The date when yaba first reached Bangladesh was not established by a source read for this document, so the game does not state one. The earliest dated data point used is the 2007 Gulshan raid (A-03).
- The August 2024 political upheaval is described from general knowledge plus a dealers' remark in S19. Add a dated source if you want to say more about it.
- The Rana Plaza toll varies between 1,134 and 1,136 across sources, so the game says more than 1,100.
- No helpline number has been verified. Add one to the Help screen only after checking it with the Department of Narcotics Control.
- Ticker dates T-02, T-10, T-11 and T-12 are approximate positions inside the game timeline, not publication dates.
