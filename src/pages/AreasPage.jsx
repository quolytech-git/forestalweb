import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import areasHeroImg from '../assets/areas/areas-hero-panoramic.png';
import reviewerPriya from '../assets/areas/reviewer-priya.png';
import reviewerSarah from '../assets/areas/reviewer-sarah.png';
import reviewerDaniel from '../assets/areas/reviewer-daniel.png';
import avatar1 from '../assets/areas/avatar-1.jpg';
import avatar2 from '../assets/areas/avatar-2.jpg';
import avatar3 from '../assets/areas/avatar-3.png';

// Placeholders until Forest-Al confirms where it works and which services are available in each area.
const areasData = [
  {
    id: 'area-1',
    name: '[City / Area 1]',
    nameSq: '[Qyteti / Zona 1]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-2',
    name: '[City / Area 2]',
    nameSq: '[Qyteti / Zona 2]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-3',
    name: '[City / Area 3]',
    nameSq: '[Qyteti / Zona 3]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-4',
    name: '[City / Area 4]',
    nameSq: '[Qyteti / Zona 4]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-5',
    name: '[City / Area 5]',
    nameSq: '[Qyteti / Zona 5]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-6',
    name: '[City / Area 6]',
    nameSq: '[Qyteti / Zona 6]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-7',
    name: '[City / Area 7]',
    nameSq: '[Qyteti / Zona 7]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-8',
    name: '[City / Area 8]',
    nameSq: '[Qyteti / Zona 8]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
  {
    id: 'area-9',
    name: '[City / Area 9]',
    nameSq: '[Qyteti / Zona 9]',
    descEn: 'Services available here: [list to be confirmed].',
    descSq: 'Shërbimet në këtë zonë: [lista për t’u konfirmuar].',
  },
];

// Review placeholders until Forest-Al supplies verified reviews (with each client's permission).
const reviewsData = [
  {
    id: 'review-1',
    rating: 5,
    quoteEn: '[Verified client review to be added, published only with the client’s permission.]',
    quoteSq: '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]',
    author: '[Client name]',
    authorSq: '[Emri i klientit]',
    roleEn: '[Location / type of work]',
    roleSq: '[Vendndodhja / lloji i punës]',
    avatar: reviewerPriya,
  },
  {
    id: 'review-2',
    rating: 5,
    quoteEn: '[Verified client review to be added, published only with the client’s permission.]',
    quoteSq: '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]',
    author: '[Client name]',
    authorSq: '[Emri i klientit]',
    roleEn: '[Location / type of work]',
    roleSq: '[Vendndodhja / lloji i punës]',
    avatar: reviewerSarah,
  },
  {
    id: 'review-3',
    rating: 5,
    quoteEn: '[Verified client review to be added, published only with the client’s permission.]',
    quoteSq: '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]',
    author: '[Client name]',
    authorSq: '[Emri i klientit]',
    roleEn: '[Location / type of work]',
    roleSq: '[Vendndodhja / lloji i punës]',
    avatar: reviewerDaniel,
  },
];

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
                      Ku punon<br />
                      Forest-Al.
                    </>
                  ) : (
                    <>
                      Where Forest-Al<br />
                      works.
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
                    ? 'Forest-Al punon në Shqipëri. Zonat e sakta të shërbimit po konfirmohen; na pyesni nëse prona juaj mbulohet dhe cilat shërbime ofrohen atje.'
                    : 'Forest-Al works in Albania. Our exact service areas are being confirmed; ask us whether your property is covered and which services are available there.'}
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
          2. 3x3 LOCATION CARDS GRID (RenovateHub 1:1 Reference)
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
                <img src={avatar1} alt="" className="areas-rating-avatar" />
                <img src={avatar2} alt="" className="areas-rating-avatar" />
                <img src={avatar3} alt="" className="areas-rating-avatar" />
              </div>
              <div className="areas-rating-details">
                <div className="areas-rating-stars" aria-hidden="true">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="areas-star">★</span>
                  ))}
                </div>
                <div className="areas-rating-score">
                  {isSq ? 'Vlerësimet e verifikuara së shpejti' : 'Verified reviews coming soon'}
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

                <p className="testimonial-card-quote">
                  {isSq ? rev.quoteSq : rev.quoteEn}
                </p>

                <div className="testimonial-card-divider" />

                <div className="testimonial-card-author">
                  <img
                    src={rev.avatar}
                    alt=""
                    className="testimonial-card-avatar"
                  />
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
                    Nuk jeni të sigurt për zonën?<br />
                    Na pyesni.
                  </>
                ) : (
                  <>
                    Not sure about your area?<br />
                    Ask us.
                  </>
                )}
              </h2>
            </div>

            <div className="areas-cta-right">
              <p className="areas-cta-desc">
                {isSq
                  ? 'Na dërgoni vendndodhjen e pronës dhe një përshkrim të shkurtër të punës. Do t’ju konfirmojmë nëse mund t’ju ndihmojmë dhe cilat shërbime ofrohen atje.'
                  : 'Send us the location of your property and a short description of the work. We will confirm whether we can help and which services are available there.'}
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
