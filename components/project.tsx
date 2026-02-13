'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/database';
import type { Project } from '@/type/index';
import styles from '@/styles/projects.module.css';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true) // Only Top 3-4 projects
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.sectionDivider} aria-hidden="true" />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={40} />
            <p>Loading System Architecture...</p>
          </div>
        ) : (
          /* Projects Grid (Flagship Layout) */
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <article key={project.id} className={styles.card}>
                
                {/* 1. Image Container */}
                {project.image_url && (
                  <div className={styles.imageContainer}>
                    <Image
                      src={project.image_url}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className={styles.projectImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* 2. Content */}
                <div className={styles.cardContent}>
                  <span className={styles.projectNumber}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>

                  <div className={styles.cardHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </div>
                  
                  <span className={styles.projectRole}>{project.role}</span>
                  <p className={styles.description}>{project.short_description}</p>
                  
                  <div className={styles.techStack}>
                    {project.technologies?.slice(0, 5).map((tech) => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                        <Github size={18} /> <span>Code</span>
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                        <ExternalLink size={18} /> <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VIEW ALL LINK */}
        <div className={styles.viewAllWrapper}>
          <Link href="/projects" className={styles.viewAllBtn}>
            <span>Explore Full Architecture</span>
            <ArrowRight className={styles.arrowIcon} size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;