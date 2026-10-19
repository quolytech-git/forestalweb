import React from 'react';
import { motion } from 'framer-motion';
import ReviewerIcon from './ReviewerIcon';


const Star5 = () => (
  <div className="reviews-stars-row">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="15"
        height="15"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 8.5 12.859 L 13.753 16 L 12.359 10.08 L 17 6.097 L 10.889 5.583 L 8.5 0 L 6.112 5.583 L 0 6.097 L 4.641 10.08 L 3.247 16 Z"
          fill="#f59e0b"
        />
      </svg>
    ))}
  </div>
);

// Verified client reviews go here (published only with each client's permission).
// Each review: { quote, quoteSq, image, alt, altSq, avatar, name, nameSq, location, locationSq }.
// The section stays hidden while this list is empty.
const reviewsData = [];

export default function ReviewsSection({ lang = 'en' }) {
  const isSq = lang === 'sq';
  if (reviewsData.length === 0) return null;
  return (
    <section id="reviews" className="renovate-reviews-section">
      <div className="container">
        {/* Top Header Split: Title on Left, Overlapping Avatars & Rating on Right */}
        <div className="reviews-header-split">
          <div className="reviews-header-left">
            <span className="reviews-eyebrow">{isSq ? '// Vlerësimet' : '// Reviews'}</span>
            <h2 className="reviews-title">{isSq ? 'Çfarë thonë klientët tanë.' : 'What our clients say.'}</h2>
          </div>

          <div className="reviews-header-right">
            <div className="reviews-avatars-cluster">
              <ReviewerIcon className="cluster-avatar" />
              <ReviewerIcon className="cluster-avatar" />
              <ReviewerIcon className="cluster-avatar" />
            </div>
            <div className="reviews-header-score">
              <Star5 />
              <span className="reviews-score-text">{isSq ? 'Vlerësimet e verifikuara së shpejti' : 'Verified reviews coming soon'}</span>
            </div>
          </div>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="reviews-cards-grid">
          {reviewsData.map((card, idx) => (
            <motion.div
              key={idx}
              className="review-card-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <Star5 />
                <p className="review-card-quote">{isSq ? card.quoteSq : card.quote}</p>
                <div className="review-card-media">
                  <img
                    src={card.image}
                    alt={isSq ? card.altSq : card.alt}
                    className="review-card-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="review-card-client">
                <ReviewerIcon className="client-avatar-circle" />
                <div className="client-info-col">
                  <span className="client-name-text">{isSq ? card.nameSq : card.name}</span>
                  <span className="client-location-text">{isSq ? card.locationSq : card.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3-Column Stats Bar */}
        <div className="reviews-stats-bar">
          <div className="stats-bar-item">
            <span className="stats-bar-text">{isSq ? 'Vetëm vlerësime të verifikuara' : 'Verified reviews only'}</span>
          </div>
          <div className="stats-bar-item">
            <span className="stats-bar-text">{isSq ? 'Publikuar me lejen e klientit' : 'Published with client consent'}</span>
          </div>
          <div className="stats-bar-item">
            <span className="stats-bar-text">{isSq ? 'Projekte reale, klientë realë' : 'Real projects, real clients'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
