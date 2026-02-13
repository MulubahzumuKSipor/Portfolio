'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import styles from '@/styles/footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.brand}>
          <span className={styles.logo}>Mulubahzumu.</span>
          <p className={styles.copyright}>
            © {currentYear} Mulubahzumu Kemmeh Sipor. All rights reserved.
          </p>
        </div>

        <div className={styles.socials}>
          <a 
            href="https://github.com/MulubahzumuKSipor" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.socialLink}
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/mulubahzumu-kemmeh-sipor-526a74197/"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.socialLink}
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;