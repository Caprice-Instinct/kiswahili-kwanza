export interface Flashcard {
  id: string;
  kiswahili: string;
  english: string;
  imageUrl: string;
  audioUrl?: string;
}

export interface FlashcardSet {
  categoryId: string;
  title: string;
  cards: Flashcard[];
}

export const FLASHCARD_SETS: FlashcardSet[] = [
  {
    categoryId: "nambari",
    title: "Nambari (Numbers)",
    cards: [
      { id: "num0", kiswahili: "sifuri", english: "zero", imageUrl: "/images/numbers/0.jpg" },
      { id: "num1", kiswahili: "moja", english: "one", imageUrl: "/images/numbers/1.jpg" },
      { id: "num2", kiswahili: "mbili", english: "two", imageUrl: "/images/numbers/2.jpg" },
      { id: "num3", kiswahili: "tatu", english: "three", imageUrl: "/images/numbers/3.jpg" },
      { id: "num4", kiswahili: "nne", english: "four", imageUrl: "/images/numbers/4.jpg" },
      { id: "num5", kiswahili: "tano", english: "five", imageUrl: "/images/numbers/5.jpg" },
      { id: "num6", kiswahili: "sita", english: "six", imageUrl: "/images/numbers/6.jpg" },
      { id: "num7", kiswahili: "saba", english: "seven", imageUrl: "/images/numbers/7.jpg" },
      { id: "num8", kiswahili: "nane", english: "eight", imageUrl: "/images/numbers/8.jpg" },
      { id: "num9", kiswahili: "tisa", english: "nine", imageUrl: "/images/numbers/9.jpg" },
      { id: "num10", kiswahili: "kumi", english: "ten", imageUrl: "/images/numbers/10.jpg" }
    ]
  },
  {
    categoryId: "rangi",
    title: "Rangi (Colors)",
    cards: [
      { id: "col1", kiswahili: "nyekundu", english: "red", imageUrl: "/images/colors/red.jpg" },
      { id: "col2", kiswahili: "nyeusi", english: "black", imageUrl: "/images/colors/black.jpg" },
      { id: "col3", kiswahili: "nyeupe", english: "white", imageUrl: "/images/colors/white.jpg" },
      { id: "col4", kiswahili: "kijani", english: "green", imageUrl: "/images/colors/green.jpg" },
      { id: "col5", kiswahili: "buluu", english: "blue", imageUrl: "/images/colors/blue.jpg" },
      { id: "col6", kiswahili: "njano", english: "yellow", imageUrl: "/images/colors/yellow.jpg" },
      { id: "col7", kiswahili: "kahawia", english: "brown", imageUrl: "/images/colors/brown.jpg" },
      { id: "col8", kiswahili: "waridi", english: "pink", imageUrl: "/images/colors/pink.jpg" }
    ]
  },
  {
    categoryId: "familia_ndogo",
    title: "Familia Ndogo (Nuclear Family)",
    cards: [
      { id: "fam1", kiswahili: "mama", english: "mother", imageUrl: "/images/family/mother.jpg" },
      { id: "fam2", kiswahili: "baba", english: "father", imageUrl: "/images/family/father.jpg" },
      { id: "fam3", kiswahili: "mtoto", english: "child", imageUrl: "/images/family/child.jpg" },
      { id: "fam4", kiswahili: "mwana", english: "son/daughter", imageUrl: "/images/family/son-daughter.jpg" },
      { id: "fam5", kiswahili: "kaka", english: "brother", imageUrl: "/images/family/brother.jpg" },
      { id: "fam6", kiswahili: "dada", english: "sister", imageUrl: "/images/family/sister.jpg" },
      { id: "fam7", kiswahili: "bibi", english: "grandmother", imageUrl: "/images/family/grandmother.jpg" },
      { id: "fam8", kiswahili: "babu", english: "grandfather", imageUrl: "/images/family/grandfather.jpg" }
    ]
  },
  {
    categoryId: "siku_za_wiki",
    title: "Siku za Wiki (Days of the Week)",
    cards: [
      { id: "day1", kiswahili: "Jumapili", english: "Sunday", imageUrl: "/images/days/sunday.jpg" },
      { id: "day2", kiswahili: "Jumatatu", english: "Monday", imageUrl: "/images/days/monday.jpg" },
      { id: "day3", kiswahili: "Jumanne", english: "Tuesday", imageUrl: "/images/days/tuesday.jpg" },
      { id: "day4", kiswahili: "Jumatano", english: "Wednesday", imageUrl: "/images/days/wednesday.jpg" },
      { id: "day5", kiswahili: "Alhamisi", english: "Thursday", imageUrl: "/images/days/thursday.jpg" },
      { id: "day6", kiswahili: "Ijumaa", english: "Friday", imageUrl: "/images/days/friday.jpg" },
      { id: "day7", kiswahili: "Jumamosi", english: "Saturday", imageUrl: "/images/days/saturday.jpg" }
    ]
  },
  {
    categoryId: "matunda",
    title: "Matunda (Fruits)",
    cards: [
      { id: "fruit1", kiswahili: "ndizi", english: "banana", imageUrl: "/images/fruits/banana.jpg" },
      { id: "fruit2", kiswahili: "chungwa", english: "orange", imageUrl: "/images/fruits/orange.jpg" },
      { id: "fruit3", kiswahili: "tufaha", english: "apple", imageUrl: "/images/fruits/apple.jpg" },
      { id: "fruit4", kiswahili: "nanasi", english: "pineapple", imageUrl: "/images/fruits/pineapple.jpg" },
      { id: "fruit5", kiswahili: "embe", english: "mango", imageUrl: "/images/fruits/mango.jpg" },
      { id: "fruit6", kiswahili: "papai", english: "papaya", imageUrl: "/images/fruits/papaya.jpg" },
      { id: "fruit7", kiswahili: "tikiti maji", english: "watermelon", imageUrl: "/images/fruits/watermelon.jpg" },
      { id: "fruit8", kiswahili: "zabibu", english: "grapes", imageUrl: "/images/fruits/grapes.jpg" },
      { id: "fruit9", kiswahili: "limau", english: "lemon", imageUrl: "/images/fruits/lemon.jpg" },
      { id: "fruit10", kiswahili: "nazi", english: "coconut", imageUrl: "/images/fruits/coconut.jpg" }
    ]
  },
  {
    categoryId: "familia_kubwa",
    title: "Familia Kubwa (Extended Family)",
    cards: [
      { id: "ext1", kiswahili: "shangazi", english: "aunt (father's sister)", imageUrl: "/images/extended-family/aunt.jpg" },
      { id: "ext2", kiswahili: "mjomba", english: "uncle (mother's brother)", imageUrl: "/images/extended-family/uncle.jpg" },
      { id: "ext3", kiswahili: "binamu", english: "cousin", imageUrl: "/images/extended-family/cousin.jpg" },
      { id: "ext4", kiswahili: "nyawira", english: "daughter-in-law", imageUrl: "/images/extended-family/daughter-in-law.jpg" },
      { id: "ext5", kiswahili: "mkwe", english: "son-in-law", imageUrl: "/images/extended-family/son-in-law.jpg" },
      { id: "ext6", kiswahili: "mpwa", english: "nephew/niece", imageUrl: "/images/extended-family/nephew-niece.jpg" },
      { id: "ext7", kiswahili: "kambo", english: "step-parent", imageUrl: "/images/extended-family/step-parent.jpg" },
      { id: "ext8", kiswahili: "mama mkubwa", english: "elder aunt", imageUrl: "/images/extended-family/elder-aunt.jpg" }
    ]
  },
  {
    categoryId: "miezi_ya_mwaka",
    title: "Miezi ya Mwaka (Months of the Year)",
    cards: [
      { id: "month1", kiswahili: "Januari", english: "January", imageUrl: "/images/months/january.jpg" },
      { id: "month2", kiswahili: "Februari", english: "February", imageUrl: "/images/months/february.jpg" },
      { id: "month3", kiswahili: "Machi", english: "March", imageUrl: "/images/months/march.jpg" },
      { id: "month4", kiswahili: "Aprili", english: "April", imageUrl: "/images/months/april.jpg" },
      { id: "month5", kiswahili: "Mei", english: "May", imageUrl: "/images/months/may.jpg" },
      { id: "month6", kiswahili: "Juni", english: "June", imageUrl: "/images/months/june.jpg" },
      { id: "month7", kiswahili: "Julai", english: "July", imageUrl: "/images/months/july.jpg" },
      { id: "month8", kiswahili: "Agosti", english: "August", imageUrl: "/images/months/august.jpg" },
      { id: "month9", kiswahili: "Septemba", english: "September", imageUrl: "/images/months/september.jpg" },
      { id: "month10", kiswahili: "Oktoba", english: "October", imageUrl: "/images/months/october.jpg" },
      { id: "month11", kiswahili: "Novemba", english: "November", imageUrl: "/images/months/november.jpg" },
      { id: "month12", kiswahili: "Desemba", english: "December", imageUrl: "/images/months/december.jpg" }
    ]
  }
];