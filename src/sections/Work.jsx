import { useRef, useState } from 'react';
import styles from './Work.module.css';
import { PROJECTS } from '../data/portfolio';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 3}deg)`;
    card.style.transition = 'transform 0.05s';
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    card.style.transition = 'transform 0.5s var(--ease-out-expo)';
    setHovered(false);
  };

  return (
    <article
      ref={cardRef}
      className={`${styles.card} reveal`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-hover
    >
      {/* Color band */}
      <div
        className={styles.cardBand}
        style={{ background: project.color }}
      />

      <div className={styles.cardInner}>
        {/* Header row */}
        <div className={styles.cardHeader}>
          <span className={styles.cardIndex}>{project.index}</span>
          <span className={styles.cardTag}>{project.tag}</span>
          <span className={`${styles.cardArrow} ${hovered ? styles.cardArrowActive : ''}`}>
            ↗
          </span>
        </div>

        {/* Title */}
        <div className={styles.cardTitles}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardSubtitle}>{project.subtitle}</p>
        </div>

        {/* Desc */}
        <p className={styles.cardDesc}>{project.desc}</p>

        {/* Impact */}
        <div className={styles.cardImpact}>
          <span className={styles.mono} style={{ color: project.color }}>
            → {project.impact}
          </span>
        </div>

        {/* Tech */}
        <div className={styles.cardTech}>
          {project.tech.map(t => (
            <span key={t} className={styles.techPill}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className={styles.work}>
      <div className={styles.sectionLabel}>
        <span className={styles.mono}>02 — Work</span>
      </div>

      <div className={styles.header}>
        <h2 className={`${styles.heading} reveal`}>
          Selected<br />
          <em>projects</em>
        </h2>
        <p className={`${styles.headingSub} reveal reveal-delay-1`}>
          A handful of things I'm proud of. There are more — these are the ones that shipped and stuck.
        </p>
      </div>

      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className={`${styles.moreCta} reveal`}>
        <span className={styles.moreMonoLine} />
        <span className={styles.mono}>More on GitHub & read.cv</span>
        <span className={styles.moreMonoLine} />
      </div>
    </section>
  );
}
