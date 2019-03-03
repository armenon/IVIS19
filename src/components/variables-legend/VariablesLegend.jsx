import React, { Component } from 'react';

import './VariablesLegend.scss';


class VariablesLegend extends Component {
	render() {
		const { isFull } = this.props;
		return (
			<div className="variables-container">
				<img src="/img/legend.png" alt="Legend" className={!isFull ? 'variables-image' : 'variables-image full'}/>
			</div>
		);
	}
}


export default VariablesLegend;


/*
	<div className={this.props.isFull ? 'variables box-shadow full' : 'variables box-shadow'}>
		<div className="d-flex align-items-center">
			<span className="large">
			Debt
			</span>
			<div className="spacing-h small"></div>
			<span className="label">vs</span>
			<div className="spacing-h small"></div>
			<span className="large">
				<span className="d-block">HDI</span>
			</span>
			<div className="spacing-h small"></div>
			<span className="label">&</span>
			<div className="spacing-h small"></div>
			<span className="large">
			GDP
			</span>
		</div>
	</div>
*/
