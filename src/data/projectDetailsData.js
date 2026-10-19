// Forest-Al project case studies (English + Albanian).
// Projects come from the real photo galleries.
import { galleryDetailsMap, galleryImage } from './galleryData';

// Verified client reviews per project go here (published only with the client's permission).
// The reviews section on a project page stays hidden while its list is empty.
const PROJECT_REVIEWS = {};

const PROJECT_ORDER = [
  'garden-building',
  'minepeza-building',
  'lakeview-residence',
  'high-rise-apartment',
  'classic-villa-interior',
  'apartment-renovation',
  'office-fit-out',
  'restaurant-fit-out',
  'pastry-shop',
  'qeparo-villas',
];

// Real Forest-Al projects, built from the photo galleries in galleryData.js.
// Projects with a verified same-room pair get a before/after slider; the others show their finished photo.
const projects = PROJECT_ORDER.map((slug) => galleryDetailsMap[slug]);

const buildProject = (p, index) => ({
  slug: p.slug,
  category: p.category,
  categorySq: p.categorySq,
  title: p.title,
  titleSq: p.titleSq,
  location: p.location,
  locationSq: p.locationSq,
  subtitle: p.intro,
  subtitleSq: p.introSq,
  beforeImage: p.beforeImage,
  afterImage: p.afterImage,
  story: {
    eyebrow: '// The Project //',
    eyebrowSq: '// Projekti //',
    title: 'The challenge and the work.',
    titleSq: 'Sfida dhe puna.',
    paragraphs: [p.intro2, ...p.steps.slice(0, 3).map((s) => s.desc)],
    paragraphsSq: [p.intro2Sq, ...p.steps.slice(0, 3).map((s) => s.descSq)],
  },
  details: {
    location: p.location,
    locationSq: p.locationSq,
    scope: p.scope,
    scopeSq: p.scopeSq,
    services: p.services,
    servicesSq: p.servicesSq,
    type: p.type,
    typeSq: p.typeSq,
  },
  gallery: p.photos
    .filter((_, i) => i % 2 === 0)
    .slice(0, 12)
    .map((ph, i) => ({ id: i + 1, url: ph.url, caption: ph.caption, captionSq: ph.captionSq })),
  reviews: PROJECT_REVIEWS[p.slug] || [],
  relatedProjects: projects
    .filter((_, i) => i !== index)
    .slice(0, 3)
    .map((r) => ({
      id: r.slug,
      slug: r.slug,
      title: r.title,
      titleSq: r.titleSq,
      location: r.location,
      locationSq: r.locationSq,
      category: r.category,
      categorySq: r.categorySq,
      afterImage: galleryImage(r.slug, r.after, true),
      beforeImage: r.before === null ? null : galleryImage(r.slug, r.before, true),
    })),
});

export const projectsList = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  titleSq: p.titleSq,
  category: p.category,
  categorySq: p.categorySq,
  location: p.location,
  locationSq: p.locationSq,
  scope: p.scope,
  scopeSq: p.scopeSq,
  afterImage: galleryImage(p.slug, p.after, true),
  beforeImage: p.before === null ? null : galleryImage(p.slug, p.before, true),
}));

export const projectDetailsMap = Object.fromEntries(
  projects.map((p, i) => [p.slug, buildProject(p, i)])
);
