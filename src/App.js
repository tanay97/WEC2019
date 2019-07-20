import React from 'react';
import './App.css';

import { Button } from 'react-bootstrap';

import Generator from './components/Generator'
import Bracket from './components/Bracket'

class App extends React.Component {

  state = {
    submitted: false,
    teamList: '',
    type: 'Single Elimination',
  }

  getBracket() {
    this.setState({ submitted: true })
  }

  updateTeamList(e) {
    this.setState({ teamList: e.target.value })
  }

  updateType(e) {
    this.setState({ type: e.target.value })
  }

  main() {
    if (this.state.submitted) {
      return (
        <Bracket teamList={this.state.teamList} type={this.state.type}></Bracket>
      )
    } else {
      return (
        <div>
          <p>Generate Your Tournament!</p>
          <Generator teamList={this.state.teamList} handleTypeChange={(e) => this.updateType(e)} handleTeamChange={(e) => this.updateTeamList(e)}></Generator>
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
