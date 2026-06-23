import data from '../data/portfolio.json'
import './About.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';

export default function About() {
  const { about, meta } = data

  return (
    <motion.section className="about section" id="about" {...fadeUp}>
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <span className="section-label mono">about</span>
          </div>
          <div className="about__right">
            <h2 className="about__heading">
              <strong>{about.heading}</strong>
            </h2>
            <p className="about__body">{meta.availability}</p>
            <div className="about__cta">
              {about.cta.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}`}
                  target={c.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
