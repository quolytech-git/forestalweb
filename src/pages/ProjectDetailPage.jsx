import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, Star } from 'lucide-react';
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

// 5 Stars Component
const StarRating = () => (
  <div className="pd-stars-row">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 8.5 12.859 L 13.753 16 L 12.359 10.08 L 17 6.097 L 10.889 5.583 L 8.5 0 L 6.112 5.583 L 0 6.097 L 4.641 10.08 L 3.247 16 Z"
          fill="#f59e0b"
        />
      </svg>
    ))}
  </div>
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
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isSq ? `${project.titleSq || project.title}: krahasim para dhe pas` : `${project.title}: before and after comparison`}
      >
        {/* Base Layer: After Image */}
        <img
          src={project.afterImage}
          alt={isSq ? `${project.titleSq || project.title}: pas` : `${project.title}: after`}
          className="pd-slider-img"
          draggable="false"
        />

        {/* Clipped Layer: Before Image */}
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
            alt={isSq ? `${project.titleSq || project.title}: para` : `${project.title}: before`}
            className="pd-slider-img"
            draggable="false"
          />
        </div>

        {/* Badges */}
        <div className="project-badge-before">{isSq ? 'Para' : 'Before'}</div>
        <div className="project-badge-after">{isSq ? 'Pas' : 'After'}</div>

        {/* Divider Line */}
        <div className="project-slider-divider" style={{ left: `${sliderPos}%` }} />

        {/* Center Handle */}
        <div className="project-slider-handle" style={{ left: `${sliderPos}%` }}>
          <SliderChevronsIcon />
        </div>
      </div>

      {/* Meta Footer */}
      <div
        className="pd-related-card-info"
        onClick={() => onNavigate && onNavigate('project-detail', project.slug)}
        style={{ cursor: 'pointer' }}
      >
        <div>
          <h4 className="pd-related-card-title">{isSq ? project.titleSq || project.title : project.title}</h4>
          <p className="pd-related-card-loc">{isSq ? project.locationSq || project.location : project.location}</p>
        </div>
        <div className="pd-related-card-tag">
          {isSq ? project.categorySq || project.category : project.category}
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage({
  projectSlug = 'maple-ridge-extension',
  onOpenEstimate,
  onNavigate,
  lang = 'en',
}) {
  const isSq = lang === 'sq';
  const project = projectDetailsMap[projectSlug] || projectDetailsMap['maple-ridge-extension'];

  // Hero Before/After comparison slider state
  const [heroSliderPos, setHeroSliderPos] = useState(50);
  const [isHeroDragging, setIsHeroDragging] = useState(false);
  const heroContainerRef = useRef(null);

  // Gallery Infinite Ticker & Drag State
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Update Hero Slider Position
  const updateHeroPosition = useCallback((clientX) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setHeroSliderPos(percent);
  }, []);

  const handleHeroPointerDown = (e) => {
    setIsHeroDragging(true);
    updateHeroPosition(e.clientX || (e.touches && e.touches[0]?.clientX));
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isHeroDragging) return;
      const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
      if (clientX !== undefined) updateHeroPosition(clientX);
    };

    const handleEnd = () => {
      if (isHeroDragging) setIsHeroDragging(false);
    };

    if (isHeroDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isHeroDragging, updateHeroPosition]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % project.gallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project.gallery.length]);

  // Gallery images duplicated for seamless infinite marquee loop
  const galleryItems = [...project.gallery, ...project.gallery, ...project.gallery];

  return (
    <div className="pd-page-wrapper">
      {/* ========================================================
          1. HERO HEADER & BEFORE/AFTER COMPARISON SLIDER
          ======================================================== */}
      <section className="pd-hero-section">
        <div className="container">
          <div className="pd-hero-header">
            {/* Breadcrumb line & category badge */}
            <div className="pd-hero-meta-row">
              <div className="pd-breadcrumb">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('project')}
                  className="pd-breadcrumb-link"
                >
                  // {isSq ? 'Projektet' : 'Projects'}
                </button>
                <span className="pd-breadcrumb-sep">//</span>
                <span className="pd-breadcrumb-current">
                  {isSq ? project.titleSq || project.title : project.title}
                </span>
              </div>
              <div className="pd-category-badge">
                {isSq ? project.categorySq || project.category : project.category}
              </div>
            </div>

            {/* Main Title & Subtitle */}
            <h1 className="pd-hero-title">
              {isSq ? project.titleSq || project.title : project.title}
            </h1>
            <p className="pd-hero-subtitle">
              {isSq ? project.subtitleSq : project.subtitle}
            </p>

            {/* CTA Button - Framer 1:1 White Pill Button */}
            <div className="pd-hero-cta-wrap">
              <motion.button
                onClick={() => onOpenEstimate && onOpenEstimate(project.category)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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

          {/* Large Hero Interactive Before/After Slider */}
          <div className="pd-hero-slider-container">
            <div
              ref={heroContainerRef}
              className="pd-hero-slider"
              onMouseDown={handleHeroPointerDown}
              onTouchStart={handleHeroPointerDown}
              role="slider"
              aria-valuenow={Math.round(heroSliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={isSq ? `${project.titleSq}: krahasim para dhe pas` : `${project.title}: before and after comparison`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setHeroSliderPos((p) => Math.max(0, p - 5));
                if (e.key === 'ArrowRight') setHeroSliderPos((p) => Math.min(100, p + 5));
              }}
            >
              {/* Base Layer: After Image */}
              <img
                src={project.afterImage}
                alt={isSq ? `${project.titleSq}: pas punimeve` : `${project.title}: after the work`}
                className="pd-slider-img"
                draggable="false"
              />

              {/* Clipped Layer: Before Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  clipPath: `inset(0 ${100 - heroSliderPos}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - heroSliderPos}% 0 0)`,
                  pointerEvents: 'none',
                }}
              >
                <img
                  src={project.beforeImage}
                  alt={isSq ? `${project.titleSq}: para punimeve` : `${project.title}: before the work`}
                  className="pd-slider-img"
                  draggable="false"
                />
              </div>

              {/* Frosted Badges */}
              <div className="project-badge-before">{isSq ? 'Para' : 'Before'}</div>
              <div className="project-badge-after">{isSq ? 'Pas' : 'After'}</div>

              {/* Divider Line */}
              <div className="project-slider-divider" style={{ left: `${heroSliderPos}%` }} />

              {/* Center Draggable Circular Handle with < > Chevrons */}
              <div className="project-slider-handle" style={{ left: `${heroSliderPos}%` }}>
                <SliderChevronsIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. THE TRANSFORMATION & PROJECT DETAILS CARD
          ======================================================== */}
      <section className="pd-story-section">
        <div className="container">
          <div className="pd-story-grid">
            {/* Left Story Column */}
            <div className="pd-story-left">
              <span className="pd-story-eyebrow">
                {isSq ? project.story.eyebrowSq : project.story.eyebrow}
              </span>
              <h2 className="pd-story-title">
                {isSq ? project.story.titleSq : project.story.title}
              </h2>
              <div className="pd-story-body">
                {(isSq ? project.story.paragraphsSq : project.story.paragraphs).map((p, idx) => (
                  <p key={idx} className="pd-story-paragraph">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Project Details Card */}
            <div className="pd-details-card">
              <h3 className="pd-details-heading">
                {isSq ? 'DETAJET E PROJEKTIT' : 'PROJECT DETAILS'}
              </h3>

              <div className="pd-details-list">
                <div className="pd-details-row">
                  <span className="pd-details-label">{isSq ? 'Kohëzgjatja' : 'Duration'}</span>
                  <span className="pd-details-value">
                    {isSq ? project.details.durationSq : project.details.duration}
                  </span>
                </div>

                <div className="pd-details-row">
                  <span className="pd-details-label">{isSq ? 'Fusha e Punës' : 'Scope'}</span>
                  <span className="pd-details-value">
                    {isSq ? project.details.scopeSq : project.details.scope}
                  </span>
                </div>

                <div className="pd-details-row">
                  <span className="pd-details-label">{isSq ? 'Shërbimet' : 'Services'}</span>
                  <span className="pd-details-value">
                    {isSq ? project.details.servicesSq : project.details.services}
                  </span>
                </div>

                <div className="pd-details-row">
                  <span className="pd-details-label">{isSq ? 'Buxheti' : 'Budget'}</span>
                  <span className="pd-details-value">
                    {isSq ? project.details.budgetRangeSq : project.details.budgetRange}
                  </span>
                </div>
              </div>

              {/* Quote CTA Button */}
              <div className="pd-details-btn-wrap">
                <motion.button
                  onClick={() => onOpenEstimate && onOpenEstimate(project.category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="pd-details-cta-btn"
                  aria-label={isSq ? 'Kërkoni një Preventiv të Ngjashëm' : 'Request a Similar Quote'}
                >
                  <span>{isSq ? 'Kërkoni një Preventiv të Ngjashëm' : 'Request a Similar Quote'}</span>
                  <div className="pd-details-arrow-circle">
                    <ArrowRight size={14} strokeWidth={2.4} />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. GALLERY SECTION: "EVERY ANGLE." (INFINITE TICKER ANIMATION)
          ======================================================== */}
      <section className="pd-gallery-section" id="gallery">
        <div className="container">
          <div className="pd-gallery-header">
            <span className="pd-gallery-eyebrow">// {isSq ? 'Galeria' : 'Gallery'}</span>
            <h2 className="pd-gallery-title">{isSq ? 'Çdo kënd.' : 'Every angle.'}</h2>
          </div>
        </div>

        {/* Full-width continuous animated ticker wrapper */}
        <div
          className="pd-ticker-wrapper"
          onMouseEnter={() => setIsGalleryHovered(true)}
          onMouseLeave={() => setIsGalleryHovered(false)}
        >
          {/* Subtle Left & Right vignette gradient overlays */}
          <div className="pd-ticker-overlay-left" />
          <div className="pd-ticker-overlay-right" />

          {/* Marquee Track: Butter-smooth infinite scrolling */}
          <div className={`pd-ticker-track ${isGalleryHovered ? 'paused' : ''}`}>
            {galleryItems.map((img, idx) => (
              <div
                key={idx}
                className="pd-gallery-item"
                onClick={() => setLightboxIndex(idx % project.gallery.length)}
                title={isSq ? img.captionSq : img.caption}
              >
                <img
                  src={img.url}
                  alt={isSq ? img.captionSq : img.caption}
                  className="pd-gallery-img"
                  loading="lazy"
                />
                <div className="pd-gallery-item-overlay">
                  <div className="pd-gallery-zoom-icon">
                    <ZoomIn size={18} strokeWidth={2.2} />
                  </div>
                  <span className="pd-gallery-item-caption">
                    {isSq ? img.captionSq : img.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. REVIEWS SECTION: "HOMEOWNERS LOVE THE RESULTS."
          ======================================================== */}
      <section className="pd-reviews-section">
        <div className="container">
          <div className="pd-reviews-header">
            <span className="pd-reviews-eyebrow">// {isSq ? 'Vlerësimet' : 'Reviews'} //</span>
            <h2 className="pd-reviews-title">
              {isSq ? 'Çfarë thonë klientët tanë.' : 'What our clients say.'}
            </h2>

            {/* Centered Rating Pill with 3 overlapping avatars */}
            <div className="pd-reviews-rating-pill">
              <div className="pd-reviews-avatar-cluster">
                {project.reviews.map((r, i) => (
                  <img
                    key={i}
                    src={r.avatar}
                    alt=""
                    className="pd-cluster-avatar"
                  />
                ))}
              </div>
              <div className="pd-reviews-stars-group">
                <StarRating />
                <span className="pd-reviews-rating-text">
                  {isSq ? 'Vlerësimet e verifikuara së shpejti' : 'Verified reviews coming soon'}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Review Cards Grid */}
          <div className="pd-reviews-grid">
            {project.reviews.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: r.id * 0.1 }}
                className="pd-review-card"
              >
                <div className="pd-review-stars">
                  <StarRating />
                </div>
                <blockquote className="pd-review-quote">
                  {isSq ? r.quoteSq || r.quote : r.quote}
                </blockquote>
                <div className="pd-review-author-row">
                  <img src={r.avatar} alt="" className="pd-review-author-avatar" />
                  <div>
                    <h4 className="pd-review-author-name">{isSq ? r.nameSq || r.name : r.name}</h4>
                    <p className="pd-review-author-role">{isSq ? r.roleSq || r.role : r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SEE THE TRANSFORMATION: OTHER PROJECTS
          ======================================================== */}
      <section className="pd-transformations-section">
        <div className="container">
          <div className="pd-transformations-header">
            <div>
              <span className="pd-transformations-eyebrow">// {isSq ? 'Projektet' : 'Projects'}</span>
              <h2 className="pd-transformations-title">
                {isSq ? 'Projekte të tjera.' : 'More projects.'}
              </h2>
            </div>
            <motion.button
              onClick={() => onNavigate && onNavigate('project')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="pd-all-projects-btn"
              aria-label={isSq ? 'Të Gjitha Projektet' : 'All Projects'}
            >
              <span>{isSq ? 'Të Gjitha Projektet' : 'All Projects'}</span>
              <div className="pd-all-projects-arrow">
                <ArrowRight size={13} strokeWidth={2.4} />
              </div>
            </motion.button>
          </div>

          {/* 3 Before/After Cards Grid */}
          <div className="pd-related-grid">
            {project.relatedProjects.map((p) => (
              <RelatedProjectCard
                key={p.id}
                project={p}
                onNavigate={onNavigate}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. BOTTOM CALL TO ACTION
          ======================================================== */}
      <section className="pd-cta-section">
        <div className="container">
          <div className="pd-cta-card">
            <h2 className="pd-cta-title">
              {isSq ? 'Keni një projekt të ngjashëm? Le të flasim.' : 'Have a similar project? Let’s talk.'}
            </h2>
            <p className="pd-cta-subtitle">
              {isSq
                ? 'Konsultë fillestare falas, pa detyrime. Shohim punën, ju shpjegojmë hapat e radhës dhe përgatisim një preventiv.'
                : 'Free initial consultation, no obligation. We look at the work, explain the next steps and prepare a quotation.'}
            </p>
            <motion.button
              onClick={() => onOpenEstimate && onOpenEstimate(project.category)}
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
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FULLSCREEN INTERACTIVE GALLERY LIGHTBOX MODAL
          ======================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pd-lightbox-backdrop"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="pd-lightbox-content" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                type="button"
                className="pd-lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                aria-label={isSq ? 'Mbyll' : 'Close'}
              >
                <X size={20} strokeWidth={2.4} />
              </button>

              {/* Lightbox Main Image */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                src={project.gallery[lightboxIndex].url}
                alt={
                  isSq
                    ? project.gallery[lightboxIndex].captionSq
                    : project.gallery[lightboxIndex].caption
                }
                className="pd-lightbox-img"
              />

              {/* Prev & Next Navigation Buttons */}
              <button
                type="button"
                className="pd-lightbox-nav-btn prev"
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
                  )
                }
                aria-label={isSq ? 'Fotoja e mëparshme' : 'Previous photo'}
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                className="pd-lightbox-nav-btn next"
                onClick={() =>
                  setLightboxIndex((prev) => (prev + 1) % project.gallery.length)
                }
                aria-label={isSq ? 'Fotoja tjetër' : 'Next photo'}
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>

              {/* Caption & Counter */}
              <div className="pd-lightbox-footer">
                <p className="pd-lightbox-caption">
                  {isSq
                    ? project.gallery[lightboxIndex].captionSq
                    : project.gallery[lightboxIndex].caption}
                </p>
                <span className="pd-lightbox-counter">
                  {lightboxIndex + 1} / {project.gallery.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
