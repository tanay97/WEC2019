import React from 'react';
import './App.css';

import { Button } from 'react-bootstrap';

import Generator from './components/Generator'
import Bracket from './components/Bracket'

class App extends React.Component {

  state = {
    submitted: false,
  }

  getBracket() {
    this.setState({ submitted: true })
  }

  main() {
    if (this.state.submitted) {
      return (
        <Bracket></Bracket>
      )
    } else {
      return (
        <div>
          <p>Generate Your Tournament!</p>
          <Generator></Generator>
          <br></br>
          <Button variant="light" onClick={() => this.getBracket()}>Submit</Button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.main()}
        </header>
      </div>
    );
  }
}

export default App;
