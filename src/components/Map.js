import React, { Component } from "react"
import { get } from "axios"
import * as topojson from "topojson-client"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Graticule,
  Markers,
   Marker,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import chroma from "chroma-js"
import ReactTooltip from 'react-tooltip'
import { ContinuousColorLegend }  from "react-vis"
import * as d3 from "d3";
import { geoAzimuthalEqualArea } from "d3-geo"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  maxHeight:"100%",
  margin: "0 0",
  fontFamily: "Roboto, sans-serif",

}
const demoScale = scaleLinear()
  .domain([-10,0,7,10])
  .range(["#ff3300","#ff9933","#ffff00","#33cc33"])
  .unknown(["#f2f2f2"])

const internetScale = scaleLinear()
    .domain([0,100])
    .range(["#cce6ff","#000099"])
    .unknown(["#f2f2f2"])

const hdiScale = scaleLinear()
      .domain([0,1])
      .range(["#f2f2f2","#ff9933"])
      .unknown(["#f2f2f2"])

const debtScale = scaleLinear()
      .domain([0,50])
      .range(["#f2f2f2","#ff3300"])
      .unknown(["#f2f2f2"])


//This works for percentage, but we need other domains for oter values
const markerScale = scaleLinear()
    .domain([0,100])
    .range([1,10])
    .clamp(true)
    .unknown(0)


const colorScale = chroma
  .scale([
    "#ff3300",
    "#33cc33",
    "#000099",
  ])
  .mode('lch')
  .colors(24)


//exclude Antarctica
const exclude = ["ATA"]

const defaultRegions=[
  { name: "Asia", coordinates: [85 ,25], zoom:3 },
  { name: "Africa", coordinates: [14,6],zoom:2.5 },
  { name: "Europe", coordinates: [10,54], zoom:5 },
  { name: "Americas", coordinates: [-87,13], zoom:1.2 },
  {name: "Oceania", coordinates: [130,-25], zoom:4}
]

const defaultSubregions=[
    { name: "Polynesia", coordinates: [80 ,20], zoom:2.5 },
    { name: "Micronesia", coordinates: [80 ,20], zoom:2.5 },
    { name: "Melanesia", coordinates: [80 ,20], zoom:2.5 },




    { name: "Seven seas (open ocean)", coordinates: [80 ,20], zoom:2.5 },




    { name: "Northern Africa", coordinates: [10 ,30], zoom:5 },
    { name: "Eastern Africa", coordinates: [38 ,6], zoom:8 },
    { name: "Middle Africa", coordinates: [28 ,-3], zoom:7 },
    { name: "Southern Africa", coordinates: [25 ,-25], zoom:8 },
    { name: "Western Africa", coordinates: [-5 ,10], zoom:7 },

    { name: "Northern Europe", coordinates: [5 ,63], zoom:8 },
    { name: "Eastern Europe", coordinates: [23 ,52], zoom:10 },
    { name: "Southern Europe", coordinates: [13 ,40], zoom:9 },
    { name: "Western Europe", coordinates: [3 ,51], zoom:12 },

    { name: "South America", coordinates: [-68 ,-24], zoom:3 },
    { name: "Caribbean", coordinates: [-71 ,19], zoom:7 },
    { name: "Central America", coordinates: [-90 ,20], zoom:6 },
    { name: "Northern America", coordinates: [-100 ,50], zoom:4 },


    { name: "Southern Asia", coordinates: [76 ,23], zoom:6 },
    { name: "South-Eastern Asia", coordinates: [105 ,8], zoom:5 },
    { name: "Eastern Asia", coordinates: [110 ,38], zoom:5.5 },
    { name: "Central Asia", coordinates: [60 ,40], zoom:6 },
    { name: "Western Asia", coordinates: [48 ,28  ], zoom:6.5 }
  ]

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geographyPaths: [],
      zoom: 1,
      center: [0,20],
      level:1,
      optimize:false,
      area:"World",
      subarea:"-",
      regions: defaultRegions,
      highlighted: "",
      hovered: false
    }

    this.handleZoom=this.handleZoom.bind(this)
    // this.handleMove=this.handleMove.bind(this)
    // this.handleLeave=this.handleLeave.bind(this)
  }

  componentDidMount() {
    this.setState({geographyPaths:this.props.data})
  }

  componentDidUpdate(){
    ReactTooltip.rebuild();
  }
  // projection(width, height, config) {
  //   return geoAzimuthalEqualArea()
  //     .rotate([-1,20,0])
  //     .scale(config.scale)
  // }
  handleZoom(e,r){
    console.log("Zoom")
    switch (this.state.level){
      case 1:{
        const region = defaultRegions.find((o)=> o.name==r.REGION_UN)
        console.log(e)

        this.setState({
          area:region.name,
          center: region.coordinates,
          zoom: region.zoom,
          level:2,

        })
        if(region.name=="Oceania"){
          this.setState({
            level:3
          })
        }
        break;
      }case 2:{
        const subregion = defaultSubregions.find((o)=> o.name==r.SUBREGION)
        console.log(e)
        this.setState({
          subarea:subregion.name,
          center: subregion.coordinates,
          zoom: subregion.zoom,
          level:3
        })
        break;

      }case 3:{
        this.setState({
          area:"World",
          subarea:"-",
          center: [0,20],
          zoom: 1,
          level:1
        })
      }
    }

  }


  // handleMove = geo => {
  //    if (this.state.hovered) return;
  //    this.state.level==1
  //    ?this.setState({
  //      hovered: true,
  //      highlighted: geo.properties.REGION_UN
  //     })
  //    :this.setState({
  //      hovered: true,
  //      highlighted: geo.properties.SUBREGION
  //    })
  //  };
  //  handleLeave = () => {
  //    this.setState({
  //      highlighted: "",
  //      hovered: false
  //    });
  //  };


  render() {
    console.log("render")
    const fillProperties = (score)=>{
      switch (this.props.var.value) {
        case "internet_users":{
          return(internetScale(score))
        }
        case "demo_score":{
          return(demoScale(score))
        }
        case "hdi":{
          return(hdiScale(score))
        }
        case "suicide_per_100000_people":{
          return(debtScale(score))
        }
      }
    }
    const headerStyle={
      textAlign:"center"
    }
    const legendStyle={
      marginLeft:"20%"
    }

    return (

        <div style={wrapperStyles}>
        <div style={headerStyle}>
          <h4  > {this.state.area}</h4>
          <h5> {this.state.subarea}</h5>
          </div>
        <ComposableMap

             projectionConfig={{
               scale: 160,
             }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup  center={this.state.center} zoom={this.state.zoom} disablePanning>
            <Geographies geography={this.props.data} disableOptimization={this.props.optimize}>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                 exclude.indexOf(geography.properties.ISO_A3) == -1 &&
                 (
                  <Geography
                    key={`${geography.properties.ADM0_A3}-${i}`}
                    cacheId={`path-${geography.properties.ADM0_A3}-${i}`}
                    round
                    geography={geography}
                    projection={projection}
                    onClick={(e)=>this.handleZoom(e,geography.properties)}

                   data-html={true}
                   data-tip={geography.properties.NAME + " <br/>"+this.props.var.label+": " + (geography.score || {})[this.props.year]}
                    style={{
                      default: {
                        fill:fillProperties((geography.score || {})[this.props.year]),
                        stroke: "#999999",
                        strokeWidth: 0.2,
                        outline: "none",
                      },
                      hover: {
                        fill:"#707070",
                        stroke: "#607D8B",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 0.4,
                        outline: "none",
                      },
                    }}
                  />
                )
              )}
            </Geographies>

            <Markers>
              {this.props.data.filter(c => typeof(c.properties.capital) !== "undefined").map((country, i) => {
                const debt = Math.random()*100;
                return(

                  <Marker key={i} marker={{coordinates:(country.properties.capital || {})["coordinates"]}}>
                    <circle
                      cx={0}
                      cy={0}
                      r={markerScale(debt)*this.state.level}
                      fill="rgba(255,87,34,0.8)"
                      stroke="#607D8B"
                      strokeWidth="2"
                      onClick={()=>console.log(country)}
                      data-html={true}
                      data-tip={country.properties.NAME +
                                " <br/> Debt: " + debt}
                    />
                  </Marker>
                )}
              )
              }
            </Markers>
          </ZoomableGroup>
        </ComposableMap>

        <ReactTooltip />
        <div style={legendStyle}>
        <ContinuousColorLegend
          startTitle={this.props.var.domain[0]}
          midTitle={(this.props.var.domain[0]+this.props.var.domain[1])/2}
          endTitle={this.props.var.domain[1]}
          startColor={fillProperties(this.props.var.domain[0])}
          endColor={fillProperties(this.props.var.domain[1])}
          width={300}
        />
        </div>

        </div>

    )
  }
}
//fill: fillProperties((geography.properties.dem_score || {})[this.props.year]),
export default Map
