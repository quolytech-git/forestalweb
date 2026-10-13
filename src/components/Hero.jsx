import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { siteData } from '../data/siteData';
import heroVideo from '../assets/footer/forestal_cta_video.mp4';

export default function Hero({ onOpenEstimate, onViewWork, lang = 'en' }) {
  const isSq = lang === 'sq';
  const t = {
    line1: isSq ? 'Ndërtim, rinovim' : 'Construction, renovation',
    line2: isSq ? 'dhe mirëmbajtje pronash.' : 'and property maintenance.',
    paragraph: isSq
      ? 'Forest-Al kryen punime ndërtimore me konstruksione metalike dhe pllaka gipsi, si dhe mirëmbajtje elektrike, hidraulike, mekanike dhe ndërtimore për çdo lloj aseti. Çdo projekt fillon me kuptimin e pronës dhe me një objekt pune të qartë.'
      : 'Forest-Al carries out construction works with metal structures and drywall systems, and provides electrical, plumbing, mechanical and building maintenance for every type of property. Every project starts with understanding the property and agreeing a clear scope of work.',
    primary: isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate',
    secondary: isSq ? 'Shikoni Punimet Tona' : 'Explore Our Work',
    badges: isSq ? ['Ndërtim', 'Rinovim', 'Mirëmbajtje'] : ['Construction', 'Renovation', 'Maintenance'],
  };
  // Smooth scroll parallax for the hero image and content
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="hero-section-wrapper">
      <section className="hero-fullscreen hero-card-container">
        {/* Background Image with Ambient Parallax & Hover-Zoom Motion */}
        <motion.div className="hero-img-container">
          {/* Blurred copy fills the space around the full-size video */}
          <video
            src={heroVideo}
            className="hero-video-backdrop"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <video
            src={heroVideo}
            className="hero-img-fullscreen hero-video-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>

      {/* Top Scrim Gradient (WCAG contrast behind navbar) */}
      <div className="hero-scrim-top" />

      {/* Bottom Gradient for Flawless Text Legibility */}
      <div className="hero-scrim-bottom" />

      {/* Main Hero Content Area - Exact 1:1 Framer Layout */}
      <motion.div
        style={{ opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-bottom-container"
      >
        <div className="hero-content-wrapper">
          {/* Upper Row: Left Big H1 + Right Value Paragraph */}
          <div className="hero-text-row">
            <motion.div variants={itemVariants} className="hero-headline-col">
              <h1 className="hero-h1">
                <span className="hero-h1-line">{t.line1}</span>
                <span className="hero-h1-line">{t.line2}</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-desc-col">
              <p className="hero-paragraph">
                {t.paragraph}
              </p>
            </motion.div>
          </div>

          {/* Hairline Divider Line */}
          <motion.div variants={itemVariants} className="hero-divider-line" />

          {/* Lower Action Row: CTAs on Left, Checkmarks on Right */}
          <div className="hero-action-row">
            {/* Primary & Secondary CTAs with Fluid Hover Zoom */}
            <motion.div variants={itemVariants} className="hero-cta-group">
              {/* PRIMARY CTA: White Pill with Black Arrow Circle (1:1 Framer exact replica) */}
              <motion.button
                onClick={onOpenEstimate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="framer-cta-pill primary"
                aria-label={t.primary}
              >
                <span>{t.primary}</span>
                <div className="framer-cta-arrow-circle">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </motion.button>

              {/* SECONDARY CTA: Outlined Glass Pill */}
              <motion.button
                onClick={onViewWork}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="framer-cta-pill secondary"
                aria-label={t.secondary}
              >
                <span>{t.secondary}</span>
              </motion.button>
            </motion.div>

            {/* Bottom Right Checkmark Badges: Quality, Innovation, Expertise */}
            <motion.div variants={itemVariants} className="hero-badges-horizontal">
              <div className="hero-check-badge">
                <div className="badge-white-circle">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span>{t.badges[0]}</span>
              </div>

              <div className="hero-check-badge">
                <div className="badge-white-circle">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span>{t.badges[1]}</span>
              </div>

              <div className="hero-check-badge">
                <div className="badge-white-circle">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span>{t.badges[2]}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      </section>
    </div>
  );
}
