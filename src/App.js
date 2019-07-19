import React from 'react';
import './App.css';

import Generator from './components/Generator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tournament Bracket Generator</p>
        <Generator></Generator>
      </header>
    </div>
  );
}

export default App;
