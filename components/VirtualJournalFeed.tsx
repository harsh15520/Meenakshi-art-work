"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { VariableSizeList, type ListChildComponentProps } from "react-window";
import JournalEntryCard from "./JournalEntryCard";
import type { JournalEntry } from "@/data/journal";
import ErrorBoundary from "./ErrorBoundary";

/**
 * VirtualJournalFeed - Renders only the journal entries currently in (or near)
 * the viewport using react-window, while preserving the 3-column CSS grid.
 *
 * Each virtualized row holds up to `columns` cards laid out with the same
 * `.journal-feed` grid styles, so the visual design is unchanged. Only the
 * rows intersecting the viewport (plus overscan) are mounted in the DOM,
 * keeping the feed cheap even with hundreds of entries.
 *
 * The original "load more / page size 9" UX is kept: `visibleCount` caps how
 * many entries are handed to the virtualizer, and an IntersectionObserver
 * sentinel grows that cap as the visitor scrolls.
 *
 * @param entries - All journal entries to display
 * @param pageSize - Number of entries to reveal per "load more" (default: 9)
 * @param columns - Cards per virtual row (matches the CSS grid; default 3)
 */
export default function VirtualJournalFeed({
  entries,
  pageSize = 9,
  columns = 3,
}: {
  entries: JournalEntry[];
  pageSize?: number;
  columns?: number;
}) {
  const listRef = useRef<VariableSizeList>(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [rowHeight, setRowHeight] = useState(420);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const shown = entries.slice(0, visibleCount);
  const rowCount = Math.ceil(shown.length / columns);

  // Reset when entries change (e.g., filter applied)
  useEffect(() => {
    setVisibleCount(pageSize);
    listRef.current?.resetAfterIndex(0);
  }, [entries, pageSize]);

  // Measure one real row so the virtualizer uses the true card height.
  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLElement>(".journal-feed-row");
    if (!el) return;
    const measure = () => setRowHeight(el.getBoundingClientRect().height || rowHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [shown.length, rowHeight]);

  // Load more when sentinel enters viewport
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + pageSize, entries.length));
  }, [entries.length, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < entries.length) {
          loadMore();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, entries.length, loadMore]);

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const start = index * columns;
      const rowEntries = shown.slice(start, start + columns);
      return (
        <div className="journal-feed-row" style={style}>
          <div className="journal-feed">
            {rowEntries.map((entry) => (
              <JournalEntryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      );
    },
    [shown, columns]
  );

  const hasMore = visibleCount < entries.length;

  if (entries.length === 0) {
    return (
      <p className="journal-feed-end">No entries match this view yet.</p>
    );
  }

  return (
    <ErrorBoundary fallback={<p className="journal-feed-end">Couldn&apos;t load the archive — please refresh.</p>}>
      <div ref={containerRef}>
        <VariableSizeList
          ref={listRef}
          height={Math.min(rowHeight * rowCount, 2400)}
          width="100%"
          itemCount={rowCount}
          itemSize={() => rowHeight}
          estimatedItemSize={420}
          overscanCount={3}
        >
          {Row}
        </VariableSizeList>

        {hasMore && (
          <div ref={sentinelRef} className="journal-feed-sentinel" aria-hidden="true">
            <span className="journal-feed-loading">Loading more entries…</span>
          </div>
        )}

        {!hasMore && entries.length > 0 && (
          <p className="journal-feed-end">You&apos;ve reached the end of the archive.</p>
        )}
      </div>
    </ErrorBoundary>
  );
}
