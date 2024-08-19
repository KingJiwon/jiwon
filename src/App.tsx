import React, { useEffect, useRef, useState } from 'react';
import './style/styles.scss';
import './style/App.scss';
import VideoBackground from './components/VideoBackground';
import Header from './components/Header';
import Prologue from './components/Prologue';
import Info from './components/Info';
import Skill from './components/Skill';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const prologueRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>('Prologue');

  const handleClickNav = (section: string) => {
    switch (section) {
      case 'Prologue':
        prologueRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Info':
        infoRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Skills':
        skillRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Projects':
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const handleScroll = () => {
    const sectionOffsets = {
      Prologue: prologueRef.current?.offsetTop ?? 0,
      Info: infoRef.current?.offsetTop ?? 0,
      Skills: skillRef.current?.offsetTop ?? 0,
      Projects: projectsRef.current?.offsetTop ?? 0,
      Contact: contactRef.current?.offsetTop ?? 0,
    };

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (scrollPosition >= sectionOffsets.Contact) {
      setActiveSection('Contact');
    } else if (scrollPosition >= sectionOffsets.Projects) {
      setActiveSection('Projects');
    } else if (scrollPosition >= sectionOffsets.Skills) {
      setActiveSection('Skills');
    } else if (scrollPosition >= sectionOffsets.Info) {
      setActiveSection('Info');
    } else {
      setActiveSection('Prologue');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <VideoBackground>
        <Header onNavClick={handleClickNav} activeSection={activeSection} />
        <div ref={prologueRef}>
          <Prologue />
        </div>
        <div ref={infoRef}>
          <Info />
        </div>
        <div ref={skillRef}>
          <Skill />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </VideoBackground>
    </div>
  );
}

export default App;
