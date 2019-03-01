import * as Actions from './actions';

const filtersState = {
	selectedCountries: [],
	debt: {
		min: null,
		max: null
	},
	population: {
		min: null,
		max: null
	},
	hdi: {
		min: null,
		max: null
	},
	year: 2010
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
		case Actions.SET_SELECTED_COUNTRIES: {
			return {
				...state,
				selectedCountries: [...action.countries]
			}
		}
		case Actions.SET_YEAR: {
			return {
				...state,
				year: action.year
			}
		}
		default:
			return state;
	}
}
