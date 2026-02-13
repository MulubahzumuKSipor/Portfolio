// types/index.ts

// 1. PROJECT TYPE
export interface Project {
  id: string;
  title: string;
  role: string;               // e.g., "Lead Full-Stack Developer"
  project_type: string;       // e.g., "Corporate Platform"
  short_description: string;  // For the grid card
  description: string;        // Full text for modal
  technologies: string[];     // Array of tech used
  focus_areas: string[];      // Specific contributions
  image_url: string;          // Main card image
  live_url: string | null;
  github_url: string | null;
  status: string;             // e.g., "Production", "Prototype"
  featured: boolean;
  sort_order: number;
}

// 2. SKILL TYPE
export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Core' | 'Design' | 'Tools';
  icon_name: string;          // Lucide icon name string
  featured: boolean;
  sort_order: number;
}

// 3. ACHIEVEMENT TYPE
export interface Achievement {
  id: string;
  title: string;
  metric: string;             // e.g., "90%+"
  description: string;
  sort_order: number;
}

// 4. PROFILE TYPE
export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio_intro: string;
  resume_url: string | null;
  email: string;
  github_url: string | null;
  linkedin_url: string | null;
  phone: string | null;
}