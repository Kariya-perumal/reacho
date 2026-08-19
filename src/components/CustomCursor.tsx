import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveHandler = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const downHandler = () => cursor.classList.add('active');
    const upHandler = () => cursor.classList.remove('active');

    const hoverTargets = document.querySelectorAll('a, button, .tilt-card, .glass, [role="button"]');

    const addActive = () => cursor.classList.add('active');
    const removeActive = () => cursor.classList.remove('active');

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', addActive);
      el.addEventListener('mouseleave', removeActive);
    });

    window.addEventListener('mousemove', moveHandler, { passive: true });
    window.addEventListener('mousedown', downHandler);
    window.addEventListener('mouseup', upHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mousedown', downHandler);
      window.removeEventListener('mouseup', upHandler);
      hoverTargets.forEach(el => {
        el.removeEventListener('mouseenter', addActive);
        el.removeEventListener('mouseleave', removeActive);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
    />
  );
}
