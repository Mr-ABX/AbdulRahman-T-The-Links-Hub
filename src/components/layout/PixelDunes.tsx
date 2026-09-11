import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Eye, Grid } from "lucide-react";

interface PixelDunesProps {
  imageSrc?: string;
}

export const PixelDunes: React.FC<PixelDunesProps> = ({
  imageSrc = "/footer-image.avif",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pixelMode, setPixelMode] = useState<"pixel" | "lens" | "hd">("lens");
  const [pixelSize, setPixelSize] = useState<number>(8); // 8px blocks for crisp retro aesthetic
  const [isLoaded, setIsLoaded] = useState(false);

  // Render the pixelated version of the dunes to canvas
  const renderPixelCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const img = imgRef.current;
    if (!canvas || !container || !img || !img.complete || img.naturalWidth === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    canvas.width = width;
    canvas.height = height;

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
      // Container is wider than image aspect ratio
      drawW = width;
      drawH = width / imgRatio;
      offsetX = 0;
      offsetY = height - drawH; // align bottom
    } else {
      // Container is narrower/taller than image aspect ratio
      drawH = height;
      drawW = height * imgRatio;
      offsetX = (width - drawW) / 2; // center horizontally
      offsetY = 0; // align bottom
    }

    // Downsample onto offscreen canvas for authentic mosaic pixel blocks
    const offW = Math.max(1, Math.floor(width / pixelSize));
    const offH = Math.max(1, Math.floor(height / pixelSize));

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
      offsetX / pixelSize,
      offsetY / pixelSize,
      drawW / pixelSize,
      drawH / pixelSize
    );

    // Upscale back without smoothing for razor-sharp pixel blocks
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, offW, offH, 0, 0, width, height);
  }, [pixelSize]);

  // Load image asset
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      setIsLoaded(true);
      renderPixelCanvas();
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
        renderPixelCanvas();
      }, 100);
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [renderPixelCanvas]);

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
      // In HD mode, pixel canvas is completely hidden
      return { opacity: 0 };
    }

    if (pixelMode === "pixel") {
      // In pure pixel mode, canvas is 100% visible across all dunes
      return { opacity: 1 };
    }

    // In "lens" mode: when hovered, reveal HD under cursor radius
    if (isHovered && mousePos) {
      const { x, y } = mousePos;
      const maskGradient = `radial-gradient(circle 180px at ${x}px ${y}px, transparent 0%, transparent 45%, black 85%)`;
      return {
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        opacity: 1,
        transition: "opacity 0.2s ease",
      };
    }

    return { opacity: 1, transition: "opacity 0.4s ease" };
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
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-lighten"
        style={getMaskStyle()}
      />

      {/* Interactive Cursor Spotlight Ring (shown in lens mode when hovering) */}
      {pixelMode === "lens" && isHovered && mousePos && (
        <div
          className="absolute pointer-events-none w-[360px] h-[360px] rounded-full border border-purple-400/20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 shadow-[0_0_50px_rgba(168,85,247,0.15)]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        >
          {/* Subtle crosshair indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 shadow-[0_0_10px_white]" />
        </div>
      )}

      {/* Apple HIG Pro Minimal Control Capsule */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 flex items-center gap-1.5 p-1 rounded-full bg-[#08080f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)] opacity-60 hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => setPixelMode("pixel")}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
            pixelMode === "pixel"
              ? "bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm"
              : "text-white/40 hover:text-white/80"
          }`}
          title="Pure Pixelated Dunes"
        >
          <Grid size={11} />
          <span className="hidden sm:inline">8-Bit Pixel</span>
        </button>

        <button
          onClick={() => setPixelMode("lens")}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
            pixelMode === "lens"
              ? "bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm"
              : "text-white/40 hover:text-white/80"
          }`}
          title="Interactive Lens (Hover to Reveal HD)"
        >
          <Sparkles size={11} />
          <span>Interactive Lens</span>
        </button>

        <button
          onClick={() => setPixelMode("hd")}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
            pixelMode === "hd"
              ? "bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm"
              : "text-white/40 hover:text-white/80"
          }`}
          title="Crisp High-Definition Dunes"
        >
          <Eye size={11} />
          <span className="hidden sm:inline">Original HD</span>
        </button>

        {/* Pixel Size Modifier (only shown when pixel or lens mode is active) */}
        {pixelMode !== "hd" && (
          <div className="flex items-center gap-1 pl-1 border-l border-white/10 text-[9px] font-mono text-white/50">
            <button
              onClick={() => setPixelSize(6)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${pixelSize === 6 ? "text-purple-300 font-bold bg-white/10" : "hover:text-white"}`}
              title="Fine Pixels (6px)"
            >
              6px
            </button>
            <button
              onClick={() => setPixelSize(8)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${pixelSize === 8 ? "text-purple-300 font-bold bg-white/10" : "hover:text-white"}`}
              title="Classic Pixels (8px)"
            >
              8px
            </button>
            <button
              onClick={() => setPixelSize(12)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${pixelSize === 12 ? "text-purple-300 font-bold bg-white/10" : "hover:text-white"}`}
              title="Chunky Retro Pixels (12px)"
            >
              12px
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
