// Client reviews (Albanian + English).
// These are EXAMPLE cards, shown with an "Example" badge and no client names,
// only until Forest-Al supplies real reviews. Replace them with verified reviews
// (published with each client's permission) and set `isExample: false`.

export const reviews = [
  {
    id: 'example-1',
    isExample: true,
    quote: 'The team was tidy, kept us informed and finished the job exactly as agreed.',
    quoteSq: 'Ekipi ishte i rregullt, na mbajti të informuar dhe e mbaroi punën ashtu siç ramë dakord.',
    client: 'Client · Apartment renovation',
    clientSq: 'Klient · Rinovim apartamenti',
    place: 'Tirana',
    placeSq: 'Tiranë',
    image: '/gallery/high-rise-apartment/117.jpg',
    alt: 'A finished apartment by Forest-Al',
    altSq: 'Apartament i përfunduar nga Forest-Al',
  },
  {
    id: 'example-2',
    isExample: true,
    quote: 'We had a clear quote from the start and there were no surprises along the way.',
    quoteSq: 'Morëm një preventiv të qartë që në fillim dhe nuk pati asnjë surprizë gjatë punës.',
    client: 'Client · Office fit-out',
    clientSq: 'Klient · Rikonstruksion zyrash',
    place: 'Tirana',
    placeSq: 'Tiranë',
    image: '/gallery/office-fit-out/2.jpg',
    alt: 'Offices finished by Forest-Al',
    altSq: 'Zyra të përfunduara nga Forest-Al',
  },
  {
    id: 'example-3',
    isExample: true,
    quote: 'Clean, careful work, from the first day on site to the last details.',
    quoteSq: 'Punë e pastër dhe e kujdesshme, nga dita e parë në kantier deri te detajet e fundit.',
    client: 'Client · Villa',
    clientSq: 'Klient · Vilë',
    place: 'Qeparo',
    placeSq: 'Qeparo',
    image: '/gallery/qeparo-villas/20.jpg',
    alt: 'A villa in Qeparo finished by Forest-Al',
    altSq: 'Vilë në Qeparo e përfunduar nga Forest-Al',
  },
];

export const hasOnlyExamples = reviews.every((r) => r.isExample);
