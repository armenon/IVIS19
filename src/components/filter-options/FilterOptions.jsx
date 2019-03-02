import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';

import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

import './FilterOptions.scss';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

var marks = {
    0: {
        style: {
            fontSize: 10,
            color: "#A9A9A9",
            marginLeft: 5
        },
        label: <strong>MIN</strong>
    }
  };



class FilterOption extends Component {
    
    constructor(props){
        super(props)

        marks = { // I don't give a shit anymore
            0: {
                style: {
                    fontSize: 10,
                    color: "#A9A9A9",
                    marginLeft: 5
                },
                label: <strong>MIN</strong>
            }
          };
      }

    componentWillMount() {
        var tempValue = this.props.maxFilterValue; // So we can dinamically use the max filter value
        marks[tempValue] =  {
            style: {
              fontSize: 10,
              color: "#A9A9A9",
              marginLeft: -6
            },
            label: <strong>MAX</strong>,
          }
    }

    render() {
        return (
        <div className = "filter-container">
            <h3 className = "filter-title">{this.props.filterName}</h3>
            <div className = "slider-containter">
                <div className = "slider-titles">
                    <h4 className = "filter-left-scale">{this.props.filterLeftValue}</h4>
                    <h4 className = "filter-right-scale">{this.props.filterRightValue}</h4>
                </div>
                <div className = "slider-body">
                    <Range marks={marks} trackStyle={[{ backgroundColor: "#A9A9A9" }]} railStyle={{ backgroundColor: "#343434" }} 
                        step={this.props.step} min={this.props.minFilterValue} max={this.props.maxFilterValue} 
                        handleStyle={{
                            borderColor: "#ffffff",
                            height: 19,
                            width: 19,
                            marginLeft: -10,
                            marginTop: -8,
                            backgroundColor: '#ffffff',
                        }}
                        activeDotStyle={{ borderColor: "#FFFFFF" }}
                        onAfterChange= {(value) => {this.props.afterChangeFunction}} //TO-DO: Call proper function from here
                        defaultValue={[this.props.defaultValueMin, this.props.defaultValueMax]} tipFormatter={value => `${value}`}/>
                </div>
            </div>
        </div>
        );
    }

}

export default FilterOption;