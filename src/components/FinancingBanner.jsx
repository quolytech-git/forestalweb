import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import financingBg from '../assets/reviews/ewKrYrdNDwC078u1I3pBAUbvFUY.png';

export default function FinancingBanner({ onOpenEstimate, lang = 'en' }) {
  const isSq = lang === 'sq';
  return (
    <section className="renovate-financing-section">
      <div className="container">
        <motion.div
          className="financing-banner-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Worker Image */}
          <img
            src={financingBg}
            alt={isSq ? 'Mjeshtër duke punuar në rinovimin e një ambienti' : 'Tradesperson working on an interior renovation'}
            className="financing-banner-bg"
            loading="lazy"
          />

          {/* Gradient Overlay for Text Legibility */}
          <div className="financing-banner-overlay" />

          {/* Left Content Column */}
          <div className="financing-banner-content">
            <span className="financing-eyebrow">{isSq ? '// Planifikimi i Buxhetit' : '// Budget Planning'}</span>
            <h2 className="financing-title">{isSq ? 'Dijeni koston para se të filloni.' : 'Know the costs before you start.'}</h2>
            <p className="financing-desc">
              {isSq
                ? 'Bisedojmë për buxhetin tuaj që në fillim, ju shpjegojmë çfarë ndikon në kosto dhe, kur ndihmon, e ndajmë punën në faza që t’i përshtatet planit tuaj.'
                : 'We discuss your budget from the start, explain what affects the cost and, where it helps, split the work into stages that fit your plans.'}
            </p>

            <button
              onClick={onOpenEstimate}
              className="btn-primary"
            >
              <span>{isSq ? 'Diskutoni Projektin Tuaj' : 'Discuss Your Project'}</span>
              <div className="btn-icon-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Floating Dark Glass Badge on Bottom Right */}
          <div className="financing-floating-badge">
            <span className="floating-badge-value">{isSq ? 'Hap pas hapi' : 'Step by step'}</span>
            <span className="floating-badge-label">{isSq ? 'planifikim i qartë i buxhetit' : 'clear budget planning'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
