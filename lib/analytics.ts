declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Track a custom analytics event
 * @param eventName - The name of the event to track
 * @param parameters - Optional event parameters
 */
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

/**
 * Track WhatsApp inquiry clicks with context
 * @param message - The pre-filled WhatsApp message
 * @param page - The page where the click occurred
 */
export function trackWhatsAppInquiry(message: string, page: string) {
  trackEvent("whatsapp_inquiry", {
    message_type: message.includes("academy") ? "academy" : "general",
    page: page,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track enhanced page views
 * @param page - The page path
 * @param title - The page title
 */
export function trackPageView(page: string, title: string) {
  trackEvent("page_view", {
    page_title: title,
    page_location: page,
  });
}

/**
 * Track navigation menu interactions
 * @param menuItem - The menu item clicked
 * @param section - The section/category
 */
export function trackNavigationClick(menuItem: string, section: string) {
  trackEvent("navigation_click", {
    menu_item: menuItem,
    section: section,
  });
}

/**
 * Track user engagement time on page
 * @param page - The page path
 * @param duration - Time spent in seconds
 */
export function trackEngagementTime(page: string, duration: number) {
  trackEvent("engagement_time", {
    page: page,
    duration_seconds: duration,
  });
}

/**
 * Track scroll depth on important pages
 * @param page - The page path
 * @param depth - Percentage of page scrolled (0-100)
 */
export function trackScrollDepth(page: string, depth: number) {
  trackEvent("scroll_depth", {
    page: page,
    depth_percentage: depth,
  });
}

/**
 * Track academy profile views
 * @param artistSlug - The artist's slug
 * @param artistName - The artist's name
 */
export function trackAcademyProfileView(artistSlug: string, artistName: string) {
  trackEvent("academy_profile_view", {
    artist_slug: artistSlug,
    artist_name: artistName,
  });
}

/**
 * Track journal article reads
 * @param articleSlug - The article's slug
 * @param articleTitle - The article's title
 */
export function trackJournalEntryRead(articleSlug: string, articleTitle: string) {
  trackEvent("journal_entry_read", {
    article_slug: articleSlug,
    article_title: articleTitle,
  });
}
