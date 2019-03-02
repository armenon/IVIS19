import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';

import ReactTooltip from 'react-tooltip';
import { Motion, spring } from "react-motion"
import { scaleLinear,  scaleThreshold } from 'd3-scale';
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
	Markers,
	Marker,
} from 'react-simple-maps';

import './WorldMap.scss';

const fillProperties = scaleLinear()
			.domain([0,0.5,1])
			.range(['red', 'yellow', 'green'])
			.unknown("f2f2f2")
const markerColor  = (range) => scaleThreshold()
  .domain([0,100,200])
  .range(range)



const markerScale  = scaleLinear()
  .domain([0,100,200])
  .range([25,1,25])

const textScale  = scaleLinear()
.domain([0,100,200])
.range([15,1,15])






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
		ReactTooltip.rebuild()
	}

	scale = (domain) => scaleLinear()
		.domain(domain)
		.range(["#f44336", "#ffeb3b", "#4caf50"])

	getCenter(geography){
		const path = geoPath().projection(this.projection())
		const centroid = this.projection().invert(path.centroid(geography))

		return centroid;

	}


	handleClick = async (geography, evt) => {
		console.log('should ignore?', this.ignoreClick)
		if (this.ignoreClick) return;

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
			<div>
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
		//((selectedCountry && selectedCountry.iso_n3 === iso_n3)) ?
	//		'#f50057' : '#cfd8dc',
		return (
			{
				default: {
					fill: fillProperties(geography.properties.gapminder.hdi_human_development_index[this.props.year]),
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
		const { center, zoom, increaseZoom, decreaseZoom, resetZoom, optimize, data, fetching, error } = this.props;

		if (fetching || error || !data) return null;

		return (
			<div className="world-map">
				<div className="map-container">
					<div className="legend"></div>
					<div className="zoom-controls">
						<a className="zoom-control reset" disabled={this.disableReset()} onClick={resetZoom} >
							<i className="fa fa-stop"></i>
						</a>
						<div className="spacing small"></div>
						<a className="zoom-control top" disabled={zoom >= 48} onClick={increaseZoom}>
								<i className="fa fa-plus"></i>
						</a>
						<a className="zoom-control bottom" disabled={zoom <= 1.5} onClick={decreaseZoom}>
							<i className="fa fa-minus"></i>
						</a>
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
									<Geographies geography={data} disableOptimization={!optimize}>
										{(geographies, projection) =>
											geographies.map((geography, i) => {
												const { iso_a3, iso_n3 } = geography.properties;
												if (iso_a3 === 'ATA') return null;

												return (
													<Geography
														key={`${iso_n3}-${i}`}
														cacheId={`${iso_n3}-${i}`}
														data-html={true}
														data-tip={this.renderTooltip(geography)}

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
									<Markers>
										{ data.filter(d => d.properties.gapminder.external_debt_total_us_not_inflation_adjusted[this.props.year]).map((country,i)=> {

											const debtToGDP = Math.round(country.properties.gapminder.debt_to_foreigners_by_public_and_private_percent_of_gni[this.props.year])
											return(
												<Marker key={i} marker={{coordinates:this.getCenter(country.geometry)}}>
												<circle
													cx={0}
													cy={0}
													r={markerScale(debtToGDP)}
													fill={markerColor(['gray',"#ffffff", '#2a2a2a'])(debtToGDP)}
													stroke="#607D8B"
													strokeWidth="2"
													onClick={()=>console.log(country)}
												/>
												<text
												textAnchor="middle"
												 y={'0.4em'}
												 x={2}
												style={{
													fontSize:textScale(debtToGDP),
		                      fontFamily: "Roboto, sans-serif",
		                      fill: markerColor(['gray', '#2a2a2a', "#ffffff"])(debtToGDP)
		                    }}>
												{debtToGDP<100?"":"+"}{-100+debtToGDP}%
												</text>

											</Marker>
										)
										})

										}
								</Markers>

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
	center: state.map.center,
	error: state.general.error,
	fetching: state.general.fetching,
	data: state.general.data,
	year: state.filters.year
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
