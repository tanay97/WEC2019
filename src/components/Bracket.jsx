import React from 'react'
import '../styles/Bracket.css'

import { InputGroup, FormControl, Button } from 'react-bootstrap'

class Bracket extends React.Component {

	state = {
		matches: [
			{
				round: 1,
				winner: '',
				home: 'A',
				away: 'B',
				homeScore: '',
				awayScore: '',
			},
			{
				round: 1,
				winner: '',
				home: 'C',
				away: 'D',
				homeScore: '',
				awayScore: '',
			},
			{
				round: 1,
				winner: '',
				home: 'E',
				away: 'F',
				homeScore: '',
				awayScore: '',
			},
			{
				round: 1,
				winner: '',
				home: 'G',
				away: 'H',
				homeScore: '',
				awayScore: '',
			},
			{
				round: 2,
				winner: '',
				home: 0,
				away: 1,
				homeScore: '',
				awayScore: '',
			},
			{
				round: 2,
				winner: '',
				home: 2,
				away: 3,
				homeScore: '',
				awayScore: '',
			},
			{
				round: 3,
				winner: '',
				home: 4,
				away: 5,
				homeScore: '',
				awayScore: '',
			}
		]
	}

	updateWinner(e, i) {
		// Update match winner
		const winner = e.target.value
    let matchWin = this.state.matches[i];
    matchWin.winner = winner
    const updatedMatches = [
      ...this.state.matches.slice(0, i),
      matchWin,
      ...this.state.matches.slice(i+1)
		];
		this.setState({ matches: updatedMatches })
		
		// Update bracket
		const j = this.state.matches.findIndex(m => m.home === i || m.away === i)
		if (j === -1) {
			return
		}
		let matchBracket = this.state.matches[j]
		if (matchBracket.home === i) {
			matchBracket.home = matchWin.winner
		} else {
			matchBracket.away = matchWin.winner
		}
		const updatedMatchesBracket = [
      ...this.state.matches.slice(0, j),
      matchBracket,
      ...this.state.matches.slice(j+1)
		];
    this.setState({ matches: updatedMatchesBracket })
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	selectWinner(m, i) {
		if (m.home !== parseInt(m.home, 10) && m.away !== parseInt(m.away, 10)) {
			return (
				// <div>
				// 	<InputGroup className="mb-1">
				// 		<InputGroup.Prepend>
				// 			<InputGroup.Text>{m.home}</InputGroup.Text>
				// 		</InputGroup.Prepend>
				// 		<FormControl className='score'
				// 			placeholder={m.home + '\'s score e.g. 50'}
				// 		/>
				// 		<InputGroup.Prepend>
				// 			<InputGroup.Text>{m.away}</InputGroup.Text>
				// 		</InputGroup.Prepend>
				// 		<FormControl
				// 			placeholder={m.away + '\'s score e.g. 50'}
				// 		/>
				// 	</InputGroup>
				// 	<Button variant="light" onClick={this.updateWinner()}>Submit Score</Button>
				// </div>
				
				<div>
					<select class="form-control" id="type" onChange={(e) => this.updateWinner(e, i)}>
						<option>Select Winner</option>
						<option>{m.home}</option>
						<option>{m.away}</option>
					</select>
				</div>
			)
		}
	}

	presentWinner() {
		if (this.state.matches[this.state.matches.length-1].winner !== '') {
			return (
				<h2>{'Congratulations the winner is ' + this.state.matches[this.state.matches.length-1].winner}</h2>
			)
		}
	}

	render() {
		return(
			<div>
				{this.state.matches.map((m, i) => {
					return(
						<div key={i}>
							<p>{'Round ' + m.round + ': ' + m.home + ' vs ' + m.away}</p>
							{this.selectWinner(m, i)}
							<br></br>
						</div>
					)
				})}
				{this.presentWinner()}
			</div>
		)
	}
}

export default Bracket