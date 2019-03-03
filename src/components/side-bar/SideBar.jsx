import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FilterOption from '../filter-options/FilterOptions'
import { connect } from 'react-redux'
import TimeBar from '../time-bar/TimeBar';
import VariablesLegend from '../variables-legend/VariablesLegend';
import { setYear, enableOptimization, disableOptimization, showSidebar, hideSidebar, searchCountries, selectCountry, unselectCountry, selectAll, unselectAll, setDebtRange, setHdiRange } from '../../store/'
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

	handleSelectCountry = (country) => (event) => {
		const checked = event.target.checked;
		checked ? this.props.selectCountry(country) : this.props.unselectCountry(country);
	}

	handleSelectAll = (event) => {
		const checked = event.target.checked;
		checked ? this.props.selectAll() : this.props.unselectAll();
	}

	handleChecked = (country) => {
		return this.props.selectedCountries.some(selectedCountry => selectedCountry.id === country.id);
	}

	handleDebtChange = (values) => {
		this.props.setDebt({
			min: values[0],
			max: values[1]
		})
	}

	handleHdiChange = (values) => {
		this.props.setHdi({
			min: values[0],
			max: values[1]
		})
	}

	toggleMenu() {
		this.props.isShown ? this.props.hide() : this.props.show();
	}

	renderCountries(results) {
		return results && results.map(country => (
			<div className="checkbox active" key={country.id} >
				<label className="d-flex align-items-center">
					<input value={country.id} type="checkbox" name="" id="" defaultChecked checked={this.handleChecked(country)} onChange={this.handleSelectCountry(country)} />
					<div className="spacing-h x-small"></div>
					{country.name}
				</label>
			</div>
		));
	}

	render() {
		const { isGraphShown, isShown, year, results, debt, hdi } = this.props;
		return (
			<div>
				<Button onClick={() => this.toggleMenu()} id="filterButton" bsPrefix="btn btn-primary box-shadow">Filters <i className="fa fa-filter"></i></Button>
				<div className={isShown || isGraphShown ? 'side-bar' : 'side-bar hidden'}>
					{!isGraphShown && (<a onClick={() => this.toggleMenu()}><i className="fas fa-arrow-left"></i> Hide filters</a>)}
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
									<input type="checkbox" name="" id="" defaultChecked onChange={this.handleSelectAll} />
									<div className="spacing-h x-small"></div>
									Select all
								</label>
							</div>
						</div>
					</div>
					<div className="spacing intermediate"></div>
					<p className="label">Filters</p>
					<div className="filters">
						<FilterOption filterName="Debt" filterLeftValue="USD 0" filterRightValue="USD 20 000B"
							minFilterValue={0} maxFilterValue={20000} defaultValueMin={debt.min} /*afterChangeFunction=randomFunction(value) <<<---- Send a function that can accept the value. It returns a [X,Y]*/
							defaultValueMax={debt.max} step={1} afterChangeFunction={this.handleDebtChange}></FilterOption>
						<FilterOption filterName="HDI" filterLeftValue="0" filterRightValue="1"
							minFilterValue={0} maxFilterValue={1} defaultValueMin={hdi.min} /*afterChangeFunction=randomFunction(value)*/
							defaultValueMax={hdi.max} step={0.01} afterChangeFunction={this.handleHdiChange}></FilterOption>

					</div>
				</div>
				<TimeBar onYearChange={this.handleYearChange} year={year} isFull={!isShown && !isGraphShown} />
				<VariablesLegend isFull={!isShown && !isGraphShown} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isShown: state.general.showSidebar,
	results: state.filters.countriesSearchResults,
	year: state.filters.year,
	selectedCountries: state.filters.selectedCountries,
	debt: state.filters.debt,
	hdi: state.filters.hdi
});


const mapDispatchToProps = dispatch => {
	return {
		show: () => dispatch(showSidebar()),
		hide: () => dispatch(hideSidebar()),
		setYear: async year => {
			dispatch(disableOptimization())
			await dispatch(setYear(year))
			dispatch(enableOptimization())
		},
		search: str => dispatch(searchCountries(str)),
		selectCountry: async country => {
			dispatch(disableOptimization())
			await dispatch(selectCountry(country))
			dispatch(enableOptimization())
		},
		unselectCountry: async country => {
			dispatch(disableOptimization())
			await dispatch(unselectCountry(country))
			dispatch(enableOptimization())
		},
		selectAll: async () => {
			dispatch(disableOptimization())
			await dispatch(selectAll())
			dispatch(enableOptimization())
		},
		unselectAll: async () => {
			dispatch(disableOptimization())
			await dispatch(unselectAll())
			dispatch(enableOptimization())
		},
		setDebt: async (debt) => {
			dispatch(disableOptimization())
			await dispatch(setDebtRange(debt))
			dispatch(enableOptimization())
		},
		setHdi: async (hdi) => {
			dispatch(disableOptimization())
			await dispatch(setHdiRange(hdi))
			dispatch(enableOptimization())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
