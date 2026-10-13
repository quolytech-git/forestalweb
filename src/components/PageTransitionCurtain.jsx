import React from 'react';
import { motion } from 'framer-motion';

export default function PageTransitionCurtain({
  phase = 'idle', // 'idle' | 'entering' | 'exiting'
  onEntered,
  onExited,
  duration = 0.52,
}) {
  if (phase === 'idle') return null;

  // Ultra-luxurious architectural easing (exact match with brand preloader)
  const easeBezier = [0.76, 0, 0.24, 1];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999990,
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <motion.div
        key={phase}
        initial={phase === 'entering' ? { y: '100%' } : { y: '0%' }}
        animate={phase === 'entering' ? { y: '0%' } : { y: '-100%' }}
        transition={{
          duration: duration,
          ease: easeBezier,
        }}
        onAnimationComplete={() => {
          if (phase === 'entering' && onEntered) {
            onEntered();
          } else if (phase === 'exiting' && onExited) {
            onExited();
          }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#141412', // Solid monolithic obsidian charcoal - ZERO lines, ZERO seams
          willChange: 'transform',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Leading Edge Accent Line - glows as it sweeps from down to up */}
        <div
          style={{
            position: 'absolute',
            top: phase === 'entering' ? 0 : 'auto',
            bottom: phase === 'exiting' ? 0 : 'auto',
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, rgba(234, 217, 190, 0) 0%, rgba(234, 217, 190, 0.7) 50%, rgba(234, 217, 190, 0) 100%)',
            boxShadow: '0 0 16px rgba(234, 217, 190, 0.5)',
          }}
        />

        {/* Minimalist Center Architectural Hairline Accent (NO LETTERS) */}
        <div
          style={{
            width: '64px',
            height: '2px',
            backgroundColor: '#ead9be',
            opacity: 0.75,
            borderRadius: '9999px',
            boxShadow: '0 0 12px rgba(234, 217, 190, 0.6)',
          }}
        />
      </motion.div>
    </div>
  );
}
