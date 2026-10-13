import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SecondLoadingScreen({
  holdTime = 1.6, // seconds
  revealDuration = 0.85, // seconds
  onFinished,
}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'revealing' | 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Freeze Lenis during loading
    if (window.__lenis) {
      window.__lenis.stop();
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const durationMs = holdTime * 1000;
    let animId;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const linearPct = Math.min(1, elapsed / durationMs);
      const easedPct = 1 - Math.pow(1 - linearPct, 2.2);
      const currentPct = Math.min(100, Math.round(easedPct * 100));

      setProgress(currentPct);

      if (linearPct < 1) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setStatus('revealing');
        }, 120);
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
      className="bldr-second-loading-screen"
      aria-hidden={isRevealing ? 'true' : 'false'}
      initial={{ y: '0%' }}
      animate={isRevealing ? { y: '-100%' } : { y: '0%' }}
      transition={{
        duration: revealDuration,
        ease: [0.76, 0, 0.24, 1], // exact same luxury architectural easing
      }}
      onAnimationComplete={handleCurtainComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#141412', // Solid monolithic obsidian charcoal - ZERO lines, ZERO seams
        overflow: 'hidden',
        pointerEvents: isRevealing ? 'none' : 'auto',
        willChange: 'transform',
        boxShadow: isRevealing ? '0 30px 80px rgba(0, 0, 0, 0.85)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Center Minimal Progress Line (Zero Letters, Pure Architectural Minimalism) */}
      <motion.div
        animate={isRevealing ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Sleek Minimalist Loading Bar */}
        <div
          style={{
            width: 'min(280px, 60vw)',
            height: '2px',
            backgroundColor: 'rgba(239, 235, 227, 0.1)',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #b48d5c 0%, #ead9be 70%, #ffffff 100%)',
              borderRadius: '9999px',
              transition: 'width 0.06s linear',
              boxShadow: '0 0 12px rgba(234, 217, 190, 0.6)',
            }}
          />
        </div>
      </motion.div>

      {/* Leading Edge Accent Line when Sliding Up */}
      {isRevealing && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, rgba(234, 217, 190, 0) 0%, rgba(234, 217, 190, 0.7) 50%, rgba(234, 217, 190, 0) 100%)',
            boxShadow: '0 0 16px rgba(234, 217, 190, 0.5)',
          }}
        />
      )}
    </motion.div>
  );
}
