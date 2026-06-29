import data from '../data/portfolio.json'
import './Nav.css'
import hoverMp3 from "../sounds/hover.mp3";
import EqualizerToggle from './Equalizer';
import { useSound } from '../context/SoundContext';
import { targetUrl } from '../Helpers';

export default function Nav() {
  
  const { isSoundEnabled } = useSound();

  const playAudio = () => {
    const audio = new Audio(hoverMp3);
    if (!isSoundEnabled) return;
    audio.play()
      .then(() => console.log("playing"))
      .catch(err => console.error(err));
  }

  return (
    <nav className="nav">
      <div className="nav__inner container">
        <div className="nav__left">
          <span className="nav__logo mono">{data.meta.name.replace(' ', '.')}</span>
          <span className='equalizer'> <EqualizerToggle /></span>
          
        </div>
        <ul className="nav__links">
          {data.social.map((s) => (
            <li key={s.label}>
              <a href={s.url} target={targetUrl(s.url)} rel="noreferrer"
               onMouseEnter={playAudio}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
