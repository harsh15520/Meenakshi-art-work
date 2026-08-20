'use client';

import { useEffect } from 'react';

const GHOST_CLASS = 'ghost-hover';
const GHOST_DURATION = 700;
const STAGGER_DELAY = 2000;
const MAX_QUEUE = 30;

const seen = new WeakMap<HTMLElement, true>();
const queue: HTMLElement[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

function flushQueue() {
  const el = queue.shift();
  if (!el) {
    timer = null;
    return;
  }
  if (el.isConnected) {
    el.classList.add(GHOST_CLASS);
    setTimeout(() => el.classList.remove(GHOST_CLASS), GHOST_DURATION);
  }
  timer = setTimeout(flushQueue, STAGGER_DELAY);
}

function scheduleGhost(el: HTMLElement) {
  if (seen.has(el)) return;
  seen.set(el, true);
  if (queue.length >= MAX_QUEUE) {
    queue.shift();
  }
  queue.push(el);
  if (!timer) {
    timer = setTimeout(flushQueue, STAGGER_DELAY);
  }
}

export function useGhostHover(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const hoverMq = window.matchMedia('(hover: hover)');
    if (!hoverMq.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleGhost(entry.target as HTMLElement);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
