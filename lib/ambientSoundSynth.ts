/**
 * Procedural ambient-sound synthesis for the painting-story "Experience it"
 * section — no audio files, generated in the browser with the Web Audio
 * API. Each factory returns a start/stop handle; nodes are recreated on
 * every start() since Web Audio source nodes are one-shot.
 */

export interface AmbientLoopHandle {
  start(): void;
  stop(): void;
}

export type AmbientSynthKey = "wind" | "birds" | "leaves";

function createNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/** Filtered noise with a slowly modulated lowpass cutoff, for a "gusting" wind bed. */
function createWindLoop(ctx: AudioContext, destination: AudioNode): AmbientLoopHandle {
  let source: AudioBufferSourceNode | null = null;
  let filter: BiquadFilterNode | null = null;
  let gain: GainNode | null = null;
  let lfo: OscillatorNode | null = null;
  let lfoGain: GainNode | null = null;

  function start() {
    if (source) return;
    source = ctx.createBufferSource();
    source.buffer = createNoiseBuffer(ctx, 2);
    source.loop = true;

    filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;
    filter.Q.value = 0.5;

    gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.4);

    lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.09;
    lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    source.start();
    lfo.start();
  }

  function stop() {
    if (!source) return;
    const now = ctx.currentTime;
    if (gain) {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
    }
    const cleanupSource = source;
    const cleanupLfo = lfo;
    const cleanupFilter = filter;
    const cleanupGain = gain;
    const cleanupLfoGain = lfoGain;
    window.setTimeout(() => {
      [cleanupSource, cleanupLfo].forEach((node) => {
        try {
          node?.stop();
        } catch {
          // Already stopped.
        }
        node?.disconnect();
      });
      cleanupFilter?.disconnect();
      cleanupGain?.disconnect();
      cleanupLfoGain?.disconnect();
    }, 450);
    source = null;
    filter = null;
    gain = null;
    lfo = null;
    lfoGain = null;
  }

  return { start, stop };
}

/** Bandpass-filtered noise plus short randomized gain bursts, for rustling leaves. */
function createLeavesLoop(ctx: AudioContext, destination: AudioNode): AmbientLoopHandle {
  let source: AudioBufferSourceNode | null = null;
  let filter: BiquadFilterNode | null = null;
  let gain: GainNode | null = null;
  let active = false;
  let timeoutId: number | null = null;

  function scheduleRustle() {
    const delay = 220 + Math.random() * 550;
    timeoutId = window.setTimeout(() => {
      if (!active || !gain) return;
      const now = ctx.currentTime;
      const peak = 0.05 + Math.random() * 0.09;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.04 + Math.random() * 0.05);
      gain.gain.linearRampToValueAtTime(0.015, now + 0.22 + Math.random() * 0.2);
      scheduleRustle();
    }, delay);
  }

  function start() {
    if (source) return;
    active = true;
    source = ctx.createBufferSource();
    source.buffer = createNoiseBuffer(ctx, 2);
    source.loop = true;

    filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2800;
    filter.Q.value = 0.8;

    gain = ctx.createGain();
    gain.gain.setValueAtTime(0.015, ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    source.start();
    scheduleRustle();
  }

  function stop() {
    active = false;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (!source) return;
    const now = ctx.currentTime;
    if (gain) {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
    }
    const cleanupSource = source;
    const cleanupFilter = filter;
    const cleanupGain = gain;
    window.setTimeout(() => {
      try {
        cleanupSource?.stop();
      } catch {
        // Already stopped.
      }
      cleanupSource?.disconnect();
      cleanupFilter?.disconnect();
      cleanupGain?.disconnect();
    }, 350);
    source = null;
    filter = null;
    gain = null;
  }

  return { start, stop };
}

/** Randomly-timed pitch-swept chirps, for distant bird calls. */
function createBirdsLoop(ctx: AudioContext, destination: AudioNode): AmbientLoopHandle {
  let active = false;
  let timeoutId: number | null = null;

  function playChirp() {
    const now = ctx.currentTime;
    const startFreq = 1600 + Math.random() * 800;
    const peakFreq = startFreq + 350 + Math.random() * 450;
    const endFreq = startFreq - 250;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.linearRampToValueAtTime(peakFreq, now + 0.05);
    osc.frequency.linearRampToValueAtTime(endFreq, now + 0.16);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    const panner = ctx.createStereoPanner();
    panner.pan.value = (Math.random() - 0.5) * 1.2;

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(destination);

    osc.start(now);
    osc.stop(now + 0.25);

    if (Math.random() < 0.35) {
      window.setTimeout(() => {
        if (active) playChirp();
      }, 120 + Math.random() * 80);
    }
  }

  function scheduleNext() {
    const delay = 1300 + Math.random() * 3200;
    timeoutId = window.setTimeout(() => {
      if (!active) return;
      playChirp();
      scheduleNext();
    }, delay);
  }

  function start() {
    if (active) return;
    active = true;
    playChirp();
    scheduleNext();
  }

  function stop() {
    active = false;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  return { start, stop };
}

export const AMBIENT_SYNTHS: Record<AmbientSynthKey, (ctx: AudioContext, destination: AudioNode) => AmbientLoopHandle> = {
  wind: createWindLoop,
  leaves: createLeavesLoop,
  birds: createBirdsLoop,
};
