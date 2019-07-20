import React from 'react';
import './App.css';

import { Button } from 'react-bootstrap';

import Generator from './components/Generator'
import Bracket from './components/Bracket'
import DoubleBracket from './components/DoubleBracket'

class App extends React.Component {

  state = {
    submitted: false,
    teamList: '',
    title: '',
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

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  main() {
    if (this.state.submitted && this.state.type === 'Double Elimination') {
      return (
        <DoubleBracket title={this.state.title} teamList={this.state.teamList} type={this.state.type}></DoubleBracket>
      )
    } else if (this.state.submitted) {
      return (
        <Bracket title={this.state.title} teamList={this.state.teamList} type={this.state.type}></Bracket>
      )
    } else {
      return (
        <div>
          <p>Generate Your Tournament!</p>
          <Generator teamList={this.state.teamList} handleTitleChange={(e) => this.updateTitle(e)} handleTypeChange={(e) => this.updateType(e)} handleTeamChange={(e) => this.updateTeamList(e)}></Generator>
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
