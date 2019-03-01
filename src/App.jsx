import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import WorldMap from './components/world-map/WorldMap';
import SideBar from './components/side-bar/SideBar';
import ScatterPlot from './components/scatter-plot/ScatterPlot';
import 'rc-slider/assets/index.css';
import { Button } from 'react-bootstrap';

import { fetchCountries } from './store/'

class App extends Component {
	state ={
		graph: false
	}
	componentDidMount() {
		this.props.fetchCountries();
	}
	render() {
		return (
			<>
				<Button onClick={() => this.setState({ graph: !this.state.graph })} id="filterButton" bsPrefix="btn btn-primary box-shadow graph">{!this.state.graph ? 'Show graph' : 'Show map'}</Button>
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
