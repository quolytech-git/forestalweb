import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Globe } from 'lucide-react';
import { siteData } from '../data/siteData';
import logoWhite from '../assets/logo/forestal-logo-white.png';
import logoBlack from '../assets/logo/forestal-logo-black.png';

export default function Navbar({ activePage, setActivePage, onOpenEstimate, lang = 'en', onToggleLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSq = lang === 'sq';

  const navLinks = [
    { id: 'home', label: isSq ? 'Kreu' : 'Home' },
    { id: 'about', label: isSq ? 'Rreth Nesh' : 'About' },
    { id: 'project', label: isSq ? 'Projektet' : 'Projects' },
    { id: 'services', label: isSq ? 'Shërbimet' : 'Services' },
    { id: 'areas', label: isSq ? 'Zonat' : 'Areas' },
  ];

  const handleNavClick = (linkItem) => {
    if (typeof linkItem === 'string') {
      setActivePage(linkItem);
      setMobileMenuOpen(false);
      return;
    }
    setActivePage(linkItem.id);
    setMobileMenuOpen(false);
  };

  const handleToggle = () => {
    if (onToggleLang) {
      onToggleLang(isSq ? 'en' : 'sq');
    }
  };

  return (
    <>
      <header className="nav-wrapper">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="nav-logo"
            style={{ cursor: 'pointer' }}
          >
            <span className="nav-logo-img-wrap">
              <img src={logoWhite} alt={siteData.brand.name} className="nav-logo-img nav-logo-img-white" />
              <img src={logoBlack} alt="" aria-hidden="true" className="nav-logo-img nav-logo-img-black" />
            </span>
          </button>

          {/* Center Navigation Links Pill */}
          <div className="nav-links-pill">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="nav-link-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Section: Language Toggle + Contact Us CTA Button */}
          <div className="nav-right-actions">
            {/* Highly Visible Segmented Language Switcher Pill (EN / SQ) */}
            <motion.button
              type="button"
              onClick={handleToggle}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="nav-lang-btn-prominent"
              aria-label={isSq ? 'Switch to English' : 'Kalo në gjuhën Shqipe'}
              title={isSq ? 'Switch to English' : 'Kalo në gjuhën Shqipe'}
            >
              <Globe size={15} strokeWidth={2.3} className="nav-lang-globe-icon" />
              <div className="nav-lang-segmented">
                <span className={`nav-lang-badge ${!isSq ? 'active' : ''}`}>EN</span>
                <span className={`nav-lang-badge ${isSq ? 'active' : ''}`}>SQ</span>
              </div>
            </motion.button>

            {/* Contact Us CTA Button (Desktop & Tablet only; hidden on mobile screens) */}
            <motion.button
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="framer-cta-pill nav-contact-pill"
              aria-label={isSq ? 'Kontaktoni Forest-Al' : 'Contact Forest-Al'}
            >
              <span>{isSq ? 'Na Kontaktoni' : 'Contact Us'}</span>
              <div className="framer-cta-arrow-circle">
                <ArrowRight size={14} strokeWidth={2.5} />
              </div>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-burger-btn"
              aria-label={isSq ? 'Hap ose mbyll menunë' : 'Open or close the menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="mobile-menu-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Language Switcher inside Mobile Drawer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(26,26,23,0.1)' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-dark, #1a1a17)', fontWeight: 700 }}>{isSq ? 'Zgjidh Gjuhën:' : 'Language:'}</span>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="nav-lang-btn-prominent"
                >
                  <Globe size={15} strokeWidth={2.3} className="nav-lang-globe-icon" />
                  <div className="nav-lang-segmented">
                    <span className={`nav-lang-badge ${!isSq ? 'active' : ''}`}>EN</span>
                    <span className={`nav-lang-badge ${isSq ? 'active' : ''}`}>SQ</span>
                  </div>
                </button>
              </div>

              <div className="mobile-nav-links">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className="mobile-nav-link"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={18} opacity={activePage === link.id ? 1 : 0.4} />
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="mobile-nav-link"
                >
                  <span>{isSq ? 'Na Kontaktoni' : 'Contact Us'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Primary Call to Action in Mobile Sheet */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimate();
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                <div className="btn-icon-circle">
                  <ArrowRight size={16} />
                </div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
