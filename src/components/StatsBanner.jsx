import React from 'react';
import { motion } from 'framer-motion';
import { siteData } from '../data/siteData';

export default function StatsBanner() {
  return (
    <section className="stats-banner">
      <div className="container">
        <div className="stats-grid">
          {siteData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="stat-card"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
