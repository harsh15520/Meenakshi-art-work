"use client";

import { useEffect, useRef } from "react";

/**
 * Ghost hover — a one-time, auto-played preview of an element's :hover state.
 *
 * Two fixes over the naive per-element version:
 *  1. TIMING — a card only ghosts once its SECTION is comfortably in view, and
 *     it plays for GHOST_PLAY ms (long enough to read), not a frozen 10s.
 *  2. PIANO SEQUENCING — cards in the same `group` (section) play ONE AT A TIME,
 *     each followed by a GHOST_GAP pause, so each gets its own breathing room
 *     instead of all firing together.
 *
 * Guards: prefers-reduced-motion and (hover: none) are skipped; each element
 * ghosts at most once per session (WeakMap).
 */

const GHOST_PLAY = 1600; // how long a single card holds its hover preview
const GHOST_GAP = 550; // breathing room between consecutive cards (piano)
const SECTION_THRESHOLD = 0.35; // section must be this visible before the roll begins

const played = new WeakMap<HTMLElement, true>();

type Pending = { el: HTMLElement; play: () => void };

// Per-group queue + a flag so we only start the roll once per group per mount.
const groups = new Map<string, Pending[]>();
const started = new Set<string>();

function register(group: string, item: Pending) {
  const list = groups.get(group) ?? [];
  list.push(item);
  groups.set(group, list);
}

function runGroup(group: string, container: HTMLElement) {
  if (started.has(group)) return;
  started.add(group);

  const items = groups.get(group) ?? [];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  if (reduce || !canHover) return;

  // Play one at a time, like piano keys.
  const playNext = (i: number) => {
    if (i >= items.length) return;
    const item = items[i];
    if (played.has(item.el)) {
      playNext(i + 1);
      return;
    }
    played.set(item.el, true);
    item.play();
    window.setTimeout(() => playNext(i + 1), GHOST_PLAY + GHOST_GAP);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // Small lead-in so the section is settled before the first note.
      window.setTimeout(() => playNext(0), 250);
    },
    { threshold: SECTION_THRESHOLD }
  );
  observer.observe(container);
}

export function useGhostHover<T extends HTMLElement = HTMLDivElement>(options?: {
  group?: string;
}) {
  const ref = useRef<T>(null);
  const group = options?.group ?? "default";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => {
      el.classList.add("ghost-hover");
      window.setTimeout(() => el.classList.remove("ghost-hover"), GHOST_PLAY);
    };

    register(group, { el, play });

    // Use the nearest <section> as the trigger container so the whole group
    // starts rolling once the section is comfortably in view. Fall back to the
    // element itself if no section ancestor exists.
    const container =
      (el.closest("section") as HTMLElement | null) ?? el;
    runGroup(group, container);

    return () => {
      el.classList.remove("ghost-hover");
    };
    // group is stable for the component's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
