"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform float u_progress;

  varying vec2 vUv;

  void main() {
    vec2 pixelCoords = vUv * u_resolution;
    float cellSize = min(u_resolution.x, u_resolution.y) / 150.;
    vec2 gridPixel = floor(pixelCoords / cellSize) * cellSize + cellSize * 0.5;

    vec2 gridUv = gridPixel / u_resolution;
    vec3 color = texture2D(u_texture, gridUv).rgb;
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    float radius = gray * cellSize * 0.5;
    float dist = distance(pixelCoords, gridPixel);

    float circle = 1.0 - smoothstep(radius - cellSize * 0.02, radius + cellSize * 0.02, dist);

    // Charcoal -> warm gray -> muted gold -> cool gray -> warm taupe (20s loop)
    vec3 c0 = vec3(0.176, 0.176, 0.176); // charcoal
    vec3 c1 = vec3(0.510, 0.490, 0.450); // warm gray
    vec3 c2 = vec3(0.580, 0.550, 0.470); // muted gold
    vec3 c3 = vec3(0.380, 0.380, 0.400); // cool gray
    vec3 c4 = vec3(0.470, 0.450, 0.420); // warm taupe

    float t = mod(time, 20.0);
    vec3 col;
    if (t < 4.0) {
      col = mix(c0, c1, smoothstep(0.0, 4.0, t));
    } else if (t < 8.0) {
      col = mix(c1, c2, smoothstep(4.0, 8.0, t));
    } else if (t < 12.0) {
      col = mix(c2, c3, smoothstep(8.0, 12.0, t));
    } else if (t < 16.0) {
      col = mix(c3, c4, smoothstep(12.0, 16.0, t));
    } else {
      col = mix(c4, c0, smoothstep(16.0, 20.0, t));
    }

    col *= 0.65;
    gl_FragColor = vec4(circle * col, circle * 0.85);
  }
`;

function useAspect(
  width: number,
  height: number,
  factor: number = 1
): [number, number, number] {
  const v = useThree((state) => state.viewport);
  const adaptedHeight =
    height * (v.aspect > width / height ? v.width / width : v.height / height);
  const adaptedWidth =
    width * (v.aspect > width / height ? v.width / width : v.height / height);
  return [adaptedWidth * factor, adaptedHeight * factor, 1];
}

function HalftoneScene() {
  const [texture, setTexture] = useState<THREE.VideoTexture>();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const video = document.getElementById("halftone-video") as HTMLVideoElement;
    if (!video) return;

    const initTexture = () => {
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      setTexture(videoTexture);
    };

    if (video.readyState >= 2) {
      video.play().catch(() => {});
      initTexture();
    } else {
      video.addEventListener("canplay", () => {
        video.play().catch(() => {});
        initTexture();
      }, { once: true });
    }
  }, []);

  const [videoAspectW, videoAspectH] = useAspect(1280, 720);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_videoAspect: { value: new THREE.Vector2(videoAspectW, videoAspectH) },
        time: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
  }, [texture, videoAspectW, videoAspectH]);

  useFrame((_, delta) => {
    if (material) {
      material.uniforms.u_resolution.value.set(videoAspectW, videoAspectH);
      material.uniforms.time.value += delta;
    }
  });

  return (
    <mesh scale={[videoAspectW, videoAspectH, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
}

export default function HalftoneBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <video
        id="halftone-video"
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/video.webm?v=3" type="video/webm" />
        <source src="/video.mp4?v=3" type="video/mp4" />
      </video>
      <Canvas
        className="absolute inset-0 w-full h-full"
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <HalftoneScene />
      </Canvas>
    </>
  );
}
