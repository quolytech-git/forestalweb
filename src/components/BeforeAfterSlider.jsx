import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

// Single interactive Before/After comparison card component
function BeforeAfterCard({ item, index, onSelectProject, lang = 'en' }) {
  const isSq = lang === 'sq';
  const title = isSq ? item.titleSq : item.title;
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updatePosFromClientX(clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updatePosFromClientX]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosFromClientX(clientX);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="ba-card"
    >
      {/* Interactive Image Frame */}
      <div
        ref={containerRef}
        className="ba-card-slider"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={isSq ? `${title}: krahasim para dhe pas` : `${title}: before and after comparison`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(0, p - 5));
          if (e.key === 'ArrowRight') setSliderPos(p => Math.min(100, p + 5));
        }}
      >
        {/* Base Layer: After Image */}
        <img
          src={item.afterImage}
          alt={isSq ? `${title}: pas punimeve` : `${title}: after the work`}
          className="ba-slider-img ba-after-img"
          draggable={false}
          loading="lazy"
        />

        {/* Clipped Layer: Before Image with hardware-accelerated clipPath */}
        <div
          className="ba-before-layer"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={item.beforeImage}
            alt={isSq ? `${title}: para punimeve` : `${title}: before the work`}
            className="ba-slider-img ba-before-img"
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Vertical Divider Line with Center Drag Handle */}
        <div
          className="ba-divider-line"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="ba-divider-handle" aria-hidden="true">
            <ChevronsLeftRight size={15} strokeWidth={2.4} />
          </div>
        </div>

        {/* Frosted Badges */}
        <div className="ba-badge-pill ba-badge-before">{isSq ? 'Para' : 'Before'}</div>
        <div className="ba-badge-pill ba-badge-after">{isSq ? 'Pas' : 'After'}</div>
      </div>

      {/* Meta Footer */}
      <div
        className="ba-card-meta"
        onClick={() => onSelectProject && onSelectProject(item.id)}
      >
        <h3 className="ba-card-title">{title}</h3>
        <span className="ba-card-details">
          {isSq ? item.locationSq : item.location} · {isSq ? item.durationSq : item.duration}
        </span>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSlider({ onNavigate, onOpenEstimate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const cases = siteData.beforeAfterCases.slice(0, 3);

  return (
    <section id="before-after" className="before-after-section">
      <div className="container">
        {/* Dark Container Box Card */}
        <div className="ba-dark-wrapper">
          {/* Top Section Header */}
          <div className="ba-header-split">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="ba-header-left"
            >
              <span className="ba-tag">{isSq ? '// Para dhe Pas' : '// Before & After'}</span>
              <h2 className="ba-title">{isSq ? 'Shihni ndryshimin.' : 'See the difference.'}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="ba-header-right"
            >
              <p className="ba-subtitle">
                {isSq
                  ? 'Lëvizni rrëshqitësin për të krahasuar gjendjen para dhe pas punimeve. Projektet e verifikuara të Forest-Al do të shtohen këtu.'
                  : 'Drag the slider to compare the condition before and after the work. Verified Forest-Al projects will be added here.'}
              </p>

              <motion.button
                onClick={() => onNavigate ? onNavigate('project') : (onOpenEstimate && onOpenEstimate())}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="ba-all-btn"
                aria-label={isSq ? 'Shikoni të gjitha projektet' : 'View all projects'}
              >
                <span>{isSq ? 'Të Gjitha Projektet' : 'All Projects'}</span>
                <div className="ba-btn-icon-circle">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* 3 Interactive Comparison Sliders Grid */}
          <div className="ba-cards-grid">
            {cases.map((item, idx) => (
              <BeforeAfterCard
                key={item.id}
                item={item}
                index={idx}
                lang={lang}
                onSelectProject={() => {
                  if (onNavigate) onNavigate('project-detail', item.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
