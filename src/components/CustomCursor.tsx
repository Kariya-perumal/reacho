import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const downHandler = () => setIsActive(true);
    const upHandler = () => setIsActive(false);

    const hoverTargets = document.querySelectorAll('a, button, .tilt-card, .glass');

    const addActive = () => setIsActive(true);
    const removeActive = () => setIsActive(false);

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', addActive);
      el.addEventListener('mouseleave', removeActive);
    });

    window.addEventListener('mousemove', moveHandler);
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
      className={`custom-cursor hidden lg:block ${isActive ? 'active' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
