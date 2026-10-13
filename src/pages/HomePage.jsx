import React from 'react';
import Hero from '../components/Hero';
import BildoraShowcaseSection from '../components/BildoraShowcaseSection';
import ServicesSection from '../components/ServicesSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import TrustSection from '../components/TrustSection';
import ProcessSection from '../components/ProcessSection';
import ReviewsSection from '../components/ReviewsSection';
import FinancingBanner from '../components/FinancingBanner';
import AreasSection from '../components/AreasSection';
import GuaranteeSection from '../components/GuaranteeSection';
import FaqSection from '../components/FaqSection';
import LocationMapSection from '../components/LocationMapSection';

export default function HomePage({ onOpenEstimate, onNavigate, onSelectService, lang = 'en' }) {
  return (
    <main>
      <Hero
        onOpenEstimate={onOpenEstimate}
        onViewWork={() => onNavigate('project')}
        lang={lang}
      />
      <BildoraShowcaseSection onOpenEstimate={onOpenEstimate} lang={lang} />
      <ServicesSection onSelectService={onSelectService} onNavigate={onNavigate} lang={lang} />
      <BeforeAfterSlider onNavigate={onNavigate} onOpenEstimate={onOpenEstimate} lang={lang} />
      <TrustSection lang={lang} />
      <ProcessSection lang={lang} />
      <ReviewsSection lang={lang} />
      <FinancingBanner onOpenEstimate={onOpenEstimate} lang={lang} />
      <AreasSection onOpenEstimate={onOpenEstimate} onNavigate={onNavigate} lang={lang} />
      <GuaranteeSection onOpenEstimate={onOpenEstimate} lang={lang} />
      <FaqSection lang={lang} />
      <LocationMapSection onOpenEstimate={onOpenEstimate} lang={lang} />
    </main>
  );
}
