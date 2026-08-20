import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Artist } from "./types";

export default function FinalCta({ artist }: { artist: Artist }) {
  return (
    <section className="artist-cta">
      <Reveal>
        <h2>Inspired by {artist.name}&apos;s journey?</h2>
        <p>Begin your own.</p>
        <Link href="/academy" className="cta-button">Start Your Art Journey</Link>
      </Reveal>
    </section>
  );
}
