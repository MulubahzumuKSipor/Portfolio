'use client';

import React from 'react';
import Image from 'next/image';
import { Smartphone, Globe, Terminal, Server, Cpu, Layout, Database, Layers } from 'lucide-react';
import styles from '@/styles/hero.module.css';

const skills = [
  { name: 'React Native', icon: <Smartphone size={18} /> },
  { name: 'Next.js 14', icon: <Globe size={18} /> },
  { name: 'TypeScript', icon: <Terminal size={18} /> },
  { name: 'Node.js', icon: <Server size={18} /> },
  { name: 'System Arch', icon: <Cpu size={18} /> },
  { name: 'UI/UX Design', icon: <Layout size={18} /> },
  { name: 'MongoDB', icon: <Database size={18} /> },
  { name: 'Project Mgmt', icon: <Layers size={18} /> },
];

// Triplicate the array to ensure infinite smooth scrolling without gaps
const carouselItems = [...skills, ...skills, ...skills];

const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.hero}>
      {/* Background Text - Low opacity, visible in both themes */}
      <div className={styles.giantText}>SOFTWARE ENGINEER</div>

      <div className={styles.container}>
        {/* TEXT SIDE */}
        <div className={styles.contentWrapper}>
          <span className={styles.greeting}>Mulubahzumu Kemmeh Sipor</span>
          <h1 className={styles.headline}>
            Orchestrating <br />
            <span className={styles.gradientText}>Digital Evolution</span>
          </h1>
          <p className={styles.subheadline}>
            From managing nationwide IT programs to shipping production-ready code. I build
            the systems that empower the next generation.
          </p>
        </div>

        {/* IMAGE SIDE */}
        <div className={styles.profileWrapper}>
          <Image
            src="/profilePic.png"
            alt="Mulubahzumu Kemmeh Sipor"
            width={600}
            height={800}
            className={styles.profileImage}
            priority
            quality={100}
          />
        </div>
      </div>

      {/* FOOTER CAROUSEL */}
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrack}>
          {carouselItems.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className={styles.skillCard}>
              {/* Icon keeps the brand color */}
              <span style={{ color: 'var(--brand-teal)' }}>{skill.icon}</span>
              {/* Text now uses a class instead of inline styles */}
              <span className={styles.skillText}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;