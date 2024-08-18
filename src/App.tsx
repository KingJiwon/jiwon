import React from 'react';
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
  return (
    <div className="App">
      <VideoBackground>
        <Header />
        <Prologue />
        <Info />
        <Skill />
        <Projects />
        <Contact />
      </VideoBackground>
    </div>
  );
}

export default App;
