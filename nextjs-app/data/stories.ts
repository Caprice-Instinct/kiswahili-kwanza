export interface Story {
  categoryId: string;
  title: string;
  titleEnglish: string;
  content: string;
  highlightedWords: Array<{
    kiswahili: string;
    english: string;
  }>;
}

export const CATEGORY_STORIES: Story[] = [
  {
    categoryId: "nambari",
    title: "Safari ya Nambari za Juma",
    titleEnglish: "Juma's Number Adventure",
    content: `Juma alipata <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="one">moja</span> shilingi barabarani. Alikimbia nyumbani na kuonyesha mama yake. "Tafuta <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="two">mbili</span> za ziada, utanunua pipi," mama alisema. Juma aliona <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="three">tatu</span> za chuma chini ya meza. Sasa ana <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="four">nne</span> shilingi! Alimwita kaka yake, "Tuna <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="five">tano</span> shilingi pamoja!" Kaka yake akaleta <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="six">sita</span> za ziada. Sasa wana <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="seven">saba</span> shilingi. Walinunua pipi <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="eight">nane</span> na wakabaki na <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="nine">tisa</span> shilingi. Mwisho wa siku, walikuwa na <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="ten">kumi</span> za akiba!`,
    highlightedWords: [
      { kiswahili: "moja", english: "one" },
      { kiswahili: "mbili", english: "two" },
      { kiswahili: "tatu", english: "three" },
      { kiswahili: "nne", english: "four" },
      { kiswahili: "tano", english: "five" },
      { kiswahili: "sita", english: "six" },
      { kiswahili: "saba", english: "seven" },
      { kiswahili: "nane", english: "eight" },
      { kiswahili: "tisa", english: "nine" },
      { kiswahili: "kumi", english: "ten" },
    ],
  },
  {
    categoryId: "rangi",
    title: "Siku ya Rangi Shuleni",
    titleEnglish: "Color Day at School",
    content: `Shuleni kwa Juma, walivaa mavazi ya rangi tofauti. Alichagua shati <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="red">nyekundu</span> na suruali <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="black">nyeusi</span>. Rafiki yake Amina alivaa gauni <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="white">nyeupe</span>. Walipaka rangi <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="green">kijani</span> kwenye mchoro wa miti. Mwalimu alileta kalamu <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="blue">buluu</span> na karatasi <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="yellow">njano</span>. Baadaye, waliona meza ya mbao <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="brown">kahawia</span> na maua <span class="highlight" style="font-weight:bold;color:#2563eb;background:#e0e7ff;padding:2px 6px;border-radius:4px;" data-english="pink">waridi</span> darasani. Ilikuwa siku ya rangi nyingi!`,
    highlightedWords: [
      { kiswahili: "nyekundu", english: "red" },
      { kiswahili: "nyeusi", english: "black" },
      { kiswahili: "nyeupe", english: "white" },
      { kiswahili: "kijani", english: "green" },
      { kiswahili: "buluu", english: "blue" },
      { kiswahili: "njano", english: "yellow" },
      { kiswahili: "kahawia", english: "brown" },
      { kiswahili: "waridi", english: "pink" },
    ],
  },
  {
    categoryId: "familia_ndogo",
    title: "Siku ya Familia ya Juma",
    titleEnglish: "Juma's Family Day",
    content: `Juma ana <span class="highlight" data-english="mother">mama</span> na <span class="highlight" data-english="father">baba</span> wanaompenda sana. Kila asubuhi, <span class="highlight" data-english="mother">mama</span> humwamsha Juma kwa upendo na kumwandalia chai tamu. <span class="highlight" data-english="father">Baba</span> humpeleka shule na kumpa ushauri wa maisha. Baada ya shule, <span class="highlight" data-english="brother">kaka</span> yake Juma humsaidia kufanya kazi za nyumbani kama kufagia na kupalilia bustani. <span class="highlight" data-english="sister">Dada</span> yake hupika chakula cha jioni na kumfundisha nyimbo mpya. Jioni, familia hukusanyika pamoja sebuleni kusimulia hadithi na kucheka. Mara nyingi, <span class="highlight" data-english="grandmother">nyanya</span> huleta vitafunwa na kusimulia hadithi za zamani, huku <span class="highlight" data-english="grandfather">babu</span> akifundisha watoto methali na misemo ya Kiswahili. Familia ya Juma inapendana, inashirikiana, na kila mtu ana jukumu muhimu. Usiku, kabla ya kulala, Juma humshukuru Mungu kwa kuwa na familia yenye furaha na upendo.`,
    highlightedWords: [
      { kiswahili: "mama", english: "mother" },
      { kiswahili: "baba", english: "father" },
      { kiswahili: "kaka", english: "brother" },
      { kiswahili: "dada", english: "sister" },
      { kiswahili: "nyanya", english: "grandmother" },
      { kiswahili: "babu", english: "grandfather" },
    ],
  },
  {
    categoryId: "siku_za_wiki",
    title: "Juma na Siku za Wiki",
    titleEnglish: "Juma and Days of the Week",
    content: `Kila siku ya wiki, Juma ana shughuli maalum na familia yake. 

<span class="highlight" data-english="Sunday">Jumapili</span> asubuhi, familia yote huenda kanisani na baadaye hula chakula cha mchana pamoja. Jioni, wanatembelea nyanya na babu na kusikiliza hadithi.

<span class="highlight" data-english="Monday">Jumatatu</span> ni siku ya masomo. Juma huamka mapema, mama humwandalia kifungua kinywa, na baba humpeleka shule. Jioni, Juma hufanya kazi za nyumbani na kusoma vitabu.

<span class="highlight" data-english="Tuesday">Jumanne</span> na <span class="highlight" data-english="Wednesday">Jumatano</span> ni siku za michezo shuleni. Juma hupenda kucheza mpira na marafiki zake baada ya masomo. Mama na dada yake huandaa chakula kitamu cha jioni.

<span class="highlight" data-english="Thursday">Alhamisi</span> ni siku ya soko. Baba na Juma hununua matunda na mboga sokoni. Usiku, familia hukusanyika na kucheza mchezo wa "karata" pamoja.

<span class="highlight" data-english="Friday">Ijumaa</span> ni siku ya usafi. Juma na kaka yake husafisha nyumba na kupalilia bustani. Mama huoka mkate na familia hula pamoja.

<span class="highlight" data-english="Saturday">Jumamosi</span> ni siku ya mapumziko na burudani. Familia huenda bustanini au kutazama filamu pamoja. Jioni, wanapanga shughuli za wiki ijayo na kucheka pamoja.

Juma anajifunza kwamba kila siku ya wiki ina umuhimu wake na inampa furaha na kumbukumbu nzuri na familia yake.`,
    highlightedWords: [
      { kiswahili: "Jumapili", english: "Sunday" },
      { kiswahili: "Jumatatu", english: "Monday" },
      { kiswahili: "Jumanne", english: "Tuesday" },
      { kiswahili: "Jumatano", english: "Wednesday" },
      { kiswahili: "Alhamisi", english: "Thursday" },
      { kiswahili: "Ijumaa", english: "Friday" },
      { kiswahili: "Jumamosi", english: "Saturday" },
    ],
  },
  {
    categoryId: "matunda",
    title: "Juma Ananunua Matunda Sokoni",
    titleEnglish: "Juma Buys Fruits at the Market",
    content: `Leo Juma anaenda sokoni kununua matunda pamoja na mama yake. Sokoni kuna matunda mengi mazuri!

"Nataka <span class="highlight" data-english="banana">ndizi</span> nzuri," mama anasema. Muuzaji anawaonyesha <span class="highlight" data-english="banana">ndizi</span> za manjano zilizo bivu.

Kando yake kuna <span class="highlight" data-english="orange">machungwa</span> makubwa. "Hii <span class="highlight" data-english="orange">chungwa</span> ni tamu sana," muuzaji anasema.

Juma anaona <span class="highlight" data-english="mango">miembe</span> ya kijani na ya manjano. "<span class="highlight" data-english="Mango">Embe</span> hili ni bivu," mama anasema.

Mbele yao kuna <span class="highlight" data-english="apple">matufaha</span> mekundu mazuri. Juma anapenda <span class="highlight" data-english="apple">tufaha</span> sana.

"Ona <span class="highlight" data-english="pineapple">nanasi</span> hii kubwa!" Juma anasema. <span class="highlight" data-english="Pineapple">Nanasi</span> ni kubwa na inaonekana tamu.

Mama ananunua pia <span class="highlight" data-english="papaya">papai</span>, <span class="highlight" data-english="watermelon">tikiti maji</span>, na <span class="highlight" data-english="grapes">zabibu</span>.

"Matunda ni chakula kizuri kwa afya," mama anamwambia Juma.`,
    highlightedWords: [
      { kiswahili: "ndizi", english: "banana" },
      { kiswahili: "chungwa", english: "orange" },
      { kiswahili: "tufaha", english: "apple" },
      { kiswahili: "nanasi", english: "pineapple" },
      { kiswahili: "embe", english: "mango" },
      { kiswahili: "papai", english: "papaya" },
      { kiswahili: "tikiti maji", english: "watermelon" },
      { kiswahili: "zabibu", english: "grapes" },
    ],
  },
  {
    categoryId: "familia_kubwa",
    title: "Juma na Familia Kubwa Sokoni",
    titleEnglish: "Juma and Extended Family at the Market",
    content: `Leo ni siku ya sherehe. Familia kubwa ya Juma wote wamekuja sokoni pamoja.

<span class="highlight" data-english="aunt (father's sister)">Shangazi</span> Fatuma amekuja kutoka Mombasa. <span class="highlight" data-english="Aunt (father's sister)">Shangazi</span> ni dada wa baba.

<span class="highlight" data-english="uncle (mother's brother)">Mjomba</span> Hassan pia amekuja. <span class="highlight" data-english="Uncle (mother's brother)">Mjomba</span> ni kaka wa mama.

<span class="highlight" data-english="Cousin">Binamu</span> yake Aisha ni mtoto wa <span class="highlight" data-english="aunt (father's sister)">shangazi</span>. <span class="highlight" data-english="Cousin">Binamu</span> Aisha ni mzuri sana.

<span class="highlight" data-english="Elder aunt">Mama mkubwa</span> Halima ni mkubwa kuliko mama. Yeye ni <span class="highlight" data-english="elder aunt">mama mkubwa</span> wa familia.

<span class="highlight" data-english="Younger uncle">Baba mdogo</span> Ali ni mdogo kuliko baba. <span class="highlight" data-english="Younger uncle">Baba mdogo</span> ana watoto wawili.

<span class="highlight" data-english="Nephew/niece">Mpwa</span> wake Juma ni mtoto wa <span class="highlight" data-english="cousin">binamu</span>. <span class="highlight" data-english="Nephew/niece">Mpwa</span> ni mdogo sana.

Familia kubwa inapenda kukutana sokoni. Wote wanapendeana na kusaidiana.`,
    highlightedWords: [
      { kiswahili: "shangazi", english: "aunt (father's sister)" },
      { kiswahili: "mjomba", english: "uncle (mother's brother)" },
      { kiswahili: "binamu", english: "cousin" },
      { kiswahili: "nyawira", english: "daughter-in-law" },
      { kiswahili: "mkwe", english: "son-in-law" },
      { kiswahili: "mpwa", english: "nephew/niece" },
      { kiswahili: "kambo", english: "step-parent" },
      { kiswahili: "mama mkubwa", english: "elder aunt" },
      { kiswahili: "baba mdogo", english: "younger uncle" },
    ],
  },
  {
    categoryId: "miezi_ya_mwaka",
    title: "Juma na Miezi ya Mwaka Sokoni",
    titleEnglish: "Juma and Months of the Year at the Market",
    content: `Juma anapenda kwenda sokoni miezi yote ya mwaka. Kila mwezi una chakula tofauti.

<span class="highlight" data-english="January">Januari</span> na <span class="highlight" data-english="February">Februari</span> ni miezi ya mvua. Sokoni kuna mboga nyingi za kijani.

<span class="highlight" data-english="March">Machi</span> na <span class="highlight" data-english="April">Aprili</span> ni miezi ya kupanda. Wakulima wanaleta mazao mapya sokoni.

<span class="highlight" data-english="May">Mei</span> na <span class="highlight" data-english="June">Juni</span> ni miezi ya baridi. Juma huvaa jaketi anapoenda sokoni.

<span class="highlight" data-english="July">Julai</span> na <span class="highlight" data-english="August">Agosti</span> ni miezi ya baridi sana. Chakula ni ghali miezi hii.

<span class="highlight" data-english="September">Septemba</span> na <span class="highlight" data-english="October">Oktoba</span> ni miezi ya joto kidogo. Matunda yaanza kuiva.

<span class="highlight" data-english="November">Novemba</span> na <span class="highlight" data-english="December">Desemba</span> ni miezi ya sherehe. Sokoni kuna chakula kingi cha sherehe.

"Kila mwezi una mazuri yake," mama anamwambia Juma. "Tunapenda kwenda sokoni miezi yote!"`,
    highlightedWords: [
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
      { kiswahili: "Desemba", english: "December" },
    ],
  },
];
