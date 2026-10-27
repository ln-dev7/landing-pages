export class HouseAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes: OscillatorNode[] = [];
  async enable() {
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
      [55, 82.41, 110.3].forEach((f, i) => {
        const osc = this.context!.createOscillator();
        const gain = this.context!.createGain();
        osc.type = "sine";
        osc.frequency.value = f;
        gain.gain.value = 0.055 / (i + 1);
        osc.connect(gain).connect(this.master!);
        osc.start();
        this.nodes.push(osc);
      });
    }
    await this.context.resume();
    this.master!.gain.setTargetAtTime(1, this.context.currentTime, 0.6);
  }
  disable() {
    if (this.context && this.master)
      this.master.gain.setTargetAtTime(0, this.context.currentTime, 0.2);
  }
  chime() {
    if (!this.context || !this.master) return;
    const ctx = this.context;
    [220, 330, 440.6].forEach((f, i) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.frequency.value = f;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.1 / (i + 1), ctx.currentTime + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);
      o.connect(g).connect(this.master!);
      o.start();
      o.stop(ctx.currentTime + 3);
    });
  }
  dispose() {
    this.nodes.forEach((n) => n.stop());
    void this.context?.close();
    this.context = null;
  }
}
