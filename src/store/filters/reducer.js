import * as Actions from './actions';
import { countryNames } from '../../utils/countries';

const filtersState = {
	filterResults: [],
	countriesSearchResults: [...countryNames],
	selectedCountries: [...countryNames],
	debt: {
		min: 0,
		max: 20000
	},
	population: {
		min: null,
		max: null
	},
	hdi: {
		min: 0,
		max: 1
	},
	year: 2015,
	referenceHdi: null
}

export const filters = (state = filtersState, action) => {
	switch (action.type) {
		case Actions.SET_DEBT_RANGE: {
			return {
				...state,
				debt: action.debtRange
			}
		}
		case Actions.SET_HDI_RANGE: {
			return {
				...state,
				hdi: action.hdiRange
			}
		}
		case Actions.SET_POPULATION_RANGE: {
			return {
				...state,
				population: action.populationRange
			}
		}
		case Actions.SET_YEAR: {
			return {
				...state,
				year: action.year
			}
		}
		case Actions.SEARCH_COUNTRIES: {
			return {
				...state,
				countriesSearchResults: action.str ? filterCountries(action.str, [...countryNames]) : [...countryNames]
			}
		}
		case Actions.SELECT_COUNTRY: {
			return {
				...state,
				selectedCountries: selectCountry(action.country, [...state.selectedCountries])
			}
		}
		case Actions.UNSELECT_COUNTRY: {
			return {
				...state,
				selectedCountries: unselectCountry(action.country, [...state.selectedCountries])
			}
		}
		case Actions.SELECT_ALL: {
			return {
				...state,
				selectedCountries: [...countryNames],
			}
		}
		case Actions.UNSELECT_ALL: {
			return {
				...state,
				selectedCountries: [],
			}
		}
		case Actions.SET_REFERENCE_HDI: {
			return {
				...state,
				referenceHdi: action.referenceHdi
			}
		}
		default:
			return state;
	}
}

const selectCountry = (country, selectedCountries) => {
	if (selectedCountries.some(selectedCountry => selectCountry.id === country.id)) return selectedCountries;
	return [...selectedCountries, country]
}

const unselectCountry = (country, selectedCountries) => {
	return selectedCountries.filter(selectedCountry => selectedCountry.id !== country.id);
}

const filterCountries = (str, countries) => {
	str = str.toLowerCase();
	return countries.filter(country => country['name'].toLowerCase().startsWith(str));
}
