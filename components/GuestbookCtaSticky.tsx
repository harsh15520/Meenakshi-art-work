"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestbookCtaSticky() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("guestbook");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-100px 0px -100px 0px" }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="guestbook-cta-sticky"
          initial={{ opacity: 0, scale: 1.3, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <p className="guestbook-cta-line-1">Your experience</p>
          <svg viewBox="0 0 60 16" className="guestbook-cta-squiggle"><path d="M4,10 Q14,4 24,10 T44,10 T58,8" /></svg>
          <p className="guestbook-cta-line-2">could appear here</p>
          <a href="https://g.page/r/CaNbqQjLp2_FEBE/review" target="_blank" rel="noopener noreferrer" className="guestbook-cta-link">Leave a review <span>→</span></a>
          <svg viewBox="0 0 32 32" className="guestbook-cta-seal"><circle cx="16" cy="16" r="13" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.6"/><circle cx="16" cy="16" r="9.5" fill="none" stroke="var(--gold)" strokeWidth="0.8"/><path d="M16 8l2 4.8 5.2.5-4 3.4 1.2 5-4.4-2.9-4.4 2.9 1.2-5-4-3.4 5.2-.5z" fill="var(--gold)"/></svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
