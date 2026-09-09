import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { ExternalLink, RotateCcw, Zap, Eye, Sparkles } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  color: string;
}

interface RingConfig {
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  color: string;
  dashed: boolean;
  satellites: { angle: number; size: number; speed: number }[];
}

export const Portal3DOrbit = ({
  className = "",
  showControls = true,
}: {
  className?: string;
  showControls?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction & State
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [activeMode, setActiveMode] = useState<"standard" | "dense" | "constellation">("constellation");
  const [isInteracting, setIsInteracting] = useState(false);

  // Rotation angles
  const rotRef = useRef({
    x: 0.35,
    y: 0.5,
    targetX: 0.35,
    targetY: 0.5,
    autoSpeed: 0.006,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  const nodeCount = activeMode === "dense" ? 180 : activeMode === "constellation" ? 120 : 75;

  // Generate 3D Fibonacci Sphere Nodes
  const pointsRef = useRef<Point3D[]>([]);

  const initPoints = useCallback(() => {
    const points: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Color accents: predominantly metallic silver/white with purple & cyan highlights
      const rand = Math.random();
      let color = "rgba(255, 255, 255, 0.9)";
      if (rand < 0.25) {
        color = "rgba(168, 85, 247, 0.9)"; // Purple brand accent
      } else if (rand < 0.45) {
        color = "rgba(6, 182, 212, 0.9)"; // Cyan tech accent
      }

      points.push({
        x,
        y,
        z,
        baseRadius: Math.random() * 1.5 + 1.5,
        color,
      });
    }
    pointsRef.current = points;
  }, [nodeCount]);

  useEffect(() => {
    initPoints();
  }, [initPoints]);

  // Gyroscope Rings Configuration
  const ringsRef = useRef<RingConfig[]>([
    {
      radius: 1.32,
      tiltX: 0.45,
      tiltZ: 0.2,
      speed: 0.012,
      color: "rgba(168, 85, 247, 0.35)",
      dashed: false,
      satellites: [
        { angle: 0, size: 3, speed: 0.015 },
        { angle: Math.PI, size: 2.2, speed: 0.015 },
      ],
    },
    {
      radius: 1.58,
      tiltX: -0.65,
      tiltZ: -0.4,
      speed: -0.008,
      color: "rgba(6, 182, 212, 0.3)",
      dashed: true,
      satellites: [
        { angle: Math.PI / 2, size: 2.8, speed: -0.01 },
      ],
    },
    {
      radius: 1.85,
      tiltX: 1.1,
      tiltZ: 0.8,
      speed: 0.005,
      color: "rgba(255, 255, 255, 0.22)",
      dashed: false,
      satellites: [
        { angle: (Math.PI * 3) / 4, size: 2.5, speed: 0.008 },
      ],
    },
  ]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let ringStep = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const sphereRadius = Math.min(width, height) * 0.26;
      const fov = 400;

      // Smooth camera interpolation
      const rot = rotRef.current;
      if (!rot.isDragging) {
        rot.targetY += rot.autoSpeed * speedMultiplier;
      }
      rot.x += (rot.targetX - rot.x) * 0.08;
      rot.y += (rot.targetY - rot.y) * 0.08;

      const cosX = Math.cos(rot.x);
      const sinX = Math.sin(rot.x);
      const cosY = Math.cos(rot.y);
      const sinY = Math.sin(rot.y);

      ringStep += 0.01 * speedMultiplier;

      // Project 3D vector to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const x1 = cosY * x + sinY * z;
        const z1 = -sinY * x + cosY * z;

        // Rotate X
        const y2 = cosX * y - sinX * z1;
        const z2 = sinX * y + cosX * z1;

        const scale = fov / (fov + z2 * sphereRadius);
        const px = cx + x1 * sphereRadius * scale;
        const py = cy + y2 * sphereRadius * scale;

        return { px, py, pz: z2, scale };
      };

      // 1. Draw Ambient Core Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius * 1.2);
      coreGrad.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      coreGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Gyroscope / Orbital Rings
      ringsRef.current.forEach((ring) => {
        const ringRadius = ring.radius;
        const segments = 64;
        const ringPoints: { px: number; py: number; pz: number }[] = [];

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2 + ringStep * ring.speed * 10;
          let rx = Math.cos(theta) * ringRadius;
          let ry = 0;
          let rz = Math.sin(theta) * ringRadius;

          // Apply ring tilt
          const cosTx = Math.cos(ring.tiltX);
          const sinTx = Math.sin(ring.tiltX);
          const ry1 = cosTx * ry - sinTx * rz;
          const rz1 = sinTx * ry + cosTx * rz;

          const cosTz = Math.cos(ring.tiltZ);
          const sinTz = Math.sin(ring.tiltZ);
          const rx2 = cosTz * rx - sinTz * ry1;
          const ry2 = sinTz * rx + cosTz * ry1;

          const p = project(rx2, ry2, rz1);
          ringPoints.push(p);
        }

        // Draw ring path
        ctx.beginPath();
        if (ring.dashed) {
          ctx.setLineDash([4, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;

        ringPoints.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Satellites on the ring
        ring.satellites.forEach((sat) => {
          sat.angle += sat.speed * speedMultiplier;
          let sx = Math.cos(sat.angle) * ringRadius;
          let sy = 0;
          let sz = Math.sin(sat.angle) * ringRadius;

          const cosTx = Math.cos(ring.tiltX);
          const sinTx = Math.sin(ring.tiltX);
          const sy1 = cosTx * sy - sinTx * sz;
          const sz1 = sinTx * sy + cosTx * sz;

          const cosTz = Math.cos(ring.tiltZ);
          const sinTz = Math.sin(ring.tiltZ);
          const sx2 = cosTz * sx - sinTz * sy1;
          const sy2 = sinTz * sx + cosTz * sy1;

          const p = project(sx2, sy2, sz1);

          // Glow around satellite
          ctx.beginPath();
          ctx.arc(p.px, p.py, sat.size * 2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = ring.color.replace("0.3", "0.15").replace("0.35", "0.2");
          ctx.fill();

          // Satellite core
          ctx.beginPath();
          ctx.arc(p.px, p.py, sat.size * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        });
      });

      // 3. Project all Sphere Points
      const projected = pointsRef.current.map((pt) => {
        const proj = project(pt.x, pt.y, pt.z);
        return {
          ...pt,
          px: proj.px,
          py: proj.py,
          pz: proj.pz,
          scale: proj.scale,
        };
      });

      // Sort by depth (Z-buffer: back to front)
      projected.sort((a, b) => a.pz - b.pz);

      // 4. Draw Constellation lines between near points (in front hemisphere)
      if (activeMode === "constellation") {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          if (p1.pz < -0.3) continue; // Skip back hemisphere connections for clarity

          for (let j = i + 1; j < projected.length; j++) {
            const p2 = projected[j];
            if (p2.pz < -0.3) continue;

            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 42) {
              const alpha = (1 - dist / 42) * 0.25 * ((p1.pz + p2.pz) / 2 + 1);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }
      }

      // 5. Draw Sphere Particle Nodes
      projected.forEach((pt) => {
        // Closer nodes are brighter and larger
        const depthFactor = (pt.pz + 1) / 2; // 0 to 1
        const radius = Math.max(0.8, pt.baseRadius * pt.scale * (0.6 + depthFactor * 0.7));
        const alpha = Math.min(1, Math.max(0.15, 0.2 + depthFactor * 0.8));

        ctx.beginPath();
        ctx.arc(pt.px, pt.py, radius, 0, Math.PI * 2);

        // Specular glow for front-facing nodes
        if (pt.pz > 0.4) {
          ctx.shadowColor = pt.color;
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = pt.color.replace("0.9", alpha.toFixed(2));
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [speedMultiplier, activeMode]);

  // Pointer Interaction Handlers (Drag & Tilt)
  const handlePointerDown = (e: React.PointerEvent) => {
    rotRef.current.isDragging = true;
    rotRef.current.lastMouseX = e.clientX;
    rotRef.current.lastMouseY = e.clientY;
    setIsInteracting(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!rotRef.current.isDragging) {
      // Subtle parallax tilt when hovering
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      rotRef.current.targetX = 0.35 + yPct * 0.4;
      return;
    }

    const deltaX = e.clientX - rotRef.current.lastMouseX;
    const deltaY = e.clientY - rotRef.current.lastMouseY;

    rotRef.current.lastMouseX = e.clientX;
    rotRef.current.lastMouseY = e.clientY;

    rotRef.current.targetY += deltaX * 0.008;
    rotRef.current.targetX += deltaY * 0.008;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    rotRef.current.isDragging = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    rotRef.current.targetX = 0.35;
    rotRef.current.targetY = 0.5;
    setSpeedMultiplier(1);
  };

  return (
    <div
      ref={containerRef}
      id="portal-v2-3d-orbit-container"
      className={`relative w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-3xl overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Background specular grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0,transparent_70%)] pointer-events-none" />

      {/* 3D WebGL / 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        style={{ touchAction: "none" }}
      />

      {/* Subtle UI Telemetry Overlay (Apple Pro / Spatial UI Aesthetic) */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-cyan-400/90">
            PORTAL V2 // 3D ORBIT
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-tight text-white/40">
          SPATIAL CORE • {nodeCount} NODES • 3 RINGS
        </span>
      </div>

      {/* Interaction Hint (fades out on interaction) */}
      <div
        className={`absolute bottom-4 left-4 z-20 pointer-events-none transition-opacity duration-300 ${
          isInteracting ? "opacity-0" : "opacity-60"
        }`}
      >
        <span className="font-mono text-[10px] text-white/50 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          ✦ Drag to rotate sphere
        </span>
      </div>

      {/* Floating Control Glass Pills */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-lg">
          <button
            onClick={() => {
              setActiveMode(
                activeMode === "constellation"
                  ? "dense"
                  : activeMode === "dense"
                  ? "standard"
                  : "constellation"
              );
            }}
            id="portal-mode-toggle-btn"
            title="Toggle Lattice Mode"
            className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono font-medium flex items-center gap-1 px-2"
          >
            <Sparkles size={12} className="text-purple-400" />
            <span className="hidden sm:inline capitalize">{activeMode}</span>
          </button>

          <button
            onClick={() => {
              setSpeedMultiplier((prev) => (prev === 1 ? 2.5 : prev === 2.5 ? 0.2 : 1));
            }}
            id="portal-speed-toggle-btn"
            title="Adjust Orbit Velocity"
            className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono font-medium flex items-center gap-1 px-2"
          >
            <Zap size={12} className={speedMultiplier > 1 ? "text-cyan-400" : "text-white/40"} />
            <span>{speedMultiplier}x</span>
          </button>

          <button
            onClick={handleReset}
            id="portal-reset-view-btn"
            title="Reset Orientation"
            className="p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      )}
    </div>
  );
};
