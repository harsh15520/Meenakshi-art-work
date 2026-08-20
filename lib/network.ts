/**
 * Network helper: a fetch wrapper with a hard timeout and failure telemetry.
 *
 * Every outbound HTTP call in the app (Cloudinary, Blob, future APIs) should go
 * through `timedFetch` so a hung connection can't stall a request indefinitely
 * and so failures are reported to analytics for observability.
 */

import { trackEvent } from "./analytics";

export class FetchTimeoutError extends Error {
  constructor(public url: string, public timeoutMs: number) {
    super(`Request to ${url} timed out after ${timeoutMs}ms`);
    this.name = "FetchTimeoutError";
  }
}

export interface TimedFetchOptions extends RequestInit {
  /** Abort the request if it takes longer than this (ms). Default 10s. */
  timeoutMs?: number;
  /** Label used in telemetry (e.g. "cloudinary-upload"). */
  label?: string;
}

export async function timedFetch(
  input: string | URL | Request,
  options: TimedFetchOptions = {}
): Promise<Response> {
  const { timeoutMs = 10_000, label = "fetch", ...init } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Merge with any caller-supplied signal.
  const signal = init.signal
    ? AbortSignal.any([controller.signal, init.signal as AbortSignal])
    : controller.signal;

  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

  try {
    const res = await fetch(input, { ...init, signal });
    if (!res.ok) {
      trackEvent("network_error", { label, status: res.status, url });
    }
    return res;
  } catch (err) {
    if (controller.signal.aborted) {
      trackEvent("network_timeout", { label, timeout_ms: timeoutMs, url });
      throw new FetchTimeoutError(url, timeoutMs);
    }
    trackEvent("network_error", { label, error: (err as Error).message, url });
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
