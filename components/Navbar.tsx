'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Sun, Moon } from 'lucide-react';
import styles from '@/styles/navbar.module.css';
import { useTheme } from '@/context/ThemeContext'; // Import your global context

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  // Use global theme context instead of local state
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Handle Header Background on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Scroll Spy using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>

        {/* LOGO - Reacts to global theme */}
        <button
          onClick={() => scrollToSection('home')}
          className={styles.logoBtn}
          aria-label="Return to Home"
        >
          <div className={styles.logoWrapper}>
            <Image
              src={isDarkMode ? "/logo-white.png" : "/logo-black.png"}
              alt="Mulubahzumu Logo"
              width={40}
              height={40}
              className={styles.logoImage}
              priority
            />
          </div>
          <span className={styles.logoText}>Mulubahzumu</span>
        </button>

        {/* DESKTOP NAV */}
        <nav className={styles.nav} aria-label="Desktop Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
            >
              {item.label}
            </button>
          ))}

          {/* Theme Toggle triggers global context function */}
          <button
            onClick={toggleTheme}
            className={styles.navLink}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* MOBILE ACTIONS */}
        <div className={styles.mobileActions}>
          <button
            onClick={toggleTheme}
            className={styles.mobileThemeBtn}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button
            className={styles.menuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <nav className={styles.mobileMenu}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.mobileMenuLink} ${activeSection === item.id ? styles.active : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}