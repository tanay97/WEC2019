import React from 'react'

import { button } from 'react-bootstrap';

class Bracket extends React.Component {

	state = {
		matches: [
			{
				winner: '',
				home: 'A',
				away: 'B',
			},
			{
				winner: '',
				home: 'C',
				away: 'D',
			},
			{
				winner: '',
				home: 0,
				away: 1,
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

	render() {
		return(
			<div>
				{this.state.matches.map((m, i) => {
					return(
						<div>
							<p>{m.home + ' vs ' + m.away}</p>
							<select class="form-control" id="type" onChange={(e) => this.updateWinner(e, i)}>
								<option>Select Winner</option>
								<option>{m.home}</option>
								<option>{m.away}</option>
							</select>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Bracket