import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

const filterCategories = [
  { id: 'All', labelEn: 'All', labelSq: 'Të Gjitha' },
  { id: 'Construction', labelEn: 'Construction', labelSq: 'Ndërtim' },
  { id: 'Renovation', labelEn: 'Renovation', labelSq: 'Rinovim' },
  { id: 'Maintenance', labelEn: 'Maintenance', labelSq: 'Mirëmbajtje' },
];

const gridVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesPage({ onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredServices = siteData.services.filter((s) => {
    if (activeFilter === 'All') return true;
    return s.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const stats = siteData.stats.map((s) => ({ val: s.value, lbl: isSq ? s.labelSq : s.label }));

  return (
    <div className="services-page-wrapper">
      {/* ========================================================
          1. PANORAMIC HERO BANNER (1:1 RenovateHub Services Reference)
          ======================================================== */}
      <section className="services-hero-section">
        <div className="services-hero-card">
          <img
            src="https://framerusercontent.com/images/dMw4ivm3oSohk6Vu8h5VzN01Y5g.png"
            alt={isSq ? 'Shërbimet e Forest-Al' : 'Forest-Al services'}
            className="services-hero-bg"
            loading="eager"
          />

          <div className="services-hero-scrim-top" />
          <div className="services-hero-scrim-bottom" />

          <div className="services-hero-container">
            <div className="services-hero-row">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="services-hero-left"
              >
                <div className="services-hero-tag">
                  {isSq ? '// Shërbimet Tona' : '// Services'}
                </div>
                <h1 className="services-hero-h1">
                  {isSq ? 'Ndërtim, rinovim dhe mirëmbajtje.' : 'Construction, renovation and maintenance.'}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="services-hero-right"
              >
                <p className="services-hero-p">
                  {isSq
                    ? 'Nga konstruksionet metalike dhe sistemet e gipsit deri te mirëmbajtja elektrike, hidraulike dhe mekanike. Shikoni çfarë bëjmë dhe kërkoni një preventiv për punën tuaj.'
                    : 'From metal structures and drywall systems to electrical, plumbing and mechanical maintenance. See what we do, then request a quotation for your work.'}
                </p>

                <motion.button
                  onClick={onOpenEstimate}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="services-hero-cta-btn"
                  aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
                >
                  <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                  <div className="services-hero-cta-arrow">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FILTER TABS (All | Interior | Additions | Exterior)
          ======================================================== */}
      <section className="services-filter-section">
        <div className="services-filter-bar">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`services-filter-pill ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                {isSq ? cat.labelSq : cat.labelEn}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. 9 SERVICES GRID (3x3 Grid of Interactive Cards)
          ======================================================== */}
      <section className="services-grid-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="services-cards-grid"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.slug}
                  variants={cardVariants}
                  className="service-catalog-card"
                  onClick={() => onNavigate && onNavigate(`service/${service.slug}`)}
                >
                  {/* Top Image with Frosted Category Tag */}
                  <div className="service-card-img-wrap">
                    <img
                      src={service.image}
                      alt={isSq ? service.titleSq : service.title}
                      className="service-card-img"
                      loading="lazy"
                    />
                    <div className="service-card-cat-badge">
                      <span className="service-card-cat-dot">•</span>
                      <span>{isSq ? service.categorySq : service.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="service-card-content">
                    <div className="service-card-header">
                      <h3 className="service-card-title">
                        {isSq ? service.titleSq : service.title}
                      </h3>
                      <p className="service-card-desc">
                        {isSq ? service.descriptionSq : service.description}
                      </p>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="service-card-footer">
                      <button
                        className="service-card-link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNavigate) onNavigate(`service/${service.slug}`);
                        }}
                      >
                        <span className="service-card-link-text">
                          {isSq ? 'Mësoni Më Shumë' : 'Learn More'}
                        </span>
                        <div className="service-card-link-circle">
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================
          4. STATS SECTION (FULL-WIDTH DARK HORIZONTAL BAR)
          ======================================================== */}
      <section className="projects-stats-section">
        <div className="container">
          <div className="projects-stats-grid">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="projects-stat-col"
              >
                <div className="projects-stat-val">{item.val}</div>
                <div className="projects-stat-lbl">{item.lbl}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. PRE-FOOTER CTA CARD ("Your home could be next.")
          ======================================================== */}
      <section className="projects-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="projects-cta-banner"
          >
            <div>
              <div className="projects-cta-tag">
                {isSq ? '// Le të Fillojmë' : "// Let's Begin"}
              </div>
              <h2 className="projects-cta-title">
                {isSq ? (
                  <>
                    Projekti juaj mund<br />
                    të jetë i radhës.
                  </>
                ) : (
                  <>
                    Your project could<br />
                    be next.
                  </>
                )}
              </h2>
            </div>

            <div className="projects-cta-right">
              <p className="projects-cta-desc">
                {isSq
                  ? 'Konsultë fillestare falas, pa detyrime. Shohim punën, ju shpjegojmë hapat e radhës dhe përgatisim një preventiv.'
                  : 'Free initial consultation, no obligation. We look at the work, explain the next steps and prepare a quotation.'}
              </p>

              <motion.button
                onClick={onOpenEstimate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="projects-cta-btn"
                aria-label={isSq ? 'Na Kontaktoni' : 'Contact Us'}
              >
                <span>{isSq ? 'Kërkoni një Preventiv' : 'Request an Estimate'}</span>
                <div className="projects-cta-btn-arrow">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </motion.button>

              <div className="projects-cta-sub">
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
