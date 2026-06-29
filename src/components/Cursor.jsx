import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const [hov, setHov] = useState(false);
  const [sq,  setSq]  = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    const move = e => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) { dot.current.style.left = mx+'px'; dot.current.style.top = my+'px'; }
    };

    const tick = () => {
      rx += (mx - rx) * .12; ry += (my - ry) * .12;
      if (ring.current) { ring.current.style.left = rx+'px'; ring.current.style.top = ry+'px'; }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onEnter = e => {
      setHov(true);
      setSq(e.target.dataset.sq !== undefined);
    };
    const onLeave = () => { setHov(false); setSq(false); };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className={`c-dot${hov?' h':''}`} />
      <div ref={ring} className={`c-ring${hov?' h':''}${sq?' sq':''}`} />
    </>
  );
}
