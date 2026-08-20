/**
 * Generic debounce: delays invoking `fn` until `wait` ms have elapsed since the
 * last call. Used to throttle high-frequency triggers (input, scroll, resize)
 * so expensive work runs at most once per quiet period.
 *
 * The returned function exposes `.cancel()` to drop a pending invocation.
 */
export interface DebouncedFn<A extends unknown[]> {
  (...args: A): void;
  cancel(): void;
}

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number
): DebouncedFn<A> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}

/**
 * Generic throttle: invokes `fn` at most once per `wait` ms, on the leading edge,
 * then again on the trailing edge if calls occurred during the window. Useful for
 * rate-limiting scroll/observer-driven updates.
 */
export interface ThrottledFn<A extends unknown[]> {
  (...args: A): void;
  cancel(): void;
}

export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  wait: number
): ThrottledFn<A> {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: A | null = null;

  const throttled = (...args: A) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    lastArgs = args;
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        if (lastArgs) fn(...lastArgs);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    last = 0;
    lastArgs = null;
  };

  return throttled;
}
