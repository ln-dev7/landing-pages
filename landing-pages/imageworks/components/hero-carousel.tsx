"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

export const PHOTOS = [
  "1731635793329-0fdd79d179db",
  "1752350434967-29fe9a749b37",
  "1706560382811-dd7d0282c904",
  "1756992293716-b843700b5ab0",
  "1660399618104-53cf6b33339f",
  "1770492727730-05cb5ff3e90a",
  "1776662958125-893f153f592a",
  "1785403241855-f887b4eecf31",
  "1785403241660-b8ac924e9142",
  "1785403241652-5289a59f6f86",
];

export const photoUrl = (id: string, size = 640) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&q=75&auto=format&fit=crop`;

interface HeroCarouselProps {
  stageId: string;
  className?: string;
  onSettled?: () => void;
}

const RAD_62 = (62 * Math.PI) / 180;
const uCurve = (e: number) => {
  const t = Math.min(1, e);
  return 0.56 - 0.7 * t * (1 - t) + 0.1 * t;
};
const cAngle = (e: number) => RAD_62 * (1 - Math.pow(1 - Math.min(e, 1), 1.6));

function computeCurve(e: number, t: number, i: number) {
  const n = Math.min(0.48 * t, 0.7 * e);
  const r = Math.min(0.085 * t, 0.35 * n);
  const a = n / r;
  const s = (val: number) => r * Math.pow(a, val);
  const o = (val: number) => s(val) * Math.cos(cAngle(val));
  let l = 0;
  for (let idx = 0; idx < 1024; idx++) {
    const progress = (idx + 0.5) / 1024;
    l += o(progress) * (1 - uCurve(progress));
  }
  l /= 1024;

  const h = (paramE: number, paramT: number) => {
    const nVal = i / s(paramT);
    const rVal = cAngle(paramT);
    const aVal = (paramE * nVal) / i - 0.5 * Math.cos(rVal);
    return (i * aVal) / (nVal + 0.5 * Math.sin(rVal));
  };

  let d = 1;
  let p = 64;
  for (let idx = 0; idx < 30; idx++) {
    const mid = (d + p) / 2;
    if (h(mid * l, 1) < e) d = mid;
    else p = mid;
  }
  const f = Math.max(2, p);
  const m = Math.min(64, Math.ceil(1.35 * f));
  const g = m / f;
  const v = new Float32Array(4097);
  const step = g / 4096;
  let x = 0;
  for (let idx = 1; idx <= 4096; idx++) {
    const valT = (idx - 0.5) * step;
    x += f * o(valT) * (1 - uCurve(valT)) * step;
    v[idx] = x;
  }

  return {
    density: f,
    pool: m,
    sEnd: g,
    distAt: (val: number) => i / s(val),
    axAt: (val: number) => {
      const clamped = (Math.min(Math.max(val, 0), g) / g) * 4096;
      const floorIdx = Math.floor(clamped);
      const n0 = v[floorIdx] ?? 0;
      const n1 = v[Math.min(floorIdx + 1, 4096)] ?? n0;
      return n0 + (n1 - n0) * (clamped - floorIdx);
    },
  };
}

const vertexShader = `
uniform float uBend;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  p.z += uBend * p.x * p.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

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

interface CardMeshItem {
  mesh: THREE.Mesh;
  side: number;
  index: number;
  phase: number;
  lap: number;
  slot: number;
  pending: boolean;
}

export function HeroCarousel({
  stageId,
  className,
  onSettled,
}: HeroCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const onSettledRef = useRef(onSettled);

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

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

    const canvasDom = renderer.domElement;
    canvasDom.className = "absolute inset-0 block size-full";
    canvasDom.setAttribute("aria-hidden", "true");
    container.appendChild(canvasDom);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 400);
    const planeGeo = new THREE.PlaneGeometry(1, 1, 24, 1);
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const texturesData = {
      ids: PHOTOS,
      textures: PHOTOS.map(() => null as THREE.Texture | null),
      serial: 0,
      lastUsed: [] as number[],
    };

    const loadTexture = (idx: number) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        const id = texturesData.ids[idx];
        if (!id) return reject(new Error("no image"));
        textureLoader.load(
          photoUrl(id, 640),
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.generateMipmaps = true;
            tex.anisotropy = maxAnisotropy;
            texturesData.textures[idx] = tex;
            resolve(tex);
          },
          undefined,
          reject
        );
      });

    const cardItems: CardMeshItem[] = [];

    const assignTextureToCard = (card: CardMeshItem) => {
      let candidateIdx = -1;
      let maxScore = -Infinity;
      for (let i = 0; i < texturesData.ids.length; i++) {
        if (!texturesData.textures[i]) continue;
        const diff = texturesData.serial - (texturesData.lastUsed[i] ?? -Infinity);
        if (diff > maxScore) {
          maxScore = diff;
          candidateIdx = i;
        }
      }
      if (candidateIdx < 0) return false;

      texturesData.lastUsed[candidateIdx] = texturesData.serial++;
      card.slot = candidateIdx;
      const tex = texturesData.textures[candidateIdx];
      if (tex) {
        const img = tex.image as { width?: number; height?: number } | undefined;
        const aspect =
          img?.width && img?.height ? img.width / img.height : 1;
        const repeat = new THREE.Vector2(1, 1);
        const offset = new THREE.Vector2(0, 0);
        if (aspect > 1) {
          repeat.x = 1 / aspect;
          offset.x = (1 - repeat.x) / 2;
        } else {
          repeat.y = aspect;
          offset.y = (1 - repeat.y) / 2;
        }
        const mat = card.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms.uMap) mat.uniforms.uMap.value = tex;
        if (mat.uniforms.uRepeat) mat.uniforms.uRepeat.value = repeat;
        if (mat.uniforms.uOffset) mat.uniforms.uOffset.value = offset;
      }
      return true;
    };

    for (const side of [-1, 1]) {
      for (let t = 0; t < 64; t++) {
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
            uRadius: { value: 0.03 },
            uAspect: { value: 1 },
            uBend: { value: 0 },
            uExposure: { value: 1.14 },
            uLift: { value: 0.04 },
          },
        });
        const mesh = new THREE.Mesh(planeGeo, mat);
        scene.add(mesh);
        cardItems.push({
          mesh,
          side,
          index: t,
          phase: 0,
          lap: -1,
          slot: -1,
          pending: false,
        });
      }
    }

    // Pre-load all textures
    for (let i = 0; i < texturesData.ids.length; i++) {
      loadTexture(i).catch(() => undefined);
    }

    let unitM = 1;
    let width = 1;
    let height = 1;
    let targetT = 64;
    let curve = computeCurve(50, 62, 64);

    const onResize = () => {
      const containerRect = container.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      width = Math.max(1, containerRect.width);
      height = Math.max(1, containerRect.height);
      unitM = stageRect.height / 12;

      const halfW = width / 2 / unitM;
      targetT = Math.max(64, 1.4 * halfW);
      curve = computeCurve(halfW, height / unitM, targetT);

      for (const item of cardItems) {
        item.mesh.visible = item.index < curve.pool;
        item.phase = item.index / curve.pool;
      }

      const stageDist = Math.max(
        2 * (stageRect.top - containerRect.top + stageRect.height / 2),
        2
      );
      camera.fov =
        (2 * Math.atan(stageDist / 2 / (targetT * unitM)) * 180) / Math.PI;
      camera.aspect = width / stageDist;
      camera.setViewOffset(width, stageDist, 0, 0, width, height);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const updateCardTransform = (card: CardMeshItem, tParam: number) => {
      const { mesh, side } = card;
      const dist = curve.distAt(tParam);
      const angle = cAngle(tParam);
      const posX = (curve.axAt(tParam) * dist) / targetT;

      mesh.position.set(side * posX, 0, -dist);
      mesh.rotation.y = -side * angle;

      const mat = mesh.material as THREE.ShaderMaterial;
      if (mat.uniforms.uBend) {
        mat.uniforms.uBend.value =
          0.6 * Math.pow(Math.min(tParam, 1), 1.4);
      }
      const fadeIn = Math.min(1, tParam / 0.02);
      if (mat.uniforms.uOpacity) {
        mat.uniforms.uOpacity.value = card.pending ? 0 : fadeIn;
      }
    };

    let hasSettled = false;
    const updateProgress = (elapsedTime: number) => {
      const normalizedTime = Math.min(1, Math.max(0, (elapsedTime - 0.1) / 2.8));
      const easeProgress =
        normalizedTime >= 1
          ? 1
          : 1 - Math.pow(2, -9 * normalizedTime) * (1 - 0.35 * normalizedTime);

      if (!hasSettled && normalizedTime >= 0.3) {
        hasSettled = true;
        onSettledRef.current?.();
      }

      const cycle = elapsedTime / (26 * curve.sEnd);
      for (const card of cardItems) {
        if (!card.mesh.visible) continue;
        const totalPhase = card.phase + cycle;
        const lapNum = Math.floor(totalPhase);
        if (lapNum !== card.lap) {
          card.lap = lapNum;
          card.slot = -1;
          card.pending = !assignTextureToCard(card);
        } else if (card.pending) {
          card.pending = !assignTextureToCard(card);
        }
        updateCardTransform(card, (totalPhase - lapNum) * curve.sEnd * easeProgress);
      }
    };

    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    resizeObserver.observe(stage);

    let totalElapsed = 0;
    let prevFrameTime = 0;
    let rafId = 0;
    let isVisible = true;

    const renderLoop = (time: number) => {
      rafId = requestAnimationFrame(renderLoop);
      totalElapsed += Math.min(time - prevFrameTime, 100) / 1000;
      prevFrameTime = time;
      updateProgress(totalElapsed);
      renderer.render(scene, camera);
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const startLoop = () => {
      if (!rafId && isVisible && !document.hidden) {
        prevFrameTime = performance.now();
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    if (shouldReduceMotion) {
      const renderStatic = () => {
        updateProgress(19.4);
        renderer.render(scene, camera);
      };
      renderStatic();
      onSettledRef.current?.();

      const staticInterval = window.setInterval(renderStatic, 400);
      const staticTimeout = window.setTimeout(
        () => window.clearInterval(staticInterval),
        8000
      );
      const staticResize = new ResizeObserver(renderStatic);
      staticResize.observe(container);

      return () => {
        window.clearInterval(staticInterval);
        window.clearTimeout(staticTimeout);
        resizeObserver.disconnect();
        staticResize.disconnect();
        destroyScene();
      };
    }

    const initialLoads = [0, 1, 2, 3, 4, 5].map((idx) => loadTexture(idx));
    let hasStarted = false;
    const triggerStart = () => {
      if (!hasStarted) {
        hasStarted = true;
        startLoop();
      }
    };

    Promise.allSettled(initialLoads).then(triggerStart);
    const startFallback = window.setTimeout(triggerStart, 1500);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          if (hasStarted) startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "80px" }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stopLoop();
      else if (hasStarted) startLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function destroyScene() {
      planeGeo.dispose();
      for (const card of cardItems) {
        (card.mesh.material as THREE.ShaderMaterial).dispose();
      }
      for (const tex of texturesData.textures) {
        tex?.dispose();
      }
      renderer.dispose();
      canvasDom.remove();
    }

    return () => {
      stopLoop();
      window.clearTimeout(startFallback);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      destroyScene();
    };
  }, [stageId, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        className ?? ""
      }`}
    />
  );
}
