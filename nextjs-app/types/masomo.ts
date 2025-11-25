export interface MasomoCategory {
  id: string;
  title: string;
  titleEnglish: string;
  difficulty: number;
  prerequisites: string[];
  locked: boolean;
  description: string;
  content: Array<{
    kiswahili: string;
    english: string;
    number?: number;
  }>;
  readingMaterial: string;
  quizUnlockThreshold: number;
  completed?: boolean;
  progress?: number;
}

export const MASOMO_CATEGORIES: MasomoCategory[] = [
  {
    id: "nambari",
    title: "Nambari",
    titleEnglish: "Numbers",
    difficulty: 1,
    prerequisites: [],
    locked: false,
    description: "Basic numbers 1-10 with visual and audio support",
    content: [
      { kiswahili: "moja", english: "one", number: 1 },
      { kiswahili: "mbili", english: "two", number: 2 },
      { kiswahili: "tatu", english: "three", number: 3 },
      { kiswahili: "nne", english: "four", number: 4 },
      { kiswahili: "tano", english: "five", number: 5 },
      { kiswahili: "sita", english: "six", number: 6 },
      { kiswahili: "saba", english: "seven", number: 7 },
      { kiswahili: "nane", english: "eight", number: 8 },
      { kiswahili: "tisa", english: "nine", number: 9 },
      { kiswahili: "kumi", english: "ten", number: 10 }
    ],
    readingMaterial: "Moja ni nambari ya kwanza. Mbili ni nambari ya pili. Tatu ni nambari ya tatu. Hesabu kutoka moja hadi kumi: moja, mbili, tatu, nne, tano, sita, saba, nane, tisa, kumi.",
    quizUnlockThreshold: 70
  },
  {
    id: "rangi",
    title: "Rangi",
    titleEnglish: "Colors",
    difficulty: 1,
    prerequisites: [],
    locked: false,
    description: "Basic colors with high contrast visual aids",
    content: [
      { kiswahili: "nyekundu", english: "red" },
      { kiswahili: "nyeusi", english: "black" },
      { kiswahili: "nyeupe", english: "white" },
      { kiswahili: "kijani", english: "green" },
      { kiswahili: "buluu", english: "blue" },
      { kiswahili: "njano", english: "yellow" },
      { kiswahili: "kahawia", english: "brown" },
      { kiswahili: "waridi", english: "pink" }
    ],
    readingMaterial: "Rangi ni jambo zuri. Nyekundu ni rangi ya damu. Kijani ni rangi ya majani. Buluu ni rangi ya anga. Njano ni rangi ya jua. Nyeupe ni rangi ya mchanga.",
    quizUnlockThreshold: 70
  },
  {
    id: "familia_ndogo",
    title: "Familia Ndogo",
    titleEnglish: "Nuclear Family",
    difficulty: 2,
    prerequisites: ["nambari", "rangi"],
    locked: true,
    description: "Immediate family members with simple relationships",
    content: [
      { kiswahili: "mama", english: "mother" },
      { kiswahili: "baba", english: "father" },
      { kiswahili: "mtoto", english: "child" },
      { kiswahili: "mwana", english: "son/daughter" },
      { kiswahili: "kaka", english: "brother" },
      { kiswahili: "dada", english: "sister" },
      { kiswahili: "bibi", english: "grandmother" },
      { kiswahili: "babu", english: "grandfather" }
    ],
    readingMaterial: "Familia yangu ni ndogo. Nina mama na baba. Nina kaka mmoja na dada mmoja. Bibi na babu wanatutembelea. Tunapendana sana familia yetu.",
    quizUnlockThreshold: 75
  },
  {
    id: "siku_za_wiki",
    title: "Siku za Wiki",
    titleEnglish: "Days of the Week",
    difficulty: 2,
    prerequisites: ["nambari", "rangi"],
    locked: true,
    description: "Seven days with routine activities",
    content: [
      { kiswahili: "Jumapili", english: "Sunday" },
      { kiswahili: "Jumatatu", english: "Monday" },
      { kiswahili: "Jumanne", english: "Tuesday" },
      { kiswahili: "Jumatano", english: "Wednesday" },
      { kiswahili: "Alhamisi", english: "Thursday" },
      { kiswahili: "Ijumaa", english: "Friday" },
      { kiswahili: "Jumamosi", english: "Saturday" }
    ],
    readingMaterial: "Wiki ina siku saba. Jumapili ni siku ya kwanza ya wiki. Jumatatu ni siku ya shule. Jumanne pia ni siku ya shule. Jumamosi ni siku ya mchezo. Siku zote ni muhimu.",
    quizUnlockThreshold: 75
  },
  {
    id: "matunda",
    title: "Matunda",
    titleEnglish: "Fruits",
    difficulty: 3,
    prerequisites: ["familia_ndogo", "siku_za_wiki"],
    locked: true,
    description: "Common fruits with nutritional benefits",
    content: [
      { kiswahili: "ndizi", english: "banana" },
      { kiswahili: "chungwa", english: "orange" },
      { kiswahili: "tufaha", english: "apple" },
      { kiswahili: "nanasi", english: "pineapple" },
      { kiswahili: "embe", english: "mango" },
      { kiswahili: "papai", english: "papaya" },
      { kiswahili: "tikiti maji", english: "watermelon" },
      { kiswahili: "zabibu", english: "grapes" }
    ],
    readingMaterial: "Matunda ni chakula kizuri. Ndizi ni tamu na ni nzuri kwa afya. Chungwa lina vitamini nyingi. Embe ni tunda langu la kupenda. Tunapaswa kula matunda kila siku ili tuwe na afya njema.",
    quizUnlockThreshold: 80
  },
  {
    id: "familia_kubwa",
    title: "Familia Kubwa",
    titleEnglish: "Extended Family",
    difficulty: 4,
    prerequisites: ["familia_ndogo", "matunda"],
    locked: true,
    description: "Extended family relationships and connections",
    content: [
      { kiswahili: "shangazi", english: "aunt (father's sister)" },
      { kiswahili: "mjomba", english: "uncle (mother's brother)" },
      { kiswahili: "binamu", english: "cousin" },
      { kiswahili: "nyawira", english: "daughter-in-law" },
      { kiswahili: "mkwe", english: "son-in-law" },
      { kiswahili: "mpwa", english: "nephew/niece" },
      { kiswahili: "kambo", english: "step-parent" },
      { kiswahili: "mama mkubwa", english: "elder aunt" },
      { kiswahili: "baba mdogo", english: "younger uncle" }
    ],
    readingMaterial: "Familia kubwa ina watu wengi. Shangazi ni dada wa baba. Mjomba ni kaka wa mama. Binamu ni mtoto wa shangazi au mjomba. Familia kubwa hukutana wakati wa sherehe. Wote ni muhimu katika maisha yetu.",
    quizUnlockThreshold: 80
  },
  {
    id: "miezi_ya_mwaka",
    title: "Miezi ya Mwaka",
    titleEnglish: "Months of the Year",
    difficulty: 5,
    prerequisites: ["siku_za_wiki", "familia_kubwa"],
    locked: true,
    description: "Twelve months with seasonal activities",
    content: [
      { kiswahili: "Januari", english: "January" },
      { kiswahili: "Februari", english: "February" },
      { kiswahili: "Machi", english: "March" },
      { kiswahili: "Aprili", english: "April" },
      { kiswahili: "Mei", english: "May" },
      { kiswahili: "Juni", english: "June" },
      { kiswahili: "Julai", english: "July" },
      { kiswahili: "Agosti", english: "August" },
      { kiswahili: "Septemba", english: "September" },
      { kiswahili: "Oktoba", english: "October" },
      { kiswahili: "Novemba", english: "November" },
      { kiswahili: "Desemba", english: "December" }
    ],
    readingMaterial: "Mwaka una miezi kumi na miwili. Januari ni mwezi wa kwanza wa mwaka. Desemba ni mwezi wa mwisho. Kila mwezi una siku thelathini au thelathini na moja. Baadhi ya miezi ina mvua, mengine yana jua kali. Miezi yote ni muhimu kwa mazao na maisha yetu.",
    quizUnlockThreshold: 85
  }
];