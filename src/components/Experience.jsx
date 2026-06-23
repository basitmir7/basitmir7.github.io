import data from '../data/portfolio.json'
import './Experience.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';

export default function Experience() {
  return (
    <motion.section className="experience section" id="experience" {...fadeUp}>
      <div className="container">
        <div className="exp__grid">
          <div className="exp__left">
            <span className="section-label mono">experience</span>
          </div>
          <div className="exp__right">
            <h2 className="exp__title">
              <strong>Work</strong> history
            </h2>
            <ul className="exp__list">
              {data.experience.map((e, i) => (
                <li className="exp__item" key={i}>
                  <div className="exp__meta">
                    <span className="exp__period mono">{e.period}</span>
                    {e.company && (
                      <span className="exp__company">· {e.company}</span>
                    )}
                  </div>
                  <div className="exp__detail">
                    <h3 className="exp__role">{e.role}</h3>
                    <p className="exp__desc">{e.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
