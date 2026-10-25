// Generates subtle, non-intrusive ambient Dhaka rain/city hum via Web Audio API without needing external audio files.

class SoundAtmosphereManager {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private isPlaying = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    // Pink / rain noise generation
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain boost
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low pass filter to simulate distant rain and Dhaka monsoon atmosphere
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(0);

    this.noiseNode = noise;
    this.isPlaying = true;
  }

  public stop() {
    if (this.noiseNode && 'stop' in this.noiseNode) {
      (this.noiseNode as AudioBufferSourceNode).stop();
      this.noiseNode.disconnect();
    }
    this.isPlaying = false;
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new SoundAtmosphereManager();
