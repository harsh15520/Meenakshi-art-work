import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real on-the-fly optimization is enabled: `sharp` is now an explicit
    // dependency (see package.json) so deviceSizes/imageSizes/formats below
    // actually take effect instead of every <Image sizes="..."> being inert.
    // The placeholder SVGs under public/images/placeholders/ need explicit
    // opt-in below, since Next refuses to run the optimizer on SVG sources
    // otherwise — sandboxed per Next's own documented pattern for this case,
    // safe because these are our own static assets, never user-uploaded.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      { protocol: 'https', hostname: '*.googletagmanager.com' },
      { protocol: 'https', hostname: '*.sentry.io' },
      { protocol: 'https', hostname: '*.vercel.com' },
      { protocol: 'https', hostname: 'api.github.com' },
      ...(process.env.NEXT_PUBLIC_CDN_PROVIDER && process.env.NEXT_PUBLIC_CDN_BASE_URL
        ? (() => {
            try {
              const url = new URL(process.env.NEXT_PUBLIC_CDN_BASE_URL);
              return [{
                protocol: url.protocol.replace(':', ''),
                hostname: url.hostname,
                port: url.port || '',
                pathname: `${process.env.NEXT_PUBLIC_CDN_PREFIX || '/images'}/**`,
              }];
            } catch {
              return [];
            }
          })()
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://*.sentry.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https: https://*.sentry.io; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG || "your-org-name",
  project: process.env.SENTRY_PROJECT || "meenakshi-art-work",
  silent: true,
  widenClientFileUpload: true,
});
