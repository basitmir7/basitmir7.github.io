import { useEffect, useRef } from 'react'
import data from '../data/portfolio.json'
import Ticker from './Ticker'
import './Hero.css'
import { motion } from "framer-motion";
import { fadeUp } from '../animations';
import hoverMp3 from "../sounds/hover.mp3";


export default function Hero(props) {
  const arrowRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (arrowRef.current) {
        arrowRef.current.style.opacity = window.scrollY > 60 ? '0' : '1'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.section className="hero" {...fadeUp}>
      <Ticker />
      <div className="hero__inner container">
        <div className="hero__avatar">
          <div className="hero__avatar-ring">
            <div className="hero__avatar-initials mono">AC</div>
          </div>
          <div className="hero__avatar-info">
            <span className="mono hero__name">{data.meta.name}</span>
            <span className="hero__title">{data.meta.title}</span>
          </div>
        </div>

        <h1 className="hero__heading">
          <em>{data.meta.heroHeading[0]}</em><strong>{data.meta.heroHeading[1]}</strong>{' '}
          <em>{data.meta.heroHeading[2]}</em><strong>{data.meta.heroHeading[3]}</strong>
          <br />
          <span className="hero__heading-sub">{data.meta.heroSubtitle}</span>
        </h1>

        <div className="hero__tags">
          {data.specializations.map((s, i) => (
            <span className="hero__tag mono" key={i}>{s}</span>
          ))}
        </div>

        <div className="hero__cta">
          <a href={data.meta.email.replace('mailto:', '') ? `mailto:${data.meta.email}` : '#'} className="btn btn--primary"
           onMouseEnter={()=>{
            const audio = new Audio(hoverMp3);
        
            audio.play()
              .then(() => console.log("playing"))
              .catch(err => console.error(err));
          }}>
            GET IN TOUCH
          </a>
        </div>

        <div className="hero__scroll" ref={arrowRef}>
          <span className="mono">scroll down</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 9l6 6 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.section>
  )
}
