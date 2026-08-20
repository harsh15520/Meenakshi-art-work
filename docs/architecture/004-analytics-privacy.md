# ADR 004: Analytics and Privacy Approach

## Status
Accepted

## Context
The Meenakshi Art Work website needs analytics to understand user behavior and business performance, but must respect user privacy and comply with data protection principles.

## Decision
Implement a **business-focused, privacy-conscious analytics approach** using:
- Google Analytics 4 for business analytics
- Vercel Analytics for performance monitoring
- Sentry for error tracking
- No personal data collection
- No explicit consent banner (anonymous analytics only)

## Rationale

### Business-Focused Approach

**Relevant Metrics**
- Track business-critical events (WhatsApp inquiries, navigation patterns)
- Monitor conversion funnels
- Understand user engagement with content
- Measure performance of marketing efforts

**Avoid Vanity Metrics**
- Don't track individual user identities
- Don't track personal information
- Don't track cross-site behavior
- Focus on aggregate, actionable insights

### Privacy-Conscious Implementation

**No Personal Data**
- No names, emails, or phone numbers
- No user IDs or persistent identifiers
- No location data beyond country/region
- No device fingerprinting

**Anonymous Analytics**
- Google Analytics 4 with IP anonymization
- No cross-site tracking
- No data sharing with third parties
- No retargeting or advertising features

**No Consent Banner Needed**
- Analytics are anonymous and non-intrusive
- No cookies for tracking purposes
- No personal data processing
- Compliant with privacy principles without explicit consent

### Monitoring Stack

**Google Analytics 4**
- Business metrics: page views, engagement, conversions
- Custom events for WhatsApp inquiries
- No personal data collection
- IP anonymization enabled

**Vercel Analytics**
- Core Web Vitals (LCP, FID, CLS)
- Performance metrics
- Page load times
- No personal data

**Sentry**
- Error tracking and performance monitoring
- Session replay for debugging (text masked, media blocked)
- No personal data in error reports
- Cookies removed from reports

### Custom Events Tracked

**Business Events:**
- `whatsapp_inquiry` - When user clicks WhatsApp link
- `navigation_click` - Navigation menu interactions
- `page_view` - Enhanced page view tracking
- `engagement_time` - Time spent on key pages
- `scroll_depth` - How far users scroll

**Content Events:**
- `academy_profile_view` - Student profile views
- `journal_entry_read` - Journal article reads

**Event Parameters:**
- Only non-identifying information (page, section, message type)
- No personal data
- No user identifiers

## Implementation Details

### Google Analytics 4 Configuration

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

export function trackWhatsAppInquiry(message: string, page: string) {
  trackEvent("whatsapp_inquiry", {
    message_type: message.includes("academy") ? "academy" : "general",
    page: page,
    timestamp: new Date().toISOString(),
  });
}
```

### Sentry Privacy Configuration

```typescript
// sentry.client.config.ts
Sentry.init({
  // ... other config
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  beforeSend(event) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
    }
    return event;
  },
});
```

### Environment Variables

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
```

## Consequences

### Positive
- Respects user privacy
- Complies with data protection principles
- Provides actionable business insights
- No consent banner friction
- Simple implementation
- No GDPR/CCPA compliance burden

### Negative
- Less detailed user insights than full tracking
- Cannot track individual user journeys
- Limited personalization capabilities
- Cannot do retargeting or ad tracking

### Risks

**Regulatory Changes**
- Future regulations may require consent even for anonymous analytics
- Mitigation: Monitor regulatory changes, add consent banner if needed

**Limited Insights**
- Cannot do advanced user segmentation
- Cannot track returning users
- Mitigation: Focus on aggregate metrics that don't require individual tracking

## Privacy Principles

### Data Minimization
- Collect only data needed for business insights
- No personal data collection
- No unnecessary tracking

### Transparency
- Analytics approach documented in privacy policy
- Clear about what is tracked and why
- Users can opt out via browser settings

### User Control
- Users can disable analytics via browser settings
- Users can use ad blockers
- No tracking circumvention

### Security
- Analytics data secured by providers (Google, Vercel, Sentry)
- No sensitive data transmitted
- Encrypted connections

## When to Reconsider

Consider adding more tracking if:

- Business requirements change significantly
- User authentication is added
- Personalization features are needed
- Regulatory requirements change

Consider adding consent banner if:

- Regulations require it
- User feedback requests it
- More detailed tracking becomes necessary

## Alternatives Considered

### Full Analytics with Consent Banner
- Rejected: Adds friction, not needed for current use case, more complex implementation

### No Analytics
- Rejected: No visibility into user behavior, cannot measure business performance

### Self-Hosted Analytics (Matomo, Plausible)
- Rejected: Additional hosting cost and maintenance, current providers are sufficient

### Cookie-Based Tracking
- Rejected: Privacy concerns, consent required, not needed for anonymous analytics

## References

- [Google Analytics Privacy](https://support.google.com/analytics/answer/6004245)
- [Sentry Privacy](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Vercel Analytics Privacy](https://vercel.com/docs/analytics/privacy)
