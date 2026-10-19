import React from 'react';
import { motion } from 'framer-motion';
const whyChooseUsImg = '/gallery/lakeview-residence/9.jpg';

// SVG Icons exactly matching the Framer assets
const CalendarIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#ffffff"
      d="M.768 5.056h14.525a.65.65 0 0 0 .467-.198.63.63 0 0 0 .175-.47l-.008-.165c-.105-1.66-1.516-2.959-3.213-2.959h-.826V.632A.64.64 0 0 0 11.245 0a.64.64 0 0 0-.643.632v.632H5.46V.632A.64.64 0 0 0 4.816 0a.64.64 0 0 0-.642.632v.632h-.827c-1.697 0-3.108 1.3-3.213 2.96l-.008.164a.63.63 0 0 0 .174.47.65.65 0 0 0 .468.198m15.267 1.88a.637.637 0 0 0-.642-.616H.668a.64.64 0 0 0-.643.616 76 76 0 0 0 .122 6.707c.1 1.586 1.393 2.856 3.005 2.955a79 79 0 0 0 9.756 0c1.613-.1 2.906-1.37 3.006-2.956.138-2.186.18-4.442.121-6.706m-4.79 3.176a.956.956 0 0 1-.965-.948c0-.524.432-.948.965-.948s.964.424.964.948a.956.956 0 0 1-.964.948m.964 2.212a.956.956 0 0 1-.964.947.956.956 0 0 1-.965-.947c0-.524.432-.948.965-.948s.964.424.964.948m-7.393-.948c.533 0 .964.424.964.948a.956.956 0 0 1-.964.947.956.956 0 0 1-.964-.947c0-.524.432-.948.964-.948m-.964-2.212c0-.524.432-.948.964-.948.533 0 .964.424.964.948a.956.956 0 0 1-.964.948.956.956 0 0 1-.964-.948m3.214 3.16c0-.524.432-.948.964-.948.533 0 .965.424.965.948a.956.956 0 0 1-.965.947.956.956 0 0 1-.964-.947m.964-2.212a.956.956 0 0 1-.964-.948c0-.524.432-.948.964-.948.533 0 .965.424.965.948a.956.956 0 0 1-.965.948"
    />
  </svg>
);

const ManagerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#ffffff"
      d="M14.548 11.41a3.133 3.133 0 1 0 0 6.268 3.133 3.133 0 0 0 0-6.267m1.407 2.482-1.483 1.822a.41.41 0 0 1-.591.045l-.697-.63a.409.409 0 0 1 .548-.607l.378.342 1.21-1.489a.41.41 0 0 1 .635.517"
    />
    <path
      fill="#ffffff"
      d="M13.982 0H1.125A1.13 1.13 0 0 0 0 1.125v14.786a1.13 1.13 0 0 0 1.125 1.125h10.588a3.72 3.72 0 0 1-.945-2.488 3.786 3.786 0 0 1 3.78-3.78q.28-.003.56.045V1.125A1.13 1.13 0 0 0 13.981 0M8.196 14.143H3.054a.482.482 0 1 1 0-.964h5.142a.482.482 0 0 1 0 .964m1.286-2.25H3.054a.482.482 0 1 1 0-.964h6.428a.482.482 0 0 1 0 .964m3.054-3.697a.486.486 0 0 1-.482.483h-9a.486.486 0 0 1-.483-.483V2.411a.486.486 0 0 1 .483-.482h9a.485.485 0 0 1 .482.482z"
    />
    <path
      fill="#ffffff"
      d="m9.669 7.39-1.034-.344a.183.183 0 0 1-.051-.32 2.33 2.33 0 0 0 .793-1.805 2.03 2.03 0 0 0-1.824-2.19 2.03 2.03 0 0 0-1.825 2.19 2.33 2.33 0 0 0 .794 1.805.183.183 0 0 1-.051.32l-1.034.344a1.82 1.82 0 0 0-1.118 1.053l-.215.539a.365.365 0 0 0 .339.5h6.22a.365.365 0 0 0 .338-.5l-.215-.539A1.82 1.82 0 0 0 9.669 7.39"
    />
  </svg>
);

const WalletIcon = () => (
  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#ffffff"
      d="M17.064 6.374v1.758c0 .47-.375.854-.853.87h-1.672c-.922 0-1.767-.674-1.844-1.595a1.71 1.71 0 0 1 .512-1.391 1.7 1.7 0 0 1 1.23-.512h1.774a.876.876 0 0 1 .853.87"
    />
    <path
      fill="#ffffff"
      d="M15.761 10.283h-1.22c-1.622 0-2.987-1.22-3.123-2.774a3 3 0 0 1 .896-2.406 2.94 2.94 0 0 1 2.124-.879h1.323a.42.42 0 0 0 .427-.452C16 1.698 14.626.282 12.587.042a4 4 0 0 0-.64-.042h-7.68q-.36 0-.692.051C1.4.324 0 1.946 0 4.267v5.973a4.27 4.27 0 0 0 4.267 4.267h7.68c2.389 0 4.036-1.494 4.24-3.772a.42.42 0 0 0-.426-.452m-6.374-4.95h-5.12c-.35 0-.64-.29-.64-.64s.29-.64.64-.64h5.12c.35 0 .64.29.64.64s-.29.64-.64.64"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#ffffff"
      d="M8.29 8.793a1.334 1.334 0 1 0-1.248.004c.191.1.295.302.28.505l-.014 1.965a.348.348 0 0 0 .695-.001v-.004l.014-1.933a.53.53 0 0 1 .274-.536"
    />
    <path
      fill="#ffffff"
      d="M15.31 4.849v-.014a19 19 0 0 1-.017-.56 1.91 1.91 0 0 0-1.796-1.869c-2.07-.115-3.67-.79-5.038-2.123L8.447.272a1.15 1.15 0 0 0-1.565 0l-.012.01C5.502 1.617 3.9 2.292 1.83 2.407a1.91 1.91 0 0 0-1.796 1.87c-.003.202-.008.385-.016.559l-.001.032c-.04 2.11-.09 4.737.788 7.12a9.1 9.1 0 0 0 2.175 3.388c1.093 1.067 2.525 1.914 4.256 2.517a1.3 1.3 0 0 0 .856 0c1.728-.605 3.158-1.452 4.25-2.518a9.1 9.1 0 0 0 2.175-3.389c.882-2.39.832-5.022.792-7.136M9.073 9.547l-.013 1.72a1.405 1.405 0 0 1-1.403 1.402c-.774 0-1.404-.63-1.404-1.403v-.004l.012-1.707a2.38 2.38 0 0 1-.992-1.94 2.393 2.393 0 0 1 2.39-2.39 2.39 2.39 0 0 1 1.41 4.322"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 8.5 12.859 L 13.753 16 L 12.359 10.08 L 17 6.097 L 10.889 5.583 L 8.5 0 L 6.112 5.583 L 0 6.097 L 4.641 10.08 L 3.247 16 Z"
      fill="#ffffff"
    />
  </svg>
);

const cardsData = [
  {
    icon: <CalendarIcon />,
    title: 'Organised work.',
    titleSq: 'Punë e organizuar.',
    description: 'We plan the work in stages and carry it out in the agreed order, on a tidy, safe site.',
    descriptionSq: 'E planifikojmë punën me faza dhe e bëjmë sipas radhës së rënë dakord, me kantier të rregullt dhe të sigurt.',
  },
  {
    icon: <ManagerIcon />,
    title: 'Clear communication.',
    titleSq: 'Komunikim i qartë.',
    description: 'You always know what will be done, what it involves and what comes next.',
    descriptionSq: 'Gjithmonë e dini çfarë do të bëhet, çfarë përfshin dhe cili është hapi i radhës.',
  },
  {
    icon: <WalletIcon />,
    title: 'A clear quote from the start.',
    titleSq: 'Preventiv i qartë që në fillim.',
    description: 'We agree the work and the quote with you before we start, so there are no surprises.',
    descriptionSq: 'Punën dhe preventivin i biem dakord me ju para se të fillojmë, që të mos ketë surpriza.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Solutions that fit the property.',
    titleSq: 'Zgjidhje sipas pronës.',
    description: 'Every job is planned around the building and the way you use it.',
    descriptionSq: 'Çdo punë e planifikojmë sipas objektit dhe mënyrës si e përdorni.',
  },
];

export default function TrustSection({ lang = 'en' }) {
  const isSq = lang === 'sq';
  return (
    <section id="why-choose-us" className="why-choose-us-section">
      <div className="why-choose-us-container">
        <div className="why-choose-us-grid">
          {/* Left Column: Heading, Subtitle, and Image with Rating */}
          <motion.div
            className="why-choose-us-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="why-choose-us-tag">{isSq ? '// Pse Forest-Al' : '// Why Forest-Al'}</div>
            <h2 className="why-choose-us-title">
              {isSq ? (
                <>
                  Pse pronarët na besojnë <br />
                  punën në pronat e tyre.
                </>
              ) : (
                <>
                  Why property owners <br />
                  trust us with the work.
                </>
              )}
            </h2>
            <p className="why-choose-us-subtitle">
              {isSq
                ? 'Mbi 15 vjet përvojë, planifikim praktik, punë e kujdesshme dhe komunikim i qartë, nga takimi i parë deri në dorëzim.'
                : 'More than 15 years of experience, practical planning, careful workmanship and clear communication, from the first meeting to handover.'}
            </p>

            {/* Photo Card with Frosted Overlay & 5.0 Rating */}
            <div className="why-choose-us-img-card">
              <img
                src={whyChooseUsImg}
                alt={isSq ? 'Ekipi i Forest-Al duke punuar në një apartament' : 'The Forest-Al team at work in an apartment'}
                className="why-choose-us-img"
                loading="lazy"
              />
              <div className="why-choose-us-img-blur" />
              <div className="why-choose-us-img-badge">
                <div className="why-choose-us-rating-row">
                  <span className="why-choose-us-rating-score">Forest-Al</span>
                  <div className="why-choose-us-star-icon">
                    <StarIcon />
                  </div>
                </div>
                <div className="why-choose-us-reviews-count">
                  {isSq ? 'Ndërtim · Rinovim · Mirëmbajtje' : 'Construction · Renovation · Maintenance'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Grid of White Cards */}
          <div className="why-choose-us-cards-grid">
            {cardsData.map((card, idx) => (
              <motion.div
                key={idx}
                className="why-choose-us-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="why-choose-us-card-icon-box">
                  {card.icon}
                </div>
                <div className="why-choose-us-card-body">
                  <h3 className="why-choose-us-card-title">{isSq ? card.titleSq : card.title}</h3>
                  <p className="why-choose-us-card-desc">{isSq ? card.descriptionSq : card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { TrustSection as WhyChooseUsSection };
