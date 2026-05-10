// Audio helpers for "Talk with YouSafe":
// - playBase64Audio: plays the assistant's TTS reply
// - MicRecorder: captures mic audio and produces a WAV Blob

const b64ToBytes = (b64: string): Uint8Array => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

// Shared AudioContext — iOS/iPadOS requires it to be resumed inside a user gesture.
// We create it lazily on the first user interaction so the resume() call is trusted.
const Ctx =
  window.AudioContext ||
  (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
let sharedAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new Ctx();
  }
  return sharedAudioCtx;
};

// Call this once from a user-gesture handler (e.g. "Send" button tap or mic button tap)
// to unlock audio playback on iOS/iPadOS.
export const unlockAudioContext = (): void => {
  const ac = getAudioContext();
  if (ac.state === 'suspended') {
    void ac.resume();
  }
  // iOS also needs a silent buffer played during a gesture to fully unlock
  const silent = ac.createBuffer(1, 1, ac.sampleRate);
  const src = ac.createBufferSource();
  src.buffer = silent;
  src.connect(ac.destination);
  src.start();
};

export type PlaybackCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
};

export const playBase64Audio = async (
  audioBase64: string,
  callbacks?: PlaybackCallbacks,
): Promise<void> => {
  if (!audioBase64) return;
  const bytes = b64ToBytes(audioBase64);
  const ac = getAudioContext();
  if (ac.state === 'suspended') await ac.resume();

  const ab = new ArrayBuffer(bytes.length);
  new Uint8Array(ab).set(bytes);

  const play = (src: AudioBufferSourceNode) => {
    callbacks?.onStart?.();
    src.onended = () => {
      callbacks?.onEnd?.();
    };
    src.connect(ac.destination);
    src.start();
  };

  try {
    const buffer = await ac.decodeAudioData(ab.slice(0));
    const src = ac.createBufferSource();
    src.buffer = buffer;
    play(src);
    return;
  } catch {
    const sampleRate = 24000;
    const samples = Math.floor(bytes.length / 2);
    if (samples === 0) return;
    const buffer = ac.createBuffer(1, samples, sampleRate);
    const channel = buffer.getChannelData(0);
    const view = new DataView(ab);
    for (let i = 0; i < samples; i++) {
      channel[i] = view.getInt16(i * 2, true) / 0x8000;
    }
    const src = ac.createBufferSource();
    src.buffer = buffer;
    play(src);
  }
};

// ---- Mic recording ----

const TARGET_SAMPLE_RATE = 16000;

const downsampleFloat32 = (input: Float32Array, from: number, to: number): Float32Array => {
  if (to >= from) return input;
  const ratio = from / to;
  const newLength = Math.round(input.length / ratio);
  const out = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const srcIdx = Math.round(i * ratio);
    out[i] = input[Math.min(srcIdx, input.length - 1)];
  }
  return out;
};

const floatTo16BitPCM = (float32: Float32Array): Uint8Array => {
  const out = new Uint8Array(float32.length * 2);
  const view = new DataView(out.buffer);
  for (let i = 0; i < float32.length; i++) {
    let s = Math.max(-1, Math.min(1, float32[i]));
    s = s < 0 ? s * 0x8000 : s * 0x7fff;
    view.setInt16(i * 2, s, true);
  }
  return out;
};

const buildWavBlob = (pcmChunks: Uint8Array[], sampleRate: number): Blob => {
  let totalLength = 0;
  for (const chunk of pcmChunks) totalLength += chunk.length;

  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const writeStr = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + totalLength, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, totalLength, true);

  const parts: BlobPart[] = [new Uint8Array(header) as unknown as BlobPart];
  for (const chunk of pcmChunks) parts.push(chunk as unknown as BlobPart);
  return new Blob(parts, { type: 'audio/wav' });
};

const computeRMS = (samples: Float32Array): number => {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
};

export type MicRecorderOptions = {
  onSilence?: () => void;
  silenceThreshold?: number;
  silenceDurationMs?: number;
  minSpeakDurationMs?: number;
};

export class MicRecorder {
  private ac: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private chunks: Uint8Array[] = [];
  private opts: MicRecorderOptions;

  private hasSpoken = false;
  private speakingMs = 0;
  private silenceMs = 0;
  private silenceFired = false;

  constructor(opts: MicRecorderOptions = {}) {
    this.opts = opts;
  }

  async start(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      video: false,
    });
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ac = new Ctx();
    this.source = this.ac.createMediaStreamSource(this.stream);
    this.processor = this.ac.createScriptProcessor(4096, 1, 1);

    const inputRate = this.ac.sampleRate;
    this.chunks = [];
    this.hasSpoken = false;
    this.speakingMs = 0;
    this.silenceMs = 0;
    this.silenceFired = false;

    const threshold = this.opts.silenceThreshold ?? 0.02;
    const silenceTrigger = this.opts.silenceDurationMs ?? 1500;
    const minSpeak = this.opts.minSpeakDurationMs ?? 500;

    this.processor.onaudioprocess = (e: AudioProcessingEvent) => {
      const input = e.inputBuffer.getChannelData(0);
      const frameMs = (input.length / inputRate) * 1000;

      const rms = computeRMS(input);
      if (rms > threshold) {
        if (!this.hasSpoken) this.hasSpoken = true;
        this.speakingMs += frameMs;
        this.silenceMs = 0;
      } else if (this.hasSpoken) {
        this.silenceMs += frameMs;
        if (
          !this.silenceFired &&
          this.speakingMs >= minSpeak &&
          this.silenceMs >= silenceTrigger
        ) {
          this.silenceFired = true;
          if (this.opts.onSilence) {
            const cb = this.opts.onSilence;
            queueMicrotask(() => cb());
          }
        }
      }

      const downsampled = downsampleFloat32(input, inputRate, TARGET_SAMPLE_RATE);
      const pcm16 = floatTo16BitPCM(downsampled);
      this.chunks.push(pcm16);
    };

    this.source.connect(this.processor);
    this.processor.connect(this.ac.destination);
  }

  getWavBlob(): Blob {
    return buildWavBlob(this.chunks, TARGET_SAMPLE_RATE);
  }

  async stop(): Promise<void> {
    try {
      this.processor?.disconnect();
      this.source?.disconnect();
      this.stream?.getTracks().forEach((t) => t.stop());
      await this.ac?.close();
    } finally {
      this.processor = null;
      this.source = null;
      this.stream = null;
      this.ac = null;
    }
  }
}
