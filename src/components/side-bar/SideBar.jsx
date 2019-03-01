import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { values } from '../../utils/constants';

import './SideBar.scss';


class SideBar extends Component {
	state = {
    isShown: true,
	}
	toggleMenu() {
		this.setState({
			isShown: false,
		});
	}
	render() {
		return (
			<div className={this.state.isShown ? 'side-bar' : 'side-bar hidden'}>
				<a onClick={() => this.toggleMenu()}><i className="fas fa-arrow-left"></i> Hide filters</a>
				<div className="spacing"></div>
				<div className="logo d-flex">
					<i className="fas fa-dollar-sign"></i>
					<div className="spacing-h small"></div>
					<span>
						<h1>World debt</h1>
						<p>Visualizing debt in the world</p>
					</span>
				</div>
			</div>
		);
	}
}


export default SideBar;
