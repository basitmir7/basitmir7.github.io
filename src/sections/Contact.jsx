import styles from './Contact.module.css';
import { PERSON, SOCIALS } from '../data/portfolio';
import Ticker from '../components/Ticker';

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <>
      <Ticker inverted />

      <section id="contact" className={styles.contact}>
        <div className={styles.sectionLabel}>
          <span className={styles.mono}>05 — Contact</span>
        </div>

        <div className={styles.inner}>
          <div className={`${styles.top} reveal`}>
            <h2 className={styles.heading}>
              Let's build<br />
              something<br />
              <em>worth shipping.</em>
            </h2>

            <div className={styles.right}>
              <p className={styles.sub}>
                Open to full-time roles, selective freelance, and conversations that go somewhere interesting.
              </p>

              <a
                href={`mailto:${PERSON.email}`}
                className={styles.emailLink}
                data-hover
              >
                <span className={styles.emailLabel}>Email</span>
                <span className={styles.emailAddr}>{PERSON.email}</span>
                <span className={styles.emailArrow}>↗</span>
              </a>

              <div className={styles.socials}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    data-hover
                  >
                    <span>{s.label}</span>
                    <span className={styles.socialArrow}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className={styles.footer}>
            <span className={styles.mono}>© {year} {PERSON.name}</span>
            <span className={styles.mono}>{PERSON.coords}</span>
            <span className={styles.mono}>Built with React · Vite · CSS Modules</span>
          </div>
        </div>
      </section>
    </>
  );
}
