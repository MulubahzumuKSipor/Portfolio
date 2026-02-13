'use client';

import React from 'react';
import styles from './styles/skillsCard.module.css';

interface SkillCardProps {
  id: string;
  category: string;
  skills: string[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  category,
  skills,
  activeId,
  setActiveId,
}) => {
  const isFlipped = activeId === id;

  const toggle = () => {
    setActiveId(isFlipped ? null : id);
  };

  // Show only first 3 skills on the back
  const displayedSkills = skills.slice(0, 3);
  const remainingCount = skills.length - displayedSkills.length;

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`${category} skills`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className={styles.inner}>
        {/* Front */}
        <div className={styles.front}>
          <h3 className={styles.title}>{category}</h3>
          <span className={styles.hint}>Click to view</span>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.tags}>
            {displayedSkills.map((skill, index) => (
              <span
                key={skill}
                className={styles.tag}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {skill}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className={styles.moreTag}>+{remainingCount} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
