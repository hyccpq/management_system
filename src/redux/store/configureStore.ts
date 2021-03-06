import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { reducers, AppState } from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
declare const module: __WebpackModuleApi.Module;

const configureStore = (preLoadedState:{} = {}) => {
	// let store
	let store: Store<AppState, AnyAction>;
	if (process.env.NODE_ENV === 'production') {
		store = createStore(reducers, preLoadedState, applyMiddleware(thunk));
	} else {
		store = createStore(reducers, preLoadedState, applyMiddleware(thunk, logger));
		
		if(module.hot) {
			module.hot.accept('../reducers', () => {
				const nextRootReducer = require('../reducers/index');
				store.replaceReducer(nextRootReducer);
			})
		}
	}

	return store;
};

export default configureStore;