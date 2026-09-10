'use client';

import { useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

type MeasuredFilterRailProps<T extends string> = {
  className?: string;
  label: string;
  ariaLabel: string;
  value: T;
  options: readonly FilterOption<T>[];
  onChange: (value: T) => void;
  transitionName?: 'mission-filter' | 'challenge-filter';
};

export function MeasuredFilterRail<T extends string>({
  className = '',
  label,
  ariaLabel,
  value,
  options,
  onChange,
  transitionName,
}: MeasuredFilterRailProps<T>) {
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<T, HTMLButtonElement>());

  useEffect(() => {
    const rail = railRef.current;
    const active = itemRefs.current.get(value);
    if (!rail || !active) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        rail.style.setProperty('--filter-glider-x', `${active.offsetLeft}px`);
        rail.style.setProperty('--filter-glider-width', `${active.getBoundingClientRect().width}px`);
        rail.style.setProperty('--filter-glider-opacity', '1');
      });
    };

    measure();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(rail);
    itemRefs.current.forEach((node) => observer?.observe(node));
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [value, options]);

  function select(next: T) {
    if (next === value) return;
    const doc = document as Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced';
    if (!transitionName || !doc.startViewTransition || reduced) {
      onChange(next);
      return;
    }

    const root = document.documentElement;
    root.dataset.uiTransition = transitionName;
    const transition = doc.startViewTransition(() => {
      flushSync(() => onChange(next));
    });
    transition.finished.finally(() => {
      if (root.dataset.uiTransition === transitionName) delete root.dataset.uiTransition;
    });
  }

  return (
    <div
      ref={railRef}
      className={`measured-filter-rail ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      <span className="measured-filter-rail__label">{label}</span>
      <span className="measured-filter-rail__glider" aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option.value}
          ref={(node) => {
            if (node) itemRefs.current.set(option.value, node);
            else itemRefs.current.delete(option.value);
          }}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => select(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
