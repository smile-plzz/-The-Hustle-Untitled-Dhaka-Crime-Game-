import { ArchiveEntry, TickerLine, Source } from '../types';

export const SOURCES: Source[] = [
  {
    id: 'S1',
    title: "Dhaka's evolving drug scenario",
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/opinion/op-ed/248184/op-ed-dhaka%E2%80%99s-evolving-drug-scenario',
  },
  {
    id: 'S2',
    title: 'Yaba Invasion-3: Living in drug zone',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/frontpage/yaba-invasion-3-living-drug-zone-1576045',
  },
  {
    id: 'S3',
    title: 'Watch out',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/frontpage/watch-out-1574809',
  },
  {
    id: 'S4',
    title: 'Influential people behind Yaba trade',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/news-detail-186585',
  },
  {
    id: 'S5',
    title: 'Rana Plaza collapse',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Rana_Plaza_collapse',
  },
  {
    id: 'S6',
    title: 'Why smugglers across India-Bangladesh border prefer cough syrup',
    publisher: 'IANS via Moneylife',
    url: 'https://moneylife.in/article/why-smugglers-across-indiabangladesh-border-prefer-cough-syrup/46243.html',
  },
  {
    id: 'S7',
    title: 'Illicit drug Phensedyl makes a comeback',
    publisher: 'The Financial Express',
    url: 'https://thefinancialexpress.com.bd/national/illicit-drug-phensedyl-makes-a-comeback-1637378170',
  },
  {
    id: 'S8',
    title: 'Bangladesh makes record drugs seizure, 53m meth pills',
    publisher: 'AFP via Gulf News',
    url: 'https://gulfnews.com/world/asia/bangladesh-makes-record-drugs-seizure--53m-meth-pills-1.61987724',
  },
  {
    id: 'S9',
    title: 'More than 100 dead as Bangladesh drug war escalates',
    publisher: 'AFP via Inquirer',
    url: 'https://newsinfo.inquirer.net/?p=995364',
  },
  {
    id: 'S10',
    title: 'Bangladesh drug war death toll hits 200',
    publisher: 'AFP via Arab News',
    url: 'https://www.arabnews.com/node/1340251',
  },
  {
    id: 'S11',
    title: "Bangladesh's escalated anti-drug campaign draws fire from rights activists, opposition",
    publisher: 'BenarNews',
    url: 'https://www.benarnews.org/english/news/bengali/drug-crackdown-05232018151004.html',
  },
  {
    id: 'S12',
    title: "Anti-narcotics drive: 75 held in capital's Jatrabari, Mirpur",
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/backpage/anti-narcotics-drive-75-held-capitals-jatrabari-mirpur-1582927',
  },
  {
    id: 'S13',
    title: 'Narcotics Control Bill passed with death penalty for dealing yaba',
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/bangladesh/parliament/159403/narcotics-control-bill-passed-with-death-penalty',
  },
  {
    id: 'S14',
    title: 'Bangladesh to begin hanging people for non-violent drug offences',
    publisher: 'Talking Drugs and IDPC',
    url: 'https://idpc.net/news/2019/01/bangladesh-to-begin-hanging-people-for-non-violent-drug-offences',
  },
  {
    id: 'S15',
    title: '102 narcos give themselves up',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/country/102-drug-peddlers-surrender-to-bangladesh-police-in-coxs-bazar-bangladesh-1702894',
  },
  {
    id: 'S16',
    title: 'Yaba trade in Teknaf: Surrender has little impact',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/frontpage/news/yaba-trade-teknaf-surrender-hardly-makes-impact-1727158',
  },
  {
    id: 'S17',
    title: 'Lax surveillance amid Covid-19 crisis: Narcos active again',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/backpage/news/lax-surveillance-amid-covid-19-crisis-narcos-active-again-1903033',
  },
  {
    id: 'S18',
    title: '2 Bangladesh ex-cops get death sentence for gunning down retired army major',
    publisher: 'BenarNews',
    url: 'https://www.benarnews.org/english/news/bengali/bangladesh-policemen-get-death-extrajudicial-killing-01312022152051.html',
  },
  {
    id: 'S19',
    title: "Myanmar's drug empire poses growing threat to Bangladesh",
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/bangladesh/370248/myanmar%E2%80%99s-drug-empire-poses-growing-threat-to',
  },
  {
    id: 'S20',
    title: 'Some cops in Ctg drawn into yaba trade',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/chattogram/news/some-cops-ctg-drawn-yaba-trade-4291431',
  },
  {
    id: 'S21',
    title: 'BGB seizes 1.90 lakh yaba tablets, arrests three in Naf River',
    publisher: 'BSS',
    url: 'https://www.bssnews.net/district/419275',
  },
  {
    id: 'S22',
    title: 'Children increasingly used as drug carriers',
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/bangladesh/crime/419632/children-increasingly-used-as-drug-carriers',
  },
  {
    id: 'S23',
    title: 'The Myanmar connection',
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/bangladesh/crime/11381/the-myanmar-connection',
  },
  {
    id: 'S24',
    title: 'Murder of Major Sinha Mohammed Rashed Khan',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Murder_of_Major_Sinha_Mohammed_Rashed_Khan',
  },
  {
    id: 'S25',
    title: 'Department of Narcotics Control',
    publisher: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Department_of_Narcotics_Control',
  },
  {
    id: 'S26',
    title: 'What is Bangladesh doing to check drug smuggling, abuse?',
    publisher: 'Dhaka Tribune',
    url: 'https://www.dhakatribune.com/amp/bangladesh/340915/what-is-bangladesh-doing-to-check-drug-smuggling',
  },
  {
    id: 'S27',
    title: 'Unveiling patterns and sociodemographic characteristics of drug trafficking in Dhaka city, Bangladesh',
    publisher: 'PLOS ONE via IDEAS/RePEc',
    url: 'https://ideas.repec.org/a/plo/pone00/0349429.html',
  },
  {
    id: 'S28',
    title: '21 Yaba, hundi traders surrender to police',
    publisher: 'The Daily Star',
    url: 'https://www.thedailystar.net/backpage/news/21-yaba-hundi-traders-surrender-police-1863079',
  },
  {
    id: 'S29',
    title: 'Navy seizes 5 lakh Yaba worth about Tk 25cr in Teknaf',
    publisher: 'BSS',
    url: 'https://www.bssnews.net/others/359363',
  },
];

export const ARCHIVE_ENTRIES: ArchiveEntry[] = [
  {
    id: 'A-01',
    year: '1980s to 2016',
    title: 'Phensedyl, the syrup that came first',
    summary:
      'Phensedyl, a codeine cough syrup made legally in India, spread through Bangladesh from the mid 1980s and was later banned here as abuse grew. It was smuggled across the long land border for decades, and commentators describe a generation in the northern districts badly hurt by it. India moved to ban it in March 2016, yet Bangladeshi agencies still seized more than half a million bottles that year, and reports describe it making a comeback beside yaba.',
    unlockSceneId: 'S2-4',
    sourceIds: ['S1', 'S2', 'S6', 'S7'],
  },
  {
    id: 'A-02',
    year: '24 April 2013',
    title: 'Rana Plaza',
    summary:
      'A nine-storey commercial building in Savar, near Dhaka, collapsed on 24 April 2013 with thousands of garment workers inside, a day after cracks were reported. The search for survivors lasted 19 days and more than 1,100 people died. It became a turning point for worker safety in the global garment industry.',
    unlockSceneId: 'S1-1',
    sourceIds: ['S5'],
  },
  {
    id: 'A-03',
    year: '2000s',
    title: 'How yaba reached the capital',
    summary:
      'Yaba is a pill that combines methamphetamine and caffeine, and the name comes from Thai words for crazy medicine. A Daily Star report notes that RAB recovered about 1.2 lakh pills in a single raid in Gulshan in 2007, and describes pills crossing the Naf River at Teknaf by small boats, with payments moved through informal hundi channels. The border with Myanmar is about 270 km long and hard to police.',
    unlockSceneId: 'S3-1',
    sourceIds: ['S3', 'S4', 'S8'],
  },
  {
    id: 'A-04',
    year: '2020 to 2026',
    title: "Where Dhaka's trade has been reported",
    summary:
      'Department of Narcotics Control intelligence has named railway stations, bus terminals and launch ghats among the capital\'s trade points, along with areas including Geneva Camp in Mohammadpur, Mirpur Kalshi, Old Dhaka, Kamrangirchar and Karwan Bazar. A 2020 report also named the Jhilpar slum area in Mirpur. A 2026 academic survey of 1,016 people involved in trafficking in Dhaka found that heroin, cannabis and yaba dominate and that most respondents had little schooling. These are places where enforcement has focused. Most residents have nothing to do with the trade.',
    unlockSceneId: 'S2-1',
    sourceIds: ['S17', 'S19', 'S27'],
  },
  {
    id: 'A-05',
    year: 'August 2017',
    title: 'The refugee influx and the border',
    summary:
      'After the Myanmar military\'s clampdown in Rakhine in August 2017, about a million Rohingya were sheltering near Teknaf. Bangladeshi officials said the influx contributed to the spread of yaba. Reporting also describes poor Rohingya being recruited by larger syndicates as carriers, while the pills themselves are made in north-eastern Myanmar. For some refugees it became an easy income, and for others a risk of arrest.',
    unlockSceneId: 'S3-1',
    sourceIds: ['S8', 'S19', 'S23'],
  },
  {
    id: 'A-06',
    year: 'May 2018',
    title: 'The drive',
    summary:
      'A nationwide anti-drug drive began in early to mid May 2018 on the Prime Minister\'s direction, led first by RAB, with police running their own drive from 18 May. By 29 May, AFP counted 102 alleged traffickers killed and about 12,000 tried in special courts. By mid-July, a local rights group counted 200 dead and the home ministry said about 25,000 had been arrested. Raids on 28 May reached Dhalpur City Palli in Jatrabari and a Jhilpar slum in Mirpur.',
    unlockSceneId: 'S3-2',
    sourceIds: ['S9', 'S10', 'S11', 'S12'],
  },
  {
    id: 'A-07',
    year: '2018 to 2020',
    title: 'Gunfights or killings?',
    summary:
      'Officials said the dead were dealers killed in shootouts or fights between rival gangs, and denied that any killings were extrajudicial. Rights groups and the National Human Rights Commission said many deaths looked extrajudicial and asked for impartial inquiries. A Teknaf councillor\'s widow publicly released recordings she said showed her husband was killed in a set-up on 27 May 2018. In February 2019 authorities counted nearly 300 suspected dealers killed in the campaign and about 25,000 arrests, and a rights activist said record seizures showed the killings had not dented the trade.',
    unlockSceneId: 'S3-4',
    sourceIds: ['S8', 'S9', 'S10', 'S11'],
  },
  {
    id: 'A-08',
    year: '27 October 2018',
    title: 'The new law',
    summary:
      'Parliament passed the Narcotics Control Act 2018 on 27 October 2018 and made yaba a Class A narcotic. Dealing in 200 grams or more of yaba became punishable by death or life imprisonment, and financing or patronising drug dealing carries a maximum penalty of death. The Act took effect on 27 December 2018. Rights groups noted that the last known death sentence for a drug offence in Bangladesh had been in 2009.',
    unlockSceneId: 'S3-5',
    sourceIds: ['S13', 'S14'],
  },
  {
    id: 'A-09',
    year: '2018 to 2019',
    title: 'The record seizure',
    summary:
      'The Department of Narcotics Control said a record 53 million methamphetamine pills were seized in 2018. Officials called it proof the campaign was working, while a leading rights activist said it showed the hundreds of deaths had not made a serious dent in the trade.',
    unlockSceneId: 'S4-1',
    sourceIds: ['S8'],
  },
  {
    id: 'A-10',
    year: '16 February 2020',
    title: 'The Teknaf surrender',
    summary:
      'On 16 February 2020, 102 listed yaba godfathers and dealers surrendered at a ceremony in Teknaf before the Home Minister and the police chief, after being kept in a police safe house since January. About six weeks later the Daily Star found the trade largely intact, run by relatives and agents, and police were drawing up a second list. A second, smaller surrender of 21 traders followed.',
    unlockSceneId: 'S4-3',
    sourceIds: ['S15', 'S16', 'S28'],
  },
  {
    id: 'A-11',
    year: 'March to May 2020',
    title: 'Lockdown',
    summary:
      'While police were stretched by COVID-19, the Daily Star reported dealers becoming active again in Dhaka. Drug cases in the capital fell to 123 in April. Geneva Camp in Mohammadpur, home to about 40,000 people, and Jhilpar in Mirpur were named, and a yaba tablet cost 250 to 300 taka.',
    unlockSceneId: 'S4-4',
    sourceIds: ['S17'],
  },
  {
    id: 'A-12',
    year: '31 July 2020',
    title: 'The Shamlapur checkpoint',
    summary:
      'Retired army Major Sinha Md Rashed Khan was shot dead at a police checkpoint at Shamlapur in Teknaf on 31 July 2020. In January 2022 a Cox\'s Bazar court sentenced two former police officers to death for the killing. A home ministry inquiry found that 174 people were killed in 106 so-called gunfights during the 33 months a former Teknaf police station chief was in post, and the case drew international attention to alleged extrajudicial killings.',
    unlockSceneId: 'S4-5',
    sourceIds: ['S18', 'S24'],
  },
  {
    id: 'A-13',
    year: '2024 to 2026',
    title: 'After the upheaval',
    summary:
      'Dealers told reporters that the collapse of state authority let the trade flourish, and reporting in 2024 described rising seizures of ice, a form of crystal meth once rare in Bangladesh. In Chattogram, six police personnel were arrested with yaba between August 2025 and April 2026 and more than 15 were suspended over missing seized pills. In 2026 the BGB and the Navy kept seizing pills in the hundreds of thousands at the Naf River in Teknaf.',
    unlockSceneId: 'S5-1',
    sourceIds: ['S19', 'S20', 'S21', 'S29'],
  },
  {
    id: 'A-14',
    year: '2025',
    title: 'Children in the trade (sensitive)',
    summary:
      'The Department of Narcotics Control says about a quarter of the people involved in drug carrying and sales are children, most of them under 16, and that groups recruit street children and children from poor families. Experts say these children lose school, health care and childhood, and that the Children Act 2013 provides a separate justice system for them. Do not describe how children are used.',
    unlockSceneId: 'S5-2',
    sourceIds: ['S22'],
    sensitive: true,
  },
  {
    id: 'A-15',
    year: '1990 to 2023',
    title: 'Help exists',
    summary:
      'The Department of Narcotics Control, founded on 2 January 1990, runs treatment and rehabilitation services including the Central Drug Addiction Treatment Centre in Dhaka. As of June 2023 there were four government treatment centres with 199 beds and licences for 365 private centres with around 5,000 beds, and reporting notes that capacity is small compared with need.',
    unlockSceneId: 'Ending screen',
    sourceIds: ['S25', 'S26'],
  },
];

export const NEWS_TICKERS: Record<string, TickerLine> = {
  'T-01': {
    id: 'T-01',
    dateShown: 'May 2013',
    line: 'SAVAR: Rana Plaza garment complex collapse toll exceeds 1,100 as 19-day rescue operation concludes.',
    sourceIds: ['S5'],
  },
  'T-02': {
    id: 'T-02',
    dateShown: 'October 2016',
    line: 'BORDER FRONTIER: India bans Phensedyl syrup; border forces intercept rising bootleg consignments.',
    sourceIds: ['S6', 'S7'],
  },
  'T-03': {
    id: 'T-03',
    dateShown: 'September 2017',
    line: 'SOUTHEAST BORDER: Refugee influx linked to surging yaba trafficking along Naf River transit routes.',
    sourceIds: ['S8'],
  },
  'T-04': {
    id: 'T-04',
    dateShown: 'May 2018',
    line: 'NATIONWIDE CRACKDOWN: Over 100 dead in reported gunfights as nationwide anti-narcotics drive intensifies.',
    sourceIds: ['S9', 'S10'],
  },
  'T-05': {
    id: 'T-05',
    dateShown: 'December 2018',
    line: 'PARLIAMENT: Narcotics Control Act passed with mandatory death penalty for possession of 200g yaba.',
    sourceIds: ['S13'],
  },
  'T-06': {
    id: 'T-06',
    dateShown: 'February 2019',
    line: 'DEPARTMENT OF NARCOTICS CONTROL: Record 53 million meth pills seized nationwide over past year.',
    sourceIds: ['S8'],
  },
  'T-07': {
    id: 'T-07',
    dateShown: 'February 2020',
    line: 'COX\'S BAZAR: 102 listed drug godfathers surrender before Home Minister in high-profile Teknaf ceremony.',
    sourceIds: ['S15'],
  },
  'T-08': {
    id: 'T-08',
    dateShown: 'March 2020',
    line: 'COVID LOCKDOWN: Police checkpoints stretch thin; distribution networks adapt across quiet capital lanes.',
    sourceIds: ['S17'],
  },
  'T-09': {
    id: 'T-09',
    dateShown: 'August 2020',
    line: 'SHAMLAPUR CHECKPOINT: Murder of retired Major Sinha sparks national outcry over extrajudicial operations.',
    sourceIds: ['S18'],
  },
  'T-10': {
    id: 'T-10',
    dateShown: 'September 2024',
    line: 'POLITICAL UPHEAVAL: Thana operations disrupted; supply corridors resurface across Dhaka and highways.',
    sourceIds: ['S19'],
  },
  'T-11': {
    id: 'T-11',
    dateShown: '2025',
    line: 'DNC INVESTIGATION: An estimated 25% of carriers recruited across capital hubs are vulnerable street minors.',
    sourceIds: ['S22'],
  },
  'T-12': {
    id: 'T-12',
    dateShown: 'November 2025',
    line: 'CHATTOGRAM: Law enforcement personnel detained and suspended over intercepted highway yaba shipments.',
    sourceIds: ['S20'],
  },
};
