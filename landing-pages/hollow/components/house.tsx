"use client";
import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { cameraAt, smooth, archPoint, doorProfile } from "@/lib/journey";
export type HouseState = {
  progress: number;
  paused: boolean;
  reduced: boolean;
  knock: number;
  reveal: boolean;
  offering: number;
  pointer: [number, number];
};
type Props = {
  state: MutableRefObject<HouseState>;
  onReady: () => void;
  onError: () => void;
  onLoad: (n: number) => void;
};
export function House({ state, onReady, onError, onLoad }: Props) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return;
    let disposed = false,
      frame = 0,
      clock = 0,
      last = 0,
      p = state.current.progress,
      ready = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      onError();
      return;
    }
    const container = host.current;
    const mobile = matchMedia("(max-width: 760px)").matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.35 : 1.65));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor("#101812");
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#101812", 0.043);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.08, 100);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment();
    const environment = pmrem.fromScene(envScene, 0.035);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.2;
    envScene.dispose();
    pmrem.dispose();
    const ambient = new THREE.HemisphereLight("#a6c8b3", "#322115", 1.3);
    scene.add(ambient);
    const key = new THREE.DirectionalLight("#ffcf96", 3.4);
    key.position.set(5, 9, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(mobile ? 512 : 1024, mobile ? 512 : 1024);
    key.shadow.camera.left = -9;
    key.shadow.camera.right = 9;
    key.shadow.camera.top = 9;
    key.shadow.camera.bottom = -9;
    key.shadow.camera.far = 32;
    key.shadow.normalBias = 0.04;
    key.shadow.bias = -0.0003;
    scene.add(key, key.target);
    const rim = new THREE.DirectionalLight("#7cac9c", 2);
    rim.position.set(-8, 7, -2);
    scene.add(rim, rim.target);
    const light = new THREE.PointLight("#ffad62", 12, 17, 2);
    light.position.set(0, 3.6, 1);
    scene.add(light);
    onLoad(0.18);
    const textures: THREE.Texture[] = [];
    function noiseTexture(base: string, wood = false) {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d")!;
      x.fillStyle = base;
      x.fillRect(0, 0, 256, 256);
      let seed = 153;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < 5000; i++) {
        x.fillStyle = `rgba(${rand() > 0.5 ? "255,242,212" : "0,0,0"},${rand() * 0.1})`;
        x.fillRect(
          rand() * 256,
          rand() * 256,
          wood ? 1 : 2,
          wood ? rand() * 70 : 2,
        );
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      textures.push(t);
      return t;
    }
    const stone = new THREE.MeshStandardMaterial({
      color: "#6c7561",
      map: noiseTexture("#777b6a"),
      roughness: 0.94,
    });
    const wall = new THREE.MeshStandardMaterial({
      color: "#36483b",
      map: noiseTexture("#84917d"),
      roughness: 0.91,
    });
    const wood = new THREE.MeshStandardMaterial({
      color: "#3c3026",
      map: noiseTexture("#a17a50", true),
      roughness: 0.63,
    });
    const doorMat = new THREE.MeshStandardMaterial({
      color: "#294337",
      map: noiseTexture("#899484", true),
      roughness: 0.55,
    });
    const metal = new THREE.MeshStandardMaterial({
      color: "#b88e51",
      metalness: 0.78,
      roughness: 0.3,
    });
    const iron = new THREE.MeshStandardMaterial({
      color: "#202a24",
      metalness: 0.65,
      roughness: 0.42,
    });
    const ivory = new THREE.MeshStandardMaterial({
      color: "#e6dac0",
      roughness: 0.4,
    });
    const flameMat = new THREE.MeshBasicMaterial({ color: "#ffcd86" });
    const black = new THREE.MeshStandardMaterial({
      color: "#0c1410",
      roughness: 0.8,
    });
    function mesh(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      parent: THREE.Object3D,
      x = 0,
      y = 0,
      z = 0,
    ) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = false;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
      r = 0.04,
    ) {
      return mesh(new RoundedBoxGeometry(w, h, d, 2, r), mat, parent, x, y, z);
    }
    function sphere(
      parent: THREE.Object3D,
      r: number,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
    ) {
      return mesh(new THREE.SphereGeometry(r, 32, 24), mat, parent, x, y, z);
    }
    function tube(
      parent: THREE.Object3D,
      points: THREE.Vector3[],
      radius: number,
      mat: THREE.Material,
    ) {
      return mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points),
          48,
          radius,
          8,
          false,
        ),
        mat,
        parent,
      );
    }
    function label(text: string, width = 256, height = 128, color = "#d5b77d") {
      const c = document.createElement("canvas");
      c.width = width;
      c.height = height;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${height * 0.65}px Georgia`;
      ctx.fillText(text, width / 2, height / 2);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      textures.push(t);
      return new THREE.MeshBasicMaterial({
        map: t,
        transparent: true,
        depthWrite: false,
      });
    }
    function arch(
      parent: THREE.Object3D,
      width: number,
      height: number,
      z: number,
      mat = stone,
    ) {
      function rail(
        w: number,
        h: number,
        depth: number,
        radius: number,
        material: THREE.Material,
      ) {
        const curve = new (class extends THREE.Curve<THREE.Vector3> {
          constructor() {
            super();
          }
          getPoint(t: number, target = new THREE.Vector3()) {
            const [x, y] = archPoint(w, h, t);
            return target.set(x, y, depth);
          }
        })();
        return mesh(
          new THREE.TubeGeometry(curve, 160, radius, 12, false),
          material,
          parent,
        );
      }
      rail(width, height, z, 0.16, mat);
      rail(width + 0.44, height + 0.25, z - 0.08, 0.065, metal);
    }

    const flames: THREE.Mesh[] = [];
    function candle(
      parent: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      h = 0.5,
    ) {
      mesh(
        new THREE.CylinderGeometry(0.09, 0.105, h, 20),
        ivory,
        parent,
        x,
        y + h / 2,
        z,
      );
      mesh(
        new THREE.CylinderGeometry(0.19, 0.16, 0.08, 24),
        metal,
        parent,
        x,
        y,
        z,
      );
      const f = sphere(parent, 0.065, flameMat, x, y + h + 0.11, z);
      f.scale.set(0.7, 2, 0.7);
      flames.push(f);
    }
    const doors: { left: THREE.Group; right: THREE.Group; z: number }[] = [];
    function doorway(z: number, exterior = false) {
      const group = new THREE.Group();
      scene.add(group);
      group.position.z = z;
      arch(group, 4.2, 6.4, 0);
      box(group, 0.5, 4.6, 0.7, stone, -2.48, 2.3, 0);
      box(group, 0.5, 4.6, 0.7, stone, 2.48, 2.3, 0);
      for (let side = -1; side <= 1; side += 2) {
        box(group, 5, 7, 0.5, exterior ? stone : wall, side * 5, 3.5, -0.24);
        box(group, 5, 0.18, 0.75, wood, side * 5, 0.15, 0);
        for (let k = 0; k < 4; k++) {
          box(group, 0.045, 6.4, 0.06, metal, side * (3.2 + k), 3.2, 0.04);
        }
      }
      const upperWall = new THREE.Shape();
      upperWall.moveTo(-2.5, 4.3);
      upperWall.lineTo(-2.1, 4.3);
      upperWall.absarc(0, 4.3, 2.1, Math.PI, 0, true);
      upperWall.lineTo(2.5, 4.3);
      upperWall.lineTo(2.5, 7.2);
      upperWall.lineTo(-2.5, 7.2);
      upperWall.closePath();
      mesh(
        new THREE.ExtrudeGeometry(upperWall, {
          depth: 0.5,
          bevelEnabled: false,
          curveSegments: 48,
        }),
        exterior ? stone : wall,
        group,
        0,
        0,
        -0.49,
      );
      const left = new THREE.Group(),
        right = new THREE.Group();
      left.position.x = -2.1;
      right.position.x = 2.1;
      group.add(left, right);
      [left, right].forEach((d, i) => {
        const sign = i === 0 ? 1 : -1;
        box(
          d,
          2.07,
          doorProfile.leafTop - doorProfile.leafBottom,
          0.24,
          doorMat,
          sign * 1.035,
          (doorProfile.leafTop + doorProfile.leafBottom) / 2,
          0,
        );
        for (let j = 0; j < 2; j++) {
          box(d, 1.65, 1.65, 0.065, wood, sign * 1.035, 1.12 + j * 1.92, 0.14);
          box(d, 1.5, 1.5, 0.08, doorMat, sign * 1.035, 1.12 + j * 1.92, 0.19);
        }
        const knob = mesh(
          new THREE.TorusGeometry(0.13, 0.025, 12, 32),
          metal,
          d,
          sign * 1.82,
          2.1,
          0.25,
        );
        knob.rotation.x = 0.15;
      });
      box(group, 4.2, 0.16, 0.34, wood, 0, 4.32, 0.04);
      box(group, 4.2, 0.025, 0.025, metal, 0, 4.42, 0.23);
      const fan = new THREE.Shape();
      fan.absarc(0, 4.3, 2.1, 0, Math.PI, false);
      fan.lineTo(-2.1, 4.3);
      mesh(new THREE.ShapeGeometry(fan, 32), wood, group, 0, 0, -0.02);
      for (let i = 0; i < 7; i++) {
        const a = (i * Math.PI) / 6;
        tube(
          group,
          [
            new THREE.Vector3(0, 4.35, 0.12),
            new THREE.Vector3(
              Math.cos(a) * 1.94,
              4.35 + Math.sin(a) * 1.94,
              0.12,
            ),
          ],
          0.025,
          metal,
        );
      }
      mesh(
        new THREE.PlaneGeometry(0.7, 0.4),
        label(exterior ? "13" : "✦"),
        group,
        0,
        5.55,
        0.18,
      );
      for (const side of [-1, 1]) {
        box(group, 0.45, 0.14, 0.4, metal, side * 3, 2.5, 0.5);
        candle(group, side * 3, 2.6, 0.5, 0.65);
      }
      doors.push({ left, right, z });
      return group;
    }
    doorway(0, true);
    [-13, -26, -39].forEach((z) => doorway(z));
    // A continuous house: rooms remain in world space; only the camera passes through.
    box(scene, 11, 0.4, 78, wood, 0, -0.3, -27);
    const tileGeo = new THREE.BoxGeometry(0.97, 0.035, 0.97);
    const tiles = new THREE.InstancedMesh(
      tileGeo,
      new THREE.MeshStandardMaterial({ color: "#a8a58a", roughness: 0.65 }),
      390,
    );
    let n = 0;
    const matrix = new THREE.Matrix4();
    for (let z = 10; z > -68; z--)
      for (let x = -5; x < 5; x++) {
        if ((x + z) % 2 === 0) {
          matrix.makeTranslation(x + 0.5, -0.07, z);
          tiles.setMatrixAt(n++, matrix);
        }
      }
    tiles.count = n;
    tiles.receiveShadow = true;
    scene.add(tiles);
    for (const side of [-1, 1]) {
      box(scene, 0.3, 7, 40, wall, side * 5.15, 3.5, -19);
      box(scene, 0.35, 1.2, 40, wood, side * 5, 0.6, -19);
      box(scene, 0.4, 0.1, 40, metal, side * 5, 1.3, -19);
      for (let z = -3; z > -39; z -= 3.5) {
        box(scene, 0.14, 5, 0.16, wood, side * 4.95, 3.7, z);
      }
    }
    box(scene, 10.4, 0.24, 39, wall, 0, 7.12, -19.5);
    // Exterior: a moon, wrought-iron fence, dead branches and hand-shaped pumpkins.
    const moon = sphere(
      scene,
      4.8,
      new THREE.MeshBasicMaterial({ color: "#b87f4c" }),
      0,
      13,
      -16,
    );
    moon.scale.z = 0.1;
    const pumpkinMat = new THREE.MeshStandardMaterial({
      color: "#ba5723",
      roughness: 0.66,
    });
    function pumpkin(x: number, y: number, z: number, size: number, turn = 0) {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.rotation.y = turn;
      g.scale.setScalar(size);
      g.userData.baseX = x;
      g.userData.baseScale = size;
      scene.add(g);
      const geo = new THREE.SphereGeometry(1, 64, 40);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i),
          py = pos.getY(i),
          pz = pos.getZ(i);
        const a = Math.atan2(pz, px);
        const r = 1 + 0.09 * Math.cos(a * 10);
        pos.setXYZ(i, px * r, py * 0.77, pz * r);
      }
      geo.computeVertexNormals();
      mesh(geo, pumpkinMat, g, 0, 0.77, 0);
      tube(
        g,
        [
          new THREE.Vector3(0, 1.48, 0),
          new THREE.Vector3(0.04, 1.76, 0),
          new THREE.Vector3(-0.09, 1.92, 0.02),
        ],
        0.085,
        wood,
      );
      for (const side of [-1, 1]) {
        const s = new THREE.Shape();
        s.moveTo(-0.15, -0.06);
        s.lineTo(0.15, -0.06);
        s.lineTo(0, 0.23);
        s.closePath();
        mesh(new THREE.ShapeGeometry(s), flameMat, g, side * 0.32, 1.01, 0.91);
      }
      const mouth = new THREE.Shape();
      mouth.moveTo(-0.42, 0);
      mouth.lineTo(-0.25, -0.18);
      mouth.lineTo(-0.12, -0.09);
      mouth.lineTo(0, -0.24);
      mouth.lineTo(0.14, -0.1);
      mouth.lineTo(0.28, -0.17);
      mouth.lineTo(0.43, 0);
      mouth.lineTo(0.1, -0.06);
      mouth.lineTo(-0.2, -0.04);
      mouth.closePath();
      mesh(new THREE.ShapeGeometry(mouth), flameMat, g, 0, 0.6, 1.01);
      return g;
    }
    pumpkin(-3.2, 0, 2.3, 0.65, 0.2);
    pumpkin(-4.05, 0, 1.6, 0.44, -0.2);
    pumpkin(3.1, 0, 1.5, 0.9, -0.3);
    pumpkin(4.25, 0, 2.3, 0.48, 0.2);
    for (const side of [-1, 1]) {
      for (let i = 0; i < 8; i++) {
        const x = side * (2.8 + i * 0.48);
        mesh(
          new THREE.CylinderGeometry(0.025, 0.045, 2.6, 8),
          iron,
          scene,
          x,
          1.3,
          4.5,
        );
        mesh(new THREE.ConeGeometry(0.09, 0.27, 8), metal, scene, x, 2.74, 4.5);
      }
      box(scene, 4, 0.045, 0.06, iron, side * 4.4, 1.4, 4.5);
      const tree = new THREE.Group();
      tree.position.set(side * 6, -0.1, 1);
      scene.add(tree);
      tube(
        tree,
        [
          new THREE.Vector3(),
          new THREE.Vector3(-side * 0.3, 2, 0),
          new THREE.Vector3(side * 0.2, 4.5, -0.2),
          new THREE.Vector3(-side * 0.5, 7, -0.4),
        ],
        0.14,
        wood,
      );
      for (let i = 0; i < 6; i++) {
        const y = 2 + i * 0.7;
        const dir = i % 2 ? 1 : -1;
        tube(
          tree,
          [
            new THREE.Vector3(0, y, 0),
            new THREE.Vector3(dir * (0.6 + i * 0.1), y + 0.5, 0),
            new THREE.Vector3(dir * (1 + i * 0.2), y + 1.5, -0.2),
          ],
          0.055,
          wood,
        );
      }
    }
    onLoad(0.42);
    // The gallery: portraits are original canvas illustrations, with separate watching eyes.
    const eyes: THREE.Mesh[] = [];
    const portraits: THREE.Group[] = [];
    function portrait(x: number, z: number, variation: number) {
      const g = new THREE.Group();
      g.position.set(x, 3.1, z);
      g.userData.baseX = x;
      g.rotation.y = x < 0 ? 0.35 : -0.35;
      scene.add(g);
      portraits.push(g);
      box(g, 2, 2.65, 0.16, metal);
      box(g, 1.82, 2.47, 0.18, wood, 0, 0, 0.03);
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 384;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = ["#242a25", "#332c24", "#222a2a"][variation % 3];
      ctx.fillRect(0, 0, 256, 384);
      const bg = ctx.createRadialGradient(128, 150, 10, 128, 180, 200);
      bg.addColorStop(0, "#67664d");
      bg.addColorStop(1, "#101a14");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 256, 384);
      ctx.fillStyle = "#101913";
      ctx.beginPath();
      ctx.ellipse(128, 382, 106, 146, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#909179";
      ctx.beginPath();
      ctx.ellipse(128, 158, 48, 75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#333a2c";
      ctx.beginPath();
      ctx.ellipse(105, 155, 19, 69, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#172019";
      ctx.fillRect(70, 85, 116, 16);
      ctx.fillRect(91, 44, 75, 55);
      ctx.strokeStyle = "#b8a478";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(120, 198);
      ctx.lineTo(143, 201);
      ctx.stroke();
      ctx.fillStyle = "#cebb97";
      ctx.beginPath();
      ctx.moveTo(95, 240);
      ctx.lineTo(130, 280);
      ctx.lineTo(158, 239);
      ctx.fill();
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      textures.push(t);
      mesh(
        new THREE.PlaneGeometry(1.65, 2.3),
        new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }),
        g,
        0,
        0,
        0.14,
      );
      for (const side of [-1, 1]) {
        const e = sphere(g, 0.034, flameMat, side * 0.14, 0.22, 0.17);
        e.scale.y = 0.65;
        eyes.push(e);
      }
      return g;
    }
    portrait(-2.7, -20, 0);
    portrait(0, -23, 1).position.y = 4.9;
    portrait(2.7, -20, 2);
    // Ghosts have a closed, smoothly tessellated cloth silhouette, not disconnected shapes.
    const ghosts: {
      group: THREE.Group;
      cloth: THREE.Mesh;
      base: Float32Array;
      phase: number;
      y: number;
    }[] = [];
    function ghost(x: number, y: number, z: number, size = 1, phase = 0) {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.scale.setScalar(size);
      g.userData.baseX = x;
      g.userData.baseScale = size;
      scene.add(g);
      const geo = new THREE.SphereGeometry(
        0.7,
        48,
        32,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.93,
      );
      const a = geo.attributes.position;
      for (let i = 0; i < a.count; i++) {
        const t = 1 - geo.attributes.uv.getY(i);
        const angle = Math.atan2(a.getZ(i), a.getX(i));
        const skirt = smooth(0.3, 1, t);
        const radius =
          (t < 0.32
            ? 0.65 * Math.sqrt(1 - Math.pow(1 - t / 0.32, 2))
            : 0.65 + 0.34 * smooth(0.32, 1, t)) +
          Math.sin(angle * 8) * 0.07 * skirt;
        a.setXYZ(
          i,
          Math.cos(angle) * radius,
          0.75 - t * 1.85 + Math.cos(angle * 6) * 0.1 * Math.pow(t, 6),
          Math.sin(angle) * radius,
        );
      }
      geo.computeVertexNormals();
      const cloth = mesh(
        geo,
        new THREE.MeshPhysicalMaterial({
          color: "#d4d4b7",
          roughness: 0.83,
          side: THREE.DoubleSide,
          metalness: 0,
        }),
        g,
      );
      for (const side of [-1, 1]) {
        const e = sphere(g, 0.09, black, side * 0.23, 0.16, 0.63);
        e.scale.set(0.7, 1.4, 0.4);
      }
      cloth.castShadow = true;
      ghosts.push({
        group: g,
        cloth,
        base: new Float32Array(a.array),
        phase,
        y,
      });
      return g;
    }
    ghost(2.4, 2.7, -34, 1, 0);
    ghost(-2.8, 2.8, -36, 0.8, 2);

    // The banquet: oval table, place settings, floating plates and a twelve-candle chandelier.
    const table = mesh(
      new THREE.CylinderGeometry(2.5, 2.5, 0.2, 64),
      wood,
      scene,
      0,
      1.1,
      -35,
    );
    table.scale.z = 1.4;
    for (const side of [-1, 1])
      box(scene, 0.3, 1.1, 0.3, wood, side * 1.7, 0.55, -35);
    const plates: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const x = Math.cos(a) * 1.9,
        z = -35 + Math.sin(a) * 2.6;
      const plate = mesh(
        new THREE.CylinderGeometry(0.39, 0.31, 0.05, 40),
        ivory,
        scene,
        x,
        1.24,
        z,
      );
      plate.userData.y = 1.24;
      plates.push(plate);
      mesh(
        new THREE.TorusGeometry(0.29, 0.008, 6, 40),
        metal,
        plate,
      ).rotation.x = Math.PI / 2;
      const wine = mesh(
        new THREE.CylinderGeometry(0.085, 0.055, 0.2, 16),
        metal,
        scene,
        x + 0.3,
        1.44,
        z + 0.1,
      );
      wine.rotation.z = 0.1;
      candle(
        scene,
        Math.cos(a) * 0.8,
        1.24,
        -35 + Math.sin(a) * 1.2,
        0.45 + (i % 3) * 0.17,
      );
    }
    const chandelier = new THREE.Group();
    chandelier.position.set(0, 5, -34);
    scene.add(chandelier);
    mesh(
      new THREE.TorusGeometry(1.8, 0.045, 10, 64),
      metal,
      chandelier,
    ).rotation.x = Math.PI / 2;
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      candle(chandelier, Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8, 0.4);
    }
    tube(
      chandelier,
      [new THREE.Vector3(0, 1.8, 0), new THREE.Vector3(0, 0.4, 0)],
      0.025,
      metal,
    );
    // A moonlit conservatory replaces the corridor: open sky, a tree, pond and lanterns.
    const garden = new THREE.Group();
    garden.position.z = -49;
    scene.add(garden);
    const gardenStone = new THREE.MeshStandardMaterial({
      color: "#485d58",
      roughness: 0.9,
    });
    box(garden, 11, 0.2, 28, gardenStone, 0, -0.05, -6);
    const water = mesh(
      new THREE.CircleGeometry(3.1, 80),
      new THREE.MeshPhysicalMaterial({
        color: "#243f42",
        metalness: 0.62,
        roughness: 0.2,
        clearcoat: 1,
      }),
      garden,
      0,
      0.075,
      -1.5,
    );
    water.rotation.x = -Math.PI / 2;
    water.scale.y = 1.65;
    for (const x of [-1, 1]) {
      box(garden, 0.24, 0.2, 10, metal, x * 3.15, 0.15, -1.5);
    }
    for (let i = 0; i < 8; i++) {
      const step = mesh(
        new THREE.CylinderGeometry(0.52, 0.57, 0.18, 32),
        stone,
        garden,
        Math.sin(i * 1.7) * 0.23,
        0.18,
        2 - i * 1.15,
      );
      step.scale.x = 1.5;
    }
    const skyCanvas = document.createElement("canvas");
    skyCanvas.width = 16;
    skyCanvas.height = 512;
    const skyCtx = skyCanvas.getContext("2d")!;
    const skyGradient = skyCtx.createLinearGradient(0, 0, 0, 512);
    skyGradient.addColorStop(0, "#0a1725");
    skyGradient.addColorStop(0.52, "#46646a");
    skyGradient.addColorStop(1, "#cb9970");
    skyCtx.fillStyle = skyGradient;
    skyCtx.fillRect(0, 0, 16, 512);
    const skyTex = new THREE.CanvasTexture(skyCanvas);
    skyTex.colorSpace = THREE.SRGBColorSpace;
    textures.push(skyTex);
    const sky = mesh(
      new THREE.PlaneGeometry(160, 80),
      new THREE.MeshBasicMaterial({ map: skyTex, fog: false }),
      scene,
      0,
      18,
      -80,
    );
    sky.receiveShadow = false;
    const gardenMoon = sphere(
      scene,
      2.15,
      new THREE.MeshBasicMaterial({ color: "#dddcc4", fog: false }),
      2.8,
      8,
      -66,
    );
    gardenMoon.scale.z = 0.2;
    // Structural ribs use exact arcs, with no spline overshoot or duplicated endpoints.
    for (let z = 7; z >= -13; z -= 4) {
      arch(garden, 10, 9, z, iron);
    }
    for (const side of [-1, 1]) {
      for (let z = 7; z >= -13; z -= 2) {
        box(garden, 0.045, 4.5, 0.045, metal, side * 5, 2.25, z);
      }
      for (const y of [1, 2.5, 4.5])
        box(garden, 0.08, 0.055, 20, iron, side * 5, y, -3);
      box(garden, 0.65, 0.7, 17, gardenStone, side * 4.3, 0.35, -2.5);
      for (let i = 0; i < 12; i++) {
        const x = side * (3.75 + (i % 3) * 0.26),
          z = 5 - i * 1.3;
        const fern = new THREE.Group();
        fern.position.set(x, 0.7, z);
        garden.add(fern);
        for (let j = 0; j < 5; j++) {
          const a = (j / 5) * Math.PI * 2;
          tube(
            fern,
            [
              new THREE.Vector3(),
              new THREE.Vector3(Math.cos(a) * 0.25, 0.5, Math.sin(a) * 0.25),
              new THREE.Vector3(Math.cos(a) * 0.5, 0.28, Math.sin(a) * 0.5),
            ],
            0.025,
            doorMat,
          );
        }
      }
    }
    const leaflets = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 8, 6),
      new THREE.MeshStandardMaterial({ color: "#657a4c", roughness: 0.78 }),
      24 * 5 * 5 * 2,
    );
    const leafPose = new THREE.Object3D();
    let leafIndex = 0;
    for (const side of [-1, 1])
      for (let i = 0; i < 12; i++)
        for (let j = 0; j < 5; j++)
          for (let k = 1; k <= 5; k++)
            for (const wing of [-1, 1]) {
              const a = (j / 5) * Math.PI * 2,
                t = k / 6,
                rad = t * 0.5;
              leafPose.position.set(
                side * (3.75 + (i % 3) * 0.26) +
                  Math.cos(a) * rad +
                  Math.sin(a) * wing * 0.06,
                0.7 + Math.sin(t * Math.PI * 0.8) * 0.44,
                5 - i * 1.3 + Math.sin(a) * rad - Math.cos(a) * wing * 0.06,
              );
              leafPose.rotation.set(0.15, a, wing * 0.45);
              leafPose.scale.set(
                0.09 * (1 - t * 0.55),
                0.025,
                0.15 * (1 - t * 0.5),
              );
              leafPose.updateMatrix();
              leaflets.setMatrixAt(leafIndex++, leafPose.matrix);
            }
    leaflets.receiveShadow = true;
    garden.add(leaflets);
    const tree = new THREE.Group();
    tree.position.set(2.8, 0.7, -2);
    garden.add(tree);
    tube(
      tree,
      [
        new THREE.Vector3(),
        new THREE.Vector3(-0.4, 1.5, 0),
        new THREE.Vector3(-0.1, 3.5, 0.2),
        new THREE.Vector3(-0.7, 5.6, 0),
      ],
      0.14,
      wood,
    );
    for (let i = 0; i < 7; i++) {
      const y = 1 + i * 0.6,
        sign = i % 2 ? -1 : 1;
      tube(
        tree,
        [
          new THREE.Vector3(-0.2, y, 0),
          new THREE.Vector3(sign * 0.6, y + 0.6, 0.2),
          new THREE.Vector3(sign * (1.3 + i * 0.05), y + 1.2, 0.1),
        ],
        0.045,
        wood,
      );
    }
    const lanternPalette = ["#ffc273", "#a9d8a1", "#c1a0ed"].map(
      (c) => new THREE.Color(c),
    );
    const lanternColor = new THREE.Color("#ffc273");
    const lanternGlass = new THREE.MeshPhysicalMaterial({
      color: "#bfbd92",
      transparent: true,
      opacity: 0.12,
      roughness: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const lanternGlow = new THREE.MeshBasicMaterial({ color: lanternColor });
    const lanterns: THREE.Group[] = [];
    function lantern(x: number, y: number, z: number) {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      g.userData.baseY = y;
      garden.add(g);
      lanterns.push(g);
      mesh(new THREE.TorusGeometry(0.13, 0.025, 10, 32), metal, g, 0, 0.65, 0);
      tube(
        g,
        [new THREE.Vector3(0, 0.78, 0), new THREE.Vector3(0, 3.6, 0)],
        0.012,
        iron,
      );
      mesh(new THREE.CylinderGeometry(0.22, 0.34, 0.2, 6), metal, g, 0, 0.5, 0);
      mesh(
        new THREE.CylinderGeometry(0.34, 0.34, 0.1, 6),
        metal,
        g,
        0,
        -0.36,
        0,
      );
      mesh(
        new THREE.CylinderGeometry(0.29, 0.29, 0.75, 24),
        lanternGlass,
        g,
        0,
        0.05,
        0,
      );
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        box(
          g,
          0.025,
          0.82,
          0.025,
          metal,
          Math.cos(a) * 0.3,
          0.06,
          Math.sin(a) * 0.3,
        );
      }
      const core = sphere(g, 0.13, lanternGlow, 0, 0.03, 0);
      core.scale.y = 2;
      return g;
    }
    lantern(-1.9, 3.2, 0);
    lantern(2, 3.7, -2);
    lantern(0.1, 4.7, -5);
    const gardenLight = new THREE.PointLight("#ffc273", 18, 18, 2);
    gardenLight.position.set(0, 3.2, -49);
    scene.add(gardenLight);
    // An actual wrought-iron garden gate opens into dawn, instead of an emissive rectangle.
    arch(scene, 4.4, 6.2, -61, metal);
    for (const side of [-1, 1]) {
      const gate = new THREE.Group();
      gate.position.set(side * 2.2, 0, -61);
      gate.rotation.y = side * 1.3;
      scene.add(gate);
      for (let i = 0; i < 7; i++) {
        const x = -side * i * 0.32;
        box(gate, 0.035, 3.6, 0.035, metal, x, 1.8, 0);
        mesh(new THREE.ConeGeometry(0.075, 0.2, 8), metal, gate, x, 3.7, 0);
      }
      for (const y of [0.35, 1.8, 3.4])
        box(gate, 2.1, 0.04, 0.05, iron, -side * 1.05, y, 0);
    }
    const fireflies: THREE.Mesh[] = [];
    for (let i = 0; i < 35; i++) {
      const f = sphere(
        garden,
        0.024,
        lanternGlow,
        Math.sin(i * 12.3) * 3.7,
        1.2 + (i % 7) * 0.5,
        5 - (i % 13),
      );
      f.userData.base = f.position.clone();
      fireflies.push(f);
    }
    // Dust is instanced in a single draw, with a generated soft point sprite.
    const dc = document.createElement("canvas");
    dc.width = dc.height = 32;
    const dx = dc.getContext("2d")!;
    const grad = dx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    dx.fillStyle = grad;
    dx.fillRect(0, 0, 32, 32);
    const dt = new THREE.CanvasTexture(dc);
    textures.push(dt);
    const dustGeo = new THREE.BufferGeometry(),
      dustPos = new Float32Array((mobile ? 180 : 380) * 3);
    for (let i = 0; i < dustPos.length; i += 3) {
      dustPos[i] = Math.sin(i * 12.7) * 6;
      dustPos[i + 1] = (Math.sin(i * 3.1) + 1) * 3.5;
      dustPos[i + 2] = Math.cos(i * 4.33) * 38 - 26;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: "#dbbd8c",
        size: 0.065,
        map: dt,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    scene.add(dust);
    onLoad(0.7);
    const resize = () => {
      const w = container.clientWidth,
        h = container.clientHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio, w < 760 ? 1.35 : 1.65));
      renderer.setSize(w, h);
      portraits.forEach((g) => {
        g.position.x = g.userData.baseX * (w < 760 ? 0.48 : 1);
        g.scale.setScalar(w < 760 ? 0.62 : 1);
      });
      ghosts.forEach(({ group: g }) => {
        g.position.x = g.userData.baseX * (w < 760 ? 0.55 : 1);
        g.scale.setScalar(g.userData.baseScale * (w < 760 ? 0.76 : 1));
      });
      camera.aspect = w / h;
      camera.fov = w < 760 ? 64 : 48;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    let visible = true;
    const visibility = () => {
      visible = !document.hidden;
      last = 0;
    };
    document.addEventListener("visibilitychange", visibility);
    const lost = (e: Event) => {
      e.preventDefault();
      onError();
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    const target = new THREE.Vector3();
    const pointer = new THREE.Vector2();
    let knocking = 0;
    const render = (now: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (!visible) return;
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      const s = state.current;
      if (!s.paused && !s.reduced) clock += dt;
      p += (s.progress - p) * (s.reduced ? 1 : 1 - Math.exp(-dt * 9));
      const pose = cameraAt(p);
      // Keep the facade, title and entrance on one axis; ease parallax in inside the house.
      const drift = s.reduced ? 0 : smooth(0.12, 0.22, p);
      pointer.x += (s.pointer[0] - pointer.x) * (1 - Math.exp(-dt * 6));
      pointer.y += (s.pointer[1] - pointer.y) * (1 - Math.exp(-dt * 6));
      camera.position.set(
        pose[0] + pointer.x * 0.18 * drift,
        pose[1] - pointer.y * 0.09 * drift,
        pose[2],
      );
      target.set(
        pose[3] + pointer.x * 0.35 * drift,
        pose[4] - pointer.y * 0.15 * drift,
        pose[5],
      );
      camera.lookAt(target);
      key.position.set(4, 8, camera.position.z + 6);
      key.target.position.set(0, 1, camera.position.z - 7);
      rim.position.set(-5, 6, camera.position.z - 5);
      rim.target.position.set(0, 2, camera.position.z - 9);
      light.position.set(0, 3.5, camera.position.z - 3);
      light.intensity = 12 + Math.sin(clock * 2.7) * 1;
      knocking += (s.knock - knocking) * Math.min(1, dt * 6);
      for (const d of doors) {
        const opened = smooth(10, 2, camera.position.z - d.z);
        const knockMotion =
          Math.abs(camera.position.z - d.z) < 15
            ? Math.sin((s.knock - knocking) * 10) * 0.025
            : 0;
        d.left.rotation.y = -opened * Math.PI * 0.49 + knockMotion;
        d.right.rotation.y = opened * Math.PI * 0.49 - knockMotion;
      }
      flames.forEach((f, i) => {
        f.scale.y = 1.8 + Math.sin(clock * 5 + i) * 0.25;
        f.scale.x = 0.65 + Math.sin(clock * 7 + i) * 0.08;
      });
      eyes.forEach((e, i) => {
        e.scale.setScalar(s.reveal ? 1.7 : 1);
        e.position.x = (i % 2 ? 1 : -1) * 0.14 + s.pointer[0] * 0.035;
      });
      portraits.forEach((g, i) => {
        g.rotation.z = s.reveal
          ? Math.sin(clock + i) * 0.035
          : Math.sin(clock * 0.3 + i) * 0.006;
      });
      ghosts.forEach((g, i) => {
        g.group.position.y =
          g.y +
          Math.sin(clock * 0.85 + g.phase) * 0.14 +
          (i === 0 ? Math.sin(knocking) * 0.35 : 0);
        g.group.rotation.z = Math.sin(clock * 0.5 + g.phase) * 0.04;
        const attr = g.cloth.geometry.attributes.position;
        for (let k = 0; k < attr.count; k++) {
          const y = g.base[k * 3 + 1];
          const hem = Math.max(0, -y);
          attr.setX(
            k,
            g.base[k * 3] +
              Math.sin(clock * 1.3 + y * 3 + g.phase) * hem * 0.07,
          );
        }
        attr.needsUpdate = true;
      });
      plates.forEach((m, i) => {
        m.position.y =
          1.24 +
          (Math.sin(clock * 0.7 + i) + 1) * 0.08 +
          (i === 2 ? smooth(0.55, 0.62, p) * 0.4 : 0);
        m.rotation.z = Math.sin(clock * 0.7 + i) * 0.025;
      });
      chandelier.rotation.y = Math.sin(clock * 0.2) * 0.025;
      const chosenColor = lanternPalette[Math.max(0, s.offering)];
      lanternColor.lerp(chosenColor, 1 - Math.exp(-dt * 3));
      lanternGlow.color.copy(lanternColor);
      gardenLight.color.copy(lanternColor);
      lanterns.forEach((g, i) => {
        g.rotation.z = Math.sin(clock * 0.5 + i) * 0.045;
      });
      fireflies.forEach((f, i) => {
        const base = f.userData.base as THREE.Vector3;
        f.position.y = base.y + Math.sin(clock * 0.7 + i) * 0.18;
        f.position.x = base.x + Math.sin(clock * 0.4 + i) * 0.1;
      });
      dust.rotation.z = Math.sin(clock * 0.03) * 0.015;
      renderer.render(scene, camera);
    };
    void (async () => {
      try {
        const pose = cameraAt(p);
        camera.position.set(pose[0], pose[1], pose[2]);
        camera.lookAt(pose[3], pose[4], pose[5]);
        renderer.compile(scene, camera);
        if (disposed) return;
        onLoad(0.93);
        await document.fonts.ready;
        if (disposed) return;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
        requestAnimationFrame(() => {
          if (!disposed && !ready) {
            ready = true;
            onLoad(1);
            onReady();
          }
        });
      } catch {
        if (!disposed) onError();
      }
    })();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      textures.forEach((t) => t.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [state, onReady, onError, onLoad]);
  return <div className="house-canvas" ref={host} aria-hidden="true" />;
}
