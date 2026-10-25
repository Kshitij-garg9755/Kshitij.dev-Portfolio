import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const ProjectUniverseCanvas = lazy(() => import('./ProjectUniverseCanvas'));

export function ProjectUniverse() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && !window.matchMedia('(max-width: 700px)').matches
      && (navigator.hardwareConcurrency ?? 8) > 4;
  });
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 700px)');
    const update = () => setEnabled(!reducedMotion.matches && !compactViewport.matches && (navigator.hardwareConcurrency ?? 8) > 4);
    reducedMotion.addEventListener('change', update);
    compactViewport.addEventListener('change', update);
    return () => {
      reducedMotion.removeEventListener('change', update);
      compactViewport.removeEventListener('change', update);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2;
  };

  return (
    <div className={`project-universe${enabled ? ' is-3d' : ''}`} onPointerMove={handlePointerMove} onPointerLeave={() => { pointer.current.x = 0; pointer.current.y = 0; }} aria-hidden="true">
      <div className="universe-grid" />
      {enabled ? <Suspense fallback={<div className="universe-fallback" />}><ProjectUniverseCanvas pointerRef={pointer} /></Suspense> : <div className="universe-fallback" />}
      <span className="universe-label universe-label-top">FIELD / 001</span>
      <span className="universe-label universe-label-bottom">IDEAS IN ORBIT</span>
      <span className="universe-crosshair" />
    </div>
  );
}
