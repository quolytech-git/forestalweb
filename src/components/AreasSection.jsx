import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import mapImg from '../assets/areas/map.png';
import pinIcon from '../assets/areas/pin.svg';

import { siteData } from '../data/siteData';

// Cities where Forest-Al has worked
const areaCities = siteData.cities.map((c) => ({ en: c.name, sq: c.nameSq }));

export default function AreasSection({ onOpenEstimate, lang = 'en' }) {
  const isSq = lang === 'sq';
  return (
    <section id="service-areas" className="renovate-service-areas-section">
      <div className="container">
        <div className="areas-split-layout">
          {/* Left Column: Dark Map Card */}
          <motion.div
            className="areas-map-card"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={mapImg}
              alt={isSq ? 'Harta e zonave të shërbimit' : 'Map of service areas'}
              className="areas-map-img"
              loading="lazy"
            />
          </motion.div>

          {/* Right Column: Heading, Subtitle, City Pills & CTA Button */}
          <motion.div
            className="areas-content-col"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="areas-header-block">
              <span className="areas-eyebrow">{isSq ? '// Zonat e Shërbimit' : '// Service Areas'}</span>
              <h2 className="areas-title">
                {isSq ? 'Punojmë në gjithë Shqipërinë.' : 'We work across all of Albania.'}
              </h2>
              <p className="areas-subtitle">
                {isSq
                  ? 'Zyra jonë është në Tiranë dhe kemi përfunduar projekte në Tiranë, Durrës, Korçë, Qeparo e më gjerë. Kudo që të jetë prona juaj, na kontaktoni.'
                  : 'Our office is in Tirana, and we have completed projects in Tirana, Durrës, Korçë, Qeparo and beyond. Wherever your property is, get in touch.'}
              </p>
            </div>

            {/* City pills */}
            <div className="areas-pills-grid">
              {areaCities.map((city, idx) => (
                <motion.button
                  key={city.en}
                  type="button"
                  className="area-pill-item"
                  onClick={() => onOpenEstimate && onOpenEstimate()}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={pinIcon}
                    alt=""
                    className="area-pill-icon"
                    aria-hidden="true"
                  />
                  <span className="area-pill-name">{isSq ? city.sq : city.en}</span>
                </motion.button>
              ))}
            </div>

            {/* Check Your Postcode Button */}
            <button
              onClick={() => onOpenEstimate && onOpenEstimate()}
              className="areas-cta-btn"
              type="button"
            >
              <span>{isSq ? 'Pyesni për Zonën Tuaj' : 'Ask About Your Area'}</span>
              <div className="areas-btn-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
