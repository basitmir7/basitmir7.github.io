import data from '../data/portfolio.json';
import './Certifications.css';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations';
import { useSound } from '../context/SoundContext';
import hoverMp3 from '../sounds/hover.mp3';

export default function Certifications() {
  const { isSoundEnabled } = useSound();

  const playAudio = () => {
    const audio = new Audio(hoverMp3);
    if (!isSoundEnabled) return;
    audio
      .play()
      .then(() => console.log('playing'))
      .catch((err) => console.error(err));
  };

  return (
    <motion.section className="certifications section" id="certifications" {...fadeUp}>
      <div className="container">
        <div className="cert__grid">
          <div className="cert__left">
            <span className="section-label mono">certifications</span>
          </div>

          <div className="cert__right">
            <h2 className="cert__title">
              Professional <strong>Certificates</strong>
            </h2>

            <ul className="cert__list">
              {data.certifications.map((cert, index) => (
                <li className="cert__item" key={index}>
                  <div className="cert__meta">
                    <span className="cert__date mono">{cert.date}</span>

                    {cert.issuer && (
                      <span className="cert__issuer">
                        {` `}· {cert.issuer}
                      </span>
                    )}
                  </div>

                  <div className="cert__detail">
                    <div className="cert__header">
                      <div className="cert__content">
                        <h3 className="cert__name mono">{cert.title}</h3>
                      </div>

                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert__btn mono"
                        onMouseEnter={playAudio}
                      >
                        View ↗
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
