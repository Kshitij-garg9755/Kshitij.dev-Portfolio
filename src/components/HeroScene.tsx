import { lazy, Suspense, useEffect, useState } from 'react';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export function HeroScene() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const compactViewport = window.matchMedia('(max-width: 720px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 4) <= 4;
    return !reducedMotion && !compactViewport && !lowPowerDevice;
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 720px)');
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 4) <= 4;
    const updateScene = () => setEnabled(!reducedMotion.matches && !compactViewport.matches && !lowPowerDevice);

    reducedMotion.addEventListener('change', updateScene);
    compactViewport.addEventListener('change', updateScene);
    return () => {
      reducedMotion.removeEventListener('change', updateScene);
      compactViewport.removeEventListener('change', updateScene);
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
