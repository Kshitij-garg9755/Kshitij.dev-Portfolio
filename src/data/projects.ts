export type ProjectTheme = 'agriculture' | 'internship' | 'education' | 'hosting';
export type ProjectStatus = 'In Progress' | 'Completed';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  category: string;
  thumbnail?: string;
  features: string[];
  status?: ProjectStatus;
  /** Selects the existing editorial visual treatment; it is not project metadata. */
  theme: ProjectTheme;
}

// Keep details factual. Leave unknown values empty until they can be verified.
export const projects: Project[] = [
  {
    id: 'kisan-mantri',
    title: 'Kisan Mantri',
    shortDescription: 'An agriculture-focused project for crop disease and pest management.',
    description: '',
    githubUrl: 'https://github.com/Kshitij-garg9755/Kisan-Mantri',
    liveUrl: 'https://kisanmantri.netlify.app',
    technologies: [],
    category: 'Agriculture',
    features: [],
    theme: 'agriculture',
  },
  {
    id: 'kshitij-dev-portfolio',
    title: 'Kshitij.dev Portfolio',
    shortDescription: 'Personal portfolio website.',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: [],
    category: 'Web Development',
    features: [],
    theme: 'internship',
  },
  {
    id: 'smart-education-platform',
    title: 'Smart Education Platform',
    shortDescription: 'A digital learning platform project.',
    description: '',
    githubUrl: 'https://github.com/Kshitij-garg9755/SMART-EDUCATION-PLATFORM',
    liveUrl: 'https://smarteducationplatform.netlify.app',
    technologies: [],
    category: 'Web Development',
    features: [],
    status: 'Completed',
    theme: 'education',
  },
  {
    id: 'cloudnova-hosting',
    title: 'CloudNova Hosting',
    shortDescription: 'A hosting project exploring a clear, focused web experience for cloud services.',
    description: '',
    githubUrl: 'https://github.com/Kshitij-garg9755/CLOUDNOVA-HOSTING',
    liveUrl: 'https://cloudnova-hosting.netlify.app',
    technologies: [],
    category: 'Web Development',
    features: [],
    theme: 'hosting',
  },
  {
    id: 'kshitij-auth-engine',
    title: 'Kshitij Auth Engine',
    shortDescription: 'A Python FastAPI authentication system with Email OTP, JWT, Argon2 password hashing and refresh token rotation.',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: ['Python', 'FastAPI', 'JWT', 'Argon2'],
    category: 'Backend Development',
    features: ['Email OTP', 'JWT authentication', 'Argon2 password hashing', 'Refresh token rotation'],
    theme: 'internship',
  },
];

/** Return only public web links; malformed, localhost, and non-web URLs are omitted. */
export function getPublicProjectUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    const isLocalHost = hostname === 'localhost'
      || hostname.endsWith('.localhost')
      || hostname === '127.0.0.1'
      || hostname === '::1'
      || hostname === '0.0.0.0';

    if (!['https:', 'http:'].includes(url.protocol) || !hostname || isLocalHost || url.username || url.password) {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

/** Project artwork is served from the site's own public images folder. */
export function getProjectThumbnail(value: string | undefined): string | undefined {
  if (!value || !/^\/images\/projects\/[\w./-]+$/.test(value) || value.includes('..')) return undefined;
  return value;
}

