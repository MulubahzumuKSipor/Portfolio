'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, BookOpen, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/database';
import styles from '@/styles/educationCard.module.css';

interface Credential {
  id: string;
  title: string;
  institution: string;
  year: string;
  category: string;
}

const Education: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const { data, error } = await supabase
          .from('credentials')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setCredentials(data || []);
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Degree': return <GraduationCap size={24} />;
      case 'Certificate': return <Award size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Education & Certifications</h2>
          <div className={styles.sectionDivider} aria-hidden="true" />
          <p className={styles.sectionSubtitle}>
            A decade of continuous learning, from early foundations to advanced software engineering.
          </p>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={40} />
          </div>
        ) : (
          <div className={styles.grid}>
            {credentials.map((item) => (
              <div key={item.id} className={`${styles.card} ${styles[item.category]}`}>

                {/* Year Badge */}
                <div className={styles.yearBadge}>
                  <Calendar size={14} />
                  <span>{item.year}</span>
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.iconWrapper}>
                    {getIcon(item.category)}
                  </div>
                  <div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.institution}>{item.institution}</p>
                  </div>
                </div>

                {/* Decorative background accent */}
                <div className={styles.glow} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;