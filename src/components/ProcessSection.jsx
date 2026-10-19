import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const STEPS_SQ = [
  {
    step: "01 — Biseda e parë",
    title: "Kuptojmë çfarë ju nevojitet",
    description: "Na tregoni çfarë doni të bëni, si e përdorni pronën dhe çfarë rezultati prisni.",
    image: '/gallery/high-rise-apartment/61.jpg',
    alt: "Ekipi i Forest-Al në një apartament në ndërtim",
  },
  {
    step: "02 — Vizita",
    title: "E shohim punën në vend",
    description: "Kur duhet, vijmë në pronë për të parë gjendjen, për të marrë matjet dhe për të kuptuar çdo vështirësi.",
    image: '/gallery/minepeza-building/3.jpg',
    alt: "Ambient i zhveshur para fillimit të punës",
  },
  {
    step: "03 — Plani dhe preventivi",
    title: "Ju japim një plan të qartë",
    description: "Përcaktojmë punët, materialet dhe radhën e tyre, dhe ju dërgojmë preventivin.",
    image: '/gallery/office-fit-out/26.jpg',
    alt: "Vizatim i planimetrisë për një projekt zyrash",
  },
  {
    step: "04 — Puna",
    title: "E bëjmë punën siç ramë dakord",
    description: "Ekipi ynë e kryen punën sipas planit, me kantier të rregullt dhe pronën të mbrojtur.",
    image: '/gallery/high-rise-apartment/99.jpg',
    alt: "Punëtor duke ndërtuar një mur të ri",
  },
  {
    step: "05 — Komunikimi",
    title: "Ju mbajmë të informuar",
    description: "Ju tregojmë si po ecën puna, dhe çdo ndryshim e diskutojmë fillimisht me ju.",
    image: '/gallery/apartment-renovation/168.jpg',
    alt: "Punëtorë duke ndjekur planin e punës në mur",
  },
  {
    step: "06 — Dorëzimi",
    title: "Kontrolli final dhe dorëzimi",
    description: "E kontrollojmë punën bashkë me ju, rregullojmë detajet e fundit dhe ju dorëzojmë një ambient të pastër.",
    image: '/gallery/minepeza-apartment/2.jpg',
    alt: "Apartament i përfunduar, gati për dorëzim",
  },
];

const STEPS_EN = [
  {
    step: "01 — First conversation",
    title: "Understanding what you need",
    description: "Tell us what you want to do, how you use the property and what result you expect.",
    image: '/gallery/high-rise-apartment/61.jpg',
    alt: "The Forest-Al team in an apartment under construction",
  },
  {
    step: "02 — Site visit",
    title: "Seeing the job in person",
    description: "Where needed, we visit the property to check its condition, take measurements and spot any difficulties.",
    image: '/gallery/minepeza-building/3.jpg',
    alt: "A bare space before work begins",
  },
  {
    step: "03 — Plan and quote",
    title: "A clear plan for you",
    description: "We set out the tasks, the materials and the order of work, and send you a quote.",
    image: '/gallery/office-fit-out/26.jpg',
    alt: "Layout drawing for an office project",
  },
  {
    step: "04 — The work",
    title: "Doing the work as agreed",
    description: "Our team carries out the work to plan, keeping the site tidy and your property protected.",
    image: '/gallery/high-rise-apartment/99.jpg',
    alt: "A worker boarding a new wall",
  },
  {
    step: "05 — Updates",
    title: "Keeping you informed",
    description: "We tell you how the work is going, and discuss any change with you first.",
    image: '/gallery/apartment-renovation/168.jpg',
    alt: "Workers following the plan pinned to the wall",
  },
  {
    step: "06 — Handover",
    title: "Final check and handover",
    description: "We check the finished work with you, sort out the last details and hand over a clean space.",
    image: '/gallery/minepeza-apartment/2.jpg',
    alt: "A finished apartment, ready for handover",
  },
];

export default function ProcessSection({ lang = 'en' }) {
  const isSq = lang === 'sq';
  const containerRef = useRef(null);

  const timelineSteps = isSq ? STEPS_SQ : STEPS_EN;

  // Scroll-linked continuous progress line mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 80%'],
  });

  // Physics-based spring inertia to avoid jitter on trackpads
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="bildora-timeline-section" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header bildora-timeline-header">
          <div className="bildora-values-pill">
            <span>{isSq ? 'Si Punojmë' : 'How We Work'}</span>
          </div>
          <h2 className="bildora-timeline-title">
            {isSq ? 'Nga biseda e parë te dorëzimi.' : 'From the first conversation to handover.'}
          </h2>
          <p className="bildora-timeline-subtitle">
            {isSq
              ? 'Çdo projekt fillon duke e kuptuar pronën, duke përcaktuar punën dhe duke rënë dakord për hapat konkretë.'
              : 'Every project starts by understanding the property, defining the work and agreeing the practical steps.'}
          </p>
        </div>

        {/* Central Axis Scroll-Driven Timeline */}
        <div className="bildora-timeline-wrapper">
          {/* Base Inactive Track Line */}
          <div className="bildora-timeline-track" />

          {/* Active Spring-Interpolated Royal Navy & Periwinkle Line */}
          <motion.div
            className="bildora-timeline-progress"
            style={{ scaleY }}
          />

          {/* Alternating Timeline Modules */}
          <div className="bildora-timeline-items">
            {timelineSteps.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`bildora-timeline-row ${isEven ? 'row-left' : 'row-right'}`}
                >
                  {/* Content Container (Alternates Left / Right) */}
                  <div className="bildora-timeline-content">
                    <span className="bildora-step-eyebrow">{item.step}</span>
                    <h3 className="bildora-step-heading">{item.title}</h3>
                    <p className="bildora-step-desc">{item.description}</p>

                    <div className="bildora-image-frame">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="bildora-step-img"
                      />
                    </div>
                  </div>

                  {/* Central Timeline Anchor Node */}
                  <div className="bildora-timeline-node">
                    <div className="bildora-node-dot" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
