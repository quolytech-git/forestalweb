import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LETTERS = ['F', 'O', 'R', 'E', 'S', 'T', '-', 'A', 'L'];

export default function LoadingScreen({
  holdTime = 1.6, // total loading duration in seconds
  revealDuration = 0.85, // curtain reveal duration in seconds
  onFinished,
  lang = 'en',
}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'revealing' | 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Freeze Lenis scroll during loading screen to prevent scroll fighting/jumping
    if (window.__lenis) {
      window.__lenis.stop();
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const durationMs = holdTime * 1000;
    let animId;

    // Progress counter animation from 0% to 100% with smooth easing
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const linearPct = Math.min(1, elapsed / durationMs);
      // Natural ease-out so it decelerates gracefully near 100%
      const easedPct = 1 - Math.pow(1 - linearPct, 2.2);
      const currentPct = Math.min(100, Math.round(easedPct * 100));

      setProgress(currentPct);

      if (linearPct < 1) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Crisp pause at 100% before initiating the silky curtain reveal
        setTimeout(() => {
          setStatus('revealing');
        }, 160);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = originalOverflow || '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [holdTime]);

  // When curtain exit completes, restore scroll and notify parent
  const handleCurtainComplete = () => {
    if (status === 'revealing') {
      setStatus('done');
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
      if (onFinished) {
        onFinished();
      }
    }
  };

  if (status === 'done') return null;

  const isRevealing = status === 'revealing';

  return (
    <motion.div
      className="bldr-loading-screen-portal"
      aria-hidden={isRevealing ? 'true' : 'false'}
      initial={{ y: '0%' }}
      animate={isRevealing ? { y: '-100%' } : { y: '0%' }}
      transition={{
        duration: revealDuration,
        ease: [0.76, 0, 0.24, 1], // Bespoke architectural luxury cubic bezier
      }}
      onAnimationComplete={handleCurtainComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#141412', // Solid monolithic obsidian charcoal - ZERO lines, ZERO gaps, ZERO seams!
        overflow: 'hidden',
        pointerEvents: isRevealing ? 'none' : 'auto',
        willChange: 'transform',
        boxShadow: isRevealing ? '0 30px 80px rgba(0, 0, 0, 0.85)' : 'none',
      }}
    >
      {/* Center Content: Animated Typography, Progress Bar, Percentage Counter */}
      <motion.div
        animate={isRevealing ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          zIndex: 2,
          userSelect: 'none',
          padding: '24px',
        }}
      >
        {/* Brand Eyebrow Tag with Smooth Fade & Tracking Expansion */}
        <motion.span
          initial={{ opacity: 0, y: 14, letterSpacing: '0.14em' }}
          animate={{ opacity: 0.9, y: 0, letterSpacing: '0.24em' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#ead9be',
          }}
        >
          {lang === 'sq' ? 'Ndërtim · Rinovim · Mirëmbajtje' : 'Construction · Renovation · Maintenance'}
        </motion.span>

        {/* Giant Architectural Wordmark with Individual Staggered Letter Animations */}
        <h1
          style={{
            fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            fontSize: 'clamp(46px, 8vw, 86px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#ffffff',
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          {/* Staggered Letter Slide-Up from Mask */}
          {LETTERS.map((char, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '2px',
              }}
            >
              <motion.span
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
                initial={{ y: '115%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.72,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12 + idx * 0.045,
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}

          {/* Accent Sand Dot with Spring Bounce */}
          <motion.span
            style={{
              display: 'inline-block',
              color: '#ead9be',
              marginLeft: '2px',
              willChange: 'transform, opacity',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 22,
              delay: 0.12 + LETTERS.length * 0.045 + 0.08,
            }}
          >
            .
          </motion.span>
        </h1>

        {/* Sleek Minimalist Loading Bar with Glowing Warm Sand Fill */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: 'min(320px, 65vw)',
            height: '3px',
            backgroundColor: 'rgba(239, 235, 227, 0.12)',
            borderRadius: '9999px',
            overflow: 'hidden',
            marginTop: '8px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #b48d5c 0%, #ead9be 75%, #ffffff 100%)',
              borderRadius: '9999px',
              transition: 'width 0.06s linear',
              boxShadow: '0 0 12px rgba(234, 217, 190, 0.6)',
            }}
          />
        </motion.div>

        {/* Tabular Percentage Counter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-display, 'Satoshi', sans-serif)",
            fontSize: '14px',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: '#ead9be',
            letterSpacing: '0.04em',
          }}
        >
          {progress}%
        </motion.div>
      </motion.div>

      {/* Editorial Footer Tag in Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isRevealing ? { opacity: 0 } : { opacity: 0.5, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '40px',
          color: 'rgba(239, 235, 227, 0.5)',
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        {lang === 'sq' ? '// Punë e planifikuar, e kryer si duhet' : '// Planned properly, built properly'}
      </motion.div>

      {/* Floating Coordinates / Progress Tag in Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isRevealing ? { opacity: 0 } : { opacity: 0.85, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '40px',
          color: '#ead9be',
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: '13px',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.06em',
          userSelect: 'none',
        }}
      >
        {progress} / 100
      </motion.div>
    </motion.div>
  );
}
