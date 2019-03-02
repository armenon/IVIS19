import React, { Component } from 'react';

import './TimeBar.scss';

class TimeBar extends Component {
	render() {
		console.log(this.props.year)
		return (
			<div className={this.props.isFull ? 'time-bar full' : 'time-bar'}>
				<span className="label large color-dark">1990</span>
				<div className="spacing-h"></div>
				<div className="input-holder">
					<input onChange={this.props.onYearChange} type="range" name="year" className="form-control-range" min="1990" max="2015" />
					<output style={{ left: (3.924 * (this.props.year - 1990)) + '%'}} for="year" onforminput="value = year.valueAsNumber;">{this.props.year}</output>
				</div>
				<div className="spacing-h"></div>
				<span className="label large color-dark">2015</span>
			</div>
		);
	}
}


export default TimeBar;
