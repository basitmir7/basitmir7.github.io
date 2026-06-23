import { useEffect, useState } from 'react';
import s from './Loader.module.css';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      // accelerate toward 100 with variable speed
      const remaining = 100 - v;
      const step = Math.max(1, remaining * 0.06 + Math.random() * 3);
      v = Math.min(100, v + step);
      setPct(Math.floor(v));
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setOut(true);
          setTimeout(onDone, 700);
        }, 300);
      }
    }, 40);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className={`${s.loader} ${out ? s.out : ''}`}>
      <div className={s.pct}>{String(pct).padStart(2,'0')}%</div>
      <div className={s.bar}>
        <div className={s.fill} style={{ width: pct + '%' }} />
      </div>
      <div className={s.label}>Loading</div>
    </div>
  );
}
