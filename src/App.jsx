import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EstimateModal from './components/EstimateModal';
import LoadingScreen from './components/LoadingScreen';
import SecondLoadingScreen from './components/SecondLoadingScreen';
import PageTransitionCurtain from './components/PageTransitionCurtain';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AreasPage from './pages/AreasPage';
import ContactPage from './pages/ContactPage';
import BackToTop from './components/BackToTop';
import RealEstateRedirectPop from './components/RealEstateRedirectPop';
import { siteData } from './data/siteData';
import { serviceDetailsMap } from './data/serviceDetailsData';
import { projectDetailsMap } from './data/projectDetailsData';
import { galleryDetailsMap } from './data/galleryData';

export default function App() {
  const getInitialRoute = () => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project/')) {
        return { page: 'project-detail', slug: hash.replace('project/', '') || 'garden-building', serviceSlug: 'metal-structures' };
      }
      if (hash === 'project-detail') {
        return { page: 'project-detail', slug: 'garden-building', serviceSlug: 'metal-structures' };
      }
      if (hash.startsWith('gallery/')) {
        return { page: 'gallery-detail', slug: 'garden-building', serviceSlug: 'metal-structures', gallerySlug: hash.replace('gallery/', '') || 'garden-building' };
      }
      if (hash.startsWith('service/')) {
        return { page: 'service-detail', slug: 'garden-building', serviceSlug: hash.replace('service/', '') || 'metal-structures' };
      }
      if (hash === 'service-detail') {
        return { page: 'service-detail', slug: 'garden-building', serviceSlug: 'metal-structures' };
      }
      if (['home', 'about', 'project', 'gallery', 'services', 'areas', 'contact'].includes(hash)) {
        return { page: hash, slug: 'garden-building', serviceSlug: 'metal-structures' };
      }
    } catch {
      // ignore
    }
    return { page: 'home', slug: 'garden-building', serviceSlug: 'metal-structures' };
  };

  const initialRoute = getInitialRoute();
  const [activePage, setActivePage] = useState(initialRoute.page);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(initialRoute.slug);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(initialRoute.serviceSlug || 'metal-structures');
  const [selectedGallerySlug, setSelectedGallerySlug] = useState(initialRoute.gallerySlug || 'garden-building');
  const [isLoading, setIsLoading] = useState(true);
  // 'letters' (First LoadingScreen with animated letters) | 'curtain' (SecondLoadingScreen - no letters)
  const [loaderVariant] = useState('letters');
  const [curtainPhase, setCurtainPhase] = useState('idle'); // 'idle' | 'entering' | 'exiting'
  const pendingNavRef = useRef(null);
  const isCurtainNavigatingRef = useRef(false);

  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Metal Structures');
  const [isRealEstatePopOpen, setIsRealEstatePopOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      // Albanian is the default language; English is the alternative
      return localStorage.getItem('forestal_lang') || 'sq';
    } catch {
      return 'sq';
    }
  });

  const handleToggleLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('forestal_lang', newLang);
    } catch {
      // ignore local storage errors
    }
  };

  // Page title, meta description and document language for the current page
  useEffect(() => {
    const isSq = lang === 'sq';
    const { seo } = siteData;
    let entry = seo[activePage] || seo.home;
    if (activePage === 'service-detail') {
      const s = serviceDetailsMap[selectedServiceSlug];
      if (s) {
        entry = {
          title: `${s.title} | Forest-Al`,
          titleSq: `${s.titleSq} | Forest-Al`,
          description: s.subtitle,
          descriptionSq: s.subtitleSq,
        };
      }
    } else if (activePage === 'gallery-detail') {
      const g = galleryDetailsMap[selectedGallerySlug];
      if (g) {
        entry = {
          title: `${g.title} | Gallery | Forest-Al`,
          titleSq: `${g.titleSq} | Galeria | Forest-Al`,
          description: g.intro,
          descriptionSq: g.introSq,
        };
      }
    } else if (activePage === 'project-detail') {
      const p = projectDetailsMap[selectedProjectSlug];
      if (p) {
        entry = {
          title: `${p.title} | Projects | Forest-Al`,
          titleSq: `${p.titleSq} | Projektet | Forest-Al`,
          description: seo.project.description,
          descriptionSq: seo.project.descriptionSq,
        };
      }
    }
    document.title = isSq ? entry.titleSq : entry.title;
    document.documentElement.lang = isSq ? 'sq' : 'en';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', isSq ? entry.descriptionSq : entry.description);
  }, [activePage, lang, selectedServiceSlug, selectedProjectSlug, selectedGallerySlug]);

  // 1. Lenis Smooth Scrolling (Silky smooth, slightly slower, luxurious easing)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // slower, luxurious smooth gliding
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // slightly slower for premium weighted architectural feel
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 3. Proximity Cursor Color Shift on Interactive Buttons (Throttled with rAF for 120fps smoothness)
  useEffect(() => {
    let animId = null;
    let buttonsCache = null;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (animId) return;

      animId = requestAnimationFrame(() => {
        animId = null;
        if (!buttonsCache) {
          buttonsCache = document.querySelectorAll(
            '.framer-cta-pill, .btn-primary, .btn-primary-dark, .forestal-cta-action-btn, .nav-contact-pill, .nav-lang-btn-prominent, .pd-details-cta-btn, .pd-all-projects-btn'
          );
        }

        const PROXIMITY_RADIUS = 160;

        buttonsCache.forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const btnCenterY = rect.top + rect.height / 2;

          const distX = mouseX - btnCenterX;
          const distY = mouseY - btnCenterY;
          const distance = Math.hypot(distX, distY);

          if (distance < PROXIMITY_RADIUS) {
            const proximity = Math.max(0, Math.min(1, 1 - distance / PROXIMITY_RADIUS));
            btn.style.setProperty('--proximity', proximity.toFixed(3));
            btn.classList.add('cursor-close');
          } else {
            if (btn.classList.contains('cursor-close')) {
              btn.style.setProperty('--proximity', '0');
              btn.classList.remove('cursor-close');
            }
          }
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activePage]);

  // Actual state mutation when curtain has reached screen midpoint
  const executePageChange = useCallback((targetPageId, targetSlug = null) => {
    if (targetPageId === 'project-detail') {
      if (targetSlug) setSelectedProjectSlug(targetSlug);
      setActivePage('project-detail');
      window.location.hash = `project/${targetSlug || selectedProjectSlug || 'garden-building'}`;
    } else if (targetPageId.startsWith('project/')) {
      const slug = targetPageId.replace('project/', '');
      setSelectedProjectSlug(slug);
      setActivePage('project-detail');
      window.location.hash = targetPageId;
    } else if (targetPageId === 'gallery-detail') {
      if (targetSlug) setSelectedGallerySlug(targetSlug);
      setActivePage('gallery-detail');
      window.location.hash = `gallery/${targetSlug || selectedGallerySlug || 'garden-building'}`;
    } else if (targetPageId === 'service-detail') {
      if (targetSlug) setSelectedServiceSlug(targetSlug);
      setActivePage('service-detail');
      window.location.hash = `service/${targetSlug || selectedServiceSlug || 'metal-structures'}`;
    } else if (targetPageId.startsWith('service/')) {
      const slug = targetPageId.replace('service/', '');
      setSelectedServiceSlug(slug);
      setActivePage('service-detail');
      window.location.hash = targetPageId;
    } else {
      setActivePage(targetPageId);
      window.location.hash = targetPageId;
    }
  }, [selectedProjectSlug, selectedServiceSlug, selectedGallerySlug]);

  // Handle URL hash changes or browser history
  useEffect(() => {
    const handleHash = () => {
      if (isCurtainNavigatingRef.current) return;

      const hash = window.location.hash.replace('#', '');
      let targetPage = 'home';
      let targetSlug = null;

      if (hash.startsWith('project/')) {
        targetPage = 'project-detail';
        targetSlug = hash.replace('project/', '') || 'garden-building';
      } else if (hash === 'project-detail') {
        targetPage = 'project-detail';
        targetSlug = selectedProjectSlug || 'garden-building';
      } else if (hash.startsWith('gallery/')) {
        targetPage = 'gallery-detail';
        targetSlug = hash.replace('gallery/', '') || 'garden-building';
      } else if (hash.startsWith('service/')) {
        targetPage = 'service-detail';
        targetSlug = hash.replace('service/', '') || 'metal-structures';
      } else if (hash === 'service-detail') {
        targetPage = 'service-detail';
        targetSlug = selectedServiceSlug || 'metal-structures';
      } else if (['home', 'about', 'project', 'gallery', 'services', 'areas', 'contact'].includes(hash)) {
        targetPage = hash;
      }

      const isChanged =
        targetPage !== activePage ||
        (targetSlug &&
          ((targetPage === 'project-detail' && targetSlug !== selectedProjectSlug) ||
            (targetPage === 'service-detail' && targetSlug !== selectedServiceSlug) ||
            (targetPage === 'gallery-detail' && targetSlug !== selectedGallerySlug)));

      if (isChanged) {
        if (curtainPhase === 'idle') {
          pendingNavRef.current = { pageId: targetPage, paramSlug: targetSlug };
          isCurtainNavigatingRef.current = true;
          if (window.__lenis) window.__lenis.stop();
          setCurtainPhase('entering');
        } else {
          executePageChange(targetPage, targetSlug);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activePage, selectedProjectSlug, selectedServiceSlug, selectedGallerySlug, curtainPhase, executePageChange]);

  // Navigate to any page using the architectural "from down to up" curtain transition
  const navigateTo = (pageId, paramSlug = null) => {
    const isSamePage =
      pageId === activePage &&
      (!paramSlug ||
        (pageId === 'project-detail' && paramSlug === selectedProjectSlug) ||
        (pageId === 'service-detail' && paramSlug === selectedServiceSlug) ||
        (pageId === 'gallery-detail' && paramSlug === selectedGallerySlug));

    if (isSamePage) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (curtainPhase !== 'idle') return;

    if (window.__lenis) {
      window.__lenis.stop();
    }

    pendingNavRef.current = { pageId, paramSlug };
    isCurtainNavigatingRef.current = true;
    setCurtainPhase('entering');
  };

  // Called when curtain has slid UP from the bottom and fully covered the screen (y: 0%)
  const handleCurtainEntered = () => {
    if (pendingNavRef.current) {
      const { pageId, paramSlug } = pendingNavRef.current;
      executePageChange(pageId, paramSlug);
      pendingNavRef.current = null;
    }

    // Instantly reset scroll to top while shielded behind the curtain
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    // Transition to phase 2: sweeps upwards out of view (y: 0% -> -100%)
    setCurtainPhase('exiting');
  };

  // Called when curtain has slid up and out of the viewport (y: -100%)
  const handleCurtainExited = () => {
    setCurtainPhase('idle');
    isCurtainNavigatingRef.current = false;
    if (window.__lenis) {
      window.__lenis.start();
    }
  };

  const handleOpenEstimate = (serviceName) => {
    if (typeof serviceName === 'string') {
      setSelectedService(serviceName);
    }
    setIsEstimateOpen(true);
  };

  const pageVariants = {
    initial: { opacity: 0.95 },
    animate: { opacity: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 1, transition: { duration: 0 } },
  };

  return (
    <div className="app-container">
      {/* Initial Loading Screen */}
      {isLoading && (
        loaderVariant === 'curtain' ? (
          <SecondLoadingScreen onFinished={() => setIsLoading(false)} />
        ) : (
          <LoadingScreen lang={lang} onFinished={() => setIsLoading(false)} />
        )
      )}

      {/* Seamless "From Down to Up" Page Transition Curtain (No Letters) */}
      <PageTransitionCurtain
        phase={curtainPhase}
        onEntered={handleCurtainEntered}
        onExited={handleCurtainExited}
        duration={0.52}
      />

      {/* Persistent Floating Navbar */}
      <Navbar
        activePage={
          activePage === 'project-detail'
            ? 'project'
            : activePage === 'service-detail'
            ? 'services'
            : activePage === 'gallery-detail'
            ? 'gallery'
            : activePage
        }
        setActivePage={navigateTo}
        onOpenEstimate={() => handleOpenEstimate()}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Page Content with Animated Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={
            activePage +
            (activePage === 'project-detail' ? `-${selectedProjectSlug}` : '') +
            (activePage === 'service-detail' ? `-${selectedServiceSlug}` : '') +
            (activePage === 'gallery-detail' ? `-${selectedGallerySlug}` : '')
          }
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {activePage === 'home' && (
            <HomePage
              onOpenEstimate={() => handleOpenEstimate()}
              onNavigate={navigateTo}
              onSelectService={handleOpenEstimate}
              lang={lang}
            />
          )}

          {activePage === 'about' && (
            <AboutPage
              onOpenEstimate={() => handleOpenEstimate()}
              lang={lang}
            />
          )}

          {activePage === 'project' && (
            <ProjectsPage
              onOpenEstimate={() => handleOpenEstimate()}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'project-detail' && (
            <ProjectDetailPage
              projectSlug={selectedProjectSlug}
              onOpenEstimate={handleOpenEstimate}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'gallery' && (
            <GalleryPage
              onOpenEstimate={() => handleOpenEstimate()}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'gallery-detail' && (
            <GalleryDetailPage
              gallerySlug={selectedGallerySlug}
              onOpenEstimate={() => handleOpenEstimate()}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'services' && (
            <ServicesPage
              onOpenEstimate={() => handleOpenEstimate()}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'service-detail' && (
            <ServiceDetailPage
              serviceSlug={selectedServiceSlug}
              onOpenEstimate={handleOpenEstimate}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'areas' && (
            <AreasPage
              onOpenEstimate={handleOpenEstimate}
              onNavigate={navigateTo}
              lang={lang}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage
              lang={lang}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Persistent Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenEstimate={() => handleOpenEstimate()}
        onOpenRealEstate={() => setIsRealEstatePopOpen(true)}
        lang={lang}
        showCta={
          activePage !== 'about' &&
          activePage !== 'project' &&
          activePage !== 'project-detail' &&
          activePage !== 'gallery' &&
          activePage !== 'gallery-detail' &&
          activePage !== 'services' &&
          activePage !== 'service-detail' &&
          activePage !== 'areas'
        }
      />

      {/* Floating Back to Top Button */}
      <BackToTop lang={lang} />

      {/* Floating Real Estate Redirect Notice Pop (with dummy redirect button) */}
      <RealEstateRedirectPop
        lang={lang}
        forceOpen={isRealEstatePopOpen}
        onCloseForce={() => setIsRealEstatePopOpen(false)}
      />

      {/* Interactive Free Estimate Modal */}
      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
        initialService={selectedService}
        lang={lang}
      />
    </div>
  );
}
