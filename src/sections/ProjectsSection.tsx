import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, GithubMark } from '../components/Icons';
import { ProjectUniverse } from '../components/ProjectUniverse';
import type { Project } from '../data/projects';
import { getProjectThumbnail, getPublicProjectUrl, projects } from '../data/projects';
import './ProjectsSection.css';

function ProjectArtwork({ project, number }: { project: Project; number: number }) {
  const thumbnail = getProjectThumbnail(project.thumbnail);
  const [failedThumbnail, setFailedThumbnail] = useState<string>();

  return (
    <div className={`project-showcase-art art-${project.theme}`}>
      <div className="art-atmosphere" aria-hidden="true" />
      {thumbnail && failedThumbnail !== thumbnail ? <img className="project-thumbnail" src={thumbnail} alt={`${project.title} project preview`} loading="lazy" onError={() => setFailedThumbnail(thumbnail)} /> : <div className={`project-artwork project-artwork-${project.theme}`} aria-label={`${project.title} abstract artwork`}>
        <span className="art-index">0{number} / 0{projects.length}</span>
        <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
        <div className="art-monogram" aria-hidden="true">{project.theme === 'agriculture' ? 'K' : project.theme === 'education' ? 'S' : project.theme === 'hosting' ? 'C' : 'A'}</div>
        <span className="art-category">{project.category.toUpperCase()}</span>
      </div>}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const githubUrl = getPublicProjectUrl(project.githubUrl);
  const liveUrl = getPublicProjectUrl(project.liveUrl);
  return <div className="showcase-links">
    {githubUrl && <a className="showcase-link showcase-link-primary" href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubMark /> GitHub Repository <ArrowUpRight /></a>}
    {liveUrl && <a className="showcase-link" href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight /></a>}
  </div>;
}

function ProjectDetailDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return <dialog ref={dialogRef} className="project-dialog cinematic-dialog" aria-labelledby="case-study-title" onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
    {project && <div className="cinematic-dialog-content">
      <div className="project-dialog-heading"><span className="eyebrow"><span className="eyebrow-dot" />Case study / {project.category}</span><button type="button" className="dialog-close" aria-label="Close case study" onClick={() => dialogRef.current?.close()}>×</button></div>
      <h2 id="case-study-title">{project.title}</h2>
      <p className="dialog-overview">{project.shortDescription}</p>
      {project.description.trim() && <p className="dialog-overview">{project.description}</p>}
      <div className="case-study-facts">
        <section><span className="card-label">CATEGORY</span><p>{project.category}</p>{project.status && <p className="project-detail-status">{project.status}</p>}</section>
        {project.features.length > 0 && <section><span className="card-label">FEATURES</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}
        {project.technologies.length > 0 && <section><span className="card-label">TECHNOLOGY</span><p>{project.technologies.join(' · ')}</p></section>}
      </div>
      {getProjectThumbnail(project.thumbnail) && <ProjectArtwork project={project} number={projects.indexOf(project) + 1} />}
      <ProjectLinks project={project} />
    </div>}
  </dialog>;
}

function FeaturedProject({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const handleTilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 2.4}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 2.4}deg`);
  };
  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return <article className={`featured-project featured-project-${project.theme}`}>
    <div className="featured-project-copy">
      <div className="project-meta-line"><span>PROJECT / {String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
      <h2>{project.title}</h2>
      <p className="featured-project-description">{project.shortDescription}</p>
      {project.status && <span className="project-detail-status">{project.status}</span>}
      {project.technologies.length > 0 && <div className="feature-details"><span className="card-label">TECH STACK</span><div className="showcase-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>}
      {project.features.length > 0 && <div className="feature-details"><span className="card-label">FEATURES</span><ul className="feature-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>}
      <ProjectLinks project={project} />
      <button className="case-study-button" type="button" onClick={onOpen}>View Details <ArrowRight /></button>
    </div>
    <div className="featured-project-visual" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
      <ProjectArtwork project={project} number={index + 1} />
    </div>
  </article>;
}

function GalleryProject({ project, index, onOpen, reduceMotion }: { project: Project; index: number; onOpen: () => void; reduceMotion: boolean }) {
  return <motion.article layout={!reduceMotion} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: reduceMotion ? 0 : 0.32 }} className={`gallery-project gallery-project-${project.theme}${index % 2 ? ' is-reversed' : ''}`}>
    <div className="gallery-project-visual"><ProjectArtwork project={project} number={index + 1} /></div>
    <div className="gallery-project-copy"><div className="project-meta-line"><span>PROJECT / {String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.shortDescription}</p>{project.status && <span className="project-detail-status">{project.status}</span>}{project.technologies.length > 0 && <div className="showcase-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}<div className="gallery-project-actions"><ProjectLinks project={project} /><button className="case-study-button" type="button" onClick={onOpen}>View Details <ArrowRight /></button></div></div>
  </motion.article>;
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();
  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], []);
  const visibleProjects = projects.filter((project) => activeCategory === 'All' || project.category === activeCategory);
  const featured = visibleProjects[0];
  const remaining = visibleProjects.slice(1);

  const scrollToShowcase = () => document.querySelector('#project-showcase')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

  return <div className="projects-experience">
    <section className="projects-hero" aria-labelledby="projects-title">
      <div className="projects-hero-grid" aria-hidden="true" />
      <div className="projects-hero-inner wrap">
        <motion.div className="projects-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="projects-eyebrow"><i /> KSHITIJ.DEV <span>/</span> SELECTED WORK</span>
          <h1 id="projects-title">Ideas into<br /><span>Digital Reality.</span></h1>
          <p>A collection of experiments, applications, and ideas brought to life through code, design, and technology.</p>
          <div className="projects-hero-actions"><button type="button" className="explore-projects-button" onClick={scrollToShowcase}>Explore projects <ArrowRight /></button><div className="live-project-counter"><strong>{String(projects.length).padStart(2, '0')}</strong><span>PROJECTS<br />IN THE COLLECTION</span></div></div>
        </motion.div>
        <div className="projects-hero-visual"><ProjectUniverse /><span className="hero-visual-side-label">AN OPEN SYSTEM<br />OF IDEAS</span></div>
        <button type="button" className="projects-scroll-hint" onClick={scrollToShowcase}>SCROLL TO EXPLORE <span>↓</span></button>
      </div>
    </section>

    <section className="project-showcase-section wrap" id="project-showcase">
      <div className="showcase-section-heading"><div><span className="projects-eyebrow"><i /> THE COLLECTION</span><h2>Selected <span>work.</span></h2></div><p>Ideas, taking shape<br />one build at a time.</p></div>
      <div className="project-filters" role="group" aria-label="Filter projects by category">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}<span>{category === 'All' ? String(projects.length).padStart(2, '0') : String(projects.filter((project) => project.category === category).length).padStart(2, '0')}</span></button>)}</div>
      <AnimatePresence mode="wait">
        <motion.div key={activeCategory} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
          {featured && <FeaturedProject project={featured} index={projects.indexOf(featured)} onOpen={() => setSelectedProject(featured)} />}
          {remaining.length > 0 && <div className="gallery-projects">{remaining.map((project, index) => <GalleryProject key={project.id} project={project} index={index + 1} onOpen={() => setSelectedProject(project)} reduceMotion={Boolean(reduceMotion)} />)}</div>}
        </motion.div>
      </AnimatePresence>
      <div className="showcase-endnote"><span>END OF CURRENT TRANSMISSION</span><span>MORE IDEAS ARE TAKING SHAPE <i /></span></div>
    </section>
    <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>;
}
