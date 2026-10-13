import React from 'react';
import { motion } from 'framer-motion';
import quoteIcon from '../assets/guarantee/quote.svg';
import pricingIcon from '../assets/guarantee/pricing.svg';
import writingIcon from '../assets/guarantee/writing.svg';

const guaranteeFeatures = [
  {
    icon: quoteIcon,
    title: 'Free initial consultation',
    titleSq: 'Konsultë fillestare falas',
  },
  {
    icon: pricingIcon,
    title: 'Quotation before work starts',
    titleSq: 'Preventiv para fillimit të punës',
  },
  {
    icon: writingIcon,
    title: 'Agreed scope of work',
    titleSq: 'Objekt pune i rënë dakord',
  },
];

export default function GuaranteeSection({ onOpenEstimate, lang = 'en' }) {
  const isSq = lang === 'sq';
  return (
    <section id="guarantee" className="renovate-guarantee-section">
      <div className="container">
        <motion.div
          className="guarantee-card-box"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left Column: Eyebrow, Title & Circular Emblem */}
          <div className="guarantee-left-col">
            <div className="guarantee-header-block">
              <span className="guarantee-eyebrow">{isSq ? '// Cilësia dhe Besimi' : '// Quality and Confidence'}</span>
              <h2 className="guarantee-heading">
                {isSq ? 'Punë e kujdesshme, sipas asaj që biem dakord.' : 'Careful work, done to what we agreed.'}
              </h2>
            </div>

            {/* Circular 10-Year Emblem */}
            <div className="guarantee-emblem-wrap">
              <div className="guarantee-dashed-ring">
                <div className="guarantee-circle-fill">
                  <span className="guarantee-number">6</span>
                  <span className="guarantee-unit-years">{isSq ? 'HAPA' : 'STEPS'}</span>
                  <span className="guarantee-unit-warranty">{isSq ? 'PROCES I QARTË' : 'CLEAR PROCESS'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards & Description */}
          <div className="guarantee-right-col">
            <div className="guarantee-items-list">
              {guaranteeFeatures.map((item, idx) => (
                <div key={idx} className="guarantee-item-card">
                  <div className="guarantee-icon-box">
                    <img
                      src={item.icon}
                      alt=""
                      className="guarantee-icon-img"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="guarantee-item-title">{isSq ? item.titleSq : item.title}</span>
                </div>
              ))}
            </div>

            <p className="guarantee-desc-text">
              {isSq
                ? 'Para fillimit biem dakord për objektin e punës, materialet dhe grafikun. Gjatë punës ju mbajmë të informuar, dhe në fund e kontrollojmë punën së bashku me ju. [Kushtet e garancisë, nëse ka, për t’u konfirmuar nga Forest-Al.]'
                : 'Before work starts, we agree the scope, materials and schedule with you. During the work we keep you informed, and at the end we check the work together with you. [Warranty terms, if any, to be confirmed by Forest-Al.]'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
