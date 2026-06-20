import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
    };

    let raf;
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    const interactives = document.querySelectorAll(
      'a, button, [data-hover]'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor__dot${hovered ? ' hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor__ring${hovered ? ' hovered' : ''}${clicking ? ' clicking' : ''}`}
      />
    </>
  );
}
