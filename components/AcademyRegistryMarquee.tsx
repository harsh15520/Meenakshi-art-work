import { academyRegistry } from "@/data/academyRegistry";

/**
 * AcademyRegistryMarquee — a full-width "Academy Artists Registry" that scrolls
 * behind the Student Locker chest.
 *
 * Two slow, opposing rows (top → left, bottom → right) so the registry feels
 * like a living museum accession record rather than a game ticker. Each entry
 * reinforces identity: artist name + level + ONE signature. The chest frame
 * (z-index above) stays fully layered on top and is never obscured.
 *
 * Server component — pure CSS animation, honours prefers-reduced-motion.
 */
export default function AcademyRegistryMarquee() {
  const mid = Math.ceil(academyRegistry.length / 2);
  const topRow = academyRegistry.slice(0, mid);
  const bottomRow = academyRegistry.slice(mid).length
    ? academyRegistry.slice(mid)
    : topRow;

  const Row = ({ entries, direction }: { entries: typeof academyRegistry; direction: "left" | "right" }) => (
    <div className={`academy-registry__row academy-registry__row--${direction}`} aria-hidden="true">
      <div className="academy-registry__track">
        {[...entries, ...entries].map((entry, i) => (
          <div className="academy-registry__entry" key={`${entry.id}-${i}`}>
            <span className="academy-registry__seal" aria-hidden="true">-◐◑◕-</span>
            <span className="academy-registry__name">{entry.name}</span>
            <span className="academy-registry__level">{entry.level}</span>
            <span className="academy-registry__divider">·</span>
            <span className="academy-registry__signature">{entry.signature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="academy-registry" aria-hidden="true">
      <div className="academy-registry__label">ACADEMY ARTISTS REGISTRY</div>
      <Row entries={topRow} direction="left" />
      <Row entries={bottomRow} direction="right" />
    </div>
  );
}
