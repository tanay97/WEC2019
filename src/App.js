import React from 'react';
import './App.css';

import Generator from './components/Generator'
import Bracket from './components/Bracket'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tournament Bracket Generator</p>
        {/* <Generator></Generator> */}
        <Bracket></Bracket>
      </header>
    </div>
  );
}

export default App;
