/**
 * @typedef {{min: number, max: number}} Range
*/

import { pfx } from '../../utils/pfx';

const base = '@@app/filters';

export const SET_SELECTED_COUNTRIES = pfx(base,'SET_SELECTED_COUNTRIES');
export const SET_DEBT_RANGE = pfx(base, 'SET_DEBT_RANGE');
export const SET_POPULATION_RANGE = pfx(base, 'SET_POPULATION_RANGE');
export const SET_HDI_RANGE = pfx(base, 'SET_HDI_RANGE');
export const SET_YEAR = pfx(base, 'SET_YEAR');


/**
 * @param {Array<Object>} countries
 */
export const setSelectedCountries = countries => {
	return async dispatch => dispatch({ type: SET_SELECTED_COUNTRIES, countries });
}

/**
 * @param {Range} debtRange
 */
export const setDebtRange = debtRange => {
	return async dispatch => dispatch({ type: SET_DEBT_RANGE, debtRange });
}

/**
 * @param {Range} populationRange
 */
export const setPopulationRange = populationRange => {
	return async dispatch => dispatch({ type: SET_POPULATION_RANGE, populationRange });
}

/**
 * @param {Range} hdiRange
 */
export const setHdiRange = hdiRange => {
	return async dispatch => dispatch({ type: SET_HDI_RANGE, hdiRange });
}

export const setYear = year => {
	return async dispatch => dispatch({ type: SET_YEAR, year });
}
