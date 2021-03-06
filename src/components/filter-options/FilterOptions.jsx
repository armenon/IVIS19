import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './FilterOptions.scss';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);




class FilterOption extends Component {

    render() {

        const tempValue = this.props.maxFilterValue; // So we can dinamically use the max filter value

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
            
        marks[tempValue] =  { // Add the Max dynamically because it'll depend on the props parameter
            style: {
            fontSize: 10,
            color: "#A9A9A9",
            marginLeft: -6
            },
            label: <strong>MAX</strong>,
        }

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
												onChange= {(value) => this.props.afterChangeFunction(value)} //TO-DO: Call proper function from here
									defaultValue={[this.props.defaultValueMin, this.props.defaultValueMax]} tipFormatter={value => this.props.beforeVal + `${value}` + this.props.afterVal}/>
                </div>
            </div>
        </div>
        );
    }

}

export default FilterOption;
