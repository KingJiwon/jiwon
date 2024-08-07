import React from 'react';
import './style/styles.scss';
import './style/App.scss';
import VideoBackground from './components/VideoBackground';
import Header from './components/Header';
import Prologue from './components/Prologue';

function App() {
  return (
    <div className="App">
      <VideoBackground>
        <Header />
        <Prologue />
      </VideoBackground>
    </div>
  );
}

export default App;
