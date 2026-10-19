import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const financingBg = '/gallery/office-fit-out/2.jpg';

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
            alt={isSq ? 'Zyra të përfunduara nga Forest-Al' : 'Offices finished by Forest-Al'}
            className="financing-banner-bg"
            loading="lazy"
          />

          {/* Gradient Overlay for Text Legibility */}
          <div className="financing-banner-overlay" />

          {/* Left Content Column */}
          <div className="financing-banner-content">
            <span className="financing-eyebrow">{isSq ? '// Planifikimi i Buxhetit' : '// Budget Planning'}</span>
            <h2 className="financing-title">{isSq ? 'Dijeni koston para se të nisni.' : 'Know the cost before you start.'}</h2>
            <p className="financing-desc">
              {isSq
                ? 'Flasim për buxhetin tuaj që në fillim, ju shpjegojmë çfarë e ndikon koston dhe, kur ndihmon, e ndajmë punën në faza sipas mundësive tuaja.'
                : 'We talk about your budget from the start, explain what affects the cost and, where it helps, split the work into stages that suit you.'}
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
