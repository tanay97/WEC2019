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
		const teamList = this.props.teamList.split('\n').join(',')
		fetch('http://127.0.0.1:5000/getDoubleElimMatches?teamList=' + teamList)
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
        let loser = ''
		if (homeScore > awayScore) {
            winner = matchWin.home
            loser = matchWin.away
		} else {
            winner = matchWin.away
            loser = matchWin.home
		}
		matchWin.winner = winner
		const updatedMatches = [
			...this.state.matches.slice(0, i),
			matchWin,
			...this.state.matches.slice(i+1)
		];
			
		this.setState({ matches: updatedMatches })
			
		// Update bracket
        const j = this.state.matches.findIndex(m => m.home === i || m.away === i || m.away === 'loser_' + i)
        if (j !== -1) {
			let matchBracket = this.state.matches[j]
            if (matchBracket.home === i) {
                matchBracket.home = matchWin.winner
            } else if (matchBracket.away === i) {
                matchBracket.away = matchWin.winner
            }
            const updatedMatchesBracket = [
                ...this.state.matches.slice(0, j),
                matchBracket,
                ...this.state.matches.slice(j+1)
            ];
            this.setState({ matches: updatedMatchesBracket })
        }

        const k = this.state.matches.findIndex(m => m.home === 'winner_' + i || m.away === 'winner_' + i)
        const l = this.state.matches.findIndex(m => m.home === 'loser_' + i || m.away === 'loser_' + i)
		if (k === -1 || l === -1) {
			return
		}
        let matchWinner = this.state.matches[k]
        let matchLoser = this.state.matches[l]

        if (matchWinner.home === 'winner_' + i) {
            matchWinner.home = winner
        } else if (matchWinner.away === 'winner_' + i) {
            matchWinner.away = winner
        }
        if (matchLoser.home === 'loser_' + i) {
            matchLoser.home = loser
        } else if (matchLoser.away === 'loser_' + i) {
            matchLoser.away = loser
        }
		
		const updatedWinnersBracket = [
			...this.state.matches.slice(0, k),
			matchWinner,
			...this.state.matches.slice(k+1)
        ];
        this.setState({ matches: updatedWinnersBracket })
        
        const updatedLosersBracket = [
			...this.state.matches.slice(0, l),
			matchLoser,
			...this.state.matches.slice(l+1)
        ];
		this.setState({ matches: updatedLosersBracket })
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