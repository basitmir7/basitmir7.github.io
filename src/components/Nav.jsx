import { useEffect, useState } from 'react';
import styles from './Nav.module.css';
import { PERSON } from '../data/portfolio';

const links = [
  { label: '01 About',      href: '#about' },
  { label: '02 Work',       href: '#work' },
  { label: '03 Experience', href: '#experience' },
  { label: '04 Skills',     href: '#skills' },
  { label: '05 Contact',    href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['about', 'work', 'experience', 'skills', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <button
        className={styles.logo}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <span className={styles.logoName}>{PERSON.name}</span>
        <span className={`${styles.logoDot} ${PERSON.available ? styles.available : ''}`} />
      </button>

      <ul className={styles.links} role="list">
        {links.map(({ label, href }) => {
          const id = href.replace('#', '');
          return (
            <li key={href}>
              <button
                className={`${styles.link} ${active === id ? styles.linkActive : ''}`}
                onClick={() => handleLink(href)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <a href={`mailto:${PERSON.email}`} className={styles.cta} data-hover>
        Email me
      </a>

      <button
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
        onClick={() => setMenuOpen(p => !p)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {links.map(({ label, href }) => (
            <button
              key={href}
              className={styles.mobileLink}
              onClick={() => handleLink(href)}
            >
              {label}
            </button>
          ))}
          <a href={`mailto:${PERSON.email}`} className={styles.mobileCta}>
            Email me
          </a>
        </div>
      )}
    </nav>
  );
}
