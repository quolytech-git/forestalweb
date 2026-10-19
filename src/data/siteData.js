// Forest-Al website content (Albanian + English).

export const siteData = {
  brand: {
    name: 'Forest-Al',
    tagline: 'Construction, renovation and property maintenance across Albania.',
    taglineSq: 'Ndërtim, rinovim dhe mirëmbajtje pronash në gjithë Shqipërinë.',
    phone: '+355 68 405 5005',
    email: 'forest.al@yahoo.com',
    address: 'Rruga Stavri Themeli, Tirana, Albania',
    addressSq: 'Rruga Stavri Themeli, Tiranë, Shqipëri',
    mapUrl: 'https://maps.app.goo.gl/yKs78zj9eCVRCDd4A',
    mapEmbedUrl: 'https://www.google.com/maps?q=41.3285497,19.7937041&z=16&output=embed',
    hours: 'Office open 08:00 – 18:00',
    hoursSq: 'Zyra e hapur 08:00 – 18:00',
    nipt: 'M17302701E',
  },

  // Cities where Forest-Al has worked
  cities: [
    { name: 'Tirana', nameSq: 'Tiranë', note: 'Capital of Albania · our office', noteSq: 'Kryeqyteti · zyra jonë' },
    { name: 'Durrës', nameSq: 'Durrës', note: 'Coastal city', noteSq: 'Qytet bregdetar' },
    { name: 'Korçë', nameSq: 'Korçë', note: 'South-east Albania', noteSq: 'Juglindje e Shqipërisë' },
    { name: 'Qeparo', nameSq: 'Qeparo', note: 'Himarë coast', noteSq: 'Bregdeti i Himarës' },
  ],

  // Set `connected` to true only once the forms send to a working email inbox or backend.
  forms: {
    connected: false,
  },

  stats: [
    { value: '15+', label: 'Years of experience', labelSq: 'Vite përvojë' },
    { value: '100+', label: 'Completed projects', labelSq: 'Projekte të përfunduara' },
    { value: '9', label: 'Services', labelSq: 'Shërbime' },
    { value: '4', label: 'Cities, and work across Albania', labelSq: 'Qytete, dhe punë në gjithë Shqipërinë' },
  ],

  services: [
    {
      id: 'metal-structures',
      slug: 'metal-structures',
      category: 'Construction',
      categorySq: 'Ndërtim',
      title: 'Metal Structures',
      titleSq: 'Konstruksione Metalike',
      description: 'Metal frames, stud walls and structural elements, planned and fitted to suit each building.',
      descriptionSq: 'Skelete metalike, mure me profile dhe elemente strukturore, të planifikuara dhe të montuara sipas çdo objekti.',
      image: '/gallery/high-rise-apartment/61.jpg',
    },
    {
      id: 'drywall-systems',
      slug: 'drywall-systems',
      category: 'Construction',
      categorySq: 'Ndërtim',
      title: 'Partitions & Ceilings',
      titleSq: 'Ndarje dhe Tavane',
      description: 'Plasterboard partitions, wall linings and suspended ceilings, from new layouts to finished interiors.',
      descriptionSq: 'Ndarje me gips, veshje muresh dhe tavane të varura, nga planimetria e re deri te ambienti i përfunduar.',
      image: '/gallery/apartment-renovation/151.jpg',
    },
    {
      id: 'construction-works',
      slug: 'construction-works',
      category: 'Construction',
      categorySq: 'Ndërtim',
      title: 'Construction',
      titleSq: 'Ndërtim',
      description: 'General building work done to an agreed plan, from preparing the site to the final finishes.',
      descriptionSq: 'Punime të përgjithshme ndërtimi sipas një plani të rënë dakord, nga përgatitja e kantierit deri te përfundimet.',
      image: '/gallery/valias-residential/1.jpg',
    },
    {
      id: 'interior-renovation',
      slug: 'interior-renovation',
      category: 'Renovation',
      categorySq: 'Rinovim',
      title: 'Renovation',
      titleSq: 'Rinovim',
      description: 'Full renovation of homes and business premises: new layouts, installations, floors and finishes.',
      descriptionSq: 'Rinovim i plotë i banesave dhe ambienteve të biznesit: planimetri e re, instalime, dysheme dhe përfundime.',
      image: '/gallery/lakeview-residence/45.jpg',
    },
    {
      id: 'electrical-maintenance',
      slug: 'electrical-maintenance',
      category: 'Maintenance',
      categorySq: 'Mirëmbajtje',
      title: 'Electrical Work',
      titleSq: 'Punime Elektrike',
      description: 'Checks, repairs and new wiring for the electrical installations in homes and businesses.',
      descriptionSq: 'Kontrolle, riparime dhe linja të reja për instalimet elektrike në banesa dhe biznese.',
      image: '/gallery/lakeview-residence/18.jpg',
    },
    {
      id: 'plumbing-maintenance',
      slug: 'plumbing-maintenance',
      category: 'Maintenance',
      categorySq: 'Mirëmbajtje',
      title: 'Plumbing',
      titleSq: 'Punime Hidraulike',
      description: 'Repairs and regular maintenance for water supply, heating pipes and drainage.',
      descriptionSq: 'Riparime dhe mirëmbajtje e rregullt për furnizimin me ujë, tubat e ngrohjes dhe shkarkimet.',
      image: '/gallery/lakeview-residence/29.jpg',
    },
    {
      id: 'mechanical-maintenance',
      slug: 'mechanical-maintenance',
      category: 'Maintenance',
      categorySq: 'Mirëmbajtje',
      title: 'Mechanical Systems',
      titleSq: 'Sisteme Mekanike',
      description: 'Care for the ventilation, heating and other systems that keep a building running every day.',
      descriptionSq: 'Kujdes për ventilimin, ngrohjen dhe sistemet e tjera që e mbajnë objektin në punë çdo ditë.',
      image: '/gallery/lakeview-residence/13.jpg',
    },
    {
      id: 'building-maintenance',
      slug: 'building-maintenance',
      category: 'Maintenance',
      categorySq: 'Mirëmbajtje',
      title: 'Maintenance',
      titleSq: 'Mirëmbajtje',
      description: 'Ongoing repairs and upkeep that keep a property safe, usable and in good condition.',
      descriptionSq: 'Riparime dhe mirëmbajtje e vazhdueshme që e mbajnë pronën të sigurt, funksionale dhe në gjendje të mirë.',
      image: '/gallery/apartment-renovation/168.jpg',
    },
    {
      id: 'property-solutions',
      slug: 'property-solutions',
      category: 'Renovation',
      categorySq: 'Rinovim',
      title: 'Complete Solutions',
      titleSq: 'Zgjidhje të Plota',
      description: 'Construction, renovation and maintenance in one place, for homes, businesses and buildings.',
      descriptionSq: 'Ndërtim, rinovim dhe mirëmbajtje në një vend të vetëm, për banesa, biznese dhe objekte.',
      image: '/gallery/office-fit-out/8.jpg',
    },
  ],

  faqs: [
    {
      question: 'How do you work out the price of a project?',
      questionSq: 'Si e përcaktoni çmimin e një projekti?',
      answer: 'The price depends on the type of work, the materials, access to the site and the condition of the property. First we understand what you need, then we look at the work and prepare a quote. Smaller jobs can often be priced from photos and a short description; larger ones need a visit.',
      answerSq: 'Çmimi varet nga lloji i punës, materialet, aksesi në objekt dhe gjendja e pronës. Fillimisht kuptojmë çfarë ju nevojitet, pastaj e shohim punën dhe ju përgatisim një preventiv. Punët e vogla shpesh mund të vlerësohen nga disa foto dhe një përshkrim i shkurtër; për punët më të mëdha vijmë në vend.',
    },
    {
      question: 'How long does a renovation or construction job take?',
      questionSq: 'Sa zgjat një rinovim ose një punë ndërtimi?',
      answer: 'It depends on the size of the job. A small repair can take a day; a full apartment renovation usually takes several weeks. We agree a schedule with you before we start and tell you straight away if anything changes.',
      answerSq: 'Varet nga madhësia e punës. Një riparim i vogël mund të mbarojë brenda ditës, ndërsa rinovimi i plotë i një apartamenti zakonisht zgjat disa javë. Para se të fillojmë, biem dakord për një grafik pune dhe ju njoftojmë menjëherë nëse ndryshon diçka.',
    },
    {
      question: 'Will my project need a permit?',
      questionSq: 'A do t’i duhet leje projektit tim?',
      answer: 'Interior works usually do not, but structural changes, facade work or a change of use may need approval from the municipality. During our visit we tell you what we see, so you know whether you need to check with the authorities before work starts.',
      answerSq: 'Punimet e brendshme zakonisht nuk kërkojnë leje, por ndryshimet strukturore, punimet në fasadë ose ndryshimi i funksionit të ambientit mund të kërkojnë miratim nga bashkia. Gjatë vizitës ju tregojmë çfarë shohim, që ta dini nëse duhet të pyesni institucionet para fillimit të punës.',
    },
    {
      question: 'What if I need a repair or maintenance?',
      questionSq: 'Po nëse më duhet një riparim ose mirëmbajtje?',
      answer: 'Call or write to us and tell us what the problem is, where the property is and how urgent it is. We will tell you the next step and when we can come.',
      answerSq: 'Na telefononi ose na shkruani dhe na tregoni cili është problemi, ku ndodhet prona dhe sa urgjent është. Ju tregojmë hapin e radhës dhe kur mund të vijmë.',
    },
    {
      question: 'How do I ask for a consultation or a quote?',
      questionSq: 'Si mund të kërkoj një konsultë ose një preventiv?',
      answer: 'Fill in the “Request a Free Estimate” form, call us on +355 68 405 5005 or email forest.al@yahoo.com. Tell us the type of work, where the property is and, if you can, send a few photos. We will reply with the next steps.',
      answerSq: 'Plotësoni formularin “Kërkoni një Preventiv Falas”, na telefononi në +355 68 405 5005 ose na shkruani në forest.al@yahoo.com. Na tregoni llojin e punës, ku ndodhet prona dhe, nëse mundeni, na dërgoni disa foto. Do t’ju përgjigjemi me hapat e radhës.',
    },
  ],

  // Browser tab titles and meta descriptions for each page.
  seo: {
    home: {
      title: 'Forest-Al | Construction, Metal Structures & Property Maintenance in Albania',
      titleSq: 'Forest-Al | Ndërtim, Konstruksione Metalike dhe Mirëmbajtje në Shqipëri',
      description: 'Forest-Al: 15+ years of construction, renovation and property maintenance across Albania. Over 100 completed projects, with qualified staff.',
      descriptionSq: 'Forest-Al: mbi 15 vjet në ndërtim, rinovim dhe mirëmbajtje pronash në gjithë Shqipërinë. Mbi 100 projekte të përfunduara, me staf të kualifikuar.',
    },
    about: {
      title: 'About Forest-Al | Construction & Property Maintenance Company',
      titleSq: 'Rreth Forest-Al | Kompani Ndërtimi dhe Mirëmbajtjeje',
      description: 'Forest-Al is a construction and maintenance company with 15+ years of experience and 100+ completed projects across Albania.',
      descriptionSq: 'Forest-Al është kompani ndërtimi dhe mirëmbajtjeje me mbi 15 vjet përvojë dhe mbi 100 projekte të përfunduara në Shqipëri.',
    },
    gallery: {
      title: 'Gallery | Forest-Al',
      titleSq: 'Galeria | Forest-Al',
      description: 'Photos and videos of real Forest-Al projects, step by step from the first day on site to the finished space.',
      descriptionSq: 'Foto dhe video nga projektet reale të Forest-Al, hap pas hapi nga dita e parë në kantier deri te ambienti i përfunduar.',
    },
    project: {
      title: 'Projects | Forest-Al',
      titleSq: 'Projektet | Forest-Al',
      description: 'Construction, metal structure, drywall, renovation and maintenance projects by Forest-Al.',
      descriptionSq: 'Projekte ndërtimi, rinovimi dhe mirëmbajtjeje nga Forest-Al në gjithë Shqipërinë.',
    },
    services: {
      title: 'Services | Construction, Renovation & Maintenance | Forest-Al',
      titleSq: 'Shërbimet | Ndërtim, Rinovim dhe Mirëmbajtje | Forest-Al',
      description: 'Metal structures, partitions and ceilings, construction, renovation, electrical and plumbing work, mechanical systems and maintenance.',
      descriptionSq: 'Konstruksione metalike, ndarje dhe tavane, ndërtim, rinovim, punime elektrike dhe hidraulike, sisteme mekanike dhe mirëmbajtje.',
    },
    areas: {
      title: 'Service Areas | Forest-Al',
      titleSq: 'Zonat e Shërbimit | Forest-Al',
      description: 'Forest-Al works in Tirana, Durrës, Korçë and Qeparo. Our office is on Rruga Stavri Themeli in Tirana.',
      descriptionSq: 'Forest-Al punon në Tiranë, Durrës, Korçë dhe Qeparo. Zyra jonë ndodhet në Rrugën Stavri Themeli në Tiranë.',
    },
    contact: {
      title: 'Contact Forest-Al | Request a Free Estimate',
      titleSq: 'Kontakt Forest-Al | Kërkoni një Preventiv Falas',
      description: 'Call Forest-Al on +355 68 405 5005 or email forest.al@yahoo.com to request a free estimate.',
      descriptionSq: 'Telefononi Forest-Al në +355 68 405 5005 ose shkruani në forest.al@yahoo.com për një preventiv falas.',
    },
  },
};

// Form timeline options shared by the contact page and the estimate popup.
export const timelineOptions = [
  { value: 'As soon as possible', en: 'As soon as possible', sq: 'Sa më shpejt të jetë e mundur' },
  { value: 'Within 1 to 3 months', en: 'Within 1 to 3 months', sq: 'Brenda 1 deri në 3 muajve' },
  { value: 'In 3 to 6 months', en: 'In 3 to 6 months', sq: 'Pas 3 deri në 6 muajsh' },
  { value: 'Planning and budgeting', en: 'Still planning and budgeting', sq: 'Ende në planifikim dhe buxhetim' },
  { value: 'Ongoing maintenance', en: 'Ongoing maintenance', sq: 'Mirëmbajtje e vazhdueshme' },
];
