'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => { finished: Promise<void> };
};

function shouldSkip(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
  if (anchor.target && anchor.target !== '_self') return true;
  if (anchor.hasAttribute('download') || anchor.dataset.noTransition !== undefined) return true;
  if (!anchor.href) return true;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return true;
  if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return true;
  if (url.pathname === window.location.pathname && url.search === window.location.search && !url.hash) return true;
  return false;
}

const TOPIC_ROUTES = new Set([
  '/learn/climate-change',
  '/learn/recycling',
  '/learn/ocean-pollution',
  '/learn/deforestation',
  '/learn/water-conservation',
  '/learn/biodiversity',
  '/learn/renewable-energy',
  '/learn/sustainable-consumption',
]);

function routeDepth(path: string) {
  if (path === '/') return 0;
  if (path.startsWith('/lesson/')) return 3;
  if (TOPIC_ROUTES.has(path)) return 2;
  if (path.startsWith('/concept/') || path.startsWith('/mission/') || path.startsWith('/challenge/')) return 2;
  if (path.startsWith('/learn/') && path !== '/learn') return 2;
  return 1;
}

function transitionKindFor(currentPath: string, nextPath: string, anchor: HTMLAnchorElement) {
  if (anchor.dataset.transitionKind) return anchor.dataset.transitionKind;
  if (currentPath.startsWith('/lesson/') && nextPath.startsWith('/lesson/')) return 'lesson';
  if (TOPIC_ROUTES.has(currentPath) && TOPIC_ROUTES.has(nextPath)) return 'topic';
  if (TOPIC_ROUTES.has(nextPath)) return 'topic';
  if (nextPath === '/game') return 'game';
  if (nextPath === '/') return 'home';
  if (routeDepth(nextPath) < routeDepth(currentPath)) return 'back';
  const detailPrefixes = ['/learn/', '/lesson/', '/concept/', '/mission/', '/challenge/'];
  if (detailPrefixes.some((prefix) => nextPath.startsWith(prefix)) && nextPath !== '/learn') return 'detail';
  return 'page';
}

export function NavigationTransitionController() {
  const router = useRouter();

  useEffect(() => {
    const doc = document as TransitionDocument;

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor || shouldSkip(anchor, event)) return;
      if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced') return;

      const url = new URL(anchor.href, window.location.href);
      const root = document.documentElement;
      const rect = anchor.getBoundingClientRect();
      const originX = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : rect.left + rect.width / 2;
      const originY = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : rect.top + rect.height / 2;
      const kind = transitionKindFor(window.location.pathname, url.pathname, anchor);

      event.preventDefault();
      root.dataset.routeTransition = 'active';
      root.dataset.transitionKind = kind;
      root.style.setProperty('--transition-x', `${originX}px`);
      root.style.setProperty('--transition-y', `${originY}px`);

      const transition = doc.startViewTransition?.(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      });
      transition?.finished.finally(() => {
        delete root.dataset.routeTransition;
        delete root.dataset.transitionKind;
        root.style.removeProperty('--transition-x');
        root.style.removeProperty('--transition-y');
      });
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}
