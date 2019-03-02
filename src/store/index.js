import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { general } from './general/reducer';
import { map } from './map/reducer';
import { filters } from './filters/reducer';

import { FETCH_SUCCESS } from './general/actions';

const reducers = combineReducers({
	general,
	filters,
	map
});

// compose a redux devtools enhancer and sanitize large actions/state
const composeEnhancer = composeWithDevTools({
	actionSanitizer: (action) => (
		action.type === FETCH_SUCCESS && action.data ?
		{ ...action, data: '<<LONG_BLOB>>' } : action
	),
  stateSanitizer: (state) => state.general.data ? { ...state, general: { data: '<<LONG_BLOB>>' } } : { ...state }
})

// export store
export const store = createStore(
	reducers,
	composeEnhancer(applyMiddleware(thunk))
);

// export actions
export * from './map/actions';
export * from './filters/actions';
export * from './general/actions';
