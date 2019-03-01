import React, { Component } from 'react';

import './TimeBar.scss';

class TimeBar extends Component {
	state = {
    isShown: true,
	}
	toggleMenu() {
		this.setState({
			isShown: !this.state.isShown,
		});
	}
	render() {
		return (
			<div className="time-bar">
				<span className="label large color-dark">1990</span>
				<div className="spacing-h"></div>
				<div className="input-holder">
					<input type="range" name="year" className="form-control-range" min="1990" max="2017" />
					<output for="year" onforminput="value = year.valueAsNumber;">1990</output>
				</div>
				<div className="spacing-h"></div>
				<span className="label large color-dark">2017</span>
			</div>
		);
	}
}


export default TimeBar;
