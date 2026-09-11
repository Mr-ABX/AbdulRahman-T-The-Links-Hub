import React, { useEffect, useRef, useState, useCallback } from "react";

export type DuneShaderStyle = "pixel" | "halftone" | "dark";
export type DuneInteractionMode = "lens" | "full" | "hd";

export interface PixelDunesProps {
  imageSrc?: string;
  shaderStyle?: DuneShaderStyle;
  pixelMode?: DuneInteractionMode;
  pixelSize?: number;
  enableGlitch?: boolean;
  monochrome?: boolean;
}

export const PixelDunes: React.FC<PixelDunesProps> = ({
  imageSrc = "/footer-image.avif",
  shaderStyle = "halftone",
  pixelMode = "lens",
  pixelSize = 12,
  enableGlitch = false,
  monochrome = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchParamsRef = useRef<{
    slice1Y: number;
    slice1H: number;
    slice1Shift: number;
    slice2Y: number;
    slice2H: number;
    slice2Shift: number;
  }>({
    slice1Y: 0.4,
    slice1H: 0.1,
    slice1Shift: 8,
    slice2Y: 0.7,
    slice2H: 0.08,
    slice2Shift: -10,
  });

  const isVisibleInViewportRef = useRef(false);

  // Render the chosen shader (Pixel Mosaic, Halftone Dots, or Dark Silhouette) to canvas
  const renderShaderCanvas = useCallback(
    (applyGlitch = false) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const img = imgRef.current;
      if (!canvas || !container || !img || !img.complete || img.naturalWidth === 0) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Calculate dimensions with true "cover" logic so it always fills 100% of the container
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const offsetX = (width - drawW) / 2; // Center horizontally
      const offsetY = height - drawH; // Align to bottom

      const currentStep = Math.max(4, pixelSize);
      const offW = Math.max(1, Math.floor(width / currentStep));
      const offH = Math.max(1, Math.floor(height / currentStep));

      // Offscreen buffer for downsampling
      const offscreen = document.createElement("canvas");
      offscreen.width = offW;
      offscreen.height = offH;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Draw scaled down to offscreen with full container coverage
      offCtx.drawImage(
        img,
        0,
        0,
        imgW,
        imgH,
        offsetX / currentStep,
        offsetY / currentStep,
        drawW / currentStep,
        drawH / currentStep
      );

      ctx.clearRect(0, 0, width, height);

      // SHADER 1: Retro Halftone Dot Matrix
      if (shaderStyle === "halftone") {
        const imgData = offCtx.getImageData(0, 0, offW, offH).data;
        const maxRadius = currentStep * 0.58;

        for (let gy = 0; gy < offH; gy++) {
          const py = gy * currentStep + currentStep / 2;
          // Smooth vertical edge attenuation (top fade)
          const verticalFade = Math.min(1, py / (height * 0.22));

          for (let gx = 0; gx < offW; gx++) {
            const idx = (gy * offW + gx) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3];

            // Ignore pure dark background so black sky stays empty
            if (a < 15 || r + g + b < 24) continue;

            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (luminance < 0.05) continue;

            let px = gx * currentStep + currentStep / 2;

            // Smooth horizontal edge attenuation (left & right fade)
            const edgeDistX = Math.min(px, width - px);
            const horizontalFade = Math.min(1, edgeDistX / (width * 0.06));
            const totalFade = verticalFade * horizontalFade;

            if (totalFade <= 0.02) continue;

            const radius = Math.max(0.75, maxRadius * Math.pow(luminance, 0.75) * totalFade);

            // Apply glitch shift if active
            if (applyGlitch && enableGlitch) {
              const { slice1Y, slice1H, slice1Shift, slice2Y, slice2H, slice2Shift } =
                glitchParamsRef.current;
              const normalizedY = py / height;
              if (normalizedY >= slice1Y && normalizedY <= slice1Y + slice1H) {
                px += slice1Shift;
              } else if (normalizedY >= slice2Y && normalizedY <= slice2Y + slice2H) {
                px += slice2Shift;
              }
            }

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);

            const alpha = Math.min(1, (luminance + 0.25) * totalFade);

            if (monochrome) {
              // Stylized cyber-lavender dot matrix
              ctx.fillStyle = `rgba(${180 + Math.floor(r * 0.2)}, ${160 + Math.floor(g * 0.2)}, ${220 + Math.floor(b * 0.15)}, ${alpha})`;
            } else {
              // Vibrant colored neon dots
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
            ctx.fill();
          }
        }
      }
      // SHADER 2: Chunky 8-Bit Pixel Mosaic (or SHADER 3: Dark Silhouette)
      else {
        // Upscale without interpolation for razor-sharp pixel blocks
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, offW, offH, 0, 0, width, height);

        // Apply subtle horizontal glitch slice displacements if glitching
        if (applyGlitch && enableGlitch) {
          const { slice1Y, slice1H, slice1Shift, slice2Y, slice2H, slice2Shift } =
            glitchParamsRef.current;

          // Slice 1
          const s1Y = Math.floor(height * slice1Y);
          const s1H = Math.floor(height * slice1H);
          if (s1H > 0) {
            ctx.drawImage(
              offscreen,
              0,
              Math.floor((s1Y / height) * offH),
              offW,
              Math.floor((s1H / height) * offH),
              slice1Shift,
              s1Y,
              width,
              s1H
            );
          }

          // Slice 2
          const s2Y = Math.floor(height * slice2Y);
          const s2H = Math.floor(height * slice2H);
          if (s2H > 0) {
            ctx.drawImage(
              offscreen,
              0,
              Math.floor((s2Y / height) * offH),
              offW,
              Math.floor((s2H / height) * offH),
              slice2Shift,
              s2Y,
              width,
              s2H
            );
          }
        }
      }
    },
    [shaderStyle, pixelSize, enableGlitch, monochrome]
  );

  // Load image asset
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderShaderCanvas(false);
    };

    return () => {
      img.onload = null;
    };
  }, [imageSrc, renderShaderCanvas]);

  // Handle ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderShaderCanvas(false);
      }, 100);
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [renderShaderCanvas]);

  // IntersectionObserver to only animate glitch when footer is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleInViewportRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Periodic Glitch Pulse Timer (3.5s - 5s interval, lasting ~180ms)
  useEffect(() => {
    if (!enableGlitch || pixelMode === "hd") return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const triggerGlitch = () => {
      if (!isMounted) return;

      if (isVisibleInViewportRef.current) {
        glitchParamsRef.current = {
          slice1Y: 0.35 + Math.random() * 0.35,
          slice1H: 0.04 + Math.random() * 0.08,
          slice1Shift: (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 16),
          slice2Y: 0.65 + Math.random() * 0.25,
          slice2H: 0.03 + Math.random() * 0.07,
          slice2Shift: (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 14),
        };

        setIsGlitching(true);
        renderShaderCanvas(true);

        setTimeout(() => {
          if (!isMounted) return;
          glitchParamsRef.current.slice1Shift *= -0.5;
          glitchParamsRef.current.slice2Shift *= -0.5;
          renderShaderCanvas(true);
        }, 70);

        setTimeout(() => {
          if (!isMounted) return;
          setIsGlitching(false);
          renderShaderCanvas(false);
        }, 180);
      }

      const nextDelay = 3500 + Math.random() * 2000;
      timeoutId = setTimeout(triggerGlitch, nextDelay);
    };

    timeoutId = setTimeout(triggerGlitch, 2800);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [enableGlitch, pixelMode, renderShaderCanvas]);

  // Mouse move handler for interactive lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos(null);
  };

  // Large, Ultra-Smooth Gaussian-Falloff Spotlight Mask for HD Image Layer
  // 340px radius with 8-point Gaussian distribution curve for Apple-like soft light transitions
  const getHdLayerStyle = (): React.CSSProperties => {
    if (pixelMode === "hd") {
      return { opacity: 1 };
    }

    if (pixelMode === "full") {
      return { opacity: 0 };
    }

    // In "lens" mode: HD is revealed with a natural, seamless Gaussian light falloff
    if (isHovered && mousePos) {
      const { x, y } = mousePos;
      const maskGradient = `radial-gradient(circle 340px at ${x}px ${y}px, ` +
        `rgba(0,0,0,1) 0%, ` +
        `rgba(0,0,0,0.96) 15%, ` +
        `rgba(0,0,0,0.85) 30%, ` +
        `rgba(0,0,0,0.64) 45%, ` +
        `rgba(0,0,0,0.40) 60%, ` +
        `rgba(0,0,0,0.18) 75%, ` +
        `rgba(0,0,0,0.05) 88%, ` +
        `transparent 100%)`;
      return {
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        opacity: 1,
        transition: "opacity 0.25s ease-out",
      };
    }

    return { opacity: 0, transition: "opacity 0.4s ease-out" };
  };

  // Complementary Gaussian-Falloff Mask for Stylized Canvas Layer
  // Seamlessly dissolves the stylized dots/pixels under the soft spotlight
  const getCanvasLayerStyle = (): React.CSSProperties => {
    if (pixelMode === "hd") {
      return { opacity: 0 };
    }

    if (pixelMode === "full") {
      return { opacity: 1 };
    }

    // In "lens" mode: Carve out with matching Gaussian falloff
    if (isHovered && mousePos) {
      const { x, y } = mousePos;
      const maskGradient = `radial-gradient(circle 340px at ${x}px ${y}px, ` +
        `transparent 0%, ` +
        `rgba(0,0,0,0.04) 15%, ` +
        `rgba(0,0,0,0.15) 30%, ` +
        `rgba(0,0,0,0.36) 45%, ` +
        `rgba(0,0,0,0.60) 60%, ` +
        `rgba(0,0,0,0.82) 75%, ` +
        `rgba(0,0,0,0.95) 88%, ` +
        `black 100%)`;
      return {
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        opacity: 1,
        transition: "opacity 0.25s ease-out",
      };
    }

    return { opacity: 1, transition: "opacity 0.4s ease-out" };
  };

  // Compute CSS filter styling based on shaderStyle & monochrome settings
  const getStylizedFilter = () => {
    if (shaderStyle === "dark") {
      // Obsidian Dark Silhouette: deep mysterious shadows with sharp glowing crests
      return "brightness(0.42) contrast(1.55) saturate(0.15)";
    }
    if (monochrome) {
      // Stylized moody cyber-monochrome
      return "brightness(0.72) contrast(1.25) saturate(0.2)";
    }
    return "none";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full select-none cursor-crosshair group overflow-hidden pointer-events-auto"
      title="Hover across dunes to reveal crisp HD neon ridges"
    >
      {/* 1. Base Layer: High-Definition Original Image (Lighten blended, revealed through ultra-soft Gaussian spotlight) */}
      <img
        src={imageSrc}
        alt="Neon Desert Dunes"
        className="absolute inset-0 w-full h-full object-cover object-bottom mix-blend-lighten pointer-events-none"
        style={getHdLayerStyle()}
      />

      {/* 2. Top Layer: Stylized Shader Canvas (Pixel Mosaic, Halftone Dots, or Dark Silhouette) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-lighten transition-transform duration-100 ${
          isGlitching ? "translate-x-[1.5px] scale-[1.002]" : "translate-x-0 scale-100"
        }`}
        style={{
          ...getCanvasLayerStyle(),
          filter: getStylizedFilter(),
        }}
      />

      {/* 3. Apple-like Gaussian Ambient Soft Light Scatter (Zero hard borders, pure diffused light) */}
      {pixelMode === "lens" && isHovered && mousePos && (
        <div
          className="absolute pointer-events-none w-[680px] h-[680px] rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 blur-3xl opacity-80"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(147,51,234,0.07) 35%, rgba(124,58,237,0.02) 65%, transparent 80%)",
          }}
        />
      )}
    </div>
  );
};
