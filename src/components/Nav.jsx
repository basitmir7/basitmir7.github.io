import data from '../data/portfolio.json'
import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner container">
        <div className="nav__left">
          <span className="nav__logo mono">{data.meta.name.toLowerCase().replace(' ', '.')}</span>
        </div>
        <ul className="nav__links">
          {data.social.map((s) => (
            <li key={s.label}>
              <a href={s.url} target={s.url.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
