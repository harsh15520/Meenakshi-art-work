import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="not-found-section">
        <p className="eyebrow">LOST YOUR WAY?</p>
        <h1>
          This canvas hasn&apos;t
          <br />
          been painted <em>yet.</em>
        </h1>
        <p className="not-found-copy">
          The page you&apos;re looking for doesn&apos;t exist — it may have moved, or the
          link might be off by a brushstroke.
        </p>
        <div className="not-found-actions">
          <Link className="button-primary" href="/">
            Back to Home <span>→</span>
          </Link>
          <Link className="button-text" href="/gallery">
            Explore the Gallery <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
