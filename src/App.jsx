import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'
import StatusBar from './components/StatusBar'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import { useState, useEffect, useCallback, useRef } from 'react';
import './styles/global.css';
import BackgroundAnimation from './animations/backgroundAnimation'
import "./animations/backgroundAnimation.css";
import TechOrbit from './animations/TechOrbit'
import "./animations/TechOrbit.css";
import backgroundmp3 from "./sounds/background.mp3";
import { useSound } from './context/SoundContext'


export default function App() {
  const [loaded, setLoaded] = useState(false);

  const onLoaderDone = useCallback(() => setLoaded(true), []);
  const { isSoundEnabled } = useSound();

  const backgroundAudio = useRef(
    new Audio(backgroundmp3)
  );

  useEffect(() => {
    const audio = backgroundAudio.current;

    audio.loop = true;
    audio.volume = 0.1;

    if (isSoundEnabled) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
      audio.currentTime = 0; // optional
    }

    return () => {
      audio.pause();
    };
  }, [isSoundEnabled]);

  
  // Scroll-reveal observer — runs once loaded
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '-16px 0px' }
    );
    document.querySelectorAll('.r').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <>
      <Cursor/>
      <Loader onDone={onLoaderDone} />
      <BackgroundAnimation/>
      <TechOrbit/>
     {loaded &&  
     <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Footer />
      </main>
      <StatusBar />
    </>}
      
    </>
  )
}
