import React, { useEffect, useRef, useState, useCallback } from "react";

export interface PixelDunesProps {
  imageSrc?: string;
  pixelMode?: "lens" | "pixel" | "hd";
  pixelSize?: number;
  enableGlitch?: boolean;
  monochrome?: boolean;
}

export const PixelDunes: React.FC<PixelDunesProps> = ({
  imageSrc = "/footer-image.avif",
  pixelMode = "lens",
  pixelSize = 8,
  enableGlitch = true,
  monochrome = true,
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

  // Render the pixelated version of the dunes to canvas
  const renderPixelCanvas = useCallback(
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

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate dimensions matching CSS "object-cover object-bottom"
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const containerRatio = width / height;
      const imgRatio = imgW / imgH;

      let drawW = width;
      let drawH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (containerRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        offsetX = 0;
        offsetY = height - drawH; // align bottom
      } else {
        drawH = height;
        drawW = height * imgRatio;
        offsetX = (width - drawW) / 2; // center horizontally
        offsetY = 0; // align bottom
      }

      // Downsample onto offscreen canvas for authentic mosaic pixel blocks
      const currentPixelSize = Math.max(2, pixelSize);
      const offW = Math.max(1, Math.floor(width / currentPixelSize));
      const offH = Math.max(1, Math.floor(height / currentPixelSize));

      const offscreen = document.createElement("canvas");
      offscreen.width = offW;
      offscreen.height = offH;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Draw scaled down
      offCtx.drawImage(
        img,
        0,
        0,
        imgW,
        imgH,
        offsetX / currentPixelSize,
        offsetY / currentPixelSize,
        drawW / currentPixelSize,
        drawH / currentPixelSize
      );

      // Upscale back without smoothing for razor-sharp pixel blocks
      ctx.clearRect(0, 0, width, height);
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
    },
    [pixelSize, enableGlitch]
  );

  // Load image asset
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      renderPixelCanvas(false);
    };

    return () => {
      img.onload = null;
    };
  }, [imageSrc, renderPixelCanvas]);

  // Handle ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderPixelCanvas(false);
      }, 100);
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [renderPixelCanvas]);

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

  // Periodic Glitch Pulse Timer (3.5s - 5s interval, lasting ~200ms)
  useEffect(() => {
    if (!enableGlitch || pixelMode === "hd") return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const triggerGlitch = () => {
      if (!isMounted) return;

      // Only execute if footer is currently in viewport
      if (isVisibleInViewportRef.current) {
        // Randomize slice coordinates for natural digital glitching
        glitchParamsRef.current = {
          slice1Y: 0.35 + Math.random() * 0.35,
          slice1H: 0.04 + Math.random() * 0.08,
          slice1Shift: (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 14),
          slice2Y: 0.65 + Math.random() * 0.25,
          slice2H: 0.03 + Math.random() * 0.07,
          slice2Shift: (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 12),
        };

        setIsGlitching(true);
        renderPixelCanvas(true);

        // Frame 2 of glitch jitter after 80ms
        setTimeout(() => {
          if (!isMounted) return;
          glitchParamsRef.current.slice1Shift *= -0.6;
          glitchParamsRef.current.slice2Shift *= -0.5;
          renderPixelCanvas(true);
        }, 80);

        // Reset to normal sharp pixel canvas after 180ms
        setTimeout(() => {
          if (!isMounted) return;
          setIsGlitching(false);
          renderPixelCanvas(false);
        }, 200);
      }

      // Schedule next pulse (between 3.5 and 5.5 seconds)
      const nextDelay = 3500 + Math.random() * 2000;
      timeoutId = setTimeout(triggerGlitch, nextDelay);
    };

    timeoutId = setTimeout(triggerGlitch, 2800);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [enableGlitch, pixelMode, renderPixelCanvas]);

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

  // Compute CSS mask for the pixelated layer based on active mode
  const getMaskStyle = () => {
    if (pixelMode === "hd") {
      return { opacity: 0 };
    }

    if (pixelMode === "pixel") {
      return { opacity: 1 };
    }

    // In "lens" mode: when hovered, reveal HD under cursor radius
    if (isHovered && mousePos) {
      const { x, y } = mousePos;
      const maskGradient = `radial-gradient(circle 200px at ${x}px ${y}px, transparent 0%, transparent 40%, black 85%)`;
      return {
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        opacity: 1,
        transition: "opacity 0.2s ease",
      };
    }

    return { opacity: 1, transition: "opacity 0.4s ease" };
  };

  // Compute monochromatic styling for stylized dark digital aesthetic
  const getMonochromeStyle = () => {
    if (!monochrome) return {};
    return {
      filter: "brightness(0.72) contrast(1.22) saturate(0.25)",
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full select-none cursor-crosshair group overflow-hidden pointer-events-auto"
      title="Hover over dunes to reveal crisp HD contours"
    >
      {/* Base Layer: High-Definition Image (mix-blend-lighten ensures no black box/background borders) */}
      <img
        src={imageSrc}
        alt="Neon Desert Dunes"
        className="absolute inset-0 w-full h-full object-cover object-bottom mix-blend-lighten pointer-events-none"
        style={{
          opacity: pixelMode === "pixel" && !isHovered ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Top Layer: Dynamic Pixelated Canvas (mix-blend-lighten ensures only the dune neon light is pixelated) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-lighten transition-transform duration-100 ${
          isGlitching ? "translate-x-[1.5px] scale-[1.002]" : "translate-x-0 scale-100"
        }`}
        style={{
          ...getMaskStyle(),
          ...getMonochromeStyle(),
        }}
      />

      {/* Interactive Cursor Spotlight Ring (shown in lens mode when hovering) */}
      {pixelMode === "lens" && isHovered && mousePos && (
        <div
          className="absolute pointer-events-none w-[400px] h-[400px] rounded-full border border-purple-400/25 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 shadow-[0_0_60px_rgba(168,85,247,0.18)]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          {/* Subtle crosshair indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50 shadow-[0_0_12px_white]" />
        </div>
      )}
    </div>
  );
};
