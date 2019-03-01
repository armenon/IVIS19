import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import WorldMap from './components/world-map/WorldMap';
import WaveToggle from './components/wave-toggle/WaveToggle';
import SideBar from './components/side-bar/SideBar';
import CountryStats from './components/country-stats/CountryStats';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

class App extends Component {
	render() {
		return (
			<>
				<SideBar />
				<WorldMap />
			</>
		);
	}
}

const mapStateToProps = state => ({
	title: state.general.title
});


export default connect(mapStateToProps)(App);

