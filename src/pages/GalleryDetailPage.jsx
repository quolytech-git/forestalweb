import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, Images } from 'lucide-react';
import GalleryVideo from '../components/GalleryVideo';
import GalleryCard from '../components/GalleryCard';
import { galleriesList, galleryDetailsMap, galleryGroups } from '../data/galleryData';

const pad = (n) => String(n).padStart(2, '0');

export default function GalleryDetailPage({ gallerySlug = 'garden-building', onOpenEstimate, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const gallery = galleryDetailsMap[gallerySlug] || galleryDetailsMap['garden-building'];
  const title = isSq ? gallery.titleSq : gallery.title;
  const group = galleryGroups.find((g) => g.key === gallery.group);

  const [activeStage, setActiveStage] = useState('all');
  const [activeVideo, setActiveVideo] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Scroll-linked progress line for the step-by-step timeline (same behaviour as the home page)
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 65%', 'end 80%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const visiblePhotos =
    activeStage === 'all' ? gallery.photos : gallery.photos.filter((p) => p.stepIndex === activeStage);

  // Lightbox always browses the full gallery in stage order
  const openPhoto = (n) => setLightboxIndex(gallery.photos.findIndex((p) => p.n === n));

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const total = gallery.photos.length;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % total);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + total) % total);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery.photos.length]);

  const currentIndex = galleriesList.findIndex((g) => g.slug === gallery.slug);
  const moreGalleries = [1, 2, 3].map((k) => galleriesList[(currentIndex + k) % galleriesList.length]);

  const lightboxPhoto = lightboxIndex === null ? null : gallery.photos[lightboxIndex];

  const details = [
    { label: isSq ? 'Vendndodhja' : 'Location', value: isSq ? gallery.locationSq : gallery.location },
    { label: isSq ? 'Lloji' : 'Type', value: isSq ? gallery.typeSq : gallery.type },
    { label: isSq ? 'Fusha e Punës' : 'Scope', value: isSq ? gallery.scopeSq : gallery.scope },
    { label: isSq ? 'Shërbimet' : 'Services', value: isSq ? gallery.servicesSq : gallery.services },
  ];

  return (
    <div className="pd-page-wrapper">
      {/* ========================================================
          1. HERO HEADER & COVER PHOTO
          ======================================================== */}
      <section className="pd-hero-section">
        <div className="container">
          <div className="pd-hero-header">
            <div className="pd-hero-meta-row">
              <div className="pd-breadcrumb">
                <button type="button" onClick={() => onNavigate && onNavigate('gallery')} className="pd-breadcrumb-link">
                  // {isSq ? 'Galeria' : 'Gallery'}
                </button>
                <span className="pd-breadcrumb-sep">//</span>
                <span className="pd-breadcrumb-current">{title}</span>
              </div>
              <div className="pd-category-badge">{isSq ? group?.labelSq : group?.label}</div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pd-hero-title"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="pd-hero-subtitle"
            >
              {isSq ? gallery.introSq : gallery.intro}
            </motion.p>

            <div className="pd-hero-cta-wrap">
              <motion.button
                onClick={() => onOpenEstimate && onOpenEstimate()}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="pd-hero-slider-container"
          >
            <button
              type="button"
              className="gl-hero-media"
              onClick={() => openPhoto(gallery.cover)}
              aria-label={isSq ? 'Hap foton në ekran të plotë' : 'Open photo full screen'}
            >
              <img src={gallery.coverImage} alt={title} className="gl-hero-img" />
              <span className="gl-hero-count">
                <Images size={14} strokeWidth={2.4} />
                {gallery.photos.length} {isSq ? 'foto' : 'photos'}
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          2. PROJECT STORY + VIDEOS ON THE RIGHT
          ======================================================== */}
      <section className="pd-story-section">
        <div className="container">
          <div className="pd-story-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pd-story-left"
            >
              <span className="pd-story-eyebrow">{isSq ? '// Projekti //' : '// The Project //'}</span>
              <h2 className="pd-story-title">{isSq ? 'Puna, nga afër.' : 'The work, up close.'}</h2>
              <div className="pd-story-body">
                <p className="pd-story-paragraph">{isSq ? gallery.introSq : gallery.intro}</p>
                <p className="pd-story-paragraph">{isSq ? gallery.intro2Sq : gallery.intro2}</p>
              </div>

              <div className="pd-details-card gl-details-card">
                <h3 className="pd-details-heading">{isSq ? 'DETAJET E PROJEKTIT' : 'PROJECT DETAILS'}</h3>
                <div className="pd-details-list">
                  {details.map((d) => (
                    <div key={d.label} className="pd-details-row">
                      <span className="pd-details-label">{d.label}</span>
                      <span className="pd-details-value">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="gl-story-media"
            >
              {gallery.videoList.length > 0 ? (
                <>
                  <GalleryVideo
                    key={gallery.videoList[activeVideo].src}
                    src={gallery.videoList[activeVideo].src}
                    poster={gallery.videoList[activeVideo].poster}
                    label={isSq ? `Video nga projekti: ${title}` : `Project video: ${title}`}
                    lang={lang}
                  />
                  {gallery.videoList.length > 1 && (
                    <div className="gl-video-thumbs">
                      {gallery.videoList.map((v, i) => (
                        <button
                          key={v.src}
                          type="button"
                          className={`gl-video-thumb ${i === activeVideo ? 'active' : ''}`}
                          onClick={() => setActiveVideo(i)}
                          aria-label={isSq ? `Video ${i + 1}` : `Video ${i + 1}`}
                        >
                          <img src={v.poster} alt="" />
                          <span>{pad(i + 1)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  className="gl-story-photo"
                  onClick={() => openPhoto(gallery.coverAlt)}
                  aria-label={isSq ? 'Hap foton' : 'Open photo'}
                >
                  <img src={gallery.coverAltImage} alt={title} loading="lazy" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. STEP-BY-STEP TIMELINE (same design as the home page)
          ======================================================== */}
      <section className="bildora-timeline-section gl-timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="section-header bildora-timeline-header">
            <div className="bildora-values-pill">
              <span>{isSq ? 'Hap pas Hapi' : 'Step by Step'}</span>
            </div>
            <h2 className="bildora-timeline-title">
              {isSq ? 'Si u realizua projekti.' : 'How the project came together.'}
            </h2>
            <p className="bildora-timeline-subtitle">
              {isSq
                ? 'Çdo fazë e punës, me fotot e bëra në kantier në atë moment. Klikoni një foto për të parë të gjitha fotot e asaj faze.'
                : 'Each stage of the work, with the photos taken on site at the time. Click a photo to see every photo from that stage.'}
            </p>
          </div>

          <div className="bildora-timeline-wrapper">
            <div className="bildora-timeline-track" />
            <motion.div className="bildora-timeline-progress" style={{ scaleY }} />

            <div className="bildora-timeline-items">
              {gallery.steps.map((s, index) => {
                const first = s.photos[0];
                const img = gallery.photos.find((p) => p.n === first);
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`bildora-timeline-row ${index % 2 === 0 ? 'row-left' : 'row-right'}`}
                  >
                    <div className="bildora-timeline-content">
                      <span className="bildora-step-eyebrow">
                        {pad(index + 1)} — {isSq ? s.titleSq : s.title}
                      </span>
                      <h3 className="bildora-step-heading">{isSq ? s.titleSq : s.title}</h3>
                      <p className="bildora-step-desc">{isSq ? s.descSq : s.desc}</p>

                      <button
                        type="button"
                        className="bildora-image-frame gl-step-frame"
                        onClick={() => openPhoto(first)}
                        aria-label={isSq ? `Shiko fotot: ${s.titleSq}` : `View photos: ${s.title}`}
                      >
                        <img src={img.url} alt={isSq ? s.titleSq : s.title} loading="lazy" className="bildora-step-img" />
                        <span className="gl-step-count">
                          <Images size={13} strokeWidth={2.4} />
                          {s.photos.length}
                        </span>
                      </button>
                    </div>

                    <div className="bildora-timeline-node">
                      <div className="bildora-node-dot" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. ALL PHOTOS, FILTERED BY STAGE
          ======================================================== */}
      <section className="gl-photos-section">
        <div className="container">
          <div className="gl-section-header">
            <span className="pd-story-eyebrow">// {isSq ? 'Galeria' : 'Gallery'}</span>
            <h2 className="pd-story-title">{isSq ? 'Çdo fazë, çdo kënd.' : 'Every stage, every angle.'}</h2>
          </div>

          <div className="gl-stage-filter">
            <div className="projects-filter-bar">
              <button
                type="button"
                onClick={() => setActiveStage('all')}
                className={`projects-filter-pill ${activeStage === 'all' ? 'active' : ''}`}
              >
                {isSq ? 'Të Gjitha' : 'All'} ({gallery.photos.length})
              </button>
              {gallery.steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActiveStage(i)}
                  className={`projects-filter-pill ${activeStage === i ? 'active' : ''}`}
                >
                  {pad(i + 1)} {isSq ? s.titleSq : s.title}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={String(activeStage)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="gl-masonry"
            >
              {visiblePhotos.map((p) => (
                <button
                  key={p.n}
                  type="button"
                  className="gl-masonry-item"
                  onClick={() => openPhoto(p.n)}
                  aria-label={isSq ? `Hap foton: ${p.captionSq}` : `Open photo: ${p.caption}`}
                >
                  <img src={p.thumb} alt={isSq ? p.captionSq : p.caption} loading="lazy" />
                  <span className="gl-masonry-overlay">
                    <span className="pd-gallery-zoom-icon">
                      <ZoomIn size={18} strokeWidth={2.2} />
                    </span>
                    <span className="gl-masonry-caption">
                      {pad(p.stepIndex + 1)} — {isSq ? p.captionSq : p.caption}
                    </span>
                  </span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================
          5. MORE GALLERIES
          ======================================================== */}
      <section className="pd-transformations-section">
        <div className="container">
          <div className="pd-transformations-header">
            <div>
              <span className="pd-transformations-eyebrow">// {isSq ? 'Galeria' : 'Gallery'}</span>
              <h2 className="pd-transformations-title">{isSq ? 'Galeri të tjera.' : 'More galleries.'}</h2>
            </div>
            <motion.button
              onClick={() => onNavigate && onNavigate('gallery')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="pd-all-projects-btn"
              aria-label={isSq ? 'E Gjithë Galeria' : 'Full Gallery'}
            >
              <span>{isSq ? 'E Gjithë Galeria' : 'Full Gallery'}</span>
              <div className="pd-all-projects-arrow">
                <ArrowRight size={13} strokeWidth={2.4} />
              </div>
            </motion.button>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
            className="pd-related-grid"
          >
            {moreGalleries.map((g) => (
              <GalleryCard key={g.slug} gallery={g} onNavigate={onNavigate} lang={lang} />
            ))}
          </motion.div>
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
              onClick={() => onOpenEstimate && onOpenEstimate()}
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
          7. FULLSCREEN LIGHTBOX (same as the project detail page)
          ======================================================== */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pd-lightbox-backdrop"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="pd-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="pd-lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                aria-label={isSq ? 'Mbyll' : 'Close'}
              >
                <X size={20} strokeWidth={2.4} />
              </button>

              <motion.img
                key={lightboxPhoto.url}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={lightboxPhoto.url}
                alt={isSq ? lightboxPhoto.captionSq : lightboxPhoto.caption}
                className="pd-lightbox-img"
              />

              <button
                type="button"
                className="pd-lightbox-nav-btn prev"
                onClick={() =>
                  setLightboxIndex((prev) => (prev - 1 + gallery.photos.length) % gallery.photos.length)
                }
                aria-label={isSq ? 'Fotoja e mëparshme' : 'Previous photo'}
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                className="pd-lightbox-nav-btn next"
                onClick={() => setLightboxIndex((prev) => (prev + 1) % gallery.photos.length)}
                aria-label={isSq ? 'Fotoja tjetër' : 'Next photo'}
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>

              <div className="pd-lightbox-footer">
                <p className="pd-lightbox-caption">
                  {pad(lightboxPhoto.stepIndex + 1)} — {isSq ? lightboxPhoto.captionSq : lightboxPhoto.caption}
                </p>
                <span className="pd-lightbox-counter">
                  {lightboxIndex + 1} / {gallery.photos.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
