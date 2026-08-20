import * as Sentry from "@sentry/nextjs";
import { getSentryDsn } from "./lib/sentryDsn";

Sentry.init({
  dsn: getSentryDsn(),
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Add server-specific context
    event.tags = {
      ...event.tags,
      runtime: "server",
    };
    // Scrub PII / secrets from the request before it leaves our network.
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
