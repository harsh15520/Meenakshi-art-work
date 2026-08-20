# Monitoring Runbook

This runbook provides step-by-step procedures for responding to monitoring alerts and incidents.

## Table of Contents

- [Error Incidents](#error-incidents)
- [Performance Issues](#performance-issues)
- [Analytics Anomalies](#analytics-anomalies)
- [Build Failures](#build-failures)
- [Security Incidents](#security-incidents)

---

## Error Incidents

### Severity Levels

- **P1 (Critical)** - Site completely down or major functionality broken
- **P2 (High)** - Significant functionality degraded
- **P3 (Medium)** - Minor functionality affected
- **P4 (Low)** - Cosmetic or non-impacting issues

### Response Procedure

#### 1. Acknowledge Alert

- Immediately acknowledge the alert in Sentry/Vercel
- Assign severity level based on impact
- Estimate initial resolution time

#### 2. Assess Impact

- Check if users are affected
- Determine scope (all users vs specific routes)
- Identify any related errors occurring simultaneously

#### 3. Investigate

**For Client-Side Errors:**

1. Check Sentry for error details
2. Review browser console reproduction steps
3. Identify affected browsers/devices
4. Check recent deployments for correlation

**For Server-Side Errors:**

1. Check server logs in Sentry
2. Review API route error details
3. Check environment variables
4. Verify external service dependencies

**For Edge Runtime Errors:**

1. Check edge function logs
2. Review edge configuration
3. Verify edge-compatible code

#### 4. Implement Fix

- Create a fix branch
- Implement the minimal fix to resolve the issue
- Test in development environment
- Deploy to staging if available

#### 5. Deploy Fix

- Deploy fix to production
- Monitor Sentry for new errors
- Verify the fix resolves the issue
- Close the alert

#### 6. Post-Incident

- Document root cause
- Create regression test if needed
- Update monitoring thresholds if appropriate
- Schedule follow-up review

### Common Error Scenarios

#### React Component Error

**Symptoms:** White screen, component not rendering, Sentry shows React error

**Steps:**
1. Check Sentry for component stack trace
2. Identify the failing component
3. Review recent changes to that component
4. Check for null/undefined data being passed
5. Add error boundary if not present
6. Fix data validation or component logic

#### API Route Error

**Symptoms:** API calls failing, 500 errors, data not loading

**Steps:**
1. Check Sentry for server-side error details
2. Review the API route code
3. Check environment variables for the route
4. Verify external service dependencies
5. Test the API endpoint locally
6. Fix the route logic or dependency

#### Image Loading Error

**Symptoms:** Images not displaying, broken image icons

**Steps:**
1. Check image paths in data files
2. Verify images exist in public/ directory
3. Check image file formats
4. Review Next.js image configuration
5. Fix image paths or add missing images

---

## Performance Issues

### Severity Levels

- **P1 (Critical)** - Page load time > 10s or completely blocked
- **P2 (High)** - Core Web Vitals failing significantly
- **P3 (Medium)** - Performance regression > 30%
- **P4 (Low)** - Minor performance degradation

### Response Procedure

#### 1. Verify Issue

- Check Vercel Analytics for performance data
- Confirm the regression is real (not temporary)
- Identify affected pages/routes
- Check if issue affects all users or specific segments

#### 2. Identify Bottleneck

**Common Bottlenecks:**

- Large image files
- Unoptimized JavaScript bundles
- Slow API calls
- Excessive re-renders
- Third-party scripts

#### 3. Analyze

- Use Vercel Speed Insights to identify slow resources
- Check Lighthouse scores for affected pages
- Review recent code changes
- Check bundle size changes

#### 4. Implement Optimization

**Image Optimization:**
1. Compress images using Next.js Image component
2. Convert to WebP/AVIF formats
3. Implement lazy loading
4. Use appropriate image sizes

**Code Optimization:**
1. Code split large components
2. Remove unused dependencies
3. Optimize re-renders with React.memo
4. Implement dynamic imports for heavy components

**API Optimization:**
1. Cache API responses
2. Optimize database queries
3. Implement pagination
4. Use edge functions for faster responses

#### 5. Monitor

- Deploy optimizations
- Monitor Vercel Analytics for improvement
- Verify Core Web Vitals are back to baseline
- Set up alerts for future regressions

### Common Performance Scenarios

#### Large Image Files

**Symptoms:** Slow LCP, large image sizes in network tab

**Steps:**
1. Identify large images in Vercel Analytics
2. Compress images using image optimization tool
3. Convert to modern formats (WebP/AVIF)
4. Update image paths in data files
5. Verify improvement in LCP

#### JavaScript Bundle Size

**Symptoms:** Slow FID, large JS bundles

**Steps:**
1. Check bundle size in build output
2. Identify large dependencies
3. Remove unused dependencies
4. Implement code splitting
5. Use dynamic imports for heavy components

#### Slow API Calls

**Symptoms:** Slow page loads, API latency

**Steps:**
1. Identify slow API endpoints
2. Check external service response times
3. Implement caching where appropriate
4. Optimize data fetching logic
5. Consider edge functions for faster responses

---

## Analytics Anomalies

### Types of Anomalies

- **Traffic Drop** - Sudden decrease in page views
- **Zero Events** - No analytics events firing
- **Conversion Drop** - Decrease in WhatsApp inquiries
- **Unusual Patterns** - Spike in traffic from unexpected sources

### Response Procedure

#### 1. Verify Data

- Check if anomaly is real or data collection issue
- Verify GA4 is receiving events in Realtime view
- Check Vercel Analytics for comparison
- Confirm site is accessible

#### 2. Investigate Cause

**For Traffic Drop:**
1. Check site uptime
2. Review recent SEO changes
3. Check for broken links
4. Verify social media campaigns ended
5. Check seasonal patterns

**For Zero Events:**
1. Check GA4 Measurement ID is correct
2. Verify analytics script is loading
3. Check browser console for errors
4. Test with GA4 DebugView
5. Verify custom events are firing

**For Conversion Drop:**
1. Check WhatsApp link functionality
2. Verify inquiry tracking is working
3. Review recent content changes
4. Check for technical issues with contact forms
5. Analyze user behavior changes

#### 3. Fix Issue

- Fix data collection if broken
- Address technical issues affecting conversions
- Update content if needed
- Monitor for recovery

---

## Build Failures

### Response Procedure

#### 1. Identify Failure

- Check Vercel build logs
- Identify the specific error
- Note which commit caused the failure

#### 2. Investigate

- Check if error is in dependencies
- Review recent code changes
- Check TypeScript errors
- Verify environment variables

#### 3. Fix

- Fix the specific error
- Test locally if possible
- Push fix to trigger new build
- Monitor build success

#### 4. Prevent Recurrence

- Add pre-commit hooks if appropriate
- Improve error messages
- Update documentation
- Add tests for the failing code

---

## Security Incidents

### Types of Incidents

- **Data Exposure** - Sensitive data accidentally exposed
- **Unauthorized Access** - Suspicious login attempts
- **Dependency Vulnerability** - Security vulnerability in dependencies
- **Content Injection** - Malicious content added

### Response Procedure

#### 1. Contain

- If data exposure, remove sensitive data immediately
- If unauthorized access, change passwords
- If dependency vulnerability, update to secure version
- If content injection, remove malicious content

#### 2. Assess Impact

- Determine what data was exposed
- Identify affected users
- Check for unauthorized changes
- Assess timeline of exposure

#### 3. Notify

- Notify stakeholders if appropriate
- Document the incident
- Communicate with users if data was exposed

#### 4. Remediate

- Fix the vulnerability
- Implement additional safeguards
- Update monitoring to detect similar issues
- Conduct security review

#### 5. Post-Incident

- Document lessons learned
- Update security practices
- Schedule security audit if needed

#### Secret & Credential Hygiene

- All secrets are injected via environment variables (`process.env`) — never
  hard-code credentials in the repository. A repo sweep confirms none are committed.
- Rotate credentials if leaked or on team-member departure (Cloudinary
  `CLOUDINARY_API_SECRET`, Vercel `BLOB_READ_WRITE_TOKEN`, Sentry auth token):
  1. Generate a new value in the provider dashboard.
  2. Save it in the hosting platform's environment settings (Vercel project env).
  3. Redeploy so the new value is picked up.
  4. Verify the new deployment works before revoking/ disabling the old value.
  5. Note the rotation in this runbook and notify the team.
- Never log secret values; avoid sending them into Sentry.
- `.env.local.example` documents placeholders only — real values live in the
  platform env, not in the repo.

#### Flagged follow-ups (isolated review required — not yet applied)

- **CSP tightening:** `next.config.mjs` currently permits `'unsafe-inline'` in
  `script-src` for Sentry/GTM. Removing it is a high-regression change; attempt
  only as an isolated PR with a full cross-browser functional pass.
- **Third-party script / worker offload (Partytown):** experimental; requires an
  A/B performance evaluation before enabling.

---

## Escalation Matrix

| Severity | Response Time | Escalation |
|----------|---------------|------------|
| P1 Critical | 15 minutes | Immediate escalation to all stakeholders |
| P2 High | 1 hour | Escalate to technical lead |
| P3 Medium | 4 hours | Handle within team |
| P4 Low | 24 hours | Handle in regular workflow |

## Communication Templates

### Incident Announcement

```
INCIDENT: [Title]
Severity: [P1/P2/P3/P4]
Status: [Investigating/Identified/Monitoring/Resolved]
Started: [Timestamp]
Impact: [Description of impact]
```

### Resolution Update

```
INCIDENT UPDATE: [Title]
Status: Resolved
Resolved: [Timestamp]
Root Cause: [Description]
Fix Applied: [Description]
Prevention: [Description of future prevention]
```

## On-Call Responsibilities

- Monitor alerts during on-call hours
- Respond to alerts within SLA
- Document all incidents
- Participate in post-incident reviews
- Keep contact information updated

## Training

All team members should:

- Complete monitoring tool training
- Review this runbook quarterly
- Participate in incident response drills
- Stay updated on monitoring best practices

## Continuous Improvement

- Review incident response times monthly
- Update runbook based on learnings
- Add new scenarios as they occur
- Refine alert thresholds based on false positive rate
