/**
 * Returns NEXT_PUBLIC_SENTRY_DSN only if it looks like a real Sentry DSN
 * (a valid https URL), otherwise undefined. Passing a placeholder string
 * like "your-sentry-dsn" straight to Sentry.init() throws an "Invalid
 * Sentry Dsn" error on every page load — passing undefined instead lets
 * Sentry no-op quietly until a real DSN is configured.
 */
export function getSentryDsn(): string | undefined {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn || !/^https?:\/\//.test(dsn)) return undefined;
  return dsn;
}
