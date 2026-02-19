import { useState, useEffect, useRef } from 'react';

const VirtualStagingSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      updateSliderPosition(e.touches[0].clientX);
    } else {
      updateSliderPosition(e.clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[600px] cursor-col-resize select-none rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
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
