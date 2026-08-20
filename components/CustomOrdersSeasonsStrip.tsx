import { seasonalCommissions } from "@/data/customOrdersLive";
import InquiryLink from "@/components/InquiryLink";

/**
 * CustomOrdersSeasonsStrip — "Seasons of the Year" horizontal commission strip.
 *
 * Replaces the "Today in the Commission Studio" ticker. Renders each occasion
 * as a compact link in the same studio-today horizontal-scroll strip pattern,
 * each deep-linking to WhatsApp with a pre-filled occasion message.
 * Uses the tracked InquiryLink so every tap is counted in analytics like the
 * rest of the site's CTAs. Server component — no JS needed.
 */
export default function CustomOrdersSeasonsStrip() {
  return (
    <section className="studio-today" aria-label="Seasons of the year">
      <div className="studio-today__inner">
        <div className="studio-today__label">
          <span className="studio-today__heading">SEASONS OF THE YEAR</span>
          <span className="studio-today__dot" aria-hidden="true" />
          <span className="studio-today__updated">Find an occasion</span>
        </div>

        <div className="studio-today__track" role="list">
          {seasonalCommissions.map((item, i) => (
            <div key={item.title} className="studio-today__item" role="listitem">
              <InquiryLink
                message={item.message}
                className="studio-today__item-link"
              >
                <span className="studio-today__emoji" aria-hidden="true">{item.icon}</span>
                <span className="studio-today__text">
                  <span className="studio-today__line">{item.title}</span>
                  <span className="studio-today__time">Start a commission →</span>
                </span>
              </InquiryLink>
              {i < seasonalCommissions.length - 1 && (
                <div className="studio-today__divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
