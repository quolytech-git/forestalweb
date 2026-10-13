import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import forestalCtaVideo from '../assets/footer/forestal_cta_video.mp4';
import { siteData } from '../data/siteData';

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer({ onNavigate, onOpenEstimate, onOpenRealEstate, lang = 'en', showCta = true }) {
  const isSq = lang === 'sq';

  const handleNav = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = {
    ctaHeading: isSq ? (
      <>
        Keni një projekt<br />
        ose një punë mirëmbajtjeje?
      </>
    ) : (
      <>
        Have a project or<br />
        maintenance job in mind?
      </>
    ),
    ctaSub: isSq
      ? 'Na tregoni çfarë ju nevojitet. Do ta shohim punën, do t’ju shpjegojmë hapat e radhës dhe do t’ju përgatisim një preventiv.'
      : 'Tell us what you need. We will look at the work, explain the next steps and prepare a quotation for you.',
    ctaBtn: isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate',
    contactLabel: isSq ? 'Na Kontaktoni' : 'Contact Us',
    phone: siteData.brand.phone,
    hours: isSq ? siteData.brand.hoursSq : siteData.brand.hours,
    emailLabel: isSq ? 'NA SHKRUANI' : 'WRITE TO US',
    email: siteData.brand.email,
    menuTitle: 'MENU',
    menuItems: [
      { label: isSq ? 'Kryefaqja' : 'Home', action: () => handleNav('home') },
      { label: isSq ? 'Rreth Nesh' : 'About Us', action: () => handleNav('about') },
      { label: isSq ? 'Projektet' : 'Projects', action: () => handleNav('project') },
      { label: isSq ? 'Shërbimet' : 'Services', action: () => handleNav('services') },
      { label: isSq ? 'Zonat e Shërbimit' : 'Service Areas', action: () => handleNav('areas') },
      { label: isSq ? 'Na Kontaktoni' : 'Contact', action: () => handleNav('contact') },
      { label: isSq ? 'Kërkoni Preventiv' : 'Request an Estimate', action: () => (onOpenEstimate ? onOpenEstimate() : handleNav('contact')) },
    ],
    legalTitle: isSq ? 'LIGJORE' : 'LEGAL',
    legalItems: [
      { label: isSq ? 'Politika e Privatësisë' : 'Privacy Policy' },
      { label: isSq ? 'Kushtet e Shërbimit' : 'Terms of Service' },
      { label: isSq ? 'Politika e Cookies' : 'Cookie Policy' },
    ],
    servicePagesTitle: isSq ? 'SHËRBIMET' : 'SERVICES',
    servicePagesItems: [
      { label: isSq ? 'Konstruksione Metalike' : 'Metal Structures', action: () => handleNav('service/metal-structures') },
      { label: isSq ? 'Ndarje dhe Tavane me Gips' : 'Drywall Partitions & Ceilings', action: () => handleNav('service/drywall-systems') },
      { label: isSq ? 'Mirëmbajtje Ndërtimore' : 'Building Maintenance', action: () => handleNav('service/building-maintenance') },
      { label: isSq ? 'Pasuri të Paluajtshme ↗' : 'Real Estate ↗', action: () => (onOpenRealEstate ? onOpenRealEstate() : null) },
    ],
    socialTitle: isSq ? 'RRJETET SOCIALE' : 'SOCIAL MEDIA',
    wordmark: 'Forest-Al',
    copyright: isSq
      ? '© 2026 FOREST-AL. TË GJITHA TË DREJTAT E REZERVUARA. · ZHVILLUAR NGA QUOLYTECH'
      : '© 2026 FOREST-AL. ALL RIGHTS RESERVED. · DEVELOPED BY QUOLYTECH',
  };

  return (
    <footer className="forestal-footer-wrapper">
      {/* ========================================================
          TOP SECTION: BESPOKE ARCHITECTURAL CTA BANNER
          ======================================================== */}
      {showCta && (
        <section className="forestal-cta-banner">
          {/* Background Video (muted, looping) as Base */}
          <video
            src={forestalCtaVideo}
            className="forestal-cta-bg-img"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Deep Architectural Ambient Overlays */}
          <div className="forestal-cta-overlay" />
          <div className="forestal-cta-ambient-glow" />

          <div className="forestal-cta-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="forestal-cta-content"
            >
              <div className="forestal-cta-badge">
                <Sparkles size={14} className="forestal-cta-badge-icon" />
                <span>{isSq ? 'Konsultë Falas' : 'Free Consultation'}</span>
              </div>

              <h2 className="forestal-cta-heading">{t.ctaHeading}</h2>
              <p className="forestal-cta-sub">{t.ctaSub}</p>

              <div className="forestal-cta-divider" />

              <motion.button
                type="button"
                onClick={onOpenEstimate}
                className="forestal-cta-action-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t.ctaBtn}</span>
                <div className="forestal-cta-btn-arrow">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* ========================================================
          MAIN FOOTER BODY (MATCHING USER REFERENCE DESIGN)
          ======================================================== */}
      <div className="forestal-footer-main">
        <div className="forestal-footer-container">
          {/* Top Contact Bar: Na Kontaktoni + Phone & NA SHKRUANI? + Email */}
          <div className="forestal-contact-bar">
            <div className="forestal-contact-bar-left">
              <span className="forestal-contact-bar-label">{t.contactLabel}</span>
              <a
                href={`tel:${t.phone.replace(/\s+/g, '')}`}
                className="forestal-contact-bar-phone"
              >
                {t.phone}
              </a>
              <span className="forestal-contact-bar-hours">{t.hours}</span>
            </div>

            <div className="forestal-contact-bar-right">
              <span className="forestal-contact-bar-label-sub">{t.emailLabel}</span>
              <a
                href={`mailto:${t.email}`}
                className="forestal-contact-bar-email"
              >
                {t.email}
              </a>
            </div>
          </div>

          {/* Clean Thin Divider Line */}
          <div className="forestal-footer-divider-line" />

          {/* 4 Navigation & Social Columns */}
          <div className="forestal-footer-nav-grid">
            {/* Col 1: MENU */}
            <div className="forestal-footer-col">
              <h5 className="forestal-footer-col-header">{t.menuTitle}</h5>
              <ul className="forestal-footer-col-list">
                {t.menuItems.map((item, idx) => (
                  <li key={idx}>
                    <button type="button" onClick={item.action}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: LIGJORE */}
            <div className="forestal-footer-col">
              <h5 className="forestal-footer-col-header">{t.legalTitle}</h5>
              <ul className="forestal-footer-col-list">
                {t.legalItems.map((item, idx) => (
                  <li key={idx}>
                    <button type="button" onClick={() => handleNav('about')}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: FAQE SHËRBIMI */}
            <div className="forestal-footer-col">
              <h5 className="forestal-footer-col-header">{t.servicePagesTitle}</h5>
              <ul className="forestal-footer-col-list">
                {t.servicePagesItems.map((item, idx) => (
                  <li key={idx}>
                    <button type="button" onClick={item.action}>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: RRJETET SOCIALE */}
            <div className="forestal-footer-col">
              <h5 className="forestal-footer-col-header">{t.socialTitle}</h5>
              <div className="forestal-footer-socials-row">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forestal-footer-social-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forestal-footer-social-btn"
                  aria-label="X"
                >
                  <TwitterXIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forestal-footer-social-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Prominent, Highly-Visible Architectural Forestal Wordmark */}
          <div className="forestal-wordmark-wrapper">
            <h1 className="forestal-giant-wordmark" aria-label="Forest-Al">
              {t.wordmark}
            </h1>
          </div>

          {/* Centered Subfooter Copyright & Developer Line */}
          <div className="forestal-subfooter-bar">
            <p className="forestal-copyright-text">
              {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
