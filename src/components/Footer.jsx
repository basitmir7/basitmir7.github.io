import data from '../data/portfolio.json'
import './Footer.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';
import hoverMp3 from "../sounds/hover.mp3";
import { useSound } from '../context/SoundContext';
import { targetUrl } from '../Helpers';

export default function Footer() {
  const year = new Date().getFullYear()
  const { isSoundEnabled } = useSound();
  const playAudio = () => {
    const audio = new Audio(hoverMp3);
    if (!isSoundEnabled) return;
    audio.play()
      .then(() => console.log("playing"))
      .catch(err => console.error(err));
  }


  return (
    <motion.footer className="footer" {...fadeUp}>
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__name mono">{data.meta.name}</span>
          <span className="footer__loc mono">{data.meta.location}</span>
        </div>
        <div className="footer__center">
          <h2 className="footer__cta-text">
            Let's build something<br /><strong>remarkable.</strong>
          </h2>
          <a href={`mailto:${data.meta.email}`} className="btn btn--primary footer__email"
           onMouseEnter={playAudio}>
            {data.meta.email}
          </a>
        </div>
        <div className="footer__right">
          <ul className="footer__links">
            {data.social.map((s) => (
              <li key={s.label}>
                <a href={s.url} target={targetUrl(s.url)} rel="noreferrer" className="mono"
                 onMouseEnter={playAudio}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="footer__copy mono">© {year}</span>
        </div>
      </div>
    </motion.footer>
  )
}
