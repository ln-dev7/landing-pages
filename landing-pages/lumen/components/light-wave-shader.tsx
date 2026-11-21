"use client";

import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useShaderVariant } from "@/lib/shader-context";

export interface WaveParams {
  amp: number;
  freq: number;
  complexity: number;
  speed: number;
  thickness: number;
  hue: number;
  curve: number;
  warp: number;
  chroma: number;
  bias: number;
}

export const DEFAULT_WAVE_PARAMS: WaveParams = {
  amp: 0.22,
  freq: 0.7,
  complexity: 0.5,
  speed: 0.5,
  thickness: 0.1,
  hue: 0.2,
  curve: 0,
  warp: 0,
  chroma: 0.85,
  bias: 0,
};

const vertexShader = `
attribute vec2 position;
varying vec2 v;
void main(){
  v = position;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
varying vec2 v;
uniform float t;
uniform vec2 r;

uniform float u_amp;
uniform float u_freq;
uniform float u_complex;
uniform float u_speed;
uniform float u_thick;
uniform float u_hue;
uniform float u_curve;
uniform float u_warp;
uniform float u_chroma;
uniform float u_bias;

uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

uniform float u_dark;

float h(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float n2(vec2 u){
  vec2 i = floor(u);
  vec2 f = fract(u);
  f = f * f * (3.0 - 2.0 * f);
  float a = h(i);
  float b = h(i + vec2(1.0, 0.0));
  float c = h(i + vec2(0.0, 1.0));
  float d = h(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float grain(vec2 p){
  return fract(sin(dot(p, vec2(12.9898, 78.233)) + t * 9.13) * 43758.5453) - 0.5;
}

vec2 centerline(float x, float phase, float yOffset, float thickMul){
  float xf = x * u_freq;
  float ts = t * u_speed;
  float w1 = sin(xf + ts + phase) * u_amp;
  float w2 = sin(xf * 2.3 + ts * 0.7 + phase * 1.7) * u_amp * 0.4 * u_complex;

  float xn = x * 0.5;
  float bow = u_curve * (xn * xn - 0.33);

  float warp = (n2(vec2(x * 0.45 + ts * 0.25, phase * 0.5)) - 0.5) * u_warp;

  float yC = w1 + w2 + bow + warp + u_bias + yOffset;

  float pinch = 0.55 + 0.45 * sin(xf * 0.6 + ts * 0.4 + phase);
  return vec2(yC, thickMul * pinch);
}

float band(vec2 p, float phase, float yOffset, float thickMul){
  vec2 cl = centerline(p.x, phase, yOffset, thickMul);
  float th = u_thick * cl.y;
  float d = abs(p.y - cl.x);
  return 1.0 - smoothstep(th * 0.55, th * 1.6, d);
}

vec3 palette(float k){
  float kk = 2.0 * abs(fract(k * 0.5) - 0.5);

  float seg = kk * 4.0;
  float si = floor(seg);
  float sf = seg - si;
  sf = sf * sf * (3.0 - 2.0 * sf);

  vec3 a, b;
  if (si < 0.5)      { a = u_c0; b = u_c1; }
  else if (si < 1.5) { a = u_c1; b = u_c2; }
  else if (si < 2.5) { a = u_c2; b = u_c3; }
  else               { a = u_c3; b = u_c4; }
  return mix(a, b, sf);
}

void main(){
  vec2 uv = v;
  uv.x *= r.x / r.y;

  const int LAYERS = 5;
  float dens = 0.0;
  float colorAccum = 0.0;
  float colorWeight = 0.0;

  for (int i = 0; i < LAYERS; i++) {
    float fi = float(i);
    float phase = fi * 1.61803;
    float yOff = (fi - 2.0) * u_thick * 0.55;
    float thickMul = mix(1.0, 0.4, fi / float(LAYERS - 1));

    float a = band(uv, phase, yOff, thickMul);
    dens += a;

    float k = u_hue
            + uv.x * 0.06
            + fi * 0.035
            + t * 0.010;
    colorAccum += a * k;
    colorWeight += a;
  }

  float alpha = 1.0 - exp(-dens * 3.2);

  float kAvg = colorWeight > 1e-4 ? colorAccum / colorWeight : u_hue;

  vec3 ribbon = palette(kAvg);

  float core = smoothstep(1.0, 2.4, dens);
  float bloom = smoothstep(0.5, 1.0, dens) * (1.0 - smoothstep(1.0, 1.8, dens));

  vec3 hi = mix(palette(kAvg + 0.05), vec3(1.0), 0.25);
  ribbon = mix(ribbon, hi, core * 0.45);
  vec3 sheen = palette(kAvg + 0.20);
  ribbon += sheen * bloom * 0.20;
  ribbon = min(ribbon, vec3(1.0));

  float g = grain(gl_FragCoord.xy);
  ribbon += g * 0.035 * alpha;

  vec3 bg = mix(vec3(1.0), vec3(0.039), u_dark);

  vec3 col = mix(bg, ribbon, alpha);

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface LightWaveShaderHandle {
  setParams: (params: Partial<WaveParams>) => void;
  getParams: () => WaveParams;
}

interface LightWaveShaderProps {
  className?: string;
  initialParams?: Partial<WaveParams>;
  dark?: boolean;
}

export const LightWaveShader = forwardRef<
  LightWaveShaderHandle,
  LightWaveShaderProps
>(function LightWaveShader(
  { className, initialParams, dark = false },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentParamsRef = useRef<WaveParams>({
    ...DEFAULT_WAVE_PARAMS,
    ...initialParams,
  });
  const darkRef = useRef(dark);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  const { variant } = useShaderVariant();
  const variantRef = useRef(variant);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniformsRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      setParams: (p) => {
        Object.assign(currentParamsRef.current, p);
      },
      getParams: () => ({ ...currentParamsRef.current }),
    }),
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
      dpr: 0.75,
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const p = currentParamsRef.current;
    const v = variantRef.current;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        t: { value: 0 },
        r: { value: [1, 1] },
        u_amp: { value: p.amp },
        u_freq: { value: p.freq },
        u_complex: { value: p.complexity },
        u_speed: { value: p.speed },
        u_thick: { value: p.thickness },
        u_hue: { value: p.hue },
        u_curve: { value: p.curve },
        u_warp: { value: p.warp },
        u_chroma: { value: p.chroma },
        u_bias: { value: p.bias },
        u_dark: { value: darkRef.current ? 1 : 0 },
        u_c0: { value: [...v.wave[0]] },
        u_c1: { value: [...v.wave[1]] },
        u_c2: { value: [...v.wave[2]] },
        u_c3: { value: [...v.wave[3]] },
        u_c4: { value: [...v.wave[4]] },
      },
    });

    uniformsRef.current = program.uniforms;
    const mesh = new Mesh(gl, { geometry, program });

    let rafResize = 0;
    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.r.value[0] = gl.canvas.width;
      program.uniforms.r.value[1] = gl.canvas.height;
    };
    handleResize();

    const ro = new ResizeObserver(() => {
      if (!rafResize) {
        rafResize = requestAnimationFrame(() => {
          rafResize = 0;
          handleResize();
        });
      }
    });
    ro.observe(container);

    let isIntersecting = true;
    let rafId = 0;
    let simTime = 0;
    let lastTime = performance.now();
    const frameInterval = 1000 / 60;

    const io = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        if (isIntersecting && !rafId && !prefersReducedMotion) {
          lastTime = performance.now();
          loop();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      if (!isIntersecting) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        return;
      }
      const now = performance.now();
      const delta = now - lastTime;
      if (delta < frameInterval - 1) return;
      simTime += 0.001 * Math.min(delta, 50);
      lastTime = now - (delta % frameInterval);

      const params = currentParamsRef.current;
      program.uniforms.t.value = simTime;
      program.uniforms.u_amp.value = params.amp;
      program.uniforms.u_freq.value = params.freq;
      program.uniforms.u_complex.value = params.complexity;
      program.uniforms.u_speed.value = Math.min(
        Math.max(params.speed, 0),
        1.5
      );
      program.uniforms.u_thick.value = params.thickness;
      program.uniforms.u_hue.value = params.hue;
      program.uniforms.u_curve.value = params.curve;
      program.uniforms.u_warp.value = params.warp;
      program.uniforms.u_chroma.value = params.chroma;
      program.uniforms.u_bias.value = params.bias;
      program.uniforms.u_dark.value = darkRef.current ? 1 : 0;

      renderer.render({ scene: mesh });
    };

    if (prefersReducedMotion) {
      const params = currentParamsRef.current;
      program.uniforms.t.value = 0;
      program.uniforms.u_amp.value = params.amp;
      program.uniforms.u_freq.value = params.freq;
      program.uniforms.u_complex.value = params.complexity;
      program.uniforms.u_speed.value = params.speed;
      program.uniforms.u_thick.value = params.thickness;
      program.uniforms.u_hue.value = params.hue;
      program.uniforms.u_curve.value = params.curve;
      program.uniforms.u_warp.value = params.warp;
      program.uniforms.u_chroma.value = params.chroma;
      program.uniforms.u_bias.value = params.bias;
      program.uniforms.u_dark.value = darkRef.current ? 1 : 0;
      renderer.render({ scene: mesh });
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafResize);
      ro.disconnect();
      io.disconnect();
      canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;
    const wave = variant.wave;
    uniforms.u_c0.value.splice(0, 3, ...wave[0]);
    uniforms.u_c1.value.splice(0, 3, ...wave[1]);
    uniforms.u_c2.value.splice(0, 3, ...wave[2]);
    uniforms.u_c3.value.splice(0, 3, ...wave[3]);
    uniforms.u_c4.value.splice(0, 3, ...wave[4]);
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
});
