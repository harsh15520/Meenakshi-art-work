import * as Sentry from "@sentry/nextjs";
import { getSentryDsn } from "./lib/sentryDsn";

Sentry.init({
  dsn: getSentryDsn(),
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Add edge runtime-specific context
    event.tags = {
      ...event.tags,
      runtime: "edge",
    };
    return event;
  },
});
