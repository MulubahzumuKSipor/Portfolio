'use client';

import {MongoId, Project, SkillGroup, Certificate, PortfolioData}  from '@/type/portfolio';
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, User, Loader2, Award, Code2, Moon, Sun } from 'lucide-react';
import styles from './styles/Portfolio.module.css';



const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setData] = useState<PortfolioData>({
    projects: [],
    skills: [],
    certificates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const result: PortfolioData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} size={48} />
        <p className={styles.loadingText}>Loading Portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
          <p className={styles.errorTitle}>Failed to Load Portfolio</p>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.portfolio}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navContainer}>
          <button onClick={() => scrollToSection('home')} className={styles.logo}>
            <Image
              src={isDarkMode ? "/logo-white.png" : "/logo-black.png"}
              alt="Logo"
              width={40}
              height={40}
            />
            <span>Mulubahzumu Sipor</span>
          </button>

          <div className={styles.navLinks}>
            {['home', 'about', 'skills', 'projects', 'certificates', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`${styles.navLink} ${activeSection === section ? styles.navLinkActive : ''}`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className={styles.navActions}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            {['home', 'about', 'skills', 'projects', 'certificates', 'contact'].map((section) => (
              <button key={section} onClick={() => scrollToSection(section)} className={styles.mobileMenuItem}>
                {section}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroBackground} />

        <div className={styles.heroContainer}>
          {/* Text Column */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Mulubahzumu K. <span className={styles.heroTitleGradient}>Sipor</span>
            </h1>
            <p className={styles.heroSubtitle1}>
              Full-Stack Developer | MERN Stack | Web Enthusiast
            </p>
            <p className={styles.heroSubtitle}>
              Crafting robust web applications with modern technologies and elegant design
            </p>
            <div className={styles.heroActions}>
              <button onClick={() => scrollToSection('projects')} className={styles.heroCta}>
                View My Work
              </button>
              <div className={styles.heroSocials}>
                <a href="https://github.com/MulubahzumuKSipor" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/mulubahzumu-kemmeh-sipor-526a74197/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <Linkedin size={20} />
                </a>
                <a href="mailto:msipor@byupathway.edu" className={styles.socialLink}>
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className={styles.heroImageWrapper}>
            {/* <div className={styles.heroAvatar}> */}
              <Image
                src="/profilePic.png"
                alt="Profile"
                width={400}
                height={400}
              />
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.sectionDivider} />
          </div>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              I’m a <strong>Full-Stack Developer and Web Enthusiast</strong> specializing in the <strong>MERN stack</strong>. I build <strong>fast, scalable, and user-centered web applications</strong> with clean UI, accessible design, and optimal performance. I also have strong front-end expertise in <strong>HTML, CSS, and JavaScript</strong>, focusing on performance, clean architecture, and real-world usability.
            </p>
            <p className={styles.aboutText}>
              I’ve developed <strong>production-level projects from scratch</strong>, including e-commerce marketplaces and dynamic web apps, consistently achieving <strong>90%+ Lighthouse scores</strong> for performance, SEO, and accessibility. I think beyond code—balancing design, user experience, and business impact. <br /><br />
              I thrive on solving complex problems, working independently or in teams, and building interfaces that are both <strong>scalable, intuitive, and visually elegant</strong>, delivering real-world impact.
            </p>
          </div>
          <div className={styles.aboutActions}>
            <button className={styles.button} >Download CV</button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.skillTitle}>Technical Skills</h2>
            <div className={styles.sectionDivider} />
          </div>
          <div className={styles.skillsGrid}>
            {data.skills.map((group) => (
              <div key={group._id} className={styles.skillCard}>
                <h3 className={styles.skillCategory}>{group.category}</h3>
                <div className={styles.skillTags}>
                  {group.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <div className={styles.sectionDivider} />
            <p className={styles.sectionSubtitle}>{data.projects.length} projects and counting</p>
          </div>
          <div className={styles.projectsGrid}>
            {data.projects.map((project) => (
              <article key={project._id} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image src={project.imageCard} alt={project.altCard} width={200} height={200} />
                  <div className={styles.projectOverlay}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <ExternalLink size={20} />
                      <span>View Project</span>
                    </a>
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectText}>{project.title}</h3>
                  <div
                    className={styles.projectDescription}
                    dangerouslySetInnerHTML={{ __html: project.shortDescription }}
                  />
                  <div className={styles.projectTech}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techBadge2}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.skillTitle}>Certifications</h2>
            <div className={styles.sectionDivider} />
          </div>
          <div className={styles.certificatesGrid}>
            {data.certificates.map((cert) => (
              <div key={cert._id} className={styles.certificateCard}>
                <div className={styles.certificateIcon}>
                  <Award size={24} />
                </div>
                <div className={styles.certificateContent}>
                  <h3 className={styles.certificateTitle}>{cert.certificate}</h3>
                  <p className={styles.certificateInstitution}>{cert.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.section}>
        <div className={styles.containerSmall}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <div className={styles.sectionDivider} />
            <p className={styles.sectionSubtitle}>{"Let's discuss your next project"}</p>
          </div>
          <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formRow}>
              <input type="text" placeholder="Your Name" className={styles.formInput} required />
              <input type="email" placeholder="Email Address" className={styles.formInput} required />
            </div>
            <input type="text" placeholder="Subject" className={styles.formInput} required />
            <textarea rows={6} placeholder="Your Message" className={styles.formTextarea} required />
            <button type="submit" className={styles.formButton}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Mulubahzumu Kemmeh Sipor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;