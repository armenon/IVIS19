import { pfx } from '../../utils/pfx';

const base = '@@app/filters';

export const SET_DEBT_RANGE = pfx(base, 'SET_DEBT_RANGE');
export const SET_POPULATION_RANGE = pfx(base, 'SET_POPULATION_RANGE');
export const SET_HDI_RANGE = pfx(base, 'SET_HDI_RANGE');
export const SET_YEAR = pfx(base, 'SET_YEAR');
export const SEARCH_COUNTRIES = pfx(base, 'SEARCH_COUNTRIES');
export const SELECT_COUNTRY = pfx(base, 'SELECT_COUNTRY');
export const UNSELECT_COUNTRY = pfx(base, 'UNSELECT_COUNTRY');
export const SELECT_ALL = pfx(base, 'SELECT_ALL');
export const UNSELECT_ALL = pfx(base, 'UNSELECT_ALL');

export const setDebtRange = debtRange => {
	return async dispatch => dispatch({ type: SET_DEBT_RANGE, debtRange });
}

export const setPopulationRange = populationRange => {
	return async dispatch => dispatch({ type: SET_POPULATION_RANGE, populationRange });
}

export const setHdiRange = hdiRange => {
	return async dispatch => dispatch({ type: SET_HDI_RANGE, hdiRange });
}

export const setYear = year => {
	return async dispatch => dispatch({ type: SET_YEAR, year });
}

export const searchCountries = str => {
	return { type: SEARCH_COUNTRIES, str }
}

export const selectCountry = (country) => {
	return { type: SELECT_COUNTRY, country }
}

export const unselectCountry = (country) => {
	return { type: UNSELECT_COUNTRY, country }
}

export const selectAll = () => {
	return { type: SELECT_ALL }
}

export const unselectAll = () => {
	return { type: UNSELECT_ALL }
}
