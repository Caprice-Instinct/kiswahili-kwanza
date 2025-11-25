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
    title: "Juma na Nambari za Sokoni",
    titleEnglish: "Juma and Numbers at the Market",
    content: `Juma ni mtoto mzuri wa miaka nane. Leo anaenda sokoni pamoja na mama yake. Mama anasema, "Juma, tunahitaji kununua vitu vingi leo."

Kwanza, wanaenda kwa muuzaji wa mayai. "Nataka mayai <span class="highlight" data-english="ten">kumi</span>," mama anasema. Juma anahesabu: "<span class="highlight" data-english="one">Moja</span>, <span class="highlight" data-english="two">mbili</span>, <span class="highlight" data-english="three">tatu</span>, <span class="highlight" data-english="four">nne</span>, <span class="highlight" data-english="five">tano</span>, <span class="highlight" data-english="six">sita</span>, <span class="highlight" data-english="seven">saba</span>, <span class="highlight" data-english="eight">nane</span>, <span class="highlight" data-english="nine">tisa</span>, <span class="highlight" data-english="ten">kumi</span>!"

Baadaye, wanaenda kwa muuzaji wa mikate. "Tunataka mikate <span class="highlight" data-english="five">tano</span>," mama anasema. Juma anafurahi kujua nambari zote.

Mwishowe, mama anasema, "Juma, umejifunza nambari vizuri sana leo!"`,
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
      { kiswahili: "kumi", english: "ten" }
    ]
  },
  {
    categoryId: "rangi",
    title: "Juma na Rangi za Sokoni",
    titleEnglish: "Juma and Colors at the Market",
    content: `Juma anaenda sokoni na mama yake. Sokoni kuna rangi nyingi za kupendeza!

"Ona Juma," mama anasema, "nyanya hizi ni <span class="highlight" data-english="red">nyekundu</span> sana!" Juma anaona nyanya <span class="highlight" data-english="red">nyekundu</span> za kupendeza.

Kando yake kuna mahindi ya <span class="highlight" data-english="yellow">njano</span>. "Mahindi haya ya <span class="highlight" data-english="yellow">njano</span> ni mazuri," mama anasema.

Mbele yao kuna mboga za <span class="highlight" data-english="green">kijani</span>. Sukuma wiki na kabichi vyote ni <span class="highlight" data-english="green">kijani</span>.

Muuzaji ana kofia <span class="highlight" data-english="blue">buluu</span> na nguo <span class="highlight" data-english="white">nyeupe</span>. Miguu yake ina viatu <span class="highlight" data-english="black">nyeusi</span>.

"Nataka kununua maua ya <span class="highlight" data-english="pink">waridi</span>," mama anasema. Maua ya <span class="highlight" data-english="pink">waridi</span> ni mazuri sana.

Juma anafurahi kuona rangi zote hizi sokoni!`,
    highlightedWords: [
      { kiswahili: "nyekundu", english: "red" },
      { kiswahili: "nyeusi", english: "black" },
      { kiswahili: "nyeupe", english: "white" },
      { kiswahili: "kijani", english: "green" },
      { kiswahili: "buluu", english: "blue" },
      { kiswahili: "njano", english: "yellow" },
      { kiswahili: "kahawia", english: "brown" },
      { kiswahili: "waridi", english: "pink" }
    ]
  },
  {
    categoryId: "familia_ndogo",
    title: "Juma na Familia Yake Sokoni",
    titleEnglish: "Juma and His Family at the Market",
    content: `Leo ni siku ya jumamosi. Juma anaenda sokoni pamoja na familia yake yote.

<span class="highlight" data-english="Mother">Mama</span> yake anabeba mkoba mkubwa. <span class="highlight" data-english="Father">Baba</span> yake anabeba pesa za kununulia chakula.

<span class="highlight" data-english="Sister">Dada</span> yake Amina ni <span class="highlight" data-english="child">mtoto</span> mdogo. Yeye ni <span class="highlight" data-english="son/daughter">mwana</span> wa pili katika familia.

<span class="highlight" data-english="Brother">Kaka</span> yake Omari ni mkubwa kuliko Juma. Yeye ni <span class="highlight" data-english="son/daughter">mwana</span> wa kwanza.

Sokoni wanakutana na <span class="highlight" data-english="grandmother">bibi</span> yao. <span class="highlight" data-english="Grandmother">Bibi</span> anafurahi kuwaona. "Wapi <span class="highlight" data-english="grandfather">babu</span>?" Juma anauliza.

"<span class="highlight" data-english="Grandfather">Babu</span> yu nyumbani," <span class="highlight" data-english="grandmother">bibi</span> anasema.

Familia ya Juma ni ndogo lakini wanapendeana sana. Kila <span class="highlight" data-english="child">mtoto</span> anapendwa na wazazi wake.`,
    highlightedWords: [
      { kiswahili: "mama", english: "mother" },
      { kiswahili: "baba", english: "father" },
      { kiswahili: "mtoto", english: "child" },
      { kiswahili: "mwana", english: "son/daughter" },
      { kiswahili: "kaka", english: "brother" },
      { kiswahili: "dada", english: "sister" },
      { kiswahili: "bibi", english: "grandmother" },
      { kiswahili: "babu", english: "grandfather" }
    ]
  },
  {
    categoryId: "siku_za_wiki",
    title: "Juma na Siku za Wiki",
    titleEnglish: "Juma and Days of the Week",
    content: `Juma anapenda kwenda sokoni siku tofauti za wiki.

<span class="highlight" data-english="Sunday">Jumapili</span> ni siku ya pumziko. Familia haendi sokoni <span class="highlight" data-english="Sunday">Jumapili</span>.

<span class="highlight" data-english="Monday">Jumatatu</span> ni siku ya kwanza ya shule. Mama huenda sokoni <span class="highlight" data-english="Monday">Jumatatu</span> asubuhi.

<span class="highlight" data-english="Tuesday">Jumanne</span> na <span class="highlight" data-english="Wednesday">Jumatano</span> ni siku za kazi. Baba huenda kazini siku hizi.

<span class="highlight" data-english="Thursday">Alhamisi</span> ni siku nzuri ya kwenda sokoni. Chakula ni kipya <span class="highlight" data-english="Thursday">Alhamisi</span>.

<span class="highlight" data-english="Friday">Ijumaa</span> ni siku ya maandalizi ya wikendi. Mama hununua chakula kingi <span class="highlight" data-english="Friday">Ijumaa</span>.

<span class="highlight" data-english="Saturday">Jumamosi</span> ni siku ya kupenda zaidi ya Juma. Familia yote huenda sokoni <span class="highlight" data-english="Saturday">Jumamosi</span> pamoja.

"Kila siku ya wiki ni muhimu," mama anasema kwa Juma.`,
    highlightedWords: [
      { kiswahili: "Jumapili", english: "Sunday" },
      { kiswahili: "Jumatatu", english: "Monday" },
      { kiswahili: "Jumanne", english: "Tuesday" },
      { kiswahili: "Jumatano", english: "Wednesday" },
      { kiswahili: "Alhamisi", english: "Thursday" },
      { kiswahili: "Ijumaa", english: "Friday" },
      { kiswahili: "Jumamosi", english: "Saturday" }
    ]
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
      { kiswahili: "zabibu", english: "grapes" }
    ]
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
      { kiswahili: "baba mdogo", english: "younger uncle" }
    ]
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
      { kiswahili: "Desemba", english: "December" }
    ]
  }
];