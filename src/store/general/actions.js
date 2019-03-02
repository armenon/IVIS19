import { pfx } from '../../utils/pfx';
import * as topojson from 'topojson-client'

const base = '@@app/general';

export const TOGGLE_VISUALIZATION = pfx(base, 'TOGGLE_VISUALIZATION');
export const toggleVisualization = () => {
	return { type:  TOGGLE_VISUALIZATION }
}

export const FETCH_START = pfx(base,'FETCH_START');
const startFetch = () => {
  return { type: FETCH_START }
}

export const FETCH_SUCCESS = pfx(base,'FETCH_SUCCESS');
const fetchSuccess = (data) => {
  return { type: FETCH_SUCCESS, data }
}

export const FETCH_FAILED = pfx(base,'FETCH_FAILED');
const fetchFailed = (error) => {
  return { type: FETCH_FAILED, error }
}

export const fetchCountries = () => {
  return async dispatch => {
    dispatch(startFetch());
    try {
      const response = await fetch('world-50m.json');
      const json = await response.json();
      dispatch(fetchSuccess(topojson.feature(json,json.objects[Object.keys(json.objects)[0]]).features));
    } catch(error) {
      dispatch(fetchFailed(error));
    }
  }
}
