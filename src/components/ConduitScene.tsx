'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

interface ConduitSceneProps {
  paused?: boolean;
}

/**
 * ConduitScene (Astra's Exact Footer Animation & Shading)
 * 
 * Directly ports Astra's exact shader mathematics, flash timing, materials,
 * lighting, and particle effects from legezt-concept/dist/footer-scene.js.
 * Pauses rendering completely via IntersectionObserver when offscreen.
 */
export default function ConduitScene({ paused = false }: ConduitSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDestroyed = false;
    let isVisible = false;

    // 1. WebGL Renderer matching Astra's exact configuration
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // 2. Scene & Perspective Camera (FOV: 40, Near: 0.1, Far: 60, Z: 10)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.z = 10;

    // 3. Main Sculpture Group
    const sculpture = new THREE.Group();
    scene.add(sculpture);

    // 4. Astra's exact Lighting setup
    const ambient = new THREE.HemisphereLight(0xdddddd, 0x111111, 2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(-3, 5, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 7);
    rim.position.set(5, -1, -2);
    scene.add(rim);

    const pointerLight = new THREE.PointLight(0xffffff, 45, 16, 2);
    pointerLight.position.set(0, 2, 5);
    scene.add(pointerLight);

    const pulses: Array<{
      path: THREE.CatmullRomCurve3;
      uniforms: { head: { value: number }; strength: { value: number } };
      light: THREE.PointLight;
    }> = [];

    // 5. Load Ribbon Geometry & apply Astra's exact MeshStandardMaterial shades
    fetch('/assets/footer-ribbons.json')
      .then((res) => {
        if (!res.ok) throw new Error('Footer sculpture unavailable');
        return res.json();
      })
      .then((bands: Array<{ positions: number[]; indices: number[] }>) => {
        if (isDestroyed) return;

        const bandColors = [0x686868, 0x929292, 0x555555];

        bands.forEach((band, index) => {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(band.positions, 3)
          );
          geometry.setIndex(band.indices);
          geometry.computeVertexNormals();

          const material = new THREE.MeshStandardMaterial({
            color: bandColors[index],
            metalness: 0.58,
            roughness: 0.3,
          });

          sculpture.add(new THREE.Mesh(geometry, material));
        });

        // 6. Astra's exact CatmullRomCurve3 inner contour and pulse shaders
        for (let band = 0; band < 3; band++) {
          const points: THREE.Vector3[] = [];
          for (let i = 0; i <= 192; i++) {
            const u = THREE.MathUtils.degToRad(-55 + (295 * i) / 192);
            const radius = 2.25 + band * 0.46 - 0.12;
            points.push(
              new THREE.Vector3(
                radius * Math.cos(u),
                1.13 * radius * Math.sin(u),
                0.242 + (band - 1) * 0.68 + 0.28 * Math.sin(u * 1.4)
              )
            );
          }

          const path = new THREE.CatmullRomCurve3(points);
          const uniforms = { head: { value: -1 }, strength: { value: 1 } };

          const pulseMaterial = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms,
            vertexShader:
              'varying vec2 trailUV; void main(){trailUV=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
            fragmentShader: `
              varying vec2 trailUV;
              uniform float head;
              uniform float strength;
              void main(){
                float behind=head-trailUV.x;
                float tail=exp(-max(behind,0.0)*19.0)*smoothstep(-.006,.003,behind);
                float tip=exp(-(behind*behind)/.000144);
                float fade=smoothstep(0.0,.04,head)*(1.0-smoothstep(1.0,1.18,head));
                float light=(tail+tip*1.6)*fade*strength;
                gl_FragColor=vec4(vec3(light),1.0);
              }
            `,
          });

          const core = new THREE.Mesh(
            new THREE.TubeGeometry(path, 256, 0.014, 6, false),
            pulseMaterial
          );
          sculpture.add(core);

          const haloMaterial = pulseMaterial.clone();
          haloMaterial.uniforms = {
            head: uniforms.head,
            strength: { value: 0.11 },
          };
          const halo = new THREE.Mesh(
            new THREE.TubeGeometry(path, 256, 0.058, 8, false),
            haloMaterial
          );
          sculpture.add(halo);

          const light = new THREE.PointLight(0xffffff, 0, 3.5, 2);
          sculpture.add(light);

          pulses.push({ path, uniforms, light });
        }

        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Error loading footer ribbons:', err);
      });

    // 7. Astra's exact sparse dust field (65 positions)
    const dots = new THREE.BufferGeometry();
    const positions: number[] = [];
    let seed = 71;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 65; i++) {
      positions.push(
        (random() - 0.5) * 17,
        (random() - 0.5) * 10,
        (random() - 0.5) * 5
      );
    }
    dots.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      dots,
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader:
          'void main(){vec4 p=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*p;gl_PointSize=clamp(16.0/-p.z,1.0,3.0);}',
        fragmentShader:
          'void main(){float a=1.0-smoothstep(0.1,0.5,length(gl_PointCoord-0.5));gl_FragColor=vec4(vec3(0.75),a*0.22);}',
      })
    );
    scene.add(dust);

    // 8. Resize handling
    let mobile = false;
    const resize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      mobile = width < 650;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = mobile ? 13.8 : 10;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // 9. Pointer tracking (passive)
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const pointer = (event: MouseEvent) => {
      if (paused) return;
      const box = container.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width) * 2 - 1;
      targetY = ((event.clientY - box.top) / box.height) * 2 - 1;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // 10. IntersectionObserver & Visibility handling (Crucial for 60fps intro)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting && !document.hidden;
        if (isVisible && !wasVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden && (container.getBoundingClientRect().top < window.innerHeight);
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // 11. Animation Loop (Only runs when footer is actually visible)
    let time = 0;
    let previous = 0;

    const frame = (now: number) => {
      animationFrameId = 0;
      if (isDestroyed || !isVisible) return;

      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      if (!paused) {
        time += delta;
        const ease = 1 - Math.exp(-delta * 4);
        x += (targetX - x) * ease;
        y += (targetY - y) * ease;
      }

      sculpture.rotation.set(
        0.4 + y * 0.19 + Math.sin(time * 0.24) * 0.035,
        -0.55 + x * 0.25,
        -0.45 + Math.sin(time * 0.18) * 0.045
      );
      sculpture.position.set(
        mobile ? 0.5 : 1.3,
        -0.65 + Math.sin(time * 0.3) * 0.08,
        0
      );
      pointerLight.position.set(x * 5, 2 - y * 3, 4.5);

      for (const [index, pulse] of pulses.entries()) {
        const phase = ((time + 3.45) % 4.2 - index * 0.16) / 1.05;
        pulse.uniforms.head.value = phase;
        const active = phase > 0 && phase < 1.18;
        const progress = THREE.MathUtils.clamp(phase, 0, 1);
        pulse.light.position.copy(pulse.path.getPointAt(progress));
        pulse.light.position.z += 0.15;
        pulse.light.intensity = active
          ? 65 * Math.pow(Math.sin(Math.PI * Math.min(phase / 1.18, 1)), 2)
          : 0;
      }

      dust.rotation.z = time * 0.007;

      const finaleEl = container.closest('.finale') as HTMLElement | null;
      if (finaleEl) {
        finaleEl.style.setProperty('--light-x', `${52 + x * 28}%`);
        finaleEl.style.setProperty('--light-y', `${48 + y * 25}%`);
        finaleEl.style.setProperty('--beam-angle', `${-25 + x * 14}deg`);
        finaleEl.style.setProperty(
          '--glow-strength',
          String(0.62 + Math.sin(time * 0.6) * 0.12)
        );
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(frame);
    };

    // 12. Cleanup on Unmount
    return () => {
      isDestroyed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
    };
  }, [paused]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        className={`art-fallback absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-65'
        }`}
      >
        <Image
          src="/assets/footer-ribbons.png"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
          style={{ objectPosition: '65% center' }}
        />
      </div>
      <canvas
        ref={canvasRef}
        id="finale-canvas"
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
