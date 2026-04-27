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
              As a <strong>Software Developer</strong> with over 4 years of experience building production web applications, my focus is on delivering secure, scalable solutions. I specialize in building everything from government-grade platforms to scalable e-commerce solutions. I have a strong foundation in REST APIs, database design, authentication systems, and deployment workflows.
            </p>
            
            <p className={styles.aboutText}>
              I build end-to-end web applications using <strong>React, Next.js, TypeScript, Node.js, and PostgreSQL</strong>. Whether I am developing platforms like EventHub or an Inventory Management System, I enhance user experience through UI/UX design, performance optimization, and mobile-first approaches. Looking forward, I am eager to transition my cloud infrastructure expertise to AWS while contributing to sovereign AI and national digital transformation initiatives.
            </p>
          </div>

          {/* THE SECRET HOOK - Designed to stop the scroll */}
          <div className={styles.secretInspiration}>
            <div className={styles.secretHeader}>
              <span className={styles.secretTitle}>The Secret to My Process</span>
              <div className={styles.glowPulse} aria-hidden="true" />
            </div>
            <p className={styles.secretBody}>
              &quot;I don&apos;t just write code; I architect systems. By developing responsive, accessible, and maintainable applications with secure routing and modular architecture, I manage projects independently and collaborate seamlessly to meet precise requirements. My goal is always to improve operational efficiency and build platforms that truly scale.&quot;
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