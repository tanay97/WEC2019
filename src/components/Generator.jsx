import React from 'react'
import { FormControl } from 'react-bootstrap';

const playerplaceholder = 'List team line by line, based on seed order: \nTeam1 \nTeam2'

class Generator extends React.Component {

	state = {
		name: ''
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	render() {
		return(
			<div>
				<FormControl class="form-control" id="name" placeholder="Tournament Name"></FormControl>
				<br></br>
				<select class="form-control" id="type">
					<option>Single Elimination</option>
					<option>Double Elimination</option>
					<option>Round Robin</option>
				</select>
				<br></br>
				<textarea class="form-control" id="player-list" placeholder={playerplaceholder} rows="5"></textarea>
			</div>
		)
	}
}

export default Generator