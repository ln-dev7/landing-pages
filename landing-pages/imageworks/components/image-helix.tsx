"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { PHOTOS, photoUrl } from "./hero-carousel";

const clamp01 = (e: number) => (e < 0 ? 0 : e > 1 ? 1 : e);
const smoothstep = (e: number) => e * e * (3 - 2 * e);
const clamp = (e: number, min: number, max: number) =>
  Math.min(max, Math.max(min, e));

const fragmentShader = `
precision highp float;
uniform sampler2D uMap;
uniform vec2 uRepeat;
uniform vec2 uOffset;
uniform float uOpacity;
uniform float uRadius;
uniform float uAspect;
uniform float uExposure;
uniform float uLift;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  vec2 half_ = vec2(uAspect, 1.0) * 0.5 - uRadius;
  vec2 q = abs(p) - half_;
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
  float aa = fwidth(d);
  float mask = 1.0 - smoothstep(-aa, aa, d);
  vec4 c = texture2D(uMap, vUv * uRepeat + uOffset);
  vec3 rgb = clamp(c.rgb * uExposure + uLift, 0.0, 1.0);
  gl_FragColor = vec4(rgb, c.a * mask * uOpacity);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface ImageHelixProps {
  stageId: string;
  className?: string;
}

export function ImageHelix({ stageId, className }: ImageHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const stage = document.getElementById(stageId);
    if (!container || !stage) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0, 0);
    renderer.sortObjects = true;

    const canvas = renderer.domElement;
    canvas.className =
      "absolute inset-0 block size-full opacity-0 transition-opacity duration-400 ease-[ease]";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
    camera.position.z = 10;

    const planeGeo = new THREE.PlaneGeometry(0.86, 1);
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const textures: (THREE.Texture | null)[] = PHOTOS.map(() => null);
    const promises = PHOTOS.map(
      (id, idx) =>
        new Promise<void>((resolve) => {
          loader.load(
            photoUrl(id, 640),
            (tex) => {
              tex.colorSpace = THREE.SRGBColorSpace;
              tex.minFilter = THREE.LinearMipmapLinearFilter;
              tex.generateMipmaps = true;
              tex.anisotropy = maxAnisotropy;
              textures[idx] = tex;
              resolve();
            },
            undefined,
            () => resolve()
          );
        })
    );

    const applyTexture = (card: { mesh: THREE.Mesh }, tex: THREE.Texture) => {
      const img = tex.image as { width?: number; height?: number } | undefined;
      const aspect =
        img?.width && img?.height ? img.width / img.height : 0.86;
      const repeat = new THREE.Vector2(1, 1);
      const offset = new THREE.Vector2(0, 0);
      if (aspect > 0.86) {
        repeat.x = 0.86 / aspect;
        offset.x = (1 - repeat.x) / 2;
      } else {
        repeat.y = aspect / 0.86;
        offset.y = (1 - repeat.y) / 2;
      }
      const mat = card.mesh.material as THREE.ShaderMaterial;
      if (mat.uniforms.uMap) mat.uniforms.uMap.value = tex;
      if (mat.uniforms.uRepeat) mat.uniforms.uRepeat.value = repeat;
      if (mat.uniforms.uOffset) mat.uniforms.uOffset.value = offset;
    };

    let photoIndex = 0;
    const assignNextTexture = (card: { mesh: THREE.Mesh }) => {
      for (let i = 0; i < PHOTOS.length; i++) {
        const idx = (photoIndex + i) % PHOTOS.length;
        const tex = textures[idx];
        if (tex) {
          photoIndex = idx + 1;
          applyTexture(card, tex);
          return true;
        }
      }
      return false;
    };

    interface CardItem {
      mesh: THREE.Mesh;
      index: number;
      lap: number;
      pending: boolean;
    }

    const cards: CardItem[] = [];
    for (let i = 0; i < 96; i++) {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMap: { value: null },
          uRepeat: { value: new THREE.Vector2(1, 1) },
          uOffset: { value: new THREE.Vector2(0, 0) },
          uOpacity: { value: 0 },
          uRadius: { value: 0.1 },
          uAspect: { value: 0.86 },
          uExposure: { value: 1.1 },
          uLift: { value: 0.03 },
        },
      });
      const mesh = new THREE.Mesh(planeGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      cards.push({ mesh, index: i, lap: -1, pending: true });
    }

    let width = 1;
    let height = 1;
    let params = {
      card: 80,
      spacing: 50,
      amp: 200,
      turn: 1000,
      axis: 300,
      span: 1600,
      count: 0,
    };

    const resize = () => {
      const containerRect = container.getBoundingClientRect();
      width = Math.max(1, containerRect.width);
      const stageRect = stage.getBoundingClientRect();
      height = Math.max(1, containerRect.height);

      const cardSize = clamp(0.1 * width, 84, 150);
      const spacing = 0.86 * cardSize * 0.55;
      const span = width + 1.1 * cardSize * 2;
      const count = Math.min(96, Math.ceil(span / spacing) + 1);
      const amp = clamp(0.09 * width, 80, 140);
      const isMobile = width < 640;
      const axis =
        stageRect.top -
        containerRect.top +
        stageRect.height * (isMobile ? -0.15 : 0.5) -
        (1.1 * cardSize) / 2 -
        amp;

      params = {
        card: cardSize,
        spacing,
        amp,
        turn: 1000,
        axis,
        span,
        count,
      };

      for (const card of cards) {
        card.mesh.visible = card.index < count;
      }

      const stageTop = stageRect.top - containerRect.top;
      const gradStart = stageTop - (isMobile ? 120 : 200);
      const gradEnd = stageTop + 0.3 * stageRect.height;
      const calcY = (frac: number) =>
        `${gradStart + (gradEnd - gradStart) * frac}px`;
      const maskGradient = `linear-gradient(to bottom, #000 ${calcY(0)}, rgba(0,0,0,0.9) ${calcY(
        0.25
      )}, rgba(0,0,0,0.5) ${calcY(0.5)}, rgba(0,0,0,0.1) ${calcY(0.75)}, transparent ${calcY(1)})`;

      container.style.maskImage = maskGradient;
      container.style.webkitMaskImage = maskGradient;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const updateFrame = (timeSec: number) => {
      const { card, spacing, amp, turn, axis, span, count } = params;
      const animProgress = clamp01((timeSec - 0.1) / 2.6);
      const entranceCurve =
        shouldReduceMotion || animProgress >= 1
          ? 1
          : 1 - Math.pow(2, -9 * animProgress) * (1 - 0.35 * animProgress);

      const offset = (timeSec / 26) * turn;
      const freq = (2 * Math.PI) / turn;

      for (let i = 0; i < count; i++) {
        const item = cards[i];
        if (!item) continue;

        const totalDist = i * spacing + offset;
        const lap = Math.floor(totalDist / span);
        if (lap !== item.lap) {
          item.lap = lap;
          item.pending = !assignNextTexture(item);
        } else if (item.pending) {
          item.pending = !assignNextTexture(item);
        }

        const localX = totalDist - lap * span - span / 2;
        const fade = smoothstep(
          clamp01(
            1.45 * entranceCurve - (Math.abs(localX) / (span / 2)) * 0.45
          )
        );
        const waveX = localX * fade;
        const waveAngle = Math.cos(freq * waveX);
        const posY = axis + amp * waveAngle;
        const scaleVal = (1 + 0.1 * waveAngle) * (0.6 + 0.4 * fade);

        const { mesh } = item;
        mesh.position.set(waveX, height / 2 - posY, waveX / span);
        mesh.scale.set(card * scaleVal, card * scaleVal, 1);

        const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
        if (uniforms.uOpacity) {
          uniforms.uOpacity.value = item.pending ? 0 : fade;
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    ro.observe(stage);

    const revealCanvas = () => {
      canvas.classList.replace("opacity-0", "opacity-100");
    };

    function cleanup() {
      planeGeo.dispose();
      for (const c of cards) {
        (c.mesh.material as THREE.ShaderMaterial).dispose();
      }
      for (const t of textures) {
        t?.dispose();
      }
      renderer.dispose();
      canvas.remove();
    }

    if (shouldReduceMotion) {
      const renderStatic = () => {
        updateFrame(9.62);
        renderer.render(scene, camera);
      };
      renderStatic();
      revealCanvas();
      const intervalId = window.setInterval(renderStatic, 400);
      const timerId = window.setTimeout(
        () => window.clearInterval(intervalId),
        8000
      );
      const staticRO = new ResizeObserver(renderStatic);
      staticRO.observe(container);
      return () => {
        window.clearInterval(intervalId);
        window.clearTimeout(timerId);
        ro.disconnect();
        staticRO.disconnect();
        cleanup();
      };
    }

    let elapsed = 0;
    let lastTime = 0;
    let animFrameId = 0;
    let isIntersecting = true;

    const tick = (currentTime: number) => {
      animFrameId = requestAnimationFrame(tick);
      elapsed += Math.min(currentTime - lastTime, 100) / 1000;
      lastTime = currentTime;
      updateFrame(elapsed);
      renderer.render(scene, camera);
    };

    const stop = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      }
    };

    const start = () => {
      if (!animFrameId && isIntersecting && !document.hidden) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(tick);
      }
    };

    let initialized = false;
    const initAndStart = () => {
      if (!initialized) {
        initialized = true;
        updateFrame(0);
        renderer.render(scene, camera);
        revealCanvas();
        start();
      }
    };

    Promise.allSettled(promises.slice(0, 6)).then(initAndStart);
    const fallbackTimer = window.setTimeout(initAndStart, 1500);

    const io = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
        if (isIntersecting) {
          if (initialized) start();
        } else {
          stop();
        }
      },
      { rootMargin: "80px" }
    );
    io.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (initialized) start();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      window.clearTimeout(fallbackTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      cleanup();
    };
  }, [stageId, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    />
  );
}
