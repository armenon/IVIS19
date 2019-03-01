import React, { Component } from 'react';
import { scaleLinear, scaleThreshold } from "d3-scale"



import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Markers,
	Marker,
} from 'react-simple-maps';


const markerColor  = scaleThreshold()
    .domain([0,100])
    .range(['gray','white','black'])



const markerScale  = scaleLinear()
    .domain([0,100,200])
    .range([25,0,25])






const Bubbles = ({geographies, projection}) =>{

  console.log(geographies)
  return(
      <Markers projection={projection}>
        {geographies.map((country,i)=> (
          <Marker  marker={{coordinates:country.geometry.coordinates[0][0]}}>
            <circle
              cx={0}
              cy={0}
              r={markerScale(Math.random()*100)}
              fill={"black"}
              stroke="#607D8B"
              strokeWidth="2"
              onClick={()=>console.log(country)}
            />

          </Marker>
        ))

        }
    </Markers>
  )
}


export default Bubbles;
