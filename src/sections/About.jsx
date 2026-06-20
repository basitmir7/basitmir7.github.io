import styles from './About.module.css';
import { PERSON, TIMELINE } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className={styles.about}>
      <div className={styles.sectionLabel}>
        <span className={styles.mono}>01 — About</span>
      </div>

      <div className={styles.grid}>
        {/* Left: portrait placeholder */}
        <div className={`${styles.portraitCol} reveal`} ref={ref}>
          <div className={styles.portrait}>
            <div className={styles.portraitInner}>
              <span className={styles.portraitInitials}>{PERSON.initials}</span>
              <div className={styles.portraitGrid} aria-hidden>
                {Array.from({ length: 64 }).map((_, i) => (
                  <span key={i} className={styles.portraitGridDot} />
                ))}
              </div>
            </div>
            <div className={styles.portraitTag}>
              <span className={styles.mono}>{PERSON.name.toLowerCase().replace(' ', '_')}.jpg</span>
            </div>
            <div className={styles.portraitAccent} />
          </div>

          {/* Vitals card */}
          <div className={styles.vitals}>
            <div className={styles.vitalsRow}>
              <span className={styles.vitalsKey}>Status</span>
              <span className={styles.vitalsVal}>
                <span className={styles.vitalsDot} />
                Open to work
              </span>
            </div>
            <div className={styles.vitalsRow}>
              <span className={styles.vitalsKey}>Based in</span>
              <span className={styles.vitalsVal}>{PERSON.location}</span>
            </div>
            <div className={styles.vitalsRow}>
              <span className={styles.vitalsKey}>Coords</span>
              <span className={styles.vitalsVal}>{PERSON.coords}</span>
            </div>
            <div className={styles.vitalsRow}>
              <span className={styles.vitalsKey}>Open to</span>
              <span className={styles.vitalsVal}>{PERSON.availableFor}</span>
            </div>
          </div>
        </div>

        {/* Right: text + timeline */}
        <div className={styles.contentCol}>
          <h2 className={`${styles.heading} reveal`}>
            A software engineer<br />
            <em>who thinks in systems</em>
          </h2>

          <div className={`${styles.bio} reveal reveal-delay-1`}>
            {PERSON.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Timeline */}
          <div className={`${styles.timeline} reveal reveal-delay-2`}>
            <h3 className={styles.timelineTitle}>
              <span className={styles.mono}>Through the years</span>
            </h3>
            <ol className={styles.timelineList}>
              {TIMELINE.map((item, i) => (
                <li key={i} className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineBody}>
                    <span className={styles.timelineEvent}>{item.event}</span>
                    <span className={styles.timelineSub}>{item.sub}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
