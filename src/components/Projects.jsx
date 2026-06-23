import data from '../data/portfolio.json'
import './Projects.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';

export default function Projects() {
  return (
    <motion.section className="projects section" id="projects" {...fadeUp}>
      <div className="container">
        <div className="projects__header">
          <span className="section-label mono">selected work</span>
          <h2 className="projects__title">
            <strong>Selected</strong> projects
          </h2>
        </div>

        <div className="projects__grid">
          {data.projects.map((p) => (
            <article className="project-card" key={p.id}>
              <div className="project-card__top">
                <div className="project-card__tags">
                  {p.tags.map((t, i) => (
                    <span className="project-card__tag mono" key={i}>{t}</span>
                  ))}
                </div>
                <span className="project-card__category mono">{p.category}</span>
              </div>

              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.description}</p>

              <a href={p.url} className="project-card__link mono" target="_blank" rel="noreferrer">
                VIEW PROJECT
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
