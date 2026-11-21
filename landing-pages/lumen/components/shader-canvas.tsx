"use client";

import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useShaderVariant } from "@/lib/shader-context";

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
uniform vec2 c;
uniform float ci;

uniform vec3 u_pal_base;
uniform vec3 u_pal_warm;
uniform vec3 u_pal_mid;
uniform vec3 u_pal_cool;
uniform vec3 u_pal_cursor;
uniform vec3 u_pal_rgScale;
uniform float u_brightness;

float h(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float n(vec2 u){
  vec2 i = floor(u);
  vec2 f = fract(u);
  f = f * f * (3.0 - 2.0 * f);
  float a = h(i);
  float b = h(i + vec2(1.0, 0.0));
  float c = h(i + vec2(0.0, 1.0));
  float d = h(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float m(vec2 u){
  return (n(u) * 0.5 + n(u * 2.0) * 0.25) * 1.06667;
}

void main(){
  vec2 uv = (v * 0.5 + 0.5) * r / r.x;

  vec2 cn = c / r.x;
  vec2 toC = uv - cn;
  float dC = length(toC);
  float fall = exp(-dC * 9.0) * ci;

  vec2 sh = vec2(
    n(uv * 6.0 + vec2(t * 0.9, 0.0)),
    n(uv * 6.0 + vec2(0.0, t * 1.1))
  ) - 0.5;
  vec2 disp = sh * fall * 0.55;

  uv = uv * 5.0 + disp * 5.0;

  vec2 d1 = vec2(0.18, 0.07) * t;
  vec2 d2 = vec2(-0.13, 0.21) * t;
  vec2 d3 = vec2(0.09, -0.16) * t;

  float a = m(uv + d1);
  vec3 col = mix(u_pal_base, u_pal_warm, a * 2.5);

  float b = m(uv + a * 2.4 + d2);
  col = mix(col, u_pal_mid, b * 1.5);

  float dd = m(uv + b * 3.5 + d3);
  col = mix(col, u_pal_cool, dd);

  col += u_pal_cursor * fall;
  col *= u_pal_rgScale;

  gl_FragColor = vec4(col * u_brightness, 1.0);
}
`;

export function ShaderCanvas({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { variant } = useShaderVariant();
  const variantRef = useRef(variant);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniformsRef = useRef<any>(null);

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
      dpr: 1,
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
    const curVariant = variantRef.current;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        t: { value: 0 },
        r: { value: [1, 1] },
        c: { value: [0, 0] },
        ci: { value: 0 },
        u_pal_base: { value: [...curVariant.hero.base] },
        u_pal_warm: { value: [...curVariant.hero.warm] },
        u_pal_mid: { value: [...curVariant.hero.mid] },
        u_pal_cool: { value: [...curVariant.hero.cool] },
        u_pal_cursor: { value: [...curVariant.hero.cursor] },
        u_pal_rgScale: { value: [...curVariant.hero.rgScale] },
        u_brightness: { value: curVariant.hero.brightness },
      },
    });

    uniformsRef.current = program.uniforms;
    const mesh = new Mesh(gl, { geometry, program });
    renderer.dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let rafResize = 0;
    let prevW = 0;
    let prevH = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w !== prevW || h !== prevH) {
        prevW = w;
        prevH = h;
        renderer.setSize(w, h);
        program.uniforms.r.value[0] = gl.canvas.width;
        program.uniforms.r.value[1] = gl.canvas.height;
        renderer.render({ scene: mesh });
      }
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

    const targetPos = [0, 0];
    const currentPos = [0, 0];
    let targetIntensity = 0;
    let currentIntensity = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        targetIntensity = 0;
        return;
      }
      const x = (e.clientX - rect.left) * (gl.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (gl.canvas.height / rect.height);
      targetPos[0] = x;
      targetPos[1] = gl.canvas.height - y;
      targetIntensity = 1;
    };

    const handlePointerLeave = () => {
      targetIntensity = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    window.addEventListener("blur", handlePointerLeave);

    let isIntersecting = true;
    const io = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        if (isIntersecting && !rafId && !prefersReducedMotion) {
          lastFrameTime = performance.now();
          startLoop();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    let rafId = 0;
    const startTime = performance.now();
    let lastFrameTime = startTime;
    const frameInterval = 1000 / 60;

    const startLoop = () => {
      rafId = requestAnimationFrame(startLoop);
      if (!isIntersecting) {
        cancelAnimationFrame(rafId);
        rafId = 0;
        return;
      }
      const now = performance.now();
      const delta = now - lastFrameTime;
      if (delta < frameInterval - 1) return;
      lastFrameTime = now - (delta % frameInterval);

      const smoothPos = 1 - Math.pow(0.88, delta / frameInterval);
      currentPos[0] += (targetPos[0] - currentPos[0]) * smoothPos;
      currentPos[1] += (targetPos[1] - currentPos[1]) * smoothPos;

      const smoothIntensity = 1 - Math.pow(0.94, delta / frameInterval);
      currentIntensity +=
        (targetIntensity - currentIntensity) * smoothIntensity;

      program.uniforms.t.value = (now - startTime) * 0.001;
      program.uniforms.c.value[0] = currentPos[0];
      program.uniforms.c.value[1] = currentPos[1];
      program.uniforms.ci.value = currentIntensity;

      renderer.render({ scene: mesh });
    };

    if (prefersReducedMotion) {
      program.uniforms.t.value = 0;
      renderer.render({ scene: mesh });
    } else {
      startLoop();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (isIntersecting && !rafId && !prefersReducedMotion) {
        lastFrameTime = performance.now();
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafResize);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      io.disconnect();
      canvas.remove();
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, []);

  useEffect(() => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;
    const pal = variant.hero;
    uniforms.u_pal_base.value.splice(0, 3, ...pal.base);
    uniforms.u_pal_warm.value.splice(0, 3, ...pal.warm);
    uniforms.u_pal_mid.value.splice(0, 3, ...pal.mid);
    uniforms.u_pal_cool.value.splice(0, 3, ...pal.cool);
    uniforms.u_pal_cursor.value.splice(0, 3, ...pal.cursor);
    uniforms.u_pal_rgScale.value.splice(0, 3, ...pal.rgScale);
    uniforms.u_brightness.value = pal.brightness;
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
}
