'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HEADING_SELECTOR = ['main h1', 'main h2'].join(',');

const GROUP_SELECTOR = [
  '.home-topics__grid',
  '.home-welcome__points',
  '.learn-topic-atlas__grid',
  '.topic-lab__reading-grid',
  '.topic-lab__vocab-grid',
  '.topic-lab__insight-grid',
  '.eco-arcade-hub__mode-grid',
  '.pulse-metrics__grid',
  '.pulse-balance__grid',
  '.pulse-momentum__grid',
  '.world-challenge-list__cards',
  '.mission-list',
  '.climate-answer-grid',
  '.climate-vocab-options',
  '.arcade-choice-grid',
  '.topic-lab__reading-check-options',
  '.topic-lab__system-options',
  '.settings-groups',
].join(',');

const SURFACE_SELECTOR = [
  '.home-artifact',
  '.product-hero__artifact',
  '.topic-card',
  '.learn-topic-atlas__card',
  '.topic-lab__reading-card',
  '.topic-lab__vocab-card',
  '.eco-arcade-hub__mode',
  '.mission-card',
  '.world-challenge-card',
  '.pulse-metrics article',
  '.pulse-balance__grid article',
  '.settings-group',
  '.choice-card',
  '.review-options button',
  '.settings-options button',
  '.arcade-choice',
  '.topic-lab__quick-check-option',
  '.topic-lab__reading-check-option',
  '.topic-lab__system-option',
].join(',');

const MAGNET_SELECTOR = '[data-magnetic], .editorial-nav__start';

const SECTION_SELECTOR = [
  '.learn-orientation',
  '.learn-topic-atlas',
  '.topic-lab__briefing',
  '.topic-lab__reading',
  '.topic-lab__reading-check',
  '.topic-lab__words',
  '.topic-lab__connections',
  '.topic-lab__sources',
  '.topic-lab__system-check',
  '.climate-data-strip',
  '.climate-story',
  '.climate-reading-check',
  '.climate-vocabulary-practice',
  '.eco-arcade-stage',
  '.eco-arcade-live',
  '.action-cockpit',
  '.action-mission-section',
  '.challenges-list-section',
  '.pulse-balance',
  '.pulse-focus-compass',
  '.pulse-momentum',
  '.review-item-focus',
  '.settings-groups',
  '.lesson-stage__inner',
].join(',');

function sectionKindFor(element: HTMLElement): 'narrative' | 'practice' | 'instrument' {
  if (element.matches([
    '.topic-lab__reading-check',
    '.topic-lab__system-check',
    '.climate-reading-check',
    '.climate-vocabulary-practice',
    '.eco-arcade-stage',
    '.eco-arcade-live',
    '.review-item-focus',
    '.lesson-stage__inner',
  ].join(','))) return 'practice';

  if (element.matches([
    '.learn-orientation',
    '.climate-data-strip',
    '.action-cockpit',
    '.challenges-list-section',
    '.pulse-focus-compass',
  ].join(','))) return 'instrument';

  return 'narrative';
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
}

export function SiteMotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastY = window.scrollY;

    const commitScroll = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, y / scrollable);
      const delta = y - lastY;

      root.style.setProperty('--page-progress', progress.toFixed(4));
      root.dataset.scrolled = y > 28 ? 'true' : 'false';
      if (Math.abs(delta) > 3) root.dataset.scrollDirection = delta > 0 ? 'down' : 'up';
      root.dataset.navState = y > 150 && delta > 5 ? 'hidden' : 'shown';
      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(commitScroll);
    };

    commitScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.dataset.motionReady = 'reduced';
      return;
    }

    let observer: IntersectionObserver | null = null;
    let setupFrame = 0;

    setupFrame = window.requestAnimationFrame(() => {
      const headings = Array.from(document.querySelectorAll<HTMLElement>(HEADING_SELECTOR))
        .filter((element) => !element.closest('.home-hero') && !element.closest('.lesson-stage'));
      const groups = Array.from(document.querySelectorAll<HTMLElement>(GROUP_SELECTOR));
      const progressBars = Array.from(document.querySelectorAll<HTMLElement>('[role="progressbar"]'));
      const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));

      headings.forEach((element) => { element.dataset.motionHeading = 'true'; });
      sections.forEach((element) => { element.dataset.motionSection = sectionKindFor(element); });
      groups.forEach((group) => {
        group.dataset.motionGroup = 'true';
        Array.from(group.children).forEach((child, index) => {
          if (child instanceof HTMLElement) child.style.setProperty('--motion-index', String(Math.min(index, 10)));
        });
      });
      progressBars.forEach((element) => { element.dataset.motionProgress = 'true'; });

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.inview = 'true';
          observer?.unobserve(element);
        }
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

      [...headings, ...groups, ...progressBars, ...sections].forEach((element) => observer?.observe(element));
      root.dataset.motionReady = 'true';
    });

    return () => {
      if (setupFrame) window.cancelAnimationFrame(setupFrame);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || prefersReducedMotion()) return;

    let activeSurface: HTMLElement | null = null;
    let activeMagnet: HTMLElement | null = null;
    let surfaceRect: DOMRect | null = null;
    let magnetRect: DOMRect | null = null;
    let pointerFrame = 0;
    let surfaceDepth = 1;
    let pointerX = 0;
    let pointerY = 0;

    const resetSurface = () => {
      if (!activeSurface) return;
      activeSurface.removeAttribute('data-pointer-active');
      activeSurface.style.removeProperty('--pointer-x');
      activeSurface.style.removeProperty('--pointer-y');
      activeSurface.style.removeProperty('--surface-x');
      activeSurface.style.removeProperty('--surface-y');
      activeSurface.style.removeProperty('--surface-rotate');
      activeSurface = null;
      surfaceRect = null;
      surfaceDepth = 1;
    };

    const resetMagnet = () => {
      if (!activeMagnet) return;
      activeMagnet.removeAttribute('data-magnet-active');
      activeMagnet.style.removeProperty('--magnet-x');
      activeMagnet.style.removeProperty('--magnet-y');
      activeMagnet = null;
      magnetRect = null;
    };

    const commitPointer = () => {
      pointerFrame = 0;
      if (activeSurface && surfaceRect) {
        const nx = Math.max(-1, Math.min(1, ((pointerX - surfaceRect.left) / surfaceRect.width - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, ((pointerY - surfaceRect.top) / surfaceRect.height - 0.5) * 2));
        activeSurface.style.setProperty('--pointer-x', `${((nx + 1) / 2) * 100}%`);
        activeSurface.style.setProperty('--pointer-y', `${((ny + 1) / 2) * 100}%`);
        activeSurface.style.setProperty('--surface-x', `${(nx * 2.5 * surfaceDepth).toFixed(2)}px`);
        activeSurface.style.setProperty('--surface-y', `${(ny * 2.5 * surfaceDepth).toFixed(2)}px`);
        activeSurface.style.setProperty('--surface-rotate', `${(nx * 0.28 * surfaceDepth).toFixed(2)}deg`);
      }
      if (activeMagnet && magnetRect) {
        const nx = Math.max(-1, Math.min(1, ((pointerX - (magnetRect.left + magnetRect.width / 2)) / Math.max(1, magnetRect.width)) * 2));
        const ny = Math.max(-1, Math.min(1, ((pointerY - (magnetRect.top + magnetRect.height / 2)) / Math.max(1, magnetRect.height)) * 2));
        activeMagnet.style.setProperty('--magnet-x', `${(nx * 5).toFixed(2)}px`);
        activeMagnet.style.setProperty('--magnet-y', `${(ny * 4).toFixed(2)}px`);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const surface = target?.closest(SURFACE_SELECTOR) as HTMLElement | null;
      const magnet = target?.closest(MAGNET_SELECTOR) as HTMLElement | null;

      if (surface !== activeSurface) {
        resetSurface();
        activeSurface = surface;
        if (surface) {
          surfaceRect = surface.getBoundingClientRect();
          const authoredDepth = Number(surface.dataset.motionDepth ?? 1);
          surfaceDepth = Number.isFinite(authoredDepth) ? Math.max(.25, Math.min(1.5, authoredDepth)) : 1;
          surface.dataset.pointerActive = 'true';
        }
      }
      if (magnet !== activeMagnet) {
        resetMagnet();
        activeMagnet = magnet;
        if (magnet) {
          magnetRect = magnet.getBoundingClientRect();
          magnet.dataset.magnetActive = 'true';
        }
      }
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(commitPointer);
    };

    const onPointerLeave = () => {
      resetSurface();
      resetMagnet();
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      resetSurface();
      resetMagnet();
    };
  }, [pathname]);

  return <div className="site-scroll-progress" aria-hidden="true"><i /></div>;
}
