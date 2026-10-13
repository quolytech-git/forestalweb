import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const STEPS_EN = [
  {
    step: "01 — Consultation",
    title: "Understanding your needs",
    description: "We talk through what you need, how the property is used and what you want to achieve.",
    image: 'https://framerusercontent.com/images/UYh9N4KBSOPSDSa6Sxa7Afu1k.png',
    alt: "Consultation with the client about the property",
  },
  {
    step: "02 — Assessment",
    title: "Site visit and assessment",
    description: "Where needed, we visit the property to check its condition, measurements and any constraints on the work.",
    image: 'https://framerusercontent.com/images/W6vN3FAgSPCgF5b05VV6w1jyF7E.png',
    alt: "Assessment of the property on site",
  },
  {
    step: "03 — Planning",
    title: "Scope of work and quotation",
    description: "We define the work, materials and order of tasks, and send you a quotation. Some projects may need a site visit before we can quote.",
    image: 'https://framerusercontent.com/images/6LJyc2F6qLQpFWiHhhCXZpjhRs.png',
    alt: "Planning the scope of work",
  },
  {
    step: "04 — Execution",
    title: "Carrying out the agreed work",
    description: "Our team carries out the work as agreed, keeping the site organised and the property protected.",
    image: 'https://framerusercontent.com/images/9EY2KR9LwqjXO6Pc9nCUnTMxZ34.png',
    alt: "Construction work in progress",
  },
  {
    step: "05 — Communication",
    title: "Updates during the work",
    description: "You are kept informed as the work progresses, and any change to the scope is discussed with you first.",
    image: 'https://framerusercontent.com/images/OwqNfEvtHZzCWn5PuSM3lfVPM.png',
    alt: "Detail of work in progress",
  },
  {
    step: "06 — Handover",
    title: "Final inspection and handover",
    description: "We inspect the finished work with you, deal with any final points and hand over a clean space.",
    image: 'https://framerusercontent.com/images/gXYIga7MVhx8NlNKRVqZZdh2u8.png',
    alt: "Finished space ready for handover",
  },
];

const STEPS_SQ = [
  {
    step: "01 — Konsulta",
    title: "Kuptimi i nevojave tuaja",
    description: "Bisedojmë për atë që ju nevojitet, si përdoret prona dhe çfarë dëshironi të arrini.",
    image: 'https://framerusercontent.com/images/UYh9N4KBSOPSDSa6Sxa7Afu1k.png',
    alt: "Konsultë me klientin për pronën",
  },
  {
    step: "02 — Vlerësimi",
    title: "Vizitë dhe vlerësim në objekt",
    description: "Kur nevojitet, vizitojmë pronën për të parë gjendjen, matjet dhe çdo kufizim për punën.",
    image: 'https://framerusercontent.com/images/W6vN3FAgSPCgF5b05VV6w1jyF7E.png',
    alt: "Vlerësim i pronës në vend",
  },
  {
    step: "03 — Planifikimi",
    title: "Objekti i punës dhe preventivi",
    description: "Përcaktojmë punën, materialet dhe radhën e detyrave dhe ju dërgojmë preventivin. Disa projekte mund të kërkojnë vizitë në vend para preventivit.",
    image: 'https://framerusercontent.com/images/6LJyc2F6qLQpFWiHhhCXZpjhRs.png',
    alt: "Planifikimi i objektit të punës",
  },
  {
    step: "04 — Zbatimi",
    title: "Kryerja e punës së rënë dakord",
    description: "Ekipi ynë e kryen punën siç është rënë dakord, me kantier të organizuar dhe pronë të mbrojtur.",
    image: 'https://framerusercontent.com/images/9EY2KR9LwqjXO6Pc9nCUnTMxZ34.png',
    alt: "Punime ndërtimi në zhvillim",
  },
  {
    step: "05 — Komunikimi",
    title: "Njoftime gjatë punës",
    description: "Ju informojmë për ecurinë e punës, dhe çdo ndryshim në objektin e punës diskutohet fillimisht me ju.",
    image: 'https://framerusercontent.com/images/OwqNfEvtHZzCWn5PuSM3lfVPM.png',
    alt: "Detaj i punës në zhvillim",
  },
  {
    step: "06 — Dorëzimi",
    title: "Kontrolli final dhe dorëzimi",
    description: "E kontrollojmë punën e përfunduar së bashku me ju, rregullojmë pikat e fundit dhe dorëzojmë një ambient të pastër.",
    image: 'https://framerusercontent.com/images/gXYIga7MVhx8NlNKRVqZZdh2u8.png',
    alt: "Hapësirë e përfunduar gati për dorëzim",
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
            {isSq ? 'Nga konsulta te dorëzimi.' : 'From consultation to handover.'}
          </h2>
          <p className="bildora-timeline-subtitle">
            {isSq
              ? 'Çdo projekt fillon me kuptimin e pronës, përcaktimin e objektit të punës dhe rënien dakord për hapat praktikë për të ecur përpara.'
              : 'Every project starts with understanding the property, defining the scope of work and agreeing on the practical steps needed to move forward.'}
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
