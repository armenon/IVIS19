import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./components/Map.js"
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Select from 'react-select';
import Graph from './components/Graph.js'
import { get } from "axios"
import * as topojson from "topojson-client"
import * as d3 from "d3";


const Handle = Slider.Handle;

const marks = {

  1980: '1980',
  1990: '1990',
  2000: '2000',
  2010: '2010',
};

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const options = [
  { value: 'hdi', label: 'Human Development Index', domain: [0,1] },
  {value:"suicide_per_100000_people", label:"Suicides per 100 000 people", domain: [0,50]}
];

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 2011,
      dataMax: 2016,
      mapVar:  { value: 'hdi', label: 'Human Development Index', domain:[0,1] },
      graphVar:  { value: 'hdi', label: 'Human Development Index', domain:[0,1] },
      geographyPaths: [],
      optimize:false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleVarChange=this.handleVarChange.bind(this)
    this.loadData = this.loadData.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }



  loadData() {
    get("/world-50m.json")
      .then(res => {
        if (res.status !== 200) return
        const world = res.data

        // Transform your paths with topojson however you want...
        const countries = topojson.feature(world, world.objects[Object.keys(world.objects)[0]]).features

        var datamax = 2011;

        const fileName = "/data/"+this.state.mapVar.value+".csv"
        console.log(fileName)
        Promise.all([
          d3.csv(fileName,(row)=> {
            const countryIndex = countries.findIndex((c) => {return(c.properties.NAME==row.country || c.properties.NAME_LONG ==row.country || c.properties.FORMAL_EN ==row.country)})

            if(Object.keys(row)[Object.keys(row).length - 2]>datamax){
              datamax = parseInt(Object.keys(row)[Object.keys(row).length - 2]);

            }
            const filtered = Object.keys(row)
              .filter(key => key >= 1980)
              .reduce((obj, key) => {
                switch (this.props.var){
                  case "internet_users":{
                    obj[key] = row[key]==""||row[key]==0?undefined:row[key];
                    return obj;
                  }
                  case "demo_score":{
                      obj[key] = row[key]==""?undefined:row[key];
                      return obj;
                  }
                  case "hdi":{
                      obj[key] = row[key]==""?undefined:row[key];
                      return obj;
                  }
                  default:{
                    obj[key] = row[key]==""?undefined:row[key];
                    return obj;
                  }
                }


              }, {});



            if(countryIndex != -1){

              countries[countryIndex].score = filtered
              console.log(countries[countryIndex].score)
            }else{
              console.log(row)
              switch (row.country){
                case "Cape Verde": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Cabo Verde")})
                  countries[i].score = filtered;
                  break
                }
                case "Congo, Dem. Rep.": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Dem. Rep. Congo")})
                  countries[i].score = filtered;
                  break
                }
                case "Congo, Rep.": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Congo")})
                  countries[i].score = filtered;
                  break
                }
                case "Cote d'Ivoire": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Côte d'Ivoire")})
                  countries[i].score = filtered;
                  break
                }
                case "Macedonia, FYR": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Macedonia")})
                  countries[i].score = filtered;
                  break
                }
                case "Lao": {
                  var i = countries.findIndex((c) => {return(c.properties.NAME=="Laos")})
                  countries[i].score = filtered;
                  break
                }

                default: {
                  console.log(row.country)
                }
              }

            }
          }),
          d3.csv("/data/country-capitals.csv", (row)=>{

            const cIndex = countries.findIndex((c) => {return(c.properties.ISO_A2==row.CountryCode || c.properties.NAME_LONG ==row.CountryName)})

            row.coordinates = [parseFloat(row.CapitalLongitude), parseFloat(row.CapitalLatitude)]

            if(cIndex != -1){

              countries[cIndex].properties.capital = row

            }
            else{
              console.log(row)
            }
          })
        ]).then((data)=>{
            console.log(datamax)

            this.setState({ geographyPaths: countries,
                          dataMax:datamax})
        })
      })
  }

  handleChange(e){

    this.setState({
      year:e,
      optimize:false
    })
    setTimeout(this.setState({optimize:true}), 10)

  }
  handleVarChange(e){

    this.setState({
      mapVar:e,
      optimize:false
    })
    this.loadData();
    setTimeout(this.setState({optimize:true}), 10)
  }

  render() {

    const sliderStyle={
      width:"80%",
      marginLeft:"10%"
    }
    const selectStyle={
      width:"30%",
      marginLeft:"10%"
    }
    const appStyle={
      maxHeight:"95%",
      maxWidth: "100%"
    }
    const mapWrap={

    }
    const graphWrap={
      float:"right"
    }
    return (
      <div style={appStyle}>
        <div style={mapWrap}>
          <Map year={this.state.year} optimize={this.state.optimize} var={this.state.mapVar} data={this.state.geographyPaths} />
        </div>
        <div style={selectStyle}>
        <Select
          value={this.state.mapVar}
          onChange={this.handleVarChange}
          options={options}
          name="value"
          aria-label={this.state.mapVar.label}
        />
        </div>
        <div style={sliderStyle}>

        <h4></h4>

        <br/>
          <Slider
            min={1980} max={this.state.dataMax} value={this.state.year}
            handle={handle}
            marks={marks}
            included={false}
            onChange={this.handleChange}
          />


        </div>
      </div>
    );
  }
}

export default App;
