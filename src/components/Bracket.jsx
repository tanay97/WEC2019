import React from 'react'
import '../styles/Bracket.css'

import { InputGroup, FormControl, Button } from 'react-bootstrap'

class Bracket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: []
		}
	}

	componentDidMount() {
		let type = ''
		switch (this.props.type) {
			case 'Single Elimination':
				type = 'getSingleElimMatches'
				break
			case 'Round Robin':
				type = 'getRoundRobinMatches'
				break
			default:
				return
		}
		const teamList = this.props.teamList.split('\n').join(',')
		fetch('http://127.0.0.1:5000/' + type + '?teamList=' + teamList)
			.then(response => response.json())
			.then((data) => {
				this.setState({ matches : data });
			})
	  }

	updateWinner(e, i) {
		// Update match winner
		
		let matchWin = this.state.matches[i];
		if (!matchWin) {
			return
		}
		const homeScore = parseInt(matchWin.homeScore, 10)
		const awayScore = parseInt(matchWin.awayScore, 10)
		let winner = ''
		if (homeScore > awayScore) {
			winner = matchWin.home
		} else {
			winner = matchWin.away
		}
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

	handleScoreChange(e, i) {
		const m = this.state.matches[i];
		m[e.target.id] = e.target.value
		const updatedMatches = [
			...this.state.matches.slice(0, i),
			m,
			...this.state.matches.slice(i+1)
		];
		this.setState({ matches: updatedMatches })
	}

	selectWinner(m, i) {
		if (m.home !== parseInt(m.home, 10) && m.away !== parseInt(m.away, 10)) {
			return (
				<div>
					<InputGroup className="mb-1">
						<InputGroup.Prepend>
							<InputGroup.Text>{m.home}</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl className='score'
							placeholder={m.home + '\'s score e.g. 50'}
							id='homeScore' onChange={e => this.handleScoreChange(e, i)}
						/>
						<InputGroup.Prepend>
							<InputGroup.Text>{m.away}</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							placeholder={m.away + '\'s score e.g. 50'}
							id='awayScore' onChange={e => this.handleScoreChange(e, i)}
						/>
					</InputGroup>
					<Button variant="light" onClick={e => this.updateWinner(e, i)}>Submit Score</Button>
				</div>
				
				// <div>
				// 	<select class="form-control" id="type" onChange={(e) => this.updateWinner(e, i)}>
				// 		<option>Select Winner</option>
				// 		<option>{m.home}</option>
				// 		<option>{m.away}</option>
				// 	</select>
				// </div>
			)
		}
	}

	presentWinner() {
		if (this.state.matches.length > 0 && this.state.matches[this.state.matches.length-1].winner !== '') {
			return (
				<h2>{'Congratulations the winner is ' + this.state.matches[this.state.matches.length-1].winner}</h2>
			)
		}
	}

	render() {
		return(
			<div>
				{this.state.matches.map((m, i) => {
					let home = '-'
					let away = '-'
					if (m.home !== parseInt(m.home, 10)) {
						home = m.home
					}
					if (m.away !== parseInt(m.away, 10)) {
						away = m.away
					}
					return(
						<div key={i}>
							<p>{'Round ' + m.round + ': ' + home + ' vs ' + away}</p>
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