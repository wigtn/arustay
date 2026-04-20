'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  images: string[];
  alt: string;
  labels: {
    prev: string;
    next: string;
    slide: (current: number, total: number) => string;
  };
  className?: string;
};

const SWIPE_THRESHOLD_PX = 50;
const TRANSITION_MS = 300;

export default function RoomCarousel({ images, alt, labels, className = '' }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef(0);
  const x = useMotionValue(0);
  const total = images.length;

  const dragRef = useRef<{
    active: boolean;
    startX: number;
    originX: number;
    pointerId: number;
  }>({ active: false, startX: 0, originX: 0, pointerId: -1 });

  const runningAnim = useRef<ReturnType<typeof animate> | null>(null);

  const stopAnim = () => {
    runningAnim.current?.stop();
    runningAnim.current = null;
  };

  const snapTo = useCallback(
    (i: number, opts?: { immediate?: boolean }) => {
      stopAnim();
      const target = -i * widthRef.current;
      if (opts?.immediate || reduce) {
        x.set(target);
        return;
      }
      runningAnim.current = animate(x, target, {
        duration: TRANSITION_MS / 1000,
        ease: [0.22, 1, 0.36, 1],
      });
    },
    [reduce, x],
  );

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + total) % total);
    },
    [total],
  );

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % total) + total) % total);
    },
    [total],
  );

  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      widthRef.current = el.offsetWidth;
      snapTo(indexRef.current, { immediate: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [snapTo]);

  useEffect(() => {
    snapTo(index);
  }, [index, snapTo]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopAnim();
    dragRef.current = {
      active: true,
      startX: e.clientX,
      originX: x.get(),
      pointerId: e.pointerId,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragRef.current;
    if (!s.active || s.pointerId !== e.pointerId) return;
    const delta = e.clientX - s.startX;
    x.set(s.originX + delta);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragRef.current;
    if (!s.active || s.pointerId !== e.pointerId) return;
    const delta = e.clientX - s.startX;
    s.active = false;
    if (delta < -SWIPE_THRESHOLD_PX) {
      go(1);
    } else if (delta > SWIPE_THRESHOLD_PX) {
      go(-1);
    } else {
      snapTo(indexRef.current);
    }
  };

  const slideLabel = labels.slide(index + 1, total);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-sand-200 select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
      tabIndex={0}
    >
      <div className="relative h-full w-full">
        <motion.div
          className="flex h-full w-full cursor-grab active:cursor-grabbing"
          style={{ x, touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative h-full w-full shrink-0 basis-full bg-cover bg-center"
              style={{ backgroundImage: `url("${src}")` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${total}`}
              aria-hidden={i !== index}
              draggable={false}
            />
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-sand-50/85 text-ink hover:bg-sand-50 transition-colors shadow-sm"
        aria-label={labels.prev}
      >
        <ChevronLeft size={18} strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-sand-50/85 text-ink hover:bg-sand-50 transition-colors shadow-sm"
        aria-label={labels.next}
      >
        <ChevronRight size={18} strokeWidth={1.8} />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`pointer-events-auto h-1.5 rounded-full transition-all ${
              i === index ? 'w-5 bg-sand-50' : 'w-1.5 bg-sand-50/60 hover:bg-sand-50/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {slideLabel}
      </div>
    </div>
  );
}
