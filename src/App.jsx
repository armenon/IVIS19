import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import WorldMap from './components/world-map/WorldMap';
import WaveToggle from './components/wave-toggle/WaveToggle';
import SideBar from './components/side-bar/SideBar';
import VariablesLegend from './components/variables-legend/VariablesLegend';
import TimeBar from './components/time-bar/TimeBar';
import CountryStats from './components/country-stats/CountryStats';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

class App extends Component {
	render() {
		return (
			<>
				<SideBar />
				<VariablesLegend />
				<WorldMap />
				<TimeBar />
			</>
		);
	}
}

const mapStateToProps = state => ({
	title: state.general.title
});


export default connect(mapStateToProps)(App);

