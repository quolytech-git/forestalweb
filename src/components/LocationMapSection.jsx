import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function LocationMapSection({ lang = 'en' }) {
  const isSq = lang === 'sq';

  const t = {
    heading: isSq ? 'Ku ndodhemi' : 'Where to find us',
    subtitle: isSq
      ? 'Zyra jonë ndodhet në Rrugën Stavri Themeli në Tiranë dhe është e hapur nga ora 08:00 deri në 18:00. Jemi gjithmonë të hapur për të diskutuar projektin tuaj: na gjeni në zyrë ose na telefononi.'
      : 'Our office is on Rruga Stavri Themeli in Tirana and is open from 08:00 to 18:00. We are always open to discuss your project: come and find us at the office, or give us a call.',
    directions: isSq ? 'Hapeni në Google Maps' : 'Open in Google Maps',
  };

  return (
    <section id="location" className="forestal-location-section-clean">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="location-clean-card"
        >
          {/* Header Title & Subtitle */}
          <div className="location-clean-header">
            <h2 className="location-clean-title">{t.heading}</h2>
            <p className="location-clean-subtitle">{t.subtitle}</p>
            <a
              href={siteData.brand.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-all-projects-btn location-directions-btn"
            >
              <span>{t.directions}</span>
              <div className="pd-all-projects-arrow">
                <ArrowUpRight size={13} strokeWidth={2.4} />
              </div>
            </a>
          </div>

          {/* Full Width Google Maps Frame matching Reference Image */}
          <div className="location-clean-map-container">
            <iframe
              title={isSq ? 'Harta e vendndodhjes së Forest-Al' : 'Forest-Al location map'}
              src={siteData.brand.mapEmbedUrl}
              className="location-clean-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
