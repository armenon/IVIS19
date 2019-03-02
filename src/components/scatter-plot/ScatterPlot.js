import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {scaleLinear, scaleThreshold} from 'd3-scale'
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LabelSeries,
  Highlight
} from 'react-vis';

import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

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





const plotScale=scaleLinear()
      .domain([0,100,200])
      .range([50,1,50])
      .unknown(1)


const plotColor=scaleThreshold()
      .domain([100,200])
      .range(["#ffffff", '#2a2a2a'])
      .unknown('gray')

const textScale  = scaleLinear()
.domain([0,100,200])
.range([16,1,16])
.clamp(true)


const textColor=scaleThreshold()
      .domain([100,200])
      .range(['#2a2a2a',"#ffffff"])
      .unknown('gray')


class ScatterPlot extends Component {
  constructor(props){
    super(props)

    this.getData = this.getData.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.state = {
      height:null,
      width:null,
      country: null,
      lastDrawLocation: {
        top:2000,
        bottom:0,
        left:0,
        right:1
      },
    }
  }
  componentDidUpdate(){
    ReactTooltip.rebuild()
  }



  handleHover(e) {
    console.log(e)
    if (e.name === this.state.country) return;
    this.setState({ country: e.name }, () => ReactTooltip.rebuild())
  }
  renderTooltip(){
    return this.state.country
  }


  getData(country){
    const hdi = country.properties.gapminder.hdi_human_development_index[this.props.year] || null;
    const debt = country.properties.gapminder.external_debt_total_us_not_inflation_adjusted[this.props.year] || null;
    const debtToGDP= country.properties.gapminder.debt_by_gdp[this.props.year] || null

    if(!debt) return null;
    return(
      {x:hdi, y:debt/1000000000, size:plotScale(debtToGDP), color:plotColor(debtToGDP), label:country.properties.name, style: {fill:textColor(debtToGDP), fontSize: textScale(debtToGDP)}}
    )
  }

	render() {
console.log(this.props)
    const { data, fetching, error} = this.props;
    const { lastDrawLocation } = this.state;

    const reset = {
        top:2000,
        bottom:0,
        left:0,
        right:1
      }
    //x: happiness y:debt? size: debtToGDP?
    if (!!fetching || !!error || !data){
      return null
    }


    const filteredData = data.filter(d => d.properties.gapminder.external_debt_total_us_not_inflation_adjusted[this.props.year] && d.properties.gapminder.debt_by_gdp[this.props.year] && d.properties.gapminder.hdi_human_development_index[this.props.year])
    const plotData = filteredData.map(c => this.getData(c))
    const labelData = plotData.filter(d => d.size>90 || d.y>250)
		return (
      <div
        data-tip>
       <XYPlot
					width={window.innerWidth - 80}
					height={window.innerHeight - 160}
					style={{marginLeft: '40px', marginTop: '40px', marginRight: '40px'}}
          animation
          xDomain={[0,1]}
          xDomain={
              lastDrawLocation && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
          yDomain={
            lastDrawLocation && [
              lastDrawLocation.bottom,
              lastDrawLocation.top
            ]
          }
				>
        <VerticalGridLines />
       <HorizontalGridLines />
       <XAxis title="HDI" tickTotal={11} tickValues={[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]}/>
       <YAxis title="Debt (Billion USD)"/>
        <MarkSeries
          animation
          stroke="#607D8B"

          opacity={0.9}
          colorType="literal"
          onValueMouseOver={this.handleHover}
          onValueMouseOut={()=>this.setState({country:null})}
          className="mark-series-example"
          sizeRange={[1, 50]}
          data={plotData}/>

            <LabelSeries
              labelAnchorY="middle"
              labelAnchorX="middle"
              strokeWidth="2"
              animation
              allowOffsetToBeReversed
              data={labelData}/>
              <Highlight


                onBrushEnd={area => {area==null?this.setState({lastDrawLocation:reset}):this.setState({lastDrawLocation: area})}}
                onDrag={area => {
                    this.setState({
                      lastDrawLocation: {
                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                        left: lastDrawLocation.left - (area.right - area.left),
                        right: lastDrawLocation.right - (area.right - area.left),
                        top: lastDrawLocation.top + (area.top - area.bottom)
                      }
                    });
                  }}
                  />
      </XYPlot>
      {!!this.state.country && <ReactTooltip getContent={() => this.renderTooltip()}/>}
      </div>

		);
	}
}



const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ScatterPlot);
