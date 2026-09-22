'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Procedural texture generator for the high-tech orbital sphere (ball)
function createBallTextures(): { map: THREE.CanvasTexture; bumpMap: THREE.CanvasTexture; emissiveMap: THREE.CanvasTexture } {
  const w = 1024;
  const h = 512;

  // 1. Color Map (Base Albedo)
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = w;
  colorCanvas.height = h;
  const cCtx = colorCanvas.getContext('2d')!;

  // 2. Bump Map (Tactile depth relief for grooves)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = w;
  bumpCanvas.height = h;
  const bCtx = bumpCanvas.getContext('2d')!;

  // 3. Emissive Map (Glowing cyan circuits & energy band)
  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = w;
  emissiveCanvas.height = h;
  const eCtx = emissiveCanvas.getContext('2d')!;

  // Deep cosmic graphite/navy base
  cCtx.fillStyle = '#060a12';
  cCtx.fillRect(0, 0, w, h);

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, w, h);

  eCtx.fillStyle = '#000000';
  eCtx.fillRect(0, 0, w, h);

  // Micro-tech honeycomb / carbon weave pattern
  cCtx.fillStyle = 'rgba(0, 150, 255, 0.06)';
  for (let y = 0; y < h; y += 6) {
    for (let x = 0; x < w; x += 6) {
      if ((x + y) % 12 === 0) {
        cCtx.fillRect(x, y, 3, 3);
        bCtx.fillStyle = '#909090';
        bCtx.fillRect(x, y, 3, 3);
      }
    }
  }

  // Draw high-tech latitude lines
  const latitudes = [0.18, 0.32, 0.5, 0.68, 0.82];
  latitudes.forEach((lat, idx) => {
    const y = h * lat;
    const isEquator = idx === 2;

    // Base color line
    cCtx.strokeStyle = isEquator ? '#00e5ff' : 'rgba(0, 150, 255, 0.6)';
    cCtx.lineWidth = isEquator ? 6 : 2;
    cCtx.beginPath();
    cCtx.moveTo(0, y);
    cCtx.lineTo(w, y);
    cCtx.stroke();

    // Bump relief
    bCtx.strokeStyle = isEquator ? '#ffffff' : '#b0b0b0';
    bCtx.lineWidth = isEquator ? 8 : 3;
    bCtx.beginPath();
    bCtx.moveTo(0, y);
    bCtx.lineTo(w, y);
    bCtx.stroke();

    // Emissive glowing channels
    if (isEquator) {
      eCtx.strokeStyle = '#ffffff';
      eCtx.lineWidth = 4;
      eCtx.beginPath();
      eCtx.moveTo(0, y);
      eCtx.lineTo(w, y);
      eCtx.stroke();

      // Soft outer halo on emissive
      eCtx.strokeStyle = '#00e5ff';
      eCtx.lineWidth = 10;
      eCtx.beginPath();
      eCtx.moveTo(0, y);
      eCtx.lineTo(w, y);
      eCtx.stroke();
    } else {
      eCtx.strokeStyle = '#00a8ff';
      eCtx.lineWidth = 2.5;
      eCtx.setLineDash([14, 18]);
      eCtx.beginPath();
      eCtx.moveTo(0, y);
      eCtx.lineTo(w, y);
      eCtx.stroke();
      eCtx.setLineDash([]);
    }
  });

  // Draw technical longitude meridian segments & circuit nodes
  for (let x = 32; x < w; x += 64) {
    const isMajor = x % 128 === 0;

    cCtx.strokeStyle = isMajor ? 'rgba(0, 229, 255, 0.45)' : 'rgba(0, 120, 255, 0.25)';
    cCtx.lineWidth = isMajor ? 2 : 1;
    cCtx.beginPath();
    cCtx.moveTo(x, h * 0.18);
    cCtx.lineTo(x, h * 0.82);
    cCtx.stroke();

    bCtx.strokeStyle = isMajor ? '#c0c0c0' : '#909090';
    bCtx.lineWidth = isMajor ? 3 : 1.5;
    bCtx.beginPath();
    bCtx.moveTo(x, h * 0.18);
    bCtx.lineTo(x, h * 0.82);
    bCtx.stroke();

    // Circuit contact nodes at intersections
    latitudes.forEach(lat => {
      const nodeY = h * lat;
      cCtx.fillStyle = '#00e5ff';
      cCtx.beginPath();
      cCtx.arc(x, nodeY, isMajor ? 4.5 : 3, 0, Math.PI * 2);
      cCtx.fill();

      bCtx.fillStyle = '#ffffff';
      bCtx.beginPath();
      bCtx.arc(x, nodeY, isMajor ? 5.5 : 3.5, 0, Math.PI * 2);
      bCtx.fill();

      eCtx.fillStyle = '#00e5ff';
      eCtx.beginPath();
      eCtx.arc(x, nodeY, isMajor ? 4 : 2.5, 0, Math.PI * 2);
      eCtx.fill();
    });
  }

  // Laser telemetry markings
  cCtx.font = 'bold 16px monospace';
  cCtx.fillStyle = '#00e5ff';
  cCtx.fillText('LEZZFLOW CORE // ORBIT-01', 40, h * 0.46);
  cCtx.fillText('HYPER-LOCAL GRID 2026', w * 0.54, h * 0.46);

  eCtx.font = 'bold 16px monospace';
  eCtx.fillStyle = '#00e5ff';
  eCtx.fillText('LEZZFLOW CORE // ORBIT-01', 40, h * 0.46);
  eCtx.fillText('HYPER-LOCAL GRID 2026', w * 0.54, h * 0.46);

  const map = new THREE.CanvasTexture(colorCanvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
  emissiveMap.wrapS = THREE.RepeatWrapping;
  emissiveMap.wrapT = THREE.ClampToEdgeWrapping;

  return { map, bumpMap, emissiveMap };
}

export default function HeroLogoScene({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const wakeRef = useRef<() => void>(() => {});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
    wakeRef.current();
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const center = new THREE.Vector3(0.1, 0.05, 0);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    const stage = new THREE.Group();
    scene.add(stage);

    // Dedicated Group for the solid composite 3D "L" Sculpture
    // Holds LEZZFLOW_L_BODY, LEZZFLOW_INNER_GLOW, LEZZFLOW_CRESCENT, and LEZZFLOW_BOTTOM_GLOW together!
    const lGroup = new THREE.Group();
    stage.add(lGroup);

    // Studio environment with calibrated softboxes and high-contrast rim cards
    // Gives deep obsidian/graphite faces, razor-sharp metallic corner bevels, and vivid cobalt/cyan edge gleams.
    const studio = new THREE.Scene();
    studio.background = new THREE.Color(0.015, 0.018, 0.025);
    const cards: THREE.Mesh[] = [];
    const cardDefs: [number, number, number, number, number, number, number][] = [
      [0.0, 1.2, 5.0, 4.2, 5.0, 2.8, 0xffffff],  // Wide front softbox for crisp beveled reflections
      [-3.2, 3.8, 3.5, 2.2, 5.0, 3.2, 0xeef6ff], // Top-left corner specular highlight
      [3.5, 1.5, 2.5, 1.5, 5.0, 3.2, 0xffffff],  // Right corner bevel highlight
      [0.0, 5.2, 1.5, 4.0, 1.5, 2.6, 0xd8e8ff],  // Overhead crest light strip
      [-3.8, -1.8, -3.0, 3.5, 5.5, 5.5, 0x0066ff], // Electric cobalt silhouette rim (adds "dum" to edges)
      [3.2, -2.5, -2.5, 2.8, 4.0, 4.5, 0x00e5ff], // Electric cyan under-edge card
      [0.0, -3.0, 3.0, 4.0, 0.8, 1.2, 0x222c3c]   // Dark slate floor bounce
    ];

    for (const [x, y, z, w, h, intensity, tint] of cardDefs) {
      const card = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(tint).multiplyScalar(intensity),
          side: THREE.DoubleSide
        })
      );
      card.position.set(x, y, z);
      card.lookAt(center);
      studio.add(card);
      cards.push(card);
    }

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(studio, 0.04);
    scene.environment = environment.texture;
    pmrem.dispose();
    cards.forEach(c => {
      c.geometry.dispose();
      (c.material as THREE.Material).dispose();
    });

    // Curated Cinematic Lighting Setup:
    // Powerful key lights sculpt each corner with sharp specular gleams
    const keyLeft = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLeft.position.set(-2.8, 4.0, 4.5);
    scene.add(keyLeft);

    const keyRight = new THREE.DirectionalLight(0xdceeff, 2.2);
    keyRight.position.set(2.8, 2.5, 4.5);
    scene.add(keyRight);

    // Electric cyan focus light aimed at the beveled crease of the L
    const focus = new THREE.SpotLight(0x00e5ff, 32, 20, 0.45, 0.85, 2);
    focus.position.set(0.2, 4.2, 3.5);
    focus.target.position.copy(center);
    scene.add(focus, focus.target);

    // Deep blue rim light from behind for sharp outer separation
    const edgeRim = new THREE.DirectionalLight(0x0076ff, 5.0);
    edgeRim.position.set(3.6, 1.2, -2.8);
    scene.add(edgeRim);

    const ambientFill = new THREE.AmbientLight(0x182030, 1.3);
    scene.add(ambientFill);

    let destroyed = false;
    let visible = true;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let mixer: THREE.AnimationMixer | undefined;
    let model: THREE.Object3D | undefined;
    let sphereMesh: THREE.Mesh | undefined;
    let dirty = true;
    let sampleStart = 0;
    let sampleFrames = 0;

    // 3D Perspective Orientation & Scroll Rotation for the entire "L" sculpture
    // Slight heroic angle keeps iconic front mark clear while showcasing thick beveled 3D depth!
    const baseTiltY = -0.08; // ~-4.5 deg subtle heroic stance
    const baseTiltX = 0.05;  // ~+2.8 deg subtle pitch
    let scrollRotY = 0;
    let targetScrollRotY = 0;
    let scrollTiltX = 0;
    let targetScrollTiltX = 0;
    let scrollScale = 1;
    let targetScrollScale = 1;

    // Magnetic Cursor Orbit Tracking State
    type OrbitSample = { t: number; angle: number };
    let orbitSamples: OrbitSample[] = [];
    let currentOrbitTime = 0;
    let isTrackingCursor = false;
    let lastMoveTime = 0;
    const pointer = new THREE.Vector2();
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const ballTextures = createBallTextures();

    const disposeModel = (root: THREE.Object3D) =>
      root.traverse(child => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(m => m.dispose());
      });

    const wake = () => {
      dirty = true;
      if (!destroyed && !frame) frame = requestAnimationFrame(render);
    };
    wakeRef.current = wake;

    function render(time: number) {
      frame = 0;
      if (destroyed || !visible || document.hidden) {
        last = 0;
        return;
      }

      const dt = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      const moving = !pausedRef.current && !reduced.matches;

      if (moving) {
        elapsed += dt;

        // 1. Magnetic Ball Cursor-Following Direction Logic
        const cursorActive = isTrackingCursor && time - lastMoveTime < 2500;
        if (cursorActive && orbitSamples.length > 0) {
          let targetAngle = Math.atan2(pointer.y, pointer.x);
          if (targetAngle < 0) targetAngle += Math.PI * 2;

          let closest = orbitSamples[0];
          let minDiff = 999;
          for (let i = 0; i < orbitSamples.length; i++) {
            let diff = Math.abs(orbitSamples[i].angle - targetAngle);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;
            if (diff < minDiff) {
              minDiff = diff;
              closest = orbitSamples[i];
            }
          }

          let deltaT = (closest.t - currentOrbitTime) % 8.0;
          if (deltaT > 4.0) deltaT -= 8.0;
          if (deltaT < -4.0) deltaT += 8.0;

          // Smooth exponential spring toward cursor direction
          currentOrbitTime += deltaT * (1 - Math.exp(-9 * dt));
          if (currentOrbitTime < 0) currentOrbitTime += 8.0;
          if (currentOrbitTime >= 8.0) currentOrbitTime %= 8.0;

          mixer?.setTime(currentOrbitTime);
        } else {
          // Smooth continuous ambient orbit when mouse is idle
          currentOrbitTime = (currentOrbitTime + dt * 0.9) % 8.0;
          mixer?.setTime(currentOrbitTime);
        }

        // Spin the sphere locally so its detailed micro-circuits and textures catch light
        if (sphereMesh) {
          sphereMesh.rotation.y += dt * 1.5;
          sphereMesh.rotation.x += dt * 0.5;
        }

        // 2. Interactive 3D Scroll, Cursor Tilt & Ambient Breathing for the unified "L" Sculpture
        const scrollEase = 1 - Math.exp(-8 * dt);
        scrollRotY += (targetScrollRotY - scrollRotY) * scrollEase;
        scrollTiltX += (targetScrollTiltX - scrollTiltX) * scrollEase;
        scrollScale += (targetScrollScale - scrollScale) * scrollEase;

        if (lGroup.children.length > 0) {
          // Subtle organic 3D breathing motion so corners catch specular light glints
          const breatheY = Math.sin(elapsed * 1.2) * 0.035;
          const breatheX = Math.cos(elapsed * 0.9) * 0.025;

          // Unified 3D rotation of the entire thick solid L block:
          lGroup.rotation.y = baseTiltY + pointer.x * 0.28 + scrollRotY + breatheY;
          lGroup.rotation.x = baseTiltX - pointer.y * 0.20 + scrollTiltX + breatheX;
          lGroup.rotation.z = -pointer.x * 0.05;

          // Thickness and scale: scaled 2.2x in Z for massive 3D depth and weight!
          lGroup.scale.set(1.0 * scrollScale, 1.0 * scrollScale, 2.2 * scrollScale);
        }

        // Slowly damp scroll momentum over time
        if (Math.abs(targetScrollRotY) > 0.001) {
          targetScrollRotY *= Math.max(0, 1 - 0.45 * dt);
          targetScrollTiltX *= Math.max(0, 1 - 0.65 * dt);
          targetScrollScale = 1;
        }

        // Stage parallax ease
        const ease = 1 - Math.exp(-5 * dt);
        stage.rotation.x += (-pointer.y * 0.08 - stage.rotation.x) * ease;
        stage.rotation.y += (pointer.x * 0.12 - stage.rotation.y) * ease;
        stage.position.y = Math.sin(elapsed * 0.8) * 0.065;
        stage.position.x += (pointer.x * 0.045 - stage.position.x) * ease;

        focus.target.position.x += (center.x + pointer.x * 0.6 - focus.target.position.x) * ease;
        focus.target.position.y += (center.y - pointer.y * 0.35 - focus.target.position.y) * ease;
      }

      if (moving || dirty) {
        renderer.render(scene, camera);
        dirty = false;

        if (moving && model && dt > 0) {
          if (!sampleStart) sampleStart = time;
          sampleFrames++;
          if (time - sampleStart >= 2000) {
            canvas!.dataset.fps = (sampleFrames * 1000 / (time - sampleStart)).toFixed(1);
            sampleFrames = 0;
            sampleStart = time;
          }
        } else {
          sampleStart = 0;
          sampleFrames = 0;
        }

        canvas!.dataset.motion = moving ? 'running' : 'paused';
        canvas!.dataset.orbitTime = currentOrbitTime.toFixed(3);
      }

      if (moving) frame = requestAnimationFrame(render);
      else last = 0;
    }

    new GLTFLoader().load(
      '/assets/lezzflow-graphite.glb',
      gltf => {
        if (destroyed) {
          disposeModel(gltf.scene);
          return;
        }

        model = gltf.scene;
        const importedMaterials = new Set<THREE.Material>();

        // Names of meshes that belong to the unified solid "L" sculpture
        const lMeshNames = ['LEZZFLOW_L_BODY', 'LEZZFLOW_INNER_GLOW', 'LEZZFLOW_CRESCENT', 'LEZZFLOW_BOTTOM_GLOW'];
        const toMoveToLGroup: THREE.Object3D[] = [];

        model.traverse(child => {
          if (!(child instanceof THREE.Mesh)) return;
          const original = child.material as THREE.MeshStandardMaterial;
          importedMaterials.add(original);
          const name = child.name;

          if (lMeshNames.includes(name)) {
            toMoveToLGroup.push(child);
          }

          // 1. Solid Machined Bright Liquid Platinum / Titanium Body (Bright, clearly visible with sharp bevels)
          if (name === 'LEZZFLOW_L_BODY') {
            const lMaterial = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0xb8c6d8), // Bright lustrous platinum silver
              metalness: 0.95,
              roughness: 0.14,
              clearcoat: 1.0,
              clearcoatRoughness: 0.04,
              reflectivity: 1.0,
              envMapIntensity: 1.7,
              side: THREE.DoubleSide
            });
            child.material = lMaterial;
          }
          // 2. High-Powered Electric Cyan Glowing Inner Crease
          else if (name === 'LEZZFLOW_INNER_GLOW') {
            const glowMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x00e5ff),
              emissive: new THREE.Color(0x00e5ff),
              emissiveIntensity: 3.5,
              metalness: 0.8,
              roughness: 0.18,
              side: THREE.DoubleSide
            });
            child.material = glowMaterial;
          }
          // 3. Electric Blue Bottom Rim Glow
          else if (name === 'LEZZFLOW_BOTTOM_GLOW') {
            const bottomGlowMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x0076ff),
              emissive: new THREE.Color(0x0088ff),
              emissiveIntensity: 3.0,
              metalness: 0.8,
              roughness: 0.2,
              side: THREE.DoubleSide
            });
            child.material = bottomGlowMaterial;
          }
          // 4. Solid Crescent Foundation in Bright Chrome
          else if (name === 'LEZZFLOW_CRESCENT') {
            const crescentMaterial = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0x8294aa),
              metalness: 0.95,
              roughness: 0.14,
              clearcoat: 1.0,
              clearcoatRoughness: 0.04,
              reflectivity: 0.95,
              envMapIntensity: 1.6,
              side: THREE.DoubleSide
            });
            child.material = crescentMaterial;
          }
          // 5. High-Tech Textured Finish for the Orbital Sphere (Ball)
          else if (name === 'LEZZFLOW_ORBIT_SPHERE') {
            sphereMesh = child;
            const sphereMaterial = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0x0c1422),
              metalness: 0.45,
              roughness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.04,
              map: ballTextures.map,
              bumpMap: ballTextures.bumpMap,
              bumpScale: 0.06,
              emissiveMap: ballTextures.emissiveMap,
              emissive: new THREE.Color(0x00e5ff),
              emissiveIntensity: 2.2,
              envMapIntensity: 1.6
            });
            child.material = sphereMaterial;

            // Add dynamic cyan glow point light attached to the ball
            const ballGlowLight = new THREE.PointLight(0x00e5ff, 3.2, 3.5, 1.8);
            child.add(ballGlowLight);
          }
          // 6. Luminous Cyan Energy Trail
          else if (name === 'LEZZFLOW_ENERGY_TRAIL') {
            const trailMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x00e5ff),
              emissive: new THREE.Color(0x0076ff),
              emissiveIntensity: 1.8,
              metalness: 0.7,
              roughness: 0.2,
              transparent: true,
              opacity: 0.92
            });
            child.material = trailMaterial;
          }
          // 7. Polished Platinum/Chrome Orbit Rings
          else if (['LEZZFLOW_ORBIT_RING', 'LEZZFLOW_ORBIT_RIM'].includes(name)) {
            const ringMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x9aaac0),
              metalness: 0.98,
              roughness: 0.10,
              envMapIntensity: 1.6
            });
            child.material = ringMaterial;
          }
          // 8. Other Accents
          else {
            const accentMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x283244),
              metalness: 0.85,
              roughness: 0.22,
              emissive: new THREE.Color(0x0076ff),
              emissiveIntensity: 0.25,
              envMapIntensity: 1.1
            });
            child.material = accentMaterial;
          }
        });

        // Reparent all 4 components into unified solid lGroup
        toMoveToLGroup.forEach(child => {
          lGroup.add(child);
        });

        // Offset glow insets slightly in Z to sit proud on the beveled fold and eliminate z-fighting
        const innerGlow = lGroup.getObjectByName('LEZZFLOW_INNER_GLOW');
        if (innerGlow) innerGlow.position.z += 0.03;

        const bottomGlow = lGroup.getObjectByName('LEZZFLOW_BOTTOM_GLOW');
        if (bottomGlow) bottomGlow.position.z += 0.03;

        // Scale lGroup in Z to make the entire L sculpture solid and thick (square packed 3D block)
        lGroup.scale.set(1.0, 1.0, 2.2);

        importedMaterials.forEach(m => m.dispose());
        stage.add(model);

        // Precompute Angle -> Orbit Time mapping from the animation track
        mixer = new THREE.AnimationMixer(model);
        const clip = gltf.animations.find(c => c.name === 'OrbitLoop');
        if (clip) {
          const action = mixer.clipAction(clip);
          action.play();

          const sphereTrack = clip.tracks.find(t => t.name.includes('LEZZFLOW_ORBIT_SPHERE.position'));
          if (sphereTrack) {
            orbitSamples = [];
            for (let i = 0; i < sphereTrack.times.length; i++) {
              const t = sphereTrack.times[i];
              const x = sphereTrack.values[i * 3];
              const y = sphereTrack.values[i * 3 + 1];
              let angle = Math.atan2(y, x);
              if (angle < 0) angle += Math.PI * 2;
              orbitSamples.push({ t, angle });
            }
          }
        }

        renderer.render(scene, camera);
        setIsReady(true);
        wake();
      },
      undefined,
      () => {
        canvas.dataset.loadError = 'true';
      }
    );

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
      const distance = Math.max(2.95 / Math.tan(halfFov), 2.95 / (Math.tan(halfFov) * camera.aspect));
      camera.position.set(0.85, 0.35, distance);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
      wake();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
      },
      { threshold: 0.01 }
    );
    intersection.observe(container);

    // Pointer move listener: tracks cursor angle and tilts 3D sculpture
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || pausedRef.current || reduced.matches) return;
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      pointer.set(THREE.MathUtils.clamp(nx, -1, 1), THREE.MathUtils.clamp(ny, -1, 1));

      isTrackingCursor = true;
      lastMoveTime = performance.now();
      container.style.cursor = 'grab';
      wake();
    };

    // Wheel listener: Subtle interactive response without blocking page scroll
    const onWheel = (event: WheelEvent) => {
      if (!finePointer.matches || pausedRef.current || reduced.matches) return;
      targetScrollRotY += (event.deltaY || 0) * 0.003;
      wake();
    };

    const leave = () => {
      isTrackingCursor = false;
      container.style.cursor = 'default';
      pointer.set(0, 0);
      targetScrollScale = 1;
    };

    const motionChange = () => {
      pointer.set(0, 0);
      if (reduced.matches) {
        stage.rotation.set(0, 0, 0);
        stage.position.set(0, 0, 0);
      }
      wake();
    };

    const visibility = () => {
      last = 0;
      sampleStart = 0;
      sampleFrames = 0;
      if (!document.hidden) wake();
    };

    container.addEventListener('pointermove', move, { passive: true });
    container.addEventListener('pointerleave', leave, { passive: true });
    container.addEventListener('wheel', onWheel, { passive: true });
    reduced.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', visibility, { passive: true });
    wake();

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      observer.disconnect();
      intersection.disconnect();
      container.removeEventListener('pointermove', move);
      container.removeEventListener('pointerleave', leave);
      container.removeEventListener('wheel', onWheel);
      reduced.removeEventListener('change', motionChange);
      document.removeEventListener('visibilitychange', visibility);
      mixer?.stopAllAction();
      if (model) {
        mixer?.uncacheRoot(model);
        disposeModel(model);
      }
      disposeModel(lGroup);
      ballTextures.map.dispose();
      ballTextures.bumpMap.dispose();
      ballTextures.emissiveMap.dispose();
      environment.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-logo-stage" data-ready={isReady}>
      {/* Fallback image */}
      <div className="hero-logo-poster absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/assets/lezzflow-graphite-poster.png"
          alt="LezzFlow metallic L logo"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          className="object-contain"
        />
      </div>
      <canvas ref={canvasRef} id="hero-logo-canvas" aria-label="Interactive 3D LezzFlow sculpture" />
    </div>
  );
}
