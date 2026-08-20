export default function StudentReviewBadge({ name }: { name: string }) {
  return (
    <a className="student-review-badge" href="https://g.page/r/CaNbqQjLp2_FEBE/review" target="_blank" rel="noopener noreferrer" aria-label="Leave a review">
      <svg viewBox="0 0 60 76" className="student-review-badge-seal">
        <path d="M8 30v34l14-8 8 8 8-8 14 8V30" fill="none" stroke="var(--wine)" strokeWidth="1.4" />
        <circle cx="30" cy="22" r="19" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="2" />
        <circle cx="30" cy="22" r="14" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <path d="M30 13l2.6 6.2 6.7.6-5.1 4.4 1.5 6.5L30 27l-5.7 3.7 1.5-6.5-5.1-4.4 6.7-.6z" fill="var(--gold)" />
      </svg>
      <span className="student-review-badge-text">
        <b className="student-review-badge-label">Pay It Forward</b>
        <i className="student-review-badge-sub">Your review helps the next family find {name}&apos;s journey</i>
      </span>
    </a>
  );
}
