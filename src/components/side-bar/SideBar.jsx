import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FilterOption from '../filter-options/FilterOptions'
import { connect } from 'react-redux'
import TimeBar from '../time-bar/TimeBar';
import VariablesLegend from '../variables-legend/VariablesLegend';
import { setYear, enableOptimization, disableOptimization, showSidebar, hideSidebar, searchCountries } from '../../store/'
import './SideBar.scss';


class SideBar extends Component {
	handleSearch = (event) => {
		const str = event ? event.target.value : '';
		this.props.search(str);
	}

	handleYearChange = (event) => {
		const year = event.target.value;
		this.props.setYear(year);
	}

	toggleMenu() {
		this.props.isShown ? this.props.hide() : this.props.show();
	}

	renderCountries(results) {
		return results && results.map(country => (
			<div className="checkbox active" key={country.id} >
				<label className="d-flex align-items-center">
					<input value={country.id} type="checkbox" name="" id="" checked />
					<div className="spacing-h x-small"></div>
					{country.name}
				</label>
			</div>
		));
	}

	render() {
		const { isGraphShown, isShown, year, results } = this.props;
		return (
			<div>
				{!isGraphShown && (<Button onClick={() => this.toggleMenu()} id="filterButton" bsPrefix="btn btn-primary box-shadow">Filters <i className="fa fa-filter"></i></Button>)}
				<div className={isShown && !isGraphShown ? 'side-bar' : 'side-bar hidden'}>
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
							<input type="text" onChange={this.handleSearch} placeholder="Search countries" />
						</span>
						<div className="countries">
							{this.renderCountries(results)}
						</div>
						<div className="select-all">
							<div className="checkbox active">
								<label className="d-flex align-items-center">
									<input type="checkbox" name="" id="" checked />
									<div className="spacing-h x-small"></div>
									Select all
								</label>
							</div>
						</div>
					</div>
					<div className="spacing intermediate"></div>
					<p className="label">Filters</p>
					<div className="filters">
						<FilterOption filterName="Debt" filterLeftValue="USD 0" filterRightValue="USD 20B"
							minFilterValue={0} maxFilterValue={20} defaultValueMin={4} /*afterChangeFunction=randomFunction(value) <<<---- Send a function that can accept the value. It returns a [X,Y]*/
							defaultValueMax={7} step={1}></FilterOption>
						<FilterOption filterName="HPI" filterLeftValue="0" filterRightValue="1"
							minFilterValue={0} maxFilterValue={1} defaultValueMin={0.4} /*afterChangeFunction=randomFunction(value)*/
							defaultValueMax={0.7} step={0.01}></FilterOption>
						
					</div>
				</div>
				<TimeBar onYearChange={this.handleYearChange} year={year} isFull={!isShown || isGraphShown} />
				<VariablesLegend isFull={!isShown || isGraphShown} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isShown: state.general.showSidebar,
	countries: state.filters.countries,
	results: state.filters.countriesSearchResults,
	year: state.filters.year
});


const mapDispatchToProps = dispatch => {
	return {
		show: () => dispatch(showSidebar()),
		hide: () => dispatch(hideSidebar()),
		setYear: async (year) => {
			dispatch(disableOptimization(year))
			await dispatch(setYear(year))
			dispatch(enableOptimization(year))
		},
		search: (str) => dispatch(searchCountries(str))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);


/*<FilterOption filterName="Population" filterLeftValue="0" filterRightValue="1400M"
							minFilterValue={0} maxFilterValue={1400} defaultValueMin={700} /*afterChangeFunction=randomFunction(value)*/
							/*defaultValueMax={900} step={10}></FilterOption>*/