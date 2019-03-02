import * as Actions from './actions';

const generalState = {
	title: 'IVIS Group Project',
	showMap: true,
	showScatter: false,
	data: null,
	fetching: false,
	error: null
}

export const general = (state = generalState, action) => {
	switch (action.type) {
		case Actions.TOGGLE_VISUALIZATION: {
			return {
				...state,
				showMap: !state.showMap,
				showScatter: !state.showScatter
			}
		}
		case Actions.FETCH_START: {
			return {
				...state,
				fetching: true,
				error: null
			}
		}
		case Actions.FETCH_SUCCESS: {
			return {
				...state,
				fetching: false,
				data: action.data

			}
		}
		case Actions.FETCH_FAILED: {
			return {
				...state,
				fetching: false,
				error: action.error
			}
		}
		default:
			return state;
	}
}
