/**
 * Centrálne dáta webu Daviclean.
 * Kontakty, ceny a texty meňte tu — premietnu sa do celého webu.
 */

export const site = {
  name: "Daviclean",
  legalName: "Daviclean s.r.o.",
  claim: "Profesionálne čistenie",
  slogan: "Čistota, ktorá je vidieť.",
  url: "https://www.daviclean.sk",
  phone: "+421 910 123 456",
  phoneHref: "+421910123456",
  email: "info@daviclean.sk",
  contactPerson: "David Slovák",
  contactRole: "konateľ / CEO",
  region: "Bratislava a okolie",
  address: {
    street: "Doplňte ulicu a číslo",
    city: "Bratislava",
    zip: "851 01",
    country: "SK",
  },
  ico: "00000000",
  dic: "0000000000",
  hours: "Pondelok – Sobota, 8:00 – 18:00",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export type Service = {
  slug: string;
  /** Krátky názov do kariet a navigácie */
  title: string;
  /** Nadpis H1 na detailnej stránke */
  heading: string;
  category: "domov" | "auto" | "firmy" | "exterier" | "afterbuild" | "ozon";
  icon: string;
  excerpt: string;
  priceFrom: string;
  duration: string;
  intro: string;
  bullets: string[];
  process: string[];
  metaTitle: string;
  metaDescription: string;
};

export const categories = [
  {
    key: "domov",
    label: "Domov",
    brand: "DAVICLEAN HOME",
    icon: "home",
    tagline: "Gauče · Matrace · Koberce · Postele",
    description:
      "Hĺbkové tepovanie sedačiek, matracov, kobercov a postelí priamo u vás doma. Bez sťahovania nábytku, s rýchlym schnutím.",
    href: "/sluzby#domov",
  },
  {
    key: "auto",
    label: "Auto",
    brand: "DAVICLEAN AUTO",
    icon: "car",
    tagline: "Tepovanie interiéru · Ozónovanie · Koža · Plasty",
    description:
      "Kompletné čistenie interiéru auta — sedačky, koberce, čalúnenie, plasty aj koža. Odstránenie zápachu ozónom.",
    href: "/sluzby#auto",
  },
  {
    key: "firmy",
    label: "Firmy",
    brand: "DAVICLEAN OFFICE",
    icon: "building",
    tagline: "Kancelárie · Stoličky · Koberce · Okná",
    description:
      "Pravidelný aj jednorazový servis pre kancelárie, prevádzky a hotely. Pracujeme aj mimo pracovných hodín.",
    href: "/sluzby#firmy",
  },
  {
    key: "exterier",
    label: "Exteriér",
    brand: "DAVICLEAN PRO",
    icon: "spray",
    tagline: "Graffiti · Fasády · Tlakové čistenie · Dlažby",
    description:
      "Tlakové čistenie dlažby, terás a fasád, odstraňovanie graffiti a impregnácia povrchov.",
    href: "/sluzby#exterier",
  },
  {
    key: "afterbuild",
    label: "After Build",
    brand: "DAVICLEAN AFTER BUILD",
    icon: "hardhat",
    tagline: "Stavebné čistenie · Okná · Prach · Zvyšky",
    description:
      "Porealizačné upratovanie po stavbe či rekonštrukcii — od hrubého prachu po finálne leštenie okien.",
    href: "/sluzby#afterbuild",
  },
  {
    key: "ozon",
    label: "Ozónovanie",
    brand: "DAVICLEAN OZONE",
    icon: "wind",
    tagline: "Odstránenie zápachu · Dezinfekcia · Bezpečne a účinne",
    description:
      "Ozónová dezinfekcia priestorov a áut. Odstráni zápach z cigariet, plesní, zvierat aj po záplave.",
    href: "/sluzby#ozon",
  },
] as const;

export const services: Service[] = [
  {
    slug: "tepovanie-gaucov-a-sedaciek",
    title: "Tepovanie gaučov a sedačiek",
    heading: "Tepovanie gaučov a sedačiek",
    category: "domov",
    icon: "sofa",
    excerpt:
      "Hĺbkové vyčistenie čalúnenia extrakčnou metódou. Odstránime škvrny, roztoče aj zápach.",
    priceFrom: "od 45 €",
    duration: "60 – 120 minút",
    intro:
      "Sedačka je najpoužívanejší kus nábytku v domácnosti a zároveň ten, ktorý sa čistí najmenej často. V čalúnení sa usádza prach, pot, mastnota, roztoče aj zvyšky jedla. Bežné vysávanie odstráni len povrchové nečistoty — my čistíme extrakčnou metódou, ktorá nečistoty vyplaví z hĺbky vlákien a hneď ich odsaje.",
    bullets: [
      "Profesionálna extrakčná technika s vysokým podtlakom",
      "Predošetrenie škvŕn podľa typu látky a znečistenia",
      "Vhodné pre látku, mikroplyš, alcantaru aj kožu",
      "Odstránenie roztočov a alergénov — úľava pre alergikov",
      "Ekologická chémia bezpečná pre deti aj domáce zvieratá",
      "Rýchle schnutie — sedačka je použiteľná do 4 – 6 hodín",
    ],
    process: [
      "Obhliadka čalúnenia a test látky na skrytom mieste",
      "Dôkladné vysatie suchých nečistôt a prachu",
      "Aplikácia predčistiaceho prostriedku na škvrny",
      "Extrakčné tepovanie a odsatie nečistôt",
      "Neutralizácia, vyčesanie vlákien a rýchle vysušenie",
    ],
    metaTitle: "Tepovanie gaučov a sedačiek Bratislava | Daviclean",
    metaDescription:
      "Profesionálne tepovanie sedačiek a gaučov v Bratislave a okolí. Hĺbkové čistenie extrakčnou metódou, ekologická chémia, rýchle schnutie. Cena od 45 €.",
  },
  {
    slug: "tepovanie-matracov",
    title: "Tepovanie matracov",
    heading: "Tepovanie a dezinfekcia matracov",
    category: "domov",
    icon: "bed",
    excerpt:
      "Odstránenie roztočov, potu a alergénov z matraca. Zdravší spánok už po prvom čistení.",
    priceFrom: "od 35 €",
    duration: "45 – 90 minút",
    intro:
      "Na matraci strávite tretinu života. Za ten čas sa v ňom nazbiera pot, odumretá koža, roztoče a ich alergény. Hĺbkové tepovanie matraca odporúčame minimálne raz ročne, pri alergikoch a malých deťoch dvakrát ročne.",
    bullets: [
      "Hĺbkové čistenie oboch strán matraca",
      "Účinné odstránenie roztočov a ich alergénov",
      "Odstránenie škvŕn od potu, moču a nápojov",
      "Antibakteriálna úprava a neutralizácia zápachu",
      "Bezpečné aj pre detské a penové matrace",
      "Možnosť doplniť ozónovaním pre 100 % dezinfekciu",
    ],
    process: [
      "Posúdenie typu matraca a stupňa znečistenia",
      "Intenzívne vysatie povrchu aj bokov",
      "Predošetrenie škvŕn enzymatickým prípravkom",
      "Extrakčné tepovanie s antibakteriálnou zložkou",
      "Sušenie a kontrola výsledku so zákazníkom",
    ],
    metaTitle: "Tepovanie matracov Bratislava | Odstránenie roztočov | Daviclean",
    metaDescription:
      "Hĺbkové tepovanie a dezinfekcia matracov v Bratislave. Odstránime roztoče, pot, škvrny aj zápach. Ideálne pre alergikov a deti. Cena od 35 €.",
  },
  {
    slug: "cistenie-kobercov",
    title: "Čistenie kobercov",
    heading: "Tepovanie a čistenie kobercov",
    category: "domov",
    icon: "layers",
    excerpt:
      "Kusové koberce aj celoplošné podlahy. Vrátime im pôvodnú farbu a mäkkosť.",
    priceFrom: "od 3 €/m²",
    duration: "podľa plochy",
    intro:
      "Koberec je najväčší filter v miestnosti — zachytáva prach, peľ a nečistoty z topánok. Tepujeme kusové koberce aj celoplošné podlahové krytiny priamo na mieste, bez potreby odvozu.",
    bullets: [
      "Tepovanie kusových kobercov aj celoplošných krytín",
      "Šetrné k vlne, viskóze aj syntetickým vláknam",
      "Odstránenie zaschnutých škvŕn a stôp po chôdzi",
      "Oživenie farieb a napriamenie vlákien",
      "Možnosť impregnácie proti opätovnému znečisteniu",
      "Čistíme aj kancelárske koberce po pracovnej dobe",
    ],
    process: [
      "Kontrola materiálu a stálofarebnosti",
      "Dôkladné suché vysatie celej plochy",
      "Predčistenie namáhaných zón a škvŕn",
      "Extrakčné tepovanie s odsatím vody",
      "Vyčesanie vlasu a nastavenie sušenia",
    ],
    metaTitle: "Čistenie a tepovanie kobercov Bratislava | Daviclean",
    metaDescription:
      "Tepovanie kusových aj celoplošných kobercov v Bratislave a okolí. Odstránenie škvŕn, oživenie farieb, impregnácia. Cena od 3 €/m².",
  },
  {
    slug: "cistenie-aut-interier",
    title: "Čistenie áut (interiér)",
    heading: "Čistenie a tepovanie interiéru auta",
    category: "auto",
    icon: "car",
    excerpt:
      "Sedačky, koberce, strop, plasty aj koža. Auto ako nové — vrátane odstránenia zápachu.",
    priceFrom: "od 69 €",
    duration: "2 – 4 hodiny",
    intro:
      "Interiér auta zažije viac než obývačka — jedlo, blato, zvieratá, cigarety. Kompletné čistenie interiéru zahŕňa tepovanie čalúnenia a kobercov, ošetrenie plastov a kože a finálne odstránenie zápachu.",
    bullets: [
      "Tepovanie sedačiek, kobercov a stropu",
      "Čistenie a výživa kožených sedadiel",
      "Ošetrenie plastov bez mastného filmu",
      "Čistenie klimatizácie a odstránenie zápachu ozónom",
      "Umytie okien zvnútra a detail dverových výplní",
      "Príprava auta pred predajom alebo vrátením z lízingu",
    ],
    process: [
      "Vyloženie interiéru a vyfúkanie prachu",
      "Suché vysatie vrátane škár a batožinového priestoru",
      "Predčistenie škvŕn a extrakčné tepovanie",
      "Ošetrenie plastov, kože a okien",
      "Ozónovanie pre odstránenie zápachu (voliteľné)",
    ],
    metaTitle: "Čistenie interiéru auta Bratislava | Tepovanie sedadiel | Daviclean",
    metaDescription:
      "Kompletné čistenie interiéru auta v Bratislave — tepovanie sedadiel a kobercov, ošetrenie kože a plastov, ozónovanie proti zápachu. Cena od 69 €.",
  },
  {
    slug: "odstranovanie-graffiti",
    title: "Odstraňovanie graffiti",
    heading: "Odstraňovanie graffiti a antigraffiti ochrana",
    category: "exterier",
    icon: "spray",
    excerpt:
      "Šetrné odstránenie sprejov z fasád, betónu, tehly aj kovu — bez poškodenia povrchu.",
    priceFrom: "individuálne",
    duration: "podľa rozsahu",
    intro:
      "Graffiti odstraňujeme kombináciou špeciálnej chémie a horúcej tlakovej vody. Postup vždy volíme podľa typu podkladu tak, aby zostal neporušený — inak je pri omietkach či historických fasádach riziko trvalého poškodenia.",
    bullets: [
      "Fasády, omietky, betón, tehla, kameň, kov aj sklo",
      "Šetrné odstránenie bez narušenia povrchu",
      "Horúca tlaková voda a biologicky odbúrateľná chémia",
      "Následná antigraffiti impregnácia povrchu",
      "Rýchly zásah pre správcov budov a obce",
      "Výjazd aj na opakované znečistenie v rámci zmluvy",
    ],
    process: [
      "Obhliadka podkladu a test na skúšobnej ploche",
      "Voľba vhodného odstraňovača podľa typu farby",
      "Aplikácia, pôsobenie a mechanické uvoľnenie",
      "Oplach horúcou tlakovou vodou",
      "Voliteľná antigraffiti ochranná vrstva",
    ],
    metaTitle: "Odstraňovanie graffiti Bratislava | Čistenie fasád | Daviclean",
    metaDescription:
      "Profesionálne odstraňovanie graffiti z fasád, betónu, tehly a kovu v Bratislave. Šetrná technológia, antigraffiti ochrana. Cenová ponuka zdarma.",
  },
  {
    slug: "tlakove-cistenie-dlazby-a-fasad",
    title: "Tlakové čistenie dlažby a fasád",
    heading: "Tlakové čistenie dlažby, terás a fasád",
    category: "exterier",
    icon: "droplets",
    excerpt:
      "Zámková dlažba, terasy, schody, fasády. Odstránime machy, riasy aj zelený povlak.",
    priceFrom: "od 2,50 €/m²",
    duration: "podľa plochy",
    intro:
      "Zámková dlažba, terasa či fasáda po pár rokoch stmavne — vrstvu tvoria riasy, machy a mestský prach. Tlakové čistenie im vráti pôvodný vzhľad, následná impregnácia predĺži efekt na niekoľko sezón.",
    bullets: [
      "Zámková dlažba, betón, kameň, terasy a schodiská",
      "Fasády rodinných domov aj bytových budov",
      "Odstránenie machov, rias a zeleného povlaku",
      "Doplnenie kremičitého piesku do škár",
      "Impregnácia proti vode, mastnote a opätovnému zaneseniu",
      "Čistenie odkvapov, plotov a garážových vjazdov",
    ],
    process: [
      "Zameranie plochy a odsúhlasenie ceny",
      "Príprava plochy a ochrana okolia",
      "Tlakové čistenie rotačnou hlavou",
      "Dopieskovanie škár pri zámkovej dlažbe",
      "Voliteľná impregnácia povrchu",
    ],
    metaTitle: "Tlakové čistenie dlažby a fasád Bratislava | Daviclean",
    metaDescription:
      "Tlakové čistenie zámkovej dlažby, terás, schodísk a fasád v Bratislave a okolí. Odstránenie machov a rias, dopieskovanie, impregnácia. Od 2,50 €/m².",
  },
  {
    slug: "ozonovanie-odstranenie-zapachu",
    title: "Ozónovanie – odstránenie zápachu",
    heading: "Ozónovanie a dezinfekcia priestorov",
    category: "ozon",
    icon: "wind",
    excerpt:
      "Cigarety, pleseň, zvieratá, po záplave. Ozón zápach neprekryje — zlikviduje jeho zdroj.",
    priceFrom: "od 59 €",
    duration: "2 – 6 hodín",
    intro:
      "Ozón je plyn, ktorý sa dostane všade tam, kde sa čistiaci prostriedok nedostane — do textílií, škár aj vzduchotechniky. Oxidáciou zničí baktérie, vírusy, plesne aj molekuly zápachu. Po ošetrení sa rozpadá späť na kyslík a nezanecháva rezíduá.",
    bullets: [
      "Byty, domy, kancelárie, prevádzky aj autá",
      "Zápach z cigariet, plesní, zvierat, jedla či po záplave",
      "Dezinfekcia po chorobe alebo po predchádzajúcom nájomníkovi",
      "Ošetrenie vzduchotechniky a klimatizácie",
      "Bez chemických zvyškov — ozón sa mení späť na kyslík",
      "Priestor je použiteľný krátko po vyvetraní",
    ],
    process: [
      "Zhodnotenie zdroja zápachu a objemu priestoru",
      "Uzavretie priestoru a rozmiestnenie generátorov",
      "Ozónovanie s cirkuláciou vzduchu",
      "Rozpad ozónu a intenzívne vyvetranie",
      "Kontrola výsledku a odovzdanie priestoru",
    ],
    metaTitle: "Ozónovanie a odstránenie zápachu Bratislava | Daviclean",
    metaDescription:
      "Ozónovanie bytov, domov, kancelárií a áut v Bratislave. Odstránime zápach z cigariet, plesní a zvierat, dezinfikujeme priestor. Cena od 59 €.",
  },
  {
    slug: "hlbkove-cistenie-kancelarii",
    title: "Hĺbkové čistenie kancelárií",
    heading: "Hĺbkové čistenie kancelárií a prevádzok",
    category: "firmy",
    icon: "building",
    excerpt:
      "Stoličky, koberce, sedacie zostavy aj okná. Pracujeme mimo vašich pracovných hodín.",
    priceFrom: "podľa rozsahu",
    duration: "dohodou",
    intro:
      "Kancelárske stoličky a koberce sú vystavené dennému zaťaženiu desiatok ľudí. Hĺbkové čistenie robíme večer, cez víkend alebo v dohodnutom okne, aby sme neprerušili chod firmy. Pre stálych klientov nastavíme pravidelný servisný interval.",
    bullets: [
      "Tepovanie kancelárskych stoličiek a sedacích zostáv",
      "Celoplošné koberce, chodby a zasadačky",
      "Umývanie okien a presklených priečok",
      "Práca mimo pracovných hodín a cez víkendy",
      "Pravidelný servis 1× štvrťročne alebo polročne",
      "Faktúra so splatnosťou, rámcová zmluva pre firmy",
    ],
    process: [
      "Bezplatná obhliadka priestorov a zameranie plôch",
      "Cenová ponuka a naplánovanie termínu",
      "Realizácia mimo prevádzkových hodín",
      "Kontrola kvality so zodpovednou osobou",
      "Nastavenie pravidelného intervalu (voliteľné)",
    ],
    metaTitle: "Hĺbkové čistenie kancelárií Bratislava | Servis pre firmy | Daviclean",
    metaDescription:
      "Čistenie kancelárií, stoličiek, kobercov a okien v Bratislave. Pracujeme mimo pracovných hodín, pravidelný servis a faktúra pre firmy.",
  },
  {
    slug: "porealizacne-stavebne-cistenie",
    title: "Porealizačné (stavebné) čistenie",
    heading: "Porealizačné a stavebné čistenie",
    category: "afterbuild",
    icon: "hardhat",
    excerpt:
      "Po stavbe či rekonštrukcii. Od hrubého prachu a zvyškov materiálu po finálne leštenie.",
    priceFrom: "od 4 €/m²",
    duration: "1 – 3 dni",
    intro:
      "Po stavbe zostáva jemný prach v každej škáre, zvyšky lepidiel, malty a fólií. Porealizačné čistenie robíme v dvoch fázach — hrubé odstránenie zvyškov a následné finálne čistenie, po ktorom sa dá priestor rovno zariaďovať.",
    bullets: [
      "Novostavby, rekonštrukcie, kolaudácie",
      "Odstránenie stavebného prachu z celého priestoru",
      "Zvyšky malty, lepidiel, silikónu, fólií a nálepiek",
      "Umytie okien vrátane rámov a parapetov",
      "Čistenie sanity, obkladov a podláh",
      "Odvoz odpadu po dohode",
    ],
    process: [
      "Obhliadka a zameranie podlahovej plochy",
      "Hrubé upratanie a odstránenie zvyškov materiálu",
      "Odstránenie prachu zo všetkých plôch a škár",
      "Umytie okien, sanity a podláh",
      "Finálna kontrola a odovzdanie priestoru",
    ],
    metaTitle: "Porealizačné a stavebné čistenie Bratislava | Daviclean",
    metaDescription:
      "Upratovanie po stavbe a rekonštrukcii v Bratislave a okolí. Odstránenie stavebného prachu, zvyškov malty a lepidiel, umytie okien. Od 4 €/m².",
  },
];

export const advantages = [
  {
    icon: "settings",
    title: "Profesionálna technika",
    text: "Priemyselné extraktory, tlakové stroje a ozónové generátory — nie požičaný tepovač z hobbymarketu.",
  },
  {
    icon: "leaf",
    title: "Ekologické prostriedky",
    text: "Certifikovaná chémia bezpečná pre deti, alergikov aj domáce zvieratá.",
  },
  {
    icon: "check",
    title: "Dôkladnosť a spoľahlivosť",
    text: "Prídeme v dohodnutom čase a odchádzame až vtedy, keď je výsledok naozaj vidieť.",
  },
  {
    icon: "zap",
    title: "Flexibilita a rýchly výjazd",
    text: "Väčšinu zákaziek v Bratislave vieme zrealizovať do 24 – 48 hodín.",
  },
  {
    icon: "shield",
    title: "100 % spokojnosť",
    text: "Ak výsledok nezodpovedá dohode, prídeme znova — bez doplatku.",
  },
];

export const stats = [
  { icon: "users", value: "500+", label: "Spokojných zákazníkov" },
  { icon: "star", value: "5,0", label: "Priemerné hodnotenie" },
  { icon: "target", value: "100 %", label: "Spoľahlivosť" },
  { icon: "pin", value: "Bratislava", label: "a okolie" },
];

export const steps = [
  {
    icon: "phone",
    title: "Kontaktujete nás",
    text: "Telefonicky alebo cez formulár. Opíšete, čo treba vyčistiť — ideálne s fotkou.",
  },
  {
    icon: "calendar",
    title: "Dohodneme termín",
    text: "Obratom pošleme cenovú ponuku a navrhneme najbližší voľný termín.",
  },
  {
    icon: "truck",
    title: "Prídeme a vyčistíme",
    text: "Prídeme s vlastnou technikou aj vodou. Vy nemusíte nič pripravovať.",
  },
  {
    icon: "thumbs",
    title: "Užívate si čistotu",
    text: "Výsledok spolu skontrolujeme. Platíte až po dokončení práce.",
  },
];

export const reasons = [
  "Profesionálny prístup",
  "Ekologické čistenie",
  "Moderná technika",
  "Rýchly výjazd",
  "Overené postupy",
  "Záruka kvality",
  "Vlastná voda aj elektrocentrála",
  "Faktúra pre firmy",
];

export type PriceGroup = {
  title: string;
  note?: string;
  items: { label: string; price: string; note?: string }[];
};

/** Orientačný cenník — finálnu cenu potvrdzujeme po obhliadke alebo podľa fotky. */
export const pricing: PriceGroup[] = [
  {
    title: "Sedačky a čalúnený nábytok",
    items: [
      { label: "Kreslo / ušiak", price: "od 20 €" },
      { label: "Dvojsedačka", price: "od 45 €" },
      { label: "Trojsedačka", price: "od 55 €" },
      { label: "Rohová sedačka", price: "od 75 €" },
      { label: "Stolička s čalúneným sedákom", price: "od 6 € / ks" },
      { label: "Kancelárska stolička", price: "od 9 € / ks" },
    ],
  },
  {
    title: "Matrace a postele",
    items: [
      { label: "Matrac jednolôžko (90 × 200)", price: "od 35 €" },
      { label: "Matrac dvojlôžko (160 – 180 × 200)", price: "od 49 €" },
      { label: "Detský matrac", price: "od 25 €" },
      { label: "Čalúnené čelo postele", price: "od 20 €" },
      { label: "Antibakteriálna úprava", price: "+ 10 €" },
    ],
  },
  {
    title: "Koberce a podlahy",
    items: [
      { label: "Kusový koberec", price: "od 3 € / m²", note: "min. 25 €" },
      { label: "Celoplošný koberec", price: "od 2,50 € / m²" },
      { label: "Kancelárske priestory", price: "od 2 € / m²", note: "nad 100 m²" },
      { label: "Impregnácia koberca", price: "+ 1 € / m²" },
    ],
  },
  {
    title: "Autá",
    items: [
      { label: "Tepovanie interiéru — malé auto", price: "od 69 €" },
      { label: "Tepovanie interiéru — SUV / kombi", price: "od 89 €" },
      { label: "Tepovanie interiéru — dodávka / 7-miestne", price: "od 109 €" },
      { label: "Čistenie a výživa kože", price: "od 45 €" },
      { label: "Ozónovanie auta", price: "od 39 €" },
    ],
  },
  {
    title: "Exteriér a tlakové čistenie",
    items: [
      { label: "Zámková dlažba / terasa", price: "od 2,50 € / m²" },
      { label: "Dopieskovanie škár", price: "od 0,60 € / m²" },
      { label: "Impregnácia dlažby", price: "od 1,50 € / m²" },
      { label: "Fasáda", price: "od 3 € / m²" },
      { label: "Odstránenie graffiti", price: "individuálne" },
    ],
  },
  {
    title: "Ozónovanie a stavebné čistenie",
    items: [
      { label: "Ozónovanie priestoru do 50 m²", price: "od 59 €" },
      { label: "Ozónovanie priestoru nad 50 m²", price: "individuálne" },
      { label: "Porealizačné čistenie", price: "od 4 € / m²" },
      { label: "Umývanie okien po stavbe", price: "od 2 € / m²" },
    ],
  },
];

/* ---------- kalkulačka orientačnej ceny ---------- */

export const MIN_ORDER = 40;
export const DELIVERY_FEE = 10;
export const FREE_DELIVERY_FROM = 60;

export type CalcItem = {
  id: string;
  label: string;
  /** jednotková cena v eurách */
  price: number;
  unit: "ks" | "m2";
  /** predvolená hodnota pri zapnutí položky s jednotkou m² */
  step?: number;
};

/**
 * Položky kalkulačky — ceny musia sedieť s `pricing` vyššie.
 * Pri zmene cenníka upravte obe miesta.
 */
export const calculator: { group: string; items: CalcItem[] }[] = [
  {
    group: "Domácnosť",
    items: [
      { id: "kreslo", label: "Kreslo / ušiak", price: 20, unit: "ks" },
      { id: "dvojsedacka", label: "Dvojsedačka", price: 45, unit: "ks" },
      { id: "trojsedacka", label: "Trojsedačka", price: 55, unit: "ks" },
      { id: "roh", label: "Rohová sedačka", price: 75, unit: "ks" },
      { id: "stolicka", label: "Stolička s čalúneným sedákom", price: 6, unit: "ks" },
      { id: "matrac1", label: "Matrac jednolôžko", price: 35, unit: "ks" },
      { id: "matrac2", label: "Matrac dvojlôžko", price: 49, unit: "ks" },
      { id: "koberec", label: "Kusový koberec", price: 3, unit: "m2", step: 10 },
      { id: "koberec-celo", label: "Celoplošný koberec", price: 2.5, unit: "m2", step: 20 },
    ],
  },
  {
    group: "Auto",
    items: [
      { id: "auto-male", label: "Interiér — malé auto", price: 69, unit: "ks" },
      { id: "auto-suv", label: "Interiér — SUV / kombi", price: 89, unit: "ks" },
      { id: "auto-dodavka", label: "Interiér — dodávka / 7-miestne", price: 109, unit: "ks" },
      { id: "auto-koza", label: "Čistenie a výživa kože", price: 45, unit: "ks" },
      { id: "auto-ozon", label: "Ozónovanie auta", price: 39, unit: "ks" },
    ],
  },
  {
    group: "Priestory a exteriér",
    items: [
      { id: "kancelaria", label: "Kancelárske koberce", price: 2, unit: "m2", step: 50 },
      { id: "dlazba", label: "Zámková dlažba / terasa", price: 2.5, unit: "m2", step: 30 },
      { id: "fasada", label: "Fasáda", price: 3, unit: "m2", step: 40 },
      { id: "ozon", label: "Ozónovanie priestoru do 50 m²", price: 59, unit: "ks" },
      { id: "po-stavbe", label: "Porealizačné čistenie", price: 4, unit: "m2", step: 40 },
    ],
  },
];

export const faq = [
  {
    q: "Koľko stojí vyčistenie sedačky alebo koberca?",
    a: "Trojsedačku vyčistíme od 55 €, rohovú sedačku od 75 € a kusový koberec od 3 €/m². Presnú cenu vám povieme dopredu — stačí poslať fotku cez formulár alebo na WhatsApp. Cena je konečná, po práci nič nedoúčtujeme.",
  },
  {
    q: "Ako dlho trvá čistenie a kedy je nábytok suchý?",
    a: "Tepovanie trojsedačky trvá zhruba hodinu, matraca 45 minút, interiéru auta 2 – 4 hodiny. Čalúnenie je bežne suché do 4 – 6 hodín, koberce do 6 – 12 hodín. Používame silné odsávanie, takže nábytok neostáva premočený.",
  },
  {
    q: "Kam všade chodíte?",
    a: "Pôsobíme v Bratislave a okolí do približne 30 km — Senec, Pezinok, Malacky, Dunajská Streda a okolité obce. Výjazd v rámci Bratislavy je pri objednávke nad 60 € zdarma, mimo mesta účtujeme dopravu podľa vzdialenosti.",
  },
  {
    q: "Sú čistiace prostriedky bezpečné pre deti a zvieratá?",
    a: "Áno. Používame certifikovanú, biologicky odbúrateľnú chémiu bez agresívnych rozpúšťadiel a všetko dôkladne vyextrahujeme. Po vyschnutí je povrch bezpečný pre deti aj domáce zvieratá.",
  },
  {
    q: "Musím niečo pripraviť pred vaším príchodom?",
    a: "Stačí uvoľniť priestor okolo čisteného kusu nábytku a zo sedačky odložiť vankúše a deky. Vodu aj elektrickú prípojku riešime my — máme vlastnú nádrž a v prípade potreby aj elektrocentrálu.",
  },
  {
    q: "Ako často má zmysel tepovať?",
    a: "Sedačku a koberce v bežnej domácnosti raz ročne, pri deťoch alebo zvieratách dvakrát. Matrace minimálne raz ročne, u alergikov polročne. Kancelárske stoličky a koberce odporúčame riešiť v pravidelnom polročnom intervale.",
  },
  {
    q: "Odstránite úplne každú škvrnu?",
    a: "Väčšinu bežných škvŕn áno. Pri starých, opakovane ošetrovaných alebo farbou poškodených miestach vám hneď pri obhliadke povieme reálny odhad — radšej dopredu poviem, že sa škvrna nedá odstrániť úplne, ako by ste boli po práci sklamaní.",
  },
  {
    q: "Vystavujete faktúru pre firmy?",
    a: "Áno, pre firmy vystavujeme faktúru so splatnosťou a vieme uzavrieť rámcovú zmluvu na pravidelný servis. Čistenie realizujeme aj večer alebo cez víkend, aby sme neprerušili vašu prevádzku.",
  },
];

export const testimonials = [
  {
    name: "Martina K.",
    place: "Bratislava — Ružinov",
    rating: 5,
    text: "Rohová sedačka po dvoch psoch vyzerala beznádejne. Chalani prišli načas, pracovali rýchlo a výsledok predčil očakávania — zápach je preč a látka má znova pôvodnú farbu.",
  },
  {
    name: "Peter H.",
    place: "Senec",
    rating: 5,
    text: "Objednal som tepovanie interiéru auta pred predajom. Auto vyzeralo lepšie ako na fotkách od predajcu. Cena presne podľa dohody, žiadne prekvapenia.",
  },
  {
    name: "Zuzana B.",
    place: "Bratislava — Petržalka",
    rating: 5,
    text: "Prišli po rekonštrukcii bytu. Stavebný prach bol všade, po nich sme sa mohli rovno nasťahovať. Odporúčam každému, kto rieši kolaudáciu.",
  },
  {
    name: "Ing. Marek T.",
    place: "kancelárie, Bratislava — Nivy",
    rating: 5,
    text: "Máme s Daviclean dohodnutý polročný servis 40 kancelárskych stoličiek a kobercov. Chodia večer, ráno je kancelária pripravená. Faktúra vždy v poriadku.",
  },
];

export const areas = [
  "Bratislava I – V",
  "Ružinov",
  "Petržalka",
  "Nové Mesto",
  "Karlova Ves",
  "Dúbravka",
  "Rača",
  "Vajnory",
  "Senec",
  "Pezinok",
  "Malacky",
  "Stupava",
  "Ivanka pri Dunaji",
  "Chorvátsky Grob",
  "Dunajská Streda",
  "Šamorín",
];
