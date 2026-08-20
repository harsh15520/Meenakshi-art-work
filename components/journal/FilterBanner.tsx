import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FilterBanner({
  label,
  count,
  kind,
}: {
  label: string;
  count: number;
  kind: "category" | "person" | "tag" | "search";
}) {
  return (
    <section className="journal-feed-filter-banner section-wrap">
      <Reveal>
        <div className="journal-filter-banner-inner">
          <p>
            Showing entries filtered by <b>{label}</b> — {count} {count === 1 ? "result" : "results"}.
            Bookmark this view to follow just this {kind}.
          </p>
          <Link href="/journal" className="journal-clear-filter">Clear filter ✕</Link>
        </div>
      </Reveal>
    </section>
  );
}
