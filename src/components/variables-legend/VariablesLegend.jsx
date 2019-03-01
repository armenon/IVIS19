import React, { Component } from 'react';

import './VariablesLegend.scss';


class VariablesLegend extends Component {
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
			<div className="variables-container">
				<div className="variables box-shadow">
					<span className="large">
					<span className="label d-block">SIZE and %</span>
					Debt
					</span>
					<div className="spacing-h small"></div>
					<span className="label">vs</span>
					<div className="spacing-h small"></div>
					<span className="large">
					<span className="label d-block">MAP COLOR</span>
					HDI
					</span>
					<div className="spacing-h small"></div>
					<span className="label">&</span>
					<div className="spacing-h small"></div>
					<span className="large">
					<span className="label d-block">SIZE and %</span>
					GDP
					</span>
				</div>
			</div>
		);
	}
}


export default VariablesLegend;
