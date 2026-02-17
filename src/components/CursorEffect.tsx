"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number; color: string }[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const colors = ["#a2b79f", "#d8a373", "#e0835c", "#c4b090", "#9a8a9a"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add new point with random color from palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        color,
      });

      // Limit points
      if (points.current.length > 50) {
        points.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and age points
      points.current = points.current.filter((point) => {
        point.age += 1;
        const maxAge = 60;
        const opacity = 1 - point.age / maxAge;
        const size = 80 + point.age * 2;

        if (opacity <= 0) return false;

        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size
        );
        gradient.addColorStop(0, `${point.color}${Math.floor(opacity * 40).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "soft-light" }}
    />
  );
}
