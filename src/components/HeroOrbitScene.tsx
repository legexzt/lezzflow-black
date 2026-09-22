'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

interface HeroOrbitSceneProps {
  paused?: boolean;
}

/**
 * HeroOrbitScene Component
 * 
 * Renders the 3D fluted machined orbit sculpture from orbit.json with virtual
 * PMREM studio reflections, subtle pointer parallax, and smooth rotation.
 * Anchored cleanly inside its dedicated section with offscreen pausing and capped DPR.
 */
export default function HeroOrbitScene({ paused = false }: HeroOrbitSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId = 0;
    let isDestroyed = false;
    let isVisible = false;

    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 1. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.z = 7.7;

    // 3. Virtual Studio Environment for realistic metallic reflections
    const studio = new THREE.Scene();
    studio.background = new THREE.Color('#222226');
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    [
      [-4, 3, 3, 3, 6],
      [4, 1, 2, 2, 7],
      [0, 5, -2, 7, 2],
      [-3, -4, -2, 5, 2],
    ].forEach(([x, y, z, w, h]) => {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), panelMaterial);
      panel.position.set(x, y, z);
      panel.lookAt(0, 0, 0);
      studio.add(panel);
    });

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(studio, 0.03);
    scene.environment = environment.texture;
    pmrem.dispose();

    // 4. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const light = new THREE.DirectionalLight(0xffffff, 3.2);
    light.position.set(-3, 5, 4);
    scene.add(light);

    // 5. Load 3D Orbit Mesh
    let sculpture: THREE.Mesh | null = null;
    let rotation = 0;
    let lastTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;

    fetch('/assets/orbit.json')
      .then((res) => {
        if (!res.ok) throw new Error('Orbit mesh unavailable');
        return res.json();
      })
      .then((meshData: { positions: number[]; indices: number[] }) => {
        if (isDestroyed) return;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(meshData.positions, 3)
        );
        geometry.setIndex(meshData.indices);
        geometry.computeVertexNormals();

        // Machined graphite silver/chrome material matching monochrome theme
        const material = new THREE.MeshStandardMaterial({
          color: 0xb5b5b8,
          metalness: 0.98,
          roughness: 0.22,
          envMapIntensity: 1.5,
        });

        sculpture = new THREE.Mesh(geometry, material);
        sculpture.rotation.set(0.54, -0.42, -0.42);
        scene.add(sculpture);

        setIsReady(true);
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      })
      .catch((err) => {
        console.error('Error loading orbit sculpture:', err);
      });

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;

      if (aspect < 1.0) {
        camera.position.z = 7.7 / Math.max(aspect, 0.65);
      } else {
        camera.position.z = 7.7;
      }
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // 7. Controlled Pointer Movement (passive)
    const handlePointerMove = (e: MouseEvent) => {
      if (isTouchDevice || paused || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX = px * 0.15;
      pointerY = py * 0.12;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // 8. Animation Loop
    const animate = (time: number) => {
      animationFrameId = 0;
      if (isDestroyed || !isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (sculpture) {
        if (!paused && !prefersReducedMotion) {
          rotation += dt * 0.085;
        }

        const targetX = 0.54 + (paused ? 0 : pointerY);
        const targetY = -0.42 + (paused ? 0 : pointerX);

        sculpture.rotation.x += (targetX - sculpture.rotation.x) * 0.04;
        sculpture.rotation.y += (targetY - sculpture.rotation.y) * 0.04;
        sculpture.rotation.z = -0.42 + rotation;
        sculpture.position.y = (paused || prefersReducedMotion) ? 0 : Math.sin(rotation * 3) * 0.08;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // 9. Visibility & Offscreen Pausing
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible && !wasVisible && !animationFrameId) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      const wasVisible = isVisible;
      isVisible = !document.hidden && (container.getBoundingClientRect().top < window.innerHeight);
      if (isVisible && !wasVisible && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // 10. Cleanup
    return () => {
      isDestroyed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
    };
  }, [paused]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Fallback image */}
      <div
        className={`art-fallback absolute inset-0 w-full h-full filter contrast-110 -rotate-12 transition-opacity duration-800 pointer-events-none ${
          isReady ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src="/assets/orbit.png"
          alt="Machined silver orbit sculpture"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          className="object-contain"
        />
      </div>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        id="orbit-canvas"
        className={`absolute inset-0 w-full h-full transition-opacity duration-800 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Interactive 3D silver orbit sculpture"
      />
    </div>
  );
}
