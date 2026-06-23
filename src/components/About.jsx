import data from '../data/portfolio.json'
import './About.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';
import hoverMp3 from "../sounds/hover.mp3";

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
            <p className="about__body">{about.body}</p>
            <div className="about__cta">
              {about.cta.map((c, i) => (
                <a
                  key={i}
                  href={c.url}
                  className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}`}
                  target={c.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onMouseEnter={()=>{
                    const audio = new Audio(hoverMp3);
                
                    audio.play()
                      .then(() => console.log("playing"))
                      .catch(err => console.error(err));
                  }}
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
