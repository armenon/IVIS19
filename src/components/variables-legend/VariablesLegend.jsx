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
			<div className="variables-legend d-flex">
				<span>Debt</span>
				<span>vs</span>
				<span>HDI</span>
				<span>&</span>
				<span>GDP</span>
			</div>
		);
	}
}


export default VariablesLegend;
