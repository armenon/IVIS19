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
			</div>
		);
	}
}


export default VariablesLegend;
