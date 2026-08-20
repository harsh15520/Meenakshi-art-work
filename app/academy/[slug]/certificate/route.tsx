import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { getArtistProfile } from "@/data/artists";
import { buildAbsoluteUrl } from "@/lib/site";

// ---- Caching & rate limiting (OS memory-management + protection) ----
const CERT_CACHE_MAX = Math.max(1, Number(process.env.CERT_CACHE_MAX || 50) || 1);
const CERT_RATE_LIMIT_PER_MIN = Math.max(1, Number(process.env.CERT_RATE_LIMIT_PER_MIN || 30) || 1);

// Repeat downloads are served from an in-memory LRU cache instead of re-rendering
// (which re-allocates a QR DataURL + full PNG buffer on every hit).
const CERT_HEADERS = {
  "content-type": "image/png",
  "cache-control": "public, max-age=86400, s-maxage=3600, stale-while-revalidate=86400",
};

// Map preserves insertion order, so the first key is the oldest (LRU eviction).
const certCache = new Map<string, ArrayBuffer>();
function getCachedCertificate(slug: string): ArrayBuffer | undefined {
  const val = certCache.get(slug);
  if (val !== undefined) {
    certCache.delete(slug);
    certCache.set(slug, val); // refresh recency
  }
  return val;
}
function setCachedCertificate(slug: string, val: ArrayBuffer) {
  if (certCache.has(slug)) certCache.delete(slug);
  certCache.set(slug, val);
  if (certCache.size > CERT_CACHE_MAX) {
    const oldest = certCache.keys().next().value;
    if (oldest !== undefined) certCache.delete(oldest);
  }
}

// Fixed-window (60s) rate limiter keyed by client IP, with opportunistic pruning
// to keep the map bounded on long-lived (non-cold) instances.
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  if (rateBuckets.size > 10_000) {
    for (const [k, v] of rateBuckets) if (v.resetAt <= now) rateBuckets.delete(k);
  }
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > CERT_RATE_LIMIT_PER_MIN;
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistProfile(slug);
  if (!artist || artist.isSample) return new Response("Not found", { status: 404 });

  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response("Too many requests. Please try again later.", { status: 429 });
  }

  const cached = getCachedCertificate(slug);
  if (cached) {
    return new Response(cached, { headers: CERT_HEADERS });
  }

  const profileUrl = buildAbsoluteUrl(`/academy/${slug}`);
  const qrDataUrl = await QRCode.toDataURL(profileUrl, { margin: 1, width: 200, color: { dark: "#583a35", light: "#ffffff" } });

  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f2e9",
          fontFamily: "serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            border: "3px solid #583a35",
            padding: "50px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", fontSize: 56 }}>🎓</div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              color: "#583a35",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginTop: 20,
            }}
          >
            Certified Artist
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 600, color: "#292321", marginTop: 30 }}>
            {artist.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              fontStyle: "italic",
              color: "#3a322f",
              textAlign: "center",
              maxWidth: 600,
              marginTop: 24,
              lineHeight: 1.6,
            }}
          >
            {artist.certificate.text}
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 40, fontSize: 13, color: "#a99c93" }}>
            <div style={{ display: "flex" }}>Certificate ID: {artist.certificate.certificateId}</div>
            <div style={{ display: "flex" }}>
              Issued: {new Date(artist.certificate.issuedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} width={110} height={110} style={{ marginTop: 30 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 22, gap: 4 }}>
            <div style={{ display: "flex", fontSize: 11, color: "#a99c93", letterSpacing: 2, textTransform: "uppercase" }}>
              Your story code
            </div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#583a35", letterSpacing: 4, border: "1.5px dashed #976238", padding: "6px 18px", borderRadius: 6 }}>
              {artist.shareCode ?? ""}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 11, color: "#976238", letterSpacing: 2, textTransform: "uppercase", marginTop: 16 }}>
            Meenakshi Art Work Academy
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 1300 }
  );

  // Render once to a byte buffer, cache it (LRU), and serve with cache headers so
  // repeat downloads dodge the expensive re-render and round-trips are cached.
  const buffer = await image.arrayBuffer();
  setCachedCertificate(slug, buffer);
  return new Response(buffer, { headers: CERT_HEADERS });
}
