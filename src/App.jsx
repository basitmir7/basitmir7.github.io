import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'
import StatusBar from './components/StatusBar'
import Cursor from './components/cursor'
import Loader from './components/loader'
import { useState, useEffect, useCallback } from 'react';
import './styles/global.css';
import BackgroundAnimation from './animations/backgroundAnimation'
import "./animations/backgroundAnimation.css";
import TechOrbit from './animations/TechOrbit'
import "./animations/TechOrbit.css";


export default function App() {
  const [loaded, setLoaded] = useState(false);

  const onLoaderDone = useCallback(() => setLoaded(true), []);

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
