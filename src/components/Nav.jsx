import data from '../data/portfolio.json'
import './Nav.css'
import hoverMp3 from "../sounds/hover.mp3";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner container">
        <div className="nav__left">
          <span className="nav__logo mono">{data.meta.name.replace(' ', '.')}</span>
        </div>
        <ul className="nav__links">
          {data.social.map((s) => (
            <li key={s.label}>
              <a href={s.url} target={s.url.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
               onMouseEnter={()=>{
                const audio = new Audio(hoverMp3);
            
                audio.play()
                  .then(() => console.log("playing"))
                  .catch(err => console.error(err));
              }}
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
