import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import FilterOption from '../filter-options/FilterOptions'
import {connect} from 'react-redux'
import { countryNames } from '../../utils/countries.js'
import TimeBar from '../time-bar/TimeBar';
import VariablesLegend from '../variables-legend/VariablesLegend';
import { fetchCountries, setYear, enableOptimization, disableOptimization, setSelectedCountries } from '../../store/'
import './SideBar.scss';


class SideBar extends Component {
	constructor() {
		super();
		this.state = {
			isShown: true,
			availableCountries: countryNames,
		}
		this.handleFilter = this.handleFilter.bind(this)
	}
	searchCountries(event) {
		var searchString = event ? event.target.value : '';
		if (searchString) {
			this.setState({availableCountries: this.filterCountries(searchString)});
		} else {
			this.setState({ availableCountries: countryNames });
		}
	}

	handleFilter(value, type){
		console.log(value)
		if (type == 'pop') {

		}
		if (type == 'debt') {

			this.props.setSelectedCountries(this.props.data.filter(c => c.properties.gapminder.debt_by_gdp[this.props.year]>=value[0] && c.properties.gapminder.debt_by_gdp[this.props.year] <= value[1]))
		}
		if (type == 'hdi') {

			this.props.setSelectedCountries(this.props.data.filter(c => c.properties.gapminder.hdi_2017[this.props.year]>=value[0] && c.properties.gapminder.hdi_2017[this.props.year] <= value[1]))
		}
	}

	filterCountries(string) {
		return countryNames.filter(country =>
			country['name'].toLowerCase().startsWith(string.toLowerCase())
		);
	}
	toggleMenu() {
		this.setState({
			isShown: !this.state.isShown,
		});
	}
	renderCountries() {
		return this.state.availableCountries.map((country,i) => (
			<div key={i} className="checkbox active">
				<label className="d-flex align-items-center">
					<input value={country.id} key={country.id} type="checkbox" name="" id="" checked/>
					<div className="spacing-h x-small"></div>
					{country.name}
				</label>
			</div>
		));
	}
	render() {
		return (
			<div>
				{!this.props.isGraphShown && (<Button onClick={() => this.toggleMenu()} id="filterButton" bsPrefix="btn btn-primary box-shadow">Filters <i className="fa fa-filter"></i></Button>)}
				<div className={this.state.isShown && !this.props.isGraphShown ? 'side-bar' : 'side-bar hidden'}>
					<a onClick={() => this.toggleMenu()}><i className="fas fa-arrow-left"></i> Hide filters</a>
					<div className="spacing small"></div>
					<div className="logo d-flex">
						<i className="fas fa-dollar-sign"></i>
						<div className="spacing-h small"></div>
						<span>
							<h1>World debt</h1>
							<p>Visualizing debt in the world</p>
						</span>
					</div>
					<div className="spacing intermediate"></div>
					<div className="country-search">
						<span className="search-holder">
							<i className="fa fa-search"></i>
							<input type="text" onChange={(e) => this.searchCountries(e)} placeholder="Search countries"/>
						</span>
						<div className="countries">
							{this.renderCountries()}
						</div>
						<div className="select-all">
							<div className="checkbox active">
								<label className="d-flex align-items-center">
									<input type="checkbox" name="" id="" checked/>
									<div className="spacing-h x-small"></div>
									Select all
								</label>
							</div>
						</div>
					</div>
					<div className="spacing intermediate"></div>
					<p className="label">Filters</p>
					<div className="filters">
						<FilterOption filterName="Debt" filterLeftValue="USD 0" filterRightValue="USD 2000B"
							minFilterValue={0} maxFilterValue = {2000} defaultValueMin = {0} afterChangeFunction={(value)=>this.handleFilter(value, 'debt')}
							defaultValueMax = {2000} step={100}></FilterOption>
						<FilterOption filterName="HDI" filterLeftValue="0" filterRightValue="1"
							minFilterValue={0} maxFilterValue = {1} defaultValueMin = {0} afterChangeFunction={(value)=>this.handleFilter(value, 'hdi')}
							defaultValueMax = {1} step={0.01}></FilterOption>

					</div>
				</div>
				<TimeBar onYearChange={(e)=>this.props.setYear(e.target.value)} year={this.props.year} isFull={!this.state.isShown || this.props.isGraphShown} />
				<VariablesLegend isFull={!this.state.isShown || this.props.isGraphShown} />
			</div>
		);
	}
}

const mapStateToProps = state => ({

	year: state.filters.year,
	selectedCountries: state.filters.selectedCountries,
	data: state.general.data
});


 const mapDispatchToProps = dispatch => {
	return {

		setYear: async (year) => {
			dispatch(disableOptimization(year))
			await dispatch(setYear(year))
			dispatch(enableOptimization(year))
		},
		setSelectedCountries: (countries) => dispatch(setSelectedCountries(countries))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
