# Monitoring and Alerting Setup

This guide explains how to set up and use the monitoring systems integrated into the Meenakshi Art Work website.

## Overview

The site uses three monitoring systems:

1. **Sentry** - Error tracking and performance monitoring
2. **Vercel Analytics** - Core Web Vitals and performance metrics
3. **Google Analytics 4** - Business analytics and user behavior tracking

## Sentry Setup

### Configuration

Sentry is configured via three files:

- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking

### Environment Variables

Add these to your environment:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-org-name
SENTRY_PROJECT=meenakshi-art-work
```

### Features Enabled

- **Error Tracking** - Captures both client and server errors
- **Performance Monitoring** - Tracks transaction performance with 10% sampling
- **Session Replay** - Records sessions for debugging (10% sampling, 100% on errors)
- **Source Maps** - Automatically uploaded on production builds

### Privacy Configuration

Sentry is configured to protect user privacy:

- All text is masked in session replays
- All media is blocked in session replays
- Cookies are removed from error reports
- No personal data is collected by default

### Viewing Errors

1. Log in to your Sentry dashboard
2. Navigate to your project
3. View issues sorted by frequency and severity
4. Filter by environment (production/staging/development)

### Best Practices

- Review errors weekly
- Set up alerts for critical issues
- Use release tracking to associate errors with deployments
- Mark issues as resolved after fixing

## Vercel Analytics Setup

### Configuration

Vercel Analytics is automatically enabled when deployed to Vercel. The integration is in `app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// In your layout:
<Analytics />
<SpeedInsights />
```

### Metrics Tracked

- **Core Web Vitals**
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- **Page Views** - Automatic page view tracking
- **Performance Scores** - Overall performance scoring

### Viewing Data

1. Go to your Vercel project dashboard
2. Click on the "Analytics" tab
3. View performance metrics and trends
4. Filter by route and time period

### Performance Budgets

Recommended targets:

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Alerts

Set up alerts in Vercel for:

- Performance regression (>20% increase in LCP)
- Error rate increase (>5%)
- Build failures

## Google Analytics 4 Setup

### Configuration

GA4 is configured via environment variables and custom event tracking in `lib/analytics.ts`.

### Environment Variables

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Custom Events Tracked

The site tracks these custom events:

- `whatsapp_inquiry` - When user clicks WhatsApp link
  - Parameters: `message_type`, `page`, `timestamp`
- `navigation_click` - Navigation menu interactions
  - Parameters: `menu_item`, `section`
- `page_view` - Enhanced page view tracking
  - Parameters: `page_title`, `page_location`
- `engagement_time` - Time spent on page
  - Parameters: `page`, `duration_seconds`
- `scroll_depth` - How far users scroll
  - Parameters: `page`, `depth_percentage`
- `academy_profile_view` - Student profile views
  - Parameters: `artist_slug`, `artist_name`
- `journal_entry_read` - Journal article reads
  - Parameters: `article_slug`, `article_title`

### Using Analytics Functions

```typescript
import { trackWhatsAppInquiry, trackNavigationClick } from '@/lib/analytics';

// Track WhatsApp inquiry
trackWhatsAppInquiry(message, currentPage);

// Track navigation
trackNavigationClick(menuItem, section);
```

### Viewing Data

1. Go to Google Analytics dashboard
2. Navigate to "Reports" → "Realtime" for live data
3. View "Events" for custom event tracking
4. Use "Explore" for custom analysis

### Privacy Approach

The analytics implementation follows a business-focused privacy approach:

- No personal data collection
- No user identification
- Aggregate behavior tracking only
- No cross-site tracking
- Basic consent implementation (no explicit consent banner needed for anonymous analytics)

## Alerting Configuration

### Sentry Alerts

Set up these alerts in Sentry:

1. **Critical Errors** - Alert immediately
2. **Error Rate Spike** - Alert when error rate increases by >50%
3. **New Issues** - Alert when new issues appear in production

### Vercel Alerts

Configure in Vercel project settings:

1. **Performance Regression** - Alert on significant slowdowns
2. **Build Failures** - Alert on deployment failures
3. **Error Rate** - Alert on increased error rates

### Google Analytics Alerts

Set up custom alerts for:

1. **Traffic Drop** - Alert when traffic drops by >30%
2. **Conversion Rate** - Alert when inquiry rate drops
3. **Zero Events** - Alert if no events are tracked for 24 hours

## Monitoring Runbook

See `docs/monitoring-runbook.md` for step-by-step procedures for responding to alerts.

## Performance Baselines

Establish baseline metrics after deployment:

- **Page Load Time**: Record average LCP for key pages
- **Error Rate**: Track baseline error rate (should be near 0)
- **User Engagement**: Track average session duration
- **Conversion Rate**: Track WhatsApp inquiry click rate

Review these metrics weekly to detect regressions.

## Troubleshooting

### Sentry Not Receiving Errors

1. Check DSN is correct in environment variables
2. Verify `NEXT_PUBLIC_SENTRY_ENVIRONMENT` is set
3. Check browser console for Sentry initialization errors
4. Test with intentional error to verify connectivity

### Vercel Analytics Not Showing Data

1. Ensure site is deployed to Vercel
2. Check Analytics is enabled in project settings
3. Verify `<Analytics />` component is in layout
4. Wait 24-48 hours for initial data to appear

### GA4 Not Receiving Events

1. Verify Measurement ID is correct
2. Check browser console for gtag errors
3. Use GA4 Realtime view to verify events
4. Ensure custom events are firing correctly

## Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Google Analytics Documentation](https://support.google.com/analytics)
