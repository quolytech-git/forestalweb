import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Hammer, Award } from 'lucide-react';

export default function ScrollShowcaseSection({ onOpenEstimate }) {
  const containerRef = useRef(null);

  // Track scroll depth across 220vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Frame Scale Expansion: 0.82 (card) -> 1.0 (full-bleed immersive visual)
  const frameScale = useTransform(smoothProgress, [0.05, 0.65], [0.82, 1.0]);
  const frameRadius = useTransform(smoothProgress, [0.05, 0.65], [36, 0]);
  const frameShadow = useTransform(
    smoothProgress,
    [0.05, 0.65],
    ['0 30px 80px rgba(0,0,0,0.25)', '0 0px 0px rgba(0,0,0,0)']
  );

  // 2. Image Internal Parallax Zoom
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1.18, 1.02]);
  const overlayDarkness = useTransform(smoothProgress, [0.1, 0.6], [0.35, 0.65]);

  // 3. Strategic CTA Unveiling at the optimal scroll depth
  const ctaOpacity = useTransform(smoothProgress, [0.4, 0.72], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.4, 0.72], [40, 0]);
  const ctaScale = useTransform(smoothProgress, [0.4, 0.72], [0.88, 1.0]);

  // 4. Milestone Progress Indicators
  const activeStep1 = useTransform(smoothProgress, [0, 0.35], [1, 0.4]);
  const activeStep2 = useTransform(smoothProgress, [0.35, 0.65], [0.4, 1]);
  const activeStep3 = useTransform(smoothProgress, [0.65, 1.0], [0.4, 1]);

  return (
    <section ref={containerRef} className="scroll-showcase-track">
      {/* Sticky Frame pinned during the scroll sequence */}
      <div className="scroll-showcase-sticky">
        {/* Progressively Expanding Visual Frame */}
        <motion.div
          style={{
            scale: frameScale,
            borderRadius: frameRadius,
            boxShadow: frameShadow,
          }}
          className="scroll-showcase-canvas"
        >
          {/* High-Resolution Luxury Architectural Transformation Visual */}
          <motion.img
            style={{ scale: imageScale }}
            src="/gallery/garden-building/26.jpg"
            alt="Cinematic Architectural Space Transformation"
            className="scroll-showcase-img"
          />

          {/* Dynamic Lighting Overlay */}
          <motion.div
            style={{ opacity: overlayDarkness }}
            className="scroll-showcase-overlay"
          />

          {/* Top Progress Milestone Chips */}
          <div className="scroll-showcase-topbar">
            <div className="showcase-step-pill">
              <motion.span style={{ opacity: activeStep1 }} className="step-label">
                <Compass size={14} /> 01 Vision &amp; Design
              </motion.span>
              <span className="step-divider">•</span>
              <motion.span style={{ opacity: activeStep2 }} className="step-label">
                <Hammer size={14} /> 02 Precision Build
              </motion.span>
              <span className="step-divider">•</span>
              <motion.span style={{ opacity: activeStep3 }} className="step-label">
                <Award size={14} /> 03 Flawless Handover
              </motion.span>
            </div>
          </div>

          {/* Central Reveal: Text & Strategically Unveiled Call to Action */}
          <div className="scroll-showcase-content">
            <motion.div
              style={{ y: ctaY, opacity: ctaOpacity }}
              className="showcase-unveiled-card"
            >
              <div className="section-tag section-tag-dark" style={{ marginBottom: '10px' }}>
                <Sparkles size={14} /> The Art of Transformation
              </div>

              <h2 className="showcase-title">
                Experience seamless luxury tailored to your lifestyle.
              </h2>

              <p className="showcase-subtitle">
                From initial 3D blueprints to the final coat of paint, our unified team delivers turnkey perfection with zero homeowner stress.
              </p>

              {/* Strategically Unveiled Primary CTA with Fluid Hover-Zoom Feedback */}
              <motion.div
                style={{ scale: ctaScale }}
                className="showcase-cta-wrapper"
              >
                <motion.button
                  onClick={() => onOpenEstimate('Whole-Home Renovation')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="btn-primary showcase-cta-btn"
                  aria-label="Start Your Transformation"
                >
                  <span>Start Your Transformation</span>
                  <div className="btn-icon-circle">
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
