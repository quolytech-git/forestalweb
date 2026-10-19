import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ReviewerIcon from '../components/ReviewerIcon';
import { reviews, hasOnlyExamples } from '../data/reviewsData';
const areasHeroImg = '/gallery/lakeview-residence/1.jpg';

// Where Forest-Al works
const areasData = [
  {
    id: 'tirana',
    name: 'Tirana',
    nameSq: 'Tiranë',
    descEn: 'The capital and our home base. Residential towers, apartments, offices and shops, from full renovations to maintenance.',
    descSq: 'Kryeqyteti dhe baza jonë. Kulla banimi, apartamente, zyra dhe dyqane, nga rinovimi i plotë deri te mirëmbajtja.',
  },
  {
    id: 'durres',
    name: 'Durrës',
    nameSq: 'Durrës',
    descEn: 'Renovation, new partitions and maintenance for homes and businesses in Durrës and along the coast.',
    descSq: 'Rinovim, ndarje të reja dhe mirëmbajtje për banesa dhe biznese në Durrës dhe përgjatë bregdetit.',
  },
  {
    id: 'korce',
    name: 'Korçë',
    nameSq: 'Korçë',
    descEn: 'Construction, renovation and finishing work in Korçë and the south-east of Albania.',
    descSq: 'Punime ndërtimi, rinovimi dhe përfundimi në Korçë dhe në juglindje të Shqipërisë.',
  },
  {
    id: 'qeparo',
    name: 'Qeparo',
    nameSq: 'Qeparo',
    descEn: 'Stone villas above the bay on the Himarë coast: interiors, installations and external works.',
    descSq: 'Vila me gur mbi gjirin e bregdetit të Himarës: ambiente të brendshme, instalime dhe punime të jashtme.',
  },
  {
    id: 'office',
    name: 'Our office',
    nameSq: 'Zyra jonë',
    descEn: 'Rruga Stavri Themeli, Tirana. Open 08:00 – 18:00. Come and see us, we are always happy to talk about your project.',
    descSq: 'Rruga Stavri Themeli, Tiranë. E hapur 08:00 – 18:00. Ejani të na takoni, jemi gjithmonë të hapur për të diskutuar projektin tuaj.',
  },
  {
    id: 'elsewhere',
    name: 'All of Albania',
    nameSq: 'Gjithë Shqipëria',
    descEn: 'We work across the whole country. Wherever your property is, tell us about the job and we will plan the work with you.',
    descSq: 'Punojmë në gjithë vendin. Kudo që të jetë prona juaj, na tregoni për punën dhe e planifikojmë bashkë.',
  },
];

// Reviews come from reviewsData.js (example cards until real reviews are supplied)
const reviewsData = reviews.map((r) => ({
  id: r.id,
  isExample: r.isExample,
  quoteEn: r.quote,
  quoteSq: r.quoteSq,
  author: r.client,
  authorSq: r.clientSq,
  roleEn: r.place,
  roleSq: r.placeSq,
}));

// SVG Pin icon matching RenovateHub
const PinIcon = () => (
  <svg width="15" height="18" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M7.995 1.667c3.885 0 7.088 3.098 7.088 6.931 0 1.932-.702 3.725-1.858 5.245a18.4 18.4 0 0 1-4.618 4.284c-.405.265-.77.285-1.215 0a18 18 0 0 1-4.617-4.284C1.618 12.323.917 10.53.917 8.598c0-3.833 3.203-6.932 7.078-6.932m0 4.814a2.345 2.345 0 0 0-2.333 2.333c0 1.284 1.048 2.294 2.333 2.294s2.343-1.01 2.343-2.294c0-1.274-1.058-2.333-2.343-2.333"
    />
  </svg>
);

export default function AreasPage({ onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';

  return (
    <div className="areas-page-wrapper">
      {/* ========================================================
          1. PANORAMIC HERO BANNER (1:1 RenovateHub Services-Areas)
          ======================================================== */}
      <section className="areas-hero-section">
        <div className="areas-hero-card">
          <img
            src={areasHeroImg}
            alt={isSq ? 'Pamje panoramike e zonave të shërbimit' : 'Panoramic view of the service areas'}
            className="areas-hero-bg"
            loading="eager"
          />

          <div className="areas-hero-scrim-top" />
          <div className="areas-hero-scrim-bottom" />

          <div className="areas-hero-container">
            <div className="areas-hero-row">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="areas-hero-left"
              >
                <div className="areas-hero-tag">
                  {isSq ? '// Zonat e Shërbimit' : '// Service Areas'}
                </div>
                <h1 className="areas-hero-h1">
                  {isSq ? (
                    <>
                      Në gjithë<br />
                      Shqipërinë.
                    </>
                  ) : (
                    <>
                      Across all<br />
                      of Albania.
                    </>
                  )}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="areas-hero-right"
              >
                <p className="areas-hero-p">
                  {isSq
                    ? 'Punojmë në gjithë Shqipërinë. Zyra jonë është në Tiranë, kryeqytetin, dhe kemi përfunduar projekte në Tiranë, Durrës, Korçë dhe Qeparo, në banesa, vila, biznese dhe objekte të tëra banimi.'
                    : 'We work across all of Albania. Our office is in Tirana, the capital, and we have completed projects in Tirana, Durrës, Korçë and Qeparo, on homes, villas, businesses and entire residential buildings.'}
                </p>

                <motion.button
                  onClick={() => onOpenEstimate && onOpenEstimate()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="areas-hero-cta-btn"
                  aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
                >
                  <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                  <div className="areas-hero-cta-arrow">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. LOCATION CARDS GRID
          ======================================================== */}
      <section className="areas-grid-section">
        <div className="areas-grid-container">
          <div className="areas-cards-grid">
            {areasData.map((area, idx) => (
              <motion.div
                key={area.id}
                className="area-location-card"
                onClick={() => onOpenEstimate && onOpenEstimate()}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenEstimate && onOpenEstimate();
                  }
                }}
              >
                <div className="area-card-pin-badge" aria-hidden="true">
                  <PinIcon />
                </div>
                <h3 className="area-card-name">
                  {isSq ? area.nameSq : area.name}
                </h3>
                <p className="area-card-desc">
                  {isSq ? area.descSq : area.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. "Loved across the region." REVIEWS SECTION
          ======================================================== */}
      {reviewsData.length > 0 && (
      <section className="areas-reviews-section">
        <div className="areas-reviews-container">
          {/* Header Row: Title & Stacked Avatars with Star Rating */}
          <div className="areas-reviews-header">
            <div className="areas-reviews-header-left">
              <div className="areas-reviews-tag">
                {isSq ? '// Vlerësimet' : '// Reviews'}
              </div>
              <h2 className="areas-reviews-title">
                {isSq ? 'Çfarë thonë klientët tanë.' : 'What our clients say.'}
              </h2>
            </div>

            <div className="areas-rating-badge">
              <div className="areas-rating-avatars">
                <ReviewerIcon className="areas-rating-avatar" />
                <ReviewerIcon className="areas-rating-avatar" />
                <ReviewerIcon className="areas-rating-avatar" />
              </div>
              <div className="areas-rating-details">
                <div className="areas-rating-stars" aria-hidden="true">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="areas-star">★</span>
                  ))}
                </div>
                <div className="areas-rating-score">
                  {hasOnlyExamples ? (isSq ? 'Shembuj · vlerësimet e vërteta së shpejti' : 'Examples · real reviews coming soon') : isSq ? 'Vlerësime të verifikuara' : 'Verified reviews'}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid (3 cards) */}
          <div className="areas-reviews-grid">
            {reviewsData.map((rev, idx) => (
              <motion.article
                key={rev.id}
                className="areas-testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="testimonial-card-stars" aria-hidden="true">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="star-amber">★</span>
                  ))}
                </div>
                {rev.isExample && <span className="review-example-badge">{isSq ? 'Shembull' : 'Example'}</span>}

                <p className="testimonial-card-quote">
                  {isSq ? rev.quoteSq : rev.quoteEn}
                </p>

                <div className="testimonial-card-divider" />

                <div className="testimonial-card-author">
                  <ReviewerIcon className="testimonial-card-avatar" />
                  <div className="testimonial-card-meta">
                    <h4 className="testimonial-author-name">{isSq ? rev.authorSq : rev.author}</h4>
                    <span className="testimonial-author-role">
                      {isSq ? rev.roleSq : rev.roleEn}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ========================================================
          4. PRE-FOOTER CTA BANNER ("In our area? Let's talk.")
          ======================================================== */}
      <section className="areas-cta-section">
        <div className="areas-cta-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="areas-cta-banner"
          >
            <div className="areas-cta-left">
              <div className="areas-cta-tag">
                {isSq ? '// Le të Fillojmë' : "// Let's Begin"}
              </div>
              <h2 className="areas-cta-title">
                {isSq ? (
                  <>
                    Prona juaj është diku tjetër?<br />
                    Na pyesni.
                  </>
                ) : (
                  <>
                    Is your property somewhere else?<br />
                    Just ask.
                  </>
                )}
              </h2>
            </div>

            <div className="areas-cta-right">
              <p className="areas-cta-desc">
                {isSq
                  ? 'Na dërgoni vendndodhjen e pronës dhe një përshkrim të shkurtër të punës. Ju tregojmë shpejt nëse mund t’ju ndihmojmë.'
                  : 'Send us the location of your property and a short description of the work. We will quickly let you know if we can help.'}
              </p>

              <motion.button
                onClick={() => onOpenEstimate && onOpenEstimate()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="areas-cta-btn"
                aria-label={isSq ? 'Pyesni për Zonën Tuaj' : 'Ask About Your Area'}
              >
                <span>{isSq ? 'Pyesni për Zonën Tuaj' : 'Ask About Your Area'}</span>
                <div className="areas-cta-btn-arrow">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </motion.button>

              <div className="areas-cta-sub">
                {isSq
                  ? 'Konsultë falas • Pa detyrime • Hapa të qartë'
                  : 'Free consultation • No obligation • Clear next steps'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
