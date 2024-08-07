import React from 'react';
import './style/styles.scss';
import './style/App.scss';
import VideoBackground from './components/VideoBackground';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <VideoBackground>
        <Header />
      </VideoBackground>
    </div>
  );
}

export default App;
