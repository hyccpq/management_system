import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { reducers, AppState } from '../';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (preLoadedState:{} = {}) => {
	// let store
	let store: Store<AppState, AnyAction>;
	if (process.env.NODE_ENV === 'production') {
		store = createStore(reducers, preLoadedState, applyMiddleware(thunk));
	} else {
		store = createStore(reducers, preLoadedState, applyMiddleware(thunk, logger));
	}

	return store;
};

export default configureStore;