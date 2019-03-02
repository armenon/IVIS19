import React, { Component } from 'react';

import './TimeBar.scss';

class TimeBar extends Component {
	render() {
		return (
			<div className={this.props.isFull ? 'time-bar full' : 'time-bar'}>
				<span className="label large color-dark">2010</span>
				<div className="spacing-h"></div>
				<div className="input-holder">
					<input onChange={this.props.onYearChange} type="range" name="year" className="form-control-range" min="2010" max="2016" />
					<output style={{ left: (16.4 * (this.props.year - 2010)) + '%'}} for="year" onforminput="value = year.valueAsNumber;">{this.props.year}</output>
				</div>
				<div className="spacing-h"></div>
				<span className="label large color-dark">2016</span>
			</div>
		);
	}
}


export default TimeBar;
