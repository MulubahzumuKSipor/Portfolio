'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/database';
import type { Project } from '@/type/index';
import styles from '@/styles/projectPage.module.css'; 

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          // NO filtering by 'featured' - we want everything
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching archive:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        
        {/* Navigation Back */}
        <div className={styles.navHeader}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={20} />
            <span>Return to HQ</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>System Architecture <br /> <span className={styles.highlight}>Archive</span></h1>
          <p className={styles.subtitle}>
            A comprehensive collection of production-grade applications, 
            prototypes, and experimental systems.
          </p>
        </header>

        {/* Grid */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={40} />
            <p>Accessing Database...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => (
              <article key={project.id} className={styles.card}>
                
                {/* Image Area */}
                <div className={styles.imageWrapper}>
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className={styles.projectImage}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className={styles.placeholderImage} />
                  )}
                </div>

                {/* Content Area */}
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.type}>{project.project_type}</span>
                    <span className={styles.status}>{project.status}</span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.role}>{project.role}</p>
                  
                  {/* Using short_description for the grid view */}
                  <p className={styles.description}>{project.short_description}</p>

                  <div className={styles.techStack}>
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" className={styles.link}>
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" className={styles.link}>
                        <Github size={16} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}