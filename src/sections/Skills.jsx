import styles from './Skills.module.css';
import { SKILLS } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.sectionLabel}>
        <span className={styles.mono}>04 — Skills</span>
      </div>

      <h2 className={`${styles.heading} reveal`}>
        Stack &<br /><em>expertise</em>
      </h2>

      <div className={styles.grid}>
        {SKILLS.map((cat, ci) => (
          <div key={ci} className={`${styles.category} reveal`} style={{ transitionDelay: `${ci * 0.12}s` }}>
            <div className={styles.catHeader}>
              <span className={styles.catNum}>0{ci + 1}</span>
              <h3 className={styles.catName}>{cat.category}</h3>
            </div>
            <ul className={styles.list}>
              {cat.items.map((item, ii) => (
                <li key={ii} className={styles.item}>
                  <span className={styles.itemDash} aria-hidden>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Philosophy strip */}
      <div className={`${styles.philosophy} reveal`}>
        <div className={styles.philoInner}>
          <div className={styles.philoQuote}>
            <span className={styles.philoMark}>"</span>
            <p>
              I don't just write code — I think about the system, the user, and the decade of maintenance that follows every decision.
            </p>
          </div>
          <div className={styles.philoMeta}>
            <span className={styles.mono}>— {new Date().getFullYear()} · Engineering philosophy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
