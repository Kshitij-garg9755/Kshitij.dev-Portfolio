import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, DownloadIcon, GithubMark, MenuIcon } from './components/Icons';
import { HeroScene } from './components/HeroScene';
import { profile, skillGroups } from './data/portfolio';
import { getProjectThumbnail, getPublicProjectUrl, projects } from './data/projects';
import CertificatesSection from './sections/CertificatesSection';
import ProjectsSection from './sections/ProjectsSection';

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
];

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'Kshitij.dev — Kshitij Garg', description: 'Kshitij Garg is a Computer Science Engineering student interested in full-stack development, Python, AI, and building practical software.' },
  '/about': { title: 'About — Kshitij.dev', description: 'Meet Kshitij Garg, a Computer Science Engineering student learning full-stack development and building practical software projects.' },
  '/skills': { title: 'Skills — Kshitij.dev', description: 'Explore Kshitij Garg’s confirmed frontend, Python, development tools, and areas of interest.' },
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
  return (
    <header id="top" className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Kshitij.dev home"><span className="wordmark-mark">k<span>.</span></span><span>Kshitij<span className="muted">.dev</span></span></Link>
        <nav id="main-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{item.label}</NavLink>)}
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
      <nav className="footer-nav" aria-label="Footer navigation">{navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav>
      <div className="footer-socials"><span className="card-label">ELSEWHERE</span><a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>{profile.email && <a href={`mailto:${profile.email}`}>Email <ArrowUpRight /></a>}</div>
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
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => setRoleIndex((index) => (index + 1) % profile.roles.length), 2800);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return <PageFrame>
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="availability"><span className="pulse-dot" />Computer Science Engineering <span className="availability-divider">·</span> Developer portfolio</div>
            <h1 id="hero-title">Hi, I’m<br /><span className="serif-accent">Kshitij.</span></h1>
        <p className="hero-description">I build ideas into digital experiences.</p>
        <div className="home-role-line"><span>Exploring</span><AnimatePresence mode="wait" initial={false}><motion.strong key={profile.roles[roleIndex]} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>{profile.roles[roleIndex]}</motion.strong></AnimatePresence></div>
        <p className="home-introduction">{profile.introduction}</p>
        <div className="hero-actions"><Link className="button button-primary" to="/projects">Explore my work <ArrowRight /></Link><Link className="button button-quiet" to="/contact">Let’s connect <ArrowUpRight /></Link></div>
        <div className="hero-meta"><span>{profile.education}</span><span className="meta-separator" /><span>{profile.technologies.join(' · ')}</span></div>
      </div>
      <div className="hero-visual"><HeroScene /><div className="visual-caption"><span>01 / A work in progress</span><span>STAY CURIOUS ↗</span></div><div className="hero-coordinate">IDEAS<br />IN MOTION</div></div>
      <div className="hero-index">SCROLL TO EXPLORE <span>↓</span></div>
    </section>
    <section className="intro-strip wrap"><span className="eyebrow">A little about me</span><p>I’m a Computer Science Engineering student drawn to <em>practical software, curious experiments,</em> and the details that make a digital experience feel considered.</p><Link className="text-link" to="/about">More about me <ArrowRight /></Link></section>
    <section className="home-work wrap"><div className="section-topline"><div><span className="eyebrow"><span className="eyebrow-dot" />Selected work</span><h2>Learning by <span className="serif-accent">making.</span></h2></div><Link className="text-link" to="/projects">All projects <ArrowRight /></Link></div><ProjectGallery items={projects.slice(0, 2)} variant="home" /></section>
    <section className="home-paths wrap" aria-label="Explore the portfolio"><Link to="/about"><span>01 / PROFILE</span><strong>Meet the person<br />behind the work.</strong><ArrowUpRight /></Link><Link to="/skills"><span>02 / TOOLKIT</span><strong>Explore what I’m<br />learning and using.</strong><ArrowUpRight /></Link><Link to="/certificates"><span>03 / LEARNING</span><strong>Follow my learning<br />journey as it grows.</strong><ArrowUpRight /></Link></section>
    <section className="home-contact wrap"><div><span className="eyebrow">Have an idea?</span><h2>Let’s build<br /><span className="serif-accent">something.</span></h2></div><Link className="button button-primary" to="/contact">Let’s connect <ArrowUpRight /></Link><div className="home-contact-grid" aria-hidden="true" /></section>
  </PageFrame>;
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

function ProjectCard({ project, index, onOpen }: { project: (typeof projects)[number]; index: number; onOpen: () => void }) {
  const thumbnail = getProjectThumbnail(project.thumbnail);
  const [failedThumbnail, setFailedThumbnail] = useState<string>();
  const githubUrl = getPublicProjectUrl(project.githubUrl);
  const liveUrl = getPublicProjectUrl(project.liveUrl);

  return <article className="project-card">
    <div className={`project-art project-art-${index + 1}`}>
      <span className="project-art-index">0{index + 1}</span>
      {thumbnail && failedThumbnail !== thumbnail ? <img className="project-card-thumbnail" src={thumbnail} alt={`${project.title} project preview`} loading="lazy" onError={() => setFailedThumbnail(thumbnail)} /> : <div className="project-art-shape" aria-hidden="true"><span /><span /><span /></div>}
      <span className="project-status">{project.category}{project.status ? ` / ${project.status}` : ''}</span>
    </div>
    <div className="project-info">
      <div><h3>{project.title}</h3><p>{project.shortDescription}</p></div>
      {project.technologies.length > 0 && <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
      <div className="project-links">
        {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubMark /> GitHub Repository <ArrowUpRight /></a>}
        {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight /></a>}
        <button type="button" className="project-detail-trigger" onClick={onOpen}>View Details <ArrowUpRight /></button>
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
  const resumeUrl = import.meta.env.VITE_RESUME_URL || '/documents/resume.pdf';
  const [fileState, setFileState] = useState<'checking' | 'ready' | 'missing'>('checking');

  useEffect(() => {
    const controller = new AbortController();
    fetch(resumeUrl, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const isPdf = response.headers.get('content-type')?.toLowerCase().includes('application/pdf');
        setFileState(response.ok && isPdf ? 'ready' : 'missing');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFileState('missing');
      });
    return () => controller.abort();
  }, [resumeUrl]);

  return <PageFrame><section className="inner-page wrap resume-page">
    <SectionHeading eyebrow="Resume" title={<>A clear picture<br />of <span className="serif-accent">my journey.</span></>} detail="A concise overview of my education, skills, and project work." />
    <div className="resume-panel">
      <div className={`resume-presentation${fileState === 'ready' ? ' has-file' : ''}`}>
        {fileState === 'ready' ? <iframe title="Kshitij Garg resume PDF" src={resumeUrl} /> : <div className="resume-art-placeholder"><span className="resume-monogram">KG</span><i>RESUME DOCUMENT</i><b>PDF / PUBLIC FILE</b><div aria-hidden="true" /></div>}
      </div>
      <div className="resume-copy"><span className="card-label">RESUME · PDF</span><h2>{fileState === 'ready' ? 'Ready to explore.' : fileState === 'checking' ? 'Checking for the PDF…' : 'The next chapter is being prepared.'}</h2><p>{fileState === 'ready' ? 'Open the resume in a new tab or download the PDF.' : fileState === 'checking' ? 'Checking the public resume location.' : 'My resume PDF is not available yet. Add the real file to the location below when it’s ready.'}</p>
        <div className="resume-actions">{fileState === 'ready' ? <><a className="button button-quiet" href={resumeUrl} target="_blank" rel="noreferrer">View resume <ArrowUpRight /></a><a className="button button-primary" href={resumeUrl} download>Download resume <DownloadIcon /></a></> : <button className="button button-disabled" type="button" disabled aria-describedby="resume-status">{fileState === 'checking' ? 'Checking file…' : 'Resume unavailable'} <DownloadIcon /></button>}</div>
        <span id="resume-status" className="resume-status" aria-live="polite">{fileState === 'ready' ? 'Verified PDF file' : 'Expected file: public/documents/resume.pdf'}</span>
      </div>
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
  return <PageFrame><section className="inner-page wrap contact-page"><SectionHeading eyebrow="Contact" title={<>Have an idea?<br /><span className="serif-accent">Let’s build something.</span></>} detail="Have a question, an idea, or an opportunity to share? I’d be glad to hear from you." /><div className="contact-layout"><form className="contact-form" onSubmit={handleSubmit}><span className="card-label">SEND A NOTE</span><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /><label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" required rows={5} placeholder="Tell me a little about it…" /><p className="form-note">{profile.email ? 'This opens your email app with a draft for you to review and send. The site does not deliver messages.' : 'No email address or message-delivery service is configured. The form is unavailable for now.'}</p><button className="button button-primary" type="submit" disabled={!profile.email}>{profile.email ? 'Prepare email draft' : 'Email not configured'} <ArrowUpRight /></button><p className={`form-status${status ? ' is-visible' : ''}`} aria-live="polite">{status}</p></form><aside className="contact-aside"><span className="contact-aside-icon">↗</span><span className="card-label">ELSEWHERE</span><h2>Find me<br /><span className="serif-accent">around the web.</span></h2><a href={profile.githubUrl} target="_blank" rel="noreferrer" className="contact-social">GitHub <span>View profile</span><ArrowUpRight /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="contact-social">LinkedIn <span>Connect</span><ArrowUpRight /></a>{profile.email ? <a href={`mailto:${profile.email}`} className="contact-social">Email <span>{profile.email}</span><ArrowUpRight /></a> : <p className="contact-email-empty">Email link will appear when a public address is configured.</p>}</aside></div></section></PageFrame>;
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
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content" tabIndex={-1}><AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/projects" element={<PageFrame><ProjectsSection /></PageFrame>} /><Route path="/certificates" element={<PageFrame><CertificatesSection /></PageFrame>} /><Route path="/resume" element={<ResumePage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></AnimatePresence></div><Footer /></>;
}

export default App;
