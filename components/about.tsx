'use client';

import React from 'react';
import styles from '@/styles/about.module.css';

const About: React.FC = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.sectionDivider} aria-hidden="true" />
        </div>

        <div className={styles.aboutContent}>
          <div className={styles.textContent}>
            <p className={styles.aboutText}>
              I believe the most dangerous thing in technology isn&apos;t a bug—it&apos;s a lack of intention. 
              As an <strong>IT Program Manager and Full-Stack Developer</strong>, I’ve learned that 
              building a platform is 90% strategy and 10% syntax. Whether I’m orchestrating 
              nationwide digital literacy programs like &quot;Born Before Computer&quot; or shipping 
              production-ready MERN applications, my focus is on <strong>calm execution and steady 
              emotional positioning</strong>.
            </p>
            
            <p className={styles.aboutText}>
              I don&apos;t just build interfaces; I design connections. My approach is rooted in 
              <em> Kaizen</em>—the relentless, daily improvement of systems, APIs, and myself. 
              From launching e-commerce marketplaces to optimizing real estate platforms like 
              <strong> MSI HOMES</strong>, I bridge the gap between business logic and human 
              experience without ever losing my technical edge.
            </p>
          </div>

          {/* THE SECRET HOOK - Designed to stop the scroll */}
          <div className={styles.secretInspiration}>
            <div className={styles.secretHeader}>
              <span className={styles.secretTitle}>The Secret to My Process</span>
              <div className={styles.glowPulse} aria-hidden="true" />
            </div>
            <p className={styles.secretBody}>
              &quot;I’m often the calmest person in the room because I’ve already observed 
              the reactions before the code is even deployed. I don’t force solutions; 
              I lead them. I’m building for more than just success—I’m building for 
              <strong> presence, influence, and respect</strong> in the digital landscape.&quot;
            </p>
          </div>

          <div className={styles.aboutActions}>
            <button 
              className={styles.cvButton} 
              aria-label="Download Mulubahzumu's CV"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;