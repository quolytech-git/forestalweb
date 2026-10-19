import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Camera, PlayCircle } from 'lucide-react';
import { galleryGroups } from '../data/galleryData';

const galleryCardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
};

// Gallery card: cover photo that cross-fades to a work-in-progress photo on hover
export default function GalleryCard({ gallery, onNavigate, lang = 'en' }) {
  const isSq = lang === 'sq';
  const title = isSq ? gallery.titleSq : gallery.title;
  const group = galleryGroups.find((g) => g.key === gallery.group);
  const open = () => onNavigate && onNavigate('gallery-detail', gallery.slug);

  return (
    <motion.div
      variants={galleryCardVariants}
      className="project-card gl-card"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={isSq ? `Hap galerinë: ${title}` : `Open gallery: ${title}`}
    >
      <div className="gl-card-media">
        <img src={gallery.coverImage} alt={title} className="gl-card-img" loading="lazy" draggable="false" />
        <img src={gallery.coverAltImage} alt="" aria-hidden="true" className="gl-card-img alt" loading="lazy" draggable="false" />

        <div className="gl-card-badges">
          <span className="gl-badge">
            <Camera size={13} strokeWidth={2.4} />
            {gallery.photos.length} {isSq ? 'foto' : 'photos'}
          </span>
          {gallery.videoList.length > 0 && (
            <span className="gl-badge">
              <PlayCircle size={13} strokeWidth={2.4} />
              {gallery.videoList.length} {isSq || gallery.videoList.length === 1 ? 'video' : 'videos'}
            </span>
          )}
        </div>

        <div className="gl-card-open" aria-hidden="true">
          <ArrowUpRight size={18} strokeWidth={2.4} />
        </div>
      </div>

      <div className="project-card-info">
        <div>
          <h3 className="project-card-title">{title}</h3>
          <p className="project-card-loc">{isSq ? gallery.locationSq : gallery.location}</p>
        </div>
        <div className="project-category-tag">{isSq ? group?.labelSq : group?.label}</div>
      </div>
    </motion.div>
  );
}
