import data from '../data/portfolio.json'
import './Skills.css'
import { motion } from "framer-motion";
import { fadeUp} from '../animations';
import hoverMp3 from "../sounds/hover.mp3";
import { useSound } from '../context/SoundContext';

export default function Skills() {
  const { isSoundEnabled } = useSound();

  const playAudio = () => {
    const audio = new Audio(hoverMp3);
    if (!isSoundEnabled) return;
    audio.play()
      .then(() => console.log("playing"))
      .catch(err => console.error(err));
  }

  return (
    <motion.section className="skills section" id="skills" {...fadeUp}>
      <div className="container">
        <div className="skills__grid-outer">
          <div className="skills__left">
            <span className="section-label mono">skills</span>
          </div>
          <div className="skills__right">
            <h2 className="skills__title">
              <strong>Technical</strong> stack
            </h2>
            <div className="skills__grid">
              {data.skills.map((s, i) => (
                <div className="skill-item" key={i}>
                  <h4 className="skill-item__title">{s.title}</h4>
                  <div className="skill-card__tags mono">
                    {s.description.split(',').map((v, index)=>{
                      return <p className='skill-card__tag' key={index}>{v}</p>
                    })}
                    </div>
                </div>
              ))}
            </div>

            {data.personalProjects.length > 0 && (
              <div className="personal-projects">
                <h3 className="personal-projects__heading section-label mono">personal projects</h3>
                <ul className="personal-projects__list">
                  {data.personalProjects.map((p, i) => (
                    <li key={i} className="personal-projects__item">
                      <div className="personal-projects__info">
                        <h4 className="personal-projects__title mono">{p.title}</h4>
                        <p className="personal-projects__desc">{p.description}</p>
                      </div>
                      {p.url && (
                        <a href={p.url} className="personal-projects__link mono" target="_blank" rel="noreferrer"  onMouseEnter={playAudio}>
                          View
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
