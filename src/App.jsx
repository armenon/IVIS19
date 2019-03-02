import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import WorldMap from './components/world-map/WorldMap';
import SideBar from './components/side-bar/SideBar';
import ScatterPlot from './components/scatter-plot/ScatterPlot';
import 'rc-slider/assets/index.css';
import { Button } from 'react-bootstrap';

import { fetchCountries, toggleVisualization } from './store/'

class App extends Component {
	componentDidMount() {
		this.props.fetchCountries();
	}

	render() {
		return (
			<>
				<Button onClick={this.props.toggleVisualization} id="filterButton" bsPrefix="btn btn-primary box-shadow graph">{!this.props.graph ? (<span><i class="fas fa-chart-area"></i> Show graph</span>) : (<span><i class="fas fa-globe-americas"></i> Show map</span>)}</Button>
				<SideBar isGraphShown={this.props.graph} />
				{this.props.graph ? <ScatterPlot /> : <WorldMap />}
			</>
		);
	}
}

const mapStateToProps = state => ({
	title: state.general.title,
	graph: state.general.showScatter
});


const mapDispatchToProps = dispatch => {
	return {
		fetchCountries: () => dispatch(fetchCountries()),
		toggleVisualization: () => dispatch(toggleVisualization())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
