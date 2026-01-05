
export interface MongoId {
  $oid: string;
}

export interface Project {
  _id: string;
  id: string;
  title: string;
  imageCard: string;
  altCard: string;
  shortDescription: string;
  modalId: string;
  imageModal: string;
  altModal: string;
  fullDescription: string;
  technologies: string[];
  url: string;
}

export interface SkillGroup {
  _id: string;
  category: string;
  skills: string[];
}

export interface Certificate {
  _id: string;
  certificate: string;
  institution: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: SkillGroup[];
  certificates: Certificate[];
}