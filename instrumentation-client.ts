import * as Sentry from "@sentry/nextjs";
import { getSentryDsn } from "./lib/sentryDsn";

// NOTE: with Turbopack the legacy `sentry.client.config.ts` is ignored. Client
// instrumentation now lives here (Next.js `instrumentation-client.ts`
// convention). Server/edge instrumentation remains in `instrumentation.ts`.
Sentry.init({
  dsn: getSentryDsn(),
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",
  tracesSampleRate: 0.1, // Adjust based on traffic
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
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
      if (event.request.headers) {
        const headers = { ...event.request.headers };
        for (const key of Object.keys(headers)) {
          if (/^(authorization|cookie|x-forwarded-for|set-cookie)$/i.test(key)) {
            delete headers[key];
          }
        }
        event.request.headers = headers;
      }
    }
    return event;
  },
});

// Required by @sentry/nextjs v10 so client route-transition errors are
// captured. Without it the dev/prod server logs:
//   [@sentry/nextjs] ACTION REQUIRED: export onRouterTransitionStart ...
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
