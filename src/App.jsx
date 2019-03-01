import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import WorldMap from './components/world-map/WorldMap';
import SideBar from './components/side-bar/SideBar';
import TimeBar from './components/time-bar/TimeBar';
import ScatterPlot from './components/scatter-plot/ScatterPlot';
import VariablesLegend from './components/variables-legend/VariablesLegend';
import CountryStats from './components/country-stats/CountryStats';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

import { fetchCountries, setYear, enableOptimization, disableOptimization } from './store/'

class App extends Component {
	state ={
		graph:false
	}
	componentDidMount() {
		this.props.fetchCountries();
	}
	render() {
		return (
			<>
				<Button style={{position:'absolute', zIndex:5, top:'40px', right:'40px'}} onClick={()=>this.setState({graph:!this.state.graph})}>Toggle Graph</Button>
				<SideBar />

				{this.state.graph?<ScatterPlot/>:<WorldMap />}

			</>
		);
	}
}

const mapStateToProps = state => ({
	title: state.general.title,

});


 const mapDispatchToProps = dispatch => {
	return {
		fetchCountries: () => dispatch(fetchCountries()),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
