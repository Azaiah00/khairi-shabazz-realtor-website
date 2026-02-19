import { useState, useEffect, useRef } from 'react';

const VirtualStagingSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; dragMode: boolean | null }>({ x: 0, y: 0, dragMode: null });

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, dragMode: null };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const ref = touchStartRef.current;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = Math.abs(x - ref.x);
      const dy = Math.abs(y - ref.y);
      if (ref.dragMode === null && (dx > 10 || dy > 10)) {
        ref.dragMode = dx > dy;
      }
      if (ref.dragMode === true && containerRef.current) {
        e.preventDefault();
        updateSliderPosition(x);
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = { x: 0, y: 0, dragMode: null };
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[600px] cursor-col-resize select-none rounded-2xl overflow-hidden shadow-2xl border border-white/10 touch-pan-y"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src="/virtual-staging-after.PNG"
          alt="After Virtual Staging"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg font-display font-semibold text-[var(--charcoal)] shadow-lg">
          After
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src="/virtual-staging-before.jpg"
          alt="Before Virtual Staging"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 glass px-4 py-2 rounded-lg font-display font-semibold text-[var(--charcoal)] shadow-lg">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[var(--teal)]">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-[var(--teal)] rounded-full"></div>
            <div className="w-0.5 h-4 bg-[var(--teal)] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full text-sm font-medium text-[var(--charcoal)] shadow-lg">
        Drag to compare
      </div>
    </div>
  );
};

export default VirtualStagingSlider;
