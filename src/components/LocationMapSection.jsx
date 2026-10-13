import React from 'react';
import { motion } from 'framer-motion';

export default function LocationMapSection({ lang = 'en' }) {
  const isSq = lang === 'sq';

  const t = {
    heading: isSq ? 'Vendndodhja Jonë' : 'Our Location',
    subtitle: isSq
      ? 'Forest-Al punon në Shqipëri. [Adresa e zyrës — për t’u konfirmuar.] Ju lutemi na kontaktoni para se të vini.'
      : 'Forest-Al works in Albania. [Office address — to be confirmed.] Please contact us before visiting.',
  };

  // Google Maps embed URL centered on Tirana, Albania (Skanderbeg Square center as shown in the reference image)
  const tiranaMapUrl = 'https://maps.google.com/maps?q=Sheshi+Skenderbej,+Tiran%C3%AB,+Albania&t=&z=15&ie=UTF8&iwloc=&output=embed';

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
          </div>

          {/* Full Width Google Maps Frame matching Reference Image */}
          <div className="location-clean-map-container">
            <iframe
              title={isSq ? 'Harta e vendndodhjes së Forest-Al' : 'Forest-Al location map'}
              src={tiranaMapUrl}
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
