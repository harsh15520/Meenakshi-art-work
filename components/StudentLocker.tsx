"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { studentLockerEntries } from "@/data/categoryImages";
import { recentlyUnlockedNames } from "@/data/academyToday";
import AcademyRegistryMarquee from "./AcademyRegistryMarquee";

export default function StudentLocker() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "unlocked" | "denied">("idle");
  const [match, setMatch] = useState<ReturnType<typeof findEntry>>(undefined);
  const [pending, setPending] = useState<"open" | "visit" | "close" | null>(null);

  function findEntry(n: string, c: string) {
    return studentLockerEntries.find(
      (entry) =>
        entry.name.toLowerCase() === n.trim().toLowerCase() &&
        entry.code.toLowerCase() === c.trim().toLowerCase()
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending("open");
    const found = findEntry(name, code);
    if (found) {
      setMatch(found);
      setStatus("unlocked");
    } else {
      setStatus("denied");
    }
    setPending(null);
  };

  const isUnlocked = status === "unlocked";

return (
    <section className="student-locker section-wrap">
      <svg className="student-locker__bg-mark student-locker__bg-mark--1" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
      <svg className="student-locker__bg-mark student-locker__bg-mark--2" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
      <svg className="student-locker__bg-mark student-locker__bg-mark--3" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
      <div className="student-locker__head">
        <p className="eyebrow">STUDENT SUCCESS STORIES</p>
        <h2>Every student&apos;s journey<br/><em>is theirs to share.</em></h2>
        <p className="student-locker__intro">We don&apos;t publish a child&apos;s story without their family&apos;s say-so. If you have a name and a code, open the chest below.</p>
      </div>

{/* Academy Artists Registry — a full-width horizontal band that scrolls
          above the chest frame so it stays fully visible on desktop and mobile. */}
      <AcademyRegistryMarquee />

      <div className="student-locker__stage">
        <div className="student-locker__frame">
        {/* Unlocked recently — social proof strip, shows names only, no content */}
        <div className="student-locker__recent">
          <p className="student-locker__recent-label">UNLOCKED RECENTLY</p>
          <div className="student-locker__recent-names">
            {recentlyUnlockedNames.map((name) => (
              <span key={name} className="student-locker__recent-chip">{name}</span>
            ))}
          </div>
        </div>
        <svg className="student-locker__corner student-locker__corner--tl" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
        <svg className="student-locker__corner student-locker__corner--tr" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
        <svg className="student-locker__corner student-locker__corner--bl" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>
        <svg className="student-locker__corner student-locker__corner--br" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><path d="M2 34 L2 10 Q2 2 10 2 L34 2" /><circle cx="2" cy="2" r="2.2" /></svg>

        <div className="student-locker__box">
        <svg className="student-locker__chest" viewBox="0 0 120 100" aria-hidden="true" focusable="false">
          <ellipse className="student-locker__chest-shadow" cx="60" cy="90" rx="42" ry="5" />
          <rect className="student-locker__chest-body" x="15" y="45" width="90" height="42" rx="5" />
          <circle className="student-locker__chest-stud" cx="21" cy="52" r="2.4" />
          <circle className="student-locker__chest-stud" cx="99" cy="52" r="2.4" />
          <circle className="student-locker__chest-stud" cx="21" cy="80" r="2.4" />
          <circle className="student-locker__chest-stud" cx="99" cy="80" r="2.4" />
          <rect className="student-locker__chest-band" x="10" y="42" width="100" height="7" rx="2" />
          <motion.g
            className="student-locker__chest-lid-group"
            style={{ transformOrigin: "18px 45px" }}
            animate={{ rotate: isUnlocked ? -32 : 0, x: isUnlocked ? -2 : 0, y: isUnlocked ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <path className="student-locker__chest-lid" d="M15 45 Q15 14 60 14 Q105 14 105 45 Z" />
            <rect className="student-locker__chest-band" x="10" y="41" width="100" height="6" rx="2" />
          </motion.g>
          <rect className="student-locker__chest-lock" x="51" y="47" width="18" height="22" rx="3" />
          <circle className="student-locker__chest-keyhole" cx="60" cy="54" r="2.6" />
          <path className="student-locker__chest-keyhole" d="M58.3 56 L61.7 56 L60.8 62 L59.2 62 Z" />
        </svg>

        {isUnlocked ? (
          <div className="student-locker__reveal">
            <p className="student-locker__reveal-name">{match?.name}&apos;s journey</p>
            <p className="student-locker__reveal-text">{match?.reveal}</p>
            {match?.slug ? (
              <button
                type="button"
                className={`student-locker__unlock${pending === "visit" ? " is-busy" : ""}`}
                disabled={pending === "visit"}
                onClick={() => { setPending("visit"); router.push(`/academy/${match.slug}`); }}
              >
                {pending === "visit" ? "Opening…" : <>Visit {match.name}&apos;s page<span>→</span></>}
              </button>
            ) : null}
            <button
              className={`student-locker__reset${pending === "close" ? " is-busy" : ""}`}
              disabled={pending === "close"}
              onClick={() => { setPending("close"); setStatus("idle"); setMatch(undefined); setName(""); setCode(""); setPending(null); }}
            >{pending === "close" ? "Closing…" : "Close the chest"}</button>
          </div>
        ) : (
          <form className="student-locker__form" onSubmit={handleSubmit}>
            <label className="student-locker__field">
              <span>Student&apos;s first name</span>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); setStatus("idle"); }} />
            </label>
            <label className="student-locker__field">
              <span>Shared code</span>
              <input type="text" value={code} onChange={(e) => { setCode(e.target.value); setStatus("idle"); }} />
            </label>
            <button type="submit" className={`student-locker__unlock${pending === "open" ? " is-busy" : ""}`} disabled={pending === "open"}>
              {pending === "open" ? "Opening…" : <>Open the chest<span>→</span></>}
            </button>
            {status === "denied" ? <p className="student-locker__denied">That name and code don&apos;t match — check with your instructor for the shared code.</p> : null}
          </form>
)}
        </div>
      </div>
      </div>
    </section>
  );
}
