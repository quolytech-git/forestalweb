import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function FaqSection({ lang = 'en' }) {
  const isSq = lang === 'sq';
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{isSq ? '// Pyetje të Shpeshta //' : '// FAQ //'}</div>
          <h2>{isSq ? 'Pyetje dhe përgjigje.' : 'Questions, answered.'}</h2>
          <p>
            {isSq
              ? 'Përgjigje të përgjithshme për kostot, kohëzgjatjen, lejet, mirëmbajtjen dhe si të na kontaktoni.'
              : 'General answers about costs, timing, permits, maintenance and how to get in touch.'}
          </p>
        </div>

        <div className="faq-accordion-list">
          {siteData.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span>{isSq ? faq.questionSq : faq.question}</span>
                  <div className="faq-toggle-icon">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="faq-answer-content">
                        {isSq ? faq.answerSq : faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
