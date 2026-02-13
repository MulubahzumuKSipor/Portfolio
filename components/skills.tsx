'use client';

import React, { useEffect, useState } from 'react';
import {
  Layout, Server, Cpu, Terminal,
  Layers, Database, Globe, ShieldCheck,
  Zap, Loader2
} from 'lucide-react';
import { supabase } from '@/lib/database';
import type { Skill } from '@/type/index';
import styles from '@/styles/skillsCard.module.css';

// 1. Configuration: Icons & "Strategy Statements"
// This moves us from "List" to "Architectural Context"
const categoryConfig: Record<string, { icon: React.ReactNode; strategy: string }> = {
  Frontend: {
    icon: <Layout size={28} />,
    strategy: "Orchestrating pixel-perfect, accessible (WCAG) interfaces with sub-100ms interaction latency."
  },
  Backend: {
    icon: <Server size={28} />,
    strategy: "Designing secure, scalable MVC architectures with Role-Based Access Control (RBAC)."
  },
  Core: {
    icon: <Cpu size={28} />,
    strategy: "Building type-safe, object-oriented systems that prioritize long-term maintainability."
  },
  Design: {
    icon: <Globe size={28} />,
    strategy: "Translating brand identity into responsive, mobile-first digital experiences."
  },
  Tools: {
    icon: <Terminal size={28} />,
    strategy: "Automating deployment pipelines and ensuring version control integrity."
  },
  Management: {
    icon: <Layers size={28} />,
    strategy: "Bridging the gap between technical complexity and business KPIs."
  }
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Grouping Logic
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Specific Order for the Grid
  const categoryOrder = ['Frontend', 'Backend', 'Core', 'Design', 'Management', 'Tools'];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Technical Arsenal</h2>
          <div className={styles.sectionDivider} aria-hidden="true" />
          <p className={styles.sectionSubtitle}>
            A curated stack of technologies deployed to build scalable, high-performance systems.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={40} />
          </div>
        ) : (
          /* The Command Deck Grid */
          <div className={styles.grid}>
            {categoryOrder.map((category) => {
              if (!groupedSkills[category]) return null;

              const config = categoryConfig[category] || {
                icon: <Terminal size={28} />,
                strategy: "Advanced technical implementation."
              };

              return (
                <div key={category} className={styles.card}>
                  {/* The "Scanner" Light Effect */}
                  <div className={styles.scanner} />

                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      {config.icon}
                    </div>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                  </div>

                  {/* The "Strategy" (Show, Don't Tell) */}
                  <div className={styles.strategyBlock}>
                    <span className={styles.label}>Protocol:</span>
                    <p className={styles.strategyText}>{config.strategy}</p>
                  </div>

                  {/* Skills Chips */}
                  <div className={styles.skillsList}>
                    {groupedSkills[category].map((skill) => (
                      <span key={skill.id} className={styles.skillChip}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;