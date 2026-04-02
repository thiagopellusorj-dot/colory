"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageCompareProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  hint?: string;
}

export function ImageCompare({
  before,
  after,
  beforeLabel = "Foto original",
  afterLabel = "Página de colorir",
  hint = "Arraste para comparar",
}: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg cursor-ew-resize select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After (página de colorir) — full background */}
        <Image
          src={after}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 400px"
          priority
        />

        {/* Before (foto original) — clipped via clip-path for true overlay */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 400px"
            priority
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Circular handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full z-20">
          {beforeLabel}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full z-20">
          {afterLabel}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        ← {hint} →
      </p>
    </div>
  );
}
