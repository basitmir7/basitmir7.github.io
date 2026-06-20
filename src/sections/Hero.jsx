import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import { PERSON, STATS } from '../data/portfolio';
import Ticker from '../components/Ticker';

// ASCII grid that reacts to mouse
function AsciiBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const chars = ['·', '+', '×', '◆', '○', '—', '│'];
    let mouse = { x: -999, y: -999 };
    let animId;
    let t = 0;

    const draw = () => {
      const ctx = canvas.getContext('2d');
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cols = Math.floor(W / 36);
      const rows = Math.floor(H / 36);

      ctx.font = '11px JetBrains Mono, monospace';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 36 + 18;
          const y = r * 36 + 18;
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 220);
          const noise = Math.sin(c * 0.4 + t) * Math.cos(r * 0.4 + t * 0.7);
          const charIdx = Math.floor(
            ((noise + 1) / 2 + influence * 0.8) * chars.length
          ) % chars.length;

          const baseAlpha = 0.07;
          const alpha = baseAlpha + influence * 0.35;
          ctx.fillStyle = influence > 0.2
            ? `rgba(255, 61, 0, ${alpha})`
            : `rgba(13, 13, 15, ${alpha})`;

          ctx.fillText(chars[charIdx], x, y);
        }
      }
      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.ascii} aria-hidden />;
}

// Animated counter
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const dur = 1200;
        const step = dur / 60;
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(current + num / 60, num);
          setVal(Math.floor(current));
          if (current >= num) clearInterval(interval);
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <AsciiBackground />

      <div className={styles.inner}>
        {/* Status badge */}
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span className={styles.statusMono}>
            {PERSON.available ? 'Available for work' : 'Currently unavailable'}
          </span>
          <span className={styles.statusSep}>·</span>
          <span className={styles.statusMono}>{PERSON.location}</span>
        </div>

        {/* Main headline */}
        <h1 className={styles.headline}>
          <span className={styles.headlineRow}>
            <span className={styles.headlineItalic}>Engineering</span>
            <span className={styles.headlineIndex}>01</span>
          </span>
          <span className={styles.headlineRow}>
            <span>that</span>
          </span>
          <span className={styles.headlineRow}>
            <span>feels like</span>
          </span>
          <span className={`${styles.headlineRow} ${styles.headlineAccent}`}>
            <em>magic.</em>
          </span>
        </h1>

        {/* Sub copy */}
        <div className={styles.sub}>
          <p>{PERSON.bio[0]}</p>
          <p className={styles.subSecond}>{PERSON.bio[1]}</p>
        </div>

        {/* CTAs */}
        <div className={styles.ctas}>
          <button
            className={styles.ctaPrimary}
            data-hover
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View my work</span>
            <span className={styles.ctaArrow}>↓</span>
          </button>
          <a href={`mailto:${PERSON.email}`} className={styles.ctaGhost} data-hover>
            {PERSON.email}
          </a>
        </div>

        {/* Stats strip */}
        <div className={styles.stats}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statNum}>
                {/^\d/.test(s.value)
                  ? <Counter target={parseInt(s.value)} suffix={s.value.replace(/\d+/, '')} />
                  : s.value}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollMono}>scroll</span>
      </div>
    </section>
  );
}
