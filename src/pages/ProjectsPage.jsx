import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { projectsList } from '../data/projectDetailsData';

// Exact Framer Slider Chevrons Icon (< >)
const SliderChevronsIcon = () => (
  <svg
    viewBox="0 0 28 23"
    width="20"
    height="20"
    fill="none"
    stroke="#1a1a17"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g transform="translate(-1, 0)">
      <polyline points="11 18 5 12 11 6" />
    </g>
    <g transform="translate(14, 0)">
      <polyline points="5 18 11 12 5 6" />
    </g>
  </svg>
);

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

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Individual Project Card with Interactive Before/After Comparison Slider
function ProjectComparisonCard({ project, onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  // Projects without a verified same-room pair show their finished photo only
  const hasPair = Boolean(project.beforeImage);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX || (e.touches && e.touches[0]?.clientX));
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
      if (clientX !== undefined) {
        updatePosition(clientX);
      }
    };

    const handlePointerUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <motion.div
      variants={cardVariants}
      className="project-card"
    >
      {/* Interactive Before & After Slider Box */}
      <div
        ref={containerRef}
        className="project-slider-wrapper"
        onMouseDown={hasPair ? handlePointerDown : undefined}
        onTouchStart={hasPair ? handlePointerDown : undefined}
        onClick={hasPair ? undefined : () => onNavigate && onNavigate('project-detail', project.slug)}
        style={hasPair ? undefined : { cursor: 'pointer' }}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isSq ? `${project.titleSq}: krahasim para dhe pas` : `${project.title}: before and after comparison`}
      >
        {/* Base Layer: After Image */}
        <img
          src={project.afterImage}
          alt={isSq ? `${project.titleSq}: pas` : `${project.title}: after`}
          className="project-slider-img"
          draggable="false"
        />

        {hasPair && (
        <>
        {/* Top Clipped Layer: Before Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            pointerEvents: 'none',
          }}
        >
          <img
            src={project.beforeImage}
            alt={isSq ? `${project.titleSq}: para` : `${project.title}: before`}
            className="project-slider-img"
            draggable="false"
          />
        </div>

        {/* Floating Badges */}
        <div className="project-badge-before">{isSq ? 'Para' : 'Before'}</div>

        {/* Draggable Divider Line */}
        <div className="project-slider-divider" style={{ left: `${sliderPos}%` }} />

        {/* Draggable Center Handle Circle with < > Chevrons */}
        <div className="project-slider-handle" style={{ left: `${sliderPos}%` }}>
          <SliderChevronsIcon />
        </div>
        </>
        )}
        <div className="project-badge-after">
          {hasPair ? (isSq ? 'Pas' : 'After') : isSq ? 'E përfunduar' : 'Finished'}
        </div>
      </div>

      {/* Card Info Footer */}
      <div
        className="project-card-info"
        onClick={() => onNavigate && onNavigate('project-detail', project.slug)}
        style={{ cursor: 'pointer' }}
        title={isSq ? 'Kliko për të parë detajet e projektit' : 'Click to view project details'}
      >
        <div>
          <h3 className="project-card-title">{isSq ? project.titleSq : project.title}</h3>
          <p className="project-card-loc">{isSq ? project.locationSq : project.location}</p>
        </div>
        <div className="project-category-tag">
          {isSq ? project.categorySq || project.category : project.category}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage({ onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const [activeFilter, setActiveFilter] = useState('All');

  // Real Forest-Al projects (see projectDetailsData.js and galleryData.js)
  const projectsData = projectsList.map((p, i) => ({ ...p, id: i + 1 }));

  const filterTabs = [
    { key: 'All', labelEn: 'All', labelSq: 'Të Gjitha' },
    { key: 'Construction', labelEn: 'Construction', labelSq: 'Ndërtim' },
    { key: 'Renovation', labelEn: 'Renovation', labelSq: 'Rinovim' },
    { key: 'Partitions & Ceilings', labelEn: 'Partitions & Ceilings', labelSq: 'Ndarje dhe Tavane' },
  ].filter(
    (tab) => tab.key === 'All' || projectsData.some((p) => p.category.toLowerCase() === tab.key.toLowerCase())
  );

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  const stats = siteData.stats.map((s) => ({ val: s.value, lbl: isSq ? s.labelSq : s.label }));

  return (
    <div className="projects-page-wrapper">
      {/* ========================================================
          1. HERO BANNER (1:1 RenovateHub Reference Layout)
          ======================================================== */}
      <section className="projects-hero-section">
        <div className="projects-hero-card">
          <img
            src="/gallery/garden-building/14.jpg"
            alt={isSq ? 'Projektet e Forest-Al' : 'Forest-Al projects'}
            className="projects-hero-bg"
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
                <div className="projects-tag">{isSq ? '// Projektet' : '// Projects'}</div>
                <h1 className="projects-hero-h1">
                  {isSq ? (
                    <>
                      Punë e planifikuar.<br />
                      Rezultate të dukshme.
                    </>
                  ) : (
                    <>
                      Planned work.<br />
                      Visible results.
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
                    ? 'Objekte, apartamente dhe biznese të realizuara nga ekipi i Forest-Al. Lëvizni rrëshqitësin për të krahasuar para dhe pas.'
                    : 'Buildings, apartments and businesses delivered by the Forest-Al team. Drag any slider to compare before and after.'}
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
          {filterTabs.map((tab) => {
            const isActive = activeFilter.toLowerCase() === tab.key.toLowerCase();
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`projects-filter-pill ${isActive ? 'active' : ''}`}
              >
                {isSq ? tab.labelSq : tab.labelEn}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. 6 PROJECT CARDS WITH INTERACTIVE BEFORE/AFTER SLIDERS
          ======================================================== */}
      <section className="projects-grid-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={gridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="projects-grid"
            >
              {filteredProjects.map((project) => (
                <ProjectComparisonCard
                  key={project.id}
                  project={project}
                  onOpenEstimate={onOpenEstimate}
                  onNavigate={onNavigate}
                  lang={lang}
                />
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
