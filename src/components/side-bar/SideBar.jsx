import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import FilterOption from '../filter-options/FilterOptions'
import './SideBar.scss';


class SideBar extends Component {
	state = {
    isShown: true,
	}
	toggleMenu() {
		this.setState({
			isShown: !this.state.isShown,
		});
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
							<input type="text" placeholder="Search countries"/>
						</span>
						<div className="countries">
							<div className="d-flex align-items-center checkbox active">
								<input type="checkbox" name="" id="" />
								<div className="spacing-h x-small"></div>
								<span>
									Country name active here
								</span>
							</div>
							<div className="d-flex align-items-center checkbox">
								<input type="checkbox" name="" id=""/>
								<div className="spacing-h x-small"></div>
								<span>
									Country name here
								</span>
							</div>
							<div className="d-flex align-items-center checkbox">
								<input type="checkbox" name="" id="" />
								<div className="spacing-h x-small"></div>
								<span>
									Country name here
								</span>
							</div>
							<div className="d-flex align-items-center checkbox">
								<input type="checkbox" name="" id="" />
								<div className="spacing-h x-small"></div>
								<span>
									Country name here
								</span>
							</div>
							<div className="d-flex align-items-center checkbox">
								<input type="checkbox" name="" id="" />
								<div className="spacing-h x-small"></div>
								<span>
									Country name here
								</span>
							</div>
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
						<FilterOption filterName="Debt" filterLeftValue="USD 0" filterRightValue="USD 20B" minFilterValue={0} maxFilterValue = {20} defaultValueMin = {4} defaultValueMax = {7} step={1}></FilterOption>
						<FilterOption filterName="HPI" filterLeftValue="0" filterRightValue="1" minFilterValue={0} maxFilterValue = {1} defaultValueMin = {0.4} defaultValueMax = {0.7} step={0.01}></FilterOption>
					</div>
				</div>
			</div>
		);
	}
}


export default SideBar;
