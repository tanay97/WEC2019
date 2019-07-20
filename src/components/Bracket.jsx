import React from 'react'
import '../styles/Bracket.css'

import { button } from 'react-bootstrap';
import { assignmentExpression } from '@babel/types';
import { InputGroup, FormControl, Button } from 'react-bootstrap'

class Bracket extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			matches: []
		}
	}

	componentDidMount() {
		fetch("http://127.0.0.1:5000/getMatches")
			.then(response => response.json())
			.then((data) => {
				console.log(data);
				this.setState({ matches : data });
			})
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