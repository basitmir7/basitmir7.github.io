import { useState } from 'react';
import styles from './Experience.module.css';
import { EXPERIENCE } from '../data/portfolio';

function ExperienceCard({ job, isActive, onClick }) {
  return (
    <article
      className={`${styles.card} ${isActive ? styles.cardActive : ''} reveal`}
      onClick={onClick}
      data-hover
    >
      {/* Left accent bar */}
      <div
        className={styles.cardAccent}
        style={{ background: isActive ? job.accent : 'transparent' }}
      />

      <div className={styles.cardHeader}>
        {/* Logo */}
        <div
          className={styles.logo}
          style={{ borderColor: isActive ? job.accent : 'var(--border)' }}
        >
          <span
            className={styles.logoText}
            style={{ color: isActive ? job.accent : 'var(--text-3)' }}
          >
            {job.logo}
          </span>
        </div>

        <div className={styles.headerMeta}>
          <div className={styles.headerTop}>
            <h3 className={styles.company}>{job.company}</h3>
            <span className={styles.type}>{job.type}</span>
          </div>
          <p className={styles.role}>{job.role}</p>
          <div className={styles.headerBottom}>
            <span className={styles.period}>{job.period}</span>
            <span className={styles.dot} aria-hidden>·</span>
            <span className={styles.location}>{job.location}</span>
          </div>
        </div>

        <div className={`${styles.toggle} ${isActive ? styles.toggleOpen : ''}`}>
          <span />
          <span />
        </div>
      </div>

      {/* Expandable body */}
      <div className={`${styles.body} ${isActive ? styles.bodyOpen : ''}`}>
        <p className={styles.summary}>{job.summary}</p>

        <ul className={styles.highlights}>
          {job.highlights.map((h, i) => (
            <li key={i} className={styles.highlight}>
              <span
                className={styles.highlightDot}
                style={{ background: job.accent }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className={styles.techRow}>
          {job.tech.map(t => (
            <span key={t} className={styles.techPill}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  const [activeId, setActiveId] = useState(EXPERIENCE[0].id);

  const toggle = (id) => setActiveId(prev => prev === id ? null : id);

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.sectionLabel}>
        <span className={styles.mono}>03 — Experience</span>
      </div>

      <div className={styles.header}>
        <h2 className={`${styles.heading} reveal`}>
          Where I've<br />
          <em>done the work</em>
        </h2>
        <p className={`${styles.headingSub} reveal reveal-delay-1`}>
          Companies I've helped build, scale, and ship — and what came out of it.
        </p>
      </div>

      <div className={styles.list}>
        {EXPERIENCE.map(job => (
          <ExperienceCard
            key={job.id}
            job={job}
            isActive={activeId === job.id}
            onClick={() => toggle(job.id)}
          />
        ))}
      </div>
    </section>
  );
}
