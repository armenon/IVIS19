import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';
import { Motion, spring } from "react-motion"
import { scaleLinear } from 'd3-scale';
import { geoPath } from 'd3-geo';
import { geoTimes } from 'd3-geo-projection';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { MyLocation } from '@material-ui/icons'

import {
	clearCurrentCountry,
	decreaseZoom,
	disableOptimization,
	enableOptimization,
	increaseZoom,
	resetZoom,
	setCenter,
	setCurrentCountry,
	setSelectedCountry,
	setZoom
} from '../../store';

import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
} from 'react-simple-maps';

import './WorldMap.scss';


class WorldMap extends Component {
	ignoreClick = false

	state = {
		height: null,
		width: null,
		virtualCenter: null,
		mapData: null
	}

	componentWillMount() {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth,
			virtualCenter: this.props.center
		})
	}

	componentDidUpdate() {
		ReactTooltip.rebuild();
	}

	async componentDidMount() {
		const response = await fetch('world-50m-with-wvs.json');
		this.setState({ mapData: await response.json() });
	}

	scale = (domain) => scaleLinear()
		.domain(domain)
		.range(["#f44336", "#ffeb3b", "#4caf50"])

	handleClick = async (geography, evt) => {
		// if (this.ignoreClick) return;

		const { iso_n3, name, gapminder } = geography.properties;

		await this.props.setSelectedCountry({ iso_n3, name, gapminder })

		const path = geoPath().projection(this.projection())
		const centroid = this.projection().invert(path.centroid(geography))

		this.props.setCenter(centroid);
		this.props.setZoom(3);
	}

	handleMoveStart = (center) => {
		this.ignoreClick = true;
	}

	handleMoveEnd = (center) => {
		this.ignoreClick = this.compareWitPrecision(center, this.state.virtualCenter, 12);
		this.setState({ virtualCenter: center });
	}

	compareWitPrecision(newCenter, center, precision) {
		newCenter = [Number(newCenter[0].toFixed(precision)), Number(newCenter[1].toFixed(precision))]
		center = [Number(center[0].toFixed(precision)), Number(center[1].toFixed(precision))]
		return JSON.stringify(center) !== JSON.stringify(newCenter);
	}

	disableReset() {
		const { zoom } = this.props;
		const { virtualCenter } = this.state;
		return !(zoom !== 1.5 || virtualCenter[0] !== 0 || virtualCenter[1] !== 20);
	}


	renderTooltip = (geography) => {
		console.log('tooltip rendered')
		const { name } = geography.properties

		return renderToString(
			<div className="tooltip">
				<h3>{name}</h3>
			</div>
		)
	}

	projection = () => {
		return geoTimes()
			.translate([this.state.width / 2, this.state.height / 2])
			.scale(180)
	}

	getGeographyStyles = (geography) => {
		const { iso_n3 } = geography.properties;
		const { selectedCountry } = this.props;

		return (
			{
				default: {
					fill: ((selectedCountry && selectedCountry.iso_n3 === iso_n3)) ?
						'#f50057' : '#cfd8dc',
					stroke: "#607D8B",
					strokeWidth: 0.75,
					outline: "none"
				},
				hover: {
					fill: '#ff5983',
					stroke: "#607D8B",
					strokeWidth: 0.75,
					outline: "none",
					cursor: 'pointer'
				},
				pressed: {
					fill: '#cfd8dc',
					stroke: "#607D8B",
					strokeWidth: 0.75,
					outline: "none",
					cursor: 'grab'
				}
			}
		)
	}

	render() {
		const { height, width } = this.state;
		const { center, zoom, increaseZoom, decreaseZoom, resetZoom, optimize } = this.props;

		return (
			<div className="world-map">
				<div className="map-container">
					<div className="legend"></div>
					<div className="zoom-controls">
						<div className="zoom-control reset" disabled={this.disableReset()} size="small" color="primary" onClick={resetZoom} >
							<i className="fa fa-stop"></i>
						</div>
						<div className="spacing small"></div>
						<div className="zoom-control top">
							<div size="small" color="secondary" disabled={zoom >= 48} onClick={increaseZoom}>
								<i className="fa fa-plus"></i>
							</div>
						</div>
						<div className="zoom-control bottom" size="small" color="default" disabled={zoom <= 1.5} onClick={decreaseZoom} >
							<i className="fa fa-minus"></i>
						</div>
					</div>
					<Motion
						defaultStyle={{
							motionZoom: 1,
							x: 0,
							y: 20,
						}}
						style={{
							motionZoom: spring(zoom, { stiffness: 210, damping: 20 }),
							x: spring(center[0], { stiffness: 210, damping: 20 }),
							y: spring(center[1], { stiffness: 210, damping: 20 }),
						}}
					>
						{({ motionZoom, x, y }) => (
							<ComposableMap className="map" height={height} width={width} projection={this.projection} >
								<ZoomableGroup onMoveStart={this.handleMoveStart} onMoveEnd={this.handleMoveEnd} center={[x, y]} zoom={motionZoom} style={{ cursor: 'grab' }} >
									<Geographies geography={this.state.mapData} disableOptimization={!optimize}>
										{(geographies, projection) =>
											geographies.map((geography, i) => {
												const { iso_a3, iso_n3 } = geography.properties;
												if (iso_a3 === 'ATA') return null;

												return (
													<Geography
														key={`${iso_n3}-${i}`}
														cacheId={`${iso_n3}-${i}`}
														data-tip={this.renderTooltip(geography)}
														data-html={true}
														geography={geography}
														projection={projection}
														onClick={this.handleClick}
														round
														style={this.getGeographyStyles(geography)}
													/>
												)
											})
										}
									</Geographies>
								</ZoomableGroup>
							</ComposableMap>
						)}
					</Motion>
					<ReactTooltip />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	optimize: state.map.optimize,
	country: state.map.currentCountry,
	selectedCountry: state.map.selectedCountry,
	zoom: state.map.zoom,
	center: state.map.center
});

const mapDispatchToProps = dispatch => {
	return {
		clearCountry: () => dispatch(clearCurrentCountry()),
		setCountry: country => dispatch(setCurrentCountry(country)),
		increaseZoom: () => dispatch(increaseZoom()),
		decreaseZoom: () => dispatch(decreaseZoom()),
		resetZoom: () => dispatch(resetZoom()),
		setCenter: center => dispatch(setCenter(center)),
		setSelectedCountry: async country => {
			// disable optimization on the map so it it's data can be refreshed
			dispatch(disableOptimization());
			// update the selected country
			await dispatch(setSelectedCountry(country));
			// re-enable optimization on the map after we are sure side effects have taken place
			dispatch(enableOptimization());
		},
		setZoom: zoom => dispatch(setZoom(zoom))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);
