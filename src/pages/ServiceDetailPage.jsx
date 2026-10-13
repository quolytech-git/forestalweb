import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, Plus, Minus } from 'lucide-react';
import { serviceDetailsMap } from '../data/serviceDetailsData';
import { projectDetailsMap } from '../data/projectDetailsData';

// Framer-exact chevrons icon (< >)
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

// Interactive Before/After Comparison Card for Related Projects
function RelatedProjectCard({ project, onNavigate, lang }) {
  const isSq = lang === 'sq';
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
      if (clientX !== undefined) updatePosition(clientX);
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
    <div className="pd-related-card">
      <div
        ref={containerRef}
        className="pd-related-slider-wrapper"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        <img
          src={project.afterImage}
          alt={isSq ? `${project.titleSq || project.title}: pas` : `${project.title}: after`}
          className="pd-slider-img"
          loading="lazy"
        />

        <div
          className="pd-slider-clip"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={project.beforeImage}
            alt={isSq ? `${project.titleSq || project.title}: para` : `${project.title}: before`}
            className="pd-slider-img"
            loading="lazy"
          />
        </div>

        <div className="pd-slider-divider" style={{ left: `${sliderPos}%` }}>
          <div className="pd-slider-handle">
            <SliderChevronsIcon />
          </div>
        </div>

        <div className="pd-pill-tag pd-pill-before">
          {isSq ? 'Përpara' : 'Before'}
        </div>
        <div className="pd-pill-tag pd-pill-after">
          {isSq ? 'Më Pas' : 'After'}
        </div>
      </div>

      <div className="pd-related-info">
        <div className="pd-related-meta">
          <h4 className="pd-related-title">
            {isSq ? project.titleSq || project.title : project.title}
          </h4>
          <span className="pd-related-cat">
            {isSq ? project.categorySq || project.category : project.category}
          </span>
        </div>
        <div className="pd-related-loc-row">
          <span className="pd-related-loc">{isSq ? project.locationSq || project.location : project.location}</span>
          <button
            onClick={() => onNavigate && onNavigate(`project/${project.slug}`)}
            className="pd-related-view-btn"
          >
            <span>{isSq ? 'Shiko Projektin' : 'View Project'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage({
  serviceSlug = 'metal-structures',
  onOpenEstimate,
  onNavigate,
  lang = 'en',
}) {
  const isSq = lang === 'sq';
  const service = serviceDetailsMap[serviceSlug] || serviceDetailsMap['metal-structures'];

  // Hero Before/After comparison slider state
  const [heroSliderPos, setHeroSliderPos] = useState(50);
  const [isHeroDragging, setIsHeroDragging] = useState(false);
  const heroSliderRef = useRef(null);

  // Lightbox Modal state for angle gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // FAQ accordion open/close state
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const updateHeroSlider = useCallback((clientX) => {
    if (!heroSliderRef.current) return;
    const rect = heroSliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setHeroSliderPos(percent);
  }, []);

  const handleHeroPointerDown = (e) => {
    setIsHeroDragging(true);
    updateHeroSlider(e.clientX || (e.touches && e.touches[0]?.clientX));
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isHeroDragging) return;
      const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
      if (clientX !== undefined) updateHeroSlider(clientX);
    };

    const handlePointerUp = () => {
      if (isHeroDragging) setIsHeroDragging(false);
    };

    if (isHeroDragging) {
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
  }, [isHeroDragging, updateHeroSlider]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) => (prev + 1) % service.gallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) => (prev - 1 + service.gallery.length) % service.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, service.gallery.length]);

  // Related projects
  const relatedProjects = (service.relatedProjectSlugs || [])
    .map((s) => projectDetailsMap[s])
    .filter(Boolean);

  return (
    <div className="pd-page-wrapper service-detail-wrapper">
      {/* ========================================================
          1. DARK HERO BANNER SECTION (1:1 RenovateHub Reference)
          ======================================================== */}
      <section className="pd-hero-section">
        <div className="container">
          <div className="pd-hero-header">
            {/* Meta Row: Breadcrumbs + Category Badge */}
            <div className="pd-hero-meta-row">
              <nav className="pd-breadcrumb" aria-label={isSq ? "Navigimi" : "Breadcrumb"}>
                <button
                  onClick={() => onNavigate && onNavigate('services')}
                  className="pd-breadcrumb-link"
                >
                  // {isSq ? 'Shërbimet' : 'Services'}
                </button>
                <span className="pd-breadcrumb-sep">//</span>
                <span className="pd-breadcrumb-current">
                  {isSq ? service.titleSq : service.title}
                </span>
              </nav>

              <span className="pd-category-badge">
                {isSq ? service.categorySq : service.category}
              </span>
            </div>

            {/* H1 Service Title */}
            <h1 className="pd-hero-title">
              {isSq ? service.titleSq : service.title}
            </h1>

            {/* Subtitle */}
            <p className="pd-hero-subtitle">
              {isSq ? service.subtitleSq : service.subtitle}
            </p>

            {/* Pill CTA Button */}
            <div className="pd-hero-cta-wrap">
              <motion.button
                onClick={onOpenEstimate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="pd-hero-cta-btn"
                aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
              >
                <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                <div className="pd-hero-cta-arrow">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Interactive Hero Showcase (Before/After Slider) */}
          <div className="pd-hero-slider-container">
            <div
              ref={heroSliderRef}
              className="pd-hero-slider"
              onMouseDown={handleHeroPointerDown}
              onTouchStart={handleHeroPointerDown}
              role="slider"
              aria-valuenow={Math.round(heroSliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={isSq ? 'Krahasim para dhe pas' : 'Before and after comparison'}
            >
              {/* AFTER Image (Base Layer) */}
              <img
                src={service.heroAfterImage}
                alt={isSq ? `${service.titleSq}: pas punimeve` : `${service.title}: after the work`}
                className="pd-slider-img"
                loading="eager"
              />

              {/* BEFORE Image (Clipped Layer) */}
              <div
                className="pd-slider-clip"
                style={{ clipPath: `inset(0 ${100 - heroSliderPos}% 0 0)` }}
              >
                <img
                  src={service.heroBeforeImage}
                  alt={isSq ? `${service.titleSq}: para punimeve` : `${service.title}: before the work`}
                  className="pd-slider-img"
                  loading="eager"
                />
              </div>

              {/* Center Draggable Divider */}
              <div
                className="pd-slider-divider"
                style={{ left: `${heroSliderPos}%` }}
              >
                <div className="pd-slider-handle">
                  <SliderChevronsIcon />
                </div>
              </div>

              {/* Badges */}
              <div className="pd-pill-tag pd-pill-before">
                {isSq ? 'Përpara' : 'Before'}
              </div>
              <div className="pd-pill-tag pd-pill-after">
                {isSq ? 'Më Pas' : 'After'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. THE SCOPE & SERVICE DETAILS SPECIFICATIONS CARD
          ======================================================== */}
      <section className="pd-story-section">
        <div className="container">
          <div className="pd-story-grid">
            {/* Left Column: Scope & Story Narrative */}
            <div className="pd-story-left">
              <span className="pd-story-eyebrow">
                // {isSq ? 'Fusha e Punës' : 'The Scope'}
              </span>
              <h2 className="pd-story-title">
                {isSq ? service.scopeTitleSq : service.scopeTitle}
              </h2>
              <h3 className="service-story-subheading">
                {isSq ? service.storyHeadingSq : service.storyHeading}
              </h3>

              <div className="pd-story-text-flow">
                {(isSq ? service.storyParagraphsSq : service.storyParagraphs).map(
                  (paragraph, idx) => (
                    <p key={idx} className="pd-story-p">
                      {paragraph}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Right Column: Service Details Spec Card */}
            <div className="pd-story-right">
              <div className="pd-details-card">
                <h3 className="pd-details-heading">
                  {isSq ? 'DETAJET E SHËRBIMIT' : 'SERVICE DETAILS'}
                </h3>

                <div className="pd-details-list">
                  <div className="pd-details-row">
                    <span className="pd-details-label">
                      {isSq ? 'Kohëzgjatja' : 'Duration'}
                    </span>
                    <span className="pd-details-value">
                      {isSq ? service.specs.durationSq : service.specs.duration}
                    </span>
                  </div>

                  <div className="pd-details-row">
                    <span className="pd-details-label">
                      {isSq ? 'Punët tipike' : 'Typical tasks'}
                    </span>
                    <span className="pd-details-value">
                      {isSq ? service.specs.scopeSq : service.specs.scope}
                    </span>
                  </div>

                  <div className="pd-details-row">
                    <span className="pd-details-label">
                      {isSq ? 'Kushtet e punës' : 'Work terms'}
                    </span>
                    <span className="pd-details-value">
                      {isSq ? service.specs.warrantySq : service.specs.warranty}
                    </span>
                  </div>

                  <div className="pd-details-row">
                    <span className="pd-details-label">
                      {isSq ? 'Çmimi' : 'Pricing'}
                    </span>
                    <span className="pd-details-value">
                      {isSq ? service.specs.budgetRangeSq : service.specs.budgetRange}
                    </span>
                  </div>
                </div>

                <div className="pd-details-btn-wrap">
                  <button onClick={onOpenEstimate} className="pd-details-cta-btn">
                    <span>{isSq ? 'Kërkoni një Preventiv' : 'Request a Quotation'}</span>
                    <div className="pd-details-cta-arrow">
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PROCESS BREAKDOWN ("Simple, start to finish.")
          ======================================================== */}
      <section className="service-process-section">
        <div className="container">
          <div className="service-process-header">
            <span className="service-process-tag">
              // {isSq ? 'Metodologjia Jonë' : 'Our Process'}
            </span>
            <h2 className="service-process-title">
              {isSq ? 'Hap pas hapi, nga fillimi në fund.' : 'Step by step, start to finish.'}
            </h2>
          </div>

          <div className="service-process-grid">
            {service.processSteps.map((step) => (
              <div key={step.num} className="service-process-card">
                <div className="service-process-num">{step.num}</div>
                <h3 className="service-process-step-title">
                  {isSq ? step.titleSq : step.title}
                </h3>
                <p className="service-process-step-desc">
                  {isSq ? step.descSq : step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. "EVERY ANGLE." CONTINUOUS 60FPS MARQUEE GALLERY
          ======================================================== */}
      <section className="pd-gallery-section">
        <div className="container pd-gallery-header-container">
          <div className="pd-gallery-header">
            <span className="pd-gallery-tag">// {isSq ? 'Galeria' : 'Gallery'}</span>
            <h2 className="pd-gallery-title">{isSq ? 'Çdo kënd.' : 'Every angle.'}</h2>
          </div>
        </div>

        {/* Infinite Continuous Marquee Strip */}
        <div className="pd-marquee-container">
          <div className="pd-marquee-vignette-left" />
          <div className="pd-marquee-vignette-right" />

          <div className="pd-marquee-track">
            {/* Render 3 identical sets of images for seamless infinite loop */}
            {[0, 1, 2].map((setIndex) => (
              <div
                key={`gallery-set-${setIndex}`}
                className="pd-marquee-group"
                aria-hidden={setIndex > 0}
              >
                {service.gallery.map((photo, photoIndex) => (
                  <div
                    key={`photo-${setIndex}-${photoIndex}`}
                    className="pd-marquee-item"
                    onClick={() => {
                      setActivePhotoIdx(photoIndex);
                      setLightboxOpen(true);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={isSq ? 'Hap foton në ekran të plotë' : 'Open photo in full screen'}
                  >
                    <div className="pd-marquee-img-wrap">
                      <img
                        src={photo.url}
                        alt={isSq ? photo.descSq : photo.desc}
                        className="pd-marquee-img"
                        loading="lazy"
                      />
                      <div className="pd-marquee-overlay">
                        <div className="pd-marquee-zoom-pill">
                          <ZoomIn size={14} />
                          <span>{isSq ? 'Zmadho' : 'Zoom'}</span>
                        </div>
                        <div className="pd-marquee-caption">
                          <h4>{isSq ? photo.titleSq : photo.title}</h4>
                          <p>{isSq ? photo.descSq : photo.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. "RECENT TRANSFORMATIONS" BEFORE/AFTER CASES
          ======================================================== */}
      {relatedProjects.length > 0 && (
        <section className="pd-transformations-section">
          <div className="container">
            <div className="pd-transformations-header">
              <div>
                <span className="pd-transformations-tag">
                  // {isSq ? 'Projektet' : 'Projects'}
                </span>
                <h2 className="pd-transformations-title">
                  {isSq
                    ? `Projekte të lidhura: ${service.titleSq}`
                    : `Related ${service.title.toLowerCase()} projects.`}
                </h2>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('project')}
                className="pd-all-projects-btn"
                aria-label={isSq ? 'Shikoni të gjitha projektet' : 'View all projects'}
              >
                <span>{isSq ? 'Të Gjitha Projektet' : 'All Projects'}</span>
                <div className="pd-all-projects-arrow">
                  <ArrowRight size={14} strokeWidth={2.4} />
                </div>
              </button>
            </div>

            <div className="pd-transformations-grid">
              {relatedProjects.map((proj) => (
                <RelatedProjectCard
                  key={proj.slug}
                  project={proj}
                  onNavigate={onNavigate}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          6. SERVICE FAQ SECTION ("Questions, answered.")
          ======================================================== */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="service-faq-section">
          <div className="container">
            <div className="service-faq-header">
              <span className="service-faq-tag">
                // {isSq ? 'Pyetjet e Shpeshta' : 'FAQ'}
              </span>
              <h2 className="service-faq-title">
                {isSq
                  ? `Pyetje rreth: ${service.titleSq}`
                  : `Questions about ${service.title.toLowerCase()}.`}
              </h2>
            </div>

            <div className="service-faq-list">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`service-faq-item ${isOpen ? 'open' : ''}`}
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  >
                    <div className="service-faq-question-row">
                      <h4 className="service-faq-question">
                        {isSq ? faq.qSq : faq.q}
                      </h4>
                      <div className="service-faq-toggle-btn">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="service-faq-answer-wrap"
                        >
                          <p className="service-faq-answer">
                            {isSq ? faq.aSq : faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          7. PRE-FOOTER CTA CARD ("Your home could be next.")
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
                    Ju nevojitet ky shërbim?<br />
                    Le të flasim.
                  </>
                ) : (
                  <>
                    Need this service?<br />
                    Let’s talk.
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
                aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
              >
                <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
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

      {/* ========================================================
          FULL-SCREEN LIGHTBOX MODAL
          ======================================================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pd-lightbox-backdrop"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="pd-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="pd-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label={isSq ? 'Mbyll' : 'Close'}
              >
                <X size={20} />
              </button>

              <button
                className="pd-lightbox-nav pd-lightbox-prev"
                onClick={() =>
                  setActivePhotoIdx(
                    (prev) => (prev - 1 + service.gallery.length) % service.gallery.length
                  )
                }
                aria-label={isSq ? 'Fotoja e mëparshme' : 'Previous photo'}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="pd-lightbox-nav pd-lightbox-next"
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev + 1) % service.gallery.length)
                }
                aria-label={isSq ? 'Fotoja tjetër' : 'Next photo'}
              >
                <ChevronRight size={24} />
              </button>

              <div className="pd-lightbox-content">
                <img
                  src={service.gallery[activePhotoIdx].url}
                  alt={isSq ? service.gallery[activePhotoIdx].descSq : service.gallery[activePhotoIdx].desc}
                  className="pd-lightbox-img"
                />
                <div className="pd-lightbox-meta">
                  <h3>{isSq ? service.gallery[activePhotoIdx].titleSq : service.gallery[activePhotoIdx].title}</h3>
                  <p>{isSq ? service.gallery[activePhotoIdx].descSq : service.gallery[activePhotoIdx].desc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
