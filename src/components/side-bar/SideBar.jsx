import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import {connect} from 'react-redux'
import { countryNames } from '../../utils/countries.js'
import TimeBar from '../time-bar/TimeBar';
import VariablesLegend from '../variables-legend/VariablesLegend';
import { fetchCountries, setYear, enableOptimization, disableOptimization } from '../../store/'
import './SideBar.scss';


class SideBar extends Component {
	constructor() {
		super();
		this.state = {
			isShown: true,
			availableCountries: countryNames,
		}
	}
	searchCountries(event) {
		var searchString = event ? event.target.value : '';
		if (searchString) {
			this.setState({availableCountries: this.filterCountries(searchString)});
		} else {
			this.setState({ availableCountries: countryNames });
		}
	}
	filterCountries(string) {
		return countryNames.filter(country =>
			country['name'].startsWith(string)
		);
	}
	toggleMenu() {
		this.setState({
			isShown: !this.state.isShown,
		});
	}
	renderCountries() {
		return this.state.availableCountries.map(country => (
			<div className="d-flex align-items-center checkbox">
				<input value={country.id} key={country.id} type="checkbox" name="" id="" />
				<div className="spacing-h x-small"></div>
				<span>
					{country.name}
				</span>
			</div>
		));
	}
	render() {
		return (
			<div>
				<Button onClick={() => this.toggleMenu()} id="filterButton" bsPrefix="btn btn-primary box-shadow">Filters <i className="fa fa-filter"></i></Button>
				<div className={this.state.isShown ? 'side-bar' : 'side-bar hidden'}>
					<a onClick={() => this.toggleMenu()}><i className="fas fa-arrow-left"></i> Hide filters</a>
					<div className="spacing"></div>
					<div className="logo d-flex">
						<i className="fas fa-dollar-sign"></i>
						<div className="spacing-h small"></div>
						<span>
							<h1>World debt</h1>
							<p>Visualizing debt in the world</p>
						</span>
					</div>
					<div className="spacing large"></div>
					<div className="country-search">
						<span className="search-holder">
							<i className="fa fa-search"></i>
							<input type="text" onChange={(e) => this.searchCountries(e)} placeholder="Search countries"/>
						</span>
						<div className="countries">
							{this.renderCountries()}
						</div>
						<div className="select-all">
							<div className="d-flex align-items-center checkbox">
								<input type="checkbox" name="" id="" />
								<div className="spacing-h x-small"></div>
								<span>
									Select all
								</span>
							</div>
						</div>
					</div>
					<div className="spacing large"></div>
					<p className="label">Filters</p>
					<div className="filters">
						Filters here...
					</div>
				</div>
				<TimeBar onYearChange={(e)=>this.props.setYear(e.target.value)} year={this.props.year} isFull={!this.state.isShown} />
				<VariablesLegend isFull={!this.state.isShown} />
			</div>
		);
	}
}

const mapStateToProps = state => ({

	year: state.filters.year
});


 const mapDispatchToProps = dispatch => {
	return {

		setYear: async (year) => {
			dispatch(disableOptimization(year))
			await dispatch(setYear(year))
			dispatch(enableOptimization(year))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
