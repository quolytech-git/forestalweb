import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function ServicesSection({ onSelectService, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  // The first 6 services appear on the homepage; all 9 are on the Services page
  const displayedServices = siteData.services.slice(0, 6);

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Top Split Section Header */}
        <div className="services-header-split">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="services-header-left"
          >
            <span className="services-tag">{isSq ? '// Shërbimet Tona' : '// Our Services'}</span>
            <h2 className="services-title">
              {isSq ? (
                <>
                  Ndërtim, rinovim<br className="services-title-br" /> dhe mirëmbajtje
                </>
              ) : (
                <>
                  Construction, renovation<br className="services-title-br" /> and maintenance
                </>
              )}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="services-header-right"
          >
            <p className="services-subtitle">
              {isSq ? (
                <>
                  Nga ndërtimi dhe rinovimi deri te mirëmbajtja e përditshme,<br className="services-subtitle-br" /> bëjmë punën që i nevojitet pronës suaj, nga fillimi deri në fund.
                </>
              ) : (
                <>
                  From construction and renovation to everyday maintenance,<br className="services-subtitle-br" /> we do the work your property needs, from start to finish.
                </>
              )}
            </p>

            <motion.button
              onClick={() => onNavigate ? onNavigate('services') : (onSelectService && onSelectService('All'))}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="services-all-btn"
              aria-label={isSq ? 'Shikoni të gjitha shërbimet' : 'View all services'}
            >
              <span>{isSq ? 'Të Gjitha Shërbimet' : 'All Services'}</span>
              <div className="services-btn-icon-circle">
                <ArrowRight size={13} strokeWidth={2.5} />
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* 6 Services Cards 3-Column Grid */}
        <div className="services-grid">
          {displayedServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="service-card"
              onClick={() =>
                onNavigate
                  ? onNavigate('service-detail', service.slug)
                  : onSelectService && onSelectService(service.title)
              }
            >
              {/* Image with frosted category badge */}
              <div className="service-img-wrapper">
                <img
                  src={service.image}
                  alt={isSq ? service.titleSq : service.title}
                  className="service-img"
                  loading="lazy"
                />
                <div className="service-category-tag">
                  <span className="category-dot">•</span>
                  <span>{isSq ? service.categorySq : service.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="service-card-body">
                <div>
                  <h3 className="service-title">{isSq ? service.titleSq : service.title}</h3>
                  <p className="service-desc">{isSq ? service.descriptionSq : service.description}</p>
                </div>

                {/* Bottom Action Link */}
                <div className="service-link-wrapper">
                  <span className="service-link-text">{isSq ? 'Mësoni Më Shumë' : 'Learn More'}</span>
                  <div className="service-link-circle">
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
