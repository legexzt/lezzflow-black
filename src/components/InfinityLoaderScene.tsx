'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InfinityLoaderSceneProps {
  paused?: boolean;
  onPhaseChange?: (phase: 'slow' | 'glitch' | 'explode' | 'flash') => void;
  onComplete?: () => void;
  onReady?: () => void;
}

/**
 * InfinityLoaderScene Component
 * 
 * High-performance 60fps 3D Braided Steel Infinity Loop Engine:
 * 1. Compact scale (3.6 x 1.5) - centered, perfectly proportioned.
 * 2. Fine-detail concentric metallic cylindrical wires flowing along the lemniscate.
 * 3. High-contrast gunmetal steel with intense electric cobalt and cyan pulses in the core.
 * 4. Capped DPR (max 1.5 desktop, 1.25 mobile), optimized geometry count, fast math striae shader.
 * 5. Tab visibility listener + passive pointer handlers for zero-stutter 60fps.
 */
export default function InfinityLoaderScene({
  paused = false,
  onPhaseChange,
  onComplete,
  onReady,
}: InfinityLoaderSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const onPhaseChangeRef = useRef(onPhaseChange);
  const onCompleteRef = useRef(onComplete);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onPhaseChangeRef.current = onPhaseChange;
    onCompleteRef.current = onComplete;
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let animationFrameId: number;
    let isDestroyed = false;
    let isVisible = true;

    // 1. Scene & Camera Setup - Compact, elegant centered emblem
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020204);

    const isMobile = width < 650;
    const initialCamZ = isMobile ? 15.0 : 12.5;
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0.0, initialCamZ);

    // 2. High-Performance WebGL Renderer (Capped DPR to guarantee 60fps)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        depth: true,
        stencil: false,
      });
    } catch {
      onReadyRef.current?.();
      onCompleteRef.current?.();
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Start canvas hidden — we fade it in after GPU shader compilation
    renderer.domElement.style.opacity = '0';
    renderer.domElement.style.transition = 'opacity 0.35s ease-out';

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Construct Braided Cylindrical Wires (Optimized geometry count)
    const segments = isMobile ? 52 : 64;
    const radialSegments = isMobile ? 4 : 5;
    const wireRadius = 0.028;
    const maxRadius = 0.44;

    const wireLayers = [
      { count: 1, radius: 0.00 }, // Center core spine
      { count: 4, radius: 0.11 }, // Layer 1
      { count: 7, radius: 0.22 }, // Layer 2
      { count: 8, radius: 0.33 }, // Layer 3
      { count: 8, radius: 0.42 }, // Shell Layer 4
    ];
    const totalWires = 28; // 1 + 4 + 7 + 8 + 8 = 28 wires (dense & buttery smooth)

    // Conduits that carry the deep cobalt & electric cyan neon light
    const energyWireSet = new Set([
      '0-0',
      '1-0', '1-2',
      '2-1', '2-4',
      '3-2', '3-6',
      '4-3', '4-7',
    ]);

    const ringStride = radialSegments + 1;
    const vertsPerWire = (segments + 1) * ringStride;
    const totalVerts = totalWires * vertsPerWire;
    const quadsPerWire = segments * radialSegments;
    const totalIndices = totalWires * quadsPerWire * 6;

    const uCoords = new Float32Array(totalVerts);
    const bundleOffsets = new Float32Array(totalVerts * 2);
    const thetas = new Float32Array(totalVerts);
    const wireAttrs = new Float32Array(totalVerts * 4);
    const indices = new Uint32Array(totalIndices);

    let vIdx = 0;
    let iIdx = 0;
    let wireCounter = 0;

    wireLayers.forEach((layer, layerIdx) => {
      const count = layer.count;
      const r = layer.radius;
      const rRatio = r / maxRadius;

      for (let i = 0; i < count; i++) {
        const basePhi = (i / count) * Math.PI * 2 + layerIdx * 0.42;
        const isEnergy = energyWireSet.has(`${layerIdx}-${i}`) ? 1.0 : 0.0;
        const energyPhase = (i * 0.163 + layerIdx * 0.28) % 1.0;
        const wireStartVert = wireCounter * vertsPerWire;

        for (let j = 0; j <= segments; j++) {
          const uCoord = j / segments;

          for (let k = 0; k <= radialSegments; k++) {
            const theta = (k / radialSegments) * Math.PI * 2;

            uCoords[vIdx] = uCoord;
            bundleOffsets[vIdx * 2] = r;
            bundleOffsets[vIdx * 2 + 1] = basePhi;
            thetas[vIdx] = theta;
            wireAttrs[vIdx * 4] = isEnergy;
            wireAttrs[vIdx * 4 + 1] = rRatio;
            wireAttrs[vIdx * 4 + 2] = energyPhase;
            wireAttrs[vIdx * 4 + 3] = wireRadius;

            vIdx++;
          }
        }

        for (let j = 0; j < segments; j++) {
          for (let k = 0; k < radialSegments; k++) {
            const a = wireStartVert + j * ringStride + k;
            const b = wireStartVert + (j + 1) * ringStride + k;
            const c = wireStartVert + (j + 1) * ringStride + (k + 1);
            const d = wireStartVert + j * ringStride + (k + 1);

            indices[iIdx++] = a;
            indices[iIdx++] = b;
            indices[iIdx++] = d;
            indices[iIdx++] = b;
            indices[iIdx++] = c;
            indices[iIdx++] = d;
          }
        }

        wireCounter++;
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('uCoord', new THREE.BufferAttribute(uCoords, 1));
    geometry.setAttribute('bundleOffset', new THREE.BufferAttribute(bundleOffsets, 2));
    geometry.setAttribute('theta', new THREE.BufferAttribute(thetas, 1));
    geometry.setAttribute('wireAttr', new THREE.BufferAttribute(wireAttrs, 4));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // Compact proportions: 3.6 wide by 1.5 high
    const uniforms = {
      uTime: { value: 0.0 },
      uWireFlowSpeed: { value: 0.18 },
      uLightFlowSpeed: { value: 3.4 },
      uExplosion: { value: 0.0 },
      uScale: { value: new THREE.Vector3(3.6, 1.5, 0.8) },
      uTwistTurns: { value: 1.0 },
    };

    const wireMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float uCoord;
        attribute vec2 bundleOffset;
        attribute float theta;
        attribute vec4 wireAttr;

        uniform float uTime;
        uniform float uWireFlowSpeed;
        uniform vec3 uScale;
        uniform float uTwistTurns;

        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vViewDir;
        varying float vFlowU;
        varying float vIsEnergy;
        varying float vRRatio;
        varying float vEnergyPhase;

        void main() {
          vIsEnergy = wireAttr.x;
          vRRatio = wireAttr.y;
          vEnergyPhase = wireAttr.z;
          float wireRadius = wireAttr.w;

          float flowU = fract(uCoord + uTime * uWireFlowSpeed);
          vFlowU = flowU;
          float u = flowU * 6.283185307179586;

          // Continuous analytical lemniscate loop
          float cu = cos(u);
          float su = sin(u);
          float c2u = cos(2.0 * u);
          float s2u = sin(2.0 * u);

          vec3 pSpine = vec3(uScale.x * cu, uScale.y * s2u * 0.5, uScale.z * su);
          vec3 tangent = normalize(vec3(-uScale.x * su, uScale.y * c2u, uScale.z * cu));

          vec3 up = vec3(0.0, 0.0, 1.0);
          vec3 normal = normalize(cross(tangent, up));
          vec3 binormal = normalize(cross(tangent, normal));

          float r = bundleOffset.x;
          float basePhi = bundleOffset.y;
          float twistAngle = basePhi + flowU * 6.283185307179586 * uTwistTurns;

          vec3 wireRadialN = normalize(normal * cos(twistAngle) + binormal * sin(twistAngle));
          vec3 wireRadialB = normalize(cross(tangent, wireRadialN));
          vec3 wireCenter = pSpine + wireRadialN * r;

          vec3 localNormal = normalize(wireRadialN * cos(theta) + wireRadialB * sin(theta));
          vec3 localPos = wireCenter + localNormal * wireRadius;

          vec4 worldPosition = modelMatrix * vec4(localPos, 1.0);
          vWorldPos = worldPosition.xyz;
          vNormal = normalize((modelMatrix * vec4(localNormal, 0.0)).xyz);
          vTangent = normalize((modelMatrix * vec4(tangent, 0.0)).xyz);
          vViewDir = normalize(cameraPosition - worldPosition.xyz);

          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uLightFlowSpeed;
        uniform float uExplosion;

        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vViewDir;
        varying float vFlowU;
        varying float vIsEnergy;
        varying float vRRatio;
        varying float vEnergyPhase;

        void main() {
          vec3 N = normalize(vNormal);
          vec3 V = normalize(vViewDir);
          vec3 T = normalize(vTangent);

          // 1. Lightweight Brushed Steel Striae (Zero hash noise = butter smooth 60fps)
          float brushedTexture = sin(vFlowU * 420.0) * 0.22 + 0.78;

          // 2. Primary Studio Spotlight
          vec3 spotOrigin = vec3(8.0, 14.0, 12.0);
          vec3 L_spot = normalize(spotOrigin - vWorldPos);
          vec3 spotAxis = normalize(vec3(-0.5, -0.85, -0.65));
          float spotBeam = smoothstep(0.35, 0.95, dot(-L_spot, spotAxis));

          vec3 H_spot = normalize(L_spot + V);
          float NdotH_spot = max(0.0, dot(N, H_spot));
          float NdotL_spot = max(0.0, dot(N, L_spot));
          float specPeak = pow(NdotH_spot, 64.0) * (0.35 + 0.65 * spotBeam);

          // Anisotropic liquid steel gleam along flowing wire direction
          float TdotH = dot(T, H_spot);
          float anisoTerm = sqrt(max(0.0, 1.0 - TdotH * TdotH));
          float steelFireGlint = pow(anisoTerm, 12.0) * pow(NdotH_spot, 6.0);
          steelFireGlint *= (0.8 + 0.4 * brushedTexture);

          // 3. Fill Light & Rim Light
          vec3 L_fill = normalize(vec3(-8.0, 5.0, 10.0));
          vec3 H_fill = normalize(L_fill + V);
          float NdotL_fill = max(0.0, dot(N, L_fill));
          float fillSpec = pow(max(0.0, dot(N, H_fill)), 24.0) * 0.6;

          vec3 L_rim = normalize(vec3(-0.6, -0.4, -0.8));
          vec3 H_rim = normalize(L_rim + V);
          float specRim = pow(max(0.0, dot(N, H_rim)), 28.0) * 0.7;

          // 4. Base Gunmetal Steel Palette
          float creviceOcclusion = 0.3 + 0.7 * vRRatio;
          float diffuseShading = (NdotL_spot * 0.85 + NdotL_fill * 0.45 + 0.18) * creviceOcclusion;

          vec3 deepCrevice = vec3(0.04, 0.05, 0.07);
          vec3 gunmetalSteel = vec3(0.36, 0.38, 0.44) * (0.85 + 0.35 * brushedTexture);
          vec3 whiteHotGlint = vec3(1.0, 1.0, 1.0);
          vec3 steelFireGleam = vec3(0.85, 0.92, 1.00);

          vec3 steelColor = mix(deepCrevice, gunmetalSteel, diffuseShading);
          steelColor += whiteHotGlint * (specPeak * 5.0);
          steelColor += steelFireGleam * (steelFireGlint * 3.4);
          steelColor += gunmetalSteel * (fillSpec * 1.2);
          steelColor += steelFireGleam * specRim;

          // 5. Electric Cobalt & Cyan Neon Conduit Surge
          vec3 cobaltBlue = vec3(0.0, 0.35, 1.0);
          vec3 electricCyan = vec3(0.18, 0.90, 1.0);
          vec3 whiteCore = vec3(0.95, 0.98, 1.0);

          float revSpeed = uTime * uLightFlowSpeed;

          if (vIsEnergy > 0.5) {
            float pulseCoord = fract(vFlowU * 3.8 + revSpeed + vEnergyPhase);
            float pulse = smoothstep(0.0, 0.07, pulseCoord) * smoothstep(0.34, 0.07, pulseCoord);
            pulse = pulse * pulse;

            if (pulse > 0.001) {
              vec3 activeBlue = mix(cobaltBlue, electricCyan, pulse * 0.7);
              activeBlue = mix(activeBlue, whiteCore, pulse * pulse * 0.85);

              float blastIntensity = 4.2 + uExplosion * 12.0;
              steelColor = mix(steelColor, activeBlue * blastIntensity, pulse * 0.98);
            }
          } else {
            float spillCoord = fract(vFlowU * 3.8 + revSpeed);
            float spillWave = smoothstep(0.0, 0.09, spillCoord) * smoothstep(0.38, 0.09, spillCoord);
            float creviceSpill = spillWave * (1.0 - vRRatio) * 0.45;
            steelColor += cobaltBlue * creviceSpill * (1.0 + uExplosion * 2.5);
          }

          // 6. Luminous blue conduit halo
          vec3 blueAura = mix(cobaltBlue, electricCyan, 0.75);
          steelColor += blueAura * (uExplosion * 1.6);

          gl_FragColor = vec4(steelColor, 1.0);
        }
      `,
      side: THREE.FrontSide,
    });

    const wiresMesh = new THREE.Mesh(geometry, wireMaterial);
    wiresMesh.rotation.x = 0.22;
    wiresMesh.rotation.y = 0.0;
    wiresMesh.rotation.z = -0.04;
    scene.add(wiresMesh);

    // 4. Subtle Pointer Parallax with Passive Listener
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.15;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.12;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 5. Visibility Change (Pause rendering if tab is hidden)
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility, { passive: true });

    // 6. Autonomous High-Tech Progression State Machine
    const startTime = performance.now();
    let currentPhase: 'slow' | 'glitch' | 'explode' | 'flash' = 'slow';
    let completed = false;

    const animate = () => {
      if (isDestroyed) return;

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const time = (performance.now() - startTime) / 1000;
      uniforms.uTime.value = time;

      // PHASE 1: Smooth, graceful emergence & liquid steel flow (0.0s - 1.2s)
      if (time < 1.2) {
        if (currentPhase !== 'slow') {
          currentPhase = 'slow';
          onPhaseChangeRef.current?.('slow');
        }
        uniforms.uWireFlowSpeed.value = 0.26;
        uniforms.uLightFlowSpeed.value = 4.8;
        uniforms.uExplosion.value = 0.0;
      }
      // PHASE 2: Rhythmic kinetic pulse surge (1.2s - 2.4s)
      else if (time >= 1.2 && time < 2.4) {
        if (currentPhase !== 'glitch') {
          currentPhase = 'glitch';
          onPhaseChangeRef.current?.('glitch');
        }
        const prog = (time - 1.2) / 1.2; // 0 to 1
        uniforms.uWireFlowSpeed.value = 0.26 + Math.pow(prog, 1.2) * 0.9;
        uniforms.uLightFlowSpeed.value = 4.8 + prog * 14.0;
        uniforms.uExplosion.value = prog * 0.35;
      }
      // PHASE 3: HIGH-VELOCITY ELECTRIC BLUE CONDUIT SURGE (2.4s - 3.2s)
      else if (time >= 2.4 && time < 3.2) {
        if (currentPhase !== 'explode') {
          currentPhase = 'explode';
          onPhaseChangeRef.current?.('explode');
        }
        const expProg = (time - 2.4) / 0.8; // 0 to 1
        uniforms.uWireFlowSpeed.value = 1.16 + expProg * 2.2;
        uniforms.uLightFlowSpeed.value = 18.8 + expProg * 26.0;
        uniforms.uExplosion.value = 0.35 + Math.pow(expProg, 1.4) * 1.5;
      }
      // PHASE 4: Autonomous White Screen Flash & Reveal (3.2s+)
      else {
        if (!completed) {
          completed = true;
          currentPhase = 'flash';
          onPhaseChangeRef.current?.('flash');
          onCompleteRef.current?.();
        }
      }

      if (!paused) {
        const ease = 0.06;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        wiresMesh.rotation.x = 0.22 + currentY * 0.15;
        wiresMesh.rotation.y = currentX * 0.2;
        wiresMesh.position.y = Math.sin(time * 0.8) * 0.08;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Pre-warm: Compile shaders
    renderer.compile(scene, camera);
    renderer.render(scene, camera);

    // Signal ready
    onReadyRef.current?.();

    // Smooth fade in
    requestAnimationFrame(() => {
      if (!isDestroyed && renderer.domElement) {
        renderer.domElement.style.opacity = '1';
      }
    });

    animate();

    // 7. Responsive Resize Handling (Debounced)
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container || !renderer || isDestroyed) return;
        width = container.clientWidth || window.innerWidth;
        height = container.clientHeight || window.innerHeight;
        const isMob = width < 650;
        camera.aspect = width / height;
        camera.position.z = isMob ? 15.0 : 12.5;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 8. Memory Cleanup
    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      geometry.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, [paused]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative flex items-center justify-center select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0d14 0%, #030406 65%, #000000 100%)',
      }}
    />
  );
}
