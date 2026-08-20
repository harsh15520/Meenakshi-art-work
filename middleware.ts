import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge middleware (network layer):
 *  - Behind a TLS-terminating proxy (e.g. Vercel), force HTTPS via 308 redirect
 *    when the client used plain HTTP, and add HSTS so browsers remember TLS.
 *  - Both behaviors key off the ACTUAL request transport (`x-forwarded-proto`),
 *    never NODE_ENV alone. A local `next start` also runs with NODE_ENV=
 *    "production" over plain HTTP with no proxy header; emitting HSTS there
 *    makes browsers force HTTPS for `localhost` for the whole max-age (2 years),
 *    producing ERR_SSL_PROTOCOL_ERROR — and re-poisons the browser even after
 *    its HSTS store is cleared. Per RFC 6797 §8.1, HSTS received over insecure
 *    transport must be ignored anyway, so nothing is lost by requiring a
 *    secure request first.
 * Static assets are excluded to avoid needless edge work.
 */
function isLocalHost(host: string | null): boolean {
  if (!host) return false;
  const h = host.split(":")[0].toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "::1" ||
    h.endsWith(".local") ||
    h.endsWith(".localhost")
  );
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host");

  // Only force HTTPS for real public hosts. Locally (localhost / 127.0.0.1)
  // we must never redirect to https — the dev/start server speaks plain HTTP
  // and a redirect to https://localhost causes ERR_SSL_PROTOCOL_ERROR.
  // Note: some local networks/VPNs inject `x-forwarded-proto: http` even for
  // localhost, so we cannot rely on that header being absent — we gate on host.
  if (proto === "http" && !isLocalHost(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  // Advertise HSTS only when THIS response travels over TLS.
  if (proto === "https" && process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Excludes _next/image's own endpoint AND every public static-asset
    // directory it might internally re-fetch to serve a local source image
    // (images/audio/etc.) — running this middleware on that internal
    // sub-request silently breaks Next's image optimizer (the source fetch
    // comes back as an empty buffer, logged as "received null"), even though
    // the same file serves fine when requested directly. Static assets never
    // need the HTTPS-redirect/HSTS logic below anyway.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sw.js|manifest.webmanifest|images/|audio/|audio-originals/|infographic/|reports/|slides/).*)",
  ],
};
