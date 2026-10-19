import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Building, CheckCircle2 } from 'lucide-react';

export default function RealEstateRedirectPop({ lang = 'en', forceOpen = false, onCloseForce }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState('idle'); // 'idle' | 'redirecting' | 'notice'

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    if (isDismissed) return;

    // Gracefully display after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [isDismissed, forceOpen]);

  const handleDismiss = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setIsDismissed(true);
    if (onCloseForce) onCloseForce();
  };

  const handleDummyRedirect = (e) => {
    e.stopPropagation();
    setRedirectStatus('redirecting');

    setTimeout(() => {
      setRedirectStatus('notice');
      setTimeout(() => {
        setRedirectStatus('idle');
      }, 4000);
    }, 800);
  };

  const isSq = lang === 'sq';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className="re-redirect-pop-wrapper"
          aria-label={isSq ? 'Njoftim për Pasuritë e Paluajtshme' : 'Real Estate Redirect Notice'}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="re-redirect-close-btn"
            aria-label={isSq ? 'Mbyll dritaren' : 'Close notification'}
          >
            <X size={14} />
          </button>

          {/* Header Tag */}
          <div className="re-redirect-tag-row">
            <span className="re-redirect-pill">
              <Sparkles size={11} className="re-redirect-sparkle" />
              {isSq ? 'Platformë e Veçantë' : 'Separate Website'}
            </span>
          </div>

          {/* Title & Description */}
          <div className="re-redirect-content">
            <div className="re-redirect-title-group">
              <Building size={16} className="re-redirect-bldg-icon" />
              <h4 className="re-redirect-heading">
                {isSq ? 'Pasuri të Paluajtshme' : 'Real Estate Listings'}
              </h4>
            </div>

            <p className="re-redirect-text">
              {isSq
                ? 'Kërkoni një pronë për ta blerë ose për ta marrë me qira? Shpalljet tona të pronave do të jenë në një platformë të veçantë.'
                : 'Looking for a property to buy or rent? Our property listings will be on a separate platform.'}
            </p>

            {/* Dummy Redirect Button */}
            <div className="re-redirect-action-box">
              <button
                type="button"
                onClick={handleDummyRedirect}
                disabled={redirectStatus === 'redirecting'}
                className="re-redirect-dummy-btn"
              >
                <span>
                  {redirectStatus === 'redirecting'
                    ? isSq
                      ? 'Po lidhet...'
                      : 'Connecting...'
                    : redirectStatus === 'notice'
                    ? isSq
                      ? 'Lidhja shtohet së shpejti'
                      : 'Link coming soon'
                    : isSq
                    ? 'Hapni Platformën e Pronave'
                    : 'Visit the Real Estate Platform'}
                </span>
                <ExternalLink size={14} className="re-redirect-ext-icon" />
              </button>
            </div>

            {/* Notice feedback upon clicking */}
            <AnimatePresence>
              {redirectStatus === 'notice' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="re-redirect-feedback-notice"
                >
                  <CheckCircle2 size={13} className="text-success" />
                  <span>
                    {isSq
                      ? 'Lidhja me platformën e pronave do të shtohet së shpejti.'
                      : 'The link to the real estate platform will be added soon.'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
