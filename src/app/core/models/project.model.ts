export interface Project {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  imageZoom?: number;
  screenshots?: string[];
  githubUrl?: string;
  demoUrl?: string;
  apkUrl?: string;
  featured: boolean;
  createdAt?: string;
}
