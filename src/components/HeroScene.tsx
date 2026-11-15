import { lazy, Suspense, useEffect, useState } from 'react';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export function HeroScene() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reducedMotion;
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateScene = () => setEnabled(!reducedMotion.matches);

    reducedMotion.addEventListener('change', updateScene);
    return () => {
      reducedMotion.removeEventListener('change', updateScene);
    };
  }, []);

  return (
    <div className={`hero-art${enabled ? '' : ' hero-art--static'}`} aria-hidden="true">
      {enabled ? <Suspense fallback={<div className="static-sculpture" />}><HeroCanvas /></Suspense> : <div className="static-sculpture" />}
      <span className="hero-orbit hero-orbit--one" />
      <span className="hero-orbit hero-orbit--two" />
    </div>
  );
}
