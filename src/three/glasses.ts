import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import gsap from "gsap";
import type { FrameConfig } from "../data/collections";

/* Kính 3D procedural — gọng torus + tròng glass, theo ngôn ngữ part-list của
   thư viện (moc/aurum/fomora): mọi mesh có home + offset để assembly. */

interface Part {
  mesh: THREE.Mesh;
  home: THREE.Vector3;
  offset: THREE.Vector3;
}

export interface GlassesController {
  assemble: () => void;
  setFrame: (cfg: FrameConfig) => void;
  setPaused: (p: boolean) => void;
  dispose: () => void;
}

const lin = (hex: string) =>
  new THREE.Color(hex).convertSRGBToLinear();

export function createGlassesScene(
  host: HTMLDivElement
): GlassesController | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = "stage-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(0, 0.55, 6.4);
  camera.lookAt(0, 0.05, 0);

  /* PMREM environment (RoomEnvironment — không cần HDR file, fomora pattern) */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  /* lights */
  const sun = new THREE.DirectionalLight(0xfff2dd, 2.6);
  sun.position.set(3.5, 5, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -3 });
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const cool = new THREE.DirectionalLight(0xbcd2e8, 0.7);
  cool.position.set(-5, 2, -3);
  scene.add(cool);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const root = new THREE.Group(); // pointer tilt
  const hero = new THREE.Group(); // idle spin
  root.add(hero);
  scene.add(root);

  /* shadow catcher */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.ShadowMaterial({ opacity: 0.22 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.95;
  ground.receiveShadow = true;
  scene.add(ground);

  /* ---- materials (đổi theo Frame Lab) ---- */
  const frameMat = new THREE.MeshPhysicalMaterial({
    color: lin("#b06a35"),
    roughness: 0.32,
    clearcoat: 0.9,
    clearcoatRoughness: 0.18,
    envMapIntensity: 0.9,
  });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: lin("#dfeef2"),
    roughness: 0.06,
    transmission: 0.92,
    thickness: 0.25,
    ior: 1.45,
    envMapIntensity: 1.4,
    transparent: true,
    opacity: 0.85,
  });

  /* ---- part list ---- */
  const parts: Part[] = [];
  const add = (
    mesh: THREE.Mesh,
    off: [number, number, number]
  ): THREE.Mesh => {
    mesh.castShadow = true;
    hero.add(mesh);
    parts.push({
      mesh,
      home: mesh.position.clone(),
      offset: new THREE.Vector3(...off),
    });
    return mesh;
  };

  /* gọng: 2 vòng torus quanh tròng */
  const rimGeo = new THREE.TorusGeometry(0.62, 0.055, 18, 72);
  const rimL = new THREE.Mesh(rimGeo, frameMat);
  rimL.position.set(-0.72, 0, 0);
  add(rimL, [-1.2, 0.6, 1.4]);
  const rimR = new THREE.Mesh(rimGeo, frameMat);
  rimR.position.set(0.72, 0, 0);
  add(rimR, [1.2, 0.6, 1.4]);

  /* sống mũi */
  const bridge = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.042, 12, 32, Math.PI),
    frameMat
  );
  bridge.position.set(0, 0.1, 0);
  bridge.rotation.z = 0;
  add(bridge, [0, 0.9, 0.8]);

  /* đệm mũi */
  const padGeo = new THREE.SphereGeometry(0.045, 12, 10);
  const padMat = new THREE.MeshStandardMaterial({
    color: lin("#e8e0d0"),
    roughness: 0.5,
  });
  const padL = new THREE.Mesh(padGeo, padMat);
  padL.position.set(-0.2, -0.14, 0.1);
  add(padL, [0, -0.7, 0.6]);
  const padR = new THREE.Mesh(padGeo, padMat);
  padR.position.set(0.2, -0.14, 0.1);
  add(padR, [0, -0.7, 0.6]);

  /* tròng kính */
  const lensGeo = new THREE.CylinderGeometry(0.57, 0.57, 0.035, 56);
  const lensL = new THREE.Mesh(lensGeo, lensMat);
  lensL.rotation.x = Math.PI / 2;
  lensL.position.set(-0.72, 0, 0.012);
  add(lensL, [0, 0, 2.2]);
  const lensR = new THREE.Mesh(lensGeo, lensMat);
  lensR.rotation.x = Math.PI / 2;
  lensR.position.set(0.72, 0, 0.012);
  add(lensR, [0, 0, 2.2]);

  /* khuỷu gập */
  const hingeGeo = new THREE.BoxGeometry(0.08, 0.16, 0.1);
  const hingeL = new THREE.Mesh(hingeGeo, frameMat);
  hingeL.position.set(-1.36, 0.02, -0.03);
  add(hingeL, [-0.6, 0.4, -1.2]);
  const hingeR = new THREE.Mesh(hingeGeo, frameMat);
  hingeR.position.set(1.36, 0.02, -0.03);
  add(hingeR, [0.6, 0.4, -1.2]);

  /* 2 càng kính vươn ra sau */
  const templeGeo = new THREE.BoxGeometry(1.25, 0.06, 0.045);
  const templeL = new THREE.Mesh(templeGeo, frameMat);
  templeL.position.set(-1.95, 0.06, -0.62);
  templeL.rotation.y = Math.PI / 2 - 0.32;
  add(templeL, [-0.4, 0.8, -2.4]);
  const templeR = new THREE.Mesh(templeGeo, frameMat);
  templeR.position.set(1.95, 0.06, -0.62);
  templeR.rotation.y = -(Math.PI / 2 - 0.32);
  add(templeR, [0.4, 0.8, -2.4]);
  /* đầu càng cong xuống */
  const tipGeo = new THREE.BoxGeometry(0.3, 0.055, 0.05);
  const tipL = new THREE.Mesh(tipGeo, frameMat);
  tipL.position.set(-2.52, -0.12, -0.98);
  tipL.rotation.y = Math.PI / 2 - 0.32;
  tipL.rotation.z = 0.5;
  add(tipL, [-0.2, -0.9, -2.2]);
  const tipR = new THREE.Mesh(tipGeo, frameMat);
  tipR.position.set(2.52, -0.12, -0.98);
  tipR.rotation.y = -(Math.PI / 2 - 0.32);
  tipR.rotation.z = -0.5;
  add(tipR, [0.2, -0.9, -2.2]);

  /* phụ kiện bay quanh (chi tiết nhỏ khác scale) */
  const screw = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20),
    new THREE.MeshStandardMaterial({
      color: lin("#cfa14f"),
      metalness: 1,
      roughness: 0.3,
    })
  );
  screw.rotation.x = Math.PI / 2;
  screw.position.set(-1.36, 0.02, 0.04);
  add(screw, [0.5, 1.1, 0.9]);
  const screw2 = screw.clone();
  screw2.position.set(1.36, 0.02, 0.04);
  add(screw2, [0.5, 1.1, 0.9]);

  /* micro bụi tròn bay lơ lửng (điểm nhấn "atelier") */
  const dustGeo = new THREE.TorusGeometry(0.1, 0.012, 8, 40);
  const dustMat = new THREE.MeshStandardMaterial({
    color: lin("#c9c4b8"),
    roughness: 0.6,
  });
  const ring = new THREE.Mesh(dustGeo, dustMat);
  ring.rotation.x = Math.PI / 2.3;
  ring.position.set(1.15, 1.05, -0.9);
  ring.scale.setScalar(1.6);
  add(ring, [1.5, 1.6, -1.5]);
  const ring2 = new THREE.Mesh(dustGeo, dustMat);
  ring2.rotation.x = Math.PI / 1.8;
  ring2.position.set(-1.25, -0.85, -0.7);
  ring2.scale.setScalar(1.1);
  add(ring2, [-1.5, -1.4, -1.2]);

  /* ---- pointer tilt (lerp, không snap) ---- */
  let tRX = 0,
    tRY = 0,
    rX = 0,
    rY = 0;
  const fine = matchMedia("(pointer: fine)").matches;
  if (fine) {
    window.addEventListener(
      "pointermove",
      (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        tRY = nx * 0.45;
        tRX = ny * 0.16;
      },
      { passive: true }
    );
  }

  /* visibility + resize */
  let visible = true;
  const io = new IntersectionObserver(
    (en) => {
      visible = en[0].isIntersecting;
    },
    { threshold: 0.02 }
  );
  io.observe(host);
  const resize = () => {
    const w = host.clientWidth,
      h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.position.z = camera.aspect < 0.95 ? 7.4 : 6.4;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  /* ---- render loop (một loop duy nhất cho cả trang) ---- */
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  let last = performance.now();
  let paused = false;
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    if (!visible || document.hidden) return;
    if (!reduced && !paused) {
      rX += (tRX - rX) * 0.04;
      rY += (tRY - rY) * 0.04;
      root.rotation.x = rX;
      root.rotation.y = rY;
      hero.rotation.y += dt * 0.16;
      ring.rotation.z += dt * 0.3;
      ring2.rotation.z -= dt * 0.22;
    }
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  /* ---- assembly + idle ---- */
  let idleStarted = false;
  const startIdle = () => {
    if (idleStarted || reduced || typeof gsap === "undefined") return;
    idleStarted = true;
    [ring, ring2].forEach((m, i) => {
      gsap.to(m.position, {
        y: m.position.y + 0.22,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  };

  const assemble = () => {
    if (reduced || typeof gsap === "undefined") return;
    parts.forEach((p, i) => {
      gsap.fromTo(
        p.mesh.position,
        { x: p.home.x + p.offset.x, y: p.home.y + p.offset.y, z: p.home.z + p.offset.z },
        {
          x: p.home.x,
          y: p.home.y,
          z: p.home.z,
          duration: 1.4,
          delay: 0.05 + Math.min(i, 20) * 0.05,
          ease: "power3.out",
          overwrite: true,
        }
      );
      gsap.fromTo(
        p.mesh.scale,
        { x: 0.4, y: 0.4, z: 0.4 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.05,
          delay: 0.05 + Math.min(i, 20) * 0.05,
          ease: "back.out(1.5)",
          overwrite: true,
        }
      );
    });
    gsap.delayedCall(1.6, startIdle);
  };
  if (reduced || typeof gsap === "undefined") startIdle();

  /* ---- Frame Lab: đổi vật liệu gọng ---- */
  const setFrame = (cfg: FrameConfig) => {
    frameMat.color = lin(cfg.color);
    frameMat.metalness = cfg.material === "metal" ? 1 : 0;
    frameMat.roughness = cfg.material === "metal" ? 0.28 : 0.32;
    frameMat.clearcoat = cfg.material === "metal" ? 0.4 : 0.9;
    frameMat.transparent = cfg.opacity < 1;
    frameMat.opacity = cfg.opacity;
    frameMat.needsUpdate = true;
  };

  const dispose = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    if (typeof gsap !== "undefined") gsap.killTweensOf(parts.map((p) => p.mesh.position));
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.geometry.dispose();
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    });
    envRT.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
  window.addEventListener("pagehide", dispose, { once: true });

  return { assemble, setFrame, setPaused: (p) => (paused = p), dispose };
}
