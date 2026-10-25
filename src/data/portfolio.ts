export const profile = {
  name: 'Kshitij Garg',
  role: 'Full-Stack Developer & AI Enthusiast',
  roles: ['Full-Stack Developer', 'Python Developer', 'AI Enthusiast', 'Creative Technologist'],
  education: 'B.Tech Computer Science Engineering',
  introduction: 'I am a Computer Science Engineering student interested in full-stack development, Python, AI-powered applications, and building practical software projects.',
  technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
  tools: ['VS Code', 'Git', 'GitHub', 'Codex'],
  interests: ['Full-stack development', 'AI-powered applications', 'Interactive web experiences'],
  email: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  githubUrl: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Kshitij-garg9755/Kshitij-garg9755',
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/kshitij-garg-202b0329b',
};

export const skillGroups = [
  { title: 'Frontend', number: '01', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Programming', number: '02', items: ['Python'] },
  { title: 'Tools & workflow', number: '03', items: ['VS Code', 'Git', 'GitHub', 'Codex'] },
];
