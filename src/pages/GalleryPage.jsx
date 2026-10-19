import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GalleryCard from '../components/GalleryCard';
import { galleriesList, galleryGroups } from '../data/galleryData';

const gridVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.18,
      staggerChildren: 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function GalleryPage({ onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const [activeGroup, setActiveGroup] = useState('all');

  const filteredGalleries =
    activeGroup === 'all' ? galleriesList : galleriesList.filter((g) => g.group === activeGroup);

  const totalPhotos = galleriesList.reduce((sum, g) => sum + g.photos.length, 0);
  const totalVideos = galleriesList.reduce((sum, g) => sum + g.videoList.length, 0);
  const projectCount = galleriesList.filter((g) => g.group !== 'team').length;

  const stats = [
    { val: projectCount, lbl: isSq ? 'Projekte në galeri' : 'Projects in the gallery' },
    { val: totalPhotos, lbl: isSq ? 'Foto nga kantieri' : 'Photos from site' },
    { val: totalVideos, lbl: isSq ? 'Video të punës' : 'Videos of the work' },
    { val: isSq ? 'Hap pas hapi' : 'Step by step', lbl: isSq ? 'Nga fillimi deri në fund' : 'From start to finish' },
  ];

  return (
    <div className="projects-page-wrapper">
      {/* ========================================================
          1. HERO BANNER (same layout as the Projects page)
          ======================================================== */}
      <section className="projects-hero-section">
        <div className="projects-hero-card">
          <img
            src="/gallery/minepeza-building/1.jpg"
            alt={isSq ? 'Objekt banimi i realizuar nga Forest-Al' : 'Residential building by Forest-Al'}
            className="projects-hero-bg gl-hero-bg-pos"
          />
          <div className="projects-hero-scrim-top" />
          <div className="projects-hero-scrim-bottom" />

          <div className="projects-hero-container">
            <div className="projects-hero-row">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="projects-hero-left"
              >
                <div className="projects-tag">{isSq ? '// Galeria' : '// Gallery'}</div>
                <h1 className="projects-hero-h1">
                  {isSq ? (
                    <>
                      Punë reale.<br />
                      Hap pas hapi.
                    </>
                  ) : (
                    <>
                      Real work.<br />
                      Step by step.
                    </>
                  )}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="projects-hero-right"
              >
                <p className="projects-hero-p">
                  {isSq
                    ? 'Foto dhe video nga kantieret tona: objekte, apartamente, biznese dhe ekipi në punë. Hapni një galeri për ta parë projektin nga dita e parë deri te dorëzimi.'
                    : 'Photos and videos from our sites: buildings, apartments, businesses and the team at work. Open a gallery to follow a project from the first day to handover.'}
                </p>

                <motion.button
                  onClick={onOpenEstimate}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="framer-cta-pill primary"
                  aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
                >
                  <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                  <div className="framer-cta-arrow-circle">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FILTER TABS PILL BAR
          ======================================================== */}
      <section className="projects-filter-section">
        <div className="projects-filter-bar">
          {galleryGroups.map((group) => (
            <button
              key={group.key}
              onClick={() => setActiveGroup(group.key)}
              className={`projects-filter-pill ${activeGroup === group.key ? 'active' : ''}`}
            >
              {isSq ? group.labelSq : group.label}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. GALLERY CARDS
          ======================================================== */}
      <section className="projects-grid-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="projects-grid"
            >
              {filteredGalleries.map((gallery) => (
                <GalleryCard key={gallery.slug} gallery={gallery} onNavigate={onNavigate} lang={lang} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================
          4. STATS SECTION
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
          5. PRE-FOOTER CTA CARD
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
              <div className="projects-cta-tag">{isSq ? '// Le të Fillojmë' : "// Let's Begin"}</div>
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
                aria-label={isSq ? 'Kërkoni një Preventiv' : 'Request an Estimate'}
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
