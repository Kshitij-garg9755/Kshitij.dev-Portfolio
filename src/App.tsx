import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, DownloadIcon, GithubMark, LinkedInMark, MailMark, MenuIcon } from './components/Icons';
import { HeroScene } from './components/HeroScene';
import { profile, skillGroups } from './data/portfolio';
import { getProjectThumbnail, getPublicProjectUrl, projects } from './data/projects';
import CertificatesSection from './sections/CertificatesSection';
import ProjectsSection from './sections/ProjectsSection';

const navItems = [
  { label: 'Home', to: '/', hash: '' },
  { label: 'About', to: '/about', hash: '' },
  { label: 'Expertise', to: '/expertise', hash: '' },
  { label: 'Work', to: '/projects', hash: '' },
  { label: 'Certificates', to: '/certificates', hash: '' },
  { label: 'Resume', to: '/resume', hash: '' },
  { label: 'Contact', to: '/contact', hash: '' },
];

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Kshitij.dev — Kshitij Garg', description: 'Kshitij Garg is a Computer Science Engineering student interested in full-stack development, Python, AI, and building practical software.' },
  '/about': { title: 'About — Kshitij.dev', description: 'Meet Kshitij Garg, a Computer Science Engineering student learning full-stack development and building practical software projects.' },
  '/skills': { title: 'Skills — Kshitij.dev', description: 'Explore Kshitij Garg’s confirmed frontend, Python, development tools, and areas of interest.' },
  '/expertise': { title: 'Expertise — Kshitij.dev', description: 'Explore Kshitij Garg’s development focus, current skills, tools, and interests.' },
  '/projects': { title: 'Projects — Kshitij.dev', description: 'Explore selected project work by Kshitij Garg, with honest project details and interactive visual previews.' },
  '/certificates': { title: 'Certificates — Kshitij.dev', description: 'Verified certificates and professional learning from Kshitij Garg.' },
  '/resume': { title: 'Resume — Kshitij.dev', description: 'View or download Kshitij Garg’s resume when the public PDF is available.' },
  '/contact': { title: 'Contact — Kshitij.dev', description: 'Contact Kshitij Garg through public professional profiles or a configured email address.' },
};

const currentYear = new Date().getFullYear();

function Header() {
  const location = useLocation();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const menuOpen = openMenuPath === location.pathname;
  useEffect(() => {
    if (!location.hash) return;
    const target = location.hash.slice(1);
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [location.pathname, location.hash]);
  return (
    <header id="top" className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Kshitij.dev home"><span className="wordmark-mark">k<span>.</span></span><span>Kshitij<span className="muted">.dev</span></span></Link>
        <nav id="main-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => <NavLink key={item.label} to={{ pathname: item.to, hash: item.hash }} end={item.label === 'Home'} className={({ isActive }) => `nav-link${isActive && (location.hash === item.hash || (!location.hash && item.label === 'Home')) ? ' active' : ''}`}>{item.label}</NavLink>)}
          <Link className="nav-cta" to="/contact">Let’s talk <ArrowUpRight /></Link>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setOpenMenuPath(menuOpen ? null : location.pathname)}><MenuIcon close={menuOpen} /></button>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-intro"><Link className="wordmark footer-wordmark" to="/"><span className="wordmark-mark">k<span>.</span></span><span>Kshitij<span className="muted">.dev</span></span></Link><p>Curious mind. Thoughtful builds.<br />Always learning what’s next.</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><span className="footer-label">EXPLORE</span>{navItems.map((item) => <Link key={item.label} to={{ pathname: item.to, hash: item.hash }}>{item.label}</Link>)}<Link to="/skills">Skills</Link><Link to="/certificates">Certificates</Link><Link to="/resume">Resume</Link><Link to="/projects">All projects</Link></nav>
      <div className="footer-socials"><span className="footer-label">ELSEWHERE</span><a href={profile.githubUrl} target="_blank" rel="noreferrer"><GithubMark /> GitHub <ArrowUpRight /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><LinkedInMark /> LinkedIn <ArrowUpRight /></a>{profile.email && <a href={`mailto:${profile.email}`}><MailMark /> Email <ArrowUpRight /></a>}</div>
    </div>
    <div className="footer-bottom"><span>© {currentYear} Kshitij Garg · Designed & built with care</span><a className="back-top" href="#top">Back to top ↑</a></div>
  </footer>;
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: ReactNode; detail?: string }) {
  return <div className="section-heading"><span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span><h1>{title}</h1>{detail && <p>{detail}</p>}</div>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return <motion.main className="page-main" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}>{children}</motion.main>;
}

function HomePage() {
  const reduceMotion = useReducedMotion();
  const chapters = ['INTRODUCTION', 'ABOUT ME', 'MY EXPERTISE', 'SELECTED WORK', 'CONTACT'];
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  return <PageFrame><div className="immersive-shell">
    <nav className="chapter-rail" aria-label="Section progress">{chapters.map((chapter, index) => <a href={`#chapter-${index + 1}`} key={chapter} aria-label={`${String(index + 1).padStart(3, '0')} ${chapter}`}><span>{String(index + 1).padStart(3, '0')}</span><i /></a>)}</nav>
    <section id="chapter-1" className="chapter hero-chapter" aria-labelledby="hero-title"><div className="chapter-top"><span>001 / 005 � INTRODUCTION</span><span>INDEPENDENT DEVELOPER � JABALPUR, INDIA</span></div><div className="hero-scene"><HeroScene /></div><div className="hero-editorial"><span className="eyebrow"><span className="eyebrow-dot" />KSHITIJ GARG � FULL STACK DEVELOPER</span><h1 id="hero-title">BUILDING DIGITAL<br /><span>EXPERIENCES.</span></h1><p>I�m Kshitij Garg, a Full Stack Developer passionate about building modern web applications, intelligent systems and creative digital experiences.</p><div className="hero-actions"><button className="button button-primary" onClick={() => goTo('chapter-5')}>Get in touch <ArrowUpRight /></button><button className="button button-quiet" onClick={() => goTo('chapter-4')}>Explore my work <ArrowRight /></button></div></div><div className="chapter-bottom"><span>01 � DESIGN � CODE � CURIOSITY</span><button onClick={() => goTo('chapter-2')}>SCROLL TO EXPLORE ?</button><span>EST. 2024 � CONTINUOUSLY LEARNING</span></div></section>
    <section id="chapter-2" className="chapter editorial-chapter about-chapter"><div className="chapter-top"><span>002 / 005 � ABOUT ME</span><span>PROFILE / 01</span></div><div className="chapter-content"><span className="eyebrow">A LITTLE CONTEXT</span><h2>THE DEVELOPER<br />BEHIND THE CODE.</h2><div className="about-editorial"><p className="about-statement">I�m Kshitij Garg, a computer science student interested in building useful digital products with care.</p><div><p>I am a passionate software developer focused on creating useful digital products through modern frontend technologies, Python backend development and intelligent integrations.</p><dl><div><dt>EDUCATION</dt><dd>B.Tech Computer Science Engineering</dd></div><div><dt>INSTITUTION</dt><dd>Shri Ram Group of Institutions, Jabalpur</dd></div><div><dt>GRADUATION</dt><dd>Expected 2027</dd></div></dl></div></div></div><div className="chapter-bottom"><span>02 � PROFILE</span><button onClick={() => goTo('chapter-3')}>NEXT CHAPTER ?</button><Link to="/about">MORE ABOUT ME ?</Link></div></section>
    <section id="chapter-3" className="chapter editorial-chapter expertise-chapter"><div className="chapter-top"><span>003 / 005 � MY EXPERTISE</span><span>CAPABILITIES / 03</span></div><div className="chapter-content"><span className="eyebrow">THOUGHTFUL BUILDS, FROM FRONT TO BACK</span><h2>WHAT I DO.</h2><div className="expertise-list">{[{n:'01',title:'FRONTEND DEVELOPMENT',text:'HTML, CSS, JavaScript, Responsive UI and Interactive Experiences.'},{n:'02',title:'BACKEND DEVELOPMENT',text:'Python, FastAPI, Flask, REST APIs and Database Integration.'},{n:'03',title:'FULL STACK APPLICATIONS',text:'Authentication, Email OTP, API Integration and Deployment.'}].map(item=><article key={item.n}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight /></article>)}</div><div className="personal-toolkit"><div><span className="personal-kicker">MY CURRENT TOOLKIT</span><p>{profile.technologies.join(' · ')}<span>{profile.tools.join(' · ')}</span></p></div><Link to="/skills">ALL SKILLS <ArrowUpRight /></Link></div><div className="chapter-paths"><span className="personal-kicker">MORE OF MY JOURNEY</span><Link to="/about">About me <ArrowUpRight /></Link><Link to="/certificates">Certificates <ArrowUpRight /></Link><Link to="/resume">Resume <ArrowUpRight /></Link></div></div><div className="chapter-bottom"><span>03 � CAPABILITIES</span><button onClick={() => goTo('chapter-4')}>NEXT CHAPTER ?</button><Link to="/skills">VIEW SKILLS ?</Link></div></section>
    <section id="chapter-4" className="chapter work-chapter"><div className="chapter-top"><span>004 / 005 � SELECTED WORK</span><span>PROJECTS / {String(projects.length).padStart(2,'0')}</span></div><div className="chapter-content"><div className="work-heading"><div><span className="eyebrow">A FEW THINGS MADE REAL</span><h2>SELECTED<br />PROJECTS.</h2></div><Link to="/projects">FULL PROJECT INDEX <ArrowUpRight /></Link></div><ProjectGallery items={projects} variant="home" /></div><div className="chapter-bottom"><span>04 � SELECTED WORK</span><button onClick={() => goTo('chapter-5')}>NEXT CHAPTER ?</button><span>BUILD � LEARN � REPEAT</span></div></section>
    <section id="chapter-5" className="chapter contact-chapter"><div className="chapter-top"><span>005 / 005 � CONTACT</span><span>AVAILABLE FOR GOOD CONVERSATIONS</span></div><div className="contact-editorial"><span className="eyebrow">HAVE AN IDEA?</span><h2>LET�S BUILD<br /><span>IT.</span></h2><p>Have a question, an idea, or an opportunity to share? I�d be glad to hear from you.</p><Link className="button button-primary" to="/contact">Get in touch <ArrowUpRight /></Link><div className="contact-links"><a href={profile.githubUrl} target="_blank" rel="noreferrer">GITHUB ?</a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LINKEDIN ?</a>{profile.email && <a href={`mailto:${profile.email}`}>{profile.email.toUpperCase()} ?</a>}</div></div><div className="chapter-bottom"><span>05 � END OF TRANSMISSION</span><a href="#chapter-1">BACK TO THE BEGINNING ?</a><span>� {currentYear} KSHITIJ GARG</span></div></section>
  </div></PageFrame>;
}
function AboutPage() {
  return <PageFrame><section className="inner-page wrap about-page">
    <SectionHeading eyebrow="About me" title={<>Curious by nature.<br /><span className="serif-accent">Developer by choice.</span></>} detail="A little about what I’m learning, what I care about, and how I like to build." />
    <div className="about-layout">
      <div className="about-note"><span className="note-index">01 / INTRODUCTION</span><p className="about-lead">{profile.introduction}</p><p>I’m at the beginning of my professional journey, building a strong foundation through study, experimentation, and practical software projects. I like understanding how a product fits together—from the interface a person sees to the logic behind it.</p><p>My focus is to keep learning, stay curious, and make useful things with care. This portfolio will grow as I have real work and learning milestones to share.</p></div>
      <aside className="about-card"><div className="avatar-placeholder" aria-hidden="true">KG<span>✳</span></div><span className="card-label">THE BASICS</span><dl><div><dt>Name</dt><dd>{profile.name}</dd></div><div><dt>Focus</dt><dd>{profile.role}</dd></div><div><dt>Education</dt><dd>{profile.education}</dd></div><div><dt>Approach</dt><dd>Learn, make, refine</dd></div></dl></aside>
    </div>
    <div className="about-lower-grid">
      <section className="about-subsection"><span className="note-index">02 / DEVELOPMENT INTERESTS</span><h2>What keeps<br /><span className="serif-accent">me curious.</span></h2><div className="about-interest-list">{profile.interests.map((interest, index) => <div key={interest}><span>0{index + 1}</span><strong>{interest}</strong><ArrowUpRight /></div>)}</div></section>
      <section className="about-subsection about-learning"><span className="note-index">03 / ONGOING LEARNING</span><h2>Built one<br /><span className="serif-accent">step at a time.</span></h2><p>My learning path is active and evolving. I’m strengthening my core programming and web skills, then applying them through projects that help me understand the whole development process.</p><Link className="text-link" to="/skills">See my current toolkit <ArrowRight /></Link><div className="learning-stages"><span>STUDY</span><i /><span>BUILD</span><i /><span>REFINE</span></div></section>
    </div>
  </section></PageFrame>;
}

function SkillsPage() {
  return <PageFrame><section className="inner-page wrap skills-page">
    <SectionHeading eyebrow="Skills & tools" title={<>A toolkit that’s<br /><span className="serif-accent">always growing.</span></>} detail="A practical foundation, growing through study and real project work." />
    <div className="skills-experience">
      <div className="skills-list">{skillGroups.map((group) => <article className="skill-row" key={group.number}><span className="skill-number">{group.number}</span><h2>{group.title}</h2><div className="skill-tags">{group.items.map((item) => <span key={item} className="skill-tag">{item}<span aria-hidden="true">↗</span></span>)}</div></article>)}
        <article className="skill-row skill-interests-row"><span className="skill-number">04</span><h2>Areas of interest</h2><div className="skill-tags">{profile.interests.map((item) => <span key={item} className="skill-tag">{item}</span>)}</div></article>
      </div>
      <aside className="skills-constellation" aria-label={`Current skills: ${profile.technologies.join(', ')}`}><div className="constellation-orbit orbit-one" /><div className="constellation-orbit orbit-two" /><div className="constellation-core"><span>KG</span><small>LEARNING<br />BY BUILDING</small></div>{profile.technologies.map((technology, index) => <span className={`constellation-node constellation-node-${index + 1}`} key={technology}>{technology}</span>)}<span className="constellation-kicker">CURRENT TOOLKIT</span></aside>
    </div>
    <div className="skills-note"><span className="sparkle">✳</span><p>Tools reflect my current workflow. <span>I only list technologies I’ve actually worked with.</span></p></div>
  </section></PageFrame>;
}

function ExpertisePage() {
  const services = [
    { n: '01', title: 'FRONTEND DEVELOPMENT', text: 'HTML, CSS, JavaScript, responsive UI, and interactive web experiences.' },
    { n: '02', title: 'BACKEND DEVELOPMENT', text: 'Python, Flask, FastAPI, REST APIs, and database integration.' },
    { n: '03', title: 'FULL STACK APPLICATIONS', text: 'Connecting interfaces and services with authentication, API integration, and deployment.' },
  ];
  return <PageFrame><section className="inner-page wrap expertise-page">
    <SectionHeading eyebrow="What I do" title={<>Thoughtful builds,<br /><span className="serif-accent">from front to back.</span></>} detail="My current development focus, the tools I work with, and the kinds of products I enjoy building." />
    <div className="expertise-page-list">{services.map((service) => <article key={service.n}><span>{service.n}</span><div><h2>{service.title}</h2><p>{service.text}</p></div><ArrowUpRight /></article>)}</div>
    <div className="expertise-page-lower"><section><span className="personal-kicker">CURRENT TOOLKIT</span><div className="resume-skill-list">{[...profile.technologies, ...profile.tools].map((skill) => <span key={skill}>{skill}</span>)}</div><Link className="text-link" to="/skills">See skills &amp; tools <ArrowRight /></Link></section><section><span className="personal-kicker">AREAS OF INTEREST</span><div className="about-interest-list">{profile.interests.map((interest, index) => <div key={interest}><span>0{index + 1}</span><strong>{interest}</strong><ArrowUpRight /></div>)}</div></section></div>
  </section></PageFrame>;
}

function ProjectCard({ project, index, onOpen }: { project: (typeof projects)[number]; index: number; onOpen: () => void }) {
  const thumbnail = getProjectThumbnail(project.thumbnail);
  const [failedThumbnail, setFailedThumbnail] = useState<string>();
  const githubUrl = getPublicProjectUrl(project.githubUrl);
  const liveUrl = getPublicProjectUrl(project.liveUrl);
  const marks = ['01', '02', '03', '04', '05'];
  const mark = project.theme === 'agriculture' ? 'K' : project.theme === 'education' ? 'S' : project.theme === 'hosting' ? 'C' : project.title.includes('Auth') ? 'A' : 'KG';

  return <article className={`project-card project-card-${project.theme}`}>
    <div className={`project-art project-art-${index + 1}`}>
      <div className="home-project-artwork" aria-hidden="true">
        {thumbnail && failedThumbnail !== thumbnail ? <img className="project-card-thumbnail" src={thumbnail} alt="" loading="lazy" onError={() => setFailedThumbnail(thumbnail)} /> : <>
          <span className="home-art-line home-art-line-one" /><span className="home-art-line home-art-line-two" />
          <span className="home-art-orbit" /><span className="home-art-monogram">{mark}</span>
        </>}
      </div>
      <span className="project-art-index">{marks[index] ?? `0${index + 1}`}</span>
      <span className="project-status">{project.category}</span>
    </div>
    <div className="project-info">
      <div className="home-project-copy"><span className="home-project-kicker">SELECTED WORK / {marks[index] ?? `0${index + 1}`}</span><h3>{project.title}</h3><p>{project.shortDescription}</p></div>
      {project.technologies.length > 0 && <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
      <div className="project-links">
        {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight /></a>}
        {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubMark /> Source <ArrowUpRight /></a>}
        <button type="button" className="project-detail-trigger" onClick={onOpen}>Details <ArrowUpRight /></button>
      </div>
    </div>
  </article>;
}
function ProjectGallery({ items, variant = 'projects' }: { items: typeof projects; variant?: 'projects' | 'home' }) {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();
  }, [selectedProject]);

  const githubUrl = selectedProject ? getPublicProjectUrl(selectedProject.githubUrl) : undefined;
  const liveUrl = selectedProject ? getPublicProjectUrl(selectedProject.liveUrl) : undefined;

  return <>
    <div className={`project-grid${variant === 'home' ? ' home-project-grid' : ''}`}>
      {items.map((project, index) => <ProjectCard key={project.id} project={project} index={projects.indexOf(project) >= 0 ? projects.indexOf(project) : index} onOpen={() => setSelectedProject(project)} />)}
    </div>
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setSelectedProject(null)} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      {selectedProject && <div className="project-dialog-content">
        <div className="project-dialog-heading"><span className="eyebrow"><span className="eyebrow-dot" />Project details / {selectedProject.category}</span><button type="button" className="dialog-close" aria-label="Close project details" onClick={() => dialogRef.current?.close()}>&times;</button></div>
        <h2 id="project-dialog-title">{selectedProject.title}</h2>
        <p>{selectedProject.shortDescription}</p>
        {selectedProject.description.trim() && <p>{selectedProject.description}</p>}
        {selectedProject.status && <p className="project-detail-status">{selectedProject.status}</p>}
        {selectedProject.technologies.length > 0 && <><span className="card-label">TECHNOLOGIES</span><div className="project-tags">{selectedProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></>}
        {selectedProject.features.length > 0 && <><span className="card-label">FEATURES</span><ul>{selectedProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></>}
        <div className="dialog-links">
          {githubUrl && <a className="button button-primary" href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubMark /> GitHub Repository <ArrowUpRight /></a>}
          {liveUrl && <a className="button button-quiet" href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight /></a>}
        </div>
      </div>}
    </dialog>
  </>;
}

function ResumePage() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '/documents/Kshitij_Garg_Resume.pdf';
  return <PageFrame><section className="inner-page wrap resume-page">
    <SectionHeading eyebrow="Resume · updated profile" title={<>Kshitij<br /><span className="serif-accent">Garg.</span></>} detail="Computer Science Engineering student building practical web, Python, and AI-powered applications." />
    <div className="resume-sheet">
      <header className="resume-sheet-head"><div><span className="resume-overline">COMPUTER SCIENCE ENGINEERING · JABALPUR, INDIA</span><h2>Kshitij Garg</h2><p>Full-Stack Developer · Python · AI Applications</p></div><div className="resume-contact"><a href="mailto:gargkshitij658@gmail.com">gargkshitij658@gmail.com</a><a href="tel:+918871368782">+91 88713 68782</a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><Link to="/">Portfolio <ArrowUpRight /></Link></div></header>
      <section className="resume-section"><h3>Professional summary</h3><p>Motivated Computer Science Engineering student with hands-on experience in web development, Python programming, Flask, API integration, automation, and AI-based applications. Built practical projects including an agriculture support platform, Smart Education Platform, virtual assistant, and responsive entertainment interface. Seeking an entry-level software development opportunity to apply technical skills and strengthen problem-solving abilities in a professional environment.</p></section>
      <section className="resume-section"><h3>Technical skills</h3><div className="resume-skill-list">{['Python','JavaScript','SQL','HTML5','CSS','React.js','Bootstrap','REST API','Node.js','Flask','GitHub','VS Code','n8n','API Integration'].map(skill=><span key={skill}>{skill}</span>)}</div></section>
      <section className="resume-section"><h3>Personal projects</h3><div className="resume-project"><div className="resume-project-title"><h4>Kshitij.dev</h4><span>Personal Portfolio Website</span></div><p>Developed and deployed a responsive personal portfolio to showcase technical skills, projects, and professional achievements. Built with HTML, CSS, JavaScript, React, and TypeScript; deployed on Netlify.</p><small>HTML · CSS · JavaScript · React · TypeScript · Netlify</small></div><div className="resume-project"><div className="resume-project-title"><h4>Kisan Mantri</h4><span>Agriculture Support Platform</span></div><p>Developed a web platform to support farmers with agriculture information and services, including weather functionality and fruit and vegetable listings. Used Python and n8n API integration for automation.</p><small>HTML · CSS · JavaScript · Python · n8n API</small></div><div className="resume-project"><div className="resume-project-title"><h4>Smart Education Platform</h4><span>Online Learning Website</span></div><p>Created an online learning platform for exploring courses and educational content. Implemented Gmail OTP authentication, course recommendations, video lectures, and study notes, with FastAPI backend APIs and SQLite.</p><small>Python · FastAPI · SQLite · HTML · CSS · JavaScript</small></div></section>
      <div className="resume-bottom-grid"><section className="resume-section"><h3>Education</h3><div className="resume-education"><h4>Shri Ram Group of Institutions, Jabalpur</h4><p>B.Tech · Computer Science</p><span>June 2023 — June 2027 · Grade: 7.58</span></div></section><section className="resume-section"><h3>Certifications</h3><ul className="resume-certifications"><li>HackSRIT</li><li>TCS iON · Generative AI</li><li>TCS iON · AI Foundation</li><li>Jaro Education</li><li>VaultofCodes</li><li>AWS · Machine Learning</li><li>AWS · Generative AI</li></ul></section></div>
      <footer className="resume-sheet-footer"><span>KSHITIJ GARG · RESUME</span><a className="button button-primary" href={resumeUrl} download>Download PDF <DownloadIcon /></a></footer>
    </div>
  </section></PageFrame>;
}

function ContactPage() {
  const [status, setStatus] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    if (!profile.email) { setStatus('Contact email is unavailable. No message was sent.'); return; }
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${String(data.get('name'))}`);
    const body = encodeURIComponent(`From: ${String(data.get('name'))} (${String(data.get('email'))})\n\n${String(data.get('message'))}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('Your email app should open with the message ready to send.');
  };
  return <PageFrame><section className="inner-page wrap contact-page"><SectionHeading eyebrow="Contact" title={<>Have an idea?<br /><span className="serif-accent">Let’s build something.</span></>} detail="Have a question, an idea, or an opportunity to share? I’d be glad to hear from you." /><div className="contact-layout"><form className="contact-form" onSubmit={handleSubmit}><span className="card-label">SEND A NOTE</span><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /><label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" required rows={5} placeholder="Tell me a little about it…" /><p className="form-note">{profile.email ? 'This opens your email app with a draft for you to review and send. The site does not deliver messages.' : 'No email address or message-delivery service is configured. The form is unavailable for now.'}</p><button className="button button-primary" type="submit" disabled={!profile.email}>{profile.email ? 'Prepare email draft' : 'Email not configured'} <ArrowUpRight /></button><p className={`form-status${status ? ' is-visible' : ''}`} aria-live="polite">{status}</p></form><aside className="contact-aside"><span className="contact-aside-icon">↗</span><span className="footer-label">ELSEWHERE</span><h2>Find me<br /><span className="serif-accent">around the web.</span></h2><a href={profile.githubUrl} target="_blank" rel="noreferrer" className="contact-social">GitHub <span>View profile</span><ArrowUpRight /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="contact-social">LinkedIn <span>Connect</span><ArrowUpRight /></a>{profile.email ? <a href={`mailto:${profile.email}`} className="contact-social">Email <span>{profile.email}</span><ArrowUpRight /></a> : <p className="contact-email-empty">Email link will appear when a public address is configured.</p>}</aside></div></section></PageFrame>;
}

function NotFoundPage() {
  return <PageFrame><section className="inner-page wrap not-found"><span className="eyebrow">404 · Page not found</span><h1>This path took<br /><span className="serif-accent">a little detour.</span></h1><Link className="button button-primary" to="/">Back to home <ArrowRight /></Link></section></PageFrame>;
}

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const metadata = pageMetadata[location.pathname] ?? { title: 'Page not found — Kshitij.dev', description: 'The page you requested could not be found.' };
    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (description) description.content = metadata.description;
    if (openGraphTitle) openGraphTitle.content = metadata.title;
    if (openGraphDescription) openGraphDescription.content = metadata.description;
  }, [location.pathname]);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content" tabIndex={-1}><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/expertise" element={<ExpertisePage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/projects" element={<PageFrame><ProjectsSection /></PageFrame>} /><Route path="/certificates" element={<PageFrame><CertificatesSection /></PageFrame>} /><Route path="/resume" element={<ResumePage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></AnimatePresence></div><Footer /></>;
}

export default App;
