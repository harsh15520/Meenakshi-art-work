import Reveal from "@/components/Reveal";
import JournalThreadCard from "@/components/JournalThreadCard";
import type { JournalThread } from "@/data/journal";

export default function WorkingOnGrid({ threads }: { threads: JournalThread[] }) {
  if (threads.length === 0) return null;
  return (
    <section className="journal-working-on section-wrap">
      <Reveal>
        <p className="section-heading-label">CURRENTLY WORKING ON</p>
        <div className="journal-working-on-grid">
          {threads.map((thread) => (
            <JournalThreadCard key={thread.slug} thread={thread} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
