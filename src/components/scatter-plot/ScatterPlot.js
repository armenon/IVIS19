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
  MarkSeries
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
      .range([30,1,30])
      .unknown(1)

const plotColor=scaleThreshold()
      .domain([100,200])
      .range(["white", 'black'])
      .unknown('gray')

class ScatterPlot extends Component {
  constructor(props){
    super(props)

    this.getData = this.getData.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.state = {

      country: null
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
    const hdi = country.properties.gapminder.hdi_human_development_index[this.props.year] || 0;
    const debt = country.properties.gapminder.external_debt_total_us_not_inflation_adjusted[this.props.year] || 0;
    const debtToGDP= country.properties.gapminder.debt_to_foreigners_by_public_and_private_percent_of_gni[this.props.year] || 0
    console.log(debtToGDP)

    return(
      {x:hdi, y:debt, size:plotScale(debtToGDP), color:plotColor(debtToGDP), name:country.properties.name }
    )
  }

	render() {
console.log(this.props)
    const { data, fetching, error} = this.props;

    console.log(fetching, error)

    //x: happiness y:debt? size: debtToGDP?
    if (!!fetching || !!error || !data){
      return null
    }

    console.log(data)
    const filteredData = data.filter(d => d.properties.gapminder.external_debt_total_us_not_inflation_adjusted[this.props.year])
    const plotData = filteredData.map(c => this.getData(c))

		return (
      <div
        data-tip>
       <XYPlot
					width={window.innerWidth - 400}
					height={window.innerHeight - 80}
					style={{marginLeft: '400px'}}
				>
        <VerticalGridLines />
       <HorizontalGridLines />
       <XAxis title="HDI"/>
       <YAxis title="Debt"/>
        <MarkSeries
          animation

          colorType="literal"
          onValueMouseOver={this.handleHover}
          onValueMouseOut={()=>this.setState({country:null})}
          className="mark-series-example"
          sizeRange={[1, 30]}
          data={plotData}/>
      </XYPlot>
      {!!this.state.country && <ReactTooltip getContent={() => this.renderTooltip()} />}
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
