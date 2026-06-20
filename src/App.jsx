import './styles/global.css';
import { useEffect } from 'react';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Ticker from './components/Ticker';
import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '-24px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
