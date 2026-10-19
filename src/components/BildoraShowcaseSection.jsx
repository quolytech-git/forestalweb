import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { siteData } from '../data/siteData';

// The 7 photography columns: real buildings Forest-Al has worked on
const BILDORA_COLUMNS = [
  {
    id: 5,
    angle: 0,
    image: '/gallery/garden-building/14.jpg',
    alt: 'Garden Building tower reflected in the courtyard pool',
    altSq: 'Kulla Garden Building e pasqyruar në pishinën e oborrit',
  },
  {
    id: 6,
    angle: 30,
    image: '/gallery/minepeza-building/1.jpg',
    alt: 'Residential building on Rruga Mine Peza, Tirana',
    altSq: 'Objekt banimi në Rrugën Mine Peza, Tiranë',
  },
  {
    id: 7,
    angle: 60,
    image: '/gallery/garden-building/12.jpg',
    alt: 'Garden Building facade during construction',
    altSq: 'Fasada e Garden Building gjatë ndërtimit',
  },
  {
    id: 1,
    angle: 90,
    image: '/gallery/qeparo-villas/1.jpg',
    alt: 'Villas under construction above the bay in Qeparo',
    altSq: 'Vila në ndërtim mbi gjirin e Qeparoit',
  },
  {
    id: 2,
    angle: 120,
    image: '/gallery/valias-residential/0.jpg',
    alt: 'Residential complex in Valias with scaffolding',
    altSq: 'Kompleks banimi në Valias me skela',
  },
  {
    id: 3,
    angle: 150,
    image: '/gallery/garden-building/22.jpg',
    alt: 'Garden Building towers from the courtyard',
    altSq: 'Kullat e Garden Building të para nga oborri',
  },
  {
    id: 4,
    angle: 180,
    image: '/gallery/minepeza-building/2.jpg',
    alt: 'Glazed ground floor of the Mine Peza building',
    altSq: 'Kati përdhes me xham i objektit në Mine Peza',
  },
];

// Forest-Al key figures (shared with the rest of the site)
const STATS_EN = siteData.stats.map((s) => ({ value: s.value, label: s.label }));
const STATS_SQ = siteData.stats.map((s) => ({ value: s.value, label: s.labelSq }));

const HEADING_LINES_EN = [
  'For more than 15 years, across all of Albania,',
  'from construction to renovation and maintenance,',
  'we plan every job and finish it properly.',
];

const HEADING_LINES_SQ = [
  'Mbi 15 vjet në gjithë Shqipërinë,',
  'nga ndërtimi te rinovimi dhe mirëmbajtja,',
  'çdo punë e bëjmë me plan dhe me kujdes.',
];

/**
 * Individual character span for fast, snappy scroll-linked reveal
 */
function ScrollAnimatedChar({ char, progress, range, prefersReducedMotion }) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  if (prefersReducedMotion) {
    return <span className="bildora-char active">{char}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="bildora-char"
      transition={{ duration: 0.08 }}
    >
      {char}
    </motion.span>
  );
}

export default function BildoraShowcaseSection({ lang = 'en' }) {
  const isSq = lang === 'sq';
  const headingWrapperRef = useRef(null);
  const stageRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const HEADING_LINES = isSq ? HEADING_LINES_SQ : HEADING_LINES_EN;
  const BILDORA_STATS = isSq ? STATS_SQ : STATS_EN;
  const FULL_TEXT_STRING = HEADING_LINES.join(' ');

  // Snappy, swift letter reveal tied tightly to heading scroll travel (~180px)
  const { scrollYProgress } = useScroll({
    target: headingWrapperRef,
    offset: ['start 88%', 'start 30%'],
  });

  // 3D Carousel rotation state & physics refs
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0.06); // base continuous rotation speed (~40s per full cycle)
  const animationFrameRef = useRef(null);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // High-performance 60fps/120fps physics loop with inertia & momentum
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = () => {
      if (!isDraggingRef.current) {
        if (isHoveredRef.current) {
          // Gently brake velocity when hovered
          velocityRef.current *= 0.93;
          if (Math.abs(velocityRef.current) < 0.005) {
            velocityRef.current = 0;
          }
        } else {
          // Restore base marquee rotation speed smoothly
          const targetSpeed = 0.06;
          velocityRef.current = velocityRef.current * 0.96 + targetSpeed * 0.04;
        }

        rotationRef.current += velocityRef.current;
        if (stageRef.current) {
          stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Pointer drag interactions (supports desktop mouse and mobile touch)
  const handlePointerDown = (e) => {
    if (prefersReducedMotion) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - lastPointerXRef.current;
    lastPointerXRef.current = currentX;

    // Convert pixel drag to 3D cylinder angle delta
    const angleDelta = deltaX * 0.22;
    rotationRef.current += angleDelta;
    velocityRef.current = angleDelta * 0.5;

    if (stageRef.current) {
      stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Keyboard navigation for accessible interaction (WCAG 2.1)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      rotationRef.current += 30;
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
    } else if (e.key === 'ArrowRight') {
      rotationRef.current -= 30;
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
    }
  };

  // Precompute line, word, and character metadata immutably for the letters animation
  const parsedLines = useMemo(() => {
    let globalCharIndex = 0;
    return HEADING_LINES.map((lineText) => {
      const words = lineText.split(' ').map((word) => {
        const chars = word.split('').map((char) => {
          const idx = globalCharIndex;
          globalCharIndex++;
          return { char, index: idx };
        });
        globalCharIndex++; // account for space
        return chars;
      });
      return words;
    });
  }, [HEADING_LINES]);

  const totalChars = FULL_TEXT_STRING.length;

  return (
    <section
      className="bildora-spatial-section"
      aria-label={isSq ? "Rreth Forest-Al" : "About Forest-Al"}
    >
      <div className="container">
        {/* Top Centered Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bildora-tag-wrapper"
        >
          <div className="bildora-pill-tag">
            <span className="pill-dot" />
            <span>{isSq ? 'Rreth Nesh' : 'About Us'}</span>
          </div>
        </motion.div>

        {/* Scroll-Linked Typographic Choreography (Fast & Responsive) */}
        <div ref={headingWrapperRef} className="bildora-heading-wrapper">
          <h2 className="bildora-scroll-heading">
            {parsedLines.map((lineWords, lineIdx) => (
              <span key={lineIdx} className="bildora-heading-line">
                {lineWords.map((wordChars, wordIdx) => (
                  <span key={wordIdx} className="bildora-word">
                    {wordChars.map(({ char, index }) => {
                      // Fast, snappy progression: each character has a tight window
                      const startRange = (index / totalChars) * 0.85;
                      const endRange = Math.min(1.0, startRange + 0.05);

                      return (
                        <ScrollAnimatedChar
                          key={index}
                          char={char}
                          progress={scrollYProgress}
                          range={[startRange, endRange]}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      );
                    })}
                    {/* Space after each word */}
                    <span className="bildora-space">&nbsp;</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* 3D Curved Cylindrical Carousel Viewport (Framer Spoke Architecture) */}
      <div
        className={`bildora-carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={isSq ? "Galeri fotosh. Tërhiqni ose përdorni shigjetat për ta rrotulluar." : "Photo gallery. Drag or use the arrow keys to rotate."}
      >
        {/* Soft atmospheric gradient edge vignettes */}
        <div className="bildora-edge-scrim bildora-edge-left" />
        <div className="bildora-edge-scrim bildora-edge-right" />

        {/* 3D Preserve-3D Cylindrical Ring Stage */}
        <div ref={stageRef} className="bildora-carousel-stage">
          {BILDORA_COLUMNS.map((col) => (
            <div
              key={col.id}
              className="bildora-column"
              style={{ transform: `rotateY(${col.angle}deg)` }}
            >
              {/* Left End Card (facing inward towards center) */}
              <div className="bildora-card-item bildora-card-left">
                <img
                  src={col.image}
                  alt={isSq ? col.altSq : col.alt}
                  loading="eager"
                  className="bildora-card-img"
                />
              </div>

              {/* Right End Card (facing inward towards center) */}
              <div className="bildora-card-item bildora-card-right">
                <img
                  src={col.image}
                  alt={isSq ? col.altSq : col.alt}
                  loading="eager"
                  className="bildora-card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified 4-Column Key Metrics / Stats Section */}
      <div className="container">
        <div className="bildora-stats-grid">
          {BILDORA_STATS.map((stat, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: sIdx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bildora-stat-card"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
