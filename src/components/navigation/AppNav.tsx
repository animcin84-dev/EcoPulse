'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationSectionForPath, resolveAppNavigationPresentation } from '@/domain/learning/navigation';
import { updateLearningSettings } from '@/domain/learning/settings';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

const mobileKickers = {
  en: ['Overview', 'Learning', 'Reasoning', 'Practice', 'Action', 'Progress'],
  kk: ['Шолу', 'Оқу', 'Ойлау', 'Жаттығу', 'Әрекет', 'Прогресс'],
} as const;

export function AppNav({ inverse = false }: { inverse?: boolean }) {
  const { state, updateState, hydrated } = useGuestProgress();
  const pathname = usePathname();
  const navigation = resolveAppNavigationPresentation(state, new Date());
  const activeHref = navigationSectionForPath(pathname);
  const locale = state.settings.preferredLocale;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  function setLocale(nextLocale: 'en' | 'kk') {
    if (!hydrated || nextLocale === locale) return;
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { preferredLocale: nextLocale }),
    }));
  }

  function closeMenu(focusToggle = false) {
    if (!menuOpen || menuClosing) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    const finish = () => {
      setMenuOpen(false);
      setMenuClosing(false);
      if (focusToggle) window.requestAnimationFrame(() => toggleRef.current?.focus());
    };
    if (reduced) {
      finish();
      return;
    }
    setMenuClosing(true);
    closeTimerRef.current = window.setTimeout(finish, 360);
  }

  useEffect(() => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setMenuClosing(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    const rail = desktopLinksRef.current;
    if (!rail) return;

    let frame = 0;
    const syncActiveGlider = () => {
      frame = 0;
      const active = rail.querySelector<HTMLElement>('a[aria-current="page"]');
      if (!active) {
        rail.style.setProperty('--nav-active-opacity', '0');
        return;
      }
      const railRect = rail.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      rail.style.setProperty('--nav-active-x', `${Math.round(activeRect.left - railRect.left)}px`);
      rail.style.setProperty('--nav-active-width', `${Math.round(activeRect.width)}px`);
      rail.style.setProperty('--nav-active-opacity', '1');
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncActiveGlider);
    };

    schedule();
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    resizeObserver?.observe(rail);
    rail.querySelectorAll('a').forEach((link) => resizeObserver?.observe(link));
    window.addEventListener('resize', schedule, { passive: true });
    document.fonts?.ready.then(schedule).catch(() => undefined);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, [activeHref, locale, pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      left: body.style.left,
      right: body.style.right,
    };
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.left = '0';
    body.style.right = '0';

    const focusables = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? []).filter((element) => !element.hasAttribute('disabled'));

    const focusFrame = window.requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key === 'Tab') {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKey);
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.left = previous.left;
      body.style.right = previous.right;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen, menuClosing]);

  const primaryItems = navigation.items;
  const kickers = mobileKickers[locale];

  return (
    <nav className={inverse ? 'app-nav editorial-nav app-nav--inverse' : 'app-nav editorial-nav'} aria-label={locale === 'kk' ? 'Негізгі навигация' : 'Primary navigation'}>
      <Link href="/" className="brand-lockup editorial-nav__brand" aria-label={locale === 'kk' ? 'EcoPulse басты беті' : 'EcoPulse home'} data-magnetic>
        <PulseHeart size={20} />
        <span>EcoPulse</span>
      </Link>

      <div ref={desktopLinksRef} className="app-nav__links editorial-nav__desktop-links">
        <span className="editorial-nav__active-glider" aria-hidden="true" />
        {primaryItems.map((item) => {
          const active = activeHref === item.href;
          return (
            <Link href={item.href} key={item.href} aria-current={active ? 'page' : undefined} data-label={item.label} data-description={item.description} title={item.description} className={`${active ? 'app-nav__link--active' : ''}${item.href === '/challenges' ? ' app-nav__link--challenges' : ''}`.trim()}>
              <span>{item.label}</span>
              {item.badge ? <strong className="app-nav__badge" aria-label={locale === 'kk' ? `${item.badge} қайталау дайын` : `${item.badge} reviews due`}>{item.badge}</strong> : null}
            </Link>
          );
        })}
      </div>

      <div className="app-nav__tools editorial-nav__actions">
        <Link href="/about" className="editorial-nav__method">{locale === 'kk' ? 'Әдіс' : 'Method'}</Link>
        <div className="nav-language-toggle" role="group" aria-label={locale === 'kk' ? 'Тілді ауыстыру' : 'Change language'}>
          <button type="button" aria-pressed={locale === 'en'} disabled={!hydrated} onClick={() => setLocale('en')}>EN</button>
          <button type="button" aria-pressed={locale === 'kk'} disabled={!hydrated} onClick={() => setLocale('kk')}>ҚАЗ</button>
        </div>
        <Link className="editorial-nav__start" href="/start" data-magnetic>{locale === 'kk' ? 'Бастау' : 'Start'}</Link>
        <button
          ref={toggleRef}
          type="button"
          className="nav-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="editorial-mobile-nav"
          aria-label={menuOpen ? (locale === 'kk' ? 'Мәзірді жабу' : 'Close menu') : (locale === 'kk' ? 'Мәзірді ашу' : 'Open menu')}
          onClick={() => { if (menuOpen) closeMenu(); else { setMenuClosing(false); setMenuOpen(true); } }}
        >
          <span /> <span />
        </button>
      </div>

      {menuOpen ? (
        <div ref={panelRef} className={menuClosing ? 'editorial-nav__mobile-panel editorial-nav__mobile-panel--closing' : 'editorial-nav__mobile-panel'} id="editorial-mobile-nav" role="dialog" aria-modal="true" aria-label={locale === 'kk' ? 'Мобильді мәзір' : 'Mobile navigation'}>
          <div className="editorial-nav__mobile-head">
            <div>
              <span className="editorial-nav__mobile-kicker">EcoPulse</span>
              <strong>{locale === 'kk' ? 'Қайда барамыз?' : 'Where next?'}</strong>
            </div>
            <button type="button" className="editorial-nav__mobile-close" onClick={() => closeMenu(true)} aria-label={locale === 'kk' ? 'Жабу' : 'Close'}>×</button>
          </div>
          <div className="editorial-nav__mobile-links">
            {primaryItems.map((item, itemIndex) => (
              <Link
                href={item.href}
                key={item.href}
                aria-current={activeHref === item.href ? 'page' : undefined}
                className={item.href === '/challenges' ? 'app-nav__challenge-shortcut' : undefined}
                style={{ '--nav-index': itemIndex } as CSSProperties}
              >
                <span className="editorial-nav__mobile-kicker">{kickers[itemIndex] ?? 'EcoPulse'}</span>
                <strong>{item.label}</strong>
                <small className="editorial-nav__mobile-description">{item.description}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
          <div className="editorial-nav__mobile-footer">
            <div className="editorial-nav__mobile-note">
              <PulseHeart size={22} />
              <p>{locale === 'kk' ? 'Ағылшын үйрен. Жерді түсін. Әрекет ет.' : 'Learn English. Understand Earth. Take action.'}</p>
            </div>
            <div>
              <Link href="/about">{locale === 'kk' ? 'Әдіс және дереккөздер' : 'Method & sources'}</Link>
              <Link href="/settings">{locale === 'kk' ? 'Баптаулар' : 'Settings'}</Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
